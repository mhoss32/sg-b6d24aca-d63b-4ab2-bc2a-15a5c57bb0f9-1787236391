# UC-11: Disaster Recovery Validation
*Version 1.0 | Owner: Product Management | Last updated: August 2026*

---

## Executive Summary

IBM Z organizations run DR tests because they are required to — but the dirty secret is that DR tests regularly fail, and the failures are rarely surprises in retrospect. The DR environment has been quietly diverging from production for months; no one has been systematically comparing them; and the divergence only becomes visible when the test exposes it. Atlas changes this by treating DR readiness not as an annual test event but as a continuous, measurable state — monitoring DR environments daily, alerting when high-severity drift appears, and arriving at every DR test with a simulation already run and a pass verdict already in hand.

---

## 1. Overview

Disaster Recovery Validation gives organizations confidence that their DR environment will actually work when needed — before the test, not during it. Atlas compares DR to production, quantifies drift at the configuration, software, and access control level, prioritizes remediation by failure impact, and runs an isolated DR failover simulation to validate the environment before any real test event or real incident depends on it.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When our DR test is approaching — or a real incident requires failover — I want to know that the DR environment will work, that every configuration difference has been identified and either remediated or consciously accepted, and that the DR environment has been validated under production-level load in isolation, so we do not discover a showstopper during the actual test or during a real incident. |
| **Emotional** | The infrastructure architect and the operations manager both want to stop dreading the annual DR test. The test should confirm what they already know — that the environment works — not reveal what they should have fixed months ago. |
| **Social** | Regulatory requirements and audit committees require documented DR test results. Organizations need to demonstrate that DR readiness is an ongoing practice, not an annual event that sometimes fails. |

---

## 3. Customer Problem and Outcome

**Problem:** DR environments drift from production between test events. Configuration changes, PTF applies, RACF updates, and MQ channel changes accumulate on production; DR environments lag. Because no tool continuously compares the two environments, the drift accumulates invisibly. When the DR test runs, the failures are predictable in retrospect but were preventable in advance. In high-severity cases — missing RACF groups, insufficient buffer pools — the DR environment would fail within minutes of a real failover activation.

**Current State (Without Atlas):** DR readiness is assessed manually and infrequently, typically in the weeks before a scheduled DR test. The assessment relies on comparing configuration snapshots, spreadsheets, and the memory of team members who know which changes were made to production recently. The comparison is always incomplete. When the DR test fails, post-mortem analysis usually identifies changes that were applied to production but not to DR — changes that were knowable before the test.

