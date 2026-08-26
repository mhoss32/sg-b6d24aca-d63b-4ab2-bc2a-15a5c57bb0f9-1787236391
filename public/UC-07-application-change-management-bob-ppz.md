# UC-07: Application Change Management — Bob PPZ Touchpoints

> **Source use case:** UC-07 Application Change Management
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

This is the primary Bob PPZ use case — the workflow where Atlas and Bob PPZ integrate most deeply and where the combined experience is most differentiated from either product alone. Every step in the To-Be flow involves either an explicit Bob PPZ handoff or a material enrichment. Atlas owns the system-level framing: impact assessment, environment provisioning, test orchestration, validation, and production promotion. Bob PPZ owns the code-level execution layer: understanding what the code does, planning the precise change, implementing it accurately, and returning the artifact to Atlas for validation.

The positioning document's combined workflow scenario (Section 7) maps directly to this use case.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 1 — Assess Impact → Step 3 — Code (Primary Handoff)

**What Atlas has produced at this point:**
Atlas has produced a complete blast radius assessment for the proposed change: every CICS region, Db2 table, MQ queue, z/OS Connect endpoint, and downstream business service that the change will affect. The developer now needs to write or modify the application code that implements the change.

**What Atlas directs the user to do in Bob PPZ:**
This is the core handoff. Atlas passes the full environment context to Bob PPZ:
- The blast radius report — all affected programs, transactions, and data resources
- The dependency graph — which programs call the program being changed, which shared resources are at risk
- The specific programs in scope for modification
- The validation requirements Atlas will use to confirm the change before production promotion

In Bob PPZ, the developer opens the affected program(s) with full ZUnderstand application intelligence:
- What the program actually does — not what it was intended to do, but what the code executes
- What business rules and data semantics are embedded in the relevant code sections
- Which variables carry the relevant data, how they are transformed, and where the data flows
- What the safe modification path looks like — the precise implementation plan for the change

**What comes back to Atlas:**
The completed code change artifact — modified source, updated copybooks, revised JCL if applicable. Atlas receives the artifact and proceeds to validation.

---

### Step 4 — Generate Test Plan (partial handoff)

**What Atlas has produced at this point:**
Atlas has generated a topology-scoped test plan from the impact analysis — test scenarios targeting the transactions, API paths, and downstream applications affected by the change. This test plan is Atlas's primary output for validation scoping.

**What Bob PPZ contributes:**
For the scenarios Atlas has identified, Bob PPZ can enrich the test plan with code-level test targets: the specific procedure calls, EXEC CICS commands, or SQL statements that exercise the changed code constructs. A developer using Bob PPZ alongside Atlas sees not just "test transaction OTRFN" but "test the path through ACCTVAL01 that executes the account validation paragraph at line 420." This code-level precision means test coverage is anchored to the specific change, not just to the application.

---

### Step 5 — Validate (return handoff)

**What Atlas has produced at this point:**
An isolated, production-representative test environment with the code change deployed. Atlas runs the test package and produces pass/fail results with failure attribution.

**The return handoff:**
If test failures are attributed to specific code dependencies — the change interacted with a dependency that Bob PPZ's impact analysis did not surface, or the implementation introduced a logic error — Atlas returns the failure context to the developer in Bob PPZ. The developer iterates: modifies the code in Bob PPZ, returns the updated artifact to Atlas, Atlas re-runs the relevant tests. This is the round-trip validation loop described in the positioning document (Section 6.2) as a premium experience unique to the Atlas + Bob PPZ integration.

**What comes back to Atlas:**
A passing code artifact with complete test evidence. Atlas produces the pre-production evidence package for the promotion decision.

---

### Step 6 — Deploy

**What Atlas has produced at this point:**
A validated code change artifact and a complete evidence package (test results, blast radius confirmation, impact assessment). Atlas orchestrates the deployment — handling CICS definition updates, Db2 schema changes, IMS setup, and any configuration changes the code change requires. Zach authorizes infrastructure steps.

**Bob PPZ's role at this step:**
Bob PPZ has already delivered the change artifact. The deployment is Atlas-orchestrated. However, if deployment reveals an infrastructure configuration requirement not anticipated in the plan (e.g., a new CICS resource definition required by the code change), Atlas may direct back to Bob PPZ for a targeted code adjustment before the deployment proceeds.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 1 — Assess Impact (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas's blast radius assessment maps which programs, transactions, and data resources are affected. When Bob PPZ is installed, the application layer of this assessment is enriched with ZUnderstand's code-level metadata:
- **Precise execution paths:** Which code paths through the affected program are actually invoked, and under what conditions — so the blast radius is not just a list of callers but a list of *active* callers that exercise the specific changed code.
- **Business rule attribution:** Which business rules are embedded in the affected program, enabling Quinn and Angie to understand the business impact alongside the technical impact.
- **Coupling score:** ZUnderstand's coupling analysis quantifies how many programs depend on the program being changed, surfacing high-risk changes before a line of code is written.

### Step 3 — Code (enrichment layer beyond the handoff)

**How Bob PPZ enriches the coding step beyond the core handoff:**
When both Atlas and Bob PPZ are installed, the developer's Bob PPZ session is enriched with Atlas's infrastructure context. This round-trip enrichment means Bob PPZ is not just analyzing the COBOL code in isolation — it can surface topology-level context within the coding session: "This program runs in CICS region CICSPROD1, which is at 78% thread utilisation. A change that increases transaction CPU time risks breaching the MXT threshold." This infrastructure-aware coding context is only possible when Bob PPZ is paired with Atlas.

### Step 4 — Generate Test Plan (enrichment layer)

**How Bob PPZ enriches this step:**
Test plans generated by Atlas are scoped to topology-identified test targets. When Bob PPZ is present, the test scenarios include code-level execution path coverage: Atlas identifies which transactions to test; Bob PPZ identifies which code paths within those transactions exercise the specific changed constructs. The result is a test plan that is both system-scoped (Atlas) and code-precise (Bob PPZ).

---

> **Overall Bob PPZ relevance for this use case:** Very high — the highest of all 14 use cases. This is the primary scenario where Atlas and Bob PPZ integrate as a continuous workflow. The combined experience (Atlas → Bob PPZ → Atlas) is meaningfully better than Atlas alone: without Bob PPZ, developers execute changes with topology context but without code-level intelligence. The positioning document's one-sentence summary applies directly: *Atlas tells you what will break. Bob PPZ tells you how to fix it safely.*
