# UC-06: Patch Management — Composite Reference

> **New UC number:** UC-06 (merged from old UC-02 Patch Management + old UC-01 Vulnerability Remediation)
> **Sources consolidated:** Spec v1.4 (GitHub), Pain & Wows (old UC-02 primary + old UC-01 for S2), Units (old UC-02 primary + old UC-01 for S2), Bob PPZ (old UC-02), Concert for Z (old UC-02), Terraform (old UC-02)
>
> **Merge note:** Old UC-01 (Vulnerability Remediation) was retired as a standalone use case and absorbed into this spec. Scenario S2 (Security PTF Application) represents the CVE/FIXCAT-driven security remediation path formerly covered by UC-01. The blast radius assessment and Sage persona engagement from UC-01 are now S2 entry points within this use case.

---

## Part 1 — Use Case Specification

*Version 1.4 | Owner: Product Management | Last updated: 2026-Q4*

### Executive Summary

IBM Z organizations spend hours on manual patch impact analysis and often skip test validation due to time pressure — leaving production as the de facto test environment. Atlas automates impact analysis, generates sequenced test plans, and orchestrates patch execution with a full audit trail, turning the highest-risk change type on Z into a guided, repeatable workflow. The result is faster patch cycles, fewer PTF-related outages, and change traceability that satisfies audit requirements without manual assembly.

### Overview

Patch Management is the highest-frequency change type on IBM Z. Organizations apply PTFs, middleware updates, and software patches on scheduled maintenance cycles and in response to security advisories — often without complete visibility into what will break, what must be sequenced, or whether the change is safe to promote to production.

**Patch scope covered at GA Dec 2026:**

| Patch Type | Examples | GA Status |
|---|---|---|
| **z/OS PTFs (OS)** | RSU, HIPER, PE, FIXCAT-flagged PTFs | ✅ GA |
| **Middleware (MW)** | CICS, Db2, MQ, IMS patches | ✅ GA |
| **Software (SW)** | IBM products, 3rd-party ISV software that publishes fixes | ✅ GA |
| **Firmware** | Hardware microcode, I/O firmware | ❌ Not GA (Post-GA, date TBD — requires Project Gravity) |

### Roadmap Status

| # | Scenario | Origin | Status | Target |
|---|---|---|---|---|
| S1 | Routine PTF Maintenance (z/OS PTFs) | UC-06 | **Current** | GA Dec 2026 |
| S2 | Security PTF Application (CVE/FIXCAT-driven) | Merged from UC-01 | **Current (conditional)** | GA Dec 2026 (if Z Security Portal available); H1 2027 otherwise |
| S3 | Middleware and Software Patch Orchestration | UC-06 | **Current** | GA Dec 2026 |
| S4 | Patch Rollback After Failed Validation | UC-06 | **Planned** | H1 2027 |
| S5 | Firmware Patch Orchestration | UC-06 | **Planned (date TBD)** | Post-GA |

**S2 delivery gate note:** S2 requires RBAC permissions from the Z Security Portal for the security advisory feed integration. All other steps are identical to S1. When the Z Security Portal integration is confirmed, S2 is fully enabled at GA without structural change.

### Primary Personas

- **Zach** — z/OS Systems Programmer (primary): initiates, executes, owns overall change outcome
- **Sage** — Security Administrator: tracks open CVEs and security advisories; owns the S2 security posture conversation; elevated from merged UC-01
- **Stan** — Subsystem SME (CICS, Db2, MQ, IMS archetype): subject-matter expert for S3 middleware patches; reviews and approves subsystem-specific impact analysis
- **Alice** — z/OS Systems Programmer (mid-level): executes delegated patch work
- **Quinn** — IT Operations Manager: reviews risk assessment, approves production promotion

### Pillar Alignment

| Pillar | Role |
|---|---|
| **Change Intelligence** | **Primary** — this is the canonical Change Intelligence use case: impact analysis, test plan, provisioning, orchestration, rollback |
| **System Intelligence** | **Foundational** — living topology model is the data source for all impact analysis; PTF inventory |
| **Predictive Intelligence** | **Supporting (future)** — post-apply monitoring, drift detection after patch, proactive PTF gap alerts |

### Lifecycle

```
Detect → Analyze → Plan → Provision → Deploy → Validate → Decide → Execute → Govern
```

| Phase | Primary Actor | Atlas Role |
|---|---|---|
| **Detect** | Atlas (proactive) or User | Joins PTF inventory with ibm.com FIXCAT; surfaces gaps with context |
| **Analyze** | Atlas | Topology-aware impact analysis; prerequisite chain resolution; blast radius calculation |
| **Plan** | Atlas | AI-generated plan anchored to actual environment topology |
| **Provision** | User (GA) / Atlas (H1 2027) | DIY engine with Atlas configuration input at GA; Atlas-native at H1 2027 |
| **Deploy** | Atlas (Application Deployment Engine) | Deploys application components from topology into provisioned environment |
| **Validate** | Atlas | Automated test execution; failure attribution; CSD update generation when needed |
| **Decide** | Zach (final) / Stan (subsystem S3 sign-off) | Governance gate — no production action without explicit user approval |
| **Execute** | Atlas (orchestrates) / User (authorizes) | Transparent step-by-step execution with reasoning visible |
| **Govern** | Atlas | Complete traceability from detection through production apply; no manual assembly |

