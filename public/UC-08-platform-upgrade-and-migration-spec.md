# UC-08: Platform Upgrade and Migration
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

A z/OS version upgrade or major middleware upgrade is the highest-risk, highest-complexity event in the mainframe calendar — organizations attempt it only once every few years, it requires months of preparation, and the failure modes are severe. The expertise required to sequence it safely is concentrated in a handful of specialists, and the risk is not just in what you change but in the dependencies you did not know about. Atlas reduces a months-long manual planning process to a structured, sequenced, AI-generated plan — identifies compatibility issues across 300+ applications before a single change is made, detects sequencing risks that human planners miss, and runs regression testing at each phase before production is touched.

---

## 1. Overview

Platform Upgrade and Migration covers the planning, sequencing, and execution of major platform changes: z/OS version upgrades, middleware product major version upgrades (CICS, Db2, MQ, IMS), and sysplex reconfigurations. These are the changes where underestimated scope and missed sequencing dependencies cause the most serious production incidents. Atlas provides the topology awareness and change orchestration that makes these events manageable — not just executable.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When our organization needs to upgrade a core platform component — z/OS, CICS, Db2, or another major middleware product — I want to know the full compatibility impact before we start, have a sequenced plan that accounts for all cross-system dependencies, and be able to validate each phase in isolation before touching production, so we can complete the upgrade without causing a production incident. |
| **Emotional** | The systems programmer who owns a major upgrade wants to enter the project with a clear plan, not a fear that something will go wrong in a way they could not have predicted. The last thing they want is to discover during production phase 4 that there was a known compatibility issue they were never told about. |
| **Social** | IT leadership needs to show that platform modernization is possible — not something that gets deferred year after year because the risk is perceived as unmanageable. Atlas makes the upgrade story a controlled engineering project, not a heroic effort. |

---

## 3. Customer Problem and Outcome

**Problem:** Major platform upgrades require knowledge of compatibility issues across every application, subsystem, and configuration item in the environment. This information is scattered across IBM release documentation, IBM support databases, subsystem-specific compatibility notes, and application owners who may not even know their applications have dependencies on behaviors that are changing. Assembling a complete compatibility picture manually takes weeks, is error-prone, and relies on a small number of experts who may not have done a comparable upgrade in years.

**Current State (Without Atlas):** Organizations typically rely on SMP/E for PTF-level compatibility, manual review of IBM upgrade guides, and direct consultation with subsystem specialists. A z/OS version upgrade involves a dedicated planning project measured in months. Compatibility issues are typically discovered during testing — sometimes during production cutover — because the manual analysis missed a dependency. Emergency rollbacks are not uncommon. Sequencing mistakes (wrong upgrade order for interdependent subsystems) are a leading cause of upgrade failures.

