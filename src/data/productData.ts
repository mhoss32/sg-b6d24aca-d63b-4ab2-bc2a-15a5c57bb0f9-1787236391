export type NodeType = "atlas" | "systemIntelligence" | "changeIntelligence" | "predictiveIntelligence" | "useCase";

export interface ProductNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  details: string[];
  connections: string[];
  status?: string;
  gaDate?: string;
  primaryPersona?: string;
  scenarios?: string[];
}

export interface Connection {
  source: string;
  target: string;
}

export const productNodes: ProductNode[] = [
  // Root
  {
    id: "atlas",
    label: "Atlas",
    type: "atlas",
    description: "AI-powered platform for z/OS environment intelligence, change management, and predictive operations.",
    details: ["Unified topology discovery", "AI-driven change orchestration", "Cross-middleware analysis", "Continuous compliance monitoring"],
    connections: ["system", "change", "predictive"],
  },

  // Pillars
  {
    id: "system",
    label: "System Intelligence",
    type: "systemIntelligence",
    description: "Know your environment — topology, inventory, relationships, health.",
    details: ["Environment topology mapping", "Component inventory", "Relationship discovery", "Health state monitoring"],
    connections: ["atlas", "uc-04", "uc-05", "uc-02", "uc-07", "uc-08", "uc-12", "uc-13"],
    status: "GA Dec 2026",
  },
  {
    id: "change",
    label: "Change Intelligence",
    type: "changeIntelligence",
    description: "Change safely — impact analysis, planning, testing, provisioning.",
    details: ["Impact analysis", "Test plan generation", "Automated provisioning", "Change sequencing"],
    connections: ["atlas", "uc-01", "uc-02", "uc-07", "uc-08", "uc-09", "uc-10", "uc-11", "uc-12", "uc-13", "uc-14"],
    status: "GA Dec 2026 (MVP); H1 2027 (full)",
  },
  {
    id: "predictive",
    label: "Predictive Intelligence",
    type: "predictiveIntelligence",
    description: "Stay ahead — drift detection, anomaly prediction, DR readiness.",
    details: ["Drift detection", "Anomaly prediction", "DR readiness scoring", "Proactive risk alerting"],
    connections: ["atlas", "uc-01", "uc-03", "uc-06", "uc-09", "uc-10", "uc-11"],
    status: "H2 2027",
  },

  // Use Cases — attached to highest-ranking pillar
  {
    id: "uc-01",
    label: "Vulnerability Remediation",
    type: "useCase",
    description: "Assess exposure, understand dependencies, and execute validated remediation without disrupting production.",
    details: ["CVE exposure assessment", "Blast radius analysis", "Sequenced remediation planning", "Test and apply validation"],
    connections: ["predictive", "system", "change"],
    status: "Current - GA Dec 2026",
    gaDate: "GA Dec 2026",
    primaryPersona: "Zach (z/OS Systems Programmer)",
    scenarios: ["Emergency CVE Response", "Proactive PTF Currency Check", "Vulnerability Remediation with Active DR Risk", "Multi-LPAR Coordinated Patch Apply"],
  },
  {
    id: "uc-02",
    label: "Patch Management",
    type: "useCase",
    description: "Apply PTFs, software patches, and middleware updates with dependency-aware planning and validation.",
    details: ["Impact analysis for patch batches", "Isolated test environment provisioning", "Smoke and function validation", "Sequenced production apply"],
    connections: ["change", "system"],
    status: "Current - GA Dec 2026 (PTF); H1 2027 (MW/SW)",
    gaDate: "GA Dec 2026 (PTF); H1 2027 (MW/SW)",
    primaryPersona: "Zach (z/OS Systems Programmer)",
    scenarios: ["Routine Quarterly PTF Maintenance", "Emergency Security Patch", "Middleware Software Update", "Patch Rollback After Failed Validation", "Vendor-Recommended Upgrade"],
  },
  {
    id: "uc-03",
    label: "Audit and Compliance",
    type: "useCase",
    description: "Produce auditor-ready evidence of configuration state, access control, and change history.",
    details: ["Configuration compliance reports", "Privileged access analysis", "12-month change history", "Undocumented change detection"],
    connections: ["predictive", "system"],
    status: "Current - GA Dec 2026",
    gaDate: "GA Dec 2026",
    primaryPersona: "Derek (Compliance Evidence Provider)",
    scenarios: ["SOX IT General Controls Audit", "PCI Compliance Review", "Internal Compliance Review", "Undocumented Change Investigation"],
  },
  {
    id: "uc-04",
    label: "Staff Onboarding",
    type: "useCase",
    description: "Cut time-to-productivity for new z/OS team members from weeks to days with AI-generated environment briefs.",
    details: ["LPAR topology orientation", "Subsystem inventory walkthrough", "System Brief artifact generation", "Knowledge capture before retirement"],
    connections: ["system"],
    status: "Current - GA Dec 2026",
    gaDate: "GA Dec 2026",
    primaryPersona: "Chris (z/OS Systems Programmer, early tenure)",
    scenarios: ["New System Programmer", "New Application Owner", "New Operations Analyst", "Knowledge Capture Before Retirement"],
  },
  {
    id: "uc-05",
    label: "Application Discovery",
    type: "useCase",
    description: "Understand application structure, dependencies, and blast radius in seconds instead of days.",
    details: ["Transaction flow tracing", "Dependency graph traversal", "Cross-application mapping", "Business domain inventory"],
    connections: ["system"],
    status: "Current - GA Dec 2026 (topology); H1 2027 (deep analysis)",
    gaDate: "GA Dec 2026",
    primaryPersona: "Angie (Application Architect)",
    scenarios: ["Transaction Flow Walkthrough", "Blast Radius Analysis", "Cross-Application Dependency Mapping", "Application Inventory for Business Domain"],
  },
  {
    id: "uc-06",
    label: "Change Readiness",
    type: "useCase",
    description: "Unified health assessment before go-live, upgrade, audit, or peak season.",
    details: ["PTF currency check", "Configuration compliance review", "Security posture assessment", "Compounded risk detection"],
    connections: ["predictive", "system"],
    status: "Current - GA Dec 2026",
    gaDate: "GA Dec 2026",
    primaryPersona: "Zach (z/OS Systems Programmer)",
    scenarios: ["Pre-Go-Live Health Check", "Pre-Audit Configuration Review", "Pre-Change-Window System Review", "Periodic System Health Report"],
  },
  {
    id: "uc-07",
    label: "Application Change",
    type: "useCase",
    description: "Make application changes with AI-generated impact analysis, test plans, and validation.",
    details: ["Feature change impact analysis", "Regression test generation", "Db2 schema change planning", "Developer self-service workflows"],
    connections: ["change", "system"],
    status: "Planned - H1 2027 (limited); H2 2027 (full)",
    gaDate: "H1 2027 (limited); H2 2027 (full)",
    primaryPersona: "Kathleen (Application Developer)",
    scenarios: ["Feature Change with Impact Analysis", "Bug Fix with Regression Testing", "Db2 Schema Change", "Developer Self-Service Change"],
  },
  {
    id: "uc-08",
    label: "Platform Upgrade",
    type: "useCase",
    description: "Plan and execute major platform upgrades — z/OS version, middleware, or sysplex — with phased safety.",
    details: ["Compatibility issue scoping", "Upgrade sequencing across LPARs", "Regression testing at each phase", "Cumulative state tracking"],
    connections: ["change", "system"],
    status: "Planned - GA Dec 2026 (PTF); H1 2027 (full MW/SW)",
    gaDate: "GA Dec 2026 (PTF); H1 2027 (full)",
    primaryPersona: "Zach (z/OS Systems Programmer)",
    scenarios: ["z/OS Version Upgrade", "Middleware Product Upgrade", "Sysplex Reconfiguration", "Phased Migration from Legacy"],
  },
  {
    id: "uc-09",
    label: "Environment Parity",
    type: "useCase",
    description: "Detect, quantify, and remediate drift between production, test, and DR environments.",
    details: ["Cross-environment comparison", "Continuous drift monitoring", "Unauthorized change detection", "Post-change drift validation"],
    connections: ["predictive", "system", "change"],
    status: "Planned - H2 2027",
    gaDate: "H2 2027",
    primaryPersona: "Annette (IT Operations Engineer)",
    scenarios: ["Production vs. QA Drift Investigation", "Continuous Production Parity Monitoring", "Unauthorized Change Detection", "Post-Change Drift Validation"],
  },
  {
    id: "uc-10",
    label: "DR Validation",
    type: "useCase",
    description: "Verify DR environment readiness before tests or real failover events with continuous parity monitoring.",
    details: ["DR-to-production comparison", "Readiness scoring", "Failover simulation", "Post-incident resync planning"],
    connections: ["predictive", "change", "system"],
    status: "Planned - H2 2027",
    gaDate: "H2 2027",
    primaryPersona: "Greg (Infrastructure Architect)",
    scenarios: ["Pre-DR-Test Readiness Assessment", "DR Failover Simulation", "Continuous DR Parity Monitoring", "Post-Incident DR Resync"],
  },
  {
    id: "uc-11",
    label: "Capacity Planning",
    type: "useCase",
    description: "Proactively manage system capacity and prevent performance incidents before they occur.",
    details: ["Historical performance analysis", "Load projection modeling", "Dark capacity discovery", "Post-change performance regression analysis"],
    connections: ["predictive", "change", "system"],
    status: "Planned - H1 2027 (visibility); H2 2027 (full)",
    gaDate: "H1 2027 (visibility); H2 2027 (full)",
    primaryPersona: "Alex (Performance Engineer)",
    scenarios: ["Peak Season Capacity Preparation", "Dark Capacity Discovery", "Application Performance Diagnosis", "Post-Change Performance Regression"],
  },
  {
    id: "uc-12",
    label: "App Modernization",
    type: "useCase",
    description: "Make legacy application modernization tractable with complete current-state understanding and safe execution.",
    details: ["Deprecated API remediation", "Monolith decomposition planning", "Modernization assessment generation", "z/OS to REST API mapping"],
    connections: ["change", "system"],
    status: "Planned - H1 2027 (early); H2 2027 (full)",
    gaDate: "H1 2027 (early); H2 2027 (full)",
    primaryPersona: "Angie (Application Architect)",
    scenarios: ["Deprecated API Remediation", "Monolith Decomposition Planning", "Application Modernization Assessment", "API Modernization (z/OS to REST)"],
  },
  {
    id: "uc-13",
    label: "Regulatory Change",
    type: "useCase",
    description: "Map regulatory requirements to environment gaps and execute remediation within deadlines.",
    details: ["Regulated data inventory", "Access control gap mapping", "Remediation workstream sequencing", "Continuous regulatory posture monitoring"],
    connections: ["system", "change"],
    status: "Current - GA Dec 2026",
    gaDate: "GA Dec 2026",
    primaryPersona: "Sage (Security Administrator)",
    scenarios: ["Data Privacy Regulation Implementation", "Security Controls Mandate", "Compliance Evidence Package Generation", "Continuous Regulatory Posture Monitoring"],
  },
  {
    id: "uc-14",
    label: "Change Governance",
    type: "useCase",
    description: "Make every z/OS change traceable to a change record, reviewable in audit, and attributable to a user.",
    details: ["ServiceNow change record integration", "Undocumented change audit reporting", "Change window enforcement", "Change attribution and rollback history"],
    connections: ["change"],
    status: "Future Opportunity - H2 2027",
    gaDate: "H2 2027",
    primaryPersona: "Quinn (IT Operations Manager)",
    scenarios: ["ServiceNow Change Record Integration", "Undocumented Change Audit Report", "Change Window Enforcement", "Change Attribution and Rollback History"],
  },
];

