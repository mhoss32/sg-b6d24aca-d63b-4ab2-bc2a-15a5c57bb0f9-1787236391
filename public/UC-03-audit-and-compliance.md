# UC-03: Audit and Compliance — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (primary) + Change Intelligence (remediation) + Predictive Intelligence (anomaly detection)
> **GA Status:** GA Dec 2026

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Scope
**Brief:** The audit cycle opens. Derek defines what evidence is needed and begins identifying which systems, frameworks, and time periods are in scope.

**Personas involved:** Derek, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Derek | Scoping an IBM Z audit requires coordinating with Zach, Sage, and multiple subsystem teams just to understand what evidence is available — no unified inventory. | ⏱️ Lost Time — **1–3 days** to understand what evidence can even be assembled |
| Derek | Does not have deep z/OS technical expertise; translating audit requirements into system queries requires escalating to Zach or Sage for every domain. | 🔒 Skill Gap / Bottleneck — Derek cannot self-serve any z/OS evidence without expert support |

---

### Step 2 — Collect
**Brief:** Assemble evidence from RACF, change logs, SMP/E records, configuration exports, and ITSM systems.

**Personas involved:** Derek, Sage, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Privileged access reports require manually querying RACF across each LPAR and consolidating results by hand. For a 6-LPAR estate, this is a multi-day task. | ⏱️ Lost Time — **3–5 business days** for multi-LPAR RACF evidence collection |
| Zach | Configuration compliance requires experienced engineers comparing PARMLIB exports in spreadsheets — no automated diff against a defined baseline. | ⏱️ Lost Time — **2–4 days** of manual configuration comparison work |
| Derek | Change history requires reconciling system logs, change management tickets, and SMP/E records — only intersects cleanly when change management discipline has been consistent. | ⏱️ Lost Time — **3–5 days** of cross-system evidence assembly |

---

### Step 3 — Analyze
**Brief:** Analyze collected evidence against compliance framework requirements — privileged access analysis, separation of duties, configuration baseline comparison, change record correlation.

**Personas involved:** Sage, Zach, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Separation of duties analysis across 30+ users with elevated access is performed manually by the security team under deadline pressure. | ⏱️ Lost Time — **2–3 days** of manual role analysis |
| Derek | No automated compliance framework mapping — every finding must be manually categorized against SOX IT General Controls or PCI DSS by someone who understands both z/OS and the audit framework. | 🔒 Skill Gap / Bottleneck — requires both z/OS expertise (Zach/Sage) and compliance expertise (Derek) simultaneously |
| Zach | Remediations under time pressure are more likely to create new gaps because the engineer is already stretched assembling evidence. | 💼 Business Impact — audit prep and remediation compete for the same expert time |

---

### Step 4 — Surface Gaps
**Brief:** Identify undocumented changes, dormant privileged accounts, configuration deviations, and behavioral anomalies in the access record.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Undocumented changes — configuration modifications with no change record — are discovered during the audit, not before. There is no proactive detection mechanism. | 💼 Business Impact — gaps are discovered by the auditor, not the team; finding under audit pressure is far more costly |
| Derek | No reliable baseline for how many undocumented changes exist — the number is unknown until the audit investigation. | 💼 Business Impact — compliance posture is unmeasurable until the auditor quantifies it |
| Sage | Behavioral anomalies (dormant SPECIAL user who was active outside a change window) are invisible without dedicated expert investigation. | ⏱️ Lost Time — **days of manual log review** to surface access behavioral anomalies |

---

### Step 5 — Remediate
**Brief:** For deviations found before the audit, correct them — RACF changes, configuration fixes, retroactive change records.

**Personas involved:** Zach, Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Compliance remediations require the same engineers already stretched assembling evidence — capacity conflict. | 🔒 Skill Gap / Bottleneck — Zach is simultaneously needed for evidence assembly and for executing remediations |
| Derek | Remediations made to close audit findings risk inadvertently creating new gaps because they are made under time pressure with incomplete review. | 💼 Business Impact — last-minute remediations create audit risk rather than reducing it |

---

### Step 6 — Generate Package
**Brief:** Produce the evidence package — compliance report, privileged access report, change history, configuration snapshots — in a format auditors can use.

**Personas involved:** Derek

| Persona | Pain Point | Category |
|---|---|---|
| Derek | Assembling the evidence package from individual exports (RACF reports, SMP/E records, change logs) takes weeks of engineering time and is error-prone. | ⏱️ Lost Time — **5–15 business days** of senior engineer time per audit cycle |
| Derek | Evidence is point-in-time, not continuous — the package reflects a snapshot assembled under pressure rather than a continuous, authoritative record. | 💼 Business Impact — auditors may find gaps because the snapshot was assembled at a single moment and missed interim changes |

---

### Step 7 — Monitor
**Brief:** Between audit cycles, maintain ongoing awareness of compliance posture.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | No continuous monitoring — compliance posture degrades silently between audit cycles. The only detection mechanism is the next audit. | 💼 Business Impact — gap between audits means drift can accumulate for up to 12 months undetected |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Scope
**Brief:** Derek defines audit scope; Atlas confirms what evidence it can produce and surfaces any gaps (missing LPARs, discovery staleness, missing baseline definition).

