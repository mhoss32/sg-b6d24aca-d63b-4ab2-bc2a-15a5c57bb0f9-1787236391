# UC-09: Environment Parity & Drift Control — Bob PPZ Touchpoints

> **Source use case:** UC-09 Environment Parity & Drift Control
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

**No Bob PPZ touchpoint in this use case.**

Environment parity and drift control operates at the configuration and infrastructure layer. Drift is detected by comparing Config-as-Code state against a registered baseline — the differences are in system parameters, RACF profiles, subsystem configuration, PTF levels, and operational settings. Realignment remediations are configuration corrections applied through Atlas's Change Intelligence, without application code involvement.

Bob PPZ owns code-level application execution. Configuration parameter drift, RACF changes, and subsystem setting deviations are not code changes — they are infrastructure changes that Atlas orchestrates directly.

---

## Tier 1 — Explicit Handoff Points

None. No step in the Environment Parity & Drift Control To-Be flow requires the user to be directed to Bob PPZ for code-level execution.

---

## Tier 2 — Enrichment Touchpoints

One peripheral enrichment scenario exists but is not part of the core workflow:

**Application-level configuration drift (peripheral):**
If drift is detected in application-layer configuration items managed through Atlas — for example, CICS program definitions that have drifted from the Config-as-Code baseline — Bob PPZ can provide code-level context on the affected programs. If the drift represents an unauthorized change to a CICS resource definition that relates to a specific COBOL program, Bob PPZ's ZUnderstand data can identify which code depends on that definition and what the blast radius of the drift is. This is a peripheral enrichment — it does not change the drift control workflow, but it adds code-level context to the investigation of application-adjacent drift findings.

This scenario would be relevant only in environments where Atlas is managing application-layer configuration as part of Config-as-Code, and only for drift items that directly relate to application program behavior. It does not constitute a named Bob PPZ integration point in this use case.

---

> **Overall Bob PPZ relevance for this use case:** None within the core workflow. Drift control is a configuration and infrastructure discipline owned entirely by Atlas. If a drift investigation surfaces an application code issue, that remediation flows through the application change management pattern (UC-07), not through this use case.
