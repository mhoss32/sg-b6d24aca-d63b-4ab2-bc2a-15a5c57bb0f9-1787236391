# UC-06: Patch Management — Composite Reference

> **New UC number:** UC-06 (merged from old UC-02 Patch Management + old UC-01 Vulnerability Remediation)
> **Sources consolidated:** Spec v1.4 (GitHub), Pain & Wows (old UC-02 primary + old UC-01 for S2), Units (old UC-02 primary + old UC-01 for S2), Bob PPZ (old UC-02), Concert for Z (old UC-02), Terraform (old UC-02)
>
> **Merge note:** Old UC-01 (Vulnerability Remediation) was retired as a standalone use case and absorbed into this spec. Scenario S2 (Security PTF Application) represents the CVE/FIXCAT-driven security remediation path formerly covered by UC-01. The blast radius assessment and Sage persona engagement from UC-01 are now S2 entry points within this use case.

---

## Part 1 — Use Case Specification

*Version 1.4 | Owner: Product Management | Last updated: 2026-Q4*

### Executive Summary

IBM Z organizations spend hours on manual patch impact analysis and often skip test validation due to time pressure — leaving production as the de facto test environment. Atlas automates impact analysis, generates sequenced test plans, and orchestrates patch execution with a full audit trail, turning the highest-risk change type on Z into a guided, repeatable workflow. The result is faster patch cycles, fewer PTF-related outages, and change traceability that satisfies audit requirements without manual assembly.

### Overview

Patch Management is the highest-frequency change type on IBM Z. Organizations apply PTFs, middleware updates, and software patches on scheduled maintenance cycles and in response to security advisories — often without complete visibility into what will break, what must be sequenced, or whether the change is safe to promote to production.

**Patch scope covered at GA Dec 2026:**

| Patch Type | Examples | GA Status |
|---|---|---|
| **z/OS PTFs (OS)** | RSU, HIPER, PE, FIXCAT-flagged PTFs | ✅ GA |
| **Middleware (MW)** | CICS, Db2, MQ, IMS patches | ✅ GA |
| **Software (SW)** | IBM products, 3rd-party ISV software that publishes fixes | ✅ GA |
| **Firmware** | Hardware microcode, I/O firmware | ❌ Not GA (Post-GA, date TBD — requires Project Gravity) |

### Roadmap Status

| # | Scenario | Origin | Status | Target |
|---|---|---|---|---|
| S1 | Routine PTF Maintenance (z/OS PTFs) | UC-06 | **Current** | GA Dec 2026 |
| S2 | Security PTF Application (CVE/FIXCAT-driven) | Merged from UC-01 | **Current (conditional)** | GA Dec 2026 (if Z Security Portal available); H1 2027 otherwise |
| S3 | Middleware and Software Patch Orchestration | UC-06 | **Current** | GA Dec 2026 |
| S4 | Patch Rollback After Failed Validation | UC-06 | **Planned** | H1 2027 |
| S5 | Firmware Patch Orchestration | UC-06 | **Planned (date TBD)** | Post-GA |

**S2 delivery gate note:** S2 requires RBAC permissions from the Z Security Portal for the security advisory feed integration. All other steps are identical to S1. When the Z Security Portal integration is confirmed, S2 is fully enabled at GA without structural change.

### Primary Personas

- **Zach** — z/OS Systems Programmer (primary): initiates, executes, owns overall change outcome
- **Sage** — Security Administrator: tracks open CVEs and security advisories; owns the S2 security posture conversation; elevated from merged UC-01
- **Stan** — Subsystem SME (CICS, Db2, MQ, IMS archetype): subject-matter expert for S3 middleware patches; reviews and approves subsystem-specific impact analysis
- **Alice** — z/OS Systems Programmer (mid-level): executes delegated patch work
- **Quinn** — IT Operations Manager: reviews risk assessment, approves production promotion

### Pillar Alignment

