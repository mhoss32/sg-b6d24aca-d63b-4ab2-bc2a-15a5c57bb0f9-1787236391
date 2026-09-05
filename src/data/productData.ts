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
    connections: ["predictive"],
  },
  {
    id: "uc-02",
    label: "UC-02: Staff Onboarding",
    type: "useCase",
    description: "Get new team members productive fast with AI-guided environment orientation and knowledge transfer.",
    connections: ["system"],
  },
  {
    id: "uc-03",
    label: "UC-03: Regulatory Change Response",
    type: "useCase",
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, and sequenced remediation.",
    connections: ["predictive"],
  },
  {
    id: "uc-04",
    label: "UC-04: Change Readiness and Health Assessment",
    type: "useCase",
    description: "Structured, repeatable health assessment joining configuration state, security posture, PTF currency, and performance constraints.",
    connections: ["predictive"],
  },
  {
    id: "uc-05",
    label: "UC-05: Change Governance and Traceability",
    type: "useCase",
    description: "Complete change attribution, undocumented change detection, and ITSM integration for audit readiness.",
    connections: ["system"],
  },
  {
    id: "uc-06",
    label: "UC-06: Patch Management",
    type: "useCase",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with full audit trail.",
    connections: ["change"],
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
    label: "UC-09: Application Modernization",
    type: "useCase",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization.",
    connections: ["change"],
  },
  {
    id: "uc-10",
    label: "UC-10: Environment Parity and Drift Control",
    type: "useCase",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation.",
    connections: ["predictive"],
  },
  {
    id: "uc-11",
    label: "UC-11: Disaster Recovery Validation",
    type: "useCase",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation.",
    connections: ["predictive"],
  },
  {
    id: "uc-12",
    label: "UC-12: Capacity Planning and Performance Readiness",
    type: "useCase",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes.",
    connections: ["change"],
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
        { name: "Scope", description: "Manual coordination to establish regulated data scope" },
        { name: "Inventory", description: "Each team inventories their domain independently" },
        { name: "Analyze", description: "Cross-reference findings in spreadsheets" },
        { name: "Sequence", description: "Manual remediation plan with hidden dependencies" },
        { name: "Execute", description: "Three workstreams tracked in separate spreadsheets" },
        { name: "Verify", description: "No systematic post-remediation verification" },
        { name: "Monitor", description: "New regulated data created post-remediation undetected" },
        { name: "Evidence", description: "Manual evidence assembly from disconnected sources" },
      ],
      markers: [
        { persona: "Sage", type: "time", title: "Lost Time — week one ends with questions, not inventory", description: "The first question 'what do we have that touches this data?' has no quick answer. Week one ends with a list of questions, not an inventory.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — three independent teams with no unified view", description: "DBA reviews Db2 catalog, Sage reviews RACF, application team reviews source. Each works independently with no shared data.", stageIndex: 1 },
        { persona: "Sage", type: "time", title: "Lost Time — three weeks to assemble incomplete spreadsheet", description: "Three weeks later, a spreadsheet is assembled that no one is confident is complete.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — cross-workstream dependency discovered only when it causes failure", description: "A developer reveals the batch PAYROLL job will fail if access controls change before credential updates. Plan must be reordered mid-execution.", stageIndex: 3 },
        { persona: "Sage", type: "time", title: "Lost Time — status calls needed weekly to synchronize three workstreams", description: "Each team tracks progress in separate spreadsheets. Weekly calls needed to keep workstreams aligned.", stageIndex: 4 },
        { persona: "Sage", type: "pain", title: "Business Impact — two items slip through the gaps", description: "Without unified tracking, items are missed across workstream boundaries.", stageIndex: 4 },
        { persona: "Derek", type: "pain", title: "Business Impact — new regulated data undetected until next audit", description: "A developer creates a new dataset for a new data category. It falls under scope but no one notices until the next audit cycle.", stageIndex: 6 },
        { persona: "Derek", type: "time", title: "Lost Time — two weeks assembling evidence from disconnected sources", description: "Derek assembles the compliance evidence package from spreadsheets, email chains, RACF exports, and Db2 audit logs. Result is a multi-hundred-page document regulators find hard to navigate.", stageIndex: 7 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms scope from live environment model" },
        { name: "Inventory", description: "Complete regulated data inventory across all types in under an hour" },
        { name: "Analyze", description: "Cross-source gap analysis with severity ranking" },
        { name: "Sequence", description: "Dependency-aware remediation sequencing" },
        { name: "Execute", description: "Three workstreams orchestrated with progress tracking" },
        { name: "Verify", description: "48-hour post-execution monitoring confirms no failures" },
        { name: "Monitor", description: "Continuous monitoring detects new regulated data automatically" },
        { name: "Evidence", description: "Auditor-ready evidence package generated from verified state" },
      ],
      markers: [
        { persona: "Sage", type: "gain", title: "New User Capability — complete regulated data inventory across 4 data types in under an hour", description: "Atlas returns a structured inventory: 6 datasets, 34 Db2 tables, 12 VSAM files, 6 IMS segments — in under an hour from a single query.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — 'batch job credentials before access controls' — proactive sequencing risk surfaced before incident", description: "Atlas analyzes the gap set and generates the sequenced plan, proactively identifying the dependency before any change is made.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — 3 new datasets detected post-remediation automatically", description: "The capability no competitor addresses — continuous monitoring catches new regulated scope items before they become compliance failures.", stageIndex: 6 },
        { persona: "Derek", type: "gain", title: "New User Capability — evidence package generated directly from verified compliant state", description: "Atlas generates the compliance evidence package directly: regulated data inventory with source citations, access control findings, encryption evidence, post-remediation monitoring log.", stageIndex: 7 },
        { persona: "Lupita", type: "gain", title: "New User Capability — encryption workstream tracked alongside access controls and credentials", description: "Three workstreams (credentials, access controls, encryption) orchestrated in sequence with unified progress tracking.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's Observe module detects access anomalies that may correlate with unauthorized access events. These signals direct Atlas's anomaly investigation to specific time windows and system components.",
          stageIndex: 3,
        },
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
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified infrastructure-layer changes required by the new regulation." },
            { label: "Atlas directs", description: "Required infrastructure changes are expressed as proposed modifications to relevant LPAR workspace HCL declarations." },
            { label: "Terraform returns", description: "Terraform apply records for each infrastructure-layer change. Atlas marks items as implemented and incorporates Terraform apply records into response evidence." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides the authoritative record of current declared infrastructure configuration. For infrastructure-layer compliance dimensions, Terraform's state is the ground truth for the gap assessment.",
          stageIndex: 2,
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
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas inventories regulated data across the estate. Bob PPZ enriches the application program inventory with ZUnderstand data flow analysis: programs that process, transform, or transmit regulated data (not just access it); regulated field identification for Db2 tables with mixed columns; downstream data propagation tracing to identify all programs in the regulatory scope chain.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas maps access control gaps across RACF, Db2, and application access. When Bob PPZ is installed, application access findings are enriched with code-level precision: 'Program ACCTPROC reads ACCOUNT.CARDNUMBER at line 340 and passes it unmasked to output at line 520' — specific, actionable findings rather than application-level flags. Hardcoded credentials and bypassed RACF controls identified at the specific line and construct.",
          stageIndex: 2,
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
        { name: "Scope", description: "Zach reviews what he checked last time from memory" },
        { name: "Check PTFs", description: "Query SMP/E on each LPAR; no FIXCAT classification" },
        { name: "Review Config", description: "Each specialist reviews their domain independently" },
        { name: "Identify Risks", description: "Compound risks invisible because findings are separate" },
        { name: "Remediate", description: "Create ServiceNow tickets; some slip past go-live" },
        { name: "Generate Report", description: "Informal paragraph in Confluence; no source citations" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — some subsystems skipped because not routinely managed", description: "Zach is not sure exactly what to check, so he reviews from memory. Some subsystems are skipped.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 1–2 hours of expert-only SMP/E dialog navigation", description: "PTF currency review requires ISPF/SMP/E expertise. No automated inventory of missing critical maintenance. HIPER identification is manual and expert-dependent.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — separation of duties analysis performed manually under deadline", description: "Complex RACF analysis requires deep expertise and is done under time pressure.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — configuration findings missed in subsystems not routinely managed", description: "Nobody checks z/OS Connect SSL configuration. Findings are missed in subsystems outside individual expertise.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — cross-subsystem compound risks invisible", description: "Zach sees missing PTF separately from Sage's note about unencrypted connection. Neither recognizes the combination creates higher compound risk.", stageIndex: 3 },
        { persona: "Zach", type: "pain", title: "Business Impact — remediation items slip past go-live with no formal acceptance", description: "Two of three ServiceNow tickets completed before go-live; one slips to after go-live with no formal acceptance of deferred risk.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — health check documentation informal, non-reproducible, not auditor-ready", description: "A paragraph in Confluence with no structured format, source citations, or timestamp. Cannot produce a document an auditor would accept.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms scope from live environment model" },
        { name: "Check PTFs", description: "PTF inventory joined with FIXCAT classification automatically" },
        { name: "Review Config", description: "Cross-source configuration review simultaneously across all sources" },
        { name: "Identify Risks", description: "Compound risk identification across subsystems" },
        { name: "Remediate", description: "Remediation paths offered immediately with formal acceptance" },
        { name: "Generate Report", description: "Structured, auditor-ready artifact with source citations" },
      ],
      markers: [
        { persona: "Zach", type: "gain", title: "New User Capability — scope confirmed automatically from environment model", description: "Atlas confirms the scope from its live model — no manual checklist from memory.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — PTF inventory joined with FIXCAT classification automatically", description: "3 missing routine PTFs and 1 missing FIXCAT SEC/INT security PTF surfaced automatically, with blast radius noted.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — 5 data sources, 9 findings, one conversation", description: "Atlas joins configuration review across all five sources simultaneously — findings no individual checklist would capture.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — compound risk explicitly identified", description: "The missing security PTF and unencrypted IPIC connection together create elevated risk — explicitly surfaced as higher severity than either item alone.", stageIndex: 3 },
        { persona: "Zach", type: "gain", title: "New User Capability — deferred risk acceptance formally documented", description: "Each decision recorded in the health artifact: remediate, accept with rationale, or defer — all formally documented.", stageIndex: 4 },
        { persona: "Quinn", type: "gain", title: "New User Capability — structured health artifact auditor-ready without post-session work", description: "9 findings classified by severity, compound risk callout, remediation decisions with owner and rationale, discovery timestamps, compliance readiness summary.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's Risk Management module detects operational risks (certificate expiry, missing critical maintenance, capacity threshold) that trigger Atlas health assessments scoped to affected components.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's production performance baselines provide current utilization and behavioral trend data. Atlas's constraint assessment is specific rather than theoretical, with forward-looking trends surfaced as health findings.",
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas surfaces the infrastructure readiness check as a gate item." },
            { label: "Atlas directs", description: "The team runs terraform plan against the LPAR's workspace to confirm zero infrastructure drift." },
            { label: "Terraform returns", description: "Terraform plan output. A clean plan confirms infrastructure readiness. Any planned changes surface drift that must be resolved before the change proceeds." },
          ],
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides structured infrastructure baseline data — CPU and memory allocation, storage mounts, network adapter configuration, activation profile — complementing the software-layer configuration data Atlas collects.",
          stageIndex: 1,
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
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas's compound risk identification joins findings from PTF inventory, configuration state, security posture, and subsystem parameters. When Bob PPZ is present, compound risks involving application code are surfaced with greater precision — for example, a deprecated API finding combined with a missing security PTF creates a compound risk higher than either finding alone.",
          stageIndex: 3,
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
        { name: "Detect", description: "Changes detected during audit, not proactively" },
        { name: "Attribute", description: "No automatic attribution for ISPF or operator changes" },
        { name: "Surface", description: "Change history scattered across three systems" },
        { name: "Investigate", description: "46 undocumented changes discovered in audit review" },
        { name: "Document", description: "Post-hoc records from memory — incomplete and inconsistent" },
        { name: "Enforce", description: "No enforcement mechanism for change windows" },
      ],
      markers: [
        { persona: "Quinn", type: "pain", title: "Business Impact — cannot tell from SYSLOG when a change happened, who made it, or whether a record exists", description: "A production RACF configuration change is detected during audit. Investigation takes two days and ultimately cannot be resolved.", stageIndex: 0 },
        { persona: "Quinn", type: "pain", title: "Business Impact — change record creation manual and frequently skipped", description: "Engineers remember to create change records some of the time. For ISPF changes, there is no attribution mechanism at all.", stageIndex: 1 },
        { persona: "Quinn", type: "time", title: "Lost Time — four hours reconciling change history across three systems", description: "SMP/E logs, ServiceNow tickets, and email chains from three different systems with no common format. Reconciling them takes four hours and still does not produce a complete picture.", stageIndex: 2 },
        { persona: "Annette", type: "pain", title: "Business Impact — 46 undocumented changes discovered during audit review", description: "Investigating each one requires tracking down the person who made the change, reconstructing context, and hoping the change was not harmful.", stageIndex: 3 },
        { persona: "Zach", type: "pain", title: "Business Impact — post-hoc change records from memory are incomplete and inconsistent", description: "Authorized emergency changes written from memory weeks later. The record is incomplete and often inconsistent with what actually happened.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Config-as-Code baseline diff detects all changes" },
        { name: "Attribute", description: "Automatic attribution for Atlas-executed changes" },
        { name: "Surface", description: "One-query change history across all sources" },
        { name: "Investigate", description: "Undocumented changes triaged by severity automatically" },
        { name: "Document", description: "Pre-populated retroactive record templates" },
        { name: "Enforce", description: "Change window violations surfaced in real time" },
      ],
      markers: [
        { persona: "Quinn", type: "skill", title: "Atlas AI & Automation — all facts in one query", description: "Atlas detects configuration change via baseline diff: 'RACF SETROPTS AUDIT setting changed from NONE to ALL on PROD4 on November 14 at 22:47. No corresponding change record found.' Quinn has all facts in one query.", stageIndex: 0 },
        { persona: "Quinn", type: "gain", title: "New User Capability — automatic attribution for every Atlas-executed change", description: "Named user, timestamp, change type, change record template generated — no manual action required.", stageIndex: 1 },
        { persona: "Quinn", type: "time", title: "Time Saving — one-query change history across all sources for any time period", description: "Atlas returns structured change history: all Atlas-executed changes, all out-of-Atlas changes detected through baseline diff, all changes with no record flagged separately.", stageIndex: 2 },
        { persona: "Annette", type: "gain", title: "New User Capability — 46 undocumented changes triaged by severity, not discovered in audit", description: "Structured audit report: component, timestamp, change type, previous value, new value, risk classification. Annette triages in order of severity.", stageIndex: 3 },
        { persona: "Zach", type: "gain", title: "New User Capability — pre-populated retroactive record from configuration delta", description: "Atlas pre-populates retroactive change record from configuration delta evidence. Engineer adds business justification. Atlas records the retroactive documentation.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z detects a production anomaly and asks 'what changed on this system in the last 30 days?'" },
            { label: "Concert4Z directs", description: "Atlas is queried for change history of the component over the relevant time window." },
            { label: "Atlas returns", description: "Structured change record that Concert4Z uses as primary root cause analysis input — correlating anomaly timestamp against change record to identify likely responsible change." },
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
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's immutable apply history records every infrastructure change with timestamp, operator identity, plan output, and approval record. This infrastructure change ledger complements Atlas's z/OS change ledger — together providing complete traceability across all change types.",
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Investigate Application Code Changes",
          steps: [
            { label: "Atlas produced", description: "Atlas has surfaced an undocumented change through Config-as-Code baseline comparison: timestamp, affected component, user ID attribution, and configuration delta. For changes to application program code, load modules, or JCL, Atlas has identified that the change affects an application component." },
            { label: "Atlas directs", description: "Atlas directs the investigator to Bob PPZ with evidence: affected program, change timestamp, and file-level delta. ZUnderstand analyses current and pre-change program states, identifies what logic changed, and surfaces whether the change represents a business-rule modification, data flow change, or structural refactor." },
            { label: "Bob PPZ returns", description: "A code-level change characterization that Atlas incorporates into the investigation record and retroactive change documentation. This evidence determines authorization and risk for the undocumented change." },
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
          summary: "Atlas provides change attribution for Atlas-executed changes automatically. For out-of-Atlas changes, Atlas provides configuration delta, timestamp, and user ID. When Bob PPZ is installed, attribution for application code changes is enriched with code-level context: semantic meaning of the code change, its risk classification (business-rule vs. cosmetic), and its relationship to other programs in the call chain. This improves attribution evidence quality without requiring user action.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas presents queryable change history — 'what changed on PROD1 in the last 30 days?' When Bob PPZ is installed, application code entries carry richer descriptions: not just 'ACCTVAL01 modified' but 'ACCTVAL01 — account validation logic changed: fee calculation paragraph restructured.' This enriched history is more useful for post-mortem investigations and audit evidence because it characterizes what changed at a business-logic level.",
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
  "uc-06": {
    id: "uc-06",
    label: "UC-06: Patch Management",
    description: "Automated PTF impact analysis, test plan generation, and orchestrated patch execution with full audit trail — turning the highest-risk change type on Z into a guided, repeatable workflow.",
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
        { name: "Identify", description: "Manual cross-reference of RSU tape list with SMP/E output" },
        { name: "Analyze", description: "Manual ++HOLD review; misses dependencies on unfamiliar subsystems" },
        { name: "Plan", description: "Mental planning with no formal sequencing" },
        { name: "Provision", description: "Ticket-based test environment; 2-day wait" },
        { name: "Validate", description: "Manual testing; limited coverage due to time pressure" },
        { name: "Decide", description: "No formal governance gate before production" },
        { name: "Execute", description: "Manual tracking at 2 AM; loses track of progress" },
        { name: "Govern", description: "Change record from memory; missing PTF numbers and timestamps" },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — half a day for 4-LPAR PTF cross-reference", description: "Zach downloads the latest RSU tape list and manually cross-references with SMP/E GENERATE output for each LPAR.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Skill Gap / Bottleneck — misses dependencies on unfamiliar subsystems", description: "Zach manually reviews ++HOLD information but misses a dependency because he does not routinely manage the MQ configuration on PROD3.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 90 minutes resolving prerequisite chain manually", description: "Two PTFs have co-requisites not in the batch. Zach adds them but introduces a new prerequisite. Resolves after 90 minutes of SMP/E dialog.", stageIndex: 2 },
        { persona: "Zach", type: "time", description: "Ticket-based test environment provisioning takes 2 days. Maintenance window approaching before environment is ready.", stageIndex: 3, title: "Lost Time — 2-day wait for test environment; maintenance window approaching" },
        { persona: "Zach", type: "pain", title: "Business Impact — test coverage limited by time pressure; untested changes reach production", description: "Zach tests 7 of 14 affected batch jobs because he does not have time for the others. The remaining 7 go untested.", stageIndex: 4 },
        { persona: "Zach", type: "pain", title: "Business Impact — loses track of progress at 2 AM during maintenance window", description: "Zach applies PTF batch manually, loses track of where he is at 2:00 AM, and has to reconstruct progress from SYSLOG.", stageIndex: 6 },
        { persona: "Zach", type: "pain", title: "Business Impact — change record from memory rejected for missing fields", description: "Zach forgets two PTF numbers and the exact completion time. The record is rejected by ServiceNow for missing fields.", stageIndex: 7 },
        { persona: "Sage", type: "time", title: "Lost Time — three days for partial exposure assessment after CVE advisory", description: "Sage emails Zach and SMP/E team asking how many systems are exposed. Three days later, she has partial answers from two teams.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — cannot confirm blast radius beyond 'probably payment processing'", description: "Zach knows the PTF affects CICS but does not know which regions, applications, or downstream services are in the blast radius.", stageIndex: 1 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Identify", description: "Atlas queries PTF inventory across all LPARs with FIXCAT classification" },
        { name: "Analyze", description: "Topology-aware impact analysis with prerequisite chain resolution" },
        { name: "Plan", description: "AI-generated plan anchored to actual environment topology" },
        { name: "Provision", description: "Monoplex L2 virtual LPAR provisioned in background" },
        { name: "Validate", description: "Automated test execution with failure attribution" },
        { name: "Decide", description: "Governance gate with explicit user approval" },
        { name: "Execute", description: "Orchestrated production apply with real-time progress" },
        { name: "Govern", description: "Complete change record generated automatically" },
      ],
      markers: [
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — PTF inventory with FIXCAT classification across all LPARs in one query", description: "12 applicable PTFs surfaced: 2 FIXCAT SEC/INT, 1 PE flag superseded — no manual SMP/E dialog required.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — topology-aware blast radius: 'these are the 14 applications at direct risk'", description: "For each PTF, Atlas maps affected subsystems, applications, and transactions. Identifies CICS-MQ interface affecting 3 transactions and 14 downstream batch jobs.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — prerequisite chain resolved automatically with final ordered sequence", description: "Atlas resolves full prerequisite chain automatically: identifies 2 missing co-requisites, adds them, re-resolves, and presents final ordered apply sequence.", stageIndex: 2 },
        { persona: "Zach", type: "gain", title: "New User Capability — test environment provisioned and waiting before Zach is ready to test", description: "Monoplex L2 virtual LPAR provisioned in background from Atlas configuration specification. Application Deployment Engine deploys components. Environment ready when Zach is.", stageIndex: 3 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — test failure attributed to specific missing CSD definition with automated fix generation", description: "One batch job fails. Atlas attributes: 'PTF UI89234 requires new CICS CSD MAPSET definition for MXFX interface. Generating required CSD update now.'", stageIndex: 4 },
        { persona: "Quinn", type: "gain", title: "New User Capability — governance gate with explicit approval before production action", description: "No production action without explicit user approval. Transparent decision artifact with risk assessment, test results, and open actions.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Time Saving — orchestrated production apply with real-time progress; no manual tracking at 2 AM", description: "Sequenced LPAR order, progress visible in real time, each step logged automatically. Zach authorizes first LPAR; Atlas proceeds through sequence.", stageIndex: 6 },
        { persona: "Quinn", type: "gain", title: "New User Capability — complete change record with no manual assembly", description: "All PTFs applied, sequenced apply log with timestamps, test results attached, authorization chain captured — complete and consistent without manual work.", stageIndex: 7 },
        { persona: "Sage", type: "gain", title: "New User Capability — cross-LPAR exposure assessment in 10 minutes, not 3 days", description: "Atlas queries PTF inventory across all connected LPARs simultaneously: '3 of 4 production LPARs exposed. DR1 not exposed. DR2 data stale.'", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — blast radius traversal with specific systems at direct risk", description: "4 CICS regions, 12 transactions, 8 downstream Db2 tablespaces, 2 z/OS Connect REST API endpoints, 3 external partner integrations — all scoped specifically.", stageIndex: 1 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's Risk Management module detects missing critical/HIPER PTFs and initiates the change. Post-apply, Concert4Z monitors for behavioral regressions correlating with patch timestamp.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Concert4Z produced", description: "Concert4Z Risk Management identifies missing critical or HIPER PTFs across the estate." },
            { label: "Concert4Z directs", description: "Initiated change passes to Atlas, which queries all connected LPARs, resolves prerequisites, maps impact, and generates sequenced patch plan." },
            { label: "Atlas returns", description: "After Atlas completes the full patch cycle, Concert4Z sees the operational risk as resolved and uses Atlas change evidence in its operational record." },
          ],
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas generates the infrastructure specification for the test environment." },
            { label: "Atlas directs", description: "Terraform creates test LPAR resources from the specification in environments where it manages LPAR lifecycle." },
            { label: "Terraform returns", description: "A Terraform-provisioned test environment with infrastructure matching production declaration. Atlas deploys application overlay and runs functional tests." },
          ],
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's state file provides LPAR-level infrastructure metadata that Atlas uses to assign LPARs to maintenance window slots, preventing scheduling conflicts.",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Compatibility and sequencing analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Patch orchestration and execution" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
    ],
  },
  "uc-07": {
    id: "uc-07",
    label: "UC-07: Application Change Management",
    description: "Developer-native change lifecycle with impact analysis, test generation, and deployment orchestration — giving developers the system context they need to change safely.",
    personas: [
      { name: "Kathleen", role: "Experienced z/OS Application Developer", engagement: "Primary" },
      { name: "Deb", role: "Early tenure z/OS Application Developer", engagement: "Secondary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Angie", role: "Application Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Assess Impact", description: "Informal impact analysis relying on tribal knowledge" },
        { name: "Provision Environment", description: "Manual ticket-based test environment provisioning" },
        { name: "Code", description: "Write code without real-time topological feedback" },
        { name: "Generate Test Plan", description: "Manual test plan generation based on developer knowledge" },
        { name: "Validate", description: "Manual testing with limited coverage" },
        { name: "Deploy", description: "Multi-tool, multi-team deployment handoff" },
      ],
      markers: [
        { persona: "Kathleen", type: "time", title: "Lost Time — half a day to 2 days of informal investigation before code can be written with confidence", description: "Impact analysis is informal — developers rely on tribal knowledge, ask Zach or experienced colleagues, or discover impact in integration testing when it is expensive to fix.", stageIndex: 0 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot independently assess impact without consulting Kathleen or Zach for every change", description: "As an early-tenure developer, Deb has no tribal knowledge to draw on — she is most exposed to unknowingly making changes that have hidden impact.", stageIndex: 0 },
        { persona: "Deb", type: "time", title: "Lost Time — hours to 2 days waiting for a test environment ticket to be fulfilled", description: "Test environments are provisioned manually by the infrastructure team. Wait times range from hours to days. Filing a ticket and waiting blocks development flow.", stageIndex: 1 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — testing in a shared, non-production-representative environment provides false confidence", description: "Sandboxes that mirror the production topology are rare — most developers test against shared environments that may not reflect production behavior.", stageIndex: 1 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot understand the performance implications of her code changes without escalating to the performance team", description: "Developers have no visibility into application performance metrics without going through the infrastructure team — no self-service performance baseline.", stageIndex: 2 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — regression detection at the point of production or integration is expensive relative to catching it during development", description: "Regression detection is ad hoc — if a change breaks something in a shared CICS transaction chain, it surfaces in integration testing or production.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Lost Time — 2–4 hours to write a test plan for each significant change", description: "Test plan generation is manual — Kathleen writes test scenarios based on her knowledge of what the change touches, with no automated scope generation.", stageIndex: 3 },
        { persona: "Deb", type: "pain", title: "Business Impact — changes proceed with test coverage that depends on Deb's current knowledge level, not on a systematic scope", description: "Test coverage is inconsistent and dependent on individual developer discipline — there is no automated scaffolding for what needs to be tested.", stageIndex: 3 },
        { persona: "Deb", type: "time", title: "Lost Time — half a day to 2 days of manual test execution per change", description: "There is little or no test automation on z/OS — test coverage is manual, inconsistent, and depends on individual developer discipline.", stageIndex: 4 },
        { persona: "Deb", type: "pain", title: "Business Impact — late regression detection is the most expensive quality failure mode for z/OS application development", description: "Regressions are caught in integration testing or production — the developer finds out she broke something through a test failure she did not control or a production incident.", stageIndex: 4 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours of multi-tool, multi-team handoff to get from validated code to deployed application", description: "Deploying an application change to CICS or IMS after validation requires multiple manual steps across multiple tools and teams — IBM Z Open Editor, DBB, a separate deployment tool, and a sysprog for configuration changes.", stageIndex: 5 },
        { persona: "Kathleen", type: "skill", title: "Skill Gap / Bottleneck — Zach must be involved in any deployment that touches CICS definitions or IMS setup", description: "Deploying to CICS or IMS requires multiple manual steps across multiple tools and teams — developer cannot deploy independently if any configuration changes are involved.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess Impact", description: "Atlas performs topology-aware impact analysis in seconds" },
        { name: "Provision Environment", description: "Test environment provisioned in background while developer writes code" },
        { name: "Code", description: "Real-time topology context available while coding" },
        { name: "Generate Test Plan", description: "Test plan generated automatically from impact analysis" },
        { name: "Validate", description: "Developer-controlled regression testing in isolated environment" },
        { name: "Deploy", description: "Atlas-orchestrated deployment to CICS or IMS" },
      ],
      markers: [
        { persona: "Kathleen", type: "time", title: "Time Saving — half a day to 2 days → seconds for impact assessment", description: "Ask Atlas what the proposed change will touch — full answer across CICS, Db2, MQ, and z/OS Connect in seconds, before any code is written.", stageIndex: 0 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently understands change impact without requiring Kathleen or Zach", description: "Atlas provides the system context Deb does not yet carry — she understands the scope of her change before making it, not after breaking something.", stageIndex: 0 },
        { persona: "Deb", type: "time", title: "Time Saving — hours to 2 days → background provisioning while code is being written", description: "Test environment provisioned in the background while Deb writes code — no ticket, no wait time, isolated environment ready when she needs it.", stageIndex: 1 },
        { persona: "Kathleen", type: "gain", title: "New User Capability — Kathleen independently gets a production-representative isolated environment without filing a ticket", description: "Isolated environment that mirrors production topology — no testing in a shared environment with other teams' changes.", stageIndex: 1 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb codes with full system context available on demand, independently", description: "Real-time topology context available while coding — any question about what a code path touches is answerable without interrupting a colleague.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — Kathleen's oversight effort on routine delegated changes reduces significantly", description: "Kathleen can delegate routine changes to Deb with confidence — Atlas provides the guardrails Kathleen would otherwise provide herself.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — 2–4 hours manual test plan → automatic from impact analysis", description: "Test plan generated automatically from the impact analysis — test scenarios scoped to the transactions and API paths the change actually touches.", stageIndex: 3 },
        { persona: "Deb", type: "skill", title: "Atlas AI & Automation — test plan scope derived from topology traversal, not from developer knowledge", description: "Consistent, topology-derived test coverage — Deb's test plan is as thorough as Kathleen's, because it comes from the same model, not from developer experience level.", stageIndex: 3 },
        { persona: "Deb", type: "time", title: "Time Saving — late regression discovery cost reduced by the shift from integration/production to developer loop", description: "Developer-controlled regression testing — regressions caught in Deb's own isolated environment before the change reaches integration testing or production.", stageIndex: 4 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently runs a full test-validate-iterate cycle without any infrastructure team involvement", description: "Iterate on code, watch the test plan update, re-run tests — a fast loop without filing tickets or waiting for infrastructure.", stageIndex: 4 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours of multi-tool, multi-team handoff → Atlas-orchestrated workflow", description: "Atlas-orchestrated deployment to CICS or IMS — developer initiates, Atlas handles the configuration steps, Zach authorizes changes that require it.", stageIndex: 5 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb has visibility into her own deployment without requiring a Zach intermediary", description: "Deployment is visible from Deb's perspective — she can track status without depending on a sysprog to relay progress.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's ZEN runtime relationship data enriches Atlas's blast radius assessment with runtime-observed application flows — which transactions actually called which programs during the observation period.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas generates the infrastructure specification for the test environment." },
            { label: "Atlas directs", description: "Terraform creates test LPAR resources from the specification in environments where it manages LPAR lifecycle." },
            { label: "Terraform returns", description: "A Terraform-provisioned test environment with infrastructure matching production declaration. Atlas deploys application overlay and runs functional tests." },
          ],
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Code-Level Execution",
          steps: [
            { label: "Atlas produced", description: "Atlas has produced a complete blast radius assessment: every CICS region, Db2 table, MQ queue, z/OS Connect endpoint, and downstream business service affected by the proposed change." },
            { label: "Atlas directs", description: "Atlas passes the full environment context to Bob PPZ: blast radius report, dependency graph, specific programs in scope for modification, and validation requirements. The developer opens affected programs with full ZUnderstand intelligence." },
            { label: "Bob PPZ returns", description: "The completed code change artifact — modified source, updated copybooks, revised JCL. Atlas receives the artifact and proceeds to validation." },
          ],
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Test Failure Iteration",
          steps: [
            { label: "Atlas produced", description: "Atlas runs the test package in an isolated environment and produces pass/fail results with failure attribution." },
            { label: "Atlas directs", description: "If test failures are attributed to specific code dependencies or logic errors, Atlas returns the failure context to the developer in Bob PPZ." },
            { label: "Bob PPZ returns", description: "Developer iterates: modifies code in Bob PPZ, returns updated artifact to Atlas. Atlas re-runs relevant tests. This round-trip loop continues until all tests pass." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas's blast radius assessment maps which programs, transactions, and data resources are affected. Bob PPZ enriches the application layer with ZUnderstand metadata: precise execution paths showing which code paths are actually invoked; business rule attribution enabling understanding of business impact; coupling score quantifying how many programs depend on the program being changed.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "When both Atlas and Bob PPZ are installed, the developer's Bob PPZ session is enriched with Atlas's infrastructure context. Bob PPZ surfaces topology-level context within the coding session: thread utilization, buffer pool pressure, MXT thresholds — infrastructure-aware coding only possible when Bob PPZ is paired with Atlas.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Test plans generated by Atlas are scoped to topology-identified test targets. Bob PPZ enriches test scenarios with code-level execution path coverage — Atlas identifies which transactions to test; Bob PPZ identifies which code paths within those transactions exercise the specific changed constructs.",
          stageIndex: 3,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Compatibility and sequencing analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Change orchestration and execution" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
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
  "uc-09": {
    id: "uc-09",
    label: "UC-09: Application Modernization",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization — turning 'we cannot safely touch this' into a phased, validated, risk-controlled project.",
    personas: [
      { name: "Angie", role: "Application Architect", engagement: "Primary" },
      { name: "Kathleen", role: "z/OS Application Developer", engagement: "Secondary" },
      { name: "Deb", role: "z/OS Application Developer (early tenure)", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Analyze", description: "Weeks to months of manual research reading code and interviewing experts" },
        { name: "Plan", description: "No automated technical debt identification; prioritization based on estimation" },
        { name: "Execute Phase", description: "Code-level changes to tightly coupled legacy code carry high risk" },
        { name: "Validate Phase", description: "Phase validation in shared environments; systematic scope not automated" },
        { name: "Promote", description: "Production promotion requires Zach for any configuration steps" },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Lost Time — weeks to months in a manual research phase before any modernization action can begin", description: "Modernization projects begin with a research phase that takes weeks or months — manually reading code, interviewing the few remaining experts, reviewing CSD definitions and Db2 catalog entries.", stageIndex: 0 },
        { persona: "Angie", type: "pain", title: "Business Impact — modernization plans built on incomplete analysis carry high risk of unexpected failures during execution", description: "The research phase is expensive, incomplete, and produces no structured artifact — modernization plans are built on an understanding that is acknowledged as incomplete.", stageIndex: 0 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — modernization must proceed without access to the design intent of the systems being changed", description: "The people who built legacy applications are often gone — the knowledge required to modernize safely is no longer available from the original authors.", stageIndex: 0 },
        { persona: "Deb", type: "pain", title: "Business Impact — changes to highly coupled code can produce unexpected failures in parts of the system the developer did not know were connected", description: "Tightly coupled code (monolithic copybooks, shared Db2 plans) carries high risk because the blast radius of changes is not fully known.", stageIndex: 0 },
        { persona: "Angie", type: "time", title: "Lost Time — weeks identifying technical debt scope across large codebases", description: "No automated technical debt identification — Angie must manually identify deprecated APIs, monolithic structures, and duplicated logic from code review and expert interviews.", stageIndex: 1 },
        { persona: "Greg", type: "skill", title: "Skill Gap / Bottleneck — Greg must be consulted for every decision that has infrastructure implications, creating a serial dependency", description: "Infrastructure implications of modernization decisions are assessed informally — no structured mechanism to evaluate infrastructure impact before the plan is finalized.", stageIndex: 1 },
        { persona: "Angie", type: "pain", title: "Business Impact — without data-driven prioritization, the most dangerous changes may not be scheduled last or given appropriate validation resources", description: "Modernization prioritization is based on estimated impact and risk — no data-driven prioritization from actual coupling analysis and blast radius quantification.", stageIndex: 1 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — changes that appear safe from static analysis can cause runtime failures through dynamic dependencies", description: "Code-level changes to tightly coupled legacy code carry high risk because the full runtime call chain is not visible from static analysis.", stageIndex: 2 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — Deb cannot work independently on modernization phases without Kathleen's continuous involvement", description: "Early-tenure developers working on lower-risk modernization phases lack the system context to work safely — they depend on Kathleen's oversight for every non-trivial change.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — hours to days per phase of Zach's time on infrastructure configuration changes", description: "Infrastructure configuration changes triggered by modernization (CICS definitions, Db2 parameter changes, IMS setup) require Zach's involvement in every phase.", stageIndex: 2 },
        { persona: "Kathleen", type: "pain", title: "Business Impact — phase validation results are unreliable if test environment conditions do not match what production will experience", description: "Phase validation environments are not isolated — testing occurs in shared or production-similar environments, creating risk of interference.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours per phase manually defining regression test scope from the change", description: "Regression test coverage depends on the developer's knowledge of what the phase changed — systematic scope definition is not automated.", stageIndex: 3 },
        { persona: "Deb", type: "skill", title: "Skill Gap / Bottleneck — test failure diagnosis always escalates to Kathleen", description: "Test failures on modernization phases require Kathleen's diagnosis — Deb lacks the call chain knowledge to attribute test failures to specific coupling points.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Lost Time — hours of multi-team coordination for every phase production promotion", description: "Production promotion requires Zach for any configuration steps — multi-team handoff for every phase promotion, even routine ones.", stageIndex: 4 },
        { persona: "Angie", type: "pain", title: "Business Impact — architectural drift accumulates silently across multi-year modernization projects", description: "No mechanism to verify that the promoted phase conforms to the intended architecture — regression from architectural intent can accumulate phase by phase.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Analyze", description: "Complete application structure and technical debt profile in minutes" },
        { name: "Plan", description: "Prioritized modernization plan from technical debt analysis and coupling scores" },
        { name: "Execute Phase", description: "Full runtime call chain visible before making changes to tightly coupled code" },
        { name: "Validate Phase", description: "Phase regression testing scoped automatically from impact analysis" },
        { name: "Promote", description: "Atlas-orchestrated phase promotion with architectural conformance check" },
      ],
      markers: [
        { persona: "Angie", type: "time", title: "Time Saving — weeks to months of manual research → minutes for a complete modernization analysis", description: "Complete application structure, technical debt profile, and dependency map produced in minutes — from Atlas's topology model and ZUnderstand's dynamic call chain analysis.", stageIndex: 0 },
        { persona: "Kathleen", type: "skill", title: "Atlas AI & Automation — ZUnderstand dynamic call chain analysis is required for safe modernization scope", description: "Runtime call chain analysis from ZUnderstand shows which programs actually call which others at runtime — not just which are statically configured. Monolithic copybook decomposition planned from actual usage, not from topology assumptions.", stageIndex: 0 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently understands coupling scope for her assigned phases", description: "Atlas surfaces which fields in a shared copybook are actually used by which programs at runtime — Deb knows the safe decomposition boundary before making any changes.", stageIndex: 0 },
        { persona: "Angie", type: "skill", title: "Atlas AI & Automation — Atlas generates a prioritized plan from technical debt analysis, coupling scores, and proactive deadline surfacing", description: "Prioritized modernization plan generated by Atlas — deprecated API deadlines, coupling risk scores, blast radius quantification — data-driven prioritization rather than expert estimation.", stageIndex: 1 },
        { persona: "Greg", type: "gain", title: "New User Capability — Greg reviews infrastructure implications from Atlas's analysis without being consulted ad hoc", description: "Infrastructure implications of each modernization phase reviewed through Atlas — structural changes that affect CICS definitions, Db2 parameters, or IMS setup identified before the phase plan is finalized.", stageIndex: 1 },
        { persona: "Kathleen", type: "skill", title: "Atlas AI & Automation — ZUnderstand dynamic call chain prevents the silent failures that static-only analysis cannot detect", description: "Full runtime call chain visible before making changes to tightly coupled code — the safety of a change can be confirmed before writing it.", stageIndex: 2 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently executes lower-risk modernization phases from Atlas's structured phase specification", description: "Atlas provides the system context for Deb's phase — she works from Atlas's dependency analysis, not from her own incomplete knowledge.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — hours to days per phase of Zach manual configuration → authorization gates within Atlas", description: "Infrastructure configuration changes for modernization phases are Atlas-orchestrated — Zach authorizes rather than manually executing every configuration step.", stageIndex: 2 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours manual regression scoping → automatic from the modernization impact analysis", description: "Phase regression testing scoped automatically from the impact analysis — Atlas generates the test targets from the programs and call chains the phase changed.", stageIndex: 3 },
        { persona: "Deb", type: "gain", title: "New User Capability — Deb independently diagnoses phase test failures using Atlas's attribution", description: "Test failures attributed by Atlas to specific coupling points — Deb can diagnose and fix failures independently rather than escalating to Kathleen for every test failure.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Time Saving — no manual test environment setup per phase; Atlas provisions and configures it", description: "Phase validation runs in an isolated environment provisioned by Atlas — consistent, production-representative conditions for every phase validation.", stageIndex: 3 },
        { persona: "Kathleen", type: "time", title: "Time Saving — hours of multi-team coordination → Atlas-orchestrated workflow", description: "Atlas-orchestrated phase promotion — developer initiates, Atlas handles configuration, Zach authorizes infrastructure gates. No multi-team handoff coordination required.", stageIndex: 4 },
        { persona: "Angie", type: "skill", title: "Atlas AI & Automation — architectural conformance check catches architectural drift before it accumulates across phases", description: "Phase promotion reviewed against architectural specification — Atlas checks whether the promoted code conforms to the intended architecture before production apply.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's ZEN runtime data distinguishes active from dormant code paths, ensuring modernization analysis prioritizes programs in active production use. Post-promotion, Concert4Z monitors the modernized application to confirm the phase worked as intended.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Equivalence testing requires two simultaneous test environments: legacy and target architecture." },
            { label: "Atlas directs", description: "Atlas passes two infrastructure specifications to Terraform: legacy environment specification and target environment specification. Terraform provisions both in isolated workspaces." },
            { label: "Terraform returns", description: "Both legacy and modernized environments provisioned. Atlas deploys to both and runs equivalence testing." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Phase Execution",
          steps: [
            { label: "Atlas produced", description: "Atlas has produced the complete application structure, technical debt profile, and dependency map. The modernization plan has been generated with phase boundaries defined. Execution of Phase 1 begins." },
            { label: "Atlas directs", description: "Atlas passes to Bob PPZ: the full phase specification (programs in scope, required changes, dependency boundaries), coupling analysis, ZUnderstand dynamic call chain, blast radius, and Atlas validation requirements. ZUnderstand provides full code-level intelligence for safe execution." },
            { label: "Bob PPZ returns", description: "Phase-completed code artifacts — modified programs, updated copybooks, restructured JCL. Atlas receives the artifacts and proceeds to phase validation." },
          ],
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Validation Failure Iteration",
          steps: [
            { label: "Atlas produced", description: "Atlas has provisioned an isolated environment, deployed the code artifacts, and run the regression test suite. Test failures are attributed to specific coupling points." },
            { label: "Atlas directs", description: "If test failures expose coupling points the phase change affected — a program depending on a behavior that changed, or a dynamic call chain static analysis did not surface — Atlas returns the failure context to Bob PPZ." },
            { label: "Bob PPZ returns", description: "Bob PPZ uses ZUnderstand's dynamic call chain data to trace the failure path and identify the precise adjustment. Developer iterates in Bob PPZ and returns corrected artifact to Atlas for re-validation." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Architectural Conformance Fix",
          steps: [
            { label: "Atlas produced", description: "A validated phase artifact and complete evidence package. Atlas applies the architectural conformance check." },
            { label: "Atlas directs", description: "If the conformance check identifies a deviation — code that implements the right functionality but violates the architectural specification — Atlas returns the finding to Bob PPZ for a targeted adjustment before production apply." },
            { label: "Bob PPZ returns", description: "Corrected code artifact conforming to architectural specification. Atlas re-validates and proceeds to production promotion." },
          ],
          stageIndex: 4,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas uses ZUnderstand application discovery for the topology layer of modernization analysis. When Bob PPZ is installed, the analysis is enriched with full depth: business rule extraction for each program; data dictionary mapping semantic meaning of data fields; precise execution paths showing which fields are actually used by which programs at runtime; technical debt quantification through coupling scores, complexity metrics, and dead code identification.",
          stageIndex: 0,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "The Atlas-generated modernization plan phases work by coupling risk and blast radius. When Bob PPZ is installed: phase estimates include code-level effort assessments; phase risk ratings are enriched with Bob PPZ's implementation risk assessment; the prioritized sequence accounts for both topology dependencies (Atlas) and implementation complexity (Bob PPZ).",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas's regression test suite for each phase is scoped from topology impact analysis. When Bob PPZ is present, the test suite is enriched with code-level execution path coverage — the specific code paths within affected programs that exercise the changed constructs. This produces test coverage that is both system-scoped (Atlas) and code-precise (Bob PPZ).",
          stageIndex: 3,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Compatibility and sequencing analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Modernization orchestration and execution" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
    ],
  },
  "uc-10": {
    id: "uc-10",
    label: "UC-10: Environment Parity and Drift Control",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation — detecting drift before a human notices a behavioral symptom.",
    personas: [
      { name: "Annette", role: "IT Operations Engineer (L2 Operator)", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Alex", role: "Performance / Application Engineer", engagement: "Secondary" },
      { name: "Greg", role: "Infrastructure Architect", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Manual environment comparison done infrequently and error-prone" },
        { name: "Attribute", description: "No immediate evidence when unauthorized change detected; investigation starts from scratch" },
        { name: "Surface", description: "Raw parameter diffs without risk classification" },
        { name: "Investigate", description: "No consolidated starting point; escalation always requires Zach" },
        { name: "Remediate", description: "Environment realignment fully manual, parameter by parameter" },
        { name: "Audit", description: "Audit trail assembled manually from notes and tool outputs" },
      ],
      markers: [
        { persona: "Annette", type: "time", title: "Lost Time — 1–3 days per manual parity check, done at most quarterly", description: "Environment comparison is manual: engineers export configuration parameters from ISPF or SMP/E and compare in spreadsheets or scripts. Done infrequently and error-prone.", stageIndex: 0 },
        { persona: "Annette", type: "pain", title: "Business Impact — unauthorized changes are invisible until they cause a symptom or an auditor flags them", description: "Unauthorized change detection relies entirely on change management process compliance — if someone makes a change without a change record, the only detection mechanism is a human noticing a behavioral difference.", stageIndex: 0 },
        { persona: "Zach", type: "pain", title: "Business Impact — post-change drift goes undetected", description: "Post-change validation is informal — after a planned change there is no systematic check that the environment reached the intended state.", stageIndex: 0 },
        { persona: "Annette", type: "time", title: "Lost Time — hours to days reconstructing what changed, when, and from what value", description: "When an unauthorized configuration change is detected, Annette has no immediate evidence — just a behavioral symptom and no starting point for investigation.", stageIndex: 1 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot investigate undocumented changes without escalating to Zach", description: "Investigating undocumented changes requires assembling evidence from system logs, SYSLOG, SMF data — tools that do not integrate and require expert interpretation.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — half a day to 2 days per 'test doesn't match prod' investigation", description: "'QA doesn't look like prod' situations are resolved by guesswork and manual parameter comparison — often by Zach, who has better things to do.", stageIndex: 1 },
        { persona: "Greg", type: "pain", title: "Business Impact — architecture parity governance decisions are made without data", description: "No drift trend reporting — Greg cannot tell whether environment parity is improving or degrading over time because there is no continuous measurement.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Lost Time — half a day of manual environment comparison before performance testing", description: "When investigating whether a QA environment is production-equivalent for performance testing, there is no structured parity report to reference.", stageIndex: 2 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot triage drift findings without Zach's interpretation", description: "Raw parameter diffs without risk classification — Annette must interpret whether a Db2 ZPARM change is a compliance risk, stability risk, or cosmetic drift, without context.", stageIndex: 2 },
        { persona: "Annette", type: "time", title: "Lost Time — hours per investigation assembling basic evidence", description: "No consolidated starting point for investigation — Annette receives a symptom, not a structured finding with evidence attached.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours of Zach's time on investigations Atlas could structure", description: "Escalation from Annette always requires Zach to do the same log-reading investigation she cannot — no self-service investigation path.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — hours to days for a full QA-to-production realignment", description: "Environment realignment is fully manual — each parameter difference must be corrected individually using the appropriate subsystem tool.", stageIndex: 4 },
        { persona: "Greg", type: "pain", title: "Business Impact — incomplete remediations leave residual drift undetected until the next manual check", description: "No validation that the realignment reached the intended state — the comparison must be repeated manually after remediation to confirm.", stageIndex: 4 },
        { persona: "Annette", type: "time", title: "Lost Time — hours assembling evidence per audit cycle", description: "Audit trail for drift investigation and resolution must be assembled manually from notes and tool outputs — no continuous record.", stageIndex: 5 },
        { persona: "Derek", type: "pain", title: "Business Impact — audit findings for undocumented drift are a recurring cost even when the changes were authorized", description: "Change record completeness is consistently the most labor-intensive section of audit prep — undocumented changes produce audit findings whether they were benign or not.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Continuous baseline diff runs automatically; drift alert before behavioral symptom" },
        { name: "Attribute", description: "Undocumented change investigation starts with evidence, not guesswork" },
        { name: "Surface", description: "Findings classified by risk; drift trend reports over time" },
        { name: "Investigate", description: "Every investigation starts with Atlas's structured evidence" },
        { name: "Remediate", description: "Atlas-generated targeted realignment plan; post-remediation validation automatic" },
        { name: "Audit", description: "Incident audit trail generated automatically for every drift detection and resolution" },
      ],
      markers: [
        { persona: "Annette", type: "skill", title: "Atlas AI & Automation — continuous baseline diff runs automatically; no manual comparison needed", description: "Drift alert received before a behavioral symptom appears — Atlas detects the configuration change, not the downstream consequence.", stageIndex: 0 },
        { persona: "Annette", type: "skill", title: "Atlas AI & Automation — undocumented change detection is only possible through Atlas's combined Config-as-Code model and change record history", description: "Unauthorized change detection: Atlas compares current Config-as-Code state against the last registered baseline and identifies every configuration change with no corresponding record.", stageIndex: 0 },
        { persona: "Annette", type: "time", title: "Time Saving — hours to days reconstructing evidence → evidence provided immediately in the Atlas alert", description: "Undocumented change investigation starts with evidence, not guesswork — Atlas provides the configuration delta, timestamp, affected component, and user ID attribution immediately.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently investigates and makes accept/escalate decisions without requiring Zach", description: "Annette can triage, decide, and act on drift findings without escalating to Zach for the basic facts.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently triages drift findings from Atlas's risk classification", description: "Findings classified by risk — Annette knows whether a Db2 ZPARM change is a compliance risk, stability risk, or cosmetic drift without Zach's interpretation.", stageIndex: 2 },
        { persona: "Greg", type: "skill", title: "Atlas AI & Automation — trend analysis from continuous monitoring data surfaces architectural governance insights", description: "Drift trend reports over time — Greg can measure whether environment parity is improving as a result of governance changes, with real data.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Time Saving — half day manual comparison → seconds via Atlas parity query", description: "QA parity report on demand — 'is this environment production-equivalent for performance testing?' answered by Atlas in a single query.", stageIndex: 2 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette conducts drift investigations independently, escalating to Zach only when the finding requires z/OS-level expertise", description: "Every investigation starts with Atlas's structured evidence — Annette has a specific, verifiable starting point rather than a blank-page investigation.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — Zach's time on escalated investigations reduced because Atlas has already done evidence assembly", description: "When Annette does escalate, the investigation is already structured — Zach reviews evidence, not repeating Annette's discovery work.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — hours to days → Atlas-generated targeted realignment plan", description: "Environment realignment plan generated by Atlas — targeted to only the parameters that differ and need correction. No manual parameter-by-parameter correction.", stageIndex: 4 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — post-remediation comparison runs automatically; no manual re-verification needed", description: "Post-remediation validation is automatic — Atlas confirms the environment reached the intended state and the drift is closed.", stageIndex: 4 },
        { persona: "Annette", type: "time", title: "Time Saving — hours assembling evidence → automatic continuous trail", description: "Incident audit trail generated automatically for every drift detection and resolution — Annette can close incidents with a complete, continuous record rather than assembling it manually.", stageIndex: 5 },
        { persona: "Derek", type: "gain", title: "New User Capability — Derek independently produces DR compliance evidence from Atlas without requiring Greg or Zach to assemble it", description: "Change record completeness improves for the Atlas estate — every Atlas-detected and Atlas-resolved drift item has a documented trail. Audit findings for undocumented changes reduce.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's production behavioral monitoring provides a complementary signal that can surface behavioral drift before configuration drift is detected — in some cases Concert for Z detects 'something changed' behaviorally before Atlas confirms 'here is what changed' configurationally.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas requests the Terraform plan output comparing the current state of each environment's workspace against its declared HCL configuration." },
            { label: "Atlas directs", description: "This plan becomes the infrastructure-layer diff in the Atlas environment comparison." },
            { label: "Terraform returns", description: "Infrastructure-layer diff from Terraform's plan output. Atlas incorporates this into the complete full-stack comparison." },
          ],
          stageIndex: 2,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified infrastructure-layer drift items requiring remediation." },
            { label: "Atlas directs", description: "Atlas directs the team to apply the Terraform plan that restores the environment to its declared state." },
            { label: "Terraform returns", description: "Terraform apply completion confirmation. Atlas marks those items as resolved and proceeds with remaining remediations." },
          ],
          stageIndex: 4,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state recording and comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules and automated checking" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Unauthorized and undocumented change detection" },
      { name: "Workflow Engine", timeline: "GA", description: "Remediation orchestration and execution" },
    ],
  },
  "uc-11": {
    id: "uc-11",
    label: "UC-11: Disaster Recovery Validation",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation — treating DR readiness as a continuous, measurable state rather than an annual test event.",
    personas: [
      { name: "Greg", role: "Infrastructure Architect", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
      { name: "Derek", role: "Compliance Evidence Provider", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Assess", description: "DR readiness assessed manually and infrequently before test" },
        { name: "Monitor", description: "No continuous monitoring between DR tests; drift accumulates invisibly" },
        { name: "Remediate", description: "Remediation executed against incomplete diff under test deadline pressure" },
        { name: "Simulate", description: "No simulated failover; DR test is first time environment exercised under production-level conditions" },
        { name: "Record", description: "DR test documentation assembled manually from test reports and team notes" },
      ],
      markers: [
        { persona: "Greg", type: "time", title: "Lost Time — 2–4 weeks of manual assessment effort before each DR test", description: "DR readiness is assessed manually and infrequently — typically in the weeks before a scheduled DR test. The assessment relies on comparing configuration snapshots, spreadsheets, and team memory.", stageIndex: 0 },
        { persona: "Greg", type: "pain", title: "Business Impact — DR assessment completeness is systematically limited by human memory and manual tooling", description: "The comparison is always incomplete — changes applied to production over months are partially tracked, partially remembered, and partially missed.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — emergency remediation effort concentrated immediately before or during the DR test", description: "When the DR test reveals gaps, the remediation must be executed under the time pressure of a test deadline — not proactively while there was time.", stageIndex: 0 },
        { persona: "Greg", type: "pain", title: "Business Impact — by the next DR test, months of drift have accumulated with no visibility until test day", description: "No continuous monitoring between DR tests — DR environments drift invisibly as production changes accumulate without being applied to DR.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — systematic production→DR drift is a natural consequence of the process, not an exception", description: "Changes applied to production (PTF applies, RACF updates, MQ channel changes) are not systematically tracked for DR propagation — each change requires a separate manual decision to replicate to DR.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — incomplete remediation means the DR test will surface gaps that 'should have been fixed'", description: "Remediation is executed against an incomplete diff — the list of what needs to change is manually assembled and always incomplete, so remediations leave residual gaps.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — days to weeks of remediating months of accumulated DR drift before each test cycle", description: "Remediating DR environments requires the same expert time as production changes — but DR changes are lower-priority and often deferred, compounding the drift.", stageIndex: 2 },
        { persona: "Greg", type: "pain", title: "Business Impact — DR test failures are expensive to recover from, and the cause is retrospectively obvious but prospectively invisible", description: "DR tests fail for reasons that were knowable in advance. Post-mortem analysis consistently identifies changes that were applied to production but not to DR — changes that were in the change log the whole time.", stageIndex: 3 },
        { persona: "Greg", type: "pain", title: "Business Impact — first real validation of DR readiness is the actual DR test, with no simulation run first", description: "No simulated failover capability — the DR test is the first time the environment is actually exercised under production-level conditions.", stageIndex: 3 },
        { persona: "Quinn", type: "skill", title: "Skill Gap / Bottleneck — Quinn must approve or defer the DR test without an objective readiness verdict", description: "Go/no-go for the DR test is made without a simulation result — the decision is based on the team's assessment of completeness, not on a verified test outcome.", stageIndex: 3 },
        { persona: "Derek", type: "time", title: "Lost Time — days assembling DR test evidence for compliance purposes", description: "DR test documentation is assembled manually from test reports, remediation records, and team notes — a time-consuming audit evidence exercise.", stageIndex: 4 },
        { persona: "Derek", type: "pain", title: "Business Impact — compliance evidence quality is limited by the manual assembly process", description: "Regulatory frameworks (DORA, SOX DR testing) require evidence of systematic DR readiness — the current evidence is point-in-time and manually assembled.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Assess", description: "Complete DR vs. production diff on demand with severity classification" },
        { name: "Monitor", description: "High-severity DR drift surfaced as it appears, not on test day" },
        { name: "Remediate", description: "DR remediation plan generated from complete diff; post-remediation validation automatic" },
        { name: "Simulate", description: "Simulated failover validation produces certified pass result before actual DR test" },
        { name: "Record", description: "Complete DR readiness history generated from Atlas automatically" },
      ],
      markers: [
        { persona: "Greg", type: "time", title: "Time Saving — 2–4 weeks manual assessment → hours for a complete DR readiness assessment", description: "Complete DR vs. production diff produced on demand — every configuration, PTF, RACF, and subsystem difference enumerated with severity classification.", stageIndex: 0 },
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
          summary: "Concert4Z's business service topology enriches severity classification with business-service context. A missing RACF group on a DR LPAR serving a high-criticality payment service is a higher-severity finding than the same gap on a low-traffic internal batch system.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas requests the Terraform state diff between the production workspace and the DR workspace." },
            { label: "Atlas directs", description: "This diff represents the infrastructure-layer parity gap. Atlas incorporates this as the infrastructure-layer parity finding in the overall production-vs-DR comparison artifact." },
            { label: "Terraform returns", description: "Infrastructure-layer diff for each environment from Terraform's plan output. Atlas incorporates this into the complete full-stack comparison." },
          ],
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas passes the DR test environment specification to Terraform." },
            { label: "Atlas directs", description: "Terraform provisions the DR test infrastructure using the same workspace declaration as the production environment." },
            { label: "Terraform returns", description: "A Terraform-provisioned DR test environment. Atlas deploys the application stack and executes the directional performance test against it." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Code-Level Performance Fix",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified the responsible subsystem component for a performance degradation. In some cases, Atlas attributes root cause to application code behavior: inefficient SQL, pathological loops, or excessive CICS calls creating thread exhaustion." },
            { label: "Atlas directs", description: "Atlas directs the developer to Bob PPZ with the full diagnostic context: specific program and transaction, performance data, subsystem context, and breached threshold. ZUnderstand traces the execution path to locate the specific code constructs driving the performance issue." },
            { label: "Bob PPZ returns", description: "A code fix artifact. Atlas validates the fix in a performance test environment at simulated load, confirms the performance constraint is resolved, and proceeds to production apply." },
          ],
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Performance Validation Iteration",
          steps: [
            { label: "Atlas produced", description: "For code-level performance fixes, Atlas provisions an isolated performance test environment at simulated production load and tests the fix." },
            { label: "Atlas directs", description: "If performance validation reveals the fix resolved one constraint but introduced another (e.g., SQL rewrite reducing I/O but increasing CPU), Atlas returns the new performance profile to the developer in Bob PPZ for a second iteration." },
            { label: "Bob PPZ returns", description: "Developer adjusts in Bob PPZ, returns updated artifact to Atlas. Atlas re-measures. This round-trip performance tuning loop continues until all constraints are resolved." },
          ],
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas attributes performance root cause to the responsible component. When Bob PPZ is installed, application-level attribution is enriched with code-level precision: rather than 'Application BATCHJOB01 is causing excessive Db2 I/O,' the diagnosis becomes 'Paragraph PROCESS-ACCOUNTS in BATCHJOB01 at line 840 executes a full-table scan on every iteration — estimated 47,000 unnecessary I/Os per run.'",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas's capacity risk modelling identifies configuration constraints approaching peak thresholds. When Bob PPZ is installed, capacity analysis for application-driven constraints is enriched with a code-level root cause breakdown: which specific programs contribute most to the constraint; whether the constraint is addressable through configuration changes or requires application code changes; the relative contribution of each program to the overall constraint.",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "Config-as-Code", timeline: "GA", description: "Configuration state recording and comparison" },
      { name: "Policy-as-Code", timeline: "GA", description: "Compliance rules and automated checking" },
      { name: "Drift Detection", timeline: "H2 2027", description: "Unauthorized and undocumented change detection" },
      { name: "Workflow Engine", timeline: "GA", description: "DR orchestration and execution" },
    ],
  },
  "uc-12": {
    id: "uc-12",
    label: "UC-12: Capacity Planning and Performance Readiness",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes — replacing reactive firefighting with proactive capacity management.",
    personas: [
      { name: "Alex", role: "Performance / Application Engineer", engagement: "Primary" },
      { name: "Zach", role: "z/OS Systems Programmer", engagement: "Secondary" },
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
      { name: "Quinn", role: "IT Operations Manager", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Performance problems discovered through user complaints or production incidents" },
        { name: "Diagnose", description: "Multi-team conference call investigation taking hours to days" },
        { name: "Size", description: "Configuration sizing by experience and rule of thumb, not modeled projection" },
        { name: "Validate", description: "Performance testing requires dedicated lab; often skipped" },
        { name: "Apply", description: "Production change planning separate from performance analysis" },
        { name: "Monitor", description: "Post-change regression attribution opaque; silent regressions accumulate" },
      ],
      markers: [
        { persona: "Annette", type: "pain", title: "Business Impact — performance degradation is reactive; by the time the user complains, impact is already occurring", description: "Performance problems are discovered through user complaints or production incidents — there is no proactive signal before throughput degrades.", stageIndex: 0 },
        { persona: "Alex", type: "time", title: "Lost Time — weeks of manual SMF analysis and projection work before peak season capacity is understood", description: "Capacity planning for peak events relies on manual analysis of prior-year SMF data, spreadsheets, and institutional memory of one or two experienced engineers.", stageIndex: 0 },
        { persona: "Alex", type: "pain", title: "Business Impact — peak season capacity surprises are a recurring risk because the projection method is not rigorous", description: "No systematic projection methodology — capacity estimates are based on experience and rule of thumb, not on modeled projection against actual transaction growth trends.", stageIndex: 0 },
        { persona: "Alex", type: "time", title: "Lost Time — hours to days to reach root cause in a multi-system performance incident", description: "Diagnosing a live performance degradation requires three or more specialist teams (CICS team, Db2 DBA, systems programmer) to pull their own telemetry independently and coordinate by conference call.", stageIndex: 1 },
        { persona: "Alex", type: "pain", title: "Business Impact — post-change performance regressions go unattributed, and the same class of change can cause the same regression again", description: "The link between a configuration change and a subsequent performance regression is usually discovered by accident or through exhaustive manual investigation — not through automated attribution.", stageIndex: 1 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot independently triage performance issues; every complaint is escalated to Alex", description: "First line of response to user performance complaints has no tool to quickly triage whether the issue is CICS, Db2, MQ, or infrastructure — escalation is reflexive, not data-driven.", stageIndex: 1 },
        { persona: "Alex", type: "pain", title: "Business Impact — under-sizing causes peak failures; over-sizing wastes capacity that could be right-sized", description: "Configuration sizing for peak load (Db2 buffer pools, CICS MXT, MQ queue depth, DASD allocation) is determined by experience and rule of thumb, not by modeled projection against actual transaction growth trends.", stageIndex: 2 },
        { persona: "Alex", type: "pain", title: "Business Impact — unnecessary hardware and software capacity purchased due to lack of right-sizing visibility", description: "Dark capacity (underutilized resources, over-provisioned LPARs) is invisible without dedicated analysis — teams routinely procure capacity they already have.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Lost Time — days to weeks to schedule and set up a performance test environment", description: "Performance testing before applying configuration changes requires a dedicated lab environment — logistically difficult to schedule, and often skipped.", stageIndex: 3 },
        { persona: "Alex", type: "pain", title: "Business Impact — unvalidated configuration changes applied to production create risk if the sizing model was inaccurate", description: "Without test validation, configuration changes are applied to production speculatively — if the sizing estimate was wrong, the next peak event surfaces it.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — additional hours translating performance findings into a production change plan", description: "Production configuration change planning is a separate manual process from the performance analysis — no connection between the diagnosis and the remediation plan.", stageIndex: 4 },
        { persona: "Quinn", type: "skill", title: "Skill Gap / Bottleneck — Quinn cannot approve production capacity changes without Zach producing a separate management summary", description: "Production capacity changes require Quinn's approval — but the evidence is presented as raw performance data, not as a management-readable risk and recommendation.", stageIndex: 4 },
        { persona: "Alex", type: "pain", title: "Business Impact — silent post-change regressions can accumulate over weeks before they surface as a noticeable degradation", description: "Post-change performance regression attribution is opaque — a configuration or software change can quietly degrade an application with no clear signal linking the change to the symptom.", stageIndex: 5 },
        { persona: "Annette", type: "skill", title: "Skill Gap / Bottleneck — Annette cannot perform cross-subsystem performance correlation without escalating to Alex", description: "Ongoing system performance monitoring requires OMEGAMON and other specialist tools — Annette monitors alerts without the ability to cross-correlate symptoms across CICS, Db2, and MQ.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Proactive constraint projection from transaction growth trend analysis" },
        { name: "Diagnose", description: "Root cause identified within one Atlas conversation with change attribution" },
        { name: "Size", description: "Peak event capacity risk modeled in one session; dark capacity identified" },
        { name: "Validate", description: "Configuration changes tested at simulated production load in isolated environment" },
        { name: "Apply", description: "Production configuration change plan generated directly from validated analysis" },
        { name: "Monitor", description: "Post-change regression attributed automatically through behavioral baseline comparison" },
      ],
      markers: [
        { persona: "Alex", type: "skill", title: "Atlas AI & Automation — proactive constraint projection from transaction growth trend analysis; no manual SMF analysis required", description: "Capacity constraints approaching peak thresholds surfaced by Atlas before the event — 'Db2 buffer pool at 82% projected capacity at forecast peak load' — not discovered during the peak event itself.", stageIndex: 0 },
        { persona: "Annette", type: "skill", title: "Atlas AI & Automation — behavioral baseline comparison attributes regression to the specific change that caused it", description: "Post-change performance regressions surfaced by Atlas automatically — correlated to the responsible configuration change event without manual investigation.", stageIndex: 0 },
        { persona: "Alex", type: "time", title: "Time Saving — hours to days of multi-team investigation → one Atlas conversation for performance root cause", description: "Root cause identified within one Atlas conversation — the responsible change event attributed, the fix generated, the remediation validated — without three-team conference call.", stageIndex: 1 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette independently triages performance complaints and provides Alex with a structured starting point instead of a blank escalation", description: "Atlas provides a triage starting point from the first user complaint — CICS, Db2, MQ, or infrastructure identified as the responsible subsystem before Alex is engaged.", stageIndex: 1 },
        { persona: "Alex", type: "time", title: "Time Saving — weeks of manual SMF analysis and projection → one Atlas session for capacity risk modeling", description: "Peak event capacity risk modeled by Atlas in one session — transaction projection against current configuration, constraint identification, configuration recommendation — without pulling data from multiple tools.", stageIndex: 2 },
        { persona: "Alex", type: "skill", title: "Atlas AI & Automation — utilization analysis across the estate surfaces under-provisioned and over-provisioned LPARs automatically", description: "Dark capacity identified by Atlas — right-sizing recommendations based on actual utilization data, enabling procurement decisions grounded in evidence rather than rule of thumb.", stageIndex: 2 },
        { persona: "Alex", type: "time", title: "Time Saving — days to weeks scheduling a lab test → Atlas provisions and runs the performance test", description: "Configuration changes tested at simulated production load in an isolated environment — headroom confirmed at each buffer pool, MXT, and queue depth threshold before production.", stageIndex: 3 },
        { persona: "Alex", type: "skill", title: "Atlas AI & Automation — simulation confirms the capacity recommendation before production application", description: "Validation confirms the sizing model was correct before production is touched — no speculative capacity changes with unknown headroom.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — diagnosis → change plan in the same Atlas session", description: "Production configuration change plan generated directly from the validated performance analysis — no separate translation from diagnosis to change plan.", stageIndex: 4 },
        { persona: "Quinn", type: "gain", title: "New User Capability — Quinn makes informed production capacity decisions independently from the Atlas artifact", description: "Atlas generates a management-readable capacity readiness summary — risk quantified, recommendation justified, validation evidence attached. Quinn approves without requiring a separate Zach briefing.", stageIndex: 4 },
        { persona: "Alex", type: "skill", title: "Atlas AI & Automation — behavioral baseline comparison after every change automatically surfaces regressions", description: "Post-change regression attributed automatically — if a configuration change introduces a performance degradation, Atlas surfaces the correlation to the responsible change event without manual investigation.", stageIndex: 5 },
        { persona: "Annette", type: "gain", title: "New User Capability — Annette monitors cross-subsystem performance health from Atlas without specialist tool access", description: "Cross-subsystem performance picture available to Annette in Atlas — CICS, Db2, MQ correlations surfaced without requiring OMEGAMON expertise.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's Optimize module detects production performance degradation and triggers Atlas capacity planning workflows. Concert4Z's Observe module provides continuous production monitoring that surfaces post-change regressions, which Atlas correlates to the specific configuration change event.",
          stageIndex: 0,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas passes the performance test environment specification to Terraform, requesting an environment provisioned from the same HCL declaration as the production workspace." },
            { label: "Atlas directs", description: "The infrastructure parity is enforced by Terraform — not approximated by manual configuration. Atlas deploys the application stack and executes the directional performance test against it." },
            { label: "Terraform returns", description: "A Terraform-provisioned performance test environment with production-equivalent infrastructure. Atlas runs the performance test against it." },
          ],
          stageIndex: 3,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Code-Level Performance Fix",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified the responsible subsystem component for a performance degradation. In some cases, Atlas attributes root cause to application code behavior: inefficient SQL, pathological loops, or excessive CICS calls creating thread exhaustion." },
            { label: "Atlas directs", description: "Atlas directs the developer to Bob PPZ with the full diagnostic context: specific program and transaction, performance data, subsystem context, and breached threshold. ZUnderstand traces the execution path to locate the specific code constructs driving the performance issue." },
            { label: "Bob PPZ returns", description: "A code fix artifact. Atlas validates the fix in a performance test environment at simulated load, confirms the performance constraint is resolved, and proceeds to production apply." },
          ],
          stageIndex: 1,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Performance Validation Iteration",
          steps: [
            { label: "Atlas produced", description: "For code-level performance fixes, Atlas provisions an isolated performance test environment at simulated production load and tests the fix." },
            { label: "Atlas directs", description: "If performance validation reveals the fix resolved one constraint but introduced another (e.g., SQL rewrite reducing I/O but increasing CPU), Atlas returns the new performance profile to the developer in Bob PPZ for a second iteration." },
            { label: "Bob PPZ returns", description: "Developer adjusts in Bob PPZ, returns updated artifact to Atlas. Atlas re-measures. This round-trip performance tuning loop continues until all constraints are resolved." },
          ],
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas attributes performance root cause to the responsible component. When Bob PPZ is installed, application-level attribution is enriched with code-level precision: rather than 'Application BATCHJOB01 is causing excessive Db2 I/O,' the diagnosis becomes 'Paragraph PROCESS-ACCOUNTS in BATCHJOB01 at line 840 executes a full-table scan on every iteration — estimated 47,000 unnecessary I/Os per run.'",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Atlas's capacity risk modelling identifies configuration constraints approaching peak thresholds. When Bob PPZ is installed, capacity analysis for application-driven constraints is enriched with a code-level root cause breakdown: which specific programs contribute most to the constraint; whether the constraint is addressable through configuration changes or requires application code changes; the relative contribution of each program to the overall constraint.",
          stageIndex: 2,
        },
      ],
    },
    capabilities: [
      { name: "System Discovery", timeline: "GA", description: "Complete environment inventory" },
      { name: "System Topology", timeline: "GA", description: "Visual dependency relationships" },
      { name: "Change Risk Assessment", timeline: "GA", description: "Compatibility and sequencing analysis" },
      { name: "Workflow Engine", timeline: "GA", description: "Capacity change orchestration and execution" },
      { name: "Test Environment Provisioning", timeline: "GA", description: "Isolation testing environments" },
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