⚠️ **Monoplex constraint (GA):** Test environments are restricted to monoplex configurations at GA. Customer production environments may be sysplex; Atlas provisions a monoplex L2 virtual LPAR for testing regardless.

### Scenario Catalog

| # | Scenario | Status | Delivery Gate |
|---|---|---|---|
| S1 | Routine PTF Maintenance (z/OS PTFs) | Current — GA Dec 2026 | None |
| S2 | Security PTF Application (CVE/FIXCAT-driven) | Current (conditional) — GA Dec 2026 | ⚠️ Z Security Portal RBAC |
| S3 | Middleware and Software Patch Orchestration | Current — GA Dec 2026 | MW/SW patch orchestration capability |
| S4 | Patch Rollback After Failed Validation | Planned — H1 2027 | Atlas-native LPAR provisioning |
| S5 | Firmware Patch Orchestration | Planned — Post-GA, date TBD | Project Gravity integration |

### AI Differentiation

- **Topology-aware impact analysis** — specific, accurate blast radius for each PTF on each environment; not a generic risk flag
- **Prerequisite chain resolution** — automatically resolves co-requisite and prerequisite chains; eliminates a primary cause of PTF-related outages
- **AI-generated test plan** — scoped to the specific change and environment, not a generic checklist
- **Failure attribution during test** — correlates test failures to specific PTF or configuration interaction; generates required fix
- **Natural language change interface** — entire workflow in conversation; no ISPF, no SMP/E commands
- **Continuous proactive detection** — surfaces PTF gaps before they become incidents

### Related Use Cases

- UC-01 (Audit and Compliance): patch history is compliance evidence; missing security PTFs are audit findings
- UC-04 (Change Readiness): health check findings frequently surface PTF gaps; FIXCAT gaps trigger S2 path
- UC-07 (Application Change Management): shares test planning and provisioning infrastructure
- UC-08 (Platform Upgrade and Migration): platform upgrades include PTF orchestration as a component
- UC-10 (Environment Parity): if a PTF applies to production but not QA/DR, UC-10 drift detection surfaces it
- UC-05 (Change Governance): UC-06 generates the evidence that UC-05 governs

---

## Part 2 — Pain & Wows Flow Analysis

> **Pillar:** Change Intelligence (primary) + System Intelligence (impact analysis)
> **GA Status:** GA Dec 2026 (PTF/z/OS patches); H1 2027 (middleware patches)
> **Sources:**
> - **S1 (Routine PTF Maintenance):** `use-case-pain-wows/UC-02-patch-management.md` (old UC-02)
> - **S2 (Security PTF Application):** `use-case-pain-wows/UC-01-vulnerability-remediation.md` (old UC-01, merged in)

### S1 — Routine PTF Maintenance

#### As-Is Flow — Current State (Without Atlas)

##### Step 1 — Detect
**Brief:** Systems programmer identifies that patches are needed — through a scheduled maintenance review, an advisory, or a subsystem SME raising a concern.

**Personas involved:** Zach, Stan

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Querying SMP/E for PTF inventory and prerequisite chains requires ISPF dialogs with no natural language interface — slow and expert-dependent. | ⏱️ Lost Time — **2–4 hours** per environment just to understand current PTF state |
| Stan | Subsystem-specific maintenance gaps (CICS, Db2, MQ) are not surfaced automatically — Stan must monitor IBM fix lists and product announcements manually. | ⏱️ Lost Time — **hours per quarter** monitoring maintenance bulletins across subsystems |

---

##### Step 2 — Analyze
**Brief:** Determine what the proposed patches will affect — subsystems, applications, prerequisite chains, restart requirements, and estimated maintenance window duration.

**Personas involved:** Zach, Stan

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Impact assessment requires manually cross-referencing PTF descriptions against application topology — a process relying entirely on expert knowledge not documented anywhere. | ⏱️ Lost Time — **4–8 hours** of manual analysis per patch batch |
| Zach | Most organizations cannot confidently answer "what will break if I apply this PTF?" without hours of multi-team investigation. | 💼 Business Impact — changes proceed with incomplete impact knowledge, increasing production incident risk |
| Stan | Each subsystem specialist only knows their own domain; cross-subsystem impact (CICS → Db2 contention scenarios) requires convening multiple teams. | 🔒 Skill Gap / Bottleneck — cross-subsystem analysis requires coordinating Zach, Stan, DBA, MQ admin simultaneously |

