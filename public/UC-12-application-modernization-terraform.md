# UC-12: Application Modernization — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-12 Application Modernization
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Application modernization has direct touchpoints with Terraform in two synergy scenarios. Synergy Use Case 2 — On-Demand Test Environment Provisioning — is relevant because modernization validation requires both a legacy environment (the current state) and a modernized environment (the target architecture) to be provisioned simultaneously for equivalence testing. Terraform manages the lifecycle of both. Synergy Use Case 6 — Platform Upgrade and Migration — is partially relevant when modernization involves migrating to a new infrastructure architecture (e.g., containerisation requiring LinuxONE VM provisioning). In organisations running LinuxONE containers, Terraform's LinuxONE VM provisioning capability is directly relevant to the modernization target environment.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 4 — Provision Test Environments (Legacy and Target)

**What Atlas has produced at this point:**
Atlas has completed the modernization assessment and plan. Equivalence testing requires two simultaneous test environments: one at the current (legacy) architecture and one at the target (modernized) architecture. Both environments must have infrastructure-accurate specifications for the equivalence test results to be valid.

**What Atlas directs:**
Atlas passes two infrastructure specifications to Terraform:
1. A legacy environment specification derived from the current production LPAR state (for the pre-modernization baseline).
2. A target environment specification describing the infrastructure required for the modernized architecture (for the post-modernization target).

Terraform provisions both environments in isolated workspaces, enforces the workspace boundary between them (preventing test traffic crossing between legacy and modernized layers), and manages their lifecycle through the modernization test cycle.

**What comes back to Atlas:**
Both environments provisioned and confirmed. Atlas deploys the legacy application stack to the legacy environment and the modernized application to the target environment, then runs the functional and equivalence tests across both.

---

### Step 7 — Promote

**What Atlas has produced at this point:**
The modernized application has passed equivalence testing and Atlas is promoting it to the next stage in the pipeline. In environments where the modernization target is a new infrastructure type (e.g., a LinuxONE VM for containerised components), Terraform provisions the target infrastructure for each promotion stage.

**What Atlas directs:**
Atlas provides the modernized component's infrastructure requirements for the promotion stage. Terraform provisions the VM or LPAR resources in the correct workspace for that stage, enforces the promotion lifecycle (destroying the previous stage environment after promotion confirmation), and produces the infrastructure apply log for the promotion record.

**What comes back to Atlas:**
Terraform-provisioned promotion environment. Atlas deploys the modernized component and runs post-promotion validation.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 1 — Assess Modernization Scope

**How Terraform enriches this step:**
Terraform's workspace structure reveals which LPARs and VMs are currently Terraform-managed and what their declared infrastructure specifications are. This informs the modernization readiness assessment: components running on Terraform-managed infrastructure have a cleaner path to modernization (infrastructure changes are declarative, versioned, and reversible) than components running on manually configured infrastructure. The modernization assessment can factor in Terraform coverage as a positive modernization readiness indicator.

### Step 6 — Validate Equivalence

**How Terraform enriches this step:**
The equivalence comparison Atlas generates compares the behaviour of the legacy and modernized components across all test scenarios. When both environments are Terraform-provisioned from their respective declarations, the infrastructure layer of each environment is controlled and reproducible — eliminating infrastructure variance as a confounding factor in the equivalence comparison. The comparison results are more trustworthy because the infrastructure baseline is known-identical between test runs.

### Step 8 — Record

**How Terraform enriches this step:**
The modernization evidence package Atlas generates is enriched by Terraform's workspace history: the lifecycle of the legacy environment (provisioned, used, decommissioned), the lifecycle of the target environment (provisioned, validated, promoted), and the infrastructure specifications of both. This provides a complete infrastructure audit trail for the modernization project alongside Atlas's software-layer evidence.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Moderate-to-high. The dual-environment provisioning for equivalence testing (Tier 1) is a strong and direct integration point — simultaneously running a legacy and a modernized environment for comparison requires precisely the kind of infrastructure lifecycle management that Terraform provides. In organisations modernizing toward LinuxONE containers or VM-based architectures, Terraform's LinuxONE provisioning capability makes it a required component of the modernization infrastructure pipeline, not just a convenience.
