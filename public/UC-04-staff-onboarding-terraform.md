# UC-04: Staff Onboarding — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-04 Staff Onboarding
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Staff onboarding has no direct Terraform synergy use case in the positioning document. The six defined synergy use cases address infrastructure-layer workflows (drift remediation, provisioning, patch orchestration, change governance, DR, and platform upgrades) — none of which apply to the knowledge transfer and guided exploration patterns that characterise UC-04. Terraform does not contribute knowledge base content, onboarding materials, or guided exploration capabilities.

There is one narrow enrichment touchpoint: when a new hire's role includes responsibility for Terraform-managed LPARs, Atlas's environment context document (generated in Step 2) can incorporate the Terraform workspace structure as part of the infrastructure-layer overview — helping the new hire understand which LPARs are Terraform-managed, what their workspace assignments are, and what the infrastructure-as-code workflow looks like for those LPARs.

---

## Tier 1 — Explicit Handoff Points

None. Onboarding content generation, guided exploration, task delegation, and knowledge refresh are all Atlas capabilities. Terraform has no role in generating onboarding content, answering new hire questions, or producing task execution guidance.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Generate Environment Context

**How Terraform enriches this step:**
When Atlas generates the environment context document for a new hire whose responsibilities include Terraform-managed infrastructure, the Terraform workspace structure provides a structured layer of infrastructure metadata. Atlas can describe not just "which LPARs you are responsible for" but also "which of those LPARs are managed declaratively via Terraform, what their workspace names are, and what the IaC change process looks like for infrastructure-level changes to those systems." This makes the environment context document more complete for hires who will interface with both Atlas and Terraform workflows.

### Step 5 — Task Delegation

**How Terraform enriches this step:**
When a senior engineer delegates an infrastructure-related task to a new hire (e.g., reviewing a Terraform plan for a proposed LPAR configuration change), Atlas's task delegation guidance can incorporate the Terraform workflow context — explaining what a `terraform plan` output shows, what needs to be reviewed before approval, and how the approved change is applied. Atlas provides the application-layer impact context; Terraform provides the infrastructure-layer plan. A new hire seeing both together has a more complete picture of the change they are being asked to review.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Low. No direct synergy use case applies. The enrichment touchpoints are narrow — useful in organisations where new hires will work across both Atlas and Terraform workflows, but not a meaningful standalone contribution to the onboarding use case. Terraform's value in this use case is incidental to its infrastructure management role, not a purposeful touchpoint.
