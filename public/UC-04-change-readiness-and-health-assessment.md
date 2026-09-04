# UC-04: Change Readiness and Health Assessment — Composite Reference

> **New UC number:** UC-04 (formerly old UC-06)
> **Sources consolidated:** Spec (GitHub), Pain & Wows (old UC-06), Units (old UC-06), Bob PPZ, Concert for Z, Terraform

---

## Part 1 — Use Case Specification

*Version 1.0 | Owner: Product Management | Last updated: August 2026*

### Executive Summary

Before any significant event on IBM Z — a go-live, a major change, an audit, a peak season — organizations want to know the system is sound. Today that answer requires hours of manual inspection across ISPF panels, SMP/E, and multiple vendor consoles, and it is still incomplete because no single tool sees the full picture. Atlas replaces that manual hunt with a single, multi-source health assessment that joins configuration state, security posture, PTF currency, and performance constraints into one artifact — in minutes, not hours. The health check is the most practical demonstration of Atlas's cross-tool value and is available at GA.

### Overview

Change Readiness and Health Assessment gives organizations a structured, repeatable way to answer the question: "Is our system in good shape right now?" It covers PTF currency, configuration compliance, security posture, and performance constraints as a unified picture, and it produces a structured artifact that can be used for governance review, change authorization, and audit evidence.

### Roadmap Status

| Scenario | Status | Target Date |
|---|---|---|
| Pre-Go-Live Health Check | **Current** | GA Dec 2026 |
| Pre-Audit Configuration Review | **Current** | GA Dec 2026 |
| Pre-Change-Window System Review | **Current** | GA Dec 2026 |
| Periodic System Health Report | **Current** | GA Dec 2026 |

### Primary Personas

- **Zach** — z/OS Systems Programmer (primary): initiates health check, reviews findings, signs off on go-live readiness
- **Sage** — Security Administrator: consumes security findings section
- **Derek** — Compliance Evidence Provider: uses health artifact as pre-event compliance evidence
- **Quinn** — IT Operations Manager: receives health check as a governance artifact

### Pillar Alignment

| Pillar | Role |
|---|---|
| **System Intelligence** | **Primary throughout** — all health assessment data is System Intelligence; cross-source synthesis |
| **Change Intelligence** | **Supporting (remediation)** — when findings require remediation, Atlas transitions to Change Intelligence |
| **Predictive Intelligence** | **Supporting** — compound risk identification (multiple non-critical findings creating combined risk) |

### Lifecycle

```
Scope → Assess → Rank Findings → Generate Artifact → Remediate → Register Baseline
```

### Scenario Catalog

| # | Scenario | Status |
|---|---|---|
| S1 | Pre-Go-Live Health Check | Current — GA Dec 2026 |
| S2 | Pre-Audit Configuration Review | Current — GA Dec 2026 |
| S3 | Pre-Change-Window System Review | Current — GA Dec 2026 |
| S4 | Periodic System Health Report | Current — GA Dec 2026 |

### AI Differentiation

- **Cross-source configuration join** — joins CICS CSD, Db2 ZPARMs, MQ channel definitions, z/OS Connect config, and PTF inventory in a single query; the finding type that does not exist without AI
- **Compound risk identification** — identifies when a missing security PTF and an unencrypted connection combine to create higher compound risk than either finding alone
- **Natural language health query** — "are there any performance constraints that would cause us problems under Black Friday load?"
- **Health baseline comparison** — compares current assessment against last registered baseline to surface what is new since the last review
- **Prioritized remediation path generation** — for each critical finding, Atlas immediately offers a remediation plan

### Related Use Cases

- UC-06 (Patch Management): PTF currency findings from health check are the natural entry point for UC-06; FIXCAT security gaps trigger S2 security PTF path
- UC-01 (Audit and Compliance): pre-audit configuration review produces artifacts feeding UC-01 evidence
- UC-10 (Environment Parity): pre-change-window review uses the same drift detection capability as UC-10

---

## Part 2 — Pain & Wows Flow Analysis

> **Source:** `use-case-pain-wows/UC-06-change-readiness-and-health-assessment.md` (old UC-06 → new UC-04)

