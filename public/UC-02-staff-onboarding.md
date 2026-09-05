# UC-02: Staff Onboarding — Composite Reference

> **New UC number:** UC-02 (formerly old UC-04)
> **Sources consolidated:** Spec (GitHub), Pain & Wows (old UC-04), Units (old UC-04), Bob PPZ, Concert for Z, Terraform

---

## Part 1 — Use Case Specification

*Version 1.0 | Owner: Product Management | Last updated: August 2026*

### Executive Summary

Every IBM Z organization is facing the same slow-motion crisis: experienced systems programmers and operations engineers are retiring, and the institutional knowledge they carry — how the environment is configured, what depends on what, why things are the way they are — leaves with them. Atlas makes that knowledge available to anyone who asks. A new team member can understand the full production environment in a single conversation, not over months of shadowing. That is not a convenience; it is business continuity.

### Overview

Staff Onboarding covers the full arc of getting a new z/OS team member productive: understanding the environment, learning how changes are managed, identifying risks relevant to their role, and building the confidence to take ownership of their first real changes. Without Atlas, this process takes weeks to months of informal shadowing and depends entirely on whether the right people are still available to answer questions. With Atlas, the environment explains itself.

### Roadmap Status

| Scenario | Status | Target Date |
|---|---|---|
| Environment Orientation for New Hire | **Current** | GA Dec 2026 |
| System Intelligence Brief Generation | **Current** | GA Dec 2026 |
| Change History and Process Orientation | **Current** | GA Dec 2026 |
| Guided First Change Execution | **Current** | GA Dec 2026 |
| Proactive Risk Surfacing for New Hire | **Current (partial)** | GA Dec 2026 partial; H2 2027 full |

### Primary Personas

- **Chris** — z/OS Systems Programmer (early career): the new hire; asks questions, explores, gets guidance
- **Zach** — z/OS Systems Programmer (experienced): the outgoing expert; benefits from not personally delivering each orientation
- **Annette** — IT Operations Engineer: new operations staff using Atlas for orientation
- **Alice** — z/OS Systems Programmer (mid-level): orients to newly inherited systems

### Pillar Alignment

| Pillar | Role |
|---|---|
| **System Intelligence** | **Primary throughout** — environment orientation, topology, dependency maps, change history |
| **Change Intelligence** | **Supporting** — when onboarding reaches first change, Atlas transitions to guided change execution |
| **Predictive Intelligence** | **Supporting** — proactive risk surfacing (deprecated APIs, open PTF gaps) |

### Lifecycle

```
Orient → Explore → Assess Risk → Document → Execute First Change
```

### Scenario Catalog

| # | Scenario | Status |
|---|---|---|
| S1 | Environment Orientation for New Hire | Current — GA Dec 2026 |
| S2 | System Intelligence Brief Generation | Current — GA Dec 2026 |
| S3 | Change History and Process Orientation | Current — GA Dec 2026 |
| S4 | Guided First Change Execution | Current — GA Dec 2026 |
| S5 | Proactive Risk Surfacing for New Hire | Current (partial) — GA Dec 2026 |

### AI Differentiation

- **Natural language environment query** — no need to know where to look or what commands to run
- **Topology-aware dependency explanation** — what connects to what, what would break if it changed
- **Cross-source knowledge synthesis** — joins CSD, ZPARMs, PTF inventory, change history into one picture
- **Proactive risk identification** — surfaces what matters without waiting to be asked
- **Exportable knowledge artifact** — System Intelligence Brief converts a session into persistent organizational knowledge

### Related Use Cases

- UC-06 (Patch Management): onboarding naturally surfaces PTF gaps that become the new hire's first workload
- UC-01 (Audit and Compliance): the System Intelligence Brief serves as an environment document for audit
- UC-05 (Change Governance): undocumented changes found during onboarding feed governance workflows

---

## Part 2 — Pain & Wows Flow Analysis

