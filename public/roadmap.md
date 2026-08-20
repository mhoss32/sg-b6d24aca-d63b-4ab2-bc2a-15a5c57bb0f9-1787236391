# Atlas — Outcome-Based Roadmap
*Last updated: August 2026 | Owner: Product Management*

---

## Product Vision Statement

Atlas transforms the mainframe from a system that demands deep tribal knowledge into one that any skilled practitioner can understand, safely change, and confidently operate — bringing the full power of z/OS infrastructure within reach of every person on the team, not just the few who have spent years mastering it.

---

## North Star Metric (NSM)

**Phase 1 (GA → H1 2027):** Weekly active artifacts generated per connected environment
— measures whether Atlas is actively being used to drive real decisions, not just installed.

**Phase 2 (H1 2027 → H2 2027):** % of environment change events that begin in Atlas
— measures whether Atlas has become the default entry point for change work.

**Phase 3 (2028+):** % of z/OS change lifecycle managed end-to-end in Atlas
(plan → assess → provision → test → deploy → monitor)
— the ultimate proxy for the 80% shift described in the long-term vision.

> **Rationale:** Artifact generation is the leading indicator in Phase 1 because it is immediately measurable from day one, directly reflects value delivery to individual users, and naturally ladders into the behavior change metric as provisioning and testing capabilities mature. We will instrument artifact creation events at launch.

---

## IBM Business Objectives

| # | Objective | Target | Time Horizon |
|---|-----------|--------|-------------|
| 1 | Capture net new z software revenue through Atlas as a standalone product | First paid logos at GA | Dec 2026 |
| 2 | Increase IBM zSW portfolio attach rate through Atlas integrations and upsell SKUs | Measurable attach lift | 2027 |
| 3 | Grow customer retention by reducing expert dependency and expanding the addressable user base on Z | Reduction in churn risk tied to skills gap | 2027–2028 |
| 4 | Establish Atlas as the front door to the IBM Z software portfolio | Platform transaction revenue contribution | 2028+ |

---

## The Pillars

Atlas is organized around three intelligence pillars that grow in capability and interdependency over time.

| Pillar | What It Delivers | When It Matures |
|--------|-----------------|-----------------|
| **System Intelligence** | Know your environment — topology, inventory, relationships, health | GA (Dec 2026) |
| **Change Intelligence** | Change safely — impact analysis, test orchestration, provisioning | H1 2027 → H2 2027 |
| **Predictive Intelligence** | Stay ahead — drift detection, DR validation, anomaly prediction | H2 2027 → 2028+ |

---

## Roadmap Timeline

### Phase 0 — Private Preview at IBM TechXchange
**Target: Oct 26, 2026**

**Theme:** Prove the platform. Show that Atlas can understand a real enterprise Z environment through natural conversation.

**Format:** Curated demo experience on IBM-hosted infrastructure. Customers interact with Atlas against a real discovered environment (Bank of Z topology). Private, invitation-only. No customer data required.

**Pillar:** System Intelligence (MVP)

**Product Outcomes:**
- ≥5 named enterprise accounts engaged and providing feedback
- Executive sponsors in target accounts briefed and aligned
- Pipeline generation signal for Q4/Q1 close motions

**Customer / Buyer Outcomes:**

| Outcome | Target Persona | Problem Solved |
|---------|---------------|----------------|
| "I can see exactly how Atlas answers questions about a real Z environment — and immediately see how it would work for mine" | Systems Programmer | Hours of manual lookups replaced by one conversation |
| "I can generate a health check artifact without writing a single query" | Systems Programmer / Ops Lead | Preparing for a system change or audit previously took days |
| "I can understand the blast radius of a change before I make it" | Systems Programmer / CISO | Risk of unexpected outages from uninformed changes |
| "I can onboard a new team member to this environment in minutes, not weeks" | Team Lead / Manager | Tribal knowledge is a flight risk |

