# UC-05: Application Discovery & Dependency Analysis — Bob PPZ Touchpoints

> **Source use case:** UC-05 Application Discovery & Dependency Analysis
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

This is one of the highest-enrichment use cases for Bob PPZ. Application discovery and dependency analysis is where the Atlas topology model and ZUnderstand's application intelligence most directly overlap — and where the positioning boundary between the two products is most visible. Atlas owns the topology traversal and the cross-stack dependency picture. Bob PPZ enriches that picture with code-level depth that Atlas's ZUnderstand application discovery surface cannot provide alone. The explicit handoff occurs when the dependency analysis produces a finding that requires a code change to remediate, or when the dependency map is delivered to a developer who will now act on it.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 4 — Surface Risks

**What Atlas has produced at this point:**
During dependency traversal, Atlas has opportunistically surfaced risks: deprecated interfaces approaching end-of-support, PTF gaps on connected subsystems, security findings on connection paths. If a surfaced risk is a deprecated API *within application code* — for example, a COBOL program using a CICS API that is being withdrawn — Atlas identifies the program and the specific deprecated construct, but Atlas does not plan or execute the code change required to remediate it.

**What Atlas directs the user to do in Bob PPZ:**
Atlas presents the deprecated API finding with the affected program(s) and the Atlas-identified blast radius context. The user is directed to Bob PPZ to understand the specific code construct, the business logic that depends on it, and the safe migration path to the replacement API. Bob PPZ uses ZUnderstand to trace the data flow and execution path through the affected program, enabling the developer to understand not just *that* a change is needed but precisely *how* to implement it.

**What comes back to Atlas:**
Once the code change has been implemented and validated in Bob PPZ, the remediation can be initiated as an application change workflow (UC-07) through Atlas, which handles test environment provisioning, validation, and production promotion.

---

### Step 5 — Deliver

**What Atlas has produced at this point:**
A complete, structured dependency map delivered to the developer (Kathleen) who will now make a change based on the analysis. Atlas has scoped the blast radius and named every affected component. At this point the developer transitions from *understanding* the change scope to *executing* the change.

**What Atlas directs the user to do in Bob PPZ:**
Atlas presents the dependency map as a context handoff: "Here is what your change will affect. To implement the change, open Bob PPZ with this context." The full topology context — blast radius, dependency graph, affected programs, subsystem relationships — is passed to Bob PPZ so the developer begins code-level implementation with the complete system picture already loaded.

**What comes back to Atlas:**
The completed change artifact returns to Atlas for validation (following the UC-07 pattern). Atlas confirms the change respects the blast radius boundaries identified in the dependency analysis.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 2 — Traverse

**How Bob PPZ enriches this step:**
Atlas traverses the dependency graph using ZUnderstand application discovery (packaged in Atlas) — resolving static and dynamic program call relationships to support accurate blast radius analysis. When Bob PPZ is also installed, the traversal is enriched with ZUnderstand's full code-level depth:

- **Business rule context:** Bob PPZ surfaces what business logic is embedded in each program in the call chain — not just that Program A calls Program B, but what Program B's role is in the business service and what would break if that logic changed.
- **Data flow paths:** ZUnderstand's data flow analysis traces how data moves through the call chain — Atlas can map which Db2 tables are accessed, but Bob PPZ adds which specific columns, how the data is transformed, and where it flows downstream.
- **Precise execution paths:** For COBOL programs with conditional call chains (perform paragraphs, evaluate statements), Bob PPZ identifies which paths are actually executed under which conditions — relevant when a change affects only a specific execution branch.

This enrichment is passive — it improves the quality of the dependency map Atlas presents without requiring any user action.

### Step 3 — Map Dependencies

**How Bob PPZ enriches this step:**
The dependency map Atlas produces connects programs to subsystems, transactions, and data resources. When Bob PPZ is installed, each program node in the map carries richer metadata: the program's structural complexity, its coupling score (how many programs depend on it), and the business service attribution that ZUnderstand derives from code-level analysis. This richer node metadata improves the quality of risk ranking and prioritization decisions that Angie makes when using the dependency map for modernization planning.

### Step 4 — Surface Risks (enrichment layer)

**How Bob PPZ enriches this step:**
Beyond the explicit handoff for deprecated API remediations, Bob PPZ enriches the risk surfacing by providing code-level precision to risk descriptions. A deprecated API risk in Atlas names the affected program. With Bob PPZ, the risk description names the specific procedure, paragraph, or EXEC CICS statement that uses the deprecated construct — enabling a developer to navigate directly to the relevant code without a separate investigation.

---

> **Overall Bob PPZ relevance for this use case:** High — particularly the enrichment touchpoints. This use case sits at the boundary between topology (Atlas) and code intelligence (Bob PPZ), and the quality of the dependency map improves materially when Bob PPZ's ZUnderstand depth is available. The explicit handoff points connect this use case to UC-07 (Application Change Management) as the natural next step after discovery identifies something that must change.