| Pillar | Role |
|---|---|
| **Change Intelligence** | **Primary** — this is the canonical Change Intelligence use case: impact analysis, test plan, provisioning, orchestration, rollback |
| **System Intelligence** | **Foundational** — living topology model is the data source for all impact analysis; PTF inventory |
| **Predictive Intelligence** | **Supporting (future)** — post-apply monitoring, drift detection after patch, proactive PTF gap alerts |

### Lifecycle

```
Detect → Analyze → Plan → Provision → Deploy → Validate → Decide → Execute → Govern
```

| Phase | Primary Actor | Atlas Role |
|---|---|---|
| **Detect** | Atlas (proactive) or User | Joins PTF inventory with ibm.com FIXCAT; surfaces gaps with context |
| **Analyze** | Atlas | Topology-aware impact analysis; prerequisite chain resolution; blast radius calculation |
| **Plan** | Atlas | AI-generated plan anchored to actual environment topology |
| **Provision** | User (GA) / Atlas (H1 2027) | DIY engine with Atlas configuration input at GA; Atlas-native at H1 2027 |
| **Deploy** | Atlas (Application Deployment Engine) | Deploys application components from topology into provisioned environment |
| **Validate** | Atlas | Automated test execution; failure attribution; CSD update generation when needed |
| **Decide** | Zach (final) / Stan (subsystem S3 sign-off) | Governance gate — no production action without explicit user approval |
| **Execute** | Atlas (orchestrates) / User (authorizes) | Transparent step-by-step execution with reasoning visible |
| **Govern** | Atlas | Complete traceability from detection through production apply; no manual assembly |

⚠️ **Monoplex constraint (GA):** Test environments are restricted to monoplex configurations at GA. Customer production environments may be sysplex; Atlas provisions a monoplex L2 virtual LPAR for testing regardless.

### Scenario Catalog

| # | Scenario | Status | Delivery Gate |
|---|---|---|---|
| S1 | Routine PTF Maintenance (z/OS PTFs) | Current — GA Dec 2026 | None |
| S2 | Security PTF Application (CVE/FIXCAT-driven) | Current (conditional) — GA Dec 2026 | ⚠️ Z Security Portal RBAC |
| S3 | Middleware and Software Patch Orchestration | Current — GA Dec 2026 | MW/SW patch orchestration capability |
| S4 | Patch Rollback After Failed Validation | Planned — H1 2027 | Atlas-native LPAR provisioning |
| S5 | Firmware Patch Orchestration | Planned — Post-GA, date TBD | Project Gravity integration |

### AI Differentiation

- **Topology-aware impact analysis** — specific, accurate blast radius for each PTF on each environment; not a generic risk flag
- **Prerequisite chain resolution** — automatically resolves co-requisite and prerequisite chains; eliminates a primary cause of PTF-related outages
- **AI-generated test plan** — scoped to the specific change and environment, not a generic checklist
- **Failure attribution during test** — correlates test failures to specific PTF or configuration interaction; generates required fix
- **Natural language change interface** — entire workflow in conversation; no ISPF, no SMP/E commands
- **Continuous proactive detection** — surfaces PTF gaps before they become incidents

### Related Use Cases

- UC-01 (Audit and Compliance): patch history is compliance evidence; missing security PTFs are audit findings
- UC-04 (Change Readiness): health check findings frequently surface PTF gaps; FIXCAT gaps trigger S2 path
- UC-07 (Application Change Management): shares test planning and provisioning infrastructure
- UC-08 (Platform Upgrade and Migration): platform upgrades include PTF orchestration as a component
- UC-10 (Environment Parity): if a PTF applies to production but not QA/DR, UC-10 drift detection surfaces it
- UC-05 (Change Governance): UC-06 generates the evidence that UC-05 governs

---

## Part 2 — Pain & Wows Flow Analysis

> **Sources:**
> - **S1 (Routine PTF Maintenance):** `use-case-pain-wows/UC-02-patch-management.md` (old UC-02)
> - **S2 (Security PTF Application):** `use-case-pain-wows/UC-01-vulnerability-remediation.md` (old UC-01, merged in)

