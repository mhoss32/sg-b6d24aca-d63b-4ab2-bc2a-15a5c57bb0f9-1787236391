# UC-13: Regulatory Change Response — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (discover/assess) + Change Intelligence (execute) + Predictive Intelligence (monitor)
> **GA Status:** GA Dec 2026 (data privacy regulation); H1 2027 (full encryption workstream)

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Discover
**Brief:** When a new regulation arrives, identify all data and systems in scope across the IBM Z estate — datasets, Db2 tables, IMS segments, VSAM files, application programs.

**Personas involved:** Sage, Derek, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Sage | IBM Z organizations run regulated data in datasets, databases, IMS segments, and application programs that are not cataloged in any single system — identifying all regulated data requires weeks of manual investigation. | ⏱️ Lost Time — **weeks** to identify regulated data scope across a 6-LPAR estate |
| Sage | The team is often still discovering scope when the deadline is approaching — leaving insufficient time for remediation and validation. | 💼 Business Impact — regulatory deadline pressure is compounded by the fact that scope is not understood until weeks into the response |
| Derek | No multi-tool regulated data inventory — Derek must coordinate with the DBA (Db2 tables), the storage team (VSAM files), the application team (programs), and the security team (RACF profiles) just to establish scope. | 🔒 Skill Gap / Bottleneck — Derek cannot independently scope regulatory compliance; requires coordinating 4+ specialist teams |

---

### Step 2 — Assess
**Brief:** Map access control gaps — which users and applications can access regulated data without the access controls the regulation requires.

**Personas involved:** Sage, Zach

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Access control gap analysis for regulated data requires manually reviewing RACF profiles per dataset and comparing against regulatory requirements — a multi-day expert task. | ⏱️ Lost Time — **3–5 business days** of manual RACF analysis for a medium-sized regulated estate |
| Sage | No cross-tool view: RACF profiles, Db2 access controls, and application-level access are reviewed in separate tools with no unified gap picture. | 💼 Business Impact — access control gaps that span tool boundaries (e.g., RACF allows access but Db2 access controls do not) are invisible without a unified view |
| Zach | Encryption gap analysis requires separately reviewing DFSMS configuration, Db2 encryption settings, and network connection encryption state — multiple tools, multiple expertise domains. | ⏱️ Lost Time — **days** assembling the encryption gap picture from separate tools |

---

### Step 3 — Execute
**Brief:** Implement the regulatory remediation — RACF profile updates, dataset encryption enablement, batch job credential changes, audit trail configuration.

**Personas involved:** Sage, Zach, Lupita

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Regulatory response is a multi-team manual project — security team, DBA, application team, and systems programmer must each execute their workstream independently with no shared coordination artifact. | 💼 Business Impact — multi-team remediation with no shared plan produces gaps at workstream boundaries |
| Lupita | Encryption at rest workstream requires coordinating key management, encryption configuration, and dataset rewriting — high complexity with no integrated tooling. | ⏱️ Lost Time — **days to weeks** per encryption workstream phase, each requiring multiple specialist hand-offs |
| Zach | System-level remediations (RACF profile updates, dataset encryption) require Zach's execution for every single change — no delegation path for routine compliance remediation. | ⏱️ Lost Time — **Zach's time consumed by routine compliance execution** that should be delegatable |

---

### Step 4 — Verify
**Brief:** Confirm that all regulated data now has the required access controls and encryption configuration in place.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | Post-remediation verification is minimal — there is no systematic check that all regulated data was addressed and that no newly created datasets fall into scope. | 💼 Business Impact — remediation completeness is assumed, not verified; gaps surface in the next audit |
| Derek | New regulated data that appears after the initial remediation is typically not detected until the next audit cycle — no continuous monitoring. | 💼 Business Impact — compliance posture degrades silently as new regulated data is created post-remediation |

---

### Step 5 — Evidence
**Brief:** Generate the compliance evidence package for regulators — demonstrating that regulated data was identified, access-controlled, and encrypted.

**Personas involved:** Derek, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Derek | Compliance evidence package is assembled manually from RACF reports, DBA exports, encryption configuration summaries, and application team attestations. | ⏱️ Lost Time — **days** assembling the regulatory compliance evidence package |
| Derek | Evidence reflects a point-in-time snapshot assembled at submission — not a continuous, authoritative record of the compliant state. | 💼 Business Impact — evidence quality is limited; auditors may find gaps because the snapshot was assembled at submission time |

---

### Step 6 — Monitor
**Brief:** After initial compliance is achieved, maintain ongoing awareness — new data in regulatory scope, configuration drift, access control changes.

**Personas involved:** Sage, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Sage | No ongoing monitoring for new regulated data — compliance scope changes when new datasets are created or when the data their applications generate becomes regulated. | 💼 Business Impact — new regulated data accumulates silently between audit cycles |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Discover
**Brief:** Atlas inventories all regulated data across the entire z/OS estate in hours — datasets, Db2 tables, IMS segments, VSAM files, and programs that touch regulated data.

