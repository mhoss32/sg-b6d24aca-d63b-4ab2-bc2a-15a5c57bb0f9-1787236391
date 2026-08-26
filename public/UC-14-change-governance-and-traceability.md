# UC-14: Change Governance & Traceability — Pain Points, Wows & Flow Analysis

> **Pillar:** Change Intelligence (primary) + System Intelligence (undocumented change detection) + Predictive Intelligence (real-time alerting)
> **GA Status:** GA Dec 2026 (Atlas-executed changes); H2 2027 (full estate monitoring + ServiceNow integration)

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Detect
**Brief:** Identify that a change has occurred on IBM Z — whether through a planned Atlas-executed change, an ITSM-recorded change, or a configuration modification that occurred outside any change control process.

**Personas involved:** Quinn, Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | No visibility into changes that occurred outside change windows unless a human notices a behavioral difference or an auditor flags it. | 💼 Business Impact — out-of-window changes are invisible until they cause an incident or surface in an audit review |
| Annette | No automated detection for out-of-window changes — the only signal is a behavioral symptom or an escalation after the fact. | 💼 Business Impact — out-of-window changes accumulate silently between incident post-mortems |
| Zach | Changes made through ISPF panels, operator commands, SMP/E, and JCL do not integrate with ServiceNow or ITSM systems — the gap between what happened and what the change system knows is built into the tooling. | 💼 Business Impact — the process gap is structural: the execution tools and the change recording tools are entirely separate |

---

### Step 2 — Attribute
**Brief:** For every change detected, determine who made it, when, what system it affected, and whether there is an authorized change record.

**Personas involved:** Quinn, Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | A meaningful fraction of all IBM Z configuration changes have no associated change record — discovered in audit reviews, not proactively. | 💼 Business Impact — change record completeness is unknown until the audit investigation; the gap is not measurable in real time |
| Zach | Change records for his work are a separate manual step after executing the change — a step that gets skipped under time pressure, especially for emergency changes. | ⏱️ Lost Time — **15–30 minutes per change** of separate retrospective documentation effort; gets skipped under pressure |
| Annette | No automated attribution for out-of-Atlas changes — investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate. | 🔒 Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without Zach's expert log interpretation |

---

### Step 3 — Surface
**Brief:** Present the complete picture of change activity — what was documented, what was undocumented, what was out of window — in a queryable form.

**Personas involved:** Quinn, Annette, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | When an incident post-mortem asks "what changed on this system in the last 30 days?", answering requires reviewing multiple logs manually across multiple tools. | ⏱️ Lost Time — **hours** reconstructing the 30-day change history for a single post-mortem investigation |
| Derek | Change record completeness for IBM Z — the foundational evidence for SOX IT General Controls — is consistently the most labor-intensive section of audit prep. | ⏱️ Lost Time — **days** assembling change history evidence per audit cycle |
| Derek | The gap between "what actually happened on z/OS" and "what the change management system knows about" is consistently a source of audit findings. | 💼 Business Impact — audit findings for undocumented changes are a predictable, recurring cost |

---

### Step 4 — Investigate
**Brief:** For undocumented or out-of-window changes, conduct the investigation — was this authorized? An emergency change with a missing record? An unauthorized modification?

**Personas involved:** Annette, Zach, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Closing incidents requires a complete audit trail — assembling it manually from memory and multiple tool queries under time pressure is a routine frustration. | ⏱️ Lost Time — **hours per incident** assembling the audit trail manually under time pressure |
| Quinn | Emergency changes frequently get change records created after the fact or miss the record entirely — process compliance relies entirely on individual discipline, with no enforcement mechanism. | 💼 Business Impact — emergency change governance is a process requirement, but enforcement is entirely behavioral |
| Zach | When an incident post-mortem asks what changed, Zach must review multiple logs manually — time that should have been preventable. | ⏱️ Lost Time — **hours per post-mortem** reviewing change history manually |

---

### Step 5 — Document
**Brief:** Create or complete the change record — either at the time of change (best practice) or retroactively for undocumented changes that were actually authorized.

**Personas involved:** Zach, Annette, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Rollback history is not tied to individual changes — if a change needs to be reversed, the pre-change state must be reconstructed from memory and exports. | 💼 Business Impact — unplanned rollback under time pressure is expensive and error-prone when the pre-change state is not documented |
| Quinn | Retroactive change record creation for emergency changes is informal — no structured workflow, no template, no consistency between engineers. | 💼 Business Impact — retroactive records created without a structured process are inconsistent and less defensible in audit |

---

### Step 6 — Enforce
**Brief:** Maintain ongoing change window compliance and change record completeness — proactively, not reactively.

**Personas involved:** Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Quinn | Discovering "46 changes in the past year have no change record" in an audit is an audit finding, a relationship risk, and a remediation obligation — none of which are preventable without automated detection. | 💼 Business Impact — annual audit finding for undocumented changes is a predictable, recurring cost that is preventable with automated monitoring |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Detect
**Brief:** Every Atlas-executed change is automatically attributed and timestamped at the moment of execution. Out-of-Atlas changes are detected by comparing current Config-as-Code state against the last registered baseline.

