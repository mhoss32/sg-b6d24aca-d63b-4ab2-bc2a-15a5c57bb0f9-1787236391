# UC-03: Regulatory Change Response — Composite Reference

> **New UC number:** UC-03 (formerly old UC-13)
> **Sources consolidated:** Spec (GitHub), Pain & Wows (old UC-13), Units (old UC-13), Bob PPZ, Concert for Z, Terraform

---

## Part 1 — Use Case Specification

*Version 1.0 | Owner: Product Management | Last updated: August 2026*

### Executive Summary

A new regulatory requirement arrives with a 90-day compliance deadline. Today, the first month of that window is spent figuring out what you even have — inventorying regulated data, mapping access controls, and identifying gaps across an environment that no single tool fully describes. Atlas compresses that discovery phase from weeks to hours, so the compliance team can spend the deadline doing remediation, not investigation. It also closes a gap that no competitor addresses: post-remediation monitoring that catches new regulated data or configurations that fall into scope after the initial work is done.

### Overview

Regulatory Change Response covers the full arc from "new regulation announced" to "evidence package delivered to regulators": discovering the regulated scope across the entire z/OS estate, identifying access control and encryption gaps, executing remediation, and producing compliance evidence. It is distinct from Audit and Compliance (UC-01), which is about evidencing current state for periodic audits. Regulatory Change Response is about changing current state to meet a new requirement — the difference between reporting and remediating.

### Roadmap Status

| Scenario | Status | Target Date |
|---|---|---|
| Data Privacy Regulation Implementation | **Current** | GA Dec 2026 |
| Security Controls Mandate | **Current** | GA Dec 2026 |
| Compliance Evidence Package Generation | **Current** | GA Dec 2026 |
| Continuous Regulatory Posture Monitoring | **Current (partial)** | GA Dec 2026 partial; H2 2027 full |

### Primary Personas

- **Sage** — Security Administrator (primary): owns the regulatory response project, drives remediation
- **Derek** — Compliance Evidence Provider: documents compliance state, assembles evidence package
- **Lupita** — Key Management and Cryptography Services: manages encryption workstream
- **Zach** — z/OS Systems Programmer: executes system-level remediations
- **Quinn** — IT Operations Manager: monitors remediation workstream for operational impact

### Pillar Alignment

| Pillar | Role |
|---|---|
| **System Intelligence** | **Primary (Discover and Assess)** — regulated data inventory, access control gap analysis |
| **Change Intelligence** | **Primary (Execute)** — remediation sequencing, RACF restriction execution, encryption enablement |
| **Predictive Intelligence** | **Supporting (Monitor)** — post-remediation monitoring for new regulated data |

### Lifecycle

```
Scope → Inventory → Analyze → Sequence → Execute → Verify → Monitor → Evidence
```

### Scenario Catalog

| # | Scenario | Status |
|---|---|---|
| S1 | Data Privacy Regulation Implementation | Current — GA Dec 2026 |
| S2 | Security Controls Mandate | Current — GA Dec 2026 |
| S3 | Compliance Evidence Package Generation | Current — GA Dec 2026 |
| S4 | Continuous Regulatory Posture Monitoring | Current (partial) — GA Dec 2026 |

### AI Differentiation

- **Multi-source regulated data inventory** — discovers regulated data across datasets, Db2 tables, IMS segments, VSAM files in a single pass
- **Dependency-aware remediation sequencing** — identifies batch job credentials must be updated before access restrictions to avoid production batch failures
- **Post-remediation gap detection** — detects 3 new regulated datasets created after initial remediation before they become a compliance failure
- **Multi-workstream evidence packaging** — covers access control, encryption, and audit trail workstreams with source citations and verification timestamps
- **Compliance posture as a continuous state** — the answer to "are we compliant?" is always current

### Related Use Cases

- UC-06 (Patch Management S2): security PTF gaps and regulatory response can be triggered simultaneously by the same regulation
- UC-01 (Audit and Compliance): UC-03 remediates; UC-01 evidences — commonly sequential
- UC-04 (Change Readiness): health check findings with regulatory significance trigger UC-03
- UC-05 (Change Governance): every regulatory remediation is a production change that must be traceable