**Desired Outcome:** Atlas scopes the full compatibility impact of a platform upgrade in minutes — across all LPARs, all subsystems, all applications, and all known compatibility notes for the target version. It generates a sequenced, risk-ordered upgrade plan that accounts for subsystem interdependencies. Each phase is validated in isolation before production is touched. Compatibility issues are surfaced before the project starts, not during production cutover.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Platform Upgrade drives the Atlas Provision SKU and the Atlas Test SKU — both are directly required for phased upgrade execution (environment provisioning for phase isolation, regression testing at each phase). This is one of the highest-revenue-per-event use cases in the Atlas library because a single z/OS upgrade project may involve dozens of provisioning and testing events. |
| **Retention impact** | An organization that completes a successful z/OS upgrade with Atlas is extremely unlikely to churn. The upgrade is a defining proof point of Atlas's value, and the test and validation history accumulated during the project becomes a permanent reference artifact in Atlas for the next upgrade cycle. |
| **Competitive differentiation** | There is no competing product that combines compatibility assessment, sequencing analysis, phased provisioning, and regression test orchestration for a major z/OS upgrade in a single system. SMP/E handles PTFs; IBM upgrade guides handle compatibility notes; test environments are provisioned manually. Atlas is the first product to join all of these. |
| **Portfolio attach** | This use case creates pull-through for IBM Z Software Discovery (compatibility inventory source), ZUnderstand (application-level compatibility analysis), and IBM Z Systems Software (the target IBM products being upgraded). Upgrade planning also creates natural touchpoints with IBM Z Client Experience Teams who assist with complex upgrade projects. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Zach — z/OS Systems Programmer (experienced) | Owns the upgrade project. Initiates the assessment, reviews the plan, authorizes each phase, and owns production cutover. The person who is personally accountable if the upgrade causes a production incident. |
| **Secondary** | Greg — Infrastructure Architect | Provides architecture context for the upgrade — sysplex considerations, LPAR sequencing, DR implications. Reviews the phased plan for infrastructure correctness. |
| **Secondary** | Alice — z/OS Systems Programmer (mid-level) | Executes phases assigned by Zach — particularly remediation steps and test phases on lower-criticality LPARs. |
| **Secondary** | Angie — Application Architect | Reviews the application-level compatibility findings to understand what, if anything, the application development team needs to address before the upgrade is complete. |

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary (Scope and Assess phases).** The compatibility impact assessment — which applications use affected interfaces, what the current environment state is across all LPARs, and how subsystems depend on each other — is System Intelligence. Atlas's topology model is what makes a 300-application compatibility sweep possible in minutes rather than weeks. | GA Dec 2026 (PTF-level upgrades); H1 2027 (full MW/SW upgrade scope) |
| **Change Intelligence** | **Primary (Plan and Execute phases).** Upgrade plan generation, phase sequencing, isolated environment provisioning, regression test execution, and production promotion sequencing are Change Intelligence capabilities. The execution half of an upgrade is Change Intelligence. | GA Dec 2026 (Lean MVP for PTF-level); H1 2027 (full MW/SW upgrade orchestration) |
| **Predictive Intelligence** | **Supporting throughout.** Sequencing risk detection (subsystems that must be upgraded in a specific order to avoid compatibility failures), post-upgrade behavior change monitoring (a subsystem running differently after upgrade), and proactive identification of new compatibility issues discovered during testing are Predictive Intelligence behaviors. | Partial at GA (pattern-based sequencing rules); full H2 2027 (behavioral monitoring) |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| z/OS Version Upgrade | **Planned** | H1 2027 (full) | Atlas Test SKU; ZUnderstand for application-level compatibility; full MW/SW upgrade orchestration | H1 2027 |
| Middleware Product Upgrade (CICS, Db2, MQ, IMS) | **Planned** | H1 2027 | Lean PTF Orchestration extended to MW/SW upgrade sequencing | H1 2027 |
| Sysplex Reconfiguration | **Planned** | H1 2027 | System Intelligence topology with sysplex structure model | H1 2027 |
| Phased Migration from Legacy to Modern Stack | **Planned** | H2 2027 | Full Change Intelligence + cumulative state tracking across migration cycles | H2 2027 |

**Capability dependency notes:**

- This use case is the most Change Intelligence-intensive in the Atlas library. The full scenario requires environment provisioning (Atlas Provision SKU), regression test orchestration (Atlas Test SKU), and full MW/SW upgrade plan generation — none of which are in the GA Dec 2026 Lean MVP. GA delivers Lean PTF Orchestration (single-PTF, single-LPAR), which is a precursor capability; the full upgrade orchestration is H1 2027.
- The sequencing risk detection behavior (Atlas identifies that Db2 must be upgraded before CICS for a z/OS 3.1 migration) is demonstrable from the Kyle scenario (uc6-zos-upgrade.md, Step 3) and is one of the most compelling Predictive Intelligence moments in the entire Atlas demo library. It should be preserved in demo planning for H1 2027 onward.
- Sysplex Reconfiguration depends on the sysplex topology model being fully populated in Atlas — CF structure definitions, cross-LPAR XCF membership, and DR pairing relationships. This requires the cross-LPAR topology work that is enabled by TIB.

---

## 8. Scope and Boundaries

**In Scope:**
- Compatibility impact assessment for a target z/OS version or middleware product version: identifying all applications, programs, and configurations that use interfaces or behaviors that change in the target version
- Cross-subsystem sequencing analysis: identifying the correct upgrade order for interdependent subsystems to avoid known compatibility failures
- Phased upgrade plan generation: sequenced plan with phase-by-phase scope, test criteria, and production promotion decision points
- Isolated environment provisioning for each phase: Atlas provisions a test environment at the starting version, applies the upgrade, and runs regression tests before production is touched
- Regression test execution at each phase: full application regression suite against the upgraded environment to confirm no behavioral regressions
- Post-upgrade behavioral monitoring: Atlas monitors the upgraded environment for behavioral changes that suggest a compatibility issue was missed
- Compatibility finding remediation: for each identified compatibility issue, Atlas generates the specific remediation (code change, configuration update, PTF apply) required to resolve it

