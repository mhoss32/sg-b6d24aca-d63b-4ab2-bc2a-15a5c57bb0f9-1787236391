# UC-02: Patch Management — Pain Points, Wows & Flow Analysis

> **Pillar:** Change Intelligence (primary) + System Intelligence (impact analysis)
> **GA Status:** GA Dec 2026 (PTF/z/OS patches); H1 2027 (middleware patches)

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Detect
**Brief:** Systems programmer identifies that patches are needed — through a scheduled maintenance review, an advisory, or a subsystem SME raising a concern.

**Personas involved:** Zach, Stan

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Querying SMP/E for PTF inventory and prerequisite chains requires ISPF dialogs with no natural language interface — slow and expert-dependent. | ⏱️ Lost Time — **2–4 hours** per environment just to understand current PTF state |
| Stan | Subsystem-specific maintenance gaps (CICS, Db2, MQ) are not surfaced automatically — Stan must monitor IBM fix lists and product announcements manually. | ⏱️ Lost Time — **hours per quarter** monitoring maintenance bulletins across subsystems |

---

### Step 2 — Analyze
**Brief:** Determine what the proposed patches will affect — subsystems, applications, prerequisite chains, restart requirements, and estimated maintenance window duration.

**Personas involved:** Zach, Stan

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Impact assessment requires manually cross-referencing PTF descriptions against application topology — a process relying entirely on expert knowledge not documented anywhere. | ⏱️ Lost Time — **4–8 hours** of manual analysis per patch batch |
| Zach | Most organizations cannot confidently answer "what will break if I apply this PTF?" without hours of multi-team investigation. | 💼 Business Impact — changes proceed with incomplete impact knowledge, increasing production incident risk |
| Stan | Each subsystem specialist only knows their own domain; cross-subsystem impact (CICS → Db2 contention scenarios) requires convening multiple teams. | 🔒 Skill Gap / Bottleneck — cross-subsystem analysis requires coordinating Zach, Stan, DBA, MQ admin simultaneously |

---

### Step 3 — Plan
**Brief:** Generate a sequenced patch plan — acquisition order, dependency sequence, deployment order, test environment specification, test scenario list.

**Personas involved:** Zach, Stan

| Persona | Pain Point | Category |
|---|---|---|
| Zach | PTF prerequisite chains are navigated manually in SMP/E — a missed co-requisite causes a failed production apply. | ⏱️ Lost Time — **2–4 hours** of prerequisite tracing, plus potential production incident time |
| Zach | No AI-generated plan tied to the actual topology — plans are built from memory and informal processes. | 💼 Business Impact — plan quality depends entirely on the experience of whoever writes it |
| Stan | For middleware patches, Stan's sign-off on the subsystem scope requires manual coordination with Zach via email or meetings. | ⏱️ Lost Time — **1–2 days** of back-and-forth to align plan across SMEs |

---

### Step 4 — Provision
**Brief:** Provision a test environment that mirrors production before any patch is applied.

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Test environments are provisioned manually — slow, error-prone, and frequently skipped under time pressure. Production becomes the de facto test environment. | ⏱️ Lost Time — **2–5 days** to provision a test environment, or the step is skipped |
| Alice | Mid-level engineers cannot independently provision test environments; every provisioning step requires Zach's involvement or a separate infrastructure request. | 🔒 Skill Gap / Bottleneck — test environment provisioning blocked on Zach's availability or a separate team |

---

### Step 5 — Deploy
**Brief:** Deploy application components into the test environment before test execution can begin.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Application component deployment into a test environment is a manual, multi-step process — each component must be configured separately. | ⏱️ Lost Time — **2–6 hours** of manual configuration per test environment setup |

---

### Step 6 — Validate
**Brief:** Apply patches in the test environment and run validation — smoke tests, function tests — to confirm no breakage.

