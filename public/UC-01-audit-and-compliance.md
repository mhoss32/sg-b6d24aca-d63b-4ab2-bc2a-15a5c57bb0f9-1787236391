# UC-01: Audit and Compliance — Composite Reference

> **New UC number:** UC-01 (formerly old UC-03)
> **Sources consolidated:** Spec (GitHub), Pain & Wows (old UC-03), Units (old UC-03), Bob PPZ, Concert for Z, Terraform

---

## Part 1 — Use Case Specification

*Version 1.0 | Owner: Product Management | Last updated: August 2026*

### Executive Summary

Preparing for a SOX, PCI, or internal compliance audit on IBM Z today means weeks of manual evidence assembly by the most experienced people on the team — querying RACF, pulling change logs, reconciling configuration state across LPARs, and hoping nothing was missed. Atlas holds a continuous, timestamped record of the entire environment. An audit that previously took days of investigation takes hours, produces structured auditor-ready artifacts, and — critically — surfaces the undocumented changes and configuration deviations before the auditor finds them.

### Overview

Audit and Compliance covers everything a regulated organization needs to demonstrate that their IBM Z environment is operating within defined security and governance boundaries: privileged access reports, configuration compliance against defined baselines, 12-month change history, separation of duties analysis, and the identification and remediation of undocumented changes. It is a GA use case, available from Atlas Base at Dec 2026, and one of the clearest early business cases for Atlas in financial services, healthcare, and any other regulated industry with a mainframe footprint.

### Roadmap Status

| Scenario | Status | Target Date |
|---|---|---|
| SOX IT General Controls Audit | **Current** | GA Dec 2026 |
| PCI Compliance Review | **Current** | GA Dec 2026 |
| Internal Compliance Review | **Current** | GA Dec 2026 |
| Undocumented Change Investigation | **Current** | GA Dec 2026 |

### Primary Personas

- **Derek** — Compliance Evidence Provider (primary): owns audit preparation, initiates workflows, delivers evidence package
- **Sage** — Security Administrator: reviews RACF findings and anomalies, investigates before audit
- **Zach** — z/OS Systems Programmer: executes compliance remediations
- **Quinn** — IT Operations Manager: approves remediation scope, receives readiness summaries

### Pillar Alignment

| Pillar | Role |
|---|---|
| **System Intelligence** | **Primary** — continuous environment record, RACF access data, configuration state, change history |
| **Change Intelligence** | **Remediation path** — plan, validate, apply compliance deviations before the audit |
| **Predictive Intelligence** | **Supporting** — proactive anomaly detection in privileged access and change data |

### Lifecycle

```
Scope → Collect → Analyze → Surface Gaps → Remediate → Generate Package → Monitor
```

### Scenario Catalog

| # | Scenario | Status |
|---|---|---|
| S1 | SOX IT General Controls Audit | Current — GA Dec 2026 |
| S2 | PCI Compliance Review | Current — GA Dec 2026 |
| S3 | Internal Compliance Review | Current — GA Dec 2026 |
| S4 | Undocumented Change Investigation | Current — GA Dec 2026 |

### AI Differentiation

- **Continuous environment record as audit evidence** — the audit evidence exists because System Intelligence was continuously watching; no other tool creates this record passively
- **Cross-source compliance finding generation** — joins RACF, Config-as-Code, PTF inventory, and change history; the zero-audit-trail finding requires three sources joined at query time
- **Undocumented change enumeration** — exact count with timestamps, components, and user IDs; no existing tool produces this
- **Behavioral pattern detection** — dormant SPECIAL user active outside change window, cluster of undocumented changes in narrow time window
- **Compliance remediation with immediate evidence update** — remediation and evidence update are a single atomic operation

### Related Use Cases

- UC-06 (Patch Management, S2): security PTF gaps are also configuration compliance deviations
- UC-04 (Change Readiness): health checks produce compliance-relevant findings as byproduct
- UC-10 (Environment Parity): unauthorized changes vs. undocumented changes — complementary
- UC-03 (Regulatory Change Response): UC-03 remediates; UC-01 evidences
- UC-05 (Change Governance): same coin — governance process (UC-05) vs. audit of that process (UC-01)

---

## Part 2 — Pain & Wows Flow Analysis

> **Source:** `use-case-pain-wows/UC-03-audit-and-compliance.md` (old UC-03 → new UC-01)

