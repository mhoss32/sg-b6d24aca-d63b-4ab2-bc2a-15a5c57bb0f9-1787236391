# UC-12: Capacity Planning and Performance Readiness
*Version 1.0 | Owner: Product Management | Last updated: August 2026*

---

## Executive Summary

IBM Z teams routinely discover capacity constraints and performance problems during production incidents — after the damage is done. Atlas joins historical performance telemetry, live system configuration, transaction topology, and change history to replace reactive firefighting with proactive capacity management: surfacing constraints before peak events, diagnosing degradation root causes in minutes rather than days, and generating validated configuration changes before they touch production.

---

## 1. Overview

Capacity Planning and Performance Readiness covers the full spectrum of ensuring IBM Z systems perform correctly under expected and peak load — from preparing for a known high-volume event, to diagnosing an active performance degradation, to detecting that a configuration change caused a regression before users escalate. It is the use case where Predictive Intelligence, System Intelligence, and Change Intelligence converge most visibly: predicting risk, tracing root cause, and executing the fix are all part of a single workflow.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When a peak season event, application change, or performance complaint arrives, I want to understand what is causing or will cause a performance problem — and have a validated fix ready to apply — so I can prevent or resolve production incidents before they impact the business. |
| **Emotional** | The performance engineer and operations manager want to face a high-volume event without dread — confident that they have found the constraints ahead of time and have tested the remediation, not just guessed at it. |
| **Social** | The team wants to present to the business with evidence — a tested configuration plan with headroom metrics — rather than a verbal assurance that this year will be different from last year. |

---

## 3. Customer Problem and Outcome

**Problem:**
Capacity management on IBM Z is largely reactive. Teams discover constraints during production incidents — buffer pool exhaustion, CICS MXT limits, MQ queue depth saturation — not before them. When a performance problem surfaces, tracing the root cause requires OMEGAMON, manual SMF analysis, Db2 accounting traces, and coordination across at minimum two or three specialist teams. The average time to root cause in a multi-system performance incident is measured in days, not hours. Post-change performance regression is similarly opaque: a configuration or software change can quietly degrade an application with no clear signal linking the change to the symptom.

**Current State (Without Atlas):**
- Capacity planning for peak events relies on manual analysis of prior-year SMF data, spreadsheets, and the institutional memory of one or two experienced engineers. There is no systematic projection methodology.
- Configuration sizing for peak load (Db2 buffer pools, CICS MXT, MQ queue depth, DASD allocation) is determined by experience and rule of thumb, not by modeled projection against actual transaction growth trends.
- Performance testing before applying configuration changes requires a dedicated lab environment, is logistically difficult to schedule, and is often skipped.
- Diagnosing a live performance degradation requires three or more specialist teams (CICS team, Db2 DBA, systems programmer) to each pull their own telemetry independently and then coordinate by conference call.
- The link between a configuration change and a subsequent performance regression is usually discovered by accident or through exhaustive manual investigation — not through automated attribution.
- Dark capacity (underutilized resources, over-provisioned LPARs) is invisible without dedicated analysis. Teams routinely procure capacity they already have.

**Desired Outcome:**
- Before a peak event, a performance engineer can ask Atlas to model the risk, project transaction volume against current configuration, and identify constraints — in one session, without pulling data from multiple tools.
- Configuration changes are tested in an isolated environment at simulated load before production apply, with headroom validated at each threshold.
- When a performance degradation is reported, root cause is identified within one conversation — with the responsible change event attributed, the fix generated, and the remediation validated before production.
- Post-change performance regressions are surfaced by Atlas automatically, correlating system behavior changes to recent configuration history, without waiting for a user complaint.
- Dark capacity is continuously visible, enabling procurement decisions to be based on actual utilization data rather than estimates.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Capacity visibility is a named deliverable in the Atlas Base subscription at H1 2027. Application Performance Diagnosis drives the Atlas Test SKU by requiring test environment provisioning for validation. Peak Season Capacity Preparation is a high-value, high-urgency use case that creates strong sales conversations ahead of peak retail and financial cycles. |
| **Retention impact** | Organizations that use Atlas to prepare for peak events accumulate validated configuration baselines and historical performance correlation data in Atlas over time. This creates structural retention — the data and institutional knowledge live in Atlas, not in a spreadsheet or a departing engineer's head. |
| **Competitive differentiation** | No existing tool joins transaction topology, Db2 buffer pool configuration, CICS tuning parameters, MQ configuration, and historical performance telemetry into a single analysis. OMEGAMON, Intellimagic, and SMF tooling each cover a fragment. The cross-pillar performance diagnosis capability (Predictive Intelligence identifies the symptom; System Intelligence traces the cause; Change Intelligence executes the fix) is uniquely Atlas. |
| **Portfolio attach** | The performance testing scenario requires environment provisioning, creating pull-through for the Atlas Provision SKU. The capacity visibility capability surfaces right-sizing data that directly informs IBM Z hardware and software procurement decisions — creating a natural connection to the IBM Z portfolio sales conversation. |

> **Commercial constraints (internal):** Performance testing scenarios require the Atlas Test SKU for full test execution capability. Capacity visibility is available in Atlas Base at H1 2027. Feature gating at the Atlas Base tier affects what Alex experiences before upgrading to Atlas Test.

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Alex — Performance / Application Engineer | Initiates performance diagnosis and capacity planning workflows. Owns the technical analysis and test execution. Responsible for the validated configuration recommendation that goes to production. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Executes the production configuration changes that Atlas recommends. Reviews configuration change plans before apply. Owns the z/OS-level parameters (buffer pools, MXT, DASD). |
| **Secondary** | Annette — IT Operations Engineer | Monitors ongoing system performance and is typically the first to receive a user complaint about application slowness. Triggers the performance diagnosis workflow by escalating to Alex. Consumes post-incident reports. |
| **Secondary** | Quinn — IT Operations Manager | Receives capacity readiness reports before peak events. Approves production configuration changes. Needs an executive-readable risk summary, not raw telemetry. |

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **Predictive Intelligence** | **Primary.** This is one of the defining Predictive Intelligence use cases. Historical performance data, load projection, proactive alerting, anomaly correlation, and behavioral baseline comparison are all Predictive Intelligence capabilities. | H2 2027 (full); H1 2027 (capacity visibility subset) |
| **System Intelligence** | **Foundational.** Configuration state — buffer pool sizing, CICS parameters, MQ configuration, DASD allocation — is System Intelligence data. Transaction topology traversal (isolating which Db2 call within which program chain is expensive) is a System Intelligence capability. | GA Dec 2026 |
| **Change Intelligence** | **Execution.** Once root cause is identified or a capacity change is planned, the validation and production apply path is Change Intelligence: test environment provisioning, load simulation, configuration change orchestration, and post-apply monitoring. | H1 2027 (provisioning and test); H2 2027 (performance testing with CyberVault/GDPS dependency) |