**Personas involved:** Zach, Stan, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Test execution is manual; there is no automated test scaffolding tied to the specific change. Coverage depends on individual engineer discipline. | ⏱️ Lost Time — **4–16 hours** of manual test execution per patch cycle |
| Stan | Subsystem-specific validation results are reviewed separately by Stan in isolation from Zach's overall change view — no shared artifact. | 🔒 Skill Gap / Bottleneck — Stan's sign-off on subsystem test results must be coordinated before Zach can proceed |
| Alice | Test failures require Zach to investigate — mid-level engineers lack the context to diagnose PTF-related test failures independently. | 🔒 Skill Gap / Bottleneck — Alice escalates every test failure to Zach, creating a bottleneck |

---

### Step 7 — Decide
**Brief:** Review test results and make the production promotion decision.

**Personas involved:** Zach, Stan, Quinn

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Test evidence is assembled manually from multiple sources — no single place to review pass/fail for the full plan. | ⏱️ Lost Time — **1–2 hours** assembling evidence before the production decision |
| Quinn | Approving production promotion requires a non-technical summary that Zach must produce separately — no artifact ready for management review. | 🔒 Skill Gap / Bottleneck — Quinn cannot make a risk-informed decision without Zach producing a separate summary |

---

### Step 8 — Execute
**Brief:** Orchestrate the production apply — acquisition, sequenced application, LPAR restarts in maintenance window order.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Emergency patches bypass normal process because there is no fast-track workflow that is also safe — teams are forced to choose between speed and rigor. | 💼 Business Impact — emergency patches applied with reduced controls, increasing incident risk |
| Zach | Rollback planning is informal; when a patch causes a problem the remediation path is improvised. | 💼 Business Impact — unplanned rollback under time pressure is a leading cause of extended outages |

---

### Step 9 — Govern
**Brief:** Create the change record, attach evidence, and seal the audit trail.

**Personas involved:** Zach, Annette

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Change records are assembled after the fact from memory and email threads — a separate manual step that gets skipped under time pressure. | ⏱️ Lost Time — **1–3 hours** of retrospective change record assembly |
| Annette | Monitoring change execution and reviewing change records requires querying multiple systems — no single source of truth. | ⏱️ Lost Time — **1–2 hours** per patch cycle pulling change evidence from disparate tools |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Detect
**Brief:** Atlas proactively surfaces missing or at-risk PTFs, or the user queries Atlas for PTF state. Security-flagged PTFs are highlighted. Subsystem SMEs receive subsystem-specific gaps directly.

**Personas involved:** Zach, Stan, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Atlas proactively surfaces PTF gaps — Zach doesn't need to initiate a quarterly SMP/E review; Atlas has already identified what needs attention. | 🤖 Atlas AI Insight & Automation — continuous PTF monitoring surfaces gaps without user prompting |
| Stan | Subsystem-specific maintenance gaps surfaced directly to Stan — MQ, CICS, Db2 SMEs see their subsystem's patch needs without Zach as an intermediary. | 🆕 New User Capability — Stan independently tracks subsystem maintenance needs via Atlas |

---

### Step 2 — Analyze
**Brief:** Atlas maps the impact of proposed changes: affected subsystems, applications, prerequisite chains, restart requirements, estimated maintenance window duration.

**Personas involved:** Zach, Stan

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Full impact of any PTF batch understood in minutes — which subsystems, applications, and transactions are affected, with prerequisite chains already resolved. | ⏱️ Time Saving — **4–8 hours → under 30 minutes** for impact analysis |
| Stan | Atlas surfaces subsystem-specific impact analysis to Stan directly — cross-subsystem risks like CICS thread limits creating Db2 contention are identified automatically. | 🤖 Atlas AI Insight & Automation — cross-subsystem risk compounding is only visible through Atlas's unified topology model |

---

### Step 3 — Plan
**Brief:** Atlas generates a sequenced patch plan tied to actual environment topology — acquisition steps, dependency order, deployment sequence, test environment spec, test scenario list.

**Personas involved:** Zach, Stan

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | AI-generated plan anchored to the actual topology — prerequisite chains resolved, apply order determined, test scenarios scoped to the affected applications. | 🤖 Atlas AI Insight & Automation — topology-aware plan generation eliminates the leading cause of PTF-related outages |
| Stan | Stan reviews and approves the subsystem scope within the plan directly in Atlas — no email back-and-forth. Plan captures his sign-off before returning to Zach. | ⏱️ Time Saving — **1–2 days coordination → structured workflow in Atlas** |

