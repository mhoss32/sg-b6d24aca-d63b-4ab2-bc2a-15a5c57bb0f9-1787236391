# UC-08: Platform Upgrade & Migration — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (scope/assess) + Change Intelligence (plan/execute) + Predictive Intelligence (sequencing risk)
> **GA Status:** H1 2027 (full z/OS and middleware upgrade); H2 2027 (phased legacy migration)

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Scope
**Brief:** Identify what needs to be assessed for the upgrade — all LPARs, subsystems, applications, and compatibility notes for the target version.

**Personas involved:** Zach, Greg, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Assembling a complete compatibility picture manually takes weeks — IBM upgrade guides, IBM support databases, subsystem-specific notes, and application owner consultations must be coordinated manually. | ⏱️ Lost Time — **2–4 weeks** just for initial compatibility scope assembly |
| Greg | No unified infrastructure dependency picture for sysplex and LPAR sequencing requirements — Greg must reconstruct it before upgrade planning can begin. | ⏱️ Lost Time — **1–2 weeks** of infrastructure dependency investigation |
| Angie | Application-level compatibility analysis requires querying every application team — no cross-application view of which code depends on behaviors that are changing. | 🔒 Skill Gap / Bottleneck — Angie must coordinate with every application owner to understand application-level compatibility risk |

---

### Step 2 — Assess
**Brief:** Evaluate compatibility of every application, subsystem, and configuration item against the target version — identify breaking changes.

**Personas involved:** Zach, Greg, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Compatibility issues are typically discovered during testing — sometimes during production cutover — because the manual analysis missed a dependency. | 💼 Business Impact — late discovery of compatibility issues is a leading cause of upgrade failures and emergency rollbacks |
| Greg | Sequencing mistakes (wrong upgrade order for interdependent subsystems) are a leading cause of upgrade failures. Manual sequencing from experience, not from analysis. | 💼 Business Impact — incorrect subsystem upgrade order can cause failures worse than not upgrading |
| Angie | Application owners may not know their applications have dependencies on behaviors that are changing — the compatibility gap is unknown until testing or production. | 💼 Business Impact — application owners cannot pre-remediate issues they do not know exist |

---

### Step 3 — Plan
**Brief:** Generate a sequenced, risk-ordered upgrade plan that accounts for subsystem interdependencies across all LPARs.

**Personas involved:** Zach, Greg, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | A z/OS version upgrade involves a dedicated planning project measured in months — the planning overhead alone is a major barrier to currency. | ⏱️ Lost Time — **months of planning effort** before any upgrade action can begin |
| Greg | Phased plan construction requires manually resolving interdependencies across subsystems, LPARs, and sysplex topology — no automated sequencing tool. | ⏱️ Lost Time — **weeks** of plan construction by the most experienced infrastructure team members |
| Alice | Mid-level engineers cannot contribute to upgrade planning because the dependency knowledge required is not documented anywhere accessible. | 🔒 Skill Gap / Bottleneck — upgrade planning is restricted to the handful of engineers who carry the full topology model in their heads |

---

### Step 4 — Provision
**Brief:** Provision isolated environments for each phase of the upgrade — allowing each phase to be validated in isolation before production is touched.

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Phase isolation is rarely achieved — environments are provisioned manually, provisioning takes too long, and teams shortcut phase boundaries to stay on schedule. | ⏱️ Lost Time — **days per phase** for environment provisioning, leading to phase isolation being abandoned under schedule pressure |
| Alice | Environment provisioning is entirely Zach-dependent — Alice cannot independently set up a phase test environment. | 🔒 Skill Gap / Bottleneck — Alice blocked on Zach for every provisioning step |

---

### Step 5 — Execute Each Phase
**Brief:** Apply the upgrade for each phase in the plan, monitoring for compatibility failures and sequencing problems.

**Personas involved:** Zach, Alice

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Each phase executed manually with no integrated tooling — SMP/E for PTFs, separate tools for subsystem configuration, separate communication for application teams. | ⏱️ Lost Time — **days per phase** of manual execution coordination across tools and teams |
| Zach | Phase failures are discovered during execution — there is no pre-phase validation to surface problems before production is touched. | 💼 Business Impact — upgrade phase failures during production execution can require emergency rollback |

---

### Step 6 — Validate Each Phase
**Brief:** Confirm each phase completed successfully and that no unintended behavior changes occurred before promoting to the next phase.

**Personas involved:** Zach, Greg, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Post-upgrade behavior change monitoring is informal — a subsystem running differently after upgrade may not be noticed until a user complaint or production incident. | 💼 Business Impact — silent behavioral regressions post-upgrade go undetected until they cause incidents |
| Angie | Application teams have no systematic way to verify their applications function correctly after a platform upgrade — testing is ad hoc and coverage is incomplete. | 💼 Business Impact — application regressions from platform upgrades are a consistent source of post-upgrade incidents |

---

### Step 7 — Close
**Brief:** Complete the upgrade across all phases, document the upgrade, and record the new baseline state.

