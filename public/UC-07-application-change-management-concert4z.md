# UC-07: Application Change Management — Concert for Z Touchpoints

> **Source use case:** UC-07 Application Change Management
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Application change management is a pre-production (Day 0/Day 1) workflow owned entirely by Atlas. Concert for Z is a Day 2 product with no direct role in the developer change cycle. However, Concert for Z's ZEN runtime data enriches Atlas's blast radius assessment, its production behavioral baselines inform Atlas's validation criteria, and the change evidence Atlas produces becomes Concert for Z's primary context for any subsequent production incident related to the deployed change.

---

## Tier 1 — Explicit Handoff Points

None. Application change management is initiated by a developer, led by Atlas, and executed in Bob PPZ. Concert for Z does not trigger this workflow and does not receive an explicit handoff during the pre-production change cycle.

The relationship inverts post-deployment: if Concert for Z detects a production anomaly after the change is promoted, it queries Atlas's change record to understand what changed. That is a Concert for Z → Atlas enrichment flow, but it is post-deployment and outside the scope of this use case's To-Be flow.

---

## Tier 2 — Enrichment Touchpoints

### Step 1 — Assess Impact

**How Concert for Z enriches this step:**
Atlas's blast radius assessment uses ZEN runtime relationship data — which programs actually called which others during recent production execution — to distinguish active call paths from dormant static relationships. ZEN is delivered through Concert for Z's observability infrastructure (IBM Z Observability Connect). When Concert for Z is deployed, Atlas's blast radius for an application change is enriched with runtime-observed execution evidence, making the impact assessment more precise and reducing false-positive blast radius entries that inflate change scope unnecessarily.

### Step 5 — Validate

**How Concert for Z enriches this step:**
Atlas provisions an isolated test environment and runs the test package. The validation criteria — what "normal" behavior looks like for the affected transactions — are informed by Concert for Z's production behavioral baselines. Where Concert for Z has established SMF-derived performance baselines for the affected CICS transactions, Atlas's post-change test evaluation can compare test results against production norms rather than against theoretical expectations. This produces a more defensible validation outcome.

### Step 6 — Deploy (post-deploy context)

**How Concert for Z enriches this step:**
Atlas's complete change evidence package — what was changed, what was tested, what the results were — is the primary artifact Concert for Z uses if a production anomaly appears after deployment. When Concert for Z detects an anomaly on a system that recently received a change, the Atlas change record (including blast radius, test results, and authorization chain) provides immediate context for the Concert for Z incident investigation. The positioning document notes: Atlas "supplies change history, topology, and validation evidence as context" for Concert for Z's operational workflows.

---

> **Overall Concert for Z relevance for this use case:** Low for explicit handoffs; moderate for enrichment. The pre-production developer workflow is entirely Atlas-owned. Concert for Z's value here is as the source of runtime data that makes Atlas's blast radius more accurate, and as the consumer of Atlas's change evidence in any subsequent production incident.
