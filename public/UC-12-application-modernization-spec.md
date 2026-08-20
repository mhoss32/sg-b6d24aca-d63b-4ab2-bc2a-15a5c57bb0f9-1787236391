# UC-12: Application Modernization
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

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

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **System Intelligence** | **Primary (Analyze phase).** Technical debt identification, deprecated API mapping, monolithic structure analysis, dependency mapping across 300+ programs — all System Intelligence. The topology model and ZUnderstand call chain data are the combined source for modernization scope. | GA Dec 2026 (static topology); H1 2027 (ZUnderstand code-level analysis — required for full modernization scope) |
| **Change Intelligence** | **Primary (Execute phase).** Code change generation, phased execution, isolated environment testing, and production validation are Change Intelligence capabilities. For modernization, Change Intelligence is the execution engine for the plan that System Intelligence produces. | H1 2027 (limited access); H2 2027 (full developer-native workflows) |
| **Predictive Intelligence** | **Supporting throughout.** Proactive risk surfacing (deprecated API approaching end-of-support deadline), blast radius quantification for high-coupling structures, and post-change behavioral validation are Predictive Intelligence behaviors. | Partial at H1 2027; full H2 2027 |

**Critical dependency — ZUnderstand:** Application modernization scope is only fully visible with ZUnderstand's dynamic call chain analysis. Static Config-as-Code topology shows what is configured; ZUnderstand shows what actually calls what at runtime. For a 47-program monolithic copybook decomposition, knowing which programs actually use which fields at runtime (not just which programs reference the copybook) is the difference between a correct decomposition plan and one that causes runtime failures. ZUnderstand is required for this use case at full fidelity.

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| Deprecated API Remediation | **Planned** | H1 2027 | ZUnderstand for dynamic call chain analysis; Atlas Test SKU for per-program validation | H1 2027 |
| Monolith Decomposition Planning | **Planned** | H1 2027 | ZUnderstand for field-usage analysis in monolithic structures; static topology for initial coupling map | H1 2027 |
| Application Modernization Assessment | **Planned** | H1 2027 | ZUnderstand + Config-as-Code combined for full assessment | H1 2027 |
| API Modernization (z/OS to REST) | **Planned** | H2 2027 | z/OS Connect topology + ZUnderstand for transaction-to-REST mapping; Atlas Test for API validation | H2 2027 |

**Capability dependency notes:**

- All four scenarios require ZUnderstand (H1 2027) at minimum. Static Config-as-Code topology is insufficient for code-level modernization analysis — it shows which programs reference the copybook but not which fields they actually use, and it cannot reveal dynamic dispatch patterns or runtime call chains.
- The Deprecated API Remediation scenario is the closest to available capability at H1 2027. Kyle's uc3 shows Atlas identifying 12 programs using deprecated Db2 APIs with 34 distinct calls and mapping each to its modern equivalent — this is a concrete, demonstrable scenario at H1 2027.
- Monolith Decomposition is more complex because it requires field-usage analysis across 47 programs to determine which fields can be separated. Kyle's ORDCOMM01 scenario (Step 7) is the canonical example — 312 fields, of which 89 are used actively, 134 used by fewer than 3 programs, and 89 unused. This analysis requires ZUnderstand's runtime call chain data.
- API Modernization requires z/OS Connect topology integration and the ability to map legacy CICS transactions to new REST API endpoints — this is an H2 2027 capability.

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
| **Risk** | Static topology (Config-as-Code only) produces an incomplete modernization scope — programs that dynamically link or dispatch to shared code may not appear in the static map. This is the most dangerous source of missed blast radius in modernization scenarios. ZUnderstand mitigates this but requires H1 2027 capability. |
| **Risk** | Automated code remediation (e.g., deprecated API replacement) may not correctly handle all edge cases — particularly for programs with non-standard API usage patterns. Human review of Atlas-generated code changes is required before production promotion. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| Deprecated API Remediation | User identifies that applications use APIs scheduled for deprecation; requests a remediation plan | Planned | H1 2027 | UX Flow, Chat Exchange, Screen designs | [`design/flows/uc3-application-modernization.md`](../design/flows/uc3-application-modernization.md) Steps 1–6 |
| Monolith Decomposition Planning | User identifies a high-risk monolithic shared structure and wants to decompose it safely | Planned | H1 2027 | UX Flow, Chat Exchange | [`design/flows/uc3-application-modernization.md`](../design/flows/uc3-application-modernization.md) Steps 7–8 |
| Application Modernization Assessment | Architect requests a full assessment of modernization opportunities across an application | Planned | H1 2027 | UX Flow, Chat Exchange | TBD |
| API Modernization (z/OS to REST) | Application functionality is being exposed as REST APIs via z/OS Connect; user needs to validate the new API endpoints against the underlying CICS transactions | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |

**Design decisions for this scenario catalog:**

- Kyle's uc3 covers Deprecated API Remediation and Monolith Decomposition in one script, which is appropriate for a demo but represents two distinct scenarios with different risk profiles and different stakeholders. They are kept separate here because Angie's decision to decompose ORDCOMM01 (Steps 7–8) is a materially higher-risk, longer-horizon decision than the deprecated API cleanup (Steps 1–6).
- The Predictive Intelligence moment in Step 3 of Kyle's uc3 (Atlas proactively warns that the 12 deprecated API programs will begin failing in 4 months based on the upgrade timeline) is the use case's strongest demo moment. It should be preserved in demo planning.

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
| Deprecated API remediation completion rate | Percentage of identified deprecated API usages remediated before end-of-support deadline | Typically 50–70% (some always missed until failures occur) | 95%+ identified and planned before deadline |
| Time per modernization phase | Average calendar time to complete one modernization phase (plan to production promotion) | Depends on scope; estimated 4–8 weeks per phase manually | Under 2 weeks per phase with Atlas |

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
| UC-05: Application Discovery and Dependency Analysis | UC-12 is a special case of UC-05 applied to legacy modernization. The same topology traversal that UC-05 uses for blast radius analysis is used in UC-12 for modernization scope assessment. UC-12 adds the code-level technical debt analysis layer on top of UC-05's dependency map. |
| UC-07: Application Change Management | Individual code changes within a modernization project are executed as UC-07 workflows. UC-12 owns the modernization strategy and phasing; UC-07 owns each individual change execution cycle within the phases. |
| UC-08: Platform Upgrade and Migration | Platform upgrades (z/OS version upgrades, Db2 version upgrades) frequently trigger modernization work — deprecated interfaces removed in the new version force application code changes. UC-08 identifies the modernization scope driven by the upgrade; UC-12 executes it. |
| UC-13: Regulatory Change Response | Regulatory requirements (e.g., encryption mandates, API access controls) sometimes require application-level code changes — particularly for applications that directly process regulated data. UC-13 identifies the regulatory gap; UC-12 executes the application modernization required to close it. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **IBM Watsonx Code Assistant for Z integration** | H2 2027 | Watsonx Code Assistant for Z generates refactored code from Atlas's modernization plan — Atlas provides the context (what to change and why), Watsonx Code Assistant for Z generates the code transformation. The combination is stronger than either alone. |
| **Continuous technical debt tracking** | H2 2027 | Atlas maintains a rolling technical debt score per application — tracking deprecated API exposure, coupling risk, and test coverage as ongoing metrics rather than project-time assessments. Changes to the score trigger alerts. |
| **Agentic deprecated API remediation** | H2 2027 | For well-understood deprecated API patterns with documented modern equivalents and automated test coverage, Atlas proposes and executes the full remediation cycle — identify, plan, code, test, promote — with human code review and production authorization as the only gates. |
| **Cross-application modernization sequencing** | 2028+ | For organizations with multiple interdependent applications undergoing modernization simultaneously, Atlas reasons about the cross-application sequencing — which application must be modernized before which other, and how to avoid creating new dependencies during the modernization period. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-12](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`design/flows/uc3-application-modernization.md`](../design/flows/uc3-application-modernization.md) | Complete 8-step Order Management modernization scenario; deprecated Db2 API remediation (Steps 1–6); ORDCOMM01 monolith decomposition analysis (Steps 7–8); pillar activation summary |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 3 "Application modernization support"; Phase 3 "Application modernization topology" |
| [`Atlas_high level exec Roadmap_working_Interpretation.md`](../Atlas_high%20level%20exec%20Roadmap_working_Interpretation.md) | GA+1 use case "Application Modernization" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Angie, Kathleen, Deb, Greg |