---

##### Step 3 — Plan
**Brief:** Generate a sequenced patch plan — acquisition order, dependency sequence, deployment order, test environment specification, test scenario list.

**Personas involved:** Zach, Stan

| Persona | Pain Point | Category |
|---|---|---|
| Zach | PTF prerequisite chains are navigated manually in SMP/E — a missed co-requisite causes a failed production apply. | ⏱️ Lost Time — **2–4 hours** of prerequisite tracing, plus potential production incident time |
| Zach | No AI-generated plan tied to the actual topology — plans are built from memory and informal processes. | 💼 Business Impact — plan quality depends entirely on the experience of whoever writes it |
| Stan | For middleware patches, Stan's sign-off on the subsystem scope requires manual coordination with Zach via email or meetings. | ⏱️ Lost Time — **1–2 days** of back-and-forth to align plan across SMEs |

---

##### Step 4 — Provision
**Brief:** Provision a test environment that mirrors production before any patch is applied.

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Test environments are provisioned manually — slow, error-prone, and frequently skipped under time pressure. Production becomes the de facto test environment. | ⏱️ Lost Time — **2–5 days** to provision a test environment, or the step is skipped |
| Alice | Mid-level engineers cannot independently provision test environments; every provisioning step requires Zach's involvement or a separate infrastructure request. | 🔒 Skill Gap / Bottleneck — test environment provisioning blocked on Zach's availability or a separate team |

---

##### Step 5 — Deploy
**Brief:** Application components are deployed into the test environment before test execution can begin.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Application component deployment into a test environment is a manual, multi-step process — each component must be configured separately. | ⏱️ Lost Time — **2–6 hours** of manual configuration per test environment setup |

---

##### Step 6 — Validate
**Brief:** Apply patches in the test environment and run validation — smoke tests, function tests — to confirm no breakage.

**Personas involved:** Zach, Stan, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Test execution is manual; there is no automated test scaffolding tied to the specific change. Coverage depends on individual engineer discipline. | ⏱️ Lost Time — **4–16 hours** of manual test execution per patch cycle |
| Stan | Subsystem-specific validation results are reviewed separately by Stan in isolation from Zach's overall change view — no shared artifact. | 🔒 Skill Gap / Bottleneck — Stan's sign-off on subsystem test results must be coordinated before Zach can proceed |
| Alice | Test failures require Zach to investigate — mid-level engineers lack the context to diagnose PTF-related test failures independently. | 🔒 Skill Gap / Bottleneck — Alice escalates every test failure to Zach, creating a bottleneck |

---

##### Step 7 — Decide
**Brief:** Review test results and make the production promotion decision.

**Personas involved:** Zach, Stan, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Test evidence is assembled manually from multiple sources — no single place to review pass/fail for the full plan. | ⏱️ Lost Time — **1–2 hours** assembling evidence before the production decision |
| Quinn | Approving production promotion requires a non-technical summary that Zach must produce separately — no artifact ready for management review. | 🔒 Skill Gap / Bottleneck — Quinn cannot make a risk-informed decision without Zach producing a separate summary |

---

##### Step 8 — Execute
**Brief:** Orchestrate the production apply — acquisition, sequenced application, LPAR restarts in maintenance window order.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Emergency patches bypass normal process because there is no fast-track workflow that is also safe — teams are forced to choose between speed and rigor. | 💼 Business Impact — emergency patches applied with reduced controls, increasing incident risk |
| Zach | Rollback planning is informal; when a patch causes a problem the remediation path is improvised. | 💼 Business Impact — unplanned rollback under time pressure is a leading cause of extended outages |

---

##### Step 9 — Govern
**Brief:** Create the change record, attach evidence, and seal the audit trail.

**Personas involved:** Zach, Annette

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Change records are assembled after the fact from memory and email threads — a separate manual step that gets skipped under time pressure. | ⏱️ Lost Time — **1–3 hours** of retrospective change record assembly |
| Annette | Monitoring change execution and reviewing change records requires querying multiple systems — no single source of truth. | ⏱️ Lost Time — **1–2 hours** per patch cycle pulling change evidence from disparate tools |

---

#### To-Be Flow — Desired Outcome (With Atlas)

##### Step 1 — Detect
**Brief:** Atlas proactively surfaces missing or at-risk PTFs, or the user queries Atlas for PTF state. Security-flagged PTFs are highlighted. Subsystem SMEs receive subsystem-specific gaps directly.

**Personas involved:** Zach, Stan, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Atlas proactively surfaces PTF gaps — Zach doesn't need to initiate a quarterly SMP/E review; Atlas has already identified what needs attention. | 🤖 Atlas AI Insight & Automation — continuous PTF monitoring surfaces gaps without user prompting |
| Stan | Subsystem-specific maintenance gaps surfaced directly to Stan — MQ, CICS, Db2 SMEs see their subsystem's patch needs without Zach as an intermediary. | 🆕 New User Capability — Stan independently tracks subsystem maintenance needs via Atlas |

