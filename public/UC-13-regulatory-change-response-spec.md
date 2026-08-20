# UC-13: Regulatory Change Response
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

A new regulatory requirement arrives with a 90-day compliance deadline. Today, the first month of that window is spent figuring out what you even have — inventorying regulated data, mapping access controls, and identifying gaps across an environment that no single tool fully describes. Atlas compresses that discovery phase from weeks to hours, so the compliance team can spend the deadline doing remediation, not investigation. It also closes a gap that no competitor addresses: post-remediation monitoring that catches new regulated data or configurations that fall into scope after the initial work is done.

---

## 1. Overview

Regulatory Change Response covers the full arc from "new regulation announced" to "evidence package delivered to regulators": discovering the regulated scope across the entire z/OS estate, identifying access control and encryption gaps, executing remediation, and producing compliance evidence. It is distinct from Audit and Compliance (UC-03), which is about evidencing current state for periodic audits. Regulatory Change Response is about changing current state to meet a new requirement — the difference between reporting and remediating.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When a new regulatory requirement arrives with a compliance deadline, I want to know within hours what I have that falls under the regulation's scope, what needs to change, and what the fastest safe path to compliant state is — so I can meet the deadline without disrupting production operations and without discovering gaps only when regulators review our evidence package. |
| **Emotional** | The compliance team wants to stop operating in uncertainty — not knowing if they have found all the regulated data, not knowing if their remediation missed something. They want the confidence of a complete inventory and a verified compliant state, not a best-effort estimate. |
| **Social** | The CISO and the compliance function need to demonstrate to regulators and the board that the organization has a systematic, reproducible compliance process — not a heroic scramble that produces inconsistent results. |

---

## 3. Customer Problem and Outcome

**Problem:** When a new regulation arrives, the first challenge is not compliance — it is discovery. IBM Z organizations run regulated data in datasets, databases, IMS segments, and application programs that are not cataloged in any single system. Identifying all regulated data across 6 LPARs, 34 Db2 tables, 12 VSAM files, and 6 IMS segments currently requires weeks of manual investigation. The team is often still discovering scope when the deadline is approaching, leaving insufficient time for remediation and validation.

**Current State (Without Atlas):** Regulatory response is a multi-team manual project. The security team reviews RACF profiles. The DBA reviews Db2 access controls. The application team identifies programs that touch regulated data. No one has the full picture until it is assembled by hand — and the assembly process itself takes weeks. Post-remediation verification is minimal; new regulated data that appears after remediation is typically not detected until the next audit cycle.