### As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Scope the health check** | Zach is asked to confirm the system is "good to go" before the quarterly go-live. He is not sure exactly what to check, so he reviews what he checked last time from memory. Some subsystems he does not routinely manage are skipped. | Zach opens Atlas and says "run a pre-go-live health check for the BANKZ application." Atlas confirms the scope: 4 LPARs, CICS region CICSBOZ, Db2 subsystem DBD1, MQ queue manager CSQ9, and z/OS Connect ZOSCSRV. Zach adds: "also check security posture." |
| **2 — Check PTF currency** | Zach queries SMP/E on each LPAR. He finds 3 missing PTFs across the estate. He does not know whether any are FIXCAT security items — that requires a separate ibm.com lookup he does not have time for. | Atlas joins the PTF inventory with the current FIXCAT classification data. It surfaces: 3 missing routine PTFs and 1 missing FIXCAT SEC/INT security PTF. The security PTF is flagged with higher severity and Atlas proactively notes the blast radius if it is not applied. |
| **3 — Review configuration state** | Sage reviews RACF settings independently. Zach reviews CICS and Db2 settings independently. Nobody checks z/OS Connect SSL configuration. The review takes a combined 4 hours and produces a note in Confluence that does not capture every finding. | Atlas joins the configuration review across all five sources simultaneously. It surfaces: IBMUSER authority concentration (RACF), IPIC unencrypted connection, MQ channel TLS disabled, a plaintext credential in ZOSCSRV configuration, and a Db2 STATHIST warning. None of these were on Zach's individual checklist. |
| **4 — Identify compound risks** | Zach sees the missing PTF separately from Sage's note about the unencrypted connection. Neither recognizes that the combination creates a higher compound risk. | Atlas identifies the compound risk explicitly: "The missing security PTF and the unencrypted IPIC connection together create an elevated risk — an attacker with network access could exploit the unencrypted path more easily given the known vulnerability. This compound finding is higher severity than either item alone." |
| **5 — Remediate before go-live** | Zach creates three ServiceNow tickets for remediation. Two are completed before go-live; one (the MQ TLS configuration) slips to after go-live. He makes a note but there is no formal acceptance of the deferred risk. | For each critical finding, Atlas offers a remediation path immediately. Zach chooses to remediate the security PTF (Atlas initiates a UC-06 patch workflow), accept the MQ TLS gap with documented rationale for the current window, and defer the IBMUSER authority concentration. Each decision is recorded in the health artifact. |
| **6 — Generate the health report** | Zach writes a paragraph in Confluence summarizing the health check. There is no structured format, no source citations, and no timestamp. When asked in a post-incident review whether a health check was performed, he cannot produce a document that an auditor would accept. | Atlas generates the structured health assessment artifact: 9 findings classified by severity, compound risk callout, remediation decisions with named owner and rationale, discovery timestamp for each source, and a compliance readiness summary for Quinn. The document is exportable and auditor-ready. |

### Key Pain Points

- Multiple specialist teams required; each checks a different tool; no unified view
- Cross-subsystem compound risks invisible because findings are in separate systems
- Configuration findings missed in subsystems not routinely managed
- Risk acceptance for deferred items has no formal record
- Health check documentation is informal, non-reproducible, and not auditor-ready

### Key Wow Moments

- "5 data sources. 9 findings. One conversation." — the Bank of Z real data story
- The compound risk finding — the CICS/RACF/PTF interaction that neither tool shows separately
- Deferred risk acceptance formally documented in the artifact
- Health check artifact that is auditor-ready without any post-session work

---

## Part 3 — Atlas Units Estimation

> **Source:** `use-case-units/UC-06-change-readiness-and-health-assessment-units.md` (old UC-06 → new UC-04)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |
| **Remediation** | Plan + test + apply for a single finding | 20–50 units |

### Per-Step Unit Estimates

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Scope confirmation | Query | 2 | Atlas confirms what it can assess |
| 2 — PTF currency check | Analysis | 8 | PTF inventory + FIXCAT classification join |
| 3 — Configuration compliance review (all sources) | Analysis | 15 | CICS + Db2 + MQ + z/OS Connect + RACF + PTF join |
| 4 — Compound risk identification | Analysis | 5 | Pattern match across identified findings |
| 5 — Health artifact generation | Artifact | 18 | Structured findings document with source citations |
| 5 — Remediation (per finding, if executed) | Remediation | 25–45 | Varies by finding type; PTF: 35; RACF: 25; CICS config: 20 |
| 6 — Register health baseline | Query | 2 | Record current state as new baseline |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — Pre-Go-Live Health Check (assessment only, no remediation) | 50–70 | Full cross-source review + artifact |
| S1 — Pre-Go-Live Health Check (with 2 remediations) | 100–150 | Assessment + 2 remediation cycles |
| S2 — Pre-Audit Configuration Review | 45–65 | Similar to S1 but compliance-framing emphasis |
| S3 — Pre-Change-Window System Review (baseline diff only) | 25–40 | Focused on what changed since last baseline |
| S4 — Periodic System Health Report | 50–75 | Full assessment; no event urgency |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Number of subsystems in scope | +8–12 units per additional subsystem (CICS, Db2, MQ, IMS, z/OS Connect) |
| Number of LPARs | +5–10 units per additional LPAR |
| Number of findings requiring remediation | +25–45 units per finding |
| Stale CaC data requiring re-discovery | +15–30 units for a re-discovery pass |

### What Is Not Metered

