# UC-10: Disaster Recovery Validation — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-10 Disaster Recovery Validation
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Disaster recovery validation is the second of the two primary Terraform synergy scenarios in the positioning document, addressed directly by Terraform Synergy Use Case 5 — Disaster Recovery Environment Readiness and Parity Validation. The positioning document states the combined outcome explicitly: "Terraform keeps the DR infrastructure declaration in sync; Atlas keeps the full z/OS stack in sync and provides the readiness evidence." Atlas and Terraform again occupy complementary, non-overlapping roles: Atlas detects and quantifies drift across the full z/OS stack (PTF currency, middleware configuration, application connectivity, RACF state); Terraform enforces that the DR infrastructure matches the production infrastructure declaration from a single HCL source of truth. The result is a DR readiness posture that is continuously maintained rather than periodically tested.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 2 — Assess DR Parity (Configuration and PTF State)

**What Atlas has produced at this point:**
Atlas is collecting the current state of both production and DR environments to compare them. For the infrastructure layer of both environments, Terraform holds the authoritative declared specification.

**What Atlas directs:**
Atlas requests the Terraform state diff between the production workspace and the DR workspace. This diff represents the infrastructure-layer parity gap between production and DR — any CPU, memory, storage, or network configuration differences that Terraform has detected between the two workspace declarations.

**What comes back to Atlas:**
Terraform's production-vs-DR workspace state diff. Atlas incorporates this as the infrastructure-layer parity finding in the overall production-vs-DR comparison artifact, alongside its own z/OS software, PTF, and configuration layer comparisons.

---

### Step 5 — Validate Functional Equivalence

**What Atlas has produced at this point:**
Atlas is provisioning a DR test environment and generating the functional test suite to validate that the DR environment can serve production transactions equivalently.

**What Atlas directs:**
Atlas passes the DR test environment specification to Terraform. Terraform provisions the DR test infrastructure using the same workspace declaration as the production environment, ensuring the test environment reflects both the production infrastructure state and the DR LPAR configuration. This confirms that the test environment is a valid proxy for a real failover scenario.

**What comes back to Atlas:**
A Terraform-provisioned DR test environment with production-equivalent infrastructure. Atlas runs the functional equivalence test suite against it.

---

### Step 5 — Post-Resync Re-Provisioning (If Required)

**What Atlas has produced at this point:**
Atlas has identified significant DR drift and the DR remediation plan includes re-provisioning the DR infrastructure to match the current production declaration.

**What Atlas directs:**
Atlas directs the team to apply the current production Terraform workspace configuration to the DR workspace. This re-syncs the DR infrastructure to match the production declaration as the foundation for subsequent software and configuration layer remediations.

**What comes back to Atlas:**
Confirmed DR infrastructure re-sync from Terraform. Atlas proceeds with the software and middleware layer remediations on top of the corrected infrastructure baseline.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 1 — Trigger

**How Terraform enriches this step:**
Terraform's scheduled `terraform plan` against the DR workspace surfaces infrastructure-layer drift between the production declaration and the DR environment. When Terraform detects DR infrastructure drift, this serves as a trigger signal for Atlas to investigate whether the infrastructure drift correlates with broader z/OS stack drift. Terraform's detection reduces the interval between DR drift occurring and the full-stack investigation beginning.

### Step 6 — Record DR Validation

**How Terraform enriches this step:**
The DR validation evidence package Atlas generates documents the z/OS software, PTF, configuration, and functional equivalence layers of DR readiness. Terraform's workspace state comparison — the infrastructure-layer evidence that both production and DR are running from equivalent HCL declarations — complements the Atlas evidence package. Together they produce a complete, auditor-visible DR readiness record spanning infrastructure and software layers, which is increasingly required by financial services regulations (DORA, FSOC) that mandate documented DR capability across all system layers.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** High. DR validation is one of the two primary synergy scenarios in the Terraform positioning document and one of the strongest cross-product stories in the IBM Z portfolio. Terraform and Atlas address genuinely different layers of DR readiness — neither product alone provides the complete picture. Regulatory DR requirements increasingly demand evidence across both infrastructure and application layers, making the combined Atlas + Terraform DR validation record more defensible than either product's evidence alone.
