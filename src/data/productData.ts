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

export interface FlowDiagram {
  title: string;
  stages: FlowStage[];
  markers: FlowMarker[];
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
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — proactive monitoring surfaces risk before it is asked", description: "Atlas surfaces a FIXCAT security gap without a user query — shortening the detection-to-response window from 'whenever the advisory reaches the right person' to 'when Atlas's next PTF currency check runs.'", stageIndex: 0 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage can act on a finding without depending on Zach", description: "Proactive alert means Sage can initiate a CISO brief immediately rather than waiting for Zach's investigation to complete.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–3 business days → under 10 minutes", description: "'Are we exposed?' answered in seconds — Atlas queries all connected LPARs simultaneously. No ISPF. No SMP/E dialogs.", stageIndex: 1 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage gains direct access to exposure facts", description: "Real exposure data rather than Zach's verbal summary — Sage can independently verify exposure scope without going through Zach first.", stageIndex: 1 },
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — multi-source topology traversal from ZUnderstand, impossible manually", description: "Blast radius is a topology map, not a guess. Atlas traverses the dependency graph and names every reachable system — coverage confidence surfaced alongside the map.", stageIndex: 2 },
        { persona: "Sage", type: "time", title: "Time Saving — 1–3 days → under 30 minutes", description: "Real blast radius map allows Sage to produce a CISO-ready exposure brief in minutes, not after a multi-day investigation.", stageIndex: 2 },
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — cross-source risk compounding only possible with Atlas's unified model", description: "Compound risk identification: Atlas surfaces combinations of findings (missing security PTF + unencrypted IPIC connection) that create compound risk invisible to any single tool.", stageIndex: 2 },
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — Atlas resolves co-requisite chains without Zach navigating SMP/E resolution rules", description: "Every PTF prerequisite resolved automatically — eliminating the leading cause of PTF-related production outages.", stageIndex: 3 },
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — Atlas flags this without being asked", description: "DR exposure flagged proactively while production is being remediated — the failure mode that leads to breaches.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–5 days → automated provisioning", description: "Test environment available; no manual provisioning lag before the validation step can begin.", stageIndex: 4 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently executes delegated steps", description: "Step-by-step execution guidance generated for each delegated LPAR apply — Alice can execute safely without Zach in the room.", stageIndex: 4 },
        { persona: "Alice", type: "gain", title: "Atlas AI & Automation — configuration update generated automatically from test failure", description: "If a test fails, Atlas identifies the specific dependency and generates the required fix (e.g., CSD update) in real time.", stageIndex: 4 },
        { persona: "Zach", type: "time", title: "Time Saving — decision is made from a complete picture, not assembled from multiple sources", description: "Clear recommendation with supporting evidence — test results, prerequisite resolution, blast radius, DR status — all in one place for the authorization decision.", stageIndex: 5 },
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — shared dependency ordering computed and enforced automatically", description: "Dependency-aware sequencing prevents knock-on failures during multi-LPAR apply. Progress visible in real time.", stageIndex: 6 },
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — proactive behavioral monitoring during the exposure window", description: "Exploitation activity detected during remediation window surfaces immediately — Atlas surfaces anomalies without being asked.", stageIndex: 7 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage has independent visibility into DR remediation status", description: "DR exposure remains tracked and flagged until DR remediation is confirmed complete — no silent failover risk.", stageIndex: 7 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–4 hours manual assembly → automatic", description: "Complete audit trail generated automatically — exposure assessment, blast radius, plan, test results, apply log, authorization chain. Zero manual assembly.", stageIndex: 8 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage produces the evidence package without Zach's involvement", description: "CISO-ready evidence package available immediately at close — auditor-ready without further effort.", stageIndex: 8 },
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
        { persona: "Zach", type: "gain", title: "Atlas AI & Automation — prerequisite chains resolved automatically", description: "No missed dependencies — Atlas resolves every co-requisite before apply.", stageIndex: 1 },
        { persona: "Quinn", type: "gain", title: "New User Capability — complete change record with test evidence", description: "Full audit trail and test evidence generated automatically at close.", stageIndex: 5 },
        { persona: "Alice", type: "gain", title: "New User Capability — mid-level engineers execute with Atlas guidance", description: "Step-by-step execution guidance reduces expert dependency.", stageIndex: 2 },
        { persona: "Stan", type: "gain", title: "Atlas AI & Automation — cross-subsystem impact visible before apply", description: "CICS regions, Db2 connections, and MQ channels stay stable during patch apply.", stageIndex: 1 },
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
        { type: "time", text: "Derek: 10–30 engineer-days for large production estate", stageIndex: 1 },
        { type: "pain", text: "Derek: Undocumented changes discovered by auditors, not internal team", stageIndex: 3 },
        { type: "pain", text: "Sage: Separation of duties analysis performed manually under deadline", stageIndex: 2 },
        { type: "pain", text: "Derek: No proactive detection — gaps surface only when specifically looked for", stageIndex: 3 },
        { type: "pain", text: "Quinn: Audit findings must be remediated immediately, disrupting planned work", stageIndex: 4 },
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
        { type: "time", text: "Derek: Under 2 engineer-days — evidence generated in hours", stageIndex: 1 },
        { type: "gain", text: "Derek: 46 undocumented changes in 12 months surfaced proactively", stageIndex: 3 },
        { type: "gain", text: "Sage: Behavioral anomaly detection finds patterns no human thought to look for", stageIndex: 3 },
        { type: "gain", text: "Derek: Compliance professional operates without deep z/OS expertise required", stageIndex: 5 },
        { type: "gain", text: "Quinn: Proactive remediation — audit findings addressed before audit window", stageIndex: 4 },
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
        { type: "time", text: "Chris: 3–6 months common before reaching independence", stageIndex: 3 },
        { type: "pain", text: "Chris: No intuitive on-ramp — z/OS documentation is dense and assumes knowledge", stageIndex: 1 },
        { type: "pain", text: "Zach: Critical knowledge lives in people's heads — lost when they retire", stageIndex: 2 },
        { type: "pain", text: "Chris: First changes carry high incident risk due to incomplete understanding", stageIndex: 4 },
        { type: "skill", text: "Alice: No systematic mechanism to transfer environmental knowledge", stageIndex: 2 },
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
        { type: "time", text: "Chris: Under 4 weeks to independent contribution", stageIndex: 0 },
        { type: "gain", text: "Chris: Environment knowledge persists in Atlas regardless of staff turnover", stageIndex: 3 },
        { type: "gain", text: "Chris: Proactive risk surfacing shows what matters before new hire knows to ask", stageIndex: 2 },
        { type: "skill", text: "Alice: Atlas replaces shadowing with queryable, current environment model", stageIndex: 1 },
        { type: "gain", text: "Zach: Critical knowledge captured and preserved — reduces retirement impact", stageIndex: 2 },
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
        { type: "time", text: "Angie: 1–3 days for manual multi-team analysis", stageIndex: 1 },
        { type: "pain", text: "Angie: Each specialist only knows their subsystem — lateral dependencies missed", stageIndex: 1 },
        { type: "pain", text: "Kathleen: Process not reproducible — different engineers get different answers", stageIndex: 2 },
        { type: "pain", text: "Angie: Blast radius routinely underestimated before changes", stageIndex: 4 },
        { type: "pain", text: "Zach: Developers require sysprog involvement — creates bottleneck", stageIndex: 1 },
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
        { type: "time", text: "Angie: Under 15 minutes for complete analysis", stageIndex: 1 },
        { type: "gain", text: "Angie: Cross-subsystem lateral connections visible for the first time", stageIndex: 1 },
        { type: "gain", text: "Kathleen: Reproducible — same query returns same result every time", stageIndex: 2 },
        { type: "gain", text: "Angie: Developers self-serve without z/OS specialist involvement", stageIndex: 1 },
        { type: "skill", text: "Greg: Infrastructure visibility across full stack enables architecture decisions", stageIndex: 3 },
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
        { type: "time", text: "Zach: 2–8 hours for manual multi-tool health review", stageIndex: 0 },
        { type: "pain", text: "Zach: Cross-subsystem compound risks never identified — each tool shows only slice", stageIndex: 3 },
        { type: "pain", text: "Derek: No structured artifact produced — findings live in email and memory", stageIndex: 4 },
        { type: "pain", text: "Quinn: Same checks repeated before every event with no historical comparison", stageIndex: 0 },
        { type: "skill", text: "Zach: Only Zach has context to identify cross-tool implications", stageIndex: 2 },
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
        { type: "time", text: "Zach: Under 30 minutes for complete assessment", stageIndex: 1 },
        { type: "gain", text: "Zach: Compound risks identified that no single tool can see", stageIndex: 1 },
        { type: "gain", text: "Derek: Structured artifact enables governance review", stageIndex: 3 },
        { type: "gain", text: "Quinn: Health baseline enables trend comparison across events", stageIndex: 4 },
        { type: "skill", text: "Quinn: Any team member can request health check — not just Zach", stageIndex: 1 },
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
        { name: "Understand", description: "Developer tries to understand what change will touch" },
        { name: "Request Env", description: "File ticket for environment — wait hours to days" },
        { name: "Code", description: "Write code with incomplete system context" },
        { name: "Test", description: "Manual testing against shared environment" },
        { name: "Deploy", description: "Multiple handoffs to infrastructure team" },
      ],
      markers: [
        { type: "time", text: "Deb: 1–3 days from assignment to first test run", stageIndex: 1 },
        { type: "pain", text: "Deb: Impact discovered in integration or production — too late", stageIndex: 0 },
        { type: "pain", text: "Kathleen: No test automation — regression depends on individual discipline", stageIndex: 3 },
        { type: "pain", text: "Deb: Every change requires sysprog babysitting — creates bottleneck", stageIndex: 4 },
        { type: "skill", text: "Zach: Application developers cannot self-serve — expert dependency", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Understand", description: "Atlas shows exact blast radius before first code line" },
        { name: "Plan", description: "AI-generated test plan scoped to change" },
        { name: "Develop", description: "Code in IDE with Atlas context available" },
        { name: "Provision", description: "Isolated test environment ready in background" },
        { name: "Test", description: "Automated regression tests catch issues immediately" },
        { name: "Deploy", description: "Atlas orchestrates CICS/IMS configuration" },
      ],
      markers: [
        { type: "time", text: "Deb: Under 2 hours from assignment to test", stageIndex: 0 },
        { type: "gain", text: "Deb: Impact visible before coding — no production surprises", stageIndex: 0 },
        { type: "gain", text: "Kathleen: Isolated environment — no contention with other developers", stageIndex: 3 },
        { type: "gain", text: "Kathleen: Self-serve change — sysprog freed from routine tasks", stageIndex: 4 },
        { type: "gain", text: "Angie: Architecture decisions informed by real impact data", stageIndex: 0 },
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
        { name: "Research", description: "Review IBM upgrade guides and compatibility notes" },
        { name: "Assess", description: "Manual compatibility check across applications" },
        { name: "Plan", description: "Sequencing by expert memory and spreadsheets" },
        { name: "Test", description: "Dedicated lab environment difficult to schedule" },
        { name: "Execute", description: "Production cutover with emergency rollback" },
      ],
      markers: [
        { type: "time", text: "Zach: Months of manual planning for z/OS version upgrade", stageIndex: 0 },
        { type: "pain", text: "Zach: Compatibility issues discovered during test or production", stageIndex: 1 },
        { type: "pain", text: "Zach: Sequencing mistakes — wrong order for interdependent subsystems", stageIndex: 2 },
        { type: "pain", text: "Greg: Emergency rollbacks not uncommon due to missed dependencies", stageIndex: 4 },
        { type: "pain", text: "Alice: High-risk change without data to support sequencing", stageIndex: 0 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Atlas scopes compatibility across all LPARs" },
        { name: "Sequence", description: "AI-derived correct upgrade order from interdependencies" },
        { name: "Plan", description: "Phased risk-ordered plan with pre-production remediation" },
        { name: "Test", description: "Each phase validated in isolated environment" },
        { name: "Execute", description: "Orchestrated promotion with named authorization" },
      ],
      markers: [
        { type: "time", text: "Zach: Compatibility assessment in under 1 day vs. weeks", stageIndex: 0 },
        { type: "gain", text: "Zach: Sequencing risks detected before execution", stageIndex: 1 },
        { type: "gain", text: "Alice: Every phase tested in isolation — production never first test", stageIndex: 3 },
        { type: "skill", text: "Greg: Atlas applies compatibility knowledge automatically", stageIndex: 0 },
        { type: "gain", text: "Angie: Application compatibility visible to architecture team", stageIndex: 0 },
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
        { name: "Compare", description: "Manual parameter export and spreadsheet comparison" },
        { name: "Detect", description: "Discover drift during incident or audit — not proactively" },
        { name: "Investigate", description: "Manually trace what changed and when" },
        { name: "Decide", description: "Assess whether drift is intentional or unauthorized" },
        { name: "Remediate", description: "Manual alignment or rollback" },
      ],
      markers: [
        { type: "time", text: "Annette: Drift discovered days to weeks after it occurs", stageIndex: 1 },
        { type: "pain", text: "Annette: No automated detection — relies on human observation", stageIndex: 1 },
        { type: "pain", text: "Greg: QA environment drift from production is endemic", stageIndex: 0 },
        { type: "pain", text: "Zach: Unauthorized changes accumulate with no detection", stageIndex: 3 },
        { type: "pain", text: "Alex: Test results cannot be trusted due to environment drift", stageIndex: 0 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Monitor", description: "Atlas compares environments continuously" },
        { name: "Detect", description: "Alert generated same day when drift exceeds threshold" },
        { name: "Classify", description: "Atlas classifies by risk and checks change correlation" },
        { name: "Decide", description: "Operator reviews evidence and chooses action" },
        { name: "Remediate", description: "Atlas generates alignment plan and orchestrates" },
      ],
      markers: [
        { type: "time", text: "Annette: Same-day drift detection within one cycle", stageIndex: 1 },
        { type: "gain", text: "Zach: Unauthorized changes flagged immediately with evidence", stageIndex: 2 },
        { type: "gain", text: "Greg: QA parity confirmed on demand — test validity assured", stageIndex: 0 },
        { type: "gain", text: "Annette: L2 operator can triage without escalating to Zach", stageIndex: 3 },
        { type: "gain", text: "Alex: Configuration drift correlation speeds performance root cause", stageIndex: 4 },
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
        { name: "Schedule", description: "DR test scheduled annually or quarterly" },
        { name: "Prepare", description: "Manual configuration comparison before test" },
        { name: "Test", description: "Run DR test and discover failures" },
        { name: "Analyze", description: "Post-mortem identifies changes not applied to DR" },
        { name: "Remediate", description: "Fix gaps under time pressure before next cycle" },
      ],
      markers: [
        { type: "time", text: "Greg: Readiness assessed only weeks before scheduled test", stageIndex: 1 },
        { type: "pain", text: "Greg: Comparison relies on spreadsheets and memory", stageIndex: 1 },
        { type: "pain", text: "Zach: Failures are predictable in retrospect but preventable", stageIndex: 2 },
        { type: "pain", text: "Quinn: DR environment diverges for months between tests", stageIndex: 0 },
        { type: "pain", text: "Derek: Test failures create audit trail problems", stageIndex: 2 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Monitor", description: "Atlas monitors DR environments daily against production" },
        { name: "Detect", description: "High-severity drift alerted same day" },
        { name: "Predict", description: "Atlas models which drift would cause test failure" },
        { name: "Simulate", description: "Isolated DR failover under production-level load" },
        { name: "Certify", description: "Atlas-produced pass verdict before actual test" },
      ],
      markers: [
        { type: "time", text: "Greg: Continuous monitoring — not point-in-time assessment", stageIndex: 0 },
        { type: "gain", text: "Greg: Pre-test simulation validates DR before test depends on it", stageIndex: 3 },
        { type: "gain", text: "Zach: Failure impact prediction converts diff into action plan", stageIndex: 2 },
        { type: "skill", text: "Quinn: Atlas replaces expert memory with continuous automation", stageIndex: 0 },
        { type: "gain", text: "Derek: Audit trail shows proactive DR readiness, not test failure", stageIndex: 2 },
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
        { type: "time", text: "Alex: Root cause diagnosis takes 1–3 business days", stageIndex: 4 },
        { type: "pain", text: "Alex: Capacity planning relies on institutional memory", stageIndex: 0 },
        { type: "pain", text: "Quinn: Post-change performance regression discovered by accident", stageIndex: 3 },
        { type: "pain", text: "Annette: Dark capacity invisible — teams procure what they have", stageIndex: 1 },
        { type: "skill", text: "Zach: Diagnosis requires expert across multiple disciplines", stageIndex: 4 },
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
        { type: "time", text: "Alex: Root cause identified in under 2 hours", stageIndex: 4 },
        { type: "gain", text: "Alex: Proactive constraint discovery before peak events", stageIndex: 1 },
        { type: "gain", text: "Quinn: Post-change regression detected same day", stageIndex: 3 },
        { type: "skill", text: "Annette: Unified cross-pillar analysis replaces multi-team investigation", stageIndex: 4 },
        { type: "gain", text: "Zach: Dark capacity discovered and mapped — no wasted capacity", stageIndex: 1 },
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
        { name: "Research", description: "Manual code reading and asking remaining experts" },
        { name: "Assess", description: "Incomplete technical debt from static analysis" },
        { name: "Plan", description: "Modernization plan built on incomplete understanding" },
        { name: "Change", description: "High-risk changes with unknown blast radius" },
        { name: "Validate", description: "Limited regression testing — issues found in production" },
      ],
      markers: [
        { type: "time", text: "Angie: Research takes weeks or months for large apps", stageIndex: 0 },
        { type: "pain", text: "Angie: People who built apps are gone — knowledge lost", stageIndex: 0 },
        { type: "pain", text: "Deb: Monolithic shared copybooks — one field change affects 47 programs", stageIndex: 3 },
        { type: "pain", text: "Angie: Modernization plans cause production incidents", stageIndex: 4 },
        { type: "pain", text: "Kathleen: No way to understand which apps depend on deprecated APIs", stageIndex: 2 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Atlas produces technical debt assessment" },
        { name: "Prioritize", description: "Architect reviews and selects workstreams" },
        { name: "Plan", description: "Phased plan with risk-ordered sequencing" },
        { name: "Execute", description: "Code changes validated in isolation before production" },
        { name: "Validate", description: "Regression and behavioral testing at each phase" },
      ],
      markers: [
        { type: "time", text: "Angie: Assessment in under 1 week vs. weeks manually", stageIndex: 0 },
        { type: "gain", text: "Angie: Field usage analysis shows which fields can separate safely", stageIndex: 0 },
        { type: "gain", text: "Kathleen: Deprecated API usage mapped across all 12 affected programs", stageIndex: 0 },
        { type: "skill", text: "Deb: Atlas provides topology awareness that makes modernization tractable", stageIndex: 2 },
        { type: "gain", text: "Greg: Modernization roadmap credible to business leadership", stageIndex: 4 },
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
        { name: "Discover", description: "Manual inventory of regulated data across teams" },
        { name: "Assess", description: "Security team + DBA + app team each review separately" },
        { name: "Plan", description: "Multi-team project plan assembled by hand" },
        { name: "Remediate", description: "Execute with minimal cross-workstream coordination" },
        { name: "Verify", description: "Limited post-remediation verification" },
      ],
      markers: [
        { type: "time", text: "Sage: 2–4 weeks for manual regulated data inventory", stageIndex: 0 },
        { type: "pain", text: "Derek: No one has full picture until assembled by hand", stageIndex: 1 },
        { type: "pain", text: "Quinn: Minimal post-remediation verification", stageIndex: 4 },
        { type: "pain", text: "Lupita: Encryption assessment manual across multiple keystores", stageIndex: 1 },
        { type: "pain", text: "Derek: New gaps discovered at next audit — not before", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms regulatory scope from classification" },
        { name: "Inventory", description: "Regulated data discovered across all stores in hours" },
        { name: "Analyze", description: "Gap analysis with encryption and audit trail assessment" },
        { name: "Sequence", description: "Safe remediation order with cross-workstream awareness" },
        { name: "Execute", description: "Orchestrated remediation with 48-hour monitoring" },
        { name: "Monitor", description: "Continuous detection of new regulated data" },
      ],
      markers: [
        { type: "time", text: "Sage: Complete inventory in under 1 day vs. weeks", stageIndex: 1 },
        { type: "gain", text: "Derek: Full picture assembled automatically — no hand assembly", stageIndex: 1 },
        { type: "gain", text: "Lupita: Encryption dependency mapping at scale", stageIndex: 1 },
        { type: "gain", text: "Zach: Dependency-aware sequencing prevents batch failures", stageIndex: 3 },
        { type: "gain", text: "Quinn: New datasets detected post-remediation before audit cycle", stageIndex: 5 },
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
        { name: "Change", description: "Changes applied via ISPF, commands, SMP/E" },
        { name: "Record", description: "Change record created manually after the fact" },
        { name: "Review", description: "Operations manager has no visibility into out-of-window changes" },
        { name: "Audit", description: "Auditors discover gaps in traceability" },
        { name: "Remediate", description: "Retroactive documentation under audit pressure" },
      ],
      markers: [
        { type: "pain", text: "Quinn: Significant fraction of changes have no record", stageIndex: 1 },
        { type: "pain", text: "Derek: Emergency changes frequently miss records entirely", stageIndex: 1 },
        { type: "pain", text: "Zach: No detection of out-of-window changes", stageIndex: 2 },
        { type: "pain", text: "Derek: 46 undocumented changes in 12 months discovered during audit", stageIndex: 3 },
        { type: "pain", text: "Quinn: No mechanism to correlate config changes to ServiceNow records", stageIndex: 2 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Execute", description: "Every Atlas change auto-attributed and recorded" },
        { name: "Detect", description: "Config diff identifies out-of-Atlas changes" },
        { name: "Correlate", description: "Atlas cross-references against change records" },
        { name: "Alert", description: "Unauthorized and out-of-window changes surfaced" },
        { name: "Remediate", description: "Atlas generates rollback or documentation plan" },
      ],
      markers: [
        { type: "gain", text: "Quinn: 100% record coverage for Atlas-executed changes", stageIndex: 0 },
        { type: "gain", text: "Derek: Undocumented changes detected within 24 hours", stageIndex: 1 },
        { type: "gain", text: "Derek: Complete audit trail generated automatically", stageIndex: 3 },
        { type: "gain", text: "Zach: Out-of-window changes flagged immediately", stageIndex: 2 },
        { type: "skill", text: "Quinn: Atlas replaces after-fact record creation with continuous attribution", stageIndex: 0 },
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