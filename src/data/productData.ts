export type NodeType = "atlas" | "systemIntelligence" | "changeIntelligence" | "predictiveIntelligence" | "useCase";

export interface Persona {
  name: string;
  role: string;
  engagement: "Primary" | "Secondary";
}

export interface PersonaInfo {
  name: string;
  role: string;
  experience: string;
  summary: string;
  concerns: string[];
  painPoints?: string[];
  quote?: string;
}

export interface FlowStage {
  name: string;
  description: string;
}

export interface FlowMarker {
  persona: string;
  type: "pain" | "time" | "skill" | "gain";
  title: string;
  description: string;
  stageIndex: number;
}

export interface ExternalHandoffStep {
  label: string;
  description: string;
}

export interface ExternalHandoff {
  type: "handoff";
  product: string;
  title: string;
  steps: ExternalHandoffStep[];
  stageIndex: number;
}

export interface ExternalEnrichment {
  type: "enrichment";
  product: string;
  title: string;
  summary: string;
  stageIndex: number;
}

export type ExternalTouchpoint = ExternalHandoff | ExternalEnrichment;

export interface FlowDiagram {
  title: string;
  stages: FlowStage[];
  markers: FlowMarker[];
  externalTouchpoints?: ExternalTouchpoint[];
}

export interface ExternalProduct {
  id: string;
  label: string;
  description: string;
}

export const externalProducts: ExternalProduct[] = [
  { id: "bob-ppz", label: "Bob PPZ", description: "Code-level application change intelligence with ZUnderstand integration" },
  { id: "concert4z", label: "Concert4Z", description: "Production observability, risk management, and ZEN runtime analytics" },
  { id: "terraform", label: "Terraform", description: "Infrastructure-as-code provisioning and state management for IBM Z environments" },
];

export interface Capability {
  name: string;
  timeline: "GA" | "H1 2027" | "H2 2027";
  description: string;
}

export interface UseCaseDetail {
  id: string;
  label: string;
  description: string;
  personas: Persona[];
  asIs: FlowDiagram;
  toBe: FlowDiagram;
  capabilities: Capability[];
}

export interface ProductNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  connections: string[];
}

export const personaData: Record<string, PersonaInfo> = {
  zach: {
    name: "Zach",
    role: "Senior z/OS Systems Programmer",
    experience: "Senior / experienced (25 years)",
    summary: "Zach is a senior z/OS subject matter expert with 25 years of experience. He leads a team of three experienced systems programmers and one junior systems programmer. He values security, reliability, availability, and scalability and views z/OS as the foundation of critical enterprise computing. Zach is planning to retire within 3 to 5 years. His current focus is automation, knowledge transfer, and reducing operational complexity before he leaves.",
    concerns: ["System stability", "Security posture", "Patch currency", "Configuration integrity", "Operational risk", "Succession planning"],
    painPoints: ["Excessive false positive alerts", "Tool fragmentation (ISPF, z/OSMF, OMEGAMON)", "Growing cost reduction pressure", "Insufficient time for optimization", "Concerns about long-term platform perception"],
    quote: "I can look at the panels and look at the assembler code, the JCL code and see what's happening. I can't go to z/OSMF and see what's happening.",
  },
  alice: {
    name: "Alice",
    role: "Mid-level z/OS Systems Programmer",
    experience: "Mid-tenure",
    summary: "Alice is responsible for running her organization's mainframe IT environment — installing, configuring, and maintaining z/OS systems in both test and production. She came to the mainframe through a college course that sparked genuine curiosity about its reliability and security, and she has grown into the role through hard work and mentorship from senior practitioners like Zach. She is self-motivated and a quick learner, but the environment constantly works against her.",
    concerns: ["Getting things done reliably and safely", "Building deep expertise without losing generalist career development", "Not creating more dependencies on Zach", "Keeping documentation current for junior team members"],
    painPoints: ["Steep initial learning curve with almost no on-ramp documentation", "Difficulty finding authoritative answers quickly across fragmented documentation", "Traditional tooling that rewards deep specialization but punishes new entrants", "Limited collaborative working environment due to security constraints", "Uncertainty about how mainframe skills transfer to broader career paths"],
    quote: "I learned about the mainframe from one of my college courses, and I was fascinated by the security, reliability, and scalability that mainframe technology can provide.",
  },
  chris: {
    name: "Chris",
    role: "z/OS Systems Programmer (early tenure)",
    experience: "Early tenure (0–3 years on Z)",
    summary: "Chris is a newly minted systems programmer joining a mainframe team, typically transitioning from a university computer science or IT program with no prior mainframe exposure. He represents the generation of practitioners who must learn z/OS, JCL, and ISPF from scratch while simultaneously supporting a production environment — a combination that creates a steep and often discouraging learning curve.",
    concerns: ["Building confidence and competence quickly enough to contribute without being a liability", "Not asking the same question twice", "Understanding enough system context to make safe decisions independently", "Finding a clear path to becoming an Alice-level practitioner"],
    painPoints: ["No intuitive on-ramp", "z/OS documentation is dense and assumes prior knowledge", "Tooling (ISPF, SDSF, JCL syntax) has a steep adoption curve", "Reliance on senior colleagues for every non-trivial decision", "Fear of breaking production", "Difficulty understanding how components relate across the stack"],
  },
  stan: {
    name: "Stan",
    role: "Subsystem SME — CICS, Db2, MQ, or IMS",
    experience: "Senior / experienced",
    summary: "Stan is a senior CICS systems programmer with a long mainframe career — COBOL developer, operations team lead, and now the lead CICS systems programmer at his organization. He owns CICS availability, performance, and operational integrity. He acts as both an advocate and gatekeeper for the platform, helping application teams while keeping the environment stable and controlled. Stan represents a broader subsystem SME archetype.",
    concerns: ["Subsystem availability and performance during and after patches", "Ensuring patch sequencing does not break CICS regions, Db2 connections, or MQ channels", "Maintaining control over changes to their subsystem while working within the broader Atlas-orchestrated change workflow"],
  },
  angie: {
    name: "Angie",
    role: "Application Architect",
    experience: "Senior / experienced",
    summary: "Angie designs applications and solutions for her business that integrate with IBM Z systems using the latest technologies. As Application Architect, she owns the roadmap for her applications — defining architecture, managing dependencies, and aligning development strategy with business unit direction. She spends roughly 25% of her time working with systems programmers and infrastructure teams to get the underlying platform in place.",
    concerns: ["Application topology clarity and dependency mapping", "Change impact analysis across the full stack before a change reaches production", "Technical debt visibility", "Modernisation roadmap credibility with the business", "Keeping development velocity competitive with cloud-native teams"],
    painPoints: ["Speed and agility on z/OS development lags behind cloud-native peers", "Pressure to innovate while maintenance costs grow", "Justifying mainframe cost to business leadership", "Complete manual process for identifying business logic encoded across millions of lines of code", "Inability to respond rapidly to policy changes", "Monolithic application architecture makes impact assessment slow and error-prone", "Training new developers unfamiliar with mainframe programming concepts"],
    quote: "I spend 25% of my time dealing with the system programmers and people responsible for installing the software to get the underlying infrastructure in place.",
  },
  kathleen: {
    name: "Kathleen",
    role: "Experienced z/OS Application Developer",
    experience: "Senior / experienced",
    summary: "Kathleen is part of the product team who plans, codes, builds, provisions, deploys, and tests their product. As an experienced developer, she can solve complex mainframe issues independently and mentors junior developers on her team. She frequently interacts with System Programmers (Zach, Alice) and Database Administrators to get the infrastructure and environment access she needs.",
    concerns: ["Delivering changes on time without breaking production", "Understanding the blast radius of her changes before they reach integration testing", "Getting fast environment access without a sysprog ticket", "Mentoring Deb effectively without becoming a bottleneck herself"],
    painPoints: ["Reliance on Systems Programmers and infrastructure teams to get things done", "No isolated or parallel development and testing environments", "No ability to quickly spin up and tear down testing sandboxes", "Little or no test automation", "No access to application performance metrics", "Too many deployment steps for CICS and IMS", "Time spent creating documentation for junior developers instead of building"],
  },
  deb: {
    name: "Deb",
    role: "Early tenure z/OS Application Developer",
    experience: "Early tenure",
    summary: "Deb is an early-tenure application developer who fixes bugs and adds new functionality to her team's applications. She is part of the product team that plans, codes, builds, provisions, deploys, and tests their product. She collaborates with Zach (and sometimes Kathleen) for provisioning and environment access.",
    concerns: ["Understanding the impact of her changes before they reach production", "Getting fast feedback on her code without waiting for infrastructure", "Learning the system context she does not yet have", "Becoming self-sufficient rather than dependent on Kathleen or Zach for every infrastructure question"],
    painPoints: ["Everything is slow and requires multi-team coordination", "Antiquated tools compared to other platforms", "Too many tool switches during development", "No isolated or parallel test environments", "Little or no test automation", "No access to application performance metrics", "Too many steps to deploy to IMS or CICS", "No way to understand the production impact of her changes", "Difficulty understanding application topology"],
  },
  sage: {
    name: "Sage",
    role: "Mid-level Security Administrator",
    experience: "Mid-tenure",
    summary: "Sage is a mid-level security administrator who collaborates with her team to protect systems infrastructure from internal and external security threats. She enforces compliance with all security policies, provides security solutions for data centre systems, instructs and directs other security personnel, and collaborates with CFX teams to manage security activities on the mainframe. Day-to-day, Sage's primary environment is RACF.",
    concerns: ["Preventing data breaches and cyber attacks", "Managing digital certificates cleanly and efficiently across the full mainframe estate", "Ensuring the mainframe security posture is visible and defensible to auditors and executive leadership", "Keeping pace with increasingly frequent audit cycles without a proportional increase in team size"],
    painPoints: ["Certificate sprawl across multiple RACF profiles and application keystores with no consolidated inventory", "Manual certificate expiry tracking that relies on calendar reminders and spreadsheets", "RACF query complexity that requires deep expertise to navigate efficiently", "Security configuration changes that happen outside her team's change control", "Difficulty producing auditor-ready evidence quickly when the audit cycle begins"],
  },
  fred: {
    name: "Fred",
    role: "Security Architect",
    experience: "Experienced (senior)",
    summary: "Fred designs and owns the enterprise's end-to-end security posture. He identifies the hardware, software, configuration, and service processes required to meet or exceed all compliance regulations and protect client data and trust. He manages a solution development team of application developers, data scientists, and ML engineers, and is responsible for PHI/PII data security both on-premises and in the cloud.",
    concerns: ["End-to-end security architecture of the platform", "Whether sensitive data is encrypted correctly across all hops", "Whether authority separation is enforced in production databases", "Whether security configurations match the declared posture", "Whether compliance evidence is accurate and continuously maintained"],
    painPoints: ["Diverse data sets and unstructured data across heterogeneous operating environments", "End-to-end encryption in-transit and at-rest insufficient for cross-border data privacy regulations", "Application rewrite cost, computation overhead, and trusted hardware requirements", "Managing security risks while sharing sensitive data internally and with cloud/edge partners", "Key management complexity growing as encryption standards evolve toward QSC", "No automated inventory of cryptographic posture across the estate"],
    quote: "Regardless of whether you're using traditional methods of encryption (AES) or FHE, you must manage the keys. Customers are trying to grapple with this issue over the last few years.",
  },
  derek: {
    name: "Derek",
    role: "Compliance Evidence Provider",
    experience: "Mid-level; 2–5 person security engineering team",
    summary: "Derek is a security engineer embedded in a small compliance team (2–5 people), specializing in RACF for access control to sensitive data — including cardholder data. He takes compliance direction from the CISO. He owns the evidence gathering, documentation, and substantiation work that external auditors require multiple times per year.",
    concerns: ["Gathering and assembling compliance documentation efficiently", "Mapping IBM Z security controls to regulatory requirements written for distributed environments", "Demonstrating continuous compliance rather than point-in-time snapshots", "Getting a 'big picture view' that is technology-agnostic enough to show to the CSO and auditors"],
    painPoints: ["Does not always understand how distributed-environment regulatory requirements map to Z capabilities", "Spends too much time gathering documentation and explaining Z's architecture to auditors", "No automated alerting when compliance posture degrades — relies on manual checks"],
    quote: "The amount of time spent on compliance has exponentially grown — we used to do it every 2 years and it was quite general. Now it's multiple times a year.",
  },
  annette: {
    name: "Annette",
    role: "IT Operations Engineer (L2 Operator)",
    experience: "Early tenure",
    summary: "Annette encompasses the group of L2 operators responsible for monitoring mainframe resources. She monitors events and tickets to identify problems impacting users of applications and IT infrastructure. She attempts to resolve problems as fast as possible — doing some problem analysis and fixing herself — but hands difficult problems off to the appropriate Z SME (typically Zach) when the problem is beyond her scope.",
    concerns: ["Fast problem identification and triage before user impact escalates", "Knowing when to escalate vs. resolve herself", "Clear, actionable guidance rather than raw technical data", "Closing incidents with a complete audit trail so compliance requirements are met"],
    painPoints: ["Alert overload and fatigue from managing a high volume of notifications across fragmented tools", "No consolidated view of the mainframe environment", "Difficulty isolating which subsystem is the root cause of a problem", "Dependence on Z SME expertise to interpret and remediate", "Lack of clearly documented or automated remediation procedures", "Time lost convening war room calls for problems that should be self-serviceable"],
  },
  quinn: {
    name: "Quinn",
    role: "IT Operations Manager",
    experience: "Senior / experienced",
    summary: "Quinn manages the IT operations team — the group that Annette and her L2 operator peers belong to. She is responsible for service availability KPIs, incident response process, on-call scheduling, tooling investment, and the escalation chain between L2 operators and Z SMEs like Zach. She is accountable when an incident breaches SLA and when a war room call runs for three hours instead of thirty minutes.",
    concerns: ["Mean time to resolution (MTTR) and service availability SLA compliance", "Building a resilient operations team that is not dependent on one or two expert individuals", "Cost of operational staffing relative to incident volume", "Ensuring the operations team is audit-ready at all times", "Succession planning as experienced Z operators approach retirement"],
    painPoints: ["No consolidated operational view across the mainframe estate", "Incident metrics are hard to compile and often lag reality", "SME escalation bottleneck (Zach is unavailable or on another incident when Annette needs him)", "Runbook coverage is incomplete and rarely updated", "Difficult to demonstrate operational improvement to leadership without reliable baseline data"],
  },
  greg: {
    name: "Greg",
    role: "Infrastructure Architect",
    experience: "Senior / experienced",
    summary: "Greg owns the end-to-end infrastructure architecture for his enterprise — spanning IBM Z, distributed systems, cloud (typically IBM Cloud or a hybrid multi-cloud), and the network fabric that connects them. He is responsible for making sure infrastructure investments are justified, scalable, and aligned with the direction the business is going.",
    concerns: ["Infrastructure coherence across the hybrid estate", "Capacity planning accuracy and lead time", "Ensuring systems programmers' operational changes stay within the architectural boundaries he defines", "Demonstrating the business value of IBM Z infrastructure investment to Lauren and senior leadership"],
    painPoints: ["Fragmented infrastructure visibility across Z, distributed, and cloud environments", "Difficulty producing a credible single view of the estate for executive or audit purposes", "Inability to quickly assess the blast radius of a platform-level change", "Architecture documentation that drifts from production reality within months of being written"],
  },
  alex: {
    name: "Alex",
    role: "Performance / Application Engineer",
    experience: "Mid-level to senior",
    summary: "Alex is a performance and application engineer responsible for ensuring IBM Z applications perform correctly under normal and peak load conditions. She sits at the boundary between application behavior and infrastructure configuration — she understands transaction flows and workload patterns but relies on systems programmers like Zach for the z/OS-level parameter changes she recommends.",
    concerns: ["Fast root cause isolation across the application-infrastructure boundary", "Validated configuration change recommendations", "Directional performance testing for regression detection", "Capacity headroom ahead of known peak events", "Avoiding performance incidents that were predictable"],
  },
  lupita: {
    name: "Lupita",
    role: "Key Management and Cryptography Services",
    experience: "Mid-level to senior",
    summary: "Lupita is responsible for the lifecycle management of cryptographic keys and the cryptography services infrastructure across the enterprise. On IBM Z, this centres on the IBM Hardware Security Module (HSM) ecosystem — specifically ICSF and the CEX coprocessors — as well as enterprise key management integrations.",
    concerns: ["Cryptographic key availability and integrity", "Compliance with key lifecycle policies (NIST, PCI-DSS, FIPS 140-3)", "Managing the quantum-safe transition without service disruption", "Ensuring key escrow and recovery procedures work correctly before they are ever needed", "Authority separation so that no single individual can access, use, and delete a key without oversight"],
    painPoints: ["No automated inventory of key and certificate dependencies across the estate", "Key rotation processes are largely manual and involve coordination across multiple teams", "The upcoming quantum-safe migration requires dependency mapping at a scale no current tooling supports", "Audit evidence for key lifecycle compliance is difficult to compile"],
  },
  lauren: {
    name: "Lauren",
    role: "Line of Business Decision Maker",
    experience: "Senior / experienced",
    summary: "Lauren owns and leads a business function — fraud prevention, credit risk assessment, claims processing, or similar. She is accountable for business outcomes, operational performance, KPIs, budgeting, and technology investment decisions. She does not operate Atlas directly; she is the executive who funds it, approves it, and holds IT accountable for results.",
    concerns: ["ROI and business value", "Slow implementation cycles", "High cost of PoCs and sandboxes", "Difficulty proving business relevance", "Fear of being an early adopter"],
  },
  charles: {
    name: "Charles",
    role: "AI Engineer",
    experience: "Experienced",
    summary: "Charles is an AI engineer on IBM Z who works across the full AI lifecycle: building and deploying models, integrating them into scalable low-latency services on the mainframe, monitoring production performance, and troubleshooting issues. He develops pipelines, runs inference, and optimizes AI systems for reliability, security, latency, and throughput.",
    concerns: ["Integrating modern ML tools with legacy technology", "Accessing and extracting large training data volumes", "Deploying models into mainframe-compatible formats", "Skill gap between modern ML practices and Z-specific tooling"],
  },
  conrad: {
    name: "Conrad",
    role: "Application Owner (Certificates and Secrets)",
    experience: "Experienced",
    summary: "Conrad is responsible for the security, reliability, and compliance of enterprise applications, with specific ownership of certificate and secrets management. He coordinates with internal and external certificate authorities, manages credential rotation and access controls, and ensures timely certificate renewal.",
    concerns: ["Certificate lifecycle complexity across multiple teams and CA sources", "Credential exposure risk", "Lack of automated credential rotation", "Certificates stored in multiple locations with no unified view", "Renewal process awareness and coordination"],
  },
  karla: {
    name: "Karla",
    role: "Storage Administrator (experienced)",
    experience: "Senior / experienced",
    summary: "Karla manages DASD (Direct Access Storage Devices), tape libraries, and storage subsystems across the IBM Z estate. She is responsible for storage capacity planning, performance, availability, data migration, and ensuring that storage configurations comply with backup and recovery requirements.",
    concerns: ["Storage capacity headroom and avoiding allocation failures", "Data placement compliance (data class, storage class, management class alignment)", "Backup and recovery policy adherence", "Coordinating storage impact assessment with Zach before z/OS maintenance"],
    painPoints: ["Capacity planning based on historical trend data that is hard to extract and aggregate", "Alert fatigue from individual volume or pool thresholds that generate noise without context", "Difficulty correlating storage events with application performance complaints in real time", "Change control processes that require storage impact assessments but provide no automated tooling"],
  },
  elsa: {
    name: "Elsa",
    role: "Storage Administrator (early tenure)",
    experience: "Early tenure",
    summary: "Elsa is early in her storage administration career, typically inheriting a storage environment she did not design and must learn from the inside out. She knows the tooling at a procedural level — she can execute the runbooks Karla has written — but she lacks the pattern recognition to diagnose novel problems or assess the downstream impact of a storage configuration change.",
    concerns: ["Executing operational tasks correctly without inadvertently causing a production issue", "Building enough context to understand the why behind the procedures she follows", "Knowing when a problem is within her scope to resolve and when to escalate to Karla or Zach"],
  },
};

