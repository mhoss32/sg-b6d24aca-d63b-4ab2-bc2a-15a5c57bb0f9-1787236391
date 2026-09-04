# UC-05: Change Governance and Traceability — Composite Reference

> **New UC number:** UC-05 (formerly old UC-14)
> **Sources consolidated:** Spec (GitHub), Pain & Wows (old UC-14), Units (old UC-14), Bob PPZ, Concert for Z, Terraform

---

## Part 1 — Use Case Specification

*Version 1.0 | Owner: Product Management | Last updated: August 2026*

### Executive Summary

IBM Z organizations make hundreds of changes per month. A meaningful fraction of those changes have no associated change record, occur outside defined change windows, and cannot be attributed to a named user from the system configuration history alone. This is not a minor process gap — it is an audit finding, a regulatory risk, and the reason incidents that should take an hour to diagnose take a day. Atlas becomes the system of record for change provenance on IBM Z: every change is attributed, every change window violation is surfaced, and the gap between "what happened on z/OS" and "what the change management system knows about" closes for the first time.

### Overview

Change Governance and Traceability covers the attribution, recording, and enforcement of change governance across the IBM Z estate. It addresses a gap that runs through nearly every other use case in the Atlas library: changes happen — PTF applies, configuration updates, RACF modifications — and the governance record is incomplete. Atlas provides the change attribution and audit trail infrastructure that makes traceability reliable.

### Roadmap Status

| Scenario | Status | Target Date |
|---|---|---|
| ServiceNow Change Record Integration | **Future Opportunity** | H2 2027 |
| Undocumented Change Audit Report | **Planned** | H1 2027 |
| Change Window Enforcement | **Planned** | H2 2027 |
| Change Attribution and Rollback History | **Current (Atlas-executed changes only)** | GA Dec 2026 |

### Primary Personas

- **Quinn** — IT Operations Manager (primary): owns change governance, accountable to auditors for change records
- **Annette** — IT Operations Engineer: reviews out-of-window alerts, investigates undocumented changes
- **Derek** — Compliance Evidence Provider: uses Atlas change history as primary audit evidence
- **Zach** — z/OS Systems Programmer: primary change executor; when Zach uses Atlas, attribution is automatic

### Pillar Alignment

| Pillar | Role |
|---|---|
| **Change Intelligence** | **Primary throughout** — change attribution, record generation, ITSM integration, window enforcement |
| **System Intelligence** | **Supporting** — detects out-of-Atlas changes via Config-as-Code baseline diff |
| **Predictive Intelligence** | **Supporting** — real-time alerting for out-of-window changes and high-risk patterns |

### Lifecycle

```
Detect → Attribute → Surface → Investigate → Document → Enforce
```

### Scenario Catalog

| # | Scenario | Status |
|---|---|---|
| S1 | Change Attribution and Rollback History (Atlas-executed) | Current — GA Dec 2026 |
| S2 | Undocumented Change Audit Report | Planned — H1 2027 |
| S3 | ServiceNow Change Record Integration | Future Opportunity — H2 2027 |
| S4 | Change Window Enforcement | Planned — H2 2027 |

### AI Differentiation

- **Automatic change attribution for Atlas-executed changes** — every change is attributed, timestamped, and linked without any manual action
- **Baseline diff for undocumented change detection** — compares current Config-as-Code state against registered baseline to identify changes made outside Atlas
- **Change pattern context** — provides not just "this changed" but "this changed from X to Y, and this is the most recent Atlas-executed change to the same component"
- **Cross-change impact awareness** — identifies whether an undocumented change could have contributed to a known incident
- **Change history as query target** — "what changed on PROD1 in the last 30 days?" answered in natural language

### Related Use Cases

- UC-06 (Patch Management S2): generates the most audit-critical change records in the Atlas library; UC-05 governs them
- UC-01 (Audit and Compliance): UC-05's change attribution data and undocumented change reports are primary inputs to UC-01's evidence assembly
- UC-10 (Environment Parity): UC-10 detects that environments diverged; UC-05 determines whether it was a documented authorized change
- UC-03 (Regulatory Change Response): every regulatory remediation feeds into UC-05's governance infrastructure

---

## Part 2 — Pain & Wows Flow Analysis

> **Source:** `use-case-pain-wows/UC-14-change-governance-and-traceability.md` (old UC-14 → new UC-05)

