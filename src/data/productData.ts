export type NodeType = "atlas" | "systemIntelligence" | "changeIntelligence" | "predictiveIntelligence" | "useCase";

export interface ProductNode {
  id: string;
  label: string;
  description: string;
  type: NodeType;
  connections: string[];
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  engagementType: "primary" | "secondary";
  description?: string;
}

export interface FlowMarker {
  type: "time" | "skill" | "artefact";
  label: string;
}

export interface FlowStage {
  id: string;
  label: string;
  description: string;
  markers: FlowMarker[];
}

export interface FlowDiagram {
  title: string;
  stages: FlowStage[];
}

export interface UseCaseDetail {
  personas: Persona[];
  asIsFlow: FlowDiagram;
  toBeFlow: FlowDiagram;
}

export const productNodes: ProductNode[] = [
  {
    id: "atlas",
    label: "Atlas",
    description: "IBM Atlas Platform — AI-powered IT operations intelligence",
    type: "atlas",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "system",
    label: "System Intelligence",
    description: "Know your environment — topology, inventory, relationships, health",
    type: "systemIntelligence",
    connections: ["atlas", "uc-04", "uc-05"],
  },
  {
    id: "change",
    label: "Change Intelligence",
    description: "Change safely — impact analysis, planning, testing, provisioning",
    type: "changeIntelligence",
    connections: ["atlas", "uc-02", "uc-07", "uc-08", "uc-12", "uc-13", "uc-14"],
  },
  {
    id: "predictive",
    label: "Predictive Intelligence",
    description: "Stay ahead — drift detection, anomaly prediction, DR readiness",
    type: "predictiveIntelligence",
    connections: ["atlas", "uc-01", "uc-03", "uc-06", "uc-09", "uc-10", "uc-11"],
  },
  {
    id: "uc-01",
    label: "Vulnerability Remediation",
    description: "Prioritize and remediate vulnerabilities across the estate with automated dependency tracing and DR-aware planning",
    type: "useCase",
    connections: ["predictive", "change"],
  },
  {
    id: "uc-02",
    label: "Patch Management",
    description: "Plan, test, and deploy patches safely with full impact analysis and rollback readiness",
    type: "useCase",
    connections: ["change"],
  },
  {
    id: "uc-03",
    label: "Security Incident Response",
    description: "Rapidly identify blast radius and coordinate response using real-time topology and dependency data",
    type: "useCase",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-04",
    label: "Staff Onboarding",
    description: "Accelerate new team member productivity with interactive system topology and automated environment familiarization",
    type: "useCase",
    connections: ["system"],
  },
  {
    id: "uc-05",
    label: "Application Discovery",
    description: "Automatically discover and map applications, their components, and relationships across the estate",
    type: "useCase",
    connections: ["system", "change"],
  },
  {
    id: "uc-06",
    label: "Audit Preparation",
    description: "Generate comprehensive audit evidence with automated topology reconciliation and compliance mapping",
    type: "useCase",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-07",
    label: "Capacity Planning",
    description: "Forecast resource needs and plan infrastructure scaling with predictive analytics and dependency-aware modeling",
    type: "useCase",
    connections: ["change", "predictive"],
  },
  {
    id: "uc-08",
    label: "Disaster Recovery Testing",
    description: "Validate DR readiness with automated dependency-aware recovery sequencing and gap analysis",
    type: "useCase",
    connections: ["change", "predictive"],
  },
  {
    id: "uc-09",
    label: "Configuration Drift Detection",
    description: "Detect and remediate configuration drift before it causes incidents using continuous topology monitoring",
    type: "useCase",
    connections: ["predictive"],
  },
  {
    id: "uc-10",
    label: "Anomaly Prediction",
    description: "Predict and prevent incidents before they occur using AI-powered anomaly detection on topology and metrics",
    type: "useCase",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-11",
    label: "DR Readiness Assessment",
    description: "Continuously assess DR readiness with automated topology validation and recovery path analysis",
    type: "useCase",
    connections: ["predictive", "change"],
  },
  {
    id: "uc-12",
    label: "Change Impact Analysis",
    description: "Understand the full impact of proposed changes before implementation with deep dependency analysis",
    type: "useCase",
    connections: ["change"],
  },
  {
    id: "uc-13",
    label: "Provisioning",
    description: "Provision new systems and environments with automated dependency-aware configuration and validation",
    type: "useCase",
    connections: ["change", "system"],
  },
  {
    id: "uc-14",
    label: "Testing Coordination",
    description: "Coordinate complex testing across interdependent systems with automated test sequencing and environment management",
    type: "useCase",
    connections: ["change"],
  },
];

