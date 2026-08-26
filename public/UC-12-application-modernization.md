# UC-12: Application Modernization — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (analyze) + Change Intelligence (execute) + Predictive Intelligence (risk surfacing)
> **GA Status:** H1 2027 (limited access); H2 2027 (full developer-native workflows)

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Analyze
**Brief:** Understand the full structure, technical debt profile, and dependency map of the application being modernized — programs, copybooks, APIs, Db2 access patterns, runtime call chains.

**Personas involved:** Angie, Kathleen

| Persona | Pain Point | Category |
|---|---|---|
| Angie | Modernization projects begin with a research phase that takes weeks or months — manually reading code, interviewing the few remaining experts, reviewing CSD definitions and Db2 catalog entries. | ⏱️ Lost Time — **weeks to months** in a manual research phase before any modernization action can begin |
| Angie | The research phase is expensive, incomplete, and produces no structured artifact — modernization plans are built on an understanding that is acknowledged as incomplete. | 💼 Business Impact — modernization plans built on incomplete analysis carry high risk of unexpected failures during execution |
| Kathleen | The people who built legacy applications are often gone — the knowledge required to modernize safely is no longer available from the original authors. | 💼 Business Impact — modernization must proceed without access to the design intent of the systems being changed |
| Deb | Tightly coupled code (monolithic copybooks, shared Db2 plans) carries high risk because the blast radius of changes is not fully known. | 💼 Business Impact — changes to highly coupled code can produce unexpected failures in parts of the system the developer did not know were connected |

---

### Step 2 — Plan
**Brief:** Define a prioritized, phased modernization plan — which changes to make, in which order, with what validation approach.

**Personas involved:** Angie, Kathleen, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Angie | No automated technical debt identification — Angie must manually identify deprecated APIs, monolithic structures, and duplicated logic from code review and expert interviews. | ⏱️ Lost Time — **weeks** identifying technical debt scope across large codebases |
| Greg | Infrastructure implications of modernization decisions (API modernization, database schema changes) are assessed informally — no structured mechanism to evaluate infrastructure impact before the plan is finalized. | 🔒 Skill Gap / Bottleneck — Greg must be consulted for every decision that has infrastructure implications, creating a serial dependency |
| Angie | Modernization prioritization is based on estimated impact and risk — no data-driven prioritization from actual coupling analysis and blast radius quantification. | 💼 Business Impact — without data-driven prioritization, the most dangerous changes may not be scheduled last or given appropriate validation resources |

---

### Step 3 — Execute Phase
**Brief:** Implement a phase of the modernization plan — remediating deprecated API calls, decomposing monolithic structures, updating Db2 access patterns.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Code-level changes to tightly coupled legacy code carry high risk because the full runtime call chain is not visible from static analysis. | 💼 Business Impact — changes that appear safe from static analysis can cause runtime failures through dynamic dependencies that are invisible pre-ZUnderstand |
| Deb | Early-tenure developers working on lower-risk modernization phases lack the system context to work safely — they depend on Kathleen's oversight for every non-trivial change. | 🔒 Skill Gap / Bottleneck — Deb cannot work independently on modernization phases without Kathleen's continuous involvement |
| Zach | Infrastructure configuration changes triggered by modernization (CICS definitions, Db2 parameter changes, IMS setup) require Zach's involvement in every phase. | ⏱️ Lost Time — **hours to days per phase** of Zach's time on infrastructure configuration changes triggered by developer modernization work |

---

### Step 4 — Validate Phase
**Brief:** Validate each phase in isolation before production is touched — regression testing scoped to the changed components.

**Personas involved:** Kathleen, Deb

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Phase validation environments are not isolated — testing occurs in shared or production-similar environments, creating risk of interference. | 💼 Business Impact — phase validation results are unreliable if test environment conditions do not match what production will experience |
| Kathleen | Regression test coverage depends on the developer's knowledge of what the phase changed — systematic scope definition is not automated. | ⏱️ Lost Time — **hours per phase** manually defining regression test scope from the change |
| Deb | Test failures on modernization phases require Kathleen's diagnosis — Deb lacks the call chain knowledge to attribute test failures to specific coupling points. | 🔒 Skill Gap / Bottleneck — test failure diagnosis always escalates to Kathleen |

---

### Step 5 — Promote
**Brief:** Promote the validated phase to production — including any infrastructure configuration changes.

**Personas involved:** Kathleen, Zach, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Production promotion requires Zach for any configuration steps — multi-team handoff for every phase promotion, even routine ones. | ⏱️ Lost Time — **hours of multi-team coordination** for every phase production promotion |
| Angie | No mechanism to verify that the promoted phase conforms to the intended architecture — regression from architectural intent can accumulate phase by phase. | 💼 Business Impact — architectural drift accumulates silently across multi-year modernization projects |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Analyze
**Brief:** Atlas produces a complete picture of any application's structure, technical debt, and dependency profile in minutes — programs, deprecated APIs, monolithic structures, runtime call chains via ZUnderstand.

