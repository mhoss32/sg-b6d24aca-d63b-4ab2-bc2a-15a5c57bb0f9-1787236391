# Atlas GA Scope Analysis — System Intelligence and Change Intelligence
*Owner: Product Management | Source analysis completed: August 2026*

---

## 1. Executive Summary

Atlas reaches GA on December 11, 2026 with two distinct capability tiers. System Intelligence is full GA: Atlas can discover, model, and explain a customer's IBM Z environment — topology, installed software, PTF inventory, dependency relationships, and cross-middleware health findings — through natural language conversation and structured artifact generation. This is production-ready, grounded in real discovered data from the Bank of Z environment, and supported by a complete set of demo scenarios.

Change Intelligence ships as an MVP called Lean PTF Orchestration. Atlas can assess the impact of a PTF batch, generate a sequenced test plan, and surface function test results — but the test environment is provisioned by the customer using a DIY provisioning engine, not by Atlas. Atlas does not automatically provision the environment at GA. Testing at GA is limited to function tests; integration and regression testing arrive in H1 2027.

The strongest defensible GA claim is: **Atlas understands the change, recommends how to validate it, coordinates a customer-operated validation process, and produces evidence supporting a go/no-go decision.** Atlas cannot credibly claim at GA that it validates an IBM Z change end-to-end without customer-operated provisioning steps.

---

## 2. Recommended GA Promise

**One-sentence executive definition:**
Atlas gives IBM Z teams instant, AI-generated understanding of what a PTF change will affect, how to test it safely, and what evidence the change produced — through a guided workflow that bridges Atlas intelligence with customer-operated test environment provisioning.

**One-sentence customer outcome:**
Systems programmers complete PTF impact analysis and function testing in hours instead of days, with a full audit trail and no manual assembly of change evidence.

**Step-by-step user journey (GA):**

| Step | Actor | What Happens |
|---|---|---|
| 1 | Atlas (proactive) | Surfaces missing PTFs by joining IZSAM Lite inventory against current RSU from ibm.com; flags FIXCAT security gaps |
| 2 | Zach (user) | Opens a chat session; asks Atlas to assess the impact of the upcoming PTF batch |
| 3 | Atlas | Traverses the topology graph; identifies affected subsystems, applications, prerequisite chains, estimated downtime |
| 4 | Atlas | Generates a sequenced PTF plan: acquisition steps, dependency order, test environment specification, test scenario list |
| 5 | Zach (user) | Reviews, annotates, and approves the plan |
| 6 | Zach (user) | Operates the DIY L2 virtual LPAR provisioning engine to create a test environment matching the Atlas specification |
| 7 | Atlas | Applies the PTFs to the test environment in sequence; runs the function test package |
| 8 | Atlas | Surfaces pass/fail results; identifies failures; generates CSD updates or configuration fixes where needed |
| 9 | Zach (user) | Reviews results; approves production promotion |
| 10 | Atlas | Orchestrates the production apply with step-by-step progress visibility; requests authorization per LPAR |
| 11 | Atlas | Generates the complete change record and audit artifact; pushes to ServiceNow if integrated |

**Start state:** Customer environment is discovered and the Atlas topology model is current. IZSAM Lite is connected. Customer has the DIY provisioning engine configured.

**End state:** PTFs applied to production with a complete, auditor-ready change record including impact analysis, test plan, function test results, and production apply log.

**Required external dependencies:**
- IZSAM Lite (PTF inventory)
- ibm.com PTF skill (RSU currency and FIXCAT data)
- Customer-operated DIY L2 virtual LPAR provisioning engine
- SMP/E (actual PTF installation mechanism — Atlas generates JCL but does not replace SMP/E)
- ServiceNow (optional, for change record push)

**Explicit GA exclusions:**
- Atlas-native automated LPAR provisioning (H1 2027)
- Integration and regression testing (H1 2027)
- Middleware software patches — CICS, Db2, MQ, IMS (H1 2027)
- Security PTF fast-track via zSecure Portal (conditional on integration; H1 2027 fallback)
- Application code change management (H1 2027)
- Config drift detection and post-apply monitoring (H2 2027)
- ServiceNow bi-directional integration (H2 2027)

---

## 3. GA Customer Journey

```
Detect → Analyze → Plan → [Customer: Provision] → Validate → Decide → Execute → Govern
```

The critical break in automation is between Plan and Validate. Atlas hands off a test environment specification to the customer; the customer operates the provisioning engine; Atlas resumes when the environment is available for test execution. This handoff is the primary GA limitation. It is documented, expected, and positioned as the upsell driver toward the Atlas Provision SKU in H1 2027.

---

## 4. System Intelligence GA Scope

**Status: Full GA — Confirmed**

| Capability | GA Status | Evidence |
|---|---|---|
| z/OS environment discovery (OS, MW, SW, App) | GA | roadmap.md Phase 0 and Phase 1; Bank of Z discovery run 2026-07-03 |
| Config-as-Code topology (YAML-structured configuration database) | GA | Demo Scenarios 1–3 grounded against real discovery output |
| PTF inventory and RSU currency gap analysis | GA | IZSAM Lite + ibm.com skill; Demo Scenario 1 conversation script |
| FIXCAT and HIPER PTF classification | GA | Demo Scenario 1 Turn 1; atlas-glossary.md entries for FIXCAT and HIPER |
| Cross-middleware dependency mapping (CICS→Db2, z/OS Connect→CICS) | GA | Topology.md lateral connection model; Demo Scenario 3 Finding 1 and Finding 2 |
| Natural language Q&A across topology (WXA4Z v2 / FINN) | GA (Aug 19 milestone) | roadmap.md Phase 1 capabilities; Demo Scenarios 4–5 require TIB (Aug 19) |
| Staff Onboarding artifact generation | GA | roadmap.md Phase 1; Demo Scenario 2 |
| Health Check artifact generation | GA | roadmap.md Phase 1; Demo Scenario 3 |
| Audit and Compliance artifact generation | GA | roadmap.md Phase 1; atlas-use-case-library.md UC-03 |
| Regulatory Change Response mapping | GA | roadmap.md Phase 1; atlas-use-case-library.md UC-13 |
| Blast radius analysis | GA (requires TIB, Aug 19+) | Demo Scenario 4; requires ZUnderstand in TIB |
| Cross-environment comparison / drift surface | GA (requires TIB, Aug 19+) | Demo Scenario 5; requires ZUnderstand + CaC DB in TIB |
| Transaction flow analysis | GA (requires Sept 16 agentic stack) | Demo Scenario 6; requires OMEGAMON + ZDLA + ZUnderstand in TIB |
| PTF impact analysis skill | GA | roadmap.md Phase 1 WXA4Z skills list |
| Software inventory and version reporting | GA | IZSAM Lite integration; Demo Scenario 2 Turn 1 |

**System Intelligence GA is well-evidenced and complete.** The Bank of Z discovered environment (real data, 2026-07-03) provides the grounding for every GA demo scenario. The capability model is coherent: discover → store in CaC DB → build topology graph → serve via TIB → answer via agentic chat.

