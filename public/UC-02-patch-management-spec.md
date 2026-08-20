# UC-02: Patch Management
*Version 1.2 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

IBM Z organizations spend hours on manual patch impact analysis and often skip test validation due to time pressure — leaving production as the de facto test environment. Atlas automates impact analysis, generates sequenced test plans, and orchestrates patch execution with a full audit trail, turning the highest-risk change type on Z into a guided, repeatable workflow. The result is faster patch cycles, fewer PTF-related outages, and change traceability that satisfies audit requirements without manual assembly.

---

## 1. Overview

Patch Management is the highest-frequency change type on IBM Z. Organizations apply PTFs, middleware updates, and software patches on scheduled maintenance cycles and in response to security advisories — often without complete visibility into what will break, what must be sequenced, or whether the change is safe to promote to production.

Atlas transforms this from a manual, expert-dependent process into an intelligent, guided workflow: identifying what needs to be patched, understanding what is at risk, generating a sequenced plan, orchestrating a safe test environment, running validation, and creating a complete audit trail — all from a single interface.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When I need to apply patches to my z/OS environment, I want to understand exactly what will be affected, what must be sequenced correctly, and whether the change is safe — so I can apply patches on time without causing production outages. |
| **Emotional** | The systems programmer wants to feel confident that they have not missed a dependency or missequenced a change that will surface as an outage at 2:00 AM. |
| **Social** | The systems programmer and operations manager want to demonstrate to the business that Z change work is disciplined, traceable, and not a black box that only one person understands. |

---

## 3. Customer Problem and Outcome

**Problem:**
Applying patches on IBM Z requires deep knowledge of PTF prerequisite chains, co-requisites, and subsystem-level dependencies that most teams carry as tribal knowledge. A single missed prerequisite or incorrect sequencing decision can cause a production outage. Impact analysis is manual, time-consuming, and incomplete — most organizations cannot confidently answer "what will break if I apply this PTF?" without hours of investigation.

**Current State (Without Atlas):**
- Systems programmers query SMP/E for PTF inventory and prerequisite chains using ISPF dialogs; no natural language interface.
- Impact assessment requires manually cross-referencing PTF descriptions against the application topology — a process that relies on expert knowledge and is not documented anywhere.
- Test environments are provisioned manually, which is slow, error-prone, and often skipped due to time pressure, leaving production as the de facto test environment.
- Change records are assembled after the fact from memory and email threads, not from a continuous audit trail.
- Emergency patches bypass normal process because there is no fast-track workflow that is also safe; teams are forced to choose between speed and rigor.
- Rollback planning is informal. When a patch causes a problem, the remediation path is improvised.

**Desired Outcome:**
- A systems programmer can understand the full impact of any PTF batch in minutes, not hours.
- A test plan is generated automatically, tied to the specific change, and executed against a provisioned test environment.
- Patches are applied in the correct sequence the first time. Prerequisite chains are resolved by Atlas, not by the engineer.
- Every change step is captured in a searchable audit trail with no manual assembly.
- Emergency patches can be safely fast-tracked: full impact analysis and a function test cycle in one session, with a defensible decision record at the end.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Patch Management is the primary GA-day use case for Change Intelligence. It drives the Atlas Base subscription (GA Dec 2026) and creates natural upsell to Atlas Provision (full LPAR automation, H1 2027) and Atlas Test (integration/regression testing, H1 2027). This use case is the primary proof point for the Change Intelligence MVP. |
| **Retention impact** | Organizations that rely on Atlas for their quarterly patch cycle are structurally retained. The change data accumulated in Atlas over multiple cycles increases switching cost and reduces expert dependency, directly addressing the skills gap retention risk. |
| **Competitive differentiation** | No existing tool joins PTF inventory, application topology, and AI-generated test planning in a single workflow. SMP/E, ServiceNow, and individual monitoring tools each cover a fragment. Atlas is the only system that can answer "what will break and how do I verify it's safe?" in one session. |
| **Portfolio attach** | The test environment provisioning step in this use case creates demand for IBM Z virtualization capabilities. The middleware patch scenario (H1 2027) creates pull-through for IBM Z software products (CICS, Db2, MQ, IMS). |

