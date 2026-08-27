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

export interface SensitivityRow {
  scenario: string;
  adjustment: string;
  estimatedUnits: string;
}

export interface UseCaseUnitConsumption {
  useCaseId: string;
  steps: StepConsumption[];
  fullFlowSummary: FlowSummaryRow[];
  sensitivityAnalysis: SensitivityRow[];
  totalNominal: string;
}

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
        { activity: "Virtual test environment provision (1 provision)", tokens: "1 successful provision", units: "0.1" },
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
        { activity: "DR environment provision (if Atlas-provisioned DR test prior to DR apply)", tokens: "1 successful provision", units: "0.1" },
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
    { step: "1 — Discovery", activity: "Discovery scan", units: "0.5" },
    { step: "2 — Remediation", activity: "Discovery scan (continuous)", units: "0.05" },
    { step: "3 — Remediation", activity: "Backlink to target environment", units: "0.05" },
    { step: "4 — Remediation", activity: "Environmental metrics fetch", units: "0.2" },
    { step: "5 — Remediation", activity: "Health & dependency check", units: "0.5" },
    { step: "6 — Remediation", activity: "Remediation task auto-generation", units: "0.5" },
    { step: "7 — Remediation", activity: "Remediation task auto-generation", units: "0.5" },
    { step: "8 — Remediation", activity: "Backlink to target environment", units: "0.05" },
    { step: "9 — Remediation", activity: "Auto remediation actions", units: "1.0" },
    { step: "10 — Remediation", activity: "Result and metric fetch", units: "0.2" },
    { step: "11 — Remediation", activity: "Auto-closure of remediation task", units: "0.2" },
    { step: "12 — Remediation", activity: "Auto remediation actions", units: "1.0" },
    { step: "13 — Remediation", activity: "Result and metric fetch", units: "0.2" },
    { step: "14 — Remediation", activity: "Auto-closure of remediation task", units: "0.2" },
    { step: "15 — Remediation", activity: "Health & dependency check", units: "0.5" },
    { step: "16 — Remediation", activity: "Auto-closure of remediation task", units: "0.2" },
    { step: "17 — Remediation", activity: "Remediation task auto-generation", units: "0.5" },
    { step: "18 — Change Readiness", activity: "Remediation task auto-generation", units: "0.5" },
    { step: "19 — Change Readiness", activity: "Auto-closure of remediation task", units: "0.2" },
  ],
  sensitivityAnalysis: [
    { scenario: "Small estate (≤5 LPARs, 1 affected)", adjustment: "Simpler exposure scan; no blast radius", estimatedUnits: "~8.0" },
    { scenario: "Standard (10–20 LPARs, moderate blast radius)", adjustment: "Baseline above", estimatedUnits: "~14.7" },
    { scenario: "Large estate (30+ LPARs, complex blast radius, multi-phase)", adjustment: "Additional assessment depth; multiple test environments", estimatedUnits: "~20–25" },
    { scenario: "Step 2+3 combined as single assessment", adjustment: "One assessment instead of two", estimatedUnits: "−2.5 (= 12.2)" },
    { scenario: "Exploitation alert triggered during monitoring", adjustment: "Add 0.5 conditional units", estimatedUnits: "~15.2–15.7" },
  ],
  totalNominal: "14.7–15.2",
};

export function getUnitConsumption(useCaseId: string): UseCaseUnitConsumption | null {
  if (useCaseId === "UC-01" || useCaseId === "uc-01") {
    return uc01UnitConsumption;
  }
  return null;
}