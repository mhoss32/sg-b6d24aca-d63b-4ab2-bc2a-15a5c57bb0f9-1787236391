# UC-03: Audit and Compliance — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Predictive Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-03-audit-and-compliance-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-03-audit-and-compliance-spec.md)
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
| Evidence package | 400,000 | **4.0** ← primary artifact for this use case |
| Environment comparison | 300,000 | 3.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-03 is Atlas's primary compliance and audit use case. The **evidence package** is the defining billable artifact — Atlas assembles multi-source evidence, maps it to control frameworks, and produces a structured, auditor-ready document. The lifecycle is:

`Trigger → Scope → Assess Configuration State → Map to Controls → Generate Evidence Package → Review → Ongoing Monitoring → Respond to Findings`

---

### Step 1 — Trigger

**What Atlas does:** Audit period opens, compliance deadline approaches, or a new regulatory requirement is identified. The user (Derek or Sage) initiates the compliance workflow. Atlas orients to the relevant frameworks (SOX, PCI-DSS, HIPAA, NIST, etc.).

**Unit type:** Footprint (chat, framework identification)

**Step 1 subtotal: 0 units**

---

### Step 2 — Scope the Compliance Assessment

**What Atlas does:** Determines which systems, subsystems, applications, and environments are in scope for the audit. Maps the current environment topology to the applicable compliance framework control list. Identifies which controls have Atlas-observable evidence vs. which require manual attestation.

**Unit type:** Footprint — this is topology navigation and configuration collection, not a generated artifact. The scoping output is a query result list, not an assessment.

**Step 2 subtotal: 0 units**

---

### Step 3 — Assess Configuration State

**What Atlas does:** Across all in-scope systems, Atlas collects current configuration state and evaluates it against compliance baselines: RACF permission sets, cryptographic settings, audit logging configuration, PTF currency against security FIXCATs, network encryption state, dataset protections. Identifies gaps and deviations.

**Unit type:** **System assessment** — this is the core analysis artifact. Atlas is aggregating configuration data from multiple sources (RACF, SMP/E, CaC, MQ, Db2 security settings) and producing a structured gap analysis. For a complex compliance scope (e.g., PCI-DSS across 10+ LPARs), this may approach the upper bound of the 250K estimate.

| Activity | Tokens | Units |
|---|---|---|
| Configuration compliance assessment (multi-system, multi-control) | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

---

### Step 4 — Map Findings to Control Framework

**What Atlas does:** Takes the configuration gap analysis from Step 3 and maps each finding to specific control identifiers in the applicable framework (e.g., SOX IT control CC6.1, PCI-DSS Req 8.2, NIST SP 800-53 AC-6). Produces a control-by-control compliance status table.

**Unit type:** The control mapping is a reasoning-intensive step that transforms raw findings into structured compliance evidence. Modeled as approximately one additional system assessment's worth of inference (the mapping logic is as token-intensive as the gap analysis).

| Activity | Tokens | Units |
|---|---|---|
| Control framework mapping (findings → framework identifiers) | 250,000 | **2.5** |

**Step 4 subtotal: 2.5 units**

> **Rationale:** If Steps 3 and 4 are implemented as a single end-to-end assessment workflow (gap analysis and control mapping in one Atlas invocation), the combined cost is one system assessment (2.5 units). The two-step model above represents the more conservative estimate where they are separate inference tasks. Product implementation will determine the actual token budget.

---

### Step 5 — Generate Evidence Package

**What Atlas does:** Assembles the full, audit-ready evidence package: control-by-control status, supporting evidence citations (configuration snapshots, PTF records, access logs), exception documentation, control-to-system mapping, remediation recommendations for gaps, and change history traceability. This is the artifact Derek brings to the auditor.

**Unit type:** **Evidence package** — the primary billable artifact for this use case. The Action Catalog specifies 400,000 tokens for an evidence package because it requires "multiple evidence sources, control mappings, traceability, and structured documentation."

| Activity | Tokens | Units |
|---|---|---|
| Compliance evidence package generation | 400,000 | **4.0** |

**Step 5 subtotal: 4.0 units**