export const getPersonaUseCases = (personaName: string): { primary: UseCaseDetail[]; secondary: UseCaseDetail[] } => {
  const primary: UseCaseDetail[] = [];
  const secondary: UseCaseDetail[] = [];
  for (const detail of Object.values(useCaseDetails)) {
    const match = detail.personas.find((p) => p.name.toLowerCase() === personaName.toLowerCase());
    if (match) {
      if (match.engagement === "Primary") primary.push(detail);
      else secondary.push(detail);
    }
  }
  return { primary, secondary };
};

export const productNodes: ProductNode[] = [
  {
    id: "atlas",
    label: "Atlas",
    type: "atlas",
    description: "AI-powered platform for IBM Z environment intelligence, change management, and predictive operations.",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "system",
    label: "System Intelligence",
    type: "systemIntelligence",
    description: "Know your environment — topology, inventory, relationships, health. GA Dec 2026.",
    connections: ["atlas", "uc-04", "uc-05"],
  },
  {
    id: "change",
    label: "Change Intelligence",
    type: "changeIntelligence",
    description: "Change safely — impact analysis, planning, testing, provisioning. GA Dec 2026 (MVP); H1 2027 (full).",
    connections: ["atlas", "uc-02", "uc-07", "uc-08", "uc-12", "uc-13", "uc-14"],
  },
  {
    id: "predictive",
    label: "Predictive Intelligence",
    type: "predictiveIntelligence",
    description: "Stay ahead — drift detection, anomaly prediction, DR readiness. H2 2027.",
    connections: ["atlas", "uc-01", "uc-03", "uc-06", "uc-09", "uc-10", "uc-11"],
  },
  {
    id: "uc-01",
    label: "UC-01: Vulnerability Remediation",
    type: "useCase",
    description: "Identify, prioritize, and remediate security vulnerabilities across the IBM Z estate with full audit trail.",
    connections: ["predictive"],
  },
  {
    id: "uc-02",
    label: "UC-02: Patch Management",
    type: "useCase",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with rollback capability.",
    connections: ["change"],
  },
  {
    id: "uc-03",
    label: "UC-03: Audit and Compliance",
    type: "useCase",
    description: "Generate structured, auditor-ready compliance evidence from a continuous environment record.",
    connections: ["predictive"],
  },
  {
    id: "uc-04",
    label: "UC-04: Staff Onboarding",
    type: "useCase",
    description: "Get new team members productive fast with AI-guided environment orientation and knowledge transfer.",
    connections: ["system"],
  },
  {
    id: "uc-05",
    label: "UC-05: Application Discovery and Dependency Analysis",
    type: "useCase",
    description: "Complete dependency mapping and blast radius analysis across the full middleware stack.",
    connections: ["system"],
  },
  {
    id: "uc-06",
    label: "UC-06: Change Readiness and Health Assessment",
    type: "useCase",
    description: "Pre-event health checks joining configuration state, security posture, PTF currency, and performance constraints.",
    connections: ["predictive"],
  },
  {
    id: "uc-07",
    label: "UC-07: Application Change Management",
    type: "useCase",
    description: "Developer-native change lifecycle with impact analysis, test generation, and deployment orchestration.",
    connections: ["change"],
  },
  {
    id: "uc-08",
    label: "UC-08: Platform Upgrade and Migration",
    type: "useCase",
    description: "Major z/OS and middleware upgrade planning with compatibility assessment and phased execution.",
    connections: ["change"],
  },
  {
    id: "uc-09",
    label: "UC-09: Environment Parity and Drift Control",
    type: "useCase",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation.",
    connections: ["predictive"],
  },
  {
    id: "uc-10",
    label: "UC-10: Disaster Recovery Validation",
    type: "useCase",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation.",
    connections: ["predictive"],
  },
  {
    id: "uc-11",
    label: "UC-11: Capacity Planning and Performance Readiness",
    type: "useCase",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes.",
    connections: ["predictive"],
  },
  {
    id: "uc-12",
    label: "UC-12: Application Modernization",
    type: "useCase",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization.",
    connections: ["change"],
  },
  {
    id: "uc-13",
    label: "UC-13: Regulatory Change Response",
    type: "useCase",
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, and sequenced remediation.",
    connections: ["change"],
  },
  {
    id: "uc-14",
    label: "UC-14: Change Governance and Traceability",
    type: "useCase",
    description: "Complete change attribution, undocumented change detection, and ITSM integration for audit readiness.",
    connections: ["change"],
  },
];