> **Sysplex discovery vs. provisioning note:** Atlas discovers and models sysplex environments at GA — the topology graph accurately represents sysplex topology including Coupling Facility relationships and cross-LPAR dependencies. However, sysplex provisioning (creating test environments that replicate sysplex topology) is NOT GA. Change Intelligence testing at GA is restricted to monoplex virtual LPAR environments. Sysplex-to-monoplex transformation is explicitly out of scope. See Section 11 (GA Exclusions) and the Glossary entries for Monoplex and Sysplex.

---

## 5. Change Intelligence GA Scope

**Status: MVP only — Lean PTF Orchestration**

This is the area requiring the most careful positioning. The source material distinguishes clearly between the full Change Intelligence vision (H1 2027 and beyond) and what ships at GA.

| Capability | GA Status | Evidence |
|---|---|---|
| PTF impact analysis (AI-assisted, topology-aware) | GA — **scoped to what topology and application-mapping data can support**; depth of impact analysis is bounded by the completeness of the topology model at time of analysis | UC-02-patch-management-spec.md §11 Analyze phase; roadmap.md Phase 1 |
| Prerequisite chain resolution | **GA target — UNVALIDATED; in progress** (team targets GA or GA+1 depending on capacity; not yet demonstrated against cross-product fix-chain scenario) | UC-02-patch-management-spec.md §13 AI Differentiation — **see risk flag in §14** |
| AI-generated test plan (function test scope) | GA — **fidelity dependent on topology model completeness and available TAZ test inventory; see risk flag in §14** | roadmap.md Phase 1 "Lean PTF Orchestration"; UC-02 §11 Plan phase |
| Test environment specification generation | GA | UC-02-patch-management-spec.md §12 Division of Responsibility |
| L2 virtual LPAR provisioning | GA — **customer-operated DIY engine; restricted to monoplex environments** | roadmap.md Phase 1: "Customer-operated provisioning engine for L2 virtualized LPARs; limited automation, customer executes" |
| Application Deployment Engine | GA — **shared Atlas capability; deploys application components from topology into provisioned monoplex environment after provisioning and before test execution** | PM decision 2026-08; required to bridge provisioning and test execution |
| Function test package execution | GA — **restricted to monoplex virtual LPAR environments** | roadmap.md Phase 1: "Basic automated function tests scoped to the change; pass/fail results surfaced in Atlas" |
| Test result surfacing (pass/fail with failure context) | GA | UC-02 §11 Validate phase; uc1-cve-remediation.md Steps 6–7 |
| CSD update generation on test failure | GA | uc1-cve-remediation.md Step 7; UC-02 §15 Failure Modes |
| Failure attribution (PTF or config interaction) | GA | UC-02 §13 AI Differentiation |
| Production patch apply orchestration (sequenced) | GA — requires human authorization | UC-02 §11 Execute phase; §12 Governance gates |
| Change record and audit artifact generation | GA | UC-02 §11 Govern phase; §16 Governance Requirements |
| Proactive PTF gap detection (continuous) | GA | roadmap.md Phase 1 WXA4Z skills; UC-02 Detect phase |
| Real z/OS LPAR provisioning (Atlas-native) | **NOT GA — H1 2027** | roadmap.md Phase 2: "Full automation of real LPAR provisioning; replaces DIY engine from GA" |
| Integration test orchestration | **NOT GA — H1 2027** | roadmap.md Phase 2 |
| Regression test orchestration | **NOT GA — H1 2027** | roadmap.md Phase 2 |
| Middleware software patch orchestration (CICS, Db2, MQ) | **NOT GA — H1 2027** | UC-02 §7 Roadmap Status; roadmap.md Phase 2 |
| Security PTF fast-track (zSecure Portal) | **CONDITIONAL — GA or H1 2027** | UC-02 §9 Dependencies; roadmap.md Phase 1 note |
| ServiceNow bi-directional integration | **NOT GA — H2 2027** | roadmap.md Phase 3 |

---

## 6. Patch Management Marquee Use Case

This is the primary GA demo and sales scenario for Change Intelligence.

**Scenario: Routine Quarterly PTF Maintenance (S1 in UC-02)**

**Trigger:** Zach opens Atlas ahead of a scheduled maintenance window. He needs to assess the PTF batch and build a validated change plan.

**What Atlas does end-to-end:**

1. **Detect** — Surfaces missing PTFs from IZSAM Lite + ibm.com RSU comparison. Flags FIXCAT security items. No user prompt required.
2. **Analyze** — Traverses topology graph: identifies affected CICS regions, Db2 subsystems, applications, PTF prerequisite chains, restart requirements, estimated downtime per LPAR.
3. **Plan** — Generates sequenced patch plan: acquisition steps, dependency order, test environment specification (environment configuration the customer must provision), test scenario list.
4. **Provision** — **Customer operates** the DIY L2 virtual LPAR engine using Atlas's specification. This is the automation break.
5. **Validate** — Atlas applies PTFs to the test environment in sequence; runs function test package; surfaces pass/fail with failure context; generates CSD updates or fixes where needed.
6. **Decide** — Zach reviews results and Atlas recommendation. Hard governance gate — no production action without explicit approval.
7. **Execute** — Atlas orchestrates the production apply with step-by-step visibility; requests authorization per LPAR.
8. **Govern** — Atlas generates the complete change artifact: plan, test results, execution log, approval chain. ServiceNow integration is post-GA.

**The automation break (documented):**
Between Plan and Validate, the customer must operate the provisioning engine. Atlas provides the complete environment specification. The customer executes. Atlas cannot initiate or monitor the provisioning step at GA. This is the clearest limitation in the end-to-end story and the primary H1 2027 improvement.

**Specific risks the scenario handles:**
- PTF UI89234 missing from CICSTS62 (security FIXCAT gap — real Bank of Z finding)
- DB2CONN threadlimit contention under concurrent load (real Bank of Z finding)
- z/OS Connect IPIC unencrypted hop (real Bank of Z finding)
- 15 DSNT060I Db2 install warnings (real Bank of Z finding)

---

## 7. GA Use-Case Coverage Matrix

