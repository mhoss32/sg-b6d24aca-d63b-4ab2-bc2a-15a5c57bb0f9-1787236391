# UC-04: Staff Onboarding
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

Every IBM Z organization is facing the same slow-motion crisis: experienced systems programmers and operations engineers are retiring, and the institutional knowledge they carry — how the environment is configured, what depends on what, why things are the way they are — leaves with them. Atlas makes that knowledge available to anyone who asks. A new team member can understand the full production environment in a single conversation, not over months of shadowing. That is not a convenience; it is business continuity.

---

## 1. Overview

Staff Onboarding covers the full arc of getting a new z/OS team member productive: understanding the environment, learning how changes are managed, identifying risks relevant to their role, and building the confidence to take ownership of their first real changes. Without Atlas, this process takes weeks to months of informal shadowing and depends entirely on whether the right people are still available to answer questions. With Atlas, the environment explains itself.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When a new team member joins a z/OS organization — or when an experienced person inherits a system they have never managed — they want to understand the full environment quickly, know what matters most, and get to productive contribution before institutional knowledge gaps cause mistakes. |
| **Emotional** | New hires want to feel capable and trusted, not dependent on a single overextended colleague. Managers want to feel confident that the new person will not cause an incident through ignorance of the environment. |
| **Social** | Z organizations need to demonstrate to leadership that they are not one retirement away from a crisis — that environment knowledge is captured, accessible, and not locked in any individual's head. |

---

## 3. Customer Problem and Outcome

**Problem:** IBM Z knowledge is concentrated in a shrinking pool of experienced engineers. When one of them retires or leaves, the institutional knowledge they hold — how systems are configured, which applications are critical, why certain decisions were made, what the informal change rules are — disappears. New hires face months of ramp-up with inadequate documentation, learning by asking the one person who is always too busy. Organizations have no mechanism to systematically capture and transfer environmental knowledge.

**Current State (Without Atlas):** New team members learn the environment through informal shadowing, reading whatever documentation exists (frequently outdated), and asking experienced colleagues. The most critical knowledge — topology relationships, undocumented change patterns, application interdependencies — lives in people's heads. In environments where the senior engineer has retired, this knowledge is simply gone. Onboarding timelines of 3–6 months are common for a new systems programmer to reach independent contribution capability.

**Desired Outcome:** A new team member can get an accurate, structured picture of the entire environment in their first week — not their first month. They can identify what is critical, understand how changes are managed, and get guided safely through their first change execution. The organization's environmental knowledge is persistent in Atlas regardless of staff turnover.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Staff Onboarding is one of the most emotionally resonant Atlas demos for a CHRO, CTO, or VP of Infrastructure — it makes the talent crisis visible and solvable. It is a strong entry point for Atlas Base: the value is immediate, the before/after contrast is sharp, and no additional SKU is required to demonstrate it. |
| **Retention impact** | Organizations that rely on Atlas for environment knowledge accumulate a persistent, always-current description of their estate that survives staff turnover. This directly reduces the risk of losing Atlas as a system — the knowledge value compounds over time. |
| **Competitive differentiation** | No existing z/OS tool can answer "walk me through the most critical production applications and their dependencies" in a single conversation. ISPF provides panels; documentation provides static snapshots; Atlas provides a live, queryable model of the environment. |
| **Portfolio attach** | This use case creates pull-through for IBM Z Software Discovery (the PTF and software inventory that Atlas uses to populate environment state) and is a natural follow-on entry point for UC-02 (Patch Management) and UC-03 (Audit and Compliance) — both of which the onboarding conversation naturally surfaces. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Chris — z/OS Systems Programmer (early career) | The new hire. Initiates the onboarding conversation. Asks questions, explores the environment, builds mental model, gets guidance on first change. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | The outgoing expert or the manager who assigns Atlas to the new hire. Benefits from not having to personally deliver environment orientation for every new team member. |
| **Secondary** | Annette — IT Operations Engineer | New operations staff also onboard via Atlas — particularly for understanding operational procedures, change windows, and incident response paths. |
| **Secondary** | Alice — z/OS Systems Programmer (mid-level) | Experienced team member who uses Atlas to quickly orient to a system they have not previously managed (new project, acquisition, team reorg). |

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary throughout.** Environment orientation, application topology, dependency maps, change history, and the System Intelligence Brief are all System Intelligence capabilities. The onboarding use case is almost entirely System Intelligence — understanding the environment as it currently exists. | GA Dec 2026 |
| **Change Intelligence** | **Supporting (onboarding to first change).** When the onboarding conversation reaches "how do I execute my first change safely?", Atlas transitions to Change Intelligence to guide the change plan and execution. | GA Dec 2026 (Lean MVP) |
| **Predictive Intelligence** | **Supporting (risk surfacing).** Atlas proactively surfaces risks relevant to the new hire — deprecated APIs approaching a deadline, open PTF gaps, undocumented changes — to give them an immediate sense of the environment's health and the work that exists. | Partial at GA; full H2 2027 |

