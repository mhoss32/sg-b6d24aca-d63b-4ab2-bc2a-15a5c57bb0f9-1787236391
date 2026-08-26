# UC-14: Change Governance & Traceability — Bob PPZ Touchpoints

> **Source use case:** UC-14 Change Governance & Traceability
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Change governance and traceability is primarily an Atlas-owned workflow. Atlas captures change records automatically for every Atlas-executed change, detects undocumented changes through Config-as-Code baseline comparison, provides queryable change history, and generates audit trail evidence. Bob PPZ's role is peripheral: it enters when an undocumented or investigated change is identified as an application code modification, and when the investigation requires code-level attribution to understand what was changed and why. The enrichment touchpoint adds code-level precision to the change attribution picture for application components. This is a low-intensity Bob PPZ use case.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 4 — Investigate (application code changes)

**What Atlas has produced at this point:**
Atlas has surfaced an undocumented change — a configuration delta identified through Config-as-Code baseline comparison — and provided the initial evidence: timestamp, affected component, user ID attribution, and configuration delta. The investigation is underway to determine whether this was an authorized emergency change, an unauthorized modification, or an error.

For changes to application program code, load modules, or JCL — changes that Atlas can detect through its Config-as-Code model but whose significance requires code-level interpretation — Atlas has identified that the change affects an application component. Understanding *what* the code change actually did (what logic was altered, what the before/after behavior difference is) requires code-level analysis.

**What Atlas directs the user to do in Bob PPZ:**
Atlas directs the investigator to Bob PPZ with the evidence it has assembled: the affected program, the change timestamp, and the file-level delta if available. In Bob PPZ, ZUnderstand:
- Analyses the current state of the program and, where version history is available, the pre-change state
- Identifies what logic changed — which paragraphs, which data handling, which control flow
- Surfaces whether the change represents a business-rule modification, a data flow change, or a structural refactor — providing the human investigator with the context to decide whether the change was authorized

**What comes back to Atlas:**
A code-level change characterization — what the code modification actually did — that Atlas incorporates into the investigation record and the retroactive change documentation workflow (Step 5). This characterization is the evidence the investigation needs to determine authorization and risk.

---

### Step 5 — Document (retroactive record for code changes)

**What Atlas has produced at this point:**
For undocumented application code changes that were actually authorized (emergency changes made directly in the development environment under time pressure), Atlas's structured retroactive documentation workflow generates a change record template pre-populated from the detected change data.

**Bob PPZ's contribution:**
For code changes, the retroactive record benefits from Bob PPZ's code-level characterization: what the program did before and after, what business logic was affected, and what the risk of the change was. Atlas generates the governance record; Bob PPZ contributes the application intelligence that makes the record defensible rather than superficial. This is especially valuable for audit purposes — a retroactive change record that includes a code-level summary of what changed is substantially more credible than a record that only notes "application code modified."

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 2 — Attribute (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas provides change attribution for all Atlas-executed changes automatically. For out-of-Atlas changes detected through Config-as-Code baseline comparison, Atlas provides the configuration delta, timestamp, and user ID. When Bob PPZ is installed, the attribution for application code changes is enriched with code-level context: the semantic meaning of the code change, its risk classification (business-rule change vs. cosmetic restructuring), and its relationship to other programs in the call chain. This enrichment is passive — it improves the quality of the attribution evidence without requiring user action.

### Step 3 — Surface (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas presents a queryable change history — "what changed on PROD1 in the last 30 days?" When Bob PPZ is installed, the application code entries in the change history carry richer descriptions: not just "ACCTVAL01 modified" but "ACCTVAL01 — account validation logic changed: fee calculation paragraph restructured." This enriched change history is more useful for post-mortem investigations and audit evidence because it characterizes *what* changed at a business-logic level, not just *that* a change occurred.

---

> **Overall Bob PPZ relevance for this use case:** Low. Change governance is fundamentally an Atlas-owned discipline — the automatic change record generation, undocumented change detection, and queryable change history capabilities are Atlas capabilities that function regardless of whether Bob PPZ is present. Bob PPZ adds value in the narrow scenario where an investigated undocumented change is an application code modification that requires code-level characterization to understand. The enrichment touchpoints improve change history quality for application components without changing the governance workflow.
