# UC-11: Capacity Planning and Performance Readiness
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

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

> **Commercial constraints (internal):** Performance testing scenarios require the Atlas Test SKU for full test execution capability. Capacity visibility is available in Atlas Base at H1 2027. A business annex should document how feature gating at the Atlas Base tier affects what Alex experiences before upgrading to Atlas Test.

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Alex — Performance / Application Engineer | Initiates performance diagnosis and capacity planning workflows. Owns the technical analysis and test execution. Responsible for the validated configuration recommendation that goes to production. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Executes the production configuration changes that Atlas recommends. Reviews configuration change plans before apply. Owns the z/OS-level parameters (buffer pools, MXT, DASD). |
| **Secondary** | Annette — IT Operations Engineer | Monitors ongoing system performance and is typically the first to receive a user complaint about application slowness. Triggers the performance diagnosis workflow by escalating to Alex. Consumes post-incident reports. |
| **Secondary** | Quinn — IT Operations Manager | Receives capacity readiness reports before peak events. Approves production configuration changes. Needs an executive-readable risk summary, not raw telemetry. |

Reference [`personas.md`](../personas.md).

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
- Disaster recovery environment validation — owned by UC-10 (Disaster Recovery Validation). Peak season preparation may involve DR environments but the DR readiness validation logic belongs in UC-10.
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
| **Risk** | The CyberVault / GDPS dependency for full-scale performance testing makes the Peak Season Capacity Preparation scenario the most roadmap-fragile in this use case. If those integrations slip, the scenario delivers partial value (planning and partial load simulation) but not the full end-to-end validated test-at-production-scale story. This should be tracked as a dependency risk heading into H2 2027 planning. |
| **Risk** | OMEGAMON SMF data volume and retention policies vary by customer. Some customers retain only 30–60 days of SMF data, which may be insufficient for year-over-year trend projection. Atlas should detect and surface data sufficiency warnings before generating projections. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifacts |
|---|---|---|---|---|---|---|
| S1 | Dark Capacity Discovery | Alex or Quinn asks Atlas what capacity is unused or under-utilized across the estate | Planned — H1 2027 | H1 2027 | UX Flow, Chat Exchange, Screen designs | TBD |
| S2/S3 | Performance Diagnosis and Regression Detection | Entry A: Annette escalates a user complaint and Alex investigates. Entry B: Alex suspects a recent change caused a regression. | Planned — H1 2027 | H1 2027 | Single UX Flow (two entry variants), Chat Exchange (one per entry), Screen designs | [`design/flows/uc11-performance-diagnosis.md`](../design/flows/uc11-performance-diagnosis.md) |
| S4 | Peak Season Capacity Preparation | Quinn escalates an upcoming high-volume event; Alex needs to model risk and validate the configuration | Planned — H2 2027 | H2 2027 — blocked on CyberVault + GDPS integration | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc4-capacity-planning.md`](../design/flows/uc4-capacity-planning.md) |

**Design decisions recorded in this catalog:**

- **S2/S3 are one UX flow with two entry points.** A user complaint escalation (Annette → Alex) and Alex's own regression suspicion both lead to the same diagnosis flow: Atlas baselines the symptom, traverses transaction topology, correlates to change history, attributes root cause, and generates a fix. The entry point determines whether Atlas starts from a performance alert or a change event; the rest of the flow is identical. The UX Flow child artifact should document both entry variants in a single flow definition.
- **Performance testing at H1 2027 is directional, not full-scale.** The initial delivery of the S2/S3 Validate phase is positioned as directional performance testing — a fast gut-check in an isolated partial environment to confirm whether a change caused a regression, not a production-scale load simulation. This is intentional: it gives Alex fast signal ("this looks safe" / "something changed") without requiring the CyberVault/GDPS infrastructure. Full production-scale load and stress testing lands in S4 at H2 2027 when those integrations are available.
- **S4 is blocked, not deferred.** The Peak Season Capacity Preparation scenario cannot be demo-ready or customer-deliverable until CyberVault and GDPS integrations are available. The risk projection and configuration planning portions of S4 could be delivered earlier as a read-only analysis capability, but the full scenario — model risk, test at load, apply to production — requires those integrations. This should be tracked as a named dependency in H2 2027 planning.
- **S1 is the right opener for a financial or procurement buyer.** Dark Capacity Discovery requires only utilization data and I/O topology — no performance telemetry or test environment. It is the lowest-risk early demo and speaks directly to cost efficiency rather than incident prevention.

---

## 11. Lifecycle Overview

The lifecycle shape varies by scenario entry point but follows a consistent analytical arc. Performance diagnosis starts from a symptom; capacity planning starts from a projection. Both converge at plan generation and validated change execution.

```
Detect / Trigger → Baseline → Analyze → Model / Diagnose → Plan → Validate → Execute → Monitor
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Detect / Trigger** | An event initiates the workflow: a user performance complaint is escalated, an upcoming peak event is flagged, Alex suspects a regression, or Atlas proactively surfaces a capacity risk or anomaly. | Atlas (proactive) or User (query) |
| **Baseline** | Atlas establishes the current state: configuration parameters, resource utilization, transaction volume trends, and historical performance patterns. This is the reference point for all subsequent analysis. | Atlas |
| **Analyze** | Atlas analyzes the gap between baseline and risk or symptom. For capacity planning: projects future load against current configuration and identifies where constraints will occur. For performance diagnosis: traverses transaction topology and change history to isolate root cause. | Atlas |
| **Model / Diagnose** | Atlas produces a structured finding: specific configuration parameters that are at risk or have caused the problem, the transaction components affected, the confidence level of the projection or attribution, and the recommended configuration change. | Atlas |
| **Plan** | Atlas generates a configuration change plan — parameters to modify, sequencing, dependencies — scoped to the specific finding. For capacity planning, the plan also defines the load simulation spec (thresholds to test, metrics to capture). | Atlas |
| **Validate** | Atlas applies the proposed configuration changes to an isolated test environment and runs the load simulation or regression test suite. Results are compared against baseline and success thresholds. Atlas surfaces new constraints discovered during testing that were not present in the original analysis. | Atlas (test execution) / User (GA: operates provisioning; H1 2027+: approves Atlas action) |
| **Execute** | User approves production apply. Atlas orchestrates the configuration change in the correct sequence. Post-apply behavior is monitored against the pre-change baseline. | Atlas (orchestrates) / User (authorizes) |
| **Monitor** | For peak event scenarios, Atlas maintains continuous monitoring through the event window — surfacing real-time metrics against defined thresholds and alerting if any metric approaches a risk boundary before it is breached. | Atlas (proactive) |

