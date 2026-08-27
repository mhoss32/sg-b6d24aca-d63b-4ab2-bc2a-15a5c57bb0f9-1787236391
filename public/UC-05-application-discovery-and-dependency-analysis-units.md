# UC-05: Application Discovery and Dependency Analysis — Atlas Units Estimation

> **Pillar:** System Intelligence (primary)
> **GA Status:** GA Dec 2026
> **Source spec:** [`UC-05-application-discovery-and-dependency-analysis-spec.md`](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/use-cases/UC-05-application-discovery-and-dependency-analysis-spec.md)
> **Unit model:** [`Atlas Action Catalog.pdf`](../Atlas%20Action%20Catalog.pdf)

---

## Atlas Units Reference

| Category | Conversion |
|---|---|
| Intelligence Generation | 100,000 tokens = 1 unit |
| Environment Automation | 10 successful provisions = 1 unit |
| Free (footprint) | Discovery, topology nav, chat, inventory lookup, config collection |

**Key artifact rates:**

| Artifact | Tokens | Units |
|---|---|---|
| System assessment | 250,000 | 2.5 |
| Evidence package | 400,000 | 4.0 |
| Environment comparison | 300,000 | 3.0 |

---

## Desired Outcome Flow — Atlas Units per Step

UC-05 is the foundational use case for System Intelligence — it is the "understand what we have" capability that underpins almost every other use case. The topology model Atlas builds here is consumed by UC-01 (blast radius), UC-06 (health assessment), UC-07 (change impact), UC-08 (upgrade compatibility), UC-09 (drift), and UC-10 (DR validation).

The key metering question for this use case is: **when does topology navigation become a generated artifact?** Discovery and navigation are footprint; a structured analysis or report derived from that topology is an artifact.

Lifecycle: `Trigger → Discover → Build Dependency Map → Analyze Impact → Generate Report → Ongoing Refresh`

---

### Step 1 — Trigger

**What Atlas does:** User (Angie, Zach, Kathleen) asks Atlas to discover what's in the environment — either a broad "what do we have?" question, or a focused "what depends on this specific component?" query.

**Unit type:** Footprint (chat, initial query interpretation)

**Step 1 subtotal: 0 units**

---

### Step 2 — Discover

**What Atlas does:** Atlas collects the inventory of running applications, subsystems, transactions, APIs, datasets, and their interconnections. Sources: IZSAM, Config-as-Code, ZUnderstand, and any connected LPAR topology feeds. The raw discovery collection is footprint.

**Unit type:** Footprint — discovery, topology ingestion, and inventory collection are explicitly listed in the Action Catalog as included in the footprint.

**Step 2 subtotal: 0 units**

---

### Step 3 — Build Dependency Map

**What Atlas does:** From the discovered inventory, Atlas constructs the dependency graph — which applications call which subsystems, which transactions access which datasets, which external APIs are served by which CICS programs, which shared subsystems (Db2, MQ) are dependencies for multiple applications. This is topology navigation + structure, not yet a generated artifact.

**Unit type:** If the dependency map is interactive/navigational (user explores it), it is footprint. If Atlas **generates a structured dependency analysis document** (with named dependencies, risk categorization, and recommendations), that is a system assessment.

| Activity | Tokens | Units |
|---|---|---|
| Dependency map navigation (interactive, footprint) | Footprint | 0 |
| Structured dependency analysis document (generated artifact) | 250,000 | **2.5** |

**Step 3 subtotal: 0 units (navigation) / 2.5 units (if structured analysis generated)**

---

### Step 4 — Analyze Impact

**What Atlas does:** For a specific component or change in scope, Atlas traverses the dependency graph to determine impact — what would break or be affected if this component changed, was removed, or failed. This is the blast radius / impact analysis artifact.

**Unit type:** Impact analysis is a **system assessment** — Atlas reasons over the topology, identifies all reachable systems and dependencies, categorizes the risk, and produces a structured output.