---

##### Step 2 — Analyze
**Brief:** Atlas maps the impact of proposed changes: affected subsystems, applications, prerequisite chains, restart requirements, estimated maintenance window duration.

**Personas involved:** Zach, Stan

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Full impact of any PTF batch understood in minutes — which subsystems, applications, and transactions are affected, with prerequisite chains already resolved. | ⏱️ Time Saving — **4–8 hours → under 30 minutes** for impact analysis |
| Stan | Atlas surfaces subsystem-specific impact analysis to Stan directly — cross-subsystem risks like CICS thread limits creating Db2 contention are identified automatically. | 🤖 Atlas AI Insight & Automation — cross-subsystem risk compounding is only visible through Atlas's unified topology model |

---

##### Step 3 — Plan
**Brief:** Atlas generates a sequenced patch plan tied to actual environment topology — acquisition steps, dependency order, deployment sequence, test environment spec, test scenario list.

**Personas involved:** Zach, Stan

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | AI-generated plan anchored to the actual topology — prerequisite chains resolved, apply order determined, test scenarios scoped to the affected applications. | 🤖 Atlas AI Insight & Automation — topology-aware plan generation eliminates the leading cause of PTF-related outages |
| Stan | Stan reviews and approves the subsystem scope within the plan directly in Atlas — no email back-and-forth. Plan captures his sign-off before returning to Zach. | ⏱️ Time Saving — **1–2 days coordination → structured workflow in Atlas** |

---

##### Step 4 — Provision
**Brief:** A monoplex L2 virtual LPAR is provisioned mirroring production. At GA, the customer operates the engine; Atlas-native provisioning arrives at H1 2027.

**Personas involved:** Zach, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Test environment specification is generated automatically from the plan — no manual translation of requirements to infrastructure. | ⏱️ Time Saving — **2–5 days → automated provisioning** |
| Alice | Mid-level engineers can follow Atlas's provisioning specification without requiring Zach's involvement for every step. | 🆕 New User Capability — Alice can participate in test environment setup independently |

---

##### Step 5 — Deploy
**Brief:** Application components from the Atlas topology model are deployed into the provisioned environment automatically.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Application components deployed automatically from the topology model — the test environment is ready to use without manual component-by-component configuration. | ⏱️ Time Saving — **2–6 hours → automatic** via Application Deployment Engine |

---

##### Step 6 — Validate
**Brief:** Atlas applies patches to the test environment in sequence and runs the test package. Smoke and function tests at GA; integration and regression tests at H1 2027.

**Personas involved:** Zach, Stan, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Automated test execution — Atlas runs the test package and surfaces pass/fail with failure context. No manual test writing for standard scenarios. | ⏱️ Time Saving — **4–16 hours manual testing → automated execution** |
| Stan | Subsystem-specific test results reviewed by Stan in Atlas — structured, filterable, with clear attribution to the subsystem scope he owns. | 🆕 New User Capability — Stan reviews his subsystem's validation independently, in context |
| Alice | Test failures attributed to specific dependencies — Alice can diagnose without escalating to Zach for every failure. | 🆕 New User Capability — Alice independently interprets failure context Atlas provides |

---

##### Step 7 — Decide
**Brief:** Zach reviews test results and Atlas's recommendation; authorizes production promotion. For middleware patches, Stan approves the subsystem plan first.

**Personas involved:** Zach, Stan, Quinn

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Clear recommendation with supporting evidence — all in one place: test results, subsystem SME sign-offs, prerequisite resolution, maintenance window. | ⏱️ Time Saving — **1–2 hours assembling evidence → pre-assembled in Atlas** |
| Quinn | Atlas presents a non-technical risk summary alongside the technical evidence — Quinn can make the approval decision without requiring a separate Zach briefing. | 🆕 New User Capability — Quinn makes informed production decisions independently |

---

##### Step 8 — Execute
**Brief:** Atlas orchestrates the production apply — patch acquisition, sequenced application, LPAR restarts in maintenance window order. Real-time progress visible throughout.

**Personas involved:** Zach, Stan

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Transparent step-by-step execution with reasoning visible — Zach can pause or abort at any point. Emergency patches fast-tracked through the same safe workflow. | ⏱️ Time Saving — no forced trade-off between speed and rigor; fast-track path is built in |
| Zach | Rollback plan is generated alongside the execution plan — rollback is not improvised, it starts from a documented known-good state. | 🤖 Atlas AI Insight & Automation — rollback path is planned before execution begins |

---

##### Step 9 — Govern
**Brief:** Atlas generates the change record, attaches the plan, test results, and execution log. ServiceNow record created. Audit trail sealed.

