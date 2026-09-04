# UC-07: Application Change Management
*Version 1.0 | Owner: Product Management | Last updated: August 2026*

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
| Transaction Flow Walkthrough | **Planned** | H1 2027 (early adopter, limited availability) | Application topology (ZUnderstand call chain + CICS CSD); transaction tracing skill |
| Application Change Without Sysprog Oversight | **Planned** | H2 2027 → 2028+ | Developer-native Z workflows; GitHub integration; full change lifecycle self-service; guardrail policy framework |

**Capability dependency notes:**

- All H1 2027 scenarios depend on ZUnderstand data being available in TIB. ZUnderstand provides Atlas with the application node topology and application-to-infrastructure edges required for infrastructure-level blast radius analysis. **Atlas does not perform program-level code analysis (call chains, table-usage mapping) directly** — that is the domain of Bob for Z Premium Package (PPZ). Without ZUnderstand, Atlas can provide system-level (Layer 1/2) topology but cannot surface the application layer or application-to-infrastructure relationships.
- The **early adopter / limited availability** qualification on H1 2027 scenarios is significant. This is not a general availability capability at H1 2027 — it is a pilot with select customers. The scenarios should not be positioned as broadly available until H2 2027.
- **Db2 Schema Change** depends on the table-to-program mapping in ZUnderstand being accurate and complete enough to identify all programs affected by a schema modification. This is a data quality dependency, not just a capability dependency.
- **Application Change Without Sysprog Oversight** (S5) is the most strategically important scenario but the most capability-gated. It requires the full developer-native workflow capability (2028+), GitHub integration (H2 2027), and a guardrail policy framework that lets organizations define what changes a developer can self-serve vs. what requires sysprog approval.

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
- Transaction flow tracing: tracing how a business transaction flows from entry point through middleware to data (S4 — H1 2027)

**Out of Scope:**
- Code generation and IDE-level development — Atlas provides context and scaffolding; the developer writes the code in their preferred IDE (IBM Z Open Editor, IBM Developer for z/OS). Atlas does not write application code.
- Build orchestration — Atlas integrates with Dependency Based Build (DBB) for build; it does not replace DBB.
- Database performance tuning (SQL optimization, index creation) — Atlas identifies the affected tables and generates tests; SQL-level optimization is out of scope.
- Platform or z/OS version upgrades — owned by UC-08 (Platform Upgrade and Migration).
- Middleware patch application — owned by UC-06 (Patch Management).
- Security and compliance review of application changes — Atlas generates the change record; security review is a human process outside Atlas scope.

