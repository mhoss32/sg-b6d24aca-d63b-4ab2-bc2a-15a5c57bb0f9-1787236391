# UC-08: Platform Upgrade & Migration — Concert for Z Touchpoints

> **Source use case:** UC-08 Platform Upgrade & Migration
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Platform upgrade and migration is a high-relevance Concert for Z use case on both ends of the workflow. Upstream: Concert for Z's Risk Management module may detect that the estate is running software at a level that creates operational risk, triggering the upgrade initiative. Downstream: Concert for Z's post-upgrade behavioral monitoring is the primary mechanism for detecting silent regressions after each upgrade phase. The positioning document explicitly names the sequential workflow: Concert for Z detects the maintenance need; Atlas orchestrates and validates the change.

---

## Tier 1 — Explicit Handoff Points

### Step 1 — Scope (Concert4Z → Atlas)

**What Concert for Z has produced at this point:**
Concert for Z's Risk Management module — using IZSAM software inventory and APAR risk scoring — has identified that one or more components of the IBM Z software stack are at a level that creates unquantified operational risk: a z/OS version approaching end of support, a middleware version with known vulnerabilities in the FIXCAT, or a pattern of missing critical updates that individually appear manageable but collectively represent elevated risk.

**What is handed to Atlas:**
Concert for Z raises the upgrade as a required change — either through a change ticket or an Ansible-initiated remediation workflow for targeted, known fixes. Atlas takes the planned upgrade and applies full change intelligence: scoping compatibility impact across all LPARs and applications, generating the sequenced upgrade plan, provisioning phase validation environments, and orchestrating test execution for each phase. The upgrade initiative that Concert for Z flagged becomes a structured, validated Atlas-orchestrated project.

**What comes back:**
Atlas's completed upgrade record — all phases, all authorizations, all test results — is recorded in Atlas's change log. Concert for Z's Risk Management module sees the operational risk resolved and can consume the Atlas upgrade evidence for its operational record.

---

### Step 6 — Validate Each Phase (Atlas ↔ Concert4Z)

**What Atlas has produced at this point:**
Atlas has completed a phase of the upgrade and run regression tests. Atlas's behavioral monitoring is watching for post-phase behavior changes in the upgraded components.

**What Concert for Z contributes:**
Concert for Z's Observe module provides the production behavioral baseline that Atlas's post-phase monitoring compares against. If an upgraded subsystem is running differently — different CPU consumption patterns, different transaction response times, different I/O behavior — Concert for Z's continuous monitoring detects the behavioral change in production (or in a production-like environment) and surfaces it to Atlas's phase validation step. This extends Atlas's regression detection beyond test-environment pass/fail to include production-behavioral equivalence.

**What comes back:**
If Concert for Z detects a post-phase behavioral regression, Atlas treats it as a validation failure for the phase — investigating the cause and, if necessary, rolling back or remediating before the next phase begins.

---

## Tier 2 — Enrichment Touchpoints

### Step 2 — Assess

**How Concert for Z enriches this step:**
Atlas evaluates compatibility of all components against the target version. Concert for Z's ZEN data enriches the application-level compatibility assessment with runtime evidence of which application flows are actually active — ensuring that compatibility analysis prioritizes the programs and interfaces that are in active production use, not just those that are statically configured.

### Step 7 — Close

**How Concert for Z enriches this step:**
Atlas generates the complete upgrade record and registers the new baseline. Concert for Z's post-upgrade production monitoring provides the behavioral baseline that complements Atlas's configuration baseline — the complete "known good" state after the upgrade includes both the Atlas-registered configuration state and the Concert for Z-established behavioral baseline for the upgraded components.

---

> **Overall Concert for Z relevance for this use case:** High. Risk Management is a genuine upstream trigger for platform upgrade initiatives, and Concert for Z's behavioral monitoring is the primary production-side regression detection mechanism during and after upgrade execution. The positioning document describes this as a canonical sequential workflow.