export const useCaseDetails: Record<string, UseCaseDetail> = {
  "uc-01": {
    personas: [
      {
        id: "zach",
        name: "Zach",
        role: "Cybersecurity Lead",
        engagementType: "primary",
        description: "Needs to see vulnerability blast radius, dependency chains, and DR-aware remediation plans",
      },
      {
        id: "sage",
        name: "Sage",
        role: "Systems Programmer",
        engagementType: "secondary",
        description: "Needs clear remediation steps with automated dependency tracing",
      },
      {
        id: "fred",
        name: "Fred",
        role: "Operations Manager",
        engagementType: "secondary",
        description: "Needs timeline visibility and cross-team coordination support",
      },
      {
        id: "alice",
        name: "Alice",
        role: "Security Engineer",
        engagementType: "secondary",
        description: "Needs audit-ready evidence and compliance reporting",
      },
    ],
    asIsFlow: {
      title: "As Is — Current State",
      stages: [
        {
          id: "scan",
          label: "Vulnerability Scan",
          description: "Security tools scan the estate and produce a list of CVEs",
          markers: [
            { type: "time", label: "Scan runs overnight" },
          ],
        },
        {
          id: "prioritize",
          label: "Manual Prioritization",
          description: "Security team reviews CVE list and manually prioritizes based on memory and experience",
          markers: [
            { type: "skill", label: "Planned by memory, not analysis" },
            { type: "time", label: "Typically a 2–3 day process across a large estate" },
          ],
        },
        {
          id: "trace",
          label: "Dependency Tracing",
          description: "Systems programmer manually traces affected components from memory",
          markers: [
            { type: "skill", label: "Requires the most experienced systems programmer to trace dependencies from memory" },
            { type: "time", label: "Days of expert time consumed" },
          ],
        },
        {
          id: "plan",
          label: "Remediation Planning",
          description: "Change plans are created without full understanding of downstream impact",
          markers: [
            { type: "artefact", label: "No topology map exists for reference" },
            { type: "skill", label: "Planned by experience, not by data" },
          ],
        },
        {
          id: "implement",
          label: "Implementation",
          description: "Patches applied across systems with limited visibility of interdependencies",
          markers: [
            { type: "artefact", label: "DR environment patched last or forgotten" },
            { type: "time", label: "Production and DR often drift apart" },
          ],
        },
        {
          id: "validate",
          label: "Validation",
          description: "Limited validation of whether remediation was complete and correct",
          markers: [
            { type: "artefact", label: "No persistent record of what was done" },
            { type: "skill", label: "Validation relies on manual verification" },
          ],
        },
      ],
    },
    toBeFlow: {
      title: "To Be — Desired Outcome",
      stages: [
        {
          id: "scan",
          label: "Automated Scan",
          description: "Continuous vulnerability scanning integrated with Atlas topology",
          markers: [
            { type: "time", label: "Near real-time vulnerability awareness" },
          ],
        },
        {
          id: "prioritize",
          label: "AI Prioritization",
          description: "Atlas automatically prioritizes CVEs using dependency impact analysis",
          markers: [
            { type: "skill", label: "Atlas replaces manual prioritization" },
            { type: "time", label: "Prioritization in minutes, not days" },
          ],
        },
        {
          id: "trace",
          label: "Auto Dependency Map",
          description: "Atlas generates complete dependency chains from live topology data",
          markers: [
            { type: "artefact", label: "Auto-generated topology map with blast radius" },
            { type: "skill", label: "Atlas traces dependencies automatically" },
            { type: "time", label: "Instant dependency visibility" },
          ],
        },
        {
          id: "plan",
          label: "Intelligent Planning",
          description: "Atlas creates remediation plans with DR-aware sequencing and impact analysis",
          markers: [
            { type: "artefact", label: "DR-aware change plan with rollback path" },
            { type: "skill", label: "Atlas plans using live data, not memory" },
            { type: "time", label: "Planning in hours, not days" },
          ],
        },
        {
          id: "implement",
          label: "Guided Implementation",
          description: "Step-by-step remediation with real-time validation and DR synchronization",
          markers: [
            { type: "artefact", label: "DR environment kept in sync automatically" },
            { type: "time", label: "Faster implementation with confidence" },
          ],
        },
        {
          id: "validate",
          label: "Continuous Validation",
          description: "Atlas validates remediation completeness and maintains audit trail",
          markers: [
            { type: "artefact", label: "Complete audit trail automatically maintained" },
            { type: "skill", label: "Atlas validates, not manual checks" },
            { type: "time", label: "Continuous compliance posture" },
          ],
        },
      ],
    },
  },
};

export const nodeTypeConfig: Record<
  NodeType,
  { color: string; label: string; glowClass: string; bgClass: string; textClass: string }
> = {
  atlas: {
    color: "#F59E0B",
    label: "Platform",
    glowClass: "glow-amber",
    bgClass: "bg-amber",
    textClass: "text-amber",
  },
  systemIntelligence: {
    color: "#00D4FF",
    label: "System Intelligence",
    glowClass: "glow-cyan",
    bgClass: "bg-cyan",
    textClass: "text-cyan",
  },
  changeIntelligence: {
    color: "#FF6B6B",
    label: "Change Intelligence",
    glowClass: "glow-coral",
    bgClass: "bg-coral",
    textClass: "text-coral",
  },
  predictiveIntelligence: {
    color: "#A78BFA",
    label: "Predictive Intelligence",
    glowClass: "glow-purple",
    bgClass: "bg-purple",
    textClass: "text-purple",
  },
  useCase: {
    color: "#E2E8F0",
    label: "Use Case",
    glowClass: "glow-white",
    bgClass: "bg-slate",
    textClass: "text-slate",
  },
} as const;

export function getNodeById(id: string): ProductNode | undefined {
  return productNodes.find((n) => n.id === id);
}

export function getConnections(): { source: string; target: string }[] {
  const conns: { source: string; target: string }[] = [];
  for (const node of productNodes) {
    for (const targetId of node.connections) {
      conns.push({ source: node.id, target: targetId });
    }
  }
  return conns;
}