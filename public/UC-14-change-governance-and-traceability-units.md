# UC-14: Change Governance and Traceability — Atlas Units Estimation

> **Pillar:** Change Intelligence (primary) + System Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-14-change-governance-and-traceability-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-14-change-governance-and-traceability-spec.md)
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

UC-14 is the governance layer that runs across all other use cases — it ensures that every change made through Atlas is traceable, authorized, and auditable. Unlike most use cases, UC-14 does not generate most of its own Atlas Units directly; its units come from the **evidence packages and structured records that other use cases produce** as their change artifacts. However, UC-14 has unique metered activities in two scenarios: (1) **on-demand traceability queries** that produce structured audit reports, and (2) **governance assessment generation** when Atlas is asked to evaluate the organization's change governance posture.

Lifecycle: `Change Initiated (in another UC) → Atlas Records Change → Governance Gate → Change Record Generated → Traceability Query → Governance Assessment → Audit Report`

---

### Step 1 — Change Initiated (Cross-UC)

**What Atlas does:** A change is initiated in any other Atlas workflow (UC-01 through UC-13). Atlas automatically captures change metadata: what is changing, who initiated it, when, on which system, what the pre-change state is.

**Unit type:** Footprint — change metadata capture and audit logging are infrastructure-level activities, not generated artifacts.

**Step 1 subtotal: 0 units**

---

### Step 2 — Atlas Records Change (Continuous)

**What Atlas does:** Throughout the change workflow, Atlas records every action, authorization, test result, and decision in the change ledger. This is the continuous audit trail that every other use case relies on for its evidence output.

**Unit type:** Footprint — the Atlas change ledger is the footprint infrastructure. Recording is not metered; generating a structured artifact from the ledger is metered.

**Step 2 subtotal: 0 units**

---

### Step 3 — Governance Gate

**What Atlas does:** At defined governance gates (e.g., change advisory board review, pre-production authorization, emergency change approval), Atlas surfaces a structured change summary: what is changing, what was tested, what the risk assessment says, who has authorized what so far.

**Unit type:** The governance gate summary is a generated artifact — not footprint (it requires Atlas to synthesize the change record into a CAB-ready document). Modeled as a partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| CAB/governance gate change summary (per gate) | ~100,000 | **1.0 per gate** |

**Step 3 subtotal: 1.0 units per governance gate**

---

### Step 4 — Change Record Generated

**What Atlas does:** At the conclusion of a change workflow, Atlas generates the complete change record — this is the artifact produced by the originating use case (e.g., UC-01's remediation evidence package, UC-07's application change record). UC-14 governs that these records are produced; the cost is already accounted for in the originating use case.

**Unit type:** The change record is metered in the originating use case. No double-billing.

> **Accounting note:** UC-14 does not generate additional Atlas Units for the change records it governs — those costs are attributed to the use case that drove the change (UC-01, UC-02, UC-07, etc.). UC-14's own unit cost comes from governance-specific activities that are not part of the originating workflow.

**Step 4 subtotal: 0 units (attributed to originating use case)**

---

### Step 5 — Traceability Query

**What Atlas does:** Derek, Quinn, or Sage asks Atlas a traceability question — "show me all changes to PROD-LPAR1 in the last 90 days," "what was the authorization chain for this PTF apply," "which changes crossed the emergency change process last quarter?" Atlas searches the change ledger and produces a structured traceability report.

**Unit type:** If the query is a simple search/filter (returning existing records), it is footprint. If Atlas is asked to **generate a structured traceability analysis document** (synthesizing patterns across the change history, summarizing risk concentrations, identifying anomalies), that is a system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Traceability search / change history query (footprint) | Footprint | 0 |
| Structured traceability analysis report (generated artifact) | 250,000 | **2.5** |

**Step 5 subtotal: 0 (query) / 2.5 (structured analysis)**

---

### Step 6 — Governance Assessment

**What Atlas does:** On a periodic basis (or at the request of Quinn or Derek), Atlas assesses the organization's change governance posture: How often are governance gates bypassed? What is the mean authorization-to-production lead time? Are emergency changes reviewed retrospectively? Are all production changes traceable? Produces a structured governance health report.