**Capabilities Delivered:**

| Capability | Description | Pillar |
|-----------|-------------|--------|
| UI-driven z/OS discovery agent deployment | Install from Atlas Server UI; Kubernetes operator drives parallel deployment to z/OS systems | System Intelligence |
| Config-as-Code topology | OS, middleware, software, application discovery; attributes surfaced in topology graph DB | System Intelligence |
| PTF & software inventory | Z Software Discovery integration; installed PTF inventory + current availability from ibm.com; software compatibility reports | System Intelligence |
| Dynamic blueprint/topology UI | Pan, zoom, filter, highlight based on chat intent; intent-driven visualization | System Intelligence |
| Agentic chat (WXA4Z v2 in-cluster) | Multi-source querying via Topology Integration Broker (TIB); natural language answers across config, PTFs, inventory, transaction flows | System Intelligence |
| TIB integrations | Concert for Z, ZoC, Intellimagic, OMEGAMON, ServiceNow | System Intelligence |
| Unified install (Kubernetes operator) | One-step deployment of Atlas Server + WXA4Z v2 + entitled products across Linux x86, Linux on Z | Platform |

**Use Cases Demonstrated:**
1. **What PTFs are installed on my system?** — PTF inventory query + current availability gap analysis
2. **What is my system running?** — Full OS/MW/SW/Application topology exploration
3. **Health check before go-live** — Automated health artifact generation (config validation, known risk flags)
4. **Is my system exposed? What's the blast radius?** — Vulnerability / PTF exposure analysis
5. **Why do these two environments behave differently?** — Multi-system comparison and drift surface
6. **Walk me through a CICS transaction flow** — Application relationship discovery + dependency chain

> **TechXchange environment note:** The Phase 0 private preview runs on IBM-hosted infrastructure using zTrial/ZVA environments. zCX deployment support is deferred to Phase 3 (GA+2, H2 2027). ⚠️ *ZVA and zTrial platform details require confirmation from the Atlas platform team before use in customer-facing materials.*

**WXA4Z Skills Available at Tech Xchange:**
- Config-as-Code query skill
- PTF inventory + gap analysis skill
- Software inventory skill
- IBM.com PTF availability lookup skill
- Software compatibility report lookup skill
- Multi-system topology comparison skill

---

### Phase 1 — General Availability
**Target: Dec 11, 2026**

**Theme:** System Intelligence GA + Lean Change Intelligence. Reduce the workload of strategic practitioners by 60–80% for the tasks they do most.

**Long-term Progress Indicator:** 20% of change decisions start on Atlas (strategic practitioners driving artifacts that the rest of the team uses)

**Pillar:** System Intelligence (GA) + Change Intelligence (MVP — Lean PTF Orchestration)

**Product Outcomes:**
- First paid Atlas logos
- ≥10 environments connected across pilot customers
- Weekly active artifact generation rate established as baseline
- Change Intelligence scenario demonstrated end-to-end at least once per account

**Customer / Buyer Outcomes:**

| Outcome | Target Persona | Problem Solved |
|---------|---------------|----------------|
| "I can generate a staff onboarding guide for this environment in under 5 minutes" | Team Lead | New team member productivity time cut from weeks to days |
| "I can run an audit and compliance check and produce a report artifact without manually assembling evidence" | Systems Programmer / Compliance Lead | Audit prep reduced from days to hours |
| "I can understand the full impact of applying a PTF before I touch production" | Systems Programmer | PTF-related outages caused by insufficient impact analysis |
| "I can get a test plan, provision a virtual test environment, and run basic function tests — all from Atlas" | Systems Programmer | PTF validation cycle previously required dedicated lab time and deep expertise |
| "I can understand regulatory change requirements and map them to my environment" | CISO / Compliance Officer | Manual gap analysis between regulatory requirements and actual configuration |

**Capabilities Delivered:**

