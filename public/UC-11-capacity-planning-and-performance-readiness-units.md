# UC-11: Capacity Planning and Performance Readiness — Atlas Units Estimation

> **Pillar:** Predictive Intelligence (primary) + System Intelligence (supporting)
> **GA Status:** H1 2027 (full; partial behaviors at GA Dec 2026)
> **Source spec:** [`UC-11-capacity-planning-and-performance-readiness-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-11-capacity-planning-and-performance-readiness-spec.md)
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
| Directional performance test | 500,000 | **5.0** ← primary artifact for this use case |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-11 ensures that when a change is made — a new application, a platform upgrade, a volume increase — the system has the capacity and performance headroom to absorb it without degrading SLAs. The **directional performance test** is the defining artifact.

Lifecycle: `Trigger → Baseline Analysis → Capacity Assessment → Performance Test Generated → Provision Test Environment → Execute → Analyze → Recommend → Record`

---

### Step 1 — Trigger

**What Atlas does:** A change is approaching (new application deployment, upcoming peak season, planned upgrade) and Alex or Zach needs to know whether capacity and performance are adequate. Or Atlas proactively surfaces a capacity concern based on trend analysis.

**Unit type:** Footprint (chat, trigger intake, trend signal surfacing)

**Step 1 subtotal: 0 units**

---

### Step 2 — Baseline Analysis

**What Atlas does:** Atlas collects the current performance baseline for the affected systems: MSU utilization trends, response time baselines, transaction throughput, memory and storage headroom, Db2 buffer pool utilization, CPU-bound transaction identification.

**Unit type:** Footprint — performance data collection, inventory queries, topology navigation. The raw baseline data collection is included in the footprint. However, if Atlas synthesizes this into a **baseline performance summary document**, that is a generated artifact.

| Activity | Tokens | Units |
|---|---|---|
| Raw baseline collection (footprint) | Footprint | 0 |
| Baseline performance summary document (if generated) | ~100,000 | **1.0** |

**Step 2 subtotal: 0–1.0 units**

---

### Step 3 — Capacity Assessment

**What Atlas does:** Atlas assesses whether current capacity headroom is sufficient for the projected workload change. Analyzes MSU trends vs. MIPS entitlement, storage growth trajectory, memory pressure indicators, and identifies any capacity constraints that would need to be addressed.

**Unit type:** **System assessment** — a structured analysis that synthesizes multiple performance data streams into a capacity gap assessment with recommendations.

| Activity | Tokens | Units |
|---|---|---|
| Capacity gap assessment | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

---

### Step 4 — Performance Test Generated

**What Atlas does:** Atlas generates the directional performance test configuration — the workload definition, baseline measurements to capture, post-change measurement points, comparison thresholds, and result criteria. This is the Atlas-generated test asset that Alex or the performance team will execute using TAZ or another performance tooling.

**Unit type:** **Directional performance test** — 500,000 tokens. This is the most expensive single artifact Atlas generates, reflecting the depth of reasoning required: "understand the affected application and change, establish a representative workload, define baseline and post-change measurements, establish comparison thresholds, generate the test configuration and result criteria."

| Activity | Tokens | Units |
|---|---|---|
| Directional performance test asset generated | 500,000 | **5.0** |

**Step 4 subtotal: 5.0 units**

---

### Step 5 — Provision Performance Test Environment

**What Atlas does:** Atlas provisions an environment at production-equivalent capacity configuration for the performance test — ensuring the test results are representative.

**Unit type:** **Environment Automation**

| Activity | Events | Units |
|---|---|---|
| Performance test environment provision | 1 successful provision | **0.1** |

**Step 5 subtotal: 0.1 units**

---

### Step 6 — Execute

**What Atlas does:** Test execution is performed by Alex using the generated test asset. Atlas monitors the execution and collects results. Execution itself is not metered (Atlas meters generation, not execution).

**Unit type:** Not metered.

**Step 6 subtotal: 0 units**

---

### Step 7 — Analyze Results

**What Atlas does:** Atlas analyzes the performance test results against the baseline and the expected behavior. Identifies whether the system meets SLAs under the projected workload, highlights any bottlenecks, and classifies findings by severity.

**Unit type:** The results analysis is a structured artifact — Atlas synthesizes test output into a findings document. Modeled as a partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Performance test results analysis | ~150,000 | **1.5** |

**Step 7 subtotal: 1.5 units**

---

### Step 8 — Recommend

**What Atlas does:** Atlas generates capacity and configuration recommendations based on the analysis: specific tuning recommendations (Db2 buffer pool sizes, WLM service class adjustments), capacity expansion recommendations, or change deferral recommendations if capacity is insufficient.

**Unit type:** Recommendations are part of the results analysis artifact (Step 7) unless they are generated as a separate, detailed recommendation document.

| Activity | Tokens | Units |
|---|---|---|
| Capacity and tuning recommendations (if standalone document) | ~100,000 | **1.0** (conditional) |

**Step 8 subtotal: 0–1.0 units (if standalone; typically included in Step 7)**

---

### Step 9 — Record

**What Atlas does:** Generates the performance readiness record — baseline, test configuration, test results, analysis, and capacity recommendations. For regulated industries or CAB-required evidence, this may be an evidence package.

| Activity | Tokens | Units |
|---|---|---|
| Performance readiness record (structured artifact) | ~200,000 | **2.0** |
| Full evidence package (if regulatory CAB requirement) | 400,000 | **4.0** |

**Step 9 subtotal: 2.0–4.0 units**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Trigger intake (footprint) | 0 |
| 2 — Baseline | Collection (footprint; summary doc optional) | 0–1.0 |
| 3 — Capacity Assessment | Capacity gap assessment | 2.5 |
| 4 — Performance Test | Directional performance test asset | **5.0** |
| 5 — Provision | Test environment provision | 0.1 |
| 6 — Execute | Test execution (not metered) | 0 |
| 7 — Analyze | Results analysis | 1.5 |
| 8 — Recommend | Recommendations (if standalone) | 0–1.0 |
| 9 — Record | Performance readiness record | 2.0 |
| **TOTAL** | **Nominal performance readiness cycle** | **11.1 units** |
| **TOTAL** | **With full evidence package** | **13.1 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Capacity assessment only (no performance test) | Assessment + record only; no test generation or provision | ~0.41× |
| Standard performance readiness cycle | Baseline | 1.0× |
| Multiple applications in scope (3 directional perf tests) | One additional performance test per application | ~2.1× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Directional performance test added per application | One additional 500K-token test asset per application | +5.0 per application |
| Full evidence package required instead of readiness record | Evidence package (4.0) replaces performance record (2.0) | +2.0 |
| Baseline performance summary generated (Step 2) | Additional structured baseline summary artifact | +1.0 |
| Standalone recommendations document generated (Step 8) | Separate recommendations artifact beyond results analysis | +1.0 |

---

## What is NOT Metered

- Performance data collection and baseline queries
- MSU utilization trend monitoring (continuous, footprint)
- Chat queries about capacity headroom
- Test execution
- Interactive performance dashboard browsing

---

## Notes and Assumptions

1. The **directional performance test** (5.0 units) is the most expensive single artifact in the Atlas catalog. Its cost reflects the depth of reasoning required to produce a meaningful, representative workload definition. Organizations should budget carefully — the Action Catalog assumes only 1 directional performance test per month across the entire customer (5 units/month from this artifact alone).
2. **Pre-change performance readiness** (a performance test before every significant change) is a high-value but high-cost usage pattern. If every application change (UC-07) triggers a directional performance test, the monthly unit budget grows by 5 units per test generated.
3. **Capacity planning vs. performance testing:** Step 3 (capacity assessment, 2.5 units) and Step 4 (performance test generation, 5.0 units) are distinct artifacts — capacity planning is data-driven trend analysis; performance test generation is a forward-looking workload simulation specification. Both may be generated in the same workflow or independently.
