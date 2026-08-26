# UC-06: Change Readiness & Health Assessment — Bob PPZ Touchpoints

> **Source use case:** UC-06 Change Readiness & Health Assessment
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Change readiness and health assessment is primarily an infrastructure, PTF, and configuration workflow owned entirely by Atlas. The majority of findings surfaced in a health check — PTF gaps, configuration deviations, RACF posture issues, CICS thread constraints — are remediated at the infrastructure and middleware layer. Bob PPZ enters when a health check finding identifies an application code issue as the root cause (e.g., a deprecated API still in use by an application, tight coupling creating a health constraint, or an application component with a known code-level risk). The enrichment touchpoint improves the precision of application-layer findings in the health assessment.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 5 — Remediate

**What Atlas has produced at this point:**
Atlas has generated the health assessment document, ranked findings by severity, and identified compound risks. The user selects findings to remediate; Atlas transitions to a Change Intelligence workflow. For most findings (PTF gaps, RACF misconfigurations, subsystem parameter deviations), Atlas orchestrates the remediation directly. For findings whose root cause lies in application code — a deprecated API still in use, a COBOL program creating a performance constraint through inefficient SQL, or a shared copybook creating a coupling risk flagged as high-severity — Atlas identifies the application component but cannot execute the code-level fix.

**What Atlas directs the user to do in Bob PPZ:**
Atlas presents the application-code finding with the affected program identified, the health check context that surfaced it, and the blast radius of the code component. The user is directed to Bob PPZ to understand the code-level root cause — what the program is doing that creates the constraint, what the safe remediation path looks like, and how to implement the fix without breaking dependent programs. Bob PPZ uses ZUnderstand to trace the execution path and data flow relevant to the finding.

**What comes back to Atlas:**
A code fix artifact. Atlas validates the fix in the provisioned environment (pre-apply validation), confirms the finding is resolved, and marks it closed in the health assessment record. The complete remediation — including the code change — is captured in the governance artifact.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 2 — Assess

**How Bob PPZ enriches this step:**
Atlas joins PTF currency, configuration compliance, security posture, and performance constraints across all scoped components. When the assessment includes application components, the application layer of the health picture is enriched by Bob PPZ's ZUnderstand metadata:

- Applications with deprecated API usage are identified at program level rather than application level — narrowing the finding from "Application X uses a deprecated API" to "Program ACCTVAL01 in Application X uses EXEC CICS commands being withdrawn in the next CICS TS release."
- Coupling risk is quantified: ZUnderstand's coupling analysis identifies programs with high fan-in (many callers) that represent high-blast-radius health risks.
- Business service attribution: health findings for application components are enriched with the business service they support — helping Sage and Quinn prioritize health findings by business impact, not just technical severity.

### Step 3 — Rank Findings

**How Bob PPZ enriches this step:**
Atlas's compound risk identification joins findings from PTF inventory, configuration state, security posture, and subsystem parameters. When Bob PPZ is present, compound risks that involve application code are surfaced with greater precision: for example, "COBOL program ACCTVAL01 uses a deprecated CICS API (Bob PPZ finding) on a CICS region with a missing security PTF (Atlas PTF finding) — compound risk higher than either finding alone." Without Bob PPZ, the code-level half of this compound finding is absent.

---

> **Overall Bob PPZ relevance for this use case:** Low-to-moderate. Bob PPZ is relevant only when health check findings root-cause to application code. The enrichment touchpoints add meaningful precision to the application layer of the health assessment, particularly for organizations running large COBOL application estates. For infrastructure-focused health checks (LPAR topology, PTF currency, DR readiness), Bob PPZ has no role.
