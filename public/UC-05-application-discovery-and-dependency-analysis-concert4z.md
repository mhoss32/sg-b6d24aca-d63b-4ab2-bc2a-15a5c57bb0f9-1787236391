# UC-05: Application Discovery & Dependency Analysis — Concert for Z Touchpoints

> **Source use case:** UC-05 Application Discovery & Dependency Analysis
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Application discovery and dependency analysis is one of the richest ZEN-enrichment use cases. Concert for Z's ZEN runtime application relationship data is a direct complement to Atlas's static topology traversal — ZEN shows which programs actually communicated with each other during execution, not just which are statically configured to do so. This enrichment is passive but material: it improves the accuracy of every dependency map Atlas produces.

---

## Tier 1 — Explicit Handoff Points

None. Application discovery and dependency analysis is Atlas-initiated and Atlas-led. Concert for Z does not trigger this workflow and does not receive an explicit handoff from it.

---

## Tier 2 — Enrichment Touchpoints

### Step 2 — Traverse

**How Concert for Z enriches this step:**
Atlas traverses the dependency graph using ZUnderstand static analysis (program call relationships from source and configuration artifacts) and, when available, ZEN runtime data. ZEN is delivered through Concert for Z's observability platform (IBM Z Observability Connect / ZOC) — collecting OpenTelemetry trace spans from z/OS system software including CICS, IMS, Db2, and MQ. 

When Concert for Z is installed, Atlas can consume ZEN data to enrich the traversal:
- **Runtime-observed program flows:** ZEN shows which CICS transactions actually called which programs during the observation period — complementing static analysis with evidence of which call paths are actively exercised.
- **Cross-component transaction flows:** ZEN traces transactions as they move across CICS regions, Db2 subsystems, and MQ queues — providing the cross-subsystem relationship picture that static analysis alone cannot produce for dynamic, runtime-dispatched calls.
- **Active vs. dormant relationships:** A static relationship that has not been observed in ZEN data over months may represent dead code or an inactive interface — relevant for modernization scoping (UC-12) and for blast radius accuracy.

The positioning document explicitly states: "Atlas can use ZEN data to strengthen application discovery by adding runtime-observed flows as a complementary discovery method alongside Z Understand static analysis."

### Step 3 — Map Dependencies

**How Concert for Z enriches this step:**
The dependency map Atlas produces includes connection types for each relationship. When ZEN data is available from Concert for Z, connection types are enriched with runtime evidence — "statically configured AND runtime-observed" vs. "statically configured only" — giving architects and developers a confidence indicator for each relationship in the map.

### Step 4 — Surface Risks

**How Concert for Z enriches this step:**
Concert for Z's business service topology (derived from ZEN transaction flows and service impact modeling) provides the business service attribution that enriches Atlas's risk surface. When Atlas identifies a deprecated API on a connected component, Concert for Z's service model can surface which business services depend on that component — elevating the risk classification for deprecated constructs that sit on high-criticality business service paths.

### Step 5 — Deliver

**How Concert for Z enriches this step:**
When the dependency map is delivered for change planning, Concert for Z's incident history for the identified components provides operational risk context — whether the dependent systems have recent production incidents, which components have historically been unstable, and which paths have caused outages. This operational history enriches the architecture review artifact that Atlas produces.

---

> **Overall Concert for Z relevance for this use case:** High for enrichment. ZEN is a core data source for Atlas's dependency traversal, and Concert for Z is the product that delivers ZEN. The positioning document explicitly names this enrichment relationship. No explicit handoff, but the data relationship is fundamental to the quality of Atlas's dependency analysis for runtime-active applications.
