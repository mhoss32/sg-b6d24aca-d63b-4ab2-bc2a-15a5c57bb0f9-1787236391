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

> **Pillar:** System Intelligence (discover/assess) + Change Intelligence (execute) + Predictive Intelligence (monitor)
> **GA Status:** GA Dec 2026 (data privacy regulation); H1 2027 (full encryption workstream)
> **Source:** `use-case-pain-wows/UC-13-regulatory-change-response.md` (old UC-13 → new UC-03)

### As-Is Flow — Current State (Without Atlas)

#### Step 1 — Discover
**Brief:** When a new regulation arrives, identify all data and systems in scope across the IBM Z estate — datasets, Db2 tables, IMS segments, VSAM files, application programs.

**Personas involved:** Sage, Derek, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Sage | IBM Z organizations run regulated data in datasets, databases, IMS segments, and application programs that are not cataloged in any single system — identifying all regulated data requires weeks of manual investigation. | ⏱️ Lost Time — **weeks** to identify regulated data scope across a 6-LPAR estate |
| Sage | The team is often still discovering scope when the deadline is approaching — leaving insufficient time for remediation and validation. | 💼 Business Impact — regulatory deadline pressure is compounded by the fact that scope is not understood until weeks into the response |
| Derek | No multi-tool regulated data inventory — Derek must coordinate with the DBA (Db2 tables), the storage team (VSAM files), the application team (programs), and the security team (RACF profiles) just to establish scope. | 🔒 Skill Gap / Bottleneck — Derek cannot independently scope regulatory compliance; requires coordinating 4+ specialist teams |

---

#### Step 2 — Assess
**Brief:** Map access control gaps — which users and applications can access regulated data without the access controls the regulation requires.

**Personas involved:** Sage, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Access control gap analysis for regulated data requires manually reviewing RACF profiles per dataset and comparing against regulatory requirements — a multi-day expert task. | ⏱️ Lost Time — **3–5 business days** of manual RACF analysis for a medium-sized regulated estate |
| Sage | No cross-tool view: RACF profiles, Db2 access controls, and application-level access are reviewed in separate tools with no unified gap picture. | 💼 Business Impact — access control gaps that span tool boundaries are invisible without a unified view |
| Zach | Encryption gap analysis requires separately reviewing DFSMS configuration, Db2 encryption settings, and network connection encryption state — multiple tools, multiple expertise domains. | ⏱️ Lost Time — **days** assembling the encryption gap picture from separate tools |

---

#### Step 3 — Execute
**Brief:** Implement the regulatory remediation — RACF profile updates, dataset encryption enablement, batch job credential changes, audit trail configuration.

**Personas involved:** Sage, Zach, Lupita

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Regulatory response is a multi-team manual project — security team, DBA, application team, and systems programmer must each execute their workstream independently with no shared coordination artifact. | 💼 Business Impact — multi-team remediation with no shared plan produces gaps at workstream boundaries |
| Lupita | Encryption at rest workstream requires coordinating key management, encryption configuration, and dataset rewriting — high complexity with no integrated tooling. | ⏱️ Lost Time — **days to weeks** per encryption workstream phase, each requiring multiple specialist hand-offs |
| Zach | System-level remediations (RACF profile updates, dataset encryption) require Zach's execution for every single change — no delegation path for routine compliance remediation. | ⏱️ Lost Time — **Zach's time consumed by routine compliance execution** that should be delegatable |

---

#### Step 4 — Verify
**Brief:** Confirm that all regulated data now has the required access controls and encryption configuration in place.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Post-remediation verification is minimal — there is no systematic check that all regulated data was addressed and that no newly created datasets fall into scope. | 💼 Business Impact — remediation completeness is assumed, not verified; gaps surface in the next audit |
| Derek | New regulated data that appears after the initial remediation is typically not detected until the next audit cycle — no continuous monitoring. | 💼 Business Impact — compliance posture degrades silently as new regulated data is created post-remediation |

---

#### Step 5 — Evidence
**Brief:** Generate the compliance evidence package for regulators — demonstrating that regulated data was identified, access-controlled, and encrypted.

**Personas involved:** Derek, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Derek | Compliance evidence package is assembled manually from RACF reports, DBA exports, encryption configuration summaries, and application team attestations. | ⏱️ Lost Time — **days** assembling the regulatory compliance evidence package |
| Derek | Evidence reflects a point-in-time snapshot assembled at submission — not a continuous, authoritative record of the compliant state. | 💼 Business Impact — evidence quality is limited; auditors may find gaps because the snapshot was assembled at submission time |

---

#### Step 6 — Monitor
**Brief:** After initial compliance is achieved, maintain ongoing awareness — new data in regulatory scope, configuration drift, access control changes.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | No ongoing monitoring for new regulated data — compliance scope changes when new datasets are created or when the data their applications generate becomes regulated. | 💼 Business Impact — new regulated data accumulates silently between audit cycles |

---

### To-Be Flow — Desired Outcome (With Atlas)

