# UC-10: Disaster Recovery Validation — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-10-disaster-recovery-validation-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-10-disaster-recovery-validation-spec.md)
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
| Environment comparison | 300,000 | 3.0 |
| Evidence package | 400,000 | **4.0** ← key for compliance validation record |
| Functional test suite | 300,000 | 3.0 |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-10 validates that the DR environment is actually ready to serve production traffic if a failover occurs — not just "patched" but functionally equivalent. It is triggered on a scheduled basis (regulatory requirement), before a major change, or as part of a remediation from UC-01 (where Atlas flags open DR exposure).

Lifecycle: `Trigger → Assess DR Parity → DR Readiness Assessment → Provision DR Test → Validate Functional Equivalence → Record DR Validation → Ongoing Monitoring`

---

### Step 1 — Trigger

**What Atlas does:** Scheduled DR validation window opens, or Atlas has flagged open DR exposure (from UC-01 monitoring), or a manual validation is initiated (Derek, Greg). Atlas intakes the DR validation scope — which production environment and which DR environment pair.

**Unit type:** Footprint (chat, scope intake)

**Step 1 subtotal: 0 units**

---

### Step 2 — Assess DR Parity (Configuration and PTF State)

**What Atlas does:** Atlas compares the DR environment to its production counterpart across all dimensions: PTF levels, software versions, RACF definitions, subsystem configuration, cryptographic settings, dataset allocations, network definitions. Identifies any gaps that would prevent the DR environment from serving production traffic.

**Unit type:** **Environment comparison** — the parity check between production and DR is precisely the artifact the environment comparison is designed for.

| Activity | Tokens | Units |
|---|---|---|
| Production vs. DR environment comparison | 300,000 | **3.0** |

**Step 2 subtotal: 3.0 units**

---

### Step 3 — DR Readiness Assessment

**What Atlas does:** Beyond raw parity (which Step 2 addresses), Atlas assesses whether the DR environment is operationally ready: Are all required subsystems defined? Is the DR LPAR configured to accept the production workload? Are there any configuration settings that are production-specific but missing in DR? Generates a DR readiness assessment with a go/no-go recommendation.

**Unit type:** **System assessment** — a structured analysis artifact that synthesizes the comparison findings with operational readiness criteria.

| Activity | Tokens | Units |
|---|---|---|
| DR operational readiness assessment | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

---

### Step 4 — Provision DR Test Environment

**What Atlas does:** To validate functional equivalence (not just configuration parity), Atlas provisions a test instance of the DR environment and runs it through functional scenarios that mirror production workloads.

**Unit type:** **Environment Automation** — one successful virtual environment provision.

| Activity | Events | Units |
|---|---|---|
| DR test environment provision | 1 successful provision | **0.1** |

**Step 4 subtotal: 0.1 units**

---

### Step 5 — Validate Functional Equivalence

**What Atlas does:** Atlas generates and executes functional tests that confirm the DR environment can serve production transactions equivalently — key business transactions, critical batch jobs, external API interfaces. Surfaces any failures with root-cause attribution.

**Unit type:** **Functional test suite** — generated for the DR validation scenario.

| Activity | Tokens | Units |
|---|---|---|
| Functional test suite for DR equivalence validation | 300,000 | **3.0** |

**Step 5 subtotal: 3.0 units**

---

### Step 6 — Record DR Validation

**What Atlas does:** Generates the DR validation record — the compliance-grade evidence that the DR environment was tested and validated. Many regulatory frameworks (SOX, DORA, FSOC) require documented DR test evidence annually. This is an **evidence package** — a comprehensive, structured, auditor-ready artifact.

| Activity | Tokens | Units |
|---|---|---|
| DR validation evidence package | 400,000 | **4.0** |

**Step 6 subtotal: 4.0 units**

---

### Step 7 — Ongoing DR Monitoring

**What Atlas does:** Between formal validation cycles, Atlas monitors the DR environment for configuration drift from production (UC-09 overlap). Proactively flags any drift that would degrade DR readiness.

**Unit type:** Monitoring = footprint. If Atlas detects significant drift and generates a drift alert artifact, that is metered as a partial comparison.

| Activity | Tokens | Units |
|---|---|---|
| Continuous DR drift monitoring (footprint) | Footprint | 0 |
| Drift alert artifact (conditional, if significant drift detected) | ~150,000 | **1.5** (conditional) |

**Step 7 subtotal: 0 units (nominal)**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Scope intake (footprint) | 0 |
| 2 — Parity Check | Production vs. DR comparison | 3.0 |
| 3 — Readiness Assessment | DR operational readiness assessment | 2.5 |
| 4 — Provision | DR test environment provision | 0.1 |
| 5 — Validate | Functional equivalence test suite | 3.0 |
| 6 — Record | DR validation evidence package | 4.0 |
| 7 — Monitor | Ongoing drift monitoring (footprint) | 0 |
| **TOTAL** | **Nominal DR validation cycle** | **12.6 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Lightweight parity check only (no functional test) | Comparison + readiness assessment only; no test suite | ~0.44× |
| Standard annual DR validation (regulatory compliance) | Baseline | 1.0× |
| Complex DR validation (multiple application tiers, two DR sites) | 2× comparisons + 2× test suites + evidence package | ~1.6–1.75× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional DR site added to validation scope | Additional comparison + test suite per site | +6.1 per site |
| Quarterly instead of annual validation cadence | 3 additional full validation cycles per year | +37.8 per year |
| Interim drift monitoring re-assessment triggered | One additional partial assessment per drift event | +1.5 per event |
| DR validation combined with UC-09 parity cycle | Eliminates duplicate Step 2 comparison | −3.0 |

---

## What is NOT Metered

- Configuration collection and state snapshot collection
- Topology queries about DR environment
- Chat-based DR status questions
- Test execution
- Ongoing DR drift monitoring (continuous background process)

---

## Notes and Assumptions

1. UC-10 is a **compliance-driven use case** — the evidence package (4.0 units) is particularly important because it is the deliverable that satisfies regulatory requirements. Organizations running quarterly DR validation under DORA or FSOC will budget ~50 units/year from DR validation evidence packages alone.
2. **Overlap with UC-09:** The production vs. DR comparison (Step 2) is functionally the same as a UC-09 environment comparison. Organizations running both UC-09 (ongoing parity monitoring) and UC-10 (formal DR validation) can potentially consolidate the Step 2 comparison into the UC-09 cadence, avoiding duplication.
3. **Overlap with UC-01:** When UC-01 flags open DR exposure during a vulnerability remediation, the DR validation (Steps 2–6 here) is a direct downstream action. The unit costs from UC-01's DR monitoring step and UC-10's formal DR validation should not both be charged for the same DR assessment event.
4. The **DR validation evidence package** is the highest-governance artifact in this use case — it is the document that an auditor will examine. Its 400K token budget reflects the need to compile configuration snapshots, test evidence, parity confirmation, and authorization records into a single structured document.
