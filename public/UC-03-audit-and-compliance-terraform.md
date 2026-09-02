# UC-03: Audit and Compliance — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-03 Audit and Compliance
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Audit and compliance is one of the strongest Terraform touchpoint use cases in the Atlas library. Terraform Synergy Use Case 4 — GitOps Change Governance with AI-Assisted Impact Analysis — describes exactly this interaction: Atlas enriches Terraform's plan-approve-apply audit log with application-layer compliance context, while Terraform contributes its immutable infrastructure change record to Atlas's evidence package. Additionally, Synergy Use Case 1 — Config-as-Code Baseline and Drift Remediation — is directly relevant: Terraform's HCL declarations function as an authoritative infrastructure baseline, and Atlas's comparison of live state against that baseline is a core compliance evidence source. The combination produces a complete, dual-layer audit trail spanning infrastructure (Terraform) and z/OS middleware, configuration, and application layers (Atlas).

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 3 — Assess Configuration State

**What Atlas has produced at this point:**
Atlas is collecting current configuration state across all in-scope systems to evaluate against compliance baselines. For LPAR-level infrastructure settings (CPU entitlement, memory, activation profiles, storage definitions, network definitions), Terraform's state file is an authoritative and structured source.

**What Atlas directs:**
Atlas requests the current Terraform workspace state for each in-scope LPAR as part of its configuration collection sweep. The team exports the relevant workspace state snapshots for Atlas to ingest as part of the infrastructure layer of the compliance assessment.

**What comes back to Atlas:**
Terraform state snapshots providing a structured, versioned record of the declared infrastructure configuration for each in-scope LPAR. Atlas incorporates this as the infrastructure evidence layer in the compliance assessment.

---

### Step 5 — Generate Evidence Package

**What Atlas has produced at this point:**
Atlas has assembled all compliance evidence — configuration snapshots, control mappings, PTF currency records, RACF findings — into the evidence package. Atlas identifies that the infrastructure layer of the evidence requires formal documentation of the declared vs. actual infrastructure state.

**What Atlas directs:**
The team is directed to include Terraform's apply history (plan → approve → apply log) for each in-scope LPAR in the evidence package. Terraform's immutable audit log documents every infrastructure change made during the compliance period, with timestamps, approver identities, and before/after state diffs.

**What comes back to Atlas:**
Terraform apply history records. Atlas incorporates them as the infrastructure change evidence layer of the evidence package, producing a complete dual-layer compliance record.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Scope the Compliance Assessment

**How Terraform enriches this step:**
Terraform workspace assignments define the infrastructure boundaries of the compliance scope. When Atlas identifies which systems are in scope for a given regulation, Terraform's workspace structure provides a clean, auditable boundary — systems in the "production" workspace are automatically in scope; systems in the "development" workspace are out of scope. This structural scoping reduces manual boundary negotiation during audit preparation.

### Step 7 — Ongoing Compliance Monitoring

**How Terraform enriches this step:**
Between audit cycles, Terraform's `terraform plan` output on a scheduled basis surfaces infrastructure-layer drift from the declared baseline. When Terraform detects infrastructure drift, it provides Atlas with a targeted signal: "this LPAR's infrastructure state has changed." Atlas investigates whether the infrastructure change has a corresponding compliance implication (e.g., a memory increase that violated a resource constraint control). Terraform's drift detection feeds Atlas's continuous compliance monitoring without duplicating the effort.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** High. Terraform contributes both an explicit evidence source (infrastructure change audit log) and a complementary compliance monitoring capability (infrastructure drift detection). In organisations subject to regulations that require documented evidence of infrastructure configuration state and change management (SOX IT controls, PCI-DSS Req 1 and 2, NIST CM-8), Terraform's contribution to the Atlas evidence package is material and auditor-visible.