**Important:** This use case is one of the strongest demonstrations of all three pillars activating within a single conversation. In the Application Performance Diagnosis scenario, a user starts with a symptom (slow application), Atlas identifies the cause through Predictive Intelligence and System Intelligence, and resolves it through Change Intelligence — without the user switching tools or context.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate |
|---|---|---|---|
| Dark Capacity Discovery | **Planned** | H1 2027 | Capacity visibility capability; I/O topology discovery (Project Gravity integration) |
| Application Performance Diagnosis | **Planned** | H1 2027 | Performance diagnosis skill; change history correlation; transaction topology via TIB (ZUnderstand + OMEGAMON) |
| Post-Change Performance Regression | **Planned** | H1 2027 | Performance diagnosis skill; Config-as-Code change attribution; OMEGAMON integration in TIB |
| Peak Season Capacity Preparation | **Planned** | H2 2027 | Predictive Intelligence load projection; performance testing (CyberVault + GDPS integration dependency); stress testing |

**Capability dependency notes:**
- Dark Capacity Discovery and Application Performance Diagnosis land in H1 2027. Both depend on OMEGAMON being available in TIB to provide performance telemetry, and on the capacity gap analysis and performance diagnosis skills being available.
- Post-Change Performance Regression also lands in H1 2027, but requires Config-as-Code change history to be correlated with OMEGAMON performance telemetry — a TIB multi-source query capability.
- Peak Season Capacity Preparation — specifically the load simulation and stress testing component — is dependent on CyberVault and GDPS integrations for production-scale environment replication. This is the most capability-gated scenario in this use case. The roadmap lists performance testing as conditional in H2 2027 and stress testing as a stretch goal. The scenario can be partially delivered earlier (risk projection, configuration planning) but the full validated test-at-load workflow requires these integrations.
- All four scenarios benefit from the transaction topology data that flows through ZUnderstand in TIB (available Aug 19 onwards for demo; production in TIB at GA).

---

## 8. Scope and Boundaries

**In Scope:**
- Proactive capacity risk assessment before known peak events (peak season, product launch, month-end close)
- Load projection based on historical transaction growth data
- Configuration constraint identification: Db2 buffer pools, CICS MXT, MQ queue depth, DASD allocation, address space sizing
- Dark capacity detection: underutilized LPARs, over-provisioned resources, right-sizing recommendations
- Application performance degradation diagnosis: symptom triage, root cause identification, change attribution
- Post-change performance regression detection: correlating configuration or software changes to performance behavior changes
- Performance-focused configuration change planning: specification, provisioning, load simulation, validation
- Performance test execution and baseline comparison (function and integration levels — H1 2027; load and stress — H2 2027, conditional)

**Out of Scope:**
- Application code-level performance profiling and optimization — owned by UC-07 (Application Change Management). Atlas identifies which application component is performing poorly; it does not optimize the code itself.
- Hardware capacity planning and procurement decisions — Atlas surfaces the data; procurement decisions are out of scope.
- Disaster recovery environment validation — owned by UC-11 (Disaster Recovery Validation).
- OMEGAMON configuration and SMF collection policy — Atlas consumes OMEGAMON data; it does not configure the monitoring infrastructure.
- Application-level database tuning (SQL optimization, index creation) — Atlas identifies the expensive query and the context; DBA-level SQL tuning is out of scope.

**Non-Goals:**
- Atlas does not replace OMEGAMON or Intellimagic as an operational monitoring tool. It consumes their data for analysis and decision support; it does not replicate their monitoring functions.
- Atlas does not make autonomous production configuration changes based on performance observations. All configuration changes require explicit human authorization.
- Atlas does not guarantee performance outcomes. It provides validated projections and test evidence; actual production behavior may differ from isolated environment results.

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | OMEGAMON is deployed in the customer environment and its data is accessible via TIB. Without OMEGAMON telemetry, Atlas can identify configuration state but cannot diagnose performance behavior or correlate telemetry to change history. |
| **Assumption** | At least 6–12 months of historical performance and transaction data is available for load projection. Short history windows produce low-confidence projections; Atlas should surface confidence intervals when data is limited. |
| **Assumption** | The Atlas topology model is current. Capacity analysis requires knowing what is actually deployed and how resources are allocated; a stale model will produce incorrect analysis. |
| **Assumption** | Transaction topology is available via ZUnderstand in TIB. Without transaction-level topology, performance diagnosis is limited to system-level symptom identification and cannot traverse to the specific program and Db2 call responsible for the latency. |
| **Dependency** | Peak Season Capacity Preparation (full load simulation) depends on CyberVault and GDPS integrations for production-scale environment replication. Without these, load simulation is limited to partial or isolated environment testing. |
| **Dependency** | Application Performance Diagnosis depends on OMEGAMON data in TIB, and on Config-as-Code change history being available to correlate the performance inflection point to a specific configuration change event. |
| **Dependency** | Dark Capacity Discovery depends on the I/O topology layer from Project Gravity (H1 2027). Without I/O topology, resource utilization analysis is limited to compute; storage and network resource utilization visibility requires Project Gravity. |
| **Dependency** | Performance testing within this use case requires the Atlas Test SKU for full capability. The Atlas Base tier includes limited test execution volume; full load simulation requires the Test add-on. |
| **Risk** | The CyberVault / GDPS dependency for full-scale performance testing makes the Peak Season Capacity Preparation scenario the most roadmap-fragile in this use case. If those integrations slip, the scenario delivers partial value (planning and partial load simulation) but not the full end-to-end validated test-at-production-scale story. |
| **Risk** | OMEGAMON SMF data volume and retention policies vary by customer. Some customers retain only 30–60 days of SMF data, which may be insufficient for year-over-year trend projection. Atlas should detect and surface data sufficiency warnings before generating projections. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts |
|---|---|---|---|---|---|
| S1 | Dark Capacity Discovery | Alex or Quinn asks Atlas what capacity is unused or under-utilized across the estate | Planned — H1 2027 | H1 2027 | UX Flow, Chat Exchange, Screen designs |
| S2/S3 | Performance Diagnosis and Regression Detection | Entry A: Annette escalates a user complaint and Alex investigates. Entry B: Alex suspects a recent change caused a regression. | Planned — H1 2027 | H1 2027 | Single UX Flow (two entry variants), Chat Exchange (one per entry), Screen designs |
| S4 | Peak Season Capacity Preparation | Quinn escalates an upcoming high-volume event; Alex needs to model risk and validate the configuration | Planned — H2 2027 | H2 2027 — blocked on CyberVault + GDPS integration | UX Flow, Chat Exchange, Screen designs |