**Personas involved:** Zach, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Upgrade documentation is assembled after the fact from change tickets, email, and memory — audit trail is incomplete. | ⏱️ Lost Time — **days** of retrospective documentation effort |
| Greg | New infrastructure baseline is not formally registered anywhere — drift from the new target state will accumulate silently until the next planned review. | 💼 Business Impact — without a registered post-upgrade baseline, infrastructure drift is undetectable |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Scope
**Brief:** Atlas scopes the full compatibility impact of a platform upgrade in minutes — across all LPARs, all subsystems, all applications, and all known compatibility notes for the target version.

**Personas involved:** Zach, Greg, Angie

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Full compatibility impact scoped in minutes — all LPARs, all subsystems, all applications, all compatibility notes for the target version. 300-application sweep without a single manual query. | ⏱️ Time Saving — **2–4 weeks → minutes** for initial compatibility scope |
| Greg | Infrastructure dependency picture for sysplex and LPAR sequencing requirements produced automatically from Atlas's topology model. | ⏱️ Time Saving — **1–2 weeks → minutes** for infrastructure dependency analysis |
| Angie | Application-level compatibility findings surfaced directly — application teams notified of what they need to remediate before the upgrade begins. | 🆕 New User Capability — Angie independently identifies application-level compatibility risk without coordinating with every application owner |

---

### Step 2 — Assess
**Brief:** Atlas evaluates compatibility of all components against the target version — identifying breaking changes and sequencing requirements.

**Personas involved:** Atlas, Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Compatibility issues surfaced before the project starts, not during production cutover. The list of what needs remediation before the upgrade begins is complete from day one. | 🤖 Atlas AI Insight & Automation — Atlas joins IBM compatibility notes with the live topology to produce a specific, grounded compatibility gap list |
| Greg | Sequencing risk identification — Atlas identifies which subsystems must be upgraded in a specific order to avoid compatibility failures, based on their dependency relationships. | 🤖 Atlas AI Insight & Automation — dependency-aware sequencing analysis produces the correct upgrade order, not an experience-based guess |

---

### Step 3 — Plan
**Brief:** Atlas generates a sequenced, risk-ordered upgrade plan — phase boundaries, subsystem sequencing, DR implications, test environment specs for each phase.

**Personas involved:** Zach, Greg, Alice

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Months of planning effort compressed into a structured Atlas-generated plan — phase boundaries, sequencing, environment specs, and test scenarios all generated from the topology. | ⏱️ Time Saving — **months → days** for upgrade plan construction |
| Alice | Mid-level engineers can execute phases assigned in the Atlas plan — the dependency knowledge is embedded in the plan, not required from the executor. | 🆕 New User Capability — Alice independently executes delegated upgrade phases from Atlas's structured plan |

---

### Step 4 — Provision
**Brief:** Atlas provisions isolated environments for each phase — phase isolation is maintained without manual provisioning effort.

**Personas involved:** Zach, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Phase isolation maintained automatically — each phase validated in an isolated environment without manual provisioning. | ⏱️ Time Saving — **days per phase provisioning → automated** |
| Alice | Alice can independently prepare phase environments from Atlas's specification without requiring Zach for each provisioning step. | 🆕 New User Capability — Alice independently provisions phase environments |

---

### Step 5 — Execute Each Phase
**Brief:** Atlas orchestrates each upgrade phase — sequenced application, real-time progress visibility, Zach authorizes each production step.

**Personas involved:** Zach, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Phase execution is Atlas-orchestrated across all tools — no manual coordination across SMP/E, subsystem configuration, and application deployment. | ⏱️ Time Saving — **days per phase manual coordination → Atlas-orchestrated execution** |
| Zach | Zach authorizes each production step — governance gate maintained with full visibility into what Atlas will execute before authorization. | 🤖 Atlas AI Insight & Automation — reasoning visible at every step; no black-box execution |

---

### Step 6 — Validate Each Phase
**Brief:** Atlas runs regression tests for each phase; behavioral monitoring surfaces post-phase behavior changes before the next phase begins.

**Personas involved:** Zach, Greg, Angie, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Behavioral monitoring post-phase — Atlas identifies if a subsystem is running differently after the upgrade and surfaces the deviation before the next phase begins. | 🤖 Atlas AI Insight & Automation — behavioral baseline comparison identifies post-upgrade regressions that would otherwise be invisible until production incidents |
| Angie | Application regression testing scoped to the phase's changes — Atlas runs the relevant test scenarios and surfaces failures before production. | ⏱️ Time Saving — **ad hoc manual testing → systematic Atlas-generated test execution** per phase |

---

### Step 7 — Close
**Brief:** Complete all phases; Atlas generates the upgrade record and registers the new baseline state.

**Personas involved:** Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Complete upgrade record generated automatically — every phase, every authorization, every test result captured without retrospective assembly. | ⏱️ Time Saving — **days retrospective documentation → automatic** |
| Greg | New infrastructure baseline registered in Atlas at close — post-upgrade drift is immediately detectable against the new reference state. | 🤖 Atlas AI Insight & Automation — baseline registration happens as part of upgrade close; no separate action required |

---

> **Overall outcome:** Major platform upgrade planning time reduced from months to days. Compatibility issues surfaced before execution, not during production cutover. Each phase validated in isolation with behavioral monitoring — emergency rollbacks driven by missed compatibility issues become rare rather than routine.
