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

export const TIER_1_PERSONAS = ["Zach", "Stan", "Angie", "Kathleen", "Sage"];

export function isTier1Persona(name: string): boolean {
  return TIER_1_PERSONAS.includes(name);
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

export interface SynergyRating {
  bobPpz: "High" | "Medium" | "Low" | "None";
  concert4z: "High" | "Medium" | "Low" | "None";
  terraform: "High" | "Medium" | "Low" | "None";
}

export function getSynergyRating(useCaseId: string): SynergyRating {
  const uc = useCaseDetails[useCaseId]?.toBe;
  const touchpoints = uc?.externalTouchpoints || [];

  function ratingFor(product: string): "High" | "Medium" | "Low" | "None" {
    const productTps = touchpoints.filter((tp) => tp.product.toLowerCase().replace(/\s+/g, "-") === product);
    if (productTps.length === 0) return "None";
    const handoffs = productTps.filter((tp) => tp.type === "handoff").length;
    const enrichments = productTps.filter((tp) => tp.type === "enrichment").length;
    if (handoffs >= 2 || (handoffs >= 1 && enrichments >= 2)) return "High";
    if (handoffs >= 1 || enrichments >= 2) return "Medium";
    return "Low";
  }

  return {
    bobPpz: ratingFor("bob-ppz"),
    concert4z: ratingFor("concert4z"),
    terraform: ratingFor("terraform"),
  };
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
    connections: ["atlas", "uc-02", "uc-05"],
  },
  {
    id: "change",
    label: "Change Intelligence",
    type: "changeIntelligence",
    description: "Change safely — impact analysis, planning, testing, provisioning. GA Dec 2026 (MVP); H1 2027 (full).",
    connections: ["atlas", "uc-06", "uc-07", "uc-08", "uc-09", "uc-12"],
  },
  {
    id: "predictive",
    label: "Predictive Intelligence",
    type: "predictiveIntelligence",
    description: "Stay ahead — drift detection, anomaly prediction, DR readiness. H2 2027.",
    connections: ["atlas", "uc-01", "uc-03", "uc-04", "uc-10", "uc-11"],
  },
  {
    id: "uc-01",
    label: "UC-01: Audit and Compliance",
    type: "useCase",
    description: "Generate structured, auditor-ready compliance evidence from a continuous environment record.",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "uc-02",
    label: "UC-02: Staff Onboarding",
    type: "useCase",
    description: "Get new team members productive fast with AI-guided environment orientation and knowledge transfer.",
    connections: ["system", "change"],
  },
  {
    id: "uc-03",
    label: "UC-03: Regulatory Change Response",
    type: "useCase",
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, and sequenced remediation — from new regulation announced to evidence package delivered.",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "uc-04",
    label: "UC-04: Change Readiness and Health Assessment",
    type: "useCase",
    description: "Structured, repeatable health assessment joining configuration state, security posture, PTF currency, and performance constraints into one artifact — in minutes, not hours.",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "uc-05",
    label: "UC-05: Change Governance and Traceability",
    type: "useCase",
    description: "Complete change attribution, undocumented change detection, and ITSM integration for audit readiness — closing the gap between what happened on z/OS and what the change management system knows.",
    connections: ["change", "system", "predictive"],
  },
  {
    id: "uc-06",
    label: "UC-06: Patch Management",
    type: "useCase",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with full audit trail.",
    connections: ["change", "system"],
  },
  {
    id: "uc-07",
    label: "UC-07: Application Change Management",
    type: "useCase",
    description: "Developer-native change lifecycle with impact analysis, test generation, and deployment orchestration.",
    connections: ["change", "system", "predictive"],
  },
  {
    id: "uc-08",
    label: "UC-08: Platform Upgrade and Migration",
    type: "useCase",
    description: "Major z/OS and middleware upgrade planning with compatibility assessment and phased execution.",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "uc-09",
    label: "UC-09: Application Modernization",
    type: "useCase",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization — turning 'we cannot safely touch this' into a phased, validated, risk-controlled project.",
    connections: ["system", "change", "predictive"],
  },
  {
    id: "uc-10",
    label: "UC-10: Environment Parity and Drift Control",
    type: "useCase",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation — detecting drift before a human notices a behavioral symptom.",
    connections: ["predictive", "system", "change"],
  },
  {
    id: "uc-11",
    label: "UC-11: Disaster Recovery Validation",
    type: "useCase",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation — treating DR readiness as a continuous, measurable state rather than an annual test event.",
    connections: ["predictive", "system", "change"],
  },
  {
    id: "uc-12",
    label: "UC-12: Capacity Planning and Performance Readiness",
    type: "useCase",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes — replacing reactive firefighting with proactive capacity management.",
    connections: ["predictive", "system", "change"],
  },
];

