# UC-13: Regulatory Change Response — Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (supporting)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-13-regulatory-change-response-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-13-regulatory-change-response-spec.md)
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
| Functional test suite | 300,000 | 3.0 |
| Virtual environment provision (per 10) | — | 1.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-13 governs how organizations respond to new or changed regulatory requirements that affect their IBM Z environment — PCI-DSS version changes, DORA, FFIEC updates, Basel amendments, or new internal policy mandates. Atlas scopes the impact of the regulatory change, identifies the required technical responses, and produces the evidence that the organization has responded.

Lifecycle: `Regulatory Change Identified → Impact Scoping → Gap Assessment → Response Plan → Implement Changes → Generate Compliance Evidence → Validate → Record`

---

### Step 1 — Regulatory Change Identified

**What Atlas does:** Derek or Sage identifies a new or changed regulatory requirement. Atlas interprets the requirement, maps it to the technical controls it affects in the IBM Z environment, and establishes the compliance scope (which systems, subsystems, and applications are in scope for this regulation).

**Unit type:** Footprint — regulatory requirement interpretation and scope mapping is a topology navigation and framework identification activity, not a generated artifact.

**Step 1 subtotal: 0 units**

---

### Step 2 — Impact Scoping

**What Atlas does:** Atlas identifies all systems, configurations, processes, and evidence items affected by the regulatory change. This is a structured scoping analysis — what changes when this regulation applies, and which Atlas-managed components are in scope.

**Unit type:** Scope analysis for a regulatory change is a structured artifact — a targeting document that directs all subsequent work. Modeled as a partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Regulatory change impact scope analysis | ~125,000 | **1.25** |

**Step 2 subtotal: 1.25 units**

---

### Step 3 — Gap Assessment

**What Atlas does:** Atlas assesses the current state of in-scope systems against the new regulatory requirements. Identifies specific gaps — configurations that don't meet the new standard, missing controls, evidence that doesn't yet exist. Produces a structured gap analysis.

**Unit type:** **System assessment** — the gap analysis is a multi-source compliance assessment artifact (same class as UC-03's configuration compliance assessment, but driven by a new or changed regulatory standard).

| Activity | Tokens | Units |
|---|---|---|
| Regulatory compliance gap assessment (current state vs. new standard) | 250,000 | **2.5** |

**Step 3 subtotal: 2.5 units**

---

### Step 4 — Response Plan

**What Atlas does:** Atlas generates the regulatory response plan — the specific technical changes required to close each gap, in what sequence, with what validation criteria, and by what deadline. This is Atlas's primary planning artifact for this use case.

**Unit type:** Structured planning artifact — a phased response plan with remediation tasks mapped to regulatory control identifiers. Modeled as a system assessment (the response plan requires the same depth of reasoning as the gap assessment to translate findings into actionable steps).

| Activity | Tokens | Units |
|---|---|---|
| Regulatory response plan | 250,000 | **2.5** |

**Step 4 subtotal: 2.5 units**

---

### Step 5 — Implement Changes

**What Atlas does:** The response plan is executed — configuration changes, PTF applies, RACF updates, encryption enablement, etc. Implementation follows the same patterns as UC-02 (PTF changes), UC-07 (application changes), or UC-03 (compliance configuration). Each change is validated with a test environment provision.

**Unit type:** Implementation-phase unit costs are tracked against the relevant change-management use cases. For this file, model a standard implementation cycle.

| Activity | Tokens / Events | Units |
|---|---|---|
| Test environment provision (1 per significant change cluster) | 1 provision | **0.1** |
| Functional test suite (validate the change doesn't break behavior) | 300,000 | **3.0** |

**Step 5 subtotal: 3.1 units**

---

### Step 6 — Generate Compliance Evidence

**What Atlas does:** Atlas generates the regulatory compliance evidence package — the formal document that proves the organization has responded to the regulatory change. Contains: regulatory requirement summary, gap analysis, response plan, implementation evidence, test results, and authorization chain.

**Unit type:** **Evidence package** — the regulatory compliance evidence package is the primary billable artifact of this use case. It is structurally similar to the UC-03 evidence package but tailored to a specific regulatory change event.

| Activity | Tokens | Units |
|---|---|---|
| Regulatory compliance evidence package | 400,000 | **4.0** |

**Step 6 subtotal: 4.0 units**

---

### Step 7 — Validate

**What Atlas does:** Atlas runs a post-implementation compliance validation — confirming that all required changes have been made, all gaps are closed, and the evidence package is complete and accurate.

**Unit type:** Post-implementation validation is typically a targeted re-scan of the specific controls affected by the change. Modeled as a partial system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Post-implementation compliance validation | ~100,000 | **1.0** |

**Step 7 subtotal: 1.0 units**

---

### Step 8 — Record

**What Atlas does:** The evidence package (Step 6) serves as the primary record. Atlas updates the compliance posture model to reflect the new regulatory requirement as a baseline going forward. Ongoing monitoring of the new controls is folded into the UC-03 continuous compliance monitoring workflow.

**Unit type:** Posture model update = footprint. No additional artifact at this step.

**Step 8 subtotal: 0 units**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Identify | Regulatory interpretation (footprint) | 0 |
| 2 — Scope | Impact scope analysis | 1.25 |
| 3 — Gap Assessment | Current state vs. new standard | 2.5 |
| 4 — Response Plan | Regulatory response plan | 2.5 |
| 5 — Implement | Test environment + functional test | 3.1 |
| 6 — Evidence | Regulatory compliance evidence package | **4.0** |
| 7 — Validate | Post-implementation compliance check | 1.0 |
| 8 — Record | Posture model update (footprint) | 0 |
| **TOTAL** | **Nominal regulatory change response event** | **14.35 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Minor policy update (limited scope, 1–2 controls) | Lightweight scope analysis + evidence only; no full response plan | ~0.45–0.50× |
| Standard regulatory update (PCI-DSS rev, DORA new requirement) | Baseline | 1.0× |
| Major regulatory change (new framework, broad technical scope) | 2 gap assessments + full response plan + evidence package | ~1.35–1.40× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Concurrent regulatory change (second regulation responded to simultaneously) | Full additional response workflow | +14.35 |
| Each additional remediation cluster during implementation | One additional remediation plan artifact | +1.25 per cluster |
| Post-implementation validation added | Additional targeted re-scan of affected controls | +1.0 |
| Gap assessment consolidated with ongoing UC-03 compliance cycle | Avoids duplicate assessment where frameworks overlap | −2.5 |

---

## What is NOT Metered

- Regulatory requirement monitoring and interpretation (chat)
- Configuration collection in support of assessment
- Test execution
- Topology queries about in-scope systems

---

## Notes and Assumptions

1. UC-13 is structurally similar to UC-03 (audit and compliance) but is **event-driven** (responding to a specific new or changed regulation) rather than **cycle-driven** (annual audit). The evidence package (4.0 units) appears in both, but UC-13 also requires a response plan (2.5 units) that UC-03 does not.
2. **Overlap with UC-03:** The gap assessment (Step 3) in UC-13 and the compliance assessment (Step 3) in UC-03 may overlap when the regulatory change affects the same controls being assessed in the annual audit. Organizations should avoid double-generating both artifacts if they can be consolidated.
3. **The response plan (Step 4) is the use-case-unique artifact** in UC-13 — it is not generated in UC-03 (which is about documenting current state, not responding to change). This 2.5-unit artifact is the key differentiator for this use case.
