# UC-13: Regulatory Change Response — Concert for Z Touchpoints

> **Source use case:** UC-13 Regulatory Change Response
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Concert for Z's access anomaly detection is a meaningful upstream trigger for regulatory change workflows: when Concert for Z detects a privileged user accessing regulated data outside normal patterns, this surfaces as a security finding that triggers a regulatory investigation and remediation workflow in Atlas. The enrichment relationship is also relevant — Concert for Z's continuous access monitoring provides the compliance posture signal between formal regulatory remediation cycles.

---

## Tier 1 — Explicit Handoff Points

### Step 1 — Discover / Step 2 — Assess (Concert4Z → Atlas)

**What Concert for Z has produced at this point:**
Concert for Z's Observe module has detected an access anomaly: a user or process accessing regulated data in a pattern that deviates from their historical norm — off-hours access, unusual dataset access volume, a dormant privileged account becoming active. This anomaly is surfaced as a Concert for Z operational finding.

**What is handed to Atlas:**
The access anomaly triggers an Atlas regulatory investigation. Atlas scopes the affected regulated data components — which datasets, tables, and programs are involved — and assesses whether the anomaly represents a compliance gap that requires formal regulatory remediation: RACF profile updates, access control tightening, audit trail configuration. Atlas transitions into a regulatory change response workflow (Steps 1–6) from the Concert for Z-detected access finding.

**What comes back:**
After Atlas completes the regulatory remediation (Steps 3–5), the remediation record — what was changed, what controls are now in place, the compliance evidence — is recorded in Atlas's continuous record. Concert for Z's monitoring sees the access anomaly pattern resolved and can consume Atlas's remediation record as operational context for subsequent access monitoring.

---

## Tier 2 — Enrichment Touchpoints

### Step 2 — Assess

**How Concert for Z enriches this step:**
Atlas maps access control gaps across RACF profiles, Db2 access controls, and application access in a unified assessment. Concert for Z's continuous access monitoring provides the behavioral dimension of this assessment — not just "what are the RACF settings for this dataset" (configuration) but "who has actually been accessing this dataset, when, and how often" (behavior). This behavioral access picture is the difference between a theoretical access control gap (RACF permits access but it has never been used) and an active access risk (RACF permits access and it is being used).

### Step 6 — Monitor

**How Concert for Z enriches this step:**
Atlas monitors continuously for new regulated data, access control drift, and encryption configuration changes. Concert for Z's continuous access monitoring provides the behavioral complement — detecting when regulated data is being accessed in ways that Atlas's configuration monitoring cannot catch. A new application program that begins accessing a regulated dataset (behavioral access not matched by a configuration change) is detected by Concert for Z and surfaces as a new regulated scope item for Atlas to assess.

---

> **Overall Concert for Z relevance for this use case:** Moderate. Concert for Z's access anomaly detection is a genuine upstream trigger for regulatory investigations, and its continuous behavioral monitoring provides coverage for access pattern changes that Atlas's configuration-based monitoring alone would miss. Most relevant for data privacy and access control compliance (GDPR, CCPA, PCI DSS) rather than purely infrastructure-level regulations.