> **Scope guidance:** The "What Happens" column describes outcomes and decisions, not UI interactions or API calls. If you find yourself writing about screens, prompts, or system calls, stop — that detail belongs in the UX Flow child artifact for the relevant scenario.

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
| Production configuration change decision | **User** | Governance gate. Alex generates the recommendation; Zach or Quinn approves and authorizes production apply. Atlas does not self-apply production configuration changes. |
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
| **Latency-to-topology traversal** | When a performance symptom is identified (e.g., slow CLAIMS inquiry), Atlas traverses the transaction topology to isolate the specific program, Db2 call, or configuration parameter responsible — not just the application tier. | Without transaction topology awareness, root cause isolation requires a Db2 DBA to run accounting traces manually. Atlas delivers the same result without specialist involvement. |
| **Proactive change attribution** | Atlas automatically correlates the performance inflection point in the telemetry against Config-as-Code change history to identify the responsible change event, the change author, and the change record — without being asked. | This is the most powerful AI behavior in this use case. The user reports a symptom; Atlas surfaces the cause, the specific change, who made it, and the fix — all unprompted. This is only possible because Atlas holds both the telemetry and the change history in a single model. |
| **Load projection with growth modeling** | Atlas projects future transaction volume based on historical growth trends and models the projected load against current configuration parameters to produce a constraint timeline (e.g., "buffer pool exhaustion is likely at 280% spike, not 340% as last year"). | Manual projection requires an experienced analyst with access to SMF history and spreadsheet modeling. Atlas does this automatically and updates the projection as new data arrives. |
| **Proactive constraint discovery during testing** | During load simulation, Atlas does not just validate the planned changes — it proactively identifies new constraints that only become visible at the tested load level (e.g., MQ queue depth saturation that wasn't a factor at prior year's volume). | Without this, teams assume "tests passed" means "all risks found." Atlas surfaces the constraints the team did not know to look for. |
| **Continuous peak-event monitoring with threshold alerting** | During a live peak event, Atlas monitors all relevant metrics continuously and alerts before a threshold is breached — not after. | The difference between a performance incident and a prevented incident is the alert arriving before saturation, not during it. Atlas makes this the default behavior rather than a manual monitoring task. |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| **Time to root cause (performance diagnosis)** | Time from "user reports application slowness" to confirmed root cause with change attribution | 1–3 business days (multi-team investigation) | Under 2 hours (single Atlas conversation) |
| **Peak event preparation confidence** | Whether the team has tested the configuration plan under simulated load before the event | Rarely — most teams plan but don't test at scale due to lab constraints | 100% of peak events with >2 weeks notice have a tested configuration plan |
| **Configuration constraints discovered pre-event** | Number of capacity constraints found and resolved before a peak event vs. discovered during it | Most discovered during the incident | Target: all constraints found during the preparation scenario, zero discovered during the live event |
| **Dark capacity reclaimed** | Dollar value or resource units of capacity identified as underutilized and reclaimed or right-sized | Near zero (dark capacity is invisible without dedicated analysis) | Measurable reclamation within 90 days of Dark Capacity Discovery scenario adoption |
| **Post-change regression detection latency** | Time from configuration change apply to detection of a performance regression caused by that change | Days to weeks (typically discovered through user complaints) | Same day or next day (Atlas correlates within one telemetry collection cycle) |
| **Performance test environment adoption** | % of significant configuration changes that include a load-validated test cycle before production apply | Low (test environments are hard to spin up; skipped under time pressure) | 70%+ for changes to Db2 buffer pools, CICS MXT, and MQ queue depth once Atlas Test SKU is available |

