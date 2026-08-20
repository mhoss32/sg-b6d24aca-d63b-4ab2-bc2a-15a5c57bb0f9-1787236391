# UC-14: Change Governance and Traceability
*Version 1.0 | Owner: Product Management | Last updated: August 2026*
*Template: [use-case-template.md](../use-case-template.md) | Library: [atlas-use-case-library.md](../atlas-use-case-library.md)*

---

## Executive Summary

IBM Z organizations make hundreds of changes per month. A meaningful fraction of those changes have no associated change record, occur outside defined change windows, and cannot be attributed to a named user from the system configuration history alone. This is not a minor process gap — it is an audit finding, a regulatory risk, and the reason incidents that should take an hour to diagnose take a day. Atlas becomes the system of record for change provenance on IBM Z: every change is attributed, every change window violation is surfaced, and the gap between "what happened on z/OS" and "what the change management system knows about" closes for the first time.

---

## 1. Overview

Change Governance and Traceability covers the attribution, recording, and enforcement of change governance across the IBM Z estate. It addresses a gap that runs through nearly every other use case in the Atlas library: changes happen — PTF applies, configuration updates, RACF modifications — and the governance record is incomplete. Atlas provides the change attribution and audit trail infrastructure that makes traceability reliable, and it is the system that surfaces undocumented, out-of-window, and unattributed changes before they become audit findings or incident contributors.

---

## 2. Customer Jobs-To-Be-Done

| Job Type | Job Statement |
|---|---|
| **Functional** | When a change occurs on IBM Z — whether planned or unplanned, large or small — I want every change to be traceable: who made it, when, under what authorization, and what it changed. I also want to know immediately when a change occurs that should not have — outside a change window, without a change record, or without proper authorization. |
| **Emotional** | Operations managers and compliance teams want to stop being blindsided — discovering in an audit review that 46 changes in the past year have no change record, or discovering in an incident post-mortem that a configuration change was made two weeks ago with no attribution. |
| **Social** | Leadership and auditors need to see that the organization has genuine change governance, not just documentation that claims it does. The difference between a finding that IBM Z is ungoverned and demonstrating that every change is attributed and traceable is the difference between an audit pass and a remediation requirement. |

---

## 3. Customer Problem and Outcome

**Problem:** IBM Z environments produce a high volume of configuration changes, and a significant fraction of those changes are not captured in ITSM change records. Changes occur through ISPF panels, operator commands, SMP/E, and JCL — tools that do not integrate with ServiceNow or similar ITSM systems. The result is a persistent gap between what actually happened on the system and what the change management system knows about. This gap is discovered in incident post-mortems, compliance audits, and DR test failures — not proactively.

**Current State (Without Atlas):** Change record creation is a manual, after-the-fact process. System programmers apply a change and then create the change record separately. Emergency changes frequently get "change records created after the fact" or miss the record entirely. Operations managers have no visibility into changes that occurred outside change windows or without records unless they manually review configuration deltas. Auditors discover the gap during reviews.

**Desired Outcome:** Atlas is the system of record for what actually happened on IBM Z. Every Atlas-executed change is automatically attributed and linked to a change record. Changes detected in the configuration that have no associated record are immediately surfaced for investigation or retroactive documentation. No change in the Atlas estate is unattributed or unaccounted for.

---

## 4. Business Value

| Value Driver | Description |
|---|---|
| **Revenue impact** | Change Governance and Traceability is primarily a value driver for Atlas Base and the Atlas-ServiceNow integration. The integration itself may be a separately sold extension. It is also a significant retention driver — organizations that rely on Atlas as their change governance system of record are deeply embedded in the product. |
| **Retention impact** | Change history that accumulates in Atlas over time becomes irreplaceable. The ability to answer "what changed in this environment in the past 12 months, who changed it, and what was the authorization?" from a single system is a capability that compounds in value with every passing month. |
| **Competitive differentiation** | No existing z/OS tool provides bi-directional ITSM integration with change attribution across CICS, Db2, MQ, RACF, and PTF applies simultaneously. ServiceNow has connectors for specific platforms; Atlas is the first product that covers the full IBM Z software stack in one change record. |
| **Portfolio attach** | This use case creates direct pull-through for the ServiceNow integration partnership, IBM zSecure (for RACF change attribution), and IBM Z Software Discovery (for PTF apply history). It also strengthens the entire Atlas library — every other use case that executes changes generates change records that feed this use case's governance model. |

---

## 5. Personas

