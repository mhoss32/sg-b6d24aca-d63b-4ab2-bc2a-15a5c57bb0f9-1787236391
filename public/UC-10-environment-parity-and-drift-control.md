# UC-10: Environment Parity and Drift Control
*Version 1.0 | Owner: Product Management | Last updated: August 2026*

---

## Executive Summary

IBM Z environments drift silently. PTF gaps between production and QA mean test results cannot be trusted. Unauthorized configuration changes accumulate with no change record. DR environments diverge from production and nobody knows until a failover test reveals it. Atlas provides continuous, automated drift monitoring across all environment tiers — detecting what changed, correlating it to a change record, assessing the risk, and guiding the operator from detection to resolution with a complete audit trail.

---

## 1. Overview

Environment Parity and Drift Control addresses one of the most pervasive and least visible risks on IBM Z: the slow, silent divergence of environments from each other and from known-good baselines. Every organization has it. Most discover it at the worst possible moment — when QA cannot reproduce a production defect, when a DR test fails, or when an auditor finds undocumented configuration changes. Atlas makes drift visible, continuous, and actionable before any of those moments occur.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When my environments accumulate differences or an unauthorized change occurs, I want to know exactly what drifted, when it happened, whether it has a change record, and what to do about it — so I can maintain configuration integrity without manual comparison work. |
| **Emotional** | Annette wants to stop dreading the moment she discovers a major configuration difference during a high-pressure incident. She wants to know the answer before it becomes a crisis. |
| **Social** | The operations team wants to demonstrate to auditors, security teams, and management that every configuration change is tracked, every unauthorized change is detected and resolved, and no environment is left to drift unmonitored. |

---

## 3. Customer Problem and Outcome

**Problem:**
Production and non-production IBM Z environments accumulate configuration differences over time through a combination of planned changes applied inconsistently, emergency fixes applied only to production, and changes made outside the change control process. There is no automated system that continuously compares environment state and alerts on material differences. The result is that test environments produce misleading results, DR environments may be weeks or months behind production, and compliance posture is degraded by undocumented changes.

**Current State (Without Atlas):**
- Environment comparison is manual: engineers export configuration parameters from ISPF or SMP/E and compare them in spreadsheets or scripts. Done infrequently, error-prone, and misses non-obvious differences like PTF-driven behavior changes.
- Unauthorized change detection relies on change management process compliance — if someone makes a change without a change record, the only detection mechanism is a human noticing a behavioral difference or an auditor flagging it.
- QA environment drift from production is an endemic problem. Most "test doesn't look like prod" situations are resolved by guesswork and manual parameter comparison by Zach.
- Post-change validation is informal. After a planned change, there is no systematic check that the environment reached the intended state.
- Audit preparation for change control requires manually assembling evidence. Undocumented changes produce audit findings.

**Desired Outcome:**
- Annette receives an alert when any environment drifts materially from its baseline or a peer environment — before a human notices a behavioral symptom.
- When an unauthorized configuration change is detected, Atlas provides immediate evidence: what changed, the previous value, when it changed, and whether there is a change record.
- QA environments can be confirmed as production-equivalent on demand. The "test doesn't look like prod" conversation is replaced by a parity report.
- Every change — planned or unplanned — has a complete audit trail that closes without manual assembly.
- Post-change drift validation is automatic after any planned change.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Environment Parity and Drift Control is a named H2 2027 Predictive Intelligence capability. It contributes to Atlas Base retention by being the first fully proactive capability — Atlas generates value without the user asking it to. For security and compliance buyers, drift detection is a compelling standalone reason to purchase. |
| **Retention impact** | Drift detection requires continuous Atlas connectivity to generate value. Once a customer enables parity monitoring, the monitoring relationship deepens over time — creating strong structural retention. |
| **Competitive differentiation** | No existing z/OS tool provides continuous, automated cross-environment configuration comparison with change record correlation. Atlas is the only system that can answer "what is different between prod and QA right now, and does any of it have a change record?" in one query. |
| **Portfolio attach** | Unauthorized change detection creates a natural connection to z/OS security tooling (RACF audit, zSecure). The ServiceNow integration required for change record correlation is a named H2 2027 capability that this use case directly enables. |

