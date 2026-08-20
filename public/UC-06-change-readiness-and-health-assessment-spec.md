# UC-06: Change Readiness and Health Assessment
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

Before any significant event on IBM Z — a go-live, a major change, an audit, a peak season — organizations want to know the system is sound. Today that answer requires hours of manual inspection across ISPF panels, SMP/E, and multiple vendor consoles, and it is still incomplete because no single tool sees the full picture. Atlas replaces that manual hunt with a single, multi-source health assessment that joins configuration state, security posture, PTF currency, and performance constraints into one artifact — in minutes, not hours. The health check is the most practical demonstration of Atlas's cross-tool value and is available at GA.

---

## 1. Overview

Change Readiness and Health Assessment gives organizations a structured, repeatable way to answer the question: "Is our system in good shape right now?" It covers PTF currency, configuration compliance, security posture, and performance constraints as a unified picture, and it produces a structured artifact that can be used for governance review, change authorization, and audit evidence. It is the Atlas use case most likely to surface findings no one knew existed — because it joins data from sources that are never examined together.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When a significant event is approaching — a go-live, a major change window, an audit, or a peak period — I want to know that the system is healthy, that no known risks are open, and that there is nothing lurking in a subsystem I did not think to check, so I can proceed with confidence and have evidence I can show to governance or management if something goes wrong. |
| **Emotional** | Zach wants to walk into a go-live sign-off meeting knowing he has checked everything — not hoping he did not miss something in the panels. He wants the confidence that comes from having done a real assessment, not a gut check. |
| **Social** | The team needs to demonstrate to management, architecture review boards, and auditors that changes are preceded by structured health reviews — not just executed on instinct or based on one person's knowledge. |

---

## 3. Customer Problem and Outcome

**Problem:** There is no single system of record for "is this environment healthy right now?" Each tool shows a slice: SMP/E shows PTF currency, but not security posture. RACF panels show authority configuration, but not connection encryption state. Db2 ZPARMs show database configuration, but not CICS thread constraints that affect database throughput. No tool joins across these sources, which means the health picture is always incomplete — and the findings that slip through are the ones that span boundaries.

**Current State (Without Atlas):** A pre-go-live health check is assembled manually — one team member reviews PTF currency in SMP/E, another checks security settings in RACF panels, a third looks at Db2 ZPARMs. The review takes hours and produces no structured artifact. Cross-subsystem risks — like a CICS thread limit creating a Db2 contention scenario that would only show up under production load — are almost never identified before go-live because they require joining two different subsystem views that different specialists own.