> **Pillar:** System Intelligence (primary) + Change Intelligence (first change guidance)
> **GA Status:** GA Dec 2026
> **Source:** `use-case-pain-wows/UC-04-staff-onboarding.md` (old UC-04 → new UC-02)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Orient
**Brief:** New team member arrives and needs an overview of the environment — LPAR topology, subsystem inventory, critical applications, and their relationships.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | New team members learn the environment through informal shadowing, reading outdated documentation, and asking the one senior engineer who is always too busy. | ⏱️ Lost Time — **3–6 months** before reaching independent contribution capability |
| Zach | Every new hire requires Zach to personally deliver environment orientation — the same knowledge transfer, repeated for every new person. | ⏱️ Lost Time — **4–8 hours** of Zach's time per new hire for initial orientation |
| Chris | The most critical knowledge — topology relationships, undocumented change patterns, application interdependencies — lives in people's heads; in environments where the senior engineer has retired, this knowledge is simply gone. | 💼 Business Impact — institutional knowledge lost permanently on retirement; no recovery mechanism |

---

#### Step 2 — Explore
**Brief:** New team member drills into the areas most relevant to their role — application dependencies, configuration details, historical change patterns.

**Personas involved:** Chris, Alice, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | Every specific question requires interrupting Zach or another senior engineer — there is no self-service way to explore the environment. | 🔒 Skill Gap / Bottleneck — Chris cannot progress independently; every question requires a senior engineer's availability |
| Alice | Experienced engineers moving to a new system (new project, acquisition, team reorg) face the same gap — no self-service orientation path exists even for mid-level engineers. | ⏱️ Lost Time — **weeks** for an experienced engineer to orient to an unfamiliar system they now own |

---

#### Step 3 — Assess Risk
**Brief:** Understand what the highest-priority open risks are in the environment — PTF gaps, deprecated APIs, security findings — relevant to the new team member's area.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | Risk landscape is invisible until Zach walks the new hire through known issues — there is no systematic, role-relevant risk briefing. | 💼 Business Impact — new hire may make changes without awareness of open risks in their area, increasing incident probability |
| Zach | Zach must manually remember to surface relevant risks to each new hire — no systematic process ensures risks are communicated. | 💼 Business Impact — knowledge transfer completeness depends entirely on Zach's memory and availability |

---

#### Step 4 — Document
**Brief:** Produce a structured document consolidating the new hire's understanding of the environment for handoff, reference, or governance.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | No artifact produced from the onboarding process — knowledge exists in the new hire's head and in informal notes, not in a shareable, structured document. | 💼 Business Impact — organizational knowledge created during onboarding is immediately at risk of being lost again |
| Zach | If Chris needs to hand off to another team member, the same orientation process starts from scratch. | ⏱️ Lost Time — **repeat orientation effort** for every transfer or role change |

---

#### Step 5 — Execute First Change
**Brief:** When the new hire is ready for their first production change, guide them through a safe change execution.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | First production change requires Zach to be present — Chris does not have the context to execute safely alone. | 🔒 Skill Gap / Bottleneck — Zach must be available for every first change attempt by every new hire |
| Chris | Dense IBM documentation provides general guidance but cannot answer questions specific to this environment and this change. | 💼 Business Impact — generic documentation does not prevent environment-specific mistakes |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Orient
**Brief:** New team member gets a structured overview of the environment from Atlas — LPAR topology, subsystem inventory, critical applications, and their relationships.

**Personas involved:** Chris, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Complete, accurate picture of the entire environment in the first week — not the first month. Atlas answers environmental questions in natural language, no ISPF required. | ⏱️ Time Saving — **3–6 months → first week** to reach basic environment competency |
| Zach | Zach does not need to personally deliver environment orientation — Atlas is available as a peer at any time, without scheduling. | ⏱️ Time Saving — **4–8 hours per new hire → zero** for Zach's orientation effort |
| Alice | Experienced engineers inheriting new systems can orient in a single Atlas conversation — no shadow period required. | ⏱️ Time Saving — **weeks of shadowing → hours** for an experienced engineer moving to a new system |