**Why this use case is System Intelligence-dominant:** The onboarding job is fundamentally about knowledge transfer, not change execution. System Intelligence's persistent topology model is what makes the knowledge transferable and queryable. Without it, onboarding is still human-dependent.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Environment Orientation for New Hire | **Current** | GA Dec 2026 | Config-as-Code topology; PTF inventory; software version inventory | Yes (GA) |
| System Intelligence Brief Generation | **Current** | GA Dec 2026 | Same as above; artifact export capability | Yes (GA) |
| Change History and Process Orientation | **Current** | GA Dec 2026 | Atlas change history model; undocumented change detection | Yes (GA) |
| Guided First Change Execution | **Current** | GA Dec 2026 | Lean PTF Orchestration MVP | Yes (GA) |
| Proactive Risk Surfacing for New Hire | **Current (partial)** | GA Dec 2026 partial; H2 2027 full | Proactive FIXCAT monitoring at GA; behavioral baseline + anomaly detection at H2 2027 | Yes (GA partial) |

**Capability dependency notes:**

- The Environment Orientation and System Intelligence Brief scenarios are viable at GA Dec 2026 with Config-as-Code topology and IZSAM Lite PTF inventory as data sources. The breadth of the brief scales with how much of the environment has been discovered — a newly onboarded Atlas instance with partial discovery will produce a partial brief.
- The Guided First Change Execution scenario requires Lean PTF Orchestration to be in place. At GA, this covers PTF apply workflows; broader change types expand in H1 2027.
- The proactive risk surfacing behavior (Atlas surfaces the deprecated API without being asked) requires FIXCAT monitoring at GA and full behavioral anomaly detection at H2 2027.

---

## 8. Scope and Boundaries

**In Scope:**
- Environment orientation: LPAR topology, sysplex structure, subsystem inventory, key application inventory
- Application dependency mapping: what applications are critical, what they depend on, what would be affected by a change
- Change history orientation: how changes have historically been managed, what the common change types are, change windows, change record patterns
- Undocumented change identification: surfacing changes that occurred outside the change window or without associated change records
- System Intelligence Brief generation: exportable document consolidating environment state for handoff, reference, or governance
- Risk surfacing: Atlas proactively identifies the highest-priority open risks (PTF gaps, deprecated APIs, security findings) relevant to the new hire's area of ownership
- Guided first change execution: structured walkthrough of safe change process for a new team member's first real production change

**Out of Scope:**
- Employee training and education on z/OS platform concepts — Atlas explains the specific environment, not general z/OS education
- HR onboarding, access provisioning, or identity management — Atlas assumes access has already been granted
- Documentation of the Atlas tool itself — Atlas is a peer, not a product to be learned from documentation