### As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Detect changes** | A production RACF configuration change is detected during an audit. Quinn cannot tell from the SYSLOG when it happened, who made it, or whether a change record exists. The investigation takes two days and ultimately cannot be resolved. | Atlas detects the configuration change via Config-as-Code baseline diff: "RACF SETROPTS AUDIT setting changed from NONE to ALL on PROD4 on November 14 at 22:47. No corresponding change record found in Atlas change log." Quinn has all the facts in one query. |
| **2 — Attribute changes** | For Atlas-executed changes, there is no automatic attribution — engineers remember to create change records some of the time. For changes made via ISPF panels, there is no attribution mechanism at all. | For every Atlas-executed change, attribution is automatic: named user, timestamp, change type, change record template generated. For out-of-Atlas changes detected via baseline diff, Atlas surfaces the configuration delta with any available evidence (SMF user ID if present) and flags it for investigation. |
| **3 — Surface change history** | Quinn asks "what changed on PROD1 in the last 30 days?" She receives a mix of SMP/E logs, ServiceNow tickets, and email chains — from three different systems with no common format. Reconciling them takes four hours and still does not produce a complete picture. | Quinn asks Atlas "what changed on PROD1 in the last 30 days?" Atlas returns a structured change history: all Atlas-executed changes (fully attributed), all out-of-Atlas changes detected through Config-as-Code baseline diff (with available attribution), and all changes with no record flagged separately. |
| **4 — Investigate undocumented changes** | 46 changes in the last year have no corresponding change record. This is discovered during an audit review. Investigating each one requires tracking down the person who made the change, reconstructing the context, and hoping the change was not harmful. | Atlas surfaces the 46 undocumented changes as a structured audit report: component, timestamp, change type, previous value, new value, and risk classification for each. Annette can triage in order of severity — escalating the 3 high-risk items and accepting the 43 low-risk ones with documented rationale. |
| **5 — Document undocumented changes** | For authorized emergency changes that skipped the formal process, engineers write a post-hoc change record from memory weeks later. The record is incomplete and often inconsistent with what actually happened. | For authorized emergency changes detected as undocumented, Atlas pre-populates a retroactive change record template from the configuration delta evidence: what changed, when, what the previous state was. The engineer adds the business justification and links it to the relevant incident. Atlas records the retroactive documentation. |
| **6 — Generate audit report** | Derek assembles the change control evidence manually for the annual audit. He is never confident the picture is complete. The audit routinely produces findings about change records. | Atlas generates a change control audit report for any specified period: all changes with attribution status, all undocumented changes and their resolution, all out-of-window changes and their disposition. Derek delivers it to auditors as a structured, complete artifact. |

### Key Pain Points

- No automated attribution for changes made outside Atlas (ISPF, operator commands, JCL)
- Change record creation is manual and frequently skipped for emergency changes
- "What changed in the last 30 days?" requires four hours of manual reconciliation across three systems
- Undocumented changes discovered in audit reviews rather than proactively
- Post-hoc change records assembled from memory are incomplete and inconsistent

### Key Wow Moments

- "46 changes with no change record" — proactively surfaced, triaged, and documented rather than discovered in an audit
- One-query change history across all sources for any time period
- Pre-populated retroactive change record template eliminating the "write from memory" problem
- Change attribution automatic for every Atlas-executed change — no manual record creation required

---

## Part 3 — Atlas Units Estimation

> **Source:** `use-case-units/UC-14-change-governance-and-traceability-units.md` (old UC-14 → new UC-05)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |

### Per-Step Unit Estimates

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Change history query (any period) | Query | 3 | Atlas change log + Config-as-Code baseline diff |
| 2 — Undocumented change audit report | Analysis | 12 | Full baseline diff + change log cross-reference |
| 3 — Risk classification of undocumented changes | Analysis | 8 | Per-change risk assessment across detected items |
| 4 — Retroactive change record generation (per change) | Query | 2 | Template pre-population from configuration delta |
| 5 — Full change governance audit report | Artifact | 20 | Structured report for specified period |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — Change attribution query (ad hoc) | 3–5 | Simple: "what changed on PROD1 last week?" |
| S2 — Undocumented change audit report | 25–40 | Full 12-month review with risk classification |
| S3 — Change governance audit evidence package | 20–35 | Annual audit evidence generation |
| S4 — Triage + retroactive documentation of 10 items | 30–50 | Includes risk classification + 10 record templates |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Audit period length | +3–5 units per additional quarter |
| Number of undocumented changes requiring triage | +2 units per change for risk classification |
| Number of LPARs in scope | +5 units per additional LPAR for baseline diff |
| ServiceNow integration status | No impact on Atlas units; integration affects ServiceNow record creation separately |

### What Is Not Metered