> **Commercial constraints (internal):** Config drift detection and continuous parity monitoring are H2 2027 capabilities gated behind the Predictive Intelligence feature flag.

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Annette — IT Operations Engineer (L2 Operator) | First responder to drift alerts and unauthorized change notifications. Initiates investigation, makes the accept/escalate/rollback decision, and closes the incident with an audit trail. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Escalation target for changes Annette cannot interpret or remediate. Executes complex rollback or realignment changes. Reviews parity reports for planned environment alignment. |
| **Secondary** | Alex — Performance / Application Engineer | Consumes parity reports when investigating whether a QA environment is production-equivalent for performance testing. Benefits from post-change drift validation after configuration tuning. |
| **Secondary** | Greg — Infrastructure Architect | Designs and governs the environment parity policy — which parameters must match, which differences are accepted, and what the remediation SLA is for unauthorized changes. |

**Persona note:** Annette is the right primary persona — she is the first line of response to any drift or unauthorized change alert. Atlas must present findings in language she can act on: classified risk levels, clear recommended actions, and explicit escalation triggers.

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **Predictive Intelligence** | **Primary.** Continuous drift monitoring, threshold-based alerting, unauthorized change detection against a baseline, and post-change state validation are all Predictive Intelligence capabilities. The proactive, always-on nature of this use case is what makes it Predictive Intelligence. | H2 2027 |
| **System Intelligence** | **Foundational.** The living topology model and Config-as-Code data are the source of truth for all environment comparison. Cross-environment parameter diff, PTF inventory comparison, and topology structure comparison are System Intelligence capabilities. | GA Dec 2026 |
| **Change Intelligence** | **Execution.** When drift is confirmed and remediation is required — aligning QA to production, rolling back an unauthorized change, executing a post-change correction — the remediation path runs through Change Intelligence. | H1 2027 (provisioning and apply); H2 2027 (full integration) |

**Important:** Basic side-by-side environment comparison is available from Aug 19 (TIB milestone) via ZUnderstand + Config-as-Code DB multi-source queries. The *continuous, automated, alerting* form requires the H2 2027 Predictive Intelligence config drift detection capability.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate |
|---|---|---|---|
| Production vs. QA Drift Investigation | **Planned** | H2 2027 (full); Aug 19 milestone (ad-hoc query precursor) | Config drift detection skill; continuous alerting requires H2 2027 Predictive Intelligence |
| Continuous Production Parity Monitoring | **Planned** | H2 2027 | Predictive Intelligence config drift detection; scheduled comparison engine; threshold configuration |
| Unauthorized Change Detection | **Planned** | H2 2027 | Config baseline versioning; change record correlation (ServiceNow integration); anomaly detection alerting |
| Post-Change Drift Validation | **Planned** | H2 2027 | Post-apply state verification; intended-state comparison against change plan |

---

## 8. Scope and Boundaries

**In Scope:**
- Cross-environment configuration comparison: parameter-level diff between any two connected environments
- PTF inventory comparison
- Topology structure comparison
- Unauthorized change detection: changes in Config-as-Code with no associated approved change record
- Continuous parity monitoring: scheduled comparison with threshold-based alerting
- Post-change drift validation: confirmation an environment reached its intended post-change state
- Drift remediation planning: Atlas generates an alignment plan to bring a drifted environment back to baseline
- Rollback plan generation for unauthorized changes
- Audit trail generation

**Out of Scope:**
- DR environment readiness validation — owned by UC-11 (Disaster Recovery Validation)
- Application behavior testing to confirm environments are functionally equivalent — owned by UC-06 and UC-12
- Security investigation of who made an unauthorized change — Atlas provides the configuration evidence; security tools provide identity and intent investigation
- Network and storage configuration parity — scoped to z/OS, middleware, and software configuration