**Non-Goals:**
- Atlas does not replace the developer's IDE or code editor.
- Atlas does not enforce coding standards or style guidelines.
- Atlas does not generate production-ready application code from a specification.
- Atlas does not automatically promote changes to production without explicit developer authorization. Human-in-the-loop is required for production deployment, even in the self-service scenario (S5).

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The application topology has been discovered and is current in Atlas. Without an accurate program-call chain and table-usage map, impact analysis will be incomplete. Atlas must surface topology coverage gaps before generating impact analysis. |
| **Assumption** | ZUnderstand is integrated via TIB and provides Atlas with: application node topology (program inventory and project groupings), program relationship and data access graph (call chains, Db2 table usage, VSAM file access), and CICS region mapping via CSD parsing. Config-as-Code provides system-level (Layer 1/2) topology; ZUnderstand adds the application layer and data store linkages. Atlas does **not** use ZUnderstand for line-of-code blast radius, business rule extraction, or low-level test case generation — those are PPZ capabilities. For customers with PPZ, that code-level context enriches the Atlas test plan via the Bob IDE client-side stage. For customers without PPZ, Atlas generates the test plan from system-level and program-graph context; code-level detail is provided by the developer's own IDE. **Known gap:** ZUnderstand does not provide runtime LPAR anchoring — the application-to-LPAR edge is currently derived from CSD-based CICS region association, not runtime observation (per Jean-Yves Rigolet, Aug 26 2026). |
| **Assumption** | The developer's application is deployed on CICS, IMS, or Db2 (the middleware components Atlas has modeled). Applications outside this topology footprint are out of scope for this use case at H1 2027. |
| **Dependency** | Application code change impact analysis skill — H1 2027, early adopter / limited availability. This is the core capability gate for all H1 2027 scenarios. |
| **Dependency** | Atlas-native LPAR provisioning — H1 2027. Required for isolated test environment creation. Without it, environment provisioning reverts to the DIY engine from GA, significantly degrading the developer experience. |
| **Dependency** | Integration and regression test orchestration — H1 2027 (Atlas Test SKU). Required for the regression testing scenarios. Function tests only at GA. |
| **Dependency** | GitHub integration — H2 2027. Required for the developer-native self-service scenario (S5) to connect Atlas change events to code commits and PRs. |
| **Dependency** | IBM Developer for z/OS / IBM Z Open Editor integration (Bob IDE context) — Required for the seamless context handoff between Atlas and the developer's IDE described in the application change use case source document. The spec and test plan generated in Atlas must be accessible from the IDE without manual copy-paste. |
| **Risk** | Application topology coverage is the most significant quality risk. If ZUnderstand's program call chain data is incomplete (common in large legacy applications with dynamic call patterns), impact analysis will miss dependencies. Atlas must surface a confidence level for its impact analysis based on topology coverage, not present incomplete analysis as complete. |
| **Risk** | Early adopter / limited availability at H1 2027 means this use case will be piloted with a small number of customers. Feedback from that cohort is critical for scoping the H2 2027 general availability. The product team needs a structured feedback loop from the H1 2027 pilot. |
| **Risk** | The developer self-service scenario (S5) requires a guardrail policy framework — a configurable set of rules that define what changes require sysprog approval vs. what a developer can self-serve. Designing this policy framework is an open design question that must be resolved before S5 can be built. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifacts |
|---|---|---|---|---|---|---|
| S1 | Feature Change with Impact Analysis | Kathleen or Deb is assigned a new feature and asks Atlas what the change will touch before beginning development | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange, Screen designs | [`use-cases/atlas_application_change_use_case copy.md`](atlas_application_change_use_case%20copy.md) |
| S2 | Bug Fix with Regression Testing | Deb is fixing a reported defect and needs to confirm her fix does not break anything else | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange, Screen designs | TBD |
| S3 | Db2 Schema Change | Kathleen or a DBA needs to modify a Db2 table schema and must identify all applications affected | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange | TBD |
| S4 | Transaction Flow Walkthrough | Developer asks Atlas to trace how a specific business transaction (CICS transaction, REST API call) flows from entry point through middleware to data before scoping a change | Planned — H1 2027 (early adopter) | H1 2027 | UX Flow, Chat Exchange | Received from UC-05 (Stage 2). Primary persona: Kathleen. |
| S5 | Application Change Without Sysprog Oversight | Deb initiates and completes a routine change end-to-end in Atlas without requiring Zach to execute any step | Planned — H2 2027 → 2028+ | 2028+ | UX Flow, Chat Exchange, Screen designs | TBD |

**Design decisions recorded in this catalog:**

