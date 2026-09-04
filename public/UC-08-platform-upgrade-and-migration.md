# UC-08: Platform Upgrade and Migration
*Version 1.0 | Owner: Product Management | Last updated: August 2026*

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
| Cross-Application Dependency Mapping for Upgrade Scope | **Planned** | H1 2027 | Application topology via ZUnderstand in TIB; cross-application dependency traversal | H1 2027 |
| Phased Migration from Legacy to Modern Stack | **Planned** | H2 2027 | Full Change Intelligence + cumulative state tracking across migration cycles | H2 2027 |

**Capability dependency notes:**

- This use case is the most Change Intelligence-intensive in the Atlas library. The full scenario requires environment provisioning (Atlas Provision SKU), regression test orchestration (Atlas Test SKU), and full MW/SW upgrade plan generation — none of which are in the GA Dec 2026 Lean MVP. GA delivers Lean PTF Orchestration (single-PTF, single-LPAR), which is a precursor capability; the full upgrade orchestration is H1 2027.
- The sequencing risk detection behavior (Atlas identifies that Db2 must be upgraded before CICS for a z/OS 3.1 migration) is one of the most compelling Predictive Intelligence moments in the entire Atlas demo library. It should be preserved in demo planning for H1 2027 onward.
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
- Cross-application dependency mapping for upgrade scope (S2 — absorbed from retired UC-05)

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
| **Interoperability** | **IBM Z Upgrade Agent (ZUA)** — ZUA is a wxa4z skill that provides chat-guided z/OSMF execution: FIXCAT gap detection, PTF acquisition via Shopz, SMP/E installation, and HOLD management. In the Atlas upgrade workflow, ZUA runs as the execution primitive inside the Atlas chat layer. Atlas provides compatibility assessment, sequencing, provisioning, and testing on top; ZUA handles the z/OSMF operations underneath. |
| **Risk** | Incomplete discovery produces incomplete compatibility coverage — Atlas will identify what it knows about; dependencies in undiscovered components are invisible until testing reveals them. Discovery completeness should be validated before a major upgrade assessment begins. |
| **Risk** | IBM compatibility documentation evolves between release and GA. Atlas's embedded knowledge must be kept current; stale compatibility notes produce missed findings. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| z/OS Version Upgrade | Organization needs to move from one z/OS version to another (e.g., 2.5 → 3.1) | Planned | H1 2027 | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc8-platform-upgrade.md`](../design/flows/uc8-platform-upgrade.md) |
| **Cross-Application Dependency Mapping for Upgrade Scope** | Before a z/OS or middleware upgrade, architect asks Atlas to map which applications share infrastructure and how they are coupled, to scope compatibility risk | Planned | H1 2027 | UX Flow, Chat Exchange | Received from UC-05 (Stage 2). Primary personas: Greg (Infrastructure Architect), Angie (Application Architect). |
| Middleware Product Upgrade | Major subsystem version upgrade (e.g., CICS TS 6.2 → CICS TS 7.0, Db2 V13 → Db2 V15) | Planned | H1 2027 | UX Flow, Chat Exchange | TBD |
| Sysplex Reconfiguration | Changes to sysplex structure — LPAR additions, coupling facility changes, DR pairing changes | Planned | H1 2027 | UX Flow, Chat Exchange | TBD |
| Phased Migration from Legacy to Modern Stack | Incremental modernization across multiple change cycles (e.g., gradual migration from CICS batch to IMS TM → z/OS Connect REST) | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |

**Design decisions for this scenario catalog:**

