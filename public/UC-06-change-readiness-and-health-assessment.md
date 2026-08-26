# UC-06: Change Readiness & Health Assessment — Pain Points, Wows & Flow Analysis

> **Pillar:** System Intelligence (primary) + Change Intelligence (remediation path) + Predictive Intelligence (compound risk)
> **GA Status:** GA Dec 2026

---

## As-Is Flow — Current State (Without Atlas)

### Step 1 — Scope
**Brief:** User defines the scope of the health check — which LPAR, middleware stack, or event type is being assessed (pre-go-live, pre-audit, pre-change window).

**Personas involved:** Zach, Derek, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No standardized pre-event health check process — scope is defined informally and inconsistently across events and teams. | 💼 Business Impact — coverage depends on who remembered to check what; material risks are missed silently |
| Derek | For pre-audit configuration reviews, there is no self-service way to define compliance scope — Derek must engage Zach and Sage to understand what is even checkable. | 🔒 Skill Gap / Bottleneck — Derek cannot scope a configuration review without z/OS expert involvement |

---

### Step 2 — Assess
**Brief:** Collect and join configuration data, PTF inventory, security posture, and subsystem parameters across the scoped components to identify findings.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | A pre-go-live health check is assembled manually — one person checks PTF currency in SMP/E, another checks RACF panels, a third checks Db2 ZPARMs. The review takes hours and produces no structured artifact. | ⏱️ Lost Time — **4–8 hours** of multi-person manual effort for a single health check |
| Zach | Each tool shows only a fragment — PTF currency without security posture, security posture without CICS thread constraints. The cross-source view does not exist. | 💼 Business Impact — findings that span tool boundaries are missed entirely; these are the most dangerous findings |
| Sage | Security findings are reviewed in isolation from operational and patch findings — no integrated view of combined risk posture. | 💼 Business Impact — Sage may clear a security finding while unaware of a PTF gap that compounds its risk |

---

### Step 3 — Rank Findings
**Brief:** Organize findings by severity and identify compound risks — where multiple individually non-critical findings interact to create a higher-risk scenario.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No automated severity ranking or compound risk identification — Zach must interpret findings from multiple tools independently and try to mentally combine them. | ⏱️ Lost Time — **1–2 hours** attempting to synthesize findings across tools |
| Sage | Compound risks (missing security PTF + unencrypted connection = elevated combined risk) are invisible because they require joining two different subsystem views that different specialists own. | 💼 Business Impact — the most dangerous finding type — compound risk across tool boundaries — is systematically invisible |

---

### Step 4 — Generate Artifact
**Brief:** Produce a health assessment document — structured finding list with severity, source, recommendation, and remediation path — suitable for governance sign-off.

**Personas involved:** Zach, Quinn, Derek

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No structured artifact produced from the review — findings exist in notes, email, and memory. | 💼 Business Impact — no auditable record that a health review was conducted before the event |
| Quinn | Cannot approve or defer a go-live without a written risk assessment — Zach must produce a separate governance document after the review. | ⏱️ Lost Time — **1–3 hours** producing a separate governance summary from informal notes |
| Derek | The pre-audit configuration review produces no artifact; Derek has no evidence to show auditors that a review was conducted. | 💼 Business Impact — compliance gap: no pre-audit review evidence exists |

---

### Step 5 — Remediate
**Brief:** For findings that require correction before the event, plan and execute the remediation.

**Personas involved:** Zach, Sage

| Persona | Pain Point | Category |
|---|---|---|
| Zach | Finding a security PTF gap in the health check triggers a separate, manual remediation process with no connection to the assessment that found it. | ⏱️ Lost Time — **hours to days** manually scoping and executing a remediation that Atlas found during assessment |
| Sage | No way to verify that a remediation for one finding did not introduce a new gap without repeating the entire health check manually. | 💼 Business Impact — remediations made under pre-event pressure risk creating new compliance or operational gaps |

---

### Step 6 — Register Baseline
**Brief:** Record the post-assessment state as a health baseline for future drift monitoring.

**Personas involved:** Zach

| Persona | Pain Point | Category |
|---|---|---|
| Zach | No mechanism to register a post-assessment state as a baseline — each health check starts from scratch. Drift since the last assessment is invisible. | 💼 Business Impact — teams cannot track whether environment health is improving or degrading over time |

---

