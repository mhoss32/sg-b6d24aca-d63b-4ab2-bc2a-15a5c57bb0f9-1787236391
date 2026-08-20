# UC-07: Application Change Management
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

Developers making changes to IBM Z applications today operate largely blind — they cannot easily see what their change touches, they wait days for a test environment, and they have no automated regression safety net. Atlas gives developers the system context they are missing: instant impact analysis grounded in real application topology, automatically generated test plans, background environment provisioning, and a fast iteration loop that catches regressions before they reach production. The result is developers who move faster and break less — and systems programmers freed from babysitting every change.

---

## 1. Overview

Application Change Management covers the full lifecycle of making a code-level or schema-level change to an application running on IBM Z — from understanding what the change will touch, through generating and executing a test plan, to validating the change is safe before production promotion. It is the use case that extends Atlas's value from infrastructure and platform teams to the developer persona, and is the primary vehicle for shifting change work off systems programmers over time.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When I need to make a change to a z/OS application, I want to understand what my change affects, have a test plan generated and an environment ready, and get fast feedback on whether my change is safe — so I can deliver on time without accidentally breaking something upstream or downstream. |
| **Emotional** | Deb wants to feel like a competent, self-sufficient developer — not someone who has to beg the infrastructure team for every resource and wait days to find out if her change caused a regression. Kathleen wants to ship confidently without the change becoming a multi-team coordination exercise. |
| **Social** | Developers want to demonstrate to the business that application changes on Z are predictable and traceable — not a black box that only works if Zach is available to supervise. |

---

## 3. Customer Problem and Outcome

**Problem:**
Application developers on IBM Z lack the system context to make changes confidently. A COBOL program change may touch Db2 tables used by other applications, CICS transaction definitions, or data structures shared across the codebase — but there is no tool that shows a developer this picture before they code. Test environments take days to provision and require a sysprog ticket. There is no test automation, so regression detection depends on manual testing or catches problems in production. Deploying to CICS or IMS requires too many manual steps and too many handoffs to infrastructure teams.

**Current State (Without Atlas):**
- Impact analysis for application changes is informal — developers rely on tribal knowledge, ask Zach or Kathleen, or discover the impact in integration testing when it is already expensive to fix.
- Test environments are provisioned manually by the infrastructure team. Wait times range from hours to days. Sandboxes that mirror the production topology are rare; most developers test against shared environments that may not reflect production behavior.
- There is little or no test automation on z/OS. Test coverage is manual, inconsistent, and dependent on individual developer discipline.
- Developers have no visibility into application performance metrics without going through the infrastructure team.
- Deploying an application change to CICS or IMS requires multiple manual steps across multiple tools and teams — IBM Z Open Editor for code, a separate build process via DBB, a separate deployment tool, and a sysprog to configure the CICS or IMS definitions if they change.
- Regression detection is ad hoc. If Deb's change breaks something in a shared CICS transaction chain, she is likely to find out through an integration test failure or a production incident — not through an automated regression run she controlled.