**Personas involved:** Zach, Annette

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Complete traceability from detection through production apply generated automatically — no manual assembly required. | ⏱️ Time Saving — **1–3 hours retrospective work → automatic** |
| Annette | Single source of truth for change monitoring and review — Annette queries Atlas rather than assembling evidence from multiple systems. | ⏱️ Time Saving — **1–2 hours per cycle → single Atlas query** |

---

> **Overall outcome (S1):** Full patch cycle — from impact analysis to production apply with audit trail — delivered faster, safer, and with complete traceability. Emergency patches can be safely fast-tracked through the same workflow with a defensible decision record.

---

### S2 — Security PTF Application (merged from old UC-01)

#### As-Is Flow — Current State (Without Atlas)

##### Step 1 — Discover
**Brief:** An advisory is published or a security gap is suspected. The team must determine whether they are exposed.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Answering "are we exposed?" requires logging into ISPF on each LPAR individually and running SMP/E or GIMAPI queries — typically a 2–3 day process across a large estate. | ⏱️ Lost Time — **2–3 business days** |
| Sage | Has no direct way to determine exposure without going through Zach first; dependent on a verbal summary rather than real data. | 🔒 Skill Gap / Bottleneck — requires Zach's availability to produce any exposure answer |
| Sage | CISO and management expect an exposure brief she cannot produce without a multi-day investigation. | 💼 Business Impact — security posture is undefended at the executive level during the exposure window |

---

##### Step 2 — Assess
**Brief:** Cross-reference multi-LPAR query results to determine which systems are actually affected and at what PTF level.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Manually cross-referencing results across LPARs relies entirely on expert memory and is not documented anywhere. | ⏱️ Lost Time — **4–8 hours** of additional expert-only analysis |
| Zach | No proactive signal before a CVE is publicly published — exposure is discovered reactively, from the advisory. | 💼 Business Impact — detection window always lags the threat |

---

##### Step 3 — Blast Radius
**Brief:** Determine which applications, datasets, and downstream systems are reachable from the exposed component.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Blast radius analysis has no automated tooling — it requires the most experienced engineer to trace dependencies from memory. | ⏱️ Lost Time — **1–3 days** of senior engineer investigation time |
| Sage | No unified, query-ready evidence source to defend certificate and compliance posture in audits. | 💼 Business Impact — audit exposure is compounded by inability to quantify blast radius |
| Sage | Compound risk (e.g., missing PTF + unencrypted connection) is invisible to any single tool. | 💼 Business Impact — unknown compound risks remain open |

---

##### Step 4 — Plan
**Brief:** Build a remediation plan — PTF prerequisite chain, LPAR apply order, DR sequencing, test environment requirements.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | PTF prerequisite chain resolution is manual; a missed co-requisite causes a failed apply discovered only during a production change window. | ⏱️ Lost Time — **2–4 hours** of SMP/E prerequisite chain tracing + potential production incident |
| Zach | Multi-LPAR sequencing for patches with shared subsystem dependencies (shared Db2, shared MQ) is planned from memory. | 💼 Business Impact — incorrect sequencing can cause outages worse than the original vulnerability |
| Zach | DR environments are frequently patched last or forgotten entirely. | 💼 Business Impact — a live failover exposure remains open after production is remediated |

---

##### Step 5 — Validate
**Brief:** Provision a test environment, apply the PTF, and confirm no breakage before touching production.

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Lab environments take days to provision; under time pressure this step is skipped — production becomes the de facto test environment for emergency patches. | ⏱️ Lost Time — **2–5 days** to provision lab, or the step is skipped entirely |
| Alice | Remediation steps delegated by Zach lack the context needed to execute them safely; every delegated task still requires Zach's availability. | 🔒 Skill Gap / Bottleneck — Alice cannot execute safely without Zach present |

---

##### Step 6 — Execute
**Brief:** Apply the PTF across all affected LPARs in the correct order, monitoring for failures.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Multi-LPAR apply sequenced from memory; shared dependencies create coordination risk. | 💼 Business Impact — apply failures on one LPAR can have knock-on effects across the estate |

---

##### Step 7 — Close
**Brief:** Assemble the audit trail — what was applied, when, who authorized it, what validation was performed.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | The entire audit trail is assembled after the fact from memory, email threads, and change tickets. | ⏱️ Lost Time — **2–4 hours** of manual retrospective assembly |
| Sage | No auditor-ready evidence package without the same manual investigation effort. | 💼 Business Impact — compliance evidence is incomplete and unreliable |

---

#### To-Be Flow — Desired Outcome (With Atlas)

##### Step 1 — Detect
**Brief:** Atlas proactively identifies a FIXCAT security gap or a user queries Atlas immediately on receipt of an advisory.

