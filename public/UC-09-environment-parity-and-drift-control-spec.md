# UC-09: Environment Parity and Drift Control
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

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
Production and non-production IBM Z environments accumulate configuration differences over time through a combination of planned changes applied inconsistently, emergency fixes applied only to production, and changes made outside the change control process. There is no automated system that continuously compares environment state and alerts on material differences. The result is that test environments produce misleading results, DR environments may be weeks or months behind production, and compliance posture is degraded by undocumented changes that no one intended to leave unresolved.

**Current State (Without Atlas):**
- Environment comparison is manual: engineers export configuration parameters from ISPF or SMP/E and compare them in spreadsheets or scripts they maintain themselves. This is done infrequently, is error-prone, and misses non-obvious differences like PTF-driven behavior changes that do not appear in parameter files.
- Unauthorized change detection relies on change management process compliance — if someone makes a change without a change record, the only detection mechanism is a human noticing a behavioral difference or an auditor flagging it. There is no automated detection against a configuration baseline.
- QA environment drift from production is an endemic problem. Most "test doesn't look like prod" situations are resolved by guesswork and manual parameter comparison by the most experienced engineer available — often Zach, who has better things to do.
- Post-change validation is informal. After a planned change, there is no systematic check that the environment reached the intended state and that no unintended side effects occurred.
- Audit preparation for change control requires manually assembling evidence of what changed, when, and who authorized it. Undocumented changes produce audit findings.

**Desired Outcome:**
- Annette receives an alert when any production or non-production environment drifts materially from its baseline or from a peer environment — before a human notices a behavioral symptom.
- When an unauthorized configuration change is detected, Atlas provides immediate evidence: what changed, what the previous value was, when it changed, and whether there is a change record. Annette can triage, decide, and act without escalating to Zach for the basic facts.
- QA environments can be confirmed as production-equivalent on demand. The "test doesn't look like prod" conversation is replaced by a parity report that either confirms alignment or precisely quantifies the differences.
- Every change — planned or unplanned — has a complete audit trail that closes without manual assembly.
- Post-change drift validation is automatic: after any planned change, Atlas confirms the environment reached the intended state.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Environment Parity and Drift Control is a named H2 2027 Predictive Intelligence capability. It contributes to Atlas Base retention by being the first fully proactive capability — Atlas generates value without the user asking it to. For security and compliance buyers, drift detection is a compelling standalone reason to purchase. |
| **Retention impact** | Drift detection requires continuous Atlas connectivity to generate value. Once a customer enables parity monitoring, the capability is only useful as long as Atlas is connected and current. This creates strong structural retention — the monitoring relationship deepens over time. |
| **Competitive differentiation** | No existing z/OS tool provides continuous, automated cross-environment configuration comparison with change record correlation. Customers today use manual scripts, spreadsheets, and Zach's memory. Atlas is the only system that can answer "what is different between prod and QA right now, and does any of it have a change record?" in one query. |
| **Portfolio attach** | Unauthorized change detection creates a natural connection to z/OS security tooling (RACF audit, zSecure). When Atlas detects a change with no change record, the follow-on question is "who made it?" — which requires security tooling. This is a pull-through opportunity for IBM Z security products. The ServiceNow integration required for change record correlation is a named H2 2027 capability that this use case directly enables. |

> **Commercial constraints (internal):** Config drift detection and continuous parity monitoring are H2 2027 capabilities gated behind the Predictive Intelligence feature flag. A business annex should document how drift alerting is surfaced to Atlas Base subscribers vs. what requires a premium tier.

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Annette — IT Operations Engineer (L2 Operator) | First responder to drift alerts and unauthorized change notifications. Initiates investigation, makes the accept/escalate/rollback decision, and closes the incident with an audit trail. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Escalation target for changes that Annette cannot interpret or remediate herself. Executes complex rollback or realignment changes. Reviews parity reports for planned environment alignment. |
| **Secondary** | Alex — Performance / Application Engineer | Consumes parity reports when investigating whether a QA environment is production-equivalent for performance testing purposes. Also benefits from post-change drift validation after configuration tuning. |
| **Secondary** | Greg — Infrastructure Architect | Designs and governs the environment parity policy — which parameters must match, which differences are accepted, and what the remediation SLA is for unauthorized changes. Consumes drift trend reports for architecture review. |

