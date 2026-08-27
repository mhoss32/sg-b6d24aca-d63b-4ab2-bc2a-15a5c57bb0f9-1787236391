# UC-02: Patch Management — Atlas Units Estimation

> **Pillar:** Change Intelligence (primary) + System Intelligence (supporting)
> **GA Status:** GA Dec 2026 (Lean PTF Orchestration MVP)
> **Source spec:** [`UC-02-patch-management-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-02-patch-management-spec.md)
> **Unit model:** [`Atlas Action Catalog.pdf`](../Atlas%20Action%20Catalog.pdf)

---

## Atlas Units Reference

| Category | Conversion |
|---|---|
| Intelligence Generation | 100,000 tokens = 1 unit |
| Environment Automation | 10 successful provisions = 1 unit |
| Free (footprint) | Discovery, topology nav, chat, inventory lookup, config collection |

**Artifact token estimates:**

| Artifact | Tokens | Units |
|---|---|---|
| System assessment | 250,000 | 2.5 |
| Evidence package | 400,000 | 4.0 |
| Environment comparison | 300,000 | 3.0 |
| Functional test suite | 300,000 | 3.0 |
| Unit test (per test) | 15,000 | 0.15 |
| Directional performance test | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-02 is the scheduled, maintenance-cycle counterpart to UC-01. The execution path from Step 3 onward is shared infrastructure. The distinguishing characteristic is the **PTF readiness assessment** that drives the patch selection, plus the routine cadence (no blast radius traversal in the standard case).

Lifecycle: `Identify → Assess PTF Readiness → Plan → Provision + Test → Authorize → Execute → Validate → Record`

---

### Step 1 — Identify Applicable PTFs

**What Atlas does:** Scans the connected estate for applicable PTFs in the current RSU or FIXCAT category, filtered by the organization's patching policy (e.g., HIPER mandatory, PE-corrected, or routine maintenance window). Surfaces a prioritized patch list across all LPARs.

**Unit type:** Footprint — this is PTF inventory lookup and topology navigation, not a generated artifact. The raw PTF list is a query result, not an assessment.

**Step 1 subtotal: 0 units**

---

### Step 2 — Assess PTF Readiness

**What Atlas does:** For the selected PTF set, Atlas generates a readiness assessment: prerequisite chain resolution, PE flag check, HOLD analysis, application impact summary (which applications are affected by the PTF changes), and maintenance window feasibility across the target LPARs.

**Unit type:** **System assessment** — this is the structured analysis artifact that scopes what the patch cycle will touch and what could go wrong. It involves multi-source aggregation (ibm.com PTF feed, IZSAM inventory, CaC-derived application context).

| Activity | Tokens | Units |
|---|---|---|
| PTF readiness assessment (prerequisite chain + impact analysis) | 250,000 | **2.5** |

**Step 2 subtotal: 2.5 units**

---

### Step 3 — Plan the Patch Cycle

**What Atlas does:** Generates the sequenced patch plan for the maintenance window: LPAR apply order, co-requisite grouping, maintenance window slot assignments, rollback checkpoints, and any configuration updates required alongside the PTF.

**Unit type:** The patch plan is a persistent decision artifact — not footprint, but also narrower than a full system assessment. Modeled as approximately 50% of a system assessment (focused planning artifact, not a broad analysis).

| Activity | Tokens | Units |
|---|---|---|
| Sequenced patch plan generation | ~125,000 | **1.25** |

**Step 3 subtotal: 1.25 units**

> **Rationale:** The patch plan for a routine maintenance cycle is a narrower artifact than a full vulnerability remediation plan — it does not require blast radius traversal or multi-LPAR risk scoring. Modeled at half the system assessment budget. For a complex multi-LPAR maintenance window with many interdependencies, this could approach a full 2.5 unit assessment.

---

### Step 4 — Provision + Test

**What Atlas does:** Provisions a test environment at the current LPAR state, applies the PTF set, runs the functional test suite against the patched environment. Identifies any test failures and attributes them to specific PTF changes.

| Activity | Tokens / Events | Units |
|---|---|---|
| Virtual test environment provision | 1 successful provision | **0.1** |
| Functional test suite generated | 300,000 | **3.0** |

**Step 4 subtotal: 3.1 units**

> **Rationale:** Routine patch management typically involves one test environment per maintenance window. If the patch scope covers multiple subsystems with independent test suites, each functional test generation event is metered separately (e.g., CICS test suite + Db2 test suite = 2 × 3.0 units).

---

### Step 5 — Authorize

**What Atlas does:** Presents test results and the patch recommendation to Zach (or Alice for delegated patches). Awaits explicit approval. No new inference artifact at this step.

**Unit type:** Footprint (chat, results presentation)

**Step 5 subtotal: 0 units**

---

### Step 6 — Execute

**What Atlas does:** Orchestrates the patch apply across LPARs in the sequenced order within the maintenance window. Each production LPAR apply requires individual authorization.

| Activity | Tokens / Events | Units |
|---|---|---|
| Patch apply orchestration (execution, no new inference artifact) | Footprint | 0 |

**Step 6 subtotal: 0 units**

---

### Step 7 — Validate

**What Atlas does:** Post-apply validation: Atlas confirms the PTFs are active and correct on each LPAR, runs smoke tests (included within the functional test generation budget), and checks for any unexpected configuration state changes.

**Unit type:** Validation queries and smoke test execution are footprint. Smoke test generation is included within the functional test suite generated in Step 4 (Action Catalog explicitly states "smoke test generation is included within functional test generation").

**Step 7 subtotal: 0 units**

---

### Step 8 — Record

**What Atlas does:** Generates the patch cycle record — PTFs applied, LPARs covered, test evidence, authorization chain, maintenance window log. Updated in Atlas change history. ServiceNow change ticket updated.

**Unit type:** **Evidence package** — the completed patch cycle record is a structured, audit-ready artifact compiled from multiple evidence sources.

| Activity | Tokens | Units |
|---|---|---|
| Patch cycle evidence package | 400,000 | **4.0** |

**Step 8 subtotal: 4.0 units**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Identify | PTF inventory scan (footprint) | 0 |
| 2 — Assess Readiness | PTF readiness assessment | 2.5 |
| 3 — Plan | Sequenced patch plan | 1.25 |
| 4 — Provision + Test | Test environment + functional test suite | 3.1 |
| 5 — Authorize | Results review, approval prompt | 0 |
| 6 — Execute | Production apply orchestration | 0 |
| 7 — Validate | Post-apply validation, smoke tests | 0 |
| 8 — Record | Evidence package / change record | 4.0 |
| **TOTAL** | **Nominal single maintenance window** | **10.85 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Minimal patch (single PTF, single LPAR) | No test environment, no full assessment | ~0.4× |
| Standard maintenance window (5–10 PTFs, 3–5 LPARs) | Baseline | 1.0× |
| Complex window (20+ PTFs, multi-subsystem, 10+ LPARs) | Full system assessment + 2 functional test suites | ~1.5–1.7× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Emergency HIPER patch (no scheduled test window, expedited) | Abbreviated readiness check; test skipped with risk acceptance | −4 to −5 |
| Monthly cadence (12 maintenance windows per year) | ~130 units/year for a mid-size shop | +10.85 per additional window |

---

## What is NOT Metered

- PTF currency monitoring between maintenance windows
- Routine PTF inventory lookups and ibm.com FIXCAT queries
- Smoke test execution (metered at generation, included in functional test budget)
- Test execution
- Failed or cancelled workflows

---

## Notes and Assumptions

1. UC-02 and UC-01 **share the execution infrastructure** (PTF orchestration, test environment, apply sequencing) from Step 4 onward. The unit cost difference is in Steps 1–3: UC-01 adds blast radius traversal (2.5 units) and a more complex remediation plan; UC-02 uses a lighter readiness assessment and no blast radius.
2. The **evidence package** (Step 8) is consistently 4.0 units across both UC-01 and UC-02 because the audit artifact class is the same — the difference is the content and depth, not the artifact type.
3. For organizations running **monthly patch cycles**, the annual unit budget for patch management alone is approximately 130 Atlas Units (10.85 × 12), excluding the evidence package scaling for any accelerated cycles.