**Leading indicators (behavior):**
- Weekly performance analysis artifacts generated per connected environment
- Number of load simulations run per quarter
- Rate of proactive Atlas-surfaced findings vs. user-initiated queries (higher proactive ratio = deeper adoption)

**Lagging indicators (outcome):**
- Performance incidents during peak events (year-over-year)
- Mean time to root cause for performance degradations
- Dark capacity reclamation value reported by customers

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| **OMEGAMON data is unavailable or incomplete in TIB** | Atlas detects the missing data source and surfaces an explicit warning: "Performance telemetry for this LPAR is not available in the current TIB configuration. Root cause analysis is limited to configuration state." | Alex works with the system administrator to enable the OMEGAMON TIB integration. Atlas proceeds with configuration-state-only analysis and flags what is missing. |
| **Insufficient historical data for load projection** | Atlas detects that history is less than 6 months and surfaces a low-confidence warning with the projection, including a confidence interval based on available data. | Alex uses the projection as directional guidance only, acknowledges the uncertainty, and plans for more conservative headroom in the configuration changes. |
| **New constraint discovered during load simulation that was not in the initial analysis** | Atlas surfaces the new finding proactively during test execution, adds it to the configuration change plan, and requests re-validation at the relevant threshold. | Alex reviews the addition, approves the updated plan, and Atlas re-runs the relevant load threshold with the additional change in place. |
| **CyberVault / GDPS integration not available for full-scale load simulation** | Atlas clearly scopes the test to "partial isolated environment" and marks the test results as not representative of production-scale load. The projection remains available; only the full validation is constrained. | Alex presents the projection and partial test evidence to Quinn with the explicit caveat. Quinn decides whether to proceed to production on partial evidence or wait for the integration. |
| **Load simulation environment diverges from production configuration** | Atlas detects the environment delta (e.g., a production parameter that was not captured in the provisioning specification) and flags it before concluding validation. | Alex reviews the delta, determines if it is material to the test, and either accepts the result with the delta noted or requests a reprovisioning with the correct parameter. |
| **Root cause attribution is ambiguous** (multiple change events near the inflection point) | Atlas surfaces all candidate change events ranked by correlation strength and explains the evidence for each. It does not claim a single root cause when the evidence is ambiguous. | Alex reviews the candidates, uses Atlas to drill into each, and makes the attribution judgment with Atlas's supporting analysis. |
| **Production configuration change causes unexpected behavior post-apply** | Atlas detects the behavioral deviation through post-apply monitoring and alerts immediately. It compares current post-apply behavior against the validated test environment results and identifies the divergence point. | Alex investigates the divergence. If reversal is needed, Atlas generates the rollback change plan using the pre-apply configuration state. |