---

## Part 2 — Pain & Wows Flow Analysis

> **Source:** `use-case-pain-wows/UC-13-regulatory-change-response.md` (old UC-13 → new UC-03)

### As-Is / To-Be Flow

| Step | As-Is (Pain) | To-Be (Wow) |
|---|---|---|
| **1 — Receive new regulation** | The compliance team receives a new data privacy mandate with a 90-day deadline. Sage convenes a meeting with the DBA, application team, and security team. The first question — "what do we have that touches this data?" — has no quick answer. Week one ends with a list of questions, not an inventory. | Sage opens Atlas and says "we have a new data privacy regulation — here is the scope definition. What in our z/OS environment is in scope?" Atlas returns a structured inventory: 6 datasets matching the naming convention, 34 Db2 tables with relevant column patterns, 12 VSAM files, and 6 IMS segments — in under an hour. |
| **2 — Map access controls** | The DBA reviews Db2 catalog for table access grants. Sage reviews RACF profiles for dataset access. The application team reviews program source for direct file access. Each team works independently and none of them has the other's data. Three weeks later, a spreadsheet is assembled that no one is confident is complete. | Atlas maps all user IDs and service accounts with current access to every identified regulated data component — cross-referencing RACF dataset profiles, Db2 authorization entries, and application topology. 47 user IDs and service accounts with access are enumerated, with the access path for each. |
| **3 — Identify gaps and sequence remediation** | Sage identifies 23 access control gaps and 8 encryption gaps. She writes a remediation plan manually. Three weeks in, a developer tells her that the batch PAYROLL job will fail if she changes the access controls before updating its credentials. She has to reorder the plan. | Atlas analyzes the gap set and generates the sequenced remediation plan, proactively identifying the dependency: batch job credential updates must precede access restriction changes. "If you apply the access controls before updating the PAYROLL job credentials, the Monday batch run will fail." The sequencing risk is surfaced before any change is made. |
| **4 — Execute remediation** | Sage and Zach work through the three workstreams over four weeks. Lupita is brought in for encryption. Each team tracks their own progress in separate spreadsheets. Status calls are needed weekly to synchronize. Two items slip through the gaps. | Atlas executes each workstream in sequence with progress tracking across all three: credential updates (Zach), access controls (Sage), encryption enablement (Lupita). Post-execution, Atlas monitors for 48 hours and confirms no batch failures or unexpected access denials. |
| **5 — Discover new scope items** | Three weeks after remediation is complete, a developer creates a new dataset for a new data category. It falls under the regulation's scope but no one notices until the next audit cycle. This becomes an audit finding. | Atlas detects 3 new datasets created since the initial remediation that match the regulation's scope criteria. It alerts Sage immediately: "New regulated data detected post-remediation." The monitoring is continuous and automatic. |
| **6 — Generate evidence package** | Derek spends two weeks assembling the compliance evidence package from spreadsheets, email chains, RACF exports, and Db2 audit logs. The result is a multi-hundred-page document that regulators find hard to navigate. | Atlas generates the compliance evidence package directly from its verified compliant state: regulated data inventory with source citations, access control gap findings and remediation actions, encryption enablement evidence with timestamps, post-remediation monitoring log. Exportable, structured, and referenced to the specific regulatory requirements. |

### Key Pain Points

- Weeks spent on discovery before any remediation can begin
- Three independent teams with no unified view of the full regulated scope
- Cross-workstream sequencing dependencies discovered only when they cause failures
- New regulated data created post-remediation undetected until the next audit
- Evidence package assembled manually from multiple disconnected sources

### Key Wow Moments

- Complete regulated data inventory across 4 data types in under an hour
- "Batch job credentials before access controls" — proactive sequencing risk surfaced before it causes an incident
- 3 new datasets detected post-remediation automatically — the capability no competitor addresses
- Evidence package generated directly from the verified compliant state

---

## Part 3 — Atlas Units Estimation

> **Source:** `use-case-units/UC-13-regulatory-change-response-units.md` (old UC-13 → new UC-03)

### Atlas Units Reference