**Personas involved:** Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Ask Atlas "what do we need for the SOX audit?" and receive a complete, scoped evidence inventory within minutes — no multi-team coordination required. | ⏱️ Time Saving — **1–3 days → minutes** for scope definition and evidence inventory |
| Derek | Atlas presents evidence scope in compliance language, not z/OS technical shorthand — Derek can work with it directly without expert translation. | 🆕 New User Capability — Derek independently initiates and manages audit workflows without z/OS expertise |

---

### Step 2 — Collect
**Brief:** Atlas assembles evidence from its continuous environment record — RACF, configuration state, change history, PTF inventory. No manual pulls from ISPF, RACF consoles, or SMP/E.

**Personas involved:** Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Privileged access reports across all LPARs generated in a single Atlas query — no per-LPAR manual RACF queries. | ⏱️ Time Saving — **3–5 days → under 30 minutes** for multi-LPAR privileged access collection |
| Derek | 12-month change history assembled from Atlas's continuous record — no reconciliation of system logs, tickets, and SMP/E. | ⏱️ Time Saving — **3–5 days → minutes** for change history assembly |

---

### Step 3 — Analyze
**Brief:** Atlas analyzes collected evidence against compliance framework requirements — producing findings classified by severity and compliance category.

**Personas involved:** Atlas, Derek, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Separation of duties analysis across all elevated users completed automatically by Atlas — no manual role-by-role review. | ⏱️ Time Saving — **2–3 days → automatic** for SoD analysis |
| Derek | Atlas categorizes findings against SOX IT General Controls, PCI DSS, or customer-defined framework automatically — no manual mapping required. | 🤖 Atlas AI Insight & Automation — compliance framework mapping applied to raw findings automatically |

---

### Step 4 — Surface Gaps
**Brief:** Atlas surfaces compliance gaps and anomalies proactively — undocumented changes, dormant privileged accounts with recent activity, behavioral anomalies in access patterns.

**Personas involved:** Atlas, Sage, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | "46 undocumented changes" surfaced before the auditor sees them — with timestamps, affected components, and user IDs. A specific, verifiable count. | 🤖 Atlas AI Insight & Automation — undocumented change enumeration is only possible through Atlas's unified change and Config-as-Code model |
| Sage | Behavioral anomaly surfacing: dormant SPECIAL user active outside a change window surfaced automatically — without requiring anyone to know to look for it. | 🤖 Atlas AI Insight & Automation — access pattern analysis across the RACF model produces findings no manual review would surface |
| Derek | Compliance gaps quantified before the audit opens — Derek walks into audit prep knowing the number, not discovering it with the auditor. | 💼 Business Impact — proactive gap discovery allows remediation before audit, not during it |

---

### Step 5 — Remediate
**Brief:** Atlas generates remediation plans for deviations that can be corrected before the audit; validates them in isolation; orchestrates the apply.

**Personas involved:** Zach, Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Compliance remediations are planned and validated by Atlas before apply — changes made to close findings do not inadvertently create new gaps. | 🤖 Atlas AI Insight & Automation — pre-remediation validation in an isolated environment eliminates the risk of remediation-induced gaps |
| Derek | Remediation log captured in Atlas — the complete before/after state is part of the evidence package automatically. | ⏱️ Time Saving — no separate effort to document remediation steps; captured automatically |

---

### Step 6 — Generate Package
**Brief:** Atlas generates the structured evidence package — compliance report, privileged access report, change history with undocumented change annotations, configuration snapshots, remediation log. Exportable for auditor consumption.

**Personas involved:** Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Complete evidence package generated from a single Atlas query — auditor-ready format, no manual assembly. | ⏱️ Time Saving — **5–15 business days → hours** for evidence package production |
| Derek | Evidence is from Atlas's continuous record, not a point-in-time snapshot assembled under pressure — auditors receive authoritative, timestamped data. | 🤖 Atlas AI Insight & Automation — continuous record means no evidence gaps from last-minute assembly |

---

### Step 7 — Monitor
**Brief:** Atlas continues monitoring for new deviations, undocumented changes, and access anomalies between audit cycles. Compliance posture is a continuous state.

**Personas involved:** Sage, Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Compliance posture monitored continuously — deviations surfaced when they occur, not at the next audit cycle. | 🤖 Atlas AI Insight & Automation — continuous monitoring replaces point-in-time audit preparation |
| Derek | Atlas alerts when compliance posture changes materially — Derek is informed proactively rather than discovering gaps at the next audit. | 🆕 New User Capability — Derek maintains visibility into ongoing compliance state without requiring an active investigation |

---

> **Overall outcome:** Audit preparation time reduced from weeks of engineering effort to hours. Undocumented changes and anomalies surfaced before the auditor finds them. Compliance posture is a continuous, queryable state rather than a periodic point-in-time exercise.
