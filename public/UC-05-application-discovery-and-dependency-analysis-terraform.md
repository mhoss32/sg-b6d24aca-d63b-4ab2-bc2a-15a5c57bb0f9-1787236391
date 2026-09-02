# UC-05: Application Discovery and Dependency Analysis — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-05 Application Discovery and Dependency Analysis
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Application discovery and dependency analysis is almost entirely an Atlas-owned capability. Terraform does not perform application discovery, does not understand z/OS middleware topology, and does not traverse application-to-subsystem dependency graphs. However, Terraform Synergy Use Case 6 — Platform Upgrade and Migration with Infrastructure Lifecycle Management — establishes that Atlas's topology model is the foundation for upgrade and migration work that Terraform also participates in. At the discovery layer, Terraform's state file contributes a structured infrastructure inventory that enriches the Atlas topology model's LPAR-level layer, without replacing any of the application or middleware discovery that Atlas uniquely performs.

---

## Tier 1 — Explicit Handoff Points

None. Application discovery, dependency graph construction, impact analysis, and discovery report generation are Atlas capabilities with no Terraform equivalent. Terraform does not initiate discovery workflows and is not directed to perform discovery tasks.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Discover

**How Terraform enriches this step:**
Atlas collects the environment inventory from multiple sources: IZSAM Lite, Config-as-Code, ZUnderstand, and LPAR topology feeds. In organisations where Terraform manages LPAR lifecycle, the Terraform state file provides a structured, versioned record of each LPAR's declared infrastructure specification — CPU, memory, storage mounts, network adapters, activation profile. Atlas can ingest this as the infrastructure layer of the inventory, complementing the software-layer discovery it performs via IZSAM and ZUnderstand. The result is an inventory that spans both the infrastructure-as-declared (Terraform) and the software-as-running (Atlas) views.

### Step 4 — Analyze Impact

**How Terraform enriches this step:**
When Atlas performs a change impact analysis — what would be affected if this component changed — the Terraform workspace boundaries provide a structural risk partition. Applications and subsystems that share a Terraform workspace are more likely to share infrastructure dependencies. Applications in separate workspaces have a formal infrastructure boundary between them. Atlas can use workspace boundaries as a risk modifier: cross-workspace impact is likely to involve a broader set of stakeholders and a higher change governance bar.

### Step 5 — Generate Report

**How Terraform enriches this step:**
The application discovery and dependency report Atlas generates is enriched when Terraform's workspace structure is visible: each LPAR in the topology report can be annotated with its Terraform workspace name, its last-applied state version, and whether it currently has pending infrastructure drift. This infrastructure metadata makes the discovery report more actionable for architects planning changes, who can immediately see which parts of the topology are infrastructure-managed and what the IaC workflow for changes to those LPARs looks like.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Low-to-moderate. Terraform does not perform application discovery and is not involved in the core dependency analysis workflow. Its enrichment contribution — infrastructure metadata for the LPAR layer of the topology model — is genuine but secondary to Atlas's primary discovery capability. The value is highest in organisations where Terraform manages a significant portion of the LPAR estate and where infrastructure-layer context in the discovery report is actionable for the architecture team.