| Use Case | Pillar | Persona | Customer Goal | GA Classification | GA Stopping Point | Manual / External Step | Future Unlock |
|---|---|---|---|---|---|---|---|
| UC-01: Vulnerability Remediation | SI + CI | Zach, Sage | Assess CVE exposure; execute remediation | GA, partially supported | Blast radius requires TIB (Aug 19); security PTF path requires zSecure Portal (conditional) | Customer operates provisioning engine for test environment | H1 2027: zSecure integration; full provisioning automation |
| UC-02: Patch Management | CI + SI | Zach, Alice, Stan | Apply PTFs safely with validated test cycle | GA, partially supported | Function tests only; customer-operated provisioning; no middleware patches | Customer operates DIY L2 virtual LPAR provisioning engine | H1 2027: Atlas-native provisioning; integration/regression tests; MW/SW patches |
| UC-03: Audit and Compliance | SI | Derek, Sage, Zach | Produce evidence package for audit | GA, end-to-end | — | None; Atlas generates evidence from topology model | H2 2027: Continuous compliance posture monitoring |
| UC-04: Staff Onboarding | SI | Chris, Alice, Deb | Onboard a new team member quickly | GA, end-to-end | — | None; Atlas generates onboarding artifact | 2028+: Self-learning topology from change history |
| UC-05: Application Discovery and Dependency Analysis | SI | Angie, Kathleen, Zach | Understand application structure and dependencies | GA, partially supported | Deep code-level analysis requires ZUnderstand (Aug 19 TIB dependency) | None for topology; ZUnderstand required for call chains | H1 2027: ZUnderstand deep analysis via TIB |
| UC-06: Change Readiness and Health Assessment | SI | Zach, Sage, Derek | Pre-change health check; generate health artifact | GA, end-to-end | — | None; multi-source health artifact generated in one conversation | H2 2027: Continuous health scoring; proactive drift alerting |
| UC-07: Application Change Management | CI + SI | Kathleen, Deb, Zach | Make application changes safely with impact analysis | POST-GA — H1 2027 | No GA support; application code change requires H1 2027 ZUnderstand + provisioning | All steps manual at GA | H1 2027: Limited availability; H2 2027: developer-native workflows |
| UC-08: Platform Upgrade and Migration | CI + SI | Zach, Greg | Execute z/OS or MW upgrades safely | GA, insight only | Only PTF-level upgrades partially supported; full z/OS upgrades require H1 2027 capabilities | Most execution steps manual at GA | H1 2027: MW/SW patch orchestration; full upgrade planning |
| UC-09: Environment Parity and Drift Control | PI + SI | Annette, Zach | Detect and remediate environment drift | POST-GA — H2 2027 | No continuous drift monitoring at GA; point-in-time multi-system comparison available via TIB (Aug 19) | All monitoring steps manual at GA | H2 2027: Continuous drift detection and alerting |
| UC-10: Disaster Recovery Validation | PI + CI | Greg, Zach | Validate DR environment readiness | POST-GA — H2 2027 | No DR simulation or parity monitoring at GA | All steps manual at GA | H2 2027: DR parity analysis; CyberVault/GDPS integration for H2 2027+ |
| UC-11: Capacity Planning and Performance Readiness | PI + CI | Alex, Zach | Understand capacity constraints and prevent performance incidents | POST-GA — H1 2027 | Capacity visibility requires H1 2027; ZDLA performance data requires TIB (Aug 19) for point-in-time queries | All proactive capacity work manual at GA | H1 2027: Capacity visibility; H2 2027: full predictive readiness |
| UC-12: Application Modernization | CI + SI | Angie, Kathleen | Modernize legacy Z applications safely | POST-GA — H1 2027 | No modernization support at GA | All steps manual at GA | H1 2027: Early access; H2 2027: full support |
| UC-13: Regulatory Change Response | SI + CI | Sage, Derek, Lupita | Map regulatory requirements to environment; execute remediation | GA, partially supported | Atlas can map gaps and generate evidence; remediation execution requires Change Intelligence (limited at GA) | Remediation execution steps manual or customer-operated | H1 2027: Full remediation orchestration |
| UC-14: Change Governance and Traceability | CI | Quinn, Annette | Make every Z change traceable to a change record | GA, insight only | ServiceNow bi-directional integration is H2 2027; Atlas generates change artifacts but does not push them automatically | Manual push to ServiceNow at GA | H2 2027: Bi-directional ServiceNow integration |

---

## 8. Additional Use Cases Supportable at GA

These use cases are credible at GA using only the confirmed capabilities: environment discovery, topology and dependency understanding, software inventory, installed and missing PTF data, change-impact reasoning, test-plan recommendation, DIY provisioning of L2 virtual LPARs, function testing, and test evidence collection.

### A. PTF Readiness Assessment
**Customer problem:** Before a scheduled maintenance window, Zach needs to know whether the environment is in a state safe to accept the planned PTF batch — no unexpected drift, no blocking issues.
**Supporting capabilities:** Health Check artifact generation (UC-06), PTF inventory, topology model currency check.
**Human steps:** User triggers the assessment; reviews the artifact; decides to proceed or pause.
**Why credible at GA:** Fully supported by System Intelligence GA capabilities; no Change Intelligence dependency.
**Confidence: High**

### B. PTF Impact Analysis (standalone, pre-change)
**Customer problem:** Before committing to a change window, Zach needs a defensible impact analysis document showing what will be affected, what must be sequenced, and what downtime is expected.
**Supporting capabilities:** Topology-aware impact analysis, prerequisite chain resolution, blast radius calculation.
**Human steps:** User reviews and approves the generated impact analysis.
**Why credible at GA:** Core Change Intelligence MVP capability; well-documented in UC-02.
**What prevents full automation:** Provisioning handoff still manual.
**Confidence: High**

### C. Maintenance-Window Planning
**Customer problem:** Operations manager needs to estimate the scope and duration of an upcoming maintenance window before committing to the calendar.
**Supporting capabilities:** Impact analysis, LPAR restart sequencing, dependency-aware ordering, estimated downtime per LPAR.
**Human steps:** User reviews Atlas's plan; adjusts timing; submits change record.
**Why credible at GA:** Subset of the UC-02 Plan phase; no provisioning or testing required.
**Confidence: High**

### D. Pre-Change Health Check
**Customer problem:** Before opening a change window, Zach wants to confirm the environment is stable and no unexpected drift has occurred since the last change.
**Supporting capabilities:** UC-06 Pre-Change-Window System Review scenario; multi-source health artifact.
**Human steps:** User reviews health artifact; decides to proceed or investigate anomalies first.
**Why credible at GA:** Pure System Intelligence use case; fully supported.
**Confidence: High**

### E. Maintenance Evidence Generation
**Customer problem:** After a PTF apply, the change record needs complete evidence — plan, test results, execution log, approval chain — without manual assembly.
**Supporting capabilities:** Atlas-generated change artifact from the Govern phase of UC-02.
**Human steps:** User reviews the artifact and submits to change management system.
**Why credible at GA:** Atlas generates these artifacts at GA; ServiceNow push is manual until H2 2027.
**What prevents full automation:** Manual ServiceNow submission at GA.
**Confidence: High**

### F. Audit and Compliance Evidence Package
**Customer problem:** Compliance team needs documented evidence that PTF changes followed an approved process with test validation.
**Supporting capabilities:** UC-02 Govern phase artifacts; UC-03 Audit artifact generation.
**Human steps:** User exports and submits artifact to auditors.
**Why credible at GA:** Fully supported by combination of UC-02 and UC-03 GA capabilities.
**Confidence: High**

### G. Change-Risk Assessment
**Customer problem:** Before approving a change, Quinn (IT Operations Manager) needs a non-technical summary of what is being changed, what could go wrong, and why the change is safe.
**Supporting capabilities:** Impact analysis, test plan, function test results, Atlas recommendation summary.
**Human steps:** Atlas generates the risk summary; Quinn reviews and approves.
**Why credible at GA:** The Decide phase of UC-02 already produces this; it is addressable as a standalone artifact.
**Confidence: Medium** (the executive-facing artifact format needs design work)

### H. Identification of Insufficient Test Coverage
**Customer problem:** Zach wants to know whether the function test plan Atlas generated covers the full scope of risk from the PTF batch, or whether there are gaps.
**Supporting capabilities:** Topology-aware test plan generation; coverage rationale in the generated plan.
**Human steps:** User reviews coverage rationale; decides whether to accept or add additional tests.
**Why credible at GA:** Atlas generates a defensible test plan with coverage rationale at GA; gaps are surfaced as explicit notes.
**What prevents full automation:** Integration and regression testing not available until H1 2027 — the coverage will be incomplete for complex middleware scenarios.
**Confidence: Medium**

