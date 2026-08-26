# UC-02: Patch Management — Concert for Z Touchpoints

> **Source use case:** UC-02 Patch Management
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Patch management is one of the clearest examples of the sequential Concert for Z → Atlas workflow described in the positioning document: Concert for Z's Risk Management module detects missing critical/HIPER PTFs and initiates the change; Atlas then orchestrates the full validation workflow before production apply. Post-apply, Concert for Z's production monitoring detects any behavioral regressions the patch introduces, feeding findings back as Atlas change evidence.

---

## Tier 1 — Explicit Handoff Points

### Step 1 — Detect (Concert4Z → Atlas)

**What Concert for Z has produced at this point:**
Concert for Z's Risk Management module — powered by IZSAM (IBM Z Software Asset Management) — has identified missing critical or HIPER PTFs across the z/OS estate. It has computed blast radius across z/OS environments, flagged the operational risk, and can auto-initiate a change ticket or invoke an Ansible agent workflow for a targeted, known fix.

**What is handed to Atlas:**
The initiated change (whether a change ticket or Ansible trigger) passes to Atlas. Atlas applies full change intelligence to the planned patch batch: querying all connected LPARs for current PTF state, resolving prerequisite chains, mapping the impact of the proposed patches across subsystems and applications, and generating a sequenced patch plan. The positioning document explicitly describes this handoff: Concert for Z's Risk Management detects the maintenance need and initiates the change; Atlas orchestrates and validates it before production.

**What comes back:**
After Atlas completes the full patch cycle (Steps 2–9), the applied and validated change is recorded. Concert for Z's Risk Management module sees the operational risk as resolved and can use the Atlas change evidence in its operational record.

---

### Step 9 — Govern (Concert4Z post-apply monitoring)

**What Atlas has produced at this point:**
Atlas has generated the complete change record, attached the plan, test results, and execution log, and created the ServiceNow record.

**What Concert for Z contributes:**
In production, following patch apply, Concert for Z's Observe and Optimize modules monitor for post-patch behavioral regressions: CPU consumption changes, Db2 buffer pool behavior changes, CICS thread utilization changes. If Concert for Z detects a behavioral anomaly that correlates with the patch apply timestamp, it surfaces this as an operational finding. Atlas's change record provides Concert for Z with the exact change context for the correlation — the specific PTFs applied, the sequence, and the test evidence — enabling Concert for Z to make a faster attribution.

**What comes back to Atlas:**
If Concert for Z identifies a post-patch regression, the operational finding is the trigger for a new Atlas workflow: investigate the regression, determine whether rollback is warranted, and execute a validated rollback if needed.

---

## Tier 2 — Enrichment Touchpoints

### Step 2 — Analyze

**How Concert for Z enriches this step:**
Atlas's impact analysis maps which subsystems, applications, and transactions are affected by the proposed patch batch. Concert for Z's production performance baselines (from SMF/CDP data via OMEGAMON Data Provider) provide Atlas with the behavioral ground truth for the current environment — what normal CPU consumption, I/O rates, and transaction response times look like before the patch. This baseline data improves the specificity of Atlas's pre/post behavioral comparison during validation.

### Step 6 — Validate

**How Concert for Z enriches this step:**
Atlas runs the automated test package in the provisioned test environment. Concert for Z's ZEN data enriches the test coverage picture by identifying which production transaction flows are most active — ensuring Atlas's validation prioritizes the test scenarios that cover the highest-traffic paths, not just the statically configured topology.

---

> **Overall Concert for Z relevance for this use case:** High — this is one of the primary examples of the Concert for Z → Atlas sequential workflow. Risk Management is the detection and initiation layer; Atlas is the validation and orchestration layer. The positioning document treats this as a canonical combined workflow.
