# UC-06: Change Readiness and Health Assessment — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-06 Change Readiness and Health Assessment
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Change readiness and health assessment is heavily Atlas-owned — PTF currency, configuration state, RACF posture, subsystem health, and application connectivity are all Atlas-assessed dimensions that Terraform has no visibility into. However, the infrastructure layer is one of the most operationally significant readiness dimensions, and Terraform owns that layer authoritatively. Terraform Synergy Use Case 3 — Infrastructure-Aware PTF and Patch Orchestration — describes the pre-change infrastructure gate that is directly relevant here: before any change proceeds, Terraform confirms the target LPAR is in its declared state. This makes Terraform a meaningful participant in the Tier 1 gate for every change that targets a Terraform-managed LPAR.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 3 — Health Assessment

**What Atlas has produced at this point:**
Atlas is generating the system health and change readiness assessment for the target LPAR(s). The assessment covers PTF currency, configuration gaps, RACF posture, subsystem health, and application connectivity. The infrastructure layer — the declared vs. actual state of the LPAR itself — is a readiness dimension that Atlas cannot assess from its z/OS software model alone.

**What Atlas directs:**
Atlas surfaces the infrastructure readiness check as a gate item in the health assessment: the target LPAR should be confirmed in its declared Terraform state before the change is authorised. The team runs `terraform plan` against the LPAR's workspace to confirm zero infrastructure drift.

**What comes back to Atlas:**
Terraform plan output. A clean plan (no changes) confirms infrastructure readiness. Any planned changes surface infrastructure drift that must be resolved — or accepted with documented risk — before the change proceeds. Atlas records the infrastructure readiness confirmation in the health assessment output.

---

### Step 6 — Post-Change Validation

**What Atlas has produced at this point:**
Atlas has performed the post-change health check, confirming the system is behaving as expected. Atlas may generate a pre/post state comparison (environment comparison artifact).

**What Atlas directs:**
If any infrastructure-layer changes were made as part of the change (e.g., the change required a memory increase applied via Terraform), Atlas directs the team to confirm that Terraform's apply completed successfully and that the post-change state matches the updated Terraform declaration.

**What comes back to Atlas:**
Terraform apply completion confirmation and the updated state version. Atlas incorporates this into the post-change record, completing the dual-layer documentation of what changed.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Baseline Collection

**How Terraform enriches this step:**
Terraform's state file provides structured infrastructure baseline data for each target LPAR — CPU and memory allocation, storage mounts, network adapter configuration, activation profile. Atlas incorporates this as the infrastructure baseline layer of its state collection, complementing the software-layer configuration data it collects via IZSAM and Config-as-Code.

### Step 4 — Readiness Decision

**How Terraform enriches this step:**
When Atlas surfaces blockers found during the health assessment, Terraform's workspace history provides relevant context: has this LPAR had recent infrastructure changes that could explain a configuration anomaly? Are there pending Terraform changes (planned but not yet applied) that the change owner should be aware of? Terraform's change history enriches Atlas's blocker attribution with infrastructure-layer context.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Moderate. The infrastructure readiness gate (Tier 1) is a genuine, operationally meaningful contribution — confirming that a target LPAR is in its declared infrastructure state before a change proceeds is a direct risk reduction. Terraform participates in every change readiness check for Terraform-managed LPARs. The enrichment touchpoints add infrastructure context to what is primarily an Atlas-driven assessment workflow.
