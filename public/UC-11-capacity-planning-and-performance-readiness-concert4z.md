# UC-11: Capacity Planning & Performance Readiness — Concert for Z Touchpoints

> **Source use case:** UC-11 Capacity Planning & Performance Readiness
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

This is the highest Concert for Z relevance use case outside of patch/upgrade management. Concert for Z's Optimize module — performance degradation analysis, root cause analysis, and capacity management — is the Day 2 complement to Atlas's capacity planning and pre-event performance readiness. The workflow is sequential and bidirectional: Concert for Z detects a production performance issue and initiates the change workflow; Atlas plans, provisions, tests, and validates the fix before production apply. Concert for Z's production performance data is also the primary source for Atlas's capacity modelling.

---

## Tier 1 — Explicit Handoff Points

### Step 1 — Detect (Concert4Z → Atlas)

**What Concert for Z has produced at this point:**
Concert for Z's Optimize module has detected a production performance degradation — a Db2 buffer pool approaching saturation, a CICS MXT being repeatedly hit under peak load, an MQ queue depth trending toward the depth limit — or has identified an approaching capacity constraint through its performance analytics. Concert for Z surfaces this as an operational finding with root-cause attribution and may recommend a configuration change or capacity increase.

**What is handed to Atlas:**
Concert for Z's performance finding triggers an Atlas capacity planning workflow. Atlas takes the identified constraint and applies change intelligence: modelling the risk for the affected event, projecting transaction volume against current configuration, identifying the specific configuration change required, and generating a validated remediation plan. The positioning document describes this pattern: Concert for Z "detects, understands, and remediates IBM Z operational issues when the system is running" — and initiates changes that Atlas then orchestrates and validates.

**What comes back:**
After Atlas plans, provisions, tests, and validates the configuration change (Steps 2–5), the validated change is returned for production apply (Step 5). Concert for Z's post-apply monitoring (Step 6) detects whether the change resolved the performance constraint or introduced a regression.

---

### Step 6 — Monitor (Atlas ↔ Concert4Z)

**What Atlas has produced at this point:**
Atlas has applied the validated configuration change and registered the new behavioral baseline. Atlas monitors for post-change performance regressions.

**What Concert for Z contributes:**
Concert for Z's Observe module provides the continuous production monitoring that surfaces post-change regressions. If the configuration change resolves the constraint but inadvertently creates a new one (a larger buffer pool consuming memory that triggers a WLM policy adjustment), Concert for Z detects the new behavioral anomaly and surfaces it. Atlas correlates the anomaly to the specific configuration change event, attributing the regression to the responsible change.

**What comes back to Atlas:**
A post-apply regression finding from Concert for Z becomes the trigger for a new Atlas workflow — investigate the regression, adjust the configuration, re-validate.

---

## Tier 2 — Enrichment Touchpoints

### Step 2 — Diagnose

**How Concert for Z enriches this step:**
Atlas identifies root cause within one conversation for a reported performance degradation. Concert for Z's Optimize module has already done significant diagnostic work in production — SMF-derived performance analysis, WLM policy evaluation, cross-subsystem performance correlation. When Concert for Z hands off to Atlas, it passes its diagnostic findings as the starting context, reducing Atlas's root-cause investigation to confirmation and scope-expansion rather than starting from scratch.

### Step 3 — Size

**How Concert for Z enriches this step:**
Atlas's capacity risk modelling projects transaction volume against current configuration and identifies constraints. The transaction volume data that Atlas projects from comes from Concert for Z's SMF/CDP pipeline — real production workload data, not theoretical estimates. This makes Atlas's peak event capacity model grounded in actual workload history rather than rule-of-thumb approximations.

Concert for Z's positioning within the "Appendix C: IBM Z AIOps portfolio landscape" explicitly identifies IBM IntelliMagic Vision (connected to Concert for Z's data pipeline) as providing "performance and capacity context" that can "inform Atlas change-impact assessment and validation baselines."

### Step 5 — Apply

**How Concert for Z enriches this step:**
Atlas generates the production configuration change plan and Change Intelligence executes it. The management-readable capacity readiness summary that Atlas generates for Quinn's approval is enriched with Concert for Z's production performance evidence — the actual SMF data showing the constraint, the trend line, and the projected improvement — making Quinn's approval decision grounded in production data rather than Atlas's modelled projection alone.

---

> **Overall Concert for Z relevance for this use case:** Very high — the highest of all 14 use cases for Concert4Z. Capacity planning and performance readiness is where the Day 2 (Concert for Z) → Day 0/1 (Atlas) sequential workflow is most natural and most valuable. Concert for Z detects production performance issues; Atlas validates the fix before it touches production. The SMF/CDP data pipeline that Concert for Z manages is Atlas's primary source for capacity modelling.
