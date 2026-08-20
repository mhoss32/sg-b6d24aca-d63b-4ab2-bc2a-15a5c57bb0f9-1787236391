# UC-10: Disaster Recovery Validation
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

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

Reference [`personas.md`](../personas.md).

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
| Pre-DR-Test Readiness Assessment | Upcoming scheduled DR test; user requests a DR readiness assessment | Planned | H2 2027 | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc7-dr-validation.md`](../design/flows/uc7-dr-validation.md) Steps 1–6 |
| DR Failover Simulation | Post-remediation validation before the DR test; user requests a simulation | Planned | H2 2027 | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc7-dr-validation.md`](../design/flows/uc7-dr-validation.md) Steps 7–9 |
| Continuous DR Parity Monitoring | Scheduled (daily); alert when high-severity drift appears | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |
| Post-Incident DR Resync | Real failover or DR test complete; Atlas identifies resync plan | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |

**Design decisions for this scenario catalog:**

- Kyle's uc7 maps cleanly to two scenarios: the assessment and remediation cycle (Steps 1–6) and the simulation and continuous monitoring cycle (Steps 7–9). These are distinct customer moments — the assessment is a project-style engagement; the simulation is a pass/fail validation event; continuous monitoring is an ongoing operational behavior.
- The failure impact prediction in Step 3 of Kyle's scenario ("Atlas projects the DR test will fail within 2 minutes due to missing RACF groups") is the strongest Predictive Intelligence moment in this use case. It should be preserved in demo planning.

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
| UC-09: Environment Parity and Drift Control | UC-09 and UC-10 share the drift detection infrastructure. UC-09 covers production vs. non-production parity broadly (QA, test, dev). UC-10 is specifically focused on DR readiness — the scenarios where failure has the highest business consequence. The two use cases share the continuous monitoring capability and differ in scope and urgency. |
| UC-01: Vulnerability Remediation | UC-01's scope includes DR environment exposure — if a security PTF is applied to production but not to DR, UC-01 flags the DR exposure. UC-10's drift detection surfaces the same gap from a DR readiness perspective. Both use cases benefit from the cross-environment PTF inventory comparison capability. |
| UC-03: Audit and Compliance | DR test results generated by UC-10 are compliance evidence for regulations that require documented DR testing. UC-10 produces the artifacts that UC-03's evidence assembly workflow needs for DR-related compliance requirements. |
| UC-14: Change Governance and Traceability | DR environment changes (remediation of drift items) should be recorded in the change governance system. UC-14 owns the change attribution and traceability infrastructure that UC-10's remediation events feed into. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **GDPS integration — DR readiness as input to activation decision** | H2 2027 | Atlas provides its DR readiness assessment as a structured input to GDPS activation decisions — so that the activation system knows whether the DR environment has been validated before activating failover. Requires a GDPS integration that is not currently planned. |
| **Agentic DR environment maintenance** | 2028+ | Atlas continuously monitors DR drift and automatically remediates low-risk drift items (e.g., routine PTF applies that are identical to production-validated applies) without human initiation — maintaining DR alignment as an ongoing automated operation rather than a periodic project. Human approval still required for high-risk changes. |
| **Multi-site DR topology** | 2028+ | For organizations with geographically distributed DR sites, Atlas models the full multi-site topology and validates that all DR sites are aligned — not just the primary DR site. |
| **Real-time DR readiness score** | H2 2027 | Atlas maintains a rolling DR readiness score per DR site — a single number reflecting the current drift severity profile. Visible on the topology canvas. Changes in the score trigger alerts. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-10](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`design/flows/uc7-dr-validation.md`](../design/flows/uc7-dr-validation.md) | Complete 9-step DR validation scenario; Steps 1–9 cover the full arc from drift discovery through simulation and continuous monitoring; failure impact prediction (Step 3) and simulation (Steps 7–8) are canonical capability demonstrations |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 3 "Disaster recovery validation"; Phase 3 "Production parity analysis" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Greg, Zach, Quinn, Derek |