### As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Receive audit request** | Derek receives an audit notification with a multi-page evidence checklist. He emails Zach and Sage asking for RACF exports, SMP/E reports, and PARMLIB snapshots. Waits 3–5 days for responses. | Derek opens Atlas and says "prepare the SOX ITGC evidence package for the upcoming audit." Atlas immediately scopes what it can produce from the current environment record. |
| **2 — Assemble privileged access evidence** | Sage manually queries each LPAR's RACF database, exports SPECIAL/OPERATIONS/AUDITOR user lists, deduplicates across LPARs, and builds a spreadsheet. She catches that SYSADM02 was active on a Saturday but does not have context to investigate. | Atlas queries the RACF model across all connected LPARs and produces a structured privileged access report — 12 SPECIAL users, 3 dormant, 2 anomalous service accounts. SYSADM02's Saturday access outside a change window is flagged automatically as a behavioral anomaly for Sage to investigate. |
| **3 — Produce change history** | Zach exports SMP/E maintenance logs, SYSLOG records, and whatever change tickets were created in ServiceNow. He reconciles the three sources in a spreadsheet and identifies 23 changes in the period. He suspects this is incomplete but has no way to verify. | Atlas queries its 12-month change history for the scoped LPARs. It surfaces 69 documented changes plus 46 changes with no corresponding change record in the Atlas log — specific, verifiable numbers with timestamps and components. |
| **4 — Configuration compliance check** | Zach compares current PARMLIB members against a printed baseline document from 2022. He identifies 11 deviations but is unsure whether more exist in subsystems he does not routinely manage. | Atlas compares current configuration state against the defined compliance baseline across CICS, Db2, MQ, and z/OS parameters. It returns 17 deviations, classified by severity, with the current value, the baseline value, and a recommended remediation for each. Compliance is 94%. |
| **5 — Remediate deviations** | Zach spends two days applying corrections to RACF SETROPTS on PROD4 and PROD5. He updates the spreadsheet manually. Derek hopes no new deviations were introduced during the correction process. | Atlas generates remediation plans for the two RACF SETROPTS deviations, validates them in an isolated environment, and orchestrates the apply. Post-remediation compliance is re-checked automatically: 97%. The remediation is documented in the evidence package as proof of corrective action. |
| **6 — Separation of duties analysis** | Sage manually reviews 30+ user authority combinations looking for SoD violations. This takes half a day and she misses a case where a single user holds both SYSADM and security administration authority. | Atlas performs SoD analysis across the RACF authority model for all connected LPARs. It identifies the combined-authority violation and flags it as a compliance finding with the specific user, authority roles, and remediation recommendation. |
| **7 — Generate evidence package** | Derek spends two days assembling evidence from spreadsheets, email attachments, and ISPF screenshots. The package is inconsistent in format and he is not confident it is complete. | Atlas generates the structured evidence package: privileged access report, change history with undocumented change annotations, configuration compliance report, SoD analysis, and remediation log — in auditor-ready format with source citations and timestamps. |

### Key Pain Points

- Multi-day wait for evidence assembly from multiple specialists
- Evidence from three non-integrated sources (RACF, SMP/E, change tickets) that must be reconciled by hand
- Compliance deviations discovered during audit prep rather than before
- No proactive detection of behavioral anomalies (dormant user activity, change clustering)
- Manual remediation with no automatic evidence update
- Evidence package format designed for engineers, not auditors

### Key Wow Moments

- "46 changes with no change record" — specific, verifiable number that no single tool can produce
- SYSADM02 behavioral anomaly surfaced automatically — the auditor would have found it; Atlas found it first
- Compliance percentage that updates immediately after remediation
- One-query evidence package generation that is auditor-ready without manual formatting

---

## Part 3 — Atlas Units Estimation

> **Source:** `use-case-units/UC-03-audit-and-compliance-units.md` (old UC-03 → new UC-01)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |
| **Remediation** | Plan + test + apply for a single compliance deviation | 20–50 units |