**Non-Goals:**
- Atlas does not create documentation to replace operational runbooks — it answers questions from its live model; authoring and maintaining runbooks remains a human responsibility
- Atlas does not infer organizational process — it surfaces what it observes in the change history and configuration; process definitions are out of scope

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The environment has been discovered by Atlas prior to onboarding — Config-as-Code inventory, PTF inventory via IZSAM Lite, and at least one topology discovery pass have completed |
| **Assumption** | The new team member has been granted Atlas access appropriate to their role before the onboarding conversation begins |
| **Assumption** | The organization uses change records that are accessible to Atlas — either through Atlas's own change history model or a connected ITSM system |
| **Dependency** | Config-as-Code (ZCONFIG / ZOSCONFIG) for topology, subsystem configuration, and application inventory |
| **Dependency** | IZSAM Lite for PTF inventory and software version data |
| **Dependency** | Lean PTF Orchestration (GA Dec 2026) for the Guided First Change Execution scenario |
| **Risk** | Environments with incomplete discovery produce incomplete onboarding context. The System Intelligence Brief's quality is directly proportional to discovery coverage. Atlas should surface discovery gaps prominently so the new hire knows where their picture of the environment is incomplete. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Environment Orientation for New Hire | New team member asks Atlas for an overview of the environment | Current | Yes (GA) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Steps 1–4 |
| System Intelligence Brief Generation | User requests a structured, exportable environment document | Current | Yes (GA) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Step 4B |
| Change History and Process Orientation | User asks how changes are managed in this environment | Current | Yes (GA) | UX Flow, Chat Exchange | [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Step 6 |
| Guided First Change Execution | User is ready to execute their first real change and asks Atlas to guide them | Current | Yes (GA) | UX Flow, Chat Exchange | [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Step 7 |
| Proactive Risk Surfacing for New Hire | Atlas identifies an open risk relevant to the new hire's area and surfaces it without prompting | Current (partial) | Yes (GA partial) | UX Flow, Chat Exchange | [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Step 5 |

**Design decisions for this scenario catalog:**

- The `Environment Orientation` and `System Intelligence Brief` scenarios are split because they serve different downstream purposes. Orientation is conversational and exploratory. The Brief is a produced artifact with specific governance uses (handoff documentation, audit, management review). They often occur in the same session but should be designed and measured separately.
- The `Guided First Change Execution` scenario deliberately connects this use case to Change Intelligence. The onboarding story is not complete until the new hire has executed a real change safely. This is where Atlas demonstrates its full value for new staff — not just answering questions, but being the guardrails for the first production action.

---

## 11. Lifecycle Overview

```
Orient → Explore → Assess Risk → Document → Execute First Change
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Orient** | New team member gets a structured overview of the environment — LPAR topology, subsystem inventory, critical applications, and their relationships | Atlas |
| **Explore** | User drills into the areas most relevant to their role — application dependencies, configuration details, historical change patterns | Both |
| **Assess Risk** | Atlas surfaces the highest-priority open risks in the environment — proactively for security and operational findings, reactively for anything the user asks about | Atlas |
| **Document** | User requests a System Intelligence Brief — a structured, exportable document consolidating the session's discoveries and the current environment state | Atlas |
| **Execute First Change** | When the new hire is ready for their first production change, Atlas guides them through safe change execution with a plan, test, and apply workflow | Both |

> **Scope guidance:** This lifecycle intentionally ends at first change execution. Long-term change management, performance monitoring, and compliance work belong to their respective use cases (UC-02, UC-11, UC-03). This use case is about the transition from "new" to "productive contributor."

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Environment discovery and topology population | Atlas | Atlas builds and maintains the model; the new hire consumes it |
| Answering environment questions in natural language | Atlas | Core System Intelligence capability — no scripted queries required |
| Deciding which applications and areas to explore | User | Atlas surfaces a starting point; navigation is user-directed |
| Generating the System Intelligence Brief | Atlas | Atlas compiles the artifact from live data; content is not manually authored |
| Deciding what the brief covers | User | User can scope the brief to a domain, LPAR, or application area |
| Surfacing proactive risk observations | Atlas | Atlas identifies and raises open risks without being prompted |
| Deciding whether to act on a surfaced risk | User | Risk acknowledgment and prioritization is a human decision |
| Executing the first change | Shared | Atlas provides the plan and guardrails; user authorizes each step |
| Production authorization for any change | User | No Atlas-initiated change to production ever proceeds without explicit user authorization |

**Governance gates:** Any change execution (even in the context of onboarding) requires explicit user authorization before Atlas proceeds past the test stage. Atlas never promotes a change to production without named approval.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Natural language environment query** | New hire can ask any question about the environment in plain language without knowing where to look or what commands to run | Eliminates the dependency on a human expert being available to answer each question |
| **Topology-aware dependency explanation** | Atlas can explain not just what a component is, but what it connects to, what depends on it, and what would break if it changed | This is the answer to "what don't I know?" — which is exactly what new hires need |
| **Cross-source knowledge synthesis** | Atlas joins CSD, ZPARMs, PTF inventory, change history, and configuration across all subsystems to give a unified picture | No single person has this full picture in their head; Atlas makes the whole greater than the parts |
| **Proactive risk identification** | Atlas surfaces what matters without waiting to be asked — critical for a new hire who does not yet know what questions to ask | The most dangerous moment is not when someone asks the wrong question; it is when they do not know to ask |
| **Exportable knowledge artifact** | Atlas generates a System Intelligence Brief — a structured, durable document — from a live data model | Converts an ephemeral conversation into persistent organizational knowledge that survives the session and the person |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Time to independent contribution | Time from first day to first unassisted production change | 3–6 months (industry estimate) | Under 4 weeks |
| Onboarding conversation coverage | Percentage of known environment components surfaced in the first Atlas session | Depends on documentation quality; typically 20–40% | 80%+ with full discovery coverage |
| System Intelligence Brief adoption | Percentage of new hires who generate and use a System Intelligence Brief | 0% (does not exist today) | 80%+ of new hires in Atlas-active organizations |
| First change incident rate | Percentage of new-hire first changes that cause an unintended production impact | Estimate 10–15% (high for inexperienced staff) | Under 3% with Atlas-guided execution |
| Tribal knowledge dependency reduction | Manager-reported reduction in time spent personally onboarding new team members | Baseline varies; estimated 20–40 hours per hire | Under 5 hours for environment-oriented content |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| Discovery is incomplete — Atlas cannot answer questions about a subsystem or application because it has not been discovered | Atlas explicitly states that the subsystem is present but not yet fully discovered and indicates what data is missing; it does not guess | User works with the Atlas admin to trigger a discovery pass for the missing component |
| System Intelligence Brief is generated from stale data | Atlas includes a data freshness indicator on every brief section, flagging components whose CaC data has not been refreshed recently | User reviews freshness flags and triggers a rediscovery for stale sections before distributing the brief |
| New hire asks about a change that is outside their authorization scope | Atlas describes what the change would involve and what the authorization requirements are, but does not offer to execute it | User escalates to Zach or the appropriate approver to initiate the change |
| Proactive risk surfaced by Atlas is already known and being managed | Atlas has no way to know a risk is already in-flight in an external ITSM without a connected change record | User marks the item as acknowledged in Atlas; Atlas does not re-surface it in the session |
| First change execution fails at the test stage | Atlas reports the failure with root cause attribution and recommends next steps; it does not promote the change to production | User reviews the failure, decides whether to remediate and retry or escalate to a more experienced team member |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Change authorization | Any change executed during onboarding (even a guided first change) must be authorized by a named user before production apply | Atlas requires explicit confirmation at every production authorization gate; authorization is recorded in the Atlas change history |
| Change record linkage | Changes should be associated with a change record per the organization's ITSM policy | Atlas generates a change record template from the change plan; integration with ServiceNow (H2 2027) automates this linkage |
| Audit trail for system overview access | In regulated environments, access to full environment topology may itself require audit logging | Atlas records all session activity; this log is available for audit review |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-02: Patch Management | Staff Onboarding is a natural entry point for UC-02. The onboarding conversation frequently surfaces PTF gaps (missing security patches, HIPER items) that become the new hire's first real workload. Atlas can transition directly from orientation to a PTF apply workflow. |
| UC-03: Audit and Compliance | The System Intelligence Brief generated in UC-04 is directly useful as an environment state document for audit and compliance purposes. The 46 undocumented changes surfaced during the onboarding scenario (from the Kyle scenario) is a direct feed into the audit finding workflows in UC-03. |
| UC-05: Application Discovery and Dependency Analysis | Onboarding and application discovery overlap when the new hire needs to understand a specific application's dependencies in depth. UC-04 covers the initial orientation; UC-05 covers the deep dependency analysis when the new hire has a specific change or investigation in progress. |
| UC-14: Change Governance and Traceability | The undocumented change finding that surfaces during onboarding (46 undocumented changes in the Kyle scenario) is a direct input to UC-14's governance and audit workstreams. The two use cases share this data source. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Role-scoped onboarding path** | H1 2027 | Atlas tailors the onboarding conversation to the new hire's role — a systems programmer gets a different starting point than an operations engineer. Requires a user role model in Atlas that shapes what Atlas emphasizes and how deeply it goes in each area. |
| **Structured knowledge transfer workflow** | H1 2027 | A retiring expert can use Atlas to conduct a structured knowledge transfer session — Atlas facilitates, captures observations and context that are not in the CaC data (e.g., "we never change this parameter during peak season because of X"), and appends them to the topology as annotations. Bridges the gap between institutional knowledge and documented knowledge. |
| **Onboarding progress tracking** | H2 2027 | Atlas tracks what the new hire has explored, what risks they have acknowledged, and what changes they have completed. Managers can see onboarding coverage and progress without requiring status meetings. |
| **Agentic environment briefing** | H2 2027 | Atlas proactively generates and delivers a System Intelligence Brief at the start of a new hire's first session, without the user needing to ask — seeded from Atlas's understanding of the user's role and assigned responsibilities. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-04](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status |
| [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) | Full 7-step onboarding scenario script; environment overview, Payment Processing dependency deep-dive, 46 undocumented changes finding, guided first PTF apply; pillar activation summary |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 0 capability "Config-as-Code topology"; Phase 0 "Staff Onboarding" as a primary early-adopter use case |
| [`personas.md`](../personas.md) | Canonical persona definitions for Chris, Zach, Annette, Alice |