| Capability | Description | Pillar |
|-----------|-------------|--------|
| System Intelligence (full GA) | All Tech Xchange capabilities hardened for production; multi-tenant, enterprise SSO (external OIDC), role-based access | System Intelligence |
| Staff Onboarding artifact generation | AI-generated environment guide: topology overview, key components, relationships, known risks | System Intelligence |
| Health Check artifact generation | Automated pre-change / pre-audit health report with configurable checks and risk indicators | System Intelligence |
| Audit & Compliance artifact generation | Evidence collection and structured compliance artifact generation mapped to common frameworks | System Intelligence |
| Regulatory Change Response | Map incoming regulatory requirements to topology and surface compliance gaps | System Intelligence |
| **Lean PTF Orchestration (Change Intelligence MVP)** | End-to-end PTF change scenario: AI-assisted impact analysis → Atlas test plan → DIY L2 virtual LPAR provisioning → application component deployment → smoke/function test package execution | Change Intelligence |
| Virtual LPAR provisioning (DIY) | Customer-operated provisioning engine for L2 virtual monoplex LPARs; limited automation, customer executes; ⚠️ restricted to monoplex environments at GA — sysplex test environments are not supported; lays foundation for full Atlas-native provisioning in H1 2027 | Change Intelligence |
| **Application Deployment Engine** | Shared Atlas GA capability that deploys application components from the Atlas topology model into a provisioned monoplex environment after provisioning and before test execution; required for any change scenario involving application-level validation; used across all GA change use cases | Change Intelligence |
| Smoke and function test package | Smoke and basic functional tests scoped to the change; pass/fail results surfaced in Atlas; GA scope is restricted to monoplex environments | Change Intelligence |
| Vulnerability PTF handling (conditional) | Dependency on zSecure Portal team; if integration available, vulnerability PTFs included in PTF orchestration scenario | Change Intelligence |
| Packaging: Atlas Base | Core subscription including System Intelligence GA + Change Intelligence lean access (rate-limited to create upsell pressure) | Commercial |

**WXA4Z Skills Added at GA:**
- Staff onboarding guide generation skill
- Health check report generation skill
- Audit evidence assembly skill
- PTF impact analysis skill
- Regulatory change mapping skill

---

### Phase 2 — H1 2027
**Target: Q1–Q2 2027**

**Theme:** Change Intelligence grows up. Move from "lean" to capable. The first meaningful shift of change work off systems programmers begins. Software patch and MW upgrade scenarios become Atlas-native.

**Long-term Progress Indicator:** Approaching 50% of change work shifted off systems programmers; first SWDLC cycles run natively in Atlas

**Pillar:** Change Intelligence (Expanding) + System Intelligence (Deepening)

**Product Outcomes:**
- "Atlas Provision" add-on SKU available and metered; base users have taste of capability
- "Atlas Test" add-on SKU available with expanded test types
- Change Intelligence scenarios actively used in production accounts (not just POC)
- Measurable reduction in time-to-PTF-application reported by customers
- Application code-level change scenarios piloted with early adopters

**Customer / Buyer Outcomes:**

| Outcome | Target Persona | Problem Solved |
|---------|---------------|----------------|
| "Atlas can provision a real test LPAR for me — I don't need to manage the lab myself" | Systems Programmer | Lab environment setup is slow, error-prone, and requires expertise |
| "I can do integration testing natively in Atlas, not just function testing" | Systems Programmer / QA Lead | Integration testing requires complex environment coordination |
| "I can apply middleware and software patches through Atlas with full traceability" | Systems Programmer | MW/SW patches are slower and riskier than PTF-only changes |
| "I can do application code level changes with Atlas-assisted impact analysis" | Developer / Systems Programmer | Code changes on Z require deep understanding of application topology |
| "Atlas tells me what capacity I'm not using and what I can reclaim" | Infrastructure Lead / Finance | Dark capacity goes undetected; procurement decisions lack data |

