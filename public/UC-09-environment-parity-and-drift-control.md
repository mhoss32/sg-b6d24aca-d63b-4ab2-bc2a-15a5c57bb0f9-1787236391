# UC-09: Environment Parity & Drift Control — Pain Points, Wows & Flow Analysis

> **Pillar:** Predictive Intelligence (primary) + System Intelligence (topology diff) + Change Intelligence (realignment)
> **GA Status:** H2 2027 (continuous drift monitoring and alerts); point-in-time comparison at GA

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Detect
**Brief:** Identify that a configuration difference exists between environments — production vs. QA, production vs. DR, or any environment vs. its defined baseline.

**Personas involved:** Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Environment comparison is manual: engineers export configuration parameters from ISPF or SMP/E and compare in spreadsheets or scripts. This is done infrequently and is error-prone. | ⏱️ Lost Time — **1–3 days** per manual parity check, done at most quarterly |
| Annette | Unauthorized change detection relies entirely on change management process compliance — if someone makes a change without a change record, the only detection mechanism is a human noticing a behavioral difference. | 💼 Business Impact — unauthorized changes are invisible until they cause a symptom or an auditor flags them |
| Zach | Post-change validation is informal — after a planned change there is no systematic check that the environment reached the intended state. | 💼 Business Impact — post-change drift (environment failed to fully apply the change) goes undetected |

---

### Step 2 — Attribute
**Brief:** For each detected drift item, determine when it changed, what it changed from, whether there is a change record, and who is responsible.

**Personas involved:** Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Annette | When an unauthorized configuration change is detected, Annette has no immediate evidence: just a behavioral symptom and no starting point for investigation. | ⏱️ Lost Time — **hours to days** reconstructing what changed, when, and from what value |
| Annette | Investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate and require expert interpretation. | 🔒 Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without escalating to Zach for expert log interpretation |
| Zach | "QA doesn't look like prod" situations are resolved by guesswork and manual parameter comparison — often by Zach, who has better things to do. | ⏱️ Lost Time — **half a day to 2 days** per "test doesn't match prod" investigation |

---

### Step 3 — Surface
**Brief:** Present drift findings in a way that allows the operator to triage, classify severity, and decide on remediation or acceptance.

**Personas involved:** Annette, Greg, Alex

| Persona | Pain Point | Category |
|---|---|---|
| Greg | No drift trend reporting — Greg cannot tell whether environment parity is improving or degrading over time because there is no continuous measurement. | 💼 Business Impact — architecture parity governance decisions are made without data |
| Alex | When investigating whether a QA environment is production-equivalent for performance testing, there is no structured parity report to reference — Alex must assemble the comparison manually. | ⏱️ Lost Time — **half a day** of manual environment comparison before performance testing can be credibly set up |
| Annette | Raw parameter diffs without risk classification — Annette must interpret whether a Db2 ZPARM change is a compliance risk, a stability risk, or cosmetic drift, without context. | 🔒 Skill Gap / Bottleneck — Annette cannot triage drift findings without Zach's interpretation for each one |

---

### Step 4 — Investigate
**Brief:** For flagged drift items, conduct the human investigation — was this an authorized change? An emergency change with a missing record? An unauthorized modification?

**Personas involved:** Annette, Zach, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Annette | No consolidated starting point for investigation — Annette receives a symptom, not a structured finding with evidence attached. | ⏱️ Lost Time — **hours per investigation** assembling basic evidence before the question can be answered |
| Zach | Escalation from Annette always requires Zach to do the same log-reading investigation she cannot — no self-service investigation path for mid-level operators. | ⏱️ Lost Time — **hours of Zach's time** on investigations that Atlas could structure |

---

### Step 5 — Remediate
**Brief:** For drift that must be corrected — realign the environment to its intended baseline or to the production configuration.

**Personas involved:** Zach, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Environment realignment is fully manual — each parameter difference must be corrected individually using the appropriate subsystem tool. | ⏱️ Lost Time — **hours to days** for a full QA-to-production realignment |
| Greg | No validation that the realignment reached the intended state — the comparison must be repeated manually after remediation to confirm. | 💼 Business Impact — incomplete remediations leave residual drift that is not detected until the next manual check |

---

### Step 6 — Audit
**Brief:** Produce evidence that unauthorized changes were detected, investigated, and resolved or accepted — for compliance and governance purposes.