**Desired Outcome:**
- A developer can ask Atlas what her proposed change will touch — which programs, tables, transactions, and downstream applications — before writing a line of code.
- A test plan is generated automatically from the impact analysis, scoped to the actual change, with environment specifications and test data requirements.
- The test environment is provisioned in the background while the developer writes code. It is ready when she needs it.
- Tests run in an isolated environment, not a shared one. Regressions are caught before the change leaves the developer's hands.
- The developer can iterate — modify code, watch the test plan update, re-run tests — in a fast loop without filing tickets or waiting for infrastructure.
- Deploying to CICS or IMS is Atlas-orchestrated. The developer initiates; Atlas handles the configuration steps.
- Kathleen can delegate routine changes to Deb with confidence that Atlas is providing the guardrails she would otherwise provide herself.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Application Change Management is the primary use case for the developer persona, and the developer persona represents the largest untapped audience on IBM Z. This use case directly enables the Atlas Test SKU (regression and integration testing, H1 2027) and the Atlas Provision SKU (isolated environment provisioning). It is also the capability most likely to drive new-logo conversations where the buyer is a development manager or CIO rather than a systems programmer. |
| **Retention impact** | Once a developer team integrates Atlas into their change workflow — impact analysis, test plan generation, environment provisioning — the change lifecycle runs through Atlas. The test history, regression data, and change attribution that accumulates in Atlas creates deep switching cost. |
| **Competitive differentiation** | No existing tool joins application topology awareness, automated test plan generation, and environment provisioning in a single developer workflow on IBM Z. GitHub Copilot, IBM Developer for z/OS, and Wazi tools each address a fragment of the developer experience. Atlas is the only system that understands what a code change touches across the full application-to-infrastructure stack and generates a validated change plan from that understanding. |
| **Portfolio attach** | Application Change Management creates direct pull-through for IBM Developer for z/OS (IDE integration), IBM Dependency Based Build (DBB), Wazi Deploy, and IBM Z Open Editor. Atlas positions as the orchestration layer above these tools — the "start here" for any application change on Z. This is a significant portfolio attach opportunity that should be coordinated with those product teams. |
| **Strategic value** | This use case is the primary evidence of Atlas's long-term vision: shifting change work off systems programmers and making Z accessible to developers who do not have mainframe expertise. It is the use case most relevant to the CIO-level "skills gap" conversation and to the 2028+ "developer-native Z workflows" roadmap outcome. |

> **Commercial constraints (internal):** Application code change support ships as early adopter / limited availability in H1 2027. Full developer-native workflows are a 2028+ roadmap item. The Atlas Test SKU gates integration and regression test execution; the Atlas Provision SKU gates isolated LPAR provisioning. A business annex should document what Deb and Kathleen experience on Atlas Base before those SKUs are enabled.

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Kathleen — Experienced z/OS Application Developer | Plans, initiates, and owns application change delivery. Makes the impact assessment judgment. Reviews Atlas-generated test plans and approves production promotion. Mentors Deb and delegates routine changes as Atlas guardrails improve. |
| **Secondary** | Deb — Early tenure z/OS Application Developer | Executes assigned change tasks — bug fixes, feature additions — using Atlas-generated context and test scaffolding. Primary beneficiary of impact analysis and automated test generation. Depends on Atlas to provide the system context she does not yet carry. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Reviews change plans that touch z/OS configuration (CICS definitions, Db2 parameter changes, IMS setup). Authorizes production deployment. Is the escalation path when a change has infrastructure implications beyond the developer's scope. |
| **Secondary** | Angie — Application Architect | Defines the application specification and intended design that Atlas references for impact analysis. Reviews changes that have architectural implications. Defines what "blast radius" means for her application domain. |

Reference [`personas.md`](../personas.md).

**Key design implication — two developer experience levels:** This use case must work for both Kathleen and Deb but serves them differently. Kathleen uses Atlas to accelerate a workflow she already understands; she needs efficiency and confidence. Deb uses Atlas as a guide for a workflow she is still learning; she needs context, explanation, and guardrails. Every UX Flow child artifact for this use case should be evaluated against both: does this work for an experienced developer who wants speed, and does it work for an early-tenure developer who needs guidance?

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **Change Intelligence** | **Primary.** Test plan generation, environment provisioning, regression and integration test execution, deployment orchestration, and change validation are all Change Intelligence capabilities. This use case is the developer-facing entry point into Change Intelligence. | H1 2027 (early adopter); H2 2027 (developer-native) |
| **System Intelligence** | **Foundational.** Application topology — which programs call which, which tables are used by which transactions, which CICS definitions reference which programs — is System Intelligence data. Without the living topology model, Atlas cannot perform impact analysis. The topology is the foundation that makes every other capability in this use case possible. | GA Dec 2026 |
| **Predictive Intelligence** | **Supporting (future).** Post-deployment behavioral monitoring, regression pattern detection, and learning from prior change outcomes are Predictive Intelligence capabilities that will extend this use case in 2028+. | 2028+ |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate |
|---|---|---|---|
| Feature Change with Impact Analysis | **Planned** | H1 2027 (early adopter, limited availability) | Application code change impact analysis skill; application topology via ZUnderstand in TIB; Atlas-native LPAR provisioning; integration test orchestration |
| Bug Fix with Regression Testing | **Planned** | H1 2027 (early adopter, limited availability) | Regression test orchestration skill; application topology; isolated LPAR provisioning |
| Db2 Schema Change | **Planned** | H1 2027 (early adopter, limited availability) | Application topology (table-to-program mapping); Db2 schema change impact analysis; regression test suite |
| Application Change Without Sysprog Oversight | **Planned** | H2 2027 → 2028+ | Developer-native Z workflows; GitHub integration; full change lifecycle self-service; guardrail policy framework |