**Capabilities Delivered:**

| Capability | Description | Pillar |
|-----------|-------------|--------|
| **Atlas-native LPAR provisioning** | Full automation of real LPAR provisioning; replaces DIY engine from GA; Atlas orchestrates the full provisioning cycle | Change Intelligence |
| Integration test orchestration | Integration tests added to test suite; broader coverage beyond function testing | Change Intelligence |
| Regression test orchestration | Automated regression test suite execution; pass/fail with change attribution | Change Intelligence |
| MW / software patch orchestration | Extend change intelligence beyond PTFs to middleware and software patch scenarios | Change Intelligence |
| Vulnerability PTF orchestration (if not at GA) | If zSecure dependency resolved in H1, security-driven PTF orchestration lands here | Change Intelligence |
| Application code change support | Application topology awareness applied to code change impact analysis; early adopter / limited availability | Change Intelligence |
| **Atlas Provision SKU** (separate entitlement) | Metered by provisioning events; unlocks full LPAR automation; base plan includes limited provisioning credits | Commercial |
| **Atlas Test SKU** (separate entitlement) | Metered by test executions; unlocks integration, regression test types; base plan includes limited test credits | Commercial |
| I/O topology discovery (Project Gravity integration) | I/O topology layer added to system map; storage, network I/O relationships surfaced alongside SW topology | System Intelligence |
| Capacity visibility | Dark capacity detection; resource utilization surfaced per LPAR/system; procurement support data | System Intelligence |
| Application Performance Diagnosis | Performance change attribution; diagnose application behavior changes tied to system modifications | System Intelligence |

**WXA4Z Skills Added in H1 2027:**
- LPAR provisioning orchestration skill
- Integration test orchestration skill
- Regression test orchestration skill
- MW/SW patch analysis skill
- Application code change impact analysis skill (early access)
- Capacity gap analysis skill
- Performance diagnosis skill

---

### Phase 3 — H2 2027
**Target: Q3–Q4 2027**

**Theme:** Predictive Intelligence emerges. Atlas moves from reactive to proactive. Config drift detection, DR validation, and advanced change analysis become core capabilities. The system starts learning.

**Long-term Progress Indicator:** 80% of change starts on Atlas for active accounts; sys progs confident delegating any minor or major change project to Atlas

**Pillar:** Predictive Intelligence (MVP) + Change Intelligence (Maturing) + System Intelligence (Business Services)

**Product Outcomes:**
- Predictive Intelligence scenarios demonstrated in production accounts
- Config drift alerts generating measurable intervention before outages
- DR validation scenario in use at ≥3 accounts
- Performance testing and stress testing piloted (dependent on CyberVault / GDPS integrations)
- Business service topology in early access
- GitHub and ServiceNow integrations driving Change Intelligence pipeline

**Customer / Buyer Outcomes:**

| Outcome | Target Persona | Problem Solved |
|---------|---------------|----------------|
| "Atlas tells me my environments have drifted before I discover it through an outage" | Systems Programmer / Ops | Configuration drift is one of the top causes of unexpected production incidents |
| "I can validate that my DR environment is production-ready before a test or real event" | BCDR Lead / Infrastructure Lead | DR tests are infrequent, manual, and often reveal gaps too late |
| "Atlas detected a change in my system behavior pattern before it became a problem" | Operations Lead | Anomaly detection requires dedicated monitoring tooling and expertise |
| "My developers can initiate changes on Z without me having to babysit every interaction" | Systems Programmer | Sysprog time consumed by admin work that doesn't require their expertise |
| "I can tie every change in Atlas back to a ServiceNow change record" | Change Manager | Audit trail for change management is manual and error-prone |

**Capabilities Delivered:**