**Out of Scope:**
- Hardware upgrade planning — Atlas manages IBM Z software; hardware capacity and configuration changes are out of scope
- Non-IBM Z software compatibility — Atlas manages the IBM Z software stack; third-party ISV product compatibility is out of scope
- Network fabric reconfiguration — Atlas understands network topology but does not manage network changes
- Data migration — if an upgrade requires database schema changes or data format conversions, the data migration work itself is out of scope

**Non-Goals:**
- Atlas does not perform upgrades without phased human authorization. Each production phase requires explicit user approval before Atlas proceeds. The phased model is intentional and non-negotiable for upgrade scenarios.
- Atlas does not replicate or replace IBM's formal upgrade documentation — it consumes that documentation as a knowledge source and applies it to the specific environment; it does not produce general upgrade guidance.

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The environment is fully discovered in Atlas prior to the upgrade assessment — all LPARs, all relevant subsystems, all application inventories are in the topology |
| **Assumption** | IBM's compatibility documentation for the target z/OS or middleware version is available to Atlas as a knowledge source (either via embedded knowledge base or live ibm.com PTF/release feed) |
| **Dependency** | Config-as-Code (all subsystems) for current environment state |
| **Dependency** | IZSAM Lite for software version inventory across all LPARs |
| **Dependency** | ZUnderstand (H1 2027) for application-level compatibility analysis — identifying which programs use affected interfaces |
| **Dependency** | Atlas Test SKU for regression test orchestration |
| **Dependency** | Atlas Provision SKU for isolated environment provisioning per phase |
| **Dependency** | TIB for cross-LPAR topology joins required for sysplex-aware upgrade sequencing |
| **Interoperability** | **IBM Z Upgrade Agent (ZUA)** — ZUA is a wxa4z skill that provides chat-guided z/OSMF execution: FIXCAT gap detection, PTF acquisition via Shopz, SMP/E installation, and HOLD management. In the Atlas upgrade workflow, ZUA runs as the execution primitive inside the Atlas chat layer. Atlas provides compatibility assessment, sequencing, provisioning, and testing on top; ZUA handles the z/OSMF operations underneath. Not a dependency for the use case to function, but the intended execution layer for the PTF apply steps. See [`positioning/atlas-and-zua-positioning.md`](../positioning/atlas-and-zua-positioning.md). |
| **Risk** | Incomplete discovery produces incomplete compatibility coverage — Atlas will identify what it knows about; dependencies in undiscovered components are invisible until testing reveals them. Discovery completeness should be validated before a major upgrade assessment begins. |
| **Risk** | IBM compatibility documentation evolves between release and GA. Atlas's embedded knowledge must be kept current; stale compatibility notes produce missed findings. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| z/OS Version Upgrade | Organization needs to move from one z/OS version to another (e.g., 2.5 → 3.1) | Planned | H1 2027 | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc6-zos-upgrade.md`](../design/flows/uc6-zos-upgrade.md) |
| Middleware Product Upgrade | Major subsystem version upgrade (e.g., CICS TS 6.2 → CICS TS 7.0, Db2 V13 → Db2 V15) | Planned | H1 2027 | UX Flow, Chat Exchange | TBD |
| Sysplex Reconfiguration | Changes to sysplex structure — LPAR additions, coupling facility changes, DR pairing changes | Planned | H1 2027 | UX Flow, Chat Exchange | TBD |
| Phased Migration from Legacy to Modern Stack | Incremental modernization across multiple change cycles (e.g., gradual migration from CICS batch to IMS TM → z/OS Connect REST) | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |

**Design decisions for this scenario catalog:**

- The z/OS Version Upgrade scenario is the canonical scenario for this use case. Kyle's uc6 script is the most detailed existing scenario and its Step 3 (Atlas detects the DB2/CICS sequencing error before it causes a production failure) is the strongest Predictive Intelligence moment in any of Kyle's scenarios. This step should be preserved and featured in demo planning.
- Middleware Product Upgrade is a distinct scenario because the compatibility surface is different from a z/OS base upgrade — it focuses on the specific subsystem's inter-product compatibility, not the base OS compatibility matrix.
- Phased Migration is the most complex scenario and the furthest from available capabilities. It requires Atlas to maintain cumulative state across multiple change cycles and reason about the migration state of the environment over time.

---

## 11. Lifecycle Overview

