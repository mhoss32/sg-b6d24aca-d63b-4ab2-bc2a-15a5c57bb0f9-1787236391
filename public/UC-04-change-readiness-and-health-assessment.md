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

> **Pillar:** System Intelligence (primary) + Change Intelligence (remediation path) + Predictive Intelligence (compound risk)
> **GA Status:** GA Dec 2026
> **Source:** `use-case-pain-wows/UC-06-change-readiness-and-health-assessment.md` (old UC-06 → new UC-04)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Scope
**Brief:** User defines the scope of the health check — which LPAR, middleware stack, or event type is being assessed (pre-go-live, pre-audit, pre-change window).

**Personas involved:** Zach, Derek, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No standardized pre-event health check process — scope is defined informally and inconsistently across events and teams. | 💼 Business Impact — coverage depends on who remembered to check what; material risks are missed silently |
| Derek | For pre-audit configuration reviews, there is no self-service way to define compliance scope — Derek must engage Zach and Sage to understand what is even checkable. | 🔒 Skill Gap / Bottleneck — Derek cannot scope a configuration review without z/OS expert involvement |

---

#### Step 2 — Assess
**Brief:** Collect and join configuration data, PTF inventory, security posture, and subsystem parameters across the scoped components to identify findings.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | A pre-go-live health check is assembled manually — one person checks PTF currency in SMP/E, another checks RACF panels, a third checks Db2 ZPARMs. The review takes hours and produces no structured artifact. | ⏱️ Lost Time — **4–8 hours** of multi-person manual effort for a single health check |
| Zach | Each tool shows only a fragment — PTF currency without security posture, security posture without CICS thread constraints. The cross-source view does not exist. | 💼 Business Impact — findings that span tool boundaries are missed entirely; these are the most dangerous findings |
| Sage | Security findings are reviewed in isolation from operational and patch findings — no integrated view of combined risk posture. | 💼 Business Impact — Sage may clear a security finding while unaware of a PTF gap that compounds its risk |

---

#### Step 3 — Rank Findings
**Brief:** Organize findings by severity and identify compound risks — where multiple individually non-critical findings interact to create a higher-risk scenario.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No automated severity ranking or compound risk identification — Zach must interpret findings from multiple tools independently and try to mentally combine them. | ⏱️ Lost Time — **1–2 hours** attempting to synthesize findings across tools |
| Sage | Compound risks (missing security PTF + unencrypted connection = elevated combined risk) are invisible because they require joining two different subsystem views that different specialists own. | 💼 Business Impact — the most dangerous finding type — compound risk across tool boundaries — is systematically invisible |

---

#### Step 4 — Generate Artifact
**Brief:** Produce a health assessment document — structured finding list with severity, source, recommendation, and remediation path — suitable for governance sign-off.

**Personas involved:** Zach, Quinn, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No structured artifact produced from the review — findings exist in notes, email, and memory. | 💼 Business Impact — no auditable record that a health review was conducted before the event |
| Quinn | Cannot approve or defer a go-live without a written risk assessment — Zach must produce a separate governance document after the review. | ⏱️ Lost Time — **1–3 hours** producing a separate governance summary from informal notes |
| Derek | The pre-audit configuration review produces no artifact; Derek has no evidence to show auditors that a review was conducted. | 💼 Business Impact — compliance gap: no pre-audit review evidence exists |

---

#### Step 5 — Remediate
**Brief:** For findings that require correction before the event, plan and execute the remediation.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Finding a security PTF gap in the health check triggers a separate, manual remediation process with no connection to the assessment that found it. | ⏱️ Lost Time — **hours to days** manually scoping and executing a remediation that Atlas found during assessment |
| Sage | No way to verify that a remediation for one finding did not introduce a new gap without repeating the entire health check manually. | 💼 Business Impact — remediations made under pre-event pressure risk creating new compliance or operational gaps |

---

#### Step 6 — Register Baseline
**Brief:** Record the post-assessment state as a health baseline for future drift monitoring.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No mechanism to register a post-assessment state as a baseline — each health check starts from scratch. Drift since the last assessment is invisible. | 💼 Business Impact — teams cannot track whether environment health is improving or degrading over time |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Scope
**Brief:** User defines the health check scope; Atlas confirms what data it can collect and surfaces any gaps in discovery coverage.