| Capability | Description | Pillar |
|-----------|-------------|--------|
| **Config drift detection** | Continuous comparison of environment state against baseline or peer environment; alert on material drift | Predictive Intelligence |
| Disaster recovery validation | Validate DR environment topology parity with production; surface gaps and risk before a real event | Predictive Intelligence |
| Production parity analysis | Automated comparison of production vs. non-production environments; highlight structural differences | Predictive Intelligence |
| Anomaly prediction (early) | Pattern-based anomaly detection using historical topology and change data; early warning signals | Predictive Intelligence |
| **GitHub integration** | Connect Atlas change intelligence to GitHub; associate change events with code commits, PRs, and deployment pipelines | Change Intelligence |
| **ServiceNow integration** | Bi-directional integration with ServiceNow change request workflow; Atlas changes traceable to change records | Change Intelligence |
| Application modernization support | Atlas-assisted assessment and sequencing of application modernization activities on Z | Change Intelligence |
| Performance testing (conditional) | Dependent on CyberVault + GDPS for environment replication; if integrations land in H2 2027, performance testing enters the test suite | Change Intelligence |
| Stress testing (stretch, H2 2027 or later) | Full environment replication via CyberVault / GDPS; stress test and soak test scenarios | Change Intelligence |
| **zCX deployment support** | zCX added as a supported deployment target for Atlas Server; deferred from GA and GA+1 to Phase 3 (GA+2); TechXchange and GA use zTrial/ZVA environments | Platform |
| Business service topology | Map Z infrastructure and applications to business services; surface business impact of technical changes | System Intelligence |
| Application modernization topology | Identify modernization candidates; assess refactoring vs. re-platforming options with topology context | System Intelligence |

**WXA4Z Premium Skills (Feature-Flagged, H2 2027):**
- Config drift analysis and alerting skill
- DR readiness assessment skill
- GitHub change attribution skill
- ServiceNow change record skill
- Business service mapping skill
- Anomaly detection and early warning skill

---

### Phase 4 — 2028+
**Target: 2028 and beyond**

**Theme:** Atlas becomes the front door to IBM Z. Any practitioner planning to do a job on Z starts in Atlas. Environments are normalized, standardized, and self-learning. Atlas integrates with the broader IBM Z portfolio commercially and technically — without overstepping. Systems programmers evolve from administrators to strategic operators.

**Long-term Progress Indicator:** Atlas is the default entry point for all Z change work; meaningful commercial contribution through portfolio upsell/attach

**Pillar:** Platform Evolution (All Pillars Mature) + Portfolio Gateway

**Customer / Buyer Outcomes:**

| Outcome | Target Persona | Problem Solved |
|---------|---------------|----------------|
| "Any practitioner on my team — sysprog, developer, junior dev — starts on Atlas to understand and change our Z environment" | CIO / IT Director | Skills gap on Z is a board-level risk; Atlas democratizes access |
| "Atlas recommends other IBM products I should be using based on gaps it has detected in my environment" | IT Director / Procurement | Customers don't know what IBM products could help them; discovery is manual |
| "I can procure and activate an IBM Z product directly inside Atlas" | IT Director / Procurement | Software procurement on Z is slow and friction-heavy |
| "My Atlas environment learns from every change and helps me avoid repeating mistakes" | Systems Programmer / Ops | Institutional knowledge is captured in Atlas, not in people's heads |
| "Atlas has synergy with Concert for Z — I can use both and they complement each other" | Systems Programmer / IT Director | Customers want clear product differentiation; overlapping tools create confusion |

**Capabilities Planned:**