> **Depth guidance:** This is a `Planned` use case with well-developed scenario artifacts. The failure modes above are drawn from the source scenarios and represent the known failure patterns for this use case.

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **Change record for configuration changes** | All production configuration changes (Db2 ZPARM, CICS parameters, MQ configuration) require change records with validation evidence. | Atlas generates a complete change artifact — parameter changes, load simulation results, approval chain — and can push it to ServiceNow as a change record attachment. |
| **Performance baseline documentation** | Some regulated industries require documented performance baselines before and after significant configuration changes. | Atlas preserves the pre-change baseline, test environment configuration, and post-apply behavior snapshot as immutable artifacts linked to the change record. |
| **Peak event readiness sign-off** | Many operations teams require a formal readiness sign-off before high-volume events. | Atlas generates a capacity readiness artifact — projected headroom at each tested threshold, configuration changes applied, validation evidence — formatted for management sign-off. |
| **Root cause documentation for performance incidents** | Post-incident reviews require documented root cause, timeline, and corrective action. | Atlas generates the root cause record automatically during performance diagnosis, including the change attribution, the responsible change event, and the recommended process improvement. This eliminates manual post-incident documentation. |
| **Authorization before production apply** | Production configuration changes require named authorization. | Atlas enforces a hard stop before any production action. Authorization is captured with timestamp and user identity in the change artifact. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-02: Patch Management | Post-Change Performance Regression (S3) is frequently triggered by a PTF or middleware patch applied through UC-02. The two use cases share the configuration change attribution capability. When Atlas detects a performance regression in UC-11, it may surface a PTF applied via UC-02 as the root cause. |
| UC-07: Application Change Management | Application code changes can cause performance regressions just as configuration changes can. When Atlas traces a performance symptom in UC-11 to an application code change rather than a configuration change, the handoff to UC-07 is natural. The diagnosis path is shared; the remediation path diverges. |
| UC-09: Environment Parity and Drift Control | Environment configuration drift can cause capacity and performance divergence between environments (e.g., a production Db2 buffer pool configuration drifting away from the tested baseline). UC-09 and UC-11 share the configuration comparison capability; drift found by UC-09 that has performance implications feeds UC-11. |
| UC-10: Disaster Recovery Validation | Peak Season Capacity Preparation may require validating that the DR environment can also handle peak load, not just that it mirrors production configuration. The capacity readiness check for DR is a UC-10 sub-scenario, but Atlas should surface it as a recommendation from UC-11 when preparing for peak events. |
| UC-14: Change Governance and Traceability | UC-11 is a significant consumer of change history data owned by UC-14. The change attribution capability in Application Performance Diagnosis and Post-Change Performance Regression depends on Atlas having a complete, accurate change record to cross-reference against performance telemetry. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Full production-scale load and stress testing** | H2 2027 (conditional) / 2028+ | Requires CyberVault + GDPS integration for production-scale environment replication. Listed as conditional in H2 2027 and a confirmed capability in 2028+. This is the single biggest capability gap in this use case at H1 2027. |
| **Continuous peak-event monitoring in production** | H2 2027 | Real-time Atlas monitoring during live high-volume events — alerting before threshold breach, not after. Requires Predictive Intelligence behavioral baseline capability from H2 2027. |
| **Anomaly prediction (pre-incident)** | H2 2027 | Pattern-based anomaly detection using historical topology and change data. Atlas alerts on emerging performance patterns that precede known failure modes — before any user reports a problem. |
| **Business service performance impact mapping** | H2 2027 | Map performance metrics to business service definitions (e.g., "Claims Processing is at risk"). Translates technical performance data into business impact language for executive consumption. |
| **Self-learning performance baselines** | 2028+ | Atlas learns from historical peak events and post-change behavior to continuously refine its load projections and constraint models — reducing false positives and improving projection accuracy over time. |
| **Autonomous capacity adjustment (supervised)** | 2028+ | For well-understood, low-risk configuration parameters (e.g., MQ queue depth increases during a live event), Atlas proposes and applies adjustments autonomously within pre-approved bounds, with real-time visibility and a kill switch. This is the agentic operations path for this use case. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-11](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`atlas-use-case-taxonomy.md`](../atlas-use-case-taxonomy.md) | Scenario naming and taxonomy classification |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 2 "Capacity visibility" and "Application Performance Diagnosis"; Phase 3 "Performance testing (conditional)" and "Anomaly prediction"; Phase 4 "Advanced stress testing" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | GA+1 use cases "Application Performance Diagnosis" and "Capacity Planning" |
| [`design/flows/uc4-capacity-planning.md`](../design/flows/uc4-capacity-planning.md) | Full Peak Season Capacity Preparation scenario (Black Friday, Steps 1–9); pillar activation pattern; proactive constraint discovery during load simulation |
| [`design/flows/uc11-performance-diagnosis.md`](../design/flows/uc11-performance-diagnosis.md) | Full Application Performance Diagnosis scenario (Db2 buffer pool root cause, Steps 1–9); cross-pillar diagnosis pattern; proactive change attribution behavior |
| [`use-cases/atlas_performance_use_case copy.md`](atlas_performance_use_case%20copy.md) | Post-Change Performance Regression workflow model; spec-driven test approach; partial environment strategy; baseline vs. post-change comparison model; system lifecycle model (Define → Generate → Provision → Execute → Measure → Compare → Analyze → Iterate) |
| [`personas.md`](../personas.md) | Canonical persona definitions for Alex, Zach, Annette, Quinn |
