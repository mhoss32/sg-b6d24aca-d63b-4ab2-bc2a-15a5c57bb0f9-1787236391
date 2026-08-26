# UC-14: Change Governance & Traceability — Concert for Z Touchpoints

> **Source use case:** UC-14 Change Governance & Traceability
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Change governance and traceability is the most bidirectional Concert for Z use case. Atlas provides the change record that Concert for Z's incident investigation relies on — "what changed on this system?" is answered by Atlas. Concert for Z provides the production anomaly detection that triggers post-change change record reviews — "something changed behaviorally, find the associated change record" flows from Concert for Z to Atlas. The two products are most tightly connected here at the operational boundary between pre-production change confidence (Atlas) and production service assurance (Concert for Z).

---

## Tier 1 — Explicit Handoff Points

### Step 3 — Surface (Concert4Z → Atlas)

**What Concert for Z has produced at this point:**
Concert for Z has detected a production anomaly — a behavioral change on a system — and the incident investigation asks "what changed on this system in the last 30 days?" This is precisely the question Atlas answers from its continuous change record.

**What Concert for Z hands to Atlas:**
Concert for Z's incident investigation surfaces a production anomaly with a timestamp and affected component. Atlas is queried for the change history of that component over the relevant time window. Atlas returns a structured change record: all Atlas-executed changes (fully documented), all out-of-Atlas changes detected through Config-as-Code baseline diff (with attribution status), and any undocumented changes flagged.

**What comes back to Concert for Z:**
A structured change history that Concert for Z uses as the primary root cause analysis input — correlating the production anomaly timestamp against Atlas's change record to identify the likely responsible change. The positioning document explicitly states: Atlas "supplies change history, topology, and validation evidence as context" for Concert for Z's incident workflows. This is the most concrete and frequent expression of that relationship.

---

### Step 4 — Investigate (Concert4Z → Atlas escalation)

**What Atlas has produced at this point:**
Atlas has provided the structured change history. For changes flagged as undocumented or out-of-window, Atlas has initiated an investigation workflow.

**What Concert for Z contributes:**
If the production anomaly is confirmed as related to an undocumented change (Concert for Z's anomaly correlates with Atlas's detected undocumented change event), Concert for Z's incident record and Atlas's change investigation record are linked — creating a complete, bidirectional audit trail from production anomaly through undocumented change attribution.

---

## Tier 2 — Enrichment Touchpoints

### Step 1 — Detect

**How Concert for Z enriches this step:**
Atlas detects out-of-window changes through Config-as-Code baseline comparison. Concert for Z's Observe module detects behavioral out-of-window anomalies — production systems behaving differently than expected during non-change-window periods. The two signals are complementary: Atlas catches unauthorized configuration changes; Concert for Z catches behavioral consequences of those changes. Together, they provide bidirectional out-of-window change detection coverage.

### Step 2 — Attribute

**How Concert for Z enriches this step:**
Atlas provides change attribution for all Atlas-executed changes automatically. For out-of-Atlas changes, Atlas provides the configuration delta and timestamp. Concert for Z's behavioral change attribution (which Concert for Z-detected anomaly corresponds to which configuration delta) enriches the attribution picture — confirming that the configuration change Atlas detected actually had a behavioral consequence in production, which is the strongest evidence that the change was materially significant.

### Step 5 — Document

**How Concert for Z enriches this step:**
For retroactive documentation of emergency changes, Concert for Z's incident record for the change period provides the operational context that makes the retroactive record defensible: "this change was made during an active Concert for Z incident at 02:47; the anomaly was resolved at 03:15 following the configuration change." Linking the retroactive change record to the Concert for Z incident record creates a complete, time-stamped narrative that auditors can follow.

---

> **Overall Concert for Z relevance for this use case:** High — this is the most bidirectional Concert for Z use case. Atlas's change record is Concert for Z's primary root cause analysis evidence source, and Concert for Z's anomaly detection is the trigger that causes Atlas's change record to be queried in real-time incident investigation. The positioning document describes this relationship explicitly as the integration between pre-production change confidence and production service assurance.