**Desired Outcome:** DR readiness is a continuous, measurable state — not a point-in-time assessment before a test. Atlas monitors DR environments daily, surfaces high-severity drift as it appears (not weeks before a test), and provides a simulated failover validation that certifies the environment before the actual test date. Organizations enter DR tests with a documented, Atlas-produced pass verdict from a simulation run under production-level load.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | DR Validation is a strong Atlas Test and Atlas Provision SKU driver. The simulation scenario requires Atlas to provision an isolated environment and run production-level transaction load — directly invoking both add-on SKUs. A single DR test cycle involving multiple simulation runs represents significant recurring revenue. |
| **Retention impact** | Organizations that rely on Atlas for continuous DR monitoring accumulate a documented DR readiness history over time — test results, remediation records, simulation outcomes. This history is itself a compliance asset and is not portable to another tool. |
| **Competitive differentiation** | No current z/OS tool provides continuous, cross-environment drift monitoring combined with an isolated DR failover simulation capability. GDPS handles DR activation; it does not validate the DR environment before activation or run simulations. Atlas provides the "does it actually work?" answer before the real test. |
| **Portfolio attach** | This use case creates pull-through for IBM GDPS (the operational DR automation system that Atlas's DR validation feeds), IBM Z Software Discovery (software version parity checking), and IBM zSecure (RACF definition parity checking across environments). |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Greg — Infrastructure Architect | Owns DR architecture and DR readiness. Initiates the DR validation assessment, reviews the drift findings, approves the remediation plan, and signs off on simulation results. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Executes the remediation steps identified during the assessment — PTF applies, RACF changes, MQ channel updates. Works under Greg's direction on DR environment alignment. |
| **Secondary** | Quinn — IT Operations Manager | Consumes the DR readiness report as a governance artifact. Makes the go/no-go decision for the DR test based on Atlas's simulation results. |
| **Secondary** | Derek — Compliance Evidence Provider | Uses the DR readiness and simulation documentation as compliance evidence for regulatory requirements (e.g., DORA, SOX DR testing requirements). |

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary (Assess phase).** Cross-environment topology comparison — diffing production against DR for configuration, PTF levels, RACF definitions, and subsystem settings — is System Intelligence. The topology model must span multiple LPARs to make this comparison possible (requires TIB for cross-LPAR joins). | H2 2027 (full continuous monitoring); partial at GA (point-in-time comparison within TIB capability) |
| **Predictive Intelligence** | **Primary (Monitor and Simulate phases).** Continuous drift detection, DR failure point prediction (projecting which specific items will cause test failure based on observed drift), and simulation outcome analysis are Predictive Intelligence capabilities. The "DR will fail within 2 minutes due to missing RACF groups" prediction is a Predictive Intelligence output. | H2 2027 |
| **Change Intelligence** | **Supporting (Remediate phase).** Drift remediation — applying PTFs to DR, syncing RACF definitions, updating MQ channel configurations — is Change Intelligence. The remediation plan generated by Atlas is executed via Change Intelligence workflows. | GA Dec 2026 (Lean MVP); H1 2027 (full remediation types) |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Pre-DR-Test Readiness Assessment | **Planned** | H2 2027 | Cross-LPAR topology diff (TIB); continuous monitoring (Predictive Intelligence) | H2 2027 |
| DR Failover Simulation | **Planned** | H2 2027 | Atlas Provision SKU; Atlas Test SKU; isolated environment at production DR scale | H2 2027 |
| Continuous DR Parity Monitoring | **Planned** | H2 2027 | Predictive Intelligence continuous monitoring; scheduled diff execution | H2 2027 |
| Post-Incident DR Resync | **Planned** | H2 2027 | Cross-LPAR topology diff; Change Intelligence execution | H2 2027 |

**Capability dependency notes:**
- The entire use case depends on cross-LPAR topology comparison, which requires TIB for multi-LPAR graph joins. This is an Aug 19 milestone capability at the infrastructure level; the DR validation use case requires this capability extended to continuous monitoring, which is a H2 2027 feature.
- The DR Failover Simulation scenario is the most technically complex scenario in the Atlas library. It requires Atlas to provision an isolated environment at full DR scale, simulate a production failover, run the full application suite under production-level load, and monitor for failures — all without any impact to the real DR environment. This depends on the Atlas Provision and Atlas Test SKUs being at full production scale capability (H2 2027).
- Partial value is available earlier. Point-in-time DR comparison (identifying drift without continuous monitoring) is possible once TIB is available (Aug 19+). This is a useful demo capability but does not yet deliver the continuous monitoring story.

---

## 8. Scope and Boundaries

**In Scope:**
- Cross-environment topology comparison: configuration, software versions, PTF levels, and RACF definitions compared across production and DR LPARs
- Drift identification, severity classification, and failure impact prediction: for each drift item, Atlas predicts whether and how quickly it would cause a DR test failure
- Prioritized remediation plan generation: remediation items ordered by failure impact, with time estimates
- Drift remediation execution: applying PTFs, syncing RACF groups, updating MQ channel definitions, and other configuration alignment actions
- DR failover simulation: isolated environment provisioning, full application suite execution under production-level load, behavioral validation
- Continuous DR parity monitoring: daily comparison of DR against production, alert generation when high-severity drift appears
- Post-incident DR resync: after a real failover or DR test, identifying what has changed and generating the resync plan

**Out of Scope:**
- Physical DR activation (GDPS activation, network failover, storage mirroring) — Atlas validates that the DR environment is ready; it does not activate DR infrastructure
- Business continuity planning — Atlas addresses the technical DR readiness; BCP governance, communication plans, and business process fallbacks are out of scope
- DR for non-z/OS systems — Atlas is scoped to the IBM Z estate

**Non-Goals:**
- Atlas does not guarantee that the DR environment will succeed in a real incident — it validates against known drift and simulated load; unknown failure modes remain possible
- Atlas does not replace the GDPS operational role — it is a validation and readiness system, not a DR orchestration system

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | Both production and DR LPARs have been discovered by Atlas and have current Config-as-Code and PTF inventory data |
| **Assumption** | DR pairing relationships (PROD1 → DR1, PROD2 → DR2) are defined in the Atlas topology |
| **Dependency** | TIB for cross-LPAR topology joins required for multi-LPAR comparison |
| **Dependency** | Predictive Intelligence continuous monitoring capability (H2 2027) |
| **Dependency** | Atlas Provision SKU for DR simulation environment provisioning |
| **Dependency** | Atlas Test SKU for production-level load simulation and application validation |
| **Dependency** | GDPS configuration knowledge for DR pairing awareness (or manual DR pairing declarations in Atlas topology) |
| **Risk** | DR simulation at full production scale requires significant infrastructure capacity. If the isolated simulation environment cannot be provisioned at production scale, the simulation may produce false-clean results that underestimate real failover behavior. |
| **Risk** | Continuous monitoring generates alerts; alert fatigue is a real risk if low-severity drift is treated the same as high-severity drift. Alert tiering and suppression of accepted variance items must be implemented. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Pre-DR-Test Readiness Assessment | Upcoming scheduled DR test; user requests a DR readiness assessment | Planned | H2 2027 | UX Flow, Chat Exchange, Screen designs | Steps 1–6 |
| DR Failover Simulation | Post-remediation validation before the DR test; user requests a simulation | Planned | H2 2027 | UX Flow, Chat Exchange, Screen designs | Steps 7–9 |
| Continuous DR Parity Monitoring | Scheduled (daily); alert when high-severity drift appears | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |
| Post-Incident DR Resync | Real failover or DR test complete; Atlas identifies resync plan | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |

---

## 11. Lifecycle Overview

```
Compare → Predict → Remediate → Simulate → Monitor
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Compare** | Atlas performs a full cross-environment comparison — production vs. DR — across configuration, PTF levels, software versions, and RACF definitions; classifies each diff item by severity | Atlas |
| **Predict** | Atlas models which drift items would cause DR test failure if not remediated, and how quickly each failure would manifest after failover activation | Atlas |
| **Remediate** | Atlas generates a prioritized remediation plan; user reviews and authorizes; Atlas executes each remediation item against the DR environment | Both |
| **Simulate** | Atlas provisions an isolated environment representing the DR state, simulates a production failover, runs the full application suite under production-level load, and monitors for failures | Atlas |
| **Monitor** | Atlas registers the post-simulation DR state as the baseline and begins continuous daily monitoring; alerts when drift reappears | Atlas |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Cross-environment topology comparison | Atlas | Automated; runs on-demand or on schedule |
| Drift severity classification and failure impact prediction | Atlas | Based on topology model and known failure patterns |
| Remediation plan generation | Atlas | Atlas generates; user reviews and approves before execution |
| DR remediation execution | Shared | Atlas executes technical changes; user authorizes each production-impact item |
| DR simulation provisioning and execution | Atlas | Atlas Provision + Atlas Test; automated |
| Simulation go/no-go decision | User | Greg or Quinn reviews the simulation results and makes the formal DR readiness decision |
| Accepting variance items (not remediating) | User | User documents accepted variance with rationale; Atlas records it |
| Continuous monitoring alerts | Atlas | Atlas generates alerts; user reviews and acts |
| DR test authorization | User | The actual DR test execution is a human governance decision, not an Atlas decision |

**Governance gates:** Remediation authorization (each item), simulation approval (before the simulation is run against DR), and DR test authorization (separate from Atlas — organizational governance) are all human decisions.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Cross-LPAR topology diff** | Atlas compares two multi-subsystem environments at the configuration, PTF, and RACF level in a single operation | A manual comparison of this depth would take days; Atlas produces it in minutes |
| **Failure impact prediction** | Atlas predicts not just "these environments differ" but "this difference will cause authentication failure within 2 minutes of failover activation" | Converts a diff list into a prioritized action plan with quantified risk |
| **Simulation under production load** | Atlas validates the DR environment under a realistic production load simulation — not just "did the subsystems start?" but "did the applications behave correctly under load?" | Prevents the false-clean result from a lightweight test that misses contention and capacity issues |
| **Continuous parity monitoring** | Atlas monitors daily and alerts immediately when high-severity drift appears — rather than discovering drift at the next manual review cycle | This is the use case's most important behavioral shift: from reactive assessment to continuous readiness |
| **Causal drift attribution** | When drift is identified, Atlas attributes each item to the specific change event (production PTF apply, RACF update) that caused the divergence | This gives the remediation team precise information — not just "these are different" but "this became different when production change CR-4421 was applied" |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| DR test pass rate | Percentage of scheduled DR tests that complete without a test-stopping failure | Industry estimate: 60–70% first-attempt pass rate | 95%+ with Atlas-validated preparation |
| Drift-caused DR test failures | Number of DR test failures attributable to drift that Atlas would have detected | Estimated 3–5 per major DR test in complex environments | Zero for Atlas-monitored environments |
| Time from drift detection to remediation | Time between Atlas detecting a high-severity drift item and the remediation being applied | Unknown (not systematically monitored today) | Under 48 hours for high-severity items |
| Pre-DR simulation pass rate | Percentage of Atlas DR simulations that produce a clean pass verdict | Not applicable (simulations do not exist today) | 90%+ for environments with active continuous monitoring |
| Time to DR readiness assessment | Time from readiness assessment request to complete assessment | 3–5 days (manual) | Under 2 hours |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| DR environment cannot be compared because DR LPARs are not discovered in Atlas | Atlas explicitly states that DR LPARs are present in the topology declaration but lack Config-as-Code data; cannot produce a diff | User works with the Atlas admin to run a discovery pass against the DR LPARs |
| Simulation provisioning fails at production scale | Atlas reports the provisioning failure with root cause (capacity, configuration error); cannot complete the simulation | User works with infrastructure to free capacity; Atlas retries provisioning |
| Simulation identifies a failure that was not in the drift items | Atlas surfaces the unexpected failure with the specific application behavior and configuration context; updates the drift analysis | User investigates the failure; may represent an undiscovered dependency |
| High-severity drift alert generates alert fatigue | Atlas allows users to mark specific drift patterns as accepted variance; suppresses acknowledged items in subsequent alerts | User reviews and acknowledges accepted variance items; Atlas adjusts alert scope |
| A real incident requires failover before the DR test cycle | Atlas cannot guarantee DR readiness if monitoring has been inactive; produces a current-state diff and fast assessment based on available data | User uses Atlas's best-available diff as input to the failover decision; acknowledged gaps inform the incident response |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Documented DR test evidence | Regulations (DORA, SOX, banking regulators) require documented DR test results and evidence of regular testing | Atlas simulation results and DR readiness reports serve as the documented evidence; they carry timestamp, scope, and outcome |
| Change record for DR remediation | Changes to DR environments to align them with production should have associated change records | Atlas generates change record templates for each remediation item; ServiceNow integration (H2 2027) automates linkage |
| DR readiness sign-off | Governance frameworks require a named sign-off on DR readiness before a test | Atlas simulation results are presented to Quinn for formal sign-off; the sign-off is recorded in Atlas |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-10: Environment Parity and Drift Control | UC-10 and UC-11 share the drift detection infrastructure. UC-10 covers production vs. non-production parity broadly (QA, test, dev). UC-11 is specifically focused on DR readiness — the scenarios where failure has the highest business consequence. The two use cases share the continuous monitoring capability and differ in scope and urgency. |
| UC-06: Patch Management | UC-06's scope includes DR environment exposure — if a security PTF or routine PTF is applied to production but not to DR, UC-06 proactively flags the open DR exposure during the remediation lifecycle. UC-11's drift detection surfaces the same gap from a DR readiness perspective. Both use cases benefit from the cross-environment PTF inventory comparison capability. |
| UC-01: Audit and Compliance | DR test results generated by UC-11 are compliance evidence for regulations that require documented DR testing. UC-11 produces the artifacts that UC-01's evidence assembly workflow needs for DR-related compliance requirements. |
| UC-05: Change Governance and Traceability | DR environment changes (remediation of drift items) should be recorded in the change governance system. UC-05 owns the change attribution and traceability infrastructure that UC-11's remediation events feed into. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **GDPS integration — DR readiness as input to activation decision** | H2 2027 | Atlas provides its DR readiness assessment as a structured input to GDPS activation decisions — so that the activation system knows whether the DR environment has been validated before activating failover. Requires a GDPS integration that is not currently planned. |
| **Agentic DR environment maintenance** | 2028+ | Atlas continuously monitors DR drift and automatically remediates low-risk drift items (e.g., routine PTF applies that are identical to production-validated applies) without human initiation — maintaining DR alignment as an ongoing automated operation rather than a periodic project. Human approval still required for high-risk changes. |
| **Multi-site DR topology** | 2028+ | For organizations with geographically distributed DR sites, Atlas models the full multi-site topology and validates that all DR sites are aligned — not just the primary DR site. |
| **Real-time DR readiness score** | H2 2027 | Atlas maintains a rolling DR readiness score per DR site — a single number reflecting the current drift severity profile. Visible on the topology canvas. Changes in the score trigger alerts. |

---

## 19. Pain Points & Wows Flow Analysis

> **Pillar:** Predictive Intelligence (monitor/simulate) + System Intelligence (diff/assess) + Change Intelligence (remediate)
> **GA Status:** H2 2027 (full continuous monitoring and simulation); point-in-time DR assessment at GA

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Assess

| Persona | Pain Point | Category |
|---|---|---|
| Greg | DR readiness is assessed manually and infrequently — typically in the weeks before a scheduled DR test. The assessment relies on comparing configuration snapshots, spreadsheets, and team memory. | ⏱️ Lost Time — **2–4 weeks** of manual assessment effort before each DR test |
| Greg | The comparison is always incomplete — changes applied to production over months are partially tracked, partially remembered, and partially missed. | 💼 Business Impact — DR assessment completeness is systematically limited by human memory and manual tooling |
| Zach | When the DR test reveals gaps, the remediation must be executed under the time pressure of a test deadline — not proactively while there was time. | ⏱️ Lost Time — **emergency remediation effort** concentrated immediately before or during the DR test |

#### Step 2 — Monitor

| Persona | Pain Point | Category |
|---|---|---|
| Greg | No continuous monitoring between DR tests — DR environments drift invisibly as production changes accumulate without being applied to DR. | 💼 Business Impact — by the next DR test, months of drift have accumulated with no visibility until test day |
| Zach | Changes applied to production (PTF applies, RACF updates, MQ channel changes) are not systematically tracked for DR propagation — each change requires a separate manual decision to replicate to DR. | 💼 Business Impact — systematic production→DR drift is a natural consequence of the process, not an exception |

#### Step 3 — Remediate

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Remediation is executed against an incomplete diff — the list of what needs to change is manually assembled and always incomplete, so remediations leave residual gaps. | 💼 Business Impact — incomplete remediation means the DR test will surface gaps that "should have been fixed" |
| Zach | Remediating DR environments requires the same expert time as production changes — but DR changes are lower-priority and often deferred, compounding the drift. | ⏱️ Lost Time — **days to weeks** of remediating months of accumulated DR drift before each test cycle |

#### Step 4 — Simulate

| Persona | Pain Point | Category |
|---|---|---|
| Greg | DR tests fail for reasons that were knowable in advance. Post-mortem analysis consistently identifies changes that were applied to production but not to DR — changes that were in the change log the whole time. | 💼 Business Impact — DR test failures are expensive to recover from, and the cause is retrospectively obvious but prospectively invisible |
| Greg | No simulated failover capability — the DR test is the first time the environment is actually exercised under production-level conditions. | 💼 Business Impact — first real validation of DR readiness is the actual DR test, with no simulation run first |
| Quinn | Go/no-go for the DR test is made without a simulation result — the decision is based on the team's assessment of completeness, not on a verified test outcome. | 🔒 Skill Gap / Bottleneck — Quinn must approve or defer the DR test without an objective readiness verdict |

#### Step 5 — Record

| Persona | Pain Point | Category |
|---|---|---|
| Derek | DR test documentation is assembled manually from test reports, remediation records, and team notes — a time-consuming audit evidence exercise. | ⏱️ Lost Time — **days** assembling DR test evidence for compliance purposes |
| Derek | Regulatory frameworks (DORA, SOX DR testing) require evidence of systematic DR readiness — the current evidence is point-in-time and manually assembled. | 💼 Business Impact — compliance evidence quality is limited by the manual assembly process |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Assess

| Persona | Wow Moment | Category |
|---|---|---|
| Greg | Complete DR vs. production diff produced on demand — every configuration, PTF, RACF, and subsystem difference enumerated with severity classification. | ⏱️ Time Saving — **2–4 weeks manual assessment → hours** for a complete DR readiness assessment |
| Greg | High-severity gaps (missing RACF groups, insufficient buffer pools, missing critical PTFs) surfaced immediately and classified — Greg knows exactly what would cause a DR failure without running a test first. | 🤖 Atlas AI Insight & Automation — DR failure point prediction identifies specific items that would cause failover failure based on the observed diff |

#### Step 2 — Monitor

| Persona | Wow Moment | Category |
|---|---|---|
| Greg | High-severity DR drift surfaced as it appears — each significant production change triggers an immediate DR equivalence check, not a manual quarterly review. | 🤖 Atlas AI Insight & Automation — continuous DR monitoring closes the gap between test cycles with real-time drift alerting |
| Zach | When Zach applies a change to production, Atlas automatically checks whether the same change needs to be applied to DR and surfaces the gap — no separate manual tracking required. | 🤖 Atlas AI Insight & Automation — production change → DR equivalence check runs automatically |

#### Step 3 — Remediate

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | DR remediation plan generated from the complete diff — every gap addressed, nothing left to memory or guesswork. | ⏱️ Time Saving — **days to weeks of manual remediation planning → Atlas-generated targeted plan** |
| Greg | Post-remediation validation runs automatically — Atlas confirms the DR environment reached production equivalence before the test cycle begins. | 🤖 Atlas AI Insight & Automation — post-remediation equivalence check runs automatically; no manual re-assessment needed |

#### Step 4 — Simulate

| Persona | Wow Moment | Category |
|---|---|---|
| Greg | Simulated failover validation produces a certified pass result before the actual DR test — organizations enter the test with documented evidence it will work. | 🤖 Atlas AI Insight & Automation — isolation-based DR simulation at production load is only possible through Atlas's environment provisioning and test execution capabilities |
| Quinn | Go/no-go decision for the DR test is made from Atlas's simulation pass/fail verdict — an objective, reproducible readiness signal rather than a team assessment. | 🆕 New User Capability — Quinn makes the DR test authorization decision from a verified simulation result, independently |

#### Step 5 — Record

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Complete DR readiness history generated from Atlas — continuous monitoring data, remediation records, simulation results, and test outcomes as structured evidence. | ⏱️ Time Saving — **days manual documentation → automatic evidence generation** |
| Derek | Regulatory compliance evidence (DORA, SOX DR requirements) produced directly from Atlas's DR monitoring and simulation records — no manual assembly from test reports and team notes. | 🆕 New User Capability — Derek independently produces DR compliance evidence from Atlas without requiring Greg or Zach to assemble it |

> **Overall outcome:** DR readiness shifts from a pre-test scramble to a continuous, measurable state. DR test failures caused by knowable gaps become preventable — Atlas surfaces them as they appear, not on test day. Organizations enter DR tests with a documented simulation pass result, not a team assessment.

---

## 20. Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (supporting)
> **GA Status:** GA Dec 2026

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
| Environment comparison | 300,000 | 3.0 |
| Evidence package | 400,000 | **4.0** ← key for compliance validation record |
| Functional test suite | 300,000 | 3.0 |
| Virtual environment provision (per 10) | — | 1.0 |

### Desired Outcome Flow — Atlas Units per Step

Lifecycle: `Trigger → Assess DR Parity → DR Readiness Assessment → Provision DR Test → Validate Functional Equivalence → Record DR Validation → Ongoing Monitoring`

#### Step 1 — Trigger
**Unit type:** Footprint (chat, scope intake) — **0 units**

#### Step 2 — Assess DR Parity (Configuration and PTF State)
Atlas compares the DR environment to its production counterpart across all dimensions: PTF levels, software versions, RACF definitions, subsystem configuration, cryptographic settings, dataset allocations, network definitions.

| Activity | Tokens | Units |
|---|---|---|
| Production vs. DR environment comparison | 300,000 | **3.0** |

**Step 2 subtotal: 3.0 units**

#### Step 3 — DR Readiness Assessment
Atlas assesses whether the DR environment is operationally ready — subsystems defined, LPAR configured to accept production workload, production-specific settings present in DR — and generates a go/no-go recommendation.

| Activity | Tokens | Units |
|---|---|---|
| DR operational readiness assessment | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

#### Step 4 — Provision DR Test Environment
Atlas provisions a test instance of the DR environment to validate functional equivalence under production-level load.

| Activity | Events | Units |
|---|---|---|
| DR test environment provision | 1 successful provision | **0.1** |

**Step 4 subtotal: 0.1 units**

#### Step 5 — Validate Functional Equivalence
Atlas generates and executes functional tests confirming the DR environment can serve production transactions equivalently — key business transactions, critical batch jobs, external API interfaces.

| Activity | Tokens | Units |
|---|---|---|
| Functional test suite for DR equivalence validation | 300,000 | **3.0** |

**Step 5 subtotal: 3.0 units**

#### Step 6 — Record DR Validation
Atlas generates the compliance-grade DR validation record required by SOX, DORA, FSOC, and similar regulatory frameworks.

| Activity | Tokens | Units |
|---|---|---|
| DR validation evidence package | 400,000 | **4.0** |

**Step 6 subtotal: 4.0 units**

#### Step 7 — Ongoing DR Monitoring
Monitoring is footprint. A drift alert artifact, if generated, is metered as a partial comparison.

| Activity | Tokens | Units |
|---|---|---|
| Continuous DR drift monitoring (footprint) | Footprint | 0 |
| Drift alert artifact (conditional, if significant drift detected) | ~150,000 | **1.5** (conditional) |

**Step 7 subtotal: 0 units (nominal)**

### Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Scope intake (footprint) | 0 |
| 2 — Parity Check | Production vs. DR comparison | 3.0 |
| 3 — Readiness Assessment | DR operational readiness assessment | 2.5 |
| 4 — Provision | DR test environment provision | 0.1 |
| 5 — Validate | Functional equivalence test suite | 3.0 |
| 6 — Record | DR validation evidence package | 4.0 |
| 7 — Monitor | Ongoing drift monitoring (footprint) | 0 |
| **TOTAL** | **Nominal DR validation cycle** | **12.6 units** |

### Sensitivity Analysis

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Lightweight parity check only (no functional test) | Comparison + readiness assessment only; no test suite | ~0.44× |
| Standard annual DR validation (regulatory compliance) | Baseline | 1.0× |
| Complex DR validation (multiple application tiers, two DR sites) | 2× comparisons + 2× test suites + evidence package | ~1.6–1.75× |

| Additional Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional DR site added to validation scope | Additional comparison + test suite per site | +6.1 per site |
| Quarterly instead of annual validation cadence | 3 additional full validation cycles per year | +37.8 per year |
| Interim drift monitoring re-assessment triggered | One additional partial assessment per drift event | +1.5 per event |
| DR validation combined with UC-10 parity cycle | Eliminates duplicate Step 2 comparison | −3.0 |

### What is NOT Metered
- Configuration collection and state snapshot collection
- Topology queries about DR environment
- Chat-based DR status questions
- Test execution
- Ongoing DR drift monitoring (continuous background process)

### Notes and Assumptions
1. UC-11 is a **compliance-driven use case** — the evidence package (4.0 units) is particularly important because it is the deliverable that satisfies regulatory requirements. Organizations running quarterly DR validation under DORA or FSOC will budget ~50 units/year from DR validation evidence packages alone.
2. **Overlap with UC-10:** The production vs. DR comparison (Step 2) is functionally the same as a UC-10 environment comparison. Organizations running both UC-10 (ongoing parity monitoring) and UC-11 (formal DR validation) can potentially consolidate the Step 2 comparison into the UC-10 cadence, avoiding duplication.
3. **Overlap with UC-06:** When UC-06 flags open DR exposure during a vulnerability remediation, the DR validation (Steps 2–6 here) is a direct downstream action. The unit costs from UC-06's DR monitoring step and UC-11's formal DR validation should not both be charged for the same DR assessment event.
4. The **DR validation evidence package** is the highest-governance artifact in this use case — it is the document that an auditor will examine. Its 400K token budget reflects the need to compile configuration snapshots, test evidence, parity confirmation, and authorization records into a single structured document.

---

## 21. External Product Synergies

### Bob PPZ

**No Bob PPZ touchpoint in this use case.**

Disaster Recovery Validation operates entirely at the infrastructure, configuration, PTF, and security layer. The workflow assesses production-vs-DR environment differences in configuration parameters, PTF levels, RACF definitions, MQ channel configurations, and subsystem settings — and remediates those differences through Atlas-orchestrated infrastructure changes. No application code changes are involved in any step of this workflow.

Bob PPZ owns code-level application execution. DR readiness gaps are infrastructure gaps — missing RACF groups, insufficient buffer pools, missing critical PTFs, MQ channel mismatches — not application code deficiencies.

*If a DR simulation failure exposes an application code issue, that remediation would be initiated as a separate application change workflow (UC-07). The DR validation use case itself has no Bob PPZ touchpoint.*

---

### Concert for Z

Concert for Z's production service topology and behavioral baselines enrich Atlas's DR validation in two meaningful ways: the production service model informs the DR assessment's business-service-criticality ranking, and Atlas's DR simulation results provide Concert for Z with a pre-tested operational baseline for DR environments. There is no upstream Concert for Z trigger for DR validation, but the enrichment relationship is material for business-service-critical DR readiness assessment.

**Tier 1 — Explicit Handoff Points:** None. DR validation is initiated by Greg on a scheduled or triggered basis, led entirely by Atlas. Concert for Z does not trigger DR validation workflows.

**Tier 2 — Enrichment Touchpoints:**

*Step 1 — Assess:* Concert for Z's business service topology enriches severity classification with business-service context. A missing RACF group on a DR LPAR serving a high-criticality payment service (identified by Concert for Z's service topology) is a higher-severity finding than the same gap on a low-traffic internal batch system. Concert for Z's service impact model translates Atlas's technical diff items into business-service-level risk rankings, helping Greg prioritize DR remediations by business impact rather than purely technical severity.

*Step 4 — Simulate:* Concert for Z's production transaction volume data (SMF-derived via OMEGAMON Data Provider) provides the production load profile that Atlas uses for the simulation — ensuring the simulated load matches what production actually experiences, not a theoretical peak estimate.

*Step 5 — Record:* After a DR test, Concert for Z can confirm that the DR environment's behavioral profile during the test matched production norms, providing an additional evidence dimension for DORA and SOX DR compliance documentation.

> **Overall Concert for Z relevance:** Moderate for enrichment. Concert for Z's production service topology and behavioral data materially improve the business-service-criticality ranking of DR findings and the accuracy of DR simulation load profiles.

---

### Terraform Self-Managed for Z

Disaster recovery validation is one of the two primary Terraform synergy scenarios, addressed directly by Terraform Synergy Use Case 5 — Disaster Recovery Environment Readiness and Parity Validation. The combined outcome: "Terraform keeps the DR infrastructure declaration in sync; Atlas keeps the full z/OS stack in sync and provides the readiness evidence." Atlas and Terraform occupy complementary, non-overlapping roles: Atlas detects and quantifies drift across the full z/OS stack (PTF currency, middleware configuration, application connectivity, RACF state); Terraform enforces that the DR infrastructure matches the production infrastructure declaration from a single HCL source of truth.

**Tier 1 — Explicit Handoff Points:**

*Step 2 — Assess DR Parity:* Atlas requests the Terraform state diff between the production workspace and the DR workspace. This diff represents the infrastructure-layer parity gap. Atlas incorporates this as the infrastructure-layer parity finding in the overall production-vs-DR comparison artifact, alongside its own z/OS software, PTF, and configuration layer comparisons.

*Step 5 — Validate Functional Equivalence:* Atlas passes the DR test environment specification to Terraform. Terraform provisions the DR test infrastructure using the same workspace declaration as the production environment, ensuring the test environment reflects both the production infrastructure state and the DR LPAR configuration. This confirms that the test environment is a valid proxy for a real failover scenario.

*Step 5 — Post-Resync Re-Provisioning (if required):* When the DR remediation plan includes re-provisioning the DR infrastructure, Atlas directs the team to apply the current production Terraform workspace configuration to the DR workspace, re-syncing the DR infrastructure as the foundation for subsequent software and configuration layer remediations.

**Tier 2 — Enrichment Touchpoints:**

*Step 1 — Trigger:* Terraform's scheduled `terraform plan` against the DR workspace surfaces infrastructure-layer drift and serves as a trigger signal for Atlas to investigate whether the infrastructure drift correlates with broader z/OS stack drift.

*Step 6 — Record DR Validation:* Terraform's workspace state comparison — the infrastructure-layer evidence that both production and DR are running from equivalent HCL declarations — complements the Atlas evidence package, producing a complete, auditor-visible DR readiness record spanning infrastructure and software layers. This is increasingly required by financial services regulations (DORA, FSOC).

> **Overall Terraform relevance:** High. DR validation is one of the two primary synergy scenarios in the Terraform positioning document and one of the strongest cross-product stories in the IBM Z portfolio. Regulatory DR requirements increasingly demand evidence across both infrastructure and application layers, making the combined Atlas + Terraform DR validation record more defensible than either product's evidence alone.
