# UC-06: Change Readiness and Health Assessment — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Predictive Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-06-change-readiness-and-health-assessment-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-06-change-readiness-and-health-assessment-spec.md)
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
| System assessment | 250,000 | **2.5** ← primary artifact for this use case |
| Evidence package | 400,000 | 4.0 |
| Environment comparison | 300,000 | 3.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-06 is the pre-change gate — the health check that determines whether a system is ready for a proposed change. It is triggered either on demand (before a planned change) or proactively (Atlas surfaces a readiness concern before the change window opens). The **system assessment** is the defining artifact.

Lifecycle: `Trigger → Baseline Collection → Health Assessment → Readiness Decision → Change Proceeds or Blocked → Post-Change Validation`

---

### Step 1 — Trigger

**What Atlas does:** A change is planned (maintenance window, PTF apply, configuration change, upgrade). Zach or Alice asks Atlas to assess whether the target system is ready. Or Atlas proactively surfaces a health concern before the change is initiated.

**Unit type:** Footprint (chat, change context intake)

**Step 1 subtotal: 0 units**

---

### Step 2 — Baseline Collection

**What Atlas does:** Atlas collects current system state across all dimensions relevant to the proposed change: PTF currency, configuration settings, subsystem health indicators, application connectivity, open incidents, and any pending changes that could conflict. This is configuration collection — footprint.

**Unit type:** Footprint (configuration collection, inventory lookup, topology navigation)

**Step 2 subtotal: 0 units**

---

### Step 3 — Health Assessment

**What Atlas does:** Atlas analyzes the collected baseline and produces a structured health assessment for the target system(s): overall readiness score, specific risk factors, recommended remediation actions for any blockers, and a go/no-go recommendation. Multi-source aggregation: RACF security posture, PTF gaps, configuration anomalies, recent incident history, application dependency state.

**Unit type:** **System assessment** — this is the core artifact of UC-06. Atlas synthesizes multiple data sources into a structured analysis with a recommendation. This is explicitly a "system assessment generated" artifact.

| Activity | Tokens | Units |
|---|---|---|
| System health and change readiness assessment | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

> **Note on scope scaling:** For a single LPAR, 250K tokens is a reasonable midpoint. For a multi-LPAR assessment covering 5+ systems before a major change, the token budget may approach 400K (evidence package tier). For a z/OS version upgrade readiness assessment covering 300+ applications (UC-08's compatibility sweep), a full system assessment is conservative — that scenario may warrant a higher token estimate.

---

### Step 4 — Readiness Decision

**What Atlas does:** Surfaces the assessment to Zach. If the system is ready, Atlas confirms and records the readiness confirmation with timestamp. If there are blockers, Atlas identifies them and generates a remediation plan.

**Unit type:** Readiness confirmation = footprint. Remediation plan for blockers = partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Readiness confirmation (footprint) | Footprint | 0 |
| Remediation plan for blockers (conditional, if blockers found) | ~125,000 | **1.25** (conditional) |

**Step 4 subtotal: 0 units (clear) / 1.25 units (if blockers)**

---

### Step 5 — Change Proceeds (or Blocked)

**What Atlas does:** If no blockers, the change proceeds. Atlas records the readiness assessment in the change record. If the change is blocked, Atlas supports the remediation workflow (overlaps with UC-01 for security blockers, UC-02 for PTF blockers).

**Unit type:** Change record update = footprint. Remediation workflows are metered in their respective use cases.

**Step 5 subtotal: 0 units**

---

### Step 6 — Post-Change Validation

**What Atlas does:** After the change is applied, Atlas performs a post-change health check — confirming the system is behaving as expected, comparing pre-change and post-change state, and flagging any anomalies introduced by the change.

**Unit type:** The post-change validation is a second **system assessment** (or an **environment comparison** if Atlas is comparing pre-change vs. post-change state).

| Activity | Tokens | Units |
|---|---|---|
| Post-change health check (system assessment) | 250,000 | **2.5** |
| OR: Pre/post-change state comparison (environment comparison) | 300,000 | **3.0** |

**Step 6 subtotal: 2.5–3.0 units**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Change context intake (footprint) | 0 |
| 2 — Baseline | Configuration collection (footprint) | 0 |
| 3 — Health Assessment | System health and readiness assessment | **2.5** |
| 4 — Decision | Readiness confirmation; blockers plan (conditional) | 0–1.25 |
| 5 — Change | Change record update (footprint) | 0 |
| 6 — Post-Change | Post-change health check OR state comparison | **2.5–3.0** |
| **TOTAL** | **Nominal (no blockers, health check + post-change)** | **5.0–5.5 units** |
| **TOTAL** | **With blockers remediation plan** | **6.25–6.75 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Quick pre-change check (single LPAR, low-risk change) | One lightweight assessment only; no post-change check | ~0.5× |
| Standard change readiness + post-change validation | Baseline | 1.0× |
| Major change (z/OS upgrade, multi-LPAR) | Two full assessments + environment comparison | ~1.5–1.6× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Blockers found requiring remediation plan | One additional remediation plan artifact | +1.25 |
| Post-change state comparison used instead of second assessment | Environment comparison (3.0) in place of system assessment (2.5) | +0.5 |
| Monthly health checks across 10 LPARs | 10 additional assessment events per month | +25.0 per month |

---

## What is NOT Metered

- Configuration collection and baseline inventory
- Topology queries about the target system
- Chat-based readiness questions that don't produce a generated artifact
- Test execution

---

## Notes and Assumptions

1. UC-06 is the **most frequently triggered use case** across all 14 — every planned change should trigger a readiness assessment. At monthly cadence for a 10-LPAR shop with weekly change windows, the assessment volume alone could generate 100+ units/month.
2. **Pre-change vs. post-change:** Both use the system assessment tier, but the **environment comparison** (3.0 units) is preferable for Step 6 when the goal is specifically to diff the before/after state — it is designed for multi-source comparison with diff analysis.
3. **Proactive health surfacing** (Atlas identifies a readiness risk before being asked) is footprint until Atlas generates the assessment. The detection signal is free; the structured analysis document is metered.