> **Commercial constraints (internal):** Atlas Base rate-limits Change Intelligence test executions to create upsell pressure toward Atlas Test SKU. This constraint affects how Zach experiences the Validate phase — he will encounter execution limits on Atlas Base before reaching the full regression test capability. This detail is commercially sensitive; a business annex should document the specific limits and the in-product messaging at the gate.

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Zach — z/OS Systems Programmer (experienced) | Initiates, executes, owns the overall change outcome. Responsible for plan approval and production decision. |
| **Secondary** | Stan — Subsystem SME (CICS, Db2, MQ, IMS archetype) | Subject-matter expert for the specific subsystem being patched. Reviews and approves the subsystem-specific impact analysis and patch plan before Zach promotes to production. Primary actor in S3 (Middleware Software Update). Also applies to Db2 DBAs, MQ admins, and IMS systems programmers in their respective subsystem patch scenarios. |
| **Secondary** | Alice — z/OS Systems Programmer (mid-level) | Executes delegated patch work under Zach's oversight. Benefits most from Atlas-generated plans and checklists that reduce dependency on Zach's expertise. |
| **Secondary** | Annette — IT Operations Engineer | Monitors change execution, reviews change records, escalates anomalies. Consumes Atlas output but does not initiate the workflow. |
| **Approver (not a primary user)** | Quinn — IT Operations Manager | Reviews risk assessment and approves production promotion. Needs a clear, non-technical summary of what is being changed and why it is safe. |

**Persona interaction pattern for middleware patches (S3):** Stan is the subject-matter expert Atlas consults for subsystem-level impact. Atlas surfaces subsystem-specific analysis to Stan, captures his sign-off on the subsystem patch plan, then returns the consolidated plan to Zach for the production promotion decision. Zach retains final authority; Stan owns the subsystem scope within the plan.

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **Change Intelligence** | **Primary.** This is the canonical Change Intelligence use case. Impact analysis, test plan generation, environment provisioning, patch orchestration, and rollback planning are all Change Intelligence capabilities. | Dec 2026 (Lean PTF MVP); H1 2027 (full) |
| **System Intelligence** | **Foundational.** Change Intelligence cannot function without System Intelligence. The living topology model — knowing what is installed, what depends on what, and what is running — is the data source for all impact analysis. PTF inventory and software currency checks are System Intelligence capabilities. | GA Dec 2026 |
| **Predictive Intelligence** | **Supporting (future).** Post-apply monitoring, drift detection after patch, and proactive PTF gap alerts are Predictive Intelligence capabilities. They extend this use case in H2 2027 and beyond. | H2 2027 |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate |
|---|---|---|---|
| Routine Quarterly PTF Maintenance | **Current** | GA Dec 2026 | Lean PTF Orchestration MVP |
| Emergency Security Patch | **Current (conditional)** | GA Dec 2026 (if zSecure Portal integration available); H1 2027 (otherwise) | Vulnerability PTF handling; zSecure Portal dependency |
| Middleware Software Update (CICS, Db2, MQ) | **Planned** | H1 2027 | MW/SW patch orchestration capability |
| Patch Rollback After Failed Validation | **Planned** | H1 2027 | Atlas-native LPAR provisioning; rollback orchestration |
| Vendor-Recommended Upgrade | **Planned** | H1 2027 | Target-level gap analysis; phased rollout planning |

**GA Dec 2026 capability scope (Lean PTF Orchestration):**
The GA scenario delivers the core loop: AI-assisted impact analysis → Atlas-generated test plan → DIY L2 virtual LPAR provisioning → application component deployment → function test package execution. The LPAR provisioning at GA is customer-operated (DIY engine); full Atlas-native provisioning automation arrives in H1 2027.

> ⚠️ **Monoplex restriction:** At GA, test environments are restricted to monoplex configurations (single z/OS image, no Parallel Sysplex). The provisioned L2 virtual LPAR is a monoplex. Sysplex test environments are out of scope for GA.

---

## 8. Scope and Boundaries