Reference [`personas.md`](../personas.md).

**Persona note:** Annette is the right primary persona for this use case because she is the first line of response to any drift or unauthorized change alert. The key design implication is that Atlas must present findings in language Annette can act on — not raw parameter diffs, but classified risk levels, clear recommended actions, and explicit escalation triggers. Annette will not interpret a Db2 ZPARM change; she needs Atlas to tell her whether it is a compliance risk, a stability risk, or cosmetic drift, and what to do next.

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **Predictive Intelligence** | **Primary.** Continuous drift monitoring, threshold-based alerting, unauthorized change detection against a baseline, and post-change state validation are all Predictive Intelligence capabilities. The proactive, always-on nature of this use case is what makes it Predictive Intelligence rather than System Intelligence. | H2 2027 |
| **System Intelligence** | **Foundational.** The living topology model and Config-as-Code data are the source of truth for all environment comparison. Cross-environment parameter diff, PTF inventory comparison, and topology structure comparison are System Intelligence capabilities that Predictive Intelligence builds its alerting on top of. | GA Dec 2026 |
| **Change Intelligence** | **Execution.** When drift is confirmed and remediation is required — aligning QA to production, rolling back an unauthorized change, or executing a post-change correction — the remediation path runs through Change Intelligence: plan generation, test environment provisioning, sequenced apply, validation. | H1 2027 (provisioning and apply); H2 2027 (full integration with drift workflow) |

**Important:** The multi-system comparison capability that underpins this use case has a partial precursor available earlier. Basic side-by-side environment comparison is available from Aug 19 (TIB milestone) via ZUnderstand + Config-as-Code DB multi-source queries. The *continuous, automated, alerting* form of this capability — which is what makes it the UC-09 use case rather than an ad-hoc query — requires the H2 2027 Predictive Intelligence config drift detection capability.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate |
|---|---|---|---|
| Production vs. QA Drift Investigation | **Planned** | H2 2027 (full); Aug 19 milestone (ad-hoc query precursor) | Config drift detection skill; ZUnderstand + CaC DB in TIB for ad-hoc; continuous alerting requires H2 2027 Predictive Intelligence |
| Continuous Production Parity Monitoring | **Planned** | H2 2027 | Predictive Intelligence config drift detection; scheduled comparison engine; threshold configuration |
| Unauthorized Change Detection | **Planned** | H2 2027 | Config baseline versioning; change record correlation (ServiceNow integration); anomaly detection alerting |
| Post-Change Drift Validation | **Planned** | H2 2027 | Post-apply state verification; intended-state comparison against change plan |

**Capability dependency notes:**

- The ad-hoc form of Production vs. QA Drift Investigation (user asks Atlas to compare two environments) is available at the Aug 19 milestone as a TIB multi-source query. This is a useful demo capability but is not the UC-09 use case — it requires a user prompt, not continuous monitoring.
- Unauthorized Change Detection depends on two capabilities arriving together: Config-as-Code baseline versioning (so Atlas knows what the environment *should* look like) and ServiceNow integration (so Atlas can check whether a detected change has an associated approved change record). Both are H2 2027.
- Continuous Production Parity Monitoring requires a scheduled comparison engine and configurable drift thresholds — a new capability class, not just a TIB query. H2 2027.
- All four scenarios share the same underlying cross-environment diff engine. The distinction between scenarios is trigger (user-initiated vs. scheduled vs. event-driven) and response type (investigate vs. alert vs. validate).

---

## 8. Scope and Boundaries