### S1 — Routine PTF Maintenance: As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Identify applicable PTFs** | Zach downloads the latest RSU tape list. He manually cross-references it with the SMP/E GENERATE output for each LPAR. This takes half a day for a 4-LPAR environment. | Atlas queries the PTF inventory across all connected LPARs and cross-references with ibm.com RSU and FIXCAT data. It surfaces: 12 applicable PTFs, 2 of which are FIXCAT SEC/INT, 1 with a PE flag that has been superseded. |
| **2 — Assess impact** | Zach manually reviews each PTF's ++ HOLD information and tries to identify which subsystems and applications might be affected. He misses a dependency because he does not routinely manage the MQ configuration on PROD3. | Atlas performs topology-aware impact analysis. For each PTF in the batch, it maps affected subsystems, applications, and transactions. It identifies that PTF UI89234 affects the CICS interface to MQ — touching 3 CICS transactions and 14 downstream batch jobs. |
| **3 — Resolve prerequisites** | Zach runs the SMP/E REPORT CALLLIBS command and manually reads the prerequisite output. Two PTFs have co-requisites not in the batch. He adds them but introduces a new prerequisite. He resolves this after 90 minutes. | Atlas resolves the full prerequisite chain automatically. It identifies the 2 missing co-requisites, adds them, re-resolves the expanded batch, and presents the final ordered apply sequence — no SMP/E dialog required. |
| **4 — Generate test plan** | Zach writes a test checklist based on what he knows. He tests 7 of the 14 affected batch jobs because he does not have time for the others. The remaining 7 go untested. | Atlas generates a test plan covering all 14 affected batch jobs plus the 3 CICS transactions. The plan includes the environment specification (which CICS definitions and Db2 tables are needed), test scenarios, and expected pass criteria. |
| **5 — Provision test environment** | Zach submits a ticket to provision a test LPAR. It is ready 2 days later. The maintenance window is already approaching. | Atlas provisions the monoplex L2 virtual LPAR in the background from the Atlas configuration specification. The Application Deployment Engine deploys the application components. By the time Zach is ready to test, the environment is waiting. |
| **6 — Validate** | Zach runs tests manually. One batch job fails. He spends 3 hours tracing it to a missing CSD definition that the PTF requires. He manually creates the update and retests. | Atlas applies the PTFs to the test environment and runs the test suite. One batch job fails. Atlas attributes the failure: "PTF UI89234 requires a new CICS CSD MAPSET definition for the MXFX interface. This definition is missing from the test environment. Generating the required CSD update now." |
| **7 — Execute in production** | Zach applies the PTF batch during the maintenance window, manually tracking each apply step. He loses track of where he is at 2:00 AM and has to reconstruct his progress from SYSLOG. | Atlas orchestrates the production apply: sequenced LPAR order, progress visible in real time, each step logged automatically. When Zach authorizes the first LPAR, Atlas proceeds through the sequence and surfaces completion status without requiring manual tracking. |
| **8 — Generate change record** | After the maintenance window, Zach writes a change record from memory. He forgets two of the PTF numbers and the exact completion time. The record is rejected by ServiceNow for missing fields. | Atlas generates the complete change record automatically: all PTFs applied, sequenced apply log with timestamps, test results attached, authorization chain captured. The record is complete and consistent without any manual assembly. |

