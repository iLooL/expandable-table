# Architecture Handoff: Automated Vulnerability Remediation Pipeline

## 1. Context & Objective
The goal is to implement an automated vulnerability remediation solution capable of operating across 1,700+ repositories. 

**Previous Approach:** A GitHub Actions deployment utilizing the Copilot SDK with a LangGraph wrapper.
**Architectural Limitations:** 
*   **Authentication:** Configuring Copilot to run in automated pipelines relies on shared PATs or service accounts, breaking Git audit trails and billing attribution.
*   **State & Timeouts:** GitHub Action runners are ephemeral. Complex agentic loops (LangGraph) risk timeouts or state loss during execution.
*   **Monolithic Bottlenecks:** Processing 1,700+ repositories sequentially from a single trigger point leads to local storage exhaustion (cloning repos), API rate limiting, and single points of failure.

**Chosen Architecture:** A fully decoupled, scalable AWS infrastructure utilizing **AWS Bedrock** and **ECS Fargate** via an **Event-Driven, Asynchronous Worker** pattern (Queue-Based Load Leveling). This approach dynamically scales compute based on queue depth, securely manages access via IAM and GitHub Apps, and processes vulnerabilities in parallel isolated environments.

---

## 2. Architectural Pattern: Queue-Based Load Leveling

Instead of utilizing a single container or CI runner to sequentially process repositories, the workload is distributed across ephemeral workers. 

* **Event Source:** A vulnerability scan or webhook acts as the trigger.
* **Message Broker (Amazon SQS):** Decouples the trigger from the execution. Stores lightweight metadata (`repo_name`, `vulnerability_id`, `commit_hash`).
* **Compute Fleet (ECS Fargate):** Stateless, auto-scaling worker nodes pulling from the SQS queue.
* **AI Engine (Amazon Bedrock):** Accessed securely via IAM task roles without static API keys, serving as the LLM backend for LangGraph.

---

## 3. Infrastructure as Code (AWS CDK - TypeScript)

The following CDK stack provisions the queue, cluster, task definition, and auto-scaling policies required to achieve dynamic fan-out execution.

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class RemediationWorkerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. The Queue: Decouples detection from processing
    const remediationQueue = new sqs.Queue(this, 'RemediationQueue', {
      visibilityTimeout: cdk.Duration.minutes(15), 
      receiveMessageWaitTime: cdk.Duration.seconds(20), 
    });

    // 2. ECS Cluster & Task Definition
    const cluster = new ecs.Cluster(this, 'WorkerCluster');

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'WorkerTaskDef', {
      memoryLimitMiB: 4096,
      cpu: 2048,
      ephemeralStorageGiB: 30, // Accommodates large repo clones
    });

    // Bedrock IAM Permissions
    taskDefinition.addToTaskRolePolicy(new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel', 'bedrock:InvokeModelWithResponseStream'],
      resources: ['*'], // Scope to specific ARNs in production
    }));

    remediationQueue.grantConsumeMessages(taskDefinition.taskRole);

    const container = taskDefinition.addContainer('WorkerContainer', {
      image: ecs.ContainerImage.fromAsset('./worker-container'), // Path to Node.js container code
      environment: {
        QUEUE_URL: remediationQueue.queueUrl,
      },
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'remediation-worker' }),
    });

    // 3. ECS Service
    const workerService = new ecs.FargateService(this, 'WorkerService', {
      cluster,
      taskDefinition,
      desiredCount: 0, // Scale to zero when idle
    });

    // 4. Target Tracking Auto-Scaling
    const scaling = workerService.autoScaleTaskCount({
      minCapacity: 0,
      maxCapacity: 50,
    });

    scaling.scaleOnMetric('QueueDepthScaling', {
      metric: remediationQueue.metricApproximateNumberOfMessagesVisible(),
      targetValue: 5, // 1 task per 5 messages
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });
  }
}
