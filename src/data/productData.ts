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

export interface FlowDiagram {
  title: string;
  stages: FlowStage[];
  markers: { type: "pain" | "time" | "skill" | "gain"; text: string; stageIndex: number }[];
}

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
    label: "Vulnerability Remediation",
    type: "useCase",
    description: "Identify, prioritize, and remediate security vulnerabilities across the IBM Z estate with full audit trail.",
    connections: ["predictive"],
  },
  {
    id: "uc-02",
    label: "Patch Management",
    type: "useCase",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with rollback capability.",
    connections: ["change"],
  },
  {
    id: "uc-03",
    label: "Audit and Compliance",
    type: "useCase",
    description: "Generate structured, auditor-ready compliance evidence from a continuous environment record.",
    connections: ["predictive"],
  },
  {
    id: "uc-04",
    label: "Staff Onboarding",
    type: "useCase",
    description: "Get new team members productive fast with AI-guided environment orientation and knowledge transfer.",
    connections: ["system"],
  },
  {
    id: "uc-05",
    label: "Application Discovery",
    type: "useCase",
    description: "Complete dependency mapping and blast radius analysis across the full middleware stack.",
    connections: ["system"],
  },
  {
    id: "uc-06",
    label: "Health Assessment",
    type: "useCase",
    description: "Pre-event health checks joining configuration state, security posture, PTF currency, and performance constraints.",
    connections: ["predictive"],
  },
  {
    id: "uc-07",
    label: "Application Change Mgmt",
    type: "useCase",
    description: "Developer-native change lifecycle with impact analysis, test generation, and deployment orchestration.",
    connections: ["change"],
  },
  {
    id: "uc-08",
    label: "Platform Upgrade",
    type: "useCase",
    description: "Major z/OS and middleware upgrade planning with compatibility assessment and phased execution.",
    connections: ["change"],
  },
  {
    id: "uc-09",
    label: "Drift Control",
    type: "useCase",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation.",
    connections: ["predictive"],
  },
  {
    id: "uc-10",
    label: "DR Validation",
    type: "useCase",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation.",
    connections: ["predictive"],
  },
  {
    id: "uc-11",
    label: "Capacity Planning",
    type: "useCase",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes.",
    connections: ["predictive"],
  },
  {
    id: "uc-12",
    label: "App Modernization",
    type: "useCase",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization.",
    connections: ["change"],
  },
  {
    id: "uc-13",
    label: "Regulatory Response",
    type: "useCase",
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, and sequenced remediation.",
    connections: ["change"],
  },
  {
    id: "uc-14",
    label: "Change Governance",
    type: "useCase",
    description: "Complete change attribution, undocumented change detection, and ITSM integration for audit readiness.",
    connections: ["change"],
  },
];