**Personas involved:** Quinn, Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | Out-of-window change alerts in real time — Atlas detects changes outside defined change windows and alerts Quinn immediately, not in the next post-mortem. | 🤖 Atlas AI Insight & Automation — continuous change window monitoring surfaces violations as they occur |
| Annette | Undocumented changes detected automatically through Config-as-Code baseline diff — Annette receives a structured alert, not a behavioral symptom. | 🤖 Atlas AI Insight & Automation — Config-as-Code diff against registered baseline is the mechanism no individual tool can replicate |

---

### Step 2 — Attribute
**Brief:** For Atlas-executed changes, attribution is automatic and complete. For out-of-Atlas changes, Atlas provides the configuration delta, timestamp, and affected components immediately.

**Personas involved:** Zach, Annette, Quinn

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Change records created without a separate step — for every change Zach executes through Atlas, the change record is generated and populated automatically as part of the workflow. | ⏱️ Time Saving — **15–30 minutes per change of retrospective documentation → automatic at execution** |
| Annette | Out-of-Atlas change investigation starts with Atlas's evidence — configuration delta, timestamp, affected component, and user ID — immediately available without log archaeology. | 🆕 New User Capability — Annette independently investigates undocumented changes using Atlas's attribution data without Zach's expert log interpretation |

---

### Step 3 — Surface
**Brief:** Atlas provides a complete, queryable change history — "what changed on PROD1 in the last 30 days?" answered in a structured Atlas response.

**Personas involved:** Quinn, Annette, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | "What changed on PROD1 in the last 30 days?" answered from Atlas in a structured response — replaces multi-tool log review with a single conversation. | ⏱️ Time Saving — **hours of multi-tool log review → a single Atlas query** |
| Derek | Change traceability evidence for any time period generated from Atlas — all changes, with attribution status (documented / undocumented / out-of-window) — in the format auditors need. | ⏱️ Time Saving — **days assembling change history evidence → generated from Atlas's continuous record** |
| Derek | "46 undocumented changes" — surfaced before the auditor sees them. A specific, verifiable count rather than a gap discovered in the audit room. | 🤖 Atlas AI Insight & Automation — undocumented change enumeration is only possible through Atlas's combined change log and Config-as-Code baseline diff |

---

### Step 4 — Investigate
**Brief:** Atlas provides a structured starting point for each investigation — evidence pre-assembled. The human decides: authorized? Emergency change with missing record? Unauthorized?

**Personas involved:** Annette, Zach, Quinn

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Incident audit trail generated automatically for every Atlas-managed change — Annette closes incidents with a complete, continuous record rather than assembling it under pressure. | ⏱️ Time Saving — **hours per incident of manual audit trail assembly → automatic continuous trail** |
| Zach | When an incident post-mortem asks what changed, Zach queries Atlas — structured change history available without multi-tool log review. | ⏱️ Time Saving — **hours of post-mortem log review → single Atlas query** |

---

### Step 5 — Document
**Brief:** For undocumented changes that were actually authorized (emergency changes with verbal approval), Atlas provides a structured retroactive documentation workflow. For unauthorized changes, Atlas routes to security investigation.

**Personas involved:** Annette, Quinn, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | Structured retroactive documentation workflow for emergency changes — consistent, template-driven, with Atlas linking the retroactive record to the detected change. | 🤖 Atlas AI Insight & Automation — Atlas generates the retroactive change record template pre-populated from the detected change data |
| Zach | Every Atlas-executed change has its pre-change state captured — rollback planning starts from a known, documented state, not from reconstructed memory. | 🆕 New User Capability — Zach independently plans rollbacks from Atlas's captured pre-change state without reconstructing the previous configuration |

---

### Step 6 — Enforce
**Brief:** Every Atlas-executed change is automatically documented. Every undocumented out-of-Atlas change is surfaced within one discovery cycle. ServiceNow integration (H2 2027) closes the loop.

**Personas involved:** Quinn, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Quinn | Change record coverage goes from ~60% to 100% for Atlas-executed changes — the audit finding for undocumented changes drops from 46 per year to under 5. | ⏱️ Time Saving — annual audit finding remediation effort drops proportionally with change record coverage improvement |
| Quinn | ServiceNow integration (H2 2027): Atlas changes create ServiceNow records automatically — bi-directional, no manual step in either system. | 🤖 Atlas AI Insight & Automation — Atlas-to-ServiceNow integration closes the structural tool gap that was the root cause of undocumented changes |

---

> **Overall outcome:** Change record coverage for Atlas-executed changes reaches 100% automatically. Undocumented changes detected within one discovery cycle — not discovered at the next annual audit. Post-mortem change history investigations shift from hours of multi-tool log review to a single Atlas query.
