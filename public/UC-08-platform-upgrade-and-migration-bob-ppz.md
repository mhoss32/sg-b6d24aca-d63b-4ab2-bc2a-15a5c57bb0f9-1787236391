# UC-08: Platform Upgrade & Migration — Bob PPZ Touchpoints

> **Source use case:** UC-08 Platform Upgrade & Migration
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Platform upgrade and migration is primarily an infrastructure and sequencing workflow owned by Atlas. Bob PPZ enters at a specific and important point: when the compatibility assessment identifies application code changes that must be made *before* the upgrade can proceed safely. These are typically deprecated API remediations — COBOL programs using CICS, Db2, or IMS APIs that are being withdrawn or changed in the target version. The enrichment touchpoints significantly improve the precision of the compatibility assessment for large application estates. This is a moderate Bob PPZ use case, concentrated in the assess and execute phases.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 2 — Assess

**What Atlas has produced at this point:**
Atlas has produced a complete compatibility gap list — every LPAR, subsystem, and application with a known incompatibility with the target version. For application-level gaps (programs using deprecated APIs, JCL using removed features, batch jobs dependent on changed subsystem behaviors), Atlas identifies the affected program(s) and the compatibility issue. Atlas cannot plan or execute the code-level remediation.

**What Atlas directs the user to do in Bob PPZ:**
For each application-level compatibility gap, Atlas presents the finding with the affected program identified and directs application owners to Bob PPZ. In Bob PPZ, ZUnderstand:
- Analyses the program to locate the specific deprecated construct — the exact EXEC CICS command, SQL syntax, or JCL statement that will fail on the target version
- Identifies every other program in the estate that uses the same deprecated construct (batch remediation scope)
- Provides the safe migration path to the replacement API or syntax
- Generates an implementation plan for remediating the entire compatibility class at once

**What comes back to Atlas:**
A set of code change artifacts — the remediated programs — that Atlas validates in a compatibility test environment before the upgrade proceeds. Atlas tracks remediation completeness: the upgrade plan cannot proceed to execution until all application-level compatibility gaps are resolved.

---

### Step 5 — Execute Each Phase

**What Atlas has produced at this point:**
Atlas is orchestrating upgrade phase execution. If a phase involves application deployments alongside the platform upgrade (e.g., deploying updated application code that uses replacement APIs in parallel with the subsystem upgrade), the application code changes must be ready for deployment.

**What Atlas directs the user to do in Bob PPZ:**
Any phase-level application code changes that were identified in the assessment and planned by Bob PPZ are delivered back to Atlas as ready-to-deploy artifacts. If an unexpected application code issue surfaces during phase execution (a compatibility gap missed in the assessment), Atlas surfaces the finding and directs the developer to Bob PPZ for an accelerated fix — passing the phase context, the failed compatibility test, and the affected program.

**What comes back to Atlas:**
A code fix artifact. Atlas re-validates the phase with the fix applied before proceeding.

---

### Step 6 — Validate Each Phase

**What Atlas has produced at this point:**
Atlas has run application regression testing scoped to each phase's changes. If regression failures are attributed to application code issues — a program that behaved correctly before the upgrade but now fails due to a subtle subsystem behavior change — Atlas surfaces the failure with the affected program and transaction identified.

**What Atlas directs the user to do in Bob PPZ:**
Atlas directs the developer to Bob PPZ with the regression failure context: the specific program, the failing execution path, and the pre/post-upgrade behavior difference. Bob PPZ uses ZUnderstand to trace the code path and identify the specific construct that needs to change to work correctly with the new subsystem behavior.

**What comes back to Atlas:**
A corrected code artifact. Atlas re-runs the regression tests for the affected phase, confirms pass, and records the fix in the phase validation record.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 1 — Scope

**How Bob PPZ enriches this step:**
Atlas scopes compatibility impact across all LPARs, subsystems, and applications. When Bob PPZ is installed, the application-level scope is enriched with ZUnderstand's code-level inventory:
- Rather than identifying "Application X may be affected by the CICS TS upgrade," Bob PPZ enables Atlas to identify "47 programs in Application X use EXEC CICS commands being deprecated in CICS TS 6.2, with 12 of them in transaction-critical paths." This transforms the compatibility scope from a list of applications to a list of specific programs with prioritized risk.
- JCL compatibility gaps are identified at the specific JCL statement level, not just at the job level.

### Step 2 — Assess (enrichment layer)

**How Bob PPZ enriches this step:**
Beyond the explicit handoff for code remediation, Bob PPZ enriches the compatibility assessment by enabling Atlas to:
- **Classify remediation complexity:** Simple API substitution vs. structural code change required — enabling the upgrade planning team to estimate remediation effort before the upgrade begins.
- **Identify safe batching:** Programs with the same deprecated construct can be remediated together as a batch, rather than program-by-program. ZUnderstand's code-level inventory makes this batching visible.
- **Surface hidden dependencies:** A program that uses a deprecated API may be called by a program that does not — ZUnderstand's call graph ensures the full remediation scope is captured, not just the programs with the direct deprecated usage.

### Step 3 — Plan

**How Bob PPZ enriches this step:**
The Atlas-generated upgrade plan includes application remediation phases. When Bob PPZ is present, the plan includes code-level effort estimates for each application remediation task — derived from ZUnderstand's analysis of the scope and complexity of each deprecated API usage. This enables the upgrade planning team to resource remediation work accurately, which directly impacts the overall upgrade timeline.

---

> **Overall Bob PPZ relevance for this use case:** Moderate to high for application-heavy estates; low for infrastructure-only upgrades. The value of Bob PPZ in this use case scales directly with the number of applications using deprecated APIs in the target version. A z/OS version upgrade that introduces significant CICS or Db2 API changes is a high-Bob-PPZ-value scenario. A PTF-level maintenance upgrade with no application-facing API changes has no Bob PPZ touchpoint.
