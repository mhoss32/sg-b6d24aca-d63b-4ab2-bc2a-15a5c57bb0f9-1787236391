# UC-05: Application Discovery and Dependency Analysis
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

On IBM Z, the most dangerous question is "what would be affected if I change this?" Because the honest answer — before Atlas — is often "we are not sure." Applications built and evolved over decades share infrastructure, datasets, and connection paths that no single tool maps. Atlas maintains a live topology graph of the entire environment and answers dependency questions in seconds that currently require days of manual investigation or the knowledge of people who may no longer be available. For architects making modernization decisions and engineers scoping change impact, that answer is the difference between a confident plan and a risky guess.

---

## 1. Overview

Application Discovery and Dependency Analysis gives developers, architects, and systems programmers a complete, accurate picture of any application and its dependencies — what it connects to, what depends on it, what would be affected by a change. This is not just useful for change planning; it is the prerequisite for safe change work on z/OS. The topology model that underpins this use case is the same model Atlas uses across all change-related use cases.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When I am about to make a change to an application, plan a modernization, or investigate a production issue, I want a complete picture of what that application connects to, what depends on it, and what would be affected — so I can scope my change correctly and not cause an incident I did not anticipate. |
| **Emotional** | Architects and developers want to feel confident in their change scope — not haunted by the possibility that something they did not know about will fail in production because of a dependency they missed. |
| **Social** | Teams need to demonstrate to change approval boards, architects, and management that changes were scoped with full dependency awareness — not just "we checked what we knew about." |

---

## 3. Customer Problem and Outcome

**Problem:** z/OS applications do not have self-describing dependency manifests. Understanding what an application depends on requires interrogating CSD exports for CICS, ZPARMs for Db2, channel definitions for MQ, and program call chains for application-level dependencies — all in different tools, all owned by different specialists. For legacy applications that have been in service for decades, the people who understand the full dependency picture are often no longer with the organization. No single tool joins these views.

**Current State (Without Atlas):** Dependency analysis is performed manually — a systems programmer contacts the Db2 DBA, the CICS specialist, the MQ team, and the application developer to piece together the picture. This process takes days, is incomplete (because each specialist only knows their subsystem), and is not reproducible. For blast radius analysis before a change, teams routinely underestimate impact because they are missing cross-subsystem dependencies.

**Desired Outcome:** Any authorized user can ask Atlas for a complete dependency map of any application or component and receive a full answer in seconds — including cross-subsystem lateral connections, upstream dependencies, downstream dependents, and shared resources. Blast radius analysis for a proposed change is available before the change plan is written.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Application Discovery is a core Atlas Base capability. It is often the first thing a new Atlas user experiences — "show me what I am running" — and it is the capability that makes every other use case possible. It is not a separate SKU driver; it is the capability that justifies the base subscription. |
| **Retention impact** | The topology model is the foundation of Atlas's institutional value. Every discovery pass enriches the model. Organizations that rely on the topology for change decisions, onboarding, and incident analysis are deeply embedded in Atlas — the topology is not portable to another tool. |
| **Competitive differentiation** | IBM Application Performance Analyzer, Broadcom SYSVIEW, and SMP/E each understand one layer. None of them maps the lateral connections between CICS, Db2, MQ, and z/OS Connect that are the source of the most dangerous production surprises. Atlas's three-layer topology model — and the graph traversal that makes blast radius analysis possible — is not replicated anywhere else. |
| **Portfolio attach** | This use case creates pull-through for ZUnderstand (for deep code-level call chain analysis beyond what Config-as-Code provides) and IBM Z Application Modernization (IBM Wazi). The topology Atlas produces is also the input to the IBM Watsonx Code Assistant for Z modernization use cases. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Angie — Application Architect | Initiates discovery for modernization planning, change scoping, and architecture documentation. Needs the full dependency picture across applications and shared infrastructure. |
| **Secondary** | Kathleen — z/OS Application Developer (experienced) | Uses dependency analysis to scope changes, identify regression testing targets, and understand the impact of code changes on downstream systems. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | Uses topology traversal to scope infrastructure and middleware changes — which applications would be affected by an LPAR restart, a subsystem reconfiguration, or a PTF apply. |
| **Secondary** | Greg — Infrastructure Architect | Uses the topology model to understand infrastructure-level dependency — which LPARs share coupling facilities, DASD volumes, or network paths. |

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary throughout.** The entire use case is System Intelligence — topology discovery, dependency mapping, blast radius traversal, and application inventory all operate from the topology graph. | GA Dec 2026 (Config-as-Code topology + static application layer); H1 2027 (ZUnderstand dynamic call chain) |
| **Change Intelligence** | **Not directly involved.** Discovery and dependency analysis does not execute changes. However, the output of this use case is the required input for all Change Intelligence workflows — the topology answer from a discovery session is what Change Intelligence uses to scope tests and plan execution. | N/A |
| **Predictive Intelligence** | **Supporting (risk identification during analysis).** When traversing a dependency graph, Atlas may identify deprecated interfaces, approaching upgrade deadlines, or configuration risk patterns. These are Predictive Intelligence observations that surface opportunistically during discovery sessions. | Partial at GA; full H2 2027 |

