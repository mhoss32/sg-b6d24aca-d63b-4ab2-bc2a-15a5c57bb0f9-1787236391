# UC-04: Staff Onboarding — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (primary) + Change Intelligence (first change guidance)
> **GA Status:** GA Dec 2026

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Orient
**Brief:** New team member arrives and needs an overview of the environment — LPAR topology, subsystem inventory, critical applications, and their relationships.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | New team members learn the environment through informal shadowing, reading outdated documentation, and asking the one senior engineer who is always too busy. | ⏱️ Lost Time — **3–6 months** before reaching independent contribution capability |
| Zach | Every new hire requires Zach to personally deliver environment orientation — the same knowledge transfer, repeated for every new person. | ⏱️ Lost Time — **4–8 hours** of Zach's time per new hire for initial orientation |
| Chris | The most critical knowledge — topology relationships, undocumented change patterns, application interdependencies — lives in people's heads; in environments where the senior engineer has retired, this knowledge is simply gone. | 💼 Business Impact — institutional knowledge lost permanently on retirement; no recovery mechanism |

---

### Step 2 — Explore
**Brief:** New team member drills into the areas most relevant to their role — application dependencies, configuration details, historical change patterns.

**Personas involved:** Chris, Alice, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | Every specific question requires interrupting Zach or another senior engineer — there is no self-service way to explore the environment. | 🔒 Skill Gap / Bottleneck — Chris cannot progress independently; every question requires a senior engineer's availability |
| Alice | Experienced engineers moving to a new system (new project, acquisition, team reorg) face the same gap — no self-service orientation path exists even for mid-level engineers. | ⏱️ Lost Time — **weeks** for an experienced engineer to orient to an unfamiliar system they now own |

---

### Step 3 — Assess Risk
**Brief:** Understand what the highest-priority open risks are in the environment — PTF gaps, deprecated APIs, security findings — relevant to the new team member's area.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | Risk landscape is invisible until Zach walks the new hire through known issues — there is no systematic, role-relevant risk briefing. | 💼 Business Impact — new hire may make changes without awareness of open risks in their area, increasing incident probability |
| Zach | Zach must manually remember to surface relevant risks to each new hire — no systematic process ensures risks are communicated. | 💼 Business Impact — knowledge transfer completeness depends entirely on Zach's memory and availability |

---

### Step 4 — Document
**Brief:** Produce a structured document consolidating the new hire's understanding of the environment for handoff, reference, or governance.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | No artifact produced from the onboarding process — knowledge exists in the new hire's head and in informal notes, not in a shareable, structured document. | 💼 Business Impact — organizational knowledge created during onboarding is immediately at risk of being lost again |
| Zach | If Chris needs to hand off to another team member, the same orientation process starts from scratch. | ⏱️ Lost Time — **repeat orientation effort** for every transfer or role change |

---

### Step 5 — Execute First Change
**Brief:** When the new hire is ready for their first production change, guide them through a safe change execution.

**Personas involved:** Chris, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Chris | First production change requires Zach to be present — Chris does not have the context to execute safely alone. | 🔒 Skill Gap / Bottleneck — Zach must be available for every first change attempt by every new hire |
| Chris | Dense IBM documentation provides general guidance but cannot answer questions specific to this environment and this change. | 💼 Business Impact — generic documentation does not prevent environment-specific mistakes |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Orient
**Brief:** New team member gets a structured overview of the environment from Atlas — LPAR topology, subsystem inventory, critical applications, and their relationships.

**Personas involved:** Chris, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Complete, accurate picture of the entire environment in the first week — not the first month. Atlas answers environmental questions in natural language, no ISPF required. | ⏱️ Time Saving — **3–6 months → first week** to reach basic environment competency |
| Zach | Zach does not need to personally deliver environment orientation — Atlas is available as a peer at any time, without scheduling. | ⏱️ Time Saving — **4–8 hours per new hire → zero** for Zach's orientation effort |
| Alice | Experienced engineers inheriting new systems can orient in a single Atlas conversation — no shadow period required. | ⏱️ Time Saving — **weeks of shadowing → hours** for an experienced engineer moving to a new system |

---

### Step 2 — Explore
**Brief:** User drills into areas most relevant to their role — Atlas answers follow-up questions, traces dependencies, explains change history, and surfaces configuration details.

**Personas involved:** Chris, Alice, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Self-service exploration — Chris can ask Atlas any environment question and receive a grounded, specific answer without interrupting a senior engineer. | 🆕 New User Capability — Chris independently explores the environment without requiring Zach's availability |
| Alice | A mid-level engineer inheriting a system they have not previously managed can orient entirely through Atlas — covering topology, change history, and risk profile in one session. | 🆕 New User Capability — Alice independently orients to new systems without requiring a shadow period |

---

### Step 3 — Assess Risk
**Brief:** Atlas proactively surfaces the highest-priority open risks in the environment — PTF gaps, deprecated APIs, security findings — relevant to the new hire's area of ownership.

**Personas involved:** Chris, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Risks relevant to Chris's area surfaced proactively by Atlas — no risk of making changes without knowing about open findings in that part of the environment. | 🤖 Atlas AI Insight & Automation — proactive risk surfacing tied to role and ownership area; no manual risk briefing required |
| Zach | Environment knowledge is persistent in Atlas regardless of staff turnover — organization is not one retirement away from losing the risk picture. | 💼 Business Impact — institutional knowledge is durable; it survives any individual's departure |

---

### Step 4 — Document
**Brief:** User requests a System Intelligence Brief — a structured, exportable document consolidating the session's discoveries and the current environment state.

**Personas involved:** Chris, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | System Intelligence Brief generated by Atlas — a structured, shareable document that captures the environment state and the new hire's understanding. Produced in minutes. | 🤖 Atlas AI Insight & Automation — Atlas generates the Brief from its live environment model; no authoring effort required |
| Zach | Knowledge captured in the Brief is reusable for the next team member — orientation artifact persists beyond any individual's tenure. | 💼 Business Impact — organizational knowledge produced once, reused indefinitely |

---

### Step 5 — Execute First Change
**Brief:** When the new hire is ready, Atlas guides them through safe change execution with a plan, test, and apply workflow.

**Personas involved:** Chris, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Chris | Atlas provides step-by-step guidance for the first production change — environment-specific context for every step, not generic documentation. | 🆕 New User Capability — Chris executes their first production change independently, within Atlas's guardrails |
| Zach | Zach does not need to be present for Chris's first change — Atlas provides the guardrails Zach would otherwise provide. | ⏱️ Time Saving — **Zach's time on first-change oversight → zero**, replaced by Atlas-guided workflow |

---

> **Overall outcome:** Onboarding time to first productive contribution reduced from 3–6 months to the first week for environment orientation. Institutional knowledge is persistent in Atlas regardless of staff turnover. New hires reach independent contribution capability with Atlas as their guide rather than a single overextended senior engineer.
