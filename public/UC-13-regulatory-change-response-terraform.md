# UC-13: Regulatory Change Response — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-13 Regulatory Change Response
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Regulatory change response shares significant structural overlap with UC-03 (Audit and Compliance) from a Terraform perspective. The primary relevant synergy is Terraform Synergy Use Case 4 — GitOps Change Governance with AI-Assisted Impact Analysis — and Synergy Use Case 1 — Config-as-Code Baseline and Drift Remediation. When a new regulation requires infrastructure-layer changes (for example, a new data residency requirement mandating specific network topology changes, or a new encryption standard requiring storage configuration updates), Terraform's declarative enforcement model is how those infrastructure changes are made in a governed, auditable, and persistent way. Atlas assesses the gap and generates the response plan; Terraform enforces the infrastructure-layer elements of the response.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 4 — Response Plan

**What Atlas has produced at this point:**
Atlas has completed the regulatory gap assessment and generated the phased response plan. Within the response plan, Atlas has identified infrastructure-layer changes required by the new regulation — for example, network topology changes required by a data residency rule, or storage encryption configuration changes required by a new cryptographic standard.

**What Atlas directs:**
Atlas identifies the infrastructure-layer items in the response plan and directs the team to implement them through the Terraform workflow. The required infrastructure changes are expressed as proposed modifications to the relevant LPAR or VM workspace HCL declarations. Terraform's plan-approve-apply process governs the implementation, providing the approval gate and the immutable apply log that the evidence package requires.

**What comes back to Atlas:**
Terraform apply records for each infrastructure-layer change in the response plan. Atlas marks those items as implemented and incorporates the Terraform apply records into the response evidence.

---

### Step 5 — Implement Changes

**What Atlas has produced at this point:**
Atlas is executing the response plan. Infrastructure-layer implementation items have been handed to Terraform. Atlas is tracking completion across all response items — software changes, configuration changes, and infrastructure changes.

**What Atlas directs:**
Atlas monitors the Terraform apply status for each infrastructure change item. When Terraform applies a change, Atlas receives confirmation and updates the response plan tracking. If Terraform detects a policy violation (the proposed infrastructure change violates a Terraform Enterprise Sentinel or OPA policy), Atlas is informed and the response plan is updated to reflect the blocked item.

**What comes back to Atlas:**
Apply confirmation or policy-block notification for each Terraform-managed response item. Atlas incorporates both outcomes into the evidence record — a blocked Terraform apply is itself documented evidence that a proposed change was rejected by policy enforcement, which is relevant to the compliance record.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 3 — Gap Assessment

**How Terraform enriches this step:**
When Atlas assesses the current infrastructure state against the new regulatory requirement, Terraform's state file provides the authoritative record of the current declared infrastructure configuration. For infrastructure-layer compliance dimensions (network segmentation, storage encryption, resource isolation), Terraform's state is the ground truth. Atlas uses this as the infrastructure baseline for the gap assessment rather than inferring infrastructure state from z/OS software observations.

### Step 6 — Generate Compliance Evidence

**How Terraform enriches this step:**
The regulatory compliance evidence package Atlas generates is enriched by Terraform's apply history for the infrastructure-layer response items. Terraform's immutable log — with timestamps, approver identities, plan outputs, and state diffs — provides auditor-visible evidence that each infrastructure change was reviewed and approved before being applied. For regulations that require documented evidence of infrastructure change governance (not just the end state), Terraform's apply log is material evidence that Atlas cannot generate from its own change record alone.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Moderate. Terraform's contribution is most significant when the regulatory change includes infrastructure-layer requirements (network topology, storage configuration, resource isolation). For regulations that are entirely z/OS software and configuration layer (RACF settings, cryptographic parameter changes, PTF currency), Terraform has limited direct involvement. As regulatory frameworks increasingly include cloud and infrastructure requirements (DORA's operational resilience requirements, for example), the overlap between regulatory mandates and Terraform-managed infrastructure will grow.