export const useCaseDetails: Record<string, UseCaseDetail> = {
  "uc-01": {
    id: "uc-01",
    label: "UC-01: Audit and Compliance",
    description: "Generate structured, auditor-ready compliance evidence from a continuous environment record.",
    personas: [
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Primary" },
      { name: "Sage", role: "Security Administrator", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Scope", description: "The audit cycle opens. Derek defines what evidence is needed and begins identifying which systems, frameworks, and time periods are in scope." },
        { name: "Collect", description: "Assemble evidence from RACF, change logs, SMP/E records, configuration exports, and ITSM systems." },
        { name: "Analyze", description: "Analyze collected evidence against compliance framework requirements — privileged access analysis, separation of duties, configuration baseline comparison, change record correlation." },
        { name: "Surface Gaps", description: "Identify undocumented changes, dormant privileged accounts, configuration deviations, and behavioral anomalies in the access record." },
        { name: "Remediate", description: "For deviations found before the audit, correct them — RACF changes, configuration fixes, retroactive change records." },
        { name: "Generate Package", description: "Produce the evidence package — compliance report, privileged access report, change history, configuration snapshots — in a format auditors can use." },
        { name: "Monitor", description: "Between audit cycles, maintain ongoing awareness of compliance posture." },
      ],
      markers: [
        { persona: "Derek", type: "time", title: "Lost Time — 1–3 days to understand what evidence can even be assembled", description: "Scoping an IBM Z audit requires coordinating with Zach, Sage, and multiple subsystem teams just to understand what evidence is available — no unified inventory.", stageIndex: 0 },
        { persona: "Derek", type: "skill", title: "Skill Gap / Bottleneck — Derek cannot self-serve any z/OS evidence without expert support", description: "Does not have deep z/OS technical expertise; translating audit requirements into system queries requires escalating to Zach or Sage for every domain.", stageIndex: 0 },
        { persona: "Sage", type: "time", title: "Lost Time — 3–5 business days for multi-LPAR RACF evidence collection", description: "Privileged access reports require manually querying RACF across each LPAR and consolidating results by hand. For a 6-LPAR estate, this is a multi-day task.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 days of manual configuration comparison work", description: "Configuration compliance requires experienced engineers comparing PARMLIB exports in spreadsheets — no automated diff against a defined baseline.", stageIndex: 1 },
        { persona: "Derek", type: "time", title: "Lost Time — 3–5 days of cross-system evidence assembly", description: "Change history requires reconciling system logs, change management tickets, and SMP/E records — only intersects cleanly when change management discipline has been consistent.", stageIndex: 1 },
        { persona: "Sage", type: "time", title: "Lost Time — 2–3 days of manual role analysis", description: "Separation of duties analysis across 30+ users with elevated access is performed manually by the security team under deadline pressure.", stageIndex: 2 },
        { persona: "Derek", type: "skill", title: "Skill Gap / Bottleneck — requires both z/OS expertise and compliance expertise simultaneously", description: "No automated compliance framework mapping — every finding must be manually categorized against SOX IT General Controls or PCI DSS by someone who understands both z/OS and the audit framework.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — audit prep and remediation compete for the same expert time", description: "Remediations under time pressure are more likely to create new gaps because the engineer is already stretched assembling evidence.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — gaps are discovered by the auditor, not the team; finding under audit pressure is far more costly", description: "Undocumented changes — configuration modifications with no change record — are discovered during the audit, not before. There is no proactive detection mechanism.", stageIndex: 3 },
        { persona: "Derek", type: "pain", title: "Business Impact — compliance posture is unmeasurable until the auditor quantifies it", description: "No reliable baseline for how many undocumented changes exist — the number is unknown until the audit investigation.", stageIndex: 3 },
        { persona: "Sage", type: "time", title: "Lost Time — days of manual log review to surface access behavioral anomalies", description: "Behavioral anomalies (dormant SPECIAL user who was active outside a change window) are invisible without dedicated expert investigation.", stageIndex: 3 },
        { persona: "Zach", type: "skill", title: "Skill Gap / Bottleneck — Zach is simultaneously needed for evidence assembly and for executing remediations", description: "Compliance remediations require the same engineers already stretched assembling evidence — capacity conflict.", stageIndex: 4 },
        { persona: "Derek", type: "pain", title: "Business Impact — last-minute remediations create audit risk rather than reducing it", description: "Remediations made to close audit findings risk inadvertently creating new gaps because they are made under time pressure with incomplete review.", stageIndex: 4 },
        { persona: "Derek", type: "time", title: "Lost Time — 5–15 business days of senior engineer time per audit cycle", description: "Assembling the evidence package from individual exports (RACF reports, SMP/E records, change logs) takes weeks of engineering time and is error-prone.", stageIndex: 5 },
        { persona: "Derek", type: "pain", title: "Business Impact — auditors may find gaps because the snapshot was assembled at a single moment and missed interim changes", description: "Evidence is point-in-time, not continuous — the package reflects a snapshot assembled under pressure rather than a continuous, authoritative record.", stageIndex: 5 },
        { persona: "Sage", type: "pain", title: "Business Impact — gap between audits means drift can accumulate for up to 12 months undetected", description: "No continuous monitoring — compliance posture degrades silently between audit cycles. The only detection mechanism is the next audit.", stageIndex: 6 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Derek defines audit scope; Atlas confirms what evidence it can produce and surfaces any gaps (missing LPARs, discovery staleness, missing baseline definition)." },
        { name: "Collect", description: "Atlas assembles evidence from its continuous environment record — RACF, configuration state, change history, PTF inventory. No manual pulls from ISPF, RACF consoles, or SMP/E." },
        { name: "Analyze", description: "Atlas analyzes collected evidence against compliance framework requirements — producing findings classified by severity and compliance category." },
        { name: "Surface Gaps", description: "Atlas surfaces compliance gaps and anomalies proactively — undocumented changes, dormant privileged accounts with recent activity, behavioral anomalies in access patterns." },
        { name: "Remediate", description: "Atlas generates remediation plans for deviations that can be corrected before the audit; validates them in isolation; orchestrates the apply." },
        { name: "Generate Package", description: "Atlas generates the structured evidence package — compliance report, privileged access report, change history with undocumented change annotations, configuration snapshots, remediation log. Exportable for auditor consumption." },
        { name: "Monitor", description: "Atlas continues monitoring for new deviations, undocumented changes, and access anomalies between audit cycles. Compliance posture is a continuous state." },
      ],
      markers: [
        { persona: "Derek", type: "time", title: "Time Saving — 1–3 days → minutes for scope definition and evidence inventory", description: "Ask Atlas 'what do we need for the SOX audit?' and receive a complete, scoped evidence inventory within minutes — no multi-team coordination required.", stageIndex: 0 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek independently initiates and manages audit workflows without z/OS expertise", description: "Atlas presents evidence scope in compliance language, not z/OS technical shorthand — Derek can work with it directly without expert translation.", stageIndex: 0 },
        { persona: "Sage", type: "time", title: "Time Saving — 3–5 days → under 30 minutes for multi-LPAR privileged access collection", description: "Privileged access reports across all LPARs generated in a single Atlas query — no per-LPAR manual RACF queries.", stageIndex: 1 },
        { persona: "Derek", type: "time", title: "Time Saving — 3–5 days → minutes for change history assembly", description: "12-month change history assembled from Atlas's continuous record — no reconciliation of system logs, tickets, and SMP/E.", stageIndex: 1 },
        { persona: "Sage", type: "time", title: "Time Saving — 2–3 days → automatic for SoD analysis", description: "Separation of duties analysis across all elevated users completed automatically by Atlas — no manual role-by-role review.", stageIndex: 2 },
        { persona: "Derek", type: "skill", title: "Atlas AI Insight & Automation — compliance framework mapping applied to raw findings automatically", description: "Atlas categorizes findings against SOX IT General Controls, PCI DSS, or customer-defined framework automatically — no manual mapping required.", stageIndex: 2 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — 46 undocumented changes surfaced before the auditor sees them", description: "'46 undocumented changes' surfaced before the auditor sees them — with timestamps, affected components, and user IDs. A specific, verifiable count.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — behavioral anomaly surfacing without requiring anyone to know to look for it", description: "Behavioral anomaly surfacing: dormant SPECIAL user active outside a change window surfaced automatically — without requiring anyone to know to look for it.", stageIndex: 3 },
        { persona: "Derek", type: "gain", title: "Business Impact — proactive gap discovery allows remediation before audit, not during it", description: "Compliance gaps quantified before the audit opens — Derek walks into audit prep knowing the number, not discovering it with the auditor.", stageIndex: 3 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — pre-remediation validation in isolated environment eliminates remediation-induced gaps", description: "Compliance remediations are planned and validated by Atlas before apply — changes made to close findings do not inadvertently create new gaps.", stageIndex: 4 },
        { persona: "Derek", type: "time", title: "Time Saving — no separate effort to document remediation steps; captured automatically", description: "Remediation log captured in Atlas — the complete before/after state is part of the evidence package automatically.", stageIndex: 4 },
        { persona: "Derek", type: "time", title: "Time Saving — 5–15 business days → hours for evidence package production", description: "Complete evidence package generated from a single Atlas query — auditor-ready format, no manual assembly.", stageIndex: 5 },
        { persona: "Derek", type: "skill", title: "Atlas AI Insight & Automation — continuous record means no evidence gaps from last-minute assembly", description: "Evidence is from Atlas's continuous record, not a point-in-time snapshot assembled under pressure — auditors receive authoritative, timestamped data.", stageIndex: 5 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — continuous monitoring replaces point-in-time audit preparation", description: "Compliance posture monitored continuously — deviations surfaced when they occur, not at the next audit cycle.", stageIndex: 6 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek maintains visibility into ongoing compliance state without requiring an active investigation", description: "Atlas alerts when compliance posture changes materially — Derek is informed proactively rather than discovering gaps at the next audit.", stageIndex: 6 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert for Z's production behavioral data (SMF/CDP via OMEGAMON Data Provider) provides a runtime dimension to Atlas's configuration compliance check. A RACF setting that is technically compliant but has never been exercised in production is different from one that is actively enforced. Concert4Z's access monitoring can surface whether specific security controls are operationally active — complementing Atlas's configuration state view.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's access monitoring history can serve as additional evidence in the compliance package — documenting that security controls are not just configured correctly but are behaviorally active in production. For PCI DSS audit purposes, evidence of actively enforced access controls (not just correctly configured ones) strengthens the compliance narrative.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified compliance gaps across RACF, Db2, and configuration layers. The assessment also requires infrastructure-layer evidence." },
            { label: "Atlas directs", description: "For audit evidence covering z/OS infrastructure changes (LPAR reconfigurations, memory changes, storage allocations), Atlas queries the Terraform apply history for the audit period." },
            { label: "Terraform returns", description: "Terraform's apply log — with timestamps, operator identities, plan outputs, and state diffs — is incorporated into the change history as the infrastructure-layer change evidence." },
          ],
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified compliance deviations requiring infrastructure-layer remediation (network topology, storage configuration, resource isolation changes under regulatory scope)." },
            { label: "Atlas directs", description: "The remediation is implemented through Terraform's plan-approve-apply workflow. Atlas expresses required changes as proposed modifications to relevant LPAR workspace HCL declarations." },
            { label: "Terraform returns", description: "Terraform's apply record — with timestamp, approver identity, and state diff — is incorporated into Atlas's remediation evidence as proof that the infrastructure change was reviewed and approved before being applied." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides the authoritative infrastructure baseline for each LPAR. Atlas uses this as the infrastructure layer of its compliance baseline, ensuring the evidence package reflects the complete configuration state — software layer (Atlas) and infrastructure layer (Terraform) together.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "The compliance evidence package is enriched with Terraform's apply history for the audit period — providing auditors with a complete, dual-layer change record spanning infrastructure changes (Terraform) and z/OS software changes (Atlas).",
          stageIndex: 5,
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
  "uc-02": {
    id: "uc-02",
    label: "UC-02: Staff Onboarding",
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
        { name: "Orient", description: "New team member arrives and needs an overview of the environment — LPAR topology, subsystem inventory, critical applications, and their relationships." },
        { name: "Explore", description: "New team member drills into the areas most relevant to their role — application dependencies, configuration details, historical change patterns." },
        { name: "Assess Risk", description: "Understand what the highest-priority open risks are in the environment — PTF gaps, deprecated APIs, security findings — relevant to the new team member's area." },
        { name: "Document", description: "Produce a structured document consolidating the new hire's understanding of the environment for handoff, reference, or governance." },
        { name: "Execute First Change", description: "When the new hire is ready for their first production change, guide them through a safe change execution." },
      ],
      markers: [
        { persona: "Chris", type: "time", title: "Lost Time — 3–6 months before reaching independent contribution capability", description: "New team members learn the environment through informal shadowing, reading outdated documentation, and asking the one senior engineer who is always too busy.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours of Zach's time per new hire for initial orientation", description: "Every new hire requires Zach to personally deliver environment orientation — the same knowledge transfer, repeated for every new person.", stageIndex: 0 },
        { persona: "Chris", type: "pain", title: "Business Impact — institutional knowledge lost permanently on retirement; no recovery mechanism", description: "The most critical knowledge — topology relationships, undocumented change patterns, application interdependencies — lives in people's heads; in environments where the senior engineer has retired, this knowledge is simply gone.", stageIndex: 0 },
        { persona: "Chris", type: "skill", title: "Skill Gap / Bottleneck — Chris cannot progress independently; every question requires a senior engineer's availability", description: "Every specific question requires interrupting Zach or another senior engineer — there is no self-service way to explore the environment.", stageIndex: 1 },
        { persona: "Alice", type: "time", title: "Lost Time — weeks for an experienced engineer to orient to an unfamiliar system they now own", description: "Experienced engineers moving to a new system (new project, acquisition, team reorg) face the same gap — no self-service orientation path exists even for mid-level engineers.", stageIndex: 1 },
        { persona: "Chris", type: "pain", title: "Business Impact — new hire may make changes without awareness of open risks in their area, increasing incident probability", description: "Risk landscape is invisible until Zach walks the new hire through known issues — there is no systematic, role-relevant risk briefing.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — knowledge transfer completeness depends entirely on Zach's memory and availability", description: "Zach must manually remember to surface relevant risks to each new hire — no systematic process ensures risks are communicated.", stageIndex: 2 },
        { persona: "Chris", type: "pain", title: "Business Impact — organizational knowledge created during onboarding is immediately at risk of being lost again", description: "No artifact produced from the onboarding process — knowledge exists in the new hire's head and in informal notes, not in a shareable, structured document.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — repeat orientation effort for every transfer or role change", description: "If Chris needs to hand off to another team member, the same orientation process starts from scratch.", stageIndex: 3 },
        { persona: "Chris", type: "skill", title: "Skill Gap / Bottleneck — Zach must be available for every first change attempt by every new hire", description: "First production change requires Zach to be present — Chris does not have the context to execute safely alone.", stageIndex: 4 },
        { persona: "Chris", type: "pain", title: "Business Impact — generic documentation does not prevent environment-specific mistakes", description: "Dense IBM documentation provides general guidance but cannot answer questions specific to this environment and this change.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Orient", description: "New team member gets a structured overview of the environment from Atlas — LPAR topology, subsystem inventory, critical applications, and their relationships." },
        { name: "Explore", description: "User drills into areas most relevant to their role — Atlas answers follow-up questions, traces dependencies, explains change history, and surfaces configuration details." },
        { name: "Assess Risk", description: "Atlas proactively surfaces the highest-priority open risks in the environment — PTF gaps, deprecated APIs, security findings — relevant to the new hire's area of ownership." },
        { name: "Document", description: "User requests a System Intelligence Brief — a structured, exportable document consolidating the session's discoveries and the current environment state." },
        { name: "Execute First Change", description: "When the new hire is ready, Atlas guides them through safe change execution with a plan, test, and apply workflow." },
      ],
      markers: [
        { persona: "Chris", type: "time", title: "Time Saving — 3–6 months → first week to reach basic environment competency", description: "Complete, accurate picture of the entire environment in the first week — not the first month. Atlas answers environmental questions in natural language, no ISPF required.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 4–8 hours per new hire → zero for Zach's orientation effort", description: "Zach does not need to personally deliver environment orientation — Atlas is available as a peer at any time, without scheduling.", stageIndex: 0 },
        { persona: "Alice", type: "time", title: "Time Saving — weeks of shadowing → hours for an experienced engineer moving to a new system", description: "Experienced engineers inheriting new systems can orient in a single Atlas conversation — no shadow period required.", stageIndex: 0 },
        { persona: "Chris", type: "gain", title: "New User Capability — Chris independently explores the environment without requiring Zach's availability", description: "Self-service exploration — Chris can ask Atlas any environment question and receive a grounded, specific answer without interrupting a senior engineer.", stageIndex: 1 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently orients to new systems without requiring a shadow period", description: "A mid-level engineer inheriting a system they have not previously managed can orient entirely through Atlas — covering topology, change history, and risk profile in one session.", stageIndex: 1 },
        { persona: "Chris", type: "gain", title: "Atlas AI Insight & Automation — proactive risk surfacing tied to role and ownership area; no manual risk briefing required", description: "Risks relevant to Chris's area surfaced proactively by Atlas — no risk of making changes without knowing about open findings in that part of the environment.", stageIndex: 2 },
        { persona: "Zach", type: "gain", title: "Business Impact — institutional knowledge is durable; it survives any individual's departure", description: "Environment knowledge is persistent in Atlas regardless of staff turnover — organization is not one retirement away from losing the risk picture.", stageIndex: 2 },
        { persona: "Chris", type: "gain", title: "Atlas AI Insight & Automation — Atlas generates the Brief from its live environment model; no authoring effort required", description: "System Intelligence Brief generated by Atlas — a structured, shareable document that captures the environment state and the new hire's understanding. Produced in minutes.", stageIndex: 3 },
        { persona: "Zach", type: "gain", title: "Business Impact — organizational knowledge produced once, reused indefinitely", description: "Knowledge captured in the Brief is reusable for the next team member — orientation artifact persists beyond any individual's tenure.", stageIndex: 3 },
        { persona: "Chris", type: "gain", title: "New User Capability — Chris executes their first production change independently, within Atlas's guardrails", description: "Atlas provides step-by-step guidance for the first production change — environment-specific context for every step, not generic documentation.", stageIndex: 4 },
        { persona: "Zach", type: "time", title: "Time Saving — Zach's time on first-change oversight → zero, replaced by Atlas-guided workflow", description: "Zach does not need to be present for Chris's first change — Atlas provides the guardrails Zach would otherwise provide.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Execute First Change",
          steps: [
            { label: "Atlas produced", description: "Atlas has provided Chris or Alice with the full environment context for their first production change: topology-grounded impact assessment, step-by-step execution plan, and change guardrails. If the first change involves modifying application code, Atlas has scoped the blast radius and identified affected programs." },
            { label: "Atlas directs", description: "For the application code execution step, Atlas directs the new team member to Bob PPZ with full context: affected programs, blast radius, dependency graph, and validation requirements. In Bob PPZ, ZUnderstand helps understand what the affected program does, what the business logic means, and the safe modification path — without relying on a senior engineer." },
            { label: "Bob PPZ returns", description: "The completed code change artifact. Atlas validates it in the provisioned test environment, confirms the blast radius is respected, and generates the change evidence package." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "For new application developers exploring their applications, Bob PPZ enriches the Atlas dependency map with code-level context: not just 'ACCTVAL01 calls CUSTSVC01' (Atlas topology) but 'ACCTVAL01's account validation paragraph calls CUSTSVC01 to check credit limits, and this call pattern creates a tight coupling that affects 14 downstream programs' (Bob PPZ ZUnderstand). This deeper context helps Deb understand not just what connects but what the code-level implications of those connections are.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "When the change history surfaces an undocumented change to an application program, Bob PPZ can provide context on what that change actually did — not just 'ACCTVAL01 was modified' but 'the account validation paragraph was restructured.' This code-level change characterization enriches the change history for developer onboarding beyond what configuration history alone provides.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "When Atlas generates the environment context document for a new hire whose responsibilities include Terraform-managed infrastructure, the Terraform workspace structure provides a structured layer of infrastructure metadata. Atlas can describe not just 'which LPARs you are responsible for' but also 'which of those LPARs are managed declaratively via Terraform, what their workspace names are, and what the IaC change process looks like for infrastructure-level changes to those systems.'",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "When a senior engineer delegates an infrastructure-related task to a new hire (e.g., reviewing a Terraform plan for a proposed LPAR configuration change), Atlas's task delegation guidance can incorporate the Terraform workflow context — explaining what a terraform plan output shows, what needs to be reviewed before approval, and how the approved change is applied. Atlas provides the application-layer impact context; Terraform provides the infrastructure-layer plan.",
          stageIndex: 4,
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
  "uc-03": {
    id: "uc-03",
    label: "UC-03: Regulatory Change Response",
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, and sequenced remediation — from new regulation announced to evidence package delivered.",
    personas: [
      { name: "Sage", role: "Security Administrator", engagement: "Primary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
      { name: "Lupita", role: "Key Management and Cryptography Services", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
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
        { persona: "Sage", type: "time", title: "Lost Time — weeks to identify regulated data scope across a 6-LPAR estate", description: "IBM Z organizations run regulated data in datasets, databases, IMS segments, and application programs that are not cataloged in any single system — identifying all regulated data requires weeks of manual investigation.", stageIndex: 0 },
        { persona: "Sage", type: "pain", title: "Business Impact — regulatory deadline pressure is compounded by the fact that scope is not understood until weeks into the response", description: "The team is often still discovering scope when the deadline is approaching — leaving insufficient time for remediation and validation.", stageIndex: 0 },
        { persona: "Derek", type: "skill", title: "Skill Gap / Bottleneck — Derek cannot independently scope regulatory compliance; requires coordinating 4+ specialist teams", description: "No multi-tool regulated data inventory — Derek must coordinate with the DBA (Db2 tables), the storage team (VSAM files), the application team (programs), and the security team (RACF profiles) just to establish scope.", stageIndex: 0 },
        { persona: "Sage", type: "time", title: "Lost Time — 3–5 business days of manual RACF analysis for a medium-sized regulated estate", description: "Access control gap analysis for regulated data requires manually reviewing RACF profiles per dataset and comparing against regulatory requirements — a multi-day expert task.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — access control gaps that span tool boundaries are invisible without a unified view", description: "No cross-tool view: RACF profiles, Db2 access controls, and application-level access are reviewed in separate tools with no unified gap picture.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — days assembling the encryption gap picture from separate tools", description: "Encryption gap analysis requires separately reviewing DFSMS configuration, Db2 encryption settings, and network connection encryption state — multiple tools, multiple expertise domains.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — multi-team remediation with no shared plan produces gaps at workstream boundaries", description: "Regulatory response is a multi-team manual project — security team, DBA, application team, and systems programmer must each execute their workstream independently with no shared coordination artifact.", stageIndex: 2 },
        { persona: "Lupita", type: "time", title: "Lost Time — days to weeks per encryption workstream phase, each requiring multiple specialist hand-offs", description: "Encryption at rest workstream requires coordinating key management, encryption configuration, and dataset rewriting — high complexity with no integrated tooling.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — Zach's time consumed by routine compliance execution that should be delegatable", description: "System-level remediations (RACF profile updates, dataset encryption) require Zach's execution for every single change — no delegation path for routine compliance remediation.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — remediation completeness is assumed, not verified; gaps surface in the next audit", description: "Post-remediation verification is minimal — there is no systematic check that all regulated data was addressed and that no newly created datasets fall into scope.", stageIndex: 3 },
        { persona: "Derek", type: "pain", title: "Business Impact — compliance posture degrades silently as new regulated data is created post-remediation", description: "New regulated data that appears after the initial remediation is typically not detected until the next audit cycle — no continuous monitoring.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Lost Time — days assembling the regulatory compliance evidence package", description: "Compliance evidence package is assembled manually from RACF reports, DBA exports, encryption configuration summaries, and application team attestations.", stageIndex: 4 },
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
        { persona: "Sage", type: "time", title: "Time Saving — weeks of manual scope assembly → hours for a complete regulated data inventory", description: "Atlas inventories all regulated data across the entire estate in hours — datasets, Db2 tables, IMS segments, VSAM files — without coordinating 4+ specialist teams.", stageIndex: 0 },
        { persona: "Derek", type: "gain", title: "Business Impact — regulatory deadline pressure is relieved by scope completeness from day one", description: "Complete scope delivered in hours rather than weeks — the regulatory response timeline begins with the full scope known, not with weeks of scope discovery that competes with the remediation deadline.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — cross-tool access control analysis joins RACF, Db2, and application topology in one assessment", description: "Unified access control gap analysis across RACF profiles, Db2 access controls, and application access in a single Atlas session — cross-tool gaps visible for the first time.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — days → hours for the encryption gap assessment", description: "Encryption gap picture produced by Atlas — DFSMS configuration, Db2 encryption status, and connection encryption state joined in one assessment without multi-tool investigation.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — multi-workstream remediation plan generated and sequenced automatically; gaps at workstream boundaries are eliminated", description: "Full regulatory remediation workstream sequenced in a single Atlas session — RACF updates, encryption enablement, credential changes, audit trail configuration — all workstreams planned and tracked in Atlas.", stageIndex: 2 },
        { persona: "Lupita", type: "time", title: "Time Saving — days to weeks of manual encryption workstream coordination → Atlas-orchestrated sequence", description: "Encryption workstream orchestrated by Atlas — key management, encryption configuration, and dataset rewriting steps sequenced in the correct order with dependencies resolved.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — Zach's execution time on routine compliance changes reduced to authorization gates", description: "Routine compliance remediations (RACF profile updates, encryption configuration) are Atlas-orchestrated — Zach authorizes rather than manually executing every change.", stageIndex: 2 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — comprehensive post-remediation coverage check runs automatically after execution", description: "Post-remediation verification is systematic — Atlas confirms every regulated data item has the required controls applied, with no items assumed rather than verified.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — ongoing monitoring replaces point-in-time compliance snapshot", description: "Continuous monitoring for new regulated data — Atlas alerts when new datasets, tables, or programs come into regulatory scope after the initial remediation. No silent compliance drift.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Time Saving — days assembling evidence → generated from Atlas's continuous record", description: "Compliance evidence package generated from Atlas's verified compliant state — regulated data inventory, access control gap remediation record, encryption configuration evidence, audit trail status.", stageIndex: 4 },
        { persona: "Derek", type: "skill", title: "Atlas AI Insight & Automation — continuous compliance record eliminates the evidence quality limitation of point-in-time snapshot assembly", description: "Evidence is from Atlas's authoritative, continuous record — not a point-in-time snapshot assembled at submission time. Auditors receive continuous evidence of the compliant state.", stageIndex: 4 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — continuous scope monitoring surfaces new regulated data without a user query", description: "New regulated data detected as it is created — Atlas alerts before the new gap becomes a compliance problem. Compliance posture is maintained continuously, not recovered at each audit.", stageIndex: 5 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek monitors regulatory compliance posture continuously from Atlas without requiring Sage or Zach to assemble a status report", description: "Ongoing compliance state visible in Atlas — Derek knows the current regulatory posture at any point, not just after a manual assessment.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z detects an access anomaly: off-hours access, unusual dataset volume, dormant privileged account active." },
            { label: "Concert4Z directs", description: "Anomaly triggers an Atlas regulatory investigation. Atlas scopes affected regulated data components and assesses whether the anomaly represents a compliance gap." },
            { label: "Atlas returns", description: "Atlas completes the regulatory remediation. The remediation record is recorded in Atlas's continuous change record. Concert4Z sees the anomaly pattern resolved." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's continuous access monitoring provides the behavioral dimension: not just 'what are the RACF settings for this dataset' (configuration) but 'who has actually been accessing this dataset, when, and how often' (behavior). The behavioral access picture distinguishes a theoretical access control gap from an active access risk.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas monitors for new regulated data and access control drift. Concert4Z's continuous access monitoring detects when regulated data is being accessed in ways configuration monitoring cannot catch — a new program that begins accessing a regulated dataset without a corresponding configuration change is detected by Concert4Z and surfaces as a new regulated scope item for Atlas.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified infrastructure-layer changes required by the new regulation." },
            { label: "Atlas directs", description: "Required infrastructure changes are expressed as proposed modifications to relevant LPAR workspace HCL declarations." },
            { label: "Terraform returns", description: "Terraform apply records for each infrastructure-layer change. Atlas marks items as implemented and incorporates Terraform apply records into response evidence." },
          ],
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas tracks the Terraform apply status for each infrastructure change item." },
            { label: "Atlas directs", description: "When Terraform applies a change, Atlas receives confirmation and updates the response plan tracking." },
            { label: "Terraform returns", description: "If Terraform detects a policy violation (Sentinel or OPA policy), Atlas is informed and the response plan is updated — a blocked Terraform apply is documented evidence that a proposed change was rejected by policy enforcement." },
          ],
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides the authoritative record of the current declared infrastructure configuration. For infrastructure-layer compliance dimensions, Terraform's state is the ground truth for the gap assessment.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "The regulatory compliance evidence package is enriched by Terraform's apply history for the infrastructure-layer response items. Terraform's immutable log provides auditor-visible evidence that each infrastructure change was reviewed and approved before being applied.",
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Application Code Remediation",
          steps: [
            { label: "Atlas produced", description: "Atlas has sequenced the full regulatory remediation workstream. Within this plan, Atlas identifies any items that require application code modification: masking logic for PII output, credential handling updates, data access pattern restructuring, or audit trail hooks." },
            { label: "Atlas directs", description: "Atlas presents each application code remediation item with affected program(s), regulatory requirement, and scope context. The developer is directed to Bob PPZ to understand current code behavior, identify every location requiring change, implement the precise code change, and confirm adjacent functionality is not broken." },
            { label: "Bob PPZ returns", description: "Remediated code artifacts for each application program. Atlas validates in an isolated test environment, marks items resolved, and incorporates code change records into the compliance evidence package." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Bob PPZ's ZUnderstand data enriches Atlas's regulated data scope identification with application-level precision. Rather than identifying 'Application X processes regulated data' (Atlas topology), ZUnderstand can identify 'Programs ACCTVAL01 and PAYPROC03 in Application X explicitly access fields that match the regulation's PII definition, based on code-level data flow analysis.' This narrows the scope to specific programs rather than entire applications, reducing the remediation surface area.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "When Atlas maps access control gaps, Bob PPZ's application topology enriches the scope with code-level access paths — identifying programs that access regulated datasets through dynamic calls or indirect references that static topology may not capture. This prevents Atlas from underestimating the access control gap scope for complex applications.",
          stageIndex: 1,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state recording and comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules and automated checking" },
      { name: "Workflow Engine", timeline: "GA", description: "Remediation sequencing and execution" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Post-remediation monitoring for new scope items" },
    ],
  },
  "uc-04": {
    id: "uc-04",
    label: "UC-04: Change Readiness and Health Assessment",
    description: "Structured, repeatable health assessment joining configuration state, security posture, PTF currency, and performance constraints into one artifact — in minutes, not hours.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Primary" },
      { name: "Sage", role: "Security Administrator", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Scope", description: "User defines the scope of the health check — which LPAR, middleware stack, or event type is being assessed (pre-go-live, pre-audit, pre-change window)." },
        { name: "Assess", description: "Collect and join configuration data, PTF inventory, security posture, and subsystem parameters across the scoped components to identify findings." },
        { name: "Rank Findings", description: "Organize findings by severity and identify compound risks — where multiple individually non-critical findings interact to create a higher-risk scenario." },
        { name: "Generate Artifact", description: "Produce a health assessment document — structured finding list with severity, source, recommendation, and remediation path — suitable for governance sign-off." },
        { name: "Remediate", description: "For findings that require correction before the event, plan and execute the remediation." },
        { name: "Register Baseline", description: "Record the post-assessment state as a health baseline for future drift monitoring." },
      ],
      markers: [
        { persona: "Zach", type: "pain", title: "Business Impact — no standardized pre-event health check process; coverage depends on who remembered to check what", description: "Scope is defined informally and inconsistently across events and teams. Material risks are missed silently.", stageIndex: 0 },
        { persona: "Derek", type: "skill", title: "Skill Gap / Bottleneck — Derek cannot scope a configuration review without z/OS expert involvement", description: "For pre-audit configuration reviews, there is no self-service way to define compliance scope — Derek must engage Zach and Sage to understand what is even checkable.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours of multi-person manual effort for a single health check", description: "A pre-go-live health check is assembled manually — one person checks PTF currency in SMP/E, another checks RACF panels, a third checks Db2 ZPARMs. The review takes hours and produces no structured artifact.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — findings that span tool boundaries are missed entirely; these are the most dangerous findings", description: "Each tool shows only a fragment — PTF currency without security posture, security posture without CICS thread constraints. The cross-source view does not exist.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — Sage may clear a security finding while unaware of a PTF gap that compounds its risk", description: "Security findings are reviewed in isolation from operational and patch findings — no integrated view of combined risk posture.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 1–2 hours attempting to synthesize findings across tools", description: "No automated severity ranking or compound risk identification — Zach must interpret findings from multiple tools independently and try to mentally combine them.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — the most dangerous finding type — compound risk across tool boundaries — is systematically invisible", description: "Compound risks (missing security PTF + unencrypted connection = elevated combined risk) are invisible because they require joining two different subsystem views that different specialists own.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — no auditable record that a health review was conducted before the event", description: "No structured artifact produced from the review — findings exist in notes, email, and memory.", stageIndex: 3 },
        { persona: "Quinn", type: "time", title: "Lost Time — 1–3 hours producing a separate governance summary from informal notes", description: "Cannot approve or defer a go-live without a written risk assessment — Zach must produce a separate governance document after the review.", stageIndex: 3 },
        { persona: "Derek", type: "pain", title: "Business Impact — compliance gap: no pre-audit review evidence exists", description: "The pre-audit configuration review produces no artifact; Derek has no evidence to show auditors that a review was conducted.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours to days manually scoping and executing a remediation that Atlas found during assessment", description: "Finding a security PTF gap in the health check triggers a separate, manual remediation process with no connection to the assessment that found it.", stageIndex: 4 },
        { persona: "Sage", type: "pain", title: "Business Impact — remediations made under pre-event pressure risk creating new compliance or operational gaps", description: "No way to verify that a remediation for one finding did not introduce a new gap without repeating the entire health check manually.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — teams cannot track whether environment health is improving or degrading over time", description: "No mechanism to register a post-assessment state as a baseline — each health check starts from scratch. Drift since the last assessment is invisible.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "User defines the health check scope; Atlas confirms what data it can collect and surfaces any gaps in discovery coverage." },
        { name: "Assess", description: "Atlas joins Config-as-Code configuration data, PTF inventory, FIXCAT classifications, and security posture data across all scoped components simultaneously." },
        { name: "Rank Findings", description: "Atlas organizes findings by severity (critical, high, medium, low) and identifies compound risks where multiple findings interact to create elevated risk." },
        { name: "Generate Artifact", description: "Atlas produces the health assessment document — structured finding list with severity, source, recommendation, and remediation path for each item. Exportable for governance sign-off." },
        { name: "Remediate", description: "User selects findings to remediate; Atlas transitions to Change Intelligence to generate and execute the remediation plan." },
        { name: "Register Baseline", description: "After assessment and any remediations, Atlas records the current state as the health baseline for ongoing drift monitoring." },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Time Saving — informal multi-person scoping discussion → seconds via Atlas", description: "Scope definition takes seconds — select LPAR, event type, and assessment focus; Atlas confirms what it can assess immediately.", stageIndex: 0 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek independently initiates health checks without Zach's involvement", description: "Derek can scope a pre-audit configuration review in Atlas independently — no z/OS expert required to translate compliance requirements into scope.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 4–8 hours → under 30 minutes for a full pre-event health check", description: "Full middleware stack health assessment in under 30 minutes — PTF currency, configuration compliance, security posture, performance constraints — all joined in one Atlas session.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Atlas AI Insight & Automation — cross-source join across CICS, Db2, MQ, RACF, and PTF inventory in a single assessment", description: "Security findings presented in the context of the broader operational and patch picture — Sage sees compound risk, not just her individual security domain findings.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — 1–2 hours manual triage → automatic severity ranking", description: "Findings automatically ranked by severity — Zach starts with the critical items, not with a flat list he must triage manually.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — compound risk identification requires joining PTF inventory with configuration security state; only possible in Atlas", description: "Atlas surfaces 'missing CICS security PTF + unencrypted IPIC connection = compound risk higher than either finding alone' — a finding type that does not exist in any single tool.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — structured health artifact generated from assessment data; no manual authoring", description: "Health assessment document generated automatically from the assessment — auditable record that a pre-event review was conducted, with full finding detail.", stageIndex: 3 },
        { persona: "Quinn", type: "gain", title: "New User Capability — Quinn makes informed go/no-go decisions independently from the Atlas health artifact", description: "Management-readable risk summary alongside technical findings — Quinn can approve or defer the event from the Atlas artifact without requiring a separate briefing.", stageIndex: 3 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek produces pre-audit compliance evidence without Zach's involvement", description: "Pre-audit configuration review produces an exportable, auditor-ready artifact — evidence of a systematic review conducted before the audit.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — hours to days → immediate transition from finding to remediation plan within Atlas", description: "Health check finding → remediation plan in one session — Atlas transitions directly to a Change Intelligence workflow for each selected finding. No separate investigation or tool switch required.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — pre-apply validation prevents remediation-induced gaps", description: "Post-remediation state is validated before the finding is marked closed — changes made to close health check findings are verified rather than assumed.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — baseline registration captures the current state as a reference point for continuous drift monitoring", description: "Post-assessment baseline registered automatically — next health check can compare against a known good state, making drift immediately visible.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert for Z's Risk Management module has detected an operational risk: a certificate approaching expiry, a cluster of missing critical maintenance, or a capacity threshold approaching ahead of a peak event." },
            { label: "Concert4Z directs", description: "This risk flag triggers an Atlas health assessment workflow scoped to the affected components. Concert4Z's detection is specific; Atlas's assessment is comprehensive." },
            { label: "Atlas returns", description: "Atlas returns a structured health assessment artifact. Concert4Z's Risk Management sees the operational risk addressed when Atlas's remediation is complete." },
          ],
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's production performance data provides current utilization baselines and behavioral trend data. Atlas's constraint assessment is specific rather than theoretical, and forward-looking trends (a Db2 buffer pool trending toward saturation over 3 months) appear as health findings.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's production anomaly history adds an operational dimension: findings that correlate with past production incidents are elevated in severity compared to the same finding on a system with no incident history.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas captures the configuration baseline; Concert4Z captures the behavioral baseline. Together they form a complete pre-event reference point for ongoing drift monitoring.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas surfaces the infrastructure readiness check as a gate item: the target LPAR should be confirmed in its declared Terraform state before the change is authorised." },
            { label: "Atlas directs", description: "The team runs terraform plan against the LPAR's workspace to confirm zero infrastructure drift." },
            { label: "Terraform returns", description: "Terraform plan output. Atlas records the infrastructure readiness confirmation in the health assessment output. A clean plan confirms infrastructure readiness; any planned changes surface drift that must be resolved before the change proceeds." },
          ],
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "If infrastructure-layer changes were made as part of the change, Atlas directs confirmation that Terraform's apply completed successfully." },
            { label: "Atlas directs", description: "Atlas confirms the post-change state matches the updated Terraform declaration." },
            { label: "Terraform returns", description: "Terraform apply confirmation is incorporated into the post-change record." },
          ],
          stageIndex: 5,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides structured infrastructure baseline data — CPU and memory allocation, storage mounts, network adapter configuration, activation profile — complementing the software-layer configuration data Atlas collects.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's workspace history provides context for blocker attribution: recent infrastructure changes that could explain a configuration anomaly, or pending Terraform changes that the change owner should know about.",
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has generated the health assessment, ranked findings by severity, and identified compound risks. For findings whose root cause lies in application code — a deprecated API still in use, inefficient SQL creating a performance constraint, or a shared copybook creating a coupling risk — Atlas identifies the application component but cannot execute the code-level fix." },
            { label: "Atlas directs", description: "Atlas presents the application-code finding with affected program identified, health check context, and blast radius. The user is directed to Bob PPZ to understand the code-level root cause and safe remediation path." },
            { label: "Bob PPZ returns", description: "A code fix artifact. Atlas validates the fix in the provisioned environment, confirms the finding is resolved, and marks it closed in the health assessment record." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "When the health assessment includes application components, Bob PPZ's ZUnderstand metadata enriches the application layer: deprecated API usage identified at program level rather than application level; coupling risk quantified through ZUnderstand's coupling analysis; business service attribution helping prioritize findings by business impact.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas's compound risk identification joins findings from PTF inventory, configuration state, security posture, and subsystem parameters. When Bob PPZ is present, compound risks involving application code are surfaced with greater precision — for example, a deprecated API finding combined with a missing security PTF creates a compound risk higher than either finding alone.",
          stageIndex: 2,
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
  "uc-05": {
    id: "uc-05",
    label: "UC-05: Change Governance and Traceability",
    description: "Complete change attribution, undocumented change detection, and ITSM integration for audit readiness — closing the gap between what happened on z/OS and what the change management system knows.",
    personas: [
      { name: "Quinn", role: "IT Operations Manager", engagement: "Primary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
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
        { persona: "Quinn", type: "pain", title: "Business Impact — no visibility into changes that occurred outside change windows unless a human notices a behavioral difference or an auditor flags it", description: "Out-of-window changes are invisible until they cause an incident or surface in an audit review.", stageIndex: 0 },
        { persona: "Annette", type: "pain", title: "Business Impact — no automated detection for out-of-window changes — the only signal is a behavioral symptom or an escalation after the fact", description: "Out-of-window changes accumulate silently between incident post-mortems.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — the process gap is structural: the execution tools and the change recording tools are entirely separate", description: "Changes made through ISPF panels, operator commands, SMP/E, and JCL do not integrate with ServiceNow or ITSM systems — the gap between what happened and what the change system knows is built into the tooling.", stageIndex: 0 },
        { persona: "Quinn", type: "pain", title: "Business Impact — change record completeness is unknown until the audit investigation; the gap is not measurable in real time", description: "A meaningful fraction of all IBM Z configuration changes have no associated change record — discovered in audit reviews, not proactively.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 15–30 minutes per change of separate retrospective documentation effort; gets skipped under pressure", description: "Change records for his work are a separate manual step after executing the change — a step that gets skipped under time pressure, especially for emergency changes.", stageIndex: 1 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without Zach's expert log interpretation", description: "No automated attribution for out-of-Atlas changes — investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate.", stageIndex: 1 },
        { persona: "Quinn", type: "time", title: "Lost Time — hours reconstructing the 30-day change history for a single post-mortem investigation", description: "When an incident post-mortem asks 'what changed on this system in the last 30 days?', answering requires reviewing multiple logs manually across multiple tools.", stageIndex: 2 },
        { persona: "Derek", type: "time", title: "Lost Time — days assembling change history evidence per audit cycle", description: "Change record completeness for IBM Z — the foundational evidence for SOX IT General Controls — is consistently the most labor-intensive section of audit prep.", stageIndex: 2 },
        { persona: "Derek", type: "pain", title: "Business Impact — audit findings for undocumented changes are a predictable, recurring cost", description: "The gap between 'what actually happened on z/OS' and 'what the change management system knows about' is consistently a source of audit findings.", stageIndex: 2 },
        { persona: "Annette", type: "time", title: "Lost Time — hours per incident assembling the audit trail manually under time pressure", description: "Closing incidents requires a complete audit trail — assembling it manually from memory and multiple tool queries under time pressure is a routine frustration.", stageIndex: 3 },
        { persona: "Quinn", type: "pain", title: "Business Impact — emergency change governance is a process requirement, but enforcement is entirely behavioral", description: "Emergency changes frequently get change records created after the fact or miss the record entirely — process compliance relies entirely on individual discipline, with no enforcement mechanism.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours per post-mortem reviewing change history manually", description: "When an incident post-mortem asks what changed, Zach must review multiple logs manually — time that should have been preventable.", stageIndex: 3 },
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
        { persona: "Quinn", type: "skill", title: "Atlas AI Insight & Automation — continuous change window monitoring surfaces violations as they occur", description: "Out-of-window change alerts in real time — Atlas detects changes outside defined change windows and alerts Quinn immediately, not in the next post-mortem.", stageIndex: 0 },
        { persona: "Annette", type: "skill", title: "Atlas AI Insight & Automation — Config-as-Code diff against registered baseline is the mechanism no individual tool can replicate", description: "Undocumented changes detected automatically through Config-as-Code baseline diff — Annette receives a structured alert, not a behavioral symptom.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 15–30 minutes per change of retrospective documentation → automatic at execution", description: "Change records created without a separate step — for every change Zach executes through Atlas, the change record is generated and populated automatically as part of the workflow.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently investigates undocumented changes using Atlas's attribution data without Zach's expert log interpretation", description: "Out-of-Atlas change investigation starts with Atlas's evidence — configuration delta, timestamp, affected component, and user ID — immediately available without log archaeology.", stageIndex: 1 },
        { persona: "Quinn", type: "time", title: "Time Saving — hours of multi-tool log review → a single Atlas query", description: "'What changed on PROD1 in the last 30 days?' answered from Atlas in a structured response — replaces multi-tool log review with a single conversation.", stageIndex: 2 },
        { persona: "Derek", type: "time", title: "Time Saving — days assembling change history evidence → generated from Atlas's continuous record", description: "Change traceability evidence for any time period generated from Atlas — all changes, with attribution status (documented / undocumented / out-of-window) — in the format auditors need.", stageIndex: 2 },
        { persona: "Derek", type: "skill", title: "Atlas AI Insight & Automation — undocumented change enumeration is only possible through Atlas's combined change log and Config-as-Code baseline diff", description: "'46 undocumented changes' — surfaced before the auditor sees them. A specific, verifiable count rather than a gap discovered in the audit room.", stageIndex: 2 },
        { persona: "Annette", type: "time", title: "Time Saving — hours per incident of manual audit trail assembly → automatic continuous trail", description: "Incident audit trail generated automatically for every Atlas-managed change — Annette closes incidents with a complete, continuous record rather than assembling it under pressure.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — hours of post-mortem log review → single Atlas query", description: "When an incident post-mortem asks what changed, Zach queries Atlas — structured change history available without multi-tool log review.", stageIndex: 3 },
        { persona: "Quinn", type: "skill", title: "Atlas AI Insight & Automation — Atlas generates the retroactive change record template pre-populated from the detected change data", description: "Structured retroactive documentation workflow for emergency changes — consistent, template-driven, with Atlas linking the retroactive record to the detected change.", stageIndex: 4 },
        { persona: "Zach", type: "gain", title: "New User Capability — Zach independently plans rollbacks from Atlas's captured pre-change state without reconstructing the previous configuration", description: "Every Atlas-executed change has its pre-change state captured — rollback planning starts from a known, documented state, not from reconstructed memory.", stageIndex: 4 },
        { persona: "Quinn", type: "time", title: "Time Saving — annual audit finding remediation effort drops proportionally with change record coverage improvement", description: "Change record coverage goes from ~60% to 100% for Atlas-executed changes — the audit finding for undocumented changes drops from 46 per year to under 5.", stageIndex: 5 },
        { persona: "Quinn", type: "skill", title: "Atlas AI Insight & Automation — Atlas-to-ServiceNow integration closes the structural tool gap that was the root cause of undocumented changes", description: "ServiceNow integration (H2 2027): Atlas changes create ServiceNow records automatically — bi-directional, no manual step in either system.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z detects a production anomaly and the incident investigation asks 'what changed on this system in the last 30 days?'" },
            { label: "Concert4Z directs", description: "Atlas is queried for the change history of that component over the relevant time window." },
            { label: "Atlas returns", description: "A structured change record that Concert4Z uses as primary root cause analysis input — correlating anomaly timestamp against change record to identify likely responsible change." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z detects behavioral out-of-window anomalies; Atlas detects configuration out-of-window changes. Together they provide bidirectional out-of-window change detection coverage.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's behavioral change attribution confirms that the configuration change Atlas detected actually had a production consequence — the strongest evidence that a change was materially significant.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's incident record for the change period provides operational context for retroactive change records: 'this change was made during an active Concert4Z incident; the anomaly was resolved following the configuration change.' Linking the retroactive record to the Concert4Z incident creates a time-stamped narrative that auditors can follow.",
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Terraform produced", description: "Terraform generates a plan output describing infrastructure changes — accurate at infrastructure layer but lacking application-layer context." },
            { label: "Terraform directs", description: "Before submission to approval gate, operator submits plan to Atlas for enrichment. Atlas performs application-layer impact analysis." },
            { label: "Atlas returns", description: "Atlas impact assessment for the infrastructure change: which applications are at risk, blast radius, change history, compliance conflicts. Approver receives both Terraform plan and Atlas assessment." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas identifies any infrastructure components of the change that are Terraform-managed and confirms that the Terraform plan for those components has been reviewed and approved before Atlas's governance gate is completed." },
            { label: "Atlas directs", description: "The two governance gates are coordinated — Atlas does not authorise the z/OS software change until Terraform's infrastructure gate has been satisfied." },
            { label: "Terraform returns", description: "Terraform approval confirmation is incorporated into the Atlas governance record, creating a dual-gate evidence trail." },
          ],
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's immutable apply history records every infrastructure change with timestamp, operator identity, plan output, and approval record. This infrastructure change ledger complements Atlas's z/OS change ledger — together providing complete traceability across all change types.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "The Atlas audit report enriched with Terraform's apply history provides a combined single-document record of all changes during the audit period — z/OS software changes (Atlas) and infrastructure changes (Terraform) together.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Investigate Application Code Changes",
          steps: [
            { label: "Atlas produced", description: "Atlas has surfaced an undocumented change through Config-as-Code baseline comparison: timestamp, affected component, user ID attribution, and configuration delta. For changes to application program code, load modules, or JCL, Atlas has identified that the change affects an application component." },
            { label: "Atlas directs", description: "Atlas directs the investigator to Bob PPZ with evidence: affected program, change timestamp, and file-level delta. ZUnderstand analyses current and pre-change program states, identifies what logic changed, and surfaces whether the change represents a business-rule modification, data flow change, or structural refactor." },
            { label: "Bob PPZ returns", description: "A code-level change characterization that Atlas incorporates into the investigation record and the retroactive change documentation. This characterization is the evidence needed to determine authorization and risk for the undocumented change." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Document Retroactive Code Changes",
          steps: [
            { label: "Atlas produced", description: "For undocumented application code changes that were authorized, Atlas generates a retroactive change record template pre-populated from detected change data." },
            { label: "Atlas directs", description: "Atlas directs to Bob PPZ for code-level characterization: what the program did before and after, what business logic was affected, and what the risk of the change was. This makes the retroactive record defensible rather than superficial." },
            { label: "Bob PPZ returns", description: "Code-level summary of what changed, incorporated into the governance record. A retroactive record with code-level detail is substantially more credible for audit purposes than one noting only 'application code modified.'" },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "For out-of-Atlas application code changes detected through Config-as-Code baseline comparison, Bob PPZ enriches the attribution with code-level context: the semantic meaning of the change, its risk classification, and its relationship to other programs in the call chain.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "When Atlas presents the queryable change history, application code entries carry richer descriptions when Bob PPZ is installed: not just 'ACCTVAL01 modified' but 'ACCTVAL01 — account validation logic changed: fee calculation paragraph restructured.'",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state recording and comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules and automated checking" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Unauthorized and undocumented change detection" },
      { name: "Workflow Engine", timeline: "GA", description: "Change orchestration and governance" },
    ],
  },
  "uc-08": {
    id: "uc-08",
    label: "UC-08: Platform Upgrade and Migration",
    description: "Major z/OS and middleware upgrade planning with compatibility assessment and phased execution — reducing months-long manual planning to structured, sequenced, AI-generated plans.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Primary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
      { name: "Alice", role: "z/OS Systems Programmer (mid-level)", engagement: "Secondary" },
      { name: "Angie", role: "Application Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Scope", description: "Manual coordination to establish upgrade scope across all systems" },
        { name: "Assess", description: "Compatibility issues discovered during testing, not before" },
        { name: "Plan", description: "Months of planning effort with manual dependency resolution" },
        { name: "Provision", description: "Phase isolation rarely achieved; manual provisioning takes days" },
        { name: "Execute Phase", description: "Manual execution coordination across tools and teams" },
        { name: "Validate Phase", description: "Post-upgrade behavior change monitoring is informal" },
        { name: "Close", description: "Upgrade documentation assembled after the fact from tickets and memory" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 weeks just for initial compatibility scope assembly", description: "Assembling a complete compatibility picture manually takes weeks — IBM upgrade guides, IBM support databases, subsystem-specific notes, and application owner consultations must be coordinated manually.", stageIndex: 0 },
        { persona: "Greg", type: "time", title: "Lost Time — 1–2 weeks of infrastructure dependency investigation", description: "No unified infrastructure dependency picture for sysplex and LPAR sequencing requirements — Greg must reconstruct it before upgrade planning can begin.", stageIndex: 0 },
        { persona: "Angie", type: "skill", title: "Skill Gap / Bottleneck — Angie must coordinate with every application owner to understand application-level compatibility risk", description: "Application-level compatibility analysis requires querying every application team — no cross-application view of which code depends on behaviors that are changing.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — late discovery of compatibility issues is a leading cause of upgrade failures and emergency rollbacks", description: "Compatibility issues are typically discovered during testing — sometimes during production cutover — because the manual analysis missed a dependency.", stageIndex: 1 },
        { persona: "Greg", type: "pain", title: "Business Impact — incorrect subsystem upgrade order can cause failures worse than not upgrading", description: "Sequencing mistakes (wrong upgrade order for interdependent subsystems) are a leading cause of upgrade failures. Manual sequencing from experience, not from analysis.", stageIndex: 1 },
        { persona: "Angie", type: "pain", title: "Business Impact — application owners cannot pre-remediate issues they do not know exist", description: "Application owners may not know their applications have dependencies on behaviors that are changing — the compatibility gap is unknown until testing or production.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — months of planning effort before any upgrade action can begin", description: "A z/OS version upgrade involves a dedicated planning project measured in months — the planning overhead alone is a major barrier to currency.", stageIndex: 2 },
        { persona: "Greg", type: "time", title: "Lost Time — weeks of plan construction by the most experienced infrastructure team members", description: "Phased plan construction requires manually resolving interdependencies across subsystems, LPARs, and sysplex topology — no automated sequencing tool.", stageIndex: 2 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — upgrade planning is restricted to the handful of engineers who carry the full topology model in their heads", description: "Mid-level engineers cannot contribute to upgrade planning because the dependency knowledge required is not documented anywhere accessible.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — days per phase for environment provisioning, leading to phase isolation being abandoned under schedule pressure", description: "Phase isolation is rarely achieved — environments are provisioned manually, provisioning takes too long, and teams shortcut phase boundaries to stay on schedule.", stageIndex: 3 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — Alice blocked on Zach for every provisioning step", description: "Environment provisioning is entirely Zach-dependent — Alice cannot independently set up a phase test environment.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — days per phase of manual execution coordination across tools and teams", description: "Each phase executed manually with no integrated tooling — SMP/E for PTFs, separate tools for subsystem configuration, separate communication for application teams.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — upgrade phase failures during production execution can require emergency rollback", description: "Phase failures are discovered during execution — there is no pre-phase validation to surface problems before production is touched.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — silent behavioral regressions post-upgrade go undetected until they cause incidents", description: "Post-upgrade behavior change monitoring is informal — a subsystem running differently after upgrade may not be noticed until a user complaint or production incident.", stageIndex: 5 },
        { persona: "Angie", type: "pain", title: "Business Impact — application regressions from platform upgrades are a consistent source of post-upgrade incidents", description: "Application teams have no systematic way to verify their applications function correctly after a platform upgrade — testing is ad hoc and coverage is incomplete.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Lost Time — days of retrospective documentation effort", description: "Upgrade documentation is assembled after the fact from change tickets, email, and memory — audit trail is incomplete.", stageIndex: 6 },
        { persona: "Greg", type: "pain", title: "Business Impact — without a registered post-upgrade baseline, infrastructure drift is undetectable", description: "New infrastructure baseline is not formally registered anywhere — drift from the new target state will accumulate silently until the next planned review.", stageIndex: 6 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Full compatibility impact scoped in minutes across all LPARs and subsystems" },
        { name: "Assess", description: "Compatibility issues surfaced before project starts, not during cutover" },
        { name: "Plan", description: "Structured Atlas-generated plan with phase boundaries and sequencing" },
        { name: "Provision", description: "Phase isolation maintained automatically with Atlas provisioning" },
        { name: "Execute Phase", description: "Atlas-orchestrated execution across all tools" },
        { name: "Validate Phase", description: "Behavioral monitoring post-phase identifies deviations before next phase" },
        { name: "Close", description: "Complete upgrade record generated automatically; new baseline registered" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Time Saving — 2–4 weeks → minutes for initial compatibility scope", description: "Full compatibility impact scoped in minutes — all LPARs, all subsystems, all applications, all compatibility notes for the target version. 300-application sweep without a single manual query.", stageIndex: 0 },
        { persona: "Greg", type: "time", title: "Time Saving — 1–2 weeks → minutes for infrastructure dependency analysis", description: "Infrastructure dependency picture for sysplex and LPAR sequencing requirements produced automatically from Atlas's topology model.", stageIndex: 0 },
        { persona: "Angie", type: "gain", title: "New User Capability — Angie independently identifies application-level compatibility risk without coordinating with every application owner", description: "Application-level compatibility findings surfaced directly — application teams notified of what they need to remediate before the upgrade begins.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — Atlas joins IBM compatibility notes with the live topology to produce a specific, grounded compatibility gap list", description: "Compatibility issues surfaced before the project starts, not during production cutover. The list of what needs remediation before the upgrade begins is complete from day one.", stageIndex: 1 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — dependency-aware sequencing analysis produces the correct upgrade order, not an experience-based guess", description: "Sequencing risk identification — Atlas identifies which subsystems must be upgraded in a specific order to avoid compatibility failures, based on their dependency relationships.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — months → days for upgrade plan construction", description: "Months of planning effort compressed into a structured Atlas-generated plan — phase boundaries, sequencing, environment specs, and test scenarios all generated from the topology.", stageIndex: 2 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently executes delegated upgrade phases from Atlas's structured plan", description: "Mid-level engineers can execute phases assigned in the Atlas plan — the dependency knowledge is embedded in the plan, not required from the executor.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — days per phase provisioning → automated", description: "Phase isolation maintained automatically — each phase validated in an isolated environment without manual provisioning.", stageIndex: 3 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently provisions phase environments", description: "Alice can independently prepare phase environments from Atlas's specification without requiring Zach for each provisioning step.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — days per phase manual coordination → Atlas-orchestrated execution", description: "Phase execution is Atlas-orchestrated across all tools — no manual coordination across SMP/E, subsystem configuration, and application deployment.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — reasoning visible at every step; no black-box execution", description: "Zach authorizes each production step — governance gate maintained with full visibility into what Atlas will execute before authorization.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — behavioral baseline comparison identifies post-upgrade regressions that would otherwise be invisible until production incidents", description: "Behavioral monitoring post-phase — Atlas identifies if a subsystem is running differently after the upgrade and surfaces the deviation before the next phase begins.", stageIndex: 5 },
        { persona: "Angie", type: "time", title: "Time Saving — ad hoc manual testing → systematic Atlas-generated test execution per phase", description: "Application regression testing scoped to the phase's changes — Atlas runs the relevant test scenarios and surfaces failures before production.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Time Saving — days retrospective documentation → automatic", description: "Complete upgrade record generated automatically — every phase, every authorization, every test result captured without retrospective assembly.", stageIndex: 6 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — baseline registration happens as part of upgrade close; no separate action required", description: "New infrastructure baseline registered in Atlas at close — post-upgrade drift is immediately detectable against the new reference state.", stageIndex: 6 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's Risk Management module may detect that the estate is running software at a level that creates operational risk, triggering the upgrade initiative. Post-upgrade, Concert4Z's behavioral monitoring detects silent regressions after each upgrade phase.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas identifies infrastructure resource requirements for the new release: memory increases, storage allocation changes, CPU entitlement adjustments." },
            { label: "Atlas directs", description: "Atlas passes the infrastructure resource requirement delta to Terraform as proposed HCL changes. Terraform generates a plan output showing exactly what infrastructure changes are needed." },
            { label: "Terraform returns", description: "A Terraform plan confirming the infrastructure changes required. Atlas incorporates this as the infrastructure change scope in the upgrade plan." },
          ],
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas passes the phase-specific infrastructure specification to Terraform for provisioning." },
            { label: "Atlas directs", description: "Terraform provisions the LPAR resources in an isolated workspace that prevents test resources from affecting production." },
            { label: "Terraform returns", description: "A Terraform-provisioned phase test environment. Atlas applies the upgrade and runs the regression test suite." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Deprecated API Remediation",
          steps: [
            { label: "Atlas produced", description: "Atlas has produced a complete compatibility gap list — every LPAR, subsystem, and application with a known incompatibility with the target version. For application-level gaps (programs using deprecated APIs, JCL using removed features), Atlas identifies the affected program(s) and the compatibility issue." },
            { label: "Atlas directs", description: "For each application-level compatibility gap, Atlas presents the finding with affected program identified and directs application owners to Bob PPZ. ZUnderstand analyzes the program to locate the specific deprecated construct and provides the safe migration path." },
            { label: "Bob PPZ returns", description: "A set of code change artifacts — the remediated programs — that Atlas validates in a compatibility test environment before the upgrade proceeds. Atlas tracks remediation completeness: the upgrade plan cannot proceed until all application-level gaps are resolved." },
          ],
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Phase Execution Fix",
          steps: [
            { label: "Atlas produced", description: "Atlas is orchestrating upgrade phase execution. If an unexpected application code issue surfaces during phase execution, Atlas surfaces the finding." },
            { label: "Atlas directs", description: "Atlas directs the developer to Bob PPZ for an accelerated fix — passing the phase context, failed compatibility test, and affected program." },
            { label: "Bob PPZ returns", description: "A code fix artifact. Atlas re-validates the phase with the fix applied before proceeding." },
          ],
          stageIndex: 4,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Regression Fix",
          steps: [
            { label: "Atlas produced", description: "Atlas has run application regression testing scoped to each phase's changes. If regression failures are attributed to application code issues — a program that behaved correctly before the upgrade but now fails — Atlas surfaces the failure." },
            { label: "Atlas directs", description: "Atlas directs the developer to Bob PPZ with the regression failure context: specific program, failing execution path, and pre/post-upgrade behavior difference." },
            { label: "Bob PPZ returns", description: "A corrected code artifact. Atlas re-runs the regression tests for the affected phase, confirms pass, and records the fix in the phase validation record." },
          ],
          stageIndex: 5,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas scopes compatibility impact across all LPARs, subsystems, and applications. Bob PPZ enriches the application-level scope with ZUnderstand's code-level inventory: rather than identifying 'Application X may be affected,' Bob PPZ enables Atlas to identify '47 programs in Application X use EXEC CICS commands being deprecated in the target version, with 12 in transaction-critical paths.'",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Bob PPZ enriches the compatibility assessment by enabling Atlas to classify remediation complexity (simple API substitution vs. structural change), identify safe batching of programs with the same deprecated construct, and surface hidden dependencies through ZUnderstand's call graph.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "The Atlas-generated upgrade plan includes application remediation phases. When Bob PPZ is present, the plan includes code-level effort estimates for each application remediation task — derived from ZUnderstand's analysis of scope and complexity — enabling accurate resource planning that directly impacts the overall upgrade timeline.",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Compatibility and sequencing analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Upgrade orchestration and execution" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
    ],
  },
  "uc-06": {
    id: "uc-06",
    label: "UC-06: Patch Management",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with full audit trail.",
    personas: [
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Primary" },
      { name: "Sage", role: "Security Administrator", engagement: "Secondary" },
      { name: "Stan", role: "Subsystem SME", engagement: "Secondary" },
      { name: "Alice", role: "z/OS Systems Programmer (mid-level)", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Identify needed patches through scheduled reviews, advisories, or SME concerns." },
        { name: "Analyze", description: "Manually cross-reference PTF descriptions against application topology." },
        { name: "Plan", description: "Generate sequenced patch plan with prerequisite chain resolution." },
        { name: "Provision", description: "Manually provision test environment mirroring production." },
        { name: "Deploy", description: "Deploy application components into test environment." },
        { name: "Validate", description: "Apply patches in test and run manual validation." },
        { name: "Decide", description: "Review test results and make production promotion decision." },
        { name: "Execute", description: "Orchestrate production apply with manual sequencing." },
        { name: "Govern", description: "Create change record and seal audit trail." },
      ],
      markers: [
        // S1 — Routine PTF Maintenance (as-is pains)
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours per environment to understand PTF state", description: "Querying SMP/E for PTF inventory and prerequisite chains requires ISPF dialogs with no natural language interface — slow and expert-dependent.", stageIndex: 0 },
        { persona: "Stan", type: "time", title: "Lost Time — hours per quarter monitoring middleware fix lists", description: "Subsystem-specific maintenance gaps (CICS, Db2, MQ) are not surfaced automatically — Stan must monitor IBM fix lists and product announcements manually.", stageIndex: 0 },

        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours manual impact analysis per patch batch", description: "Impact assessment requires manually cross-referencing PTF descriptions against application topology — a process relying entirely on expert knowledge not documented anywhere.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — changes proceed with incomplete impact knowledge", description: "Most organizations cannot confidently answer \"what will break if I apply this PTF?\" without hours of multi-team investigation, increasing the risk of production incidents.", stageIndex: 1 },
        { persona: "Stan", type: "skill", title: "Skill Gap / Bottleneck — cross-subsystem analysis depends on convening SMEs", description: "Each subsystem specialist only knows their own domain; cross-subsystem impact (CICS → Db2 contention scenarios) requires convening Zach, Stan, the DBA, and MQ admin simultaneously.", stageIndex: 1 },

        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours prerequisite tracing with SMP/E", description: "PTF prerequisite and co-requisite chains are navigated manually in SMP/E; a missed co-requisite can cause a failed production apply.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — plan quality relies entirely on human memory", description: "No AI-generated plan tied to the actual topology — plans are built from memory and informal processes, making quality dependent on whoever writes it.", stageIndex: 2 },
        { persona: "Stan", type: "time", title: "Lost Time — 1–2 days of back-and-forth to align subsystem scope", description: "For middleware patches, Stan's sign-off on the subsystem scope requires manual coordination with Zach via email or meetings.", stageIndex: 2 },

        { persona: "Zach", type: "time", title: "Lost Time — 2–5 days to provision a realistic test environment", description: "Test environments are provisioned manually — slow, error-prone, and frequently skipped under time pressure so production becomes the de facto test environment.", stageIndex: 3 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — Alice cannot provision test environments alone", description: "Mid-level engineers cannot independently provision test environments; every provisioning step requires Zach's involvement or a separate infrastructure team request.", stageIndex: 3 },

        { persona: "Zach", type: "time", title: "Lost Time — 2–6 hours to deploy application components into test", description: "Application component deployment into a test environment is a manual, multi-step process — each component must be configured separately before testing can begin.", stageIndex: 4 },

        { persona: "Zach", type: "time", title: "Lost Time — 4–16 hours of manual test execution per patch cycle", description: "Test execution is manual; there is no automated test scaffolding tied to the specific change. Coverage depends entirely on individual engineer discipline.", stageIndex: 5 },
        { persona: "Stan", type: "skill", title: "Skill Gap / Bottleneck — subsystem validation isolated from overall change view", description: "Subsystem-specific validation results are reviewed separately by Stan in isolation from Zach's overall plan — there is no shared artifact tying subsystem sign-off to the global patch cycle.", stageIndex: 5 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — every test failure escalates to Zach", description: "Test failures require Zach to investigate — mid-level engineers lack the context to diagnose PTF-related test failures independently.", stageIndex: 5 },

        { persona: "Zach", type: "time", title: "Lost Time — 1–2 hours assembling evidence before promotion decision", description: "Test evidence is assembled manually from multiple sources — spreadsheets, logs, and email — before Zach can make a production promotion decision.", stageIndex: 6 },
        { persona: "Quinn", type: "skill", title: "Skill Gap / Bottleneck — Quinn needs a separate summary to approve promotion", description: "Approving production promotion requires a non-technical summary that Zach must produce separately; there is no management-ready artifact generated from the technical work.", stageIndex: 6 },

        { persona: "Zach", type: "pain", title: "Business Impact — emergency patches bypass normal process", description: "Emergency patches bypass normal process because there is no fast-track workflow that is also safe — teams are forced to choose between speed and rigor.", stageIndex: 7 },
        { persona: "Zach", type: "pain", title: "Business Impact — rollback planning is improvised under pressure", description: "Rollback planning is informal; when a patch causes a problem the remediation path is improvised during an outage rather than planned in advance.", stageIndex: 7 },

        { persona: "Zach", type: "time", title: "Lost Time — 1–3 hours retrospective change record assembly", description: "Change records are assembled after the fact from memory and email threads — a separate manual step that often gets skipped under time pressure.", stageIndex: 8 },
        { persona: "Annette", type: "time", title: "Lost Time — 1–2 hours per cycle pulling change evidence from disparate tools", description: "Monitoring change execution and reviewing change records requires querying multiple systems — no single source of truth ties the full patch cycle together.", stageIndex: 8 },

        // S2 — Security PTF Application (as-is pains, mapped onto same stages)
        { persona: "Zach", type: "time", title: "Lost Time — 2–3 days to answer \"are we exposed?\"", description: "Answering \"are we exposed?\" to a security advisory requires logging into ISPF on each LPAR, running SMP/E or GIMAPI queries, and cross-referencing results manually across the estate.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — Sage cannot determine exposure independently", description: "Sage has no direct way to determine exposure without going through Zach first and is dependent on a verbal summary rather than real data.", stageIndex: 0 },

        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours cross-referencing multi-LPAR query results", description: "Manually cross-referencing exposure results across LPARs for a security PTF relies entirely on expert memory and ad hoc spreadsheets.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — detection always lags advisory publication", description: "There is no proactive signal before a CVE is publicly published — exposure is discovered reactively from the advisory instead of from continuous monitoring.", stageIndex: 1 },

        { persona: "Zach", type: "time", title: "Lost Time — 1–3 days senior engineer time for blast radius", description: "Blast radius analysis for a security patch has no automated tooling — it requires the most experienced engineer to trace dependencies from memory.", stageIndex: 2 },
        { persona: "Sage", type: "pain", title: "Business Impact — no auditable blast radius picture for security posture", description: "There is no unified, query-ready blast radius artifact Sage can use to defend certificate and compliance posture in audits.", stageIndex: 2 },

        { persona: "Zach", type: "pain", title: "Business Impact — prerequisite mistakes cause failed security patch applies", description: "PTF prerequisite chain resolution is manual; a missed co-requisite causes a failed apply that may be discovered only during a production change window.", stageIndex: 3 },

        { persona: "Zach", type: "time", title: "Lost Time — 2–5 days to provision and configure security patch labs", description: "Lab environments for security PTFs take days to provision and configure; under time pressure this step is skipped and production becomes the de facto test.", stageIndex: 4 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — delegated remediation still blocked on Zach", description: "Remediation steps delegated by Zach lack the context needed to execute them safely; Alice still requires Zach's availability for every significant action.", stageIndex: 4 },

        { persona: "Zach", type: "pain", title: "Business Impact — multi-LPAR security apply sequenced from memory", description: "Multi-LPAR apply for security PTFs is sequenced from memory; shared Db2 or MQ dependencies are a coordination risk during emergency windows.", stageIndex: 7 },

        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours assembling security patch audit trail", description: "The full security patch audit trail is assembled after the fact from memory, email threads, and change tickets.", stageIndex: 8 },
        { persona: "Sage", type: "pain", title: "Business Impact — incomplete security patch evidence for auditors", description: "Without an automated record, there is no auditor-ready evidence package for security PTF remediation without repeating much of the investigation work.", stageIndex: 8 }
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas proactively surfaces missing or at-risk PTFs." },
        { name: "Analyze", description: "Atlas maps impact, affected subsystems, and prerequisite chains." },
        { name: "Plan", description: "Atlas generates sequenced patch plan tied to actual topology." },
        { name: "Provision", description: "Monoplex L2 virtual LPAR provisioned mirroring production." },
        { name: "Deploy", description: "Application components deployed automatically from topology model." },
        { name: "Validate", description: "Atlas applies patches and runs test package with failure attribution." },
        { name: "Decide", description: "Zach reviews test results and Atlas recommendation; authorizes promotion." },
        { name: "Execute", description: "Atlas orchestrates production apply with real-time progress." },
        { name: "Govern", description: "Atlas generates complete traceability automatically." },
      ],
      markers: [
        // S1 — Routine PTF Maintenance (to-be wows)
        { persona: "Zach", type: "time", title: "Time Saving — proactive PTF gap surfacing", description: "Atlas proactively surfaces PTF gaps; Zach no longer needs to initiate quarterly SMP/E reviews to discover what needs attention.", stageIndex: 0 },
        { persona: "Stan", type: "gain", title: "New User Capability — subsystem SMEs see their own maintenance gaps", description: "Subsystem-specific maintenance gaps are surfaced directly to Stan — MQ, CICS, Db2 SMEs see their subsystem's patch needs without Zach as an intermediary.", stageIndex: 0 },

        { persona: "Zach", type: "time", title: "Time Saving — 4–8 hours → under 30 minutes for impact analysis", description: "Full impact of a PTF batch — which subsystems, applications, and transactions are affected, with prerequisite chains resolved — is understood in minutes.", stageIndex: 1 },
        { persona: "Stan", type: "skill", title: "Atlas AI & Automation — cross-subsystem risk compounding made visible", description: "Atlas surfaces subsystem-specific impact and cross-subsystem risks automatically, using its unified topology model rather than relying on SME memory.", stageIndex: 1 },

        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — topology-aware plan generation", description: "AI-generated plan anchored to the actual topology — PTF prerequisites resolved, apply order determined, and test scenarios scoped to the affected applications.", stageIndex: 2 },
        { persona: "Stan", type: "time", title: "Time Saving — 1–2 days coordination → structured plan sign-off", description: "Stan reviews and approves the subsystem scope directly in Atlas; his sign-off is captured in the plan, eliminating days of email back-and-forth.", stageIndex: 2 },

        { persona: "Zach", type: "time", title: "Time Saving — 2–5 days → automated test environment provisioning", description: "Test environment specification is generated automatically and provisioned as a monoplex L2 virtual LPAR matching production characteristics.", stageIndex: 3 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice participates in test setup independently", description: "Mid-level engineers can follow Atlas's provisioning specification and participate in test setup without needing Zach for every step.", stageIndex: 3 },

        { persona: "Zach", type: "time", title: "Time Saving — automatic application deployment into test", description: "Application components are deployed automatically into the test environment from the Atlas topology model; the test environment is ready without manual component-by-component configuration.", stageIndex: 4 },

        { persona: "Zach", type: "time", title: "Time Saving — 4–16 hours → automated test execution", description: "Atlas runs the test package and surfaces pass/fail with context; standard scenarios no longer require manual test writing and execution.", stageIndex: 5 },
        { persona: "Stan", type: "gain", title: "New User Capability — subsystem-specific validation in context", description: "Subsystem-specific test results are reviewed by Stan in Atlas with clear attribution to his subsystem, letting him sign off in context.", stageIndex: 5 },
        { persona: "Alice", type: "gain", title: "New User Capability — failure attribution without Zach", description: "Test failures are attributed by Atlas to specific dependencies; Alice can diagnose and iterate without escalating every failure to Zach.", stageIndex: 5 },

        { persona: "Zach", type: "time", title: "Time Saving — evidence pre-assembled for promotion decision", description: "Zach sees a clear recommendation with supporting evidence — test results, subsystem sign-offs, prerequisite resolution, and maintenance window fit — all in one view.", stageIndex: 6 },
        { persona: "Quinn", type: "gain", title: "New User Capability — Quinn makes informed production decisions", description: "Atlas presents a non-technical risk summary alongside the technical evidence, enabling Quinn to approve or defer production promotion without a separate briefing.", stageIndex: 6 },

        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — rollback plan generated with execution plan", description: "Rollback plan is generated alongside the execution plan; if the patch must be reversed, the rollback path is already documented and validated.", stageIndex: 7 },

        { persona: "Zach", type: "time", title: "Time Saving — change traceability generated automatically", description: "Complete traceability from detection through production apply is generated automatically — no manual change record assembly required.", stageIndex: 8 },
        { persona: "Annette", type: "time", title: "Time Saving — single source of truth for patch cycles", description: "Annette queries Atlas for a full patch cycle record rather than assembling evidence from multiple tools.", stageIndex: 8 },

        // S2 — Security PTF Application (to-be wows, mapped to same stages)
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — proactive security PTF gap detection", description: "Atlas surfaces FIXCAT security gaps without a user query, shortening the detection-to-response window for CRIT/HIGH vulnerabilities.", stageIndex: 0 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage initiates CISO brief from Atlas data", description: "Sage receives a proactive security patch alert with concrete exposure data and can brief the CISO immediately without waiting for Zach's manual investigation.", stageIndex: 0 },

        { persona: "Zach", type: "time", title: "Time Saving — 2–3 days → minutes to answer \"are we exposed?\"", description: "Atlas queries all connected LPARs simultaneously and answers \"are we exposed?\" in minutes, replacing multi-day SMP/E investigations.", stageIndex: 1 },
        { persona: "Sage", type: "gain", title: "New User Capability — direct exposure visibility for security", description: "Sage has direct access to a structured exposure picture — affected LPARs, products, and PTF gaps — without depending on Zach's verbal summary.", stageIndex: 1 },

        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — topology-based blast radius", description: "Blast radius is a topology map rather than a guess — Atlas traverses the dependency graph and names each reachable system and dataset.", stageIndex: 2 },
        { persona: "Sage", type: "time", title: "Time Saving — 1–3 days → under 30 minutes for a CISO-ready brief", description: "Sage can produce a CISO-ready exposure brief in under 30 minutes from Atlas's blast radius and exposure outputs.", stageIndex: 2 },

        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — PTF prerequisite and co-requisite resolution", description: "Security PTF prerequisite chains are resolved automatically; Atlas eliminates the leading cause of PTF-related production outages.", stageIndex: 3 },

        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — test environment always part of security patch workflow", description: "Security patches follow the same validated workflow as routine patches — including automated test environment provisioning and validation — without forcing a choice between speed and rigor.", stageIndex: 4 },
        { persona: "Alice", type: "gain", title: "New User Capability — delegated security remediation with guardrails", description: "Atlas generates step-by-step guidance for delegated security remediation work, enabling Alice to execute with guardrails instead of supervision.", stageIndex: 4 },

        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — dependency-aware security apply sequencing", description: "Atlas orchestrates the security patch apply across LPARs in dependency-aware order, avoiding cross-LPAR coordination failures.", stageIndex: 7 },

        { persona: "Zach", type: "time", title: "Time Saving — security patch audit trail generated automatically", description: "Security patch audit trail — exposure assessment, blast radius, plan, tests, applies, and validations — is generated automatically from Atlas's record.", stageIndex: 8 },
        { persona: "Sage", type: "gain", title: "New User Capability — auditor-ready security remediation evidence", description: "Sage delivers an auditor-ready security remediation evidence package from Atlas without repeating the underlying investigation.", stageIndex: 8 }
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Validate Test Failure",
          steps: [
            { label: "Atlas produced", description: "Atlas's test reveals a CICS API behavior change introduced by a PTF that a COBOL program relies on; the failure is attributed to a specific program and call path." },
            { label: "Atlas directs", description: "The user is directed to Bob PPZ with failure attribution — affected program, subsystem behavior change, and failing scenario — for code-level correction." },
            { label: "Bob PPZ returns", description: "A corrected code artifact. Atlas re-runs targeted tests and incorporates the fix into the promotion package." }
          ],
          stageIndex: 5
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Decide Middleware Patches",
          steps: [
            { label: "Atlas produced", description: "Test results for middleware patches indicate application code changes are required before production promotion." },
            { label: "Atlas directs", description: "Application owners are directed to Bob PPZ with full context — affected programs, dependency graph, and failing behaviors." },
            { label: "Bob PPZ returns", description: "Resolved code artifacts returned to Atlas for re-validation before Quinn authorizes promotion." }
          ],
          stageIndex: 6
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Analyze Impact",
          summary: "Bob PPZ's ZUnderstand metadata enriches Atlas's impact analysis by identifying which COBOL programs use specific API calls modified by a given PTF.",
          stageIndex: 1
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Plan Test Scenarios",
          summary: "Atlas uses ZUnderstand to enrich test scenarios with code-level targets — specific transactions, program entry points, and data paths that exercise constructs touched by the patch.",
          stageIndex: 2
        },
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Detect PTF Gap",
          steps: [
            { label: "Concert4Z produced", description: "Concert for Z's Risk Management module detects missing critical or HIPER PTFs across the estate." },
            { label: "Concert4Z directs", description: "The risk triggers an Atlas patch workflow for full impact analysis and planning." },
            { label: "Atlas returns", description: "Atlas completes the patch cycle; Concert4Z sees the risk resolved and associates the Atlas change record with the risk item." }
          ],
          stageIndex: 0
        },
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Post-Apply Monitoring",
          steps: [
            { label: "Atlas produced", description: "Atlas has applied patches to production and recorded the change." },
            { label: "Concert4Z directs", description: "Concert4Z's Observe and Optimize modules monitor for post-patch regressions in production behavior." },
            { label: "Atlas returns", description: "If Concert4Z detects regressions, Atlas is invoked to investigate, attribute to specific PTFs, and plan remediation or rollback." }
          ],
          stageIndex: 8
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Analyze Baseline",
          summary: "Concert4Z's production performance baselines improve the specificity of Atlas's pre/post behavioral comparison during patch validation.",
          stageIndex: 1
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Validate Coverage",
          summary: "ZEN runtime relationship data identifies the most active production transaction flows so Atlas can prioritize test coverage on the paths that matter most.",
          stageIndex: 5
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Assess PTF Readiness",
          steps: [
            { label: "Atlas produced", description: "Atlas adds an infrastructure readiness gate to the patch plan." },
            { label: "Atlas directs", description: "Teams run terraform plan against each target LPAR workspace to confirm zero infrastructure drift before patching." },
            { label: "Terraform returns", description: "Plan outputs confirm infrastructure parity or surface drift that must be resolved before proceeding; Atlas incorporates this into readiness." }
          ],
          stageIndex: 1
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Provision Test Environment",
          steps: [
            { label: "Atlas produced", description: "Atlas generates the infrastructure specification for the test LPAR." },
            { label: "Atlas directs", description: "Terraform provisions LPAR resources in an isolated workspace that mirrors production's infrastructure." },
            { label: "Terraform returns", description: "A Terraform-provisioned test environment ready for patch apply and validation." }
          ],
          stageIndex: 3
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Plan Maintenance Window",
          summary: "Terraform's state file provides LPAR metadata and grouping that Atlas uses to assign LPARs to maintenance window slots safely.",
          stageIndex: 2
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Record Audit Trail",
          summary: "Terraform's versioned state file produces automatic before/after infrastructure snapshots complementing Atlas's patch evidence package.",
          stageIndex: 8
        }
      ]
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Change Risk Assessment", timeline: "GA", description: "PTF impact and prerequisite analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Patch orchestration and execution" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
    ],
  },
  "uc-07": {
    id: "uc-07",
    label: "UC-07: Application Change Management",
    description: "Developer-native change lifecycle with impact analysis, test generation, and deployment orchestration.",
    personas: [
      { name: "Kathleen", role: "z/OS Application Developer (experienced)", engagement: "Primary" },
      { name: "Deb", role: "z/OS Application Developer (early tenure)", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Angie", role: "Application Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Assess Impact", description: "Developers rely on tribal knowledge to understand what a change affects." },
        { name: "Provision Environment", description: "Test environments provisioned manually; wait times hours to days." },
        { name: "Code", description: "Developer writes code without real-time topological feedback." },
        { name: "Generate Test Plan", description: "Manual test planning based on developer knowledge." },
        { name: "Validate", description: "Little or no test automation; regressions caught late." },
        { name: "Deploy", description: "Multiple manual steps across tools and teams for CICS/IMS deployment." },
      ],
      markers: [
        { persona: "Kathleen", type: "time", title: "Lost Time — half a day to 2 days informal investigation", description: "No tool joins application topology with code-level impact analysis.", stageIndex: 0 },
        { persona: "Deb", type: "skill", title: "Skill Gap — Deb cannot assess impact independently", description: "Early-tenure developer has no tribal knowledge; every change requires consultation.", stageIndex: 0 },
        { persona: "Deb", type: "time", title: "Lost Time — hours to 2 days waiting for environment", description: "Filing a ticket and waiting blocks development flow.", stageIndex: 1 },
        { persona: "Kathleen", type: "time", title: "Lost Time — 2–4 hours writing test plan", description: "Manual test planning scoped by individual knowledge, not systematic analysis.", stageIndex: 3 },
        { persona: "Deb", type: "pain", title: "Business Impact — regressions caught in production", description: "Late regression detection is the most expensive quality failure mode.", stageIndex: 4 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours of multi-tool handoff", description: "Deploying to CICS or IMS requires coordination across multiple teams.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess Impact", description: "Atlas identifies affected programs, tables, transactions, and dependencies in seconds." },
        { name: "Provision Environment", description: "Isolated test environment provisioned in background while developer writes code." },
        { name: "Code", description: "Developer writes code with Atlas context available in IDE." },
        { name: "Generate Test Plan", description: "Atlas generates test plan scoped to actual change automatically." },
        { name: "Validate", description: "Automated test execution with failure attribution in isolated environment." },
        { name: "Deploy", description: "Atlas orchestrates CICS/IMS deployment; developer initiates, Atlas handles configuration." },
      ],
      markers: [
        { persona: "Kathleen", type: "time", title: "Time Saving — half a day to 2 days → seconds for impact assessment", description: "Full answer across CICS, Db2, MQ, and z/OS Connect before any code is written.", stageIndex: 0 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb understands scope before making changes", description: "Atlas provides system context Deb does not yet carry independently.", stageIndex: 0 },
        { persona: "Deb", type: "time", title: "Time Saving — hours to 2 days → background provisioning", description: "No ticket, no wait time; isolated environment ready when needed.", stageIndex: 1 },
        { persona: "Kathleen", type: "time", title: "Time Saving — 2–4 hours → automatic test plan generation", description: "Test scenarios scoped to transactions and API paths the change touches.", stageIndex: 3 },
        { persona: "Deb", type: "gain", title: "New User Capability — developer-controlled regression testing", description: "Regressions caught in isolated environment before integration testing.", stageIndex: 4 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours of handoff → Atlas-orchestrated workflow", description: "Developer initiates; Atlas handles configuration steps.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        { type: "handoff", product: "Bob PPZ", title: "Assess Impact to Code", steps: [{ label: "Atlas produced", description: "Complete blast radius with affected programs and dependencies." }, { label: "Atlas directs", description: "Developer opens affected programs in Bob PPZ with full context." }, { label: "Bob PPZ returns", description: "Completed code change artifact." }], stageIndex: 0 },
        { type: "handoff", product: "Bob PPZ", title: "Validate Test Failure", steps: [{ label: "Atlas produced", description: "Test failure attributed to specific code dependency." }, { label: "Atlas directs", description: "Failure context passed to developer in Bob PPZ." }, { label: "Bob PPZ returns", description: "Corrected artifact; Atlas re-validates." }], stageIndex: 4 },
        { type: "handoff", product: "Bob PPZ", title: "Deploy Code Fix", steps: [{ label: "Atlas produced", description: "Deployment reveals unexpected code issue." }, { label: "Atlas directs", description: "Developer adjusts in Bob PPZ." }, { label: "Bob PPZ returns", description: "Updated artifact for deployment." }], stageIndex: 5 },
        { type: "enrichment", product: "Bob PPZ", title: "Impact Analysis Precision", summary: "ZUnderstand metadata enriches blast radius with code-level precision: execution paths, business rules, coupling scores.", stageIndex: 0 },
        { type: "enrichment", product: "Bob PPZ", title: "Test Plan Coverage", summary: "Test scenarios include code-level execution path coverage for changed constructs.", stageIndex: 3 },
        { type: "enrichment", product: "Bob PPZ", title: "IDE Context", summary: "Atlas context (spec, impact analysis, test plan) available in IDE without manual handoff.", stageIndex: 1 },
        { type: "enrichment", product: "Concert4Z", title: "Blast Radius Accuracy", summary: "ZEN runtime relationship data distinguishes active call paths from dormant static relationships.", stageIndex: 0 },
        { type: "enrichment", product: "Concert4Z", title: "Validation Baseline", summary: "Production behavioral baselines inform validation criteria for post-change test evaluation.", stageIndex: 4 },
        { type: "enrichment", product: "Concert4Z", title: "Post-Deploy Context", summary: "Atlas change record provides primary context for Concert4Z incident investigation after deployment.", stageIndex: 5 },
        { type: "handoff", product: "Terraform", title: "Provision Test Environment", steps: [{ label: "Atlas produced", description: "Infrastructure specification for test environment." }, { label: "Atlas directs", description: "Terraform provisions LPAR resources from HCL configuration." }, { label: "Terraform returns", description: "Provisioned test environment with infrastructure matching production." }], stageIndex: 1 },
        { type: "handoff", product: "Terraform", title: "Promote to Production", steps: [{ label: "Atlas produced", description: "Promotion requires next-stage environment." }, { label: "Atlas directs", description: "Terraform provisions stage environment and tears down previous." }, { label: "Terraform returns", description: "Workspace lifecycle log provides infrastructure audit trail." }], stageIndex: 5 },
        { type: "enrichment", product: "Terraform", title: "Impact Analysis Boundaries", summary: "Terraform workspace boundaries flag cross-boundary changes with elevated risk.", stageIndex: 0 },
        { type: "enrichment", product: "Terraform", title: "Change Record", summary: "Terraform apply history provides infrastructure-layer change record for governance.", stageIndex: 5 },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Application dependency relationships" },
      { name: "Change Risk Assessment", timeline: "H1 2027", description: "Application code change impact analysis" },
      { name: "Workflow Engine", timeline: "H1 2027", description: "Developer change orchestration" },
      { name: "Test Environment Provisioning", timeline: "H1 2027", description: "Isolated developer sandboxes" },
    ],
  },
  "uc-09": {
    id: "uc-09",
    label: "UC-09: Application Modernization",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization.",
    personas: [
      { name: "Angie", role: "Application Architect", engagement: "Primary" },
      { name: "Kathleen", role: "z/OS Application Developer (experienced)", engagement: "Secondary" },
      { name: "Deb", role: "z/OS Application Developer (early tenure)", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Analyze", description: "Manual research phase lasting weeks or months to understand application structure." },
        { name: "Plan", description: "Manual technical debt identification and modernization prioritization." },
        { name: "Execute Phase", description: "Code-level changes to tightly coupled legacy code with incomplete understanding." },
        { name: "Validate Phase", description: "Testing in shared environments with manual regression scoping." },
        { name: "Promote", description: "Production promotion requires multi-team handoff for every phase." },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Lost Time — weeks to months manual research", description: "Manually reading code, interviewing experts, reviewing CSD and Db2 catalog.", stageIndex: 0 },
        { persona: "Angie", type: "pain", title: "Business Impact — plans built on incomplete understanding", description: "Research produces no structured artifact; plans acknowledge their own incompleteness.", stageIndex: 0 },
        { persona: "Angie", type: "time", title: "Lost Time — weeks identifying technical debt", description: "Manual identification of deprecated APIs, monolithic structures, duplicated logic.", stageIndex: 1 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — runtime failures from dynamic dependencies", description: "Static analysis misses dynamic call patterns; changes cause unexpected failures.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours manual regression scoping", description: "Regression test coverage depends on developer knowledge of what the phase changed.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours multi-team coordination per phase", description: "Production promotion requires Zach for configuration steps every phase.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Analyze", description: "Atlas produces complete structure, technical debt, and dependency map in minutes." },
        { name: "Plan", description: "Atlas generates prioritized modernization plan from technical debt analysis." },
        { name: "Execute Phase", description: "Full runtime call chain visible before changes; Atlas-orchestrated configuration." },
        { name: "Validate Phase", description: "Phase regression testing scoped automatically; isolated environment provisioned." },
        { name: "Promote", description: "Atlas-orchestrated phase promotion with architectural conformance checking." },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Time Saving — weeks to months → minutes for analysis", description: "Complete application structure from topology model and ZUnderstand dynamic call chains.", stageIndex: 0 },
        { persona: "Angie", type: "skill", title: "Atlas AI Insight — data-driven prioritization", description: "Plan generated from technical debt analysis, coupling scores, and deadline surfacing.", stageIndex: 1 },
        { persona: "Kathleen", type: "skill", title: "Atlas AI Insight — runtime call chain prevents silent failures", description: "ZUnderstand dynamic call chain makes dynamic dependencies visible before changes.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours → automatic regression scoping", description: "Test targets generated from programs and call chains the phase changed.", stageIndex: 3 },
        { persona: "Angie", type: "skill", title: "Atlas AI Insight — architectural conformance check", description: "Promoted code checked against intended architecture before production apply.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        { type: "handoff", product: "Bob PPZ", title: "Execute Phase Code Changes", steps: [{ label: "Atlas produced", description: "Complete phase specification with coupling analysis and blast radius." }, { label: "Atlas directs", description: "Developer uses ZUnderstand for business rule extraction and implementation planning." }, { label: "Bob PPZ returns", description: "Phase-completed code artifacts." }], stageIndex: 2 },
        { type: "handoff", product: "Bob PPZ", title: "Validate Phase Fix", steps: [{ label: "Atlas produced", description: "Test failure attributed to coupling point." }, { label: "Atlas directs", description: "Failure context passed to Bob PPZ for precise adjustment." }, { label: "Bob PPZ returns", description: "Corrected artifact; Atlas re-validates." }], stageIndex: 3 },
        { type: "handoff", product: "Bob PPZ", title: "Promote Conformance", steps: [{ label: "Atlas produced", description: "Architectural conformance check identifies deviation." }, { label: "Atlas directs", description: "Finding returned to Bob PPZ for targeted adjustment." }, { label: "Bob PPZ returns", description: "Corrected artifact before production apply." }], stageIndex: 4 },
        { type: "enrichment", product: "Bob PPZ", title: "Analysis Business Rules", summary: "Business rule extraction, data dictionary, precise execution paths, and coupling scores enrich the modernization analysis.", stageIndex: 0 },
        { type: "enrichment", product: "Bob PPZ", title: "Plan Risk Assessment", summary: "Phase risk ratings enriched with implementation risk assessment from ZUnderstand.", stageIndex: 1 },
        { type: "enrichment", product: "Bob PPZ", title: "Validate Coverage", summary: "Regression test suite enriched with code-level execution path coverage.", stageIndex: 3 },
        { type: "enrichment", product: "Concert4Z", title: "Analyze Active Paths", summary: "ZEN runtime data distinguishes active from dormant code paths; dead code identified for safe removal.", stageIndex: 0 },
        { type: "enrichment", product: "Concert4Z", title: "Plan Prioritization", summary: "Production incident history provides real-world risk context for modernization prioritization.", stageIndex: 1 },
        { type: "enrichment", product: "Concert4Z", title: "Promote Baseline", summary: "Post-promotion monitoring confirms modernized application behaves correctly in production.", stageIndex: 4 },
        { type: "handoff", product: "Terraform", title: "Provision Dual Environments", steps: [{ label: "Atlas produced", description: "Two infrastructure specifications: legacy and target architecture." }, { label: "Atlas directs", description: "Terraform provisions both environments in isolated workspaces." }, { label: "Terraform returns", description: "Both environments confirmed for equivalence testing." }], stageIndex: 3 },
        { type: "handoff", product: "Terraform", title: "Promote Target Infrastructure", steps: [{ label: "Atlas produced", description: "Modernization target requires new infrastructure type." }, { label: "Atlas directs", description: "Terraform provisions target infrastructure for promotion stage." }, { label: "Terraform returns", description: "Infrastructure apply log for promotion record." }], stageIndex: 4 },
        { type: "enrichment", product: "Terraform", title: "Assess Readiness", summary: "Terraform coverage indicates cleaner path to modernization for declaratively managed components.", stageIndex: 0 },
        { type: "enrichment", product: "Terraform", title: "Record Lifecycle", summary: "Workspace history provides lifecycle of legacy and target environments for evidence package.", stageIndex: 4 },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "H1 2027", description: "ZUnderstand dynamic call chain analysis" },
      { name: "Change Risk Assessment", timeline: "H1 2027", description: "Technical debt and coupling analysis" },
      { name: "Workflow Engine", timeline: "H1 2027", description: "Modernization phase orchestration" },
      { name: "Test Environment Provisioning", timeline: "H1 2027", description: "Isolated phase validation environments" },
    ],
  },
  "uc-10": {
    id: "uc-10",
    label: "UC-10: Environment Parity and Drift Control",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation.",
    personas: [
      { name: "Annette", role: "IT Operations Engineer", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Alex", role: "Performance / Application Engineer", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Manual environment comparison done infrequently and error-prone." },
        { name: "Attribute", description: "Undocumented changes discovered by human noticing behavioral differences." },
        { name: "Surface", description: "No drift trend reporting; raw diffs without risk classification." },
        { name: "Investigate", description: "No consolidated starting point; escalation to Zach for log interpretation." },
        { name: "Remediate", description: "Manual parameter-by-parameter correction with no validation." },
        { name: "Audit", description: "Manual assembly of evidence from notes and tool outputs." },
      ],
      markers: [
        { persona: "Annette", type: "time", title: "Lost Time — 1–3 days per manual parity check", description: "Engineers export configuration and compare in spreadsheets; done at most quarterly.", stageIndex: 0 },
        { persona: "Annette", type: "pain", title: "Business Impact — unauthorized changes invisible until symptom", description: "No automated detection; changes without records only found by accident or audit.", stageIndex: 1 },
        { persona: "Greg", type: "pain", title: "Business Impact — no data for parity governance", description: "Cannot tell if environment parity is improving or degrading over time.", stageIndex: 2 },
        { persona: "Annette", type: "skill", title: "Skill Gap — cannot investigate without Zach", description: "Undocumented change investigation requires log assembly across non-integrated tools.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours to days full realignment", description: "Each parameter difference corrected individually using appropriate subsystem tool.", stageIndex: 4 },
        { persona: "Annette", type: "time", title: "Lost Time — hours assembling evidence per audit cycle", description: "Drift investigation and resolution record assembled manually from notes.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas detects drift and unauthorized changes before behavioral symptoms appear." },
        { name: "Attribute", description: "Atlas provides configuration delta, timestamp, affected component, and user ID immediately." },
        { name: "Surface", description: "Findings classified by risk; drift trend reports available over time." },
        { name: "Investigate", description: "Structured evidence starting point for every investigation." },
        { name: "Remediate", description: "Atlas generates targeted realignment plan; post-remediation validation automatic." },
        { name: "Audit", description: "Complete incident record generated automatically for every detection and resolution." },
      ],
      markers: [
        { persona: "Annette", type: "skill", title: "Atlas AI Insight — continuous baseline diff runs automatically", description: "Drift alert received before behavioral symptom; no manual comparison needed.", stageIndex: 0 },
        { persona: "Annette", type: "time", title: "Time Saving — hours to days → immediate evidence", description: "Configuration delta, timestamp, and attribution provided in the Atlas alert.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette triages independently", description: "Risk classification enables accept/escalate decisions without Zach's interpretation.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — hours to days → targeted plan", description: "Environment realignment plan generated by Atlas; post-remediation validation automatic.", stageIndex: 4 },
        { persona: "Annette", type: "time", title: "Time Saving — hours assembling evidence → automatic", description: "Incident audit trail generated for every drift detection and resolution.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        { type: "enrichment", product: "Concert4Z", title: "Detect Behavioral Signal", summary: "Concert4Z detects behavioral drift before configuration drift; combined signal confirms significance.", stageIndex: 0 },
        { type: "enrichment", product: "Concert4Z", title: "Surface Risk Context", summary: "Incident history enriches risk classification — drift on previously flagged systems elevated in severity.", stageIndex: 2 },
        { type: "handoff", product: "Terraform", title: "Compare Environments", steps: [{ label: "Atlas produced", description: "Atlas requests Terraform plan output for infrastructure-layer diff." }, { label: "Atlas directs", description: "Terraform plan compared against declared HCL configuration." }, { label: "Terraform returns", description: "Infrastructure-layer diff incorporated into Atlas comparison." }], stageIndex: 1 },
        { type: "handoff", product: "Terraform", title: "Remediate Infrastructure", steps: [{ label: "Atlas produced", description: "Drift item identified as infrastructure-layer change outside Terraform workflow." }, { label: "Atlas directs", description: "Team applies Terraform plan restoring LPAR to declared state." }, { label: "Terraform returns", description: "Apply completion confirmation; Atlas marks resolved." }], stageIndex: 4 },
        { type: "handoff", product: "Terraform", title: "Validate Post-Remediation", steps: [{ label: "Atlas produced", description: "Remediation complete; validation required." }, { label: "Atlas directs", description: "Fresh terraform plan requested for each environment." }, { label: "Terraform returns", description: "Clean plan outputs confirm zero infrastructure drift." }], stageIndex: 4 },
        { type: "enrichment", product: "Terraform", title: "Detect Trigger", summary: "Terraform scheduled plan surfaces infrastructure drift as trigger for Atlas investigation.", stageIndex: 0 },
        { type: "enrichment", product: "Terraform", title: "Record Evidence", summary: "State version history provides infrastructure-layer parity record for audit.", stageIndex: 5 },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state recording and comparison" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Unauthorized and undocumented change detection" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules and automated checking" },
      { name: "Workflow Engine", timeline: "H1 2027", description: "Remediation orchestration" },
    ],
  },
  "uc-11": {
    id: "uc-11",
    label: "UC-11: Disaster Recovery Validation",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation.",
    personas: [
      { name: "Greg", role: "Infrastructure Architect", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Assess", description: "Manual DR readiness assessment in weeks before test; always incomplete." },
        { name: "Monitor", description: "No continuous monitoring; DR environments drift invisibly between tests." },
        { name: "Remediate", description: "Remediation executed against incomplete diff under test deadline pressure." },
        { name: "Simulate", description: "No simulated failover; DR test is first production-level exercise." },
        { name: "Record", description: "Manual assembly of test reports, remediation records, and team notes." },
      ],
      markers: [
        { persona: "Greg", type: "time", title: "Lost Time — 2–4 weeks manual assessment", description: "Comparison relies on snapshots, spreadsheets, and team memory.", stageIndex: 0 },
        { persona: "Greg", type: "pain", title: "Business Impact — comparison always incomplete", description: "Changes applied over months are partially tracked and partially missed.", stageIndex: 0 },
        { persona: "Greg", type: "pain", title: "Business Impact — months of drift with no visibility", description: "No continuous monitoring; drift accumulates until test day.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — days to weeks remediating accumulated drift", description: "DR changes lower priority and deferred, compounding the drift.", stageIndex: 2 },
        { persona: "Quinn", type: "skill", title: "Skill Gap — go/no-go without objective readiness verdict", description: "Decision based on team assessment, not verified test outcome.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Lost Time — days assembling DR test evidence", description: "Manual assembly from test reports and team notes for compliance.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Complete DR vs. production diff on demand with severity classification." },
        { name: "Monitor", description: "High-severity DR drift surfaced as it appears; automatic equivalence checks." },
        { name: "Remediate", description: "Atlas-generated targeted plan; post-remediation validation automatic." },
        { name: "Simulate", description: "Isolation-based DR simulation at production load produces certified pass result." },
        { name: "Record", description: "Complete DR readiness history generated automatically from Atlas." },
      ],
      markers: [
        { persona: "Greg", type: "time", title: "Time Saving — 2–4 weeks → hours for assessment", description: "Every configuration, PTF, RACF, and subsystem difference enumerated.", stageIndex: 0 },
        { persona: "Greg", type: "skill", title: "Atlas AI Insight — DR failure point prediction", description: "Specific items that would cause failover failure identified before test.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — days to weeks → targeted plan", description: "DR remediation plan generated from complete diff; nothing left to memory.", stageIndex: 2 },
        { persona: "Quinn", type: "gain", title: "New User Capability — objective readiness verdict", description: "Go/no-go decision from Atlas simulation pass/fail, not team assessment.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Time Saving — days manual documentation → automatic", description: "Regulatory compliance evidence produced directly from Atlas records.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        { type: "enrichment", product: "Concert4Z", title: "Assess Business Context", summary: "Business service topology enriches severity with business-service criticality ranking.", stageIndex: 0 },
        { type: "enrichment", product: "Concert4Z", title: "Simulate Load Profile", summary: "Production transaction volume data provides accurate simulation load profile.", stageIndex: 3 },
        { type: "enrichment", product: "Concert4Z", title: "Record Behavioral Evidence", summary: "Post-test behavioral profile confirms DR environment matched production norms.", stageIndex: 4 },
        { type: "handoff", product: "Terraform", title: "Assess DR Parity", steps: [{ label: "Atlas produced", description: "Atlas requests Terraform state diff between production and DR workspaces." }, { label: "Atlas directs", description: "Terraform plan compared for infrastructure-layer parity." }, { label: "Terraform returns", description: "Infrastructure parity gap incorporated into comparison artifact." }], stageIndex: 0 },
        { type: "handoff", product: "Terraform", title: "Validate Functional Equivalence", steps: [{ label: "Atlas produced", description: "DR test environment specification passed to Terraform." }, { label: "Atlas directs", description: "Terraform provisions DR test infrastructure from production declaration." }, { label: "Terraform returns", description: "Test environment confirmed as valid failover proxy." }], stageIndex: 3 },
        { type: "handoff", product: "Terraform", title: "Post-Resync Re-Provisioning", steps: [{ label: "Atlas produced", description: "Remediation requires re-provisioning DR infrastructure." }, { label: "Atlas directs", description: "Production Terraform workspace applied to DR workspace." }, { label: "Terraform returns", description: "DR infrastructure re-synced for subsequent software remediations." }], stageIndex: 2 },
        { type: "enrichment", product: "Terraform", title: "Detect Trigger", summary: "Scheduled terraform plan against DR workspace surfaces infrastructure drift trigger.", stageIndex: 0 },
        { type: "enrichment", product: "Terraform", title: "Record Validation", summary: "Workspace state comparison provides infrastructure-layer evidence for regulations.", stageIndex: 4 },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "H2 2027", description: "Cross-LPAR topology diff" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Continuous DR parity monitoring" },
      { name: "Workflow Engine", timeline: "GA", description: "Remediation orchestration" },
      { name: "Test Environment Provisioning", timeline: "H2 2027", description: "DR simulation environments" },
    ],
  },
  "uc-12": {
    id: "uc-12",
    label: "UC-12: Capacity Planning and Performance Readiness",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes.",
    personas: [
      { name: "Alex", role: "Performance / Application Engineer", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Performance problems discovered through user complaints or incidents." },
        { name: "Diagnose", description: "Multi-team conference call to pull telemetry independently." },
        { name: "Size", description: "Configuration sizing by experience and rule of thumb." },
        { name: "Validate", description: "Performance testing often skipped due to lab scheduling difficulty." },
        { name: "Apply", description: "Manual translation from diagnosis to production change plan." },
        { name: "Monitor", description: "Post-change regressions discovered by accident or manual investigation." },
      ],
      markers: [
        { persona: "Annette", type: "pain", title: "Business Impact — reactive performance discovery", description: "By the time user complains, impact is already occurring.", stageIndex: 0 },
        { persona: "Alex", type: "time", title: "Lost Time — hours to days multi-team diagnosis", description: "CICS, Db2 DBA, and systems programmer pull telemetry independently.", stageIndex: 1 },
        { persona: "Alex", type: "pain", title: "Business Impact — post-change regressions unattributed", description: "Configuration change to symptom link discovered by accident.", stageIndex: 1 },
        { persona: "Alex", type: "pain", title: "Business Impact — dark capacity invisible", description: "Teams procure capacity they already have due to lack of utilization visibility.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Lost Time — days to weeks scheduling lab test", description: "Performance testing skipped due to logistical difficulty.", stageIndex: 3 },
        { persona: "Quinn", type: "skill", title: "Skill Gap — approval without management-readable evidence", description: "Raw performance data presented instead of risk and recommendation summary.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas proactively surfaces capacity constraints before peak events." },
        { name: "Diagnose", description: "Root cause identified in one conversation with change attribution." },
        { name: "Size", description: "Peak event risk modeled with load projection and constraint identification." },
        { name: "Validate", description: "Configuration changes tested at simulated production load in isolation." },
        { name: "Apply", description: "Production change plan generated directly from validated analysis." },
        { name: "Monitor", description: "Post-change regressions attributed automatically through baseline comparison." },
      ],
      markers: [
        { persona: "Alex", type: "skill", title: "Atlas AI Insight — proactive constraint projection", description: "Capacity constraints surfaced before peak events; no manual SMF analysis.", stageIndex: 0 },
        { persona: "Alex", type: "time", title: "Time Saving — hours to days → one conversation", description: "Root cause with change attribution, fix, and validation in single Atlas session.", stageIndex: 1 },
        { persona: "Alex", type: "skill", title: "Atlas AI Insight — dark capacity identification", description: "Utilization analysis surfaces under-provisioned and over-provisioned LPARs.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Time Saving — days to weeks → Atlas provisions test", description: "Configuration changes validated at simulated load before production.", stageIndex: 3 },
        { persona: "Quinn", type: "gain", title: "New User Capability — management-readable summary", description: "Risk quantified, recommendation justified, validation evidence attached.", stageIndex: 4 },
        { persona: "Annette", type: "gain", title: "New User Capability — cross-subsystem monitoring", description: "CICS, Db2, MQ correlations surfaced without OMEGAMON expertise.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        { type: "handoff", product: "Bob PPZ", title: "Diagnose Code Performance", steps: [{ label: "Atlas produced", description: "Root cause attributed to application code: program and transaction identified." }, { label: "Atlas directs", description: "Developer uses ZUnderstand to locate code constructs driving performance issue." }, { label: "Bob PPZ returns", description: "Code fix artifact; Atlas validates in performance test environment." }], stageIndex: 1 },
        { type: "handoff", product: "Bob PPZ", title: "Validate Performance Fix", steps: [{ label: "Atlas produced", description: "Code fix resolved one constraint but introduced another." }, { label: "Atlas directs", description: "New performance profile returned to developer in Bob PPZ." }, { label: "Bob PPZ returns", description: "Second iteration code fix; Atlas re-measures." }], stageIndex: 3 },
        { type: "enrichment", product: "Bob PPZ", title: "Diagnose Precision", summary: "Code-level attribution: specific paragraph and SQL causing excessive I/O identified.", stageIndex: 1 },
        { type: "enrichment", product: "Bob PPZ", title: "Size Capacity Breakdown", summary: "Code-level root cause breakdown distinguishes configuration vs. code changes needed.", stageIndex: 2 },
        { type: "handoff", product: "Concert4Z", title: "Detect Performance Issue", steps: [{ label: "Concert4Z produced", description: "Optimize module detects production performance degradation." }, { label: "Concert4Z directs", description: "Performance finding triggers Atlas capacity planning workflow." }, { label: "Atlas returns", description: "Validated remediation plan generated and ready for production." }], stageIndex: 0 },
        { type: "handoff", product: "Concert4Z", title: "Monitor Post-Change", steps: [{ label: "Atlas produced", description: "Configuration change applied to production." }, { label: "Concert4Z directs", description: "Observe module surfaces post-change regression." }, { label: "Atlas returns", description: "Atlas correlates anomaly to change event and generates new workflow." }], stageIndex: 5 },
        { type: "enrichment", product: "Concert4Z", title: "Diagnose Starting Context", summary: "Concert4Z diagnostic findings reduce Atlas investigation to confirmation.", stageIndex: 1 },
        { type: "enrichment", product: "Concert4Z", title: "Size Transaction Data", summary: "Real production workload data from SMF/CDP pipeline informs projections.", stageIndex: 2 },
        { type: "enrichment", product: "Concert4Z", title: "Apply Evidence", summary: "Production performance evidence enriches management readiness summary.", stageIndex: 4 },
        { type: "handoff", product: "Terraform", title: "Provision Performance Test", steps: [{ label: "Atlas produced", description: "Performance test environment specification." }, { label: "Atlas directs", description: "Terraform provisions from same HCL declaration as production." }, { label: "Terraform returns", description: "Infrastructure-accurate test environment ready." }], stageIndex: 3 },
        { type: "enrichment", product: "Terraform", title: "Baseline Infrastructure", summary: "Terraform state file provides current resource allocations for LPARs in scope.", stageIndex: 1 },
        { type: "enrichment", product: "Terraform", title: "Size Resource Assessment", summary: "Terraform provides infrastructure layer of capacity assessment.", stageIndex: 2 },
        { type: "enrichment", product: "Terraform", title: "Recommend HCL Changes", summary: "Infrastructure resource change recommendations expressed as Terraform HCL proposals.", stageIndex: 4 },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "H1 2027", description: "Transaction topology traversal" },
      { name: "Change Risk Assessment", timeline: "H1 2027", description: "Configuration change attribution" },
      { name: "Workflow Engine", timeline: "H1 2027", description: "Capacity change orchestration" },
      { name: "Test Environment Provisioning", timeline: "H2 2027", description: "Production-scale load simulation" },
    ],
  },
};

export const nodeTypeConfig: Record<NodeType, { color: string; label: string }> = {
  atlas: { color: "#F59E0B", label: "Atlas" },
  systemIntelligence: { color: "#00D4FF", label: "System Intelligence" },
  changeIntelligence: { color: "#FF6B6B", label: "Change Intelligence" },
  predictiveIntelligence: { color: "#A78BFA", label: "Predictive Intelligence" },
  useCase: { color: "#E2E8F0", label: "Use Case" },
};

export function getNodeById(id: string): ProductNode | undefined {
  return productNodes.find((n) => n.id === id);
}

export function getConnections(): { source: string; target: string }[] {
  const connections: { source: string; target: string }[] = [];
  for (const node of productNodes) {
    for (const conn of node.connections) {
      connections.push({ source: node.id, target: conn });
    }
  }
  return connections;
}