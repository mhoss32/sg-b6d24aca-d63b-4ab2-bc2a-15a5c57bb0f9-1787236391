# UC-12: Application Modernization — Bob PPZ Touchpoints

> **Source use case:** UC-12 Application Modernization
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

This is the second highest Bob PPZ use case after UC-07. Application modernization is the workflow where ZUnderstand's deep code intelligence is most essential — and where the boundary between Atlas's topology-level analysis and Bob PPZ's code-level execution is most consequential. Atlas owns the modernization assessment, phase planning, environment provisioning, validation, and architectural conformance checking. Bob PPZ owns everything inside the code: understanding what the legacy code does, planning the precise change, executing the refactoring or transformation, and returning each phase artifact to Atlas for validation. Without Bob PPZ, modernization phases can be planned but not executed safely on complex COBOL estates.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 1 — Analyze → Step 3 — Execute Phase (Primary Handoff)

**What Atlas has produced at this point:**
Atlas has produced the complete application structure, technical debt profile, and dependency map — programs, deprecated APIs, monolithic structures, coupling scores, and ZUnderstand dynamic call chain analysis. The modernization plan (Step 2) has been generated, with phase boundaries defined based on coupling risk and blast radius quantification. The execution of Phase 1 begins.

**What Atlas directs the user to do in Bob PPZ:**
This is the core handoff — equivalent in structure to the UC-07 handoff but operating at a higher level of code complexity. Atlas passes to Bob PPZ:
- The full phase specification: which programs are in scope, what changes are required, what the dependency boundaries are
- The coupling analysis: which copybooks are shared, which programs must be updated together, what the safe decomposition sequence is
- The ZUnderstand dynamic call chain: which programs actually call which others at runtime — not just statically configured — preventing changes that appear safe from static analysis but fail at runtime
- The blast radius for this phase: what the phase can affect beyond its immediate scope
- The Atlas validation requirements: what Atlas will test to confirm the phase is complete and safe

In Bob PPZ, ZUnderstand provides the full code-level intelligence required to execute the phase safely:
- **Business rule extraction:** What the legacy code actually does — the embedded business logic that must be preserved through the modernization
- **Data flow analysis:** How data moves through the programs being changed, and what downstream programs depend on that data
- **Implementation planning:** The deterministic, accurate sequence of code changes that implements the phase without breaking dependent programs
- **Refactoring and transformation:** For phases that involve language modernization (COBOL restructuring, API replacement), Bob PPZ's transformation capabilities execute the changes with deterministic accuracy
- **Coding standards enforcement:** Changes are validated against architectural and coding standards before being returned to Atlas

**What comes back to Atlas:**
Phase-completed code artifacts — modified programs, updated copybooks, restructured JCL. Atlas receives the artifacts and proceeds to phase validation.

---

### Step 4 — Validate Phase (return handoff)

**What Atlas has produced at this point:**
Atlas has provisioned an isolated environment for the phase, deployed the code artifacts returned by Bob PPZ, and run the regression test suite scoped to the phase's impact. Test failures are attributed to specific coupling points.

**The return handoff:**
If test failures are attributed to coupling points that the phase change exposed — a program that depended on a behavior Bob PPZ's implementation changed, or a dynamic call chain that static analysis did not surface — Atlas returns the failure context to Bob PPZ. Bob PPZ uses ZUnderstand's dynamic call chain data to trace the failure path and identify the precise adjustment required. The developer iterates in Bob PPZ and returns the corrected artifact to Atlas for re-validation.

This round-trip loop (Atlas validates → Bob PPZ adjusts → Atlas re-validates) is the mechanism that makes phased modernization safe at each phase boundary, rather than accumulating technical risk across phases.

---

### Step 5 — Promote

**What Atlas has produced at this point:**
A validated phase artifact and a complete evidence package. Atlas orchestrates phase promotion to production, including any CICS definition updates, Db2 schema changes, or IMS setup required by the phase.

**Bob PPZ's role at promotion:**
Atlas's architectural conformance check (verifying the promoted code conforms to the intended architecture) is applied to the Bob PPZ-produced artifact. If the conformance check identifies a deviation — code that implements the right functionality but in a way that violates the architectural specification — Atlas returns the finding to Bob PPZ for a targeted adjustment before production apply.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 1 — Analyze (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas uses ZUnderstand application discovery (packaged in Atlas) to produce the topology layer of the modernization analysis — program relationships, dependency map, API usage inventory. When Bob PPZ is also installed, the analysis is enriched with ZUnderstand's full depth:

- **Business rule layer:** For each program in the modernization scope, Bob PPZ surfaces the embedded business logic — the rules that must be preserved through any structural change. Without this layer, modernization plans proceed without understanding *what the code means*, only *what the code calls*.
- **Data dictionary:** ZUnderstand's data dictionary maps the semantic meaning of data fields across the estate — identifying which fields carry regulated data, which are shared across programs, and which carry business-critical values. This enables modernization to preserve data semantics, not just data structure.
- **Precise execution paths:** For monolithic copybooks and shared programs, ZUnderstand identifies which fields are *actually used* by which programs at runtime — enabling safe decomposition that removes only genuinely unused coupling, rather than conservatively preserving all coupling "just in case."
- **Technical debt quantification:** Bob PPZ provides coupling scores, complexity metrics, and dead code identification that Atlas alone cannot produce from discovery metadata — enabling data-driven prioritization in the modernization plan.

### Step 2 — Plan (enrichment layer)

**How Bob PPZ enriches this step:**
The Atlas-generated modernization plan phases work by coupling risk and blast radius. When Bob PPZ is installed:
- Phase estimates include code-level effort assessments — the number of programs to change, the complexity of each change, and the estimated implementation time per phase
- Phase risk ratings are enriched with Bob PPZ's implementation risk assessment — not just "this phase has a large blast radius" (Atlas) but "this phase requires restructuring a monolithic copybook that 23 programs share, which is high implementation risk regardless of the blast radius" (Bob PPZ)
- The prioritized modernization sequence accounts for both topology dependencies (Atlas) and implementation complexity (Bob PPZ) — producing a plan that is both technically safe and practically achievable

### Step 4 — Validate Phase (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas's regression test suite for each phase is scoped from the topology impact analysis. When Bob PPZ is present, the test suite is enriched with code-level execution path coverage — the specific code paths within affected programs that exercise the changed constructs. This produces test coverage that is both system-scoped (Atlas) and code-precise (Bob PPZ), reducing the risk of phase validation passing while subtle code-level regressions remain undetected.

---

> **Overall Bob PPZ relevance for this use case:** Very high — the second highest of all 14 use cases. Application modernization is the workflow where the absence of Bob PPZ is most consequential: without ZUnderstand's code-level intelligence, complex COBOL refactoring and copybook decomposition cannot be executed safely. The positioning document's statement applies directly: *"Multi-year modernization projects become feasible for organizations that previously treated legacy code as untouchable"* — and Bob PPZ is the capability that makes the code layer tractable.