| Role | Persona | Engagement Type |
|---|---|---|
| **Primary** | Quinn — IT Operations Manager | Owns change governance. Reviews undocumented change reports, enforces change window compliance, and monitors Atlas's change attribution model. The person who is accountable to auditors for the state of change records. |
| **Secondary** | Annette — IT Operations Engineer | Executes day-to-day change governance work — reviewing out-of-window change alerts, investigating undocumented changes, and working with Atlas to retroactively document or escalate changes. |
| **Secondary** | Derek — Compliance Evidence Provider | Uses Atlas's change history as the primary evidence source for audit reviews that assess change control compliance. The completeness of Atlas's change attribution directly affects the quality of Derek's audit evidence. |
| **Secondary** | Zach — z/OS Systems Programmer (experienced) | The primary executor of changes in Atlas. When Zach executes changes through Atlas, attribution and change records are generated automatically. He is also the person who investigates when Atlas identifies an undocumented change. |

Reference [`personas.md`](../personas.md).

---

## 6. Pillar Alignment

| Pillar | Role in This Use Case | When Available |
|---|---|---|
| **Change Intelligence** | **Primary throughout.** Change attribution, change record generation, ITSM integration, and change window enforcement are all Change Intelligence capabilities. Every Change Intelligence execution in Atlas generates the audit trail that this use case governs. | GA Dec 2026 (Atlas change history model); H2 2027 (ServiceNow bi-directional integration); 2028+ (full governance) |
| **System Intelligence** | **Supporting (undocumented change detection).** Detecting configuration changes that occurred outside Atlas — changes made directly in ISPF panels, operator commands, or third-party tools — requires comparing the current Config-as-Code state against the last known baseline. This is System Intelligence's topology diff capability applied to the change governance problem. | GA Dec 2026 (point-in-time detection); H2 2027 (continuous monitoring) |
| **Predictive Intelligence** | **Supporting (proactive alerting).** Real-time alerting when a configuration change occurs outside a change window, when a change matches a high-risk pattern, or when a change in one component is likely to have cascading effects are Predictive Intelligence behaviors. | H2 2027 |

---

## 7. Roadmap Status

| Scenario | Status | Target Date | Capability Gate | Demo Ready |
|---|---|---|---|---|
| ServiceNow Change Record Integration | **Future Opportunity** | H2 2027 (ServiceNow integration) | Bi-directional ServiceNow connector; Atlas change record format standardization | H2 2027 |
| Undocumented Change Audit Report | **Planned** | H1 2027 (Atlas-internal detection); H2 2027 (ITSM-cross-referenced) | Atlas change history model + Config-as-Code baseline diff | H1 2027 |
| Change Window Enforcement | **Planned** | H2 2027 | Real-time configuration change monitoring; alert generation | H2 2027 |
| Change Attribution and Rollback History | **Current (Atlas-executed changes only)** | GA Dec 2026 (Atlas-executed); H2 2027 (all changes) | Atlas change execution logging at GA; full z/OS configuration history at H2 2027 | Yes (GA, for Atlas-executed changes) |

**Capability dependency notes:**

- **Change Attribution and Rollback History** is available at GA Dec 2026 but is scoped to changes executed through Atlas. Changes made outside Atlas (via ISPF panels, operator commands, direct JCL submission) are not attributable from Atlas's change execution log — they must be detected via Config-as-Code baseline diff (the undocumented change detection mechanism). Full attribution across all z/OS changes requires the continuous monitoring capability at H2 2027.
- The **Undocumented Change Audit Report** scenario is the most immediately implementable scenario at H1 2027. It compares the current environment state against the last Config-as-Code baseline and surfaces configuration differences that have no corresponding Atlas change record. The 46 undocumented changes surfaced in two separate Kyle scenarios (uc5-staff-onboarding.md Step 6, uc2-audit-compliance.md Step 7) is the canonical example of this finding.
- **ServiceNow bi-directional integration** — where Atlas changes automatically create ServiceNow records and ServiceNow change records can trigger Atlas workflows — is a full H2 2027 capability. At GA, Atlas generates change record templates for export; the automation of the link is later.

---

## 8. Scope and Boundaries

**In Scope:**
- Change attribution for Atlas-executed changes: every change executed through Atlas is attributed to a named user, a timestamp, a change type, and a justification
- Change record template generation: Atlas generates a ServiceNow-compatible change record template for each Atlas-executed change
- Undocumented change detection: Config-as-Code baseline diff identifies configuration changes that occurred outside Atlas with no corresponding change record
- Change window monitoring: Atlas flags changes that occur outside the organization's defined change windows
- Rollback history: any configuration state can be traced back to the Atlas change that last modified it, with full context
- Change audit report: structured report of all changes in a time period, with attribution status for each (documented / undocumented / out-of-window)
- ServiceNow bi-directional integration (H2 2027): Atlas changes automatically create ServiceNow records; ServiceNow records can initiate Atlas workflows

