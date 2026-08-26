# UC-11: Capacity Planning & Performance Readiness — Pain Points, Wows & Flow Analysis

> **Pillar:** Predictive Intelligence (primary) + System Intelligence (topology/config) + Change Intelligence (execution)
> **GA Status:** H1 2027 (capacity visibility); Atlas Test SKU for performance testing

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Detect
**Brief:** Identify that a performance problem exists or that a performance risk is approaching — through an incident, a user complaint, or a pre-event assessment.

**Personas involved:** Annette, Alex

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Performance problems are discovered through user complaints or production incidents — there is no proactive signal before throughput degrades. | 💼 Business Impact — performance degradation is reactive; by the time the user complains, impact is already occurring |
| Alex | Capacity planning for peak events relies on manual analysis of prior-year SMF data, spreadsheets, and institutional memory of one or two experienced engineers. | ⏱️ Lost Time — **weeks** of manual SMF analysis and projection work before peak season capacity is understood |
| Alex | No systematic projection methodology — capacity estimates are based on experience and rule of thumb, not on modeled projection against actual transaction growth trends. | 💼 Business Impact — peak season capacity surprises are a recurring risk because the projection method is not rigorous |

---

### Step 2 — Diagnose
**Brief:** When a performance degradation is reported, trace the root cause — identify the responsible component, configuration constraint, or change event.

**Personas involved:** Alex, Zach, Annette

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Diagnosing a live performance degradation requires three or more specialist teams (CICS team, Db2 DBA, systems programmer) to pull their own telemetry independently and coordinate by conference call. | ⏱️ Lost Time — **hours to days** to reach root cause in a multi-system performance incident |
| Alex | The link between a configuration change and a subsequent performance regression is usually discovered by accident or through exhaustive manual investigation — not through automated attribution. | 💼 Business Impact — post-change performance regressions go unattributed, and the same class of change can cause the same regression again |
| Annette | First line of response to user performance complaints has no tool to quickly triage whether the issue is CICS, Db2, MQ, or infrastructure — escalation is reflexive, not data-driven. | 🔒 Skill Gap / Bottleneck — Annette cannot independently triage performance issues; every complaint is escalated to Alex |

---

### Step 3 — Size
**Brief:** Model the configuration changes needed to address the identified constraints or to prepare for projected peak load.

**Personas involved:** Alex, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Configuration sizing for peak load (Db2 buffer pools, CICS MXT, MQ queue depth, DASD allocation) is determined by experience and rule of thumb, not by modeled projection against actual transaction growth trends. | 💼 Business Impact — under-sizing causes peak failures; over-sizing wastes capacity that could be right-sized |
| Alex | Dark capacity (underutilized resources, over-provisioned LPARs) is invisible without dedicated analysis — teams routinely procure capacity they already have. | 💼 Business Impact — unnecessary hardware and software capacity purchased due to lack of right-sizing visibility |

---

### Step 4 — Validate
**Brief:** Test the proposed configuration changes in an environment under simulated production load before applying to production.

**Personas involved:** Alex, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Performance testing before applying configuration changes requires a dedicated lab environment — logistically difficult to schedule, and often skipped. | ⏱️ Lost Time — **days to weeks** to schedule and set up a performance test environment |
| Alex | Without test validation, configuration changes are applied to production speculatively — if the sizing estimate was wrong, the next peak event surfaces it. | 💼 Business Impact — unvalidated configuration changes applied to production create risk if the sizing model was inaccurate |

---

### Step 5 — Apply
**Brief:** Implement the validated configuration changes in production — buffer pools, MXT, queue depths, DASD allocations.

**Personas involved:** Zach, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Production configuration change planning is a separate manual process from the performance analysis — no connection between the diagnosis and the remediation plan. | ⏱️ Lost Time — **additional hours** translating performance findings into a production change plan |
| Quinn | Production capacity changes require Quinn's approval — but the evidence is presented as raw performance data, not as a management-readable risk and recommendation. | 🔒 Skill Gap / Bottleneck — Quinn cannot approve production capacity changes without Zach producing a separate management summary |

---

### Step 6 — Monitor
**Brief:** After the event or configuration change, monitor for ongoing performance health and detect post-change regressions.

**Personas involved:** Alex, Annette

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Post-change performance regression attribution is opaque — a configuration or software change can quietly degrade an application with no clear signal linking the change to the symptom. | 💼 Business Impact — silent post-change regressions can accumulate over weeks before they surface as a noticeable degradation |
| Annette | Ongoing system performance monitoring requires OMEGAMON and other specialist tools — Annette monitors alerts without the ability to cross-correlate symptoms across CICS, Db2, and MQ. | 🔒 Skill Gap / Bottleneck — Annette cannot perform cross-subsystem performance correlation without escalating to Alex |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Detect
**Brief:** Atlas proactively surfaces approaching capacity constraints and post-change performance regressions — before they cause incidents.