**Personas involved:** Angie, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Complete application structure, technical debt profile, and dependency map produced in minutes — from Atlas's topology model and ZUnderstand's dynamic call chain analysis. | ⏱️ Time Saving — **weeks to months of manual research → minutes** for a complete modernization analysis |
| Kathleen | Runtime call chain analysis from ZUnderstand shows which programs actually call which others at runtime — not just which are statically configured. Monolithic copybook decomposition planned from actual usage, not from topology assumptions. | 🤖 Atlas AI Insight & Automation — ZUnderstand dynamic call chain analysis is required for safe modernization scope; this is not achievable from static analysis alone |
| Deb | Atlas surfaces which fields in a shared copybook are actually used by which programs at runtime — Deb knows the safe decomposition boundary before making any changes. | 🆕 New User Capability — Deb independently understands coupling scope for her assigned phases using Atlas's analysis |

---

### Step 2 — Plan
**Brief:** Atlas identifies modernization opportunities — deprecated APIs approaching end-of-support, monolithic structures suitable for decomposition, duplicated logic — and generates a prioritized, phased plan.

**Personas involved:** Angie, Greg, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Prioritized modernization plan generated by Atlas — deprecated API deadlines, coupling risk scores, blast radius quantification — data-driven prioritization rather than expert estimation. | 🤖 Atlas AI Insight & Automation — Atlas generates a prioritized plan from technical debt analysis, coupling scores, and proactive deadline surfacing |
| Greg | Infrastructure implications of each modernization phase reviewed through Atlas — structural changes that affect CICS definitions, Db2 parameters, or IMS setup identified before the phase plan is finalized. | 🆕 New User Capability — Greg reviews infrastructure implications from Atlas's analysis without being consulted ad hoc for every decision |

---

### Step 3 — Execute Phase
**Brief:** Developers execute the phase — code changes, API remediation, structural decomposition — with Atlas providing dependency context and Zach authorizing infrastructure configuration changes.

**Personas involved:** Kathleen, Deb, Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Full runtime call chain visible before making changes to tightly coupled code — the safety of a change can be confirmed before writing it. | 🤖 Atlas AI Insight & Automation — ZUnderstand dynamic call chain prevents the silent failures that static-only analysis cannot detect |
| Deb | Atlas provides the system context for Deb's phase — she works from Atlas's dependency analysis, not from her own incomplete knowledge. | 🆕 New User Capability — Deb independently executes lower-risk modernization phases from Atlas's structured phase specification |
| Zach | Infrastructure configuration changes for modernization phases are Atlas-orchestrated — Zach authorizes rather than manually executing every configuration step. | ⏱️ Time Saving — **hours to days per phase of Zach manual configuration → authorization gates within Atlas** |

---

### Step 4 — Validate Phase
**Brief:** Each phase validated in an isolated environment — regression testing scoped automatically from the impact analysis. Atlas attributes test failures to specific coupling points.

**Personas involved:** Kathleen, Deb, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Phase regression testing scoped automatically from the impact analysis — Atlas generates the test targets from the programs and call chains the phase changed. | ⏱️ Time Saving — **hours manual regression scoping → automatic** from the modernization impact analysis |
| Deb | Test failures attributed by Atlas to specific coupling points — Deb can diagnose and fix failures independently rather than escalating to Kathleen for every test failure. | 🆕 New User Capability — Deb independently diagnoses phase test failures using Atlas's attribution |
| Kathleen | Phase validation runs in an isolated environment provisioned by Atlas — consistent, production-representative conditions for every phase validation. | ⏱️ Time Saving — no manual test environment setup per phase; Atlas provisions and configures it |

---

### Step 5 — Promote
**Brief:** Atlas orchestrates phase promotion to production — including any configuration changes. Angie reviews promoted phases against architectural intent.

**Personas involved:** Kathleen, Zach, Angie, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Atlas-orchestrated phase promotion — developer initiates, Atlas handles configuration, Zach authorizes infrastructure gates. No multi-team handoff coordination required. | ⏱️ Time Saving — **hours of multi-team coordination → Atlas-orchestrated workflow** |
| Angie | Phase promotion reviewed against architectural specification — Atlas checks whether the promoted code conforms to the intended architecture before production apply. | 🤖 Atlas AI Insight & Automation — architectural conformance check catches architectural drift before it accumulates across phases |

---

> **Overall outcome:** Modernization research phase reduced from weeks/months to minutes. Tightly coupled code can be safely decomposed because the runtime call chain is visible. Each phase validated in isolation before production is touched. Multi-year modernization projects become feasible for organizations that previously treated legacy code as untouchable.