**Desired Outcome:** A structured health assessment covering the full middleware stack — PTF currency, configuration compliance, security posture, and performance constraints — produced in a single Atlas conversation in under 30 minutes. Findings are ranked by severity, cross-subsystem risks are explicitly identified, and the output is a health artifact usable for governance sign-off. The team has a documented, auditable record that a health review was conducted before the event.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | The Pre-Go-Live Health Check is one of Atlas's highest-value, lowest-barrier demos. It requires no Change Intelligence capabilities — it runs entirely on System Intelligence — so it is available immediately at GA and does not require Lean PTF Orchestration or ZUnderstand to demonstrate value. It is a strong first-engagement scenario for new Atlas customers. |
| **Retention impact** | Organizations that run Atlas health checks as a pre-change ritual accumulate a library of health baselines over time. That library becomes increasingly valuable — as historical context for incident root cause analysis, as audit evidence, and as a capability maturity story the team can show leadership. The retention value compounds with each health check cycle. |
| **Competitive differentiation** | Concert for Z and OMEGAMON both provide monitoring views. SMP/E provides PTF data. None of them perform cross-source health synthesis. The finding type that Atlas generates — "this CICS thread limit creates a Db2 contention scenario under load, and this is not visible from either tool separately" — is not possible without Atlas's topology model. |
| **Portfolio attach** | This use case creates direct pull-through for IBM Z Software Discovery (PTF inventory source), IBM zSecure (security posture data), and IBM Instana or OMEGAMON (performance telemetry for performance-related findings). The health check is a natural integration showcase for multiple IBM Z portfolio products. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Zach — z/OS Systems Programmer (experienced) | Initiates the health check. Reviews findings and decides which to remediate before the event. Signs off on go-live readiness. |
| **Secondary** | Sage — Security Administrator (mid-level) | Consumes the security findings section of the health check. Validates that the security posture findings are appropriate for the event type. |
| **Secondary** | Derek — Compliance Evidence Provider | Uses the health check artifact as pre-event compliance evidence. The Pre-Audit Configuration Review scenario is Derek's primary entry point. |
| **Secondary** | Quinn — IT Operations Manager | Receives the health check artifact as a governance artifact. Approves or defers the event based on the finding severity profile. |

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary throughout.** All health assessment data — PTF currency, configuration state, security posture, subsystem configuration, cross-middleware relationships — is System Intelligence. The health check is the clearest demonstration of System Intelligence's cross-source synthesis value. | GA Dec 2026 |
| **Change Intelligence** | **Supporting (remediation path).** When health check findings require remediation before the event (e.g., applying a security PTF, fixing a CICS TLS configuration), Atlas transitions to Change Intelligence to generate and execute the remediation plan. | GA Dec 2026 (Lean MVP) |
| **Predictive Intelligence** | **Supporting (risk compounding).** Atlas identifies when a combination of individually non-critical findings creates a compound risk that is more serious than any single finding alone. This pattern matching is a Predictive Intelligence behavior. | Partial at GA (pattern-based); full H2 2027 |

**Why this use case leads with System Intelligence:** The health check's differentiating value is the cross-source join, not the change execution. A health check that surfaces "you have a missing security PTF" is useful; a health check that surfaces "you have a missing security PTF and an unencrypted IPIC connection, and together these create a compound risk that neither tool shows you separately" is uniquely Atlas.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Pre-Go-Live Health Check | **Current** | GA Dec 2026 | Config-as-Code multi-source join (CICS, Db2, MQ, z/OS Connect); PTF inventory via IZSAM Lite | Yes (GA) — and partially at TechXchange (Scenario 3 in demo doc) |
| Pre-Audit Configuration Review | **Current** | GA Dec 2026 | Same as above; structured health artifact export | Yes (GA) |
| Pre-Change-Window System Review | **Current** | GA Dec 2026 | Config-as-Code topology; Atlas change history baseline | Yes (GA) |
| Periodic System Health Report | **Current** | GA Dec 2026 | Same as above; scheduled report generation | Yes (GA) |

**Capability dependency notes:**

- All four scenarios are viable at GA Dec 2026 with the Config-as-Code discovery stack and IZSAM Lite in place.
- The TechXchange (Oct 26, 2026) demo can show the Pre-Go-Live Health Check against the Bank of Z environment using real discovered data from the July 3 discovery run. The specific findings — zero audit trail across CICS/Db2/z/OS Connect, IBMUSER authority concentration, unencrypted IPIC connection, MQ TLS gap, plaintext credential, CICS thread limit — are all real and can be demonstrated in a live session. This is Demo Scenario 3 in [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md).
- The compound risk identification behavior (finding that the missing security PTF is more dangerous in combination with the unencrypted IPIC connection) is present at GA as a pattern-matching behavior. Full probabilistic compound risk scoring requires Predictive Intelligence at H2 2027.

---

## 8. Scope and Boundaries

**In Scope:**
- PTF currency assessment: identifying missing PTFs, FIXCAT security gaps, HIPER items, and install warnings across all discovered subsystems
- Configuration compliance assessment: checking CICS, Db2, MQ, IMS, and z/OS Connect configuration against known best-practice patterns and security baselines
- Security posture assessment: RACF authority configuration, access control gaps, TLS/encryption state across connection paths, credential exposure
- Performance constraint identification: configuration settings that create contention, throughput limits, or buffer pool constraints under expected load
- Cross-subsystem compound risk identification: findings that span multiple subsystems and are more significant in combination than in isolation
- Health assessment artifact generation: structured, exportable document suitable for governance review and audit evidence
- Remediation initiation: for findings that require remediation before the event, Atlas transitions to a Change Intelligence workflow to plan and execute the fix
- Health baseline registration: Atlas records the post-assessment state as a baseline for ongoing drift monitoring

