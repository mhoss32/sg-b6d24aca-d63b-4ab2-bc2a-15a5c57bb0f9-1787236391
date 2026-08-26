# UC-03: Audit and Compliance — Bob PPZ Touchpoints

> **Source use case:** UC-03 Audit and Compliance
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

**No Bob PPZ touchpoint in this use case.**

The Audit and Compliance workflow operates entirely at the infrastructure, security, and configuration layer. Remediations identified by Atlas in this flow are RACF changes, configuration baseline corrections, retroactive change record creation, and privileged access adjustments — all of which are infrastructure and security-layer operations that Atlas orchestrates directly without application code involvement.

Bob PPZ owns code-level application execution. None of the compliance evidence categories (RACF reports, PTF inventory, configuration snapshots, change history, SoD analysis) require code-level modification or code-level analysis. The workflow does not produce a handoff trigger.

---

## Tier 1 — Explicit Handoff Points

None. No step in the Audit and Compliance To-Be flow requires the user to be directed to Bob PPZ for code-level execution.

---

## Tier 2 — Enrichment Touchpoints

None applicable to the core audit workflow. If an audit finding surfaces a compliance gap in an application (for example, an application program performing direct dataset access that bypasses RACF controls), Atlas would identify the affected program as part of the finding. In that narrow scenario, Bob PPZ could be used to understand and remediate the application-level gap — but this would be initiated as a separate application change workflow (see UC-07), not as a step within the audit workflow itself.

---

> **Overall Bob PPZ relevance for this use case:** None within the core workflow. If audit findings identify application code as the source of a compliance gap, that remediation flows through the application change management pattern (UC-07), not through this use case.
