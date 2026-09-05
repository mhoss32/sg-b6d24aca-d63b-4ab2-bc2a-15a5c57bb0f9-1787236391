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

> **Pillar:** Change Intelligence (primary) + System Intelligence (undocumented change detection) + Predictive Intelligence (real-time alerting)
> **GA Status:** GA Dec 2026 (Atlas-executed changes); H2 2027 (full estate monitoring + ServiceNow integration)
> **Source:** `use-case-pain-wows/UC-14-change-governance-and-traceability.md` (old UC-14 → new UC-05)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Detect
**Brief:** Identify that a change has occurred on IBM Z — whether through a planned Atlas-executed change, an ITSM-recorded change, or a configuration modification that occurred outside any change control process.

**Personas involved:** Quinn, Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | No visibility into changes that occurred outside change windows unless a human notices a behavioral difference or an auditor flags it. | 💼 Business Impact — out-of-window changes are invisible until they cause an incident or surface in an audit review |
| Annette | No automated detection for out-of-window changes — the only signal is a behavioral symptom or an escalation after the fact. | 💼 Business Impact — out-of-window changes accumulate silently between incident post-mortems |
| Zach | Changes made through ISPF panels, operator commands, SMP/E, and JCL do not integrate with ServiceNow or ITSM systems — the gap between what happened and what the change system knows is built into the tooling. | 💼 Business Impact — the process gap is structural: the execution tools and the change recording tools are entirely separate |

---

#### Step 2 — Attribute
**Brief:** For every change detected, determine who made it, when, what system it affected, and whether there is an authorized change record.

**Personas involved:** Quinn, Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | A meaningful fraction of all IBM Z configuration changes have no associated change record — discovered in audit reviews, not proactively. | 💼 Business Impact — change record completeness is unknown until the audit investigation; the gap is not measurable in real time |
| Zach | Change records for his work are a separate manual step after executing the change — a step that gets skipped under time pressure, especially for emergency changes. | ⏱️ Lost Time — **15–30 minutes per change** of separate retrospective documentation effort; gets skipped under pressure |
| Annette | No automated attribution for out-of-Atlas changes — investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate. | 🔒 Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without Zach's expert log interpretation |

---

#### Step 3 — Surface
**Brief:** Present the complete picture of change activity — what was documented, what was undocumented, what was out of window — in a queryable form.

**Personas involved:** Quinn, Annette, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | When an incident post-mortem asks "what changed on this system in the last 30 days?", answering requires reviewing multiple logs manually across multiple tools. | ⏱️ Lost Time — **hours** reconstructing the 30-day change history for a single post-mortem investigation |
| Derek | Change record completeness for IBM Z — the foundational evidence for SOX IT General Controls — is consistently the most labor-intensive section of audit prep. | ⏱️ Lost Time — **days** assembling change history evidence per audit cycle |
| Derek | The gap between "what actually happened on z/OS" and "what the change management system knows about" is consistently a source of audit findings. | 💼 Business Impact — audit findings for undocumented changes are a predictable, recurring cost |

---

#### Step 4 — Investigate
**Brief:** For undocumented or out-of-window changes, conduct the investigation — was this authorized? An emergency change with a missing record? An unauthorized modification?

**Personas involved:** Annette, Zach, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Closing incidents requires a complete audit trail — assembling it manually from memory and multiple tool queries under time pressure is a routine frustration. | ⏱️ Lost Time — **hours per incident** assembling the audit trail manually under time pressure |
| Quinn | Emergency changes frequently get change records created after the fact or miss the record entirely — process compliance relies entirely on individual discipline, with no enforcement mechanism. | 💼 Business Impact — emergency change governance is a process requirement, but enforcement is entirely behavioral |
| Zach | When an incident post-mortem asks what changed, Zach must review multiple logs manually — time that should have been preventable. | ⏱️ Lost Time — **hours per post-mortem** reviewing change history manually |

---

#### Step 5 — Document
**Brief:** Create or complete the change record — either at the time of change (best practice) or retroactively for undocumented changes that were actually authorized.

**Personas involved:** Zach, Annette, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Rollback history is not tied to individual changes — if a change needs to be reversed, the pre-change state must be reconstructed from memory and exports. | 💼 Business Impact — unplanned rollback under time pressure is expensive and error-prone when the pre-change state is not documented |
| Quinn | Retroactive change record creation for emergency changes is informal — no structured workflow, no template, no consistency between engineers. | 💼 Business Impact — retroactive records created without a structured process are inconsistent and less defensible in audit |

---

#### Step 6 — Enforce
**Brief:** Maintain ongoing change window compliance and change record completeness — proactively, not reactively.

**Personas involved:** Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | Discovering "46 changes in the past year have no change record" in an audit is an audit finding, a relationship risk, and a remediation obligation — none of which are preventable without automated detection. | 💼 Business Impact — annual audit finding for undocumented changes is a predictable, recurring cost that is preventable with automated monitoring |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Detect
**Brief:** Every Atlas-executed change is automatically attributed and timestamped at the moment of execution. Out-of-Atlas changes are detected by comparing current Config-as-Code state against the last registered baseline.