**Non-Goals:**
- Atlas does not automatically remediate drift. Every remediation action requires explicit human decision and authorization.
- Atlas does not enforce that environments must be identical. It surfaces differences, classifies them by risk, and allows the operator to accept, remediate, or investigate.
- Atlas does not replace ServiceNow as the system of record for approved changes.

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | All environments being monitored are connected to Atlas and have current Config-as-Code discovery data |
| **Assumption** | The customer has a defined baseline or reference environment for each environment tier |
| **Assumption** | The customer has a change management system (ServiceNow or equivalent) that Atlas can query for approved change records |
| **Assumption** | The customer has defined what constitutes material drift — which parameters require parity and which differences are acceptable |
| **Dependency** | Continuous parity monitoring and unauthorized change detection require the H2 2027 Predictive Intelligence config drift detection capability |
| **Dependency** | Unauthorized change detection depends on ServiceNow integration for change record correlation (H2 2027) |
| **Dependency** | Cross-environment comparison at parameter depth depends on ZUnderstand data being available in TIB for both environments being compared |
| **Risk** | Discovery freshness is critical. If the Config-as-Code model for an environment was last updated days ago, drift detection will produce false negatives. Atlas must surface discovery staleness prominently. |
| **Risk** | Defining and maintaining the parity policy requires ongoing customer input. Without a well-maintained policy, continuous monitoring will generate alert fatigue or miss material differences. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts |
|---|---|---|---|---|---|
| S1 | Production vs. QA Drift Investigation | User asks Atlas to explain why QA cannot reproduce a production behavior; or Annette runs an on-demand parity check | Planned — H2 2027 (continuous); Aug 19 (ad-hoc query precursor) | Aug 19 (ad-hoc only); H2 2027 (full) | UX Flow, Chat Exchange, Screen designs |
| S2 | Unauthorized Change Detection | Atlas detects a configuration change with no associated approved change record and generates an alert | Planned — H2 2027 | H2 2027 | UX Flow, Chat Exchange, Screen designs |
| S3 | Continuous Production Parity Monitoring | Scheduled comparison run detects drift exceeding the defined threshold | Planned — H2 2027 | H2 2027 | UX Flow, Chat Exchange |
| S4 | Post-Change Drift Validation | A planned change has been applied; Atlas automatically validates the environment reached the intended state | Planned — H2 2027 | H2 2027 | UX Flow, Chat Exchange |

**Design decisions:**

- **S1 has a useful Aug 19 precursor.** The ad-hoc "compare these two environments" query is positioned as System Intelligence query capability, not the full UC-10 use case. The distinction: the ad-hoc query requires the user to ask; UC-10 means Atlas asks continuously.
- **S2 is the most differentiating scenario.** Unauthorized change detection with change record correlation directly addresses Annette's pain around lack of automated detection.
- **S3 and S4 share infrastructure with S2** — all use the same continuous monitoring engine. May be designed as one monitoring framework with three trigger variants.

---

## 11. Lifecycle Overview