- **S1 is the primary demo scenario.** The feature change workflow — understand the assignment, see the impact, get the test plan, watch the environment provision in the background, iterate in a fast loop — is the most complete representation of the Atlas developer value proposition. The source document's "backup email field" example (Deb adding a secondary email to a banking application) is a concrete, demonstrable story that works well for both technical and executive audiences.
- **S2 and S3 share most of the S1 flow.** The entry point differs (defect vs. feature vs. schema change) but the impact analysis → test plan → provision → test → iterate flow is the same. These may be designed as entry-point variants of S1 rather than fully separate UX flows. Confirm with the UX team before designing three independent flows.
- **S4 (Transaction Flow Walkthrough) absorbed from retired UC-05.** Rather than asking "what does my change touch?", this scenario asks "how does this transaction actually work, from entry to data?" — tracing the full execution path through CICS, middleware, and Db2 before scoping a change. It is the foundation move before S1: developers use S4 to understand the transaction they are about to modify, then proceed to S1 for change impact analysis.
- **S5 is the strategic north star, not a near-term deliverable.** It requires GitHub integration, a guardrail policy framework, and the full developer-native workflow capability. Do not position S5 as H1 2027 to customers. It is the vision story for executive messaging — "where this goes" — not the near-term delivery.
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
| Production promotion decision | **User** | Governance gate. For supervised changes: Kathleen approves. For self-service changes (S5): Deb approves within defined policy guardrails. |
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
| **Developer self-service rate** | % of routine developer changes completed end-to-end without a sysprog action (H2 2027+ metric) | Near 0% (every change requires sysprog for at least one step) | Target 60%+ for routine changes within defined guardrail scope, within 6 months of S5 availability |
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
| **Guardrail policy violation (S5)** | Deb attempts a change that falls outside the self-service policy (e.g., a CICS definition change that requires sysprog review). Atlas surfaces the policy restriction and routes the change to the appropriate reviewer with full context attached — no context lost in the handoff. | Zach receives the routed change, reviews the Atlas-generated impact analysis and test results, and approves or rejects. Deb is notified of the decision with rationale. |
| **Db2 schema change affects an application Kathleen did not know about** | Atlas surfaces the unexpected dependency before the schema change is applied: "This table is also used by the BILLING application (KATHLEEN was not aware). Modifying this schema will affect BILLING programs [list]." | Kathleen reviews the additional scope. She decides whether to expand the test plan to cover BILLING, coordinate with the BILLING team, or modify the schema change to be backward-compatible. |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **Change record for every production deployment** | Application changes to production on z/OS require a change record documenting what changed, who authorized it, and what validation was performed. | Atlas generates a complete change artifact — impact analysis, test results, environment configuration, authorization chain — and pushes it to ServiceNow (H2 2027) or stores it in the Atlas change record. |
| **Test evidence preservation** | Many organizations require documented proof that application changes were tested before production deployment. | Atlas preserves the test environment specification, test scenario list, execution results, and pass/fail detail as immutable artifacts linked to the change record. |
| **Named authorization for production deployment** | No production deployment should execute without explicit named authorization. | Atlas enforces a hard stop before production action. Authorization is captured with timestamp and user identity in the change record. |
| **Guardrail policy documentation (S5)** | Organizations allowing developer self-service must document the policy — what changes are within scope, what requires escalation, and what constitutes a policy violation. | Atlas enforces the policy and records every policy evaluation in the change record — including changes that were routed for escalation and why. The policy itself is a configuration artifact in Atlas, versioned and auditable. |
| **Regression test coverage documentation** | For regulated applications (SOX, PCI), demonstrating that regression testing was performed before a production change is a compliance requirement. | Atlas's test execution record documents the regression suite scope, execution date, pass/fail results, and the change it was executed against. This is audit-ready evidence. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-06: Patch Management | Shares test environment provisioning and test execution infrastructure. When a PTF applied through UC-06 affects an application, it may trigger a UC-07 regression test cycle. The two use cases are the primary consumers of the Atlas Test and Atlas Provision SKUs. |
| UC-08: Platform Upgrade and Migration | Platform upgrades may require application changes to maintain compatibility. When UC-08 identifies a compatibility impact on an application, the remediation path runs through UC-07. The boundary: UC-08 owns the platform change; UC-07 owns the application adaptation. |
| UC-10: Environment Parity and Drift Control | Post-deployment drift validation (UC-10 S4) and post-deployment change validation (UC-07) are complementary. After an application change is deployed, Atlas should both confirm the application is behaving correctly (UC-07) and confirm the environment state matches the intended post-deployment baseline (UC-10). |
| UC-12: Capacity Planning and Performance Readiness | Application changes can cause performance regressions. UC-07's test cycle includes basic function and regression testing; performance regression detection for application changes is a UC-12 concern. When Atlas detects a performance anomaly after an application deployment, the handoff to UC-12's Post-Change Performance Regression scenario is natural. |
| UC-09: Application Modernization | UC-09 (Application Modernization) is the strategic layer above UC-07. Modernization requires the same impact analysis and test scaffolding as change management — UC-07 provides the execution framework that UC-09 scenarios use for individual modernization steps. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Developer self-service without sysprog oversight** | H2 2027 → 2028+ | The S5 scenario — Deb completes a routine change end-to-end without Zach — is the strategic destination for this use case. Requires guardrail policy framework, GitHub integration, and full deployment orchestration. The 2028+ "developer-native Z workflows" roadmap capability is the formal delivery vehicle. |
| **GitHub integration for change attribution** | H2 2027 | Connect Atlas change events to GitHub commits and PRs. Enables change traceability from code commit through to production deployment within Atlas. |
| **Continuous test plan maintenance between changes** | 2028+ | Atlas learns from past change cycles and maintains a living regression suite that grows with the application — not a test plan generated fresh for each change but an accumulated test corpus that improves over time. |
| **Self-learning impact analysis** | 2028+ | Atlas learns from historical changes where the initial impact analysis missed a dependency (because it was discovered during testing or in production) and incorporates that learning into future impact analysis for the same application. |
| **Autonomous routine change execution** | 2028+ | For well-understood, low-risk application changes (e.g., a COBOL variable rename with full test coverage), Atlas proposes and executes the change with human approval only at defined checkpoints. This is the agentic operations path for application change. |
| **IBM Z portfolio integration** | H1 2027 → H2 2027 | Formal integration with IBM Developer for z/OS, Wazi Deploy, and DBB — making Atlas the orchestration layer that connects the developer IDE to the production deployment pipeline, with test and impact intelligence throughout. |

---

## 19. Pain Points & Wows Flow Analysis