**Personas involved:** Alex, Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Capacity constraints approaching peak thresholds surfaced by Atlas before the event — "Db2 buffer pool at 82% projected capacity at forecast peak load" — not discovered during the peak event itself. | 🤖 Atlas AI Insight & Automation — proactive constraint projection from transaction growth trend analysis; no manual SMF analysis required |
| Annette | Post-change performance regressions surfaced by Atlas automatically — correlated to the responsible configuration change event without manual investigation. | 🤖 Atlas AI Insight & Automation — behavioral baseline comparison attributes regression to the specific change that caused it |

---

### Step 2 — Diagnose
**Brief:** When a performance degradation is reported, Atlas identifies root cause within one conversation — responsible component attributed, fix generated.

**Personas involved:** Alex, Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Root cause identified within one Atlas conversation — the responsible change event attributed, the fix generated, the remediation validated — without three-team conference call. | ⏱️ Time Saving — **hours to days of multi-team investigation → one Atlas conversation** for performance root cause |
| Annette | Atlas provides a triage starting point from the first user complaint — CICS, Db2, MQ, or infrastructure identified as the responsible subsystem before Alex is engaged. | 🆕 New User Capability — Annette independently triages performance complaints and provides Alex with a structured starting point instead of a blank escalation |

---

### Step 3 — Size
**Brief:** Atlas models the risk for a peak event — projecting transaction volume against current configuration, identifying constraints, and recommending configuration targets.

**Personas involved:** Alex, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Peak event capacity risk modeled by Atlas in one session — transaction projection against current configuration, constraint identification, configuration recommendation — without pulling data from multiple tools. | ⏱️ Time Saving — **weeks of manual SMF analysis and projection → one Atlas session** for capacity risk modeling |
| Alex | Dark capacity identified by Atlas — right-sizing recommendations based on actual utilization data, enabling procurement decisions grounded in evidence rather than rule of thumb. | 🤖 Atlas AI Insight & Automation — utilization analysis across the estate surfaces under-provisioned and over-provisioned LPARs automatically |

---

### Step 4 — Validate
**Brief:** Configuration changes tested in an isolated environment at simulated load — headroom validated at each threshold before production apply.

**Personas involved:** Alex, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Configuration changes tested at simulated production load in an isolated environment — headroom confirmed at each buffer pool, MXT, and queue depth threshold before production. | ⏱️ Time Saving — **days to weeks scheduling a lab test → Atlas provisions and runs the performance test** |
| Alex | Validation confirms the sizing model was correct before production is touched — no speculative capacity changes with unknown headroom. | 🤖 Atlas AI Insight & Automation — simulation confirms the capacity recommendation before production application |

---

### Step 5 — Apply
**Brief:** Atlas generates the production configuration change plan from the validated sizing recommendation. Change Intelligence executes with Zach's authorization.

**Personas involved:** Zach, Quinn, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Production configuration change plan generated directly from the validated performance analysis — no separate translation from diagnosis to change plan. | ⏱️ Time Saving — diagnosis → change plan in the same Atlas session |
| Quinn | Atlas generates a management-readable capacity readiness summary — risk quantified, recommendation justified, validation evidence attached. Quinn approves without requiring a separate Zach briefing. | 🆕 New User Capability — Quinn makes informed production capacity decisions independently from the Atlas artifact |

---

### Step 6 — Monitor
**Brief:** Atlas monitors ongoing performance health continuously — surfacing post-change regressions and approaching constraints proactively.

**Personas involved:** Alex, Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Post-change regression attributed automatically — if a configuration change introduces a performance degradation, Atlas surfaces the correlation to the responsible change event without manual investigation. | 🤖 Atlas AI Insight & Automation — behavioral baseline comparison after every change automatically surfaces regressions |
| Annette | Cross-subsystem performance picture available to Annette in Atlas — CICS, Db2, MQ correlations surfaced without requiring OMEGAMON expertise. | 🆕 New User Capability — Annette monitors cross-subsystem performance health from Atlas without specialist tool access |

---

> **Overall outcome:** Performance root cause reduced from hours to days of multi-team investigation to a single Atlas conversation. Peak season capacity surprises eliminated through proactive constraint projection. Dark capacity identified through utilization analysis — procurement decisions grounded in evidence.