---

#### Step 2 — Explore
**Brief:** User drills into areas most relevant to their role — Atlas answers follow-up questions, traces dependencies, explains change history, and surfaces configuration details.

**Personas involved:** Chris, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Self-service exploration — Chris can ask Atlas any environment question and receive a grounded, specific answer without interrupting a senior engineer. | 🆕 New User Capability — Chris independently explores the environment without requiring Zach's availability |
| Alice | A mid-level engineer inheriting a system they have not previously managed can orient entirely through Atlas — covering topology, change history, and risk profile in one session. | 🆕 New User Capability — Alice independently orients to new systems without requiring a shadow period |

---

#### Step 3 — Assess Risk
**Brief:** Atlas proactively surfaces the highest-priority open risks in the environment — PTF gaps, deprecated APIs, security findings — relevant to the new hire's area of ownership.

**Personas involved:** Chris, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Risks relevant to Chris's area surfaced proactively by Atlas — no risk of making changes without knowing about open findings in that part of the environment. | 🤖 Atlas AI Insight & Automation — proactive risk surfacing tied to role and ownership area; no manual risk briefing required |
| Zach | Environment knowledge is persistent in Atlas regardless of staff turnover — organization is not one retirement away from losing the risk picture. | 💼 Business Impact — institutional knowledge is durable; it survives any individual's departure |

---

#### Step 4 — Document
**Brief:** User requests a System Intelligence Brief — a structured, exportable document consolidating the session's discoveries and the current environment state.

**Personas involved:** Chris, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | System Intelligence Brief generated by Atlas — a structured, shareable document that captures the environment state and the new hire's understanding. Produced in minutes. | 🤖 Atlas AI Insight & Automation — Atlas generates the Brief from its live environment model; no authoring effort required |
| Zach | Knowledge captured in the Brief is reusable for the next team member — orientation artifact persists beyond any individual's tenure. | 💼 Business Impact — organizational knowledge produced once, reused indefinitely |

---

#### Step 5 — Execute First Change
**Brief:** When the new hire is ready, Atlas guides them through safe change execution with a plan, test, and apply workflow.

**Personas involved:** Chris, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Atlas provides step-by-step guidance for the first production change — environment-specific context for every step, not generic documentation. | 🆕 New User Capability — Chris executes their first production change independently, within Atlas's guardrails |
| Zach | Zach does not need to be present for Chris's first change — Atlas provides the guardrails Zach would otherwise provide. | ⏱️ Time Saving — **Zach's time on first-change oversight → zero**, replaced by Atlas-guided workflow |

---

> **Overall outcome:** Onboarding time to first productive contribution reduced from 3–6 months to the first week for environment orientation. Institutional knowledge is persistent in Atlas regardless of staff turnover. New hires reach independent contribution capability with Atlas as their guide rather than a single overextended senior engineer.

---

## Part 3 — Atlas Units Estimation

> **Source:** `use-case-units/UC-04-staff-onboarding-units.md` (old UC-04 → new UC-02)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |
| **Remediation** | Plan + test + apply for a single change | 20–50 units |

### Per-Step Unit Estimates

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Environment overview | Query | 3 | LPAR topology + subsystem summary |
| 2 — Application dependency deep-dive | Analysis | 10 | Multi-source topology traversal |
| 3 — Change history + undocumented changes | Analysis | 10 | 12-month query + baseline diff |
| 4 — System Intelligence Brief | Artifact | 20 | Full structured document export |
| 5 — Guided first change (PTF apply) | Remediation | 40 | Full change cycle including test validation |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — Environment Orientation (session only) | 15–25 | Overview + key application deep-dives |
| S2 — System Intelligence Brief | 20–35 | Adds artifact generation to orientation queries |
| S3 — Change History and Process Orientation | 12–20 | Includes undocumented change enumeration |
| S4 — Guided First Change (PTF apply) | 35–55 | Depends on PTF complexity and number of LPARs |
| Full onboarding arc (all scenarios) | 80–130 | Typical first 2-week engagement |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Size of environment (number of LPARs) | +5–10 units per LPAR for topology overview |
| Number of applications in deep-dive | +8–12 units per application dependency traversal |
| New hire role scope (systems programmer vs. operations) | ±20% depending on depth of technical queries |
| First change type (PTF vs. RACF change vs. CICS parameter) | Varies 25–55 units depending on change complexity |

