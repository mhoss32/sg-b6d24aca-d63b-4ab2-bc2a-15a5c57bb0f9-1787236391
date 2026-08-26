# UC-06: Change Readiness & Health Assessment — Concert for Z Touchpoints

> **Source use case:** UC-06 Change Readiness & Health Assessment
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Concert for Z's Risk Management module is a natural upstream trigger for change readiness assessments: it detects operational risks (approaching certificate expiry, missing critical maintenance, capacity constraints) and can initiate a review or change. Atlas performs the full health assessment. In the other direction, Concert for Z's production performance baselines and ZEN data meaningfully enrich the quality of Atlas's health check — particularly compound risk identification that requires joining production behavioral data with configuration state.

---

## Tier 1 — Explicit Handoff Points

### Step 1 — Scope (Concert4Z → Atlas)

**What Concert for Z has produced at this point:**
Concert for Z's Risk Management module has detected one of several operational risk categories that warrant a pre-event health assessment: a certificate approaching expiry, a cluster of missing critical maintenance updates, or a capacity threshold being approached ahead of a peak event. Concert for Z's Risk Management can initiate a change ticket or flag the risk for review.

**What is handed to Atlas:**
The operational risk flag triggers an Atlas health assessment workflow scoped to the affected component(s). Where Concert for Z's Risk Management identifies "missing critical PTFs on LPAR PROD1," Atlas scopes the full health check: PTF currency, configuration compliance, RACF posture, and compound risks across the middleware stack. Concert for Z's detection is specific; Atlas's assessment is comprehensive.

**What comes back:**
Atlas returns a structured health assessment artifact — findings ranked by severity, compound risks identified, remediation paths generated. Concert for Z's Risk Management module sees the operational risk addressed when Atlas's remediation is complete.

---

## Tier 2 — Enrichment Touchpoints

### Step 2 — Assess

**How Concert for Z enriches this step:**
Atlas joins PTF currency, configuration compliance, security posture, and performance constraints across all scoped components. Concert for Z's production performance data (SMF/CDP via OMEGAMON Data Provider) provides the production behavioral baselines that enrich Atlas's performance constraint assessment:

- **Current utilization baselines:** How close is the CICS MXT to its limit under current production load? Concert for Z's real-time monitoring data provides this, making Atlas's constraint assessment specific rather than theoretical.
- **Behavioral trend data:** Concert for Z's Optimize module surfaces performance trends — a Db2 buffer pool that has been trending toward saturation over the past 3 months. Atlas's health assessment incorporates this trend as a forward-looking health finding, not just a point-in-time snapshot.
- **ZEN service context:** Concert for Z's ZEN data provides the business service attribution that elevates health findings from technical severity to business impact — a CICS thread constraint on a region that serves a high-criticality payment transaction is ranked higher than the same constraint on a low-traffic batch region.

### Step 3 — Rank Findings

**How Concert for Z enriches this step:**
Atlas ranks findings by severity and identifies compound risks. Concert for Z's production anomaly history provides one additional dimension for ranking: findings that correlate with past production incidents are elevated in severity. A configuration deviation that has previously caused or contributed to a Concert for Z-detected production incident is higher priority than a deviation with no incident history — even if the technical severity is the same.

### Step 6 — Register Baseline

**How Concert for Z enriches this step:**
After assessment and remediation, Atlas registers the current state as the health baseline for ongoing drift monitoring. Concert for Z's production monitoring provides the behavioral baseline complement — Atlas captures the configuration baseline; Concert for Z captures the behavioral baseline. Together, they form a complete pre-event reference point: any subsequent drift (configuration or behavioral) is detected against both baselines.

---

> **Overall Concert for Z relevance for this use case:** Moderate-to-high. Risk Management is a genuine upstream trigger for health assessments, and the production behavioral data Concert for Z provides materially improves Atlas's compound risk identification and finding prioritization. The positioning document explicitly names the sequential workflow: Concert for Z detects risk, initiates change, Atlas validates it.