---

### Step 4 — Provision
**Brief:** A monoplex L2 virtual LPAR is provisioned mirroring production. At GA, the customer operates the engine; Atlas-native provisioning arrives at H1 2027.

**Personas involved:** Zach, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Test environment specification is generated automatically from the plan — no manual translation of requirements to infrastructure. | ⏱️ Time Saving — **2–5 days → automated provisioning** |
| Alice | Mid-level engineers can follow Atlas's provisioning specification without requiring Zach's involvement for every step. | 🆕 New User Capability — Alice can participate in test environment setup independently |

---

### Step 5 — Deploy
**Brief:** Application components from the Atlas topology model are deployed into the provisioned environment automatically.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Application components deployed automatically from the topology model — the test environment is ready to use without manual component-by-component configuration. | ⏱️ Time Saving — **2–6 hours → automatic** via Application Deployment Engine |

---

### Step 6 — Validate
**Brief:** Atlas applies patches to the test environment in sequence and runs the test package. Smoke and function tests at GA; integration and regression tests at H1 2027.

**Personas involved:** Zach, Stan, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Automated test execution — Atlas runs the test package and surfaces pass/fail with failure context. No manual test writing for standard scenarios. | ⏱️ Time Saving — **4–16 hours manual testing → automated execution** |
| Stan | Subsystem-specific test results reviewed by Stan in Atlas — structured, filterable, with clear attribution to the subsystem scope he owns. | 🆕 New User Capability — Stan reviews his subsystem's validation independently, in context |
| Alice | Test failures attributed to specific dependencies — Alice can diagnose without escalating to Zach for every failure. | 🆕 New User Capability — Alice independently interprets failure context Atlas provides |

---

### Step 7 — Decide
**Brief:** Zach reviews test results and Atlas's recommendation; authorizes production promotion. For middleware patches, Stan approves the subsystem plan first.

**Personas involved:** Zach, Stan, Quinn

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Clear recommendation with supporting evidence — all in one place: test results, subsystem SME sign-offs, prerequisite resolution, maintenance window. | ⏱️ Time Saving — **1–2 hours assembling evidence → pre-assembled in Atlas** |
| Quinn | Atlas presents a non-technical risk summary alongside the technical evidence — Quinn can make the approval decision without requiring a separate Zach briefing. | 🆕 New User Capability — Quinn makes informed production decisions independently |

---

### Step 8 — Execute
**Brief:** Atlas orchestrates the production apply — patch acquisition, sequenced application, LPAR restarts in maintenance window order. Real-time progress visible throughout.

**Personas involved:** Zach, Stan

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Transparent step-by-step execution with reasoning visible — Zach can pause or abort at any point. Emergency patches fast-tracked through the same safe workflow. | ⏱️ Time Saving — no forced trade-off between speed and rigor; fast-track path is built in |
| Zach | Rollback plan is generated alongside the execution plan — rollback is not improvised, it starts from a documented known-good state. | 🤖 Atlas AI Insight & Automation — rollback path is planned before execution begins |

---

### Step 9 — Govern
**Brief:** Atlas generates the change record, attaches the plan, test results, and execution log. ServiceNow record created. Audit trail sealed.

**Personas involved:** Zach, Annette

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Complete traceability from detection through production apply generated automatically — no manual assembly required. | ⏱️ Time Saving — **1–3 hours retrospective work → automatic** |
| Annette | Single source of truth for change monitoring and review — Annette queries Atlas rather than assembling evidence from multiple systems. | ⏱️ Time Saving — **1–2 hours per cycle → single Atlas query** |

---

> **Overall outcome:** Full patch cycle — from impact analysis to production apply with audit trail — delivered faster, safer, and with complete traceability. Emergency patches can be safely fast-tracked through the same workflow with a defensible decision record.