- The z/OS Version Upgrade scenario is the canonical scenario. Kyle's uc6 script Step 3 (Atlas detects the DB2/CICS sequencing error before it causes a production failure) is the strongest Predictive Intelligence moment in any scenario. This step should be preserved and featured in demo planning.
- **Cross-Application Dependency Mapping (S2)** is absorbed from the retired UC-05. Rather than asking "what would my specific change touch?", this scenario asks "how are our applications coupled to each other across the infrastructure?" — mapping which applications share Db2 subsystems, CICS regions, MQ queue managers, and coupling facilities before scoping upgrade risk. Primary actor for this scenario is Greg (infrastructure scope) or Angie (application coupling view).
- Middleware Product Upgrade is a distinct scenario because the compatibility surface is different from a z/OS base upgrade.
- Phased Migration is the most complex scenario and the furthest from available capabilities. It requires Atlas to maintain cumulative state across multiple change cycles.

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
| **Phase-isolated validation** | Each phase is tested in isolation against the upgraded version before any production LPAR is touched | Atlas is the first system that orchestrates this end-to-end without manual environment management |

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
| A compatibility issue is not in Atlas's knowledge base | Atlas identifies the affected components based on topology but cannot map the specific compatibility note; flags for manual review | User consults IBM support or release notes for the specific interface; documents the finding and remediation in Atlas for future reference |
| A test environment cannot be provisioned due to capacity constraints | Atlas reports the provisioning failure with root cause; suggests alternative sequencing that reduces the provisioning footprint | User works with infrastructure team to free capacity; Atlas retries provisioning when capacity is available |
| A test phase fails with a regression that cannot be automatically attributed | Atlas surfaces the failing test case and the environmental differences between the baseline and upgraded environments; generates a list of candidate causes | User investigates manually with Atlas's diff data as the starting point; resolution is entered back into Atlas |
| A production phase reveals a compatibility issue not seen in testing | Atlas detects behavioral changes post-promotion and alerts; generates a rollback plan immediately | User reviews the finding severity; either proceeds with Atlas-generated rollback or accepts risk with monitoring |
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
| UC-06: Patch Management | UC-08 is the major-version escalation of UC-06. PTF-level Lean Orchestration (UC-06) is a precursor capability that matures into full upgrade orchestration (UC-08) in H1 2027. The two use cases share the PTF orchestration infrastructure, but UC-08 adds multi-phase sequencing, broader compatibility analysis, and full environment provisioning. |
| UC-07: Application Change Management | During an upgrade project, individual application compatibility remediations (deprecated API fixes, code changes required for the new version) are executed as UC-07 workflows. UC-08 owns the upgrade sequence; UC-07 owns the application-level code changes within it. |
| UC-09: Application Modernization | Platform upgrades often trigger or coincide with application modernization work — deprecated interfaces removed in the new version force modernization of affected applications. UC-08 identifies the modernization scope; UC-09 owns the execution. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Continuous compatibility monitoring** | H1 2027 | Rather than point-in-time assessment at project start, Atlas continuously monitors the environment for applications and configurations that would be incompatible with the next scheduled z/OS or middleware version — surfacing upgrade readiness as an ongoing metric. |
| **Cross-client upgrade pattern learning** | H2 2027 | Atlas aggregates compatibility findings across upgrade projects to identify which compatibility issues appear most frequently, which are most likely to be missed, and which environment configurations predict upgrade complexity. |
| **Agentic upgrade execution for low-risk phases** | H2 2027 | For test environment phases with well-defined compatibility findings and standard remediation patterns, Atlas proposes and executes the full phase with human approval only at the phase-to-production gate. |
| **Sysplex topology-aware upgrade simulation** | 2028+ | Atlas simulates the full upgrade in a virtual sysplex model before any real change is made — testing sequencing, rollback paths, and failure scenarios in a digital twin of the environment. |

---

## 19. Pain Points & Wows Flow Analysis

> **Pillar:** System Intelligence (scope/assess) + Change Intelligence (plan/execute) + Predictive Intelligence (sequencing risk)
> **GA Status:** H1 2027 (full z/OS and middleware upgrade); H2 2027 (phased legacy migration)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Scope

**Personas involved:** Zach, Greg, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Assembling a complete compatibility picture manually takes weeks — IBM upgrade guides, IBM support databases, subsystem-specific notes, and application owner consultations must be coordinated manually. | ⏱️ Lost Time — **2–4 weeks** just for initial compatibility scope assembly |
| Greg | No unified infrastructure dependency picture for sysplex and LPAR sequencing requirements — Greg must reconstruct it before upgrade planning can begin. | ⏱️ Lost Time — **1–2 weeks** of infrastructure dependency investigation |
| Angie | Application-level compatibility analysis requires querying every application team — no cross-application view of which code depends on behaviors that are changing. | 🔒 Skill Gap / Bottleneck — Angie must coordinate with every application owner to understand application-level compatibility risk |

---

#### Step 2 — Assess

