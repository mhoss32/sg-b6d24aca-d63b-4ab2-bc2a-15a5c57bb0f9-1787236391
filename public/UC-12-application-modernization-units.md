# UC-12: Application Modernization — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (supporting)
> **GA Status:** H1 2027 (full; partial at GA Dec 2026)
> **Source spec:** [`UC-12-application-modernization-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-12-application-modernization-spec.md)
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
| Functional test suite | 300,000 | 3.0 |
| Unit test (per test) | 15,000 | 0.15 |
| Directional performance test | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-12 is the use case for moving applications from legacy patterns to modern architectures — exposing CICS programs as REST APIs, migrating batch to z/OS Connect, containerizing services, refactoring deprecated interfaces. It is a **multi-phase, iterative project** like UC-08, but application-focused rather than platform-focused.

The key metering drivers are: (1) the **application modernization assessment** that scopes the work, (2) **test generation** for each modernized component to validate behavioral equivalence, and (3) **environment provisions** for isolated validation of each modernization step.

Lifecycle: `Assess Modernization Scope → Identify Target Architecture → Plan Modernization → Provision Test Environment → Implement and Test → Validate Equivalence → Promote → Record`

---

### Step 1 — Assess Modernization Scope

**What Atlas does:** Atlas analyzes the application portfolio to identify modernization candidates — applications using deprecated interfaces, batch programs that could benefit from API exposure, CICS programs that could be containerized. Produces a modernization readiness assessment: what can be modernized, at what risk, and in what sequence.

**Unit type:** **System assessment** — a structured analysis that combines application topology, interface usage analysis, and compatibility assessment for the modernization target.

| Activity | Tokens | Units |
|---|---|---|
| Application modernization readiness assessment | 250,000 | **2.5** |

**Step 1 subtotal: 2.5 units**

---

### Step 2 — Identify Target Architecture

**What Atlas does:** For the selected modernization target, Atlas identifies the target architecture pattern (e.g., CICS program → z/OS Connect REST API; batch job → streaming pipeline; monolith → microservice boundary), the required interface changes, and the expected behavior equivalence criteria.

**Unit type:** Target architecture definition is part of the initial assessment if done in the same Atlas workflow. If it is a separate, detailed architectural design document, it is a distinct system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Target architecture design document (if standalone) | 250,000 | **2.5** |

**Step 2 subtotal: 0 (if included in Step 1) / 2.5 units (if standalone)**

---

### Step 3 — Plan Modernization

**What Atlas does:** Generates the phased modernization plan: which components to modernize in which order, what the dependency sequence is, what the test criteria are for behavioral equivalence at each step, and what the rollback path is.

**Unit type:** Modernization plan is a structured artifact — a planning document that requires synthesizing assessment findings into actionable phases. Modeled as a partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Phased modernization plan | ~150,000 | **1.5** |

**Step 3 subtotal: 1.5 units**

---

### Step 4 — Provision Test Environment

**What Atlas does:** Atlas provisions an isolated test environment representing the current (pre-modernization) state of the application, alongside the target (post-modernization) architecture. Both environments must be available for behavioral equivalence testing.

| Activity | Events | Units |
|---|---|---|
| Test environment provision (current state) | 1 provision | **0.1** |
| Test environment provision (target architecture) | 1 provision | **0.1** |

**Step 4 subtotal: 0.2 units**

---

### Step 5 — Implement and Test

**What Atlas does:** As each modernization step is implemented, Atlas generates tests to validate behavioral equivalence — that the modernized component behaves the same as the legacy component for all defined business scenarios. This is the primary test-generation step for this use case.

| Activity | Tokens | Units |
|---|---|---|
| Unit tests for modernized components (per test) | 15,000 | **0.15 per test** |
| Functional test suite for behavioral equivalence | 300,000 | **3.0 per suite** |
| Directional performance test (if modernization changes performance profile) | 500,000 | **5.0** (conditional) |

**Example for a CICS-to-REST API modernization of 1 program:**
- 10 unit tests = 1.5 units
- 1 functional test suite (30 scenarios for API behavior) = 3.0 units
- 1 directional performance test (API vs. native CICS performance) = 5.0 units (conditional)

**Step 5 subtotal (typical): 4.5 units / With perf test: 9.5 units**

---

### Step 6 — Validate Equivalence

**What Atlas does:** Runs a formal equivalence comparison — Atlas compares the behavior of the legacy and modernized components side by side, across all test scenarios. Produces an equivalence validation report.

**Unit type:** **Environment comparison** — the legacy vs. modern behavior comparison is precisely what the environment comparison artifact is for (applied to application behavior rather than LPAR configuration).

| Activity | Tokens | Units |
|---|---|---|
| Legacy vs. modernized component equivalence comparison | 300,000 | **3.0** |

**Step 6 subtotal: 3.0 units**

---

### Step 7 — Promote

**What Atlas does:** Promotes the modernized component through the pipeline to production. Each promotion may require a new environment provision event.

| Activity | Events | Units |
|---|---|---|
| Promotion environment provision (if needed per stage) | 1 per stage | **0.1 per stage** |

**Step 7 subtotal: 0.1–0.2 units**

---

### Step 8 — Record

**What Atlas does:** Generates the modernization completion record — scope of modernization, test evidence, equivalence validation, authorization chain. For a significant modernization project, this is an evidence package.

| Activity | Tokens | Units |
|---|---|---|
| Modernization evidence package | 400,000 | **4.0** |

**Step 8 subtotal: 4.0 units**

---

## Full Flow Summary — Per Modernization Component

| Step | Activity | Units |
|---|---|---|
| 1 — Assess | Modernization readiness assessment | 2.5 |
| 2 — Target Architecture | Design document (if standalone) | 0–2.5 |
| 3 — Plan | Phased modernization plan | 1.5 |
| 4 — Provision | 2 × test environments | 0.2 |
| 5 — Test | Unit tests + functional test suite | 4.5 |
| 6 — Validate | Equivalence comparison | 3.0 |
| 7 — Promote | Promotion environment (optional) | 0.1 |
| 8 — Record | Modernization evidence package | 4.0 |
| **TOTAL** | **Nominal single-component modernization** | **15.8 units** |
| **TOTAL** | **With performance test + standalone architecture doc** | **23.3 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Simple API exposure (1 CICS program, no perf test) | Baseline | 1.0× |
| Complex modernization (multi-program, perf-sensitive) | + architecture doc + directional performance test | ~1.5× |
| Portfolio modernization (10 components) | 10× test + equivalence + 1 shared assessment + 1 evidence | ~5–6× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Standalone target architecture design document | Separate architecture artifact in addition to readiness assessment | +2.5 |
| Directional performance test added | Performance test asset to validate modernization impact | +5.0 |
| Each additional modernized component in same project | Additional test suite + equivalence comparison + provisions | +6.3 per component |
| Modernization assessment amortised across portfolio (shared Step 1) | Single assessment shared across all components | −2.5 × (n−1) components |

---

## What is NOT Metered

- Code browsing and program dependency navigation
- Chat queries about modernization options
- Test execution
- Integration testing (not a current Atlas capability)
- Failed or cancelled workflows

---

## Notes and Assumptions

1. UC-12 has the **same test-generation cost structure as UC-07** (application change management) — both consume unit tests, functional test suites, and optionally directional performance tests. The difference is that UC-12 adds an **equivalence comparison** (3.0 units) that UC-07 does not require.
2. The **modernization assessment** (Step 1) is the use-case-unique artifact — understanding the application portfolio's modernization readiness is a System Intelligence capability that Atlas performs at the start of any modernization project. This assessment is typically a shared investment across multiple modernization components.
3. **Portfolio modernization** significantly amortizes the assessment cost (Step 1) across many components — the per-component cost drops when the scoping assessment is shared. The dominant per-component costs are test generation and equivalence comparison.