| Unit | Definition | Approximate Cost |
|---|---|---|
| **Query** | Single natural language query returning a structured response | 1–3 units |
| **Analysis** | Multi-source join producing a structured finding set | 5–15 units |
| **Artifact** | Exportable document generated from the environment record | 10–25 units |
| **Remediation** | Plan + test + apply for a remediation workstream | 20–60 units |

### Per-Step Unit Estimates

| Step | Action Type | Units | Notes |
|---|---|---|---|
| 1 — Regulated data inventory | Analysis | 15 | Cross-dataset, Db2, VSAM, IMS discovery |
| 2 — Access control gap analysis | Analysis | 12 | RACF + Db2 authorization cross-reference |
| 3 — Encryption gap analysis | Analysis | 8 | DFSMS + Db2 encryption configuration review |
| 3 — Remediation sequencing | Analysis | 10 | Dependency detection across three workstreams |
| 4 — Credential update workstream | Remediation | 35 | Per batch job credential update + test validation |
| 4 — Access control restriction workstream | Remediation | 40 | RACF changes + 48-hr monitoring |
| 4 — Encryption enablement workstream | Remediation | 45 | DFSMS + Db2 encryption + Lupita key provisioning |
| 5 — Post-remediation monitoring alert | Query | 2 | Each new regulated data item detected |
| 6 — Evidence package generation | Artifact | 22 | Full three-workstream package |

### Full-Scenario Summary

| Scenario | Typical Unit Range | Notes |
|---|---|---|
| S1 — Data Privacy Regulation (full arc) | 180–280 | Assumes 3 workstreams, 5–10 RACF changes, encryption for 8–15 items |
| S2 — Security Controls Mandate (config only) | 80–130 | No encryption workstream; RACF + PARMLIB remediation |
| S3 — Evidence Package only (post-remediation) | 25–40 | Assumes remediation already complete |
| S4 — Continuous Monitoring alert response | 5–15 per alert | Each new regulated item detected and remediated |

### Sensitivity Analysis

| Variable | Impact on Units |
|---|---|
| Number of regulated data items in scope | +3–6 units per additional item for inventory analysis |
| Number of batch jobs requiring credential updates | +20–30 units per batch job for test-and-apply cycle |
| Number of LPARs in scope | +10–15 units per LPAR for cross-LPAR analysis |
| Encryption workstream scope (number of datasets/tables) | +5–8 units per encrypted item |

### What Is Not Metered

- Continuous post-remediation monitoring scan cycles (passive Predictive Intelligence)
- Regulatory framework knowledge base lookups (embedded knowledge; no query charge)
- Evidence package format templates (pre-built; no generation cost for the template itself)

---

## Part 4 — External Product Synergies

### 4a. Bob PPZ (Touchpoints)

> **Source:** `use-case-bob-ppz/UC-13-regulatory-change-response-bob-ppz.md`

**Overall Bob PPZ relevance: Moderate. Tier 1 at Step 4 (execute — app code workstream); Tier 2 at Steps 1 and 2.**

**Tier 1 — Explicit Handoff Points:**

**Step 4 — Execute (Application Code Workstream):**
Some regulatory changes require application code modifications — programs that directly process regulated data and must be updated to meet new encryption, masking, or access logging requirements. When Atlas's remediation plan includes an application code workstream (a program that processes regulated data must be modified to comply), Atlas directs the developer to Bob PPZ. Atlas provides the regulatory context: which programs are in scope, what the compliance requirement is, and the blast radius of the code change. Bob PPZ uses ZUnderstand to identify the specific code constructs that handle the regulated data fields, plan the precise change (e.g., adding a field-level encryption call, adding an audit logging statement), and implement the modification without breaking dependent programs.

**What comes back to Atlas:** A code change artifact. Atlas validates the fix in a provisioned environment, confirms the compliance requirement is met, and includes the code change in the remediation evidence package.

**Tier 2 — Enrichment Touchpoints:**

**Step 1 — Discover / Scope:**
Bob PPZ's ZUnderstand data enriches Atlas's regulated data scope identification with application-level precision. Rather than identifying "Application X processes regulated data" (Atlas topology), ZUnderstand can identify "Programs ACCTVAL01 and PAYPROC03 in Application X explicitly access fields that match the regulation's PII definition, based on code-level data flow analysis." This narrows the scope to specific programs rather than entire applications, reducing the remediation surface area.