**Personas involved:** Zach, Greg, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Compatibility issues are typically discovered during testing — sometimes during production cutover — because the manual analysis missed a dependency. | 💼 Business Impact — late discovery of compatibility issues is a leading cause of upgrade failures and emergency rollbacks |
| Greg | Sequencing mistakes (wrong upgrade order for interdependent subsystems) are a leading cause of upgrade failures. Manual sequencing from experience, not from analysis. | 💼 Business Impact — incorrect subsystem upgrade order can cause failures worse than not upgrading |
| Angie | Application owners may not know their applications have dependencies on behaviors that are changing — the compatibility gap is unknown until testing or production. | 💼 Business Impact — application owners cannot pre-remediate issues they do not know exist |

---

#### Step 3 — Plan

**Personas involved:** Zach, Greg, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | A z/OS version upgrade involves a dedicated planning project measured in months — the planning overhead alone is a major barrier to currency. | ⏱️ Lost Time — **months of planning effort** before any upgrade action can begin |
| Greg | Phased plan construction requires manually resolving interdependencies across subsystems, LPARs, and sysplex topology — no automated sequencing tool. | ⏱️ Lost Time — **weeks** of plan construction by the most experienced infrastructure team members |
| Alice | Mid-level engineers cannot contribute to upgrade planning because the dependency knowledge required is not documented anywhere accessible. | 🔒 Skill Gap / Bottleneck — upgrade planning is restricted to the handful of engineers who carry the full topology model in their heads |

---

#### Step 4 — Provision

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Phase isolation is rarely achieved — environments are provisioned manually, provisioning takes too long, and teams shortcut phase boundaries to stay on schedule. | ⏱️ Lost Time — **days per phase** for environment provisioning, leading to phase isolation being abandoned under schedule pressure |
| Alice | Environment provisioning is entirely Zach-dependent — Alice cannot independently set up a phase test environment. | 🔒 Skill Gap / Bottleneck — Alice blocked on Zach for every provisioning step |

---

#### Step 5 — Execute Each Phase

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Each phase executed manually with no integrated tooling — SMP/E for PTFs, separate tools for subsystem configuration, separate communication for application teams. | ⏱️ Lost Time — **days per phase** of manual execution coordination across tools and teams |
| Zach | Phase failures are discovered during execution — there is no pre-phase validation to surface problems before production is touched. | 💼 Business Impact — upgrade phase failures during production execution can require emergency rollback |

---

#### Step 6 — Validate Each Phase

**Personas involved:** Zach, Greg, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Post-upgrade behavior change monitoring is informal — a subsystem running differently after upgrade may not be noticed until a user complaint or production incident. | 💼 Business Impact — silent behavioral regressions post-upgrade go undetected until they cause incidents |
| Angie | Application teams have no systematic way to verify their applications function correctly after a platform upgrade — testing is ad hoc and coverage is incomplete. | 💼 Business Impact — application regressions from platform upgrades are a consistent source of post-upgrade incidents |

---

#### Step 7 — Close

**Personas involved:** Zach, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Upgrade documentation is assembled after the fact from change tickets, email, and memory — audit trail is incomplete. | ⏱️ Lost Time — **days** of retrospective documentation effort |
| Greg | New infrastructure baseline is not formally registered anywhere — drift from the new target state will accumulate silently until the next planned review. | 💼 Business Impact — without a registered post-upgrade baseline, infrastructure drift is undetectable |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Scope

**Personas involved:** Zach, Greg, Angie

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Full compatibility impact scoped in minutes — all LPARs, all subsystems, all applications, all compatibility notes for the target version. 300-application sweep without a single manual query. | ⏱️ Time Saving — **2–4 weeks → minutes** for initial compatibility scope |
| Greg | Infrastructure dependency picture for sysplex and LPAR sequencing requirements produced automatically from Atlas's topology model. | ⏱️ Time Saving — **1–2 weeks → minutes** for infrastructure dependency analysis |
| Angie | Application-level compatibility findings surfaced directly — application teams notified of what they need to remediate before the upgrade begins. | 🆕 New User Capability — Angie independently identifies application-level compatibility risk without coordinating with every application owner |

---

#### Step 2 — Assess