### I. Dependency-Aware Change Review
**Customer problem:** Before applying a PTF, Zach needs to understand cross-subsystem dependencies that could be disrupted — particularly where CICS, Db2, MQ, or z/OS Connect interact.
**Supporting capabilities:** Cross-middleware topology model; blast radius calculation; lateral connection analysis.
**Human steps:** User reviews the dependency map; confirms sequencing.
**Why credible at GA:** Core System Intelligence capability demonstrated in Demo Scenario 3 and 4.
**Confidence: High**

### J. "What Changed?" Investigation
**Customer problem:** After an unexpected incident, Zach needs to determine whether a recent PTF apply caused the problem.
**Supporting capabilities:** Change history model; CaC change delta (Config-as-Code version history); topology state before and after.
**Human steps:** User investigates the delta; confirms or rules out PTF causation.
**Why credible at GA:** CaC change history is built into the topology model at GA; limited compared to H2 2027 full drift detection but sufficient for manual investigation.
**Confidence: Medium** (depends on CaC re-discovery frequency; stale models will miss recent changes)

---

## 9. Product and Integration Boundaries

| Activity | Atlas | TAZ / Test Accelerator for Z | WXA4Z / FINN (AI layer) | Provisioning Engine (DIY) | Customer Tooling |
|---|---|---|---|---|---|
| Environment discovery | Owns | — | — | — | — |
| Topology graph construction and maintenance | Owns | — | — | — | — |
| PTF inventory and currency analysis | Owns | — | — | — | — |
| Cross-middleware impact analysis | Owns | — | — | — | — |
| Test plan generation | Owns | Integrates (TAZ test scope informed by Atlas plan) | Recommends and reasons | — | — |
| Function test execution | Orchestrates | **Executes** | — | — | — |
| Integration test execution | NOT GA — H1 2027 | **Executes** | — | — | — |
| Regression test execution | NOT GA — H1 2027 | **Executes** | — | — | — |
| Test result interpretation | Owns | Supplies data | — | — | — |
| Smoke testing | Orchestrates (part of function test package) | May execute | — | — | Customer scripts possible |
| Test environment specification | Owns | — | — | Receives spec | — |
| L2 virtual LPAR provisioning (GA) — monoplex only | Supplies spec only | — | — | **Executes (customer-operated)** | Customer operates engine |
| Application deployment into provisioned environment (GA) | **Owns — Application Deployment Engine** | — | — | — | — |
| Real LPAR provisioning (H1 2027) | Orchestrates + owns | — | — | — | — |
| PTF apply (SMP/E JCL generation) | Owns (generates JCL) | — | — | — | SMP/E executes |
| PTF apply (SMP/E execution) | Orchestrates (submits JCL) | — | — | — | SMP/E executes |
| Change record creation | Owns | — | — | — | — |
| ServiceNow push (GA) | Supplies data | — | — | — | **Customer submits manually** |
| ServiceNow push (H2 2027) | Orchestrates (bi-directional) | — | — | — | — |
| Natural language AI interface | — | — | Owns (WXA4Z v2 / FINN) | — | — |
| Agentic skill composition | — | — | Owns | — | — |
| Security PTF detection (conditional) | Integrates | — | — | — | zSecure Portal supplies data |
| Production change authorization | Recommends | — | — | — | **Customer owns — cannot be delegated** |
| Bob (for Z) integration | Optional integration | — | — | — | **Customer-managed optional IDE integration; Bob is NOT the Atlas AI engine** |

**Critical boundary distinction:** Atlas orchestrates tests; TAZ (or equivalent testing tools) executes them. Atlas does not execute tests directly — it coordinates the tools that do. This is the correct framing for all external messaging. "Atlas orchestrates test execution through TAZ" is accurate; "Atlas runs tests" is not.

**Bob vs. WXA4Z boundary (resolved):** Bob (for Z) is a separate IBM product — an optional customer-facing AI IDE integration. WXA4Z (FINN) is the embedded AI inference engine in Atlas. These are distinct products. Bob is an optional integration with Atlas, not Atlas's AI layer. Do not describe Bob as the Atlas AI engine in any documentation or messaging. See the Glossary entry for "Bob (for Z)."

---

## 10. GA Market Narrative

### Executive Narrative (≤150 words)

IBM Z teams spend days on work that should take hours — manually analyzing PTF impact, assembling test plans, building change records from memory. Atlas changes this. At GA, Atlas gives systems programmers instant AI-generated understanding of what a PTF change will affect across their entire middleware stack, generates a sequenced test plan from the actual topology, and coordinates execution in a customer-operated test environment. Results and evidence are collected automatically, producing a complete audit trail without manual assembly. Atlas doesn't replace the expertise a systems programmer brings to z/OS — it removes the hours of manual research before and after every change. Teams that use Atlas for their first quarterly patch cycle will not want to go back.

### External Positioning Statement

Atlas is the first AI-native control plane for IBM Z that joins environment topology, PTF inventory, and change-impact reasoning in a single workflow — replacing hours of manual investigation with AI-generated analysis, test plans, and change evidence that teams can act on and auditors can trust.

### Three Customer-Value Bullets

1. **Know before you touch.** Atlas maps the full impact of any PTF batch across your middleware stack — CICS regions, Db2 connections, application dependencies, prerequisite chains — in minutes, not hours.
2. **Every change comes with a plan.** Atlas generates a sequenced test plan tied to your specific environment and change, not a generic checklist. Function tests run automatically against a test environment. Results surface with failure attribution.
3. **The audit trail assembles itself.** Impact analysis, test results, execution log, and approval chain are captured continuously. No manual assembly. No reconstructing what happened from email threads after the fact.

### Three Proof Points

1. Atlas has been running on a real IBM Z environment — the Bank of Z — since mid-2026. Every demo uses real discovered data: real CICS transactions, real Db2 configuration, real PTF gaps. No mocked responses.
2. The health check scenario surfaces nine distinct findings across six data sources in a single conversation — findings that are invisible to any single tool today, including a zero audit trail spanning CICS, Db2, and z/OS Connect on a real production banking middleware stack.
3. ⚠️ **CONDITIONAL — DO NOT USE IN EXTERNAL MATERIALS UNTIL VALIDATED:** The PTF impact analysis capability resolves prerequisite chains automatically, eliminating one of the most common causes of PTF-related production failures. This alone reduces the expert dependency for routine patch cycles. *This proof point is contingent on prerequisite-chain resolution being validated against a cross-product fix-chain scenario before GA (December 11, 2026). If not validated by GA-day, this proof point must be withdrawn from all sales enablement, marketing materials, and executive briefings. PM must confirm validation status before any external distribution. Owner: PM + Engineering.*

### Three Non-Claims (Sales and Executives Must Avoid)

1. **Do not say "fully automated change management."** At GA, provisioning is customer-operated. The automation break is real and documented.
2. **Do not say "Atlas tests your changes."** Atlas orchestrates test execution through external tools; it does not execute tests itself. The distinction matters for support, liability, and customer expectation-setting.
3. **Do not say "Atlas manages production PTF deployment autonomously."** Every production action requires explicit human authorization. Atlas orchestrates; humans authorize. This is a design principle, not a limitation.

