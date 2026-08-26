# UC-09: Environment Parity & Drift Control — Concert for Z Touchpoints

> **Source use case:** UC-09 Environment Parity & Drift Control
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Environment parity and drift control is primarily Atlas-owned. However, Concert for Z's production behavioral monitoring provides a complementary signal that can surface behavioral drift before configuration drift is detected — in some cases, Concert for Z detects "something changed" (behaviorally) before Atlas confirms "here is what changed" (configurationally). The two signals together provide broader drift coverage.

---

## Tier 1 — Explicit Handoff Points

None. Drift detection, attribution, investigation, remediation, and audit are all Atlas-owned in this workflow. Concert for Z does not initiate drift control workflows and does not receive an explicit handoff from them.

---

## Tier 2 — Enrichment Touchpoints

### Step 1 — Detect

**How Concert for Z enriches this step:**
Atlas detects configuration drift by comparing current Config-as-Code state against a registered baseline. Concert for Z's Observe module detects behavioral drift — a subsystem running differently than its historical norm — which may precede or accompany configuration drift. These two detection signals are complementary:

- Configuration drift without behavioral change: likely a benign or cosmetic parameter change — lower severity.
- Behavioral drift without detected configuration change: may indicate a change that bypassed the Config-as-Code model — higher severity, warrants deeper investigation.
- Both signals present: the drift is confirmed significant.

When Concert for Z surfaces a behavioral anomaly on a system, it provides Atlas with a targeted investigation prompt — "something changed behaviorally on this LPAR at this time" — that Atlas can correlate against its configuration diff results.

### Step 3 — Surface

**How Concert for Z enriches this step:**
Atlas presents drift findings classified by risk level. Concert for Z's incident history for the affected components enriches this risk classification — a configuration drift on a system that Concert for Z has previously flagged for operational incidents is elevated in risk compared to the same drift on a stable system with no incident history. Concert for Z's production risk profile adds an operational dimension to Atlas's technical risk ranking.

---

> **Overall Concert for Z relevance for this use case:** Low-to-moderate. Concert for Z's behavioral drift signals complement Atlas's configuration drift detection, providing a combined view that catches drift both in configuration state and in operational behavior. No explicit handoff, but the complementary detection signals are a genuine portfolio advantage when both products are deployed.