**Desired Outcome:** Atlas inventories all regulated data across the entire z/OS estate in hours. Atlas maps the access control gaps, identifies encryption gaps, and sequences the full remediation workstream in a single conversation. After remediation, Atlas monitors continuously for new data and configurations that fall under the regulation's scope and alerts before they become compliance gaps. The compliance evidence package is generated directly from Atlas's verified compliant state.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Regulatory Change Response is Atlas Base's strongest compliance buyer entry point. The regulatory deadline creates urgency that accelerates purchase decisions — organizations do not defer when they have a 90-day window. This use case is also a direct driver for the Atlas Base value proposition with compliance-focused buyers (CISO, Chief Compliance Officer). |
| **Retention impact** | Organizations that use Atlas for regulatory compliance build an accumulating history of compliance state, remediation evidence, and posture monitoring in Atlas. That history is essential for recurring audits and for demonstrating compliance maturity to regulators over time. |
| **Competitive differentiation** | IBM zSecure provides RACF access control views; Db2 provides its own audit configuration. Neither inventories regulated data across the full estate or sequences a multi-workstream remediation plan. Atlas is the only system that joins the regulated data inventory, access control gap analysis, encryption configuration, and remediation sequencing in a single workflow. |
| **Portfolio attach** | This use case creates pull-through for IBM zSecure (RACF access control data source for gap analysis), IBM Key Management (encryption at rest — Lupita persona's domain), and IBM Db2 native encryption (for regulated Db2 table data). The regulatory response workflow is a natural showcase for IBM's broader Z security portfolio. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Sage — Security Administrator (mid-level) | Owns the regulatory response project. Initiates the scope analysis, reviews the gap findings, drives the remediation workstream, and produces the compliance evidence package. |
| **Secondary** | Derek — Compliance Evidence Provider | Documents the compliance state and assembles the evidence package for regulators. Consumes Atlas's inventory and remediation records as the source for compliance documentation. |
| **Secondary** | Lupita — Key Management and Cryptography Services | Manages encryption at rest and key management for regulated datasets. Provides sign-off on the encryption workstream within the regulatory response. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Executes system-level remediations — RACF profile updates, dataset encryption configuration, batch job credential changes — that require systems programming access. |
| **Secondary** | Quinn — IT Operations Manager | Monitors the remediation workstream for operational impact. Reviews sequencing to ensure remediations do not disrupt production operations. |

Reference [`personas.md`](../personas.md).

**Persona note — Lupita:** Lupita's profile in [`personas.md`](../personas.md) is still in development. For this use case, she is the specialist who owns encryption configuration, key management, and cryptographic policy for regulated data at rest and in transit.

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary (Discover and Assess phases).** Regulated data inventory across datasets, Db2 tables, IMS segments, and VSAM files — and access control gap analysis comparing current RACF profiles to regulatory requirements — are System Intelligence capabilities. | GA Dec 2026 |
| **Change Intelligence** | **Primary (Execute phase).** Remediation sequencing, batch job credential updates, RACF restriction execution, encryption enablement, and audit trail configuration are Change Intelligence capabilities. The execution workstream for regulatory response depends on Change Intelligence. | GA Dec 2026 (Lean MVP for RACF and configuration changes); H1 2027 (full encryption workstream orchestration) |
| **Predictive Intelligence** | **Supporting (Monitor phase).** Post-remediation monitoring for new regulated data and configurations that fall into regulatory scope is Predictive Intelligence — Atlas monitors without being asked and alerts before a new gap becomes a compliance problem. | Partial at GA; full H2 2027 |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Data Privacy Regulation Implementation | **Current** | GA Dec 2026 | Config-as-Code regulated data discovery; RACF gap analysis; DFSMS encryption orchestration | Yes (GA) |
| Security Controls Mandate | **Current** | GA Dec 2026 | Config-as-Code security configuration comparison against required state | Yes (GA) |
| Compliance Evidence Package Generation | **Current** | GA Dec 2026 | Atlas inventory and remediation audit trail; structured export | Yes (GA) |
| Continuous Regulatory Posture Monitoring | **Current (partial)** | GA Dec 2026 partial; H2 2027 full | New dataset detection via Config-as-Code monitoring at GA; behavioral data access pattern monitoring at H2 2027 | Yes (GA partial) |

**Capability dependency notes:**

- The Data Privacy scenario from Kyle's uc8 is fully demonstrable at GA. All key workflow steps — regulated data inventory, access control gap analysis, sequenced remediation, post-remediation new dataset detection (Step 8) — are System Intelligence and Change Intelligence capabilities available at GA.
- The continuous regulatory posture monitoring scenario is partially available at GA (detecting new regulated datasets via Config-as-Code monitoring) and reaches full capability at H2 2027 (behavioral monitoring for data access patterns that suggest new regulated data is being processed).
- Encryption workstream orchestration (DFSMS for dataset encryption, Db2 native encryption for regulated tables) involves coordinating with Lupita's key management domain. The orchestration capability is in the Lean Change Intelligence MVP but the key management integration depth depends on the IBM Key Management integration roadmap.

---

## 8. Scope and Boundaries

**In Scope:**
- Regulated data inventory: identifying all datasets, Db2 tables, IMS segments, and VSAM files containing regulated data across all LPARs
- Access control gap analysis: comparing current RACF permissions for regulated data against regulatory requirements; identifying user IDs and service accounts with excess access
- Encryption gap analysis: identifying regulated datasets and database objects without encryption at rest or with unencrypted access paths
- Audit trail gap analysis: identifying regulated data access paths with no RACF SMF logging or Db2 audit policy
- Remediation sequencing: generating the safe order for executing all three workstreams (access control, encryption, audit trail) to avoid production disruption — particularly for batch jobs whose credentials will be affected
- Remediation execution: applying RACF restrictions, enabling DFSMS encryption, configuring Db2 native encryption, enabling RACF SMF logging and Db2 audit policy
- Post-remediation monitoring: detecting new regulated datasets or configurations that fall into scope after initial remediation
- Compliance evidence package generation: structured documentation of the compliant state, suitable for regulator review

**Out of Scope:**
- Legal interpretation of regulatory requirements — Atlas maps stated requirements to environment state; legal interpretation of what the regulation requires is a compliance and legal function responsibility
- Distributed system compliance — Atlas manages the IBM Z estate; compliance for distributed or cloud-hosted regulated data is out of scope
- Data classification (deciding whether data is regulated) — Atlas applies a provided classification scheme to discover regulated data; classification policy decisions are a compliance function responsibility

**Non-Goals:**
- Atlas does not produce a legal attestation that the environment is compliant — it produces a technical evidence package; legal and compliance attestation is a human responsibility
- Atlas does not replace the compliance team's judgment — it provides the inventory, analysis, and evidence; compliance decisions are human decisions

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The compliance team has defined what constitutes regulated data for this regulation — naming conventions, data classification rules, or a specific list of regulated datasets that Atlas can use as a discovery scope |
| **Assumption** | The environment has been discovered by Atlas — RACF configuration, Db2 ZPARMs, VSAM catalog, IMS definitions, and dataset allocations are available in the topology |
| **Dependency** | Config-as-Code (ZCONFIG including RACF profiles, Db2 ZPARMs, VSAM catalog) for regulated data and access control state |
| **Dependency** | RACF SETROPTS extract and IRRUT100 for access control profile inventory |
| **Dependency** | Lean Change Intelligence (GA Dec 2026) for RACF and configuration remediation execution |
| **Dependency** | DFSMS encryption management for dataset encryption at rest workstream |
| **Dependency** | Lupita (Key Management and Cryptography) organizational engagement for encryption key management during the encryption workstream |
| **Risk** | Regulated data discovery scope is bounded by what Atlas has discovered. Datasets on undiscovered volumes or applications using non-standard naming conventions may not appear in the inventory. Compliance teams should treat the Atlas inventory as a starting point for review, not a guaranteed complete list, until discovery coverage is confirmed. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Data Privacy Regulation Implementation | New data privacy regulation with a compliance deadline; user initiates scope analysis | Current | Yes (GA) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc8-regulatory-response.md`](../design/flows/uc8-regulatory-response.md) |
| Security Controls Mandate | Regulatory or internal mandate requires specific security configurations across the environment | Current | Yes (GA) | UX Flow, Chat Exchange | TBD |
| Compliance Evidence Package Generation | Post-remediation; user requests a structured evidence package for regulator submission | Current | Yes (GA) | UX Flow, Chat Exchange | [`design/flows/uc8-regulatory-response.md`](../design/flows/uc8-regulatory-response.md) Step 9 |
| Continuous Regulatory Posture Monitoring | Atlas detects a new regulated dataset or configuration after initial remediation and alerts | Current (partial) | Yes (GA partial) | UX Flow, Chat Exchange | [`design/flows/uc8-regulatory-response.md`](../design/flows/uc8-regulatory-response.md) Step 8 |

**Design decisions for this scenario catalog:**

- Kyle's uc8 covers the full regulatory response lifecycle in a single script and it is excellent. All four scenarios emerge from that script. Splitting into separate scenarios here is about design clarity — the continuous monitoring scenario (Step 8: 3 new datasets detected post-remediation) is a distinct capability moment that warrants its own UX design and measurement, even though it occurs in the same session as the initial response.
- The proactive sequencing risk detection in Kyle's Step 3 (Atlas identifies that batch job credential changes must precede access control restrictions) is the strongest Predictive Intelligence moment in this use case and should be preserved prominently in demo planning.

---

## 11. Lifecycle Overview

```
Scope → Inventory → Analyze → Sequence → Execute → Verify → Monitor → Evidence
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Scope** | User provides the regulatory requirement summary or classification criteria; Atlas confirms the scope of the analysis | Both |
| **Inventory** | Atlas discovers all regulated data across the estate — datasets, Db2 tables, IMS segments, VSAM files — and maps all user IDs and service accounts with current access | Atlas |
| **Analyze** | Atlas compares current access control, encryption, and audit trail configuration against what the regulation requires; produces the gap analysis with severity and count by workstream | Atlas |
| **Sequence** | Atlas generates the safe remediation sequence — identifying dependencies between workstreams (e.g., batch job credentials must be updated before access restrictions are applied) | Atlas |
| **Execute** | User authorizes each workstream; Atlas executes in sequence — credential updates, access control restrictions, encryption enablement, audit trail configuration | Both |
| **Verify** | Atlas confirms each workstream completed without production disruption; monitors for errors and unexpected access failures for 48 hours post-change | Atlas |
| **Monitor** | Atlas continues monitoring for new regulated data and configurations that fall into scope after the initial remediation | Atlas |
| **Evidence** | User requests the compliance evidence package; Atlas generates a structured document covering inventory, gap findings, remediation steps, and current compliant state | Both |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Regulated data discovery | Atlas | Automated inventory from Config-as-Code and RACF data |
| Access control gap analysis | Atlas | Atlas compares current RACF permissions to stated regulatory requirements |
| Encryption gap analysis | Atlas | Atlas identifies unencrypted regulated datasets and access paths |
| Remediation workstream sequencing | Atlas | Atlas identifies the safe execution order; user reviews and approves the sequence before execution |
| Batch job credential updates | Shared | Atlas executes the update in an isolated environment first; user approves production apply |
| Access control restriction execution | Shared | Atlas executes RACF changes; user authorizes each production apply |
| Encryption enablement | Shared | Atlas orchestrates DFSMS and Db2 encryption; Lupita manages key provisioning |
| Production authorization for each remediation workstream | User | Sage and Zach authorize each production change |
| Compliance evidence package generation | Atlas | Atlas generates from verified compliant state; Sage and Derek review before submission |
| Legal attestation of compliance | User | The compliance and legal team is responsible for the attestation; Atlas provides the evidence |

**Governance gates:** Each remediation workstream (access control, encryption, audit trail) requires explicit authorization before Atlas executes against production. The compliance evidence package requires named review and approval before submission to regulators.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Multi-source regulated data inventory** | Atlas discovers regulated data across datasets, Db2 tables, IMS segments, and VSAM files in a single pass | A manual inventory of this scope takes weeks; Atlas produces it in hours |
| **Dependency-aware remediation sequencing** | Atlas identifies that batch job credentials must be updated before access restrictions are applied — avoiding production batch failures | This cross-workstream dependency is the class of error that causes compliance remediations to generate incidents; Atlas makes it explicit before execution |
| **Post-remediation gap detection** | Atlas detects 3 new regulated datasets created after the initial remediation and alerts before they become a compliance failure | No existing tool provides this monitoring; compliance teams currently discover new gaps only at the next audit cycle |
| **Multi-workstream evidence packaging** | Atlas generates a structured compliance evidence package that covers all three workstreams — access control, encryption, audit trail — with source citations and verification timestamps | Manual evidence assembly for a complete regulatory response takes days; Atlas generates it in minutes from the verified compliant state |
| **Compliance posture as a continuous state** | Atlas maintains a running picture of compliance posture — not just a point-in-time snapshot — so the answer to "are we compliant?" is always current | This shifts compliance from a periodic event to a continuous operational discipline |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Regulated data discovery time | Time from "start the inventory" to complete regulated data inventory across the full estate | 2–4 weeks (manual) | Under 1 day |
| Compliance deadline attainment rate | Percentage of regulatory response projects that achieve compliant state before the stated deadline | Estimated 70–80% (scope discovery delays eat into remediation time) | 95%+ |
| Post-remediation gap detection | Number of new regulated data items detected by Atlas within 90 days of initial remediation | 0 today (no monitoring exists) | 100% of new items detected before the next audit cycle |
| Evidence package preparation time | Time to produce a complete compliance evidence package after achieving compliant state | 1–2 weeks (manual assembly) | Under 4 hours |
| Compliance remediation-caused production incidents | Number of production incidents caused by remediation sequencing errors | Estimated 1–2 per large regulatory response project | Zero with Atlas sequencing analysis |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| A regulated dataset is not discovered because it uses non-standard naming conventions | Atlas surfaces its inventory with explicit discovery coverage statements; does not claim a complete inventory if naming conventions were not matched | Sage reviews the coverage statement and supplements with manual verification for areas where naming conventions are non-standard |
| A batch job fails after access control restrictions are applied | Atlas monitors for batch job failures in the 48 hours post-change; alerts immediately with the specific job and failure reason | Zach investigates; if Atlas missed a credential dependency in the sequencing analysis, Atlas adds the missed dependency and generates a corrective plan |
| The encryption workstream fails for a specific dataset type | Atlas surfaces the failure with root cause (e.g., dataset in use, incompatible storage type); continues with other datasets in the workstream | Lupita and Zach investigate the specific failure; Atlas retries when the blocking condition is resolved |
| A new regulated dataset is created by a process not previously seen | Atlas detects the new dataset in the next monitoring cycle and alerts; attributes the creation to the process or user ID that created it | Sage reviews the alert; decides whether to immediately remediate or schedule remediation in the next change window |
| The compliance evidence package is challenged by regulators on a specific item | Atlas has source citations and verification timestamps for each item in the evidence package; Atlas can regenerate the specific item's evidence trail | Derek uses Atlas's source citations to answer the specific challenge; if the item is disputed, Atlas can re-run the analysis on demand |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Evidence of regulated data inventory | Regulators require documented evidence that all regulated data was identified and assessed | Atlas generates a dated, scoped inventory with source attribution for every identified item |
| Change record for each remediation workstream | Compliance remediations are production changes and require change records | Atlas generates change record templates for each workstream; ServiceNow integration (H2 2027) automates linkage |
| Post-remediation verification | Regulators expect evidence that remediation was verified, not just executed | Atlas's 48-hour post-change monitoring produces a verification artifact; included in the evidence package |
| Compliance evidence package for regulators | Regulators require a structured evidence package demonstrating current compliant state | Atlas generates the evidence package directly from its verified inventory and change history |
| Continuous compliance monitoring | Some regulatory frameworks (e.g., DORA) require ongoing compliance monitoring, not just point-in-time certification | Atlas's continuous regulatory posture monitoring provides the operational evidence for continuous compliance claims |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-01: Vulnerability Remediation | Security control mandates within regulatory response often involve security PTF gaps as well as configuration changes. UC-01 and UC-13 can be triggered simultaneously by a regulation that addresses both access controls (UC-13) and security vulnerabilities (UC-01). The two use cases share the RACF and security configuration data sources. |
| UC-03: Audit and Compliance | UC-13 produces the compliant state; UC-03 produces evidence of that state for periodic audits. The two use cases are sequential: UC-13 remediates; UC-03 evidences. They share the compliance evidence package format. |
| UC-06: Change Readiness and Health Assessment | A health check (UC-06) may surface regulatory compliance gaps as part of its pre-event review. When a health check finding meets the threshold for regulatory significance, it should trigger a UC-13 workflow to address it before the compliance deadline. |
| UC-14: Change Governance and Traceability | Every remediation executed during a regulatory response is a production change that must be traceable. UC-14 owns the change attribution and audit trail infrastructure that UC-13's remediation events feed into. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Regulation-to-environment mapping knowledge base** | H1 2027 | Atlas maintains a knowledge base of common regulatory frameworks (PCI DSS, DORA, SOX, GDPR, HIPAA) and their specific control requirements mapped to IBM Z configuration items. When a regulation is selected, Atlas automatically applies the right requirement framework to the gap analysis — without the compliance team needing to manually specify which configurations to check. |
| **Continuous compliance posture score** | H2 2027 | Atlas maintains a rolling compliance score per regulation, per LPAR, and per application — reflecting the current gap profile. Visible on the topology canvas. Executives and auditors can ask "what is our current DORA compliance posture?" and get an up-to-date answer without initiating a project. |
| **Agentic new regulated data remediation** | H2 2027 | When Atlas detects a new regulated dataset via post-remediation monitoring, it automatically applies the required RACF protection, encryption, and audit trail configuration — without waiting for the next compliance project. Human approval required; Atlas executes. |
| **Multi-regulation overlap analysis** | 2028+ | For organizations subject to multiple overlapping regulatory frameworks (PCI DSS + DORA + SOX), Atlas identifies where requirements overlap and where they conflict, and generates a unified remediation plan that satisfies all frameworks simultaneously. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-13](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`design/flows/uc8-regulatory-response.md`](../design/flows/uc8-regulatory-response.md) | Complete 9-step Data Privacy Regulation Implementation scenario; Steps 1–9 cover the full lifecycle; Step 3 (sequencing risk prediction — batch job credentials before access restrictions) and Step 8 (3 new regulated datasets detected post-remediation) are the canonical capability demonstrations |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 1 "Regulatory Change Response" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | Q3 MVP use case "Regulatory Change Response" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Sage, Derek, Lupita, Zach, Quinn |