### Why Now

IBM Z customers face a converging crisis: the systems programmers who carry the tribal knowledge of these environments are retiring, security advisory cycles are accelerating, and audit requirements are tightening. The window to capture that knowledge and encode it into an AI-native system is closing. Atlas is the first product built specifically for this moment — grounded in real discovered environments, designed for the actual daily workflow of a systems programmer, and commercially available now.

### Differentiation Statement

No existing tool joins PTF inventory, application topology, and AI-generated test planning in a single workflow. SMP/E knows patch state. ServiceNow tracks change records. OMEGAMON monitors performance. None of them answers "what will break if I apply this PTF, and how do I prove it's safe?" Atlas answers that question in one conversation.

### Customer-Operated Provisioning Language

Recommended framing: **"Atlas coordinates with your team's test environment tooling."** Do not use "DIY," "bring-your-own," or "limited automation" in customer-facing materials. The accurate external description is: *"At GA, Atlas generates the full test environment specification and orchestrates test execution. Customers provision the test environment using their existing tooling. Full Atlas-native provisioning automation — where Atlas provisions the environment automatically — is available in H1 2027 as the Atlas Provision add-on."*

### Recommended GA Experience Name

**Atlas Patch Intelligence** — for the GA Change Intelligence experience. Communicates the scope (PTF and patch management), implies AI differentiation, and avoids overpromising on the full Change Intelligence vision that arrives in H1 2027.

---

## 11. Explicit GA Exclusions

| Excluded Capability | Reason | When Available |
|---|---|---|
| Atlas-native automated LPAR provisioning | DIY engine only at GA; full automation is H1 2027 Atlas Provision SKU | H1 2027 |
| Real z/OS LPAR provisioning | L2 virtual only at GA | H1 2027 |
| Integration test orchestration | Function tests only at GA | H1 2027 |
| Regression test orchestration | Function tests only at GA | H1 2027 |
| Middleware software patch orchestration (CICS, Db2, MQ, IMS) | Requires H1 2027 MW/SW patch capability | H1 2027 |
| Security PTF path via zSecure Portal | Conditional dependency; may slip to H1 2027 | GA (conditional) or H1 2027 |
| ServiceNow bi-directional integration | H2 2027 | H2 2027 |
| GitHub integration | H2 2027 | H2 2027 |
| Config drift detection (continuous) | H2 2027 Predictive Intelligence | H2 2027 |
| DR validation | H2 2027 Predictive Intelligence | H2 2027 |
| Application code change management | H1 2027 limited availability | H1 2027 |
| Performance and stress testing | H2 2027 (dependent on CyberVault/GDPS) | H2 2027+ |
| Capacity visibility | H1 2027 | H1 2027 |
| Autonomous patch execution (no human gate) | 2028+ only; human authorization always required | 2028+ |
| Cross-environment coordinated patch apply | 2028+ | 2028+ |

---

## 12. Post-GA Capability Unlocks

### Unlocked by Embedded Automated Provisioning (H1 2027)

When Atlas can automatically provision the required test environment from its own test plan, the following become possible:

| Capability Unlocked | Customer Outcome |
|---|---|
| Intent-to-environment automation | Zach approves the plan; Atlas provisions the environment without any manual steps |
| Test-plan-driven environment creation | The environment Atlas creates matches exactly what the test plan requires — no configuration drift between plan and provisioned state |
| Automated environment sizing and configuration | Atlas selects the right environment parameters based on the topology model; no manual sizing decisions |
| Ephemeral test environments | Environments spin up for the test and are torn down afterward; no lab sprawl |
| Reproducible validation environments | The same test plan produces the same environment every time; validation is repeatable and auditable |
| Parallel testing | Multiple change scenarios can be tested simultaneously in separate environments |
| Automated remediation and retesting | When a test fails, Atlas applies the fix and re-runs automatically without human intervention between cycles |
| Closed-loop change validation | The complete cycle — plan, provision, test, interpret, decide — runs without manual handoffs |
| Go/no-go recommendations with full evidence | Atlas presents a clear recommendation backed by test evidence, not just results for human interpretation |

**New customer outcome statement (H1 2027):** "I can get a complete validated change plan — environment provisioned, tests run, results interpreted — without managing lab infrastructure myself."

### Unlocked by Atlas-Native LPAR Provisioning (H1 2027)

This goes beyond virtual environments. When Atlas can provision real test LPARs:
- Middleware software patches (CICS, Db2, MQ, IMS) become testable at realistic fidelity
- Integration testing becomes viable — applications can test against realistic subsystem configurations
- The test environment is a genuine production analog, not a simplified virtual slice

---

## 13. Testing Evolution by Test Type

| Test Type | GA Support | Atlas Role | Execution Provider | Environment Required | Change Risk Addressed | Provisioning Prerequisite | Future Unlock |
|---|---|---|---|---|---|---|---|
| Smoke test | GA (part of function test package) | Orchestrates | TAZ or customer scripts | Monoplex L2 virtual LPAR (customer-operated) | Basic service startup failure after PTF | No — customer operates DIY engine | H1 2027: Atlas-native provisioning improves repeatability |
| Function test | GA — **monoplex only** | Orchestrates | TAZ | Monoplex L2 virtual LPAR (customer-operated) | Application-level behavior change after PTF; CSD compatibility | No — customer operates | H1 2027: Expanded coverage with Atlas Provision; sysplex support post-GA |
| Unit test | NOT GA | Orchestrates (future) | Customer test framework or TAZ | Real LPAR; ZUnderstand required for code-level scope | Code-level regression after source change | Yes — requires ZUnderstand + Atlas-native provisioning | H1 2027+ |
| Batch test | NOT GA — scope TBD | Scope definition required | TAZ or customer JCL tooling | Real LPAR (JES2/JES3 required) | Batch job failure or RC change after PTF | Yes — requires real LPAR provisioning | H1 2027 (scope TBD) |
| Integration test | NOT GA — H1 2027 | Orchestrates | TAZ | Real LPAR or production-like virtual environment | Cross-subsystem interaction failures after patch | Yes — requires Atlas Provision (H1 2027) | H1 2027 |
| Regression test | NOT GA — H1 2027 | Orchestrates | TAZ | Real LPAR | Regressions introduced by patch across existing functionality | Yes — requires Atlas Provision (H1 2027) | H1 2027 |
| Performance test | NOT GA — H2 2027 (conditional) | Orchestrates | TAZ / Intellimagic / external | Production-like environment (CyberVault/GDPS) | Performance regression after patch or config change | Yes — requires CyberVault/GDPS integration | H2 2027 (conditional on CyberVault + GDPS) |
| Stress test | NOT GA — H2 2027 or later | Orchestrates | External tools | Full production replica (CyberVault/GDPS) | Capacity failures under peak load | Yes — requires CyberVault/GDPS | H2 2027+ |
| Security test | NOT GA | Recommends plan only | Customer tooling | Any | Security vulnerability introduced by patch | No | 2028+ |
| Compliance validation | GA (partial — artifact only) | Generates evidence artifact | Atlas (evidence generation) | None — evidence from topology model | Compliance gap | No | H2 2027: Continuous compliance monitoring |
| Resiliency test | NOT GA | Not in scope at GA | External | Full environment replica | Failure mode under DR conditions | Yes — requires GDPS | 2028+ |
| System test | NOT GA | Orchestrates (future) | Multiple | Real LPAR | End-to-end system behavior | Yes — requires full provisioning | H1 2027+ |

