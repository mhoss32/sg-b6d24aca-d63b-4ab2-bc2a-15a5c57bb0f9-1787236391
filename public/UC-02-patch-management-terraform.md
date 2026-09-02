# UC-02: Patch Management — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-02 Patch Management
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Patch management is the scheduled, maintenance-cycle counterpart to UC-01, and its Terraform touchpoints follow the same pattern. Atlas owns the PTF selection, readiness assessment, patch plan, test execution, and evidence record. Terraform contributes at the infrastructure layer: confirming LPAR state before the maintenance window opens, providing infrastructure isolation during the patch cycle, and recording infrastructure-layer state changes. This maps to Terraform Synergy Use Case 3 — Infrastructure-Aware PTF and Patch Orchestration. Because patch management is a recurring, high-frequency workflow, the Terraform integration compounds in value over time — each maintenance window produces a new versioned infrastructure state record that builds the organisation's infrastructure audit trail.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 2 — Assess PTF Readiness

**What Atlas has produced at this point:**
Atlas has identified applicable PTFs and is generating the readiness assessment — prerequisite chain, PE flag checks, HOLD analysis, and application impact summary across target LPARs.

**What Atlas directs:**
As part of the readiness gate, Atlas directs the team to confirm that each target LPAR is in its declared infrastructure state. The team runs `terraform plan` against each LPAR workspace to surface any infrastructure drift before the maintenance window begins.

**What comes back to Atlas:**
Infrastructure parity confirmation (or a list of infrastructure drift items that must be resolved before patching can proceed). Atlas incorporates this into the readiness assessment output.

---

### Step 4 — Provision + Test

**What Atlas has produced at this point:**
Atlas is provisioning a test environment for the PTF set. In environments where Terraform manages LPAR and VM lifecycle, Atlas passes the provisioning specification to Terraform.

**What Atlas directs:**
Atlas generates the infrastructure specification for the test environment — the LPAR configuration, storage mounts, and network settings required to match the production environment at the infrastructure layer. Terraform creates the test LPAR resources from this specification.

**What comes back to Atlas:**
A Terraform-provisioned test environment with infrastructure matching the production declaration. Atlas deploys the application configuration overlay and runs the functional test suite against it.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 3 — Plan the Patch Cycle

**How Terraform enriches this step:**
When Atlas generates the sequenced patch plan, Terraform's state file provides LPAR-level infrastructure metadata — resource allocations, activation profiles, workspace assignments — that Atlas uses to assign LPARs to maintenance window slots. LPARs managed by Terraform workspaces are automatically partitioned by workspace scope, preventing Atlas from accidentally scheduling a production-workspace LPAR for the same window as a test-workspace LPAR.

### Step 6 — Execute

**How Terraform enriches this step:**
During production apply, Terraform's policy-as-code enforcement (via Terraform Enterprise Sentinel or OPA policies) can prevent non-patch infrastructure changes from being made to LPARs while a maintenance window is active. This passive enforcement eliminates a category of mid-window conflicts that can derail patch cycles.

### Step 8 — Record

**How Terraform enriches this step:**
Terraform's versioned state file produces an automatic before/after infrastructure snapshot for every LPAR that was touched during the patch cycle. This infrastructure record complements the Atlas-generated evidence package, providing a complete dual-layer audit trail — PTF changes documented by Atlas, infrastructure state documented by Terraform.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Moderate. Terraform's contribution follows the same infrastructure-gate pattern as UC-01, applied to the recurring maintenance cadence. Its value compounds over time as each patch cycle adds another versioned infrastructure state record to the audit trail. Organisations running Terraform for LPAR lifecycle management should expect this integration to reduce maintenance window failures caused by infrastructure state uncertainty.