### S2 — Security PTF Application (merged from old UC-01): As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Receive CVE advisory** | Sage receives an IBM security advisory for a critical z/OS vulnerability. She emails Zach and the SMP/E team asking how many systems are exposed. Three days later, she has partial answers from two teams. | Sage opens Atlas and says "we have a critical security advisory for IBM z/OS. Which of our LPARs are exposed?" Atlas queries the PTF inventory across all connected LPARs simultaneously. Within 10 minutes: "3 of 4 production LPARs are exposed. DR1 is not exposed. DR2 data is stale — assessment pending." |
| **2 — Assess blast radius** | Zach knows the PTF affects CICS but does not know which CICS regions, which applications, or which downstream services are in the blast radius of an exploit. He estimates "probably the payment processing system" but cannot confirm. | Atlas traverses the topology from the vulnerable CICS component. Blast radius: 4 CICS regions, 12 CICS transactions, 8 downstream Db2 tablespaces, 2 z/OS Connect REST API endpoints, and 3 external partner integrations. "If this vulnerability is exploited via the IPIC connection, these are the systems at direct risk." |
| **3 — Fast-track remediation plan** | Zach plans the patch apply mentally. He is not sure whether to patch PROD1 or PROD4 first — they share a Db2 coupling facility and he is not confident about the sequencing. He decides to go alphabetical and hopes for the right order. | Atlas generates a sequenced remediation plan accounting for the shared coupling facility: "Apply to PROD1 first (Db2 coupling facility primary), then PROD4, PROD3 last (coupling facility peer). Patching PROD4 before PROD1 would temporarily break Db2 shared data access." |
| **4 — Execute and validate** | Zach applies the PTF to PROD1 in the maintenance window. He does not have time to test it thoroughly. He hopes it works. | Atlas applies the security PTF to a provisioned test environment first. Validates that all 12 CICS transactions still complete correctly. Results: 11 pass, 1 fails due to a CSD update required by the PTF — Atlas generates the CSD update, re-tests, confirms pass. Production apply follows with the CSD update pre-staged. |
| **5 — Report to CISO** | Sage needs to brief the CISO on the status. She does not know the exact exposure scope or the remediation timeline. She writes a vague email saying "we are working on it." | Sage asks Atlas "prepare a security status briefing on the CISO advisory." Atlas generates: 3 production LPARs exposed / 1 patched / 2 in-progress / 1 DR stale. Blast radius scoped to specific systems. Estimated completion: next maintenance window. Threat vector: IPIC network path requires network access — external threat limited by network controls. |

### Key Pain Points (Both Scenarios)

- Multi-day wait for exposure assessment across the estate
- Manual prerequisite chain resolution that introduces sequencing errors
- Test coverage limited by time pressure — untested changes reach production
- Change records assembled from memory after the fact — incomplete and inconsistent
- S2: CISO-level security briefing impossible without complete data

### Key Wow Moments (Both Scenarios)

- Blast radius traversal: "these are the 14 applications at direct risk" (S2) or "these are the 14 batch jobs affected" (S1)
- Prerequisite chain resolved automatically — no SMP/E dialog
- Test failure attributed to specific missing CSD definition with automated fix generation
- Complete change record with no manual assembly

---

## Part 3 — Atlas Units Estimation

> **Sources:**
> - **S1 baseline:** `use-case-units/UC-02-patch-management-units.md` (old UC-02)
> - **S2 additions:** `use-case-units/UC-01-vulnerability-remediation-units.md` (old UC-01, merged in)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Test Cycle** | Provision + deploy + validate for a single environment | 30–60 units |
| **Remediation** | Plan + test + apply for a single LPAR | 40–70 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |

### Per-Step Unit Estimates — S1 (Routine PTF Maintenance)

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — PTF identification | Analysis | 8 | PTF inventory + FIXCAT classification join |
| 2 — Impact analysis | Analysis | 12 | Topology traversal across affected subsystems |
| 3 — Prerequisite chain resolution | Analysis | 5 | SMP/E prerequisite chain with auto-resolution |
| 4 — Test plan generation | Analysis | 8 | Topology-scoped test scenario generation |
| 5 — Test environment provisioning + deployment | Test Cycle | 40 | L2 virtual LPAR + Application Deployment Engine |
| 6 — Validate (test execution + failure resolution) | Test Cycle | 20–35 | Base test execution; +15 per test failure requiring fix |
| 7 — Production apply (per LPAR) | Remediation | 15 | Sequenced apply with real-time progress |
| 8 — Change record generation | Artifact | 12 | Complete change artifact with test results attached |