**Capability dependency notes:**

- All H1 2027 scenarios depend on **application code change impact analysis** being available via the application topology awareness capability. This requires ZUnderstand data in TIB to provide the program-call chain and table-usage mapping that underpins impact analysis. Without ZUnderstand, Atlas can provide system-level topology but not the code-level dependency graph.
- The **early adopter / limited availability** qualification on H1 2027 scenarios is significant. This is not a general availability capability at H1 2027 — it is a pilot with select customers. The scenarios should not be positioned as broadly available until H2 2027.
- **Db2 Schema Change** depends on the table-to-program mapping in ZUnderstand being accurate and complete enough to identify all programs affected by a schema modification. This is a data quality dependency, not just a capability dependency.
- **Application Change Without Sysprog Oversight** (S4) is the most strategically important scenario but the most capability-gated. It requires the full developer-native workflow capability (2028+), GitHub integration (H2 2027), and a guardrail policy framework that lets organizations define what changes a developer can self-serve vs. what requires sysprog approval.

---

## 8. Scope and Boundaries

**In Scope:**
- Application code-level impact analysis: identifying which programs, tables, transactions, and downstream applications are touched by a proposed change
- Test plan generation scoped to the specific change and the affected application components
- Isolated test environment provisioning (LPAR with the application and its supporting components)
- Test execution: function tests at GA; integration and regression tests at H1 2027
- CICS and IMS deployment orchestration: Atlas handles the configuration steps required to deploy an application change
- Db2 schema change impact analysis and test generation
- Change iteration: fast re-test loop as code is modified
- Test run comparison: before/after baseline comparison to detect regressions
- Change record and audit trail generation
- Developer self-service for routine changes (H2 2027, with guardrails)

**Out of Scope:**
- Code generation and IDE-level development — Atlas provides context and scaffolding; the developer writes the code in their preferred IDE (IBM Z Open Editor, IBM Developer for z/OS). Atlas does not write application code.
- Build orchestration — Atlas integrates with Dependency Based Build (DBB) for build; it does not replace DBB.
- Database performance tuning (SQL optimization, index creation) — Atlas identifies the affected tables and generates tests; SQL-level optimization is out of scope.
- Platform or z/OS version upgrades — owned by UC-08 (Platform Upgrade and Migration).
- Middleware patch application — owned by UC-02 (Patch Management).
- Security and compliance review of application changes — Atlas generates the change record; security review is a human process outside Atlas scope.