**Personas involved:** Zach, Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Atlas surfaces a FIXCAT security gap without a user query — shortening the detection-to-response window from "whenever the advisory reaches the right person" to "when Atlas's next PTF currency check runs." | 🤖 Atlas AI Insight & Automation — proactive monitoring surfaces risk before it is asked |
| Sage | Proactive alert means Sage can initiate a CISO brief immediately rather than waiting for Zach's investigation to complete. | 🆕 New User Capability — Sage can act on a finding without depending on Zach |

---

##### Step 2 — Assess
**Brief:** Atlas queries all connected LPARs simultaneously and returns a complete exposure picture with PTF gap details, FIXCAT classification, and affected products.

**Personas involved:** Zach, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | "Are we exposed?" answered in seconds — Atlas queries all connected LPARs simultaneously. No ISPF. No SMP/E dialogs. | ⏱️ Time Saving — **2–3 business days → under 10 minutes** |
| Sage | Real exposure data rather than Zach's verbal summary — Sage can independently verify exposure scope without going through Zach first. | 🆕 New User Capability — Sage gains direct access to exposure facts |

---

##### Step 3 — Traverse Blast Radius
**Brief:** Atlas traverses the dependency graph from each exposed component, naming every reachable system, dataset, and downstream application — including those not themselves vulnerable.

**Personas involved:** Zach, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Blast radius is a topology map, not a guess. Atlas traverses the dependency graph and names every reachable system — coverage confidence surfaced alongside the map. | 🤖 Atlas AI Insight & Automation — multi-source topology traversal from ZUnderstand, impossible manually |
| Sage | Real blast radius map allows Sage to produce a CISO-ready exposure brief in minutes, not after a multi-day investigation. | ⏱️ Time Saving — **1–3 days → under 30 minutes** for executive-ready briefing |
| Zach | Compound risk identification: Atlas surfaces combinations of findings (missing security PTF + unencrypted IPIC connection) that create compound risk invisible to any single tool. | 🤖 Atlas AI Insight & Automation — cross-source risk compounding only possible with Atlas's unified model |

---

##### Step 4 — Plan Remediation
**Brief:** Atlas generates a sequenced remediation plan: apply order, PTF prerequisites resolved, test environment specification, DR remediation sequenced in.

**Personas involved:** Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Every PTF prerequisite resolved automatically — eliminating the leading cause of PTF-related production outages. | 🤖 Atlas AI Insight & Automation — Atlas resolves co-requisite chains without Zach navigating SMP/E resolution rules |
| Zach | DR exposure flagged proactively while production is being remediated — the failure mode that leads to breaches. | 🤖 Atlas AI Insight & Automation — Atlas flags this without being asked |

---

##### Step 5 — Provision + Test
**Brief:** Atlas provisions the test environment, deploys application components, and executes the test plan — attributing pass/fail and generating required configuration updates.

**Personas involved:** Zach, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Test environment available; no manual provisioning lag before the validation step can begin. | ⏱️ Time Saving — **2–5 days → automated provisioning** |
| Alice | Step-by-step execution guidance generated for each delegated LPAR apply — Alice can execute safely without Zach in the room. | 🆕 New User Capability — Alice independently executes delegated steps |
| Alice | If a test fails, Atlas identifies the specific dependency and generates the required fix (e.g., CSD update) in real time. | 🤖 Atlas AI Insight & Automation — configuration update generated automatically from test failure |

---

##### Step 6 — Decide
**Brief:** Zach reviews test results and Atlas's recommendation. Authorizes production apply — hard governance gate per LPAR.

**Personas involved:** Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Clear recommendation with supporting evidence — test results, prerequisite resolution, blast radius, DR status — all in one place for the authorization decision. | ⏱️ Time Saving — decision is made from a complete picture, not assembled from multiple sources |

---

##### Step 7 — Execute
**Brief:** Atlas orchestrates production apply across LPARs in sequenced order. Each LPAR apply requires individual Zach authorization. Real-time progress visible throughout.

**Personas involved:** Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Dependency-aware sequencing prevents knock-on failures during multi-LPAR apply. Progress visible in real time. | 🤖 Atlas AI Insight & Automation — shared dependency ordering computed and enforced automatically |

---

##### Step 8 — Monitor
**Brief:** During the production remediation window, Atlas monitors for exploitation activity on patched and unpatched LPARs and proactively flags any remaining DR exposure.

**Personas involved:** Zach, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Exploitation activity detected during remediation window surfaces immediately — Atlas surfaces anomalies without being asked. | 🤖 Atlas AI Insight & Automation — proactive behavioral monitoring during the exposure window |
| Sage | DR exposure remains tracked and flagged until DR remediation is confirmed complete — no silent failover risk. | 🆕 New User Capability — Sage has independent visibility into DR remediation status |

---

##### Step 9 — Close
**Brief:** All LPARs and DR environments patched and validated. Atlas generates the complete remediation record — audit trail sealed, ServiceNow ticket updated.

