# UC-04: Staff Onboarding — Atlas Units Estimation

> **Pillar:** System Intelligence (primary)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-04-staff-onboarding-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-04-staff-onboarding-spec.md)
> **Unit model:** [`Atlas Action Catalog.pdf`](../Atlas%20Action%20Catalog.pdf)

---

## Atlas Units Reference

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
| SME onboarding content (listed in Action Catalog as billable Intelligence Generation) | ~250,000 | ~2.5 |

> **Note on SME onboarding content:** The Action Catalog explicitly lists "SME onboarding content" as a billable Intelligence Generation artifact under the Intelligence Generation consumption category. This use case is the primary driver of that artifact class.

---

## Desired Outcome Flow — Atlas Units per Step

UC-04 addresses the knowledge transfer crisis in the IBM Z ecosystem — retiring specialists carrying undocumented institutional knowledge, and early-tenure staff unable to become productive without months of shadowing. Atlas converts the topology and configuration model into a navigable, personalized knowledge base.

Lifecycle: `Identify Knowledge Gap → Generate Environment Context → Build Onboarding Content → Guided Exploration → Task Delegation → Ongoing Learning`

---

### Step 1 — Identify Knowledge Gap

**What Atlas does:** A new team member (Chris, Alice) or their manager (Zach) initiates an onboarding workflow. Atlas identifies the new hire's role, responsibilities, and the systems they will be accountable for. Scopes the knowledge domains relevant to their assignment.

**Unit type:** Footprint (chat, topology navigation, role-to-system scoping)

**Step 1 subtotal: 0 units**

---

### Step 2 — Generate Environment Context

**What Atlas does:** Atlas generates a structured overview of the environment the new hire will work in: topology of relevant systems, key subsystem relationships, software versions, PTF currency state, configuration highlights, and known open items relevant to their responsibilities.

**Unit type:** **System assessment** (generated artifact — not raw inventory, but a synthesized narrative overview of the environment). This is the "here is what you need to know about PROD-LPAR1 before you touch it" document.

| Activity | Tokens | Units |
|---|---|---|
| Environment context document (topology + configuration overview) | 250,000 | **2.5** |

**Step 2 subtotal: 2.5 units**

---

### Step 3 — Build Onboarding Content

**What Atlas does:** Generates the personalized onboarding content package for the new hire — tailored to their role and the specific systems they are assigned to. Content includes: system architecture narrative, subsystem interaction explainers, common operational tasks with step-by-step guidance, runbook-style procedures for their most frequent responsibilities, escalation paths, and "what to do when X happens" scenarios.

**Unit type:** **SME onboarding content** — explicitly listed in the Action Catalog as a billable Intelligence Generation artifact. This is the highest-value step in this use case because it converts Atlas's topology and configuration knowledge into curated, role-specific educational material.

| Activity | Tokens | Units |
|---|---|---|
| Role-specific onboarding content package | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

> **Rationale:** The Action Catalog lists "SME onboarding content" as an artifact at the system assessment tier (~250K tokens). The onboarding content generation requires Atlas to: understand the role and responsibilities, traverse the relevant topology, synthesize environment context, and produce structured, pedagogically organized output — a similar reasoning burden to a system assessment. A rich, multi-subsystem onboarding package for a senior role (e.g., covering CICS, Db2, MQ, and security) could push toward 400K tokens (evidence package tier). A focused single-subsystem package for a narrower role would sit lower.

---

### Step 4 — Guided Exploration

**What Atlas does:** The new hire uses Atlas conversationally to explore the environment, ask questions, trace dependencies, understand configurations. Every individual query is footprint; Atlas navigates the topology model in response to natural language questions.

**Unit type:** Footprint (ongoing chat, topology navigation, configuration lookups)

> **Note:** This is the dominant interaction mode for the new hire on a day-to-day basis. It is entirely footprint — the value is in the quality of Atlas's responses, not in generating new artifacts.

**Step 4 subtotal: 0 units**

---

### Step 5 — Task Delegation

**What Atlas does:** Zach (or another senior) delegates a specific task to Chris or Alice — for example, applying a PTF on a development LPAR, or investigating a configuration difference. Atlas generates step-by-step execution guidance tailored to the delegated task and the delegatee's skill level.

**Unit type:** Task execution guidance is a generated artifact — a structured, step-by-step document for a specific operational task. Modeled as a partial system assessment (narrower scope than a full environment context document).

| Activity | Tokens | Units |
|---|---|---|
| Task delegation guidance document (per significant delegated task) | ~100,000 | **1.0 per task** |

**Step 5 subtotal: 1.0 units per delegated task (variable)**

---

### Step 6 — Ongoing Learning and Refreshes

**What Atlas does:** As the environment changes (new subsystems, configuration updates, PTF cycles), Atlas can refresh the onboarding content to keep it current. Each refresh that produces a new artifact is metered.

**Unit type:** Each content refresh that generates a new artifact = same tier as the original generation.

| Activity | Tokens | Units |
|---|---|---|
| Onboarding content refresh (triggered by significant environment change) | 250,000 | **2.5 per refresh** |

**Step 6 subtotal: 2.5 units per refresh (conditional, not per onboarding event)**

---

## Full Flow Summary — Per Onboarding Event

| Step | Activity | Units |
|---|---|---|
| 1 — Identify Gap | Role and scope scoping (footprint) | 0 |
| 2 — Environment Context | Environment overview document | 2.5 |
| 3 — Onboarding Content | Role-specific onboarding package | 2.5 |
| 4 — Guided Exploration | Ongoing chat and navigation (footprint) | 0 |
| 5 — Task Delegation | Per-task execution guidance | 1.0 (per task) |
| 6 — Refresh | Content refresh when environment changes | 2.5 (conditional) |
| **TOTAL** | **Nominal single onboarding event (no refresh, 1 task)** | **6.0 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Narrow onboarding (1 subsystem, 1 LPAR) | Lighter content package | ~0.7× |
| Standard (mid-level hire, 3–4 subsystems) | Baseline | 1.0× |
| Senior role onboarding (broad scope, multi-subsystem) | Richer content package (400K tokens = 4.0 units) | ~1.2× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional hire onboarded in the same cycle | +1 content package + 1 environment context per hire | +5.0 per hire |
| Annual content refresh per hire | 2 refreshes/year at 2.5 units each | +5.0 per hire per year |
| Each additional delegated task guidance document | One additional task execution guidance artifact | +1.0 per task |

---

## What is NOT Metered

- Day-to-day chat queries by new hires ("how does CICS connect to Db2 here?")
- Topology navigation and configuration lookups during guided exploration
- Any query that does not produce a generated artifact
- Test execution

---

## Notes and Assumptions

1. UC-04 is **low unit intensity per event** compared to operational use cases, but **high volume** — a 100-person Z team onboarding even 10 new hires per year generates 60+ units from content generation alone.
2. **Guided exploration (Step 4)** is the high-value, zero-cost interaction mode that makes Atlas valuable for this use case. The footprint model enables unlimited conversational exploration without metered cost — the billable moments are the generated artifacts.
3. **Task delegation guidance** is optionally metered — if the organization treats these as generated documents (stored, referenced later), they count as artifacts. If they are ephemeral chat responses, they remain footprint. Product implementation should define this boundary.
4. The **SME knowledge capture use case** — where Atlas interviews a retiring specialist and generates knowledge base content from the conversation — would be modeled as an extended onboarding content generation event (likely 300K–400K tokens given the breadth of knowledge being structured).
