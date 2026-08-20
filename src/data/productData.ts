export type NodeType = "useCase" | "userStory" | "functionality";

export interface ProductNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  details: string[];
  connections: string[];
}

export interface Connection {
  source: string;
  target: string;
}

export const productNodes: ProductNode[] = [
  // Use Cases (cyan)
  {
    id: "uc-1",
    label: "Customer Onboarding",
    type: "useCase",
    description: "Streamline new customer sign-up and verification with automated workflows.",
    details: ["Identity verification", "Document upload", "KYC compliance", "Welcome sequencing"],
    connections: ["us-1", "us-2", "fn-1", "fn-3"],
  },
  {
    id: "uc-2",
    label: "Real-time Analytics",
    type: "useCase",
    description: "Monitor business metrics and user behavior with live dashboards.",
    details: ["Live KPI tracking", "Custom report builder", "Anomaly detection", "Export to BI tools"],
    connections: ["us-3", "us-4", "fn-2", "fn-4", "fn-5"],
  },
  {
    id: "uc-3",
    label: "Team Collaboration",
    type: "useCase",
    description: "Enable cross-functional teams to work together in shared workspaces.",
    details: ["Shared boards", "Comment threads", "Mention notifications", "Role-based access"],
    connections: ["us-5", "fn-3", "fn-6", "fn-7"],
  },
  {
    id: "uc-4",
    label: "API Integration",
    type: "useCase",
    description: "Connect external systems and services via robust API infrastructure.",
    details: ["REST & GraphQL endpoints", "Webhook support", "Rate limiting", "API versioning"],
    connections: ["us-6", "fn-4", "fn-8", "fn-9"],
  },
  {
    id: "uc-5",
    label: "Data Migration",
    type: "useCase",
    description: "Seamlessly transfer data from legacy systems with zero downtime.",
    details: ["Schema mapping", "Batch processing", "Rollback capability", "Progress tracking"],
    connections: ["us-7", "fn-5", "fn-8", "fn-10"],
  },

  // User Stories (coral)
  {
    id: "us-1",
    label: "As a new user, I want to sign up in under 2 minutes",
    type: "userStory",
    description: "Reduce friction in the registration flow to maximize conversion.",
    details: ["Social login options", "Progress indicators", "Inline validation", "Auto-fill support"],
    connections: ["uc-1", "fn-1"],
  },
  {
    id: "us-2",
    label: "As an admin, I want to verify user documents automatically",
    type: "userStory",
    description: "Automate document review to reduce manual processing overhead.",
    details: ["OCR extraction", "Fraud detection", "Approval queue", "Audit trail"],
    connections: ["uc-1", "fn-3"],
  },
  {
    id: "us-3",
    label: "As an analyst, I want to build custom dashboards",
    type: "userStory",
    description: "Empower analysts to create and share insights without engineering support.",
    details: ["Drag-and-drop widgets", "Data source picker", "Filter presets", "Scheduled snapshots"],
    connections: ["uc-2", "fn-2", "fn-5"],
  },
  {
    id: "us-4",
    label: "As a manager, I want alerts for unusual activity",
    type: "userStory",
    description: "Receive proactive notifications when metrics deviate from expected patterns.",
    details: ["Threshold configuration", "Multi-channel alerts", "Escalation rules", "Acknowledgment workflow"],
    connections: ["uc-2", "fn-4"],
  },
  {
    id: "us-5",
    label: "As a team lead, I want to assign tasks with deadlines",
    type: "userStory",
    description: "Manage team workload and track deliverables within the platform.",
    details: ["Gantt timeline", "Dependency mapping", "Workload balancing", "Deadline reminders"],
    connections: ["uc-3", "fn-6", "fn-7"],
  },
  {
    id: "us-6",
    label: "As a developer, I want clear API documentation",
    type: "userStory",
    description: "Integrate with the platform quickly using well-documented APIs.",
    details: ["Interactive playground", "Code samples", "Error reference", "Changelog feed"],
    connections: ["uc-4", "fn-8", "fn-9"],
  },
  {
    id: "us-7",
    label: "As an IT lead, I want zero-downtime migrations",
    type: "userStory",
    description: "Transfer critical data without disrupting business operations.",
    details: ["Parallel read mode", "Validation checks", "Conflict resolution", "Cutover scheduling"],
    connections: ["uc-5", "fn-10"],
  },

  // Functionality (purple)
  {
    id: "fn-1",
    label: "OAuth 2.0 Authentication",
    type: "functionality",
    description: "Industry-standard secure authentication with multiple provider support.",
    details: ["Google, GitHub, Microsoft", "JWT tokens", "Refresh rotation", "Session management"],
    connections: ["uc-1", "us-1"],
  },
  {
    id: "fn-2",
    label: "Data Visualization Engine",
    type: "functionality",
    description: "Render complex datasets into beautiful, interactive charts and graphs.",
    details: ["20+ chart types", "Real-time streaming", "Drill-down exploration", "Export PNG/SVG"],
    connections: ["uc-2", "us-3"],
  },
  {
    id: "fn-3",
    label: "Workflow Automation",
    type: "functionality",
    description: "Build conditional logic chains to automate repetitive business processes.",
    details: ["Visual builder", "Trigger library", "Conditional branching", "Retry policies"],
    connections: ["uc-1", "uc-3", "us-2"],
  },
  {
    id: "fn-4",
    label: "Event Streaming",
    type: "functionality",
    description: "Process millions of events per second with guaranteed delivery.",
    details: ["Kafka-compatible", "Exactly-once semantics", "Partition scaling", "Replay capability"],
    connections: ["uc-2", "uc-4", "us-4"],
  },
  {
    id: "fn-5",
    label: "Query Builder",
    type: "functionality",
    description: "SQL-free interface for exploring and filtering large datasets.",
    details: ["Natural language input", "Visual filter tree", "Saved queries", "Shareable links"],
    connections: ["uc-2", "uc-5", "us-3"],
  },
  {
    id: "fn-6",
    label: "Comment System",
    type: "functionality",
    description: "Threaded discussions attached to any entity in the platform.",
    details: ["Rich text editing", "Mention autocomplete", "Email notifications", "Reaction emojis"],
    connections: ["uc-3", "us-5"],
  },
  {
    id: "fn-7",
    label: "Permission Engine",
    type: "functionality",
    description: "Fine-grained access control with role and attribute-based policies.",
    details: ["RBAC & ABAC", "Custom roles", "Field-level permissions", "Audit logging"],
    connections: ["uc-3", "us-5"],
  },
  {
    id: "fn-8",
    label: "Schema Registry",
    type: "functionality",
    description: "Centralized schema management for data contracts and evolution.",
    details: ["Avro/Protobuf/JSON", "Compatibility checks", "Version history", "Breaking change alerts"],
    connections: ["uc-4", "uc-5", "us-6"],
  },
  {
    id: "fn-9",
    label: "Rate Limiter",
    type: "functionality",
    description: "Protect APIs from abuse with configurable throttling strategies.",
    details: ["Token bucket", "Sliding window", "Per-client rules", "Burst allowance"],
    connections: ["uc-4", "us-6"],
  },
  {
    id: "fn-10",
    label: "Backup & Recovery",
    type: "functionality",
    description: "Automated point-in-time backups with granular restore options.",
    details: ["Incremental snapshots", "Cross-region replication", "Self-service restore", "Compliance archiving"],
    connections: ["uc-5", "us-7"],
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

export const nodeTypeConfig = {
  useCase: {
    label: "Use Case",
    color: "#00D4FF",
    glowClass: "glow-cyan",
    bgClass: "bg-cyan",
    textClass: "text-cyan",
  },
  userStory: {
    label: "User Story",
    color: "#FF6B6B",
    glowClass: "glow-coral",
    bgClass: "bg-coral",
    textClass: "text-coral",
  },
  functionality: {
    label: "Functionality",
    color: "#A78BFA",
    glowClass: "glow-purple",
    bgClass: "bg-purple",
    textClass: "text-purple",
  },
} as const;