**Personas involved:** Atlas, Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Compatibility issues surfaced before the project starts, not during production cutover. The list of what needs remediation before the upgrade begins is complete from day one. | 🤖 Atlas AI Insight & Automation — Atlas joins IBM compatibility notes with the live topology to produce a specific, grounded compatibility gap list |
| Greg | Sequencing risk identification — Atlas identifies which subsystems must be upgraded in a specific order to avoid compatibility failures, based on their dependency relationships. | 🤖 Atlas AI Insight & Automation — dependency-aware sequencing analysis produces the correct upgrade order, not an experience-based guess |

---

#### Step 3 — Plan

**Personas involved:** Zach, Greg, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Months of planning effort compressed into a structured Atlas-generated plan — phase boundaries, sequencing, environment specs, and test scenarios all generated from the topology. | ⏱️ Time Saving — **months → days** for upgrade plan construction |
| Alice | Mid-level engineers can execute phases assigned in the Atlas plan — the dependency knowledge is embedded in the plan, not required from the executor. | 🆕 New User Capability — Alice independently executes delegated upgrade phases from Atlas's structured plan |

---

#### Step 4 — Provision

**Personas involved:** Zach, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Phase isolation maintained automatically — each phase validated in an isolated environment without manual provisioning. | ⏱️ Time Saving — **days per phase provisioning → automated** |
| Alice | Alice can independently prepare phase environments from Atlas's specification without requiring Zach for each provisioning step. | 🆕 New User Capability — Alice independently provisions phase environments |

---

#### Step 5 — Execute Each Phase

**Personas involved:** Zach, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Phase execution is Atlas-orchestrated across all tools — no manual coordination across SMP/E, subsystem configuration, and application deployment. | ⏱️ Time Saving — **days per phase manual coordination → Atlas-orchestrated execution** |
| Zach | Zach authorizes each production step — governance gate maintained with full visibility into what Atlas will execute before authorization. | 🤖 Atlas AI Insight & Automation — reasoning visible at every step; no black-box execution |

---

#### Step 6 — Validate Each Phase

**Personas involved:** Zach, Greg, Angie, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Behavioral monitoring post-phase — Atlas identifies if a subsystem is running differently after the upgrade and surfaces the deviation before the next phase begins. | 🤖 Atlas AI Insight & Automation — behavioral baseline comparison identifies post-upgrade regressions that would otherwise be invisible until production incidents |
| Angie | Application regression testing scoped to the phase's changes — Atlas runs the relevant test scenarios and surfaces failures before production. | ⏱️ Time Saving — **ad hoc manual testing → systematic Atlas-generated test execution** per phase |

---

#### Step 7 — Close

**Personas involved:** Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Complete upgrade record generated automatically — every phase, every authorization, every test result captured without retrospective assembly. | ⏱️ Time Saving — **days retrospective documentation → automatic** |
| Greg | New infrastructure baseline registered in Atlas at close — post-upgrade drift is immediately detectable against the new reference state. | 🤖 Atlas AI Insight & Automation — baseline registration happens as part of upgrade close; no separate action required |

---

> **Overall outcome:** Major platform upgrade planning time reduced from months to days. Compatibility issues surfaced before execution, not during production cutover. Each phase validated in isolation with behavioral monitoring — emergency rollbacks driven by missed compatibility issues become rare rather than routine.

---

## 20. Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (primary) + Predictive Intelligence (supporting)
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
| Evidence package | 400,000 | 4.0 |
| Environment comparison | 300,000 | 3.0 |
| Functional test suite | 300,000 | 3.0 |
| Directional performance test | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

### Desired Outcome Flow — Atlas Units per Phase

UC-08 is the **highest Atlas Unit consumption use case** in the library. A z/OS version upgrade is a multi-phase, multi-LPAR project that triggers multiple rounds of assessment, provisioning, testing, and recording.

Lifecycle: `Assess → Sequence → Plan → Provision → Test → Remediate → Promote → Monitor`

#### Phase 1 — Assess (Compatibility Impact Sweep)

| Activity | Tokens | Units |
|---|---|---|
| Full compatibility impact sweep (large estate, z/OS version upgrade) | ~375,000 | **3.75** |

**Phase 1 subtotal: 3.75 units**

#### Phase 2 — Sequence

| Activity | Tokens | Units |
|---|---|---|
| Subsystem upgrade sequencing analysis | ~150,000 | **1.5** |

**Phase 2 subtotal: 1.5 units**

#### Phase 3 — Plan

