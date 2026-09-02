# UC-09: Environment Parity and Drift Control — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-09 Environment Parity and Drift Control
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Environment parity and drift control is one of the two strongest Terraform synergy use cases in the Atlas library, directly addressed by Terraform Synergy Use Case 1 — Config-as-Code Baseline and Drift Remediation. The positioning document describes this relationship precisely: "Atlas identifies and explains configuration drift across the full z/OS stack; Terraform enforces the corrected state declaratively and prevents the drift from recurring." The two products have complementary but non-overlapping drift coverage: Atlas detects and analyses drift in the z/OS software, middleware, application, and configuration layers; Terraform detects and enforces the infrastructure layer. Together they close the full-stack drift loop that neither can close independently.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 3 — Compare Environments

**What Atlas has produced at this point:**
Atlas has collected the current state of both environments and is generating the comparison. For the infrastructure layer of each environment, Atlas has access to the software-visible configuration state but does not directly hold the declarative infrastructure specification.

**What Atlas directs:**
Atlas requests the Terraform `plan` output comparing the current state of each environment's workspace against its declared HCL configuration. This plan output becomes the infrastructure-layer diff in the Atlas environment comparison, complementing the software-layer and middleware-layer diffs Atlas produces independently.

**What comes back to Atlas:**
Infrastructure-layer diff for each environment from Terraform's plan output. Atlas incorporates this as the infrastructure section of the environment comparison artifact, producing a complete full-stack comparison rather than a software-only comparison.

---

### Step 5 — Remediate

**What Atlas has produced at this point:**
Atlas has identified the drift items requiring remediation and has generated the remediation plan. Infrastructure-layer drift items (e.g., a memory allocation was changed outside the Terraform workflow, leaving the LPAR in a configuration that differs from its HCL declaration) require Terraform to enforce the correction.

**What Atlas directs:**
For infrastructure-layer drift items, Atlas directs the team to apply the Terraform plan that restores the LPAR to its declared state. The `terraform apply` is the remediation action for those items. Atlas tracks the Terraform apply as a dependency in the overall remediation plan — configuration-layer and software-layer remediations that depend on a correct infrastructure state must follow the Terraform apply.

**What comes back to Atlas:**
Terraform apply completion confirmation for each remediated infrastructure item. Atlas marks those items as resolved and proceeds with the remaining remediations.

---

### Step 6 — Validate (Post-Remediation)

**What Atlas has produced at this point:**
Atlas is running the post-remediation comparison to confirm parity has been restored across both environments.

**What Atlas directs:**
Atlas requests a fresh `terraform plan` for each environment's workspace to confirm infrastructure parity is clean (zero planned changes). This confirms the infrastructure layer of the post-remediation validation.

**What comes back to Atlas:**
Clean `terraform plan` outputs confirming zero infrastructure drift. Atlas incorporates these into the post-remediation parity record alongside its own software-layer validation.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 1 — Trigger

**How Terraform enriches this step:**
Terraform can initiate an Atlas investigation. When Terraform detects infrastructure drift during a scheduled `terraform plan` run, it surfaces a signal — "LPAR01's infrastructure state has diverged from its declaration." This triggers Atlas to investigate whether the infrastructure drift correlates with broader configuration or software-layer drift. Terraform's detection feeds Atlas's proactive monitoring rather than waiting for a user-initiated comparison.

### Step 7 — Record

**How Terraform enriches this step:**
The parity record Atlas generates includes the configuration and software layers of the drift remediation. Terraform's state version history provides the infrastructure layer of this record — a versioned before/after snapshot of the infrastructure state for each LPAR that was remediated. Together, Atlas's change record and Terraform's state history produce a complete, dual-layer parity audit trail.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** High. This is one of the two primary synergy scenarios in the Terraform positioning document (alongside UC-10 DR validation). The full-stack drift loop cannot be closed without both products: Atlas covers the z/OS software and middleware layers; Terraform covers the infrastructure declaration layer. Organisations using both products should treat UC-09 as a combined Atlas+Terraform workflow, not two independent drift detection processes.