### Per-Step Unit Estimates

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Scope | Query | 2 | Confirm what Atlas can produce; surface discovery gaps |
| 2 — Privileged access report | Analysis | 12 | Cross-LPAR RACF query + behavioral anomaly detection |
| 3 — Change history + undocumented change enumeration | Analysis | 15 | 12-month change log query + baseline diff |
| 4 — Configuration compliance check | Analysis | 12 | Baseline comparison across 4 subsystems |
| 5 — Remediation (per deviation) | Remediation | 30 | Plan + isolated test + apply + re-check; × number of deviations |
| 6 — SoD analysis | Analysis | 8 | Authority combination review across all users |
| 7 — Evidence package generation | Artifact | 20 | Structured exportable document |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — SOX ITGC Audit (standard) | 100–180 | Assumes ~2 remediations; no major discovery gaps |
| S2 — PCI Compliance Review | 90–150 | Depends on PCI boundary scope; ZUnderstand required for full scoping |
| S3 — Internal Compliance Review | 60–100 | Narrower scope; no SoD analysis required |
| S4 — Undocumented Change Investigation only | 25–40 | Change history query + baseline diff; no remediation |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Number of LPARs in scope | +8–12 units per additional LPAR for privileged access and compliance analysis |
| Number of compliance deviations requiring remediation | +25–45 units per deviation |
| Discovery staleness requiring re-discovery | +15–30 units per LPAR for fresh discovery pass |
| PCI boundary definition complexity (without ZUnderstand) | Units unchanged; scope confidence lower |

### What Is Not Metered

- RACF data retrieval (stored in Atlas topology — no additional query charge)
- PTF inventory comparison (part of configuration compliance analysis)
- Ongoing drift monitoring after audit cycle (passive Predictive Intelligence; no user-initiated action)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-03-audit-and-compliance-bob-ppz.md`

**Overall Bob PPZ relevance: None within the core workflow.**

Audit and Compliance operates entirely at the configuration and compliance evidence layer. The findings surfaced in this use case — RACF access anomalies, configuration deviations, undocumented changes, SoD violations — are infrastructure and security findings that Atlas addresses directly. Application code is not a subject of audit evidence in this use case (application-level data access auditing is explicitly out of scope).

No Tier 1 or Tier 2 Bob PPZ touchpoints exist for UC-01.

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-03-audit-and-compliance-concert4z.md`

**Overall Concert for Z relevance: Low. Tier 2 enrichment only at Steps 4 and 7.**

Concert for Z does not trigger audit workflows and does not receive an explicit handoff from them.

**Tier 2 — Enrichment Touchpoints:**

**Step 4 — Configuration Compliance Check:**
Concert for Z's production behavioral data (SMF/CDP via OMEGAMON Data Provider) provides a runtime dimension to Atlas's configuration compliance check. A RACF setting that is technically compliant but has never been exercised in production is different from one that is actively enforced. Concert for Z's access monitoring can surface whether specific security controls are operationally active — complementing Atlas's configuration state view.

**Step 7 — Evidence Package Generation:**
Concert for Z's access monitoring history can serve as additional evidence in the compliance package — documenting that security controls are not just configured correctly but are behaviorally active in production. For PCI DSS audit purposes, evidence of actively enforced access controls (not just correctly configured ones) strengthens the compliance narrative.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-03-audit-and-compliance-terraform.md`

**Overall Terraform relevance: High. Tier 1 at Steps 3 and 5; Tier 2 at Steps 2 and 7.**

**Tier 1 — Explicit Handoff Points:**

**Step 3 — Change History (Terraform → Atlas):**
Terraform's immutable apply history is a parallel change ledger that records every infrastructure change with timestamps, operator identities, plan outputs, and state diffs. For audit evidence covering z/OS infrastructure changes (LPAR reconfigurations, memory changes, storage allocations), Terraform's apply log is auditor-visible evidence that Atlas cannot generate from its own change record alone. Atlas queries the Terraform apply history for the audit period and incorporates it into the change history as the infrastructure-layer change evidence.

**Step 5 — Remediation (Terraform apply as governance evidence):**
When compliance remediations include infrastructure-layer changes (network topology, storage configuration, resource isolation changes that fall under regulatory scope), the remediation is implemented through Terraform's plan-approve-apply workflow. Terraform's apply record — with timestamp, approver identity, and state diff — is incorporated into Atlas's remediation evidence as proof that the infrastructure change was reviewed and approved before being applied.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Baseline Collection:**
Terraform's state file provides the authoritative infrastructure baseline for each LPAR. Atlas uses this as the infrastructure layer of its compliance baseline, ensuring the evidence package reflects the complete configuration state — software layer (Atlas) and infrastructure layer (Terraform) together.

**Step 7 — Evidence Package:**
The compliance evidence package is enriched with Terraform's apply history for the audit period — providing auditors with a complete, dual-layer change record spanning infrastructure changes (Terraform) and z/OS software changes (Atlas).
