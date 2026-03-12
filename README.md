Act as an expert TypeScript developer and software architect. I need you to write a robust static change analyzer application in Node.js/TypeScript.
​The Goal: The application will compare two specific Git commit IDs within our repository and generate a highly detailed JSON manifest of all semantic changes. This tool is meant to detect breaking changes and assess deployment risk, going far beyond a simple text-based git diff.
​Repository Structure:
​infra/lib/swagger.json: Contains the OpenAPI/Swagger contract for our API Gateway.
​infra/lib/*: Contains AWS CDK infrastructure code (TypeScript).
​service/*: Contains the Node.js business logic for our Lambda functions.
​Core Requirements & Architecture Strategy:
​Please structure the application to handle the following four distinct analysis modules:
​1. API Contract Analyzer (swagger.json)
​Method: Perform semantic schema diffing of the parsed JSON objects from both commits.
​Requirements: Categorize changes as Breaking (e.g., removing a required parameter), Non-Breaking (e.g., adding an optional parameter), or Dangerous (e.g., altering auth requirements).
​2. Infrastructure Analyzer (CDK inside infra/lib/*)
​Method: Use a "Synth and Diff" approach. Do not rely on AST comparison for the CDK TypeScript code.
​Requirements: Programmatically synthesize the CloudFormation templates for both commits into a temporary directory. Perform a structural diff on the resulting CloudFormation JSON/YAML. Categorize changes by resource type, specifically flagging Stateful changes (databases, retention policies) versus Stateless changes (API routes, IAM).
​3. Business Logic Analyzer (Node.js/TypeScript inside service/*)
​Method: Utilize the TypeScript Compiler API (or a wrapper like ts-morph) to generate and compare Abstract Syntax Trees (AST).
​Requirements: * Perform Handler-Centric Traversal: Start analysis at the Lambda handler entry points and traverse the call graph.
​Compare exported function signatures.
​Perform Dependency Hashing: If a shared utility file changes, automatically flag any parent Lambda that imports it as changed.
​Hash function bodies (ignoring whitespace and comments) to detect pure logical shifts.
​4. Risk Score Engine
​Method: Build a heuristic engine to calculate a cumulative risk score based on the findings from the first three modules.
​Requirements: Assign base weights to different change types (e.g., Stateful Infra = high weight, Logic modification = medium weight). Implement a "Blast-Radius Multiplier" (e.g., if an API contract change affects a Lambda connected to a highly trafficked DynamoDB table, multiply the risk score). Use the conceptual formula: Risk = \sum_{i=1}^{n} (w_i \times c_i) \times M
​Output Format:
The final output must be a structured JSON manifest file containing:
​Summary: Git SHAs, overall risk score, and a go/no-go recommendation based on a configurable threshold.
​API Deltas: Explicit list of API changes.
​Infra Deltas: CloudFormation resource modifications.
​Logic Deltas: List of specifically affected Lambda functions.
​Please begin by outlining the file structure for this analyzer application, the key npm packages you recommend installing (e.g., for AST parsing, OpenAPI diffing, and CloudFormation diffing), and the code for the main orchestrator file.