### Per-Step Unit Additions — S2 (Security PTF Application)

S2 shares the S1 flow from Step 3 onward. Additional units for the S2-specific steps:

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Cross-LPAR exposure assessment | Analysis | 10 | Simultaneous query across all connected LPARs |
| 2 — Blast radius traversal | Analysis | 15 | Full downstream dependency map via topology |
| 5 — CISO security briefing artifact | Artifact | 15 | Executive-level status report |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — Routine PTF Maintenance (4 LPARs, no failures) | 130–170 | Full cycle including test environment |
| S1 — Routine PTF Maintenance (with 2 test failures) | 160–220 | +30 per test failure requiring CSD/config fix |
| S2 — Security PTF Application (3 LPARs) | 170–230 | Adds exposure assessment, blast radius, CISO report |
| S3 — Middleware Patch (single subsystem) | 110–160 | Similar to S1 but subsystem-specific; Stan sign-off step |
| S2 blast radius only (no remediation) | 30–45 | Exposure assessment + blast radius traversal only |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Number of LPARs in scope | +12–18 units per additional LPAR (provision + apply) |
| Number of test failures requiring fixes | +15–25 units per failure (attribution + fix + retest) |
| Number of PTFs in batch | +3–5 units per 10 additional PTFs for prerequisite chain expansion |
| ZUnderstand topology availability | Without ZUnderstand: blast radius limited to direct deps; saves ~8 units but reduces fidelity |
| Middleware patch (Stan sign-off required) | +5 units for Stan review and sign-off workflow |

### What Is Not Metered

- IZSAM PTF inventory data (stored in Atlas topology between discovery cycles)
- Continuous proactive PTF currency monitoring between patch cycles
- PE flag detection during plan generation (included in prerequisite resolution)
- Rollback plan generation (generated as part of the plan phase; no additional charge)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-02-patch-management-bob-ppz.md`

**Overall Bob PPZ relevance: Low-to-moderate. Tier 1 at Steps 6 (validate) and 7 (decide — middleware patches); Tier 2 at Steps 2 and 3.**

Bob PPZ enters when a patch introduces a breaking API or behavioral change requiring a compensating application code fix. In routine PTF maintenance cycles with no application-affecting API changes, Atlas handles the full workflow. The enrichment is most valuable for major middleware version patches (CICS TS, Db2 for z/OS) where subsystem API behavior changes are common.

**Tier 1 — Explicit Handoff Points:**

**Step 6 — Validate (Test Failure Attributed to Application Code):**
When Atlas's test reveals a CICS API behavior change introduced by a PTF that a COBOL program was relying on, Atlas identifies the specific program, call path, and the nature of the incompatibility. Atlas directs the user to Bob PPZ with the failure attribution — the affected program, the subsystem behavior change, and the test scenario that failed. Bob PPZ uses ZUnderstand to trace the execution path through the affected program and generate the precise code modification required.

**What comes back:** A corrected code artifact. Atlas re-runs the relevant test scenarios, confirms pass, and incorporates the code fix into the production promotion package.

**Step 7 — Decide (Middleware Patches — Open Code Actions):**
For middleware patches (CICS, Db2, MQ), if test results indicate application code changes are required before production promotion, those items appear as open actions in the decision artifact. Atlas directs the responsible developer to Bob PPZ with full context. Resolved items are returned to Atlas before Quinn's production promotion authorization.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Analyze:**
When Bob PPZ is installed, the application layer of the impact analysis is enriched with code-level metadata: for a CICS PTF changing EXEC CICS API behavior, the enriched analysis identifies not just which CICS regions are affected but which COBOL programs use the specific API calls that the PTF modifies.

**Step 3 — Plan:**
Test scenarios are enriched with code-level test targets — specific transactions, program entry points, and data paths that exercise the exact code constructs affected by the patch.

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-02-patch-management-concert4z.md`

