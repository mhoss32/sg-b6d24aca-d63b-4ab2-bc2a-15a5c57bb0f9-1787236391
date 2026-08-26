# UC-11: Capacity Planning & Performance Readiness — Bob PPZ Touchpoints

> **Source use case:** UC-11 Capacity Planning & Performance Readiness
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Capacity planning and performance readiness is primarily an infrastructure and configuration workflow owned by Atlas. Performance root cause analysis, capacity modelling, configuration sizing, and production apply are all Atlas-led. Bob PPZ enters at a specific and high-value point: when performance root cause analysis identifies an application code issue — inefficient COBOL SQL, excessive program calls, or a code-level logic path creating disproportionate CPU consumption — as the driver of the performance problem. The enrichment touchpoints improve the precision of performance attribution for application-originated capacity constraints.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 2 — Diagnose

**What Atlas has produced at this point:**
Atlas has identified the responsible subsystem component for a performance degradation — the CICS region, Db2 buffer pool, MQ queue, or infrastructure component that is the bottleneck. In some cases, Atlas attributes the root cause not to a subsystem configuration constraint but to application code behavior: a COBOL program with an inefficient SQL statement causing excessive Db2 I/O, a transaction with a pathological loop consuming disproportionate CPU, or a batch job making excessive CICS calls creating thread exhaustion.

**What Atlas directs the user to do in Bob PPZ:**
When Atlas attributes root cause to application code, it directs the developer to Bob PPZ with the full diagnostic context:
- The specific program and transaction identified as the performance source
- The Atlas performance data — CPU consumption, I/O profile, thread hold time, elapsed time
- The subsystem context — which CICS region, Db2 subsystem, or MQ queue manager the program runs against
- The performance threshold that is being breached

In Bob PPZ, ZUnderstand:
- Traces the execution path through the identified program to locate the specific code constructs driving the performance issue
- Identifies inefficient SQL (unnecessary full-table scans, missing index usage), excessive PERFORM calls, or logic that creates disproportionate resource consumption
- Provides the precise code-level remediation — the SQL rewrite, the logic restructuring, the CICS command replacement — that will address the root cause

**What comes back to Atlas:**
A code fix artifact. Atlas validates the fix in a performance test environment at simulated load (Step 4), confirms the performance constraint is resolved, and proceeds to production apply.

---

### Step 4 — Validate

**What Atlas has produced at this point:**
For code-level performance fixes identified in Step 2, Atlas provisions an isolated performance test environment at simulated production load and tests the configuration change or code fix. If the performance validation confirms the code fix is effective, it is incorporated into the production change plan.

**What Bob PPZ contributes:**
If performance validation reveals that the code fix resolved one constraint but introduced another (for example, an SQL rewrite that reduces I/O but increases CPU), Atlas returns the new performance profile to the developer in Bob PPZ for a second iteration. This is the round-trip performance tuning loop: Atlas measures, Bob PPZ adjusts, Atlas re-measures.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 2 — Diagnose (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas attributes performance root cause to the responsible component — the subsystem or application. When Bob PPZ is installed, the application-level attribution is enriched with code-level precision:
- Rather than "Application BATCHJOB01 is causing excessive Db2 I/O," the diagnosis becomes "Paragraph PROCESS-ACCOUNTS in BATCHJOB01 at line 840 executes a full-table scan on the ACCOUNTS table on every iteration of the outer loop — estimated 47,000 unnecessary I/Os per batch run."
- This code-level precision means the developer can navigate directly to the specific code construct rather than conducting a separate code investigation after receiving Atlas's application-level attribution.

### Step 3 — Size

**How Bob PPZ enriches this step:**
Atlas's capacity risk modelling identifies configuration constraints approaching peak thresholds. When Bob PPZ is installed, capacity analysis for application-driven constraints (CICS thread exhaustion caused by long-running transactions, Db2 buffer pool pressure caused by inefficient SQL in multiple programs) is enriched with a code-level root cause breakdown:
- Which specific programs contribute most to the constraint
- Whether the constraint is addressable through configuration changes (buffer pool sizing) or requires application code changes to resolve fundamentally
- The relative contribution of each application program to the overall constraint — enabling targeted remediation rather than broad capacity increases

This enrichment enables Atlas to present a capacity recommendation that distinguishes between "increase buffer pool size" (configuration fix) and "fix the SQL in ACCTVAL01 first, then right-size the buffer pool" (code fix + configuration fix) — a materially more efficient recommendation.

---

> **Overall Bob PPZ relevance for this use case:** Moderate, concentrated in root cause diagnosis for application-originated performance issues. The enrichment touchpoints add significant value when performance problems are code-driven — which is common in large COBOL batch estates. For infrastructure-capacity constraints (DASD, coupling facility, CPU allocation), Bob PPZ has no role.