- Automatic change attribution for Atlas-executed changes (built into change execution; no separate charge)
- Change log storage and retrieval (persistent in Atlas topology)
- Config-as-Code baseline diff scheduling (passive monitoring between discovery cycles)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-14-change-governance-and-traceability-bob-ppz.md`

**Overall Bob PPZ relevance: Low. Tier 1 at Step 4 (investigate — application code changes); Tier 2 at Steps 2 and 3.**

Change governance is fundamentally an Atlas-owned discipline. Bob PPZ adds value in the narrow scenario where an investigated undocumented change is an application code modification requiring code-level characterization.

**Tier 1 — Explicit Handoff Points:**

**Step 4 — Investigate (Application Code Changes):**
Atlas has surfaced an undocumented change affecting an application program. Understanding what the code change actually did requires code-level analysis. Atlas directs the investigator to Bob PPZ with the evidence: the affected program, the change timestamp, and the file-level delta if available. Bob PPZ's ZUnderstand analyzes the current state of the program and, where version history is available, the pre-change state — identifying what logic changed, what business rules were affected, and whether the change represents an authorized modification or an unauthorized one.

**What comes back:** A code-level change characterization that Atlas incorporates into the investigation record and the retroactive change documentation. This characterization is the evidence needed to determine authorization and risk.

**Step 5 — Document (Retroactive Record):**
For authorized emergency code changes, Bob PPZ contributes the application intelligence that makes the retroactive record defensible: what the program did before and after, what business logic was affected, what the risk was. A retroactive change record with a code-level summary is substantially more credible for audit purposes than one noting only "application code modified."

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Attribute:**
For out-of-Atlas application code changes detected through Config-as-Code baseline comparison, Bob PPZ enriches the attribution with code-level context: the semantic meaning of the change, its risk classification, and its relationship to other programs in the call chain.

**Step 3 — Surface:**
When Atlas presents the queryable change history, application code entries carry richer descriptions when Bob PPZ is installed: not just "ACCTVAL01 modified" but "ACCTVAL01 — account validation logic changed: fee calculation paragraph restructured."

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-14-change-governance-and-traceability-concert4z.md`

**Overall Concert for Z relevance: High — the most bidirectional Concert for Z use case. Tier 1 at Steps 3 and 4; Tier 2 at Steps 1, 2, and 5.**

Atlas's change record is Concert for Z's primary root cause analysis evidence source; Concert for Z's anomaly detection triggers Atlas's change record to be queried in real-time incident investigation.

**Tier 1 — Explicit Handoff Points:**

**Step 3 — Surface (Concert for Z → Atlas):**
Concert for Z has detected a production anomaly and the incident investigation asks "what changed on this system in the last 30 days?" Atlas is queried for the change history of that component over the relevant time window. Atlas returns a structured change record: all Atlas-executed changes, all out-of-Atlas changes detected through Config-as-Code baseline diff, and any undocumented changes flagged.

**What comes back to Concert for Z:** A structured change history that Concert for Z uses as the primary root cause analysis input — correlating the production anomaly timestamp against Atlas's change record to identify the likely responsible change.

**Step 4 — Investigate (Escalation):**
If the production anomaly correlates with an undocumented change event, Concert for Z's incident record and Atlas's change investigation record are linked — creating a complete, bidirectional audit trail from production anomaly through undocumented change attribution.

**Tier 2 — Enrichment Touchpoints:**

**Step 1 — Detect:**
Concert for Z detects behavioral out-of-window anomalies; Atlas detects configuration out-of-window changes. Together they provide bidirectional out-of-window change detection coverage.

**Step 2 — Attribute:**
Concert for Z's behavioral change attribution confirms that the configuration change Atlas detected actually had a production consequence — the strongest evidence that a change was materially significant.

**Step 5 — Document:**
Concert for Z's incident record for the change period provides operational context for retroactive change records: "this change was made during an active Concert for Z incident; the anomaly was resolved following the configuration change." Linking the retroactive record to the Concert for Z incident creates a time-stamped narrative that auditors can follow.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-14-change-governance-and-traceability-terraform.md`

**Overall Terraform relevance: High. Tier 1 at the Governance Gate and at the Terraform → Atlas Infrastructure Plan Enrichment; Tier 2 at Steps 2 and 7.**

The Atlas–Terraform governance integration is the most strategically significant touchpoint in the portfolio. The two products have complementary, non-overlapping governance models: Atlas governs z/OS software and configuration changes; Terraform governs infrastructure changes.

**Tier 1 — Explicit Handoff Points:**

**Terraform → Atlas: Infrastructure Plan Enrichment:**
Before a Terraform plan is submitted to the approval gate, the operator submits it to Atlas for enrichment. Atlas receives the Terraform plan and performs an application-layer impact analysis — every application, transaction, and subsystem that runs on the infrastructure being changed. The approver receives both the Terraform plan (infrastructure-layer precision) and the Atlas assessment (application-layer context), making the approval a genuinely informed decision.

**Step 3 — Governance Gate:**
Atlas identifies any infrastructure components of the change that are Terraform-managed and confirms that the Terraform plan for those components has been reviewed and approved before Atlas's governance gate is completed. The two governance gates are coordinated — Atlas does not authorise the z/OS software change until Terraform's infrastructure gate has been satisfied.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Atlas Records Change (Continuous):**
Terraform's immutable apply history records every infrastructure change with timestamp, operator identity, plan output, and approval record. This infrastructure change ledger complements Atlas's z/OS change ledger — together providing complete traceability across all change types.

**Step 7 — Audit Report:**
The Atlas audit report enriched with Terraform's apply history provides a combined single-document record of all changes during the audit period — z/OS software changes (Atlas) and infrastructure changes (Terraform) together.
