# UC-07: Application Change Management — Pain Points, Wows & Flow Analysis

> **Pillar:** Change Intelligence (primary) + System Intelligence (impact analysis) + Predictive Intelligence (regression detection)
> **GA Status:** H1 2027 (early adopter); Full developer-native workflows H2 2027–2028+

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Assess Impact
**Brief:** Before writing code, the developer needs to understand what their proposed change will affect — which programs, tables, transactions, and downstream applications.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Impact analysis is informal — developers rely on tribal knowledge, ask Zach or experienced colleagues, or discover impact in integration testing when it is expensive to fix. | ⏱️ Lost Time — **half a day to 2 days** of informal investigation before code can be written with any confidence |
| Deb | As an early-tenure developer, Deb has no tribal knowledge to draw on — she is most exposed to unknowingly making changes that have hidden impact. | 🔒 Skill Gap / Bottleneck — Deb cannot independently assess impact without consulting Kathleen or Zach for every change |
| Kathleen | No tool joins application topology awareness with code-level impact analysis — the picture is assembled from CSD exports, Db2 catalog queries, and developer memory. | 💼 Business Impact — impact assessments are routinely incomplete; undetected dependencies cause production incidents |

---

### Step 2 — Provision Environment
**Brief:** Get access to a test environment that mirrors the production topology for the relevant application scope.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Deb | Test environments are provisioned manually by the infrastructure team. Wait times range from hours to days. Filing a ticket and waiting blocks development flow. | ⏱️ Lost Time — **hours to 2 days** waiting for a test environment ticket to be fulfilled |
| Kathleen | Sandboxes that mirror the production topology are rare — most developers test against shared environments that may not reflect production behavior. | 💼 Business Impact — testing in a shared, non-production-representative environment provides false confidence |
| Zach | Every test environment provisioning request requires Zach's review and involvement — adding to his workload while blocking developers. | 🔒 Skill Gap / Bottleneck — Zach is the bottleneck for every developer needing a test environment |

---

### Step 3 — Code
**Brief:** The developer writes or modifies code, working without real-time feedback on topological impact.

**Personas involved:** Kathleen, Deb

| Persona | Pain Point | Category |
|---|---|---|
| Deb | Developers have no visibility into application performance metrics without going through the infrastructure team — no self-service performance baseline. | 🔒 Skill Gap / Bottleneck — Deb cannot understand the performance implications of her code changes without escalating to the performance team |
| Kathleen | Regression detection is ad hoc — if a change breaks something in a shared CICS transaction chain, it surfaces in integration testing or production. | 💼 Business Impact — regression detection at the point of production or integration is expensive relative to catching it during development |

---

### Step 4 — Generate Test Plan
**Brief:** Define the test scenarios that will validate the change — which transactions, API paths, and downstream applications need to be exercised.

**Personas involved:** Kathleen, Deb

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Test plan generation is manual — Kathleen writes test scenarios based on her knowledge of what the change touches, with no automated scope generation. | ⏱️ Lost Time — **2–4 hours** to write a test plan for each significant change |
| Deb | Test coverage is inconsistent and dependent on individual developer discipline — there is no automated scaffolding for what needs to be tested. | 💼 Business Impact — changes proceed with test coverage that depends on Deb's current knowledge level, not on a systematic scope |

---

### Step 5 — Validate
**Brief:** Execute the test plan in the test environment and review results before promoting the change.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Deb | There is little or no test automation on z/OS — test coverage is manual, inconsistent, and depends on individual developer discipline. | ⏱️ Lost Time — **half a day to 2 days** of manual test execution per change |
| Deb | Regressions are caught in integration testing or production — the developer finds out she broke something through a test failure she did not control or a production incident. | 💼 Business Impact — late regression detection is the most expensive quality failure mode for z/OS application development |
| Kathleen | Deploying an application change to CICS or IMS after validation requires multiple manual steps across multiple tools and teams — IBM Z Open Editor, DBB, a separate deployment tool, and a sysprog for configuration changes. | ⏱️ Lost Time — **hours of multi-tool, multi-team handoff** to get from validated code to deployed application |

---

### Step 6 — Deploy
**Brief:** Promote the change from the test environment to CICS or IMS — including any infrastructure configuration changes.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Deploying to CICS or IMS requires multiple manual steps across multiple tools and teams — developer cannot deploy independently if any configuration changes are involved. | 🔒 Skill Gap / Bottleneck — Zach must be involved in any deployment that touches CICS definitions or IMS setup |
| Deb | Deb has no visibility into what configuration changes her code triggers — the handoff to sysprog is opaque from her perspective. | 🔒 Skill Gap / Bottleneck — Deb cannot initiate deployment independently; the handoff requires Kathleen's escalation to Zach |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Assess Impact
**Brief:** Developer asks Atlas what their proposed change will touch — which programs, tables, transactions, and downstream applications — before writing a line of code.