**Non-Goals:**
- Atlas does not replace the developer's IDE or code editor.
- Atlas does not enforce coding standards or style guidelines.
- Atlas does not generate production-ready application code from a specification.
- Atlas does not automatically promote changes to production without explicit developer authorization. Human-in-the-loop is required for production deployment, even in the self-service scenario (S4).

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The application topology has been discovered and is current in Atlas. Without an accurate program-call chain and table-usage map, impact analysis will be incomplete. Atlas must surface topology coverage gaps before generating impact analysis. |
| **Assumption** | ZUnderstand is integrated via TIB and its application-level data (program call chains, Db2 table usage, CICS transaction definitions) is available. Config-as-Code alone provides system-level topology; code-level dependency analysis requires ZUnderstand. |
| **Assumption** | The developer's application is deployed on CICS, IMS, or Db2 (the middleware components Atlas has modeled). Applications outside this topology footprint are out of scope for this use case at H1 2027. |
| **Dependency** | Application code change impact analysis skill — H1 2027, early adopter / limited availability. This is the core capability gate for all H1 2027 scenarios. |
| **Dependency** | Atlas-native LPAR provisioning — H1 2027. Required for isolated test environment creation. Without it, environment provisioning reverts to the DIY engine from GA, significantly degrading the developer experience. |
| **Dependency** | Integration and regression test orchestration — H1 2027 (Atlas Test SKU). Required for the regression testing scenarios. Function tests only at GA. |
| **Dependency** | GitHub integration — H2 2027. Required for the developer-native self-service scenario (S4) to connect Atlas change events to code commits and PRs. |
| **Dependency** | IBM Developer for z/OS / IBM Z Open Editor integration (Bob IDE context) — Required for the seamless context handoff between Atlas and the developer's IDE described in the application change use case source document. The spec and test plan generated in Atlas must be accessible from the IDE without manual copy-paste. |
| **Risk** | Application topology coverage is the most significant quality risk. If ZUnderstand's program call chain data is incomplete (common in large legacy applications with dynamic call patterns), impact analysis will miss dependencies. Atlas must surface a confidence level for its impact analysis based on topology coverage, not present incomplete analysis as complete. |
| **Risk** | Early adopter / limited availability at H1 2027 means this use case will be piloted with a small number of customers. Feedback from that cohort is critical for scoping the H2 2027 general availability. The product team needs a structured feedback loop from the H1 2027 pilot. |
| **Risk** | The developer self-service scenario (S4) requires a guardrail policy framework — a configurable set of rules that define what changes require sysprog approval vs. what a developer can self-serve. Designing this policy framework is an open design question that must be resolved before S4 can be built. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifacts |
|---|---|---|---|---|---|---|
| S1 | Feature Change with Impact Analysis | Kathleen or Deb is assigned a new feature and asks Atlas what the change will touch before beginning development | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange, Screen designs | [`use-cases/atlas_application_change_use_case copy.md`](atlas_application_change_use_case%20copy.md) |
| S2 | Bug Fix with Regression Testing | Deb is fixing a reported defect and needs to confirm her fix does not break anything else | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange, Screen designs | TBD |
| S3 | Db2 Schema Change | Kathleen or a DBA needs to modify a Db2 table schema and must identify all applications affected | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange | TBD |
| S4 | Application Change Without Sysprog Oversight | Deb initiates and completes a routine change end-to-end in Atlas without requiring Zach to execute any step | Planned — H2 2027 → 2028+ | 2028+ | UX Flow, Chat Exchange, Screen designs | TBD |

**Design decisions recorded in this catalog:**

- **S1 is the primary demo scenario.** The feature change workflow — understand the assignment, see the impact, get the test plan, watch the environment provision in the background, iterate in a fast loop — is the most complete representation of the Atlas developer value proposition. The source document's "backup email field" example (Deb adding a secondary email to a banking application) is a concrete, demostrable story that works well for both technical and executive audiences.
- **S2 and S3 share most of the S1 flow.** The entry point differs (defect vs. feature vs. schema change) but the impact analysis → test plan → provision → test → iterate flow is the same. These may be designed as entry-point variants of S1 rather than fully separate UX flows. Confirm with the UX team before designing three independent flows.
- **S4 is the strategic north star, not a near-term deliverable.** It requires GitHub integration, a guardrail policy framework, and the full developer-native workflow capability. Do not position S4 as H1 2027 to customers. It is the vision story for executive messaging — "where this goes" — not the near-term delivery.
- **Deb is the right persona for S1 and S2 demos.** Her pain points map most directly to what Atlas solves — she has no system context, no test automation, and no fast environment access. Demonstrating Atlas through Deb makes the before/after contrast sharper than demonstrating through Kathleen, who has more workarounds.

---

## 11. Lifecycle Overview

