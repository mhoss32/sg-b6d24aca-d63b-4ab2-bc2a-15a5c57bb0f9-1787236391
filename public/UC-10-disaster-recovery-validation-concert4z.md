# UC-10: Disaster Recovery Validation — Concert for Z Touchpoints

> **Source use case:** UC-10 Disaster Recovery Validation
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Concert for Z's production service topology and behavioral baselines enrich Atlas's DR validation in two meaningful ways: the production service model informs the DR assessment's business-service-criticality ranking, and Atlas's DR simulation results provide Concert for Z with a pre-tested operational baseline for DR environments. There is no upstream Concert for Z trigger for DR validation, but the enrichment relationship is material for business-service-critical DR readiness assessment.

---

## Tier 1 — Explicit Handoff Points

None. DR validation is initiated by Greg (infrastructure engineer) on a scheduled or triggered basis, led entirely by Atlas. Concert for Z does not trigger DR validation workflows.

---

## Tier 2 — Enrichment Touchpoints

### Step 1 — Assess

**How Concert for Z enriches this step:**
Atlas produces a complete DR vs. production diff — every configuration, PTF, RACF, and subsystem difference enumerated with severity classification. Concert for Z's business service topology (derived from ZEN runtime transaction flows and service impact modeling) enriches the severity classification with business service context:

- A missing RACF group on a DR LPAR that serves a high-criticality payment service (as identified by Concert for Z's service topology) is a higher-severity finding than the same gap on a system serving a low-traffic internal batch process.
- Concert for Z's service impact model translates Atlas's technical diff items into business-service-level risk rankings, helping Greg prioritize DR remediations by business impact rather than purely technical severity.

### Step 4 — Simulate

**How Concert for Z enriches this step:**
Atlas provisions an isolated DR environment and runs production-level transaction load to certify DR readiness. Concert for Z's production transaction volume data (SMF-derived via OMEGAMON Data Provider) provides the production load profile that Atlas uses for the simulation — ensuring the simulated load matches what production actually experiences, not a theoretical peak estimate.

The positioning document notes Atlas uses "streaming CDP/SMF data" to "establish behavioral baselines, select validation criteria, and compare pre-change and post-change behavior." Concert for Z's data pipeline is the source of this production behavioral data.

### Step 5 — Record

**How Concert for Z enriches this step:**
Atlas generates complete DR readiness documentation for regulatory compliance purposes. Concert for Z's post-DR-test operational monitoring provides the production-behavior complement — after a DR test, Concert for Z can confirm that the DR environment's behavioral profile during the test matched production norms, providing an additional evidence dimension for DORA and SOX DR compliance documentation.

---

> **Overall Concert for Z relevance for this use case:** Moderate for enrichment. Concert for Z's production service topology and behavioral data materially improve the business-service-criticality ranking of DR findings and the accuracy of DR simulation load profiles. No explicit handoff, but the enrichment is substantive for organizations where business service criticality is a primary DR prioritization driver.