**Personas involved:** Quinn, Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | Out-of-window change alerts in real time — Atlas detects changes outside defined change windows and alerts Quinn immediately, not in the next post-mortem. | 🤖 Atlas AI Insight & Automation — continuous change window monitoring surfaces violations as they occur |
| Annette | Undocumented changes detected automatically through Config-as-Code baseline diff — Annette receives a structured alert, not a behavioral symptom. | 🤖 Atlas AI Insight & Automation — Config-as-Code diff against registered baseline is the mechanism no individual tool can replicate |

---

#### Step 2 — Attribute
**Brief:** For Atlas-executed changes, attribution is automatic and complete. For out-of-Atlas changes, Atlas provides the configuration delta, timestamp, and affected components immediately.

**Personas involved:** Zach, Annette, Quinn

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Change records created without a separate step — for every change Zach executes through Atlas, the change record is generated and populated automatically as part of the workflow. | ⏱️ Time Saving — **15–30 minutes per change of retrospective documentation → automatic at execution** |
| Annette | Out-of-Atlas change investigation starts with Atlas's evidence — configuration delta, timestamp, affected component, and user ID — immediately available without log archaeology. | 🆕 New User Capability — Annette independently investigates undocumented changes using Atlas's attribution data without Zach's expert log interpretation |

---

#### Step 3 — Surface
**Brief:** Atlas provides a complete, queryable change history — "what changed on PROD1 in the last 30 days?" answered in a structured Atlas response.

**Personas involved:** Quinn, Annette, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | "What changed on PROD1 in the last 30 days?" answered from Atlas in a structured response — replaces multi-tool log review with a single conversation. | ⏱️ Time Saving — **hours of multi-tool log review → a single Atlas query** |
| Derek | Change traceability evidence for any time period generated from Atlas — all changes, with attribution status (documented / undocumented / out-of-window) — in the format auditors need. | ⏱️ Time Saving — **days assembling change history evidence → generated from Atlas's continuous record** |
| Derek | "46 undocumented changes" — surfaced before the auditor sees them. A specific, verifiable count rather than a gap discovered in the audit room. | 🤖 Atlas AI Insight & Automation — undocumented change enumeration is only possible through Atlas's combined change log and Config-as-Code baseline diff |

---

#### Step 4 — Investigate
**Brief:** Atlas provides a structured starting point for each investigation — evidence pre-assembled. The human decides: authorized? Emergency change with missing record? Unauthorized?

**Personas involved:** Annette, Zach, Quinn

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Incident audit trail generated automatically for every Atlas-managed change — Annette closes incidents with a complete, continuous record rather than assembling it under pressure. | ⏱️ Time Saving — **hours per incident of manual audit trail assembly → automatic continuous trail** |
| Zach | When an incident post-mortem asks what changed, Zach queries Atlas — structured change history available without multi-tool log review. | ⏱️ Time Saving — **hours of post-mortem log review → single Atlas query** |

---

#### Step 5 — Document
**Brief:** For undocumented changes that were actually authorized (emergency changes with verbal approval), Atlas provides a structured retroactive documentation workflow. For unauthorized changes, Atlas routes to security investigation.

**Personas involved:** Annette, Quinn, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | Structured retroactive documentation workflow for emergency changes — consistent, template-driven, with Atlas linking the retroactive record to the detected change. | 🤖 Atlas AI Insight & Automation — Atlas generates the retroactive change record template pre-populated from the detected change data |
| Zach | Every Atlas-executed change has its pre-change state captured — rollback planning starts from a known, documented state, not from reconstructed memory. | 🆕 New User Capability — Zach independently plans rollbacks from Atlas's captured pre-change state without reconstructing the previous configuration |

---

#### Step 6 — Enforce
**Brief:** Every Atlas-executed change is automatically documented. Every undocumented out-of-Atlas change is surfaced within one discovery cycle. ServiceNow integration (H2 2027) closes the loop.

**Personas involved:** Quinn, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | Change record coverage goes from ~60% to 100% for Atlas-executed changes — the audit finding for undocumented changes drops from 46 per year to under 5. | ⏱️ Time Saving — annual audit finding remediation effort drops proportionally with change record coverage improvement |
| Quinn | ServiceNow integration (H2 2027): Atlas changes create ServiceNow records automatically — bi-directional, no manual step in either system. | 🤖 Atlas AI Insight & Automation — Atlas-to-ServiceNow integration closes the structural tool gap that was the root cause of undocumented changes |

---

> **Overall outcome:** Change record coverage for Atlas-executed changes reaches 100% automatically. Undocumented changes detected within one discovery cycle — not discovered at the next annual audit. Post-mortem change history investigations shift from hours of multi-tool log review to a single Atlas query.

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