**Important note — ZUnderstand dependency:** The topology available at GA Dec 2026 is based on Config-as-Code (static topology — what is configured). Deep code-level call chain analysis — which programs call which other programs at runtime, dynamic dispatch relationships, batch job call sequences — requires ZUnderstand in TIB. This distinction is important when setting customer expectations for scope at GA vs. H1 2027.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Transaction Flow Walkthrough | **Current** | GA Dec 2026 (static); H1 2027 (deep) | Config-as-Code lateral connections at GA; ZUnderstand call chain analysis at H1 2027 | Partial at TechXchange (static path); Yes (GA) |
| Blast Radius Analysis | **Current (capability-gated)** | Aug 19 milestone (demo); GA Dec 2026 (production) | ZUnderstand in TIB for application-to-subsystem topology traversal | Yes (Aug 19) |
| Cross-Application Dependency Mapping | **Current** | GA Dec 2026 | Config-as-Code multi-application topology join | Yes (GA) |
| Application Inventory for a Business Domain | **Current** | GA Dec 2026 | Config-as-Code CSD group + naming convention discovery | Yes (GA) |

**Capability dependency notes:**

- **Blast Radius Analysis** is the most demo-critical scenario for this use case. It requires ZUnderstand in TIB (Aug 19 milestone) for the application-to-subsystem traversal that produces the full downstream reach. Without ZUnderstand, Atlas can show the middleware-level blast radius (which LPARs, which subsystems) but not the application-level blast radius (which specific programs, transactions, and data assets are reachable). This distinction maps directly to the July 15 vs. Aug 19 capability gates described in the demo scenarios document.
- **Transaction Flow Walkthrough** at TechXchange can show the static configured path (z/OS Connect → CICS → Db2) from Config-as-Code data. The ZUnderstand-powered dynamic call chain — which programs are actually invoked at runtime — is available at H1 2027. These are different depths of the same scenario, not different scenarios.

---

## 8. Scope and Boundaries

**In Scope:**
- Multi-layer topology traversal: infrastructure (LPAR, CEC, sysplex), middleware (CICS, Db2, MQ, IMS, z/OS Connect, RACF), and application (CICS transactions, IMS transactions, batch jobs, REST APIs, business services)
- Lateral connection discovery within the middleware layer: CICS→Db2, CICS→MQ, z/OS Connect→CICS, z/OS Connect→IMS, IMS TM→IMS DB, MQ→MQ (channels), Db2→Db2 (DDF)
- Blast radius traversal: given a starting component, enumerate all components reachable directly or transitively (requires ZUnderstand for application-layer traversal)
- Application inventory: enumerate all transactions, programs, APIs, and batch jobs associated with a business domain or CSD group
- Cross-application dependency mapping: identify shared infrastructure, shared datasets, and shared middleware connections between distinct business applications
- Transaction flow walkthrough: trace how a specific business transaction flows from entry point through middleware to data storage
- Shared resource identification: identify DASD volumes, coupling facility structures, Db2 tablespaces, or MQ queues shared across applications

**Out of Scope:**
- Active runtime dependency discovery via transaction tracing (APM territory — Instana, IBM Application Performance Analyzer)
- Deep code-level analysis without ZUnderstand — Atlas cannot determine dynamic dispatch or runtime call patterns from CaC data alone
- Non-IBM Z applications and infrastructure — topology is scoped to the IBM Z estate; distributed dependencies are represented as endpoints but not traversed