**Personas involved:** Zach, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Complete audit trail generated automatically — exposure assessment, blast radius, plan, test results, apply log, authorization chain. Zero manual assembly. | ⏱️ Time Saving — **2–4 hours manual assembly → automatic** |
| Sage | CISO-ready evidence package available immediately at close — auditor-ready without further effort. | 🆕 New User Capability — Sage produces the evidence package without Zach's involvement |

---

> **Overall outcome (S2):** Exposure window shrinks from 15–30 business days to under 5 business days for CRIT/HIGH findings. DR exposure tracked to confirmed close. 100% audit trail coverage for all Atlas-managed remediations.

---

## Part 3 — Atlas Units Estimation

> **Sources:**
> - **S1 baseline:** `use-case-units/UC-02-patch-management-units.md` (old UC-02)
> - **S2 additions:** `use-case-units/UC-01-vulnerability-remediation-units.md` (old UC-01, merged in)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Test Cycle** | Provision + deploy + validate for a single environment | 30–60 units |
| **Remediation** | Plan + test + apply for a single LPAR | 40–70 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |

### Per-Step Unit Estimates — S1 (Routine PTF Maintenance)

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — PTF identification | Analysis | 8 | PTF inventory + FIXCAT classification join |
| 2 — Impact analysis | Analysis | 12 | Topology traversal across affected subsystems |
| 3 — Prerequisite chain resolution | Analysis | 5 | SMP/E prerequisite chain with auto-resolution |
| 4 — Test plan generation | Analysis | 8 | Topology-scoped test scenario generation |
| 5 — Test environment provisioning + deployment | Test Cycle | 40 | L2 virtual LPAR + Application Deployment Engine |
| 6 — Validate (test execution + failure resolution) | Test Cycle | 20–35 | Base test execution; +15 per test failure requiring fix |
| 7 — Production apply (per LPAR) | Remediation | 15 | Sequenced apply with real-time progress |
| 8 — Change record generation | Artifact | 12 | Complete change artifact with test results attached |

### Per-Step Unit Additions — S2 (Security PTF Application)

S2 shares the S1 flow from Step 3 onward. Additional units for the S2-specific steps:

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Cross-LPAR exposure assessment | Analysis | 10 | Simultaneous query across all connected LPARs |
| 2 — Blast radius traversal | Analysis | 15 | Full downstream dependency map via topology |
| 5 — CISO security briefing artifact | Artifact | 15 | Executive-level status report |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — Routine PTF Maintenance (4 LPARs, no failures) | 130–170 | Full cycle including test environment |
| S1 — Routine PTF Maintenance (with 2 test failures) | 160–220 | +30 per test failure requiring CSD/config fix |
| S2 — Security PTF Application (3 LPARs) | 170–230 | Adds exposure assessment, blast radius, CISO report |
| S3 — Middleware Patch (single subsystem) | 110–160 | Similar to S1 but subsystem-specific; Stan sign-off step |
| S2 blast radius only (no remediation) | 30–45 | Exposure assessment + blast radius traversal only |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Number of LPARs in scope | +12–18 units per additional LPAR (provision + apply) |
| Number of test failures requiring fixes | +15–25 units per failure (attribution + fix + retest) |
| Number of PTFs in batch | +3–5 units per 10 additional PTFs for prerequisite chain expansion |
| ZUnderstand topology availability | Without ZUnderstand: blast radius limited to direct deps; saves ~8 units but reduces fidelity |
| Middleware patch (Stan sign-off required) | +5 units for Stan review and sign-off workflow |

### What Is Not Metered

- IZSAM PTF inventory data (stored in Atlas topology between discovery cycles)
- Continuous proactive PTF currency monitoring between patch cycles
- PE flag detection during plan generation (included in prerequisite resolution)
- Rollback plan generation (generated as part of the plan phase; no additional charge)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-02-patch-management-bob-ppz.md`

**Overall Bob PPZ relevance: Low-to-moderate. Tier 1 at Steps 6 (validate) and 7 (decide — middleware patches); Tier 2 at Steps 2 and 3.**

Bob PPZ enters when a patch introduces a breaking API or behavioral change requiring a compensating application code fix. In routine PTF maintenance cycles with no application-affecting API changes, Atlas handles the full workflow. The enrichment is most valuable for major middleware version patches (CICS TS, Db2 for z/OS) where subsystem API behavior changes are common.

**Tier 1 — Explicit Handoff Points:**

**Step 6 — Validate (Test Failure Attributed to Application Code):**
When Atlas's test reveals a CICS API behavior change introduced by a PTF that a COBOL program was relying on, Atlas identifies the specific program, call path, and the nature of the incompatibility. Atlas directs the user to Bob PPZ with the failure attribution — the affected program, the subsystem behavior change, and the test scenario that failed. Bob PPZ uses ZUnderstand to trace the execution path through the affected program and generate the precise code modification required.

**What comes back:** A corrected code artifact. Atlas re-runs the relevant test scenarios, confirms pass, and incorporates the code fix into the production promotion package.

**Step 7 — Decide (Middleware Patches — Open Code Actions):**
For middleware patches (CICS, Db2, MQ), if test results indicate application code changes are required before production promotion, those items appear as open actions in the decision artifact. Atlas directs the responsible developer to Bob PPZ with full context. Resolved items are returned to Atlas before Quinn's production promotion authorization.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Analyze:**
When Bob PPZ is installed, the application layer of the impact analysis is enriched with code-level metadata: for a CICS PTF changing EXEC CICS API behavior, the enriched analysis identifies not just which CICS regions are affected but which COBOL programs use the specific API calls that the PTF modifies.

**Step 3 — Plan:**
Test scenarios are enriched with code-level test targets — specific transactions, program entry points, and data paths that exercise the exact code constructs affected by the patch.

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-02-patch-management-concert4z.md`

