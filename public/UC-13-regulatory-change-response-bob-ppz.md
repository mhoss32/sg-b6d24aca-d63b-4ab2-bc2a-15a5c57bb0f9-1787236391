# UC-13: Regulatory Change Response — Bob PPZ Touchpoints

> **Source use case:** UC-13 Regulatory Change Response
> **Reference:** [Atlas–Bob PPZ Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Bob%20PPZ/atlas-bob-ppz-positioning-analysis.md)

---

## Summary

Regulatory change response is primarily a security, configuration, and infrastructure workflow. The majority of remediations — RACF profile updates, dataset encryption enablement, network connection encryption configuration, audit trail setup — are infrastructure-layer changes that Atlas orchestrates directly. Bob PPZ enters at a specific point: when regulatory remediation requires modifying application code, most commonly when applications must be updated to use regulated data correctly (adding masking logic, replacing plaintext credential handling with vault calls, updating data access patterns to comply with new data residency requirements). The enrichment touchpoint meaningfully improves the precision of the regulated data inventory for application programs.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas would direct the user to Bob PPZ for code-level execution.*

### Step 3 — Execute (application code workstream)

**What Atlas has produced at this point:**
Atlas has sequenced the full regulatory remediation workstream — RACF updates, encryption enablement, credential changes, audit trail configuration — across all workstreams simultaneously. Within this plan, Atlas identifies any remediation items that require application code modification:

- **Masking logic:** An application program that outputs regulated data (PII, PCI card numbers, PHI) must be updated to mask the data before output — a code-level change to the program's output logic
- **Credential handling:** An application using hardcoded credentials or plaintext credential files must be updated to use secure credential retrieval — a code-level change to the program's authentication logic
- **Data access patterns:** An application directly accessing regulated datasets in ways that bypass RACF controls must be restructured to access data through controlled APIs — a structural code change
- **Audit trail hooks:** Applications that must generate their own audit records for regulated data access may require code additions to emit the required audit events

For each of these items, Atlas identifies the affected program(s) and the nature of the required code change, but Atlas cannot implement the code-level modification.

**What Atlas directs the user to do in Bob PPZ:**
Atlas presents each application code remediation item with the affected program(s), the regulatory requirement driving the change, and the scope context (other programs with the same issue, for batch remediation efficiency). The developer is directed to Bob PPZ to:
- Understand the current code behavior — what the program does with the regulated data, what the current credential handling looks like, what the data access pattern is
- Identify every location in the program where the change is required (ZUnderstand prevents partial remediations that leave some instances unchanged)
- Implement the precise code change — masking logic, vault integration, API redirection — with deterministic accuracy
- Confirm that the change does not inadvertently break adjacent functionality

**What comes back to Atlas:**
Remediated code artifacts for each application program. Atlas validates the code changes in an isolated test environment (confirming the regulated data is now handled correctly and the application still functions), marks the items resolved, and incorporates the code change records into the compliance evidence package.

---

## Tier 2 — Enrichment Touchpoints

*Steps where having Bob PPZ installed makes Atlas's output richer, without an explicit user handoff.*

### Step 1 — Discover (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas inventories regulated data across the estate — datasets, Db2 tables, IMS segments, VSAM files, and programs that touch regulated data. The application program inventory (programs that touch regulated data) benefits significantly from Bob PPZ's ZUnderstand data flow analysis:

- **Data flow tracing:** ZUnderstand identifies not just programs that *access* regulated datasets, but programs that *process, transform, or transmit* the regulated data — a more precise regulatory scope. A program that reads a regulated dataset and writes a summary to a non-regulated output is in scope; a program that merely passes a pointer is a different risk level.
- **Regulated field identification:** For Db2 tables containing both regulated and non-regulated columns, ZUnderstand's data dictionary identifies which programs access the specific regulated columns — narrowing the application scope to programs that actually handle the regulated data, not all programs that access the table.
- **Downstream data propagation:** ZUnderstand traces where regulated data propagates downstream — if a program reads PII from a dataset and passes it to three downstream programs, all four are in regulatory scope. Without data flow tracing, only the primary reader may be identified.

### Step 2 — Assess (enrichment layer)

**How Bob PPZ enriches this step:**
Atlas maps access control gaps across RACF profiles, Db2 access controls, and application access in a unified assessment. When Bob PPZ is installed, the application access layer of this assessment is enriched with code-level precision:
- Rather than "Application X accesses regulated dataset Y," the assessment identifies "Program ACCTPROC reads ACCOUNT.CARDNUMBER at line 340 and passes it unmasked to the output record at line 520" — a specific, actionable finding rather than an application-level flag.
- Programs with hardcoded credentials, plaintext connection strings, or bypassed RACF controls are identified at code level — the specific line and construct — rather than at application level.

---

> **Overall Bob PPZ relevance for this use case:** Moderate. Bob PPZ is relevant specifically when regulatory remediation extends into application code — which is common for data privacy regulations (GDPR, CCPA) and payment regulations (PCI DSS) that impose requirements on how applications handle regulated data, but less common for purely infrastructure-level regulations (DORA DR requirements, SOX IT General Controls). The enrichment touchpoints add material value to the regulated data discovery and scoping steps for any estate with large COBOL application programs processing regulated data.
