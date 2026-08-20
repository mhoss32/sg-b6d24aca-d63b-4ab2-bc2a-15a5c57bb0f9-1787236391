# UC-03: Audit and Compliance
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

Preparing for a SOX, PCI, or internal compliance audit on IBM Z today means weeks of manual evidence assembly by the most experienced people on the team — querying RACF, pulling change logs, reconciling configuration state across LPARs, and hoping nothing was missed. Atlas holds a continuous, timestamped record of the entire environment. An audit that previously took days of investigation takes hours, produces structured auditor-ready artifacts, and — critically — surfaces the undocumented changes and configuration deviations before the auditor finds them.

---

## 1. Overview

Audit and Compliance covers everything a regulated organization needs to demonstrate that their IBM Z environment is operating within defined security and governance boundaries: privileged access reports, configuration compliance against defined baselines, 12-month change history, separation of duties analysis, and the identification and remediation of undocumented changes. It is a GA use case, available from Atlas Base at Dec 2026, and one of the clearest early business cases for Atlas in financial services, healthcare, and any other regulated industry with a mainframe footprint.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When an audit cycle opens — whether SOX, PCI, internal, or regulatory — I want to produce complete, structured, auditor-ready evidence from my IBM Z environment without spending weeks manually assembling it from RACF, change logs, and configuration exports, so I can meet the deadline without disrupting the team's normal operations. |
| **Emotional** | Derek wants to walk into the auditor meeting with a complete evidence package he is confident in — not a collection of exports he is quietly hoping covers everything. Sage wants to know about the undocumented changes and configuration deviations before the auditor does. |
| **Social** | The compliance team needs to demonstrate to auditors, executive leadership, and the board that the IBM Z environment is governed, traceable, and compliant — not a black box that requires a heroic effort to inspect and that produces different answers depending on who you ask. |

---

## 3. Customer Problem and Outcome

**Problem:**
IBM Z audit preparation is among the most time-consuming and expert-dependent compliance activities in enterprise IT. The evidence an auditor needs — privileged access reports, configuration state snapshots, change history, separation of duties analysis — exists across multiple systems (RACF, SMP/E, PARMLIB, change management tickets) with no unified view. Assembling it manually takes weeks of engineering time, is error-prone, and produces evidence that is point-in-time rather than continuous. Organizations routinely discover compliance gaps — undocumented changes, dormant privileged accounts, configuration deviations from baseline — during the audit rather than before it, when remediation is more expensive and the audit relationship is already under pressure.

**Current State (Without Atlas):**
- Privileged access reports require manually querying RACF across each LPAR and consolidating results by hand. For a 6-LPAR production estate, this is a multi-day task.
- Configuration compliance requires comparing the current state of PARMLIB members, RACF settings, and middleware parameters against the defined baseline — a process that relies on experienced engineers comparing exports in spreadsheets.
- Change history requires reconciling system logs, change management tickets, and SMP/E records — which only intersect cleanly when change management discipline has been consistently maintained. Gaps in that discipline surface as audit findings.
- Separation of duties analysis across 30+ users with elevated access is performed manually by the security team, typically under deadline pressure.
- Undocumented changes — configuration modifications with no corresponding change record — are discovered during the audit, not before. There is no proactive detection mechanism.
- Remediation of compliance gaps discovered during audit prep requires the same engineers who are already stretched assembling evidence. Remediations under time pressure are more likely to create new gaps.