```
Understand → Analyze → Plan → Develop → Provision → Test → Iterate → Validate → Deploy → Govern
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Understand** | Developer asks Atlas about the change assignment. Atlas surfaces the relevant application spec, the current component topology, and a summary of what the change is expected to touch. | User (query) / Atlas (retrieves context) |
| **Analyze** | Atlas performs impact analysis: identifies affected programs, Db2 tables, CICS transaction definitions, IMS program specifications, and downstream application dependencies. Produces a blast radius summary with confidence level based on topology coverage. | Atlas |
| **Plan** | Atlas generates a test plan scoped to the change: test scenarios, environment specification (which components are needed, at what configuration), test data requirements, and expected validation criteria. | Atlas |
| **Develop** | Developer writes the code in their IDE. Atlas context (spec, impact analysis, test plan) is available in the IDE environment without manual handoff. Test plan updates automatically as code changes are made. | User |
| **Provision** | Atlas provisions an isolated test environment in the background while the developer writes code. The environment mirrors the production topology for the affected components — not a full production clone, but a scoped, purpose-built sandbox. | Atlas (H1 2027+) / User-operated (GA) |
| **Test** | Developer triggers test execution. Atlas runs the test suite against the isolated environment. Results surface as pass/fail with attribution — which test failed, which program or SQL call was responsible, suggested fix if Atlas can identify one. | Atlas (executes) / User (triggers) |
| **Iterate** | Developer modifies code, test plan updates, tests re-run. The iteration loop is fast — environment is already provisioned, tests are automated, results are immediate. | User (modifies) / Atlas (re-tests) |
| **Validate** | All tests pass. Atlas confirms the change is ready for production: impact analysis is satisfied, regression suite is green, and the change record is complete. | Atlas |
| **Deploy** | Developer (or Kathleen for supervised changes, Deb with self-service guardrails in the future) initiates production deployment. Atlas orchestrates the CICS/IMS/Db2 configuration steps required to deploy the change. | Atlas (orchestrates) / User (authorizes) |
| **Govern** | Atlas generates the complete change record: impact analysis, test results, deployment steps, authorization chain. Change record pushed to ServiceNow (H2 2027). Audit trail sealed. | Atlas |

> **Scope guidance:** The "What Happens" column describes outcomes and decisions, not UI interactions or API calls. Screen-level and conversation-level detail belongs in the UX Flow and Chat Exchange child artifacts.

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Application topology retrieval and impact analysis | **Atlas** | AI-driven; requires ZUnderstand in TIB; Atlas surfaces confidence level and coverage gaps |
| Test plan generation | **Atlas** | Scoped to the specific change and affected components; developer can edit scenarios and adjust success criteria |
| Test plan evolution as code changes | **Atlas** | Automatic; Atlas updates the test plan when new components or tables are touched during development |
| Test environment specification | **Atlas** | Atlas defines which components are needed and at what configuration; developer reviews before provisioning |
| Test environment provisioning | **Atlas (H1 2027+)** | Atlas-native LPAR provisioning; user approves the provisioning action |
| Application development (writing code) | **User (Deb / Kathleen)** | Atlas provides context and scaffolding; the developer writes the code |
| Test execution triggering | **User** | Developer initiates test runs; Atlas executes |
| Test execution and result analysis | **Atlas** | Automated; Atlas surfaces pass/fail with attribution and suggested fixes for identified failures |
| Failure investigation and code correction | **User** | Developer investigates failures using Atlas context; Atlas provides supporting analysis but does not rewrite code |
| Production promotion decision | **User** | Governance gate. For supervised changes: Kathleen approves. For self-service changes (S4): Deb approves within defined policy guardrails. |
| CICS/IMS/Db2 deployment configuration steps | **Atlas** | Orchestrated by Atlas; developer authorizes each production action |
| Production deployment authorization | **User (Kathleen / Deb within guardrails)** | Cannot be delegated to Atlas. Explicit approval required before any production mutation. |
| Guardrail policy definition (what Deb can self-serve) | **Zach + Kathleen (policy) / Atlas (enforcement)** | Policy is a human decision; Atlas enforces it. Policy definition is a setup activity. |
| Change record and audit trail creation | **Atlas** | Automated; no manual assembly required |

**Governance gates — explicit human approval required before:**
1. Test environment provisioning — user approves the Atlas-native provisioning action
2. Production deployment — explicit named authorization captured in the change record (Kathleen for supervised; Deb within guardrails for self-service, H2 2027+)
3. Any change to CICS or IMS definitions that could affect production transaction availability — Zach authorization required

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Topology-aware code-level impact analysis** | Atlas joins the program call chain, table usage, and CICS/IMS definition data to produce a precise blast radius for a specific code change — which programs call the modified module, which tables are read or written, which transactions will be affected. | Without this, developers discover impact in integration testing or production. With this, impact is visible before the first line of code is written. The shift from reactive to proactive is the core value. |
| **Automatic test plan generation from topology** | Atlas generates a test plan from the impact analysis — not a generic checklist, but a scenario list scoped to the specific components the change touches, with environment and data requirements specified. | Manual test planning on z/OS is time-consuming and expert-dependent. Deb cannot write a comprehensive test plan for a change she does not fully understand. Atlas generates it from the topology. |
| **Background environment provisioning** | Atlas begins provisioning the isolated test environment the moment the impact analysis is complete — while the developer is writing code. The environment is ready when the developer needs it. | Today Deb files a ticket for a test environment and waits. The wait time alone is one of her top pain points. Atlas eliminates the wait by making provisioning parallel with development, not sequential. |
| **Continuous test plan evolution** | As Deb writes code and the change touches more components than initially anticipated, Atlas automatically updates the test plan to include the new scenarios. The developer does not need to revisit the test plan manually. | Scope creep in test coverage is common — developers add a field and discover it touches a table they did not expect. Atlas keeps the test plan current without requiring a manual update cycle. |
| **Failure attribution and fix suggestion** | When a test fails, Atlas identifies which specific program, SQL call, or CICS definition caused the failure and, where possible, suggests the fix. | On z/OS today, a test failure triggers a multi-step debugging process involving CICS trace, Db2 accounting records, and system log analysis. Atlas collapses this to a single explanation with a suggested next step. |
| **Context continuity across Atlas and IDE** | Atlas maintains the spec, impact analysis, test plan, and chat history in a shared context that is available in the developer's IDE (Bob IDE / IBM Z Open Editor) without manual handoff. | Context fragmentation is one of Deb's primary pain points — switching between too many tools and losing context with each switch. Atlas makes the context portable and persistent. |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| **Time from change assignment to first test run** | Time between "developer receives the change task" and "first test suite executed against an isolated environment" | 1–3 days (impact analysis manual; environment provisioning requires ticket) | Under 2 hours (Atlas impact analysis instant; environment provisioning in background) |
| **Regression rate for developer-initiated changes** | % of developer changes that cause a regression discovered in integration testing or production (not in the developer's own test cycle) | DISCOVERY NEEDED — baseline varies widely by shop; estimated 15–30% escape rate for routine changes | Under 5% escape rate from developer test cycle to integration testing |
| **Test environment provisioning wait time** | Time between developer requesting a test environment and environment being available | 4–48 hours (sysprog ticket, manual provisioning) | Under 30 minutes (Atlas-native LPAR provisioning, H1 2027+) |
| **Sysprog involvement per developer change** | Number of sysprog-hours required per developer change cycle (environment provisioning, deployment configuration, issue escalation) | Estimated 2–4 hours of sysprog time per developer change cycle | Under 30 minutes sysprog time for routine changes (Atlas handles provisioning and deployment configuration) |
| **Developer self-service rate** | % of routine developer changes completed end-to-end without a sysprog action (H2 2027+ metric) | Near 0% (every change requires sysprog for at least one step) | Target 60%+ for routine changes within defined guardrail scope, within 6 months of S4 availability |
| **Time-to-detect regression (developer cycle)** | Time between a regression-causing code change and detection of the regression | Same day to days later (when integration testing catches it) | Same session (Atlas regression suite runs automatically after each code iteration) |

**Leading indicators (behavior):**
- Weekly test plans generated per developer connected to Atlas
- Number of isolated environment provisioning events per week
- Test execution volume per developer per sprint

**Lagging indicators (outcome):**
- Integration test failure rate attributable to developer changes
- Sysprog time per developer change cycle
- Developer satisfaction scores (once available)

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| **Application topology is incomplete** (ZUnderstand coverage gap) | Atlas surfaces the coverage gap before generating impact analysis: "Topology coverage for this application is 70%. The following program call chains could not be mapped: [list]. Impact analysis may miss dependencies in these areas." | Kathleen reviews the gaps and decides whether to proceed with partial impact analysis or wait for topology coverage to improve. Atlas records the topology limitation in the change record. |
| **Test environment provisioning fails** | Atlas surfaces the provisioning error with diagnostic detail and a suggested resolution. It retains the test plan and environment specification so no work is lost when the issue is resolved. | Developer or Zach resolves the provisioning issue. Developer re-triggers provisioning when ready. |
| **Test plan does not cover a component Deb's change affects** | If Atlas detects during test execution that a component is exercised that was not in the test plan (e.g., an unexpected Db2 table access), it surfaces the gap and adds a test scenario for the uncovered component before concluding the run. | Developer reviews the added scenario. Atlas re-runs the extended test suite. |
| **Production deployment fails mid-sequence** | Atlas captures the partial deployment state, stops the sequence, and generates a rollback plan from the partially deployed state. It does not attempt to complete the deployment without human authorization. | Kathleen or Zach reviews the partial state. Atlas generates recovery options: complete the deployment with a corrected step, or roll back to pre-deployment state. |
| **Guardrail policy violation (S4)** | Deb attempts a change that falls outside the self-service policy (e.g., a CICS definition change that requires sysprog review). Atlas surfaces the policy restriction and routes the change to the appropriate reviewer with full context attached — no context lost in the handoff. | Zach receives the routed change, reviews the Atlas-generated impact analysis and test results, and approves or rejects. Deb is notified of the decision with rationale. |
| **Db2 schema change affects an application Kathleen did not know about** | Atlas surfaces the unexpected dependency before the schema change is applied: "This table is also used by the BILLING application (KATHLEEN was not aware). Modifying this schema will affect BILLING programs [list]." | Kathleen reviews the additional scope. She decides whether to expand the test plan to cover BILLING, coordinate with the BILLING team, or modify the schema change to be backward-compatible. |

> **Depth guidance:** This is a `Planned` use case with well-developed scenario source material. The failure modes above are drawn from the source scenario and represent the known failure patterns.

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **Change record for every production deployment** | Application changes to production on z/OS require a change record documenting what changed, who authorized it, and what validation was performed. | Atlas generates a complete change artifact — impact analysis, test results, environment configuration, authorization chain — and pushes it to ServiceNow (H2 2027) or stores it in the Atlas change record. |
| **Test evidence preservation** | Many organizations require documented proof that application changes were tested before production deployment. | Atlas preserves the test environment specification, test scenario list, execution results, and pass/fail detail as immutable artifacts linked to the change record. |
| **Named authorization for production deployment** | No production deployment should execute without explicit named authorization. | Atlas enforces a hard stop before production action. Authorization is captured with timestamp and user identity in the change record. |
| **Guardrail policy documentation (S4)** | Organizations allowing developer self-service must document the policy — what changes are within scope, what requires escalation, and what constitutes a policy violation. | Atlas enforces the policy and records every policy evaluation in the change record — including changes that were routed for escalation and why. The policy itself is a configuration artifact in Atlas, versioned and auditable. |
| **Regression test coverage documentation** | For regulated applications (SOX, PCI), demonstrating that regression testing was performed before a production change is a compliance requirement. | Atlas's test execution record documents the regression suite scope, execution date, pass/fail results, and the change it was executed against. This is audit-ready evidence. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-02: Patch Management | Shares test environment provisioning and test execution infrastructure. When a PTF applied through UC-02 affects an application, it may trigger a UC-07 regression test cycle. The two use cases are the primary consumers of the Atlas Test and Atlas Provision SKUs. |
| UC-05: Application Discovery and Dependency Analysis | UC-05 produces the application topology that UC-07 depends on for impact analysis. A developer asking "what does my change touch?" is asking a UC-07 question; the answer comes from the UC-05 topology model. The two use cases share the ZUnderstand dependency. |
| UC-08: Platform Upgrade and Migration | Platform upgrades may require application changes to maintain compatibility. When UC-08 identifies a compatibility impact on an application, the remediation path runs through UC-07. The boundary: UC-08 owns the platform change; UC-07 owns the application adaptation. |
| UC-09: Environment Parity and Drift Control | Post-deployment drift validation (UC-09 S4) and post-deployment change validation (UC-07) are complementary. After an application change is deployed, Atlas should both confirm the application is behaving correctly (UC-07) and confirm the environment state matches the intended post-deployment baseline (UC-09). |
| UC-11: Capacity Planning and Performance Readiness | Application changes can cause performance regressions. UC-07's test cycle includes basic function and regression testing; performance regression detection for application changes is a UC-11 concern. When Atlas detects a performance anomaly after an application deployment, the handoff to UC-11's Post-Change Performance Regression scenario is natural. |
| UC-12: Application Modernization | UC-12 (Application Modernization) is the strategic layer above UC-07. Modernization requires the same impact analysis and test scaffolding as change management — UC-07 provides the execution framework that UC-12 scenarios use for individual modernization steps. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Developer self-service without sysprog oversight** | H2 2027 → 2028+ | The S4 scenario — Deb completes a routine change end-to-end without Zach — is the strategic destination for this use case. Requires guardrail policy framework, GitHub integration, and full deployment orchestration. The 2028+ "developer-native Z workflows" roadmap capability is the formal delivery vehicle. |
| **GitHub integration for change attribution** | H2 2027 | Connect Atlas change events to GitHub commits and PRs. Enables change traceability from code commit through to production deployment within Atlas. |
| **Continuous test plan maintenance between changes** | 2028+ | Atlas learns from past change cycles and maintains a living regression suite that grows with the application — not a test plan generated fresh for each change but an accumulated test corpus that improves over time. |
| **Self-learning impact analysis** | 2028+ | Atlas learns from historical changes where the initial impact analysis missed a dependency (because it was discovered during testing or in production) and incorporates that learning into future impact analysis for the same application. |
| **Autonomous routine change execution** | 2028+ | For well-understood, low-risk application changes (e.g., a COBOL variable rename with full test coverage), Atlas proposes and executes the change with human approval only at defined checkpoints. This is the agentic operations path for application change. |
| **IBM Z portfolio integration** | H1 2027 → H2 2027 | Formal integration with IBM Developer for z/OS, Wazi Deploy, and DBB — making Atlas the orchestration layer that connects the developer IDE to the production deployment pipeline, with test and impact intelligence throughout. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-07](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`atlas-use-case-taxonomy.md`](../atlas-use-case-taxonomy.md) | Scenario naming and taxonomy classification |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 2 "Application code change support" (early adopter); Phase 3 "Developer-native Z workflows"; Phase 4 "Developer-native Z workflows" (full); H1 2027 customer outcome "I can do application code level changes with Atlas-assisted impact analysis" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | GA+1 use case "Application Modernization"; Change Intelligence application change focus |
| [`use-cases/atlas_application_change_use_case copy.md`](atlas_application_change_use_case%20copy.md) | End-to-end developer workflow (Deb adding backup email feature); Atlas + Bob IDE context handoff model; background environment provisioning pattern; continuous test plan evolution; fast iteration loop; system lifecycle model (Understand → Plan → Test → Validate → Iterate) |
| [`atlas_unified_use_case_agent_spec.md`](../atlas_unified_use_case_agent_spec.md) | Application Change state model (Discover → Analyze → Plan → Execute → Validate → Iterate); shared entity model |
| [`personas/IBM Z & LinuxONE Research Central_ Personas_ Kathleen the Experienced z_OS Application Developer - Airtable.pdf`](../personas/IBM%20Z%20%26%20LinuxONE%20Research%20Central_%20Personas_%20Kathleen%20the%20Experienced%20z_OS%20Application%20Developer%20-%20Airtable.pdf) | Kathleen persona — responsibilities, pain points, dislikes, validated engagements (Z DevOps Advisory Council, September 2024) |
| [`personas/IBM Z & LinuxONE Research Central_ Personas_ Deb the Early tenure z_OS Application Developer - Airtable.pdf`](../personas/IBM%20Z%20%26%20LinuxONE%20Research%20Central_%20Personas_%20Deb%20the%20Early%20tenure%20z_OS%20Application%20Developer%20-%20Airtable.pdf) | Deb persona — responsibilities, pain points, validated engagements (multiple Z DevOps Advisory Council sessions, 2024–2025; CIBC DPO Post POC Interview) |
| [`personas.md`](../personas.md) | Canonical persona definitions for Kathleen, Deb, Zach, Angie |