export function getNodeById(id: string): ProductNode | undefined {
  return productNodes.find((n) => n.id === id);
}

export function getConnections(): Connection[] {
  const connections: Connection[] = [];
  const seen = new Set<string>();

  for (const node of productNodes) {
    for (const targetId of node.connections) {
      const key = [node.id, targetId].sort().join("-");
      if (!seen.has(key)) {
        seen.add(key);
        connections.push({ source: node.id, target: targetId });
      }
    }
  }

  return connections;
}

export function getParentPillar(nodeId: string): string | undefined {
  const node = getNodeById(nodeId);
  if (!node || node.type === "atlas" || node.type === "systemIntelligence" || node.type === "changeIntelligence" || node.type === "predictiveIntelligence") return undefined;
  const conn = node.connections.find((c) => c === "predictive" || c === "change" || c === "system");
  return conn;
}

export const nodeTypeConfig = {
  atlas: {
    label: "Atlas",
    color: "#F59E0B",
    glowClass: "glow-amber",
    bgClass: "bg-amber",
    textClass: "text-amber",
  },
  systemIntelligence: {
    label: "System Intelligence",
    color: "#00D4FF",
    glowClass: "glow-cyan",
    bgClass: "bg-cyan",
    textClass: "text-cyan",
  },
  changeIntelligence: {
    label: "Change Intelligence",
    color: "#FF6B6B",
    glowClass: "glow-coral",
    bgClass: "bg-coral",
    textClass: "text-coral",
  },
  predictiveIntelligence: {
    label: "Predictive Intelligence",
    color: "#A78BFA",
    glowClass: "glow-purple",
    bgClass: "bg-purple",
    textClass: "text-purple",
  },
  useCase: {
    label: "Use Case",
    color: "#E2E8F0",
    glowClass: "glow-white",
    bgClass: "bg-slate",
    textClass: "text-slate",
  },
} as const;