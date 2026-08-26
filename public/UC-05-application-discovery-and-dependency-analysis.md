# UC-05: Application Discovery & Dependency Analysis — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (primary throughout)
> **GA Status:** GA Dec 2026 (static Config-as-Code topology); H1 2027 (ZUnderstand dynamic call chain)

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Identify
**Brief:** User determines the starting point for analysis — a transaction, application, subsystem, or planned change that requires dependency scoping.

**Personas involved:** Angie, Kathleen, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Angie | Before planning a modernization project, Angie must first identify all components in scope — a process that requires consulting multiple specialists and reading outdated architecture documentation. | ⏱️ Lost Time — **1–3 weeks** just to establish the starting scope for a modernization analysis |
| Kathleen | Before coding, Kathleen must ask Zach and the Db2 DBA and the CICS team what the proposed change will touch — no self-service scoping tool exists. | 🔒 Skill Gap / Bottleneck — impact scoping requires coordinating 3+ specialist teams before any code is written |

---

### Step 2 — Traverse
**Brief:** Trace the dependency graph from the starting point — laterally to connected subsystems, vertically to dependent applications, cross-LPAR to shared infrastructure.

**Personas involved:** Zach, Angie, Kathleen

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Dependency analysis requires manually interrogating CSD exports for CICS, ZPARMs for Db2, channel definitions for MQ, and program call chains — all in different tools owned by different specialists. | ⏱️ Lost Time — **2–5 days** of multi-team investigation for a full cross-subsystem dependency picture |
| Angie | For legacy applications built and evolved over decades, the people who understand the full dependency picture are often no longer with the organization — the knowledge is simply gone. | 💼 Business Impact — architectural decisions are made on an incomplete or absent dependency map, increasing modernization risk |
| Kathleen | Each specialist only knows their own subsystem — no single person or tool joins CICS, Db2, MQ, and z/OS Connect dependencies in one view. | 💼 Business Impact — cross-subsystem dependencies routinely missed, leading to production surprises after changes |

---

### Step 3 — Map Dependencies
**Brief:** Produce a dependency map — direct dependencies, transitive dependencies, shared resources, and connection types.

**Personas involved:** Angie, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Angie | No reproducible dependency mapping — the analysis is done differently by different people, produces different results, and is not shareable as a structured artifact. | 💼 Business Impact — architecture decisions rest on a non-reproducible, non-auditable analysis |
| Zach | For infrastructure change scoping (which applications would be affected by an LPAR restart or subsystem reconfiguration), impact is estimated by experience — not by analysis. | 💼 Business Impact — incorrect scope estimate leads to unplanned application impacts during infrastructure changes |

---

### Step 4 — Surface Risks
**Brief:** Identify risks in the dependency graph — deprecated interfaces, PTF gaps on connected components, security findings on the connection path.

**Personas involved:** Angie, Zach, Kathleen

| Persona | Pain Point | Category |
|---|---|---|
| Angie | Risks in the dependency graph (deprecated API approaching end-of-support, missing PTF on a connected subsystem) are invisible during architecture planning. | 💼 Business Impact — modernization plans proceed without awareness of risk on the dependency path |
| Kathleen | No systematic way to identify which existing tests are affected by a change — regression test selection relies on the developer's knowledge of what they touched. | ⏱️ Lost Time — **hours per change** identifying regression test scope manually |

---

### Step 5 — Deliver
**Brief:** Present the dependency picture to stakeholders for change planning, architecture review, or governance.

**Personas involved:** Angie, Greg, Kathleen

| Persona | Pain Point | Category |
|---|---|---|
| Greg | Infrastructure-level dependency (which LPARs share coupling facilities, DASD volumes, or network paths) is not visible from any single tool — Greg must assemble it manually. | ⏱️ Lost Time — **days** to produce an infrastructure dependency picture for architecture review |
| Angie | Change approval boards require evidence that changes were scoped with full dependency awareness — but the current analysis produces no structured artifact. | 💼 Business Impact — changes proceed through governance without verifiable dependency scope documentation |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Identify
**Brief:** User identifies the starting point — Atlas confirms what topology data is available and surfaces any gaps in coverage upfront.