> **Pillar:** Change Intelligence (primary) + System Intelligence (impact analysis) + Predictive Intelligence (regression detection)
> **GA Status:** H1 2027 (early adopter); Full developer-native workflows H2 2027–2028+

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Assess Impact
**Brief:** Before writing code, the developer needs to understand what their proposed change will affect — which programs, tables, transactions, and downstream applications.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Impact analysis is informal — developers rely on tribal knowledge, ask Zach or experienced colleagues, or discover impact in integration testing when it is expensive to fix. | ⏱️ Lost Time — **half a day to 2 days** of informal investigation before code can be written with any confidence |
| Deb | As an early-tenure developer, Deb has no tribal knowledge to draw on — she is most exposed to unknowingly making changes that have hidden impact. | 🔒 Skill Gap / Bottleneck — Deb cannot independently assess impact without consulting Kathleen or Zach for every change |
| Kathleen | No tool joins application topology awareness with code-level impact analysis — the picture is assembled from CSD exports, Db2 catalog queries, and developer memory. | 💼 Business Impact — impact assessments are routinely incomplete; undetected dependencies cause production incidents |

---

#### Step 2 — Provision Environment
**Brief:** Get access to a test environment that mirrors the production topology for the relevant application scope.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Deb | Test environments are provisioned manually by the infrastructure team. Wait times range from hours to days. Filing a ticket and waiting blocks development flow. | ⏱️ Lost Time — **hours to 2 days** waiting for a test environment ticket to be fulfilled |
| Kathleen | Sandboxes that mirror the production topology are rare — most developers test against shared environments that may not reflect production behavior. | 💼 Business Impact — testing in a shared, non-production-representative environment provides false confidence |
| Zach | Every test environment provisioning request requires Zach's review and involvement — adding to his workload while blocking developers. | 🔒 Skill Gap / Bottleneck — Zach is the bottleneck for every developer needing a test environment |

---

#### Step 3 — Code
**Brief:** The developer writes or modifies code, working without real-time feedback on topological impact.

**Personas involved:** Kathleen, Deb

| Persona | Pain Point | Category |
|---|---|---|
| Deb | Developers have no visibility into application performance metrics without going through the infrastructure team — no self-service performance baseline. | 🔒 Skill Gap / Bottleneck — Deb cannot understand the performance implications of her code changes without escalating to the performance team |
| Kathleen | Regression detection is ad hoc — if a change breaks something in a shared CICS transaction chain, it surfaces in integration testing or production. | 💼 Business Impact — regression detection at the point of production or integration is expensive relative to catching it during development |

---

#### Step 4 — Generate Test Plan
**Brief:** Define the test scenarios that will validate the change — which transactions, API paths, and downstream applications need to be exercised.

**Personas involved:** Kathleen, Deb

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Test plan generation is manual — Kathleen writes test scenarios based on her knowledge of what the change touches, with no automated scope generation. | ⏱️ Lost Time — **2–4 hours** to write a test plan for each significant change |
| Deb | Test coverage is inconsistent and dependent on individual developer discipline — there is no automated scaffolding for what needs to be tested. | 💼 Business Impact — changes proceed with test coverage that depends on Deb's current knowledge level, not on a systematic scope |

---

#### Step 5 — Validate
**Brief:** Execute the test plan in the test environment and review results before promoting the change.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Deb | There is little or no test automation on z/OS — test coverage is manual, inconsistent, and depends on individual developer discipline. | ⏱️ Lost Time — **half a day to 2 days** of manual test execution per change |
| Deb | Regressions are caught in integration testing or production — the developer finds out she broke something through a test failure she did not control or a production incident. | 💼 Business Impact — late regression detection is the most expensive quality failure mode for z/OS application development |
| Kathleen | Deploying an application change to CICS or IMS after validation requires multiple manual steps across multiple tools and teams — IBM Z Open Editor, DBB, a separate deployment tool, and a sysprog for configuration changes. | ⏱️ Lost Time — **hours of multi-tool, multi-team handoff** to get from validated code to deployed application |

---

#### Step 6 — Deploy
**Brief:** Promote the change from the test environment to CICS or IMS — including any infrastructure configuration changes.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Deploying to CICS or IMS requires multiple manual steps across multiple tools and teams — developer cannot deploy independently if any configuration changes are involved. | 🔒 Skill Gap / Bottleneck — Zach must be involved in any deployment that touches CICS definitions or IMS setup |
| Deb | Deb has no visibility into what configuration changes her code triggers — the handoff to sysprog is opaque from her perspective. | 🔒 Skill Gap / Bottleneck — Deb cannot initiate deployment independently; the handoff requires Kathleen's escalation to Zach |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Assess Impact