**Desired Outcome:**
- Derek can ask Atlas "what do we need for the SOX audit?" and receive a complete, scoped evidence inventory within minutes — no manual cross-referencing required.
- Privileged access reports, configuration compliance analysis, and 12-month change history are generated as structured, auditor-ready artifacts from Atlas's continuous environment record.
- Undocumented changes are surfaced proactively — Atlas flags the 46 changes with no change record before the audit begins, not during it.
- Configuration deviations from the defined baseline are quantified and classified — compliance percentage, specific deviations, severity, and recommended remediation for each.
- Behavioral anomalies in the privileged access record (e.g., a dormant SPECIAL user who was active outside a change window) are surfaced automatically by Atlas, without requiring the engineer to know to look for them.
- Compliance remediations are planned and validated by Atlas before they are applied — changes made to close audit findings do not inadvertently create new gaps.
- The complete evidence package — including any remediations applied before the audit — is available as an exportable, auditor-ready artifact.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Audit and Compliance is a GA Dec 2026 capability in Atlas Base. It is one of the most immediate business cases for Atlas in regulated industries — financial services, healthcare, and insurance organizations on IBM Z all have recurring SOX, PCI, or internal audit cycles. The ROI argument is straightforward: weeks of engineering time reduced to hours. This is a buyer-level conversation with the CISO, compliance officer, and IT finance owner — not just the systems programming team. |
| **Retention impact** | Atlas's audit value compounds over time. The 12-month change history, the configuration compliance baseline, and the evidence packages from prior audits are only accessible if Atlas stays connected. Organizations that run one audit cycle through Atlas are structurally incentivized to run the next one through Atlas. |
| **Competitive differentiation** | No existing z/OS tool produces a structured, auditor-ready compliance evidence package from a single query. RACF reporting tools, SMP/E, and OMEGAMON each provide fragments. Atlas is the only system with a continuous, cross-source environment record that can generate the complete picture. The undocumented change detection capability — finding changes with no change record — is particularly differentiating; no single-source tool can produce this. |
| **Portfolio attach** | Audit and Compliance creates natural pull-through for IBM zSecure (RACF compliance reporting), IBM Verify (identity and access management), and IBM Security Guardium (data access governance). Atlas provides the cross-source compliance picture; these tools provide the deeper security controls. The Atlas compliance evidence package can be positioned as the Z-layer input to a broader enterprise GRC (Governance, Risk, Compliance) program. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Derek — Compliance Evidence Provider | Owns audit preparation. Initiates Atlas compliance workflows, reviews evidence artifacts, and delivers the evidence package to auditors. Needs structured, auditor-ready output — not raw data. Does not have deep z/OS technical expertise; relies on Atlas to assemble and interpret the evidence. |
| **Secondary** | Sage — Security Administrator (mid-level) | Owns the security posture that audit evidence reflects. Reviews privileged access reports, RACF configuration compliance findings, and separation of duties analysis. Investigates flagged anomalies before the audit. Needs every audit cycle to go smoothly; undocumented changes surfaced by Atlas are her responsibility to investigate and resolve. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Subject matter expert for configuration compliance and change history. Reviews Atlas findings on PARMLIB deviations and undocumented changes. Executes any compliance remediations that require z/OS-level changes. |
| **Secondary** | Quinn — IT Operations Manager | Receives the compliance readiness summary before the audit opens. Approves remediation scope. Needs a management-level view of compliance posture — percentage compliant, number of open findings, remediation timeline — not the technical detail. |

Reference [`personas.md`](../personas.md).

**Key design implication — Derek is not a z/OS expert.** Atlas must present audit findings in language a compliance professional can use directly with auditors, not in z/OS technical shorthand. The evidence package format must be designed with auditor consumption in mind, not just engineering consumption. Every finding should include: what it is, why it matters for the relevant compliance framework, what the current state is, and what Atlas has done or recommends to remediate it.

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary.** The entire evidence generation capability is System Intelligence: the continuous environment record, RACF access data, configuration state snapshots, change history, and cross-source compliance analysis. Atlas can only produce audit artifacts because it maintains a living, timestamped record of the environment. | GA Dec 2026 |
| **Predictive Intelligence** | **Supporting.** Proactive anomaly detection — surfacing behavioral patterns in privileged access data (dormant SPECIAL user active outside change window), identifying clusters of undocumented changes in a narrow time window, and continuous compliance posture monitoring — are Predictive Intelligence behaviors. They appear as proactive Atlas observations within the audit workflow, not as a separate pillar activation. | Partial at GA (proactive observations in conversation); full Predictive Intelligence at H2 2027 |
| **Change Intelligence** | **Remediation path.** When Atlas identifies a compliance deviation — an out-of-baseline RACF SETROPTS setting, a configuration parameter drift — and the user asks to remediate it before the audit, the remediation plan generation, test validation, and apply path runs through Change Intelligence. | GA Dec 2026 (basic remediation); H1 2027 (full orchestration) |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| SOX IT General Controls Audit | **Current** | GA Dec 2026 | Audit & Compliance artifact generation skill; RACF data in System Intelligence model; Config-as-Code change history | Yes (GA) |
| PCI Compliance Review | **Current** | GA Dec 2026 | PCI-scoped data component mapping; encryption posture analysis; access control evidence | Yes (GA) |
| Internal Compliance Review | **Current** | GA Dec 2026 | Configurable hardening baseline; configuration compliance comparison; deviation report | Yes (GA) |
| Undocumented Change Investigation | **Current** | GA Dec 2026 | Config-as-Code change history; ServiceNow change record correlation (for authorized/unauthorized classification) | Yes (GA) — full classification requires ServiceNow integration |

**Capability dependency notes:**