**Out of Scope:**
- Real-time performance monitoring during the event itself — that is operational monitoring (OMEGAMON, Instana); this use case is a pre-event assessment
- Deep forensic security investigation — Atlas surfaces findings; investigation belongs to security tooling (IBM QRadar, zSecure Audit)
- Network-layer scanning or penetration testing — Atlas assesses configured state; it does not perform active network probing
- Application-level regression testing — that belongs to UC-07 (Application Change Management) and UC-02 (Patch Management)

**Non-Goals:**
- Atlas does not certify system readiness in a regulatory or contractual sense — it produces evidence; human sign-off is required
- Atlas does not automatically remediate findings from a health check — it surfaces them and offers to plan remediation; the user decides what to act on

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The environment has been discovered by Atlas — Config-as-Code inventory covering CICS, Db2, MQ, z/OS Connect, and PTF inventory covering all discovered subsystems |
| **Assumption** | The health check is scoped to components Atlas has discovered; findings for undiscovered components are not possible |
| **Assumption** | Best-practice baselines used for configuration compliance assessment are maintained and current; outdated baselines produce false positives |
| **Dependency** | Config-as-Code (ZCONFIG / ZOSCONFIG / ZOSCONFIG-MQ / ZOSCONFIG-IMS) for configuration state of all subsystems |
| **Dependency** | IZSAM Lite for PTF inventory and FIXCAT classification data |
| **Dependency** | ibm.com PTF feed for current FIXCAT classifications |
| **Dependency** | Lean PTF Orchestration (GA Dec 2026) for remediation of PTF findings identified during the health check |
| **Risk** | Stale CaC data — if Config-as-Code has not been refreshed recently, the health check reflects a past state, not the current state. Atlas should surface data freshness prominently for each finding source. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Pre-Go-Live Health Check | Upcoming application go-live or major change event; user asks for a system health review | Current | Yes (TechXchange for Bank of Z; Yes GA for general) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc9-health-check.md`](../design/flows/uc9-health-check.md); [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 3 |
| Pre-Audit Configuration Review | Upcoming audit; user requests a compliance-focused health snapshot | Current | Yes (GA) | UX Flow, Chat Exchange | TBD |
| Pre-Change-Window System Review | Approaching maintenance window; user confirms the environment is stable before starting changes | Current | Yes (GA) | UX Flow, Chat Exchange | TBD |
| Periodic System Health Report | Scheduled or management-requested health artifact with no specific event trigger | Current | Yes (GA) | UX Flow, Chat Exchange, Screen designs | TBD |

**Design decisions for this scenario catalog:**

- The Pre-Go-Live Health Check is the canonical scenario and the primary demo vehicle. It is the most differentiated scenario because it surfaces cross-subsystem compound findings that no other tool produces. The Bank of Z real data (CICSTS62, DBD1, CSQ9, ZOSCSRV) is the grounding for this scenario at TechXchange.
- The four scenarios share the same underlying health check capability but differ in scope, framing, and output format. Pre-audit reviews emphasize compliance and evidence packaging. Pre-change reviews emphasize baseline drift since the last assessment. Periodic reports emphasize trend comparison against previous baselines.
- Remediation from any scenario triggers UC-02 (Patch Management) or UC-01 (Vulnerability Remediation) as the execution path. This use case ends at the finding and plan; those use cases own the execution.

---

## 11. Lifecycle Overview

```
Scope → Assess → Rank Findings → Generate Artifact → Remediate → Register Baseline
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Scope** | User defines the scope of the health check — full environment, a specific LPAR, a specific middleware stack, or a specific event type | User |
| **Assess** | Atlas joins Config-as-Code configuration data, PTF inventory, FIXCAT classifications, and security posture data across the scoped components; surfaces findings with source attribution | Atlas |
| **Rank Findings** | Atlas organizes findings by severity (critical, high, medium, low) and identifies compound risks where multiple findings interact | Atlas |
| **Generate Artifact** | Atlas produces the health assessment document — structured finding list with severity, source, recommendation, and remediation path for each item | Atlas |
| **Remediate** | User chooses which findings to remediate before the event; Atlas transitions to change execution for each selected item | Both |
| **Register Baseline** | After assessment (and remediation if applicable), Atlas records the current state as the health baseline for ongoing drift monitoring | Atlas |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Multi-source configuration data collection | Atlas | Joins CICS, Db2, MQ, z/OS Connect, RACF, z/OS, PTF inventory automatically |
| Finding identification and severity assignment | Atlas | Based on FIXCAT classification, IBM best-practice baselines, and compound risk pattern matching |
| Compound risk identification | Atlas | Atlas identifies when two independently non-critical findings combine to create higher risk |
| Health artifact generation | Atlas | Atlas produces the structured document; content is not manually authored |
| Finding prioritization for event sign-off | Shared | Atlas recommends priorities; user decides what is acceptable risk for this event |
| Remediation decision | User | The user decides which findings to remediate before the event; Atlas does not automatically remediate |
| Production remediation authorization | User | Any change execution requires explicit human authorization |
| Registering the health baseline | Atlas | Atlas records post-assessment state; user can annotate or accept |