**Personas involved:** Zach, Derek, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Scope definition takes seconds — select LPAR, event type, and assessment focus; Atlas confirms what it can assess immediately. | ⏱️ Time Saving — informal multi-person scoping discussion → **seconds** via Atlas |
| Derek | Derek can scope a pre-audit configuration review in Atlas independently — no z/OS expert required to translate compliance requirements into scope. | 🆕 New User Capability — Derek independently initiates health checks without Zach's involvement |

---

#### Step 2 — Assess
**Brief:** Atlas joins Config-as-Code configuration data, PTF inventory, FIXCAT classifications, and security posture data across all scoped components simultaneously.

**Personas involved:** Atlas, Zach, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Full middleware stack health assessment in under 30 minutes — PTF currency, configuration compliance, security posture, performance constraints — all joined in one Atlas session. | ⏱️ Time Saving — **4–8 hours → under 30 minutes** for a full pre-event health check |
| Sage | Security findings presented in the context of the broader operational and patch picture — Sage sees compound risk, not just her individual security domain findings. | 🤖 Atlas AI Insight & Automation — cross-source join across CICS, Db2, MQ, RACF, and PTF inventory in a single assessment |

---

#### Step 3 — Rank Findings
**Brief:** Atlas organizes findings by severity (critical, high, medium, low) and identifies compound risks where multiple findings interact to create elevated risk.

**Personas involved:** Atlas, Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Findings automatically ranked by severity — Zach starts with the critical items, not with a flat list he must triage manually. | ⏱️ Time Saving — **1–2 hours manual triage → automatic severity ranking** |
| Zach | Compound risk identification: Atlas surfaces "missing CICS security PTF + unencrypted IPIC connection = compound risk higher than either finding alone" — a finding type that does not exist in any single tool. | 🤖 Atlas AI Insight & Automation — compound risk identification requires joining PTF inventory with configuration security state; only possible in Atlas |

---

#### Step 4 — Generate Artifact
**Brief:** Atlas produces the health assessment document — structured finding list with severity, source, recommendation, and remediation path for each item. Exportable for governance sign-off.

**Personas involved:** Zach, Quinn, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Health assessment document generated automatically from the assessment — auditable record that a pre-event review was conducted, with full finding detail. | 🤖 Atlas AI Insight & Automation — structured health artifact generated from assessment data; no manual authoring |
| Quinn | Management-readable risk summary alongside technical findings — Quinn can approve or defer the event from the Atlas artifact without requiring a separate briefing. | 🆕 New User Capability — Quinn makes informed go/no-go decisions independently from the Atlas health artifact |
| Derek | Pre-audit configuration review produces an exportable, auditor-ready artifact — evidence of a systematic review conducted before the audit. | 🆕 New User Capability — Derek produces pre-audit compliance evidence without Zach's involvement |

---

#### Step 5 — Remediate
**Brief:** User selects findings to remediate; Atlas transitions to Change Intelligence to generate and execute the remediation plan.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Health check finding → remediation plan in one session — Atlas transitions directly to a Change Intelligence workflow for each selected finding. No separate investigation or tool switch required. | ⏱️ Time Saving — **hours to days → immediate transition** from finding to remediation plan within Atlas |
| Zach | Post-remediation state is validated before the finding is marked closed — changes made to close health check findings are verified rather than assumed. | 🤖 Atlas AI Insight & Automation — pre-apply validation prevents remediation-induced gaps |

---

#### Step 6 — Register Baseline
**Brief:** After assessment and any remediations, Atlas records the current state as the health baseline for ongoing drift monitoring.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Post-assessment baseline registered automatically — next health check can compare against a known good state, making drift immediately visible. | 🤖 Atlas AI Insight & Automation — baseline registration captures the current state as a reference point for continuous drift monitoring |

---

> **Overall outcome:** Pre-event health assessment reduced from 4–8 hours of multi-team effort to under 30 minutes from a single Atlas session. Compound risks visible for the first time. Every assessment produces a governance-ready artifact — auditable evidence that a review was conducted.

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