**Personas involved:** Annette, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Audit trail for drift investigation and resolution must be assembled manually from notes and tool outputs — no continuous record. | ⏱️ Lost Time — **hours** assembling evidence of drift investigation and resolution per audit cycle |
| Derek | Change record completeness is consistently the most labor-intensive section of audit prep — undocumented changes produce audit findings whether they were benign or not. | 💼 Business Impact — audit findings for undocumented drift are a recurring cost even when the changes were authorized |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Detect
**Brief:** Atlas monitors environments continuously and alerts Annette when any production or non-production environment drifts materially from its baseline or from a peer environment — before a human notices a behavioral symptom.

**Personas involved:** Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Drift alert received before a behavioral symptom appears — Atlas detects the configuration change, not the downstream consequence. | 🤖 Atlas AI Insight & Automation — continuous baseline diff runs automatically; no manual comparison needed |
| Annette | Unauthorized change detection: Atlas compares current Config-as-Code state against the last registered baseline and identifies every configuration change with no corresponding record. | 🤖 Atlas AI Insight & Automation — undocumented change detection is only possible through Atlas's combined Config-as-Code model and change record history |

---

### Step 2 — Attribute
**Brief:** When Atlas surfaces drift, it provides the configuration delta, the timestamp, the previous value, and whether there is a change record — immediately.

**Personas involved:** Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Undocumented change investigation starts with evidence, not guesswork — Atlas provides the configuration delta, timestamp, affected component, and user ID attribution immediately. | ⏱️ Time Saving — **hours to days reconstructing evidence → evidence provided immediately in the Atlas alert** |
| Annette | Annette can triage, decide, and act on drift findings without escalating to Zach for the basic facts. | 🆕 New User Capability — Annette independently investigates and makes accept/escalate decisions on drift findings without requiring Zach |

---

### Step 3 — Surface
**Brief:** Atlas presents findings classified by risk level (compliance risk, stability risk, cosmetic drift) with recommended actions and explicit escalation triggers.

**Personas involved:** Annette, Greg, Alex

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Findings classified by risk — Annette knows whether a Db2 ZPARM change is a compliance risk, a stability risk, or cosmetic drift without Zach's interpretation. | 🆕 New User Capability — Annette independently triages drift findings from Atlas's risk classification |
| Greg | Drift trend reports over time — Greg can measure whether environment parity is improving as a result of governance changes, with real data. | 🤖 Atlas AI Insight & Automation — trend analysis from continuous monitoring data surfaces architectural governance insights |
| Alex | QA parity report on demand — "is this environment production-equivalent for performance testing?" answered by Atlas in a single query, with specific differences listed. | ⏱️ Time Saving — **half day manual comparison → seconds** via Atlas parity query |

---

### Step 4 — Investigate
**Brief:** Atlas provides a structured starting point for the human investigation — configuration delta, timestamp, affected components. The human decides: authorized? Emergency change? Unauthorized?

**Personas involved:** Annette, Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Every investigation starts with Atlas's structured evidence — Annette has a specific, verifiable starting point rather than a blank-page investigation. | 🆕 New User Capability — Annette conducts drift investigations independently, escalating to Zach only when the finding requires z/OS-level expertise |
| Zach | When Annette does escalate, the investigation is already structured — Zach reviews evidence, not repeating Annette's discovery work. | ⏱️ Time Saving — Zach's time on escalated investigations reduced because Atlas has already done the evidence assembly |

---

### Step 5 — Remediate
**Brief:** Atlas generates an environment realignment plan — targeting only the items that require correction. Change Intelligence executes the realignment.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Environment realignment plan generated by Atlas — targeted to only the parameters that differ and need correction. No manual parameter-by-parameter correction. | ⏱️ Time Saving — **hours to days → Atlas-generated targeted realignment plan** |
| Zach | Post-remediation validation is automatic — Atlas confirms the environment reached the intended state and the drift is closed. | 🤖 Atlas AI Insight & Automation — post-remediation comparison runs automatically; no manual re-verification needed |

---

### Step 6 — Audit
**Brief:** Atlas generates a complete, continuous drift audit trail — every detection, investigation outcome, and remediation action captured automatically.

**Personas involved:** Annette, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Incident audit trail generated automatically for every drift detection and resolution — Annette can close incidents with a complete, continuous record rather than assembling it manually. | ⏱️ Time Saving — **hours assembling evidence → automatic continuous trail** |
| Derek | Change record completeness improves for the Atlas estate — every Atlas-detected and Atlas-resolved drift item has a documented trail. Audit findings for undocumented changes reduce. | 💼 Business Impact — audit findings for undocumented drift reduce materially as Atlas coverage grows |

---

> **Overall outcome:** Drift from baseline detected in under 24 hours rather than at the next manual check (days to months). Annette independently handles drift investigations and triage without Zach. Environment parity is a continuous, queryable state — the "test doesn't look like prod" conversation is replaced by a specific, Atlas-generated parity report.
