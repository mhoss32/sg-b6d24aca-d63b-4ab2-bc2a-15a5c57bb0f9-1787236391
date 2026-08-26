# UC-04: Staff Onboarding — Concert for Z Touchpoints

> **Source use case:** UC-04 Staff Onboarding
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

**No Concert for Z touchpoint in this use case.**

Staff onboarding is a pre-production orientation workflow. Concert for Z is a Day 2 (production operations) product — its anomaly detection, incident response, and service assurance capabilities are not relevant to the process of orienting a new team member to the environment, assessing open risks, or guiding a first production change. The workflow is entirely Atlas-owned.

---

## Tier 1 — Explicit Handoff Points

None. The onboarding workflow does not interact with Concert for Z at any step.

---

## Tier 2 — Enrichment Touchpoints

One peripheral enrichment scenario exists: when Atlas provides new team members with a risk assessment of their area of ownership (Step 3), Concert for Z's operational incident history for those systems provides context — "Application X has had 3 production incidents in the last 6 months related to CICS thread exhaustion." This historical incident data enriches the risk picture Atlas presents to a new team member. However, this is indirect context rather than a named integration point.

---

> **Overall Concert for Z relevance for this use case:** None within the core workflow. Staff onboarding is a pre-production, Atlas-led orientation process. Concert for Z's operational history is peripheral background context at most.
