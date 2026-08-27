# UC-09: Environment Parity and Drift Control — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Predictive Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-09-environment-parity-and-drift-control-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-09-environment-parity-and-drift-control-spec.md)
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
| Environment comparison | 300,000 | **3.0** ← primary artifact for this use case |
| Evidence package | 400,000 | 4.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-09 governs whether environments are where they should be — and surfaces drift before it causes a production incident, failed test run, or compliance violation. The **environment comparison** is the defining artifact, purpose-built for this use case.

Lifecycle: `Trigger → Collect State → Compare Environments → Classify Drift → Remediate → Validate → Record`

---

### Step 1 — Trigger

**What Atlas does:** User (Zach, Alice, Greg) asks Atlas to compare two environments — or Atlas proactively detects a drift event and surfaces it. Triggers can be: pre-change parity check, post-change drift detection, scheduled parity review, or CI/CD-triggered environment comparison.

**Unit type:** Footprint (chat, trigger intake)

**Step 1 subtotal: 0 units**

---

### Step 2 — Collect State

**What Atlas does:** Atlas collects the current state of both environments being compared — PTF levels, software versions, configuration settings, RACF definitions, cryptographic settings, dataset allocations, subsystem definitions. This is configuration collection across multiple LPARs.

**Unit type:** Footprint (configuration collection, inventory lookup, topology navigation)

**Step 2 subtotal: 0 units**

---

### Step 3 — Compare Environments

**What Atlas does:** Atlas compares the collected state of the two (or more) environments: identifies every difference, categorizes each difference (significant vs. insignificant, intentional vs. unintended), and produces a structured diff report with risk classification.

**Unit type:** **Environment comparison** — this is the Action Catalog's purpose-built artifact for this step. It requires "data from multiple environments, difference analysis, risk interpretation, and final artifact" (300,000 tokens = 3.0 units).

| Activity | Tokens | Units |
|---|---|---|
| Environment comparison (2 environments) | 300,000 | **3.0** |
| Additional environment in the comparison (e.g., prod vs. QA vs. dev) | +150,000 per additional env | **+1.5 per env** |

**Step 3 subtotal: 3.0 units (2-environment baseline) / 4.5–6.0 units (3–4 environments)**

---

### Step 4 — Classify Drift

**What Atlas does:** For each identified difference, Atlas classifies it: Is this an expected difference (intentional configuration for the environment tier)? Is it an unintended drift (production config leaked to QA, or a PTF was applied to production but not to test)? Is it a risk (compliance gap, security exposure, test-validity threat)?

**Unit type:** Classification reasoning is included within the environment comparison artifact (Step 3). No additional meter at this step unless Atlas generates a separate risk assessment for significant drift findings.

| Activity | Tokens | Units |
|---|---|---|
| Drift risk assessment (if significant findings require separate structured analysis) | ~100,000 | **1.0** (conditional) |

**Step 4 subtotal: 0 units (nominal) / 1.0 unit (if drift risk assessment generated)**

---

### Step 5 — Remediate

**What Atlas does:** For unintended drift, Atlas generates a remediation plan — what needs to change in which environment to restore parity (or to deliberately document the difference as intentional). For PTF drift: generates a patch plan. For configuration drift: generates a configuration correction.

**Unit type:** Remediation plan is a structured artifact. Modeled as a partial system assessment per remediation cluster.

| Activity | Tokens | Units |
|---|---|---|
| Drift remediation plan (per cluster of related drift items) | ~125,000 | **1.25 per cluster** |

**Step 5 subtotal: 1.25 units (typical, single cluster)**

---

### Step 6 — Validate

**What Atlas does:** After remediation is applied, Atlas runs a follow-up comparison to confirm parity has been restored. This is a second environment comparison artifact.

| Activity | Tokens | Units |
|---|---|---|
| Post-remediation environment comparison (validation) | 300,000 | **3.0** |

**Step 6 subtotal: 3.0 units**

---

### Step 7 — Record

**What Atlas does:** Generates the parity record — comparison result, drift findings, remediation applied, post-remediation validation. Stored in Atlas change history for the environment pair.

**Unit type:** Parity record is a structured artifact — smaller than a full evidence package. Modeled as a partial evidence package.

| Activity | Tokens | Units |
|---|---|---|
| Environment parity record | ~150,000 | **1.5** |

**Step 7 subtotal: 1.5 units**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Trigger intake (footprint) | 0 |
| 2 — Collect State | Configuration collection (footprint) | 0 |
| 3 — Compare | Environment comparison (2 environments) | 3.0 |
| 4 — Classify | Drift classification (within comparison; risk assessment conditional) | 0–1.0 |
| 5 — Remediate | Drift remediation plan | 1.25 |
| 6 — Validate | Post-remediation comparison | 3.0 |
| 7 — Record | Parity record | 1.5 |
| **TOTAL** | **Nominal 2-environment comparison with remediation + validation** | **8.75 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Read-only parity check (no remediation, no validation) | Comparison artifact only; no remediation or validation steps | ~0.34× |
| 2-environment comparison with single remediation | Baseline | 1.0× |
| 3-environment comparison (prod / QA / dev) | Additional environment added to comparison scope | ~1.17× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional environment added to a comparison | Extended comparison scope per environment | +1.5 per environment |
| Drift risk assessment generated (significant findings) | Additional structured risk analysis artifact | +1.0 |
| Weekly automated parity checks (no remediation, 52/year) | Comparison-only events at 3.0 units each | +3.0 per additional check |
| Each additional remediation cluster found | One additional remediation plan artifact | +1.25 per cluster |

---

## What is NOT Metered

- Configuration collection and state snapshot collection
- Topology queries about environment differences
- Chat-based parity questions that don't produce a generated artifact
- Environment comparison browsing (interactive navigation of the diff, not generation of the artifact)

---

## Notes and Assumptions

1. UC-09 is the **primary driver of environment comparison artifact consumption** — the 300K-token comparison is purpose-built for this use case. Other use cases consume comparisons incidentally (UC-06 post-change validation, UC-08 post-upgrade state diff); UC-09 is the use case where comparison is the core workflow.
2. **Automated parity monitoring:** Many organizations will run UC-09 on a schedule (e.g., nightly or weekly automated comparison). At 52 comparisons/year × 3.0 units = 156 units/year from automated parity monitoring alone. If full remediation cycles are triggered monthly, add ~105 units/year. Budget planning should account for the cadence.
3. **Environment comparison scope scaling:** The 300K token estimate assumes a 2-environment comparison of a standard LPAR configuration. For larger environments with many configuration dimensions (security, networking, storage, all subsystem definitions), the comparison may push toward the 400K evidence package tier. For simple PTF-only comparisons, it may be closer to 150K.
