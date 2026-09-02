# UC-14: Change Governance and Traceability — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-14 Change Governance and Traceability
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Change governance and traceability is the Atlas use case most directly aligned with Terraform's core design philosophy. Terraform Synergy Use Case 4 — GitOps Change Governance with AI-Assisted Impact Analysis — is a precise description of the combined Atlas+Terraform governance story: Terraform provides the plan-approve-apply infrastructure governance gate with an immutable audit log; Atlas enriches the Terraform plan with application-layer impact context that makes approvals informed rather than mechanical. This is not a narrow touchpoint — it is a foundational integration between the two products' governance models. Atlas governs the z/OS change lifecycle; Terraform governs the infrastructure change lifecycle. Together they produce a complete, dual-layer change governance record that spans every layer of the IBM Z environment.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Terraform → Atlas: Infrastructure Plan Enrichment

**What Terraform has produced:**
Terraform generates a plan output describing exactly what infrastructure changes will be made — which LPARs, which VMs, which resources, what the before and after state will be. The plan is accurate at the infrastructure layer but does not explain what z/OS applications, middleware, and workloads sit on top of the infrastructure being changed, or what would break if those infrastructure changes produced an unexpected result.

**What Terraform directs:**
Before a Terraform plan is submitted to the approval gate, the operator submits it to Atlas for enrichment. Atlas receives the Terraform plan and performs an application-layer impact analysis — traversing its topology model to identify every application, transaction, and subsystem that runs on the infrastructure being changed, and producing a plain-language impact summary for approvers.

**What comes back to Terraform (and the approver):**
An Atlas impact assessment for the infrastructure change: which applications are at risk, what the blast radius would be if the change has an unexpected effect, what the change history is for the affected systems, and whether the proposed change conflicts with any known compliance baselines. The approver receives both the Terraform plan (infrastructure-layer precision) and the Atlas assessment (application-layer context), making the approval a genuinely informed decision.

---

### Step 3 — Governance Gate

**What Atlas has produced at this point:**
A change is at a CAB gate and Atlas has prepared the change summary for review. The change may include infrastructure components that are governed through Terraform's plan-approve-apply workflow in addition to the z/OS software changes governed through Atlas.

**What Atlas directs:**
Atlas identifies any infrastructure components of the change that are Terraform-managed and confirms that the Terraform plan for those components has been reviewed and approved through the Terraform workflow before Atlas's governance gate is completed. The two governance gates are coordinated — Atlas does not authorise the z/OS software change until Terraform's infrastructure gate has been satisfied.

**What comes back to Atlas:**
Terraform approval confirmation for the infrastructure components. Atlas incorporates this into the overall change authorisation record, producing a combined governance record that documents approval of both the software change (via Atlas) and the infrastructure change (via Terraform).

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Atlas Records Change (Continuous)

**How Terraform enriches this step:**
Terraform's immutable apply history is a parallel change ledger that records every infrastructure change: timestamp, operator identity, plan output, state before and after, and approval record. This infrastructure change ledger complements Atlas's z/OS change ledger. When an auditor or compliance team reviews the full change history for a system, they receive both ledgers — Atlas's record of software and configuration changes, and Terraform's record of infrastructure changes — providing complete traceability across all change types.

### Step 7 — Audit Report

**How Terraform enriches this step:**
The change governance audit report Atlas generates covers z/OS software changes managed through the Atlas workflow. When Terraform manages the infrastructure layer, the Atlas audit report is enriched with Terraform's apply history — providing a combined, single-document record of all changes made across both the z/OS software stack (Atlas) and the infrastructure layer (Terraform) during the audit period. This combined record is more defensible under regulatory examination than two separate product-scoped records.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** High. The Atlas–Terraform governance integration is the most strategically significant touchpoint in the portfolio. The two products have complementary, non-overlapping governance models: Atlas governs z/OS software and configuration changes; Terraform governs infrastructure changes. The combined governance record — Atlas's change ledger plus Terraform's apply history — provides full-stack change traceability that neither product produces alone. Organisations subject to change management regulations (SOX ITGC, PCI-DSS change management requirements, DORA ICT change management) should treat Atlas and Terraform as complementary governance layers, not competing audit tools.