- All four scenarios are available at GA Dec 2026. This is a fully current use case.
- The **Undocumented Change Investigation** scenario's ability to classify changes as authorized vs. unauthorized (rather than just "no matching change record found") depends on ServiceNow integration being available and configured. Without ServiceNow, Atlas surfaces changes with no record in its own audit log — which is still highly valuable but cannot confirm whether a change record exists in an external ITSM system. Full classification requires H2 2027 ServiceNow integration.
- The **Health Check scenario** (Scenario 3 in the demo script, using the Bank of Z discovered data) is available from the July 15 milestone as a pre-GA demo. It demonstrates cross-source compliance findings from real data and is the strongest early demo story for the compliance buyer audience.
- The **PCI scenario** depends on Atlas having modeled which components touch PCI-scoped data. This requires the application topology (ZUnderstand) and data classification to be defined. Without those, Atlas can provide configuration compliance and change history evidence but cannot scope findings to PCI boundaries specifically.

---

## 8. Scope and Boundaries

**In Scope:**
- Privileged access reports: SPECIAL, OPERATIONS, AUDITOR authorities across all connected LPARs; dormant privileged account identification; service account authority analysis
- Separation of duties analysis: identifying users whose combined authority roles violate separation of duties principles
- Configuration compliance: comparison of current environment state against a defined baseline (IBM hardening baseline or customer-defined baseline); deviation identification, classification, and quantification
- Change history: 12-month (or configurable period) history of configuration changes across PARMLIB, RACF, and software inventory; associated change record correlation
- Undocumented change detection: changes in the configuration record with no associated approved change record
- Behavioral anomaly surfacing: proactive identification of patterns in access and change data that warrant investigation before the audit
- Compliance evidence package generation: structured, exportable artifacts in formats suitable for auditor consumption
- Compliance remediation planning: Atlas generates remediation plans for deviations identified during audit prep; validates changes before production apply
- Continuous compliance monitoring: ongoing Atlas posture tracking between audit cycles

**Out of Scope:**
- Security incident forensics — Atlas surfaces anomalous patterns and provides the configuration evidence; deep forensic investigation is a security operations function.
- Regulatory interpretation — Atlas maps findings to compliance framework categories (SOX IT General Controls, PCI DSS, internal baseline); it does not provide legal or regulatory interpretation of whether a finding constitutes a violation.
- Application-level data access auditing — Atlas covers z/OS platform-level access controls (RACF) and middleware configuration. Application-level user behavior (e.g., who queried which Db2 table) is out of scope unless surfaced through Atlas's Db2 configuration analysis.
- External system audit evidence — Atlas provides evidence for the IBM Z estate. Evidence for non-Z components of the environment (cloud, distributed) is out of scope.
- Audit scheduling and workflow management — Atlas generates evidence; it does not manage the audit process, auditor interaction, or GRC workflow.

**Non-Goals:**
- Atlas does not certify compliance. It generates evidence that supports a compliance determination made by qualified compliance professionals and auditors.
- Atlas does not replace a formal RACF compliance tool (IBM zSecure) for organizations with deep RACF audit requirements. Atlas provides the cross-source compliance picture; zSecure provides the deeper RACF audit depth.
- Atlas does not automatically remediate compliance deviations. Every remediation requires explicit human authorization.

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | RACF data is available in the Atlas System Intelligence model. If RACF integration is not configured, Atlas cannot produce privileged access reports or separation of duties analysis. |
| **Assumption** | Config-as-Code discovery has been run and is current for all LPARs in scope. Atlas cannot produce configuration compliance evidence for environments it has not discovered. The evidence is only as current as the most recent discovery run. |
| **Assumption** | The customer has a defined compliance baseline — either IBM's z/OS hardening baseline or a customer-defined configuration standard. Atlas compares against this baseline; without a defined baseline, compliance percentage is not calculable. |
| **Assumption** | The 12-month change history requires that Atlas has been connected and running discovery for at least the period being assessed. If Atlas was deployed recently, historical change history before the Atlas deployment date is not available. |
| **Dependency** | Authorized vs. unauthorized change classification depends on ServiceNow integration for change record correlation. Available H2 2027. Without it, Atlas classifies changes as "recorded in Atlas change log" vs. "no change record in Atlas log" — not as "approved in ITSM" vs. "unauthorized." |
| **Dependency** | PCI scoped evidence depends on ZUnderstand application topology to identify which components touch PCI-scoped data. Without ZUnderstand in TIB, PCI evidence is limited to configuration state for all components — PCI-specific scoping is not available. |
| **Risk** | Discovery currency is the most significant evidence quality risk. If the Config-as-Code model for an LPAR is stale at audit time, the compliance evidence will not reflect the current configuration. Atlas must surface the discovery timestamp prominently on every generated evidence artifact. |
| **Risk** | Baseline definition is a customer configuration activity that requires expertise. Organizations that have not formally defined a compliance baseline cannot use Atlas to generate a compliance percentage. This is an onboarding risk that should be addressed in customer success. |