**Personas involved:** Kathleen, Deb, Angie

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Ask Atlas what the proposed change will touch — full answer across CICS, Db2, MQ, and z/OS Connect in seconds, before any code is written. | ⏱️ Time Saving — **half a day to 2 days → seconds** for impact assessment |
| Deb | Atlas provides the system context Deb does not yet carry — she understands the scope of her change before making it, not after breaking something. | 🆕 New User Capability — Deb independently understands change impact without requiring Kathleen or Zach |
| Angie | Architects can define the application specification and intended design that Atlas references for impact analysis — changes are validated against architectural intent. | 🤖 Atlas AI Insight & Automation — impact analysis references both topology and architectural specification |

---

#### Step 2 — Provision Environment

**Personas involved:** Deb, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Deb | Test environment provisioned in the background while Deb writes code — no ticket, no wait time, isolated environment ready when she needs it. | ⏱️ Time Saving — **hours to 2 days → background provisioning** while code is being written |
| Kathleen | Isolated environment that mirrors production topology — no testing in a shared environment with other teams' changes. | 🆕 New User Capability — Kathleen independently gets a production-representative isolated environment without filing a ticket |

---

#### Step 3 — Code

**Personas involved:** Deb, Kathleen

| Persona | Wow Moment | Category |
|---|---|---|
| Deb | Real-time topology context available while coding — any question about what a code path touches is answerable without interrupting a colleague. | 🆕 New User Capability — Deb codes with full system context available on demand, independently |
| Kathleen | Kathleen can delegate routine changes to Deb with confidence — Atlas provides the guardrails Kathleen would otherwise provide herself. | ⏱️ Time Saving — Kathleen's oversight effort on routine delegated changes reduces significantly |

---

#### Step 4 — Generate Test Plan

**Personas involved:** Kathleen, Deb, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Test plan generated automatically from the impact analysis — test scenarios scoped to the transactions and API paths the change actually touches. | ⏱️ Time Saving — **2–4 hours manual test plan → automatic** from impact analysis |
| Deb | Consistent, topology-derived test coverage — Deb's test plan is as thorough as Kathleen's, because it comes from the same model, not from developer experience level. | 🤖 Atlas AI Insight & Automation — test plan scope derived from topology traversal, not from developer knowledge |

---

#### Step 5 — Validate

**Personas involved:** Deb, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Deb | Developer-controlled regression testing — regressions caught in Deb's own isolated environment before the change reaches integration testing or production. | ⏱️ Time Saving — late regression discovery cost **reduced by the shift from integration/production to developer loop** |
| Deb | Iterate on code, watch the test plan update, re-run tests — a fast loop without filing tickets or waiting for infrastructure. | 🆕 New User Capability — Deb independently runs a full test-validate-iterate cycle without any infrastructure team involvement |
| Kathleen | Test results with failure attribution — Kathleen reviews a structured pass/fail report, not raw test output to interpret. | 🤖 Atlas AI Insight & Automation — failure attribution identifies which dependency or change caused the failure |

---

#### Step 6 — Deploy

**Personas involved:** Kathleen, Deb, Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Atlas-orchestrated deployment to CICS or IMS — developer initiates, Atlas handles the configuration steps, Zach authorizes changes that require it. | ⏱️ Time Saving — **hours of multi-tool, multi-team handoff → Atlas-orchestrated workflow** |
| Deb | Deployment is visible from Deb's perspective — she can track status without depending on a sysprog to relay progress. | 🆕 New User Capability — Deb has visibility into her own deployment without requiring a Zach intermediary |

---

> **Overall outcome:** Developer change cycle — from impact analysis through validated deployment — shifts from a multi-day, multi-team handoff process to a developer-controlled loop within Atlas. Both experienced and early-tenure developers benefit: Kathleen gains speed and efficiency; Deb gains the guardrails and context she cannot yet carry independently.

---

## 20. Atlas Units Estimation

> **Pillar:** Change Intelligence (primary) + System Intelligence (supporting)
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
| Unit test generated (per test) | 15,000 | 0.15 |
| Functional test suite generated | 300,000 | 3.0 |
| Directional performance test generated | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

### Desired Outcome Flow — Atlas Units per Step

UC-07 is the application development change pipeline — the use case that governs how a code change flows from a developer's IDE through test, validation, and into production. This is the **highest test-generation volume** use case in the Atlas library, and therefore the primary driver of unit test and functional test Atlas Units.

Lifecycle: `Change Initiated → Impact Analysis → Test Environment Provisioned → Tests Generated → Tests Executed → Validated → Promoted → Recorded`