| Activity | Tokens | Units |
|---|---|---|
| Phased upgrade plan generation | 250,000 | **2.5** |

**Phase 3 subtotal: 2.5 units**

#### Phase 4 — Provision (per test phase)

| Activity | Events | Units |
|---|---|---|
| Test environment provision per phase (× 4 phases typical) | 4 successful provisions | **0.4** |

**Phase 4 subtotal: 0.4 units** (scales with number of phases)

#### Phase 5 — Test (per phase)

| Activity | Tokens | Units |
|---|---|---|
| Functional test suite per application (× 20 applications) | 300,000 per suite | **3.0 per suite** |
| Directional performance test (1 per phase) | 500,000 | **5.0** |

**Example for 20-application upgrade, 4 phases:**
- Functional tests: 20 apps × 3.0 = 60 units per phase
- Performance test: 5.0 per phase
- Total per phase: 65 units → Total across 4 phases: **260 units**

> **This is the dominant cost driver.** A full z/OS upgrade across 20 applications over 4 phases generates ~260 units from test generation alone.

#### Phase 6 — Remediate

| Activity | Tokens | Units |
|---|---|---|
| Remediation plan per compatibility finding cluster | ~125,000 per cluster | **1.25 per cluster** |

**Phase 6 subtotal: varies (est. 5–15 clusters = 6.25–18.75 units)**

#### Phase 7 — Promote

| Activity | Tokens | Units |
|---|---|---|
| Phase promotion authorization (footprint) | Footprint | 0 |
| Phase promotion record (per phase) | ~50,000 | **0.5 per phase** |

**Phase 7 subtotal: 0.5 × 4 phases = 2.0 units**

#### Phase 8 — Monitor

| Activity | Tokens | Units |
|---|---|---|
| Continuous monitoring (footprint) | Footprint | 0 |
| Post-upgrade anomaly report (conditional, per event) | 250,000 | **2.5** (conditional) |
| Post-upgrade environment comparison (pre/post state diff) | 300,000 | **3.0** |

**Phase 8 subtotal: 3.0 units**

#### Close — Upgrade Completion Record

| Activity | Tokens | Units |
|---|---|---|
| Upgrade project evidence package | 400,000 | **4.0** |

### Full Project Summary (20-Application z/OS Upgrade, 4 Phases)

| Phase | Activity | Units |
|---|---|---|
| 1 — Assess | Compatibility impact sweep | 3.75 |
| 2 — Sequence | Subsystem upgrade sequencing | 1.5 |
| 3 — Plan | Phased upgrade plan | 2.5 |
| 4 — Provision | 4 × test environment provisions | 0.4 |
| 5 — Test | 20 apps × 4 phases functional tests + perf tests | ~260 |
| 6 — Remediate | 10 compatibility finding clusters | ~12.5 |
| 7 — Promote | 4 × phase promotion records | 2.0 |
| 8 — Monitor | Post-upgrade comparison per phase | 3.0 |
| Close | Upgrade evidence package | 4.0 |
| **TOTAL** | **Full z/OS upgrade project (20 apps, 4 phases)** | **~289 units** |

### Sensitivity Analysis

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Small upgrade (5 apps, 2 phases) | Proportional reduction in test generation + fewer phases | ~0.17× |
| Middleware-only upgrade (CICS TS, 1 subsystem, 2 phases) | Single subsystem scope; fewer applications | ~0.13–0.16× |
| Medium upgrade (10 apps, 3 phases) | Proportional | ~0.48× |
| Full z/OS upgrade (20 apps, 4 phases) | Baseline | 1.0× |

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional application in test scope | +1 functional test suite per phase per app | +3.0 × phases |
| Each additional upgrade phase | +20 apps × 3.0 functional tests + 1 perf test | +65 per phase |
| Each additional compatibility finding cluster | One additional remediation plan per cluster | +1.25 per cluster |
| Post-upgrade anomaly report triggered | Additional system assessment on anomaly detection | +2.5 per event |

### Notes and Assumptions

1. UC-08 is the **single highest-unit-consumption event** in the Atlas library due to test generation volume across multiple phases.
2. **Test generation per phase:** The model assumes a fresh functional test suite generation per application per phase. Atlas may reuse test artifacts across phases with incremental updates — product implementation should determine whether test refresh is a full generation or a delta generation.
3. **Revenue implication:** At $20/unit, a full z/OS upgrade project generates approximately $5,800 in Atlas consumption revenue.