**Personas involved:** Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Atlas inventories all regulated data across the entire estate in hours — datasets, Db2 tables, IMS segments, VSAM files — without coordinating 4+ specialist teams. | ⏱️ Time Saving — **weeks of manual scope assembly → hours** for a complete regulated data inventory |
| Derek | Complete scope delivered in hours rather than weeks — the regulatory response timeline begins with the full scope known, not with weeks of scope discovery that competes with the remediation deadline. | 💼 Business Impact — regulatory deadline pressure is relieved by scope completeness from day one |

---

### Step 2 — Assess
**Brief:** Atlas maps access control gaps, encryption gaps, and audit trail gaps across all regulated data — comparing current RACF profiles and configuration against regulatory requirements.

**Personas involved:** Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Unified access control gap analysis across RACF profiles, Db2 access controls, and application access in a single Atlas session — cross-tool gaps visible for the first time. | 🤖 Atlas AI Insight & Automation — cross-tool access control analysis joins RACF, Db2, and application topology in one assessment |
| Zach | Encryption gap picture produced by Atlas — DFSMS configuration, Db2 encryption status, and connection encryption state joined in one assessment without multi-tool investigation. | ⏱️ Time Saving — **days → hours** for the encryption gap assessment |

---

### Step 3 — Execute
**Brief:** Atlas sequences the full remediation workstream — RACF updates, encryption enablement, credential changes — across all workstreams simultaneously, orchestrated by Change Intelligence.

**Personas involved:** Sage, Zach, Lupita, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Full regulatory remediation workstream sequenced in a single Atlas session — RACF updates, encryption enablement, credential changes, audit trail configuration — all workstreams planned and tracked in Atlas. | 🤖 Atlas AI Insight & Automation — multi-workstream remediation plan generated and sequenced automatically; gaps at workstream boundaries are eliminated |
| Lupita | Encryption workstream orchestrated by Atlas — key management, encryption configuration, and dataset rewriting steps sequenced in the correct order with dependencies resolved. | ⏱️ Time Saving — **days to weeks of manual encryption workstream coordination → Atlas-orchestrated sequence** |
| Zach | Routine compliance remediations (RACF profile updates, encryption configuration) are Atlas-orchestrated — Zach authorizes rather than manually executing every change. | ⏱️ Time Saving — Zach's execution time on routine compliance changes reduced to authorization gates |

---

### Step 4 — Verify
**Brief:** Atlas confirms all regulated data has the required controls in place — and monitors continuously for new regulated data that comes into scope after the initial remediation.

**Personas involved:** Sage, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | Post-remediation verification is systematic — Atlas confirms every regulated data item has the required controls applied, with no items assumed rather than verified. | 🤖 Atlas AI Insight & Automation — comprehensive post-remediation coverage check runs automatically after execution |
| Sage | Continuous monitoring for new regulated data — Atlas alerts when new datasets, tables, or programs come into regulatory scope after the initial remediation. No silent compliance drift. | 🤖 Atlas AI Insight & Automation — ongoing monitoring replaces point-in-time compliance snapshot |

---

### Step 5 — Evidence
**Brief:** Atlas generates the compliance evidence package directly from its verified compliant state — structured, auditor-ready, and continuous.

**Personas involved:** Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Derek | Compliance evidence package generated from Atlas's verified compliant state — regulated data inventory, access control gap remediation record, encryption configuration evidence, audit trail status. | ⏱️ Time Saving — **days assembling evidence → generated from Atlas's continuous record** |
| Derek | Evidence is from Atlas's authoritative, continuous record — not a point-in-time snapshot assembled at submission time. Auditors receive continuous evidence of the compliant state. | 🤖 Atlas AI Insight & Automation — continuous compliance record eliminates the evidence quality limitation of point-in-time snapshot assembly |

---

### Step 6 — Monitor
**Brief:** Atlas monitors continuously for new regulated data, access control drift, and encryption configuration changes that would open new compliance gaps.

**Personas involved:** Sage, Derek, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Sage | New regulated data detected as it is created — Atlas alerts before the new gap becomes a compliance problem. Compliance posture is maintained continuously, not recovered at each audit. | 🤖 Atlas AI Insight & Automation — continuous scope monitoring surfaces new regulated data without a user query |
| Derek | Ongoing compliance state visible in Atlas — Derek knows the current regulatory posture at any point, not just after a manual assessment. | 🆕 New User Capability — Derek monitors regulatory compliance posture continuously from Atlas without requiring Sage or Zach to assemble a status report |

---

> **Overall outcome:** Regulatory scope identified in hours, not weeks. Multi-workstream remediation sequenced and tracked in a single Atlas session. Compliance evidence generated from Atlas's continuous record — not assembled under deadline pressure. Post-remediation monitoring catches new regulated data before it becomes an audit finding.