export const useCaseDetails: Record<string, UseCaseDetail> = {
  "uc-01": {
    id: "uc-01",
    label: "Vulnerability Remediation",
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
        { name: "Detect", description: "Security advisories arrive via email or portal" },
        { name: "Assess", description: "Manual CVE impact analysis across LPARs" },
        { name: "Plan", description: "Remediation planned by memory and experience" },
        { name: "Execute", description: "PTF apply with manual validation" },
        { name: "Verify", description: "Post-apply check for regression" },
        { name: "Document", description: "Change record assembled after the fact" },
      ],
      markers: [
        { type: "time", text: "Typically a 2–3 day process across a large estate", stageIndex: 2 },
        { type: "pain", text: "Requires the most experienced systems programmer to trace dependencies from memory", stageIndex: 2 },
        { type: "pain", text: "The DR environment is typically patched last or forgotten", stageIndex: 3 },
        { type: "pain", text: "Change records assembled from memory and email threads", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas proactively surfaces security gaps from continuous monitoring" },
        { name: "Assess", description: "AI-generated blast radius and impact analysis in minutes" },
        { name: "Plan", description: "Atlas generates sequenced remediation plan with dependency resolution" },
        { name: "Execute", description: "Orchestrated apply with automated validation at each step" },
        { name: "Verify", description: "Post-apply behavioral monitoring confirms no regression" },
        { name: "Document", description: "Complete audit trail generated automatically with named attribution" },
      ],
      markers: [
        { type: "time", text: "Minutes not days for impact analysis", stageIndex: 1 },
        { type: "gain", text: "Auto-generated topology map shows exact affected components", stageIndex: 1 },
        { type: "gain", text: "DR environment included in every remediation cycle automatically", stageIndex: 3 },
        { type: "skill", text: "Atlas replaces expert memory with queryable topology model", stageIndex: 2 },
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
    label: "Patch Management",
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
        { name: "Analyze", description: "Cross-reference PTFs against application topology by expert knowledge" },
        { name: "Plan", description: "Manual test plan creation and sequencing" },
        { name: "Provision", description: "Test environment requested via ticket — hours to days wait" },
        { name: "Validate", description: "Smoke tests run manually or skipped under time pressure" },
        { name: "Execute", description: "Production apply with informal rollback plan" },
      ],
      markers: [
        { type: "time", text: "4–8 hours for manual impact analysis", stageIndex: 1 },
        { type: "pain", text: "Test environments often skipped — production becomes the test environment", stageIndex: 4 },
        { type: "pain", text: "Prerequisite chains resolved by expert memory — missed prerequisites cause outages", stageIndex: 2 },
        { type: "pain", text: "Rollback planning is improvised when things go wrong", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Identify", description: "Atlas surfaces missing and at-risk PTFs proactively" },
        { name: "Analyze", description: "Topology-aware impact analysis with prerequisite chain resolution" },
        { name: "Plan", description: "AI-generated test plan scoped to the specific change" },
        { name: "Provision", description: "Isolated test environment provisioned automatically" },
        { name: "Validate", description: "Automated smoke and function test execution with failure attribution" },
        { name: "Execute", description: "Orchestrated production apply with known-good rollback state preserved" },
      ],
      markers: [
        { type: "time", text: "Under 30 minutes for complete impact analysis", stageIndex: 1 },
        { type: "gain", text: "Prerequisite chains resolved automatically — no missed dependencies", stageIndex: 1 },
        { type: "gain", text: "Complete change record generated automatically with test evidence", stageIndex: 5 },
        { type: "skill", text: "Mid-level engineers can execute with Atlas guidance — reduced expert dependency", stageIndex: 2 },
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
    label: "Audit and Compliance",
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
        { name: "Collect", description: "Pull RACF exports, SMP/E data, and change logs separately" },
        { name: "Analyze", description: "Cross-reference findings in spreadsheets by hand" },
        { name: "Surface", description: "Discover gaps during the audit, not before" },
        { name: "Remediate", description: "Fix findings under time pressure during audit window" },
        { name: "Package", description: "Assemble evidence package manually from multiple exports" },
      ],
      markers: [
        { type: "time", text: "10–30 engineer-days for a large production estate", stageIndex: 1 },
        { type: "pain", text: "Undocumented changes discovered by auditors, not the internal team", stageIndex: 3 },
        { type: "pain", text: "Separation of duties analysis performed manually under deadline pressure", stageIndex: 2 },
        { type: "pain", text: "No proactive detection — gaps surface only when specifically looked for", stageIndex: 3 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms audit scope from continuous environment record" },
        { name: "Collect", description: "All evidence assembled automatically from live topology model" },
        { name: "Analyze", description: "Cross-source compliance analysis with severity classification" },
        { name: "Surface", description: "Proactive gap detection — Atlas finds issues before auditors do" },
        { name: "Remediate", description: "Atlas-generated remediation plans with validation before apply" },
        { name: "Package", description: "Structured auditor-ready artifact generated in minutes" },
      ],
      markers: [
        { type: "time", text: "Under 2 engineer-days — most evidence generated in hours", stageIndex: 1 },
        { type: "gain", text: "46 undocumented changes in 12 months surfaced proactively", stageIndex: 3 },
        { type: "gain", text: "Behavioral anomaly detection finds patterns no human thought to look for", stageIndex: 3 },
        { type: "gain", text: "Compliance professional can operate without deep z/OS expertise", stageIndex: 5 },
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
    label: "Staff Onboarding",
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
        { name: "Explore", description: "Read whatever documentation exists — frequently outdated" },
        { name: "Question", description: "Ask the one expert who is always too busy" },
        { name: "Learn", description: "Build mental model over months of trial and error" },
        { name: "First Change", description: "Execute first change with minimal guidance" },
      ],
      markers: [
        { type: "time", text: "3–6 months common for new systems programmer to reach independence", stageIndex: 3 },
        { type: "pain", text: "Critical knowledge lives in people's heads — when they retire, it's gone", stageIndex: 2 },
        { type: "pain", text: "No mechanism to systematically capture and transfer environmental knowledge", stageIndex: 2 },
        { type: "pain", text: "First changes carry high incident risk due to incomplete understanding", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Orient", description: "Atlas provides structured environment overview in first week" },
        { name: "Explore", description: "Natural language queries answer any environment question instantly" },
        { name: "Assess Risk", description: "Atlas proactively surfaces highest-priority open risks" },
        { name: "Document", description: "System Intelligence Brief generated as persistent knowledge artifact" },
        { name: "First Change", description: "Atlas-guided safe change execution with plan, test, and apply workflow" },
      ],
      markers: [
        { type: "time", text: "Under 4 weeks to independent contribution", stageIndex: 0 },
        { type: "gain", text: "Environment knowledge persists in Atlas regardless of staff turnover", stageIndex: 3 },
        { type: "gain", text: "Proactive risk surfacing shows what matters before the new hire knows to ask", stageIndex: 2 },
        { type: "skill", text: "Atlas replaces shadowing with queryable, always-current environment model", stageIndex: 1 },
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
    label: "Application Discovery and Dependency Analysis",
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
        { name: "Identify", description: "Developer identifies the application to analyze" },
        { name: "Investigate", description: "Contact Db2 DBA, CICS specialist, MQ team separately" },
        { name: "Compile", description: "Piece together dependency picture from multiple specialists" },
        { name: "Validate", description: "Cross-check findings manually — often incomplete" },
        { name: "Decide", description: "Scope change based on incomplete understanding" },
      ],
      markers: [
        { type: "time", text: "1–3 days for manual multi-team dependency analysis", stageIndex: 1 },
        { type: "pain", text: "Each specialist only knows their subsystem — cross-subsystem dependencies missed", stageIndex: 1 },
        { type: "pain", text: "Process is not reproducible — different engineers get different answers", stageIndex: 2 },
        { type: "pain", text: "Blast radius routinely underestimated before changes", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Identify", description: "User names the application or component" },
        { name: "Traverse", description: "Atlas traverses topology graph across all subsystems and LPARs" },
        { name: "Map", description: "Complete dependency map with connection types and shared resources" },
        { name: "Assess Risk", description: "Proactive risk identification during traversal" },
        { name: "Decide", description: "Blast radius quantified in applications, transactions, and data assets" },
      ],
      markers: [
        { type: "time", text: "Under 15 minutes for complete dependency analysis", stageIndex: 1 },
        { type: "gain", text: "Cross-subsystem lateral connections visible for the first time", stageIndex: 1 },
        { type: "gain", text: "Reproducible — same query returns same structured result every time", stageIndex: 2 },
        { type: "gain", text: "Developers and architects can self-serve without z/OS specialist involvement", stageIndex: 1 },
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
    label: "Change Readiness and Health Assessment",
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
        { name: "Plan", description: "Coordinate manual health check across multiple team members" },
        { name: "Review PTFs", description: "Check SMP/E for missing PTFs and HIPERs" },
        { name: "Review Security", description: "Check RACF panels for configuration issues" },
        { name: "Review Config", description: "Check Db2 ZPARMs and CICS settings separately" },
        { name: "Compile", description: "Assemble findings into informal summary" },
      ],
      markers: [
        { type: "time", text: "2–8 hours for manual multi-tool health review", stageIndex: 0 },
        { type: "pain", text: "Cross-subsystem compound risks never identified — each tool shows only its slice", stageIndex: 3 },
        { type: "pain", text: "No structured artifact produced — findings live in email and memory", stageIndex: 4 },
        { type: "pain", text: "Same checks repeated before every event with no historical comparison", stageIndex: 0 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "User defines scope — full environment or specific LPAR/stack" },
        { name: "Assess", description: "Atlas joins all configuration sources in single analysis" },
        { name: "Rank", description: "Findings organized by severity with compound risk identification" },
        { name: "Generate", description: "Structured health artifact produced for governance sign-off" },
        { name: "Baseline", description: "Post-assessment state registered for ongoing drift monitoring" },
      ],
      markers: [
        { type: "time", text: "Under 30 minutes for complete health assessment", stageIndex: 1 },
        { type: "gain", text: "Compound risks identified that no single tool can see", stageIndex: 1 },
        { type: "gain", text: "Health baseline enables trend comparison across events", stageIndex: 4 },
        { type: "gain", text: "Any team member can request health check — not just Zach", stageIndex: 1 },
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
    label: "Application Change Management",
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
        { name: "Understand", description: "Developer tries to understand what the change will touch" },
        { name: "Request Env", description: "File ticket for test environment — wait hours to days" },
        { name: "Code", description: "Write code with incomplete system context" },
        { name: "Test", description: "Manual testing against shared environment" },
        { name: "Deploy", description: "Multiple handoffs to infrastructure team for CICS/IMS config" },
      ],
      markers: [
        { type: "time", text: "1–3 days from assignment to first test run", stageIndex: 1 },
        { type: "pain", text: "Impact discovered in integration testing or production — too late to fix cheaply", stageIndex: 0 },
        { type: "pain", text: "No test automation — regression detection depends on individual discipline", stageIndex: 3 },
        { type: "pain", text: "Every change requires sysprog babysitting — creates bottleneck", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Understand", description: "Atlas shows exact blast radius before first line of code" },
        { name: "Plan", description: "AI-generated test plan scoped to the specific change" },
        { name: "Develop", description: "Code in IDE with Atlas context available" },
        { name: "Provision", description: "Isolated test environment ready in background" },
        { name: "Test", description: "Automated regression tests catch issues immediately" },
        { name: "Deploy", description: "Atlas orchestrates CICS/IMS configuration steps" },
      ],
      markers: [
        { type: "time", text: "Under 2 hours from assignment to first test run", stageIndex: 0 },
        { type: "gain", text: "Impact visible before coding — no surprises in production", stageIndex: 0 },
        { type: "gain", text: "Isolated environment — no contention with other developers", stageIndex: 3 },
        { type: "gain", text: "Developers self-serve — sysprog freed from babysitting routine changes", stageIndex: 4 },
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
    label: "Platform Upgrade and Migration",
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
        { name: "Research", description: "Review IBM upgrade guides and SMP/E compatibility notes" },
        { name: "Assess", description: "Manual compatibility check across applications" },
        { name: "Plan", description: "Sequencing determined by expert memory and spreadsheets" },
        { name: "Test", description: "Dedicated lab environment difficult to schedule" },
        { name: "Execute", description: "Production cutover with emergency rollback as safety net" },
      ],
      markers: [
        { type: "time", text: "Months of manual planning for a z/OS version upgrade", stageIndex: 0 },
        { type: "pain", text: "Compatibility issues discovered during testing or production cutover", stageIndex: 1 },
        { type: "pain", text: "Sequencing mistakes — wrong upgrade order for interdependent subsystems", stageIndex: 2 },
        { type: "pain", text: "Emergency rollbacks not uncommon due to missed dependencies", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Atlas scopes full compatibility impact across all LPARs in minutes" },
        { name: "Sequence", description: "AI-derived correct upgrade order from subsystem interdependencies" },
        { name: "Plan", description: "Phased, risk-ordered plan with remediation before production" },
        { name: "Test", description: "Each phase validated in isolated environment before promotion" },
        { name: "Execute", description: "Orchestrated promotion with named authorization at each gate" },
      ],
      markers: [
        { type: "time", text: "Compatibility assessment in under 1 day vs. weeks manually", stageIndex: 0 },
        { type: "gain", text: "Sequencing risks detected before execution — no wrong-order failures", stageIndex: 1 },
        { type: "gain", text: "Every phase tested in isolation — production is never the first test", stageIndex: 3 },
        { type: "skill", text: "Atlas applies compatibility knowledge automatically — no expert memorization required", stageIndex: 0 },
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
    label: "Environment Parity and Drift Control",
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
        { name: "Compare", description: "Manual parameter export and comparison in spreadsheets" },
        { name: "Detect", description: "Discover drift during incident or audit — not proactively" },
        { name: "Investigate", description: "Manually trace what changed and when" },
        { name: "Decide", description: "Assess whether drift is intentional or unauthorized" },
        { name: "Remediate", description: "Manual alignment or rollback with no structured plan" },
      ],
      markers: [
        { type: "time", text: "Drift discovered days to weeks after it occurs", stageIndex: 1 },
        { type: "pain", text: "No automated detection — relies on human observation or audit", stageIndex: 1 },
        { type: "pain", text: "QA environment drift from production is endemic — test results cannot be trusted", stageIndex: 0 },
        { type: "pain", text: "Unauthorized changes accumulate with no detection mechanism", stageIndex: 3 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Monitor", description: "Atlas compares environments continuously on schedule" },
        { name: "Detect", description: "Alert generated same day when drift exceeds threshold" },
        { name: "Classify", description: "Atlas classifies by risk type and checks change record correlation" },
        { name: "Decide", description: "Operator reviews evidence and chooses accept / escalate / remediate" },
        { name: "Remediate", description: "Atlas generates alignment plan and orchestrates execution" },
      ],
      markers: [
        { type: "time", text: "Same-day drift detection within one Atlas discovery cycle", stageIndex: 1 },
        { type: "gain", text: "Unauthorized changes flagged immediately with full evidence trail", stageIndex: 2 },
        { type: "gain", text: "QA parity confirmed on demand — no more 'test doesn't look like prod'", stageIndex: 0 },
        { type: "gain", text: "L2 operator can triage without escalating to Zach for basic facts", stageIndex: 3 },
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
    label: "Disaster Recovery Validation",
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
        { name: "Schedule", description: "DR test scheduled annually or quarterly" },
        { name: "Prepare", description: "Manual comparison of configuration snapshots before test" },
        { name: "Test", description: "Run DR test and discover failures" },
        { name: "Analyze", description: "Post-mortem identifies changes applied to prod but not DR" },
        { name: "Remediate", description: "Fix gaps under time pressure before next test cycle" },
      ],
      markers: [
        { type: "time", text: "DR readiness assessed only in weeks before scheduled test", stageIndex: 1 },
        { type: "pain", text: "Comparison relies on spreadsheets and team member memory", stageIndex: 1 },
        { type: "pain", text: "Failures are predictable in retrospect but preventable in advance", stageIndex: 2 },
        { type: "pain", text: "DR environment quietly diverges from production for months between tests", stageIndex: 0 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Monitor", description: "Atlas monitors DR environments daily against production" },
        { name: "Detect", description: "High-severity drift alerted as it appears — not weeks before test" },
        { name: "Predict", description: "Atlas models which drift items would cause test failure" },
        { name: "Simulate", description: "Isolated DR failover simulation under production-level load" },
        { name: "Certify", description: "Atlas-produced pass verdict before the actual test date" },
      ],
      markers: [
        { type: "time", text: "Continuous monitoring — not a point-in-time assessment", stageIndex: 0 },
        { type: "gain", text: "Pre-test simulation validates DR before real test depends on it", stageIndex: 3 },
        { type: "gain", text: "Failure impact prediction converts diff list into prioritized action plan", stageIndex: 2 },
        { type: "skill", text: "Atlas replaces expert memory with continuous automated comparison", stageIndex: 0 },
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
    label: "Capacity Planning and Performance Readiness",
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
        { name: "Forecast", description: "Manual analysis of prior-year SMF data in spreadsheets" },
        { name: "Size", description: "Configuration sizing by experience and rule of thumb" },
        { name: "Test", description: "Performance testing skipped due to lab scheduling difficulty" },
        { name: "Monitor", description: "Discover constraints during production incidents" },
        { name: "Diagnose", description: "Multi-team conference call to trace root cause" },
      ],
      markers: [
        { type: "time", text: "Root cause diagnosis takes 1–3 business days across specialist teams", stageIndex: 4 },
        { type: "pain", text: "Capacity planning relies on institutional memory of one or two engineers", stageIndex: 0 },
        { type: "pain", text: "Post-change performance regression discovered by accident or user complaint", stageIndex: 3 },
        { type: "pain", text: "Dark capacity is invisible — teams procure capacity they already have", stageIndex: 1 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Project", description: "Atlas models load projection against current configuration" },
        { name: "Identify", description: "Constraint identification with headroom quantification" },
        { name: "Plan", description: "Configuration change plan with validated test criteria" },
        { name: "Validate", description: "Isolated environment testing at simulated load before production" },
        { name: "Monitor", description: "Continuous threshold alerting before breach during live events" },
      ],
      markers: [
        { type: "time", text: "Root cause identified in under 2 hours in a single conversation", stageIndex: 4 },
        { type: "gain", text: "Proactive constraint discovery before peak events — not during them", stageIndex: 1 },
        { type: "gain", text: "Post-change regression detected same day via automated correlation", stageIndex: 3 },
        { type: "skill", text: "Atlas replaces multi-team investigation with unified cross-pillar analysis", stageIndex: 4 },
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
    label: "Application Modernization",
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
        { name: "Research", description: "Manual code reading and asking remaining experts" },
        { name: "Assess", description: "Incomplete technical debt picture from static analysis" },
        { name: "Plan", description: "Modernization plan built on incomplete understanding" },
        { name: "Change", description: "High-risk changes to tightly coupled code with unknown blast radius" },
        { name: "Validate", description: "Limited regression testing — issues found in production" },
      ],
      markers: [
        { type: "time", text: "Research phase takes weeks or months for large legacy applications", stageIndex: 0 },
        { type: "pain", text: "People who built the applications are often gone — knowledge lost", stageIndex: 0 },
        { type: "pain", text: "Monolithic shared copybooks — change one field, affect 47 programs unpredictably", stageIndex: 3 },
        { type: "pain", text: "Modernization plans built on incomplete understanding cause production incidents", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Atlas produces technical debt assessment in minutes" },
        { name: "Prioritize", description: "Architect reviews and selects modernization workstreams" },
        { name: "Plan", description: "Phased remediation plan with risk-ordered sequencing" },
        { name: "Execute", description: "Code changes validated in isolation before production" },
        { name: "Validate", description: "Regression and behavioral testing at each phase" },
      ],
      markers: [
        { type: "time", text: "Technical debt assessment in under 1 week vs. weeks manually", stageIndex: 0 },
        { type: "gain", text: "Field usage analysis shows which of 312 copybook fields can be separated safely", stageIndex: 0 },
        { type: "gain", text: "Deprecated API usage mapped across all 12 affected programs automatically", stageIndex: 0 },
        { type: "skill", text: "Atlas provides the topology awareness that makes modernization tractable", stageIndex: 2 },
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
    label: "Regulatory Change Response",
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
        { name: "Discover", description: "Manual inventory of regulated data across multiple teams" },
        { name: "Assess", description: "Security team reviews RACF; DBA reviews Db2; app team identifies data touchpoints" },
        { name: "Plan", description: "Multi-team project plan assembled by hand" },
        { name: "Remediate", description: "Execute changes with minimal cross-workstream coordination" },
        { name: "Verify", description: "Limited post-remediation verification" },
      ],
      markers: [
        { type: "time", text: "2–4 weeks for manual regulated data inventory across the estate", stageIndex: 0 },
        { type: "pain", text: "No one has the full picture until it is assembled by hand", stageIndex: 1 },
        { type: "pain", text: "Post-remediation verification minimal — new gaps discovered at next audit", stageIndex: 4 },
        { type: "pain", text: "Remediation sequencing errors cause production batch job failures", stageIndex: 3 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms regulatory scope from classification criteria" },
        { name: "Inventory", description: "All regulated data discovered across datasets, Db2, IMS, VSAM in hours" },
        { name: "Analyze", description: "Gap analysis with access control, encryption, and audit trail assessment" },
        { name: "Sequence", description: "Safe remediation order with cross-workstream dependency awareness" },
        { name: "Execute", description: "Orchestrated remediation with 48-hour post-change monitoring" },
        { name: "Monitor", description: "Continuous detection of new regulated data after initial remediation" },
      ],
      markers: [
        { type: "time", text: "Complete inventory in under 1 day vs. weeks manually", stageIndex: 1 },
        { type: "gain", text: "Dependency-aware sequencing prevents production batch failures", stageIndex: 3 },
        { type: "gain", text: "New regulated datasets detected post-remediation before next audit cycle", stageIndex: 5 },
        { type: "skill", text: "Atlas replaces multi-team manual project with unified automated workflow", stageIndex: 1 },
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
    label: "Change Governance and Traceability",
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
        { name: "Change", description: "Changes applied via ISPF, operator commands, SMP/E" },
        { name: "Record", description: "Change record created manually after the fact" },
        { name: "Review", description: "Operations manager has no visibility into out-of-window changes" },
        { name: "Audit", description: "Auditors discover gaps in change traceability" },
        { name: "Remediate", description: "Retroactive documentation under audit pressure" },
      ],
      markers: [
        { type: "pain", text: "Significant fraction of changes have no associated change record", stageIndex: 1 },
        { type: "pain", text: "Emergency changes frequently miss records entirely", stageIndex: 1 },
        { type: "pain", text: "No automated detection of changes outside change windows", stageIndex: 2 },
        { type: "pain", text: "46 undocumented changes in 12 months discovered during audit", stageIndex: 3 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Execute", description: "Every Atlas-executed change automatically attributed and recorded" },
        { name: "Detect", description: "Config-as-Code baseline diff identifies out-of-Atlas changes" },
        { name: "Correlate", description: "Atlas cross-references against ServiceNow change records" },
        { name: "Alert", description: "Unauthorized and out-of-window changes surfaced immediately" },
        { name: "Remediate", description: "Atlas generates rollback or documentation plan" },
      ],
      markers: [
        { type: "gain", text: "100% change record coverage for Atlas-executed changes", stageIndex: 0 },
        { type: "gain", text: "Undocumented changes detected within 24 hours, not at next audit", stageIndex: 1 },
        { type: "gain", text: "Complete audit trail generated automatically — no manual assembly", stageIndex: 3 },
        { type: "skill", text: "Atlas replaces after-the-fact record creation with continuous attribution", stageIndex: 0 },
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