**In Scope:**
- Cross-environment configuration comparison: parameter-level diff between any two connected environments
- PTF inventory comparison: surface which PTFs are present on one environment but absent on another
- Topology structure comparison: identify structural differences (missing subsystems, different versions, different connectivity)
- Unauthorized change detection: changes detected in Config-as-Code that have no associated approved change record
- Continuous parity monitoring: scheduled comparison of defined environment pairs with threshold-based alerting
- Post-change drift validation: confirmation that an environment reached its intended post-change state
- Drift remediation planning: Atlas generates an alignment plan to bring a drifted environment back to baseline
- Rollback plan generation for unauthorized changes: sequenced rollback procedure if the unauthorized change is assessed as harmful
- Audit trail generation: complete record of detected drift, risk assessment, decision, and resolution

**Out of Scope:**
- DR environment readiness validation — owned by UC-10 (Disaster Recovery Validation). UC-09 and UC-10 share the diff engine but have distinct triggers and customer goals. DR readiness is UC-10; general environment parity is UC-09.
- Application behavior testing to confirm environments are functionally equivalent — owned by UC-02 (Patch Management, test validation) and UC-11 (Performance Diagnosis). UC-09 confirms *configuration* parity; functional equivalence testing is a downstream activity.
- Security investigation of who made an unauthorized change — Atlas detects the change and flags the absence of a change record. Attribution of intent and security investigation belong to security tooling (zSecure, RACF audit). Atlas provides the configuration evidence; security tools provide the identity and intent investigation.
- Network and storage configuration parity — currently scoped to z/OS, middleware, and software configuration. I/O topology from Project Gravity (H1 2027) may extend this in future.

