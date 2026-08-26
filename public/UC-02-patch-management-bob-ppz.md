# UC-02: Patch Management — Bob PPZ Touchpoints

> **Source use case:** UC-02 Patch Management
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Patch management is primarily a PTF and infrastructure workflow owned entirely by Atlas. Bob PPZ enters when a patch introduces a breaking API or behavioral change that requires a compensating application code fix before or after the patch is applied. The enrichment touchpoint is meaningful for middleware patch cycles (CICS, Db2, MQ) where application programs may be tightly coupled to subsystem behaviors that patches modify.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 6 — Validate

**What Atlas has produced at this point:**
Atlas has applied the patch batch to the test environment and run the automated test package. If a test failure is attributed to an application code dependency — for example, a CICS API behavior changed by a PTF that a COBOL program was relying on, or a Db2 SQL behavior change that causes a program's stored procedure to fail — Atlas identifies the specific program, call path, and the nature of the incompatibility.

**What Atlas directs the user to do in Bob PPZ:**
Atlas presents the failure attribution — the affected program, the subsystem behavior change, and the test scenario that failed — and directs the user to Bob PPZ to understand the code-level impact and implement the required fix. Bob PPZ uses ZUnderstand to trace the execution path through the affected program, identify the specific code construct that relied on the pre-patch behavior, and generate the precise modification required.

**What comes back to Atlas:**
A corrected code artifact. Atlas re-runs the relevant test scenarios against the patched environment with the corrected application code, confirms pass, and incorporates the code fix into the production promotion package.

---

### Step 7 — Decide (middleware patches)

**What Atlas has produced at this point:**
For middleware patches (CICS, Db2, MQ), Atlas has assembled the full evidence package: subsystem-specific test results, SME sign-offs, prerequisite resolution, and maintenance window. If any test results indicate application code changes are required before production apply, those items appear as open actions in the decision artifact.

**What Atlas directs the user to do in Bob PPZ:**
If application code fixes are required before the production promotion decision can be made, Atlas directs the responsible developer to Bob PPZ with the full context — the affected program(s), the subsystem behavioral change, and the Atlas test failure evidence. Bob PPZ provides the code-level implementation path to resolve each application code item. Resolved items are returned to Atlas before Quinn's production promotion authorization.

**What comes back to Atlas:**
Completed code change artifacts for each open application item. Atlas re-validates, marks items resolved, and presents the complete, clean evidence package for production promotion.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 2 — Analyze

**How Bob PPZ enriches this step:**
Atlas's impact analysis maps which subsystems, applications, and transactions are affected by a proposed patch batch. When Bob PPZ is installed, the application layer of this analysis is enriched with ZUnderstand's code-level metadata: precise program call relationships, data access patterns, and execution paths that cross the subsystem boundary. For a CICS PTF that changes EXEC CICS API behavior, the enriched analysis identifies not just which CICS regions are affected, but which COBOL programs use the specific API calls that the PTF modifies — scoping the application code risk to a specific list of programs rather than a broad application-level flag.

### Step 3 — Plan

**How Bob PPZ enriches this step:**
The Atlas-generated patch plan includes a test scenario list scoped to the affected applications. When Bob PPZ is present, the test scenario list is enriched with code-level test targets — specific transactions, program entry points, and data paths that exercise the exact code constructs affected by the patch. This produces a more precise test plan than topology-level scoping alone.

---

> **Overall Bob PPZ relevance for this use case:** Low-to-moderate. Bob PPZ enters when patches introduce breaking API or behavioral changes that require application code fixes. In routine PTF maintenance cycles with no application-affecting API changes, Atlas handles the full workflow. The enrichment touchpoints are most valuable for major middleware version patches (CICS TS, Db2 for z/OS) where subsystem API behavior changes are common.