**Personas involved:** Angie, Kathleen, Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Before writing a line of code, Kathleen asks Atlas what her proposed change will touch — full answer in seconds, no multi-team coordination required. | 🆕 New User Capability — Kathleen independently scopes change impact without requiring Zach, the Db2 DBA, or the CICS team |
| Angie | Modernization planning starts from Atlas's live topology — scope is defined from data, not from a weeks-long expert interview process. | ⏱️ Time Saving — **1–3 weeks → minutes** to establish modernization scope from Atlas's topology model |

---

### Step 2 — Traverse
**Brief:** Atlas traverses the topology graph from the starting point — laterally to connected subsystems, vertically to dependent applications, cross-LPAR to shared infrastructure.

**Personas involved:** Angie, Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Atlas traverses CICS, Db2, MQ, z/OS Connect, and IMS in one query — returning the full cross-subsystem dependency picture that previously required coordinating every specialist. | ⏱️ Time Saving — **2–5 days → seconds** for cross-subsystem dependency traversal |
| Angie | Atlas knows the legacy application's dependency graph even when the original architects have left — the topology is captured from discovered configuration, not from human memory. | 💼 Business Impact — architectural decisions for legacy systems made from data, not from incomplete recollections |

---

### Step 3 — Map Dependencies
**Brief:** Atlas produces the dependency map — direct, transitive, shared resources, connection type for each relationship. Queryable format; user can drill into any node.

**Personas involved:** Angie, Zach, Greg

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Reproducible, structured dependency map produced by Atlas — the same starting point produces the same result, shareable as a governed artifact. | 🤖 Atlas AI Insight & Automation — topology graph traversal produces a consistent, auditable dependency map from a live model |
| Greg | Infrastructure-level dependency map — which LPARs share coupling facilities, DASD volumes, or network paths — available from Atlas in a single query. | ⏱️ Time Saving — **days → minutes** for infrastructure dependency picture for architecture review |
| Zach | Infrastructure change impact scope generated by Atlas — which applications would be affected by an LPAR restart or subsystem reconfiguration — determined by topology analysis, not experience. | 🆕 New User Capability — Zach can scope infrastructure changes confidently without relying solely on expert memory |

---

### Step 4 — Surface Risks
**Brief:** Atlas proactively identifies risks observed during the traversal — deprecated interfaces, PTF gaps on connected components, security findings on the connection path.

**Personas involved:** Angie, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Risks in the dependency graph surfaced during the traversal — deprecated API deadlines, PTF gaps on connected subsystems — visible during architecture planning, not discovered after a change. | 🤖 Atlas AI Insight & Automation — opportunistic risk surfacing during topology traversal; no separate investigation required |
| Kathleen | Regression testing scope identified automatically from the dependency map — Atlas names the test targets from the impacted components. | ⏱️ Time Saving — **hours of manual regression scoping → automatic** from the dependency map |

---

### Step 5 — Deliver
**Brief:** Atlas presents the dependency picture in a queryable, exportable format. User can drill into any node, filter by layer, or export for change planning.

**Personas involved:** Angie, Greg, Kathleen

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Structured dependency artifact exportable directly from Atlas — change approval boards receive evidence-based dependency scope documentation. | 🆕 New User Capability — Angie produces change governance artifacts directly from Atlas without separate authoring |
| Kathleen | Dependency map available at the point of code review — developer and reviewer both have the same topology picture during the change discussion. | ⏱️ Time Saving — dependency picture available immediately at every change discussion, not assembled beforehand |

---

> **Overall outcome:** The answer to "what would be affected if I change this?" shifts from a days-long multi-team investigation to a seconds-long Atlas query. Dependency analysis is reproducible, structured, and available to every authorized user — not just to the senior engineer who carries the map in their head.