#### Step 1 — Change Initiated

**What Atlas does:** Developer initiates a change. Atlas intakes the change context and navigates the topology to understand what the changed component connects to.

**Unit type:** Footprint (change intake, topology navigation)

**Step 1 subtotal: 0 units**

#### Step 2 — Impact Analysis

**What Atlas does:** Atlas analyzes the impact of the proposed change — which downstream systems, transactions, datasets, and external APIs are affected. Produces a structured impact assessment with risk classification and required test coverage.

**Unit type:** System assessment

| Activity | Tokens | Units |
|---|---|---|
| Application change impact analysis | 250,000 | **2.5** |

**Step 2 subtotal: 2.5 units**

#### Step 3 — Test Environment Provisioned

**What Atlas does:** Provisions an isolated test environment at current production configuration state.

**Unit type:** Environment Automation

| Activity | Events | Units |
|---|---|---|
| Test environment provision (1 provision) | 1 successful provision | **0.1** |

**Step 3 subtotal: 0.1 units**

#### Step 4 — Tests Generated

**What Atlas does:** Generates the test suite scoped to the affected programs, transactions, and interfaces from Step 2. Highest-unit step in the lifecycle.

| Activity | Tokens | Units |
|---|---|---|
| Unit tests generated (per test × number of tests) | 15,000 per test | **0.15 per test** |
| Functional test suite generated (~30 test cases) | 300,000 | **3.0** |
| Directional performance test generated (if applicable) | 500,000 | **5.0** (conditional) |

**Example for a typical application change:**
- 10 unit tests = 10 × 0.15 = **1.5 units**
- 1 functional test suite = **3.0 units**
- Directional performance test (conditional) = **5.0 units**

**Step 4 subtotal (typical): 4.5 units**
**Step 4 subtotal (with perf test): 9.5 units**

#### Step 5 — Tests Executed and Validated

**What Atlas does:** Executes tests, surfaces pass/fail with attribution. Fix recommendations for failures are conditional artifacts.

| Activity | Tokens | Units |
|---|---|---|
| Test execution (not metered) | — | 0 |
| Fix recommendation per failure (conditional) | ~50,000 | **0.5 per failure** |

**Step 5 subtotal: 0 units nominal / 0.5 per failure conditional**

#### Step 6 — Promoted to Next Environment

| Activity | Events | Units |
|---|---|---|
| Additional environment provision per promotion stage | 1 provision per stage | **0.1 per stage** |

**Step 6 subtotal: 0.1–0.3 units**

#### Step 7 — Recorded

**What Atlas does:** Change record generated — what changed, what was tested, what the results were, who authorized, when it went to production. Linked to ServiceNow.

| Activity | Tokens | Units |
|---|---|---|
| Application change record (structured artifact) | ~200,000 | **2.0** |

**Step 7 subtotal: 2.0 units**

### Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Initiated | Change intake, topology navigation (footprint) | 0 |
| 2 — Impact Analysis | Application change impact assessment | 2.5 |
| 3 — Provision | Test environment provision | 0.1 |
| 4 — Test Generation | Unit tests + functional test suite | 4.5 |
| 5 — Execute | Test execution (+ fix recs conditional) | 0–0.5 |
| 6 — Promote | Environment provisions per stage | 0.1–0.3 |
| 7 — Record | Application change record | 2.0 |
| **TOTAL** | **Nominal single application change** | **9.2–9.4 units** |
| **TOTAL** | **With directional performance test** | **14.2–14.4 units** |

### Sensitivity Analysis

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Minor fix (1 program, no functional test) | 5 unit tests + change record only; no impact analysis | ~0.4× |
| Standard application change | Baseline | 1.0× |
| Complex change (multi-program, performance-sensitive) | + directional performance test | ~1.5× |

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional unit test generated beyond baseline 10 | One additional unit test artifact | +0.15 per test |
| Directional performance test added | Performance test asset generated | +5.0 |
| Change record upgraded to full evidence package (UC-05 governance scenario) | Evidence package (4.0) replaces partial record (2.0) | +2.0 |
| Fix recommendation required for each test failure | One additional structured fix artifact per failure | +0.5 per failure |
| 100 developers × 20 unit tests/month | 300 units/month (matches Action Catalog baseline) | +300 per month fleet |

### What is NOT Metered

- Code navigation and program browsing in the IDE
- Dependency queries that don't produce a generated artifact
- Test execution
- Smoke test execution (included within functional test generation)
- Integration testing (not a current Atlas capability)
- Failed or cancelled workflows

### Notes and Assumptions

