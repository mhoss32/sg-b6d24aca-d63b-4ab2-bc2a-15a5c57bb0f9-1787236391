# UC-04: Staff Onboarding — Bob PPZ Touchpoints

> **Source use case:** UC-04 Staff Onboarding
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Staff onboarding is primarily an Atlas-led orientation workflow. Atlas provides the environment topology, risk landscape, and first-change guidance that replaces the senior engineer shadow period. Bob PPZ enters at two points: as an enrichment to the exploration phase (enabling deeper application understanding beyond what topology alone provides) and as the execution layer when the new team member's first production change involves application code. The enrichment touchpoint is particularly valuable for developers onboarding to application teams — less so for infrastructure engineers whose work sits at the OS and middleware layer.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 5 — Execute First Change

**What Atlas has produced at this point:**
Atlas has provided Chris or Alice with the full environment context for their first production change: a topology-grounded impact assessment, a step-by-step execution plan, and change guardrails. If the first change involves modifying application code — a COBOL program, a JCL job, a batch procedure — Atlas has scoped the blast radius and identified which programs are affected, but Atlas does not provide code-level guidance on *how* to safely implement the change inside the application.

**What Atlas directs the user to do in Bob PPZ:**
For the application code execution step, Atlas directs the new team member to Bob PPZ with the full context it has assembled: the affected programs, the blast radius, the dependency graph, and the validation requirements Atlas will use to confirm the change before promotion. In Bob PPZ, the new team member uses ZUnderstand to understand what the affected program actually does, what the business logic means, and what the safe modification path looks like — without needing to rely on a senior engineer to interpret the code.

**What comes back to Atlas:**
The completed code change artifact. Atlas validates it in the provisioned test environment, confirms the blast radius is respected, and generates the change evidence package.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 2 — Explore

**How Bob PPZ enriches this step:**
Atlas answers environmental questions in natural language: topology, subsystem relationships, change history, risk profile. For new team members on application teams, the exploration naturally extends to questions about specific programs: "What does ACCTVAL01 do?", "What business logic is in this batch job?", "Why is this copybook shared across 14 programs?"

Atlas can answer these questions at the topology level — program relationships, which transactions call which programs, which data resources are accessed. When Bob PPZ is installed, the exploration goes deeper: ZUnderstand's application intelligence surfaces business rule explanations, data dictionary context, and semantic analysis of what the code actually does. A new developer who can ask Atlas what a program touches *and* ask Bob PPZ what that program *means* reaches genuine application understanding in days rather than weeks.

### Step 3 — Assess Risk

**How Bob PPZ enriches this step:**
Atlas proactively surfaces open risks in the new hire's area of ownership. For application-facing risks (deprecated API in a program they will own, tightly coupled code with high blast radius, undocumented business rules), the risk description is topology-level. When Bob PPZ is installed, the risk assessment for application components is enriched with code-level context: the specific lines of code that use a deprecated API, the data flow that creates coupling risk, the business rules that would need to be understood before a change is safe. This makes the risk briefing actionable rather than informational.

---

> **Overall Bob PPZ relevance for this use case:** Moderate for developer personas (Chris/Deb/Kathleen); low for infrastructure and operations personas (Zach/Greg/Annette). The enrichment touchpoint is where Bob PPZ adds the most sustained value — new developers on application teams benefit from the deeper code-level context Bob PPZ provides throughout the onboarding period, not just at the first-change step.