**Non-Goals:**
- Atlas does not maintain a manually-authored application catalog — the topology is derived from discovered configuration; it does not ingest hand-entered documentation
- Atlas does not replace architecture documentation tooling — the topology is a queryable model, not a documentation system

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | Config-as-Code discovery has been run for the target LPAR(s) — CICS CSD export, Db2 ZPARM extraction, MQ MQSC export, z/OS Connect SAR/AAR extraction, and IMS PROCLIB members are available in the Atlas topology |
| **Assumption** | Port-matching rules are configured in the Atlas topology builder to derive lateral connections (z/OS Connect → CICS via IPIC port matching) |
| **Dependency** | Config-as-Code (ZCONFIG / ZOSCONFIG / ZOSCONFIG-MQ / ZOSCONFIG-IMS) for all static topology layers |
| **Dependency** | IZSAM Lite for software version data per LPAR |
| **Dependency** | ZUnderstand (TIB integration) for dynamic call chain analysis and application-layer blast radius traversal (H1 2027) |
| **Dependency** | TIB (Aug 19 milestone) for multi-LPAR topology joins required for full cross-LPAR blast radius traversal |
| **Risk** | Topology coverage is limited by discovery completeness. An application with a connection to an undiscovered subsystem will have an incomplete blast radius. Atlas must surface discovery gaps explicitly during traversal. |
| **Risk** | Static topology (Config-as-Code) may not reflect runtime reality for applications with dynamic connection patterns. ZUnderstand reduces this gap but does not eliminate it for all dynamic dispatch patterns. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Transaction Flow Walkthrough | User asks Atlas to trace how a specific transaction or API call flows through the system | Current | Partial (TechXchange — static path); Yes (GA) | UX Flow, Chat Exchange, Screen designs | [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 6; [`architecture/Topology/topology.md`](../architecture/Topology/topology.md) |
| Blast Radius Analysis | User asks what would be affected by changing or disabling a specific component | Current (capability-gated) | Yes (Aug 19) | UX Flow, Chat Exchange, Screen designs | [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 4 |
| Cross-Application Dependency Mapping | User asks how multiple applications share infrastructure or data | Current | Yes (GA) | UX Flow, Chat Exchange | TBD |
| Application Inventory for a Business Domain | User asks for a complete list of applications, transactions, and APIs supporting a business function | Current | Yes (GA) | UX Flow, Chat Exchange | [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 2 |

**Design decisions for this scenario catalog:**

- Blast Radius Analysis is deliberately separated from Transaction Flow Walkthrough even though both use topology traversal. The difference is intent: a flow walkthrough is directional (trace this path forward); a blast radius analysis is reach-based (what is reachable from this node in any direction). They require different traversal modes and different output formats.
- The `topology.md` engineering document is referenced as a supporting artifact here, not a scenario. It describes how Atlas builds the graph, not what customers do with it. It is an internal reference for the build team, not customer-facing.

---

## 11. Lifecycle Overview

```
Identify → Traverse → Map Dependencies → Surface Risks → Deliver
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Identify** | User identifies the starting point — a transaction, an application, a subsystem, a business domain, or a specific change being planned | User |
| **Traverse** | Atlas traverses the topology graph from the starting point — laterally (to connected subsystems), vertically (to dependent applications), and cross-LPAR (to shared infrastructure) | Atlas |
| **Map Dependencies** | Atlas produces the dependency map — direct dependencies, transitive dependencies, shared resources, and the specific connection type for each relationship | Atlas |
| **Surface Risks** | Atlas proactively identifies risks observed during the traversal — deprecated interfaces, PTF gaps on connected components, security findings on the connection path | Atlas |
| **Deliver** | Atlas presents the dependency picture in a queryable format; user can drill into any node for detail, filter by layer, or export the map for change planning | Both |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Building and maintaining the topology graph | Atlas | Populated from Config-as-Code discovery; Atlas keeps it current between discovery cycles |
| Topology graph traversal and dependency resolution | Atlas | Automated; user does not write graph queries |
| Identifying the starting point and scope | User | User decides what application or component to analyze |
| Interpreting the dependency map for change planning | User | Atlas provides the map; the user decides what it means for their change |
| Acting on risks surfaced during analysis | User | Atlas surfaces them; the user decides whether to act |
| Requesting deeper ZUnderstand analysis for dynamic call chains | Shared | Atlas indicates when static topology is insufficient; user decides whether to invoke ZUnderstand |

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Multi-source topology join** | Atlas connects CICS CSD, Db2 ZPARMs, MQ channel definitions, z/OS Connect config, and IMS definitions into a single traversable graph | This join is what makes cross-subsystem dependency analysis possible — it does not exist in any single tool |
| **Natural language graph traversal** | User can ask "what would break if we took CICS offline?" without writing a graph query | Makes topology analysis accessible to developers and architects who are not z/OS systems programming specialists |
| **Port-matching lateral connection derivation** | Atlas derives the z/OS Connect → CICS relationship by matching IPIC port numbers across config files — a join that does not exist explicitly in either source | This is a topology insight that requires inference, not just data retrieval |
| **Proactive risk identification during traversal** | As Atlas traverses the graph, it identifies and surfaces risks (deprecated APIs, PTF gaps, unencrypted connections) that are co-located with the dependency | Converts a passive mapping exercise into an active risk awareness session |
| **Blast radius quantification** | Atlas enumerates all nodes reachable from a starting point and provides a count and severity weighting | This is the answer to "how dangerous is this change?" — expressed in applications, transactions, and data assets, not just subsystem names |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Time to complete dependency analysis | Time from change planning trigger to complete dependency map | 1–3 days (manual, multi-team) | Under 15 minutes |
| Blast radius completeness | Percentage of actual downstream impacts identified before a change | Estimated 50–70% (incomplete due to manual silo-based analysis) | 90%+ with full Config-as-Code discovery coverage |
| Change-caused incidents from undiscovered dependencies | Percentage of production incidents attributed to a dependency the change team did not know about | Estimated 15–25% of change-related incidents | Under 5% |
| Dependency map usage rate | Percentage of significant changes preceded by an Atlas dependency analysis | 0% today | 80%+ for changes in Atlas-active environments |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| A dependency exists but the connected component has not been discovered | Atlas explicitly marks the edge as "endpoint discovered but full topology unavailable" rather than showing a false-clean view | User identifies the undiscovered component and requests a discovery pass; Atlas re-traverses after discovery completes |
| Static topology does not reflect runtime reality (dynamic connections) | Atlas indicates that the traversal is based on configured topology and that dynamic call patterns may exist that are not captured | User requests ZUnderstand analysis for the specific component (H1 2027) to supplement the static picture |
| Multi-LPAR traversal is requested before TIB is available | Atlas traverses within a single LPAR but explicitly states that cross-LPAR topology is not yet available | User scopes the analysis to a single LPAR or waits for TIB integration |
| The blast radius traversal produces too many results to be actionable | Atlas groups results by severity, application, and tier; provides a prioritized summary before the full detail | User works from the prioritized summary; drills into specific areas of concern |
| Topology data is stale and does not reflect a recent configuration change | Atlas surfaces the data freshness timestamp; warns that the topology may not reflect changes made after the last discovery pass | User triggers a rediscovery pass for the affected component |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Dependency analysis as change prerequisite | Change advisory boards increasingly require documented evidence that blast radius was assessed before approval | Atlas dependency analysis output serves as the documented evidence; it can be exported and attached to a change record |
| Audit trail for topology access | In regulated environments, access to application topology and data flows may require audit logging | Atlas records all session activity; the topology query history is available for audit review |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-01: Vulnerability Remediation | Blast radius traversal from UC-05 is the core capability used in UC-01's "blast radius of this CVE" workflow. The same graph traversal produces both the dependency map for change planning and the impact assessment for vulnerability response. |
| UC-02: Patch Management | Before applying a PTF that touches CICS TS, UC-05's blast radius analysis identifies which applications and transactions would be affected. The change plan in UC-02 is scoped by the dependency map from UC-05. |
| UC-04: Staff Onboarding | New hire environment orientation (UC-04) uses the same topology that UC-05 exposes — the onboarding conversation is a user-directed tour of the topology. UC-05 is the deeper, change-scoping-focused version of the same capability. |
| UC-07: Application Change Management | UC-07 requires a dependency analysis before every change. UC-05 is the prerequisite step that UC-07 invokes before generating a test plan or change plan. They share the same topology source. |
| UC-08: Platform Upgrade and Migration | Before a z/OS or middleware version upgrade, UC-05's compatibility impact assessment identifies which applications use interfaces that are changing. UC-08 depends on UC-05 for its scope. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **Dynamic call chain analysis via ZUnderstand** | H1 2027 | ZUnderstand adds runtime-observed call chain data to the topology, enabling Atlas to traverse not just what is configured but what actually runs. This is the most significant capability extension for this use case. |
| **Business service-level dependency map** | H1 2027 | Atlas groups transactions, programs, and APIs into named business services (e.g., "Loan Origination," "Payment Processing") and presents the dependency picture at the business level — relevant for product managers and architects who need to understand impact in business terms, not technical component names. |
| **Continuous topology change alerting** | H2 2027 | Atlas monitors the topology for new dependencies that appear after a change and alerts when a connection is added or removed. This closes the gap between point-in-time analysis and continuous dependency awareness. |
| **Dependency map as input to Watsonx Code Assistant** | H2 2027 | The Atlas topology provides the application context that IBM Watsonx Code Assistant for Z uses to understand which programs to analyze and refactor. Atlas and Watsonx Code Assistant for Z share the topology graph. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-05](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`architecture/Topology/topology.md`](../architecture/Topology/topology.md) | Three-layer topology model; lateral connection definitions; cross-LPAR topology; visualization design; aggregation principle and example joins — the engineering reference that underpins this use case |
| [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 2 | "What Is My System Running?" — application inventory and topology traversal |
| [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 4 | Full blast radius traversal from UC-01 (shares the same capability); Aug 19 milestone |
| [`Atlas_Demo_Scenarios_v2.md`](../Atlas_Demo_Scenarios_v2.md) Scenario 6 | "Walk Me Through a CICS Transaction Flow" — transaction flow walkthrough scenario; Sept 16 milestone with ZUnderstand |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 0 "Config-as-Code topology"; Phase 1 "Application topology" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Angie, Kathleen, Zach, Greg |