**Personas involved:** Kathleen, Deb, Angie

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Ask Atlas what the proposed change will touch — full answer across CICS, Db2, MQ, and z/OS Connect in seconds, before any code is written. | ⏱️ Time Saving — **half a day to 2 days → seconds** for impact assessment |
| Deb | Atlas provides the system context Deb does not yet carry — she understands the scope of her change before making it, not after breaking something. | 🆕 New User Capability — Deb independently understands change impact without requiring Kathleen or Zach |
| Angie | Architects can define the application specification and intended design that Atlas references for impact analysis — changes are validated against architectural intent. | 🤖 Atlas AI Insight & Automation — impact analysis references both topology and architectural specification |

---

### Step 2 — Provision Environment
**Brief:** Atlas provisions an isolated test environment in the background while the developer writes code. Environment is ready when needed.

**Personas involved:** Deb, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Deb | Test environment provisioned in the background while Deb writes code — no ticket, no wait time, isolated environment ready when she needs it. | ⏱️ Time Saving — **hours to 2 days → background provisioning** while code is being written |
| Kathleen | Isolated environment that mirrors production topology — no testing in a shared environment with other teams' changes. | 🆕 New User Capability — Kathleen independently gets a production-representative isolated environment without filing a ticket |

---

### Step 3 — Code
**Brief:** Developer writes code with Atlas available to answer topology and performance questions in real time.

**Personas involved:** Deb, Kathleen

| Persona | Wow Moment | Category |
|---|---|---|
| Deb | Real-time topology context available while coding — any question about what a code path touches is answerable without interrupting a colleague. | 🆕 New User Capability — Deb codes with full system context available on demand, independently |
| Kathleen | Kathleen can delegate routine changes to Deb with confidence — Atlas provides the guardrails Kathleen would otherwise provide herself. | ⏱️ Time Saving — Kathleen's oversight effort on routine delegated changes reduces significantly |

---

### Step 4 — Generate Test Plan
**Brief:** Atlas generates a test plan automatically from the impact analysis — scoped to the actual change, with environment specifications and test data requirements.

**Personas involved:** Kathleen, Deb, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Test plan generated automatically from the impact analysis — test scenarios scoped to the transactions and API paths the change actually touches. | ⏱️ Time Saving — **2–4 hours manual test plan → automatic** from impact analysis |
| Deb | Consistent, topology-derived test coverage — Deb's test plan is as thorough as Kathleen's, because it comes from the same model, not from developer experience level. | 🤖 Atlas AI Insight & Automation — test plan scope derived from topology traversal, not from developer knowledge |

---

### Step 5 — Validate
**Brief:** Tests run in an isolated environment. Regressions caught before the change leaves the developer's hands. Developer iterates — modify code, watch test plan update, re-run — without filing tickets.

**Personas involved:** Deb, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Deb | Developer-controlled regression testing — regressions caught in Deb's own isolated environment before the change reaches integration testing or production. | ⏱️ Time Saving — late regression discovery cost **reduced by the shift from integration/production to developer loop** |
| Deb | Iterate on code, watch the test plan update, re-run tests — a fast loop without filing tickets or waiting for infrastructure. | 🆕 New User Capability — Deb independently runs a full test-validate-iterate cycle without any infrastructure team involvement |
| Kathleen | Test results with failure attribution — Kathleen reviews a structured pass/fail report, not raw test output to interpret. | 🤖 Atlas AI Insight & Automation — failure attribution identifies which dependency or change caused the failure |

---

### Step 6 — Deploy
**Brief:** Developer initiates deployment; Atlas orchestrates the configuration steps for CICS or IMS.

**Personas involved:** Kathleen, Deb, Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Atlas-orchestrated deployment to CICS or IMS — developer initiates, Atlas handles the configuration steps, Zach authorizes changes that require it. | ⏱️ Time Saving — **hours of multi-tool, multi-team handoff → Atlas-orchestrated workflow** |
| Deb | Deployment is visible from Deb's perspective — she can track status without depending on a sysprog to relay progress. | 🆕 New User Capability — Deb has visibility into her own deployment without requiring a Zach intermediary |

---

> **Overall outcome:** Developer change cycle — from impact analysis through validated deployment — shifts from a multi-day, multi-team handoff process to a developer-controlled loop within Atlas. Both experienced and early-tenure developers benefit: Kathleen gains speed and efficiency; Deb gains the guardrails and context she cannot yet carry independently.