**Key distinctions:**
- At GA, Atlas **orchestrates** smoke and function tests. TAZ (or equivalent) **executes** them. Atlas does **not** execute tests itself.
- GA testing is **restricted to monoplex virtual LPAR environments**. Sysplex test environments are a post-GA expansion priority.
- Atlas **interprets** results (failure attribution, CSD update generation).
- **WXA4Z (FINN)** is the AI layer that reasons about test generation and result interpretation. **Bob (for Z)** is a separate optional IDE integration — not the test execution engine and not the Atlas AI layer.

---

## 14. Risks, Gaps, and Dependencies

| Risk / Gap | Severity | Evidence | Mitigation |
|---|---|---|---|
| DIY provisioning engine adoption | High | UC-02 §9: "requires significant customer effort and expertise. Low adoption of the test environment step could undermine confidence in the use case." | Clear runbooks; PS engagement option; position H1 2027 Atlas Provision as upgrade path. Rate-limit to create upsell pressure. |
| **Prerequisite-chain resolution unvalidated** | **High** | PM decision 2026-08: "pre-req chain is unvalidated. We want that functionality but it's not completed yet." Proof Point 3 in §10 is conditional on this capability being validated. | Team targets GA or GA+1. Do not use Proof Point 3 in external materials until PM confirms validation is complete. Engineering must confirm status before GA sales enablement is distributed. |
| **AI-generated test plan fidelity** | **High** | Fidelity of Atlas-generated test plans depends on: (a) topology model completeness at time of analysis, (b) available TAZ test inventory, (c) FIXCAT coverage of the PTF batch. Required inputs and available test inventory are not yet fully characterized. | Document the dependency on topology model currency and TAZ inventory. Surface a test plan confidence indicator to users. Set expectation that coverage is bounded by available inventory. See Decisions §16 item 3. |
| **Application topology dependency for application-level impact claims** | **Medium** | Application-level impact claims in the PTF analysis require ZUnderstand (static application topology) and ZoC (runtime application topology) via TIB. Both require the Aug 19 milestone. Without TIB, application-level impact analysis is limited to what CaC DB provides. | Ensure TIB is operational before claiming application-level impact analysis in sales scenarios. Scope GA claims to what TIB-backed analysis can deliver at the Aug 19 milestone. |
| zSecure Portal integration timing | Medium | UC-02 §7: Emergency Security Patch scenario is "Current (conditional) — GA Dec 2026 or H1 2027." roadmap.md: "Dependency: zSecure Portal team." | Scope GA without vulnerability PTFs; plan H1 catch-up sprint. Atlas can still provide impact analysis for PTFs without zSecure integration. |
| Topology model staleness | Medium | UC-02 §15 Failure Modes: "Atlas detects that the last discovery run predates the proposed change window and surfaces a freshness warning." | Model freshness indicator; warn before generating impact analysis on stale model. |
| TAZ capability alignment with GA | Medium | TAZ is assumed to be the GA function test execution provider. No source document explicitly confirms GA-day TAZ capabilities. See Decisions §16 item 4 — this decision is still open. | Confirm with TAZ team before GA sales enablement. Do not claim specific TAZ test types in external materials without TAZ team confirmation. |
| Test environment delta (test vs. production divergence) | Medium | UC-02 §15: "All tests pass but production apply fails — Atlas captures the failure state, compares production configuration to test environment, identifies the delta." Risk is amplified for sysplex customers running GA monoplex test environments. | Atlas detects and attributes the delta; user re-validates. Brief sales on monoplex restriction and the increased divergence risk for sysplex production environments. |
| WXA4Z v2 (FINN) in-cluster timing | Low | roadmap.md: "SaaS-based FINN used at Aug playback; in-cluster by Sept target." | Fallback to SaaS connectivity if in-cluster slips. Not customer-visible at TechXchange. |
| Customer network connectivity for discovery | Low | roadmap.md: "Real customer onboarding requires network connectivity + firewall exceptions." | Clear network requirements documentation; IBM-hosted demo path as fallback. |
| Rate-limiting of Change Intelligence in Atlas Base | Low (commercial) | roadmap.md: "Change Intelligence lean access (rate-limited to create upsell pressure)." UC-02 §4 commercial constraints note. | Commercial annex required for sales enablement. Not for external documentation. |

---

## 15. Contradictions Found in the Source Material

| Contradiction | Sources in Conflict | Recommendation | Status |
|---|---|---|---|
| **Provisioning environment type: x86 vs Linux on Z vs real LPAR** | roadmap.md Phase 1 says "L2 virtualized LPARs" for GA and lists "Linux x86, Linux on Z" as install targets for the Atlas Server (not for test environments). The use case spec (UC-02) says "L2 virtual LPAR provisioning." The distinction between the Atlas Server deployment platform and the test environment provisioning target is not clearly separated in the roadmap. zCX has been removed as an install target (deferred to GA+2). | Decision required: Precisely define what "L2 virtual LPAR" means as a provisioning target at GA — is it a Linux-on-Z virtualized environment, or a real but isolated z/OS LPAR partition? Owner: Engineering / Architecture. | Open |
| **"Bob-enabled functional testing through TAZ by end of Q4"** | ✅ RESOLVED (PM decision 2026-08): Bob is a separate product from WXA4Z. WXA4Z (FINN) is the Atlas AI inference engine. Bob is an optional customer-facing IDE integration. "Bob-enabled" in the source material should be interpreted as WXA4Z AI-assisted test generation and reasoning, not as Bob executing tests. The Atlas–Bob integration is a separate UX and product boundary. | Update all documentation to remove conflation of Bob with WXA4Z. Boundary table updated in §9. | Resolved |
| **"Fully automated" change management language in project.md vs. constrained GA reality** | project.md Change Intelligence description: "Atlas executes the test plan automatically — and can provision an isolated environment when production fidelity is required." This is the long-term vision, not the GA reality. The roadmap and use case spec clearly document the DIY provisioning constraint at GA. | The project.md vision language should not be used in GA messaging. Sales and GTM must be briefed explicitly that the automation described in project.md is H1 2027. Owner: PMM / GTM. | Open |
| **TAZ as execution provider: confirmed vs. assumed** | UC-02 references "function test package execution" and the demo scenarios reference "Taz regression test plan." However, no source document explicitly confirms that TAZ is the GA-day function test execution engine or documents the exact TAZ capabilities available at GA. | Decision required: Confirm TAZ is the GA function test execution provider, document which TAZ test types are available at GA, and confirm the integration is built and tested. Owner: TAZ team + Atlas engineering. | Open (Decision 4 in §16) |
| **z/OS Version Upgrade listed as GA use case in exec roadmap but H1 2027 in use case library** | Atlas_high_level_exec_Roadmap_working_Interpretation.md lists "z/OS Version Upgrade" as a GA use case. atlas-use-case-library.md UC-08 classifies it as "Planned — GA Dec 2026 (PTF-level upgrades); H1 2027 (full MW/SW upgrades)." | The exec roadmap document appears to be aspirational or out of date relative to the more detailed use case library. The use case library is more granular and should be treated as the authoritative source. The exec roadmap should be corrected. Owner: PM. | Open |
| **Proactive PTF alerting: GA vs. H2 2027** | roadmap.md Phase 1 WXA4Z skills list includes "PTF impact analysis skill" as a GA capability. Phase 3 lists "Proactive patch currency monitoring" as an H2 2027 Predictive Intelligence feature. UC-02 Future Direction section also positions continuous proactive monitoring as H2 2027. | Clarify the distinction: PTF impact analysis on-demand (GA) vs. continuous background monitoring that alerts without user prompt (H2 2027). These are different capabilities. Use the UC-02 framing: Atlas surfaces PTF gaps when asked at GA; Atlas monitors proactively and alerts without prompting at H2 2027. Owner: PM. | Open |
| **Prerequisite-chain resolution: previously listed as GA confirmed, now unvalidated** | §5 previously listed "Prerequisite chain resolution — GA" as confirmed. PM decision 2026-08 downgrades this to "GA target — unvalidated." Proof Point 3 in §10 was based on the confirmed status and must now be conditioned. | §5 and §10 updated to reflect unvalidated status. Proof Point 3 conditioned with explicit withdrawal instruction if not validated by GA-day. Owner: PM + Engineering — confirm validation status before GA. | Partially resolved — awaiting validation confirmation |

