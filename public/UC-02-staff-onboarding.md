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

> **Source:** `use-case-pain-wows/UC-04-staff-onboarding.md` (old UC-04 → new UC-02)

### As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Day one: understand the environment** | Chris is pointed to a wiki that was last updated in 2020. The topology diagrams are outdated. He spends his first two weeks asking Zach questions — Zach answers each one patiently but this pulls Zach away from his own work for hours daily. | Chris opens Atlas and asks "walk me through this environment." Atlas provides a structured overview: LPAR topology, sysplex structure, key subsystems, and the most critical production applications — drawn from the live environment model, not a stale document. |
| **2 — Understand application dependencies** | Chris needs to know what the Payment Processing application depends on. He asks Zach, who draws a rough diagram on a whiteboard. The diagram misses three CICS transactions and doesn't include the z/OS Connect REST layer that was added last year. | Chris asks Atlas "what does Payment Processing depend on?" Atlas traverses the topology and returns: 7 CICS transactions, 4 Db2 tables, 2 MQ queue managers, and 3 z/OS Connect REST endpoints — with the direction and strength of each dependency. |
| **3 — Learn the change process** | Chris asks Annette how changes are managed. She explains the maintenance window policy and change ticket process. Two weeks later, Chris discovers there are 46 changes in the past year with no change record, which means the process is not being followed consistently. | Atlas surfaces the change history: 246 documented changes in the last 12 months, plus 46 changes with no change record. It explains both the official process (maintenance windows, change tickets) and the reality on the ground — giving Chris an honest picture of how the environment is actually managed, not just how it is supposed to be. |
| **4 — Generate a reference document** | After six weeks, Chris still does not have a single document that describes the current environment. He writes one himself from notes, but cannot keep it current. When Zach reviews it, he finds 12 errors. | Chris asks Atlas to generate a System Intelligence Brief. Atlas produces a structured document: topology overview, key applications and their dependencies, change history summary, current PTF and software inventory, and flagged open risks. It is accurate as of today and can be regenerated on demand. |
| **5 — Execute first change** | When Chris is assigned his first PTF apply task, he asks Zach to walk him through it. Zach spends 3 hours supervising. Chris still is not sure whether he could do it independently next time. | Atlas guides Chris through his first PTF apply end-to-end: impact analysis, test plan, provisioning, validation, and production apply with Atlas guardrails at each step. Zach reviews the plan but does not need to supervise the execution. Atlas records the change for governance. |

### Key Pain Points

- Institutional knowledge trapped in one or two individuals who are always over-committed
- Outdated documentation that misrepresents the current environment
- Change history that does not reflect reality (undocumented changes)
- First change execution requires intensive supervision by the senior engineer
- No durable, current artifact that the new hire can reference independently

### Key Wow Moments

- "Let me walk you through this environment" — Atlas as an always-available, always-current orienteer
- The 46 undocumented changes disclosed proactively — the new hire gets an honest picture, not a sanitized one
- System Intelligence Brief generated in one session — persistent, current, shareable
- First change executed safely without requiring Zach's time for supervision

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