| Capability | Description | Pillar |
|-----------|-------------|--------|
| **IBM zSW portfolio gateway** | Atlas surfaces recommendations for relevant IBM Z products based on detected gaps; direct procurement / activation from within Atlas | Portfolio |
| Self-learning topology | Atlas learns from historical change outcomes and topology evolution; incorporates learning into recommendations | Predictive Intelligence |
| Concert for Z deep integration | Complementary integration without overlap; Atlas handles topology + change + predictive; Concert handles operational monitoring | Portfolio |
| Advanced stress testing | Full environment replication (CyberVault + GDPS); production-scale stress and performance testing | Change Intelligence |
| Developer-native Z workflows | Developer persona fully supported; junior devs can initiate and execute Z changes through Atlas without sysprog oversight | Change Intelligence |
| Environment normalization | Standardized environment templates; Atlas enforces and maintains configuration standards across environments | System Intelligence |
| Business service continuity planning | Business service topology used for continuity planning, BIA (Business Impact Analysis), and recovery orchestration | Predictive Intelligence |

---

## Strategic Evolution Arc

```
Now (Dec 2026)          →    H1 2027             →    H2 2027          →    2028+
──────────────────────       ──────────────────        ──────────────        ──────────────────
Know Your Environment        Change Safely               Stay Ahead            Front Door to Z

System Intelligence GA       Change Intelligence         Predictive Intell.    Portfolio Gateway
+ Lean Change MVP            (Full Capability)           (MVP → Mature)        + Self-Learning

Topology discovery           Real LPAR provisioning      Config drift          zSW upsell
PTF inventory                Integration testing         DR validation         Developer native
Artifact generation          MW/SW patch orch.           Anomaly prediction    Normalized envts
Health / audit / onboard     App code change support     GitHub + SN integ.    Self-learning AI
Agentic chat (TIB)           I/O topology (Gravity)      Biz service map       Concert synergy
```

---

## Persona-Value Map

| Persona | Value Unlocked at GA (Dec 2026) | Value Unlocked at H1 2027 | Value Unlocked at H2 2027+ |
|---------|--------------------------------|--------------------------|---------------------------|
| **Systems Programmer** | Topology answers in seconds; health check artifacts; PTF impact analysis; lean PTF test scenario | Atlas provisions test LPARs; integration + regression testing; MW/SW patches | Config drift alerts; DR validation; delegates minor changes to Atlas |
| **CISO / Compliance Officer** | Audit evidence artifacts; vulnerability exposure analysis; regulatory change mapping | Security PTF orchestration; automated compliance evidence | Continuous compliance posture; drift alerting |
| **Team Lead / Manager** | Staff onboarding artifacts; environment documentation | Capacity reporting; team productivity metrics | Full change governance visibility |
| **Developer** | Application topology visibility; transaction flow understanding | Application code change impact analysis (early access) | Developer-native Z change workflows; self-service testing |
| **IT Director / CIO** | Proof of platform; pipeline creation | Measurable productivity improvement data | Strategic view of Z portfolio; upsell recommendations; cost optimization |

---

## Packaging & Commercial Model

### Base Subscription (Atlas)
Includes System Intelligence (full), Lean Change Intelligence (rate-limited), and standard WXA4Z skills. Customers get a taste of provisioning and testing capabilities — enough to understand the value but with friction that creates upsell pressure.

### Atlas Provision (Add-On SKU)
- **Unlocks:** Full Atlas-native LPAR provisioning; automated provisioning orchestration; environment lifecycle management
- **Metered by:** Provisioning events / environment hours
- **Available:** H1 2027

### Atlas Test (Add-On SKU)
- **Unlocks:** Integration testing, regression testing, performance testing (when available); unlimited test executions; advanced test analytics
- **Metered by:** Test execution events
- **Available:** H1 2027

### Atlas Portfolio Gateway (Future, 2028+)
- **Unlocks:** IBM zSW product discovery, recommendations, and direct activation from within Atlas
- **Commercial model:** Platform transaction fee / referral revenue on activated products

---

## Master Epic Alignment

The following table maps roadmap phases to master epic buckets, enabling future synchronization when GitHub master epics are updated. Epic IDs are placeholders — update when epics are cleaned and numbered.