**Design decisions recorded in this catalog:**
- **S2/S3 are one UX flow with two entry points.** A user complaint escalation (Annette → Alex) and Alex's own regression suspicion both lead to the same diagnosis flow. The entry point determines whether Atlas starts from a performance alert or a change event; the rest of the flow is identical.
- **Performance testing at H1 2027 is directional, not full-scale.** The initial delivery of the S2/S3 Validate phase is positioned as directional performance testing — a fast gut-check in an isolated partial environment to confirm whether a change caused a regression, not a production-scale load simulation. Full production-scale load and stress testing lands in S4 at H2 2027.
- **S4 is blocked, not deferred.** The Peak Season Capacity Preparation scenario cannot be demo-ready or customer-deliverable until CyberVault and GDPS integrations are available.
- **S1 is the right opener for a financial or procurement buyer.** Dark Capacity Discovery requires only utilization data and I/O topology — no performance telemetry or test environment.

---

## 11. Lifecycle Overview

```
Detect / Trigger → Baseline → Analyze → Model / Diagnose → Plan → Validate → Execute → Monitor
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Detect / Trigger** | An event initiates the workflow: a user performance complaint is escalated, an upcoming peak event is flagged, Alex suspects a regression, or Atlas proactively surfaces a capacity risk or anomaly. | Atlas (proactive) or User (query) |
| **Baseline** | Atlas establishes the current state: configuration parameters, resource utilization, transaction volume trends, and historical performance patterns. | Atlas |
| **Analyze** | Atlas analyzes the gap between baseline and risk or symptom. For capacity planning: projects future load against current configuration and identifies where constraints will occur. For performance diagnosis: traverses transaction topology and change history to isolate root cause. | Atlas |
| **Model / Diagnose** | Atlas produces a structured finding: specific configuration parameters at risk or causing the problem, transaction components affected, confidence level, and recommended configuration change. | Atlas |
| **Plan** | Atlas generates a configuration change plan — parameters to modify, sequencing, dependencies — scoped to the specific finding. For capacity planning, the plan also defines the load simulation spec. | Atlas |
| **Validate** | Atlas applies the proposed configuration changes to an isolated test environment and runs the load simulation or regression test suite. Results are compared against baseline and success thresholds. | Atlas (test execution) / User (authorizes) |
| **Execute** | User approves production apply. Atlas orchestrates the configuration change in the correct sequence. Post-apply behavior is monitored against the pre-change baseline. | Atlas (orchestrates) / User (authorizes) |
| **Monitor** | For peak event scenarios, Atlas maintains continuous monitoring through the event window — surfacing real-time metrics against defined thresholds and alerting if any metric approaches a risk boundary before it is breached. | Atlas (proactive) |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Performance telemetry retrieval and baseline establishment | **Atlas** | Joins OMEGAMON data, SMF history, and Config-as-Code state; no manual data pull required |
| Historical trend analysis and load projection | **Atlas** | AI-driven; Atlas surfaces confidence level and data sufficiency warnings |
| Transaction topology traversal for root cause isolation | **Atlas** | Requires ZUnderstand data in TIB; without it, Atlas flags the limitation explicitly |
| Configuration change attribution (linking change to symptom) | **Atlas** | Cross-references Config-as-Code change history against performance telemetry inflection points; proactive — no user prompt required |
| Configuration change specification | **Atlas** | Atlas generates the specific parameter changes, including sizing calculations; Zach reviews before apply |
| Load simulation specification | **Atlas** | Atlas generates the workload model, thresholds, and metrics to capture; Alex reviews and adjusts the success criteria |
| Test environment provisioning | **User (H1 2027)** → **Atlas (H2 2027)** | Full production-scale environment replication requires CyberVault/GDPS integration. Prior to that, isolated partial-environment testing with user-operated provisioning |
| Load simulation execution | **Atlas** | Automated; Atlas surfaces threshold-by-threshold results and proactively flags new constraints discovered during testing |
| Production configuration change decision | **User** | Governance gate. Alex generates the recommendation; Zach or Quinn approves and authorizes production apply. |
| Production apply execution | **Atlas (orchestrates) / Zach (authorizes)** | Atlas sequences the configuration changes; Zach authorizes each production system apply |
| Continuous monitoring during peak event window | **Atlas** | Proactive; Atlas monitors against defined thresholds and alerts before breach, not after |
| Dark capacity reporting for procurement decisions | **Atlas (data) / Quinn (decision)** | Atlas surfaces utilization data and right-sizing recommendations; procurement decisions remain human |
| Post-incident recommendation recording | **Atlas** | Atlas records root cause, fix, and process recommendation in the change record for future reference |

**Governance gates — explicit human approval required before:**
1. Applying configuration changes to a test environment (at H1 2027; Atlas-native provisioning: user approves the provisioning action)
2. Applying any configuration change to production — authorized by Zach or Quinn
3. Proceeding with load simulation at each threshold level during peak season preparation (optional checkpoint — Alex may choose continuous or stepped execution)

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Cross-pillar performance correlation** | Atlas joins performance telemetry (Predictive Intelligence), transaction topology (System Intelligence), and configuration change history (Change Intelligence) in a single analysis session. No tool switching or specialist coordination required. | The current process requires OMEGAMON, SMP/E or ISPF change history, Db2 accounting trace, and a multi-team conference call to achieve what Atlas does in one conversation. The time savings is measured in days, not hours. |
| **Latency-to-topology traversal** | When a performance symptom is identified, Atlas traverses the transaction topology to isolate the specific program, Db2 call, or configuration parameter responsible — not just the application tier. | Without transaction topology awareness, root cause isolation requires a Db2 DBA to run accounting traces manually. Atlas delivers the same result without specialist involvement. |
| **Proactive change attribution** | Atlas automatically correlates the performance inflection point in the telemetry against Config-as-Code change history to identify the responsible change event, the change author, and the change record — without being asked. | The user reports a symptom; Atlas surfaces the cause, the specific change, who made it, and the fix — all unprompted. This is only possible because Atlas holds both the telemetry and the change history in a single model. |
| **Load projection with growth modeling** | Atlas projects future transaction volume based on historical growth trends and models the projected load against current configuration parameters to produce a constraint timeline. | Manual projection requires an experienced analyst with access to SMF history and spreadsheet modeling. Atlas does this automatically and updates the projection as new data arrives. |
| **Proactive constraint discovery during testing** | During load simulation, Atlas does not just validate the planned changes — it proactively identifies new constraints that only become visible at the tested load level (e.g., MQ queue depth saturation that wasn't a factor at prior year's volume). | Without this, teams assume "tests passed" means "all risks found." Atlas surfaces the constraints the team did not know to look for. |
| **Continuous peak-event monitoring with threshold alerting** | During a live peak event, Atlas monitors all relevant metrics continuously and alerts before a threshold is breached — not after. | The difference between a performance incident and a prevented incident is the alert arriving before saturation, not during it. |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| **Time to root cause (performance diagnosis)** | Time from "user reports application slowness" to confirmed root cause with change attribution | 1–3 business days (multi-team investigation) | Under 2 hours (single Atlas conversation) |
| **Peak event preparation confidence** | Whether the team has tested the configuration plan under simulated load before the event | Rarely — most teams plan but don't test at scale due to lab constraints | 100% of peak events with >2 weeks notice have a tested configuration plan |
| **Configuration constraints discovered pre-event** | Number of capacity constraints found and resolved before a peak event vs. discovered during it | Most discovered during the incident | All constraints found during the preparation scenario, zero discovered during the live event |
| **Dark capacity reclaimed** | Dollar value or resource units of capacity identified as underutilized and reclaimed or right-sized | Near zero (dark capacity is invisible without dedicated analysis) | Measurable reclamation within 90 days of Dark Capacity Discovery scenario adoption |
| **Post-change regression detection latency** | Time from configuration change apply to detection of a performance regression caused by that change | Days to weeks (typically discovered through user complaints) | Same day or next day (Atlas correlates within one telemetry collection cycle) |
| **Performance test environment adoption** | % of significant configuration changes that include a load-validated test cycle before production apply | Low (test environments are hard to spin up; skipped under time pressure) | 70%+ for changes to Db2 buffer pools, CICS MXT, and MQ queue depth once Atlas Test SKU is available |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| **OMEGAMON data is unavailable or incomplete in TIB** | Atlas detects the missing data source and surfaces an explicit warning: "Performance telemetry for this LPAR is not available in the current TIB configuration. Root cause analysis is limited to configuration state." | Alex works with the system administrator to enable the OMEGAMON TIB integration. Atlas proceeds with configuration-state-only analysis and flags what is missing. |
| **Insufficient historical data for load projection** | Atlas detects that history is less than 6 months and surfaces a low-confidence warning with the projection, including a confidence interval based on available data. | Alex uses the projection as directional guidance only, acknowledges the uncertainty, and plans for more conservative headroom in the configuration changes. |
| **New constraint discovered during load simulation** | Atlas surfaces the new finding proactively during test execution, adds it to the configuration change plan, and requests re-validation at the relevant threshold. | Alex reviews the addition, approves the updated plan, and Atlas re-runs the relevant load threshold with the additional change in place. |
| **CyberVault / GDPS integration not available for full-scale load simulation** | Atlas clearly scopes the test to "partial isolated environment" and marks the test results as not representative of production-scale load. The projection remains available; only the full validation is constrained. | Alex presents the projection and partial test evidence to Quinn with the explicit caveat. Quinn decides whether to proceed to production on partial evidence or wait for the integration. |
| **Load simulation environment diverges from production configuration** | Atlas detects the environment delta and flags it before concluding validation. | Alex reviews the delta, determines if it is material to the test, and either accepts the result with the delta noted or requests a reprovisioning with the correct parameter. |
| **Root cause attribution is ambiguous** (multiple change events near the inflection point) | Atlas surfaces all candidate change events ranked by correlation strength and explains the evidence for each. It does not claim a single root cause when the evidence is ambiguous. | Alex reviews the candidates, uses Atlas to drill into each, and makes the attribution judgment with Atlas's supporting analysis. |
| **Production configuration change causes unexpected behavior post-apply** | Atlas detects the behavioral deviation through post-apply monitoring and alerts immediately. It compares current post-apply behavior against the validated test environment results and identifies the divergence point. | Alex investigates the divergence. If reversal is needed, Atlas generates the rollback change plan using the pre-apply configuration state. |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **Change record for configuration changes** | All production configuration changes (Db2 ZPARM, CICS parameters, MQ configuration) require change records with validation evidence. | Atlas generates a complete change artifact — parameter changes, load simulation results, approval chain — and can push it to ServiceNow as a change record attachment. |
| **Performance baseline documentation** | Some regulated industries require documented performance baselines before and after significant configuration changes. | Atlas preserves the pre-change baseline, test environment configuration, and post-apply behavior snapshot as immutable artifacts linked to the change record. |
| **Peak event readiness sign-off** | Many operations teams require a formal readiness sign-off before high-volume events. | Atlas generates a capacity readiness artifact — projected headroom at each tested threshold, configuration changes applied, validation evidence — formatted for management sign-off. |
| **Root cause documentation for performance incidents** | Post-incident reviews require documented root cause, timeline, and corrective action. | Atlas generates the root cause record automatically during performance diagnosis, including the change attribution, the responsible change event, and the recommended process improvement. |
| **Authorization before production apply** | Production configuration changes require named authorization. | Atlas enforces a hard stop before any production action. Authorization is captured with timestamp and user identity in the change artifact. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-06: Patch Management | Post-Change Performance Regression (S3) is frequently triggered by a PTF or middleware patch applied through UC-06. The two use cases share the configuration change attribution capability. When Atlas detects a performance regression in UC-12, it may surface a PTF applied via UC-06 as the root cause. |
| UC-07: Application Change Management | Application code changes can cause performance regressions just as configuration changes can. When Atlas traces a performance symptom in UC-12 to an application code change rather than a configuration change, the handoff to UC-07 is natural. The diagnosis path is shared; the remediation path diverges. |
| UC-10: Environment Parity and Drift Control | Environment configuration drift can cause capacity and performance divergence between environments. Drift found by UC-10 that has performance implications feeds UC-12. |
| UC-11: Disaster Recovery Validation | Peak Season Capacity Preparation may require validating that the DR environment can also handle peak load, not just that it mirrors production configuration. Atlas should surface this as a recommendation from UC-12 when preparing for peak events. |
| UC-05: Change Governance and Traceability | UC-12 is a significant consumer of change history data owned by UC-05. The change attribution capability in Application Performance Diagnosis and Post-Change Performance Regression depends on Atlas having a complete, accurate change record to cross-reference against performance telemetry. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Full production-scale load and stress testing** | H2 2027 (conditional) / 2028+ | Requires CyberVault + GDPS integration for production-scale environment replication. This is the single biggest capability gap in this use case at H1 2027. |
| **Continuous peak-event monitoring in production** | H2 2027 | Real-time Atlas monitoring during live high-volume events — alerting before threshold breach, not after. Requires Predictive Intelligence behavioral baseline capability from H2 2027. |
| **Anomaly prediction (pre-incident)** | H2 2027 | Pattern-based anomaly detection using historical topology and change data. Atlas alerts on emerging performance patterns that precede known failure modes — before any user reports a problem. |
| **Business service performance impact mapping** | H2 2027 | Map performance metrics to business service definitions (e.g., "Claims Processing is at risk"). Translates technical performance data into business impact language for executive consumption. |
| **Self-learning performance baselines** | 2028+ | Atlas learns from historical peak events and post-change behavior to continuously refine its load projections and constraint models — reducing false positives and improving projection accuracy over time. |
| **Autonomous capacity adjustment (supervised)** | 2028+ | For well-understood, low-risk configuration parameters (e.g., MQ queue depth increases during a live event), Atlas proposes and applies adjustments autonomously within pre-approved bounds, with real-time visibility and a kill switch. |

---

## 19. Pain Points & Wows Flow Analysis

> **Pillar:** Predictive Intelligence (primary) + System Intelligence (topology/config) + Change Intelligence (execution)
> **GA Status:** H1 2027 (capacity visibility); Atlas Test SKU for performance testing

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Detect

| Persona | Pain Point | Category |
|---|---|---|
| Annette | Performance problems are discovered through user complaints or production incidents — there is no proactive signal before throughput degrades. | 💼 Business Impact — performance degradation is reactive; by the time the user complains, impact is already occurring |
| Alex | Capacity planning for peak events relies on manual analysis of prior-year SMF data, spreadsheets, and institutional memory of one or two experienced engineers. | ⏱️ Lost Time — **weeks** of manual SMF analysis and projection work before peak season capacity is understood |
| Alex | No systematic projection methodology — capacity estimates are based on experience and rule of thumb, not on modeled projection against actual transaction growth trends. | 💼 Business Impact — peak season capacity surprises are a recurring risk because the projection method is not rigorous |

#### Step 2 — Diagnose

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Diagnosing a live performance degradation requires three or more specialist teams (CICS team, Db2 DBA, systems programmer) to pull their own telemetry independently and coordinate by conference call. | ⏱️ Lost Time — **hours to days** to reach root cause in a multi-system performance incident |
| Alex | The link between a configuration change and a subsequent performance regression is usually discovered by accident or through exhaustive manual investigation — not through automated attribution. | 💼 Business Impact — post-change performance regressions go unattributed, and the same class of change can cause the same regression again |
| Annette | First line of response to user performance complaints has no tool to quickly triage whether the issue is CICS, Db2, MQ, or infrastructure — escalation is reflexive, not data-driven. | 🔒 Skill Gap / Bottleneck — Annette cannot independently triage performance issues; every complaint is escalated to Alex |

#### Step 3 — Size

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Configuration sizing for peak load (Db2 buffer pools, CICS MXT, MQ queue depth, DASD allocation) is determined by experience and rule of thumb, not by modeled projection against actual transaction growth trends. | 💼 Business Impact — under-sizing causes peak failures; over-sizing wastes capacity that could be right-sized |
| Alex | Dark capacity (underutilized resources, over-provisioned LPARs) is invisible without dedicated analysis — teams routinely procure capacity they already have. | 💼 Business Impact — unnecessary hardware and software capacity purchased due to lack of right-sizing visibility |

#### Step 4 — Validate

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Performance testing before applying configuration changes requires a dedicated lab environment — logistically difficult to schedule, and often skipped. | ⏱️ Lost Time — **days to weeks** to schedule and set up a performance test environment |
| Alex | Without test validation, configuration changes are applied to production speculatively — if the sizing estimate was wrong, the next peak event surfaces it. | 💼 Business Impact — unvalidated configuration changes applied to production create risk if the sizing model was inaccurate |

#### Step 5 — Apply

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Production configuration change planning is a separate manual process from the performance analysis — no connection between the diagnosis and the remediation plan. | ⏱️ Lost Time — **additional hours** translating performance findings into a production change plan |
| Quinn | Production capacity changes require Quinn's approval — but the evidence is presented as raw performance data, not as a management-readable risk and recommendation. | 🔒 Skill Gap / Bottleneck — Quinn cannot approve production capacity changes without Zach producing a separate management summary |

#### Step 6 — Monitor

| Persona | Pain Point | Category |
|---|---|---|
| Alex | Post-change performance regression attribution is opaque — a configuration or software change can quietly degrade an application with no clear signal linking the change to the symptom. | 💼 Business Impact — silent post-change regressions can accumulate over weeks before they surface as a noticeable degradation |
| Annette | Ongoing system performance monitoring requires OMEGAMON and other specialist tools — Annette monitors alerts without the ability to cross-correlate symptoms across CICS, Db2, and MQ. | 🔒 Skill Gap / Bottleneck — Annette cannot perform cross-subsystem performance correlation without escalating to Alex |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Detect

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Capacity constraints approaching peak thresholds surfaced by Atlas before the event — "Db2 buffer pool at 82% projected capacity at forecast peak load" — not discovered during the peak event itself. | 🤖 Atlas AI Insight & Automation — proactive constraint projection from transaction growth trend analysis; no manual SMF analysis required |
| Annette | Post-change performance regressions surfaced by Atlas automatically — correlated to the responsible configuration change event without manual investigation. | 🤖 Atlas AI Insight & Automation — behavioral baseline comparison attributes regression to the specific change that caused it |

#### Step 2 — Diagnose

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Root cause identified within one Atlas conversation — the responsible change event attributed, the fix generated, the remediation validated — without three-team conference call. | ⏱️ Time Saving — **hours to days of multi-team investigation → one Atlas conversation** for performance root cause |
| Annette | Atlas provides a triage starting point from the first user complaint — CICS, Db2, MQ, or infrastructure identified as the responsible subsystem before Alex is engaged. | 🆕 New User Capability — Annette independently triages performance complaints and provides Alex with a structured starting point instead of a blank escalation |

#### Step 3 — Size

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Peak event capacity risk modeled by Atlas in one session — transaction projection against current configuration, constraint identification, configuration recommendation — without pulling data from multiple tools. | ⏱️ Time Saving — **weeks of manual SMF analysis and projection → one Atlas session** for capacity risk modeling |
| Alex | Dark capacity identified by Atlas — right-sizing recommendations based on actual utilization data, enabling procurement decisions grounded in evidence rather than rule of thumb. | 🤖 Atlas AI Insight & Automation — utilization analysis across the estate surfaces under-provisioned and over-provisioned LPARs automatically |

#### Step 4 — Validate

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Configuration changes tested at simulated production load in an isolated environment — headroom confirmed at each buffer pool, MXT, and queue depth threshold before production. | ⏱️ Time Saving — **days to weeks scheduling a lab test → Atlas provisions and runs the performance test** |
| Alex | Validation confirms the sizing model was correct before production is touched — no speculative capacity changes with unknown headroom. | 🤖 Atlas AI Insight & Automation — simulation confirms the capacity recommendation before production application |

#### Step 5 — Apply

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Production configuration change plan generated directly from the validated performance analysis — no separate translation from diagnosis to change plan. | ⏱️ Time Saving — diagnosis → change plan in the same Atlas session |
| Quinn | Atlas generates a management-readable capacity readiness summary — risk quantified, recommendation justified, validation evidence attached. Quinn approves without requiring a separate Zach briefing. | 🆕 New User Capability — Quinn makes informed production capacity decisions independently from the Atlas artifact |

#### Step 6 — Monitor

| Persona | Wow Moment | Category |
|---|---|---|
| Alex | Post-change regression attributed automatically — if a configuration change introduces a performance degradation, Atlas surfaces the correlation to the responsible change event without manual investigation. | 🤖 Atlas AI Insight & Automation — behavioral baseline comparison after every change automatically surfaces regressions |
| Annette | Cross-subsystem performance picture available to Annette in Atlas — CICS, Db2, MQ correlations surfaced without requiring OMEGAMON expertise. | 🆕 New User Capability — Annette monitors cross-subsystem performance health from Atlas without specialist tool access |

> **Overall outcome:** Performance root cause reduced from hours to days of multi-team investigation to a single Atlas conversation. Peak season capacity surprises eliminated through proactive constraint projection. Dark capacity identified through utilization analysis — procurement decisions grounded in evidence.

---

## 20. Atlas Units Estimation

> **Pillar:** Predictive Intelligence (primary) + System Intelligence (supporting)
> **GA Status:** H1 2027 (full; partial behaviors at GA Dec 2026)

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
| Evidence package | 400,000 | 4.0 |
| Directional performance test | 500,000 | **5.0** ← primary artifact for this use case |
| Virtual environment provision (per 10) | — | 1.0 |

### Desired Outcome Flow — Atlas Units per Step

Lifecycle: `Trigger → Baseline Analysis → Capacity Assessment → Performance Test Generated → Provision Test Environment → Execute → Analyze → Recommend → Record`

#### Step 1 — Trigger
A change is approaching or Atlas proactively surfaces a capacity concern based on trend analysis.
**Unit type:** Footprint — **0 units**

#### Step 2 — Baseline Analysis
Atlas collects the current performance baseline: MSU utilization trends, response time baselines, transaction throughput, memory and storage headroom, Db2 buffer pool utilization, CPU-bound transaction identification.

| Activity | Tokens | Units |
|---|---|---|
| Raw baseline collection (footprint) | Footprint | 0 |
| Baseline performance summary document (if generated) | ~100,000 | **1.0** |

**Step 2 subtotal: 0–1.0 units**

#### Step 3 — Capacity Assessment
Atlas assesses whether current capacity headroom is sufficient for the projected workload change, analyzing MSU trends vs. MIPS entitlement, storage growth trajectory, memory pressure indicators.

| Activity | Tokens | Units |
|---|---|---|
| Capacity gap assessment | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

#### Step 4 — Performance Test Generated
Atlas generates the directional performance test configuration — the workload definition, baseline measurements, post-change measurement points, comparison thresholds, and result criteria.

| Activity | Tokens | Units |
|---|---|---|
| Directional performance test asset generated | 500,000 | **5.0** |

**Step 4 subtotal: 5.0 units**

#### Step 5 — Provision Performance Test Environment
Atlas provisions an environment at production-equivalent capacity configuration for the performance test.

| Activity | Events | Units |
|---|---|---|
| Performance test environment provision | 1 successful provision | **0.1** |

**Step 5 subtotal: 0.1 units**

#### Step 6 — Execute
Test execution is performed by Alex using the generated test asset. Atlas monitors and collects results. Execution itself is not metered.
**Step 6 subtotal: 0 units**

#### Step 7 — Analyze Results
Atlas analyzes performance test results against the baseline, identifies whether the system meets SLAs under projected workload, and classifies findings by severity.

| Activity | Tokens | Units |
|---|---|---|
| Performance test results analysis | ~150,000 | **1.5** |

**Step 7 subtotal: 1.5 units**

#### Step 8 — Recommend
Atlas generates capacity and configuration recommendations based on the analysis.

| Activity | Tokens | Units |
|---|---|---|
| Capacity and tuning recommendations (if standalone document) | ~100,000 | **1.0** (conditional) |

**Step 8 subtotal: 0–1.0 units (if standalone; typically included in Step 7)**

#### Step 9 — Record
Atlas generates the performance readiness record — baseline, test configuration, test results, analysis, and capacity recommendations.

| Activity | Tokens | Units |
|---|---|---|
| Performance readiness record (structured artifact) | ~200,000 | **2.0** |
| Full evidence package (if regulatory CAB requirement) | 400,000 | **4.0** |

**Step 9 subtotal: 2.0–4.0 units**

### Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Trigger intake (footprint) | 0 |
| 2 — Baseline | Collection (footprint; summary doc optional) | 0–1.0 |
| 3 — Capacity Assessment | Capacity gap assessment | 2.5 |
| 4 — Performance Test | Directional performance test asset | **5.0** |
| 5 — Provision | Test environment provision | 0.1 |
| 6 — Execute | Test execution (not metered) | 0 |
| 7 — Analyze | Results analysis | 1.5 |
| 8 — Recommend | Recommendations (if standalone) | 0–1.0 |
| 9 — Record | Performance readiness record | 2.0 |
| **TOTAL** | **Nominal performance readiness cycle** | **11.1 units** |
| **TOTAL** | **With full evidence package** | **13.1 units** |

### Sensitivity Analysis

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Capacity assessment only (no performance test) | Assessment + record only; no test generation or provision | ~0.41× |
| Standard performance readiness cycle | Baseline | 1.0× |
| Multiple applications in scope (3 directional perf tests) | One additional performance test per application | ~2.1× |

| Additional Scenario | Adjustment | Unit delta |
|---|---|---|
| Directional performance test added per application | One additional 500K-token test asset per application | +5.0 per application |
| Full evidence package required instead of readiness record | Evidence package (4.0) replaces performance record (2.0) | +2.0 |
| Baseline performance summary generated (Step 2) | Additional structured baseline summary artifact | +1.0 |
| Standalone recommendations document generated (Step 8) | Separate recommendations artifact beyond results analysis | +1.0 |

### What is NOT Metered
- Performance data collection and baseline queries
- MSU utilization trend monitoring (continuous, footprint)
- Chat queries about capacity headroom
- Test execution
- Interactive performance dashboard browsing

### Notes and Assumptions
1. The **directional performance test** (5.0 units) is the most expensive single artifact in the Atlas catalog. Its cost reflects the depth of reasoning required to produce a meaningful, representative workload definition. Organizations should budget carefully — the Action Catalog assumes only 1 directional performance test per month across the entire customer.
2. **Pre-change performance readiness** is a high-value but high-cost usage pattern. If every application change (UC-07) triggers a directional performance test, the monthly unit budget grows by 5 units per test generated.
3. **Capacity planning vs. performance testing:** Step 3 (capacity assessment, 2.5 units) and Step 4 (performance test generation, 5.0 units) are distinct artifacts — capacity planning is data-driven trend analysis; performance test generation is a forward-looking workload simulation specification. Both may be generated in the same workflow or independently.

---

## 21. External Product Synergies

### Bob PPZ

Capacity planning and performance readiness is primarily an infrastructure and configuration workflow owned by Atlas. Performance root cause analysis, capacity modelling, configuration sizing, and production apply are all Atlas-led. Bob PPZ enters at a specific and high-value point: when performance root cause analysis identifies an application code issue — inefficient COBOL SQL, excessive program calls, or a code-level logic path creating disproportionate CPU consumption — as the driver of the performance problem.

**Tier 1 — Explicit Handoff Points:**

*Step 2 — Diagnose:* When Atlas attributes root cause to application code, it directs the developer to Bob PPZ with the full diagnostic context: the specific program and transaction identified as the performance source, Atlas performance data (CPU consumption, I/O profile, thread hold time, elapsed time), the subsystem context (CICS region, Db2 subsystem, MQ queue manager), and the performance threshold being breached.

In Bob PPZ, ZUnderstand traces the execution path through the identified program to locate the specific code constructs driving the performance issue — inefficient SQL (unnecessary full-table scans, missing index usage), excessive PERFORM calls, or logic that creates disproportionate resource consumption — and provides the precise code-level remediation.

A code fix artifact is returned to Atlas, which validates the fix in a performance test environment at simulated load (Step 4) and proceeds to production apply.

*Step 4 — Validate:* If performance validation reveals that the code fix resolved one constraint but introduced another (e.g., an SQL rewrite that reduces I/O but increases CPU), Atlas returns the new performance profile to the developer in Bob PPZ for a second iteration. This is the round-trip performance tuning loop: Atlas measures, Bob PPZ adjusts, Atlas re-measures.

**Tier 2 — Enrichment Touchpoints:**

*Step 2 — Diagnose (enrichment layer):* When Bob PPZ is installed, application-level attribution is enriched with code-level precision. Rather than "Application BATCHJOB01 is causing excessive Db2 I/O," the diagnosis becomes "Paragraph PROCESS-ACCOUNTS in BATCHJOB01 at line 840 executes a full-table scan on the ACCOUNTS table on every iteration of the outer loop — estimated 47,000 unnecessary I/Os per batch run."

*Step 3 — Size:* When Bob PPZ is installed, capacity analysis for application-driven constraints is enriched with a code-level root cause breakdown — which specific programs contribute most to the constraint, whether the constraint is addressable through configuration changes or requires application code changes, and the relative contribution of each program. This enables Atlas to distinguish between "increase buffer pool size" and "fix the SQL in ACCTVAL01 first, then right-size the buffer pool."

> **Overall Bob PPZ relevance:** Moderate, concentrated in root cause diagnosis for application-originated performance issues. The enrichment touchpoints add significant value when performance problems are code-driven — which is common in large COBOL batch estates. For infrastructure-capacity constraints (DASD, coupling facility, CPU allocation), Bob PPZ has no role.

---

### Concert for Z

This is the highest Concert for Z relevance use case. Concert for Z's Optimize module — performance degradation analysis, root cause analysis, and capacity management — is the Day 2 complement to Atlas's capacity planning and pre-event performance readiness. The workflow is sequential and bidirectional: Concert for Z detects a production performance issue and initiates the change workflow; Atlas plans, provisions, tests, and validates the fix before production apply.

**Tier 1 — Explicit Handoff Points:**

*Step 1 — Detect (Concert for Z → Atlas):* Concert for Z's Optimize module detects a production performance degradation — a Db2 buffer pool approaching saturation, a CICS MXT being repeatedly hit under peak load, an MQ queue depth trending toward the depth limit — or identifies an approaching capacity constraint through its performance analytics. Concert for Z's performance finding triggers an Atlas capacity planning workflow. Atlas takes the identified constraint and applies change intelligence: modelling the risk, projecting transaction volume against current configuration, identifying the specific configuration change required, and generating a validated remediation plan.

*Step 6 — Monitor (Atlas ↔ Concert for Z):* Concert for Z's Observe module provides continuous production monitoring that surfaces post-change regressions. If the configuration change resolves the constraint but inadvertently creates a new one, Concert for Z detects the new behavioral anomaly and surfaces it. Atlas correlates the anomaly to the specific configuration change event, attributing the regression to the responsible change. A post-apply regression finding from Concert for Z becomes the trigger for a new Atlas workflow.

**Tier 2 — Enrichment Touchpoints:**

*Step 2 — Diagnose:* When Concert for Z hands off to Atlas, it passes its diagnostic findings as the starting context, reducing Atlas's root-cause investigation to confirmation and scope-expansion rather than starting from scratch.

*Step 3 — Size:* The transaction volume data that Atlas projects from comes from Concert for Z's SMF/CDP pipeline — real production workload data, not theoretical estimates. Concert for Z's positioning explicitly identifies IBM IntelliMagic Vision (connected to Concert for Z's data pipeline) as providing "performance and capacity context" that can "inform Atlas change-impact assessment and validation baselines."

*Step 5 — Apply:* The management-readable capacity readiness summary that Atlas generates for Quinn's approval is enriched with Concert for Z's production performance evidence — the actual SMF data showing the constraint, the trend line, and the projected improvement.

> **Overall Concert for Z relevance:** Very high — the highest of all 12 use cases for Concert for Z. Capacity planning and performance readiness is where the Day 2 (Concert for Z) → Day 0/1 (Atlas) sequential workflow is most natural and most valuable. Concert for Z detects production performance issues; Atlas validates the fix before it touches production.

---

### Terraform Self-Managed for Z

Capacity planning and performance readiness has a narrow but precise Terraform touchpoint. None of the six Terraform synergy use cases address capacity planning directly, but Synergy Use Case 2 — On-Demand Test Environment Provisioning with Infrastructure Parity — is relevant: when Atlas generates a directional performance test and needs to execute it in a production-equivalent environment, Terraform provisions the performance test infrastructure. Infrastructure fidelity matters more for performance testing than for functional testing — a performance test run against an under-resourced test environment produces misleading results.

**Tier 1 — Explicit Handoff Points:**

*Step 5 — Provision Performance Test Environment:* Atlas passes the performance test environment specification to Terraform, requesting a test environment provisioned from the same HCL declaration as the production workspace. The infrastructure parity is enforced by Terraform — not approximated by manual configuration. Atlas deploys the application stack and executes the directional performance test against it. The results are valid as a production proxy because the infrastructure is an exact declaration match.

**Tier 2 — Enrichment Touchpoints:**

*Step 2 — Baseline Analysis:* Terraform's state file provides the current infrastructure resource allocations for the LPARs in scope — CPU entitlement, memory, storage configuration — complementing Atlas's software-layer performance metrics. Knowing that a CICS region is running on an LPAR with 80% of its allocated memory already committed is relevant context for interpreting performance metrics.

*Step 3 — Capacity Assessment:* Terraform contributes the infrastructure layer of this assessment — what resource changes are available within the Terraform-managed LPAR specification, what the maximum declared resources are, and what the lead time would be for Terraform to apply an infrastructure resource increase if one is recommended.

*Step 8 — Recommend:* Recommendations that involve infrastructure resource changes (CPU increases, memory expansion, storage additions) can be expressed as Terraform HCL change proposals, making the recommendation immediately actionable via the established Terraform change governance workflow.

> **Overall Terraform relevance:** Moderate. The performance test environment provisioning integration (Tier 1) is the most operationally significant touchpoint — infrastructure-accurate performance test environments are a meaningful quality improvement over manually configured approximations.