**In Scope:**
- PTF identification: what is missing, what is at risk, what is security-relevant
- Impact and dependency analysis: affected subsystems, applications, prerequisite chains
- Test plan generation: what to test, in what order, against what environment configuration
- Test environment provisioning: L2 virtual LPAR creation (monoplex) scoped to the change
- **Application Deployment Engine (GA):** Shared Atlas capability that deploys application components from the Atlas topology model into a provisioned environment after provisioning and before test execution; required for any change scenario involving application-level validation
- Test execution: smoke and function tests at GA; integration and regression tests at H1 2027
- Change execution orchestration: sequenced patch apply with progress tracking
- Rollback planning and execution: known-good state preservation and recovery sequencing
- Governance artifact generation: change records, audit trail, ServiceNow integration
- Middleware patches (CICS, Db2, MQ, IMS) — H1 2027

**Out of Scope:**
- Security vulnerability triage and CVE exposure assessment — owned by UC-01 (Vulnerability Remediation). The Emergency Security Patch scenario in this use case begins after exposure is confirmed and the remediation PTF is identified; the triage step is UC-01.
- Application code changes — owned by UC-07 (Application Change Management).
- Platform or z/OS version upgrades — owned by UC-08 (Platform Upgrade and Migration).
- Capacity planning — owned by UC-11 (Capacity Planning and Performance Readiness).
- **Unit testing** — out of scope at GA; unit test capability scope and enabling technology are not defined for the GA release.
- **Batch testing** — out of scope at GA; batch test scope, environment requirements, and enabling technology require separate definition (target: post-GA).
- **Sysplex test environments** — GA test execution is restricted to monoplex virtual LPARs. Cross-sysplex testing is a future capability.
- **Sysplex-to-monoplex transformation** — Atlas does not automate conversion of a sysplex configuration to a monoplex test environment. This transformation is not in scope for any Atlas GA release.

**Non-Goals:**
- Atlas does not execute production changes autonomously. Human authorization is required before any production apply.
- Atlas does not replace SMP/E. It orchestrates against SMP/E; the actual PTF installation mechanism remains SMP/E.
- Atlas does not manage IBM software contracts or license entitlement.