---

## 16. Decisions Needed from Leadership

| Decision | Why It Matters | Options | Recommendation | Evidence | Proposed Owner |
|---|---|---|---|---|---|
| 1. Define "L2 virtual LPAR" as a provisioning target | Sales and customers will ask exactly what environment type can be provisioned at GA. The answer affects the credibility of the test validation story. | (a) zCX container; (b) Linux-on-Z virtualized environment; (c) restricted real z/OS LPAR partition; (d) x86 virtual environment | Confirm with engineering the exact provisioning target and document it. Then confirm it is sufficient for function test validity. | roadmap.md: "L2 virtualized LPARs" (no further definition); contradiction between install targets and test environment targets | Architecture / Engineering |
| 2. Confirm zSecure Portal integration status | If not available at GA, the Emergency Security Patch scenario does not include the security PTF detection path. This affects both the demo story and the customer value at GA. | (a) GA (Dec 11) with security PTF path; (b) H1 2027 fallback; (c) GA without security path, Atlas uses IZSAM + ibm.com only | Scope GA without zSecure dependency; plan H1 catch-up. Document clearly for sales. | UC-02 §9: "Dependency: zSecure Portal team"; roadmap.md: "conditional" | PM + zSecure Portal team |
| 3. Define "Bob-enabled functional testing through TAZ" | This phrase appears in the exec roadmap. If it refers to capabilities available at GA, it affects what Atlas Base subscribers get at launch. If it is Q4 2026 post-GA, it needs to be positioned as a fast-follow. | (a) WXA4Z AI test generation = "Bob-enabled" — available at GA via FINN; (b) Specific TAZ generative test feature releasing Q4 — timing TBD relative to Dec 11; (c) Both | Clarify with TAZ product team. If TAZ generative testing is not confirmed for GA-day, do not include it in GA messaging. | Exec roadmap: "Bob-enabled functional testing through TAZ, planned by end of Q4." No further definition in any source. | TAZ PM + Atlas PM |
| 4. Confirm TAZ is the GA function test execution provider | The test validation story hinges on this. If TAZ is not the execution engine, or if TAZ capabilities are limited at GA, the function test package claim needs to be scoped accordingly. | (a) TAZ confirmed as GA test execution provider; (b) Customer-provided test scripts; (c) Atlas-native test execution engine | Confirm with engineering which test execution engine is integrated at GA and what test types it supports. | UC-02 references "function test package execution" without naming the specific execution engine; demo scenarios reference "Taz regression test plan" | Engineering + TAZ team |
| 5. Approve the "Atlas Patch Intelligence" naming for the GA experience | A clear, scoped product experience name prevents overselling the full Change Intelligence vision while still communicating value. | (a) Atlas Patch Intelligence; (b) Atlas PTF Orchestration; (c) Lean Change Intelligence (internal term, not recommended externally); (d) No sub-brand — just "Change Intelligence" | "Atlas Patch Intelligence" is preferred — it is specific without being limiting. "Lean Change Intelligence" is appropriate internally but should not be customer-facing. | product-preferences.md: no buzzwords; be specific; roadmap.md uses "Lean PTF Orchestration" as internal term | PMM + PM |
| 6. Set rate-limit thresholds for Change Intelligence in Atlas Base | The commercial model depends on rate-limiting to drive upsell to Atlas Provision and Atlas Test. The specific limits need to be set before GA so in-product messaging can be designed. | Varies; options include limits by test executions per month, by provisioning events per quarter, or by environment size | Set limits high enough not to block legitimate first use but low enough to create natural upsell pressure. Document in internal commercial annex. | UC-02 §4 commercial constraints note; roadmap.md packaging section | PM + Commercial |
| 7. Confirm ServiceNow integration scope at GA | ServiceNow bi-directional integration is H2 2027. But Atlas can generate change artifacts that customers manually push to ServiceNow at GA. The exact scope of what Atlas generates and what the customer does needs to be specified for sales. | (a) Atlas generates a ServiceNow-compatible change record template; (b) Atlas generates a generic change artifact; (c) No ServiceNow capability at GA | Atlas generating a ServiceNow-format change record template at GA is feasible and valuable. Confirm with engineering. | UC-02 §16: "Atlas generates a complete change artifact — plan, test results, execution log, approval chain — and can push it to ServiceNow"; demo scenario Turn 4 shows "SNOW-CR-template.yaml" as a generated artifact | Engineering + PM |
| 8. Resolve the exec roadmap z/OS Version Upgrade GA claim | The exec roadmap lists z/OS Version Upgrade as a GA use case. The use case library positions full upgrades as H1 2027. Leaving this unresolved creates a false customer expectation. | (a) Correct exec roadmap to reflect UC-08 status (PTF-level only at GA; full upgrades H1 2027); (b) Accept a narrowed GA claim for z/OS upgrade (assessment and planning only, not execution) | Update exec roadmap to reflect the use case library. Do not claim z/OS version upgrade execution as a GA capability. | Atlas_high_level_exec_Roadmap_working_Interpretation.md vs. atlas-use-case-library.md UC-08 | PM |
| 9. Define the DIY provisioning engine package | Customers and PS teams need to know exactly what the DIY provisioning engine is — what it contains, how it is packaged, what skills are required to operate it, and whether it is an Atlas deliverable or a customer-assembled toolchain. | (a) Atlas delivers a packaged Ansible-based provisioning runbook; (b) Atlas delivers documentation and specification only; (c) Atlas provides a reusable internal engine customers install and operate; (d) PS engagement required | Define clearly before GA sales conversations begin. The answer materially affects time-to-value and customer readiness. | roadmap.md: "Customer-operated provisioning engine for L2 virtualized LPARs; limited automation, customer executes." No further definition in any source document. | Engineering + PS + PM |
| 10. Finalize the Final Decision Test answer | The prompt asks: can Atlas at GA claim it validates an IBM Z change, or only that it understands, recommends, and coordinates a partially customer-operated validation? | (a) "Atlas validates Z changes" — requires full automation and requires no manual steps; (b) "Atlas understands, recommends validation, and coordinates a partially customer-operated process" — the accurate GA-day claim | **Confirmed: option (b) is the only defensible GA claim.** Atlas cannot claim it validates changes end-to-end at GA because the provisioning step is customer-operated and the test coverage is limited to function tests. The accurate wording: *"Atlas understands your Z environment, assesses the impact of proposed changes, recommends and coordinates a validation process, and produces evidence that supports a human go/no-go decision."* | UC-02 §12: "Test environment provisioning (GA) — User (DIY engine; Atlas provides configuration; human executes)"; roadmap.md Phase 1 | PM + Legal + PMM |