---

## 10. Scenario Catalog

| # | Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifacts |
|---|---|---|---|---|---|---|
| S1 | SOX IT General Controls Audit | Annual SOX audit cycle opens; Derek initiates Atlas audit prep workflow | Current — GA Dec 2026 | Yes (GA) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc2-audit-compliance.md`](../design/flows/uc2-audit-compliance.md) |
| S2 | PCI Compliance Review | PCI assessment window opens; Atlas scopes the PCI environment and generates evidence | Current — GA Dec 2026 | Yes (GA) — full PCI scoping requires ZUnderstand | UX Flow, Chat Exchange, Screen designs | TBD |
| S3 | Internal Compliance Review | Internal audit team requests configuration compliance report against hardening baseline | Current — GA Dec 2026 | Yes (GA) | UX Flow, Chat Exchange | TBD |
| S4 | Undocumented Change Investigation | Atlas surfaces changes with no change record; Derek and Sage investigate before the auditor does | Current — GA Dec 2026 | Yes (GA) — full authorized/unauthorized classification requires ServiceNow (H2 2027) | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc2-audit-compliance.md`](../design/flows/uc2-audit-compliance.md) Steps 5–7; [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 3 |

**Design decisions recorded in this catalog:**

- **S1 is the canonical demo scenario.** Kyle's [`uc2-audit-compliance.md`](../design/flows/uc2-audit-compliance.md) is a complete, well-grounded conversation script. The SOX scenario — covering privileged access, configuration compliance, undocumented change detection, and remediation before the audit — demonstrates all three pillars in sequence and covers the majority of what a compliance buyer needs to see. Lead with S1.
- **S4 (Undocumented Change Investigation) is the most differentiating scenario for the security buyer.** The 46 undocumented changes finding in Kyle's uc2 Step 7 is something no existing tool can produce. The behavioral pattern detection in Steps 3 and 6 (dormant SPECIAL user active outside change window; cluster of changes across PROD3/4/5 in a 4-day window) is the Predictive Intelligence proof point within this use case. These two behaviors — undocumented change enumeration and behavioral pattern surfacing — are the audit capabilities most likely to prompt "how did we live without this?" from a compliance buyer.
- **S4 and UC-09 (Environment Parity and Drift Control) share infrastructure.** The unauthorized change detection in UC-09 and the undocumented change detection in UC-03 are related but distinct. UC-03 S4 is focused on audit evidence and pre-audit remediation. UC-09 is focused on continuous operational drift monitoring. They should reference each other but not be merged.
- **The Bank of Z health check (Demo Scenario 3) bridges UC-03 and UC-01.** The nine findings from the real Bank of Z data (zero audit trail across CICS/Db2/z/OS Connect, IBMUSER authority concentration, IPIC SSL gap, MQ TLS gap, plaintext credential, Db2 install warnings) are partially compliance findings (UC-03) and partially security/vulnerability findings (UC-01). For demo purposes, the health check scenario works as an entry point for both use cases depending on the audience. For the compliance buyer, lead with the zero audit trail finding (Finding 2) — it is the most immediate and concrete compliance violation in the dataset.
- **The "before the auditor finds it" framing is the positioning anchor for this entire use case.** Every scenario should be framed around what Atlas surfaces proactively — deviations, undocumented changes, anomalies — that the customer did not know to look for. This is the value that is impossible to communicate without a demo.

---

## 11. Lifecycle Overview

```
Scope → Collect → Analyze → Surface Gaps → Remediate → Generate Package → Monitor
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Scope** | Derek defines the audit scope: which LPARs, which compliance framework (SOX, PCI, internal), and which time period. Atlas confirms what evidence it can produce from its current environment record and surfaces any gaps (missing LPARs, discovery staleness, missing baseline definition). | User (Derek) / Atlas (scope confirmation) |
| **Collect** | Atlas assembles evidence from its continuous environment record: RACF access data, configuration state snapshots, change history, PTF inventory. No manual data pulls from ISPF, RACF consoles, or SMP/E. | Atlas |
| **Analyze** | Atlas analyzes the collected evidence against the compliance framework requirements: privileged access analysis, separation of duties check, configuration baseline comparison, change record correlation. Produces findings classified by severity and compliance category. | Atlas |
| **Surface Gaps** | Atlas surfaces compliance gaps and anomalies proactively — not just what was asked for, but patterns in the data that warrant investigation. Undocumented changes, dormant privileged accounts with recent activity, configuration clusters that deviate from baseline, behavioral anomalies in access patterns. | Atlas (proactive) |
| **Remediate** | For deviations that can and should be corrected before the audit, Atlas generates remediation plans, validates them in an isolated environment, and orchestrates the apply. Post-remediation compliance state is captured in the evidence package. | Atlas (plans + validates) / Zach (applies) / Derek (authorizes) |
| **Generate Package** | Atlas generates the structured evidence package: compliance report by framework category, privileged access report, change history with undocumented change annotations, configuration state snapshots, remediation log. Exportable in formats suitable for auditor consumption. | Atlas |
| **Monitor** | After the audit cycle, Atlas continues monitoring for new deviations, new undocumented changes, and access anomalies. The compliance posture is a continuous state, not a point-in-time snapshot. Atlas alerts when the posture changes materially. | Atlas (continuous) |

> **Scope guidance:** The "What Happens" column describes outcomes and decisions, not UI interactions. Screen-level and conversation-level detail belongs in the UX Flow and Chat Exchange child artifacts.

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Evidence collection from environment record | **Atlas** | Automated; drawn from continuous Config-as-Code model, RACF data, PTF inventory, change log |
| Privileged access analysis across all LPARs | **Atlas** | Atlas queries the RACF model and returns structured findings; no per-LPAR manual queries |
| Separation of duties analysis | **Atlas** | Atlas evaluates combined authority roles across users; flags violations against defined policy |
| Configuration compliance comparison against baseline | **Atlas** | Atlas diffs current state against defined baseline; quantifies and classifies deviations |
| Change record correlation (authorized vs. unauthorized) | **Atlas** | Requires ServiceNow integration for full classification (H2 2027); Atlas change log provides partial capability at GA |
| Behavioral anomaly surfacing | **Atlas (proactive)** | Atlas surfaces patterns without being asked — dormant privileged user activity, clustered undocumented changes |
| Compliance framework mapping | **Atlas** | Atlas categorizes findings against SOX IT General Controls, PCI DSS, or customer-defined framework |
| Baseline definition | **User (Sage + Zach)** | Atlas compares against a baseline; the baseline must be defined and configured. This is an onboarding activity. |
| Anomaly investigation and decision | **User (Sage)** | Atlas surfaces the pattern; Sage investigates whether it represents a genuine breach of governance |
| Remediation authorization | **User (Derek + Quinn)** | Governance gate. Atlas generates the remediation plan; humans authorize it. |
| Compliance remediation execution | **Zach** | Zach applies z/OS-level remediation changes (e.g., RACF SETROPTS corrections) after Atlas validates them |
| Evidence package review and submission | **User (Derek)** | Derek reviews the generated package, makes any additions or annotations, and delivers it to auditors |
| Audit scope definition | **User (Derek)** | Derek defines which LPARs, which framework, and which period. Atlas confirms what is available. |
| Continuous compliance monitoring posture | **Atlas** | Atlas monitors between audit cycles and alerts when posture changes materially |

**Governance gates — explicit human approval required before:**
1. Any compliance remediation change is applied to production — authorized by Zach and Derek
2. The evidence package is submitted to auditors — reviewed and approved by Derek
3. A detected undocumented change is "accepted" (documented retroactively) rather than remediated — explicit named acknowledgment required

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Continuous environment record as audit evidence** | Atlas generates a 12-month configuration state timeline without any manual evidence collection — because it has been continuously recording the environment since it was connected. | The fundamental Atlas advantage in this use case is not a new capability; it is the consequence of System Intelligence being continuously active. The audit evidence exists because Atlas was watching. No other tool creates this record passively. |
| **Cross-source compliance finding generation** | Atlas joins RACF access data, Config-as-Code configuration state, PTF inventory, and change history to produce compliance findings that are invisible to any single source. The zero audit trail finding (CICS `accountrec: NONE` + Db2 `auditst: NO` + z/OS Connect API list) requires three sources joined at query time. | This is the "no single tool" advantage applied to compliance. Auditors ask about controls that span multiple z/OS subsystems; Atlas is the only system that can answer those questions from its own model. |
| **Undocumented change enumeration** | Atlas produces an exact count of configuration changes with no corresponding change record — with timestamps, affected components, and responsible user IDs — from its continuous change history. The 46 undocumented changes in the SOX scenario are a specific, verifiable number, not an estimate. | No existing tool produces this. Change management systems only know about changes that were put through them. Atlas knows about all changes because it tracks the environment directly. This is the most compelling capability for a compliance buyer who has had audit findings about change traceability. |
| **Behavioral pattern detection across access and change data** | Atlas proactively identifies patterns — a dormant privileged account that was used outside change window hours, a cluster of configuration changes across multiple LPARs within a 4-day window — without being asked to look for them. | Auditors discover these patterns. Atlas should discover them first. The value of proactive surfacing is not just efficiency — it is the difference between "we found this and remediated it" and "the auditor found this." The former is evidence of a functioning governance program; the latter is an audit finding. |
| **Compliance remediation with immediate evidence update** | When Atlas remediates a compliance deviation (e.g., restoring RACF SETROPTS AUDIT to `ALL` on PROD4 and PROD5), it generates an updated compliance report that reflects the post-remediation state — and the remediation itself is documented in the evidence package as proof of corrective action. | Pre-audit remediation is only valuable if it is documented. Atlas makes the remediation and the evidence update a single atomic operation. |
| **Structured auditor-ready artifact generation** | Atlas generates evidence packages in formats designed for auditor consumption — not ISPF panel screenshots or raw log exports, but structured reports with findings classified by severity, compliance framework category, and remediation status. | Derek is not a z/OS expert. He needs evidence he can hand to an auditor without a covering explanation. Atlas generates artifacts that speak directly to the compliance framework, not the technical implementation. |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| **Audit preparation time** | Engineer-hours from "audit cycle opens" to "evidence package complete and ready for auditor review" | 10–30 engineer-days for a large production estate (estimate varies significantly by org) | Under 2 engineer-days; most evidence generated in hours |
| **Undocumented change detection before audit** | Number of undocumented changes identified and investigated by the internal team before auditor engagement | Near 0 — discovered during audit or through incident | 100% of changes with no change record surfaced and triaged before audit opens |
| **Configuration compliance percentage** | % of monitored configuration parameters in compliance with the defined baseline at audit time | Unknown without Atlas (calculated manually, infrequently) | Continuously known; >95% target for production LPARs |
| **Audit findings attributable to Z configuration** | Number of audit findings related to IBM Z access controls, configuration compliance, and change traceability per audit cycle | DISCOVERY NEEDED — varies widely; typically 3–10 findings per cycle for unprepared shops | Zero findings attributable to gaps Atlas can detect and surface before the audit |
| **Time to compliance evidence for ad-hoc request** | Time from "auditor asks for evidence of X" to "evidence delivered" | Hours to days (requires manual assembly) | Under 30 minutes (Atlas generates from its continuous record on demand) |
| **Remediation cycle time for pre-audit compliance gaps** | Time from "Atlas surfaces a compliance deviation" to "deviation remediated and evidence updated" | Days to weeks (manual investigation, manual remediation, manual evidence update) | Under 4 hours for standard compliance remediations with Atlas validation |

**Leading indicators (behavior):**
- Number of compliance evidence artifacts generated per quarter
- Frequency of Atlas compliance posture checks between audit cycles
- Number of undocumented changes triaged per quarter (declining over time = governance improving)

**Lagging indicators (outcome):**
- Audit findings related to IBM Z configuration (year-over-year)
- Audit preparation engineer-hours (year-over-year)
- Days to complete audit evidence package

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| **Discovery data is stale for one or more LPARs at audit time** | Atlas surfaces the discovery timestamp on every evidence artifact and explicitly flags LPARs where discovery is older than a configurable threshold (e.g., 7 days). "Evidence for PROD3 is based on discovery data from 14 days ago. This may not reflect recent changes." | Derek and Zach trigger a re-discovery run for the affected LPARs before finalizing the evidence package. If re-discovery is not possible before the audit deadline, the staleness caveat is documented in the evidence package. |
| **Compliance baseline has not been defined** | Atlas cannot generate a compliance percentage without a baseline. It surfaces this gap at the scoping phase: "No compliance baseline has been configured for this environment. Atlas can generate a current-state configuration report, but cannot quantify deviation without a defined baseline." | Sage and Zach work with Derek to define and configure a compliance baseline. Atlas guides the baseline definition using IBM's z/OS hardening standard as a starting template. |
| **RACF data is not available in Atlas** | Atlas surfaces the missing data source and scopes its evidence accordingly: "RACF integration is not configured for PROD4. Privileged access evidence for PROD4 is not available." | The RACF integration is configured for the missing LPAR. If this cannot be resolved before the audit, the gap is documented and manual RACF evidence is assembled for that LPAR. |
| **Undocumented changes cannot be attributed** (user ID not available in change log) | Atlas surfaces the change with available evidence (timestamp, affected component, parameter change) and flags the attribution gap: "This change has no associated user ID in the Atlas change log. Manual investigation required." | Sage investigates through alternative means (system log, SYSLOG, SMF data). Atlas records the investigation activity in the incident record. |
| **Compliance remediation creates an unexpected dependency** | Atlas detects during test validation that the proposed remediation affects a component beyond the intended scope. "Restoring RACF SETROPTS AUDIT to ALL on PROD4 may affect audit record volume — current SMF writer configuration may not have sufficient capacity for the increased audit data stream." | Zach reviews the dependency. Atlas generates an updated remediation plan that addresses both the SETROPTS change and the SMF writer capacity, or scopes the remediation with an accepted-risk note. |
| **PCI-scoped data boundary is ambiguous** | Without ZUnderstand topology, Atlas cannot confirm which components are definitively within PCI scope. It provides evidence for all identified components and flags the scoping uncertainty: "PCI boundary definition is based on system-level topology only. Application-level data flow mapping (ZUnderstand) is required to confirm PCI boundary completeness." | Derek documents the scoping approach and the ZUnderstand dependency. PCI scoping is completed manually for the current cycle; ZUnderstand integration is prioritized for the next cycle. |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| **SOX IT General Controls — Change Management** | SOX requires evidence that all configuration changes to production systems are authorized, documented, and traceable to an approved change record. | Atlas produces a 12-month change history with each change attributed to a timestamp, user ID, and change record (where one exists). Undocumented changes are enumerated and flagged as a separate finding requiring investigation. |
| **SOX IT General Controls — Access Controls** | SOX requires evidence of appropriate access controls for privileged users, including periodic review of privileged access and removal of dormant accounts. | Atlas generates privileged access reports identifying all users with SPECIAL, OPERATIONS, or AUDITOR authority, including dormant accounts and any anomalous access patterns detected. |
| **SOX IT General Controls — Separation of Duties** | SOX requires evidence that system administration and security administration duties are performed by different users. | Atlas performs separation of duties analysis across the RACF authority model and flags violations (e.g., a single user ID holding both sysadm and secadm authority simultaneously). |
| **PCI DSS — Audit Trails** | PCI DSS Requirement 10 requires audit trails for all access to cardholder data and system components. | Atlas surfaces configuration gaps that break the audit trail — including the zero-audit-trail finding where `accountrec: NONE` in CICS, combined with disabled Db2 audit settings, produces zero audit records for financial transactions. |
| **PCI DSS — Access Control** | PCI DSS Requirement 7 requires restricting access to system components to only those who need it. | Atlas's privileged access analysis and RACF authority model support PCI access control evidence. Findings on authority concentration (e.g., all Db2 authority roles assigned to a single shared user ID) are surfaced as PCI-relevant findings. |
| **Internal audit — Configuration hardening** | Internal audit teams typically check configuration compliance against an internal z/OS hardening baseline. | Atlas compares current configuration state against the defined baseline, quantifies the compliance percentage, and produces a structured deviation report with each finding classified by severity and remediation priority. |
| **Evidence timestamp integrity** | Audit evidence must accurately represent the state of the environment at the time of the audit. Atlas evidence must carry provenance — when was the data collected, from which sources. | Every Atlas-generated evidence artifact includes the discovery timestamp for each LPAR and source. Staleness is surfaced prominently. Evidence integrity depends on discovery currency. |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-01: Vulnerability Remediation | Security PTF gaps surfaced in UC-01 are compliance evidence in UC-03. A missing security FIXCAT PTF is both a vulnerability finding (UC-01) and a configuration compliance deviation (UC-03). The remediation history from UC-01 is part of the change record that UC-03 assembles for auditors. |
| UC-06: Change Readiness and Health Assessment | UC-06 health checks produce compliance-relevant findings as a byproduct. A health check that surfaces a RACF SETROPTS deviation or an undocumented configuration change feeds directly into UC-03. The two use cases share the configuration compliance analysis capability; the distinction is trigger (pre-change readiness vs. audit preparation) and output format (health report vs. auditor-ready evidence package). |
| UC-09: Environment Parity and Drift Control | UC-09 detects unauthorized changes between environments; UC-03 detects undocumented changes against a change management record. They are complementary: UC-09 tells you whether QA and production have drifted from each other; UC-03 tells you whether production has drifted from its documented, approved configuration baseline. Both feed into audit evidence. |
| UC-13: Regulatory Change Response | UC-03 and UC-13 are commonly confused but serve distinct purposes. UC-03 is about *proving* the current compliance state (evidence generation). UC-13 is about *remediating* a gap to reach a required compliance state (regulatory change execution). They share the same Atlas data model and often follow each other: UC-13 remediates the gap; UC-03 generates the evidence that it was remediated. |
| UC-14: Change Governance and Traceability | UC-14 governs the change record that UC-03 depends on for its undocumented change analysis. The stronger the change governance (UC-14), the cleaner the audit evidence (UC-03). Undocumented changes surfaced by UC-03 are the gaps in UC-14's coverage. The two use cases are the same coin — UC-14 is the governance process; UC-03 is the audit of that process. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **ServiceNow integration for authorized/unauthorized change classification** | H2 2027 | Enables Atlas to classify detected configuration changes as "authorized" (matching an approved ITSM change record) vs. "unauthorized" (no matching record) — not just "recorded in Atlas log" vs. "not recorded." This is the most important near-term improvement for the undocumented change scenario. |
| **Continuous compliance posture score on topology canvas** | H2 2027 | A live compliance health score visible on every topology node, updated after each discovery cycle. Sage and Derek see the current compliance state without initiating a conversation. Score degrades when new deviations are detected; recovers when remediations are applied. |
| **Automated compliance drift alerting** | H2 2027 | Atlas alerts Sage and Derek when the compliance posture changes materially between audit cycles — a new undocumented change, a baseline deviation, a new dormant privileged account. Converts audit prep from a periodic sprint to a continuous monitored state. |
| **GRC platform integration** | 2028+ | Publish Atlas compliance findings and evidence directly into enterprise GRC platforms (Archer, ServiceNow GRC, IBM OpenPages). Atlas generates the z/OS compliance evidence; the GRC platform aggregates it with evidence from other environments. |
| **Agentic pre-audit remediation** | 2028+ | For well-understood, low-risk compliance deviations (e.g., restoring a RACF SETROPTS parameter to its baseline value), Atlas proposes and executes the remediation autonomously within pre-approved bounds, updating the evidence package immediately. Human approval at summary level rather than per-change. |
| **Audit evidence for AI-assisted changes** | 2028+ | As Atlas becomes the platform for executing more changes on Z, the question of "who authorized this AI-assisted change?" becomes a compliance requirement. Atlas's authorization chain and change record architecture needs to be auditable for human-in-the-loop AI-executed changes. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-03](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`atlas-use-case-taxonomy.md`](../atlas-use-case-taxonomy.md) | Scenario naming and taxonomy classification |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 1 "Audit & Compliance artifact generation" capability; GA customer outcome "I can run an audit and compliance check and produce a report artifact without manually assembling evidence" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | Q3 MVP use case "Audit & Compliance" |
| [`design/flows/uc2-audit-compliance.md`](../design/flows/uc2-audit-compliance.md) | Complete SOX audit scenario (Steps 1–9); privileged access findings (12 SPECIAL users, 3 dormant, 2 anomalous service accounts); configuration compliance (94% → 97% after remediation, 17 deviations); undocumented RACF SETROPTS changes on PROD4 and PROD5; behavioral pattern detection (SYSADM02 activity + 4-day change cluster); 46 undocumented changes in 12-month history; RACF remediation plan and validation |
| [`Atlas_Demo_Scenarios_v2.md` Scenario 3](../Atlas_Demo_Scenarios_v2.md) | Health Check / pre-audit compliance scenario using real Bank of Z data; 9 cross-source findings (zero audit trail, IBMUSER authority concentration, IPIC SSL gap, MQ TLS gap, plaintext credential, DSNT060I warnings, stathist gap, PTF currency); "5 data sources. 9 findings. One conversation." |
| [`use-cases/core use case context/atlas_system_intelligence_use_case copy.md`](core%20use%20case%20context/atlas_system_intelligence_use_case%20copy.md) | Foundational System Intelligence capabilities underpinning evidence collection: continuous topology model, time-based comparison, artifact generation, cross-source analysis |
| [`personas/IBM Z & LinuxONE Research Central_ Personas_ Sage the Mid-level Security Admin - Airtable.pdf`](../personas/IBM%20Z%20%26%20LinuxONE%20Research%20Central_%20Personas_%20Sage%20the%20Mid-level%20Security%20Admin%20-%20Airtable.pdf) | Sage persona — responsibilities, needs, RACF-centric workflow, audit reliability as primary success criterion |
| [`personas/IBM Z & LinuxONE Research Central_ Personas_ Fred the Security Architect - Airtable.pdf`](../personas/IBM%20Z%20%26%20LinuxONE%20Research%20Central_%20Personas_%20Fred%20the%20Security%20Architect%20-%20Airtable.pdf) | Fred persona — end-to-end security architecture, PHI/PII data security, encryption posture, compliance maintenance |
| [`personas.md`](../personas.md) | Canonical persona definitions for Derek, Sage, Zach, Quinn |
