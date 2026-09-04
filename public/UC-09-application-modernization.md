# UC-09: Application Modernization
*Version 1.0 | Owner: Product Management | Last updated: August 2026*

---

## Executive Summary

IBM Z organizations have millions of lines of application code that run critical business operations and are not going anywhere — but they are accumulating technical debt, carrying deprecated interfaces, and becoming harder to change safely over time. The block on modernization is not willingness; it is risk and opacity. Nobody has a complete picture of what these applications actually do, what they depend on, and what would break if they were changed. Atlas provides the topology map and the change execution capability that make modernization tractable — turning "we cannot safely touch this" into a phased, validated, risk-controlled project.

---

## 1. Overview

Application Modernization covers the full arc of legacy application analysis and safe modernization on z/OS: identifying technical debt, mapping deprecated interface usage, planning phased remediation, executing changes in isolated environments, and validating before production. It is a high-complexity, long-horizon use case that requires both deep System Intelligence (to understand what is there) and Change Intelligence (to change it safely). The use case is available in limited form in H1 2027 and expands in H2 2027 as code-level analysis capabilities mature.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When we have a legacy application that needs to be modernized — updated, refactored, or partially decomposed — I want a complete picture of what that application actually does, what its technical debt looks like, and a phased plan to change it safely, so we can make progress without causing production incidents in a codebase nobody fully understands anymore. |
| **Emotional** | Architects and senior developers want to feel like modernization is a managed engineering project, not a series of high-anxiety changes to a black box. They want the confidence that comes from knowing what they are changing before they change it. |
| **Social** | Leadership needs to see that modernization is progressing — not that the team is perpetually "studying the problem." Atlas converts modernization analysis from an indefinite investigation into a structured, visible, time-bounded project. |

---

## 3. Customer Problem and Outcome

**Problem:** Legacy z/OS applications accumulate debt over decades — deprecated APIs, duplicated business logic, monolithic shared copybooks, undocumented dependencies. The people who built them are often gone. The documentation, where it exists, is outdated. Making changes safely requires understanding all of these things; currently understanding them requires weeks of investigation by the most experienced engineers available, and even then the picture is incomplete.

**Current State (Without Atlas):** Modernization projects begin with a research phase that takes weeks or months — manually reading code, asking the few remaining experts, reviewing CICS CSD definitions and Db2 catalog entries. The research phase is expensive, incomplete, and does not produce a structured artifact. Modernization plans are built on incomplete understanding. Changes to tightly coupled code (monolithic copybooks, shared Db2 plans) carry high risk because the blast radius is not fully known.

**Desired Outcome:** An architect or developer can ask Atlas for a complete picture of any application's structure, technical debt, and dependency profile in minutes. Atlas identifies specific modernization opportunities — deprecated APIs approaching end-of-support, monolithic structures suitable for decomposition, duplicated logic — and generates a prioritized, phased plan. Each phase is validated in isolation before production is touched.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Application Modernization drives all three Atlas SKUs. Atlas Base provides the discovery and dependency analysis. Atlas Test provides the regression test execution at each modernization phase. Atlas Provision provides the isolated environments for safe validation. A multi-year modernization project is the highest total revenue potential per customer of any use case in the library. |
| **Retention impact** | Organizations engaged in multi-year modernization projects are deeply embedded in Atlas — they have accumulating change history, test baselines, and topology enrichment from every completed phase. The value of leaving increases with every completed modernization cycle. |
| **Competitive differentiation** | IBM Watsonx Code Assistant for Z provides code generation and refactoring capabilities. Atlas provides the topology awareness and change orchestration that makes those capabilities safe to use in production environments. The combination — Atlas understanding the environment + Watsonx Code Assistant for Z transforming the code — is a unique IBM portfolio story. Neither alone is as powerful as both together. |
| **Portfolio attach** | This use case creates direct pull-through for IBM Watsonx Code Assistant for Z (code transformation partner), ZUnderstand (code-level call chain analysis required for deep modernization scope), and Atlas Test SKU (regression testing at each phase). |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Angie — Application Architect | Initiates the modernization project. Owns the modernization strategy, reviews the technical debt assessment, approves the phased plan, and makes architecture decisions throughout. |
| **Secondary** | Kathleen — z/OS Application Developer (experienced) | Executes the code-level modernization work — remediating deprecated API calls, decomposing monolithic structures, updating Db2 access patterns. Works from the plan Atlas generates. |
| **Secondary** | Deb — z/OS Application Developer (early tenure) | Works on lower-risk phases of the modernization plan under Kathleen's oversight. Uses Atlas's dependency analysis to understand the code she is changing before touching it. |
| **Secondary** | Greg — Infrastructure Architect | Reviews the infrastructure implications of modernization decisions — particularly API modernization (z/OS Connect) and database schema changes that affect infrastructure configuration. |

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary (Analyze phase).** Technical debt identification, deprecated API mapping, monolithic structure analysis, dependency mapping across 300+ programs — all System Intelligence. The topology model and ZUnderstand call chain data are the combined source for modernization scope. | GA Dec 2026 (static topology); H1 2027 (ZUnderstand code-level analysis — required for full modernization scope) |
| **Change Intelligence** | **Primary (Execute phase).** Code change generation, phased execution, isolated environment testing, and production validation are Change Intelligence capabilities. For modernization, Change Intelligence is the execution engine for the plan that System Intelligence produces. | H1 2027 (limited access); H2 2027 (full developer-native workflows) |
| **Predictive Intelligence** | **Supporting throughout.** Proactive risk surfacing (deprecated API approaching end-of-support deadline), blast radius quantification for high-coupling structures, and post-change behavioral validation are Predictive Intelligence behaviors. | Partial at H1 2027; full H2 2027 |