export const useCaseDetails: Record<string, UseCaseDetail> = {
  "uc-01": {
    id: "uc-01",
    label: "UC-01: Vulnerability Remediation",
    description: "Identify, prioritize, and remediate security vulnerabilities across the IBM Z estate with full audit trail and change attribution.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Primary" },
      { name: "Sage", role: "Security Administrator (mid-level)", engagement: "Secondary" },
      { name: "Fred", role: "Security Architect", engagement: "Secondary" },
      { name: "Alice", role: "z/OS Systems Programmer (mid-level)", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Discover", description: "An advisory is published or a security gap is suspected. The team must determine whether they are exposed." },
        { name: "Assess", description: "Cross-reference multi-LPAR query results to determine which systems are actually affected and at what PTF level." },
        { name: "Blast Radius", description: "Determine which applications, datasets, and downstream systems are reachable from the exposed component." },
        { name: "Plan", description: "Build a remediation plan — PTF prerequisite chain, LPAR apply order, DR sequencing, test environment requirements." },
        { name: "Validate", description: "Provision a test environment, apply the PTF, and confirm no breakage before touching production." },
        { name: "Execute", description: "Apply the PTF across all affected LPARs in the correct order, monitoring for failures." },
        { name: "Close", description: "Assemble the audit trail — what was applied, when, who authorized it, what validation was performed." },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — 2–3 business days", description: "Answering 'are we exposed?' requires logging into ISPF on each LPAR individually and running SMP/E or GIMAPI queries — typically a 2–3 day process across a large estate.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — requires Zach's availability to produce any exposure answer", description: "Has no direct way to determine exposure without going through Zach first; dependent on a verbal summary rather than real data.", stageIndex: 0 },
        { persona: "Sage", type: "pain", title: "Business Impact — security posture is undefended at the executive level during the exposure window", description: "CISO and management expect an exposure brief she cannot produce without a multi-day investigation.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours", description: "Manually cross-referencing results across LPARs relies entirely on expert memory and is not documented anywhere.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — detection window always lags the threat", description: "No proactive signal before a CVE is publicly published — exposure is discovered reactively, from the advisory.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 1–3 days", description: "Blast radius analysis has no automated tooling — it requires the most experienced engineer to trace dependencies from memory.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — audit exposure is compounded by inability to quantify blast radius", description: "No unified, query-ready evidence source to defend certificate and compliance posture in audits.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — unknown compound risks remain open", description: "Compound risk (e.g., missing PTF + unencrypted connection) is invisible to any single tool.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours + potential production incident", description: "PTF prerequisite chain resolution is manual; a missed co-requisite causes a failed apply discovered only during a production change window.", stageIndex: 3 },
        { persona: "Zach", type: "pain", title: "Business Impact — incorrect sequencing can cause outages worse than the original vulnerability", description: "Multi-LPAR sequencing for patches with shared subsystem dependencies (shared Db2, shared MQ) is planned from memory.", stageIndex: 3 },
        { persona: "Zach", type: "pain", title: "Business Impact — a live failover exposure remains open after production is remediated", description: "DR environments are frequently patched last or forgotten entirely.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–5 days, or step is skipped entirely", description: "Lab environments take days to provision; under time pressure this step is skipped — production becomes the de facto test environment for emergency patches.", stageIndex: 4 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — Alice cannot execute safely without Zach present", description: "Remediation steps delegated by Zach lack the context needed to execute them safely; every delegated task still requires Zach's availability.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — apply failures on one LPAR can have knock-on effects across the estate", description: "Multi-LPAR apply sequenced from memory; shared dependencies create coordination risk.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours", description: "The entire audit trail is assembled after the fact from memory, email threads, and change tickets.", stageIndex: 6 },
        { persona: "Sage", type: "pain", title: "Business Impact — compliance evidence is incomplete and unreliable", description: "No auditor-ready evidence package without the same manual investigation effort.", stageIndex: 6 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas proactively identifies a FIXCAT security gap or a user queries Atlas immediately on receipt of an advisory." },
        { name: "Assess", description: "Atlas queries all connected LPARs simultaneously and returns a complete exposure picture with PTF gap details, FIXCAT classification, and affected products." },
        { name: "Traverse Blast Radius", description: "Atlas traverses the dependency graph from each exposed component, naming every reachable system, dataset, and downstream application." },
        { name: "Plan Remediation", description: "Atlas generates a sequenced remediation plan: apply order, PTF prerequisites resolved, test environment specification, DR remediation sequenced in." },
        { name: "Provision + Test", description: "Atlas provisions the test environment, deploys application components, and executes the test plan." },
        { name: "Decide", description: "Zach reviews test results and Atlas's recommendation. Authorizes production apply — hard governance gate per LPAR." },
        { name: "Execute", description: "Atlas orchestrates production apply across LPARs in sequenced order. Each LPAR apply requires individual Zach authorization." },
        { name: "Monitor", description: "During the production remediation window, Atlas monitors for exploitation activity on patched and unpatched LPARs." },
        { name: "Close", description: "All LPARs and DR environments patched and validated. Atlas generates the complete remediation record." },
      ],
      markers: [
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — proactive monitoring surfaces risk before it is asked", description: "Atlas surfaces a FIXCAT security gap without a user query — shortening the detection-to-response window from 'whenever the advisory reaches the right person' to 'when Atlas's next PTF currency check runs.'", stageIndex: 0 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage can act on a finding without depending on Zach", description: "Proactive alert means Sage can initiate a CISO brief immediately rather than waiting for Zach's investigation to complete.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–3 business days → under 10 minutes", description: "'Are we exposed?' answered in seconds — Atlas queries all connected LPARs simultaneously. No ISPF. No SMP/E dialogs.", stageIndex: 1 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage gains direct access to exposure facts", description: "Real exposure data rather than Zach's verbal summary — Sage can independently verify exposure scope without going through Zach first.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — multi-source topology traversal from ZUnderstand, impossible manually", description: "Blast radius is a topology map, not a guess. Atlas traverses the dependency graph and names every reachable system — coverage confidence surfaced alongside the map.", stageIndex: 2 },
        { persona: "Sage", type: "time", title: "Time Saving — 1–3 days → under 30 minutes", description: "Real blast radius map allows Sage to produce a CISO-ready exposure brief in minutes, not after a multi-day investigation.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — cross-source risk compounding only possible with Atlas's unified model", description: "Compound risk identification: Atlas surfaces combinations of findings (missing security PTF + unencrypted IPIC connection) that create compound risk invisible to any single tool.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — Atlas resolves co-requisite chains without Zach navigating SMP/E resolution rules", description: "Every PTF prerequisite resolved automatically — eliminating the leading cause of PTF-related production outages.", stageIndex: 3 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — Atlas flags this without being asked", description: "DR exposure flagged proactively while production is being remediated — the failure mode that leads to breaches.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–5 days → automated provisioning", description: "Test environment available; no manual provisioning lag before the validation step can begin.", stageIndex: 4 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently executes delegated steps", description: "Step-by-step execution guidance generated for each delegated LPAR apply — Alice can execute safely without Zach in the room.", stageIndex: 4 },
        { persona: "Alice", type: "skill", title: "Atlas AI & Automation — configuration update generated automatically from test failure", description: "If a test fails, Atlas identifies the specific dependency and generates the required fix (e.g., CSD update) in real time.", stageIndex: 4 },
        { persona: "Zach", type: "time", title: "Time Saving — decision is made from a complete picture, not assembled from multiple sources", description: "Clear recommendation with supporting evidence — test results, prerequisite resolution, blast radius, DR status — all in one place for the authorization decision.", stageIndex: 5 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — shared dependency ordering computed and enforced automatically", description: "Dependency-aware sequencing prevents knock-on failures during multi-LPAR apply. Progress visible in real time.", stageIndex: 6 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — proactive behavioral monitoring during the exposure window", description: "Exploitation activity detected during remediation window surfaces immediately — Atlas surfaces anomalies without being asked.", stageIndex: 7 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage has independent visibility into DR remediation status", description: "DR exposure remains tracked and flagged until DR remediation is confirmed complete — no silent failover risk.", stageIndex: 7 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–4 hours manual assembly → automatic", description: "Complete audit trail generated automatically — exposure assessment, blast radius, plan, test results, apply log, authorization chain. Zero manual assembly.", stageIndex: 8 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage produces the evidence package without Zach's involvement", description: "CISO-ready evidence package available immediately at close — auditor-ready without further effort.", stageIndex: 8 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "BOB PPZ Enrichment Touchpoint",
          summary: "Atlas traverses the dependency graph using ZUnderstand application discovery (packaged in Atlas). When Bob PPZ is also installed, the traversal is enriched with ZUnderstand's full code-level metadata — precise program-to-program call relationships, data flow paths, and business service attribution. For an estate with complex COBOL call chains, this means the blast radius map includes execution-path-level detail, not just topology-level relationships. Compound risks involving application code (e.g., a program with both a missing PTF dependency and a known data flow vulnerability) are surfaced with higher precision.",
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "BOB PPZ Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has generated a sequenced remediation plan — PTF prerequisites resolved, apply order determined, DR remediation sequenced. During plan generation, Atlas may identify that applying a specific PTF requires a compensating application code change." },
            { label: "Atlas directs the user to Bob PPZ", description: "Atlas presents the code-change requirement as a named item in the remediation plan — identifying the affected program(s), the nature of the required change, and the dependency context. The user is directed to Bob PPZ to implement the code change using ZUnderstand's deterministic code-level intelligence." },
            { label: "Bob PPZ returns to Atlas", description: "The completed code change artifact. Atlas incorporates it into the overall remediation plan, validates it in the provisioned test environment (Step 5), and confirms it before production apply." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "BOB PPZ Handoff",
          steps: [
            { label: "Atlas produced", description: "A provisioned test environment with the PTF applied. Atlas executes the test plan and, if a test failure is attributed to an application code dependency (not just a configuration issue), Atlas identifies the specific program and the nature of the incompatibility." },
            { label: "Atlas directs the user to Bob PPZ", description: "Atlas presents the failure context — the specific program, the call path, the behavioral change the PTF introduced — and directs the user to Bob PPZ for the code-level fix. Bob PPZ uses ZUnderstand to trace the execution path, understand the affected business logic, and generate the precise modification required." },
            { label: "Bob PPZ returns to Atlas", description: "A fix artifact. Atlas re-runs the test against the corrected code, confirms pass, and proceeds with the remediation plan." },
          ],
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z's Risk Management module has identified a missing critical security PTF (FIXCAT gap) across one or more z/OS environments, flagged it as operational risk, and initiated a change ticket or Ansible remediation workflow." },
            { label: "Concert4Z hands to Atlas", description: "The change ticket or remediation trigger passes to Atlas. Atlas takes the planned change and applies its change intelligence: querying all connected LPARs for the full exposure picture, traversing the blast radius across the application-to-infrastructure topology, resolving PTF prerequisites, and generating a sequenced remediation plan." },
            { label: "Atlas returns to Concert4Z", description: "After Atlas completes the remediation, the validated, applied change is recorded in Atlas's change log. Atlas generates the audit trail and evidence package. Concert4Z's Risk Management module sees the operational risk as resolved." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas traverses the dependency graph using ZUnderstand application discovery and topology data. Concert4Z's ZEN (Z Observability Connect runtime relationship data) enriches this traversal with runtime-observed application flows — which transactions actually called which programs during the observation period. This means the blast radius includes execution-path-level precision for active workloads, not just statically configured relationships. A program that is statically reachable but never actually invoked is distinguished from one that is in an active hot path.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas is monitoring production LPARs and DR environments during and after the remediation window for exploitation activity and anomalous behavior. Concert4Z's Observe module provides the production anomaly detection and event correlation that Atlas's monitoring step draws on. If Concert4Z detects behavioral anomalies on a patched or unpatched LPAR during the remediation window, these signals enrich Atlas's monitoring surface. Atlas surfaces anomalies without being asked; Concert4Z's continuous production monitoring is the data source that makes this possible.",
          stageIndex: 7,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas generates the complete audit trail — exposure assessment, blast radius, plan, test results, apply log, authorization chain. Concert4Z's change evidence integration means the closed vulnerability remediation record in Atlas flows into Concert4Z's operational context, so production operations teams have the full remediation history available during any subsequent incident investigation on the affected systems.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "When Atlas generates the onboarding environment context for a new hire, Terraform's workspace structure provides infrastructure metadata: which LPARs are Terraform-managed, what their workspace assignments are, what the IaC change workflow looks like. This enriches the environment context for new hires who will interact with both Atlas and Terraform workflows.",
          stageIndex: 0,
        },
      ],
    },
    capabilities: [
      { name: "System Topology", timeline: "GA", description: "Dependency graph for blast radius analysis" },
      { name: "Change Risk Assessment", timeline: "GA", description: "AI-powered impact and risk scoring" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration baseline and comparison" },
      { name: "Workflow Engine", timeline: "GA", description: "Orchestrated remediation execution" },
      { name: "Health Assessment", timeline: "H2 2027", description: "Continuous security posture monitoring" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Detect unauthorized configuration changes" },
    ],
  },
  "uc-02": {
    id: "uc-02",
    label: "UC-02: Patch Management",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with full audit trail and rollback capability.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Primary" },
      { name: "Stan", role: "Subsystem SME (CICS, Db2, MQ, IMS)", engagement: "Secondary" },
      { name: "Alice", role: "z/OS Systems Programmer (mid-level)", engagement: "Secondary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Identify", description: "Query SMP/E for PTF inventory manually" },
        { name: "Analyze", description: "Cross-reference PTFs against topology by expert knowledge" },
        { name: "Plan", description: "Manual test plan creation and sequencing" },
        { name: "Provision", description: "Test environment requested via ticket — hours to days wait" },
        { name: "Validate", description: "Smoke tests run manually or skipped under pressure" },
        { name: "Execute", description: "Production apply with informal rollback plan" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours", description: "Manual impact analysis across subsystems takes 4–8 hours of expert-only work.", stageIndex: 1 },
        { persona: "Annette", type: "pain", title: "Business Impact — test environments skipped", description: "Production becomes the test environment when lab provisioning takes too long.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — prerequisite chains resolved by memory", description: "Missed prerequisites cause production outages during change windows.", stageIndex: 2 },
        { persona: "Quinn", type: "pain", title: "Business Impact — rollback planning improvised", description: "When things go wrong, rollback plans are created on the spot rather than prepared in advance.", stageIndex: 5 },
        { persona: "Zach", type: "skill", title: "Skill Gap / Bottleneck — mid-level engineers cannot execute independently", description: "Every patch application requires Zach's direct involvement — high expert dependency creates bottleneck.", stageIndex: 2 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Identify", description: "Atlas surfaces missing and at-risk PTFs proactively" },
        { name: "Analyze", description: "Topology-aware impact with prerequisite chain resolution" },
        { name: "Plan", description: "AI-generated test plan scoped to specific change" },
        { name: "Provision", description: "Isolated test environment provisioned automatically" },
        { name: "Validate", description: "Automated smoke and function tests with failure attribution" },
        { name: "Execute", description: "Orchestrated apply with known-good rollback state" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Time Saving — under 30 minutes", description: "Complete impact analysis with prerequisite resolution in under 30 minutes.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — prerequisite chains resolved automatically", description: "No missed dependencies — Atlas resolves every co-requisite before apply.", stageIndex: 1 },
        { persona: "Quinn", type: "gain", title: "New User Capability — complete change record with test evidence", description: "Full audit trail and test evidence generated automatically at close.", stageIndex: 5 },
        { persona: "Alice", type: "gain", title: "New User Capability — mid-level engineers execute with Atlas guidance", description: "Step-by-step execution guidance reduces expert dependency.", stageIndex: 2 },
        { persona: "Stan", type: "skill", title: "Atlas AI & Automation — cross-subsystem impact visible before apply", description: "CICS regions, Db2 connections, and MQ channels stay stable during patch apply.", stageIndex: 1 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "BOB PPZ Enrichment Touchpoint",
          summary: "Atlas analyzes the cross-subsystem impact of the proposed PTF apply. When Bob PPZ is installed, the impact analysis is enriched with ZUnderstand's code-level metadata — precise program-to-program call relationships, data flow paths, and business service attribution. For subsystems with complex COBOL call chains, this means the impact analysis includes execution-path-level detail, not just topology-level relationships. Compound risks involving application code (e.g., a program with both a missing PTF dependency and a known data flow vulnerability) are surfaced with higher precision.",
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "BOB PPZ Handoff",
          steps: [
            { label: "Atlas produced", description: "A provisioned test environment with the PTF staged for apply. Atlas executes the automated test plan." },
            { label: "Atlas directs the user to Bob PPZ", description: "If a test failure is attributed to an application code dependency (not just a configuration issue), Atlas identifies the specific program and the nature of the incompatibility. Atlas presents the failure context — the specific program, the call path, the behavioral change the PTF introduced — and directs the user to Bob PPZ for the code-level fix." },
            { label: "Bob PPZ returns to Atlas", description: "A fix artifact. Atlas re-runs the test against the corrected code, confirms pass, and proceeds with the patch apply." },
          ],
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z's Risk Management module has identified missing critical or HIPER PTFs across the z/OS estate. It has computed blast radius across z/OS environments, flagged the operational risk, and can auto-initiate a change ticket or invoke an Ansible agent workflow for a targeted, known fix." },
            { label: "Concert4Z hands to Atlas", description: "The initiated change passes to Atlas. Atlas applies full change intelligence to the planned patch batch: querying all connected LPARs for current PTF state, resolving prerequisite chains, mapping the impact of the proposed patches across subsystems and applications, and generating a sequenced patch plan." },
            { label: "Atlas returns to Concert4Z", description: "After Atlas completes the full patch cycle, the applied and validated change is recorded. Concert4Z's Risk Management module sees the operational risk as resolved and can use the Atlas change evidence in its operational record." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas's impact analysis maps which subsystems, applications, and transactions are affected by the proposed patch batch. Concert4Z's production performance baselines (from SMF/CDP data via OMEGAMON Data Provider) provide Atlas with the behavioral ground truth for the current environment — what normal CPU consumption, I/O rates, and transaction response times look like before the patch. This baseline data improves the specificity of Atlas's pre/post behavioral comparison during validation.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas runs the automated test package in the provisioned test environment. Concert4Z's ZEN data enriches the test coverage picture by identifying which production transaction flows are most active — ensuring Atlas's validation prioritizes the test scenarios that cover the highest-traffic paths, not just the statically configured topology.",
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas has generated the complete change record, attached the plan, test results, and execution log. In production, following patch apply, Concert4Z's Observe and Optimize modules monitor for post-patch behavioral regressions: CPU consumption changes, Db2 buffer pool behavior changes, CICS thread utilization changes. If Concert4Z detects a behavioral anomaly that correlates with the patch apply timestamp, it surfaces this as an operational finding. Atlas's change record provides Concert4Z with the exact change context for the correlation.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified applicable PTFs and is generating the readiness assessment — prerequisite chain, PE flag checks, HOLD analysis. The plan identifies which target LPARs need the patch and the infrastructure state they need to be in for the patch to land safely." },
            { label: "Atlas directs", description: "Before the maintenance window opens, Atlas directs the team to run terraform plan against each target LPAR's workspace to confirm zero infrastructure drift exists that could affect the patch outcome." },
            { label: "Terraform returns", description: "Terraform plan output confirming zero infrastructure-layer drift on each target LPAR — or surfacing any infrastructure differences that need to be resolved before patching begins. Atlas incorporates this confirmation into the pre-patch readiness assessment." },
          ],
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's workspace structure reveals which LPARs are Terraform-managed and what their declared resource specifications are. This informs the patch plan sequencing: LPARs in Terraform workspaces have a cleaner audit trail (infrastructure changes are declarative and versioned), and workspace boundaries naturally partition the patch sequence.",
          stageIndex: 1,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Automated PTF and fix inventory" },
      { name: "System Topology", timeline: "GA", description: "Cross-subsystem dependency mapping" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Prerequisite and compatibility analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Orchestrated patch execution" },
      { name: "Ansible Integration", timeline: "GA", description: "Automated PTF apply and validation" },
      { name: "Test Plan Generation", timeline: "GA", description: "AI-generated test plans" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "On-demand isolated test environments" },
    ],
  },
  "uc-03": {
    id: "uc-03",
    label: "UC-03: Audit and Compliance",
    description: "Generate structured, auditor-ready compliance evidence from a continuous environment record — privileged access, configuration compliance, change history, and undocumented change detection.",
    personas: [
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Primary" },
      { name: "Sage", role: "Security Administrator (mid-level)", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Scope", description: "Manually define audit scope across multiple systems" },
        { name: "Collect", description: "Pull RACF exports, SMP/E data, change logs separately" },
        { name: "Analyze", description: "Cross-reference findings in spreadsheets by hand" },
        { name: "Surface", description: "Discover gaps during audit, not before" },
        { name: "Remediate", description: "Fix findings under time pressure during audit window" },
        { name: "Package", description: "Assemble evidence package manually" },
      ],
      markers: [
        { persona: "Derek", type: "time", title: "Lost Time — 10–30 engineer-days", description: "For large production estate, manual evidence collection takes 10–30 engineer-days.", stageIndex: 1 },
        { persona: "Derek", type: "pain", title: "Business Impact — undocumented changes discovered by auditors, not internal team", description: "Gaps surface only when auditors find them — internal team has no proactive detection.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — separation of duties analysis performed manually under deadline", description: "Complex RACF analysis requires deep expertise and is done under time pressure.", stageIndex: 2 },
        { persona: "Derek", type: "pain", title: "Business Impact — no proactive detection", description: "Gaps surface only when specifically looked for — no continuous monitoring.", stageIndex: 3 },
        { persona: "Quinn", type: "pain", title: "Business Impact — audit findings disrupt planned work", description: "Audit findings must be remediated immediately, pulling resources from planned projects.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms audit scope from continuous record" },
        { name: "Collect", description: "All evidence assembled automatically from topology" },
        { name: "Analyze", description: "Cross-source compliance analysis with severity" },
        { name: "Surface", description: "Proactive gap detection before auditors find issues" },
        { name: "Remediate", description: "Atlas-generated plans with validation before apply" },
        { name: "Package", description: "Auditor-ready artifact generated in minutes" },
      ],
      markers: [
        { persona: "Derek", type: "time", title: "Time Saving — 10–30 engineer-days → under 2 engineer-days", description: "Evidence generated in hours instead of weeks of manual collection.", stageIndex: 1 },
        { persona: "Derek", type: "skill", title: "Atlas AI & Automation — 46 undocumented changes surfaced proactively in 12 months", description: "Continuous monitoring finds gaps before auditors do.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — behavioral anomaly detection", description: "Finds patterns no human thought to look for across RACF, SMP/E, and configuration data.", stageIndex: 3 },
        { persona: "Derek", type: "gain", title: "New User Capability — compliance professional operates without deep z/OS expertise", description: "Atlas surfaces findings in plain language — no need for RACF expert to interpret.", stageIndex: 5 },
        { persona: "Quinn", type: "gain", title: "New User Capability — proactive remediation before audit window", description: "Gaps addressed on a continuous basis rather than under audit pressure.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "BOB PPZ Enrichment Touchpoint",
          summary: "Atlas inventories all regulated data across the entire z/OS estate. When Bob PPZ is installed, the inventory is enriched with ZUnderstand's code-level metadata — precise program-to-program call relationships, data flow paths, and business service attribution. This means the regulated data inventory includes execution-path-level detail, showing not just which datasets contain regulated data, but which programs access them, how data flows between them, and which business services are affected.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas surfaces undocumented changes and access anomalies through its Config-as-Code baseline comparison and RACF analysis. Concert4Z's Observe module provides a complementary signal: production behavioral anomalies that may correlate with unauthorized access events — unusual process activity, unexpected dataset access patterns, off-hours system events. These Concert4Z signals can direct Atlas's anomaly investigation to specific time windows and system components, making the undocumented change enumeration more targeted and complete.",
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas monitors continuously for new compliance deviations between audit cycles. Concert4Z's continuous production monitoring provides a real-time signal layer that complements Atlas's configuration-based monitoring: where Atlas detects configuration drift, Concert4Z detects behavioral drift. The two signals together provide broader coverage — Atlas catches 'what changed in the configuration,' Concert4Z catches 'what started behaving differently in production,' and the combination narrows compliance gaps faster.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified compliance gaps across RACF, Db2, and configuration layers. The assessment also requires infrastructure-layer evidence: the current declared state of each LPAR's infrastructure from Terraform." },
            { label: "Atlas directs", description: "Atlas requests the current Terraform workspace state for each in-scope LPAR. The team exports the relevant workspace snapshots for Atlas to incorporate into the compliance evidence." },
            { label: "Terraform returns", description: "Terraform state snapshots providing the infrastructure baseline layer of the compliance assessment — versioned, structured records of the declared state for each LPAR." },
          ],
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's workspace assignments define clean infrastructure boundaries for compliance scope. When Atlas identifies systems in scope, Terraform's workspace structure automatically partitions in-scope from out-of-scope infrastructure, reducing manual scope negotiation during audit prep.",
          stageIndex: 0,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state recording and comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules and automated checking" },
      { name: "Health Assessment", timeline: "H2 2027", description: "Security posture scoring and gap analysis" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Unauthorized and undocumented change detection" },
    ],
  },
  "uc-04": {
    id: "uc-04",
    label: "UC-04: Staff Onboarding",
    description: "Get new team members productive fast with AI-guided environment orientation, knowledge transfer, and guided first change execution.",
    personas: [
      { name: "Chris", role: "z/OS Systems Programmer (early career)", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Alice", role: "z/OS Systems Programmer (mid-level)", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Orient", description: "New hire shadows experienced colleague informally" },
        { name: "Explore", description: "Read outdated or incomplete documentation" },
        { name: "Question", description: "Ask the one expert who is always too busy" },
        { name: "Learn", description: "Build mental model over months of trial and error" },
        { name: "First Change", description: "Execute first change with minimal guidance" },
      ],
      markers: [
        { persona: "Chris", type: "time", title: "Lost Time — 3–6 months to independence", description: "Common onboarding timeline before new hire can work independently.", stageIndex: 3 },
        { persona: "Chris", type: "pain", title: "Business Impact — no intuitive on-ramp", description: "z/OS documentation is dense and assumes prior knowledge — no beginner-friendly path.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — critical knowledge lives in people's heads", description: "Expert knowledge is lost when people retire — no systematic capture mechanism.", stageIndex: 2 },
        { persona: "Chris", type: "pain", title: "Business Impact — first changes carry high incident risk", description: "Incomplete understanding leads to production incidents during first changes.", stageIndex: 4 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — no systematic knowledge transfer", description: "No mechanism to transfer environmental knowledge from experienced to new staff.", stageIndex: 2 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Orient", description: "Atlas provides structured environment overview in first week" },
        { name: "Explore", description: "Natural language queries answer any question instantly" },
        { name: "Assess Risk", description: "Atlas surfaces highest-priority open risks proactively" },
        { name: "Document", description: "System Intelligence Brief generated as knowledge artifact" },
        { name: "First Change", description: "Atlas-guided safe execution with plan, test, workflow" },
      ],
      markers: [
        { persona: "Chris", type: "time", title: "Time Saving — 3–6 months → under 4 weeks", description: "Structured Atlas onboarding gets new hires productive in under 4 weeks.", stageIndex: 0 },
        { persona: "Chris", type: "skill", title: "Atlas AI & Automation — environment knowledge persists regardless of staff turnover", description: "Atlas captures and preserves institutional knowledge — not dependent on individuals.", stageIndex: 3 },
        { persona: "Chris", type: "gain", title: "New User Capability — proactive risk surfacing", description: "Shows what matters before new hire knows to ask — no need to know what to look for.", stageIndex: 2 },
        { persona: "Alice", type: "gain", title: "New User Capability — Atlas replaces shadowing", description: "Queryable, current environment model replaces informal shadowing.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — critical knowledge captured", description: "Reduces retirement impact by preserving expert knowledge in Atlas.", stageIndex: 2 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas provides a structured environment overview in the first week. Concert4Z's ZEN (Z Observability Connect runtime relationship data) enriches this overview with runtime-observed application flows — which transactions actually called which programs during the observation period. This means the environment overview includes execution-path-level precision for active workloads, not just statically configured relationships. A program that is statically reachable but never actually invoked is distinguished from one that is in an active hot path.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas is monitoring production LPARs and DR environments during and after the onboarding period for exploitation activity and anomalous behavior. Concert4Z's Observe module provides the production anomaly detection and event correlation that Atlas's monitoring step draws on. If Concert4Z detects behavioral anomalies on a patched or unpatched LPAR during the onboarding period, these signals enrich Atlas's monitoring surface. Atlas surfaces anomalies without being asked; Concert4Z's continuous production monitoring is the data source that makes this possible.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas generates the complete audit trail — exposure assessment, blast radius, plan, test results, apply log, authorization chain. Concert4Z's change evidence integration means the closed vulnerability remediation record in Atlas flows into Concert4Z's operational context, so production operations teams have the full remediation history available during any subsequent incident investigation on the affected systems.",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Environment inventory and overview" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration knowledge base" },
      { name: "Natural Language Query", timeline: "GA", description: "Ask questions in plain English" },
      { name: "Workflow Engine", timeline: "GA", description: "Guided first change execution" },
    ],
  },
  "uc-05": {
    id: "uc-05",
    label: "UC-05: Application Discovery and Dependency Analysis",
    description: "Complete, accurate picture of any application and its dependencies — what it connects to, what depends on it, and what would be affected by a change.",
    personas: [
      { name: "Angie", role: "Application Architect", engagement: "Primary" },
      { name: "Kathleen", role: "z/OS Application Developer (experienced)", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Identify", description: "Developer identifies the application" },
        { name: "Investigate", description: "Contact Db2 DBA, CICS specialist, MQ team separately" },
        { name: "Compile", description: "Piece together dependency picture from specialists" },
        { name: "Validate", description: "Cross-check findings manually — often incomplete" },
        { name: "Decide", description: "Scope change based on incomplete understanding" },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Lost Time — 1–3 days for manual analysis", description: "Multi-team analysis takes 1–3 days of coordination and manual compilation.", stageIndex: 1 },
        { persona: "Angie", type: "pain", title: "Business Impact — each specialist only knows their subsystem", description: "Lateral dependencies across subsystems are missed — no one sees the full picture.", stageIndex: 1 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — process not reproducible", description: "Different engineers get different answers — no consistent methodology.", stageIndex: 2 },
        { persona: "Angie", type: "pain", title: "Business Impact — blast radius routinely underestimated", description: "Changes scoped based on incomplete understanding — production incidents result.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — developers require sysprog involvement", description: "Every dependency query creates bottleneck — sysprog team overwhelmed.", stageIndex: 1 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Identify", description: "User names application or component" },
        { name: "Traverse", description: "Atlas traverses topology across all subsystems and LPARs" },
        { name: "Map", description: "Complete dependency map with connection types" },
        { name: "Assess Risk", description: "Proactive risk identification during traversal" },
        { name: "Decide", description: "Blast radius quantified in applications and data assets" },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Time Saving — 1–3 days → under 15 minutes", description: "Complete cross-subsystem analysis in under 15 minutes.", stageIndex: 1 },
        { persona: "Angie", type: "skill", title: "Atlas AI & Automation — cross-subsystem lateral connections visible", description: "Connections between subsystems visible for the first time — no more blind spots.", stageIndex: 1 },
        { persona: "Kathleen", type: "gain", title: "New User Capability — reproducible results", description: "Same query returns same result every time — consistent and reliable.", stageIndex: 2 },
        { persona: "Angie", type: "gain", title: "New User Capability — developers self-serve", description: "No z/OS specialist involvement needed for dependency queries.", stageIndex: 1 },
        { persona: "Greg", type: "gain", title: "New User Capability — infrastructure visibility enables architecture decisions", description: "Full stack visibility supports architecture and planning decisions.", stageIndex: 3 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "BOB PPZ Enrichment Touchpoint",
          summary: "Atlas traverses the dependency graph using ZUnderstand application discovery (packaged in Atlas). When Bob PPZ is also installed, the traversal is enriched with ZUnderstand's full code-level metadata — precise program-to-program call relationships, data flow paths, and business service attribution. For an estate with complex COBOL call chains, this means the dependency map includes execution-path-level detail, not just topology-level relationships.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas traverses the dependency graph using ZUnderstand static analysis and, when available, ZEN runtime data. ZEN is delivered through Concert4Z's observability platform — collecting OpenTelemetry trace spans from z/OS system software including CICS, IMS, Db2, and MQ. When Concert4Z is installed, Atlas can consume ZEN data to enrich the traversal with runtime-observed program flows, cross-component transaction flows, and active vs. dormant relationship identification.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "The dependency map Atlas produces includes connection types for each relationship. When ZEN data is available from Concert4Z, connection types are enriched with runtime evidence — 'statically configured AND runtime-observed' vs. 'statically configured only' — giving architects and developers a confidence indicator for each relationship in the map.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's business service topology (derived from ZEN transaction flows and service impact modeling) provides the business service attribution that enriches Atlas's risk surface. When Atlas identifies a deprecated API on a connected component, Concert4Z's service model can surface which business services depend on that component — elevating the risk classification for deprecated constructs that sit on high-criticality business service paths.",
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "When the dependency map is delivered for change planning, Concert4Z's incident history for the identified components provides operational risk context — whether the dependent systems have recent production incidents, which components have historically been unstable, and which paths have caused outages. This operational history enriches the architecture review artifact that Atlas produces.",
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has completed the change impact analysis and is ready to provision an isolated test environment. Atlas has derived the infrastructure specification for the test environment from its live model of the production LPAR — CPU, memory, storage mounts, and network adapters required to match production infrastructure fidelity." },
            { label: "Atlas directs", description: "Atlas passes the infrastructure specification to Terraform as an HCL configuration for the test workspace. Terraform provisions the LPAR or VM resources and confirms successful provisioning back to Atlas." },
            { label: "Terraform returns", description: "A Terraform-provisioned test environment with infrastructure matching the production declaration. Atlas deploys the application configuration and software stack on top of this infrastructure." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "When Atlas traces the downstream impact of an application change, Terraform's workspace boundaries provide a structural risk dimension. A change that crosses workspace boundaries is flagged by Atlas with elevated cross-boundary risk.",
          stageIndex: 1,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Automated application inventory" },
      { name: "System Topology", timeline: "GA", description: "Cross-subsystem dependency graph" },
      { name: "Natural Language Query", timeline: "GA", description: "Self-service dependency queries" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Blast radius quantification" },
    ],
  },
  "uc-06": {
    id: "uc-06",
    label: "UC-06: Change Readiness and Health Assessment",
    description: "Structured, repeatable health assessment joining configuration state, security posture, PTF currency, and performance constraints before any significant event.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Primary" },
      { name: "Sage", role: "Security Administrator (mid-level)", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Plan", description: "Coordinate manual checks across multiple teams" },
        { name: "Review PTFs", description: "Check SMP/E for missing PTFs and HIPERs" },
        { name: "Review Security", description: "Check RACF panels for configuration issues" },
        { name: "Review Config", description: "Check Db2 ZPARMs and CICS settings separately" },
        { name: "Compile", description: "Assemble findings into informal summary" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — 2–8 hours for manual review", description: "Multi-tool health review takes 2–8 hours of expert time.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — cross-subsystem compound risks never identified", description: "Each tool shows only its slice — no unified view of compound risks.", stageIndex: 3 },
        { persona: "Derek", type: "pain", title: "Business Impact — no structured artifact produced", description: "Findings live in email and memory — no governance artifact.", stageIndex: 4 },
        { persona: "Quinn", type: "pain", title: "Business Impact — same checks repeated with no historical comparison", description: "Every event requires starting from scratch — no baseline for comparison.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Skill Gap / Bottleneck — only Zach has cross-tool context", description: "Only the most experienced engineer can identify cross-tool implications.", stageIndex: 2 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "User defines scope — environment or specific LPAR" },
        { name: "Assess", description: "Atlas joins all configuration sources in analysis" },
        { name: "Rank", description: "Findings organized by severity with compound risk" },
        { name: "Generate", description: "Structured health artifact for governance sign-off" },
        { name: "Baseline", description: "Post-assessment state registered for drift monitoring" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Time Saving — 2–8 hours → under 30 minutes", description: "Complete multi-source assessment in under 30 minutes.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — compound risks identified", description: "Risks that no single tool can see are surfaced by Atlas's unified model.", stageIndex: 1 },
        { persona: "Derek", type: "gain", title: "New User Capability — structured artifact enables governance review", description: "Governance-ready health assessment generated automatically.", stageIndex: 3 },
        { persona: "Quinn", type: "gain", title: "New User Capability — health baseline enables trend comparison", description: "Compare health across events — track improvement or degradation over time.", stageIndex: 4 },
        { persona: "Quinn", type: "gain", title: "New User Capability — any team member can request health check", description: "Not just Zach — any authorized user can run a comprehensive health assessment.", stageIndex: 1 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z's Risk Management module has detected one of several operational risk categories that warrant a pre-event health assessment: a certificate approaching expiry, a cluster of missing critical maintenance updates, or a capacity threshold being approached ahead of a peak event. Concert4Z's Risk Management can initiate a change ticket or flag the risk for review." },
            { label: "Concert4Z hands to Atlas", description: "The operational risk flag triggers an Atlas health assessment workflow scoped to the affected component(s). Where Concert4Z's Risk Management identifies 'missing critical PTFs on LPAR PROD1,' Atlas scopes the full health check: PTF currency, configuration compliance, RACF posture, and compound risks across the middleware stack. Concert4Z's detection is specific; Atlas's assessment is comprehensive." },
            { label: "Atlas returns to Concert4Z", description: "Atlas returns a structured health assessment artifact — findings ranked by severity, compound risks identified, remediation paths generated. Concert4Z's Risk Management module sees the operational risk addressed when Atlas's remediation is complete." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas joins PTF currency, configuration compliance, security posture, and performance constraints across all scoped components. Concert4Z's production performance data (SMF/CDP via OMEGAMON Data Provider) provides the production behavioral baselines that enrich Atlas's performance constraint assessment: current utilization baselines, behavioral trend data, and ZEN service context that elevates health findings from technical severity to business impact.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas ranks findings by severity and identifies compound risks. Concert4Z's production anomaly history provides one additional dimension for ranking: findings that correlate with past production incidents are elevated in severity. A configuration deviation that has previously caused or contributed to a Concert4Z-detected production incident is higher priority than a deviation with no incident history — even if the technical severity is the same.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "After assessment and remediation, Atlas registers the current state as the health baseline for ongoing drift monitoring. Concert4Z's production monitoring provides the behavioral baseline complement — Atlas captures the configuration baseline; Concert4Z captures the behavioral baseline. Together, they form a complete pre-event reference point: any subsequent drift (configuration or behavioral) is detected against both baselines.",
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas is generating the system health and change readiness assessment. The assessment covers PTF currency, configuration gaps, RACF posture, and subsystem health. The infrastructure layer is a readiness dimension that Atlas cannot assess from its z/OS model alone." },
            { label: "Atlas directs", description: "Atlas surfaces the infrastructure readiness check as a gate: the target LPAR should be confirmed in its declared Terraform state before the change is authorized. The team runs terraform plan against the LPAR's workspace to confirm zero infrastructure drift." },
            { label: "Terraform returns", description: "Terraform plan output confirming zero infrastructure drift. A clean plan confirms infrastructure readiness. Any planned changes surface infrastructure drift that must be resolved before the change proceeds." },
          ],
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides structured infrastructure baseline data for each target LPAR — CPU and memory allocation, storage mounts, network adapter configuration, activation profile. Atlas incorporates this as the infrastructure baseline layer of its state collection.",
          stageIndex: 0,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Environment inventory baseline" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state capture" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules engine" },
      { name: "Health Assessment", timeline: "H2 2027", description: "Multi-pillar health scoring" },
      { name: "Performance Prediction", timeline: "H2 2027", description: "Performance constraint analysis" },
    ],
  },
  "uc-07": {
    id: "uc-07",
    label: "UC-07: Application Change Management",
    description: "Developer-native change lifecycle with instant impact analysis, automated test plan generation, background environment provisioning, and deployment orchestration.",
    personas: [
      { name: "Kathleen", role: "z/OS Application Developer (experienced)", engagement: "Primary" },
      { name: "Deb", role: "z/OS Application Developer (early tenure)", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Angie", role: "Application Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Assess Impact", description: "Before writing code, the developer needs to understand what their proposed change will affect — which programs, tables, transactions, and downstream applications." },
        { name: "Provision Environment", description: "Get access to a test environment that mirrors the production topology for the relevant application scope." },
        { name: "Code", description: "The developer writes or modifies code, working without real-time feedback on topological impact." },
        { name: "Generate Test Plan", description: "Define the test scenarios that will validate the change — which transactions, API paths, and downstream applications need to be exercised." },
        { name: "Validate", description: "Execute the test plan in the test environment and review results before promoting the change." },
        { name: "Deploy", description: "Promote the change from the test environment to CICS or IMS — including any infrastructure configuration changes." },
      ],
      markers: [
        { persona: "Kathleen", type: "time", title: "Lost Time — half a day to 2 days", description: "Impact analysis is informal — developers rely on tribal knowledge, ask Zach or experienced colleagues, or discover impact in integration testing when it is expensive to fix.", stageIndex: 0 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot independently assess impact without consulting Kathleen or Zach for every change", description: "As an early-tenure developer, Deb has no tribal knowledge to draw on — she is most exposed to unknowingly making changes that have hidden impact.", stageIndex: 0 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — impact assessments are routinely incomplete; undetected dependencies cause production incidents", description: "No tool joins application topology awareness with code-level impact analysis — the picture is assembled from CSD exports, Db2 catalog queries, and developer memory.", stageIndex: 0 },
        { persona: "Deb", type: "time", title: "Lost Time — hours to 2 days", description: "Test environments are provisioned manually by the infrastructure team. Wait times range from hours to days. Filing a ticket and waiting blocks development flow.", stageIndex: 1 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — testing in a shared, non-production-representative environment provides false confidence", description: "Sandboxes that mirror the production topology are rare — most developers test against shared environments that may not reflect production behavior.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Skill Gap / Bottleneck — Zach is the bottleneck for every developer needing a test environment", description: "Every test environment provisioning request requires Zach's review and involvement — adding to his workload while blocking developers.", stageIndex: 1 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot understand the performance implications of her code changes without escalating to the performance team", description: "Developers have no visibility into application performance metrics without going through the infrastructure team — no self-service performance baseline.", stageIndex: 2 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — regression detection at the point of production or integration is expensive relative to catching it during development", description: "Regression detection is ad hoc — if a change breaks something in a shared CICS transaction chain, it surfaces in integration testing or production.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Lost Time — 2–4 hours", description: "Test plan generation is manual — Kathleen writes test scenarios based on her knowledge of what the change touches, with no automated scope generation.", stageIndex: 3 },
        { persona: "Deb", type: "pain", title: "Business Impact — changes proceed with test coverage that depends on Deb's current knowledge level, not on a systematic scope", description: "Test coverage is inconsistent and dependent on individual developer discipline — there is no automated scaffolding for what needs to be tested.", stageIndex: 3 },
        { persona: "Deb", type: "time", title: "Lost Time — half a day to 2 days", description: "There is little or no test automation on z/OS — test coverage is manual, inconsistent, and depends on individual developer discipline.", stageIndex: 4 },
        { persona: "Deb", type: "pain", title: "Business Impact — late regression detection is the most expensive quality failure mode for z/OS application development", description: "Regressions are caught in integration testing or production — the developer finds out she broke something through a test failure she did not control or a production incident.", stageIndex: 4 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours of multi-tool, multi-team handoff", description: "Deploying an application change to CICS or IMS after validation requires multiple manual steps across multiple tools and teams — IBM Z Open Editor, DBB, a separate deployment tool, and a sysprog for configuration changes.", stageIndex: 4 },
        { persona: "Kathleen", type: "skill", title: "Skill Gap / Bottleneck — Zach must be involved in any deployment that touches CICS definitions or IMS setup", description: "Deploying to CICS or IMS requires multiple manual steps across multiple tools and teams — developer cannot deploy independently if any configuration changes are involved.", stageIndex: 5 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot initiate deployment independently; the handoff requires Kathleen's escalation to Zach", description: "Deb has no visibility into what configuration changes her code triggers — the handoff to sysprog is opaque from her perspective.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess Impact", description: "Developer asks Atlas what their proposed change will touch — which programs, tables, transactions, and downstream applications — before writing a line of code." },
        { name: "Provision Environment", description: "Atlas provisions an isolated test environment in the background while the developer writes code. Environment is ready when needed." },
        { name: "Code", description: "Developer writes code with Atlas available to answer topology and performance questions in real time." },
        { name: "Generate Test Plan", description: "Atlas generates a test plan automatically from the impact analysis — scoped to the actual change, with environment specifications and test data requirements." },
        { name: "Validate", description: "Tests run in an isolated environment. Regressions caught before the change leaves the developer's hands. Developer iterates without filing tickets." },
        { name: "Deploy", description: "Developer initiates deployment; Atlas orchestrates the configuration steps for CICS or IMS." },
      ],
      markers: [
        { persona: "Kathleen", type: "time", title: "Time Saving — half a day to 2 days → seconds", description: "Ask Atlas what the proposed change will touch — full answer across CICS, Db2, MQ, and z/OS Connect in seconds, before any code is written.", stageIndex: 0 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently understands change impact without requiring Kathleen or Zach", description: "Atlas provides the system context Deb does not yet carry — she understands the scope of her change before making it, not after breaking something.", stageIndex: 0 },
        { persona: "Angie", type: "skill", title: "Atlas AI & Automation — impact analysis references both topology and architectural specification", description: "Architects can define the application specification and intended design that Atlas references for impact analysis — changes are validated against architectural intent.", stageIndex: 0 },
        { persona: "Deb", type: "time", title: "Time Saving — hours to 2 days → background provisioning", description: "Test environment provisioned in the background while Deb writes code — no ticket, no wait time, isolated environment ready when she needs it.", stageIndex: 1 },
        { persona: "Kathleen", type: "gain", title: "New User Capability — Kathleen independently gets a production-representative isolated environment without filing a ticket", description: "Isolated environment that mirrors production topology — no testing in a shared environment with other teams' changes.", stageIndex: 1 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb codes with full system context available on demand, independently", description: "Real-time topology context available while coding — any question about what a code path touches is answerable without interrupting a colleague.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — Kathleen's oversight effort on routine delegated changes reduces significantly", description: "Kathleen can delegate routine changes to Deb with confidence — Atlas provides the guardrails Kathleen would otherwise provide herself.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — 2–4 hours manual test plan → automatic", description: "Test plan generated automatically from the impact analysis — test scenarios scoped to the transactions and API paths the change actually touches.", stageIndex: 3 },
        { persona: "Deb", type: "skill", title: "Atlas AI & Automation — test plan scope derived from topology traversal, not from developer knowledge", description: "Consistent, topology-derived test coverage — Deb's test plan is as thorough as Kathleen's, because it comes from the same model, not from developer experience level.", stageIndex: 3 },
        { persona: "Deb", type: "time", title: "Time Saving — late regression discovery cost reduced by the shift from integration/production to developer loop", description: "Developer-controlled regression testing — regressions caught in Deb's own isolated environment before the change reaches integration testing or production.", stageIndex: 4 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently runs a full test-validate-iterate cycle without any infrastructure team involvement", description: "Iterate on code, watch the test plan update, re-run tests — a fast loop without filing tickets or waiting for infrastructure.", stageIndex: 4 },
        { persona: "Kathleen", type: "skill", title: "Atlas AI & Automation — failure attribution identifies which dependency or change caused the failure", description: "Test results with failure attribution — Kathleen reviews a structured pass/fail report, not raw test output to interpret.", stageIndex: 4 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours of multi-tool, multi-team handoff → Atlas-orchestrated workflow", description: "Atlas-orchestrated deployment to CICS or IMS — developer initiates, Atlas handles the configuration steps, Zach authorizes changes that require it.", stageIndex: 5 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb has visibility into her own deployment without requiring a Zach intermediary", description: "Deployment is visible from Deb's perspective — she can track status without depending on a sysprog to relay progress.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "BOB PPZ Enrichment Touchpoint",
          summary: "Atlas assesses the impact of the proposed change. When Bob PPZ is installed, the impact analysis is enriched with ZUnderstand's code-level metadata — precise program-to-program call relationships, data flow paths, and business service attribution. For an estate with complex COBOL call chains, this means the impact analysis includes execution-path-level detail, not just topology-level relationships. The developer sees not just which transactions are affected, but which specific programs, copybooks, and data flows are involved.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas's blast radius assessment uses ZEN runtime relationship data — which programs actually called which others during recent production execution — to distinguish active call paths from dormant static relationships. ZEN is delivered through Concert4Z's observability infrastructure (IBM Z Observability Connect). When Concert4Z is deployed, Atlas's blast radius for an application change is enriched with runtime-observed execution evidence, making the impact assessment more precise and reducing false-positive blast radius entries that inflate change scope unnecessarily.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "BOB PPZ Handoff",
          steps: [
            { label: "Atlas produced", description: "A test failure attributed to an application code issue. Atlas has identified the specific program and the nature of the incompatibility." },
            { label: "Atlas directs the user to Bob PPZ", description: "Atlas presents the failure context — the specific program, the call path, the behavioral change introduced — and directs the user to Bob PPZ for the code-level fix. Bob PPZ uses ZUnderstand to trace the execution path, understand the affected business logic, and generate the precise modification required." },
            { label: "Bob PPZ returns to Atlas", description: "A fix artifact. Atlas re-runs the test against the corrected code, confirms pass, and the developer continues the validate-iterate loop." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas provisions an isolated test environment and runs the test package. The validation criteria — what 'normal' behavior looks like for the affected transactions — are informed by Concert4Z's production behavioral baselines. Where Concert4Z has established SMF-derived performance baselines for the affected CICS transactions, Atlas's post-change test evaluation can compare test results against production norms rather than against theoretical expectations. This produces a more defensible validation outcome.",
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas's complete change evidence package — what was changed, what was tested, what the results were — is the primary artifact Concert4Z uses if a production anomaly appears after deployment. When Concert4Z detects an anomaly on a system that recently received a change, the Atlas change record (including blast radius, test results, and authorization chain) provides immediate context for the Concert4Z incident investigation.",
          stageIndex: 5,
        },
      ],
    },
    capabilities: [
      { name: "System Topology", timeline: "GA", description: "Real-time blast radius analysis" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Impact scoring before coding" },
      { name: "Workflow Engine", timeline: "GA", description: "Change orchestration and tracking" },
      { name: "Test Plan Generation", timeline: "GA", description: "AI-generated test plans" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "On-demand isolated environments" },
      { name: "Developer Experience Integration", timeline: "H1 2027", description: "IDE and toolchain integration" },
    ],
  },
  "uc-08": {
    id: "uc-08",
    label: "UC-08: Platform Upgrade and Migration",
    description: "Major z/OS and middleware upgrade planning with full compatibility assessment, sequencing analysis, and phased execution with isolation testing.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Primary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
      { name: "Alice", role: "z/OS Systems Programmer (mid-level)", engagement: "Secondary" },
      { name: "Angie", role: "Application Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Scope", description: "Identify what needs to be assessed for the upgrade — all LPARs, subsystems, applications, and compatibility notes for the target version." },
        { name: "Assess", description: "Evaluate compatibility of every application, subsystem, and configuration item against the target version — identify breaking changes." },
        { name: "Plan", description: "Generate a sequenced, risk-ordered upgrade plan that accounts for subsystem interdependencies across all LPARs." },
        { name: "Provision", description: "Provision isolated environments for each phase of the upgrade — allowing each phase to be validated in isolation before production is touched." },
        { name: "Execute Each Phase", description: "Apply the upgrade for each phase in the plan, monitoring for compatibility failures and sequencing problems." },
        { name: "Validate Each Phase", description: "Confirm each phase completed successfully and that no unintended behavior changes occurred before promoting to the next phase." },
        { name: "Close", description: "Complete the upgrade across all phases, document the upgrade, and record the new baseline state." },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 weeks", description: "Assembling a complete compatibility picture manually takes weeks — IBM upgrade guides, IBM support databases, subsystem-specific notes, and application owner consultations must be coordinated manually.", stageIndex: 0 },
        { persona: "Greg", type: "time", title: "Lost Time — 1–2 weeks", description: "No unified infrastructure dependency picture for sysplex and LPAR sequencing requirements — Greg must reconstruct it before upgrade planning can begin.", stageIndex: 0 },
        { persona: "Angie", type: "skill", title: "Skill Gap / Bottleneck — Angie must coordinate with every application owner to understand application-level compatibility risk", description: "Application-level compatibility analysis requires querying every application team — no cross-application view of which code depends on behaviors that are changing.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — late discovery of compatibility issues is a leading cause of upgrade failures and emergency rollbacks", description: "Compatibility issues are typically discovered during testing — sometimes during production cutover — because the manual analysis missed a dependency.", stageIndex: 1 },
        { persona: "Greg", type: "pain", title: "Business Impact — incorrect subsystem upgrade order can cause failures worse than not upgrading", description: "Sequencing mistakes (wrong upgrade order for interdependent subsystems) are a leading cause of upgrade failures. Manual sequencing from experience, not from analysis.", stageIndex: 1 },
        { persona: "Angie", type: "pain", title: "Business Impact — application owners cannot pre-remediate issues they do not know exist", description: "Application owners may not know their applications have dependencies on behaviors that are changing — the compatibility gap is unknown until testing or production.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — months of planning effort", description: "A z/OS version upgrade involves a dedicated planning project measured in months — the planning overhead alone is a major barrier to currency.", stageIndex: 2 },
        { persona: "Greg", type: "time", title: "Lost Time — weeks", description: "Phased plan construction requires manually resolving interdependencies across subsystems, LPARs, and sysplex topology — no automated sequencing tool.", stageIndex: 2 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — upgrade planning is restricted to the handful of engineers who carry the full topology model in their heads", description: "Mid-level engineers cannot contribute to upgrade planning because the dependency knowledge required is not documented anywhere accessible.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — days per phase", description: "Phase isolation is rarely achieved — environments are provisioned manually, provisioning takes too long, and teams shortcut phase boundaries to stay on schedule.", stageIndex: 3 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — Alice blocked on Zach for every provisioning step", description: "Environment provisioning is entirely Zach-dependent — Alice cannot independently set up a phase test environment.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — days per phase", description: "Each phase executed manually with no integrated tooling — SMP/E for PTFs, separate tools for subsystem configuration, separate communication for application teams.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — upgrade phase failures during production execution can require emergency rollback", description: "Phase failures are discovered during execution — there is no pre-phase validation to surface problems before production is touched.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — silent behavioral regressions post-upgrade go undetected until they cause incidents", description: "Post-upgrade behavior change monitoring is informal — a subsystem running differently after upgrade may not be noticed until a user complaint or production incident.", stageIndex: 5 },
        { persona: "Angie", type: "pain", title: "Business Impact — application regressions from platform upgrades are a consistent source of post-upgrade incidents", description: "Application teams have no systematic way to verify their applications function correctly after a platform upgrade — testing is ad hoc and coverage is incomplete.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Lost Time — days", description: "Upgrade documentation is assembled after the fact from change tickets, email, and memory — audit trail is incomplete.", stageIndex: 6 },
        { persona: "Greg", type: "pain", title: "Business Impact — without a registered post-upgrade baseline, infrastructure drift is undetectable", description: "New infrastructure baseline is not formally registered anywhere — drift from the new target state will accumulate silently until the next planned review.", stageIndex: 6 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas scopes the full compatibility impact of a platform upgrade in minutes — across all LPARs, all subsystems, all applications, and all known compatibility notes for the target version." },
        { name: "Assess", description: "Atlas evaluates compatibility of all components against the target version — identifying breaking changes and sequencing requirements." },
        { name: "Plan", description: "Atlas generates a sequenced, risk-ordered upgrade plan — phase boundaries, subsystem sequencing, DR implications, test environment specs for each phase." },
        { name: "Provision", description: "Atlas provisions isolated environments for each phase — phase isolation is maintained without manual provisioning effort." },
        { name: "Execute Each Phase", description: "Atlas orchestrates each upgrade phase — sequenced application, real-time progress visibility, Zach authorizes each production step." },
        { name: "Validate Each Phase", description: "Atlas runs regression tests for each phase; behavioral monitoring surfaces post-phase behavior changes before the next phase begins." },
        { name: "Close", description: "Complete all phases; Atlas generates the upgrade record and registers the new baseline state." },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Time Saving — 2–4 weeks → minutes", description: "Full compatibility impact scoped in minutes — all LPARs, all subsystems, all applications, all compatibility notes for the target version. 300-application sweep without a single manual query.", stageIndex: 0 },
        { persona: "Greg", type: "time", title: "Time Saving — 1–2 weeks → minutes", description: "Infrastructure dependency picture for sysplex and LPAR sequencing requirements produced automatically from Atlas's topology model.", stageIndex: 0 },
        { persona: "Angie", type: "gain", title: "New User Capability — Angie independently identifies application-level compatibility risk without coordinating with every application owner", description: "Application-level compatibility findings surfaced directly — application teams notified of what they need to remediate before the upgrade begins.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — Atlas joins IBM compatibility notes with the live topology to produce a specific, grounded compatibility gap list", description: "Compatibility issues surfaced before the project starts, not during production cutover. The list of what needs remediation before the upgrade begins is complete from day one.", stageIndex: 1 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — dependency-aware sequencing analysis produces the correct upgrade order, not an experience-based guess", description: "Sequencing risk identification — Atlas identifies which subsystems must be upgraded in a specific order to avoid compatibility failures, based on their dependency relationships.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — months → days", description: "Months of planning effort compressed into a structured Atlas-generated plan — phase boundaries, sequencing, environment specs, and test scenarios all generated from the topology.", stageIndex: 2 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently executes delegated upgrade phases from Atlas's structured plan", description: "Mid-level engineers can execute phases assigned in the Atlas plan — the dependency knowledge is embedded in the plan, not required from the executor.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — days per phase provisioning → automated", description: "Phase isolation maintained automatically — each phase validated in an isolated environment without manual provisioning.", stageIndex: 3 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently provisions phase environments", description: "Alice can independently prepare phase environments from Atlas's specification without requiring Zach for each provisioning step.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — days per phase manual coordination → Atlas-orchestrated execution", description: "Phase execution is Atlas-orchestrated across all tools — no manual coordination across SMP/E, subsystem configuration, and application deployment.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — reasoning visible at every step; no black-box execution", description: "Zach authorizes each production step — governance gate maintained with full visibility into what Atlas will execute before authorization.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — behavioral baseline comparison identifies post-upgrade regressions that would otherwise be invisible until production incidents", description: "Behavioral monitoring post-phase — Atlas identifies if a subsystem is running differently after the upgrade and surfaces the deviation before the next phase begins.", stageIndex: 5 },
        { persona: "Angie", type: "time", title: "Time Saving — ad hoc manual testing → systematic Atlas-generated test execution", description: "Application regression testing scoped to the phase's changes — Atlas runs the relevant test scenarios and surfaces failures before production.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Time Saving — days retrospective documentation → automatic", description: "Complete upgrade record generated automatically — every phase, every authorization, every test result captured without retrospective assembly.", stageIndex: 6 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — baseline registration happens as part of upgrade close; no separate action required", description: "New infrastructure baseline registered in Atlas at close — post-upgrade drift is immediately detectable against the new reference state.", stageIndex: 6 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has generated the full compatibility impact assessment. Within this assessment, Atlas identifies infrastructure resource requirements for the new release: memory increases, storage allocation changes, CPU entitlement adjustments." },
            { label: "Atlas directs", description: "Atlas passes the infrastructure resource requirement delta to Terraform as proposed HCL changes to the LPAR workspace. Terraform generates a plan output showing exactly what infrastructure changes are needed." },
            { label: "Terraform returns", description: "A Terraform plan confirming the infrastructure changes required for the upgrade. Atlas incorporates this as the infrastructure change scope in the upgrade plan." },
          ],
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas is provisioning an isolated test environment at the current version for each phase. Atlas passes the phase-specific infrastructure specification to Terraform for provisioning." },
            { label: "Atlas directs", description: "Atlas provides the infrastructure specification for the phase test environment. Terraform provisions the LPAR resources in an isolated workspace." },
            { label: "Terraform returns", description: "A Terraform-provisioned phase test environment. Atlas applies the upgrade to the test environment and runs the regression test suite." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "A phase has passed regression testing and Atlas is authorising promotion to the next environment. Infrastructure resource changes must be applied before the phase promotion proceeds." },
            { label: "Atlas directs", description: "Atlas directs the team to apply the Terraform infrastructure changes for the target LPAR before Atlas proceeds with the software upgrade for that phase." },
            { label: "Terraform returns", description: "Terraform apply confirmation for the target LPAR. Atlas proceeds with the phase promotion." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's workspace structure provides a ready-made staging sequence that Atlas can align its upgrade sequencing with. Upgrades that follow the Terraform workspace promotion order are naturally sequenced in a way that Terraform can enforce at the infrastructure layer.",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Full environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Subsystem dependency mapping" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Compatibility and sequencing analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Phased upgrade orchestration" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
    ],
  },
  "uc-09": {
    id: "uc-09",
    label: "UC-09: Environment Parity and Drift Control",
    description: "Continuous, automated drift monitoring across all environment tiers — detecting what changed, correlating to change records, and guiding operators from detection to resolution.",
    personas: [
      { name: "Annette", role: "IT Operations Engineer (L2 Operator)", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Alex", role: "Performance / Application Engineer", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Identify that a configuration difference exists between environments — production vs. QA, production vs. DR, or any environment vs. its defined baseline." },
        { name: "Attribute", description: "For each detected drift item, determine when it changed, what it changed from, whether there is a change record, and who is responsible." },
        { name: "Surface", description: "Present drift findings in a way that allows the operator to triage, classify severity, and decide on remediation or acceptance." },
        { name: "Investigate", description: "For flagged drift items, conduct the human investigation — was this an authorized change? An emergency change with a missing record? An unauthorized modification?" },
        { name: "Remediate", description: "For drift that must be corrected — realign the environment to its intended baseline or to the production configuration." },
        { name: "Audit", description: "Produce evidence that unauthorized changes were detected, investigated, and resolved or accepted — for compliance and governance purposes." },
      ],
      markers: [
        { persona: "Annette", type: "time", title: "Lost Time — 1–3 days", description: "Environment comparison is manual: engineers export configuration parameters from ISPF or SMP/E and compare in spreadsheets or scripts. This is done infrequently and is error-prone.", stageIndex: 0 },
        { persona: "Annette", type: "pain", title: "Business Impact — unauthorized changes are invisible until they cause a symptom or an auditor flags them", description: "Unauthorized change detection relies entirely on change management process compliance — if someone makes a change without a change record, the only detection mechanism is a human noticing a behavioral difference.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — post-change drift (environment failed to fully apply the change) goes undetected", description: "Post-change validation is informal — after a planned change there is no systematic check that the environment reached the intended state.", stageIndex: 0 },
        { persona: "Annette", type: "time", title: "Lost Time — hours to days", description: "When an unauthorized configuration change is detected, Annette has no immediate evidence: just a behavioral symptom and no starting point for investigation.", stageIndex: 1 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without escalating to Zach for expert log interpretation", description: "Investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate and require expert interpretation.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — half a day to 2 days", description: "'QA doesn't look like prod' situations are resolved by guesswork and manual parameter comparison — often by Zach, who has better things to do.", stageIndex: 1 },
        { persona: "Greg", type: "pain", title: "Business Impact — architecture parity governance decisions are made without data", description: "No drift trend reporting — Greg cannot tell whether environment parity is improving or degrading over time because there is no continuous measurement.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Lost Time — half a day", description: "When investigating whether a QA environment is production-equivalent for performance testing, there is no structured parity report to reference — Alex must assemble the comparison manually.", stageIndex: 2 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot triage drift findings without Zach's interpretation for each one", description: "Raw parameter diffs without risk classification — Annette must interpret whether a Db2 ZPARM change is a compliance risk, a stability risk, or cosmetic drift, without context.", stageIndex: 2 },
        { persona: "Annette", type: "time", title: "Lost Time — hours per investigation", description: "No consolidated starting point for investigation — Annette receives a symptom, not a structured finding with evidence attached.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours of Zach's time", description: "Escalation from Annette always requires Zach to do the same log-reading investigation she cannot — no self-service investigation path for mid-level operators.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours to days", description: "Environment realignment is fully manual — each parameter difference must be corrected individually using the appropriate subsystem tool.", stageIndex: 4 },
        { persona: "Greg", type: "pain", title: "Business Impact — incomplete remediations leave residual drift that is not detected until the next manual check", description: "No validation that the realignment reached the intended state — the comparison must be repeated manually after remediation to confirm.", stageIndex: 4 },
        { persona: "Annette", type: "time", title: "Lost Time — hours", description: "Audit trail for drift investigation and resolution must be assembled manually from notes and tool outputs — no continuous record.", stageIndex: 5 },
        { persona: "Derek", type: "pain", title: "Business Impact — audit findings for undocumented drift are a recurring cost even when the changes were authorized", description: "Change record completeness is consistently the most labor-intensive section of audit prep — undocumented changes produce audit findings whether they were benign or not.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas monitors environments continuously and alerts Annette when any production or non-production environment drifts materially from its baseline or from a peer environment — before a human notices a behavioral symptom." },
        { name: "Attribute", description: "When Atlas surfaces drift, it provides the configuration delta, the timestamp, the previous value, and whether there is a change record — immediately." },
        { name: "Surface", description: "Atlas presents findings classified by risk level (compliance risk, stability risk, cosmetic drift) with recommended actions and explicit escalation triggers." },
        { name: "Investigate", description: "Atlas provides a structured starting point for the human investigation — configuration delta, timestamp, affected components. The human decides: authorized? Emergency change? Unauthorized?" },
        { name: "Remediate", description: "Atlas generates an environment realignment plan — targeting only the items that require correction. Change Intelligence executes the realignment." },
        { name: "Audit", description: "Atlas generates a complete, continuous drift audit trail — every detection, investigation outcome, and remediation action captured automatically." },
      ],
      markers: [
        { persona: "Annette", type: "skill", title: "Atlas AI & Automation — continuous baseline diff runs automatically; no manual comparison needed", description: "Drift alert received before a behavioral symptom appears — Atlas detects the configuration change, not the downstream consequence.", stageIndex: 0 },
        { persona: "Annette", type: "skill", title: "Atlas AI & Automation — undocumented change detection is only possible through Atlas's combined Config-as-Code model and change record history", description: "Unauthorized change detection: Atlas compares current Config-as-Code state against the last registered baseline and identifies every configuration change with no corresponding record.", stageIndex: 0 },
        { persona: "Annette", type: "time", title: "Time Saving — hours to days reconstructing evidence → evidence provided immediately in the Atlas alert", description: "Undocumented change investigation starts with evidence, not guesswork — Atlas provides the configuration delta, timestamp, affected component, and user ID attribution immediately.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently investigates and makes accept/escalate decisions on drift findings without requiring Zach", description: "Annette can triage, decide, and act on drift findings without escalating to Zach for the basic facts.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently triages drift findings from Atlas's risk classification", description: "Findings classified by risk — Annette knows whether a Db2 ZPARM change is a compliance risk, a stability risk, or cosmetic drift without Zach's interpretation.", stageIndex: 2 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — trend analysis from continuous monitoring data surfaces architectural governance insights", description: "Drift trend reports over time — Greg can measure whether environment parity is improving as a result of governance changes, with real data.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Time Saving — half day manual comparison → seconds", description: "QA parity report on demand — 'is this environment production-equivalent for performance testing?' answered by Atlas in a single query, with specific differences listed.", stageIndex: 2 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette conducts drift investigations independently, escalating to Zach only when the finding requires z/OS-level expertise", description: "Every investigation starts with Atlas's structured evidence — Annette has a specific, verifiable starting point rather than a blank-page investigation.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — Zach's time on escalated investigations reduced because Atlas has already done the evidence assembly", description: "When Annette does escalate, the investigation is already structured — Zach reviews evidence, not repeating Annette's discovery work.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — hours to days → Atlas-generated targeted realignment plan", description: "Environment realignment plan generated by Atlas — targeted to only the parameters that differ and need correction. No manual parameter-by-parameter correction.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — post-remediation comparison runs automatically; no manual re-verification needed", description: "Post-remediation validation is automatic — Atlas confirms the environment reached the intended state and the drift is closed.", stageIndex: 4 },
        { persona: "Annette", type: "time", title: "Time Saving — hours assembling evidence → automatic continuous trail", description: "Incident audit trail generated automatically for every drift detection and resolution — Annette can close incidents with a complete, continuous record rather than assembling it manually.", stageIndex: 5 },
        { persona: "Derek", type: "gain", title: "Business Impact — audit findings for undocumented drift reduce materially as Atlas coverage grows", description: "Change record completeness improves for the Atlas estate — every Atlas-detected and Atlas-resolved drift item has a documented trail. Audit findings for undocumented changes reduce.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas detects configuration drift by comparing current Config-as-Code state against a registered baseline. Concert4Z's Observe module detects behavioral drift — a subsystem running differently than its historical norm — which may precede or accompany configuration drift. These two detection signals are complementary: configuration drift without behavioral change is likely benign; behavioral drift without detected configuration change may indicate a change that bypassed the Config-as-Code model — higher severity, warrants deeper investigation. When Concert4Z surfaces a behavioral anomaly on a system, it provides Atlas with a targeted investigation prompt.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas presents drift findings classified by risk level. Concert4Z's incident history for the affected components enriches this risk classification — a configuration drift on a system that Concert4Z has previously flagged for operational incidents is elevated in risk compared to the same drift on a stable system with no incident history. Concert4Z's production risk profile adds an operational dimension to Atlas's technical risk ranking.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "When Terraform detects infrastructure drift during a scheduled terraform plan run, this triggers Atlas to investigate whether the infrastructure drift correlates with broader configuration or software-layer drift. Terraform's detection feeds Atlas's proactive monitoring rather than waiting for a user-initiated comparison.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has collected the current state of both environments and is generating the comparison. For the infrastructure layer, Atlas requests the Terraform plan output." },
            { label: "Atlas directs", description: "Atlas requests the Terraform plan output comparing the current state of each environment's workspace against its declared HCL configuration. This plan becomes the infrastructure-layer diff in the Atlas environment comparison." },
            { label: "Terraform returns", description: "Infrastructure-layer diff from Terraform's plan output. Atlas incorporates this into the complete full-stack comparison." },
          ],
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified infrastructure-layer drift items requiring remediation. For these items, Terraform must enforce the correction." },
            { label: "Atlas directs", description: "Atlas directs the team to apply the Terraform plan that restores the environment to its declared state. The terraform apply is the remediation action." },
            { label: "Terraform returns", description: "Terraform apply completion confirmation. Atlas marks those items as resolved and proceeds with remaining remediations." },
          ],
          stageIndex: 3,
        },
      ],
    },
    capabilities: [
      { name: "Config-as-Code", timeline: "GA", description: "Configuration baseline and comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Drift rules and thresholds" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Automated drift monitoring and alerting" },
      { name: "Health Assessment", timeline: "H2 2027", description: "Post-drift impact assessment" },
    ],
  },
  "uc-10": {
    id: "uc-10",
    label: "UC-10: Disaster Recovery Validation",
    description: "Continuous DR readiness assessment — comparing DR to production, quantifying drift, and running isolated failover simulation before any real test or incident.",
    personas: [
      { name: "Greg", role: "Infrastructure Architect", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Assess", description: "Evaluate the current state of DR environments against production — identify all configuration, PTF, RACF, and MQ differences that exist before the DR test." },
        { name: "Monitor", description: "Track whether the DR environment is drifting from production between formal test events." },
        { name: "Remediate", description: "Apply corrective changes to bring the DR environment to production equivalence — PTF applies, RACF syncs, MQ channel updates, configuration realignment." },
        { name: "Simulate", description: "Validate that the DR environment would successfully handle a failover — including under production-level transaction load." },
        { name: "Record", description: "Document the DR test outcome and readiness evidence for compliance and governance purposes." },
      ],
      markers: [
        { persona: "Greg", type: "time", title: "Lost Time — 2–4 weeks", description: "DR readiness is assessed manually and infrequently — typically in the weeks before a scheduled DR test. The assessment relies on comparing configuration snapshots, spreadsheets, and team memory.", stageIndex: 0 },
        { persona: "Greg", type: "pain", title: "Business Impact — DR assessment completeness is systematically limited by human memory and manual tooling", description: "The comparison is always incomplete — changes applied to production over months are partially tracked, partially remembered, and partially missed.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — emergency remediation effort", description: "When the DR test reveals gaps, the remediation must be executed under the time pressure of a test deadline — not proactively while there was time.", stageIndex: 0 },
        { persona: "Greg", type: "pain", title: "Business Impact — by the next DR test, months of drift have accumulated with no visibility until test day", description: "No continuous monitoring between DR tests — DR environments drift invisibly as production changes accumulate without being applied to DR.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — systematic production→DR drift is a natural consequence of the process, not an exception", description: "Changes applied to production (PTF applies, RACF updates, MQ channel changes) are not systematically tracked for DR propagation — each change requires a separate manual decision to replicate to DR.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — incomplete remediation means the DR test will surface gaps that 'should have been fixed'", description: "Remediation is executed against an incomplete diff — the list of what needs to change is manually assembled and always incomplete, so remediations leave residual gaps.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — days to weeks", description: "Remediating DR environments requires the same expert time as production changes — but DR changes are lower-priority and often deferred, compounding the drift.", stageIndex: 2 },
        { persona: "Greg", type: "pain", title: "Business Impact — DR test failures are expensive to recover from, and the cause is retrospectively obvious but prospectively invisible", description: "DR tests fail for reasons that were knowable in advance. Post-mortem analysis consistently identifies changes that were applied to production but not to DR — changes that were in the change log the whole time.", stageIndex: 3 },
        { persona: "Greg", type: "pain", title: "Business Impact — first real validation of DR readiness is the actual DR test, with no simulation run first", description: "No simulated failover capability — the DR test is the first time the environment is actually exercised under production-level conditions.", stageIndex: 3 },
        { persona: "Quinn", type: "skill", title: "Skill Gap / Bottleneck — Quinn must approve or defer the DR test without an objective readiness verdict", description: "Go/no-go for the DR test is made without a simulation result — the decision is based on the team's assessment of completeness, not on a verified test outcome.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Lost Time — days", description: "DR test documentation is assembled manually from test reports, remediation records, and team notes — a time-consuming audit evidence exercise.", stageIndex: 4 },
        { persona: "Derek", type: "pain", title: "Business Impact — compliance evidence quality is limited by the manual assembly process", description: "Regulatory frameworks (DORA, SOX DR testing) require evidence of systematic DR readiness — the current evidence is point-in-time and manually assembled.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Atlas produces a complete DR readiness assessment — diffing production against DR across configuration, PTF levels, RACF definitions, and subsystem settings — on demand." },
        { name: "Monitor", description: "Atlas monitors DR environments continuously — alerting Greg as high-severity drift appears, not weeks before the test." },
        { name: "Remediate", description: "Atlas generates a targeted DR realignment plan — precisely scoped to the differences found in the assessment. Change Intelligence executes the plan." },
        { name: "Simulate", description: "Atlas provisions an isolated DR environment at production scale, runs production-level transaction load, and certifies the environment before the actual test date." },
        { name: "Record", description: "Atlas generates complete DR readiness and test documentation — continuous monitoring history, remediation record, simulation results — as audit-ready evidence." },
      ],
      markers: [
        { persona: "Greg", type: "time", title: "Time Saving — 2–4 weeks manual assessment → hours", description: "Complete DR vs. production diff produced on demand — every configuration, PTF, RACF, and subsystem difference enumerated with severity classification.", stageIndex: 0 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — DR failure point prediction identifies specific items that would cause failover failure based on the observed diff", description: "High-severity gaps (missing RACF groups, insufficient buffer pools, missing critical PTFs) surfaced immediately and classified — Greg knows exactly what would cause a DR failure without running a test first.", stageIndex: 0 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — continuous DR monitoring closes the gap between test cycles with real-time drift alerting", description: "High-severity DR drift surfaced as it appears — each significant production change triggers an immediate DR equivalence check, not a manual quarterly review.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — production change → DR equivalence check runs automatically", description: "When Zach applies a change to production, Atlas automatically checks whether the same change needs to be applied to DR and surfaces the gap — no separate manual tracking required.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — days to weeks of manual remediation planning → Atlas-generated targeted plan", description: "DR remediation plan generated from the complete diff — every gap addressed, nothing left to memory or guesswork.", stageIndex: 2 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — post-remediation equivalence check runs automatically; no manual re-assessment needed", description: "Post-remediation validation runs automatically — Atlas confirms the DR environment reached production equivalence before the test cycle begins.", stageIndex: 2 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — isolation-based DR simulation at production load is only possible through Atlas's environment provisioning and test execution capabilities", description: "Simulated failover validation produces a certified pass result before the actual DR test — organizations enter the test with documented evidence it will work.", stageIndex: 3 },
        { persona: "Quinn", type: "gain", title: "New User Capability — Quinn makes the DR test authorization decision from a verified simulation result, independently", description: "Go/no-go decision for the DR test is made from Atlas's simulation pass/fail verdict — an objective, reproducible readiness signal rather than a team assessment.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Time Saving — days manual documentation → automatic evidence generation", description: "Complete DR readiness history generated from Atlas — continuous monitoring data, remediation records, simulation results, and test outcomes as structured evidence.", stageIndex: 4 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek independently produces DR compliance evidence from Atlas without requiring Greg or Zach to assemble it", description: "Regulatory compliance evidence (DORA, SOX DR requirements) produced directly from Atlas's DR monitoring and simulation records — no manual assembly from test reports and team notes.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas produces a complete DR vs. production diff — every configuration, PTF, RACF, and subsystem difference enumerated with severity classification. Concert4Z's business service topology (derived from ZEN runtime transaction flows and service impact modeling) enriches the severity classification with business service context: a missing RACF group on a DR LPAR that serves a high-criticality payment service is a higher-severity finding than the same gap on a system serving a low-traffic internal batch process. Concert4Z's service impact model translates Atlas's technical diff items into business-service-level risk rankings, helping Greg prioritize DR remediations by business impact rather than purely technical severity.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas provisions an isolated DR environment and runs production-level transaction load to certify DR readiness. Concert4Z's production transaction volume data (SMF-derived via OMEGAMON Data Provider) provides the production load profile that Atlas uses for the simulation — ensuring the simulated load matches what production actually experiences, not a theoretical peak estimate.",
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas generates complete DR readiness documentation for regulatory compliance purposes. Concert4Z's post-DR-test operational monitoring provides the production-behavior complement — after a DR test, Concert4Z can confirm that the DR environment's behavioral profile during the test matched production norms, providing an additional evidence dimension for DORA and SOX DR compliance documentation.",
          stageIndex: 4,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "DR environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Production vs DR comparison" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Continuous DR drift monitoring" },
      { name: "Health Assessment", timeline: "H2 2027", description: "DR readiness scoring" },
      { name: "DR Readiness", timeline: "H2 2027", description: "Failover simulation and validation" },
    ],
  },
  "uc-11": {
    id: "uc-11",
    label: "UC-11: Capacity Planning and Performance Readiness",
    description: "Proactive capacity management with load projection, constraint identification, dark capacity discovery, and validated configuration changes before peak events.",
    personas: [
      { name: "Alex", role: "Performance / Application Engineer", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Forecast", description: "Manual SMF data analysis in spreadsheets" },
        { name: "Size", description: "Configuration sizing by experience and rule of thumb" },
        { name: "Test", description: "Performance testing skipped due to lab scheduling" },
        { name: "Monitor", description: "Discover constraints during production incidents" },
        { name: "Diagnose", description: "Multi-team conference to trace root cause" },
      ],
      markers: [
        { persona: "Alex", type: "time", title: "Lost Time — 1–3 business days", description: "Root cause diagnosis takes 1–3 business days of multi-team investigation.", stageIndex: 4 },
        { persona: "Alex", type: "pain", title: "Business Impact — capacity planning relies on institutional memory", description: "Capacity planning uses spreadsheets and SMF data manually — no systematic projection methodology.", stageIndex: 0 },
        { persona: "Quinn", type: "pain", title: "Business Impact — post-change performance regression discovered by accident", description: "Post-change regressions are discovered through user complaints, not proactive monitoring.", stageIndex: 3 },
        { persona: "Annette", type: "pain", title: "Business Impact — dark capacity invisible — teams procure what they have", description: "Underutilized resources are invisible without dedicated analysis — teams procure capacity they already have.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Skill Gap / Bottleneck — diagnosis requires expert across multiple disciplines", description: "Performance diagnosis requires cross-subsystem expertise that only the most experienced engineers possess.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Project", description: "Atlas models load projection against configuration" },
        { name: "Identify", description: "Constraint identification with headroom quantified" },
        { name: "Plan", description: "Configuration change plan with test criteria" },
        { name: "Validate", description: "Isolated testing at simulated load before production" },
        { name: "Monitor", description: "Continuous threshold alerting before breach" },
      ],
      markers: [
        { persona: "Alex", type: "time", title: "Time Saving — 1–3 days → under 2 hours", description: "Root cause identified in under 2 hours with Atlas's unified cross-pillar analysis.", stageIndex: 4 },
        { persona: "Alex", type: "skill", title: "Atlas AI & Automation — proactive constraint discovery before peak events", description: "Atlas models load projection and identifies constraints weeks before peak events — not discovered during the event.", stageIndex: 1 },
        { persona: "Quinn", type: "skill", title: "Atlas AI & Automation — post-change regression detected same day", description: "Behavioral baseline comparison surfaces regressions within hours of a change, not days later.", stageIndex: 3 },
        { persona: "Annette", type: "gain", title: "New User Capability — unified cross-pillar analysis replaces multi-team investigation", description: "Annette can triage performance issues with Atlas's cross-subsystem correlation without escalating to Alex.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — dark capacity discovered and mapped", description: "Atlas identifies underutilized resources and over-provisioned LPARs — no wasted capacity procurement.", stageIndex: 1 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z's Optimize module has detected a production performance degradation — a Db2 buffer pool approaching saturation, a CICS MXT being repeatedly hit under peak load, an MQ queue depth trending toward the limit — or has identified an approaching capacity constraint through its performance analytics. Concert4Z surfaces this as an operational finding with root-cause attribution and may recommend a configuration change or capacity increase." },
            { label: "Concert4Z hands to Atlas", description: "Concert4Z's performance finding triggers an Atlas capacity planning workflow. Atlas takes the identified constraint and applies change intelligence: modelling the risk for the affected event, projecting transaction volume against current configuration, identifying the specific configuration change required, and generating a validated remediation plan." },
            { label: "Atlas returns to Concert4Z", description: "After Atlas plans, provisions, tests, and validates the configuration change, the validated change is returned for production apply. Concert4Z's post-apply monitoring detects whether the change resolved the performance constraint or introduced a regression." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas identifies root cause within one conversation for a reported performance degradation. Concert4Z's Optimize module has already done significant diagnostic work in production — SMF-derived performance analysis, WLM policy evaluation, cross-subsystem performance correlation. When Concert4Z hands off to Atlas, it passes its diagnostic findings as the starting context, reducing Atlas's root-cause investigation to confirmation and scope-expansion rather than starting from scratch.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas's capacity risk modelling projects transaction volume against current configuration and identifies constraints. The transaction volume data that Atlas projects from comes from Concert4Z's SMF/CDP pipeline — real production workload data, not theoretical estimates. This makes Atlas's peak event capacity model grounded in actual workload history rather than rule-of-thumb approximations.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas generates the production configuration change plan and Change Intelligence executes it. The management-readable capacity readiness summary that Atlas generates for Quinn's approval is enriched with Concert4Z's production performance evidence — the actual SMF data showing the constraint, the trend line, and the projected improvement — making Quinn's approval decision grounded in production data rather than Atlas's modelled projection alone.",
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has applied the validated configuration change and registered the new behavioral baseline. Atlas monitors for post-change performance regressions." },
            { label: "Atlas hands to Concert4Z", description: "Concert4Z's Observe module provides the continuous production monitoring that surfaces post-change regressions. If the configuration change resolves the constraint but inadvertently creates a new one, Concert4Z detects the new behavioral anomaly and surfaces it. Atlas correlates the anomaly to the specific configuration change event, attributing the regression to the responsible change." },
            { label: "Concert4Z returns to Atlas", description: "A post-apply regression finding from Concert4Z becomes the trigger for a new Atlas workflow — investigate the regression, adjust the configuration, re-validate." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "When Atlas collects the performance baseline, Terraform's state file provides the current infrastructure resource allocations — CPU entitlement, memory, storage configuration. This infrastructure-level baseline complements Atlas's software-layer performance metrics.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has generated the directional performance test and needs to execute it in a production-equivalent environment. Atlas needs infrastructure-accurate test infrastructure." },
            { label: "Atlas directs", description: "Atlas passes the performance test environment specification to Terraform, requesting an environment provisioned from the same HCL declaration as the production workspace." },
            { label: "Terraform returns", description: "A Terraform-provisioned performance test environment with production-equivalent infrastructure. Atlas runs the performance test against it." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "When Atlas generates capacity and configuration recommendations, recommendations involving infrastructure resource changes can be expressed as Terraform HCL change proposals, making them immediately actionable through the established Terraform governance workflow.",
          stageIndex: 4,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Resource and workload inventory" },
      { name: "Performance Prediction", timeline: "H2 2027", description: "Load projection and constraint forecasting" },
      { name: "Capacity Planning", timeline: "H2 2027", description: "Dark capacity discovery and headroom analysis" },
      { name: "Health Assessment", timeline: "H2 2027", description: "Performance health scoring" },
    ],
  },
  "uc-12": {
    id: "uc-12",
    label: "UC-12: Application Modernization",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization with code-level impact assessment and regression validation.",
    personas: [
      { name: "Angie", role: "Application Architect", engagement: "Primary" },
      { name: "Kathleen", role: "z/OS Application Developer (experienced)", engagement: "Secondary" },
      { name: "Deb", role: "z/OS Application Developer (early tenure)", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Analyze", description: "Understand the full structure, technical debt profile, and dependency map of the application being modernized — programs, copybooks, APIs, Db2 access patterns, runtime call chains." },
        { name: "Plan", description: "Define a prioritized, phased modernization plan — which changes to make, in which order, with what validation approach." },
        { name: "Execute Phase", description: "Implement a phase of the modernization plan — remediating deprecated API calls, decomposing monolithic structures, updating Db2 access patterns." },
        { name: "Validate Phase", description: "Validate each phase in isolation before production is touched — regression testing scoped to the changed components." },
        { name: "Promote", description: "Promote the validated phase to production — including any infrastructure configuration changes." },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Lost Time — weeks to months", description: "Modernization projects begin with a research phase that takes weeks or months — manually reading code, interviewing the few remaining experts, reviewing CSD definitions and Db2 catalog entries.", stageIndex: 0 },
        { persona: "Angie", type: "pain", title: "Business Impact — modernization plans built on incomplete analysis carry high risk of unexpected failures during execution", description: "The research phase is expensive, incomplete, and produces no structured artifact — modernization plans are built on an understanding that is acknowledged as incomplete.", stageIndex: 0 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — modernization must proceed without access to the design intent of the systems being changed", description: "The people who built legacy applications are often gone — the knowledge required to modernize safely is no longer available from the original authors.", stageIndex: 0 },
        { persona: "Deb", type: "pain", title: "Business Impact — changes to highly coupled code can produce unexpected failures in parts of the system the developer did not know were connected", description: "Tightly coupled code (monolithic copybooks, shared Db2 plans) carries high risk because the blast radius of changes is not fully known.", stageIndex: 0 },
        { persona: "Angie", type: "time", title: "Lost Time — weeks", description: "No automated technical debt identification — Angie must manually identify deprecated APIs, monolithic structures, and duplicated logic from code review and expert interviews.", stageIndex: 1 },
        { persona: "Greg", type: "skill", title: "Skill Gap / Bottleneck — Greg must be consulted for every decision that has infrastructure implications, creating a serial dependency", description: "Infrastructure implications of modernization decisions (API modernization, database schema changes) are assessed informally — no structured mechanism to evaluate infrastructure impact before the plan is finalized.", stageIndex: 1 },
        { persona: "Angie", type: "pain", title: "Business Impact — without data-driven prioritization, the most dangerous changes may not be scheduled last or given appropriate validation resources", description: "Modernization prioritization is based on estimated impact and risk — no data-driven prioritization from actual coupling analysis and blast radius quantification.", stageIndex: 1 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — changes that appear safe from static analysis can cause runtime failures through dynamic dependencies that are invisible pre-ZUnderstand", description: "Code-level changes to tightly coupled legacy code carry high risk because the full runtime call chain is not visible from static analysis.", stageIndex: 2 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot work independently on modernization phases without Kathleen's continuous involvement", description: "Early-tenure developers working on lower-risk modernization phases lack the system context to work safely — they depend on Kathleen's oversight for every non-trivial change.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — hours to days per phase", description: "Infrastructure configuration changes triggered by modernization (CICS definitions, Db2 parameter changes, IMS setup) require Zach's involvement in every phase.", stageIndex: 2 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — phase validation results are unreliable if test environment conditions do not match what production will experience", description: "Phase validation environments are not isolated — testing occurs in shared or production-similar environments, creating risk of interference.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours per phase", description: "Regression test coverage depends on the developer's knowledge of what the phase changed — systematic scope definition is not automated.", stageIndex: 3 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — test failure diagnosis always escalates to Kathleen", description: "Test failures on modernization phases require Kathleen's diagnosis — Deb lacks the call chain knowledge to attribute test failures to specific coupling points.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours of multi-team coordination", description: "Production promotion requires Zach for any configuration steps — multi-team handoff for every phase promotion, even routine ones.", stageIndex: 4 },
        { persona: "Angie", type: "pain", title: "Business Impact — architectural drift accumulates silently across multi-year modernization projects", description: "No mechanism to verify that the promoted phase conforms to the intended architecture — regression from architectural intent can accumulate phase by phase.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Analyze", description: "Atlas produces a complete picture of any application's structure, technical debt, and dependency profile in minutes — programs, deprecated APIs, monolithic structures, runtime call chains via ZUnderstand." },
        { name: "Plan", description: "Atlas identifies modernization opportunities — deprecated APIs approaching end-of-support, monolithic structures suitable for decomposition, duplicated logic — and generates a prioritized, phased plan." },
        { name: "Execute Phase", description: "Developers execute the phase — code changes, API remediation, structural decomposition — with Atlas providing dependency context and Zach authorizing infrastructure configuration changes." },
        { name: "Validate Phase", description: "Each phase validated in an isolated environment — regression testing scoped automatically from the impact analysis. Atlas attributes test failures to specific coupling points." },
        { name: "Promote", description: "Atlas orchestrates phase promotion to production — including any configuration changes. Angie reviews promoted phases against architectural intent." },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Time Saving — weeks to months of manual research → minutes", description: "Complete application structure, technical debt profile, and dependency map produced in minutes — from Atlas's topology model and ZUnderstand's dynamic call chain analysis.", stageIndex: 0 },
        { persona: "Kathleen", type: "skill", title: "Atlas AI & Automation — ZUnderstand dynamic call chain analysis is required for safe modernization scope; this is not achievable from static analysis alone", description: "Runtime call chain analysis from ZUnderstand shows which programs actually call which others at runtime — not just which are statically configured. Monolithic copybook decomposition planned from actual usage, not from topology assumptions.", stageIndex: 0 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently understands coupling scope for her assigned phases using Atlas's analysis", description: "Atlas surfaces which fields in a shared copybook are actually used by which programs at runtime — Deb knows the safe decomposition boundary before making any changes.", stageIndex: 0 },
        { persona: "Angie", type: "skill", title: "Atlas AI & Automation — Atlas generates a prioritized plan from technical debt analysis, coupling scores, and proactive deadline surfacing", description: "Prioritized modernization plan generated by Atlas — deprecated API deadlines, coupling risk scores, blast radius quantification — data-driven prioritization rather than expert estimation.", stageIndex: 1 },
        { persona: "Greg", type: "gain", title: "New User Capability — Greg reviews infrastructure implications from Atlas's analysis without being consulted ad hoc for every decision", description: "Infrastructure implications of each modernization phase reviewed through Atlas — structural changes that affect CICS definitions, Db2 parameters, or IMS setup identified before the phase plan is finalized.", stageIndex: 1 },
        { persona: "Kathleen", type: "skill", title: "Atlas AI & Automation — ZUnderstand dynamic call chain prevents the silent failures that static-only analysis cannot detect", description: "Full runtime call chain visible before making changes to tightly coupled code — the safety of a change can be confirmed before writing it.", stageIndex: 2 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently executes lower-risk modernization phases from Atlas's structured phase specification", description: "Atlas provides the system context for Deb's phase — she works from Atlas's dependency analysis, not from her own incomplete knowledge.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — hours to days per phase of Zach manual configuration → authorization gates within Atlas", description: "Infrastructure configuration changes for modernization phases are Atlas-orchestrated — Zach authorizes rather than manually executing every configuration step.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours manual regression scoping → automatic", description: "Phase regression testing scoped automatically from the impact analysis — Atlas generates the test targets from the programs and call chains the phase changed.", stageIndex: 3 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently diagnoses phase test failures using Atlas's attribution", description: "Test failures attributed by Atlas to specific coupling points — Deb can diagnose and fix failures independently rather than escalating to Kathleen for every test failure.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Time Saving — no manual test environment setup per phase; Atlas provisions and configures it", description: "Phase validation runs in an isolated environment provisioned by Atlas — consistent, production-representative conditions for every phase validation.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours of multi-team coordination → Atlas-orchestrated workflow", description: "Atlas-orchestrated phase promotion — developer initiates, Atlas handles configuration, Zach authorizes infrastructure gates. No multi-team handoff coordination required.", stageIndex: 4 },
        { persona: "Angie", type: "skill", title: "Atlas AI & Automation — architectural conformance check catches architectural drift before it accumulates across phases", description: "Phase promotion reviewed against architectural specification — Atlas checks whether the promoted code conforms to the intended architecture before production apply.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "BOB PPZ Enrichment Touchpoint",
          summary: "Atlas produces a complete picture of any application's structure, technical debt, and dependency profile. When Bob PPZ is installed, the analysis is enriched with ZUnderstand's full code-level metadata — precise program-to-program call relationships, data flow paths, and business service attribution. This means the modernization analysis includes execution-path-level detail, showing not just which programs are deprecated, but which specific call chains, data flows, and business services are affected.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas produces the complete application structure, technical debt profile, and dependency map — using ZUnderstand static analysis and, when available, ZEN runtime call chain data. ZEN from Concert4Z's ZOC infrastructure provides the runtime-observed execution evidence that makes the modernization analysis more precise: active vs. dormant code paths, execution frequency, and cross-application runtime dependencies. Programs that appear in the static call graph but have never been observed in ZEN data may represent dead code — safe to remove rather than modernize.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's production incident history for the applications in the modernization scope provides real-world risk context for modernization prioritization. Applications that have caused or contributed to recent Concert4Z-detected production incidents are a higher modernization priority — their instability is confirmed by production evidence, not just technical debt assessment. This incident-informed prioritization makes the Atlas-generated modernization plan more credible to business stakeholders.",
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "BOB PPZ Handoff",
          steps: [
            { label: "Atlas produced", description: "A modernization plan that includes application code changes. Atlas has identified specific programs that need to be modified, deprecated APIs that need to be replaced, and monolithic structures that need to be decomposed." },
            { label: "Atlas directs the user to Bob PPZ", description: "Atlas presents the code-level modernization requirement — the specific program, the nature of the required change, and the dependency context. The user is directed to Bob PPZ to implement the code change using ZUnderstand's deterministic code-level intelligence." },
            { label: "Bob PPZ returns to Atlas", description: "The completed code change artifact. Atlas incorporates it into the modernization plan, validates it in the provisioned test environment, and confirms it before the phase is promoted to production." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas orchestrates phase promotion and checks architectural conformance. After promotion, Concert4Z's monitoring of the modernized application in production provides behavioral baseline comparison that confirms the phase worked as intended.",
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "A modernization plan that requires simultaneous test environments: a legacy environment at the current architecture and a target environment at the modernized architecture. Both must match production infrastructure for valid equivalence testing." },
            { label: "Atlas directs", description: "Atlas passes two infrastructure specifications to Terraform: the legacy environment specification and the target environment specification. Terraform provisions both in isolated workspaces." },
            { label: "Terraform returns", description: "Both legacy and modernized environments provisioned. Atlas deploys to both and runs equivalence testing." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's workspace structure reveals which LPARs are Terraform-managed. This informs the modernization readiness assessment: components on Terraform-managed infrastructure have a cleaner path to modernization (infrastructure changes are declarative and reversible).",
          stageIndex: 0,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Application and code inventory" },
      { name: "System Topology", timeline: "GA", description: "Code-level dependency mapping" },
      { name: "Natural Language Query", timeline: "GA", description: "Query codebase in plain English" },
      { name: "Code Analysis for Modernization", timeline: "H1 2027", description: "Technical debt and deprecated API detection" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Modernization impact scoring" },
    ],
  },
  "uc-13": {
    id: "uc-13",
    label: "UC-13: Regulatory Change Response",
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, encryption assessment, and sequenced remediation with continuous post-remediation monitoring.",
    personas: [
      { name: "Sage", role: "Security Administrator (mid-level)", engagement: "Primary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
      { name: "Lupita", role: "Key Management and Cryptography Services", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Discover", description: "When a new regulation arrives, identify all data and systems in scope across the IBM Z estate — datasets, Db2 tables, IMS segments, VSAM files, application programs." },
        { name: "Assess", description: "Map access control gaps — which users and applications can access regulated data without the access controls the regulation requires." },
        { name: "Execute", description: "Implement the regulatory remediation — RACF profile updates, dataset encryption enablement, batch job credential changes, audit trail configuration." },
        { name: "Verify", description: "Confirm that all regulated data now has the required access controls and encryption configuration in place." },
        { name: "Evidence", description: "Generate the compliance evidence package for regulators — demonstrating that regulated data was identified, access-controlled, and encrypted." },
        { name: "Monitor", description: "After initial compliance is achieved, maintain ongoing awareness — new data in regulatory scope, configuration drift, access control changes." },
      ],
      markers: [
        { persona: "Sage", type: "time", title: "Lost Time — weeks", description: "IBM Z organizations run regulated data in datasets, databases, IMS segments, and application programs that are not cataloged in any single system — identifying all regulated data requires weeks of manual investigation.", stageIndex: 0 },
        { persona: "Sage", type: "pain", title: "Business Impact — regulatory deadline pressure is compounded by the fact that scope is not understood until weeks into the response", description: "The team is often still discovering scope when the deadline is approaching — leaving insufficient time for remediation and validation.", stageIndex: 0 },
        { persona: "Derek", type: "skill", title: "Skill Gap / Bottleneck — Derek cannot independently scope regulatory compliance; requires coordinating 4+ specialist teams", description: "No multi-tool regulated data inventory — Derek must coordinate with the DBA (Db2 tables), the storage team (VSAM files), the application team (programs), and the security team (RACF profiles) just to establish scope.", stageIndex: 0 },
        { persona: "Sage", type: "time", title: "Lost Time — 3–5 business days", description: "Access control gap analysis for regulated data requires manually reviewing RACF profiles per dataset and comparing against regulatory requirements — a multi-day expert task.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — access control gaps that span tool boundaries are invisible without a unified view", description: "No cross-tool view: RACF profiles, Db2 access controls, and application-level access are reviewed in separate tools with no unified gap picture.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — days", description: "Encryption gap analysis requires separately reviewing DFSMS configuration, Db2 encryption settings, and network connection encryption state — multiple tools, multiple expertise domains.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — multi-team remediation with no shared plan produces gaps at workstream boundaries", description: "Regulatory response is a multi-team manual project — security team, DBA, application team, and systems programmer must each execute their workstream independently with no shared coordination artifact.", stageIndex: 2 },
        { persona: "Lupita", type: "time", title: "Lost Time — days to weeks", description: "Encryption at rest workstream requires coordinating key management, encryption configuration, and dataset rewriting — high complexity with no integrated tooling.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — Zach's time consumed by routine compliance execution", description: "System-level remediations (RACF profile updates, dataset encryption) require Zach's execution for every single change — no delegation path for routine compliance remediation.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — remediation completeness is assumed, not verified; gaps surface in the next audit", description: "Post-remediation verification is minimal — there is no systematic check that all regulated data was addressed and that no newly created datasets fall into scope.", stageIndex: 3 },
        { persona: "Derek", type: "pain", title: "Business Impact — compliance posture degrades silently as new regulated data is created post-remediation", description: "New regulated data that appears after the initial remediation is typically not detected until the next audit cycle — no continuous monitoring.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Lost Time — days", description: "Compliance evidence package is assembled manually from RACF reports, DBA exports, encryption configuration summaries, and application team attestations.", stageIndex: 4 },
        { persona: "Derek", type: "pain", title: "Business Impact — evidence quality is limited; auditors may find gaps because the snapshot was assembled at submission time", description: "Evidence reflects a point-in-time snapshot assembled at submission — not a continuous, authoritative record of the compliant state.", stageIndex: 4 },
        { persona: "Sage", type: "pain", title: "Business Impact — new regulated data accumulates silently between audit cycles", description: "No ongoing monitoring for new regulated data — compliance scope changes when new datasets are created or when the data their applications generate becomes regulated.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Discover", description: "Atlas inventories all regulated data across the entire z/OS estate in hours — datasets, Db2 tables, IMS segments, VSAM files, and programs that touch regulated data." },
        { name: "Assess", description: "Atlas maps access control gaps, encryption gaps, and audit trail gaps across all regulated data — comparing current RACF profiles and configuration against regulatory requirements." },
        { name: "Execute", description: "Atlas sequences the full remediation workstream — RACF updates, encryption enablement, credential changes — across all workstreams simultaneously, orchestrated by Change Intelligence." },
        { name: "Verify", description: "Atlas confirms all regulated data has the required controls in place — and monitors continuously for new regulated data that comes into scope after the initial remediation." },
        { name: "Evidence", description: "Atlas generates the compliance evidence package directly from its verified compliant state — structured, auditor-ready, and continuous." },
        { name: "Monitor", description: "Atlas monitors continuously for new regulated data, access control drift, and encryption configuration changes that would open new compliance gaps." },
      ],
      markers: [
        { persona: "Sage", type: "time", title: "Time Saving — weeks of manual scope assembly → hours", description: "Atlas inventories all regulated data across the entire estate in hours — datasets, Db2 tables, IMS segments, VSAM files — without coordinating 4+ specialist teams.", stageIndex: 0 },
        { persona: "Derek", type: "gain", title: "Business Impact — regulatory deadline pressure is relieved by scope completeness from day one", description: "Complete scope delivered in hours rather than weeks — the regulatory response timeline begins with the full scope known, not with weeks of scope discovery that competes with the remediation deadline.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — cross-tool access control analysis joins RACF, Db2, and application topology in one assessment", description: "Unified access control gap analysis across RACF profiles, Db2 access controls, and application access in a single Atlas session — cross-tool gaps visible for the first time.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — days → hours", description: "Encryption gap picture produced by Atlas — DFSMS configuration, Db2 encryption status, and connection encryption state joined in one assessment without multi-tool investigation.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — multi-workstream remediation plan generated and sequenced automatically; gaps at workstream boundaries are eliminated", description: "Full regulatory remediation workstream sequenced in a single Atlas session — RACF updates, encryption enablement, credential changes, audit trail configuration — all workstreams planned and tracked in Atlas.", stageIndex: 2 },
        { persona: "Lupita", type: "time", title: "Time Saving — days to weeks of manual encryption workstream coordination → Atlas-orchestrated sequence", description: "Encryption workstream orchestrated by Atlas — key management, encryption configuration, and dataset rewriting steps sequenced in the correct order with dependencies resolved.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — Zach's execution time on routine compliance changes reduced to authorization gates", description: "Routine compliance remediations (RACF profile updates, encryption configuration) are Atlas-orchestrated — Zach authorizes rather than manually executing every change.", stageIndex: 2 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — comprehensive post-remediation coverage check runs automatically after execution", description: "Post-remediation verification is systematic — Atlas confirms every regulated data item has the required controls applied, with no items assumed rather than verified.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — ongoing monitoring replaces point-in-time compliance snapshot", description: "Continuous monitoring for new regulated data — Atlas alerts when new datasets, tables, or programs come into regulatory scope after the initial remediation. No silent compliance drift.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Time Saving — days assembling evidence → generated from Atlas's continuous record", description: "Compliance evidence package generated from Atlas's verified compliant state — regulated data inventory, access control gap remediation record, encryption configuration evidence, audit trail status.", stageIndex: 4 },
        { persona: "Derek", type: "skill", title: "Atlas AI & Automation — continuous compliance record eliminates the evidence quality limitation of point-in-time snapshot assembly", description: "Evidence is from Atlas's authoritative, continuous record — not a point-in-time snapshot assembled at submission time. Auditors receive continuous evidence of the compliant state.", stageIndex: 4 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — continuous scope monitoring surfaces new regulated data without a user query", description: "New regulated data detected as it is created — Atlas alerts before the new gap becomes a compliance problem. Compliance posture is maintained continuously, not recovered at each audit.", stageIndex: 5 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek monitors regulatory compliance posture continuously from Atlas without requiring Sage or Zach to assemble a status report", description: "Ongoing compliance state visible in Atlas — Derek knows the current regulatory posture at any point, not just after a manual assessment.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z's Observe module has detected an access anomaly: a user or process accessing regulated data in a pattern that deviates from their historical norm — off-hours access, unusual dataset access volume, a dormant privileged account becoming active. This anomaly is surfaced as a Concert4Z operational finding." },
            { label: "Concert4Z hands to Atlas", description: "The access anomaly triggers an Atlas regulatory investigation. Atlas scopes the affected regulated data components — which datasets, tables, and programs are involved — and assesses whether the anomaly represents a compliance gap that requires formal regulatory remediation: RACF profile updates, access control tightening, audit trail configuration. Atlas transitions into a regulatory change response workflow from the Concert4Z-detected access finding." },
            { label: "Atlas returns to Concert4Z", description: "After Atlas completes the regulatory remediation, the remediation record — what was changed, what controls are now in place, the compliance evidence — is recorded in Atlas's continuous record. Concert4Z's monitoring sees the access anomaly pattern resolved and can consume Atlas's remediation record as operational context for subsequent access monitoring." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas maps access control gaps across RACF profiles, Db2 access controls, and application access in a unified assessment. Concert4Z's continuous access monitoring provides the behavioral dimension of this assessment — not just 'what are the RACF settings for this dataset' (configuration) but 'who has actually been accessing this dataset, when, and how often' (behavior). This behavioral access picture is the difference between a theoretical access control gap and an active access risk.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas monitors continuously for new regulated data, access control drift, and encryption configuration changes. Concert4Z's continuous access monitoring provides the behavioral complement — detecting when regulated data is being accessed in ways that Atlas's configuration monitoring cannot catch. A new application program that begins accessing a regulated dataset (behavioral access not matched by a configuration change) is detected by Concert4Z and surfaces as a new regulated scope item for Atlas to assess.",
          stageIndex: 5,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Regulated data inventory across all stores" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state for compliance baseline" },
      { name: "Policy-as-Code", timeline: "GA", description: "Regulatory rules and automated checking" },
      { name: "Health Assessment", timeline: "H2 2027", description: "Encryption and access control gap analysis" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Post-remediation compliance monitoring" },
    ],
  },
  "uc-14": {
    id: "uc-14",
    label: "UC-14: Change Governance and Traceability",
    description: "Complete change attribution for every Atlas-executed change, undocumented change detection via baseline diff, and bi-directional ITSM integration for audit readiness.",
    personas: [
      { name: "Quinn", role: "IT Operations Manager", engagement: "Primary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer (experienced)", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Identify that a change has occurred on IBM Z — whether through a planned Atlas-executed change, an ITSM-recorded change, or a configuration modification that occurred outside any change control process." },
        { name: "Attribute", description: "For every change detected, determine who made it, when, what system it affected, and whether there is an authorized change record." },
        { name: "Surface", description: "Present the complete picture of change activity — what was documented, what was undocumented, what was out of window — in a queryable form." },
        { name: "Investigate", description: "For undocumented or out-of-window changes, conduct the investigation — was this authorized? An emergency change with a missing record? An unauthorized modification?" },
        { name: "Document", description: "Create or complete the change record — either at the time of change (best practice) or retroactively for undocumented changes that were actually authorized." },
        { name: "Enforce", description: "Maintain ongoing change window compliance and change record completeness — proactively, not reactively." },
      ],
      markers: [
        { persona: "Quinn", type: "pain", title: "Business Impact — out-of-window changes are invisible until they cause an incident or surface in an audit review", description: "No visibility into changes that occurred outside change windows unless a human notices a behavioral difference or an auditor flags it.", stageIndex: 0 },
        { persona: "Annette", type: "pain", title: "Business Impact — out-of-window changes accumulate silently between incident post-mortems", description: "No automated detection for out-of-window changes — the only signal is a behavioral symptom or an escalation after the fact.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — the process gap is structural: the execution tools and the change recording tools are entirely separate", description: "Changes made through ISPF panels, operator commands, SMP/E, and JCL do not integrate with ServiceNow or ITSM systems — the gap between what happened and what the change system knows is built into the tooling.", stageIndex: 0 },
        { persona: "Quinn", type: "pain", title: "Business Impact — change record completeness is unknown until the audit investigation; the gap is not measurable in real time", description: "A meaningful fraction of all IBM Z configuration changes have no associated change record — discovered in audit reviews, not proactively.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 15–30 minutes per change", description: "Change records for his work are a separate manual step after executing the change — a step that gets skipped under time pressure, especially for emergency changes.", stageIndex: 1 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without Zach's expert log interpretation", description: "No automated attribution for out-of-Atlas changes — investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate.", stageIndex: 1 },
        { persona: "Quinn", type: "time", title: "Lost Time — hours", description: "When an incident post-mortem asks 'what changed on this system in the last 30 days?', answering requires reviewing multiple logs manually across multiple tools.", stageIndex: 2 },
        { persona: "Derek", type: "time", title: "Lost Time — days", description: "Change record completeness for IBM Z — the foundational evidence for SOX IT General Controls — is consistently the most labor-intensive section of audit prep.", stageIndex: 2 },
        { persona: "Derek", type: "pain", title: "Business Impact — audit findings for undocumented changes are a predictable, recurring cost", description: "The gap between 'what actually happened on z/OS' and 'what the change management system knows about' is consistently a source of audit findings.", stageIndex: 2 },
        { persona: "Annette", type: "time", title: "Lost Time — hours per incident", description: "Closing incidents requires a complete audit trail — assembling it manually from memory and multiple tool queries under time pressure is a routine frustration.", stageIndex: 3 },
        { persona: "Quinn", type: "pain", title: "Business Impact — emergency change governance is a process requirement, but enforcement is entirely behavioral", description: "Emergency changes frequently get change records created after the fact or miss the record entirely — process compliance relies entirely on individual discipline, with no enforcement mechanism.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours per post-mortem", description: "When an incident post-mortem asks what changed, Zach must review multiple logs manually — time that should have been preventable.", stageIndex: 3 },
        { persona: "Zach", type: "pain", title: "Business Impact — unplanned rollback under time pressure is expensive and error-prone when the pre-change state is not documented", description: "Rollback history is not tied to individual changes — if a change needs to be reversed, the pre-change state must be reconstructed from memory and exports.", stageIndex: 4 },
        { persona: "Quinn", type: "pain", title: "Business Impact — retroactive records created without a structured process are inconsistent and less defensible in audit", description: "Retroactive change record creation for emergency changes is informal — no structured workflow, no template, no consistency between engineers.", stageIndex: 4 },
        { persona: "Quinn", type: "pain", title: "Business Impact — annual audit finding for undocumented changes is a predictable, recurring cost that is preventable with automated monitoring", description: "Discovering '46 changes in the past year have no change record' in an audit is an audit finding, a relationship risk, and a remediation obligation — none of which are preventable without automated detection.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Every Atlas-executed change is automatically attributed and timestamped at the moment of execution. Out-of-Atlas changes are detected by comparing current Config-as-Code state against the last registered baseline." },
        { name: "Attribute", description: "For Atlas-executed changes, attribution is automatic and complete. For out-of-Atlas changes, Atlas provides the configuration delta, timestamp, and affected components immediately." },
        { name: "Surface", description: "Atlas provides a complete, queryable change history — 'what changed on PROD1 in the last 30 days?' answered in a structured Atlas response." },
        { name: "Investigate", description: "Atlas provides a structured starting point for each investigation — evidence pre-assembled. The human decides: authorized? Emergency change with missing record? Unauthorized?" },
        { name: "Document", description: "For undocumented changes that were actually authorized (emergency changes with verbal approval), Atlas provides a structured retroactive documentation workflow. For unauthorized changes, Atlas routes to security investigation." },
        { name: "Enforce", description: "Every Atlas-executed change is automatically documented. Every undocumented out-of-Atlas change is surfaced within one discovery cycle. ServiceNow integration (H2 2027) closes the loop." },
      ],
      markers: [
        { persona: "Quinn", type: "skill", title: "Atlas AI & Automation — continuous change window monitoring surfaces violations as they occur", description: "Out-of-window change alerts in real time — Atlas detects changes outside defined change windows and alerts Quinn immediately, not in the next post-mortem.", stageIndex: 0 },
        { persona: "Annette", type: "skill", title: "Atlas AI & Automation — Config-as-Code diff against registered baseline is the mechanism no individual tool can replicate", description: "Undocumented changes detected automatically through Config-as-Code baseline diff — Annette receives a structured alert, not a behavioral symptom.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 15–30 minutes per change of retrospective documentation → automatic at execution", description: "Change records created without a separate step — for every change Zach executes through Atlas, the change record is generated and populated automatically as part of the workflow.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently investigates undocumented changes using Atlas's attribution data without Zach's expert log interpretation", description: "Out-of-Atlas change investigation starts with Atlas's evidence — configuration delta, timestamp, affected component, and user ID — immediately available without log archaeology.", stageIndex: 1 },
        { persona: "Quinn", type: "time", title: "Time Saving — hours of multi-tool log review → a single Atlas query", description: "'What changed on PROD1 in the last 30 days?' answered from Atlas in a structured response — replaces multi-tool log review with a single conversation.", stageIndex: 2 },
        { persona: "Derek", type: "time", title: "Time Saving — days assembling change history evidence → generated from Atlas's continuous record", description: "Change traceability evidence for any time period generated from Atlas — all changes, with attribution status (documented / undocumented / out-of-window) — in the format auditors need.", stageIndex: 2 },
        { persona: "Derek", type: "skill", title: "Atlas AI & Automation — undocumented change enumeration is only possible through Atlas's combined change log and Config-as-Code baseline diff", description: "'46 undocumented changes' — surfaced before the auditor sees them. A specific, verifiable count rather than a gap discovered in the audit room.", stageIndex: 2 },
        { persona: "Annette", type: "time", title: "Time Saving — hours per incident of manual audit trail assembly → automatic continuous trail", description: "Incident audit trail generated automatically for every Atlas-managed change — Annette closes incidents with a complete, continuous record rather than assembling it under pressure.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — hours of post-mortem log review → single Atlas query", description: "When an incident post-mortem asks what changed, Zach queries Atlas — structured change history available without multi-tool log review.", stageIndex: 3 },
        { persona: "Quinn", type: "skill", title: "Atlas AI & Automation — Atlas generates the retroactive change record template pre-populated from the detected change data", description: "Structured retroactive documentation workflow for emergency changes — consistent, template-driven, with Atlas linking the retroactive record to the detected change.", stageIndex: 4 },
        { persona: "Zach", type: "gain", title: "New User Capability — Zach independently plans rollbacks from Atlas's captured pre-change state without reconstructing the previous configuration", description: "Every Atlas-executed change has its pre-change state captured — rollback planning starts from a known, documented state, not from reconstructed memory.", stageIndex: 4 },
        { persona: "Quinn", type: "time", title: "Time Saving — annual audit finding remediation effort drops proportionally with change record coverage improvement", description: "Change record coverage goes from ~60% to 100% for Atlas-executed changes — the audit finding for undocumented changes drops from 46 per year to under 5.", stageIndex: 5 },
        { persona: "Quinn", type: "skill", title: "Atlas AI & Automation — Atlas-to-ServiceNow integration closes the structural tool gap that was the root cause of undocumented changes", description: "ServiceNow integration (H2 2027): Atlas changes create ServiceNow records automatically — bi-directional, no manual step in either system.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z has detected a production anomaly — a behavioral change on a system — and the incident investigation asks 'what changed on this system in the last 30 days?' This is precisely the question Atlas answers from its continuous change record." },
            { label: "Concert4Z hands to Atlas", description: "Concert4Z's incident investigation surfaces a production anomaly with a timestamp and affected component. Atlas is queried for the change history of that component over the relevant time window. Atlas returns a structured change record: all Atlas-executed changes (fully documented), all out-of-Atlas changes detected through Config-as-Code baseline diff (with attribution status), and any undocumented changes flagged." },
            { label: "Atlas returns to Concert4Z", description: "A structured change history that Concert4Z uses as the primary root cause analysis input — correlating the production anomaly timestamp against Atlas's change record to identify the likely responsible change." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas detects out-of-window changes through Config-as-Code baseline comparison. Concert4Z's Observe module detects behavioral out-of-window anomalies — production systems behaving differently than expected during non-change-window periods. The two signals are complementary: Atlas catches unauthorized configuration changes; Concert4Z catches behavioral consequences of those changes. Together, they provide bidirectional out-of-window change detection coverage.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas provides change attribution for all Atlas-executed changes automatically. For out-of-Atlas changes, Atlas provides the configuration delta and timestamp. Concert4Z's behavioral change attribution enriches the attribution picture — confirming that the configuration change Atlas detected actually had a behavioral consequence in production, which is the strongest evidence that the change was materially significant.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "For retroactive documentation of emergency changes, Concert4Z's incident record for the change period provides the operational context that makes the retroactive record defensible: 'this change was made during an active Concert4Z incident at 02:47; the anomaly was resolved at 03:15 following the configuration change.' Linking the retroactive change record to the Concert4Z incident record creates a complete, time-stamped narrative that auditors can follow.",
          stageIndex: 4,
        },
      ],
    },
    capabilities: [
      { name: "Config-as-Code", timeline: "GA", description: "Configuration baseline for comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Governance rules and change windows" },
      { name: "Workflow Engine", timeline: "GA", description: "Change orchestration and attribution" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Named change attribution and risk scoring" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Undocumented change detection" },
    ],
  },
};

export const getNodeById = (id: string): ProductNode | undefined =>
  productNodes.find((n) => n.id === id);

export const getConnections = (): { source: string; target: string }[] => {
  const conns: { source: string; target: string }[] = [];
  for (const node of productNodes) {
    for (const targetId of node.connections) {
      conns.push({ source: node.id, target: targetId });
    }
  }
  return conns;
};

export const nodeTypeConfig: Record<NodeType, { color: string; label: string; glowClass: string; bgClass: string; textClass: string }> = {
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