| Phase | Master Epic Bucket | GitHub Epic Label (placeholder) | Expected Delivery |
|-------|--------------------|----------------------------------|-------------------|
| Oct 2026 (Private Preview) | System Intelligence MVP | `epic/system-intelligence-mvp` | Oct 26, 2026 |
| Dec 2026 (GA) | System Intelligence GA | `epic/system-intelligence-ga` | Dec 11, 2026 |
| Dec 2026 (GA) | Change Intelligence MVP (Lean PTF) | `epic/change-intelligence-lean` | Dec 11, 2026 |
| H1 2027 | Change Intelligence — Provisioning | `epic/atlas-provision` | H1 2027 |
| H1 2027 | Change Intelligence — Testing | `epic/atlas-test` | H1 2027 |
| H1 2027 | Change Intelligence — MW/SW Patch | `epic/change-mwsw-patch` | H1 2027 |
| H1 2027 | System Intelligence — I/O Topology | `epic/io-topology-gravity` | H1 2027 |
| H2 2027 | Predictive Intelligence — Drift & DR | `epic/predictive-drift-dr` | H2 2027 |
| H2 2027 | Change Intelligence — GitHub + ServiceNow | `epic/change-integrations` | H2 2027 |
| H2 2027 | System Intelligence — Business Services | `epic/biz-service-topology` | H2 2027 |
| 2028+ | Portfolio Gateway | `epic/portfolio-gateway` | 2028+ |

> **Maintenance note:** When a master epic is re-sequenced in GitHub, update the "Expected Delivery" column in this table and verify the phase narrative above still reflects the correct scope.

---

## Key Dependencies & Risks

| Dependency | Risk | Mitigation | Owner |
|------------|------|-----------|-------|
| zSecure Portal integration (vulnerability PTFs) | Vulnerability PTF scenario may slip from GA to H1 2027 | Scope GA without vulnerability PTFs; plan H1 catch-up sprint | Dependency: zSecure Portal team |
| Project Gravity (I/O topology) | I/O discovery may slip from H1 to H2 2027 | I/O topology positioned as enhancement; does not block core change scenarios | Dependency: Project Gravity team |
| IBM CyberVault + GDPS (stress testing) | Full environment replication for stress testing is complex; likely H2 2027 or later | Performance and stress testing scoped as conditional; do not block roadmap commitments | Dependency: CyberVault + GDPS teams |
| WXA4Z v2 (FINN) in-cluster | SaaS-based FINN used at Aug playback; in-cluster by Sept target | Fallback to SaaS connectivity if in-cluster slips; not customer-visible at Tech Xchange | Atlas Platform squad |
| Customer data for discovery | Tech Xchange uses IBM-hosted environment (Bank of Z); real customer onboarding requires network connectivity + firewall exceptions | Provide clear network requirements documentation; offer IBM-hosted demo path as fallback | Atlas Solutions Engineering |
| Skills gap on customer side | Customers may lack skills to configure DIY provisioning engine at GA | Provide clear runbooks; offer PS engagement option; position H1 Atlas Provision SKU as the upgrade path | Atlas Product + PS |
| ⚠️ **Prerequisite-chain resolution (cross-product, unvalidated)** | Cross-product PTF fix-chain reasoning has not been validated against a representative multi-product scenario. Targeted for GA or GA+1 but not confirmed. Proof Point 3 in GA materials is conditional on this. | Do not include cross-product prereq-chain claims in external or customer-facing materials until validated. Withdraw Proof Point 3 if not validated by Dec 11 2026. | Atlas Change Intelligence squad |
| ⚠️ **zCX deployment support (deferred to GA+2)** | zCX is not available as a deployment target at GA or GA+1. TechXchange demo uses zTrial/ZVA. Phase 3 (H2 2027) is the planned target. | Plan for zCX integration in Phase 3 planning cycle. Do not reference zCX as a GA or H1 2027 deployment target. | Atlas Platform squad |
| ⚠️ **Application topology dependency for application-level impact analysis** | PTF impact claims at the application level depend on application topology data from ZUnderstand/ZoC. Without this data at GA, application-level impact analysis is limited to subsystem scope. | Scope GA impact analysis claims to subsystem level unless ZUnderstand/ZoC data is confirmed available. | Atlas Change Intelligence squad |