```
Detect / Trigger → Compare → Classify → Decide → Plan → Execute → Validate → Close
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Detect / Trigger** | Atlas detects a configuration change against baseline (proactive), a scheduled comparison surfaces drift above threshold, a user asks for an environment comparison, or a planned change triggers post-change validation. | Atlas (proactive/scheduled) or User (query/post-change) |
| **Compare** | Atlas produces a precise diff: parameter name, previous value, current value, environment, timestamp, and whether the change is present in one environment but absent in another. PTF inventory and topology structure included. | Atlas |
| **Classify** | Atlas classifies each difference by type (compliance risk, stability risk, security risk, cosmetic/accepted) and severity. For unauthorized changes, Atlas checks whether an approved change record exists in ServiceNow. | Atlas |
| **Decide** | Annette (or Zach for complex changes) reviews the classification and chooses: accept the change as intentional, escalate for investigation, or remediate. Human decision gate — Atlas does not proceed to remediation without authorization. | User |
| **Plan** | If remediation is chosen, Atlas generates the alignment or rollback plan: sequenced parameter changes, PTF applies, or configuration restores. | Atlas |
| **Execute** | Atlas orchestrates the remediation. User authorizes each production action. | Atlas (orchestrates) / User (authorizes) |
| **Validate** | Atlas confirms the environment has reached the intended state. | Atlas |
| **Close** | Atlas generates the complete incident record: detected change, risk classification, decision made, remediation applied, validation result. ServiceNow ticket created or updated. | Atlas |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Continuous environment comparison and baseline tracking | **Atlas** | Automated; no user prompt required |
| Configuration change detection against baseline | **Atlas** | Proactive |
| Change record correlation | **Atlas** | Queries ServiceNow; requires ServiceNow integration |
| Risk classification of detected differences | **Atlas** | User can override classifications |
| Alert routing and severity prioritization | **Atlas** | High-severity alerts surfaced immediately |
| Decision: accept / escalate / remediate | **User (Annette)** | Governance gate |
| Parity policy definition | **User (Greg + Zach)** | Atlas enforces; Greg and Zach define |
| Remediation plan generation | **Atlas** | Zach reviews before production apply |
| Production remediation execution authorization | **User (Zach)** | Zach authorizes production configuration changes |
| Remediation orchestration | **Atlas** | Progress visible in real time |
| Post-remediation validation | **Atlas** | Automated |
| Incident record and audit trail creation | **Atlas** | Automated |

**Governance gates:** Any remediation action (Annette decides); any production configuration change (Zach authorizes); closing an unauthorized change incident as "accepted" (explicit named acknowledgment required).

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Continuous automated environment comparison** | Atlas compares environments on a schedule and on every discovery event without user action | Transforms drift from a discovery problem into a monitoring problem |
| **Semantic diff** | Atlas explains that MAXDBAT at 50 on QA vs. 200 on production means QA would serialize at 50 concurrent threads | Raw parameter diffs require expert interpretation; Atlas translates the difference into operational meaning |
| **Change record correlation** | Atlas cross-references every detected configuration change against ServiceNow history and flags changes with no approved record — proactively | Not possible with any existing tool combination today |
| **Risk classification at detection time** | Atlas classifies each drift item the moment it is detected — Annette sees "HIGH — no change record, CICS MXT reduced by 40%, active transaction processing at risk" | Alert overload is Annette's primary pain point; risk classification at detection time enables triage in seconds |
| **Proactive side-effect identification** | When Atlas identifies differences to remediate, it checks whether other applications sharing the environment would be affected before generating the plan | Prevents remediation from creating new problems |
| **Complete audit trail at closure** | Atlas generates the full incident record without any manual documentation effort | Annette's top compliance concern is closing incidents with a complete audit trail |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Time to drift detection | Time from when a configuration difference is introduced to when it is surfaced | Days to weeks | Same day (within one discovery cycle) |
| Unauthorized change detection rate | % of production configuration changes with no approved record that are detected | Near 0% | 100% of changes detectable via Config-as-Code |
| Time to classify and triage a drift alert | Time for Annette to go from alert to documented decision | Hours (requires SME interpretation) | Under 30 minutes |
| Environment parity confirmation for QA | Time to confirm QA is production-equivalent | 4–8 hours of manual comparison | Under 15 minutes |
| Audit findings related to undocumented changes | Number per audit cycle | Typically 5–20 per cycle | Near zero |
| Post-change validation coverage | % of planned changes with automatic post-change validation | Near 0% | 100% of changes executed through Atlas |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| Discovery data is stale | Atlas surfaces a staleness warning before generating the comparison | Annette triggers a re-discovery run or accepts the comparison with the staleness caveat |
| ServiceNow integration unavailable | Atlas flags changes as "authorization status unknown — ServiceNow unavailable" | Annette manually checks the change record; Atlas queues and updates when connectivity restores |
| Drift threshold generates excessive alerts (alert fatigue) | Atlas surfaces a pattern analysis suggesting policy tuning | Annette and Greg review and update the accepted drift list |
| Unauthorized change cannot be safely rolled back | Atlas generates the rollback plan but flags high-risk steps and confidence level | Zach reviews; team decides whether to accept retrospectively or execute partial rollback |
| Remediation leaves environment in intermediate state | Atlas detects the intermediate state, captures it as new baseline, and generates recovery plan | Zach reviews the recovery plan; Atlas waits for human authorization |
| Post-change validation finds unintended side effects | Atlas surfaces the side-effect diff and initiates classify → decide flow for each | Annette triages secondary items; accepts or escalates as appropriate |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Change record for every production configuration change | Every configuration change requires an associated approved change record | Atlas detects changes, correlates to ServiceNow records, and tracks unauthorized changes through to resolution with a complete audit trail |
| Audit evidence for undocumented changes | Auditors require documented detection, investigation, and resolution | Atlas generates a complete incident record for every detected unauthorized change |
| Named authorization for all remediation actions | No production remediation without explicit named authorization | Atlas enforces a hard stop before any production action; authorizing user captured with timestamp |
| Accepted drift documentation | When a detected change is classified as accepted, regulators require documented deliberate acceptance | Atlas requires an explicit "accept" action with named user, timestamp, and optional rationale |
| Continuous monitoring evidence | Some frameworks require evidence that monitoring is continuous, not point-in-time | Atlas generates a monitoring activity log showing scheduled comparison runs, detected changes, and disposition |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-06: Patch Management | PTF gaps between environments are a primary category of drift. When UC-10 detects a PTF present on production but missing from QA, the remediation runs through UC-06's patch apply workflow. |
| UC-01: Audit and Compliance | UC-10 is a significant evidence producer for UC-01. The unauthorized change detection record, continuous monitoring log, and environment parity history are all audit evidence consumed by UC-01. |
| UC-11: Disaster Recovery Validation | UC-10 and UC-11 share the cross-environment diff engine. When UC-10 detects drift in a DR environment, it should surface it with a DR readiness flag linking to the UC-11 workflow. |
| UC-12: Capacity Planning and Performance Readiness | Post-Change Performance Regression (UC-12) and Post-Change Drift Validation (UC-10) are triggered by the same event. Complementary: UC-10 validates configuration state; UC-12 validates performance behavior. |
| UC-05: Change Governance and Traceability | UC-10 is the primary detection mechanism for the change traceability gap that UC-05 governs. Unauthorized changes detected by UC-10 produce the change records that UC-05 tracks. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Anomaly prediction based on drift patterns** | H2 2027 (early) / 2028+ | Atlas learns which drift patterns historically precede production incidents and surfaces predictive alerts |
| **Automatic accepted-drift policy learning** | 2028+ | Atlas observes which differences operators consistently accept and proposes policy updates |
| **Cross-environment normalization enforcement** | 2028+ | Atlas actively maintains environment parity by applying changes to non-production environments within a configurable window |
| **Business service impact mapping for drift** | H2 2027 | Surface drift findings in business service terms using the business service topology capability |

---

## 19. Pain Points & Wows Flow Analysis

> **Pillar:** Predictive Intelligence (primary) + System Intelligence (topology diff) + Change Intelligence (realignment)
> **GA Status:** H2 2027 (continuous drift monitoring and alerts); point-in-time comparison at GA

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Detect

**Personas involved:** Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Environment comparison is manual: engineers export configuration parameters from ISPF or SMP/E and compare in spreadsheets or scripts. Done infrequently and error-prone. | ⏱️ Lost Time — **1–3 days** per manual parity check, done at most quarterly |
| Annette | Unauthorized change detection relies entirely on change management process compliance — if someone makes a change without a change record, the only detection mechanism is a human noticing a behavioral difference. | 💼 Business Impact — unauthorized changes are invisible until they cause a symptom or an auditor flags them |
| Zach | Post-change validation is informal — after a planned change there is no systematic check that the environment reached the intended state. | 💼 Business Impact — post-change drift goes undetected |

---

#### Step 2 — Attribute

**Personas involved:** Annette, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Annette | When an unauthorized configuration change is detected, Annette has no immediate evidence — just a behavioral symptom and no starting point for investigation. | ⏱️ Lost Time — **hours to days** reconstructing what changed, when, and from what value |
| Annette | Investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate and require expert interpretation. | 🔒 Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without escalating to Zach |
| Zach | "QA doesn't look like prod" situations are resolved by guesswork and manual parameter comparison — often by Zach, who has better things to do. | ⏱️ Lost Time — **half a day to 2 days** per "test doesn't match prod" investigation |

---

#### Step 3 — Surface

**Personas involved:** Annette, Greg, Alex

| Persona | Pain Point | Category |
|---|---|---|
| Greg | No drift trend reporting — Greg cannot tell whether environment parity is improving or degrading over time because there is no continuous measurement. | 💼 Business Impact — architecture parity governance decisions are made without data |
| Alex | When investigating whether a QA environment is production-equivalent for performance testing, there is no structured parity report to reference. | ⏱️ Lost Time — **half a day** of manual environment comparison before performance testing |
| Annette | Raw parameter diffs without risk classification — Annette must interpret whether a Db2 ZPARM change is a compliance risk, stability risk, or cosmetic drift, without context. | 🔒 Skill Gap / Bottleneck — Annette cannot triage drift findings without Zach's interpretation |

---

#### Step 4 — Investigate

**Personas involved:** Annette, Zach, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Annette | No consolidated starting point for investigation — Annette receives a symptom, not a structured finding with evidence attached. | ⏱️ Lost Time — **hours per investigation** assembling basic evidence |
| Zach | Escalation from Annette always requires Zach to do the same log-reading investigation she cannot — no self-service investigation path. | ⏱️ Lost Time — **hours of Zach's time** on investigations Atlas could structure |

---

#### Step 5 — Remediate

**Personas involved:** Zach, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Environment realignment is fully manual — each parameter difference must be corrected individually using the appropriate subsystem tool. | ⏱️ Lost Time — **hours to days** for a full QA-to-production realignment |
| Greg | No validation that the realignment reached the intended state — the comparison must be repeated manually after remediation to confirm. | 💼 Business Impact — incomplete remediations leave residual drift undetected until the next manual check |

---

#### Step 6 — Audit

**Personas involved:** Annette, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Audit trail for drift investigation and resolution must be assembled manually from notes and tool outputs — no continuous record. | ⏱️ Lost Time — **hours** assembling evidence per audit cycle |
| Derek | Change record completeness is consistently the most labor-intensive section of audit prep — undocumented changes produce audit findings whether they were benign or not. | 💼 Business Impact — audit findings for undocumented drift are a recurring cost even when the changes were authorized |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Detect

**Personas involved:** Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Drift alert received before a behavioral symptom appears — Atlas detects the configuration change, not the downstream consequence. | 🤖 Atlas AI Insight & Automation — continuous baseline diff runs automatically; no manual comparison needed |
| Annette | Unauthorized change detection: Atlas compares current Config-as-Code state against the last registered baseline and identifies every configuration change with no corresponding record. | 🤖 Atlas AI Insight & Automation — undocumented change detection is only possible through Atlas's combined Config-as-Code model and change record history |

---

#### Step 2 — Attribute

**Personas involved:** Annette, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Undocumented change investigation starts with evidence, not guesswork — Atlas provides the configuration delta, timestamp, affected component, and user ID attribution immediately. | ⏱️ Time Saving — **hours to days reconstructing evidence → evidence provided immediately in the Atlas alert** |
| Annette | Annette can triage, decide, and act on drift findings without escalating to Zach for the basic facts. | 🆕 New User Capability — Annette independently investigates and makes accept/escalate decisions without requiring Zach |

---

#### Step 3 — Surface

**Personas involved:** Annette, Greg, Alex

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Findings classified by risk — Annette knows whether a Db2 ZPARM change is a compliance risk, stability risk, or cosmetic drift without Zach's interpretation. | 🆕 New User Capability — Annette independently triages drift findings from Atlas's risk classification |
| Greg | Drift trend reports over time — Greg can measure whether environment parity is improving as a result of governance changes, with real data. | 🤖 Atlas AI Insight & Automation — trend analysis from continuous monitoring data surfaces architectural governance insights |
| Alex | QA parity report on demand — "is this environment production-equivalent for performance testing?" answered by Atlas in a single query. | ⏱️ Time Saving — **half day manual comparison → seconds** via Atlas parity query |

---

#### Step 4 — Investigate

**Personas involved:** Annette, Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Every investigation starts with Atlas's structured evidence — Annette has a specific, verifiable starting point rather than a blank-page investigation. | 🆕 New User Capability — Annette conducts drift investigations independently, escalating to Zach only when the finding requires z/OS-level expertise |
| Zach | When Annette does escalate, the investigation is already structured — Zach reviews evidence, not repeating Annette's discovery work. | ⏱️ Time Saving — Zach's time on escalated investigations reduced because Atlas has already done evidence assembly |

---

#### Step 5 — Remediate

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Environment realignment plan generated by Atlas — targeted to only the parameters that differ and need correction. No manual parameter-by-parameter correction. | ⏱️ Time Saving — **hours to days → Atlas-generated targeted realignment plan** |
| Zach | Post-remediation validation is automatic — Atlas confirms the environment reached the intended state and the drift is closed. | 🤖 Atlas AI Insight & Automation — post-remediation comparison runs automatically; no manual re-verification needed |

---

#### Step 6 — Audit

**Personas involved:** Annette, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Annette | Incident audit trail generated automatically for every drift detection and resolution — Annette can close incidents with a complete, continuous record rather than assembling it manually. | ⏱️ Time Saving — **hours assembling evidence → automatic continuous trail** |
| Derek | Change record completeness improves for the Atlas estate — every Atlas-detected and Atlas-resolved drift item has a documented trail. Audit findings for undocumented changes reduce. | 💼 Business Impact — audit findings for undocumented drift reduce materially as Atlas coverage grows |

---

> **Overall outcome:** Drift detected in under 24 hours rather than at the next manual check. Annette independently handles drift investigations and triage without Zach. Environment parity is a continuous, queryable state — the "test doesn't look like prod" conversation is replaced by a specific, Atlas-generated parity report.

---

## 20. Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Predictive Intelligence (supporting)
> **Unit model:** Atlas Action Catalog

### Atlas Units Reference

| Category | Conversion |
|---|---|
| Intelligence Generation | 100,000 tokens = 1 unit |
| Environment Automation | 10 successful provisions = 1 unit |
| Free (footprint) | Discovery, topology nav, chat, inventory lookup, config collection |

**Key artifact rates:**

| Artifact | Tokens | Units |
|---|---|---|
| System assessment | 250,000 | 2.5 |
| Environment comparison | 300,000 | **3.0** ← primary artifact |
| Evidence package | 400,000 | 4.0 |

### Desired Outcome Flow — Atlas Units per Step

Lifecycle: `Trigger → Collect State → Compare Environments → Classify Drift → Remediate → Validate → Record`

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Trigger intake (footprint) | 0 |
| 2 — Collect State | Configuration collection (footprint) | 0 |
| 3 — Compare | Environment comparison (2 environments) | 3.0 |
| 4 — Classify | Drift classification (within comparison; risk assessment conditional) | 0–1.0 |
| 5 — Remediate | Drift remediation plan (per cluster) | 1.25 |
| 6 — Validate | Post-remediation comparison | 3.0 |
| 7 — Record | Parity record | 1.5 |
| **TOTAL** | **Nominal 2-environment comparison with remediation + validation** | **8.75 units** |

**Sensitivity:**

| Scenario | Adjustment | Multiplier |
|---|---|---|
| Read-only parity check (no remediation) | Comparison artifact only | ~0.34× |
| 2-environment comparison with single remediation | Baseline | 1.0× |
| 3-environment comparison (prod / QA / dev) | Additional environment in scope | ~1.17× |

| Scenario | Unit delta |
|---|---|
| Each additional environment in comparison | +1.5 per environment |
| Drift risk assessment generated | +1.0 |
| Weekly automated parity checks (no remediation, 52/year) | +3.0 per additional check |
| Each additional remediation cluster | +1.25 per cluster |

**Notes:**
1. UC-10 is the **primary driver of environment comparison artifact consumption**. Other use cases consume comparisons incidentally; UC-10 is the use case where comparison is the core workflow.
2. **Automated parity monitoring:** At 52 comparisons/year × 3.0 units = 156 units/year from automated parity monitoring alone.

---

## 21. External Product Synergies

### Bob PPZ (Bob for Z Premium Package)

**Summary:** No Bob PPZ touchpoint in this use case. Environment parity and drift control operates at the configuration and infrastructure layer. Drift is detected by comparing Config-as-Code state against a registered baseline — the differences are in system parameters, RACF profiles, subsystem configuration, PTF levels, and operational settings. Bob PPZ owns code-level application execution. Configuration parameter drift, RACF changes, and subsystem setting deviations are not code changes.

One peripheral enrichment exists: if drift is detected in application-layer configuration items managed through Atlas (e.g., CICS program definitions that have drifted from the Config-as-Code baseline), Bob PPZ can provide code-level context on the affected programs. This does not constitute a named Bob PPZ integration point in this use case.

> **Overall Bob PPZ relevance:** None within the core workflow. If a drift investigation surfaces an application code issue, that remediation flows through the application change management pattern (UC-07).

---

### Concert for Z

**Summary:** Environment parity and drift control is primarily Atlas-owned. However, Concert for Z's production behavioral monitoring provides a complementary signal that can surface behavioral drift before configuration drift is detected — in some cases Concert for Z detects "something changed" behaviorally before Atlas confirms "here is what changed" configurationally.

#### Tier 1 — Explicit Handoff Points

None. Drift detection, attribution, investigation, remediation, and audit are all Atlas-owned.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Detect:** Configuration drift without behavioral change is likely benign. Behavioral drift without detected configuration change may indicate a change that bypassed the Config-as-Code model — higher severity. Both signals present confirms the drift is significant. Concert for Z provides Atlas with a targeted investigation prompt: "something changed behaviorally on this LPAR at this time."

**Step 3 — Surface:** Concert for Z's incident history for the affected components enriches risk classification — a configuration drift on a system Concert for Z has previously flagged for incidents is elevated in risk compared to the same drift on a stable system.

> **Overall Concert for Z relevance:** Low-to-moderate. Complementary detection signals provide a combined view that catches drift both in configuration state and operational behavior.

---

### Terraform Self-Managed for Z

**Summary:** Environment parity and drift control is one of the two strongest Terraform synergy use cases, directly addressed by Terraform Synergy Use Case 1 — Config-as-Code Baseline and Drift Remediation. Atlas detects and analyses drift in the z/OS software, middleware, application, and configuration layers; Terraform detects and enforces the infrastructure layer. Together they close the full-stack drift loop that neither can close independently.

#### Tier 1 — Explicit Handoff Points

**Step 3 — Compare Environments**

Atlas requests the Terraform `plan` output comparing the current state of each environment's workspace against its declared HCL configuration. This plan output becomes the infrastructure-layer diff in the Atlas environment comparison, producing a complete full-stack comparison rather than a software-only comparison.

**What comes back to Atlas:** Infrastructure-layer diff for each environment from Terraform's plan output.

---

**Step 5 — Remediate**

For infrastructure-layer drift items (e.g., a memory allocation changed outside the Terraform workflow), Atlas directs the team to apply the Terraform plan that restores the LPAR to its declared state. Atlas tracks the `terraform apply` as a dependency in the overall remediation plan.

**What comes back to Atlas:** Terraform apply completion confirmation. Atlas marks those items as resolved and proceeds with remaining remediations.

---

**Step 6 — Validate (Post-Remediation)**

Atlas requests a fresh `terraform plan` for each environment's workspace to confirm infrastructure parity is clean (zero planned changes).

**What comes back to Atlas:** Clean `terraform plan` outputs confirming zero infrastructure drift. Atlas incorporates into the post-remediation parity record.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Trigger:** When Terraform detects infrastructure drift during a scheduled `terraform plan` run, it provides a signal to Atlas to investigate whether the infrastructure drift correlates with broader configuration or software-layer drift.

**Step 7 — Record:** Terraform's state version history provides the infrastructure layer of the parity record — a versioned before/after snapshot of the infrastructure state for each LPAR that was remediated.

> **Overall Terraform relevance:** High. The full-stack drift loop cannot be closed without both products. Organizations using both should treat UC-10 as a combined Atlas+Terraform workflow, not two independent drift detection processes.
