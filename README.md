# expandable-table
table that expands 



Prompt to Copy:
I need you to act as a Senior Node.js Tooling Engineer. I currently have a working script that sets up two directories (`temp/v_old` and `temp/v_new`) and installs a specific package version in each.

**The Goal:**
I need to enhance this script to perform **Semantic Type Analysis** instead of just `Object.keys()` inspection. I want to detect breaking changes in function signatures (e.g., argument types changing) even for libraries that are technically written in JavaScript.

**Please generate the code for a new module called `src/type-analyzer.js` and the integration logic for my existing script.**

**Technical Requirements:**

### 1. The "Type Locator" Function
Write a function `findTypeDefinition(dir, packageName)` that locates the `.d.ts` entry point. It must follow this strict precedence:
1.  **Bundled Types:** Check `package.json` for `"types"` or `"typings"`.
2.  **Community Types:** Check if `@types/packageName` is installed in `node_modules` and find its `index.d.ts`.
3.  **Fallback:** Return `null` if no types are found (so I can default to my existing `require()` logic).

*Crucial Step:* If no bundled types are found, the function should programmatically run `npm install @types/[packageName] --no-save` in the directory to see if community types exist.

### 2. The "Signature Extractor" Function
Write a function `extractSignatures(filePath)` using the **TypeScript Compiler API** (`import ts from 'typescript'`).
- It should load the `.d.ts` file.
- It should walk the AST to find exported Functions, Classes, and Interfaces.
- **Output:** A flat JSON object describing the API surface.
  - *Example Format:*
    ```json
    {
      "createTransport": "Function(options: TransportOptions) => Transporter",
      "Transporter.sendMail": "Method(mailOptions: Mail.Options) => Promise<SentMessageInfo>"
    }
    ```
- *Note:* I specifically need to see argument types to catch breaking changes like "Argument 1 changed from `Object` to `Class`".

### 3. The "Comparator" Logic
Write a function `compareSignatures(oldSig, newSig)` that diffs the two JSON objects.
- **Report:**
  - **BREAKING:** Key exists in Old but not New.
  - **BREAKING:** Value (Signature) changed textually (e.g., `(a: string)` -> `(a: number)`).
  - **SAFE:** Key added in New.

**Deliverables:**
1.  Code for `src/type-analyzer.js` containing these functions.
2.  A snippet showing how to integrate this into my existing `index.js` loop (e.g., "If types found -> use Analyzer; Else -> use existing Inspector").








Here is a summarized context prompt you can easily copy and paste into your work laptop to share with your team or use as context for further development:
Context: Post-Deployment Lambda Observability Strategy
Background: We have a large portfolio of AWS Lambdas (Node.js/TypeScript) deployed via AWS CDK. We have recently increased our deployment frequency and are now building an observability tool to automatically validate the health of these deployments. A primary use case is validating minor and patch version updates in package.json to ensure they do not introduce subtle runtime regressions. We currently use Dynatrace for observability.
Core Objective: Move beyond raw text-based log comparison (which is brittle and noisy) to a more robust, automated health-check strategy post-deployment.
Proposed Validation Strategies:
 * Error Signature Analysis (via Dynatrace API): Rather than comparing raw pre/post logs, query Dynatrace specifically for new exception stack traces, unhandled promise rejections, or spikes in 5xx errors/timeouts that did not exist in the 24-hour pre-deployment baseline.
 * Active Synthetic Validation: Inject a step into the pipeline that actively invokes the newly deployed Lambda with a deterministic test payload. Validate the HTTP status code, execution duration, and response schema before allowing real user traffic to rely on it.
 * Phased Traffic Shifting (Canary Deployments): Leverage AWS CodeDeploy to route a small percentage (e.g., 10%) of traffic to the newly updated Lambda version. Monitor Dynatrace/CloudWatch alarms on that specific slice of traffic for 5–10 minutes before completing the full cutover.
 * Bundle Size & Cold Start Monitoring: Track the zipped artifact size pre-deployment and monitor the Init Duration metric post-deployment to catch dependency bloat and prevent performance degradation from transitive dependencies.
 * Contract & Schema Validation: Ensure the output of the updated Lambda still perfectly adheres to the expected TypeScript interfaces or OpenAPI specifications required by downstream consumers.
Next Steps / Prompt:
[Insert your specific question for your tooling or team here, e.g., "Which Dynatrace API endpoints are best suited for fetching new error signatures?"]
Would you like me to adjust any of the technical specifics in this summary before you send it over?







Here is a summarized context prompt you can easily copy and paste into your work laptop to share with your team or use as context for further development:
Context: Post-Deployment Lambda Observability Strategy
Background: We have a large portfolio of AWS Lambdas (Node.js/TypeScript) deployed via AWS CDK. We have recently increased our deployment frequency and are now building an observability tool to automatically validate the health of these deployments. A primary use case is validating minor and patch version updates in package.json to ensure they do not introduce subtle runtime regressions. We currently use Dynatrace for observability.
Core Objective: Move beyond raw text-based log comparison (which is brittle and noisy) to a more robust, automated health-check strategy post-deployment.
Proposed Validation Strategies:
 * Error Signature Analysis (via Dynatrace API): Rather than comparing raw pre/post logs, query Dynatrace specifically for new exception stack traces, unhandled promise rejections, or spikes in 5xx errors/timeouts that did not exist in the 24-hour pre-deployment baseline.
 * Active Synthetic Validation: Inject a step into the pipeline that actively invokes the newly deployed Lambda with a deterministic test payload. Validate the HTTP status code, execution duration, and response schema before allowing real user traffic to rely on it.
 * Phased Traffic Shifting (Canary Deployments): Leverage AWS CodeDeploy to route a small percentage (e.g., 10%) of traffic to the newly updated Lambda version. Monitor Dynatrace/CloudWatch alarms on that specific slice of traffic for 5–10 minutes before completing the full cutover.
 * Bundle Size & Cold Start Monitoring: Track the zipped artifact size pre-deployment and monitor the Init Duration metric post-deployment to catch dependency bloat and prevent performance degradation from transitive dependencies.
 * Contract & Schema Validation: Ensure the output of the updated Lambda still perfectly adheres to the expected TypeScript interfaces or OpenAPI specifications required by downstream consumers.
Next Steps / Prompt:
[Insert your specific question for your tooling or team here, e.g., "Which Dynatrace API endpoints are best suited for fetching new error signatures?"]
Would you like me to adjust any of the technical specifics in this summary before you send it over?