---

## Sales Summary

> This section is intended for sellers and technical sales to quickly understand what value is available when, and what conversations to lead with at each stage.

---

### What to sell TODAY (targeting GA Dec 11, 2026)

**Lead story:** *"Your systems programmers spend most of their time answering questions your team already has the data to answer. Atlas does that work for them — in seconds, with AI."*

| Customer Pain | Atlas Answer | When Available |
|--------------|-------------|----------------|
| "We don't know what's running on our Z systems without asking one specific person" | Automated OS/MW/SW/App topology discovery + natural language Q&A | GA Dec 2026 |
| "Onboarding a new team member to our Z environment takes weeks" | Staff onboarding artifact generation in minutes | GA Dec 2026 |
| "Our pre-change health checks and audit prep take days" | Health check and audit artifacts generated automatically | GA Dec 2026 |
| "We're nervous about PTF impact — we don't always know what will break" | AI-assisted PTF impact analysis + lean test scenario | GA Dec 2026 |
| "Our CISO needs proof of compliance posture and it's painful to produce" | Audit & compliance artifact generation with evidence collection | GA Dec 2026 |

**Proof point for executives:** Atlas has been running on a real IBM mainframe environment (Bank of Z) since mid-2026. Every demo scenario uses real discovered data — no mocked responses.

---

### What to sell for H1 2027 (land and expand)

**Lead story:** *"Once Atlas knows your environment, it can change it. H1 2027 unlocks the ability to provision test environments and run real testing — natively in Atlas."*

| Customer Pain | Atlas Answer | SKU |
|--------------|-------------|-----|
| "We don't have enough lab capacity for safe PTF and patch testing" | Atlas-native LPAR provisioning; Atlas provisions test environments on demand | Atlas Provision (add-on) |
| "Our regression testing is manual, slow, and often skipped under time pressure" | Automated integration and regression testing orchestrated by Atlas | Atlas Test (add-on) |
| "Applying middleware and software patches is our riskiest change type" | MW/SW patch orchestration with full impact analysis and test coverage | Atlas Base + add-ons |
| "Our developers touch Z but we can't give them enough context about impact" | Application code change impact analysis; app topology surfaced in chat | Atlas Base |

---

### What to sell for H2 2027 (strategic accounts)

**Lead story:** *"Atlas doesn't just help you change safely — it helps you stay ahead. Config drift, DR validation, and predictive alerting make Atlas the operational backbone for Z."*

| Customer Pain | Atlas Answer | SKU |
|--------------|-------------|-----|
| "We find out environments have drifted when production breaks, not before" | Continuous config drift detection and alerting | Atlas Base (Predictive) |
| "Our DR tests are infrequent and we're never confident in the results" | DR environment parity validation; automated readiness scoring | Atlas Base (Predictive) |
| "Every change needs a ServiceNow ticket but the data entry is manual" | ServiceNow bi-directional integration; Atlas changes auto-linked to change records | Atlas Base (Integrations) |
| "Our developers want to work on Z but our sysprogs can't babysit every change" | Developer-native change workflows; Atlas acts as guardrails + automation layer | Atlas Base + add-ons |

---

### Long-term vision (2028+) — use for C-suite conversations

*"IBM's vision is for Atlas to become the front door to the entire IBM Z software portfolio. Customers will procure, activate, and use IBM Z products directly within Atlas. The more an organization standardizes on Atlas, the more value they unlock — both from Atlas itself and from the broader IBM Z ecosystem."*

---

*Document maintained by Product Management. For GitHub epic synchronization, see the Master Epic Alignment section above. For questions, contact the Atlas product team.*