**Non-Goals:**
- Atlas does not automatically remediate drift. Every remediation action requires explicit human decision and authorization.
- Atlas does not enforce that environments must be identical. It surfaces differences, classifies them by risk, and allows the operator to accept, remediate, or investigate. Configuration differences may be intentional and appropriate.
- Atlas does not replace ServiceNow or any change management system as the system of record for approved changes. It integrates with them to correlate detected changes against approved records.

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | All environments being monitored are connected to Atlas and have current Config-as-Code discovery data. Atlas cannot compare what it has not discovered. |
| **Assumption** | The customer has a defined baseline or reference environment for each environment tier (e.g., production is the reference for QA; last-known-good is the reference for unauthorized change detection). Atlas cannot detect drift without a baseline to compare against. |
| **Assumption** | The customer has a change management system (ServiceNow or equivalent) that Atlas can query for approved change records. Without this, Atlas can detect configuration changes but cannot classify them as authorized or unauthorized. |
| **Assumption** | The customer has defined what constitutes material drift — which parameters require parity and which differences are acceptable. Atlas provides a default classification but the parity policy requires customer configuration. |
| **Dependency** | Continuous parity monitoring and unauthorized change detection require the H2 2027 Predictive Intelligence config drift detection capability. The ad-hoc comparison capability (TIB multi-source query) is available from Aug 19 but is not the same as continuous automated monitoring. |
| **Dependency** | Unauthorized change detection depends on ServiceNow integration for change record correlation. The ServiceNow integration is a named H2 2027 capability. Without it, Atlas can surface configuration changes but cannot determine whether they are authorized. |
| **Dependency** | Cross-environment comparison at parameter depth depends on ZUnderstand data being available in TIB for both environments being compared. If one environment is not fully discovered, the comparison will be incomplete; Atlas must surface this gap explicitly. |
| **Risk** | Environment discovery freshness is critical. If the Config-as-Code model for an environment was last updated days or weeks ago, drift detection will produce false negatives (missing changes that occurred after the last discovery run). Atlas must surface discovery staleness prominently in the drift monitoring interface. |
| **Risk** | Defining and maintaining the parity policy (which parameters must match, which differences are accepted) requires ongoing customer input. Without a well-maintained policy, continuous monitoring will generate either too many low-value alerts (alert fatigue — Annette's primary pain point) or miss material differences. This is an onboarding and customer success risk, not just a product risk. |
| **Risk** | The ServiceNow integration is bi-directional and introduces a dependency on the customer's ServiceNow instance configuration and API availability. Integration failures must be handled gracefully — Atlas should continue to detect configuration changes and flag them for manual change record review rather than silently failing. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifacts |
|---|---|---|---|---|---|---|
| S1 | Production vs. QA Drift Investigation | User asks Atlas to explain why QA cannot reproduce a production behavior; or Annette runs an on-demand parity check | Planned — H2 2027 (continuous); Aug 19 (ad-hoc query precursor) | Aug 19 (ad-hoc only); H2 2027 (full scenario) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc10-environment-drift.md`](../design/flows/uc10-environment-drift.md) |
| S2 | Unauthorized Change Detection | Atlas detects a configuration change with no associated approved change record and generates an alert | Planned — H2 2027 | H2 2027 | UX Flow, Chat Exchange, Screen designs | [`use-cases/atlas_config_drift_unauthorized_change_use_case copy.md`](atlas_config_drift_unauthorized_change_use_case%20copy.md) |
| S3 | Continuous Production Parity Monitoring | Scheduled comparison run detects drift exceeding the defined threshold and generates an alert to Annette | Planned — H2 2027 | H2 2027 | UX Flow, Chat Exchange | TBD |
| S4 | Post-Change Drift Validation | A planned change has been applied; Atlas automatically validates the environment reached the intended state and that no side effects occurred | Planned — H2 2027 | H2 2027 | UX Flow, Chat Exchange | TBD |

**Design decisions recorded in this catalog:**

- **S1 has a useful Aug 19 precursor.** The ad-hoc "compare these two environments" query is available from the Aug 19 TIB milestone and is a strong demo. It is positioned as System Intelligence query capability, not the full UC-09 use case. The distinction for demo purposes: the ad-hoc query requires the user to ask the question; the UC-09 use case means Atlas asks it for you, continuously. Both are worth demonstrating — just at the right milestone.
- **S2 is the most differentiating scenario.** Unauthorized change detection with change record correlation is a capability no existing z/OS tool provides. It directly addresses Annette's pain around fragmented tools and lack of automated detection. This is the scenario most likely to generate a "how did we live without this" reaction in a customer demo.
- **S3 and S4 share infrastructure with S2.** All three use the same continuous monitoring engine and baseline comparison capability. The UX flows differ (alert-driven vs. validation-triggered vs. scheduled), but they may be designed as one monitoring framework with three trigger variants rather than three separate flows.
- **S1 is the right demo for the investigation/debugging buyer (Zach, Alex).** S2 is the right demo for the operations/compliance buyer (Annette, Derek, Quinn). Lead with the scenario that matches the buyer in the room.

---

## 11. Lifecycle Overview

Two distinct lifecycle shapes apply depending on scenario entry point. Both share the same core flow from detection through resolution; they differ in how detection is triggered.

**Proactive path (S2, S3):** Atlas detects drift and initiates the workflow without a user prompt.
**Reactive path (S1, S4):** A user query or a post-change event triggers the investigation.

```
Detect / Trigger → Compare → Classify → Decide → Plan → Execute → Validate → Close
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Detect / Trigger** | Atlas detects a configuration change against baseline (proactive), a scheduled comparison surfaces drift above threshold (scheduled), a user asks for an environment comparison (reactive), or a planned change completion triggers post-change validation. | Atlas (proactive/scheduled) or User (query/post-change) |
| **Compare** | Atlas produces a precise diff: parameter name, previous value, current value, environment, timestamp, and whether the change is present in one environment but absent in another. PTF inventory and topology structure are included in the comparison. | Atlas |
| **Classify** | Atlas classifies each detected difference by type (compliance risk, stability risk, security risk, cosmetic/accepted) and severity. For unauthorized changes, Atlas checks whether a corresponding approved change record exists in ServiceNow. | Atlas |
| **Decide** | Annette (or Zach for complex changes) reviews the classification and chooses: accept the change as intentional, escalate for investigation, or remediate. This is an explicit human decision gate — Atlas does not proceed to remediation without authorization. | User |
| **Plan** | If remediation is chosen, Atlas generates the alignment or rollback plan: sequenced parameter changes, PTF applies, or configuration restores. For unauthorized changes, Atlas generates a rollback procedure if the change is assessed as harmful. | Atlas |
| **Execute** | Atlas orchestrates the remediation: applies the alignment changes to the target environment, or sequences a rollback of the unauthorized change. User authorizes each production action. | Atlas (orchestrates) / User (authorizes) |
| **Validate** | Atlas confirms the environment has reached the intended state — either the post-remediation state matches the target baseline, or the post-rollback state matches the pre-change baseline. Behavioral testing may be triggered as a downstream step. | Atlas |
| **Close** | Atlas generates the complete incident record: detected change, risk classification, decision made, remediation applied, validation result. ServiceNow ticket created or updated. Audit trail sealed. | Atlas |

> **Scope guidance:** The "What Happens" column describes outcomes and decisions, not UI interactions or API calls. If you find yourself writing about screens, prompts, or system calls, stop — that detail belongs in the UX Flow child artifact for the relevant scenario.

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Continuous environment comparison and baseline tracking | **Atlas** | Automated; runs on schedule or triggered by discovery event; no user prompt required |
| Configuration change detection against baseline | **Atlas** | Proactive; Atlas detects parameter-level changes the moment they appear in Config-as-Code discovery |
| Change record correlation (authorized vs. unauthorized classification) | **Atlas** | Queries ServiceNow via integration; requires ServiceNow integration to be configured |
| Risk classification of detected differences | **Atlas** | Atlas classifies by compliance, stability, security, and cosmetic risk; user can override classifications |
| Alert routing and severity prioritization | **Atlas** | Atlas surfaces alerts to Annette with severity level and recommended action; high-severity alerts surfaced immediately |
| Decision: accept / escalate / remediate | **User (Annette)** | Governance gate. Atlas provides the evidence and a recommendation; Annette makes the call. For complex changes beyond her scope, she escalates to Zach. |
| Parity policy definition (which differences are acceptable) | **User (Greg + Zach)** | Atlas enforces the policy; Greg and Zach define it. This is a configuration and onboarding activity. |
| Remediation plan generation | **Atlas** | Atlas generates the alignment or rollback plan; Zach reviews before production apply |
| Production remediation execution authorization | **User (Zach)** | Zach authorizes production configuration changes. Annette can authorize changes to non-production environments within her scope. |
| Remediation orchestration | **Atlas** | Sequences and executes the remediation plan; progress is visible in real time |
| Post-remediation validation | **Atlas** | Automated; Atlas confirms the environment reached the intended state without a user prompt |
| Incident record and audit trail creation | **Atlas** | Automated; Atlas generates the complete record at closure; no manual assembly required |
| ServiceNow ticket creation and update | **Atlas** | Atlas creates or updates the ticket at detection and again at closure; requires ServiceNow integration |

**Governance gates — explicit human approval required before:**
1. Any remediation action is initiated — Annette accepts/escalates/remediates (no automated remediation)
2. Any production configuration change in the remediation path — Zach authorizes
3. Closing an unauthorized change incident as "accepted" — explicit named acknowledgment captured in the audit trail

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Continuous automated environment comparison** | Atlas compares environments on a schedule and on every discovery event — without any user action. Drift is surfaced before it causes an incident. | Manually comparing environments today requires engineering time and happens infrequently. Atlas makes it continuous and automatic, transforming drift from a discovery problem into a monitoring problem. |
| **Semantic diff — behavioral significance, not just parameter equality** | Atlas does not just report that MAXDBAT is 50 on QA and 200 on production. It explains that this difference means "QA would serialize at 50 concurrent threads, which is why the month-end load test cannot reproduce the production behavior." | Raw parameter diffs require expert interpretation. Atlas translates the difference into operational meaning — enabling Annette to understand the risk without escalating to Zach for basic context. |
| **Change record correlation** | Atlas cross-references every detected configuration change against the ServiceNow change record history and flags changes with no approved record — proactively, without a user query. | This is not possible with any existing tool combination. Detecting a config change requires one tool; checking whether it has a change record requires another; correlating them requires a human. Atlas automates the correlation. |
| **Risk classification at detection time** | Atlas classifies each drift item by risk type and severity the moment it is detected — compliance risk, stability risk, security risk, or cosmetic. Annette sees "HIGH — no change record, CICS MXT reduced by 40%, active transaction processing at risk" not a raw parameter change notification. | Alert overload is Annette's primary pain point. Risk classification at detection time means she can triage in seconds rather than reading raw technical alerts and deciding whether to escalate. |
| **Proactive side-effect identification during comparison** | When Atlas identifies differences to remediate, it proactively checks whether other applications sharing the environment would be affected by the alignment change before generating the plan. | This prevents remediation from creating new problems. The example from the source scenario: raising MAXDBAT on QA Db2 benefits CLAIMS but Atlas proactively flags that BILLING is running a batch cycle and may be affected. |
| **Complete audit trail generation at closure** | Atlas generates the full incident record — detected change, evidence, classification, decision, remediation steps, validation result — without any manual documentation effort. | Annette's top compliance concern is closing incidents with a complete audit trail. Atlas makes this automatic rather than a manual documentation task that gets skipped under time pressure. |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| **Time to drift detection** | Time from when a configuration difference is introduced to when it is surfaced to the operations team | Days to weeks (discovered through incident or manual check) | Same day (within one Atlas discovery cycle) |
| **Unauthorized change detection rate** | % of production configuration changes with no approved change record that are detected and flagged | Near 0% (no automated detection; relies on human observation or audit) | 100% of changes detectable via Config-as-Code discovery |
| **Time to classify and triage a drift alert** | Time for Annette to go from receiving an alert to a documented decision (accept / escalate / remediate) | Hours (requires SME interpretation, multiple tool queries) | Under 30 minutes (Atlas provides classification and recommendation at detection time) |
| **Environment parity confirmation for QA** | Time to confirm QA is production-equivalent before a test cycle | 4–8 hours of manual parameter comparison (if done at all) | Under 15 minutes (on-demand Atlas parity report) |
| **Audit findings related to undocumented changes** | Number of audit findings per cycle attributable to changes with no change record | Typically 5–20 per audit cycle in large shops | Near zero (all changes detected and documented; retrospective change records created for any accepted-but-undocumented changes) |
| **Post-change validation coverage** | % of planned changes followed by an automated confirmation that the environment reached the intended state | Near 0% (no systematic post-change validation; assumed unless proven otherwise) | 100% of changes executed through Atlas have automatic post-change drift validation |

**Leading indicators (behavior):**
- Number of drift alerts generated and triaged per month (rising then stabilizing = healthy adoption)
- Parity reports run per quarter
- Rate of "accepted drift" vs. "remediated drift" (high acceptance rate may indicate policy needs tuning)

**Lagging indicators (outcome):**
- Production incidents attributable to environment drift (year-over-year)
- Audit findings for undocumented changes
- "Test doesn't look like prod" incidents per quarter

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| **Discovery data is stale for one or both environments** | Atlas detects the staleness and surfaces a warning before generating the comparison: "The QA environment model was last updated 8 days ago. The comparison may not reflect recent changes." | Annette triggers a re-discovery run for the affected environment before proceeding, or accepts the comparison with the staleness caveat noted in the parity report. |
| **ServiceNow integration is unavailable** | Atlas detects the integration failure and continues to surface configuration changes, but flags them as "authorization status unknown — ServiceNow unavailable" rather than "authorized" or "unauthorized." | Annette manually checks the change record for flagged changes while the integration is restored. Atlas queues the change record correlation check and updates the classification when connectivity is restored. |
| **Drift threshold generates excessive alerts (alert fatigue)** | Atlas surfaces a pattern analysis: "47 alerts generated in the last 7 days; 43 were classified as cosmetic drift. Consider updating the parity policy to exclude these parameter classes." | Annette and Greg review the policy and update the accepted drift list. Atlas's threshold and policy configuration is the primary lever for managing alert volume. |
| **Unauthorized change cannot be safely rolled back** | Atlas generates the rollback plan but flags high-risk steps and surfaces a confidence level. If the change has been in place long enough that other changes have been layered on top of it, Atlas identifies the dependency chain and warns that a clean rollback is not possible. | Zach reviews the risk analysis and the team decides whether to accept the change retrospectively (with a post-hoc change record) or execute a partial rollback with manual intervention for the high-risk steps. |
| **Remediation plan execution leaves environment in intermediate state** (partial apply failure) | Atlas detects the intermediate state, captures it as the new baseline, and generates a recovery plan from the partial state rather than retrying the full original plan. | Zach reviews the recovery plan. Atlas does not attempt to automatically complete a partial apply; it waits for human authorization. |
| **Post-change validation finds unintended side effects** | Atlas surfaces the side-effect diff: what changed beyond the intended scope of the change. It generates a secondary drift item for each unintended change and initiates the classify → decide flow for each. | Annette triages the secondary items. If they are benign (e.g., a timestamp update), she accepts them. If they are material, she escalates to Zach for a secondary remediation. |
| **Parity policy has not been configured** (no baseline defined) | Atlas cannot perform meaningful drift detection without a defined baseline. It surfaces an onboarding prompt: "No parity baseline has been configured for this environment pair. Do you want to use the current state as the baseline?" | Annette or Greg reviews the current state and formally accepts it as the baseline. Atlas records this as the starting point for future comparisons. |

> **Depth guidance:** This is a `Planned` use case with well-developed scenario artifacts (uc10, drift use case doc). The failure modes above are drawn from those sources and represent the known failure patterns.

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **Change record for every production configuration change** | Regulated environments require that every configuration change on z/OS has an associated approved change record. | Atlas detects configuration changes and correlates them to ServiceNow change records. Unauthorized changes are flagged immediately and tracked through to resolution with a complete audit trail. |
| **Audit evidence for undocumented changes** | Auditors require evidence that undocumented changes were detected, investigated, and resolved or accepted with documented rationale. | Atlas generates a complete incident record for every detected unauthorized change: what changed, when, what the risk classification was, who made the decision, and what the outcome was. This record is the audit evidence. |
| **Named authorization for all remediation actions** | No production remediation should execute without explicit named authorization. | Atlas enforces a hard stop before any production action. The authorizing user is captured with timestamp and identity in the incident record. |
| **Accepted drift documentation** | When a detected change is classified as intentional and accepted rather than remediated, regulators require documentation that the acceptance was deliberate. | Atlas requires an explicit "accept" action with a named user, a timestamp, and an optional rationale field. Accepted drift items are preserved in the environment parity record, not silently discarded. |
| **Continuous monitoring evidence** | Some compliance frameworks require evidence that configuration monitoring is continuous, not point-in-time. | Atlas generates a monitoring activity log showing scheduled comparison runs, detected changes, and disposition — providing continuous monitoring evidence for any audit period. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-02: Patch Management | PTF gaps between environments are a primary category of drift. When UC-09 detects that a PTF is present on production but missing from QA, the remediation path runs through UC-02's patch apply workflow. The two use cases share the PTF inventory comparison data from System Intelligence. |
| UC-03: Audit and Compliance | UC-09 is a significant evidence producer for UC-03. The unauthorized change detection record, continuous monitoring log, and environment parity history are all audit evidence consumed by UC-03. The two use cases should be designed with a shared evidence artifact format. |
| UC-10: Disaster Recovery Validation | UC-09 and UC-10 share the cross-environment diff engine. DR environment drift is a subset of the broader environment parity problem. When UC-09 detects drift in a DR environment, it should surface it with a DR readiness flag that links to the UC-10 workflow. The distinction: UC-09 owns detection and general parity; UC-10 owns DR-specific readiness assessment and failover validation. |
| UC-11: Capacity Planning and Performance Readiness | The "Post-Change Performance Regression" scenario in UC-11 and the "Post-Change Drift Validation" scenario in UC-09 are triggered by the same event (a change has been applied). They are complementary: UC-09 validates configuration state; UC-11 validates performance behavior. Both should be triggered automatically after a significant change is applied. |
| UC-14: Change Governance and Traceability | UC-09 is the primary detection mechanism for the change traceability gap that UC-14 governs. Unauthorized changes detected by UC-09 produce the change records that UC-14 tracks. The two use cases are closely coupled and should share the ServiceNow integration architecture. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Anomaly prediction based on drift patterns** | H2 2027 (early) / 2028+ | Atlas learns which drift patterns historically precede production incidents and surfaces predictive alerts — not just "this changed" but "this type of change has preceded an outage 3 of the last 4 times it occurred." |
| **Automatic accepted-drift policy learning** | 2028+ | Atlas observes which differences operators consistently accept and proposes updates to the parity policy automatically — reducing alert noise without requiring manual policy maintenance. |
| **Cross-environment normalization enforcement** | 2028+ | Beyond detection and alerting, Atlas actively maintains environment parity by applying changes to non-production environments within a configurable window after production changes are validated. Autonomous parity maintenance within pre-approved bounds. |
| **Business service impact mapping for drift** | H2 2027 | Surface drift findings in business service terms — "this configuration difference affects the Claims Processing service" — using the business service topology capability from H2 2027. Enables Annette to communicate business impact without translating technical findings herself. |
| **Security event correlation** | 2028+ | Correlate unauthorized configuration changes with RACF and zSecure security events to identify whether a change was made by an authorized user acting outside the change window, or by an unauthorized actor. This crosses into security operations territory but is a natural extension of the change record correlation capability. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-09](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`atlas-use-case-taxonomy.md`](../atlas-use-case-taxonomy.md) | Scenario naming and taxonomy classification |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 3 "Config drift detection", "Production parity analysis", "ServiceNow integration"; customer outcome "Atlas tells me my environments have drifted before I discover it through an outage" |
| [`design/flows/uc10-environment-drift.md`](../design/flows/uc10-environment-drift.md) | Full Production vs. QA Drift Investigation scenario (Db2 ZPARM + PTF mismatch, Steps 1–7); semantic diff behavior; proactive side-effect identification; continuous monitoring activation |
| [`use-cases/atlas_config_drift_unauthorized_change_use_case copy.md`](atlas_config_drift_unauthorized_change_use_case%20copy.md) | Unauthorized Change Detection end-to-end flow (Steps 1–14); decision point model (accept / investigate / rollback); evidence separation principle (drift evidence vs. impact evidence); governance and audit trail requirements; system lifecycle model (Observe → Analyze → Recommend → Plan → Authorize → Execute → Validate → Monitor → Close) |
| [`atlas_unified_use_case_agent_spec.md`](../atlas_unified_use_case_agent_spec.md) | Unauthorized Change lifecycle state model (Detect → Analyze → Decide → Plan → Execute → Validate → Monitor → Close); shared entity model (System, Change, Artifact) |
| [`personas.md`](../personas.md) | Annette (validated IBM Z Research Central, 2024 — American Express, Kyndryl, Fidelity); Zach, Alex, Greg persona definitions |