---

## 17. Evidence Appendix

| Source | Date / Version | Relevant Statement | Capability or Constraint | Confidence |
|---|---|---|---|---|
| roadmap.md | July 2026 | "Lean PTF Orchestration (Change Intelligence MVP): End-to-end PTF change scenario: AI-assisted impact analysis → Atlas test plan → DIY L2 virtual LPAR provisioning engine → function test package execution" | GA Change Intelligence scope; DIY provisioning confirmed | Confirmed |
| roadmap.md | July 2026 | "Customer-operated provisioning engine for L2 virtualized LPARs; limited automation, customer executes; lays foundation for full Atlas-native provisioning in H1 2027" | DIY provisioning model at GA | Confirmed |
| roadmap.md | July 2026 | "Atlas-native LPAR provisioning: Full automation of real LPAR provisioning; replaces DIY engine from GA" listed under Phase 2 (H1 2027) | Real LPAR provisioning is NOT GA | Confirmed |
| UC-02-patch-management-spec.md | August 2026 | "Test environment provisioning (GA) — User (DIY engine; Atlas provides configuration; human executes)" | Human executes provisioning at GA | Confirmed |
| UC-02-patch-management-spec.md | August 2026 | "Test environment provisioning (H1 2027+) — Atlas (Full LPAR automation; user approves the provisioning action)" | Automated provisioning is H1 2027 | Confirmed |
| UC-02-patch-management-spec.md | August 2026 | "Governance gates — explicit human approval required before: Test environment provisioning; Promotion from test to production; Each production LPAR patch apply" | Human gates are by design, not limitation | Confirmed |
| atlas-use-case-library.md | July-August 2026 | UC-02 Status: "Current — GA Dec 2026 (PTF orchestration); H1 2027 (MW/SW patch expansion)" | PTF-only at GA; MW/SW patches are H1 2027 | Confirmed |
| atlas-use-case-library.md | July-August 2026 | UC-07 (Application Change Management) Status: "Planned — H1 2027 (limited availability); H2 2027 (developer-native workflows)" | Application code changes are NOT GA | Confirmed |
| Atlas_Demo_Scenarios_v2.md | July 2026 | "Blueprint-driven sandbox provisioning — Post Sept — Act 3 of all scenarios" (Appendix capability-to-scenario table) | Sandbox/provisioning not available until after Sept 16 milestone | Confirmed |
| Atlas_Demo_Scenarios_v2.md | July 2026 | Scenario 4 Extension Arc: "Act 2 — Generate a validation test plan for applying this PTF. Atlas uses the ZUnderstand-discovered CLAIMS application scope to generate a Taz regression test plan." | TAZ used for test plan generation; requires ZUnderstand in TIB (Aug 19) | Strongly indicated |
| design/flows/uc1-patch-orchestration.md | July 2026 | Step 6: "Isolated environment provisioned based on PROD1 configuration. PTF UI99234 applied. CICS region started successfully. Running transaction smoke tests now — 44 of 47 programs passing." | Smoke/function test execution model; Atlas orchestrates, reports results | Strongly indicated (vision document; may overstate GA automation) |
| atlas-glossary.md | August 2026 | "Lean Change Intelligence: The rate-limited Change Intelligence capability included in Atlas Base at GA. Covers end-to-end PTF change orchestration. Rate-limited to create upsell pressure toward Atlas Provision and Atlas Test add-on SKUs." | GA is rate-limited lean version | Confirmed |
| atlas-glossary.md | August 2026 | "TIB (Topology Integration Broker): Without TIB, Atlas can only answer questions from Config-as-Code and IZSAM Lite. With TIB, Atlas can join data across all integrated sources." | TIB is required for multi-source queries (Aug 19+ milestone) | Confirmed |
| Atlas_high level exec Roadmap_working_Interpretation.md | 2026 | GA use cases listed as "Patch Orchestration" and "z/OS Version Upgrade" | z/OS Version Upgrade claim conflicts with UC-08 library status | Contradiction — see Section 15 |
| atlas-use-case-library.md | July-August 2026 | UC-08 Status: "Planned — GA Dec 2026 (PTF-level upgrades); H1 2027 (full MW/SW upgrades)" | Full z/OS upgrade is H1 2027 | Confirmed |
| project.md | 2026 | Change Intelligence: "Atlas executes the test plan automatically — and can provision an isolated environment when production fidelity is required." | Long-term vision language; does not reflect GA constraints | Working assumption (vision doc, not spec) |
| roadmap.md | July 2026 | Key Dependencies: "Skills gap on customer side: Customers may lack skills to configure DIY provisioning engine at GA. Mitigation: Provide clear runbooks; offer PS engagement option." | DIY provisioning is a recognized adoption risk | Confirmed |
| roadmap.md | July 2026 | "Performance testing (conditional): Dependent on CyberVault + GDPS for environment replication; if integrations land in H2 2027" | Performance testing is conditional on CyberVault/GDPS | Confirmed |
| atlas-use-case-library.md | July-August 2026 | UC-14 (Change Governance and Traceability): "Full realization requires the ServiceNow integration (H2 2027) and GitHub integration." | ServiceNow bi-directional integration is H2 2027 | Confirmed |

---

## Final Decision Test Answer

**Question:** Can Atlas at GA credibly claim that it validates an IBM Z change, or can it only claim that it understands the change, recommends validation, and coordinates a partially customer-operated validation process?

**Answer: The second framing is the only defensible one at GA.**

The evidence is unambiguous. The provisioning step at GA requires human execution of a customer-operated engine — Atlas provides the specification but cannot initiate or monitor provisioning. Testing at GA is limited to function tests. Integration and regression testing are H1 2027. ServiceNow is H2 2027.

**The strongest defensible GA wording:**

> *Atlas understands the full impact of a proposed IBM Z change across your middleware stack, generates a sequenced validation plan, coordinates test execution in a customer-operated test environment, interprets results, and produces the evidence package that supports a human go/no-go decision before anything touches production.*

This wording is accurate, differentiated, and customer-valuable without overstating automation. It is the wording recommended for all GA external messaging, sales enablement, and executive briefing materials.

---

*This document was produced by analyzing the complete Atlas product body of work available as of August 2026. All claims are sourced to specific documents. Unresolved questions are labeled and directed to the appropriate decision owner.*