#### Step 1 — Discover
**Brief:** Atlas inventories all regulated data across the entire z/OS estate in hours — datasets, Db2 tables, IMS segments, VSAM files, and programs that touch regulated data.

**Personas involved:** Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Atlas inventories all regulated data across the entire estate in hours — datasets, Db2 tables, IMS segments, VSAM files — without coordinating 4+ specialist teams. | ⏱️ Time Saving — **weeks of manual scope assembly → hours** for a complete regulated data inventory |
| Derek | Complete scope delivered in hours rather than weeks — the regulatory response timeline begins with the full scope known, not with weeks of scope discovery that competes with the remediation deadline. | 💼 Business Impact — regulatory deadline pressure is relieved by scope completeness from day one |

---

#### Step 2 — Assess
**Brief:** Atlas maps access control gaps, encryption gaps, and audit trail gaps across all regulated data — comparing current RACF profiles and configuration against regulatory requirements.

**Personas involved:** Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Unified access control gap analysis across RACF profiles, Db2 access controls, and application access in a single Atlas session — cross-tool gaps visible for the first time. | 🤖 Atlas AI Insight & Automation — cross-tool access control analysis joins RACF, Db2, and application topology in one assessment |
| Zach | Encryption gap picture produced by Atlas — DFSMS configuration, Db2 encryption status, and connection encryption state joined in one assessment without multi-tool investigation. | ⏱️ Time Saving — **days → hours** for the encryption gap assessment |

---

#### Step 3 — Execute
**Brief:** Atlas sequences the full remediation workstream — RACF updates, encryption enablement, credential changes — across all workstreams simultaneously, orchestrated by Change Intelligence.

**Personas involved:** Sage, Zach, Lupita, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Full regulatory remediation workstream sequenced in a single Atlas session — RACF updates, encryption enablement, credential changes, audit trail configuration — all workstreams planned and tracked in Atlas. | 🤖 Atlas AI Insight & Automation — multi-workstream remediation plan generated and sequenced automatically; gaps at workstream boundaries are eliminated |
| Lupita | Encryption workstream orchestrated by Atlas — key management, encryption configuration, and dataset rewriting steps sequenced in the correct order with dependencies resolved. | ⏱️ Time Saving — **days to weeks of manual encryption workstream coordination → Atlas-orchestrated sequence** |
| Zach | Routine compliance remediations (RACF profile updates, encryption configuration) are Atlas-orchestrated — Zach authorizes rather than manually executing every change. | ⏱️ Time Saving — Zach's execution time on routine compliance changes reduced to authorization gates |

---

#### Step 4 — Verify
**Brief:** Atlas confirms all regulated data has the required controls in place — and monitors continuously for new regulated data that comes into scope after the initial remediation.

**Personas involved:** Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Post-remediation verification is systematic — Atlas confirms every regulated data item has the required controls applied, with no items assumed rather than verified. | 🤖 Atlas AI Insight & Automation — comprehensive post-remediation coverage check runs automatically after execution |
| Sage | Continuous monitoring for new regulated data — Atlas alerts when new datasets, tables, or programs come into regulatory scope after the initial remediation. No silent compliance drift. | 🤖 Atlas AI Insight & Automation — ongoing monitoring replaces point-in-time compliance snapshot |

---

#### Step 5 — Evidence
**Brief:** Atlas generates the compliance evidence package directly from its verified compliant state — structured, auditor-ready, and continuous.

**Personas involved:** Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Compliance evidence package generated from Atlas's verified compliant state — regulated data inventory, access control gap remediation record, encryption configuration evidence, audit trail status. | ⏱️ Time Saving — **days assembling evidence → generated from Atlas's continuous record** |
| Derek | Evidence is from Atlas's authoritative, continuous record — not a point-in-time snapshot assembled at submission time. Auditors receive continuous evidence of the compliant state. | 🤖 Atlas AI Insight & Automation — continuous compliance record eliminates the evidence quality limitation of point-in-time snapshot assembly |

---

#### Step 6 — Monitor
**Brief:** Atlas monitors continuously for new regulated data, access control drift, and encryption configuration changes that would open new compliance gaps.

**Personas involved:** Sage, Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | New regulated data detected as it is created — Atlas alerts before the new gap becomes a compliance problem. Compliance posture is maintained continuously, not recovered at each audit. | 🤖 Atlas AI Insight & Automation — continuous scope monitoring surfaces new regulated data without a user query |
| Derek | Ongoing compliance state visible in Atlas — Derek knows the current regulatory posture at any point, not just after a manual assessment. | 🆕 New User Capability — Derek monitors regulatory compliance posture continuously from Atlas without requiring Sage or Zach to assemble a status report |

---

> **Overall outcome:** Regulatory scope identified in hours, not weeks. Multi-workstream remediation sequenced and tracked in a single Atlas session. Compliance evidence generated from Atlas's continuous record — not assembled under deadline pressure. Post-remediation monitoring catches new regulated data before it becomes an audit finding.

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
