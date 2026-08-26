# UC-03: Audit and Compliance — Concert for Z Touchpoints

> **Source use case:** UC-03 Audit and Compliance
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Concert for Z is not a direct participant in the audit and compliance workflow — audit evidence collection, gap analysis, and remediation are Atlas-owned. However, Concert for Z contributes two peripheral enrichment touchpoints: its access anomaly detection signals can surface compliance gaps that Atlas then investigates, and Atlas's compliance evidence record enriches Concert for Z's operational incident context when production events involve access or configuration anomalies.

---

## Tier 1 — Explicit Handoff Points

None. Concert for Z does not initiate or receive a direct handoff in the core Audit and Compliance workflow. Audit evidence collection, RACF analysis, undocumented change detection, and remediation are all Atlas-owned capabilities that operate without Concert for Z involvement.

---

## Tier 2 — Enrichment Touchpoints

### Step 4 — Surface Gaps

**How Concert for Z enriches this step:**
Atlas surfaces undocumented changes and access anomalies (e.g., dormant SPECIAL user active outside a change window) through its Config-as-Code baseline comparison and RACF analysis. Concert for Z's Observe module provides a complementary signal: production behavioral anomalies that may correlate with unauthorized access events — unusual process activity, unexpected dataset access patterns, off-hours system events. These Concert for Z signals can direct Atlas's anomaly investigation to specific time windows and system components, making the undocumented change enumeration more targeted and complete.

### Step 7 — Monitor

**How Concert for Z enriches this step:**
Atlas monitors continuously for new compliance deviations between audit cycles. Concert for Z's continuous production monitoring provides a real-time signal layer that complements Atlas's configuration-based monitoring: where Atlas detects configuration drift, Concert for Z detects behavioral drift. The two signals together provide broader coverage — Atlas catches "what changed in the configuration," Concert for Z catches "what started behaving differently in production," and the combination narrows compliance gaps faster.

---

> **Overall Concert for Z relevance for this use case:** Low. The audit and compliance workflow is entirely Atlas-owned. Concert for Z's access anomaly and behavioral monitoring signals provide peripheral enrichment to Atlas's gap detection, but Concert for Z is not a named participant in any audit workflow step.
