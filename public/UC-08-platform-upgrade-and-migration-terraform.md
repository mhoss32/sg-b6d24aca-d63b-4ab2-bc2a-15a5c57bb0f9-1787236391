# UC-08: Platform Upgrade and Migration — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-08 Platform Upgrade and Migration
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Platform upgrade and migration is the direct subject of Terraform Synergy Use Case 6 — Platform Upgrade and Migration with Infrastructure Lifecycle Management. The positioning document states this explicitly: "z/OS version upgrades and major middleware migrations are the highest-risk changes in the mainframe calendar. Atlas provides the change intelligence; Terraform manages the infrastructure lifecycle changes the upgrade requires." This is the strongest single Terraform touchpoint in the Atlas use case library. Atlas and Terraform each own a clearly distinct and non-overlapping half of a major upgrade project: Atlas owns software compatibility analysis, sequencing, and validation; Terraform owns infrastructure resource changes, staged workspace promotion, and rollback. Neither product can deliver the full upgrade workflow alone.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Phase 1 — Assess (Compatibility Impact Sweep)

**What Atlas has produced at this point:**
Atlas has generated the full compatibility impact assessment — all applications, configurations, and subsystems that are affected by the target z/OS or middleware version. Within this assessment, Atlas identifies infrastructure resource requirements for the new release: memory increases required by the new z/OS version, storage allocation changes, CPU entitlement adjustments that IBM recommends for the target release.

**What Atlas directs:**
Atlas passes the infrastructure resource requirement delta to Terraform as a set of proposed HCL changes to the LPAR workspace — memory increase from X to Y, storage volume additions, activation profile updates. Terraform generates a plan output showing exactly what infrastructure changes are needed and their dependencies. This becomes part of the pre-upgrade planning record.

**What comes back to Atlas:**
A Terraform plan confirming the infrastructure changes required for the upgrade. Atlas incorporates this as the infrastructure change scope in the upgrade plan.

---

### Phase 4 — Provision (per test phase)

**What Atlas has produced at this point:**
Atlas is provisioning an isolated test environment at the current version for each phase. In environments where Terraform manages LPAR lifecycle, Atlas passes the phase-specific infrastructure specification to Terraform for provisioning.

**What Atlas directs:**
Atlas provides the infrastructure specification for the phase test environment. Terraform provisions the LPAR resources — matching the production declaration for the phase scope — in an isolated workspace that prevents the test environment from affecting production. Terraform enforces workspace isolation and configures the LPAR lifecycle to tear down the environment after the phase validation is complete.

**What comes back to Atlas:**
A Terraform-provisioned phase test environment. Atlas applies the upgrade to the test environment and runs the regression test suite.

---

### Phase 7 — Promote (per phase)

**What Atlas has produced at this point:**
A phase has passed regression testing and Atlas is authorising promotion to the next environment. If the upgrade requires infrastructure resource changes on the target LPAR (e.g., the production LPAR needs a memory increase before the new z/OS version is applied), those changes must be applied via Terraform before the phase promotion proceeds.

**What Atlas directs:**
Atlas directs the team to apply the Terraform infrastructure changes for the target LPAR before Atlas proceeds with the software upgrade for that phase. The Terraform apply is a hard prerequisite to Atlas's production phase promotion.

**What comes back to Atlas:**
Terraform apply confirmation for the target LPAR. Atlas proceeds with the phase promotion, knowing the infrastructure is in the correct state for the new software version.

---

### Rollback

**What Atlas has produced at this point:**
A production phase has failed and Atlas has generated a rollback plan. The rollback may include reverting infrastructure resource changes (e.g., the memory increase applied in preparation for the new z/OS version needs to be reverted if the upgrade is abandoned).

**What Atlas directs:**
Atlas directs the team to revert the Terraform workspace to the pre-upgrade state, restoring the LPAR infrastructure specification to its prior version.

**What comes back to Atlas:**
Terraform state restored to the pre-upgrade baseline. Atlas confirms infrastructure rollback and updates the upgrade plan with the rollback record.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Phase 2 — Sequence

**How Terraform enriches this step:**
Terraform's workspace structure — which LPARs are in which workspaces, and what the workspace promotion order is — provides a ready-made staging sequence that Atlas can align its upgrade sequencing with. Upgrades that follow the Terraform workspace promotion order (dev → test → QA → production) are naturally sequenced in a way that Terraform can enforce at the infrastructure layer.

### Phase 8 — Monitor

**How Terraform enriches this step:**
Post-upgrade, Terraform surfaces any infrastructure drift that emerged during the upgrade cycle — configuration adjustments made outside the Terraform workflow that need to be reconciled with the declared state. Atlas monitors behavioral and software-layer changes; Terraform monitors infrastructure-layer drift. Together they provide comprehensive post-upgrade change surveillance across both layers.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** High. This is the use case the Terraform positioning document explicitly calls out as a primary synergy scenario. Atlas and Terraform each own distinct, non-overlapping halves of a major upgrade project. Organisations planning z/OS version upgrades or major middleware migrations with both products deployed should treat this as a coordinated workflow from the start of planning, not a post-hoc integration.