---

### Step 6 — Review and Validate

**What Atlas does:** Surfaces the evidence package to Derek, Sage, or Quinn for review. Highlights exceptions and gaps that require human remediation or attestation. No new inference artifact at this step unless Atlas is asked to regenerate a section.

**Unit type:** Footprint (chat, results presentation)

**Step 6 subtotal: 0 units**

---

### Step 7 — Ongoing Compliance Monitoring

**What Atlas does:** Between audit cycles, Atlas continuously monitors for configuration drift that would create new compliance gaps. Proactively surfaces changes to RACF settings, encryption configuration, or PTF currency that affect in-scope controls.

**Unit type:** Monitoring = footprint. When Atlas detects a drift event significant enough to require a fresh compliance assessment, that assessment is metered.

| Activity | Tokens | Units |
|---|---|---|
| Continuous drift monitoring (footprint) | Footprint | 0 |
| Triggered re-assessment when significant drift detected (conditional) | 250,000 | **2.5** (conditional) |

**Step 7 subtotal: 0 units (nominal) / 2.5 units (if drift-triggered reassessment)**

---

### Step 8 — Respond to Findings / Remediation

**What Atlas does:** For gaps identified in the evidence package, Atlas generates remediation plans (e.g., RACF configuration correction, PTF apply plan for a missing security fix, encryption configuration change). Each remediation plan is a structured output.

**Unit type:** Remediation plans are generated artifacts. Modeled as a partial system assessment per significant remediation cluster.

| Activity | Tokens | Units |
|---|---|---|
| Remediation plan for identified compliance gaps (per cluster) | ~125,000 | **1.25 per cluster** |

**Step 8 subtotal: 1.25 units per remediation cluster (variable)**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Audit initiation, framework orientation | 0 |
| 2 — Scope | In-scope system identification (footprint) | 0 |
| 3 — Assess | Configuration compliance assessment | 2.5 |
| 4 — Map | Control framework mapping | 2.5 |
| 5 — Evidence Package | Full audit evidence package | 4.0 |
| 6 — Review | Results review (footprint) | 0 |
| 7 — Monitor | Ongoing drift monitoring (+ conditional re-assessment) | 0–2.5 |
| 8 — Remediate | Remediation plans for gaps (per cluster) | 1.25+ |
| **TOTAL** | **Nominal audit cycle (no drift, 1 remediation cluster)** | **10.25 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Single framework, small scope (≤3 LPARs) | Simpler assessment; lighter evidence package | ~0.6–0.7× |
| Standard annual audit (SOX or PCI, 5–10 LPARs) | Baseline | 1.0× |
| Multi-framework audit (SOX + PCI + HIPAA simultaneously) | 1 assessment + 3 separate evidence packages | ~1.6–2.0× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Pre-audit readiness sweep added before formal audit | Two full assessment + evidence cycles instead of one | +10.25 |
| Continuous compliance monitoring (monthly re-assessment) | +12 drift reassessments/year at 2.5 units each | +30 per year |
| Each additional remediation cluster found during audit | One additional remediation plan per cluster | +1.25 per cluster |

---

## What is NOT Metered

- Configuration collection and inventory queries
- Topology navigation (which systems are in scope?)
- Chat queries about compliance frameworks
- Test execution
- Failed workflows

---

## Notes and Assumptions

1. UC-03 is the **primary consumer of the evidence package artifact** across all 14 use cases. The evidence package (4.0 units) is the defining meter here — not test generation or provisioning.
2. **Steps 3 and 4 combined:** If the compliance assessment and control mapping are implemented as a single Atlas workflow, the two steps collapse to one system assessment (2.5 units total instead of 5.0). Implementation teams should clarify this when designing the compliance assessment workflow.
3. **Multi-framework compliance** is the high-unit scenario. Three frameworks × full evidence package = 12+ units from evidence generation alone, before assessment costs.
4. The **ongoing monitoring** model (Step 7) is operationally significant — the more frequently Atlas re-assesses for drift, the higher the monthly unit consumption. Organizations running continuous compliance monitoring should budget accordingly.