## To-Be Flow — Desired Outcome (With Atlas)

### Step 1 — Scope
**Brief:** User defines the health check scope; Atlas confirms what data it can collect and surfaces any gaps in discovery coverage.

**Personas involved:** Zach, Derek, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Scope definition takes seconds — select LPAR, event type, and assessment focus; Atlas confirms what it can assess immediately. | ⏱️ Time Saving — informal multi-person scoping discussion → **seconds** via Atlas |
| Derek | Derek can scope a pre-audit configuration review in Atlas independently — no z/OS expert required to translate compliance requirements into scope. | 🆕 New User Capability — Derek independently initiates health checks without Zach's involvement |

---

### Step 2 — Assess
**Brief:** Atlas joins Config-as-Code configuration data, PTF inventory, FIXCAT classifications, and security posture data across all scoped components simultaneously.

**Personas involved:** Atlas, Zach, Sage

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Full middleware stack health assessment in under 30 minutes — PTF currency, configuration compliance, security posture, performance constraints — all joined in one Atlas session. | ⏱️ Time Saving — **4–8 hours → under 30 minutes** for a full pre-event health check |
| Sage | Security findings presented in the context of the broader operational and patch picture — Sage sees compound risk, not just her individual security domain findings. | 🤖 Atlas AI Insight & Automation — cross-source join across CICS, Db2, MQ, RACF, and PTF inventory in a single assessment |

---

### Step 3 — Rank Findings
**Brief:** Atlas organizes findings by severity (critical, high, medium, low) and identifies compound risks where multiple findings interact to create elevated risk.

**Personas involved:** Atlas, Zach

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Findings automatically ranked by severity — Zach starts with the critical items, not with a flat list he must triage manually. | ⏱️ Time Saving — **1–2 hours manual triage → automatic severity ranking** |
| Zach | Compound risk identification: Atlas surfaces "missing CICS security PTF + unencrypted IPIC connection = compound risk higher than either finding alone" — a finding type that does not exist in any single tool. | 🤖 Atlas AI Insight & Automation — compound risk identification requires joining PTF inventory with configuration security state; only possible in Atlas |

---

### Step 4 — Generate Artifact
**Brief:** Atlas produces the health assessment document — structured finding list with severity, source, recommendation, and remediation path for each item. Exportable for governance sign-off.

**Personas involved:** Zach, Quinn, Derek

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Health assessment document generated automatically from the assessment — auditable record that a pre-event review was conducted, with full finding detail. | 🤖 Atlas AI Insight & Automation — structured health artifact generated from assessment data; no manual authoring |
| Quinn | Management-readable risk summary alongside technical findings — Quinn can approve or defer the event from the Atlas artifact without requiring a separate briefing. | 🆕 New User Capability — Quinn makes informed go/no-go decisions independently from the Atlas health artifact |
| Derek | Pre-audit configuration review produces an exportable, auditor-ready artifact — evidence of a systematic review conducted before the audit. | 🆕 New User Capability — Derek produces pre-audit compliance evidence without Zach's involvement |

---

### Step 5 — Remediate
**Brief:** User selects findings to remediate; Atlas transitions to Change Intelligence to generate and execute the remediation plan.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Health check finding → remediation plan in one session — Atlas transitions directly to a Change Intelligence workflow for each selected finding. No separate investigation or tool switch required. | ⏱️ Time Saving — **hours to days → immediate transition** from finding to remediation plan within Atlas |
| Zach | Post-remediation state is validated before the finding is marked closed — changes made to close health check findings are verified rather than assumed. | 🤖 Atlas AI Insight & Automation — pre-apply validation prevents remediation-induced gaps |

---

### Step 6 — Register Baseline
**Brief:** After assessment and any remediations, Atlas records the current state as the health baseline for ongoing drift monitoring.

**Personas involved:** Zach, Atlas

| Persona | Wow Moment | Category |
|---|---|---|
| Zach | Post-assessment baseline registered automatically — next health check can compare against a known good state, making drift immediately visible. | 🤖 Atlas AI Insight & Automation — baseline registration captures the current state as a reference point for continuous drift monitoring |

---

> **Overall outcome:** Pre-event health assessment reduced from 4–8 hours of multi-team effort to under 30 minutes from a single Atlas session. Compound risks visible for the first time. Every assessment produces a governance-ready artifact — auditable evidence that a review was conducted.