**Out of Scope:**
- Change governance for non-IBM Z systems — Atlas manages the IBM Z estate
- ServiceNow workflow automation beyond change record creation — Atlas creates and links records; ServiceNow's approval and notification workflows are outside Atlas's scope
- Network layer change governance — Atlas manages software configuration changes; network fabric changes are out of scope

**Non-Goals:**
- Atlas does not prevent unauthorized changes from occurring — it detects and surfaces them after the fact; preventing unauthorized access is an ITSM, RACF, and security architecture responsibility
- Atlas does not replace the ITSM system — it integrates with it; ServiceNow remains the system of record for change governance process; Atlas is the system of record for what actually changed on z/OS

---

## 9. Assumptions and Dependencies

| Type | Description |
|---|---|
| **Assumption** | The organization has defined change windows that Atlas can reference when evaluating out-of-window change alerts |
| **Assumption** | The organization uses ServiceNow or a compatible ITSM system; change record format must be mapped to the ServiceNow schema |
| **Assumption** | Config-as-Code baselines are registered after each planned change, so that subsequent baseline diffs reflect only unplanned changes |
| **Dependency** | Atlas change execution logging (GA Dec 2026) for attributed change history of Atlas-executed changes |
| **Dependency** | Config-as-Code continuous monitoring (H2 2027) for detection of out-of-Atlas changes |
| **Dependency** | ServiceNow connector (H2 2027) for bi-directional ITSM integration |
| **Dependency** | GitHub integration (when available) for change record linkage to code commits and version control events |
| **Risk** | Out-of-Atlas changes (made via ISPF, operator commands, or direct JCL) are detected via baseline diff, not in real time. A change made between Config-as-Code refresh cycles may be missed until the next refresh. Continuous Config-as-Code monitoring (H2 2027) reduces this gap but does not eliminate it for all change types. |

---

## 10. Scenario Catalog