---

## 21. External Product Synergies

### Bob PPZ (Bob for Z Premium Package)

**Summary:** Platform upgrade and migration is primarily an infrastructure and sequencing workflow owned by Atlas. Bob PPZ enters at a specific and important point: when the compatibility assessment identifies application code changes that must be made *before* the upgrade can proceed safely. These are typically deprecated API remediations — COBOL programs using CICS, Db2, or IMS APIs that are being withdrawn or changed in the target version. Bob PPZ relevance scales directly with the number of applications using deprecated APIs in the target version.

#### Tier 1 — Explicit Handoff Points

**Step 2 — Assess**

Atlas has produced a complete compatibility gap list. For application-level gaps (programs using deprecated APIs, JCL using removed features), Atlas identifies the affected program(s) and the compatibility issue. Atlas cannot plan or execute the code-level remediation.

Atlas directs application owners to Bob PPZ, where ZUnderstand:
- Locates the specific deprecated construct — the exact EXEC CICS command, SQL syntax, or JCL statement that will fail on the target version
- Identifies every other program in the estate that uses the same deprecated construct (batch remediation scope)
- Provides the safe migration path to the replacement API or syntax
- Generates an implementation plan for remediating the entire compatibility class at once

**What comes back to Atlas:** A set of code change artifacts — the remediated programs — that Atlas validates in a compatibility test environment before the upgrade proceeds.

---

**Step 5 — Execute Each Phase**

If a phase involves application deployments alongside the platform upgrade (e.g., deploying updated application code that uses replacement APIs in parallel with the subsystem upgrade), Atlas directs the developer to Bob PPZ for any unexpected application code issue surfacing during phase execution — passing the phase context, the failed compatibility test, and the affected program.

**What comes back to Atlas:** A code fix artifact. Atlas re-validates the phase before proceeding.

---

**Step 6 — Validate Each Phase**

If regression failures are attributed to application code issues (a program that behaved correctly before the upgrade but now fails due to a subtle subsystem behavior change), Atlas directs the developer to Bob PPZ with the regression failure context: the specific program, the failing execution path, and the pre/post-upgrade behavior difference.

**What comes back to Atlas:** A corrected code artifact. Atlas re-runs the regression tests and records the fix.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Scope:** When Bob PPZ is installed, Atlas identifies not just "Application X may be affected by the CICS TS upgrade" but "47 programs in Application X use EXEC CICS commands being deprecated in CICS TS 6.2, with 12 of them in transaction-critical paths." This transforms the compatibility scope from a list of applications to a list of specific programs with prioritized risk.

**Step 2 — Assess (enrichment):** Bob PPZ enables Atlas to classify remediation complexity (simple API substitution vs. structural code change), identify safe batching opportunities (programs with the same deprecated construct can be remediated together), and surface hidden dependencies via the call graph.

**Step 3 — Plan:** The Atlas-generated upgrade plan includes code-level effort estimates for each application remediation task — enabling the planning team to resource remediation work accurately.

> **Overall Bob PPZ relevance:** Moderate to high for application-heavy estates; low for infrastructure-only upgrades. The value scales directly with the number of applications using deprecated APIs in the target version.

---

### Concert for Z

**Summary:** Platform upgrade and migration is a high-relevance Concert for Z use case on both ends. Upstream: Concert for Z's Risk Management module may detect that the estate is running software at a level that creates operational risk, triggering the upgrade initiative. Downstream: Concert for Z's post-upgrade behavioral monitoring is the primary mechanism for detecting silent regressions after each upgrade phase.

#### Tier 1 — Explicit Handoff Points

**Step 1 — Scope (Concert for Z → Atlas)**

Concert for Z's Risk Management module — using IZSAM software inventory and APAR risk scoring — has identified that one or more components are at a level that creates unquantified operational risk: a z/OS version approaching end of support, a middleware version with known vulnerabilities, or a pattern of missing critical updates. Concert for Z raises the upgrade as a required change; Atlas takes the planned upgrade and applies full change intelligence: scoping compatibility impact, generating the sequenced plan, provisioning phase validation environments, and orchestrating test execution.