**Overall Concert for Z relevance: High — one of the primary examples of the Concert for Z → Atlas sequential workflow. Tier 1 at Steps 1 (Concert for Z → Atlas) and 9 (post-apply monitoring); Tier 2 at Steps 2 and 6.**

Concert for Z's Risk Management module detects missing critical/HIPER PTFs and initiates the change; Atlas orchestrates the full validation workflow. Post-apply, Concert for Z's production monitoring detects behavioral regressions.

**Tier 1 — Explicit Handoff Points:**

**Step 1 — Detect (Concert for Z → Atlas):**
Concert for Z's Risk Management module — powered by IZSAM — has identified missing critical or HIPER PTFs across the z/OS estate. It computes blast radius across z/OS environments, flags the operational risk, and can auto-initiate a change ticket or invoke an Ansible agent workflow for a targeted known fix. The initiated change passes to Atlas, which applies full change intelligence: querying all connected LPARs for current PTF state, resolving prerequisite chains, mapping impact, and generating a sequenced patch plan.

**What comes back:** After Atlas completes the full patch cycle, Concert for Z's Risk Management module sees the operational risk as resolved and can use the Atlas change evidence in its operational record.

**Step 9 — Govern (Concert for Z Post-Apply Monitoring):**
Following patch apply, Concert for Z's Observe and Optimize modules monitor for post-patch behavioral regressions. If Concert for Z detects a behavioral anomaly correlating with the patch apply timestamp, it surfaces this as an operational finding. Atlas's change record provides Concert for Z with the exact change context. If Concert for Z identifies a post-patch regression, it triggers a new Atlas workflow: investigate the regression, determine whether rollback is warranted.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Analyze:**
Concert for Z's production performance baselines provide behavioral ground truth for the pre-patch environment, improving the specificity of Atlas's pre/post behavioral comparison during validation.

**Step 6 — Validate:**
Concert for Z's ZEN data enriches test coverage by identifying which production transaction flows are most active — ensuring Atlas's validation prioritizes the highest-traffic paths.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-02-patch-management-terraform.md`

**Overall Terraform relevance: Moderate. Tier 1 at Steps 2 and 4; Tier 2 at Steps 3, 6, and 8.**

Terraform's contribution follows the infrastructure-gate pattern: confirming LPAR state before the maintenance window opens, providing infrastructure isolation during the patch cycle, and recording infrastructure-layer state changes. Its value compounds over time as each patch cycle adds another versioned infrastructure state record to the audit trail.

**Tier 1 — Explicit Handoff Points:**

**Step 2 — Assess PTF Readiness:**
As part of the readiness gate, Atlas directs the team to confirm that each target LPAR is in its declared infrastructure state. The team runs `terraform plan` against each LPAR workspace to surface any infrastructure drift before the maintenance window begins.

**What comes back:** Infrastructure parity confirmation (or a list of drift items that must be resolved before patching can proceed). Atlas incorporates this into the readiness assessment output.

**Step 4 — Provision + Test:**
Atlas generates the infrastructure specification for the test environment. Terraform creates the test LPAR resources from this specification in environments where it manages LPAR and VM lifecycle.

**What comes back:** A Terraform-provisioned test environment with infrastructure matching the production declaration. Atlas deploys the application configuration overlay and runs the functional test suite.

**Tier 2 — Enrichment Touchpoints:**

**Step 3 — Plan the Patch Cycle:**
Terraform's state file provides LPAR-level infrastructure metadata that Atlas uses to assign LPARs to maintenance window slots, preventing a production-workspace LPAR from being accidentally scheduled with a test-workspace LPAR.

**Step 6 — Execute:**
Terraform's policy-as-code enforcement can prevent non-patch infrastructure changes from being made to LPARs while a maintenance window is active — passively eliminating a category of mid-window conflicts.

**Step 8 — Record:**
Terraform's versioned state file produces an automatic before/after infrastructure snapshot for every LPAR touched during the patch cycle — complementing the Atlas-generated evidence package with a complete dual-layer audit trail.
