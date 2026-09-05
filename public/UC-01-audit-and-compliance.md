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

> **Pillar:** System Intelligence (primary) + Change Intelligence (remediation) + Predictive Intelligence (anomaly detection)
> **GA Status:** GA Dec 2026
> **Source:** `use-case-pain-wows/UC-03-audit-and-compliance.md` (old UC-03 → new UC-01)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Scope
**Brief:** The audit cycle opens. Derek defines what evidence is needed and begins identifying which systems, frameworks, and time periods are in scope.

**Personas involved:** Derek, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Derek | Scoping an IBM Z audit requires coordinating with Zach, Sage, and multiple subsystem teams just to understand what evidence is available — no unified inventory. | ⏱️ Lost Time — **1–3 days** to understand what evidence can even be assembled |
| Derek | Does not have deep z/OS technical expertise; translating audit requirements into system queries requires escalating to Zach or Sage for every domain. | 🔒 Skill Gap / Bottleneck — Derek cannot self-serve any z/OS evidence without expert support |

---

#### Step 2 — Collect
**Brief:** Assemble evidence from RACF, change logs, SMP/E records, configuration exports, and ITSM systems.

**Personas involved:** Derek, Sage, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Privileged access reports require manually querying RACF across each LPAR and consolidating results by hand. For a 6-LPAR estate, this is a multi-day task. | ⏱️ Lost Time — **3–5 business days** for multi-LPAR RACF evidence collection |
| Zach | Configuration compliance requires experienced engineers comparing PARMLIB exports in spreadsheets — no automated diff against a defined baseline. | ⏱️ Lost Time — **2–4 days** of manual configuration comparison work |
| Derek | Change history requires reconciling system logs, change management tickets, and SMP/E records — only intersects cleanly when change management discipline has been consistent. | ⏱️ Lost Time — **3–5 days** of cross-system evidence assembly |

---

#### Step 3 — Analyze
**Brief:** Analyze collected evidence against compliance framework requirements — privileged access analysis, separation of duties, configuration baseline comparison, change record correlation.

**Personas involved:** Sage, Zach, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Separation of duties analysis across 30+ users with elevated access is performed manually by the security team under deadline pressure. | ⏱️ Lost Time — **2–3 days** of manual role analysis |
| Derek | No automated compliance framework mapping — every finding must be manually categorized against SOX IT General Controls or PCI DSS by someone who understands both z/OS and the audit framework. | 🔒 Skill Gap / Bottleneck — requires both z/OS expertise (Zach/Sage) and compliance expertise (Derek) simultaneously |
| Zach | Remediations under time pressure are more likely to create new gaps because the engineer is already stretched assembling evidence. | 💼 Business Impact — audit prep and remediation compete for the same expert time |

---

#### Step 4 — Surface Gaps
**Brief:** Identify undocumented changes, dormant privileged accounts, configuration deviations, and behavioral anomalies in the access record.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Undocumented changes — configuration modifications with no change record — are discovered during the audit, not before. There is no proactive detection mechanism. | 💼 Business Impact — gaps are discovered by the auditor, not the team; finding under audit pressure is far more costly |
| Derek | No reliable baseline for how many undocumented changes exist — the number is unknown until the audit investigation. | 💼 Business Impact — compliance posture is unmeasurable until the auditor quantifies it |
| Sage | Behavioral anomalies (dormant SPECIAL user who was active outside a change window) are invisible without dedicated expert investigation. | ⏱️ Lost Time — **days of manual log review** to surface access behavioral anomalies |

---

#### Step 5 — Remediate
**Brief:** For deviations found before the audit, correct them — RACF changes, configuration fixes, retroactive change records.

**Personas involved:** Zach, Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Compliance remediations require the same engineers already stretched assembling evidence — capacity conflict. | 🔒 Skill Gap / Bottleneck — Zach is simultaneously needed for evidence assembly and for executing remediations |
| Derek | Remediations made to close audit findings risk inadvertently creating new gaps because they are made under time pressure with incomplete review. | 💼 Business Impact — last-minute remediations create audit risk rather than reducing it |

---

#### Step 6 — Generate Package
**Brief:** Produce the evidence package — compliance report, privileged access report, change history, configuration snapshots — in a format auditors can use.

**Personas involved:** Derek

| Persona | Pain Point | Category |
|---|---|---|
| Derek | Assembling the evidence package from individual exports (RACF reports, SMP/E records, change logs) takes weeks of engineering time and is error-prone. | ⏱️ Lost Time — **5–15 business days** of senior engineer time per audit cycle |
| Derek | Evidence is point-in-time, not continuous — the package reflects a snapshot assembled under pressure rather than a continuous, authoritative record. | 💼 Business Impact — auditors may find gaps because the snapshot was assembled at a single moment and missed interim changes |

---

#### Step 7 — Monitor
**Brief:** Between audit cycles, maintain ongoing awareness of compliance posture.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | No continuous monitoring — compliance posture degrades silently between audit cycles. The only detection mechanism is the next audit. | 💼 Business Impact — gap between audits means drift can accumulate for up to 12 months undetected |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Scope
**Brief:** Derek defines audit scope; Atlas confirms what evidence it can produce and surfaces any gaps (missing LPARs, discovery staleness, missing baseline definition).