### What Is Not Metered

- Atlas holding the environment model in memory between sessions (persistent topology is not re-queried)
- Proactive risk surface observations (Atlas raises these without a user query)
- System Intelligence Brief regeneration for updates (same artifact type, small delta re-analysis)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-04-staff-onboarding-bob-ppz.md`

**Overall Bob PPZ relevance: Moderate for developer personas; Tier 1 at Step 5 (first change); Tier 2 at Steps 2 and 3.**

**Tier 1 — Explicit Handoff Points:**

**Step 5 — Guided First Change Execution (developer new hires):**
When the new hire is an application developer (Deb persona) rather than a systems programmer (Chris persona), their first change is an application code change rather than a PTF apply. Atlas guides the onboarding conversation through environment understanding, then at the "first change" step, directs Deb to Bob PPZ for the code-level execution. Atlas provides the blast radius context (what the change will touch); Bob PPZ provides the code-level understanding of what to change and how. The handoff is explicit: Atlas says "you are ready to make your first change — here is what it will affect at the system level; use Bob PPZ to understand the code and plan the implementation safely."

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Application Dependency Deep-Dive:**
For new application developers exploring their applications, Bob PPZ enriches the Atlas dependency map with code-level context: not just "ACCTVAL01 calls CUSTSVC01" (Atlas topology) but "ACCTVAL01's account validation paragraph calls CUSTSVC01 to check credit limits, and this call pattern creates a tight coupling that affects 14 downstream programs" (Bob PPZ ZUnderstand). This deeper context helps Deb understand not just what connects but what the code-level implications of those connections are.

**Step 3 — Change History Orientation:**
When the change history surfaces an undocumented change to an application program, Bob PPZ can provide context on what that change actually did — not just "ACCTVAL01 was modified" but "the account validation paragraph was restructured." This code-level change characterization enriches the change history for developer onboarding beyond what configuration history alone provides.

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-04-staff-onboarding-concert4z.md`

**Overall Concert for Z relevance: None. No direct touchpoint.**

Staff Onboarding is a knowledge transfer and guided exploration use case. Concert for Z's Day 2 operational intelligence capabilities — monitoring, performance analytics, incident detection — do not contribute to the knowledge transfer workflows that characterize this use case. The environment orientation, change history exploration, and first change execution that define onboarding are entirely Atlas-owned.

No Tier 1 or Tier 2 Concert for Z touchpoints exist for UC-02.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-04-staff-onboarding-terraform.md`

**Overall Terraform relevance: Low. Tier 2 only at Steps 2 and 5 for new hires whose role includes Terraform-managed infrastructure.**

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Generate Environment Context:**
When Atlas generates the environment context document for a new hire whose responsibilities include Terraform-managed infrastructure, the Terraform workspace structure provides a structured layer of infrastructure metadata. Atlas can describe not just "which LPARs you are responsible for" but also "which of those LPARs are managed declaratively via Terraform, what their workspace names are, and what the IaC change process looks like for infrastructure-level changes to those systems." This makes the environment context document more complete for hires who will interface with both Atlas and Terraform workflows.

**Step 5 — Task Delegation:**
When a senior engineer delegates an infrastructure-related task to a new hire (e.g., reviewing a Terraform plan for a proposed LPAR configuration change), Atlas's task delegation guidance can incorporate the Terraform workflow context — explaining what a `terraform plan` output shows, what needs to be reviewed before approval, and how the approved change is applied. Atlas provides the application-layer impact context; Terraform provides the infrastructure-layer plan.
