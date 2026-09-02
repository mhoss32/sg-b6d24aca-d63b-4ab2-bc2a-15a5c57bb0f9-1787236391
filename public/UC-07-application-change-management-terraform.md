# UC-07: Application Change Management — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-07 Application Change Management
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Application change management is the most direct match to Terraform Synergy Use Case 2 — On-Demand Test Environment Provisioning with Infrastructure Parity. Every application change that Atlas manages requires a test environment, and the infrastructure layer of that test environment is precisely what Terraform provisions and manages. Atlas generates the provisioning specification from its live model of the production environment; Terraform creates the actual LPAR or VM resources from that specification. This is a Tier 1 handoff at Step 3 of the change pipeline, with the two products working in direct sequence. Additionally, Terraform Synergy Use Case 4 — GitOps Change Governance — is relevant at the governance and record step, where Terraform's plan-approve-apply log complements Atlas's change record.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 3 — Test Environment Provisioned

**What Atlas has produced at this point:**
Atlas has completed the change impact analysis and is ready to provision an isolated test environment at the current production configuration state. Atlas has derived the infrastructure specification for the test environment from its live model of the production LPAR — CPU allocation, memory, storage mounts, network adapters, and activation profile required to match production infrastructure fidelity.

**What Atlas directs:**
Atlas passes the infrastructure specification to Terraform as an HCL configuration for the test workspace. Terraform provisions the LPAR or VM resources, enforces workspace isolation to prevent test resources from reaching production, and confirms successful provisioning back to Atlas.

**What comes back to Atlas:**
A Terraform-provisioned test environment with infrastructure matching the production declaration. Atlas deploys the application configuration and software stack on top of this infrastructure and begins the test generation and execution cycle.

---

### Step 6 — Promote to Next Environment

**What Atlas has produced at this point:**
The change has passed test validation and Atlas is orchestrating promotion through the pipeline (dev → test → QA → production). Each stage may require a fresh isolated environment.

**What Atlas directs:**
For each stage in the promotion pipeline, Atlas passes an environment specification to Terraform. Terraform provisions the stage environment, enforces lifecycle boundaries (production workspace cannot be modified by the test pipeline), and tears down the previous stage environment after promotion is confirmed.

**What comes back to Atlas:**
Confirmation of the new stage environment. Atlas proceeds with deployment and validation at the new stage. Terraform's workspace lifecycle log provides the infrastructure audit trail for the full promotion pipeline.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Impact Analysis

**How Terraform enriches this step:**
When Atlas traces the downstream impact of an application change, Terraform's workspace boundaries provide a structural risk dimension. Applications sharing a Terraform workspace share infrastructure dependencies and a common governance boundary. A change that crosses workspace boundaries (e.g., a microservice in the test workspace calling a database in the production workspace) is flagged by Atlas with elevated cross-boundary risk.

### Step 7 — Record

**How Terraform enriches this step:**
Atlas generates the application change record: what changed, what was tested, who authorised the promotion, when it reached production. When Terraform manages the test and production environments, its apply history for the relevant workspaces provides the infrastructure-layer change record. Terraform's immutable apply log — with timestamps, approver identities, and state diffs — is incorporated into the Atlas change record as the infrastructure evidence layer, producing a complete dual-layer change document.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** High. The test environment provisioning integration (Synergy UC-2) is a direct, operational touchpoint in the application change pipeline. Every Atlas-managed application change that requires a production-fidelity test environment benefits from Terraform provisioning the infrastructure layer of that environment. The combination delivers a repeatable, infrastructure-accurate test environment without manual HMC or ICIC work — which is the stated combined outcome in the Terraform positioning document.