**What comes back:** Atlas's completed upgrade record is recorded in Atlas's change log. Concert for Z's Risk Management module sees the operational risk resolved.

---

**Step 6 — Validate Each Phase (Atlas ↔ Concert for Z)**

Concert for Z's Observe module provides the production behavioral baseline that Atlas's post-phase monitoring compares against. If an upgraded subsystem is running differently, Concert for Z's continuous monitoring detects the behavioral change and surfaces it to Atlas's phase validation step. This extends Atlas's regression detection beyond test-environment pass/fail to include production-behavioral equivalence.

**What comes back:** If Concert for Z detects a post-phase behavioral regression, Atlas treats it as a validation failure and investigates or rolls back before the next phase.

#### Tier 2 — Enrichment Touchpoints

**Step 2 — Assess:** ZEN data enriches the application-level compatibility assessment with runtime evidence of which application flows are actually active — ensuring compatibility analysis prioritizes programs in active production use.

**Step 7 — Close:** Concert for Z's post-upgrade production monitoring provides the behavioral baseline that complements Atlas's configuration baseline — the complete "known good" state includes both the Atlas-registered configuration state and the Concert for Z-established behavioral baseline.

> **Overall Concert for Z relevance:** High. Risk Management is a genuine upstream trigger for platform upgrade initiatives, and Concert for Z's behavioral monitoring is the primary production-side regression detection mechanism during and after upgrade execution.

---

### Terraform Self-Managed for Z

**Summary:** Platform upgrade and migration is the direct subject of Terraform Synergy Use Case 6 — Platform Upgrade and Migration with Infrastructure Lifecycle Management. Atlas and Terraform each own a clearly distinct and non-overlapping half of a major upgrade project: Atlas owns software compatibility analysis, sequencing, and validation; Terraform owns infrastructure resource changes, staged workspace promotion, and rollback.

#### Tier 1 — Explicit Handoff Points

**Phase 1 — Assess**

Within the compatibility assessment, Atlas identifies infrastructure resource requirements for the new release: memory increases, storage allocation changes, CPU entitlement adjustments. Atlas passes the infrastructure resource requirement delta to Terraform as a set of proposed HCL changes. Terraform generates a plan output showing exactly what infrastructure changes are needed. This becomes part of the pre-upgrade planning record.

**What comes back to Atlas:** A Terraform plan confirming the infrastructure changes required. Atlas incorporates this as the infrastructure change scope in the upgrade plan.

---

**Phase 4 — Provision (per test phase)**

Atlas passes the phase-specific infrastructure specification to Terraform for provisioning. Terraform provisions the LPAR resources in an isolated workspace that prevents the test environment from affecting production, and configures the LPAR lifecycle to tear down the environment after phase validation is complete.

**What comes back to Atlas:** A Terraform-provisioned phase test environment. Atlas applies the upgrade and runs the regression test suite.

---

**Phase 7 — Promote (per phase)**

If the upgrade requires infrastructure resource changes on the target LPAR before the new z/OS version is applied, Atlas directs the team to apply the Terraform infrastructure changes first. The Terraform apply is a hard prerequisite to Atlas's production phase promotion.

**What comes back to Atlas:** Terraform apply confirmation. Atlas proceeds with the phase promotion, knowing the infrastructure is in the correct state.

---

**Rollback**

Atlas directs the team to revert the Terraform workspace to the pre-upgrade state if a production phase fails and rollback is required.

**What comes back to Atlas:** Terraform state restored to the pre-upgrade baseline. Atlas confirms infrastructure rollback and updates the upgrade plan.

#### Tier 2 — Enrichment Touchpoints

**Phase 2 — Sequence:** Terraform's workspace structure — which LPARs are in which workspaces, and what the workspace promotion order is — provides a ready-made staging sequence that Atlas can align its upgrade sequencing with.

**Phase 8 — Monitor:** Post-upgrade, Terraform surfaces any infrastructure drift that emerged during the upgrade cycle. Atlas monitors behavioral and software-layer changes; Terraform monitors infrastructure-layer drift — together providing comprehensive post-upgrade change surveillance across both layers.

> **Overall Terraform relevance:** High. This is the use case the Terraform positioning document explicitly calls out as a primary synergy scenario. Organizations planning z/OS version upgrades with both products deployed should treat this as a coordinated workflow from the start of planning.