**Governance gates:** The health check produces findings that require human review and acceptance. Atlas does not advance to remediation without the user selecting specific items. Health artifact distribution and go-live sign-off are entirely human decisions that Atlas does not initiate.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Cross-source configuration join** | Atlas joins CICS CSD, Db2 ZPARMs, MQ channel definitions, z/OS Connect config, and PTF inventory in a single query | This is the finding type that does not exist without AI — "this CICS thread limit creates a contention scenario in Db2 that neither tool shows separately" |
| **Compound risk identification** | Atlas identifies when a missing security PTF and an unencrypted connection combine to create higher compound risk than either finding alone | No human systematically checks these combinations across all subsystems before every event; Atlas does it in every session |
| **Natural language health query** | User can ask "are there any performance constraints that would cause us problems under Black Friday load?" without knowing how to express that query across four separate tools | Democratizes the health check — not just Zach can run it; any team member with Atlas access can request it |
| **Health baseline comparison** | Atlas compares the current assessment against the last registered health baseline to surface what is new since the last review | This is the pre-change-window scenario's key value — not re-discovering known findings, but highlighting what has changed |
| **Prioritized remediation path generation** | For each critical finding, Atlas immediately offers a remediation plan, not just a finding | Reduces the gap between identifying a problem and fixing it; the health check and the fix are part of one workflow |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Health check cycle time | Time from assessment request to health artifact delivery | 2–8 hours (manual, multi-tool) | Under 30 minutes |
| Cross-subsystem finding rate | Number of compound (cross-subsystem) findings identified per assessment | Near zero (not systematically checked today) | 2–5 per assessment in environments with active Atlas discovery |
| Go-live incident rate for Atlas-health-checked changes | Percentage of Atlas-health-checked changes that result in a production incident | Baseline varies; estimated 8–12% for complex changes | Under 4% |
| Health artifact adoption | Percentage of significant changes preceded by an Atlas health check artifact | 0% today | 80%+ for changes in Atlas-active environments |
| Known finding recurrence | Percentage of health check findings that reappear in the next assessment because they were not remediated | Unknown baseline | Under 20% of critical findings |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| CaC data is stale — health check reflects a past state | Atlas flags the data freshness timestamp for each finding source and explicitly warns when data is older than a threshold | User triggers a rediscovery pass before proceeding with the health check |
| A subsystem has not been discovered — findings are missing | Atlas explicitly states that the subsystem was not assessed due to no discovery data; it does not produce a false-clean result | User works with the Atlas admin to onboard the missing subsystem |
| A finding is a known false positive based on site-specific configuration | Atlas surfaces the finding; if it has been previously acknowledged as accepted risk, it is flagged as such rather than treated as new | User marks findings as accepted risk with a rationale; Atlas records the acknowledgment in the health artifact |
| Remediation of a finding identified during the health check introduces a new finding | The remediation workflow (UC-02 / UC-01) validates in an isolated environment before production apply; if a new finding appears during validation, Atlas surfaces it before proceeding | User reviews the new finding; decides whether to remediate or proceed with the original fix only |
| Health artifact export fails | Atlas retains the artifact in session history; export retry is available | User retries export; alternatively, Atlas can regenerate the artifact from the assessment data in the same session |
| A go-live proceeds without a health check | Atlas cannot prevent this — it can only surface health findings when asked | Governance enforcement is a human responsibility; Atlas supports it by making health checks fast and easy |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Pre-change health review | Many regulated organizations require documented evidence that a health review was conducted before a significant change | Atlas health check artifacts serve as the documented evidence; they carry timestamp, scope, finding list, and assessment author |
| Change record linkage | The health check artifact should be linkable to the associated change record in the ITSM system | Atlas generates the artifact as an exportable document; ServiceNow integration (H2 2027) will automate linkage |
| Audit evidence packaging | The Pre-Audit Configuration Review scenario produces an artifact specifically for auditor consumption | Atlas formats the artifact with source citations and produces a compliance-focused summary suitable for non-technical review |
| Finding acknowledgment record | Accepted-risk findings should be acknowledged with a named user and rationale | Atlas records finding acknowledgments in the health assessment artifact |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-01: Vulnerability Remediation | The health check frequently identifies FIXCAT security PTF gaps. When a finding meets the FIXCAT SEC/INT threshold, Atlas should offer to initiate the UC-01 vulnerability response workflow. The two use cases share the PTF inventory data source and the blast radius assessment capability. |
| UC-02: Patch Management | PTF currency findings from the health check are the natural entry point for UC-02. A health check that finds 3 missing PTFs feeds directly into a patch management workflow to plan and apply them. |
| UC-03: Audit and Compliance | The Pre-Audit Configuration Review scenario produces artifacts that feed directly into UC-03's evidence assembly workflow. The two use cases share finding data and should share output format. |
| UC-09: Environment Parity and Drift Control | The Pre-Change-Window System Review scenario compares current state against the registered health baseline — which is the same drift detection capability UC-09 uses for continuous monitoring. The difference is cadence: UC-06 is event-driven; UC-09 is continuous. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Scheduled health check automation** | H1 2027 | Atlas runs a health check on a user-defined schedule (weekly, monthly, pre-change-window) and delivers the artifact without a user prompt. Requires a scheduling and notification model in Atlas. |
| **Health posture score** | H1 2027 | Atlas maintains a rolling health score per LPAR and per middleware stack — a single number that reflects the current findings profile. Visible on the topology canvas without initiating a conversation. Changes in the score trigger alerts. |
| **Benchmark comparison** | H2 2027 | Atlas compares the customer's health posture against an anonymized peer cohort (similar environment size, industry, software stack). "Your FIXCAT gap rate is 2x the peer median" is a compelling governance metric. Requires data from multiple Atlas instances. |
| **Agentic remediation of low-risk health check findings** | H2 2027 | For health check findings with well-understood, low-risk remediation patterns (e.g., a routine FIXCAT SEC/INT PTF with no shared dependencies), Atlas proposes and executes the remediation without a separate conversation. Human approval still required at each production authorization gate. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-06](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`design/flows/uc9-health-check.md`](../design/flows/uc9-health-check.md) | Complete 9-step Pre-Go-Live Health Check scenario with real Bank of Z findings; pillar activation summary; canonical compound finding examples (zero audit trail, IBMUSER authority concentration, IPIC plaintext, MQ TLS gap, CICS thread limit) |
| [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 3 | Bank of Z live demo script for the Pre-Go-Live Health Check; real discovered data from 2026-07-03 discovery run; 5-source aggregation proof |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 1 capability "Health Check artifact generation" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | Q3 MVP use case "Health Check" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Zach, Sage, Derek, Quinn |
