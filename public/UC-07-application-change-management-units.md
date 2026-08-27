# UC-07: Application Change Management — Atlas Units Estimation

> **Pillar:** Change Intelligence (primary) + System Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-07-application-change-management-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-07-application-change-management-spec.md)
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
| Evidence package | 400,000 | 4.0 |
| Unit test generated (per test) | 15,000 | 0.15 |
| Functional test suite generated | 300,000 | 3.0 |
| Directional performance test generated | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-07 is the application development change pipeline — the use case that governs how a code change flows from a developer's IDE through test, validation, and into production. This is the **highest test-generation volume** use case in the Atlas library, and therefore the primary driver of unit test and functional test Atlas Units.

Lifecycle: `Change Initiated → Impact Analysis → Test Environment Provisioned → Tests Generated → Tests Executed → Validated → Promoted → Recorded`

---

### Step 1 — Change Initiated

**What Atlas does:** Developer (Kathleen, Deb) initiates a change — a new feature, bug fix, or configuration change. Atlas intakes the change context: what is changing, what program/transaction/API, what the expected behavior change is. Topology navigation to understand what the changed component connects to.

**Unit type:** Footprint (change intake, topology navigation)

**Step 1 subtotal: 0 units**

---

### Step 2 — Impact Analysis

**What Atlas does:** Atlas analyzes the impact of the proposed change — which downstream systems, transactions, datasets, and external APIs are affected by the change. Produces a structured impact assessment: here is everything that could be affected, here is the risk classification, here is the test coverage required.

**Unit type:** **System assessment** — the impact analysis is a structured artifact derived from topology traversal and change context reasoning.

| Activity | Tokens | Units |
|---|---|---|
| Application change impact analysis | 250,000 | **2.5** |

**Step 2 subtotal: 2.5 units**

---

### Step 3 — Test Environment Provisioned

**What Atlas does:** Atlas provisions an isolated test environment at the current production configuration state — a "clean copy" of the affected subsystem context in which the change can be validated safely.

**Unit type:** **Environment Automation** — one successful virtual environment provision.

| Activity | Events | Units |
|---|---|---|
| Test environment provision (1 provision) | 1 successful provision | **0.1** |

**Step 3 subtotal: 0.1 units**

---

### Step 4 — Tests Generated

**What Atlas does:** Atlas generates the test suite for the change — scoped to the affected programs, transactions, and interfaces identified in Step 2.

This is the **highest-unit step in the application development lifecycle** and the primary driver of Atlas test-generation consumption for this use case.

| Activity | Tokens | Units |
|---|---|---|
| Unit tests generated (per test × number of tests) | 15,000 per test | **0.15 per test** |
| Functional test suite generated (covers ~30 test cases) | 300,000 | **3.0** |
| Directional performance test generated (if applicable) | 500,000 | **5.0** (conditional) |

**Example for a typical application change:**
- 10 unit tests generated = 10 × 0.15 = **1.5 units**
- 1 functional test suite = **3.0 units**
- Directional performance test (if change has performance implications) = **5.0 units** (conditional)

**Step 4 subtotal (typical): 4.5 units (unit + functional)**
**Step 4 subtotal (with perf test): 9.5 units**

---

### Step 5 — Tests Executed and Validated

**What Atlas does:** Executes the generated tests against the provisioned environment. Surfaces pass/fail results with attribution. For any failure, Atlas identifies root cause and generates a fix recommendation.

**Unit type:** Test execution = not metered (Atlas meters generation, not execution). Fix recommendation artifacts = partial assessment.

| Activity | Tokens | Units |
|---|---|---|
| Test execution (not metered) | — | 0 |
| Fix recommendation for test failures (conditional, per failure) | ~50,000 | **0.5 per failure** (conditional) |

**Step 5 subtotal: 0 units (nominal) / 0.5 per failure (conditional)**

---

### Step 6 — Promoted to Next Environment

**What Atlas does:** Change is approved and promoted from dev → test → QA → production. Each environment promotion may require a new provision event if a fresh isolated environment is used at each stage.

| Activity | Events | Units |
|---|---|---|
| Additional environment provision per promotion stage | 1 provision per stage | **0.1 per stage** |

**Step 6 subtotal: 0.1–0.3 units (depending on promotion pipeline depth)**

---

### Step 7 — Recorded

**What Atlas does:** Change record generated — what changed, what was tested, what the test results were, who authorized the promotion, when it went to production. Linked to ServiceNow.

**Unit type:** The change record for an application change is a **structured artifact** — less comprehensive than a full evidence package, closer to a subset of one. Modeled as half an evidence package.

| Activity | Tokens | Units |
|---|---|---|
| Application change record (structured artifact) | ~200,000 | **2.0** |

**Step 7 subtotal: 2.0 units**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Initiated | Change intake, topology navigation (footprint) | 0 |
| 2 — Impact Analysis | Application change impact assessment | 2.5 |
| 3 — Provision | Test environment provision | 0.1 |
| 4 — Test Generation | Unit tests + functional test suite | 4.5 |
| 5 — Execute | Test execution (+ fix recs conditional) | 0–0.5 |
| 6 — Promote | Environment provisions per stage | 0.1–0.3 |
| 7 — Record | Application change record | 2.0 |
| **TOTAL** | **Nominal single application change** | **9.2–9.4 units** |
| **TOTAL** | **With directional performance test** | **14.2–14.4 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Minor fix (1 program, no functional test) | 5 unit tests + change record only; no impact analysis | ~0.4× |
| Standard application change | Baseline | 1.0× |
| Complex change (multi-program, performance-sensitive) | + directional performance test | ~1.5× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional unit test generated beyond baseline 10 | One additional unit test artifact | +0.15 per test |
| Directional performance test added | Performance test asset generated | +5.0 |
| Change record upgraded to full evidence package (UC-14 requirement) | Evidence package (4.0) replaces partial record (2.0) | +2.0 |
| Fix recommendation required for each test failure | One additional structured fix artifact per failure | +0.5 per failure |
| 100 developers × 20 unit tests/month | 300 units/month (matches Action Catalog baseline) | +300 per month fleet |

---

## What is NOT Metered

- Code navigation and program browsing in the IDE
- Dependency queries that don't produce a generated artifact
- Test execution
- Smoke test execution (included within functional test generation)
- Integration testing (not a current Atlas capability)
- Failed or cancelled workflows

---

## Notes and Assumptions

1. UC-07 is the **highest volume use case** for Atlas Units because test generation is the primary metered activity and it happens at developer cadence (daily or weekly per developer). The Action Catalog's baseline of 100 developers × 20 unit tests/month = 2,000 tests = 300 units/month is driven entirely by this use case.
2. **Functional tests vs. unit tests:** One functional test suite (3.0 units) covers ~30 test cases. One unit test is 0.15 units. For the same 30 test cases, unit test generation (30 × 0.15 = 4.5 units) is 50% more expensive than a single functional test suite generation (3.0 units) — but the functional test suite is a single generation event, while 30 unit tests may be generated incrementally over time.
3. **Directional performance tests** are rare (Action Catalog assumes 1 per month across the entire customer) but expensive (5.0 units each). They should only be triggered when the change has explicit performance implications.
4. The **change record** (Step 7) is modeled at half an evidence package. If the organization requires a full, auditor-grade change record for every application change (UC-14 governance scenario), this should be upgraded to a full evidence package (4.0 units).