**Step 2 — Assess:**
When Atlas maps access control gaps, Bob PPZ's application topology enriches the scope with code-level access paths — identifying programs that access regulated datasets through dynamic calls or indirect references that static topology may not capture. This prevents Atlas from underestimating the access control gap scope for complex applications.

---

### 4b. Concert for Z (Touchpoints)

> **Source:** `use-case-concert4z/UC-13-regulatory-change-response-concert4z.md`

**Overall Concert for Z relevance: Moderate. Tier 1 at Steps 1–2 (Concert for Z anomaly detection → Atlas); Tier 2 at Steps 2 and 6.**

**Tier 1 — Explicit Handoff Points:**

**Steps 1–2 — Discover / Assess (Concert for Z → Atlas):**
Concert for Z's Observe module has detected an access anomaly: a user or process accessing regulated data in a pattern that deviates from their historical norm — off-hours access, unusual dataset access volume, a dormant privileged account becoming active. This anomaly triggers an Atlas regulatory investigation. Atlas scopes the affected regulated data components and assesses whether the anomaly represents a compliance gap requiring formal regulatory remediation. Atlas transitions into a regulatory change response workflow from the Concert for Z-detected access finding.

**What comes back:** After Atlas completes the regulatory remediation, the remediation record is recorded in Atlas's continuous change record. Concert for Z's monitoring sees the access anomaly pattern resolved and can consume the Atlas remediation record as operational context for subsequent access monitoring.

**Tier 2 — Enrichment Touchpoints:**

**Step 2 — Assess:**
Concert for Z's continuous access monitoring provides the behavioral dimension: not just "what are the RACF settings for this dataset" (configuration) but "who has actually been accessing this dataset, when, and how often" (behavior). The behavioral access picture distinguishes a theoretical access control gap from an active access risk.

**Step 6 — Monitor:**
Atlas monitors for new regulated data and access control drift. Concert for Z's continuous access monitoring detects when regulated data is being accessed in ways configuration monitoring cannot catch — a new program that begins accessing a regulated dataset without a corresponding configuration change is detected by Concert for Z and surfaces as a new regulated scope item for Atlas.

---

### 4c. Terraform Self-Managed for Z (Touchpoints)

> **Source:** `use-case-terraform/UC-13-regulatory-change-response-terraform.md`

**Overall Terraform relevance: Moderate. Tier 1 at Steps 4–5; Tier 2 at Steps 3 and 6.**

**Tier 1 — Explicit Handoff Points:**

**Step 4 — Response Plan (Infrastructure-Layer Items):**
Atlas has identified infrastructure-layer changes required by the new regulation — network topology changes required by a data residency rule, or storage encryption configuration changes required by a new cryptographic standard. Atlas identifies the infrastructure-layer items in the response plan and directs the team to implement them through the Terraform workflow. Required infrastructure changes are expressed as proposed modifications to the relevant LPAR or VM workspace HCL declarations. Terraform's plan-approve-apply process governs the implementation.

**What comes back to Atlas:** Terraform apply records for each infrastructure-layer change. Atlas marks those items as implemented and incorporates the Terraform apply records into the response evidence.

**Step 5 — Implement Changes:**
Atlas tracks the Terraform apply status for each infrastructure change item. When Terraform applies a change, Atlas receives confirmation and updates the response plan tracking. If Terraform detects a policy violation (Sentinel or OPA policy), Atlas is informed and the response plan is updated — a blocked Terraform apply is documented evidence that a proposed change was rejected by policy enforcement.

**Tier 2 — Enrichment Touchpoints:**

**Step 3 — Gap Assessment:**
Terraform's state file provides the authoritative record of the current declared infrastructure configuration. For infrastructure-layer compliance dimensions, Terraform's state is the ground truth for the gap assessment.

**Step 6 — Generate Compliance Evidence:**
The regulatory compliance evidence package is enriched by Terraform's apply history for the infrastructure-layer response items. Terraform's immutable log provides auditor-visible evidence that each infrastructure change was reviewed and approved before being applied.