1. UC-07 is the **highest volume use case** for Atlas Units because test generation is the primary metered activity and it happens at developer cadence (daily or weekly per developer). The Action Catalog's baseline of 100 developers × 20 unit tests/month = 2,000 tests = 300 units/month is driven entirely by this use case.
2. **Functional tests vs. unit tests:** One functional test suite (3.0 units) covers ~30 test cases. One unit test is 0.15 units. For the same 30 test cases, unit test generation (30 × 0.15 = 4.5 units) is 50% more expensive than a single functional test suite generation (3.0 units) — but the functional test suite is a single generation event, while 30 unit tests may be generated incrementally over time.
3. **Directional performance tests** are rare but expensive (5.0 units each). They should only be triggered when the change has explicit performance implications.
4. The **change record** (Step 7) is modeled at half an evidence package. If the organization requires a full, auditor-grade change record for every application change (UC-05 governance scenario), this should be upgraded to a full evidence package (4.0 units).

---

## 21. External Product Synergies

### Bob PPZ (Bob for Z Premium Package)

> This is the **primary Bob PPZ use case** — the workflow where Atlas and Bob PPZ integrate most deeply and where the combined experience is most differentiated from either product alone.

**Summary:** Every step in the To-Be flow involves either an explicit Bob PPZ handoff or a material enrichment. Atlas owns the system-level framing: impact assessment, environment provisioning, test orchestration, validation, and production promotion. Bob PPZ owns the code-level execution layer: understanding what the code does, planning the precise change, implementing it accurately, and returning the artifact to Atlas for validation.

#### Tier 1 — Explicit Handoff Points

**Step 1 → Step 3 — Assess Impact → Code (Primary Handoff)**

Atlas has produced a complete blast radius assessment. The developer now needs to write or modify the code that implements the change. Atlas passes the full environment context to Bob PPZ:
- The blast radius report — all affected programs, transactions, and data resources
- The dependency graph — which programs call the program being changed, which shared resources are at risk
- The specific programs in scope for modification
- The validation requirements Atlas will use to confirm the change before production promotion

In Bob PPZ, the developer opens the affected program(s) with full ZUnderstand application intelligence: what the program actually does, what business rules and data semantics are embedded, which variables carry the relevant data, and what the safe modification path looks like.

**What comes back to Atlas:** The completed code change artifact — modified source, updated copybooks, revised JCL if applicable.

---

**Step 4 — Generate Test Plan (partial handoff)**

For the scenarios Atlas has identified, Bob PPZ can enrich the test plan with code-level test targets: the specific procedure calls, EXEC CICS commands, or SQL statements that exercise the changed code constructs. Test coverage is anchored to the specific change, not just to the application.

---

**Step 5 — Validate (return handoff)**

If test failures are attributed to specific code dependencies, Atlas returns the failure context to the developer in Bob PPZ. The developer iterates: modifies the code in Bob PPZ, returns the updated artifact to Atlas, Atlas re-runs the relevant tests. This is the round-trip validation loop — a premium experience unique to the Atlas + Bob PPZ integration.

**What comes back to Atlas:** A passing code artifact with complete test evidence. Atlas produces the pre-production evidence package for the promotion decision.

---

**Step 6 — Deploy**

Bob PPZ has already delivered the change artifact. The deployment is Atlas-orchestrated. If deployment reveals an infrastructure configuration requirement not anticipated in the plan, Atlas may direct back to Bob PPZ for a targeted code adjustment.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Assess Impact (enrichment layer)**

When Bob PPZ is installed, the application layer of the blast radius assessment is enriched with ZUnderstand's code-level metadata:
- **Precise execution paths:** Which code paths through the affected program are actually invoked, and under what conditions
- **Business rule attribution:** Which business rules are embedded in the affected program
- **Coupling score:** ZUnderstand's coupling analysis quantifies how many programs depend on the program being changed

**Step 3 — Code (enrichment layer)**

When both Atlas and Bob PPZ are installed, Bob PPZ is enriched with Atlas's infrastructure context. Bob PPZ can surface topology-level context within the coding session: "This program runs in CICS region CICSPROD1, which is at 78% thread utilisation. A change that increases transaction CPU time risks breaching the MXT threshold."

**Step 4 — Generate Test Plan (enrichment layer)**

Test plans generated by Atlas are scoped to topology-identified test targets. When Bob PPZ is present, the test scenarios include code-level execution path coverage: Atlas identifies which transactions to test; Bob PPZ identifies which code paths within those transactions exercise the specific changed constructs.

> **Overall Bob PPZ relevance:** Very high — the highest of all use cases. The combined experience (Atlas → Bob PPZ → Atlas) is meaningfully better than Atlas alone. Without Bob PPZ, developers execute changes with topology context but without code-level intelligence. The one-sentence summary: *Atlas tells you what will break. Bob PPZ tells you how to fix it safely.*

