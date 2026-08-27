# UC-08: Platform Upgrade and Migration — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (primary) + Predictive Intelligence (supporting)
> **GA Status:** H1 2027 (full; GA Dec 2026 delivers Lean PTF MVP only)
> **Source spec:** [`UC-08-platform-upgrade-and-migration-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-08-platform-upgrade-and-migration-spec.md)
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
| Environment comparison | 300,000 | 3.0 |
| Functional test suite | 300,000 | 3.0 |
| Directional performance test | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-08 is the **highest Atlas Unit consumption use case** in the library. A z/OS version upgrade is a multi-phase, multi-LPAR project that triggers multiple rounds of assessment, provisioning, testing, and recording. The spec describes the lifecycle as:

`Assess → Sequence → Plan → Provision → Test → Remediate → Promote → Monitor`

Because this is a **phased, multi-environment project** (not a single workflow event), units are estimated per phase, then totaled for the full upgrade project.

---

### Phase 1 — Assess (Compatibility Impact Sweep)

**What Atlas does:** Inventories all components in scope, checks all 300+ applications and configurations against the target version's compatibility matrix. Produces a comprehensive compatibility finding list. This is the multi-LPAR, multi-application compatibility sweep.

**Unit type:** This is a **system assessment** — but given the scope (300+ applications, multiple subsystems, deep compatibility analysis), it almost certainly pushes toward the upper boundary of the 250K estimate or beyond. Modeled as 1.5× a standard system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Full compatibility impact sweep (large estate, z/OS version upgrade) | ~375,000 | **3.75** |

**Phase 1 subtotal: 3.75 units**

---

### Phase 2 — Sequence

**What Atlas does:** Determines the correct upgrade order for interdependent subsystems — which must be upgraded before which to avoid known compatibility failures. Produces a sequenced upgrade order with rationale (e.g., "Db2 must precede CICS due to compatibility constraint X").

**Unit type:** The sequencing analysis is a structured decision artifact — not footprint (requires active reasoning over the dependency graph and compatibility rules). Modeled as a partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Subsystem upgrade sequencing analysis | ~150,000 | **1.5** |

**Phase 2 subtotal: 1.5 units**

---

### Phase 3 — Plan

**What Atlas does:** Generates the full, phased upgrade plan: phase-by-phase scope, test criteria, production promotion decision points, rollback checkpoints, and maintenance window assignments across all LPARs.

**Unit type:** **System assessment** — the upgrade plan is a comprehensive, structured artifact that requires synthesizing all the compatibility findings and sequencing logic into an actionable, phased document.

| Activity | Tokens | Units |
|---|---|---|
| Phased upgrade plan generation | 250,000 | **2.5** |

**Phase 3 subtotal: 2.5 units**

---

### Phase 4 — Provision (per test phase)

**What Atlas does:** For each phase of the upgrade, Atlas provisions an isolated test environment at the current version, applies the upgrade to that environment, and prepares it for regression testing.

**Unit type:** **Environment Automation** — one successful virtual environment provision per phase.

A z/OS upgrade typically involves 3–5 phases (dev, test, QA, pre-prod, prod). Each phase has its own isolated environment.

| Activity | Events | Units |
|---|---|---|
| Test environment provision per phase (× 4 phases typical) | 4 successful provisions | **0.4** |

**Phase 4 subtotal: 0.4 units** (scales with number of phases)

---

### Phase 5 — Test (per phase)

**What Atlas does:** For each phase, Atlas runs the full regression test suite against the upgraded environment — all affected applications, all subsystem interfaces.

**Unit type:** **Functional test suite** per application × number of applications in scope. For a 20-application upgrade, Atlas generates a functional test suite per application.

| Activity | Tokens | Units |
|---|---|---|
| Functional test suite per application (× 20 applications) | 300,000 per suite | **3.0 per suite** |
| Directional performance test (1 per phase to check for performance regression) | 500,000 | **5.0** |

**Example for 20-application upgrade, 4 phases:**
- Functional tests: 20 apps × 3.0 = 60 units per phase
- Performance test: 5.0 per phase
- Total per phase: 65 units
- Total across 4 phases: 260 units

**Phase 5 subtotal: ~65 units per phase (scales with application scope)**

> **This is the dominant cost driver in UC-08.** A full z/OS upgrade across 20 applications over 4 phases generates ~260 units from test generation alone. This is consistent with UC-08 being described in the spec as "one of the highest-revenue-per-event use cases in the Atlas library."

---

### Phase 6 — Remediate

**What Atlas does:** For each compatibility issue found during testing, Atlas generates a specific remediation (code change guidance, configuration update, PTF apply). Each remediation cluster requires a structured artifact.

| Activity | Tokens | Units |
|---|---|---|
| Remediation plan per compatibility finding cluster | ~125,000 per cluster | **1.25 per cluster** |

**Phase 6 subtotal: varies by finding count (est. 5–15 clusters = 6.25–18.75 units)**

---

### Phase 7 — Promote

**What Atlas does:** User authorizes promotion from test → QA → production for each phase. Atlas executes the promotion and generates a phase-promotion record.

**Unit type:** Promotion execution = footprint. Phase record = small artifact per promotion.

| Activity | Tokens | Units |
|---|---|---|
| Phase promotion authorization (footprint) | Footprint | 0 |
| Phase promotion record (per phase, structured artifact) | ~50,000 | **0.5 per phase** |

**Phase 7 subtotal: 0.5 × 4 phases = 2.0 units**

---

### Phase 8 — Monitor

**What Atlas does:** After each production promotion, Atlas monitors for behavioral changes, performance impacts, and post-upgrade anomalies. Produces a post-upgrade health report if anomalies are detected.

| Activity | Tokens | Units |
|---|---|---|
| Continuous monitoring (footprint) | Footprint | 0 |
| Post-upgrade anomaly report (conditional, per event) | 250,000 | **2.5** (conditional) |
| Post-upgrade environment comparison (pre/post state diff) | 300,000 | **3.0** |

**Phase 8 subtotal: 3.0 units (post-upgrade comparison)**

---

### Close — Upgrade Completion Record

**What Atlas does:** Generates the full upgrade completion record — all compatibility findings, remediation evidence, phase promotion records, test results, authorization chain, and post-upgrade validation. This is the evidence package for the entire upgrade project.

| Activity | Tokens | Units |
|---|---|---|
| Upgrade project evidence package | 400,000 | **4.0** |

**Close subtotal: 4.0 units**

---

## Full Project Summary (20-Application z/OS Upgrade, 4 Phases)

| Phase | Activity | Units |
|---|---|---|
| 1 — Assess | Compatibility impact sweep | 3.75 |
| 2 — Sequence | Subsystem upgrade sequencing | 1.5 |
| 3 — Plan | Phased upgrade plan | 2.5 |
| 4 — Provision | 4 × test environment provisions | 0.4 |
| 5 — Test | 20 apps × 4 phases functional tests + perf tests | ~260 |
| 6 — Remediate | 10 compatibility finding clusters | ~12.5 |
| 7 — Promote | 4 × phase promotion records | 2.0 |
| 8 — Monitor | Post-upgrade comparison per phase | 3.0 |
| Close | Upgrade evidence package | 4.0 |
| **TOTAL** | **Full z/OS upgrade project (20 apps, 4 phases)** | **~289 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Small upgrade (5 apps, 2 phases) | Proportional reduction in test generation + fewer phases | ~0.17× |
| Middleware-only upgrade (CICS TS, 1 subsystem, 2 phases) | Single subsystem scope; fewer applications in test sweep | ~0.13–0.16× |
| Medium upgrade (10 apps, 3 phases) | Proportional | ~0.48× |
| Full z/OS upgrade (20 apps, 4 phases) | Baseline | 1.0× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional application in test scope | +1 functional test suite per phase per app | +3.0 × phases |
| Each additional upgrade phase | +20 apps × 3.0 functional tests + 1 perf test | +65 per phase |
| Each additional compatibility finding cluster requiring remediation | One additional remediation plan per cluster | +1.25 per cluster |
| Post-upgrade anomaly report triggered | Additional system assessment on anomaly detection | +2.5 per event |

---

## What is NOT Metered

- Topology navigation and compatibility documentation browsing
- Chat queries about upgrade compatibility
- Test execution
- Smoke test execution (included in functional test generation)
- Failed or cancelled phases

---

## Notes and Assumptions

1. **UC-08 is the single highest-unit-consumption event** in the Atlas library due to test generation volume across multiple phases. A 20-app, 4-phase upgrade generates more Atlas Units than a full year of monthly patch cycles for many customers.
2. **Test generation per phase:** The model conservatively assumes a fresh functional test suite generation per application per phase. In practice, Atlas may reuse test artifacts across phases with incremental updates — reducing the per-phase cost. Product implementation should determine whether test refresh is a full generation or a delta generation.
3. **Directional performance testing:** The Action Catalog assumes 1 directional performance test per month across the full customer. For an upgrade project, 1 per phase is a reasonable assumption (5.0 × 4 phases = 20 units from performance testing alone).
4. **Revenue implication:** At $20/unit, a full z/OS upgrade project generates approximately $5,800 in Atlas consumption revenue — consistent with the spec's characterization of this as a "highest-revenue-per-event use case."