**Unit type:** **System assessment** — a governance posture assessment is a structured analysis artifact synthesizing change history patterns, authorization compliance, and governance metric trends.

| Activity | Tokens | Units |
|---|---|---|
| Change governance posture assessment | 250,000 | **2.5** |

**Step 6 subtotal: 2.5 units**

---

### Step 7 — Audit Report

**What Atlas does:** For a formal audit (external auditor review, internal audit, regulatory examination), Atlas generates a comprehensive change governance audit report — complete traceability for all changes in the audit period, evidence of governance gate compliance, authorization records, and change outcome summary.

**Unit type:** **Evidence package** — the audit report is the most comprehensive artifact Atlas generates for UC-14. It requires compiling change records across all workflows, identifying the authorization chain for each, and producing a structured, auditor-ready document.

| Activity | Tokens | Units |
|---|---|---|
| Change governance audit report (evidence package) | 400,000 | **4.0** |

**Step 7 subtotal: 4.0 units**

---

## Full Flow Summary — Per Governance Cycle

| Step | Activity | Units |
|---|---|---|
| 1 — Change Initiated | Metadata capture (footprint) | 0 |
| 2 — Records Change | Audit ledger (footprint) | 0 |
| 3 — Governance Gate | CAB change summary (per gate) | 1.0 per gate |
| 4 — Change Record | Attributed to originating use case | 0 |
| 5 — Traceability Query | Search (0) / structured analysis (2.5) | 0–2.5 |
| 6 — Governance Assessment | Change governance posture assessment | 2.5 |
| 7 — Audit Report | Change governance evidence package | 4.0 |
| **TOTAL** | **Per governance cycle (1 gate, 1 assessment, 1 audit report)** | **7.5 units** |

---

## Total Unit Budget Across Change Portfolio

UC-14's governance activities sit on top of the units already consumed by the originating use cases. For a full picture:

| Source | Estimated annual units from UC-14 governance activities |
|---|---|
| CAB summaries (3 gates/week × 52 weeks) | ~156 units/year |
| Traceability analyses (1/month) | ~30 units/year |
| Quarterly governance assessments | 4 × 2.5 = 10 units/year |
| Annual audit report | 4.0 units/year |
| **Total UC-14 governance overhead** | **~200 units/year** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Footprint-only governance (change ledger, no reports) | No generated artifacts; audit ledger only | 0× |
| Quarterly audit with CAB summaries | 12 CAB summaries + 4 governance assessments + 1 audit report | ~0.13× |
| Full annual governance program | Baseline (~200 units/year) | 1.0× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Each additional CAB gate change summary | One additional governance gate artifact | +1.0 per gate |
| Each additional governance posture assessment | One additional system assessment | +2.5 |
| Regulatory examination requiring full traceability | Additional evidence package per system examined | +4.0 per system |
| Structured traceability analysis report (on-demand) | Generated traceability synthesis artifact | +2.5 per report |

---

## What is NOT Metered

- Automatic change ledger recording (all changes)
- Change history search and query
- Chat-based governance status questions
- Authorization workflow (the governance gate process itself)
- ServiceNow change record synchronization

---

## Notes and Assumptions

1. UC-14 is **primarily a governance overlay** — it does not generate most of its own units. Its primary economic impact is through the **change records and evidence packages** generated by the 13 other use cases, which UC-14 governs. The unit cost of UC-14 is the governance overhead layer on top of the operational use case costs.
2. **CAB summaries** (Step 3) are the highest-volume UC-14 artifact in practice — if every change requires a CAB gate, and each gate costs 1.0 unit, a high-velocity change organization (3 changes/week) generates ~156 CAB-summary units/year from UC-14 governance alone.
3. The **traceability analysis** (Step 5, 2.5 units) is most commonly triggered by: (a) a regulatory examination, (b) a post-incident review, or (c) a periodic governance health review. Frequency depends on organizational maturity and regulatory exposure.
4. **Double-billing guardrail:** The change records generated by UC-01 through UC-13 are attributed to those use cases. UC-14 does not charge again for the same records — it charges only for governance-specific activities (CAB summaries, traceability analyses, governance assessments, audit reports) that are not part of the originating workflows.