---

### Concert for Z

**Summary:** Application change management is a pre-production (Day 0/Day 1) workflow owned entirely by Atlas. Concert for Z is a Day 2 product with no direct role in the developer change cycle. However, Concert for Z's ZEN runtime data enriches Atlas's blast radius assessment, its production behavioral baselines inform Atlas's validation criteria, and the change evidence Atlas produces becomes Concert for Z's primary context for any subsequent production incident.

#### Tier 1 — Explicit Handoff Points

None. Application change management is initiated by a developer, led by Atlas, and executed in Bob PPZ. Concert for Z does not trigger this workflow during the pre-production change cycle.

The relationship inverts post-deployment: if Concert for Z detects a production anomaly after the change is promoted, it queries Atlas's change record to understand what changed. That is a Concert for Z → Atlas enrichment flow, but it is post-deployment and outside the scope of this use case's To-Be flow.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Assess Impact**

Atlas's blast radius assessment uses ZEN runtime relationship data — which programs actually called which others during recent production execution — to distinguish active call paths from dormant static relationships. ZEN is delivered through Concert for Z's observability infrastructure (IBM Z Observability Connect). When Concert for Z is deployed, Atlas's blast radius is enriched with runtime-observed execution evidence, reducing false-positive blast radius entries.

**Step 5 — Validate**

The validation criteria — what "normal" behavior looks like for the affected transactions — are informed by Concert for Z's production behavioral baselines. Where Concert for Z has established SMF-derived performance baselines for the affected CICS transactions, Atlas's post-change test evaluation can compare test results against production norms rather than theoretical expectations.

**Step 6 — Deploy (post-deploy context)**

Atlas's complete change evidence package is the primary artifact Concert for Z uses if a production anomaly appears after deployment. The Atlas change record (including blast radius, test results, and authorization chain) provides immediate context for the Concert for Z incident investigation.

> **Overall Concert for Z relevance:** Low for explicit handoffs; moderate for enrichment. The pre-production developer workflow is entirely Atlas-owned. Concert for Z's value here is as the source of runtime data that makes Atlas's blast radius more accurate, and as the consumer of Atlas's change evidence in any subsequent production incident.

---

### Terraform Self-Managed for Z

**Summary:** Application change management is the most direct match to Terraform Synergy Use Case 2 — On-Demand Test Environment Provisioning with Infrastructure Parity. Every application change that Atlas manages requires a test environment, and the infrastructure layer of that test environment is precisely what Terraform provisions and manages. Atlas generates the provisioning specification; Terraform creates the actual LPAR or VM resources. Additionally, Terraform Synergy Use Case 4 — GitOps Change Governance — is relevant at the governance and record step.

#### Tier 1 — Explicit Handoff Points

**Step 3 — Test Environment Provisioned**

Atlas has completed the change impact analysis and is ready to provision an isolated test environment. Atlas passes the infrastructure specification to Terraform as an HCL configuration for the test workspace. Terraform provisions the LPAR or VM resources, enforces workspace isolation to prevent test resources from reaching production, and confirms successful provisioning back to Atlas.

**What comes back to Atlas:** A Terraform-provisioned test environment with infrastructure matching the production declaration. Atlas deploys the application configuration and software stack on top, then begins test generation and execution.

---

**Step 6 — Promote to Next Environment**

For each stage in the promotion pipeline, Atlas passes an environment specification to Terraform. Terraform provisions the stage environment, enforces lifecycle boundaries, and tears down the previous stage environment after promotion is confirmed. Terraform's workspace lifecycle log provides the infrastructure audit trail.

#### Tier 2 — Enrichment Touchpoints

**Step 2 — Impact Analysis**

When Atlas traces downstream impact, Terraform's workspace boundaries provide a structural risk dimension. Applications sharing a Terraform workspace share infrastructure dependencies and a common governance boundary. A change that crosses workspace boundaries is flagged by Atlas with elevated cross-boundary risk.

**Step 7 — Record**

When Terraform manages the test and production environments, its apply history for the relevant workspaces provides the infrastructure-layer change record. Terraform's immutable apply log — with timestamps, approver identities, and state diffs — is incorporated into the Atlas change record as the infrastructure evidence layer.

> **Overall Terraform relevance:** High. The test environment provisioning integration (Synergy UC-2) is a direct, operational touchpoint in every Atlas-managed application change pipeline. The combination delivers a repeatable, infrastructure-accurate test environment without manual HMC or ICIC work.