| Activity | Tokens | Units |
|---|---|---|
| Application impact analysis (change impact / blast radius) | 250,000 | **2.5** |

**Step 4 subtotal: 2.5 units**

---

### Step 5 — Generate Report

**What Atlas does:** Produces a structured discovery and dependency report — the complete, shareable artifact for architects (Angie) or project teams planning a change project. Contains: full application inventory, dependency graph summary, key shared dependencies, risk hotspots, and recommendations.

**Unit type:** This is a distinct **system assessment** artifact — the report synthesizes the full discovery + analysis into a structured document that is persistent and shareable.

| Activity | Tokens | Units |
|---|---|---|
| Application discovery and dependency report | 250,000 | **2.5** |

**Step 5 subtotal: 2.5 units**

> **Rationale:** If the impact analysis (Step 4) and the final report (Step 5) are generated in a single Atlas workflow, they collapse to one system assessment (2.5 units total). If they are separate invocations (e.g., impact analysis for a specific component + broader report for an architectural review), they are 2 × 2.5 = 5.0 units.

---

### Step 6 — Ongoing Topology Refresh

**What Atlas does:** As the environment changes, Atlas updates the topology model. The raw update (new discovery scan) is footprint. If Atlas generates a **change notification summary** (structured artifact describing what changed in the topology since the last review), that is metered.

| Activity | Tokens | Units |
|---|---|---|
| Discovery scan refresh (footprint) | Footprint | 0 |
| Topology change summary document (conditional, if generated) | ~100,000 | **1.0** (conditional) |

**Step 6 subtotal: 0 units (nominal)**

---

## Full Flow Summary

| Step | Activity | Units |
|---|---|---|
| 1 — Trigger | Query initiation (footprint) | 0 |
| 2 — Discover | Inventory collection (footprint) | 0 |
| 3 — Map | Dependency map (navigation = 0; structured analysis = 2.5) | 0–2.5 |
| 4 — Analyze Impact | Application impact analysis | 2.5 |
| 5 — Report | Application discovery and dependency report | 2.5 |
| 6 — Refresh | Topology refresh (footprint; change summary = 1.0 conditional) | 0–1.0 |
| **TOTAL** | **Nominal (impact analysis + report, no structural analysis)** | **5.0 units** |
| **TOTAL** | **Full (all three assessment artifacts)** | **7.5 units** |

---

## Sensitivity Analysis

### Estate Size

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Small estate (single component impact query) | Navigation only or one focused assessment | 0–0.5× |
| Standard (change project scope, 5–10 apps) | Impact analysis + dependency report (baseline) | 1.0× |
| Comprehensive architectural discovery (full estate, 20+ apps) | Three assessments (deep analysis) | ~1.5× |

### Additional Adjustments

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Structured dependency analysis added (Step 3) | Third assessment artifact added to the flow | +2.5 |
| Monthly topology health summary report | One additional system assessment per month | +2.5 per month |
| Topology change summary on each refresh | Small change summary artifact per refresh cycle | +1.0 per refresh |

---

## What is NOT Metered

- Interactive topology navigation ("show me what depends on DB2PROD01")
- Inventory queries and IZSAM lookups
- Chat-based dependency questions that don't produce a generated document
- ZUnderstand data collection
- Test execution

---

## Notes and Assumptions

1. UC-05 is **Atlas's highest footprint-value use case** — the vast majority of its value comes from footprint-tier interactions (conversational topology exploration), not from metered artifacts. The billable moments are the structured outputs that project teams need to share and reference.
2. **The topology model is the foundation** for most other use cases. Discovery and topology maintenance are footprint because they are the baseline capability of the Atlas platform — consuming them does not trigger metering. Generating a structured artifact from that topology does.
3. The **dependency report** (Step 5) is closely related to the **system assessment** in UC-01 (blast radius) and UC-06 (health assessment). If Atlas is asked to produce all three in sequence for the same environment, the combined artifact budget may be consolidated.