**Interoperability note — IBM Z Upgrade Agent (ZUA):**
ZUA is a wxa4z skill that front-ends z/OSMF for chat-guided PTF acquisition and SMP/E installation. It is not a competing product — it runs as a skill inside the Atlas WXA4Z chat layer and operates as the execution primitive for the steps in the Execute phase of this use case. Atlas provides the intelligence layer on top: impact analysis, sequencing, test planning, and test environment provisioning. ZUA provides the z/OSMF execution. See [`positioning/atlas-and-zua-positioning.md`](../positioning/atlas-and-zua-positioning.md).

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The customer environment has been discovered and the Atlas topology model is current. Atlas cannot perform impact analysis without an up-to-date living model of the environment. |
| **Assumption** | PTF inventory data is available via IZSAM Lite integration. PTF currency data is accessible from ibm.com via the PTF availability skill. |
| **Assumption** | The customer has a maintenance window policy. Atlas generates plans around maintenance windows; it does not override the customer's change control calendar. |
| **Assumption** | At GA, the customer operates the L2 virtual LPAR provisioning engine themselves. Full Atlas-native provisioning automation is not available until H1 2027. |
| **Assumption** | ⚠️ **Monoplex constraint (GA):** At GA, test environments are restricted to monoplex configurations (single z/OS image). Customer production environments may be sysplex configurations; Atlas provisions a monoplex L2 virtual LPAR for testing regardless of production topology. This constraint must be communicated to customers evaluating the use case. |
| **Dependency** | Emergency Security Patch scenario depends on the zSecure Portal team integration being available. If not ready at GA, this scenario ships H1 2027. |
| **Dependency** | Middleware patch scenarios (CICS, Db2, MQ) depend on MW/SW patch orchestration capability landing in H1 2027. |
| **Dependency** | ServiceNow change record integration is required for the governance artifact generation capability. |
| **Dependency** | **Application Deployment Engine (GA required):** The Validate phase requires the Application Deployment Engine to deploy application components from the Atlas topology model into the provisioned L2 virtual LPAR before test execution can begin. This is a shared GA Atlas capability. |
| **Dependency** | **Application topology (ZUnderstand / ZoC) for application-level impact:** PTF impact claims at the application level — identifying which application transactions, CICS regions, or Db2 plans are affected — depend on application topology data from ZUnderstand or ZoC. Without this data, impact analysis is limited to subsystem-level claims only. |
| **Risk** | If the topology model is stale (discovery has not been re-run after a recent environment change), impact analysis may miss newly introduced dependencies. Atlas should surface a model freshness indicator and warn the user. |
| **Risk** | The DIY LPAR provisioning engine at GA requires significant customer effort and expertise. Low adoption of the test environment step could undermine confidence in the use case until Atlas-native provisioning arrives in H1 2027. |
| **Risk** | ⚠️ **AI test plan fidelity:** The AI-generated test plan at GA depends on test inventory quality, the scope of the living topology model, and the fidelity of the PTF impact analysis. Required inputs, test inventory coverage, and plan quality are not yet validated against a representative customer environment. Test plan quality should be treated as a GA risk until validated. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifacts |
|---|---|---|---|---|---|---|
| S1 | Routine Quarterly PTF Maintenance | Scheduled maintenance cycle; Zach opens Atlas to assess the PTF batch for the upcoming window | Current — GA Dec 2026 | Yes (GA) | UX Flow, Chat Exchange, Screen designs | TBD |
| S2 | Emergency Security Patch | Security advisory or CVE remediation (fed from UC-01); short remediation window requires fast-track | Current (conditional) — GA Dec 2026 or H1 2027 | Yes (GA) — conditional on zSecure integration | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc1-patch-orchestration.md`](../design/flows/uc1-patch-orchestration.md) (Steps 4–9) |
| S3 | Middleware Software Update | IBM releases a CICS, Db2, MQ, or IMS update; Stan (subsystem SME) identifies the need and coordinates with Zach to plan and apply a subsystem-level patch | Planned — H1 2027 | H1 2027 | UX Flow, Chat Exchange, Screen designs | TBD |
| S4 | Patch Rollback After Failed Validation | Test environment or post-apply monitoring reveals a failure; rollback must be sequenced and documented | Planned — H1 2027 | H1 2027 | UX Flow, Chat Exchange | TBD |
| S5 | Vendor-Recommended Upgrade | IBM recommends a specific PTF level for a product upgrade path; gap analysis and remediation plan needed | Planned — H1 2027 | H1 2027 | UX Flow, Chat Exchange, Screen designs | TBD |

**Relationships between scenarios:**
- S2 (Emergency Security Patch) overlaps significantly with UC-01 Scenario: Emergency CVE Response. The distinction is trigger: UC-01 owns exposure detection and decision-making; S2 owns execution from the moment the remediation PTF is identified.
- S1 (Routine Quarterly) is the primary demo scenario for GA. All GA Change Intelligence demonstration should use this scenario.
- S4 (Rollback) is a failure-path extension of S1 and S3. It should be documented as a shared sub-scenario rather than a standalone scenario once the rollback workflow is designed.

---

## 11. Lifecycle Overview

The Patch Management lifecycle applies across all scenarios. Scenarios vary the trigger and scope; the phase structure is consistent.

```
Detect → Analyze → Plan → Provision → Deploy → Validate → Decide → Execute → Govern
```

| Phase | What Happens | Primary Actor | Atlas Role |
|---|---|---|---|
| **Detect** | Atlas surfaces missing or at-risk PTFs proactively, or the user asks about PTF state. Security-flagged PTFs are highlighted. For middleware patches (S3), Atlas surfaces subsystem-specific maintenance gaps to Stan (or the relevant subsystem SME) as well as Zach. | Atlas (proactive) or User (query) | Joins PTF inventory with ibm.com currency data and FIXCAT classification; surfaces gaps with context |
| **Analyze** | Atlas maps the impact of the proposed changes: affected subsystems, applications, prerequisite chains, restart requirements, and estimated maintenance window duration. For middleware patches, Atlas surfaces subsystem-specific impact to the relevant subsystem SME (Stan) for review. | Atlas | Topology-aware impact analysis; prerequisite chain resolution; blast radius calculation |
| **Plan** | Atlas generates a sequenced patch plan: acquisition steps, dependency order, deployment sequence, test environment specification, and test scenario list. Test-data requirements are identified in this phase; at GA, test data preparation is a manual step performed by the customer before the Validate phase. For middleware patches, Stan reviews and approves the subsystem scope of the plan before Zach signs off on the full change. | Atlas | AI-generated plan anchored to the actual environment topology; user can edit, annotate, and share |
| **Provision** | A monoplex L2 virtual LPAR is provisioned that mirrors the affected production configuration. At GA, this is a monoplex environment regardless of production topology. | User (GA) / Atlas (H1 2027) | At GA: DIY engine with Atlas configuration input. At H1 2027: Atlas-native LPAR provisioning automation |
| **Deploy** | Application components from the Atlas topology model are deployed into the provisioned monoplex environment. This step is required before test execution can begin. Ownership: Application Deployment Engine (shared Atlas GA capability). | Atlas (Application Deployment Engine) | Deploys application components from the topology into the provisioned environment; validates deployment state before handing off to Validate phase |
| **Validate** | Atlas applies the patches to the test environment in sequence and runs the test package. Smoke and function tests at GA; integration and regression tests at H1 2027. Results are surfaced with pass/fail detail and failure context. For middleware patches, Stan reviews subsystem-specific test results before Zach makes the production promotion decision. | Atlas | Automated test execution; failure attribution; CSD and configuration update generation when needed |
| **Decide** | The user reviews test results and Atlas's recommendation. They approve production promotion or request changes to the plan. For middleware patches: Stan approves the subsystem plan; Zach authorizes production promotion. | Zach (final authority) / Stan (subsystem sign-off) | Atlas presents a clear recommendation with supporting evidence. Governance gate — no production action without explicit user approval. |
| **Execute** | Atlas orchestrates the production apply: patch acquisition, sequenced application, LPAR restarts in maintenance window order, real-time progress visibility. For middleware patches, Stan monitors subsystem behavior during and immediately after apply. | Atlas (orchestrates) / User (authorizes) | Transparent step-by-step execution with reasoning visible; user can pause or abort |
| **Govern** | Atlas generates the change record, attaches plan, test results, and execution log. ServiceNow record created or updated. Audit trail sealed. | Atlas | Complete traceability from detection through production apply; no manual assembly required |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| PTF gap detection and currency analysis | **Atlas** | Continuous; no user prompt required once environment is connected |
| Impact analysis and prerequisite chain resolution | **Atlas** | AI-driven; based on living topology model |
| Subsystem-specific impact review (middleware patches) | **Stan / subsystem SME** | Stan reviews the subsystem scope of the impact analysis before the plan is finalized. Required for S3 and any scenario touching CICS, Db2, MQ, or IMS. |
| Test plan generation | **Atlas** | User may edit and annotate; Atlas generates the baseline |
| Subsystem patch plan approval (middleware patches) | **Stan / subsystem SME** | Stan approves the subsystem scope of the patch plan. Zach retains final authority over the full change. |
| Test environment configuration specification | **Atlas** | User operates provisioning engine at GA; Atlas provides the specification |
| Test environment provisioning (GA) | **User** | DIY engine; Atlas provides configuration; human executes. Environment is a monoplex L2 virtual LPAR at GA. |
| Test environment provisioning (H1 2027+) | **Atlas** | Full LPAR automation; user approves the provisioning action |
| Application component deployment into test environment | **Atlas (Application Deployment Engine)** | Shared GA capability; deploys application components from topology into the provisioned environment; required before test execution |
| Test execution and result analysis | **Atlas** | Automated; Atlas surfaces pass/fail with attribution. GA scope: smoke and function tests only on monoplex environments. |
| Subsystem test result review (middleware patches) | **Stan / subsystem SME** | Stan reviews subsystem-specific test results before Zach approves production promotion. |
| Failure interpretation and plan adjustment | **Shared** | Atlas identifies failure cause and proposes fix; user validates before plan is updated |
| Production promotion decision | **Zach (primary) / Stan (subsystem sign-off)** | Governance gate. For middleware patches, Stan's sign-off on the subsystem scope is captured before Zach authorizes production promotion. |
| Production patch execution sequencing | **Atlas** | Orchestrated; user authorizes each production step |
| Change record creation and governance artifact assembly | **Atlas** | Automated; no manual assembly required |
| Risk acceptance for production apply | **User** | Cannot be delegated to Atlas. Explicit approval required before any production mutation. |
| Maintenance window scheduling | **User** | Atlas respects the customer's change calendar; it does not set maintenance windows |

**Governance gates — explicit human approval required before:**
1. Test environment provisioning (at GA: user executes; at H1 2027+: user approves Atlas action)
2. Application component deployment into provisioned environment (Application Deployment Engine — user authorizes)
3. Promotion from test validation to production execution
4. Each production LPAR patch apply (Atlas requests authorization per system)

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Topology-aware impact analysis** | Atlas joins the PTF description with the living environment model to produce a specific, accurate blast radius — which CICS regions, Db2 subsystems, applications, and transactions are affected by this exact PTF batch on this exact environment. | Manual impact analysis requires the engineer to mentally traverse the dependency graph using knowledge accumulated over years. Most teams cannot do this completely. Atlas makes it instant and auditable. |
| **Prerequisite chain resolution** | Atlas automatically resolves PTF co-requisite and prerequisite chains and produces the correct apply sequence. The user does not need to understand SMP/E resolution rules. | Missed prerequisites are one of the most common causes of PTF-related production failures. Automating this eliminates a category of human error. ⚠️ **Caveat (internal):** Cross-product prerequisite-chain resolution (reasoning across fix chains that span multiple IBM products) is in progress and targeted for GA or GA+1. This capability has not yet been validated against a representative cross-product fix-chain scenario. Do not use cross-product prereq-chain resolution in external messaging or customer demonstrations until validated. Withdraw from Proof Point 3 materials if not validated by Dec 11 2026. |
| **AI-generated test plan** | Given the specific change and environment, Atlas generates a test scenario list, environment specification, and test coverage rationale — not a generic checklist. | Teams routinely skip or underscope testing because creating a good test plan takes significant expert time. Atlas generates a defensible test plan in seconds. ⚠️ **GA risk:** Test plan fidelity depends on test inventory quality and topology model completeness. Required inputs and plan quality are not yet validated against a representative customer environment. Treat as a GA risk until validated. |
| **Failure attribution during test** | When a test fails, Atlas correlates the failure to the specific PTF or configuration interaction that caused it, and generates the required fix (e.g., a CSD update). | Without this, test failures require the engineer to investigate from scratch. Atlas shortens the debugging cycle from hours to minutes. |
| **Natural language change interface** | The engineer interacts with the entire workflow — detection, analysis, planning, validation, execution — through natural language conversation. No ISPF dialogs, no SMP/E commands, no manual cross-referencing. | Reduces the skill barrier for patch work. Allows mid-level engineers (Alice) to execute work that today requires Zach. |
| **Continuous proactive detection** | Atlas does not wait to be asked. It surfaces PTF gaps as they appear — against current RSU levels, FIXCAT classifications, and security advisories — before a vulnerability becomes an incident. | Reactive patch management is a risk posture. Atlas enables a proactive posture without adding ongoing manual monitoring work. |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| **Time to impact analysis** | Time from "I need to apply these PTFs" to a complete, actionable impact analysis document | 4–8 hours (manual, expert-dependent) | Under 30 minutes |
| **Time to test plan** | Time from impact analysis to a ready-to-execute test plan | 2–4 hours additional | Under 15 minutes (Atlas-generated) |
| **PTF-related production outages** | Number of outages caused by insufficient pre-change validation per quarter | Baseline to be established at first customer | 50% reduction within 2 patch cycles |
| **Change record completeness** | % of patch changes with complete, auditor-ready change records | Typically 30–60% (most assembled from memory) | 100% (Atlas-generated for every change) |
| **Test environment step adoption** | % of patch changes that include a validated test cycle before production apply | Varies; estimated 40–70% at best practice shops | 80%+ (target once Atlas-native provisioning is available) |
| **Time-to-remediation (emergency patch)** | Time from security advisory to production patch applied | 5–15 business days (typical enterprise) | Under 3 business days for CRIT/HIGH PTFs |
| **Patch cycle delegated to non-senior staff** | % of routine patch cycles executed by Alice-level engineers without Zach oversight | Near 0% (expertise dependency) | 40%+ within 6 months of Atlas Test SKU availability |

**Leading indicators (behavior):**
- Weekly patch analysis artifacts generated per connected environment
- Number of test plans generated per change cycle
- Rate of plan-edit vs. plan-accept (high edit rate may indicate plan quality issue)

**Lagging indicators (outcome):**
- PTF-related outage rate
- Time-to-remediation for security patches
- Audit finding rate related to change traceability

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| **Topology model is stale** | Atlas detects that the last discovery run predates the proposed change window and surfaces a freshness warning before generating the impact analysis. | User triggers a re-discovery run, or accepts the risk and proceeds with a model-staleness caveat attached to the artifact. |
| **PTF has undocumented prerequisites** | Atlas generates the plan based on available SMP/E data. If prerequisites are discovered during the test apply, Atlas flags them, updates the plan, and requests re-validation. | User reviews the updated plan and approves before re-running the test cycle. |
| **Test environment provisioning fails (GA DIY engine)** | Atlas surfaces the provisioning error with diagnostic detail. Because the GA engine is customer-operated, the failure is outside Atlas's control. | User resolves the provisioning issue and re-triggers the validation step. Atlas retains the plan and test configuration so no work is lost. |
| **All tests pass but production apply fails** | Atlas captures the failure state, compares production configuration to test environment, and identifies the delta that caused the divergence. | User reviews the analysis, updates the plan to address the delta, and re-validates before re-attempting production apply. |
| **Rollback required after production apply** | Atlas sequences the rollback using the known-good state captured before apply. Generates a rollback change record. | User authorizes each rollback step. Atlas tracks rollback progress and validates the environment has returned to baseline. |
| **Emergency patch arrives outside maintenance window** | Atlas generates the fast-track impact analysis and test plan on demand. It does not override the customer's change control policy. | User uses Atlas output to build the emergency change record and request an emergency change window through their change management process. Atlas generates supporting documentation. |
| **zSecure Portal integration unavailable at GA** | Emergency Security Patch scenario scoped to maintenance-driven PTFs only at GA. Security-driven PTF path is flagged as coming in H1 2027. | User follows manual process for vulnerability-driven patches until H1 2027 capability is available. Atlas can still provide impact analysis for the PTF even without the zSecure integration. |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **Change record traceability** | Every production change on z/OS requires a change record that documents what was changed, why, who approved it, and what the validation evidence is. | Atlas generates a complete change artifact — plan, test results, execution log, approval chain — and can push it to ServiceNow as a change record attachment. |
| **Test evidence preservation** | Many compliance frameworks (SOX, PCI) require evidence that changes were tested before production apply. | Atlas preserves test results, test environment configuration, and pass/fail detail as immutable artifacts linked to the change record. |
| **Production authorization gate** | No production change should execute without explicit named authorization. | Atlas enforces a hard stop before any production action. Authorization is captured in the change artifact with timestamp and user identity. |
| **Audit trail continuity** | The change record must be complete even if the patch cycle spans multiple sessions or is executed by different engineers. | All Atlas artifacts are persisted to the environment record. The change history is continuous, not session-scoped. |
| **Rollback documentation** | If a change is reversed, the rollback must itself be documented as a change event. | Atlas generates a rollback change record automatically when a rollback is initiated, linked to the original change event. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-01: Vulnerability Remediation | Feeds into Patch Management. When UC-01 identifies a CVE remediation PTF, the execution path (apply, test, promote) runs through UC-02. The Emergency Security Patch scenario is the convergence point. UC-01 owns detection and risk assessment; UC-02 owns execution. |
| UC-03: Audit and Compliance | Consumes Patch Management output. Compliance evidence for patch currency, change traceability, and test validation is generated by UC-02 and consumed by UC-03. |
| UC-06: Change Readiness and Health Assessment | Feeds into Patch Management. Health Check findings frequently surface PTF gaps as a pre-change risk. Atlas should link directly from a Health Check finding to initiating a UC-02 workflow. |
| UC-07: Application Change Management | Adjacent, not overlapping. UC-07 covers application code changes; UC-02 covers z/OS and middleware patches. They share the test planning and provisioning infrastructure but have distinct triggers and impact analysis models. |
| UC-08: Platform Upgrade and Migration | Adjacent. Platform upgrades are a superset of patch management — they may include PTFs as part of a larger migration plan. UC-08 should reference UC-02's PTF orchestration capability for the patch component of upgrades. |
| UC-14: Change Governance and Traceability | UC-02 generates the evidence that UC-14 governs. The change record, audit trail, and ServiceNow integration in UC-02 are the primary data producers for UC-14's governance workflows. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Atlas-native LPAR provisioning (full automation)** | H1 2027 | Replaces DIY engine from GA. Atlas orchestrates the full provisioning cycle without customer-operated infrastructure. This is the most significant near-term improvement to this use case. |
| **Integration and regression test orchestration** | H1 2027 | GA delivers smoke and function tests only. H1 2027 adds integration tests (broader coverage) and regression tests (automated regression suite execution with change attribution). |
| **Middleware patch orchestration (CICS, Db2, MQ, IMS)** | H1 2027 | Extends the use case from z/OS base PTFs to subsystem-level software patches, which carry higher complexity and higher risk. |
| **Vulnerability PTF fast-track (if not at GA)** | H1 2027 | Security-driven PTF path with zSecure Portal integration. Reduces time-to-remediation for CVE-flagged PTFs. |
| **Batch testing support** | H1 2027+ | GA scope excludes batch testing. Batch test execution requires scope definition, environment requirements, and enabling technology work beyond the GA release. |
| **Cross-sysplex test environments** | H1 2027+ | GA test environments are restricted to monoplex configurations. Supporting sysplex test topologies requires additional provisioning and orchestration work. |
| **Optim integration for test-data management** | H2 2027+ | Future integration with IBM Optim for automated test-data generation and synthetic data management. At GA, test-data preparation is a manual step. This is a future direction item only; Optim is not a GA dependency. |
| **Proactive patch currency monitoring** | H2 2027 | Predictive Intelligence extension: Atlas monitors PTF currency continuously and surfaces at-risk gaps before they become security events, without waiting for a user prompt. |
| **Post-apply drift detection** | H2 2027 | Atlas monitors the post-patch environment for unexpected configuration drift and alerts before the drift becomes an incident. |
| **Autonomous patch execution (supervised)** | 2028+ | For low-risk, routine PTF batches that have cleared all validation steps, Atlas proposes an autonomous execution path with human approval at defined checkpoints only. Reduces the human effort for well-understood change patterns. |
| **Cross-environment patch coordination** | 2028+ | Orchestrate patch application across multiple LPARs, sysplexes, or DR environments as a single coordinated operation with dependency-aware sequencing across systems. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-02](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status |
| [`atlas-use-case-taxonomy.md`](../atlas-use-case-taxonomy.md) | Scenario catalog structure and naming |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase-by-phase capability availability, GA scope definition, H1 2027 expansion scope, NSM and product outcomes |
| [`use-cases/atlas_patch_management_use_case copy.md`](atlas_patch_management_use_case%20copy.md) | End-to-end workflow model (Detect → Analyze → Plan → Execute → Validate → Govern), core system behaviors, governance and traceability requirements |
| [`design/flows/uc1-patch-orchestration.md`](../design/flows/uc1-patch-orchestration.md) | Emergency Security Patch execution flow (Steps 4–9); test environment provisioning and failure attribution patterns; CSD update generation example |
| [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) | Bank of Z environment data grounding; PTF inventory patterns (CICSTS62, UI89234, FIXCAT); capability milestone gates |
| [`personas.md`](../personas.md) | Canonical persona definitions for Zach, Alice, Annette, Quinn, Stan (subsystem SME archetype) |
| [`personas/stan-cicero-persona.md`](../personas/stan-cicero-persona.md) | Source persona detail for Stan — Senior CICS Systems Programmer; basis for subsystem SME archetype |