```
Assess → Sequence → Plan → Provision → Test → Remediate → Promote → Monitor
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Assess** | Atlas inventories all components in scope of the upgrade, identifies all compatibility considerations for the target version, and maps each finding to the specific application, subsystem, or configuration that requires attention | Atlas |
| **Sequence** | Atlas determines the correct upgrade order for interdependent subsystems — which must be upgraded before which to avoid known compatibility failures | Atlas |
| **Plan** | Atlas generates a phased upgrade plan: remediation first (resolve all compatibility issues on test environments), then LPAR-by-LPAR production promotion in order of criticality | Atlas |
| **Provision** | Atlas provisions an isolated environment at the current version, applies the upgrade, and prepares for regression testing | Atlas |
| **Test** | Atlas runs the full regression test suite against the upgraded environment; monitors for behavioral regressions and performance changes | Atlas |
| **Remediate** | For each test failure or compatibility issue, Atlas identifies root cause and generates the specific remediation; user approves each remediation | Both |
| **Promote** | User authorizes promotion of each phase to the next environment (test → QA → production); Atlas executes the promotion | Both |
| **Monitor** | After each production promotion, Atlas monitors for behavioral changes, performance impacts, and post-upgrade anomalies that suggest a compatibility issue was missed | Atlas |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Compatibility impact assessment | Atlas | Automated; Atlas applies compatibility knowledge to the discovered environment |
| Sequencing analysis | Atlas | Atlas derives the correct upgrade order from subsystem interdependency data |
| Phased upgrade plan generation | Atlas | Atlas generates the plan; user reviews and approves it before execution begins |
| Isolated environment provisioning | Atlas | Atlas Provision SKU; automated |
| Regression test execution | Atlas | Atlas Test SKU; automated; results surfaced to user |
| Compatibility issue identification during testing | Atlas | Atlas attributes test failures to specific compatibility issues |
| Remediation decision for each compatibility issue | Shared | Atlas generates the remediation; user approves before it is applied |
| Phase promotion authorization | User | Every promotion to production requires explicit user authorization |
| Business risk acceptance for partial remediations | User | If a compatibility issue cannot be fully resolved before the upgrade deadline, the user accepts the residual risk |
| Post-upgrade monitoring | Atlas | Atlas monitors autonomously; alerts on anomalous behavior |

**Governance gates:** Phase promotion (test → QA → production) is a hard governance gate that requires explicit user authorization. Atlas does not auto-promote. The authorization record is logged in the Atlas change history.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Multi-LPAR compatibility sweep** | Atlas checks all 300+ applications across all LPARs against a target version's compatibility matrix in minutes | A manual review of this scope would take weeks and still be incomplete |
| **Sequencing risk detection** | Atlas identifies that Db2 must be upgraded before CICS to avoid a known compatibility failure with z/OS 3.1 — even when the human plan has them in the wrong order | This is the highest-value Predictive Intelligence moment in this use case; it prevents the class of upgrade failures that come from doing the right things in the wrong order |
| **Proactive mid-phase finding discovery** | During regression testing, Atlas identifies a 15th compatibility issue that was not in the original 14 — a batch macro deprecated in z/OS 3.1 — and adds it to the plan | Human-only testing would likely miss this until production; Atlas makes it systematic |
| **Post-upgrade behavioral baseline comparison** | Atlas monitors Db2 buffer pool utilization on upgraded TEST1 and flags that it is running 12% higher under equivalent load — a configuration adjustment to make before production promotion | This converts post-upgrade monitoring from a passive "watch for alerts" to an active "compare against expectation" |
| **Phase-isolated validation** | Each phase is tested in isolation against the upgraded version before any production LPAR is touched | This is not new as a concept, but Atlas is the first system that orchestrates it end-to-end without manual environment management |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Compatibility assessment time | Time from upgrade project start to complete compatibility finding list | 4–8 weeks (manual research) | Under 1 day |
| Compatibility findings discovered before production | Percentage of total compatibility issues identified before the first production promotion | Estimated 60–75% (manual review misses cross-application interactions) | 95%+ |
| Upgrade-related production incidents | Number of production incidents caused by missed compatibility issues during an upgrade project | Industry estimate: 1–3 per major upgrade | Zero for planned upgrade projects |
| Phase regression test coverage | Percentage of applications regression-tested at each upgrade phase | Typically 40–60% (manual test execution limits coverage) | 90%+ with Atlas Test automation |
| Time to complete a z/OS version upgrade project | Calendar time from project start to full production estate on new version | 6–18 months (industry estimate) | Under 6 months |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| A compatibility issue is not in Atlas's knowledge base — a new or obscure interface change | Atlas identifies the affected components based on topology but cannot map the specific compatibility note; flags for manual review | User consults IBM support or release notes for the specific interface; documents the finding and remediation in Atlas for future reference |
| A test environment cannot be provisioned due to capacity constraints | Atlas reports the provisioning failure with root cause; suggests alternative sequencing that reduces the provisioning footprint | User works with infrastructure team to free capacity; Atlas retries provisioning when capacity is available |
| A test phase fails with a regression that cannot be automatically attributed | Atlas surfaces the failing test case and the environmental differences between the baseline and upgraded environments; generates a list of candidate causes | User investigates manually with Atlas's diff data as the starting point; resolution is entered back into Atlas |
| A production phase reveal a compatibility issue not seen in testing | Atlas detects behavioral changes post-promotion and alerts; generates a rollback plan immediately | User reviews the finding severity; either proceeds with Atlas-generated rollback or accepts risk with monitoring |
| A sequencing constraint is violated because the plan was manually modified | Atlas detects the sequencing violation against its dependency model and warns before execution proceeds | User reviews the sequencing warning; either corrects the sequence or documents the risk acceptance |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Change record per upgrade phase | Major platform upgrades require change records for each production phase in the ITSM system | Atlas generates a change record template for each phase; ServiceNow integration (H2 2027) automates linkage |
| Phase authorization with named approval | Each production phase promotion must be explicitly authorized by a named senior engineer | Atlas records the named authorization at each phase gate in the change history |
| Regression test evidence | Change advisory boards may require regression test results as evidence before a production phase is approved | Atlas produces a structured test report per phase that can be attached to the change record |
| Rollback plan documented before production cutover | Regulated environments often require a documented rollback plan before any major production change | Atlas generates the rollback plan as part of the upgrade plan; it is documented before production phase 1 begins |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-02: Patch Management | UC-08 is the major-version escalation of UC-02. PTF-level Lean Orchestration (UC-02) is a precursor capability that matures into full upgrade orchestration (UC-08) in H1 2027. The two use cases share the PTF orchestration infrastructure, but UC-08 adds multi-phase sequencing, broader compatibility analysis, and full environment provisioning. |
| UC-05: Application Discovery and Dependency Analysis | UC-08's compatibility impact assessment is powered by the same topology model that UC-05 uses. Before an upgrade project starts, UC-05's blast radius analysis tells the team exactly which applications and transactions are in scope. |
| UC-07: Application Change Management | During an upgrade project, individual application compatibility remediations (deprecated API fixes, code changes required for the new version) are executed as UC-07 workflows. UC-08 owns the upgrade sequence; UC-07 owns the application-level code changes within it. |
| UC-12: Application Modernization | Platform upgrades often trigger or coincide with application modernization work — deprecated interfaces removed in the new version force modernization of affected applications. UC-08 identifies the modernization scope; UC-12 owns the execution. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Continuous compatibility monitoring** | H1 2027 | Rather than point-in-time assessment at project start, Atlas continuously monitors the environment for applications and configurations that would be incompatible with the next scheduled z/OS or middleware version — surfacing upgrade readiness as an ongoing metric, not a pre-project discovery task. |
| **Cross-client upgrade pattern learning** | H2 2027 | Atlas aggregates compatibility findings across upgrade projects (with appropriate anonymization) to identify which compatibility issues appear most frequently, which are most likely to be missed by manual analysis, and which environment configurations predict upgrade complexity. This enables Atlas to apply the right depth of scrutiny to the right areas automatically. |
| **Agentic upgrade execution for low-risk phases** | H2 2027 | For test environment phases with well-defined compatibility findings and standard remediation patterns, Atlas proposes and executes the full phase — provision, remediate, test, report — with human approval only at the phase-to-production gate. Zero-touch test phase execution for the standard case. |
| **Sysplex topology-aware upgrade simulation** | 2028+ | Atlas simulates the full upgrade in a virtual sysplex model before any real change is made — testing sequencing, rollback paths, and failure scenarios in a digital twin of the environment. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-08](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`design/flows/uc6-zos-upgrade.md`](../design/flows/uc6-zos-upgrade.md) | Complete 8-step z/OS 2.5 → 3.1 upgrade scenario; pillar activation summary; Step 3 (Db2/CICS sequencing error detection) and Step 8 (Db2 buffer pool performance change) are the canonical Predictive Intelligence moments for this use case |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 2 "MW/SW patch orchestration" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | GA use case "z/OS Version Upgrade" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Zach, Greg, Alice, Angie |