**Critical dependency — ZUnderstand:** Application modernization scope is only fully visible with ZUnderstand's dynamic call chain analysis. Static Config-as-Code topology shows what is configured; ZUnderstand shows what actually calls what at runtime. For a 47-program monolithic copybook decomposition, knowing which programs actually use which fields at runtime (not just which programs reference the copybook) is the difference between a correct decomposition plan and one that causes runtime failures.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Deprecated API Remediation | **Planned** | H1 2027 | ZUnderstand for dynamic call chain analysis; Atlas Test SKU for per-program validation | H1 2027 |
| Monolith Decomposition Planning | **Planned** | H1 2027 | ZUnderstand for field-usage analysis in monolithic structures; static topology for initial coupling map | H1 2027 |
| Application Modernization Assessment | **Planned** | H1 2027 | ZUnderstand + Config-as-Code combined for full assessment | H1 2027 |
| Application Architecture Discovery | **Planned** | H1 2027 | Application topology via ZUnderstand; cross-application dependency traversal; portfolio-level inventory | H1 2027 |
| API Modernization (z/OS to REST) | **Planned** | H2 2027 | z/OS Connect topology + ZUnderstand for transaction-to-REST mapping; Atlas Test for API validation | H2 2027 |

**Capability dependency notes:**

- All scenarios require ZUnderstand (H1 2027) at minimum. Static Config-as-Code topology is insufficient for code-level modernization analysis.
- Deprecated API Remediation is the closest to available capability at H1 2027. Kyle's uc3 shows Atlas identifying 12 programs using deprecated Db2 APIs with 34 distinct calls and mapping each to its modern equivalent — this is a concrete, demonstrable scenario.
- Monolith Decomposition requires field-usage analysis across 47 programs (Kyle's ORDCOMM01 scenario: 312 fields, of which 89 are used actively, 134 used by fewer than 3 programs, and 89 unused). This analysis requires ZUnderstand's runtime call chain data.
- **Application Architecture Discovery (S4)** was absorbed from the retired UC-05. Rather than asking "what would this specific change touch?", this scenario asks "what is the complete application portfolio for this business domain, what are the dependencies between applications, and which applications are candidates for modernization?" It is the portfolio-level precursor to the per-application modernization scenarios.

---

## 8. Scope and Boundaries

**In Scope:**
- Technical debt identification: deprecated API usage, monolithic shared structures (copybooks, shared Db2 plans), duplicated business logic, code with high-risk coupling
- Modernization scope analysis: mapping all affected programs, quantifying the change scope, estimating remediation effort
- Phased plan generation: sequencing the modernization into phases ordered by risk and dependency, with isolated testing at each phase
- Automated code remediation for well-understood patterns (e.g., deprecated API call replacement with documented modern equivalents)
- Isolated environment provisioning for each modernization phase
- Regression and behavioral testing at each phase before production promotion
- Blast radius assessment for high-coupling structures before decomposition work begins
- Application architecture discovery and portfolio analysis for modernization planning (S4 — absorbed from retired UC-05)

**Out of Scope:**
- Application rewrite from scratch — Atlas modernizes existing code; it does not redesign application architecture or generate replacement applications
- Business logic redesign — Atlas identifies where business logic is duplicated or fragile; redesigning the logic is a development team responsibility
- Platform migration (z/OS to distributed or cloud) — Atlas modernizes the z/OS application on z/OS; cross-platform migration is out of scope
- Non-IBM Z application stacks — Atlas manages the IBM Z software layer

**Non-Goals:**
- Atlas does not take over the modernization project management — it provides the analytical foundation and execution support; project decisions and business prioritization remain with the architecture and development team
- Atlas does not guarantee backward compatibility of modernized code — it generates tests to validate behavior; compatibility is determined by the test results, not Atlas's assurance

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The application being modernized has been discovered in Atlas — CICS CSD, Db2 catalog, and application-layer topology are available |
| **Assumption** | ZUnderstand is available in TIB for dynamic call chain analysis — required for full modernization scope (H1 2027) |
| **Assumption** | The team has a clear modernization goal — Atlas identifies and plans; it does not choose which applications to modernize or why |
| **Dependency** | ZUnderstand (TIB integration) for code-level call chain analysis, field usage analysis, and dynamic dispatch mapping |
| **Dependency** | Atlas Test SKU for regression testing at each modernization phase |
| **Dependency** | Atlas Provision SKU for isolated environment provisioning per phase |
| **Dependency** | IBM Watsonx Code Assistant for Z (optional integration) for AI-assisted code generation and transformation within the modernization workflow |
| **Risk** | Static topology (Config-as-Code only) produces an incomplete modernization scope — programs that dynamically link or dispatch to shared code may not appear in the static map. ZUnderstand mitigates this but requires H1 2027 capability. |
| **Risk** | Automated code remediation may not correctly handle all edge cases — particularly for programs with non-standard API usage patterns. Human review of Atlas-generated code changes is required before production promotion. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Deprecated API Remediation | User identifies that applications use APIs scheduled for deprecation; requests a remediation plan | Planned | H1 2027 | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc9-application-modernization.md`](../design/flows/uc9-application-modernization.md) Steps 1–6 |
| Monolith Decomposition Planning | User identifies a high-risk monolithic shared structure and wants to decompose it safely | Planned | H1 2027 | UX Flow, Chat Exchange | [`design/flows/uc9-application-modernization.md`](../design/flows/uc9-application-modernization.md) Steps 7–8 |
| Application Modernization Assessment | Architect requests a full assessment of modernization opportunities across an application | Planned | H1 2027 | UX Flow, Chat Exchange | TBD |
| **Application Architecture Discovery** | Architect proactively inventories and maps the application portfolio for a business domain to identify modernization candidates, establish a dependency baseline, and document the current-state architecture before planning changes | Planned | H1 2027 | UX Flow, Chat Exchange | Received from UC-05 (Stage 2). Primary persona: Angie. |
| API Modernization (z/OS to REST) | Application functionality is being exposed as REST APIs via z/OS Connect; user needs to validate the new API endpoints against the underlying CICS transactions | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |

**Design decisions for this scenario catalog:**

- Kyle's uc3 covers Deprecated API Remediation and Monolith Decomposition in one script — kept separate here because the ORDCOMM01 decomposition decision (Steps 7–8) is a materially higher-risk, longer-horizon decision than the deprecated API cleanup (Steps 1–6).
- The Predictive Intelligence moment in Step 3 of Kyle's uc3 (Atlas proactively warns that the 12 deprecated API programs will begin failing in 4 months based on the upgrade timeline) is the use case's strongest demo moment and should be preserved.
- **Application Architecture Discovery (S4)** is absorbed from the retired UC-05. Where the other UC-05 scenarios (transaction flow, cross-app dependency, blast radius) were absorbed into adjacent use cases that already had topological analysis as a step, this scenario is absorbed here because Angie is the primary persona and the output (a portfolio-level architecture map) feeds directly into modernization planning.

---

## 11. Lifecycle Overview

```
Assess → Prioritize → Plan → Execute → Validate → Promote
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Assess** | Atlas produces a technical debt assessment for the application — deprecated API usage, monolithic structures, duplicated logic, coupling risk, and known approaching deadlines | Atlas |
| **Prioritize** | Angie reviews the assessment and selects which modernization workstreams to pursue first, in what order, and within what timeline | User |
| **Plan** | Atlas generates a phased remediation plan for the selected workstream — specific programs, specific changes, test criteria, and phase sequencing ordered by risk | Atlas |
| **Execute** | Atlas generates code changes for automated remediation patterns; Kathleen and Deb review and apply manual changes; all work is done in isolation before production | Both |
| **Validate** | Atlas runs regression tests and behavioral validation for each phase; test results are reviewed before any production promotion | Both |
| **Promote** | User authorizes production promotion for each validated phase; Atlas executes the promotion | Both |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Technical debt identification | Atlas | Atlas uses static topology + ZUnderstand to identify deprecated API usage, high-coupling structures, and code risk patterns |
| Business prioritization of modernization workstreams | User | Angie decides which modernization areas to pursue first; Atlas does not make business priority decisions |
| Phased plan generation | Atlas | Atlas generates the plan; user reviews and approves before execution begins |
| Automated code remediation (well-understood patterns) | Atlas | Atlas generates replacement code for deprecated API patterns with documented modern equivalents |
| Manual code changes (complex or non-standard patterns) | User | Kathleen or Deb implements changes that Atlas cannot safely automate |
| Regression test execution | Atlas | Atlas Test SKU; automated |
| Code review for Atlas-generated changes | User | All Atlas-generated code requires human review before production promotion |
| Production promotion authorization | User | Every phase promotion requires explicit user authorization |
| Modernization project pacing and scope decisions | User | Atlas executes the plan; the team decides when and how to expand scope |

**Governance gates:** Phase promotion, code review approval for Atlas-generated changes, and blast radius review before high-coupling structure decomposition are all human governance gates. Atlas does not advance past any of these without named user authorization.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **ZUnderstand dynamic call chain analysis** | Atlas identifies which programs actually call which other programs at runtime — including dynamic dispatch patterns that static analysis cannot see | The most dangerous modernization failures come from dependencies that do not appear in static analysis; ZUnderstand makes them visible |
| **Deprecated API usage mapping** | Atlas identifies all 34 calls to deprecated Db2 APIs across 12 programs and maps each to its modern equivalent | A manual audit of this scope would take weeks; Atlas produces it in minutes and immediately generates the remediation plan |
| **Field usage analysis for monolith decomposition** | Atlas determines which fields in a 312-field copybook are actively used, by whom, and in what patterns — distinguishing truly shared fields from fields that can be separated | This analysis is infeasible manually for large monolithic structures; Atlas makes decomposition tractable |
| **Proactive deadline surfacing** | Atlas surfaces that the 12 deprecated API programs will begin failing in 4 months based on the planned upgrade timeline — without being asked | This converts a latent risk into an actionable project before the deadline pressure creates urgency |
| **Phase-isolated regression testing** | Atlas validates each modernization phase against behavioral baselines in isolation, confirming no unintended side effects before production promotion | The most common cause of modernization failures is unexpected behavioral change in code that was not supposed to be affected |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Modernization scope analysis time | Time from "start the modernization analysis" to complete technical debt assessment and phased plan | 4–8 weeks (manual) | Under 1 week with ZUnderstand |
| Modernization-related production incidents | Number of production incidents caused by a modernization change that caused an undetected regression | Estimated 15–25% of modernization changes cause at least one regression event | Under 3% with Atlas-validated phases |
| Deprecated API remediation completion rate | Percentage of identified deprecated API usages remediated before end-of-support deadline | Typically 50–70% | 95%+ identified and planned before deadline |
| Time per modernization phase | Average calendar time to complete one modernization phase (plan to production promotion) | Estimated 4–8 weeks per phase manually | Under 2 weeks per phase with Atlas |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| ZUnderstand analysis is unavailable or incomplete for a specific application | Atlas explicitly states that static topology is being used and that dynamic call chains are not confirmed; flags the blast radius as potentially incomplete | User proceeds with awareness of the gap; manual code review supplements Atlas analysis |
| Atlas-generated code for a deprecated API replacement has a behavioral edge case | Atlas runs regression tests; if the edge case produces a different result, the test fails and Atlas surfaces the specific failing test case | Kathleen reviews the failing test case and implements a manual fix; Atlas retests |
| A phase regression reveals an unexpected dependency that was not in the blast radius | Atlas surfaces the unexpected failure with the specific program and the unexpected dependency path | User reviews the new dependency; Atlas updates the blast radius and generates an updated plan |
| Monolith decomposition plan produces a coupling that cannot be cleanly separated | Atlas surfaces the indecomposable coupling during the planning phase and recommends an alternative decomposition strategy | Angie reviews the recommendation and decides whether to proceed with the alternative or defer this workstream |
| A production promotion causes a behavioral change not detected in isolation testing | Atlas monitors post-promotion behavior and alerts when transaction response patterns diverge from baseline | User reviews the post-promotion alert; decides whether to roll back or investigate |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Change record for each modernization phase | Modernization changes are production changes and require change records | Atlas generates a change record template for each production promotion; ServiceNow integration (H2 2027) automates linkage |
| Code review before production promotion | Atlas-generated code changes require human review before they touch production | Atlas produces a code review artifact for each generated change; the change cannot be promoted without a named reviewer sign-off in Atlas |
| Regression test evidence | Change advisory boards may require test results before approving a modernization phase | Atlas produces a structured test report per phase that serves as the evidence artifact |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-07: Application Change Management | Individual code changes within a modernization project are executed as UC-07 workflows. UC-09 owns the modernization strategy and phasing; UC-07 owns each individual change execution cycle within the phases. |
| UC-08: Platform Upgrade and Migration | Platform upgrades frequently trigger modernization work — deprecated interfaces removed in the new version force application code changes. UC-08 identifies the modernization scope driven by the upgrade; UC-09 executes it. |
| UC-03: Regulatory Change Response | Regulatory requirements sometimes require application-level code changes — particularly for applications that directly process regulated data. UC-03 identifies the regulatory gap; UC-09 executes the application modernization required to close it. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **IBM Watsonx Code Assistant for Z integration** | H2 2027 | Watsonx Code Assistant for Z generates refactored code from Atlas's modernization plan — Atlas provides the context (what to change and why), Watsonx Code Assistant for Z generates the code transformation. |
| **Continuous technical debt tracking** | H2 2027 | Atlas maintains a rolling technical debt score per application — tracking deprecated API exposure, coupling risk, and test coverage as ongoing metrics rather than project-time assessments. |
| **Agentic deprecated API remediation** | H2 2027 | For well-understood deprecated API patterns with automated test coverage, Atlas proposes and executes the full remediation cycle — identify, plan, code, test, promote — with human code review and production authorization as the only gates. |
| **Cross-application modernization sequencing** | 2028+ | For organizations with multiple interdependent applications undergoing modernization simultaneously, Atlas reasons about the cross-application sequencing — which application must be modernized before which other. |

---

## 19. Pain Points & Wows Flow Analysis

> **Pillar:** System Intelligence (analyze) + Change Intelligence (execute) + Predictive Intelligence (risk surfacing)
> **GA Status:** H1 2027 (limited access); H2 2027 (full developer-native workflows)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Analyze

**Personas involved:** Angie, Kathleen

| Persona | Pain Point | Category |
|---|---|---|
| Angie | Modernization projects begin with a research phase that takes weeks or months — manually reading code, interviewing the few remaining experts, reviewing CSD definitions and Db2 catalog entries. | ⏱️ Lost Time — **weeks to months** in a manual research phase before any modernization action can begin |
| Angie | The research phase is expensive, incomplete, and produces no structured artifact — modernization plans are built on an understanding that is acknowledged as incomplete. | 💼 Business Impact — modernization plans built on incomplete analysis carry high risk of unexpected failures during execution |
| Kathleen | The people who built legacy applications are often gone — the knowledge required to modernize safely is no longer available from the original authors. | 💼 Business Impact — modernization must proceed without access to the design intent of the systems being changed |
| Deb | Tightly coupled code (monolithic copybooks, shared Db2 plans) carries high risk because the blast radius of changes is not fully known. | 💼 Business Impact — changes to highly coupled code can produce unexpected failures in parts of the system the developer did not know were connected |

---

#### Step 2 — Plan

**Personas involved:** Angie, Kathleen, Greg

| Persona | Pain Point | Category |
|---|---|---|
| Angie | No automated technical debt identification — Angie must manually identify deprecated APIs, monolithic structures, and duplicated logic from code review and expert interviews. | ⏱️ Lost Time — **weeks** identifying technical debt scope across large codebases |
| Greg | Infrastructure implications of modernization decisions are assessed informally — no structured mechanism to evaluate infrastructure impact before the plan is finalized. | 🔒 Skill Gap / Bottleneck — Greg must be consulted for every decision that has infrastructure implications, creating a serial dependency |
| Angie | Modernization prioritization is based on estimated impact and risk — no data-driven prioritization from actual coupling analysis and blast radius quantification. | 💼 Business Impact — without data-driven prioritization, the most dangerous changes may not be scheduled last or given appropriate validation resources |

---

#### Step 3 — Execute Phase

**Personas involved:** Kathleen, Deb, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Code-level changes to tightly coupled legacy code carry high risk because the full runtime call chain is not visible from static analysis. | 💼 Business Impact — changes that appear safe from static analysis can cause runtime failures through dynamic dependencies |
| Deb | Early-tenure developers working on lower-risk modernization phases lack the system context to work safely — they depend on Kathleen's oversight for every non-trivial change. | 🔒 Skill Gap / Bottleneck — Deb cannot work independently on modernization phases without Kathleen's continuous involvement |
| Zach | Infrastructure configuration changes triggered by modernization (CICS definitions, Db2 parameter changes, IMS setup) require Zach's involvement in every phase. | ⏱️ Lost Time — **hours to days per phase** of Zach's time on infrastructure configuration changes |

---

#### Step 4 — Validate Phase

**Personas involved:** Kathleen, Deb

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Phase validation environments are not isolated — testing occurs in shared or production-similar environments, creating risk of interference. | 💼 Business Impact — phase validation results are unreliable if test environment conditions do not match what production will experience |
| Kathleen | Regression test coverage depends on the developer's knowledge of what the phase changed — systematic scope definition is not automated. | ⏱️ Lost Time — **hours per phase** manually defining regression test scope from the change |
| Deb | Test failures on modernization phases require Kathleen's diagnosis — Deb lacks the call chain knowledge to attribute test failures to specific coupling points. | 🔒 Skill Gap / Bottleneck — test failure diagnosis always escalates to Kathleen |

---

#### Step 5 — Promote

**Personas involved:** Kathleen, Zach, Angie

| Persona | Pain Point | Category |
|---|---|---|
| Kathleen | Production promotion requires Zach for any configuration steps — multi-team handoff for every phase promotion, even routine ones. | ⏱️ Lost Time — **hours of multi-team coordination** for every phase production promotion |
| Angie | No mechanism to verify that the promoted phase conforms to the intended architecture — regression from architectural intent can accumulate phase by phase. | 💼 Business Impact — architectural drift accumulates silently across multi-year modernization projects |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Analyze

**Personas involved:** Angie, Kathleen, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Complete application structure, technical debt profile, and dependency map produced in minutes — from Atlas's topology model and ZUnderstand's dynamic call chain analysis. | ⏱️ Time Saving — **weeks to months of manual research → minutes** for a complete modernization analysis |
| Kathleen | Runtime call chain analysis from ZUnderstand shows which programs actually call which others at runtime — not just which are statically configured. Monolithic copybook decomposition planned from actual usage, not from topology assumptions. | 🤖 Atlas AI Insight & Automation — ZUnderstand dynamic call chain analysis is required for safe modernization scope |
| Deb | Atlas surfaces which fields in a shared copybook are actually used by which programs at runtime — Deb knows the safe decomposition boundary before making any changes. | 🆕 New User Capability — Deb independently understands coupling scope for her assigned phases |

---

#### Step 2 — Plan

**Personas involved:** Angie, Greg, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Angie | Prioritized modernization plan generated by Atlas — deprecated API deadlines, coupling risk scores, blast radius quantification — data-driven prioritization rather than expert estimation. | 🤖 Atlas AI Insight & Automation — Atlas generates a prioritized plan from technical debt analysis, coupling scores, and proactive deadline surfacing |
| Greg | Infrastructure implications of each modernization phase reviewed through Atlas — structural changes that affect CICS definitions, Db2 parameters, or IMS setup identified before the phase plan is finalized. | 🆕 New User Capability — Greg reviews infrastructure implications from Atlas's analysis without being consulted ad hoc |

---

#### Step 3 — Execute Phase

**Personas involved:** Kathleen, Deb, Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Full runtime call chain visible before making changes to tightly coupled code — the safety of a change can be confirmed before writing it. | 🤖 Atlas AI Insight & Automation — ZUnderstand dynamic call chain prevents the silent failures that static-only analysis cannot detect |
| Deb | Atlas provides the system context for Deb's phase — she works from Atlas's dependency analysis, not from her own incomplete knowledge. | 🆕 New User Capability — Deb independently executes lower-risk modernization phases from Atlas's structured phase specification |
| Zach | Infrastructure configuration changes for modernization phases are Atlas-orchestrated — Zach authorizes rather than manually executing every configuration step. | ⏱️ Time Saving — **hours to days per phase of Zach manual configuration → authorization gates within Atlas** |

---

#### Step 4 — Validate Phase

**Personas involved:** Kathleen, Deb, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Phase regression testing scoped automatically from the impact analysis — Atlas generates the test targets from the programs and call chains the phase changed. | ⏱️ Time Saving — **hours manual regression scoping → automatic** from the modernization impact analysis |
| Deb | Test failures attributed by Atlas to specific coupling points — Deb can diagnose and fix failures independently rather than escalating to Kathleen for every test failure. | 🆕 New User Capability — Deb independently diagnoses phase test failures using Atlas's attribution |
| Kathleen | Phase validation runs in an isolated environment provisioned by Atlas — consistent, production-representative conditions for every phase validation. | ⏱️ Time Saving — no manual test environment setup per phase; Atlas provisions and configures it |

---

#### Step 5 — Promote

**Personas involved:** Kathleen, Zach, Angie, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Kathleen | Atlas-orchestrated phase promotion — developer initiates, Atlas handles configuration, Zach authorizes infrastructure gates. No multi-team handoff coordination required. | ⏱️ Time Saving — **hours of multi-team coordination → Atlas-orchestrated workflow** |
| Angie | Phase promotion reviewed against architectural specification — Atlas checks whether the promoted code conforms to the intended architecture before production apply. | 🤖 Atlas AI Insight & Automation — architectural conformance check catches architectural drift before it accumulates across phases |

---

> **Overall outcome:** Modernization research phase reduced from weeks/months to minutes. Tightly coupled code can be safely decomposed because the runtime call chain is visible. Each phase validated in isolation before production is touched. Multi-year modernization projects become feasible for organizations that previously treated legacy code as untouchable.

---

## 20. Atlas Units Estimation

> **Pillar:** System Intelligence (primary) + Change Intelligence (supporting)
> **Unit model:** Atlas Action Catalog

### Atlas Units Reference

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
| Functional test suite | 300,000 | 3.0 |
| Unit test (per test) | 15,000 | 0.15 |
| Directional performance test | 500,000 | 5.0 |
| Virtual environment provision (per 10) | — | 1.0 |

### Desired Outcome Flow — Atlas Units per Step

UC-09 is a multi-phase, iterative project like UC-08, but application-focused rather than platform-focused. The key metering drivers are: (1) the application modernization assessment that scopes the work, (2) test generation for each modernized component to validate behavioral equivalence, and (3) environment provisions for isolated validation.

Lifecycle: `Assess Modernization Scope → Identify Target Architecture → Plan Modernization → Provision Test Environment → Implement and Test → Validate Equivalence → Promote → Record`

#### Step 1 — Assess Modernization Scope

| Activity | Tokens | Units |
|---|---|---|
| Application modernization readiness assessment | 250,000 | **2.5** |

**Step 1 subtotal: 2.5 units**

#### Step 2 — Identify Target Architecture

| Activity | Tokens | Units |
|---|---|---|
| Target architecture design document (if standalone) | 250,000 | **2.5** |

**Step 2 subtotal: 0 (if included in Step 1) / 2.5 units (if standalone)**

#### Step 3 — Plan Modernization

| Activity | Tokens | Units |
|---|---|---|
| Phased modernization plan | ~150,000 | **1.5** |

**Step 3 subtotal: 1.5 units**

#### Step 4 — Provision Test Environments

| Activity | Events | Units |
|---|---|---|
| Test environment provision (current state) | 1 provision | **0.1** |
| Test environment provision (target architecture) | 1 provision | **0.1** |

**Step 4 subtotal: 0.2 units**

#### Step 5 — Implement and Test

| Activity | Tokens | Units |
|---|---|---|
| Unit tests for modernized components (per test) | 15,000 | **0.15 per test** |
| Functional test suite for behavioral equivalence | 300,000 | **3.0 per suite** |
| Directional performance test (if modernization changes performance profile) | 500,000 | **5.0** (conditional) |

**Example (CICS-to-REST API modernization, 1 program):**
- 10 unit tests = 1.5 units
- 1 functional test suite = 3.0 units
- 1 directional performance test (conditional) = 5.0 units

**Step 5 subtotal: 4.5 units nominal / 9.5 units with performance test**

#### Step 6 — Validate Equivalence

| Activity | Tokens | Units |
|---|---|---|
| Legacy vs. modernized component equivalence comparison | 300,000 | **3.0** |

**Step 6 subtotal: 3.0 units**

#### Step 7 — Promote

| Activity | Events | Units |
|---|---|---|
| Promotion environment provision per stage | 1 per stage | **0.1 per stage** |

**Step 7 subtotal: 0.1–0.2 units**

#### Step 8 — Record

| Activity | Tokens | Units |
|---|---|---|
| Modernization evidence package | 400,000 | **4.0** |

**Step 8 subtotal: 4.0 units**

### Full Flow Summary — Per Modernization Component

| Step | Activity | Units |
|---|---|---|
| 1 — Assess | Modernization readiness assessment | 2.5 |
| 2 — Target Architecture | Design document (if standalone) | 0–2.5 |
| 3 — Plan | Phased modernization plan | 1.5 |
| 4 — Provision | 2 × test environments | 0.2 |
| 5 — Test | Unit tests + functional test suite | 4.5 |
| 6 — Validate | Equivalence comparison | 3.0 |
| 7 — Promote | Promotion environment (optional) | 0.1 |
| 8 — Record | Modernization evidence package | 4.0 |
| **TOTAL** | **Nominal single-component modernization** | **15.8 units** |
| **TOTAL** | **With performance test + standalone architecture doc** | **23.3 units** |

### Sensitivity Analysis

| Scenario | Adjustment | Multiplier vs. baseline |
|---|---|---|
| Simple API exposure (1 CICS program, no perf test) | Baseline | 1.0× |
| Complex modernization (multi-program, perf-sensitive) | + architecture doc + directional performance test | ~1.5× |
| Portfolio modernization (10 components) | 10× test + equivalence + 1 shared assessment + 1 evidence | ~5–6× |

| Scenario | Adjustment | Unit delta |
|---|---|---|
| Standalone target architecture design document | Separate architecture artifact in addition to readiness assessment | +2.5 |
| Directional performance test added | Performance test asset to validate modernization impact | +5.0 |
| Each additional modernized component in same project | Additional test suite + equivalence comparison + provisions | +6.3 per component |
| Modernization assessment amortized across portfolio | Single assessment shared across all components | −2.5 × (n−1) components |

### Notes and Assumptions

1. UC-09 has the **same test-generation cost structure as UC-07** but adds an equivalence comparison (3.0 units) that UC-07 does not require.
2. The **modernization assessment** (Step 1) is the use-case-unique artifact — shared investment across multiple modernization components. Per-component cost drops when the scoping assessment is shared.
3. **Portfolio modernization** significantly amortizes the assessment cost (Step 1). The dominant per-component costs are test generation and equivalence comparison.

---

## 21. External Product Synergies

### Bob PPZ (Bob for Z Premium Package)

**Summary:** This is the second highest Bob PPZ use case after UC-07. Application modernization is where ZUnderstand's deep code intelligence is most essential — and where the boundary between Atlas's topology-level analysis and Bob PPZ's code-level execution is most consequential. Atlas owns the modernization assessment, phase planning, environment provisioning, validation, and architectural conformance checking. Bob PPZ owns everything inside the code: understanding what the legacy code does, planning the precise change, executing the refactoring or transformation, and returning each phase artifact to Atlas for validation.

#### Tier 1 — Explicit Handoff Points

**Step 1 → Step 3 — Analyze → Execute Phase (Primary Handoff)**

Atlas has produced the complete technical debt profile and the modernization plan with phase boundaries defined. The execution of Phase 1 begins. Atlas passes to Bob PPZ:
- The full phase specification: which programs are in scope, what changes are required, what the dependency boundaries are
- The coupling analysis: which copybooks are shared, which programs must be updated together, what the safe decomposition sequence is
- The ZUnderstand dynamic call chain: which programs actually call which others at runtime
- The blast radius for this phase
- The Atlas validation requirements

In Bob PPZ, ZUnderstand provides:
- **Business rule extraction:** What the legacy code actually does — the embedded business logic that must be preserved through modernization
- **Data flow analysis:** How data moves through the programs being changed, and what downstream programs depend on that data
- **Implementation planning:** The deterministic, accurate sequence of code changes that implements the phase without breaking dependent programs
- **Refactoring and transformation:** For language modernization (COBOL restructuring, API replacement), Bob PPZ executes the changes with deterministic accuracy

**What comes back to Atlas:** Phase-completed code artifacts — modified programs, updated copybooks, restructured JCL.

---

**Step 4 — Validate Phase (return handoff)**

If test failures are attributed to coupling points that the phase change exposed, Atlas returns the failure context to Bob PPZ. Bob PPZ uses ZUnderstand's dynamic call chain data to trace the failure path and identify the precise adjustment. The developer iterates in Bob PPZ and returns the corrected artifact to Atlas for re-validation.

This round-trip loop (Atlas validates → Bob PPZ adjusts → Atlas re-validates) makes phased modernization safe at each phase boundary.

---

**Step 5 — Promote**

Atlas's architectural conformance check is applied to the Bob PPZ-produced artifact. If the conformance check identifies a deviation, Atlas returns the finding to Bob PPZ for a targeted adjustment before production apply.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Analyze (enrichment layer):** When Bob PPZ is installed, the analysis is enriched with:
- **Business rule layer:** For each program in scope, Bob PPZ surfaces the embedded business logic that must be preserved
- **Data dictionary:** ZUnderstand's data dictionary maps the semantic meaning of data fields across the estate
- **Precise execution paths:** ZUnderstand identifies which fields are *actually used* by which programs at runtime — enabling safe decomposition
- **Technical debt quantification:** Bob PPZ provides coupling scores, complexity metrics, and dead code identification

**Step 2 — Plan (enrichment layer):** Phase risk ratings are enriched with Bob PPZ's implementation risk assessment. The prioritized sequence accounts for both topology dependencies (Atlas) and implementation complexity (Bob PPZ).

**Step 4 — Validate Phase (enrichment layer):** Atlas's regression test suite is enriched with code-level execution path coverage — producing test coverage that is both system-scoped (Atlas) and code-precise (Bob PPZ).

> **Overall Bob PPZ relevance:** Very high — the second highest of all use cases. Without ZUnderstand's code-level intelligence, complex COBOL refactoring and copybook decomposition cannot be executed safely. *"Multi-year modernization projects become feasible for organizations that previously treated legacy code as untouchable"* — and Bob PPZ is the capability that makes the code layer tractable.

---

### Concert for Z

**Summary:** Application modernization is a pre-production workflow led entirely by Atlas and Bob PPZ. Concert for Z contributes meaningfully through ZEN runtime data (which enriches the modernization analysis and helps distinguish active from dormant code paths) and through its production incident history (which provides real-world risk context for modernization prioritization).

#### Tier 1 — Explicit Handoff Points

None. Application modernization is initiated by Angie and executed by developers. Concert for Z does not trigger modernization workflows and does not receive an explicit handoff during the pre-production phases.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Analyze:** ZEN from Concert for Z's ZOC infrastructure provides runtime-observed execution evidence:
- **Active vs. dormant code paths:** Programs that appear in the static call graph but have never been observed in ZEN data may represent dead code — safe to remove rather than modernize
- **Execution frequency:** ZEN shows how often each program is called, enabling Atlas to identify high-frequency (higher modernization risk) and low-frequency (lower risk) programs
- **Cross-application runtime dependencies:** ZEN traces cross-application calls that static analysis may miss

**Step 2 — Plan:** Concert for Z's production incident history for the applications in modernization scope provides real-world risk context for prioritization. Applications that have caused or contributed to recent production incidents are a higher modernization priority — their instability is confirmed by production evidence, not just technical debt assessment.

**Step 5 — Promote:** After promotion, Concert for Z's monitoring of the modernized application in production provides the behavioral baseline comparison that confirms the phase worked as intended. If a modernization phase inadvertently degrades production behavior, Concert for Z surfaces it, and Atlas's change record provides the attribution context.

> **Overall Concert for Z relevance:** Moderate for enrichment. ZEN runtime data materially improves the quality of Atlas's modernization analysis by distinguishing active from dormant code paths. No explicit handoff, but the ZEN data relationship is substantive for large, complex application estates.

---

### Terraform Self-Managed for Z

**Summary:** Application modernization has direct touchpoints with Terraform in two synergy scenarios. Synergy Use Case 2 — On-Demand Test Environment Provisioning — is relevant because modernization validation requires both a legacy environment (current state) and a modernized environment (target architecture) provisioned simultaneously for equivalence testing. Terraform manages the lifecycle of both.

#### Tier 1 — Explicit Handoff Points

**Step 4 — Provision Test Environments (Legacy and Target)**

Equivalence testing requires two simultaneous test environments: one at the current (legacy) architecture and one at the target (modernized) architecture. Atlas passes two infrastructure specifications to Terraform:
1. A legacy environment specification derived from the current production LPAR state
2. A target environment specification describing the infrastructure required for the modernized architecture

Terraform provisions both environments in isolated workspaces, enforces the workspace boundary between them, and manages their lifecycle through the modernization test cycle.

**What comes back to Atlas:** Both environments provisioned and confirmed. Atlas deploys the legacy application stack to the legacy environment and the modernized application to the target environment, then runs functional and equivalence tests across both.

---

**Step 7 — Promote**

In environments where the modernization target is a new infrastructure type (e.g., a LinuxONE VM for containerized components), Terraform provisions the target infrastructure for each promotion stage, enforces the promotion lifecycle, and produces the infrastructure apply log for the promotion record.

#### Tier 2 — Enrichment Touchpoints

**Step 1 — Assess Modernization Scope:** Terraform's workspace structure reveals which LPARs and VMs are currently Terraform-managed. Components running on Terraform-managed infrastructure have a cleaner path to modernization (infrastructure changes are declarative, versioned, and reversible) — the modernization assessment can factor in Terraform coverage as a positive readiness indicator.

**Step 6 — Validate Equivalence:** When both environments are Terraform-provisioned from their respective declarations, the infrastructure layer is controlled and reproducible — eliminating infrastructure variance as a confounding factor. Comparison results are more trustworthy because the infrastructure baseline is known-identical between test runs.

**Step 8 — Record:** The modernization evidence package is enriched by Terraform's workspace history: the lifecycle of the legacy environment (provisioned, used, decommissioned), the lifecycle of the target environment (provisioned, validated, promoted), and the infrastructure specifications of both.

> **Overall Terraform relevance:** Moderate-to-high. The dual-environment provisioning for equivalence testing is a strong and direct integration point. In organizations modernizing toward LinuxONE containers or VM-based architectures, Terraform's LinuxONE provisioning capability makes it a required component of the modernization infrastructure pipeline.