**Personas involved:** Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Ask Atlas "what do we need for the SOX audit?" and receive a complete, scoped evidence inventory within minutes — no multi-team coordination required. | ⏱️ Time Saving — **1–3 days → minutes** for scope definition and evidence inventory |
| Derek | Atlas presents evidence scope in compliance language, not z/OS technical shorthand — Derek can work with it directly without expert translation. | 🆕 New User Capability — Derek independently initiates and manages audit workflows without z/OS expertise |

---

#### Step 2 — Collect
**Brief:** Atlas assembles evidence from its continuous environment record — RACF, configuration state, change history, PTF inventory. No manual pulls from ISPF, RACF consoles, or SMP/E.

**Personas involved:** Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Privileged access reports across all LPARs generated in a single Atlas query — no per-LPAR manual RACF queries. | ⏱️ Time Saving — **3–5 days → under 30 minutes** for multi-LPAR privileged access collection |
| Derek | 12-month change history assembled from Atlas's continuous record — no reconciliation of system logs, tickets, and SMP/E. | ⏱️ Time Saving — **3–5 days → minutes** for change history assembly |

---

#### Step 3 — Analyze
**Brief:** Atlas analyzes collected evidence against compliance framework requirements — producing findings classified by severity and compliance category.

**Personas involved:** Atlas, Derek, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Separation of duties analysis across all elevated users completed automatically by Atlas — no manual role-by-role review. | ⏱️ Time Saving — **2–3 days → automatic** for SoD analysis |
| Derek | Atlas categorizes findings against SOX IT General Controls, PCI DSS, or customer-defined framework automatically — no manual mapping required. | 🤖 Atlas AI Insight & Automation — compliance framework mapping applied to raw findings automatically |

---

#### Step 4 — Surface Gaps
**Brief:** Atlas surfaces compliance gaps and anomalies proactively — undocumented changes, dormant privileged accounts with recent activity, behavioral anomalies in access patterns.

**Personas involved:** Atlas, Sage, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | "46 undocumented changes" surfaced before the auditor sees them — with timestamps, affected components, and user IDs. A specific, verifiable count. | 🤖 Atlas AI Insight & Automation — undocumented change enumeration is only possible through Atlas's unified change and Config-as-Code model |
| Sage | Behavioral anomaly surfacing: dormant SPECIAL user active outside a change window surfaced automatically — without requiring anyone to know to look for it. | 🤖 Atlas AI Insight & Automation — access pattern analysis across the RACF model produces findings no manual review would surface |
| Derek | Compliance gaps quantified before the audit opens — Derek walks into audit prep knowing the number, not discovering it with the auditor. | 💼 Business Impact — proactive gap discovery allows remediation before audit, not during it |

---

#### Step 5 — Remediate
**Brief:** Atlas generates remediation plans for deviations that can be corrected before the audit; validates them in isolation; orchestrates the apply.

**Personas involved:** Zach, Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Compliance remediations are planned and validated by Atlas before apply — changes made to close findings do not inadvertently create new gaps. | 🤖 Atlas AI Insight & Automation — pre-remediation validation in an isolated environment eliminates the risk of remediation-induced gaps |
| Derek | Remediation log captured in Atlas — the complete before/after state is part of the evidence package automatically. | ⏱️ Time Saving — no separate effort to document remediation steps; captured automatically |

---

#### Step 6 — Generate Package
**Brief:** Atlas generates the structured evidence package — compliance report, privileged access report, change history with undocumented change annotations, configuration snapshots, remediation log. Exportable for auditor consumption.

**Personas involved:** Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Complete evidence package generated from a single Atlas query — auditor-ready format, no manual assembly. | ⏱️ Time Saving — **5–15 business days → hours** for evidence package production |
| Derek | Evidence is from Atlas's continuous record, not a point-in-time snapshot assembled under pressure — auditors receive authoritative, timestamped data. | 🤖 Atlas AI Insight & Automation — continuous record means no evidence gaps from last-minute assembly |

---

#### Step 7 — Monitor
**Brief:** Atlas continues monitoring for new deviations, undocumented changes, and access anomalies between audit cycles. Compliance posture is a continuous state.

**Personas involved:** Sage, Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Compliance posture monitored continuously — deviations surfaced when they occur, not at the next audit cycle. | 🤖 Atlas AI Insight & Automation — continuous monitoring replaces point-in-time audit preparation |
| Derek | Atlas alerts when compliance posture changes materially — Derek is informed proactively rather than discovering gaps at the next audit. | 🆕 New User Capability — Derek maintains visibility into ongoing compliance state without requiring an active investigation |

---

> **Overall outcome:** Audit preparation time reduced from weeks of engineering effort to hours. Undocumented changes and anomalies surfaced before the auditor finds them. Compliance posture is a continuous, queryable state rather than a periodic point-in-time exercise.

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