| Scenario | Trigger | Status | Demo Ready | Required Child Artifacts | Supporting Artifact |
|---|---|---|---|---|---|
| ServiceNow Change Record Integration | Atlas executes a change; ServiceNow change record is automatically created and linked | Future Opportunity | H2 2027 | UX Flow, Chat Exchange | TBD |
| Undocumented Change Audit Report | User requests a report of changes in a time period with no associated change record, or Atlas proactively surfaces undocumented changes | Planned | H1 2027 | UX Flow, Chat Exchange | [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Step 6; [`design/flows/uc2-audit-compliance.md`](../design/flows/uc2-audit-compliance.md) Step 7 |
| Change Window Enforcement | A configuration change is detected outside the defined change window; Atlas alerts operations management | Planned | H2 2027 | UX Flow, Chat Exchange | TBD |
| Change Attribution and Rollback History | User needs to understand what changed to cause a specific configuration state; initiates a change history query or rollback | Current (Atlas-executed) | Yes (GA — Atlas-executed changes) | UX Flow, Chat Exchange | TBD |

**Design decisions for this scenario catalog:**

- The undocumented change finding appears in two separate Kyle scenarios (onboarding and audit compliance) as a discovery that Atlas makes as a side effect of answering a different question. This use case elevates it to a first-class capability — a scenario where the customer's primary goal is finding and attributing all the changes that occurred without records. The same Atlas capability powers the side-effect discovery and the primary investigation.
- The Change Attribution and Rollback History scenario is the most available at GA — but its scope at GA is limited to Atlas-executed changes. That scope limitation must be communicated clearly in demos.

---

## 11. Lifecycle Overview

```
Detect → Attribute → Surface → Investigate → Document → Enforce
```

| Phase | What Happens | Primary Actor |
|---|---|---|
| **Detect** | Atlas detects configuration changes — either through its change execution log (Atlas-executed changes) or through Config-as-Code baseline diff (out-of-Atlas changes) | Atlas |
| **Attribute** | For Atlas-executed changes: attribution is automatic (named user, timestamp, change type). For out-of-Atlas changes: Atlas surfaces the change and the configuration delta but cannot attribute the user without additional investigation | Atlas |
| **Surface** | Atlas reports undocumented changes, out-of-window changes, and unattributed changes through the change audit report and proactive alerts | Atlas |
| **Investigate** | User reviews the surfaced changes and determines: was this an approved change with a missing record? An emergency change? An unauthorized change? | User |
| **Document** | User retroactively documents the change (creates or links a change record); Atlas marks it as resolved in the audit report | Both |
| **Enforce** | Atlas enforces change governance by making it operationally harder to leave changes undocumented — every Atlas-executed change is automatically documented, and every undocumented out-of-Atlas change is surfaced | Atlas |

---

## 12. Division of Responsibility

| Responsibility | Owner | Notes |
|---|---|---|
| Logging Atlas-executed changes | Atlas | Every Atlas-executed change is automatically logged with attribution, timestamp, and change context |
| Detecting out-of-Atlas configuration changes | Atlas | Config-as-Code baseline diff identifies changes not made through Atlas |
| Attributing out-of-Atlas changes to a specific user | User | Atlas identifies the change; attribution to a named user requires investigation by Quinn or Zach |
| Generating change record templates | Atlas | Atlas produces the template; user reviews and submits to ServiceNow |
| ServiceNow record creation (H2 2027) | Atlas | Automatic once the integration is available |
| Change window policy definition | User | Operations management defines what change windows are valid; Atlas enforces them |
| Investigating undocumented changes | User | Quinn or Annette investigates; Atlas provides the configuration delta as the starting point |
| Retroactive documentation of undocumented changes | User | Atlas records the retroactive documentation; the decision to document or escalate is human |
| Rollback execution | Shared | Atlas generates the rollback plan; user authorizes the rollback execution |

**Governance gates:** All rollback executions require explicit user authorization. The decision to escalate an undocumented change to a security investigation (rather than retroactive documentation) is always a human decision.

---

## 13. AI Differentiation

| AI Capability | What It Enables | Why It Matters Here |
|---|---|---|
| **Automatic change attribution for Atlas-executed changes** | Every change Atlas executes is attributed, timestamped, and linked to the initiating user and change record without any manual action | This eliminates the most common source of undocumented changes — the gap between executing a change and creating the record |
| **Baseline diff for undocumented change detection** | Atlas compares the current Config-as-Code state against the registered baseline to identify changes that occurred outside Atlas | This makes undocumented changes visible without requiring human audit of every panel; Atlas surfaces the delta |
| **Change pattern context** | Atlas provides not just "this changed" but "this changed from X to Y, this configuration item affects these applications, and this is the most recent Atlas-executed change to the same component" | Turns a raw configuration diff into an attributed, contextualized investigation starting point |
| **Cross-change impact awareness** | Atlas understands whether an undocumented change could have contributed to a known incident or degraded a known configuration security baseline | Converts the undocumented change audit from an administrative task to a risk investigation |
| **Change history as query target** | Users can ask Atlas "what changed on PROD1 in the last 30 days?" in natural language and receive a structured answer | This is the answer to "what did we do to the system?" — a question that currently requires reviewing multiple logs manually |

---

## 14. Success Metrics

| Metric | Definition | Baseline (Without Atlas) | Target (With Atlas) |
|---|---|---|---|
| Change record coverage for Atlas-executed changes | Percentage of changes executed through Atlas that have an associated change record | ~60% today (manual record creation misses changes) | 100% for Atlas-executed changes at GA |
| Undocumented change detection latency | Time from when an out-of-Atlas change occurs to when Atlas surfaces it | Unlimited (not systematically monitored today) | Under 24 hours with Config-as-Code refresh; real-time at H2 2027 |
| Change record audit finding rate | Number of changes with missing records found in annual audit | 46 in 12 months (Kyle scenario baseline — a realistic enterprise estimate) | Under 5 per 12-month period with Atlas active |
| Out-of-window change alert response time | Time from Atlas detecting an out-of-window change to an authorized user acknowledging it | Typically discovered in post-mortems (days or weeks later) | Under 2 hours with Atlas real-time alerting |

---

## 15. Failure Modes

| Failure Scenario | Atlas Behavior | User Path |
|---|---|---|
| An out-of-Atlas change occurs between Config-as-Code refresh cycles and is not immediately detected | Atlas detects the change at the next refresh and surfaces it; it cannot alert in real time until continuous monitoring is available (H2 2027) | User accepts the detection latency at GA; continuous monitoring eliminates it at H2 2027 |
| An undocumented change turns out to be an emergency change that was made with verbal authorization but no record | Atlas surfaces the change as undocumented; investigation determines it was authorized | User retroactively creates the change record in ServiceNow and links it in Atlas; Atlas marks it as resolved |
| A rollback is requested for a change that was made outside Atlas (no Atlas change record) | Atlas can generate a rollback based on the Config-as-Code diff; it cannot trace the full change context because the change was not executed through Atlas | User provides change context manually; Atlas generates the rollback plan from the configuration delta |
| ServiceNow integration creates a record that is rejected by the ServiceNow workflow | Atlas logs the rejection and retains the change record locally; alerts the user that the ServiceNow record is pending manual review | User investigates the ServiceNow rejection and resolves it; Atlas links the record once it is accepted |
| A change window violation alert is a false positive (change window policy misconfigured) | Atlas surfaces the violation with the relevant policy rule; if the rule is incorrect, the user can update the change window definition | Quinn reviews and corrects the change window definition; Atlas retrospectively clears the false-positive alert |

---

## 16. Governance Requirements

| Requirement | Description | How Atlas Addresses It |
|---|---|---|
| Complete change record for every production change | Regulatory frameworks (SOX, DORA) and organizational policy require a change record for every production change | Atlas automatically generates change records for Atlas-executed changes; surfaces undocumented out-of-Atlas changes for retroactive documentation |
| Named authorization for every production change | Regulatory requirements mandate that production changes are authorized by a named individual | Atlas records named authorization at every production change gate; this is part of the Atlas change execution log |
| Change window compliance | Most organizations have defined change windows for production; changes outside windows require emergency authorization | Atlas monitors for out-of-window changes and alerts; the emergency authorization workflow is documented in Atlas |
| Audit trail for configuration changes | Auditors require a complete history of configuration changes, with attribution, for a specified lookback period | Atlas's change history model and Config-as-Code baseline diff provide the audit trail; the change audit report is the structured artifact for auditor review |

---

## 17. Related Use Cases

| Use Case | Relationship |
|---|---|
| UC-01: Vulnerability Remediation | UC-01 generates the most audit-critical change records in the Atlas library — the vulnerability-to-remediation trail with named authorization at each step. UC-14 governs those change records. |
| UC-03: Audit and Compliance | UC-14's change attribution data and undocumented change reports are primary inputs to UC-03's compliance evidence assembly workflow. The 46 undocumented changes finding is both a UC-14 output and a UC-03 audit finding. |
| UC-09: Environment Parity and Drift Control | UC-09's drift detection and UC-14's undocumented change detection are complementary: UC-09 detects that environments have diverged; UC-14 determines whether the divergence was a documented, authorized change or an undocumented one. |
| UC-13: Regulatory Change Response | Every remediation executed in UC-13 is a production change that must be traceable. UC-14's change governance infrastructure is the system that records and attributes UC-13's remediation actions. |

---

## 18. Future Direction

| Opportunity | Time Horizon | Notes |
|---|---|---|
| **ServiceNow bi-directional integration** | H2 2027 | Atlas changes automatically create ServiceNow records. ServiceNow approvals can trigger Atlas execution. The full ITSM loop — approve in ServiceNow, execute in Atlas, record in ServiceNow — is automated. This is the most impactful near-term enhancement for this use case. |
| **GitHub integration for code-level change traceability** | H2 2027 | When a z/OS application change is linked to a GitHub commit, Atlas connects the configuration change record to the code commit. This closes the gap between "what changed in the system?" and "what code change caused it?" — particularly relevant for CI/CD-influenced z/OS development workflows. |
| **Anomaly-based unauthorized change detection** | H2 2027 | Rather than relying only on Config-as-Code baseline diff (which detects changes after the fact), Atlas uses behavioral pattern analysis to detect suspicious change activity in real time — configuration changes at unusual times, by unusual user IDs, or affecting high-sensitivity components. |
| **Agentic change record hygiene** | 2028+ | Atlas automatically drafts retroactive change records for out-of-Atlas changes it has detected, using the configuration delta, the user who executed the change (if determinable), and the timing context. The draft is presented to Quinn for review and one-click submission to ServiceNow. Zero-touch change record hygiene for the standard undocumented change case. |

---

## Source Artifacts

This specification consolidates content from the following existing Atlas artifacts:

| Artifact | Contribution |
|---|---|
| [`atlas-use-case-library.md` UC-14](../atlas-use-case-library.md) | Use case definition, scenario list, business outcome, persona assignments, roadmap status, observations |
| [`design/flows/uc5-staff-onboarding.md`](../design/flows/uc5-staff-onboarding.md) Step 6 | 46 undocumented changes finding during onboarding conversation; canonical example of undocumented change detection as a side effect of environment orientation |
| [`design/flows/uc2-audit-compliance.md`](../design/flows/uc2-audit-compliance.md) Step 7 | 46 undocumented changes in 12-month change history; same finding appearing in an audit context — demonstrates the use case crosses multiple workflows |
| [`roadmap.md`](../roadmap/roadmap.md) | Phase 3 "ServiceNow integration (bi-directional)" |
| [`personas.md`](../personas.md) | Canonical persona definitions for Quinn, Annette, Derek, Zach |