- Health baseline storage and retrieval (stored in Atlas topology)
- Compound risk pattern matching (computed during analysis; no separate charge)
- Proactive FIXCAT monitoring between health checks (passive observation)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-06-change-readiness-and-health-assessment-bob-ppz.md`

**Overall Bob PPZ relevance: Low-to-moderate. Tier 1 at Step 5 (remediate — app code findings only); Tier 2 at Steps 2 and 3.**

Bob PPZ is relevant only when health check findings root-cause to application code. The enrichment touchpoints add meaningful precision to the application layer, particularly for COBOL-heavy estates. For infrastructure-focused health checks, Bob PPZ has no role.

**Tier 1 — Explicit Handoff Points:**

**Step 5 — Remediate (Application Code Findings):**
When a health check finding identifies an application code issue as the root cause (deprecated API still in use, COBOL program creating a performance constraint through inefficient SQL, shared copybook creating a high-severity coupling risk), Atlas identifies the application component but cannot execute the code-level fix. Atlas presents the finding with the affected program, the health check context, and the blast radius. The user is directed to Bob PPZ to understand the code-level root cause — what the program is doing that creates the constraint, what the safe remediation path looks like.

**What comes back:** A code fix artifact. Atlas validates the fix in the provisioned environment, confirms the finding is resolved, and marks it closed in the health assessment record.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Assess:**
When the assessment includes application components, Bob PPZ's ZUnderstand enriches the application layer: applications with deprecated API usage are identified at program level rather than application level, coupling risk is quantified, and business service attribution enriches health findings for Sage and Quinn to prioritize by business impact.

**Step 3 — Rank Findings:**
Compound risks involving application code are surfaced with greater precision: "COBOL program ACCTVAL01 uses a deprecated CICS API (Bob PPZ finding) on a CICS region with a missing security PTF (Atlas PTF finding) — compound risk higher than either finding alone." Without Bob PPZ, the code-level half of this compound finding is absent.

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-06-change-readiness-and-health-assessment-concert4z.md`

**Overall Concert for Z relevance: Moderate-to-high. Tier 1 at Step 1 (Concert for Z → Atlas); Tier 2 at Steps 2, 3, and 6.**

Concert for Z's Risk Management module is a natural upstream trigger for change readiness assessments. Its production performance baselines and ZEN data meaningfully enrich Atlas's health check.

**Tier 1 — Explicit Handoff Points:**

**Step 1 — Scope (Concert for Z → Atlas):**
Concert for Z's Risk Management module has detected an operational risk: a certificate approaching expiry, a cluster of missing critical maintenance, or a capacity threshold approaching ahead of a peak event. This risk flag triggers an Atlas health assessment workflow scoped to the affected components. Concert for Z's detection is specific; Atlas's assessment is comprehensive.

**What comes back:** Atlas returns a structured health assessment artifact. Concert for Z's Risk Management sees the operational risk addressed when Atlas's remediation is complete.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Assess:**
Concert for Z's production performance data provides current utilization baselines and behavioral trend data. Atlas's constraint assessment is specific rather than theoretical, and forward-looking trends (a Db2 buffer pool trending toward saturation over 3 months) appear as health findings.

**Step 3 — Rank Findings:**
Concert for Z's production anomaly history adds an operational dimension: findings that correlate with past production incidents are elevated in severity compared to the same finding on a system with no incident history.

**Step 6 — Register Baseline:**
Atlas captures the configuration baseline; Concert for Z captures the behavioral baseline. Together they form a complete pre-event reference point for ongoing drift monitoring.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-06-change-readiness-and-health-assessment-terraform.md`

**Overall Terraform relevance: Moderate. Tier 1 at Steps 3 and 6; Tier 2 at Steps 2 and 4.**

The infrastructure readiness gate is a genuine, operationally meaningful contribution — confirming that a target LPAR is in its declared infrastructure state before a change proceeds. Terraform participates in every change readiness check for Terraform-managed LPARs.

**Tier 1 — Explicit Handoff Points:**

**Step 3 — Health Assessment:**
Atlas surfaces the infrastructure readiness check as a gate item: the target LPAR should be confirmed in its declared Terraform state before the change is authorised. The team runs `terraform plan` against the LPAR's workspace to confirm zero infrastructure drift. A clean plan confirms infrastructure readiness; any planned changes surface infrastructure drift that must be resolved before the change proceeds.

**What comes back:** Terraform plan output. Atlas records the infrastructure readiness confirmation in the health assessment output.

**Step 6 — Post-Change Validation:**
If infrastructure-layer changes were made as part of the change, Atlas directs confirmation that Terraform's apply completed successfully and that the post-change state matches the updated Terraform declaration. Terraform apply confirmation is incorporated into the post-change record.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Baseline Collection:**
Terraform's state file provides structured infrastructure baseline data — CPU and memory allocation, storage mounts, network adapter configuration, activation profile — complementing the software-layer configuration data Atlas collects.

**Step 4 — Readiness Decision:**
Terraform's workspace history provides context for blocker attribution: recent infrastructure changes that could explain a configuration anomaly, or pending Terraform changes that the change owner should know about.