**Overall Concert for Z relevance: High — one of the primary examples of the Concert for Z → Atlas sequential workflow. Tier 1 at Steps 1 (Concert for Z → Atlas) and 9 (post-apply monitoring); Tier 2 at Steps 2 and 6.**

Concert for Z's Risk Management module detects missing critical/HIPER PTFs and initiates the change; Atlas orchestrates the full validation workflow. Post-apply, Concert for Z's production monitoring detects behavioral regressions.

**Tier 1 — Explicit Handoff Points:**

**Step 1 — Detect (Concert for Z → Atlas):**
Concert for Z's Risk Management module — powered by IZSAM — has identified missing critical or HIPER PTFs across the z/OS estate. It computes blast radius across z/OS environments, flags the operational risk, and can auto-initiate a change ticket or invoke an Ansible agent workflow for a targeted known fix. The initiated change passes to Atlas, which applies full change intelligence: querying all connected LPARs for current PTF state, resolving prerequisite chains, mapping impact, and generating a sequenced patch plan.

**What comes back:** After Atlas completes the full patch cycle, Concert for Z's Risk Management module sees the operational risk as resolved and can use the Atlas change evidence in its operational record.

**Step 9 — Govern (Concert for Z Post-Apply Monitoring):**
Following patch apply, Concert for Z's Observe and Optimize modules monitor for post-patch behavioral regressions. If Concert for Z detects a behavioral anomaly correlating with the patch apply timestamp, it surfaces this as an operational finding. Atlas's change record provides Concert for Z with the exact change context. If Concert for Z identifies a post-patch regression, it triggers a new Atlas workflow: investigate the regression, determine whether rollback is warranted.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Analyze:**
Concert for Z's production performance baselines provide behavioral ground truth for the pre-patch environment, improving the specificity of Atlas's pre/post behavioral comparison during validation.

**Step 6 — Validate:**
Concert for Z's ZEN data enriches test coverage by identifying which production transaction flows are most active — ensuring Atlas's validation prioritizes the highest-traffic paths.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-02-patch-management-terraform.md`

**Overall Terraform relevance: Moderate. Tier 1 at Steps 2 and 4; Tier 2 at Steps 3, 6, and 8.**

Terraform's contribution follows the infrastructure-gate pattern: confirming LPAR state before the maintenance window opens, providing infrastructure isolation during the patch cycle, and recording infrastructure-layer state changes. Its value compounds over time as each patch cycle adds another versioned infrastructure state record to the audit trail.

**Tier 1 — Explicit Handoff Points:**

**Step 2 — Assess PTF Readiness:**
As part of the readiness gate, Atlas directs the team to confirm that each target LPAR is in its declared infrastructure state. The team runs `terraform plan` against each LPAR workspace to surface any infrastructure drift before the maintenance window begins.

**What comes back:** Infrastructure parity confirmation (or a list of drift items that must be resolved before patching can proceed). Atlas incorporates this into the readiness assessment output.

**Step 4 — Provision + Test:**
Atlas generates the infrastructure specification for the test environment. Terraform creates the test LPAR resources from this specification in environments where it manages LPAR and VM lifecycle.

**What comes back:** A Terraform-provisioned test environment with infrastructure matching the production declaration. Atlas deploys the application configuration overlay and runs the functional test suite.

**Tier 2 — Enrichment Touchpoints:**

**Step 3 — Plan the Patch Cycle:**
Terraform's state file provides LPAR-level infrastructure metadata that Atlas uses to assign LPARs to maintenance window slots, preventing a production-workspace LPAR from being accidentally scheduled with a test-workspace LPAR.

**Step 6 — Execute:**
Terraform's policy-as-code enforcement can prevent non-patch infrastructure changes from being made to LPARs while a maintenance window is active — passively eliminating a category of mid-window conflicts.

**Step 8 — Record:**
Terraform's versioned state file produces an automatic before/after infrastructure snapshot for every LPAR touched during the patch cycle — complementing the Atlas-generated evidence package with a complete dual-layer audit trail.
