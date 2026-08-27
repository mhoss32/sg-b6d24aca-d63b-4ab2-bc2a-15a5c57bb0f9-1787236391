export interface UnitActivity {
  activity: string;
  tokens: string;
  units: string;
  provisionedEnv?: boolean;
}

export interface StepConsumption {
  stepNumber: number;
  stepName: string;
  description: string;
  activities: UnitActivity[];
  subtotal: string;
  note?: string;
}

export interface FlowSummaryRow {
  step: string;
  activity: string;
  units: string;
}

export interface EstateSizeRow {
  scenario: string;
  adjustment: string;
  multiplierDisplay: string;
  multiplierValue: number;
}

export interface AdditionalAdjustmentRow {
  scenario: string;
  adjustment: string;
  unitDelta: number;
}

export interface UseCaseUnitConsumption {
  useCaseId: string;
  steps: StepConsumption[];
  fullFlowSummary: FlowSummaryRow[];
  estateSize: EstateSizeRow[];
  additionalAdjustments: AdditionalAdjustmentRow[];
}

// UC-01: Vulnerability Remediation
export const uc01UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-01",
  steps: [
    {
      stepNumber: 1,
      stepName: "Detect / Trigger",
      description: "Entry A — user queries Atlas after an advisory is published. Entry B — Atlas proactively surfaces a FIXCAT security gap via continuous PTF inventory monitoring.",
      activities: [
        { activity: "Advisory interpretation / PTF currency check (chat)", tokens: "Footprint", units: "0" },
        { activity: "Proactive FIXCAT gap detection signal", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Assess Exposure",
      description: "Simultaneously queries all connected LPARs to identify which are running the affected product at the affected PTF level. Surfaces PTF gap details, FIXCAT classification, HIPER status.",
      activities: [
        { activity: "Multi-LPAR exposure assessment (system assessment)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
      note: "The multi-LPAR exposure assessment is Atlas's primary intelligence output at this step. A complex estate with 20+ LPARs may push this toward the upper bound of the 250K estimate.",
    },
    {
      stepNumber: 3,
      stepName: "Traverse Blast Radius",
      description: "Traverses the dependency graph from each exposed component. Maps which applications, transactions, downstream systems (Db2, MQ, datasets), external APIs, and DR environments are reachable.",
      activities: [
        { activity: "Blast radius traversal and dependency map (system assessment)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
      note: "If blast radius is included in the same assessment workflow as Step 2 (single structured output), the two steps together = 1 × system assessment (2.5 units).",
    },
    {
      stepNumber: 4,
      stepName: "Plan Remediation",
      description: "Generates the sequenced remediation plan: PTF prerequisite chain resolved, LPAR apply order, maintenance window recommendations, test environment specification, test scenarios scoped to affected applications, DR sequenced in.",
      activities: [
        { activity: "Sequenced remediation plan with PTF prerequisite resolution", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 5,
      stepName: "Provision + Test",
      description: "Provisions test environment, executes test plan against the PTF-applied environment, attributes failures, generates configuration updates (e.g. CSD changes) when test failures reveal them, validates the fix.",
      activities: [
        { activity: "Virtual test environment provision (1 provision)", tokens: "1 successful provision", units: "0.1", provisionedEnv: true },
        { activity: "Functional test suite generated for affected applications", tokens: "300,000 tokens", units: "3.0" },
        { activity: "Configuration update artifact (e.g. CSD update generated)", tokens: "~50,000 tokens (sub-artifact within functional test workflow)", units: "included in functional test" },
      ],
      subtotal: "3.1",
      note: "Test generation is metered; test execution is not. If re-provisioning is required due to configuration changes, each successful re-provision adds 0.1 units.",
    },
    {
      stepNumber: 6,
      stepName: "Decide",
      description: "Surfaces test results and recommendation to Zach. Awaits explicit authorization. No inference artifact generated beyond the recommendation summary (part of the test report).",
      activities: [],
      subtotal: "0",
    },
    {
      stepNumber: 7,
      stepName: "Execute (Production Apply)",
      description: "Orchestrates production apply across LPARs in sequenced order. Each LPAR apply requires individual authorization. Progress visible in real time. DR remediation follows production.",
      activities: [
        { activity: "Production apply orchestration (no new inference artifact — execution only)", tokens: "Footprint", units: "0" },
        { activity: "DR environment provision (if Atlas-provisioned DR test prior to DR apply)", tokens: "1 successful provision", units: "0.1", provisionedEnv: true },
      ],
      subtotal: "0.1",
    },
    {
      stepNumber: 8,
      stepName: "Monitor",
      description: "Monitors for exploitation activity on patched and unpatched LPARs during the remediation window. Proactively flags open DR exposure.",
      activities: [
        { activity: "Continuous monitoring (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Exploitation alert synthesis (if triggered — conditional)", tokens: "~50,000 tokens", units: "0.5 (conditional)" },
      ],
      subtotal: "0",
      note: "Nominal: 0 units. If exploitation alert triggered: 0.5 units (conditional).",
    },
    {
      stepNumber: 9,
      stepName: "Close",
      description: "Generates the complete remediation record — exposure assessment, blast radius map, plan, test results, apply log, authorization chain. ServiceNow ticket updated. Audit trail sealed.",
      activities: [
        { activity: "Remediation evidence package (audit trail + change record)", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Detect", activity: "Advisory interpretation / proactive FIXCAT alert", units: "0" },
    { step: "2 — Assess Exposure", activity: "Multi-LPAR exposure assessment", units: "2.5" },
    { step: "3 — Blast Radius", activity: "Dependency traversal and topology map", units: "2.5" },
    { step: "4 — Plan", activity: "Sequenced remediation plan", units: "2.5" },
    { step: "5 — Provision + Test", activity: "Test environment provision + functional test suite", units: "3.1" },
    { step: "6 — Decide", activity: "Results review, authorization prompt", units: "0" },
    { step: "7 — Execute", activity: "Production apply orchestration + DR provision", units: "0.1" },
    { step: "8 — Monitor", activity: "Continuous monitoring (+ optional alert artifact)", units: "0–0.5" },
    { step: "9 — Close", activity: "Evidence package / audit trail", units: "4.0" },
  ],
  estateSize: [
    { scenario: "Small estate (≤5 LPARs, 1 affected)", adjustment: "Simpler exposure scan; no blast radius", multiplierDisplay: "~0.5×", multiplierValue: 0.5 },
    { scenario: "Standard (10–20 LPARs, moderate blast radius)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Large estate (30+ LPARs, complex blast radius, multi-phase)", adjustment: "Additional assessment depth; multiple test environments", multiplierDisplay: "~1.4–1.7×", multiplierValue: 1.7 },
  ],
  additionalAdjustments: [
    { scenario: "Step 2+3 combined as single assessment", adjustment: "One assessment instead of two", unitDelta: -2.5 },
    { scenario: "Exploitation alert triggered during monitoring", adjustment: "Add 0.5 conditional units", unitDelta: 0.5 },
  ],
};

// UC-02: Patch Management
export const uc02UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-02",
  steps: [
    {
      stepNumber: 1,
      stepName: "Identify Applicable PTFs",
      description: "Scans the connected estate for applicable PTFs in the current RSU or FIXCAT category, filtered by the organization's patching policy.",
      activities: [
        { activity: "PTF inventory scan and prioritization", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Assess PTF Readiness",
      description: "Generates a readiness assessment: prerequisite chain resolution, PE flag check, HOLD analysis, application impact summary, and maintenance window feasibility.",
      activities: [
        { activity: "PTF readiness assessment (prerequisite chain + impact analysis)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 3,
      stepName: "Plan the Patch Cycle",
      description: "Generates the sequenced patch plan for the maintenance window: LPAR apply order, co-requisite grouping, maintenance window slot assignments, rollback checkpoints.",
      activities: [
        { activity: "Sequenced patch plan generation", tokens: "~125,000", units: "1.25" },
      ],
      subtotal: "1.25",
    },
    {
      stepNumber: 4,
      stepName: "Provision + Test",
      description: "Provisions a test environment at the current LPAR state, applies the PTF set, runs the functional test suite against the patched environment.",
      activities: [
        { activity: "Virtual test environment provision", tokens: "1 successful provision", units: "0.1", provisionedEnv: true },
        { activity: "Functional test suite generated", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.1",
    },
    {
      stepNumber: 5,
      stepName: "Authorize",
      description: "Presents test results and the patch recommendation to Zach. Awaits explicit approval.",
      activities: [],
      subtotal: "0",
    },
    {
      stepNumber: 6,
      stepName: "Execute",
      description: "Orchestrates the patch apply across LPARs in the sequenced order within the maintenance window.",
      activities: [
        { activity: "Patch apply orchestration (execution, no new inference artifact)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 7,
      stepName: "Validate",
      description: "Post-apply validation: confirms the PTFs are active and correct on each LPAR, runs smoke tests, checks for unexpected configuration state changes.",
      activities: [],
      subtotal: "0",
    },
    {
      stepNumber: 8,
      stepName: "Record",
      description: "Generates the patch cycle record — PTFs applied, LPARs covered, test evidence, authorization chain, maintenance window log.",
      activities: [
        { activity: "Patch cycle evidence package", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Identify", activity: "PTF inventory scan (footprint)", units: "0" },
    { step: "2 — Assess Readiness", activity: "PTF readiness assessment", units: "2.5" },
    { step: "3 — Plan", activity: "Sequenced patch plan", units: "1.25" },
    { step: "4 — Provision + Test", activity: "Test environment + functional test suite", units: "3.1" },
    { step: "5 — Authorize", activity: "Results review, approval prompt", units: "0" },
    { step: "6 — Execute", activity: "Production apply orchestration", units: "0" },
    { step: "7 — Validate", activity: "Post-apply validation, smoke tests", units: "0" },
    { step: "8 — Record", activity: "Evidence package / change record", units: "4.0" },
  ],
  estateSize: [
    { scenario: "Minimal patch (single PTF, single LPAR)", adjustment: "No test environment, no full assessment", multiplierDisplay: "~0.4×", multiplierValue: 0.4 },
    { scenario: "Standard maintenance window (5–10 PTFs, 3–5 LPARs)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Complex window (20+ PTFs, multi-subsystem, 10+ LPARs)", adjustment: "Full system assessment + 2 functional test suites", multiplierDisplay: "~1.5–1.7×", multiplierValue: 1.7 },
  ],
  additionalAdjustments: [
    { scenario: "Emergency HIPER patch (no scheduled test window, expedited)", adjustment: "Abbreviated readiness check; test skipped with risk acceptance", unitDelta: -4 },
    { scenario: "Monthly cadence (12 maintenance windows per year)", adjustment: "~130 units/year for a mid-size shop", unitDelta: 0 },
  ],
};

// UC-03: Audit and Compliance
export const uc03UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-03",
  steps: [
    {
      stepNumber: 1,
      stepName: "Trigger",
      description: "Audit period opens, compliance deadline approaches, or a new regulatory requirement is identified.",
      activities: [
        { activity: "Audit initiation, framework orientation", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Scope the Compliance Assessment",
      description: "Determines which systems, subsystems, applications, and environments are in scope for the audit.",
      activities: [
        { activity: "In-scope system identification (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 3,
      stepName: "Assess Configuration State",
      description: "Collects current configuration state and evaluates it against compliance baselines: RACF permission sets, cryptographic settings, audit logging configuration, PTF currency against security FIXCATs, network encryption state, dataset protections.",
      activities: [
        { activity: "Configuration compliance assessment (multi-system, multi-control)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Map Findings to Control Framework",
      description: "Maps each finding to specific control identifiers in the applicable framework.",
      activities: [
        { activity: "Control framework mapping (findings → framework identifiers)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 5,
      stepName: "Generate Evidence Package",
      description: "Assembles the full, audit-ready evidence package: control-by-control status, supporting evidence citations, exception documentation, control-to-system mapping, remediation recommendations for gaps, and change history traceability.",
      activities: [
        { activity: "Compliance evidence package generation", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
    {
      stepNumber: 6,
      stepName: "Review and Validate",
      description: "Surfaces the evidence package to Derek, Sage, or Quinn for review. Highlights exceptions and gaps that require human remediation or attestation.",
      activities: [],
      subtotal: "0",
    },
    {
      stepNumber: 7,
      stepName: "Ongoing Compliance Monitoring",
      description: "Between audit cycles, Atlas continuously monitors for configuration drift that would create new compliance gaps.",
      activities: [
        { activity: "Continuous drift monitoring (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Triggered re-assessment when significant drift detected (conditional)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "0",
      note: "Nominal: 0 units. If drift-triggered reassessment: 2.5 units (conditional).",
    },
    {
      stepNumber: 8,
      stepName: "Respond to Findings / Remediation",
      description: "For gaps identified in the evidence package, Atlas generates remediation plans.",
      activities: [
        { activity: "Remediation plan for identified compliance gaps (per cluster)", tokens: "~125,000", units: "1.25" },
      ],
      subtotal: "1.25",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Trigger", activity: "Audit initiation, framework orientation", units: "0" },
    { step: "2 — Scope", activity: "In-scope system identification (footprint)", units: "0" },
    { step: "3 — Assess", activity: "Configuration compliance assessment", units: "2.5" },
    { step: "4 — Map", activity: "Control framework mapping", units: "2.5" },
    { step: "5 — Evidence Package", activity: "Full audit evidence package", units: "4.0" },
    { step: "6 — Review", activity: "Results review (footprint)", units: "0" },
    { step: "7 — Monitor", activity: "Ongoing drift monitoring (+ conditional re-assessment)", units: "0–2.5" },
    { step: "8 — Remediate", activity: "Remediation plans for gaps (per cluster)", units: "1.25+" },
  ],
  estateSize: [
    { scenario: "Single framework, small scope (≤3 LPARs)", adjustment: "Simpler assessment; lighter evidence package", multiplierDisplay: "~0.6–0.7×", multiplierValue: 0.7 },
    { scenario: "Standard annual audit (SOX or PCI, 5–10 LPARs)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Multi-framework audit (SOX + PCI + HIPAA simultaneously)", adjustment: "1 assessment + 3 separate evidence packages", multiplierDisplay: "~1.6–2.0×", multiplierValue: 2.0 },
  ],
  additionalAdjustments: [
    { scenario: "Pre-audit readiness sweep added before formal audit", adjustment: "Two full assessment + evidence cycles instead of one", unitDelta: 10.25 },
    { scenario: "Continuous compliance monitoring (monthly re-assessment)", adjustment: "+12 drift reassessments/year at 2.5 units each", unitDelta: 30 },
    { scenario: "Each additional remediation cluster found during audit", adjustment: "One additional remediation plan per cluster", unitDelta: 1.25 },
  ],
};

// UC-04: Staff Onboarding
export const uc04UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-04",
  steps: [
    {
      stepNumber: 1,
      stepName: "Identify Knowledge Gap",
      description: "A new team member or their manager initiates an onboarding workflow. Atlas identifies the new hire's role, responsibilities, and the systems they will be accountable for.",
      activities: [
        { activity: "Role and scope scoping (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Generate Environment Context",
      description: "Atlas generates a structured overview of the environment the new hire will work in: topology of relevant systems, key subsystem relationships, software versions, PTF currency state, configuration highlights, and known open items.",
      activities: [
        { activity: "Environment context document (topology + configuration overview)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 3,
      stepName: "Build Onboarding Content",
      description: "Generates the personalized onboarding content package for the new hire — tailored to their role and the specific systems they are assigned to.",
      activities: [
        { activity: "Role-specific onboarding content package", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Guided Exploration",
      description: "The new hire uses Atlas conversationally to explore the environment, ask questions, trace dependencies, understand configurations.",
      activities: [
        { activity: "Ongoing chat and navigation (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 5,
      stepName: "Task Delegation",
      description: "Zach (or another senior) delegates a specific task to the new hire. Atlas generates step-by-step execution guidance tailored to the delegated task and the delegatee's skill level.",
      activities: [
        { activity: "Task delegation guidance document (per significant delegated task)", tokens: "~100,000", units: "1.0" },
      ],
      subtotal: "1.0",
    },
    {
      stepNumber: 6,
      stepName: "Ongoing Learning and Refreshes",
      description: "As the environment changes, Atlas can refresh the onboarding content to keep it current.",
      activities: [
        { activity: "Onboarding content refresh (triggered by significant environment change)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
      note: "Conditional, not per onboarding event.",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Identify Gap", activity: "Role and scope scoping (footprint)", units: "0" },
    { step: "2 — Environment Context", activity: "Environment overview document", units: "2.5" },
    { step: "3 — Onboarding Content", activity: "Role-specific onboarding package", units: "2.5" },
    { step: "4 — Guided Exploration", activity: "Ongoing chat and navigation (footprint)", units: "0" },
    { step: "5 — Task Delegation", activity: "Per-task execution guidance", units: "1.0 (per task)" },
    { step: "6 — Refresh", activity: "Content refresh when environment changes", units: "2.5 (conditional)" },
  ],
  estateSize: [
    { scenario: "Narrow onboarding (1 subsystem, 1 LPAR)", adjustment: "Lighter content package", multiplierDisplay: "~0.7×", multiplierValue: 0.7 },
    { scenario: "Standard (mid-level hire, 3–4 subsystems)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Senior role onboarding (broad scope, multi-subsystem)", adjustment: "Richer content package (400K tokens = 4.0 units)", multiplierDisplay: "~1.2×", multiplierValue: 1.2 },
  ],
  additionalAdjustments: [
    { scenario: "Each additional hire onboarded in the same cycle", adjustment: "+1 content package + 1 environment context per hire", unitDelta: 5.0 },
    { scenario: "Annual content refresh per hire", adjustment: "2 refreshes/year at 2.5 units each", unitDelta: 5.0 },
    { scenario: "Each additional delegated task guidance document", adjustment: "One additional task execution guidance artifact", unitDelta: 1.0 },
  ],
};

// UC-05: Application Discovery and Dependency Analysis
export const uc05UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-05",
  steps: [
    {
      stepNumber: 1,
      stepName: "Trigger",
      description: "User asks Atlas to discover what's in the environment — either a broad question, or a focused query about a specific component.",
      activities: [
        { activity: "Query initiation (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Discover",
      description: "Atlas collects the inventory of running applications, subsystems, transactions, APIs, datasets, and their interconnections.",
      activities: [
        { activity: "Inventory collection (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 3,
      stepName: "Build Dependency Map",
      description: "From the discovered inventory, Atlas constructs the dependency graph — which applications call which subsystems, which transactions access which datasets, which external APIs are served by which CICS programs.",
      activities: [
        { activity: "Dependency map navigation (interactive, footprint)", tokens: "Footprint", units: "0" },
        { activity: "Structured dependency analysis document (generated artifact)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "0",
      note: "Navigation = 0 units. Structured analysis = 2.5 units.",
    },
    {
      stepNumber: 4,
      stepName: "Analyze Impact",
      description: "For a specific component or change in scope, Atlas traverses the dependency graph to determine impact.",
      activities: [
        { activity: "Application impact analysis (change impact / blast radius)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 5,
      stepName: "Generate Report",
      description: "Produces a structured discovery and dependency report — the complete, shareable artifact for architects or project teams planning a change project.",
      activities: [
        { activity: "Application discovery and dependency report", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 6,
      stepName: "Ongoing Topology Refresh",
      description: "As the environment changes, Atlas updates the topology model.",
      activities: [
        { activity: "Discovery scan refresh (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Topology change summary document (conditional, if generated)", tokens: "~100,000", units: "1.0" },
      ],
      subtotal: "0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Trigger", activity: "Query initiation (footprint)", units: "0" },
    { step: "2 — Discover", activity: "Inventory collection (footprint)", units: "0" },
    { step: "3 — Map", activity: "Dependency map (navigation = 0; structured analysis = 2.5)", units: "0–2.5" },
    { step: "4 — Analyze Impact", activity: "Application impact analysis", units: "2.5" },
    { step: "5 — Report", activity: "Application discovery and dependency report", units: "2.5" },
    { step: "6 — Refresh", activity: "Topology refresh (footprint; change summary = 1.0 conditional)", units: "0–1.0" },
  ],
  estateSize: [
    { scenario: "Small estate (single component impact query)", adjustment: "Navigation only or one focused assessment", multiplierDisplay: "0–0.5×", multiplierValue: 0.5 },
    { scenario: "Standard (change project scope, 5–10 apps)", adjustment: "Impact analysis + dependency report (baseline)", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Comprehensive architectural discovery (full estate, 20+ apps)", adjustment: "Three assessments (deep analysis)", multiplierDisplay: "~1.5×", multiplierValue: 1.5 },
  ],
  additionalAdjustments: [
    { scenario: "Structured dependency analysis added (Step 3)", adjustment: "Third assessment artifact added to the flow", unitDelta: 2.5 },
    { scenario: "Monthly topology health summary report", adjustment: "One additional system assessment per month", unitDelta: 2.5 },
    { scenario: "Topology change summary on each refresh", adjustment: "Small change summary artifact per refresh cycle", unitDelta: 1.0 },
  ],
};

// UC-06: Change Readiness and Health Assessment
export const uc06UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-06",
  steps: [
    {
      stepNumber: 1,
      stepName: "Trigger",
      description: "A change is planned and Zach or Alice asks Atlas to assess whether the target system is ready. Or Atlas proactively surfaces a health concern.",
      activities: [
        { activity: "Change context intake (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Baseline Collection",
      description: "Atlas collects current system state across all dimensions relevant to the proposed change: PTF currency, configuration settings, subsystem health indicators, application connectivity, open incidents, and any pending changes that could conflict.",
      activities: [
        { activity: "Configuration collection, inventory lookup, topology navigation (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 3,
      stepName: "Health Assessment",
      description: "Atlas analyzes the collected baseline and produces a structured health assessment for the target system(s): overall readiness score, specific risk factors, recommended remediation actions for any blockers, and a go/no-go recommendation.",
      activities: [
        { activity: "System health and change readiness assessment", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Readiness Decision",
      description: "Surfaces the assessment to Zach. If the system is ready, Atlas confirms and records the readiness confirmation with timestamp. If there are blockers, Atlas identifies them and generates a remediation plan.",
      activities: [
        { activity: "Readiness confirmation (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Remediation plan for blockers (conditional, if blockers found)", tokens: "~125,000", units: "1.25" },
      ],
      subtotal: "0",
      note: "Clear = 0 units. Blockers = 1.25 units.",
    },
    {
      stepNumber: 5,
      stepName: "Change Proceeds (or Blocked)",
      description: "If no blockers, the change proceeds. Atlas records the readiness assessment in the change record.",
      activities: [
        { activity: "Change record update (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 6,
      stepName: "Post-Change Validation",
      description: "After the change is applied, Atlas performs a post-change health check — confirming the system is behaving as expected, comparing pre-change and post-change state, and flagging any anomalies introduced by the change.",
      activities: [
        { activity: "Post-change health check (system assessment)", tokens: "250,000", units: "2.5" },
        { activity: "Pre/post-change state comparison (environment comparison)", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "2.5",
      note: "Health check = 2.5 units. State comparison = 3.0 units.",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Trigger", activity: "Change context intake (footprint)", units: "0" },
    { step: "2 — Baseline", activity: "Configuration collection (footprint)", units: "0" },
    { step: "3 — Health Assessment", activity: "System health and readiness assessment", units: "2.5" },
    { step: "4 — Decision", activity: "Readiness confirmation; blockers plan (conditional)", units: "0–1.25" },
    { step: "5 — Change", activity: "Change record update (footprint)", units: "0" },
    { step: "6 — Post-Change", activity: "Post-change health check OR state comparison", units: "2.5–3.0" },
  ],
  estateSize: [
    { scenario: "Quick pre-change check (single LPAR, low-risk change)", adjustment: "One lightweight assessment only; no post-change check", multiplierDisplay: "~0.5×", multiplierValue: 0.5 },
    { scenario: "Standard change readiness + post-change validation", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Major change (z/OS upgrade, multi-LPAR)", adjustment: "Two full assessments + environment comparison", multiplierDisplay: "~1.5–1.6×", multiplierValue: 1.6 },
  ],
  additionalAdjustments: [
    { scenario: "Blockers found requiring remediation plan", adjustment: "One additional remediation plan artifact", unitDelta: 1.25 },
    { scenario: "Post-change state comparison used instead of second assessment", adjustment: "Environment comparison (3.0) in place of system assessment (2.5)", unitDelta: 0.5 },
    { scenario: "Monthly health checks across 10 LPARs", adjustment: "10 additional assessment events per month", unitDelta: 25.0 },
  ],
};

// UC-07: Application Change Management
export const uc07UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-07",
  steps: [
    {
      stepNumber: 1,
      stepName: "Change Initiated",
      description: "Developer initiates a change — a new feature, bug fix, or configuration change. Atlas intakes the change context and navigates topology to understand what the changed component connects to.",
      activities: [
        { activity: "Change intake, topology navigation (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Impact Analysis",
      description: "Atlas analyzes the impact of the proposed change — which downstream systems, transactions, datasets, and external APIs are affected.",
      activities: [
        { activity: "Application change impact analysis", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 3,
      stepName: "Test Environment Provisioned",
      description: "Atlas provisions an isolated test environment at the current production configuration state.",
      activities: [
        { activity: "Test environment provision (1 provision)", tokens: "1 successful provision", units: "0.1", provisionedEnv: true },
      ],
      subtotal: "0.1",
    },
    {
      stepNumber: 4,
      stepName: "Tests Generated",
      description: "Atlas generates the test suite for the change — scoped to the affected programs, transactions, and interfaces identified in Step 2.",
      activities: [
        { activity: "Unit tests generated (per test × number of tests)", tokens: "15,000 per test", units: "0.15 per test" },
        { activity: "Functional test suite generated (covers ~30 test cases)", tokens: "300,000", units: "3.0" },
        { activity: "Directional performance test generated (if applicable)", tokens: "500,000", units: "5.0" },
      ],
      subtotal: "4.5",
      note: "Typical: 4.5 units (unit + functional). With perf test: 9.5 units.",
    },
    {
      stepNumber: 5,
      stepName: "Tests Executed and Validated",
      description: "Executes the generated tests against the provisioned environment. Surfaces pass/fail results with attribution.",
      activities: [
        { activity: "Test execution (not metered)", tokens: "—", units: "0" },
        { activity: "Fix recommendation for test failures (conditional, per failure)", tokens: "~50,000", units: "0.5" },
      ],
      subtotal: "0",
      note: "Nominal: 0 units. Per failure: 0.5 units.",
    },
    {
      stepNumber: 6,
      stepName: "Promoted to Next Environment",
      description: "Change is approved and promoted from dev → test → QA → production. Each environment promotion may require a new provision event.",
      activities: [
        { activity: "Additional environment provision per promotion stage", tokens: "1 provision per stage", units: "0.1 per stage" },
      ],
      subtotal: "0.1",
    },
    {
      stepNumber: 7,
      stepName: "Recorded",
      description: "Change record generated — what changed, what was tested, what the test results were, who authorized the promotion, when it went to production.",
      activities: [
        { activity: "Application change record (structured artifact)", tokens: "~200,000", units: "2.0" },
      ],
      subtotal: "2.0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Initiated", activity: "Change intake, topology navigation (footprint)", units: "0" },
    { step: "2 — Impact Analysis", activity: "Application change impact assessment", units: "2.5" },
    { step: "3 — Provision", activity: "Test environment provision", units: "0.1" },
    { step: "4 — Test Generation", activity: "Unit tests + functional test suite", units: "4.5" },
    { step: "5 — Execute", activity: "Test execution (+ fix recs conditional)", units: "0–0.5" },
    { step: "6 — Promote", activity: "Environment provisions per stage", units: "0.1–0.3" },
    { step: "7 — Record", activity: "Application change record", units: "2.0" },
  ],
  estateSize: [
    { scenario: "Minor fix (1 program, no functional test)", adjustment: "5 unit tests + change record only; no impact analysis", multiplierDisplay: "~0.4×", multiplierValue: 0.4 },
    { scenario: "Standard application change", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Complex change (multi-program, performance-sensitive)", adjustment: "+ directional performance test", multiplierDisplay: "~1.5×", multiplierValue: 1.5 },
  ],
  additionalAdjustments: [
    { scenario: "Each additional unit test generated beyond baseline 10", adjustment: "One additional unit test artifact", unitDelta: 0.15 },
    { scenario: "Directional performance test added", adjustment: "Performance test asset generated", unitDelta: 5.0 },
    { scenario: "Change record upgraded to full evidence package (UC-14 requirement)", adjustment: "Evidence package (4.0) replaces partial record (2.0)", unitDelta: 2.0 },
    { scenario: "Fix recommendation required for each test failure", adjustment: "One additional structured fix artifact per failure", unitDelta: 0.5 },
  ],
};

// UC-08: Platform Upgrade and Migration
export const uc08UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-08",
  steps: [
    {
      stepNumber: 1,
      stepName: "Assess (Compatibility Impact Sweep)",
      description: "Inventories all components in scope, checks all 300+ applications and configurations against the target version's compatibility matrix.",
      activities: [
        { activity: "Full compatibility impact sweep (large estate, z/OS version upgrade)", tokens: "~375,000", units: "3.75" },
      ],
      subtotal: "3.75",
    },
    {
      stepNumber: 2,
      stepName: "Sequence",
      description: "Determines the correct upgrade order for interdependent subsystems.",
      activities: [
        { activity: "Subsystem upgrade sequencing analysis", tokens: "~150,000", units: "1.5" },
      ],
      subtotal: "1.5",
    },
    {
      stepNumber: 3,
      stepName: "Plan",
      description: "Generates the full, phased upgrade plan: phase-by-phase scope, test criteria, production promotion decision points, rollback checkpoints, and maintenance window assignments across all LPARs.",
      activities: [
        { activity: "Phased upgrade plan generation", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Provision (per test phase)",
      description: "For each phase of the upgrade, Atlas provisions an isolated test environment at the current version, applies the upgrade to that environment, and prepares it for regression testing.",
      activities: [
        { activity: "Test environment provision per phase (× 4 phases typical)", tokens: "4 successful provisions", units: "0.4", provisionedEnv: true },
      ],
      subtotal: "0.4",
    },
    {
      stepNumber: 5,
      stepName: "Test (per phase)",
      description: "For each phase, Atlas runs the full regression test suite against the upgraded environment — all affected applications, all subsystem interfaces.",
      activities: [
        { activity: "Functional test suite per application (× 20 applications)", tokens: "300,000 per suite", units: "3.0 per suite" },
        { activity: "Directional performance test (1 per phase to check for performance regression)", tokens: "500,000", units: "5.0" },
      ],
      subtotal: "65.0",
      note: "Dominant cost driver. 20 apps × 3.0 = 60 units per phase + 5.0 perf test = 65 units per phase. Across 4 phases: ~260 units.",
    },
    {
      stepNumber: 6,
      stepName: "Remediate",
      description: "For each compatibility issue found during testing, Atlas generates a specific remediation.",
      activities: [
        { activity: "Remediation plan per compatibility finding cluster", tokens: "~125,000 per cluster", units: "1.25 per cluster" },
      ],
      subtotal: "12.5",
      note: "Est. 10 clusters typical.",
    },
    {
      stepNumber: 7,
      stepName: "Promote",
      description: "User authorizes promotion from test → QA → production for each phase. Atlas executes the promotion and generates a phase-promotion record.",
      activities: [
        { activity: "Phase promotion record (per phase, structured artifact)", tokens: "~50,000", units: "0.5 per phase" },
      ],
      subtotal: "2.0",
      note: "0.5 × 4 phases = 2.0 units.",
    },
    {
      stepNumber: 8,
      stepName: "Monitor",
      description: "After each production promotion, Atlas monitors for behavioral changes, performance impacts, and post-upgrade anomalies.",
      activities: [
        { activity: "Post-upgrade anomaly report (conditional, per event)", tokens: "250,000", units: "2.5" },
        { activity: "Post-upgrade environment comparison (pre/post state diff)", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.0",
    },
    {
      stepNumber: 9,
      stepName: "Close — Upgrade Completion Record",
      description: "Generates the full upgrade completion record — all compatibility findings, remediation evidence, phase promotion records, test results, authorization chain, and post-upgrade validation.",
      activities: [
        { activity: "Upgrade project evidence package", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Assess", activity: "Compatibility impact sweep", units: "3.75" },
    { step: "2 — Sequence", activity: "Subsystem upgrade sequencing", units: "1.5" },
    { step: "3 — Plan", activity: "Phased upgrade plan", units: "2.5" },
    { step: "4 — Provision", activity: "4 × test environment provisions", units: "0.4" },
    { step: "5 — Test", activity: "20 apps × 4 phases functional tests + perf tests", units: "~260" },
    { step: "6 — Remediate", activity: "10 compatibility finding clusters", units: "~12.5" },
    { step: "7 — Promote", activity: "4 × phase promotion records", units: "2.0" },
    { step: "8 — Monitor", activity: "Post-upgrade comparison per phase", units: "3.0" },
    { step: "Close", activity: "Upgrade evidence package", units: "4.0" },
  ],
  estateSize: [
    { scenario: "Small upgrade (5 apps, 2 phases)", adjustment: "Proportional reduction in test generation + fewer phases", multiplierDisplay: "~0.17×", multiplierValue: 0.17 },
    { scenario: "Middleware-only upgrade (CICS TS, 1 subsystem, 2 phases)", adjustment: "Single subsystem scope; fewer applications in test sweep", multiplierDisplay: "~0.13–0.16×", multiplierValue: 0.15 },
    { scenario: "Medium upgrade (10 apps, 3 phases)", adjustment: "Proportional", multiplierDisplay: "~0.48×", multiplierValue: 0.48 },
    { scenario: "Full z/OS upgrade (20 apps, 4 phases)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
  ],
  additionalAdjustments: [
    { scenario: "Each additional application in test scope", adjustment: "+1 functional test suite per phase per app", unitDelta: 12.0 },
    { scenario: "Each additional upgrade phase", adjustment: "+20 apps × 3.0 functional tests + 1 perf test", unitDelta: 65.0 },
    { scenario: "Each additional compatibility finding cluster requiring remediation", adjustment: "One additional remediation plan per cluster", unitDelta: 1.25 },
    { scenario: "Post-upgrade anomaly report triggered", adjustment: "Additional system assessment on anomaly detection", unitDelta: 2.5 },
  ],
};

// UC-09: Environment Parity and Drift Control
export const uc09UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-09",
  steps: [
    {
      stepNumber: 1,
      stepName: "Trigger",
      description: "User asks Atlas to compare two environments — or Atlas proactively detects a drift event and surfaces it.",
      activities: [
        { activity: "Trigger intake (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Collect State",
      description: "Atlas collects the current state of both environments being compared — PTF levels, software versions, configuration settings, RACF definitions, cryptographic settings, dataset allocations, subsystem definitions.",
      activities: [
        { activity: "Configuration collection, inventory lookup, topology navigation (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 3,
      stepName: "Compare Environments",
      description: "Atlas compares the collected state of the two (or more) environments: identifies every difference, categorizes each difference, and produces a structured diff report with risk classification.",
      activities: [
        { activity: "Environment comparison (2 environments)", tokens: "300,000", units: "3.0" },
        { activity: "Additional environment in the comparison", tokens: "+150,000 per additional env", units: "+1.5 per env" },
      ],
      subtotal: "3.0",
      note: "Baseline = 3.0 units (2-environment). 3–4 environments = 4.5–6.0 units.",
    },
    {
      stepNumber: 4,
      stepName: "Classify Drift",
      description: "For each identified difference, Atlas classifies it: expected difference, unintended drift, or risk.",
      activities: [
        { activity: "Drift risk assessment (if significant findings require separate structured analysis)", tokens: "~100,000", units: "1.0" },
      ],
      subtotal: "0",
      note: "Nominal: 0 units. If drift risk assessment generated: 1.0 unit.",
    },
    {
      stepNumber: 5,
      stepName: "Remediate",
      description: "For unintended drift, Atlas generates a remediation plan — what needs to change in which environment to restore parity.",
      activities: [
        { activity: "Drift remediation plan (per cluster of related drift items)", tokens: "~125,000", units: "1.25 per cluster" },
      ],
      subtotal: "1.25",
    },
    {
      stepNumber: 6,
      stepName: "Validate",
      description: "After remediation is applied, Atlas runs a follow-up comparison to confirm parity has been restored.",
      activities: [
        { activity: "Post-remediation environment comparison (validation)", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.0",
    },
    {
      stepNumber: 7,
      stepName: "Record",
      description: "Generates the parity record — comparison result, drift findings, remediation applied, post-remediation validation.",
      activities: [
        { activity: "Environment parity record", tokens: "~150,000", units: "1.5" },
      ],
      subtotal: "1.5",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Trigger", activity: "Trigger intake (footprint)", units: "0" },
    { step: "2 — Collect State", activity: "Configuration collection (footprint)", units: "0" },
    { step: "3 — Compare", activity: "Environment comparison (2 environments)", units: "3.0" },
    { step: "4 — Classify", activity: "Drift classification (within comparison; risk assessment conditional)", units: "0–1.0" },
    { step: "5 — Remediate", activity: "Drift remediation plan", units: "1.25" },
    { step: "6 — Validate", activity: "Post-remediation comparison", units: "3.0" },
    { step: "7 — Record", activity: "Parity record", units: "1.5" },
  ],
  estateSize: [
    { scenario: "Read-only parity check (no remediation, no validation)", adjustment: "Comparison artifact only; no remediation or validation steps", multiplierDisplay: "~0.34×", multiplierValue: 0.34 },
    { scenario: "2-environment comparison with single remediation", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "3-environment comparison (prod / QA / dev)", adjustment: "Additional environment added to comparison scope", multiplierDisplay: "~1.17×", multiplierValue: 1.17 },
  ],
  additionalAdjustments: [
    { scenario: "Each additional environment added to a comparison", adjustment: "Extended comparison scope per environment", unitDelta: 1.5 },
    { scenario: "Drift risk assessment generated (significant findings)", adjustment: "Additional structured risk analysis artifact", unitDelta: 1.0 },
    { scenario: "Weekly automated parity checks (no remediation, 52/year)", adjustment: "Comparison-only events at 3.0 units each", unitDelta: 3.0 },
    { scenario: "Each additional remediation cluster found", adjustment: "One additional remediation plan artifact", unitDelta: 1.25 },
  ],
};

// UC-10: Disaster Recovery Validation
export const uc10UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-10",
  steps: [
    {
      stepNumber: 1,
      stepName: "Trigger",
      description: "Scheduled DR validation window opens, or Atlas has flagged open DR exposure (from UC-01 monitoring), or a manual validation is initiated.",
      activities: [
        { activity: "Scope intake (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Assess DR Parity",
      description: "Atlas compares the DR environment to its production counterpart across all dimensions: PTF levels, software versions, RACF definitions, subsystem configuration, cryptographic settings, dataset allocations, network definitions.",
      activities: [
        { activity: "Production vs. DR environment comparison", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.0",
    },
    {
      stepNumber: 3,
      stepName: "DR Readiness Assessment",
      description: "Beyond raw parity, Atlas assesses whether the DR environment is operationally ready: Are all required subsystems defined? Is the DR LPAR configured to accept the production workload?",
      activities: [
        { activity: "DR operational readiness assessment", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Provision DR Test Environment",
      description: "To validate functional equivalence (not just configuration parity), Atlas provisions a test instance of the DR environment and runs it through functional scenarios that mirror production workloads.",
      activities: [
        { activity: "DR test environment provision", tokens: "1 successful provision", units: "0.1", provisionedEnv: true },
      ],
      subtotal: "0.1",
    },
    {
      stepNumber: 5,
      stepName: "Validate Functional Equivalence",
      description: "Atlas generates and executes functional tests that confirm the DR environment can serve production transactions equivalently.",
      activities: [
        { activity: "Functional test suite for DR equivalence validation", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.0",
    },
    {
      stepNumber: 6,
      stepName: "Record DR Validation",
      description: "Generates the DR validation record — the compliance-grade evidence that the DR environment was tested and validated.",
      activities: [
        { activity: "DR validation evidence package", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
    {
      stepNumber: 7,
      stepName: "Ongoing DR Monitoring",
      description: "Between formal validation cycles, Atlas monitors the DR environment for configuration drift from production (UC-09 overlap).",
      activities: [
        { activity: "Continuous DR drift monitoring (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Drift alert artifact (conditional, if significant drift detected)", tokens: "~150,000", units: "1.5" },
      ],
      subtotal: "0",
      note: "Nominal: 0 units. If drift alert triggered: 1.5 units (conditional).",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Trigger", activity: "Scope intake (footprint)", units: "0" },
    { step: "2 — Parity Check", activity: "Production vs. DR comparison", units: "3.0" },
    { step: "3 — Readiness Assessment", activity: "DR operational readiness assessment", units: "2.5" },
    { step: "4 — Provision", activity: "DR test environment provision", units: "0.1" },
    { step: "5 — Validate", activity: "Functional equivalence test suite", units: "3.0" },
    { step: "6 — Record", activity: "DR validation evidence package", units: "4.0" },
    { step: "7 — Monitor", activity: "Ongoing drift monitoring (footprint)", units: "0" },
  ],
  estateSize: [
    { scenario: "Lightweight parity check only (no functional test)", adjustment: "Comparison + readiness assessment only; no test suite", multiplierDisplay: "~0.44×", multiplierValue: 0.44 },
    { scenario: "Standard annual DR validation (regulatory compliance)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Complex DR validation (multiple application tiers, two DR sites)", adjustment: "2× comparisons + 2× test suites + evidence package", multiplierDisplay: "~1.6–1.75×", multiplierValue: 1.75 },
  ],
  additionalAdjustments: [
    { scenario: "Each additional DR site added to validation scope", adjustment: "Additional comparison + test suite per site", unitDelta: 6.1 },
    { scenario: "Quarterly instead of annual validation cadence", adjustment: "3 additional full validation cycles per year", unitDelta: 37.8 },
    { scenario: "Interim drift monitoring re-assessment triggered", adjustment: "One additional partial assessment per drift event", unitDelta: 1.5 },
    { scenario: "DR validation combined with UC-09 parity cycle", adjustment: "Eliminates duplicate Step 2 comparison", unitDelta: -3.0 },
  ],
};

// UC-11: Capacity Planning and Performance Readiness
export const uc11UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-11",
  steps: [
    {
      stepNumber: 1,
      stepName: "Trigger",
      description: "A change is approaching and Alex or Zach needs to know whether capacity and performance are adequate. Or Atlas proactively surfaces a capacity concern based on trend analysis.",
      activities: [
        { activity: "Trigger intake, trend signal surfacing (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Baseline Analysis",
      description: "Atlas collects the current performance baseline for the affected systems: MSU utilization trends, response time baselines, transaction throughput, memory and storage headroom, Db2 buffer pool utilization, CPU-bound transaction identification.",
      activities: [
        { activity: "Raw baseline collection (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Baseline performance summary document (if generated)", tokens: "~100,000", units: "1.0" },
      ],
      subtotal: "0",
      note: "Collection = 0 units. Summary document = 1.0 unit.",
    },
    {
      stepNumber: 3,
      stepName: "Capacity Assessment",
      description: "Atlas assesses whether current capacity headroom is sufficient for the projected workload change.",
      activities: [
        { activity: "Capacity gap assessment", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Performance Test Generated",
      description: "Atlas generates the directional performance test configuration — the workload definition, baseline measurements to capture, post-change measurement points, comparison thresholds, and result criteria.",
      activities: [
        { activity: "Directional performance test asset generated", tokens: "500,000", units: "5.0" },
      ],
      subtotal: "5.0",
    },
    {
      stepNumber: 5,
      stepName: "Provision Performance Test Environment",
      description: "Atlas provisions an environment at production-equivalent capacity configuration for the performance test.",
      activities: [
        { activity: "Performance test environment provision", tokens: "1 successful provision", units: "0.1", provisionedEnv: true },
      ],
      subtotal: "0.1",
    },
    {
      stepNumber: 6,
      stepName: "Execute",
      description: "Test execution is performed by Alex using the generated test asset. Atlas monitors the execution and collects results.",
      activities: [
        { activity: "Test execution (not metered)", tokens: "—", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 7,
      stepName: "Analyze Results",
      description: "Atlas analyzes the performance test results against the baseline and the expected behavior.",
      activities: [
        { activity: "Performance test results analysis", tokens: "~150,000", units: "1.5" },
      ],
      subtotal: "1.5",
    },
    {
      stepNumber: 8,
      stepName: "Recommend",
      description: "Atlas generates capacity and configuration recommendations based on the analysis.",
      activities: [
        { activity: "Capacity and tuning recommendations (if standalone document)", tokens: "~100,000", units: "1.0" },
      ],
      subtotal: "0",
      note: "Typically included in Step 7. Standalone = 1.0 unit.",
    },
    {
      stepNumber: 9,
      stepName: "Record",
      description: "Generates the performance readiness record — baseline, test configuration, test results, analysis, and capacity recommendations.",
      activities: [
        { activity: "Performance readiness record (structured artifact)", tokens: "~200,000", units: "2.0" },
        { activity: "Full evidence package (if regulatory CAB requirement)", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "2.0",
      note: "Readiness record = 2.0 units. Evidence package = 4.0 units.",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Trigger", activity: "Trigger intake (footprint)", units: "0" },
    { step: "2 — Baseline", activity: "Collection (footprint; summary doc optional)", units: "0–1.0" },
    { step: "3 — Capacity Assessment", activity: "Capacity gap assessment", units: "2.5" },
    { step: "4 — Performance Test", activity: "Directional performance test asset", units: "5.0" },
    { step: "5 — Provision", activity: "Test environment provision", units: "0.1" },
    { step: "6 — Execute", activity: "Test execution (not metered)", units: "0" },
    { step: "7 — Analyze", activity: "Results analysis", units: "1.5" },
    { step: "8 — Recommend", activity: "Recommendations (if standalone)", units: "0–1.0" },
    { step: "9 — Record", activity: "Performance readiness record", units: "2.0" },
  ],
  estateSize: [
    { scenario: "Capacity assessment only (no performance test)", adjustment: "Assessment + record only; no test generation or provision", multiplierDisplay: "~0.41×", multiplierValue: 0.41 },
    { scenario: "Standard performance readiness cycle", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Multiple applications in scope (3 directional perf tests)", adjustment: "One additional performance test per application", multiplierDisplay: "~2.1×", multiplierValue: 2.1 },
  ],
  additionalAdjustments: [
    { scenario: "Directional performance test added per application", adjustment: "One additional 500K-token test asset per application", unitDelta: 5.0 },
    { scenario: "Full evidence package required instead of readiness record", adjustment: "Evidence package (4.0) replaces performance record (2.0)", unitDelta: 2.0 },
    { scenario: "Baseline performance summary generated (Step 2)", adjustment: "Additional structured baseline summary artifact", unitDelta: 1.0 },
    { scenario: "Standalone recommendations document generated (Step 8)", adjustment: "Separate recommendations artifact beyond results analysis", unitDelta: 1.0 },
  ],
};

// UC-12: Application Modernization
export const uc12UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-12",
  steps: [
    {
      stepNumber: 1,
      stepName: "Assess Modernization Scope",
      description: "Atlas analyzes the application portfolio to identify modernization candidates — applications using deprecated interfaces, batch programs that could benefit from API exposure, CICS programs that could be containerized.",
      activities: [
        { activity: "Application modernization readiness assessment", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 2,
      stepName: "Identify Target Architecture",
      description: "For the selected modernization target, Atlas identifies the target architecture pattern, the required interface changes, and the expected behavior equivalence criteria.",
      activities: [
        { activity: "Target architecture design document (if standalone)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "0",
      note: "0 if included in Step 1. 2.5 if standalone.",
    },
    {
      stepNumber: 3,
      stepName: "Plan Modernization",
      description: "Generates the phased modernization plan: which components to modernize in which order, what the dependency sequence is, what the test criteria are for behavioral equivalence at each step, and what the rollback path is.",
      activities: [
        { activity: "Phased modernization plan", tokens: "~150,000", units: "1.5" },
      ],
      subtotal: "1.5",
    },
    {
      stepNumber: 4,
      stepName: "Provision Test Environment",
      description: "Atlas provisions an isolated test environment representing the current (pre-modernization) state of the application, alongside the target (post-modernization) architecture.",
      activities: [
        { activity: "Test environment provision (current state)", tokens: "1 provision", units: "0.1", provisionedEnv: true },
        { activity: "Test environment provision (target architecture)", tokens: "1 provision", units: "0.1", provisionedEnv: true },
      ],
      subtotal: "0.2",
    },
    {
      stepNumber: 5,
      stepName: "Implement and Test",
      description: "As each modernization step is implemented, Atlas generates tests to validate behavioral equivalence — that the modernized component behaves the same as the legacy component for all defined business scenarios.",
      activities: [
        { activity: "Unit tests for modernized components (per test)", tokens: "15,000", units: "0.15 per test" },
        { activity: "Functional test suite for behavioral equivalence", tokens: "300,000", units: "3.0 per suite" },
        { activity: "Directional performance test (if modernization changes performance profile)", tokens: "500,000", units: "5.0" },
      ],
      subtotal: "4.5",
      note: "Typical: 4.5 units (unit + functional). With perf test: 9.5 units.",
    },
    {
      stepNumber: 6,
      stepName: "Validate Equivalence",
      description: "Runs a formal equivalence comparison — Atlas compares the behavior of the legacy and modernized components side by side, across all test scenarios.",
      activities: [
        { activity: "Legacy vs. modernized component equivalence comparison", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.0",
    },
    {
      stepNumber: 7,
      stepName: "Promote",
      description: "Promotes the modernized component through the pipeline to production. Each promotion may require a new environment provision event.",
      activities: [
        { activity: "Promotion environment provision (if needed per stage)", tokens: "1 per stage", units: "0.1 per stage" },
      ],
      subtotal: "0.1",
    },
    {
      stepNumber: 8,
      stepName: "Record",
      description: "Generates the modernization completion record — scope of modernization, test evidence, equivalence validation, authorization chain.",
      activities: [
        { activity: "Modernization evidence package", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Assess", activity: "Modernization readiness assessment", units: "2.5" },
    { step: "2 — Target Architecture", activity: "Design document (if standalone)", units: "0–2.5" },
    { step: "3 — Plan", activity: "Phased modernization plan", units: "1.5" },
    { step: "4 — Provision", activity: "2 × test environments", units: "0.2" },
    { step: "5 — Test", activity: "Unit tests + functional test suite", units: "4.5" },
    { step: "6 — Validate", activity: "Equivalence comparison", units: "3.0" },
    { step: "7 — Promote", activity: "Promotion environment (optional)", units: "0.1" },
    { step: "8 — Record", activity: "Modernization evidence package", units: "4.0" },
  ],
  estateSize: [
    { scenario: "Simple API exposure (1 CICS program, no perf test)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Complex modernization (multi-program, perf-sensitive)", adjustment: "+ architecture doc + directional performance test", multiplierDisplay: "~1.5×", multiplierValue: 1.5 },
    { scenario: "Portfolio modernization (10 components)", adjustment: "10× test + equivalence + 1 shared assessment + 1 evidence", multiplierDisplay: "~5–6×", multiplierValue: 5.5 },
  ],
  additionalAdjustments: [
    { scenario: "Standalone target architecture design document", adjustment: "Separate architecture artifact in addition to readiness assessment", unitDelta: 2.5 },
    { scenario: "Directional performance test added", adjustment: "Performance test asset to validate modernization impact", unitDelta: 5.0 },
    { scenario: "Each additional modernized component in same project", adjustment: "Additional test suite + equivalence comparison + provisions", unitDelta: 6.3 },
    { scenario: "Modernization assessment amortised across portfolio (shared Step 1)", adjustment: "Single assessment shared across all components", unitDelta: -2.5 },
  ],
};

// UC-13: Regulatory Change Response
export const uc13UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-13",
  steps: [
    {
      stepNumber: 1,
      stepName: "Regulatory Change Identified",
      description: "Derek or Sage identifies a new or changed regulatory requirement. Atlas interprets the requirement, maps it to the technical controls it affects in the IBM Z environment, and establishes the compliance scope.",
      activities: [
        { activity: "Regulatory interpretation and scope mapping (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Impact Scoping",
      description: "Atlas identifies all systems, configurations, processes, and evidence items affected by the regulatory change.",
      activities: [
        { activity: "Regulatory change impact scope analysis", tokens: "~125,000", units: "1.25" },
      ],
      subtotal: "1.25",
    },
    {
      stepNumber: 3,
      stepName: "Gap Assessment",
      description: "Atlas assesses the current state of in-scope systems against the new regulatory requirements. Identifies specific gaps — configurations that don't meet the new standard, missing controls, evidence that doesn't yet exist.",
      activities: [
        { activity: "Regulatory compliance gap assessment (current state vs. new standard)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 4,
      stepName: "Response Plan",
      description: "Atlas generates the regulatory response plan — the specific technical changes required to close each gap, in what sequence, with what validation criteria, and by what deadline.",
      activities: [
        { activity: "Regulatory response plan", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 5,
      stepName: "Implement Changes",
      description: "The response plan is executed — configuration changes, PTF applies, RACF updates, encryption enablement, etc.",
      activities: [
        { activity: "Test environment provision (1 per significant change cluster)", tokens: "1 provision", units: "0.1", provisionedEnv: true },
        { activity: "Functional test suite (validate the change doesn't break behavior)", tokens: "300,000", units: "3.0" },
      ],
      subtotal: "3.1",
    },
    {
      stepNumber: 6,
      stepName: "Generate Compliance Evidence",
      description: "Atlas generates the regulatory compliance evidence package — the formal document that proves the organization has responded to the regulatory change.",
      activities: [
        { activity: "Regulatory compliance evidence package", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
    {
      stepNumber: 7,
      stepName: "Validate",
      description: "Atlas runs a post-implementation compliance validation — confirming that all required changes have been made, all gaps are closed, and the evidence package is complete and accurate.",
      activities: [
        { activity: "Post-implementation compliance validation", tokens: "~100,000", units: "1.0" },
      ],
      subtotal: "1.0",
    },
    {
      stepNumber: 8,
      stepName: "Record",
      description: "The evidence package serves as the primary record. Atlas updates the compliance posture model to reflect the new regulatory requirement as a baseline going forward.",
      activities: [
        { activity: "Posture model update (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Identify", activity: "Regulatory interpretation (footprint)", units: "0" },
    { step: "2 — Scope", activity: "Impact scope analysis", units: "1.25" },
    { step: "3 — Gap Assessment", activity: "Current state vs. new standard", units: "2.5" },
    { step: "4 — Response Plan", activity: "Regulatory response plan", units: "2.5" },
    { step: "5 — Implement", activity: "Test environment + functional test", units: "3.1" },
    { step: "6 — Evidence", activity: "Regulatory compliance evidence package", units: "4.0" },
    { step: "7 — Validate", activity: "Post-implementation compliance check", units: "1.0" },
    { step: "8 — Record", activity: "Posture model update (footprint)", units: "0" },
  ],
  estateSize: [
    { scenario: "Minor policy update (limited scope, 1–2 controls)", adjustment: "Lightweight scope analysis + evidence only; no full response plan", multiplierDisplay: "~0.45–0.50×", multiplierValue: 0.5 },
    { scenario: "Standard regulatory update (PCI-DSS rev, DORA new requirement)", adjustment: "Baseline", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
    { scenario: "Major regulatory change (new framework, broad technical scope)", adjustment: "2 gap assessments + full response plan + evidence package", multiplierDisplay: "~1.35–1.40×", multiplierValue: 1.4 },
  ],
  additionalAdjustments: [
    { scenario: "Concurrent regulatory change (second regulation responded to simultaneously)", adjustment: "Full additional response workflow", unitDelta: 14.35 },
    { scenario: "Each additional remediation cluster during implementation", adjustment: "One additional remediation plan artifact", unitDelta: 1.25 },
    { scenario: "Post-implementation validation added", adjustment: "Additional targeted re-scan of affected controls", unitDelta: 1.0 },
    { scenario: "Gap assessment consolidated with ongoing UC-03 compliance cycle", adjustment: "Avoids duplicate assessment where frameworks overlap", unitDelta: -2.5 },
  ],
};

// UC-14: Change Governance and Traceability
export const uc14UnitConsumption: UseCaseUnitConsumption = {
  useCaseId: "UC-14",
  steps: [
    {
      stepNumber: 1,
      stepName: "Change Initiated (Cross-UC)",
      description: "A change is initiated in any other Atlas workflow (UC-01 through UC-13). Atlas automatically captures change metadata.",
      activities: [
        { activity: "Change metadata capture and audit logging (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 2,
      stepName: "Atlas Records Change (Continuous)",
      description: "Throughout the change workflow, Atlas records every action, authorization, test result, and decision in the change ledger.",
      activities: [
        { activity: "Atlas change ledger recording (footprint)", tokens: "Footprint", units: "0" },
      ],
      subtotal: "0",
    },
    {
      stepNumber: 3,
      stepName: "Governance Gate",
      description: "At defined governance gates, Atlas surfaces a structured change summary: what is changing, what was tested, what the risk assessment says, who has authorized what so far.",
      activities: [
        { activity: "CAB/governance gate change summary (per gate)", tokens: "~100,000", units: "1.0 per gate" },
      ],
      subtotal: "1.0",
    },
    {
      stepNumber: 4,
      stepName: "Change Record Generated",
      description: "At the conclusion of a change workflow, Atlas generates the complete change record — this is the artifact produced by the originating use case.",
      activities: [
        { activity: "Change record (attributed to originating use case)", tokens: "—", units: "0" },
      ],
      subtotal: "0",
      note: "Metered in originating use case. No double-billing.",
    },
    {
      stepNumber: 5,
      stepName: "Traceability Query",
      description: "Derek, Quinn, or Sage asks Atlas a traceability question — Atlas searches the change ledger and produces a structured traceability report.",
      activities: [
        { activity: "Traceability search / change history query (footprint)", tokens: "Footprint", units: "0" },
        { activity: "Structured traceability analysis report (generated artifact)", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "0",
      note: "Query = 0 units. Structured analysis = 2.5 units.",
    },
    {
      stepNumber: 6,
      stepName: "Governance Assessment",
      description: "On a periodic basis, Atlas assesses the organization's change governance posture.",
      activities: [
        { activity: "Change governance posture assessment", tokens: "250,000", units: "2.5" },
      ],
      subtotal: "2.5",
    },
    {
      stepNumber: 7,
      stepName: "Audit Report",
      description: "For a formal audit, Atlas generates a comprehensive change governance audit report.",
      activities: [
        { activity: "Change governance audit report (evidence package)", tokens: "400,000", units: "4.0" },
      ],
      subtotal: "4.0",
    },
  ],
  fullFlowSummary: [
    { step: "1 — Change Initiated", activity: "Metadata capture (footprint)", units: "0" },
    { step: "2 — Records Change", activity: "Audit ledger (footprint)", units: "0" },
    { step: "3 — Governance Gate", activity: "CAB change summary (per gate)", units: "1.0 per gate" },
    { step: "4 — Change Record", activity: "Attributed to originating use case", units: "0" },
    { step: "5 — Traceability Query", activity: "Search (0) / structured analysis (2.5)", units: "0–2.5" },
    { step: "6 — Governance Assessment", activity: "Change governance posture assessment", units: "2.5" },
    { step: "7 — Audit Report", activity: "Change governance evidence package", units: "4.0" },
  ],
  estateSize: [
    { scenario: "Footprint-only governance (change ledger, no reports)", adjustment: "No generated artifacts; audit ledger only", multiplierDisplay: "0×", multiplierValue: 0 },
    { scenario: "Quarterly audit with CAB summaries", adjustment: "12 CAB summaries + 4 governance assessments + 1 audit report", multiplierDisplay: "~0.13×", multiplierValue: 0.13 },
    { scenario: "Full annual governance program", adjustment: "Baseline (~200 units/year)", multiplierDisplay: "1.0×", multiplierValue: 1.0 },
  ],
  additionalAdjustments: [
    { scenario: "Each additional CAB gate change summary", adjustment: "One additional governance gate artifact", unitDelta: 1.0 },
    { scenario: "Each additional governance posture assessment", adjustment: "One additional system assessment", unitDelta: 2.5 },
    { scenario: "Regulatory examination requiring full traceability", adjustment: "Additional evidence package per system examined", unitDelta: 4.0 },
    { scenario: "Structured traceability analysis report (on-demand)", adjustment: "Generated traceability synthesis artifact", unitDelta: 2.5 },
  ],
};

export function getUnitConsumption(useCaseId: string): UseCaseUnitConsumption | null {
  const normalized = useCaseId.toLowerCase().replace(/[^a-z0-9]/g, "");
  switch (normalized) {
    case "uc01": return uc01UnitConsumption;
    case "uc02": return uc02UnitConsumption;
    case "uc03": return uc03UnitConsumption;
    case "uc04": return uc04UnitConsumption;
    case "uc05": return uc05UnitConsumption;
    case "uc06": return uc06UnitConsumption;
    case "uc07": return uc07UnitConsumption;
    case "uc08": return uc08UnitConsumption;
    case "uc09": return uc09UnitConsumption;
    case "uc10": return uc10UnitConsumption;
    case "uc11": return uc11UnitConsumption;
    case "uc12": return uc12UnitConsumption;
    case "uc13": return uc13UnitConsumption;
    case "uc14": return uc14UnitConsumption;
    default: return null;
  }
}