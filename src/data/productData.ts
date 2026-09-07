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
    connections: ["system", "change"],
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
    description: "Rapid regulatory compliance with scoped inventory, gap analysis, and sequenced remediation — from new regulation announced to evidence package delivered.",
    connections: ["predictive", "change"],
  },
  {
    id: "uc-04",
    label: "UC-04: Change Readiness and Health Assessment",
    type: "useCase",
    description: "Structured, repeatable health assessment joining configuration state, security posture, PTF currency, and performance constraints into one artifact — in minutes, not hours.",
    connections: ["predictive", "change"],
  },
  {
    id: "uc-05",
    label: "UC-05: Change Governance and Traceability",
    type: "useCase",
    description: "Complete change attribution, undocumented change detection, and ITSM integration for audit readiness — closing the gap between what happened on z/OS and what the change management system knows.",
    connections: ["system", "change"],
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
    description: "Legacy application analysis, technical debt identification, and safe phased modernization — turning 'we cannot safely touch this' into a phased, validated, risk-controlled project.",
    connections: ["change", "system"],
  },
  {
    id: "uc-10",
    label: "UC-10: Environment Parity and Drift Control",
    type: "useCase",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation — detecting drift before a human notices a behavioral symptom.",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-11",
    label: "UC-11: Disaster Recovery Validation",
    type: "useCase",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation — treating DR readiness as a continuous, measurable state rather than an annual test event.",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-12",
    label: "UC-12: Capacity Planning and Performance Readiness",
    type: "useCase",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes — replacing reactive firefighting with proactive capacity management.",
    connections: ["change", "predictive"],
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
      { name: "Annette", role: "IT Operations Engineer", engagement: "Secondary" },
    ],
    asIs: {
      title: "Current State",
      stages: [
        { name: "Detect", description: "Systems programmer identifies that patches are needed — through scheduled maintenance review, advisory, or subsystem SME concern. For security PTFs, an advisory is published and the team must determine exposure." },
        { name: "Analyze", description: "Determine what proposed patches will affect — subsystems, applications, prerequisite chains, restart requirements. For security PTFs, cross-reference multi-LPAR query results to determine which systems are actually affected." },
        { name: "Plan", description: "Generate a sequenced patch plan — acquisition order, dependency sequence, deployment order, test environment specification, test scenario list." },
        { name: "Provision", description: "Provision a test environment that mirrors production before any patch is applied." },
        { name: "Deploy", description: "Application components are deployed into the test environment before test execution can begin." },
        { name: "Validate", description: "Apply patches in the test environment and run validation — smoke tests, function tests — to confirm no breakage." },
        { name: "Decide", description: "Review test results and make the production promotion decision." },
        { name: "Execute", description: "Orchestrate the production apply — acquisition, sequenced application, LPAR restarts in maintenance window order." },
        { name: "Govern", description: "Create the change record, attach evidence, and seal the audit trail." },
      ],
      markers: [
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours per environment just to understand current PTF state", description: "Querying SMP/E for PTF inventory and prerequisite chains requires ISPF dialogs with no natural language interface — slow and expert-dependent.", stageIndex: 0 },
        { persona: "Stan", type: "time", title: "Lost Time — hours per quarter monitoring maintenance bulletins across subsystems", description: "Subsystem-specific maintenance gaps (CICS, Db2, MQ) are not surfaced automatically — Stan must monitor IBM fix lists and product announcements manually.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–3 business days for cross-LPAR security exposure assessment", description: "Answering 'are we exposed?' requires logging into ISPF on each LPAR individually and running SMP/E or GIMAPI queries — typically a 2–3 day process across a large estate.", stageIndex: 0 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — requires Zach's availability to produce any exposure answer", description: "Has no direct way to determine exposure without going through Zach first; dependent on a verbal summary rather than real data.", stageIndex: 0 },
        { persona: "Sage", type: "pain", title: "Business Impact — security posture is undefended at the executive level during the exposure window", description: "CISO and management expect an exposure brief she cannot produce without a multi-day investigation.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours of manual analysis per patch batch", description: "Impact assessment requires manually cross-referencing PTF descriptions against application topology — a process relying entirely on expert knowledge not documented anywhere.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — changes proceed with incomplete impact knowledge, increasing production incident risk", description: "Most organizations cannot confidently answer 'what will break if I apply this PTF?' without hours of multi-team investigation.", stageIndex: 1 },
        { persona: "Stan", type: "skill", title: "Skill Gap / Bottleneck — cross-subsystem analysis requires coordinating Zach, Stan, DBA, MQ admin simultaneously", description: "Each subsystem specialist only knows their own domain; cross-subsystem impact (CICS → Db2 contention scenarios) requires convening multiple teams.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours additional expert-only analysis for security exposure", description: "Manually cross-referencing results across LPARs relies entirely on expert memory and is not documented anywhere.", stageIndex: 1 },
        { persona: "Zach", type: "pain", title: "Business Impact — detection window always lags the threat", description: "No proactive signal before a CVE is publicly published — exposure is discovered reactively, from the advisory.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 1–3 days of senior engineer investigation time for blast radius", description: "Blast radius analysis has no automated tooling — it requires the most experienced engineer to trace dependencies from memory.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — audit exposure is compounded by inability to quantify blast radius", description: "No unified, query-ready evidence source to defend certificate and compliance posture in audits.", stageIndex: 1 },
        { persona: "Sage", type: "pain", title: "Business Impact — unknown compound risks remain open", description: "Compound risk (e.g., missing PTF + unencrypted connection) is invisible to any single tool.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours of prerequisite tracing, plus potential production incident time", description: "PTF prerequisite chains are navigated manually in SMP/E — a missed co-requisite causes a failed production apply.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — plan quality depends entirely on the experience of whoever writes it", description: "No AI-generated plan tied to the actual topology — plans are built from memory and informal processes.", stageIndex: 2 },
        { persona: "Stan", type: "time", title: "Lost Time — 1–2 days of back-and-forth to align plan across SMEs", description: "For middleware patches, Stan's sign-off on the subsystem scope requires manual coordination with Zach via email or meetings.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours of SMP/E prerequisite chain tracing + potential production incident", description: "PTF prerequisite chain resolution is manual; a missed co-requisite causes a failed apply discovered only during a production change window.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — incorrect sequencing can cause outages worse than the original vulnerability", description: "Multi-LPAR sequencing for patches with shared subsystem dependencies (shared Db2, shared MQ) is planned from memory.", stageIndex: 2 },
        { persona: "Zach", type: "pain", title: "Business Impact — a live failover exposure remains open after production is remediated", description: "DR environments are frequently patched last or forgotten entirely.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–5 days to provision a test environment, or the step is skipped", description: "Test environments are provisioned manually — slow, error-prone, and frequently skipped under time pressure. Production becomes the de facto test environment.", stageIndex: 3 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — test environment provisioning blocked on Zach's availability or a separate team", description: "Mid-level engineers cannot independently provision test environments; every provisioning step requires Zach's involvement or a separate infrastructure request.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–5 days to provision lab, or the step is skipped entirely", description: "Lab environments take days to provision; under time pressure this step is skipped — production becomes the de facto test environment for emergency patches.", stageIndex: 3 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — Alice cannot execute safely without Zach present", description: "Remediation steps delegated by Zach lack the context needed to execute them safely; every delegated task still requires Zach's availability.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–6 hours of manual configuration per test environment setup", description: "Application component deployment into a test environment is a manual, multi-step process — each component must be configured separately.", stageIndex: 4 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–16 hours of manual test execution per patch cycle", description: "Test execution is manual; there is no automated test scaffolding tied to the specific change. Coverage depends on individual engineer discipline.", stageIndex: 5 },
        { persona: "Stan", type: "skill", title: "Skill Gap / Bottleneck — Stan's sign-off on subsystem test results must be coordinated before Zach can proceed", description: "Subsystem-specific validation results are reviewed separately by Stan in isolation from Zach's overall change view — no shared artifact.", stageIndex: 5 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — Alice escalates every test failure to Zach, creating a bottleneck", description: "Test failures require Zach to investigate — mid-level engineers lack the context to diagnose PTF-related test failures independently.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Lost Time — 1–2 hours assembling evidence before the production decision", description: "Test evidence is assembled manually from multiple sources — no single place to review pass/fail for the full plan.", stageIndex: 6 },
        { persona: "Quinn", type: "skill", title: "Skill Gap / Bottleneck — Quinn cannot make a risk-informed decision without Zach producing a separate summary", description: "Approving production promotion requires a non-technical summary that Zach must produce separately — no artifact ready for management review.", stageIndex: 6 },
        { persona: "Zach", type: "pain", title: "Business Impact — emergency patches applied with reduced controls, increasing incident risk", description: "Emergency patches bypass normal process because there is no fast-track workflow that is also safe — teams are forced to choose between speed and rigor.", stageIndex: 7 },
        { persona: "Zach", type: "pain", title: "Business Impact — unplanned rollback under time pressure is a leading cause of extended outages", description: "Rollback planning is informal; when a patch causes a problem the remediation path is improvised.", stageIndex: 7 },
        { persona: "Zach", type: "pain", title: "Business Impact — apply failures on one LPAR can have knock-on effects across the estate", description: "Multi-LPAR apply sequenced from memory; shared dependencies create coordination risk.", stageIndex: 7 },
        { persona: "Zach", type: "time", title: "Lost Time — 1–3 hours of retrospective change record assembly", description: "Change records are assembled after the fact from memory and email threads — a separate manual step that gets skipped under time pressure.", stageIndex: 8 },
        { persona: "Annette", type: "time", title: "Lost Time — 1–2 hours per patch cycle pulling change evidence from disparate tools", description: "Monitoring change execution and reviewing change records requires querying multiple systems — no single source of truth.", stageIndex: 8 },
        { persona: "Zach", type: "time", title: "Lost Time — 2–4 hours of manual retrospective assembly", description: "The entire audit trail is assembled after the fact from memory, email threads, and change tickets.", stageIndex: 8 },
        { persona: "Sage", type: "pain", title: "Business Impact — compliance evidence is incomplete and unreliable", description: "No auditor-ready evidence package without the same manual investigation effort.", stageIndex: 8 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Detect", description: "Atlas proactively surfaces missing or at-risk PTFs, or the user queries Atlas for PTF state. Security-flagged PTFs are highlighted. Subsystem SMEs receive subsystem-specific gaps directly." },
        { name: "Analyze", description: "Atlas maps the impact of proposed changes: affected subsystems, applications, prerequisite chains, restart requirements, estimated maintenance window duration." },
        { name: "Plan", description: "Atlas generates a sequenced patch plan tied to actual environment topology — acquisition steps, dependency order, deployment sequence, test environment spec, test scenario list." },
        { name: "Provision", description: "A monoplex L2 virtual LPAR is provisioned mirroring production. At GA, the customer operates the engine; Atlas-native provisioning arrives at H1 2027." },
        { name: "Deploy", description: "Application components from the Atlas topology model are deployed into the provisioned environment automatically." },
        { name: "Validate", description: "Atlas applies patches to the test environment in sequence and runs the test package. Smoke and function tests at GA; integration and regression tests at H1 2027." },
        { name: "Decide", description: "Zach reviews test results and Atlas's recommendation; authorizes production promotion. For middleware patches, Stan approves the subsystem plan first." },
        { name: "Execute", description: "Atlas orchestrates the production apply — patch acquisition, sequenced application, LPAR restarts in maintenance window order. Real-time progress visible throughout." },
        { name: "Govern", description: "Atlas generates the change record, attaches the plan, test results, and execution log. ServiceNow record created. Audit trail sealed." },
      ],
      markers: [
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — continuous PTF monitoring surfaces gaps without user prompting", description: "Atlas proactively surfaces PTF gaps — Zach doesn't need to initiate a quarterly SMP/E review; Atlas has already identified what needs attention.", stageIndex: 0 },
        { persona: "Stan", type: "gain", title: "New User Capability — Stan independently tracks subsystem maintenance needs via Atlas", description: "Subsystem-specific maintenance gaps surfaced directly to Stan — MQ, CICS, Db2 SMEs see their subsystem's patch needs without Zach as an intermediary.", stageIndex: 0 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — proactive monitoring surfaces risk before it is asked", description: "Atlas surfaces a FIXCAT security gap without a user query — shortening the detection-to-response window from 'whenever the advisory reaches the right person' to 'when Atlas's next PTF currency check runs.'", stageIndex: 0 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage can act on a finding without depending on Zach", description: "Proactive alert means Sage can initiate a CISO brief immediately rather than waiting for Zach's investigation to complete.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Time Saving — 4–8 hours → under 30 minutes for impact analysis", description: "Full impact of any PTF batch understood in minutes — which subsystems, applications, and transactions are affected, with prerequisite chains already resolved.", stageIndex: 1 },
        { persona: "Stan", type: "skill", title: "Atlas AI Insight & Automation — cross-subsystem risk compounding is only visible through Atlas's unified topology model", description: "Atlas surfaces subsystem-specific impact analysis to Stan directly — cross-subsystem risks like CICS thread limits creating Db2 contention are identified automatically.", stageIndex: 1 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–3 business days → under 10 minutes for exposure assessment", description: "'Are we exposed?' answered in seconds — Atlas queries all connected LPARs simultaneously. No ISPF. No SMP/E dialogs.", stageIndex: 1 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage gains direct access to exposure facts", description: "Real exposure data rather than Zach's verbal summary — Sage can independently verify exposure scope without going through Zach first.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — multi-source topology traversal from ZUnderstand, impossible manually", description: "Blast radius is a topology map, not a guess. Atlas traverses the dependency graph and names every reachable system — coverage confidence surfaced alongside the map.", stageIndex: 1 },
        { persona: "Sage", type: "time", title: "Time Saving — 1–3 days → under 30 minutes for executive-ready briefing", description: "Real blast radius map allows Sage to produce a CISO-ready exposure brief in minutes, not after a multi-day investigation.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — cross-source risk compounding only possible with Atlas's unified model", description: "Compound risk identification: Atlas surfaces combinations of findings (missing security PTF + unencrypted IPIC connection) that create compound risk invisible to any single tool.", stageIndex: 1 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — topology-aware plan generation eliminates the leading cause of PTF-related outages", description: "AI-generated plan anchored to the actual topology — prerequisite chains resolved, apply order determined, test scenarios scoped to the affected applications.", stageIndex: 2 },
        { persona: "Stan", type: "time", title: "Time Saving — 1–2 days coordination → structured workflow in Atlas", description: "Stan reviews and approves the subsystem scope within the plan directly in Atlas — no email back-and-forth. Plan captures his sign-off before returning to Zach.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — Atlas resolves co-requisite chains without Zach navigating SMP/E resolution rules", description: "Every PTF prerequisite resolved automatically — eliminating the leading cause of PTF-related production outages.", stageIndex: 2 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — Atlas flags DR exposure without being asked", description: "DR exposure flagged proactively while production is being remediated — the failure mode that leads to breaches.", stageIndex: 2 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–5 days → automated provisioning", description: "Test environment specification is generated automatically from the plan — no manual translation of requirements to infrastructure.", stageIndex: 3 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice can participate in test environment setup independently", description: "Mid-level engineers can follow Atlas's provisioning specification without requiring Zach's involvement for every step.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–5 days → automated provisioning", description: "Test environment available; no manual provisioning lag before the validation step can begin.", stageIndex: 3 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently executes delegated steps", description: "Step-by-step execution guidance generated for each delegated LPAR apply — Alice can execute safely without Zach in the room.", stageIndex: 3 },
        { persona: "Alice", type: "skill", title: "Atlas AI Insight & Automation — configuration update generated automatically from test failure", description: "If a test fails, Atlas identifies the specific dependency and generates the required fix (e.g., CSD update) in real time.", stageIndex: 3 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–6 hours → automatic via Application Deployment Engine", description: "Application components deployed automatically from the topology model — the test environment is ready to use without manual component-by-component configuration.", stageIndex: 4 },
        { persona: "Zach", type: "time", title: "Time Saving — 4–16 hours manual testing → automated execution", description: "Automated test execution — Atlas runs the test package and surfaces pass/fail with failure context. No manual test writing for standard scenarios.", stageIndex: 5 },
        { persona: "Stan", type: "gain", title: "New User Capability — Stan reviews his subsystem's validation independently, in context", description: "Subsystem-specific test results reviewed by Stan in Atlas — structured, filterable, with clear attribution to the subsystem scope he owns.", stageIndex: 5 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently interprets failure context Atlas provides", description: "Test failures attributed to specific dependencies — Alice can diagnose without escalating to Zach for every failure.", stageIndex: 5 },
        { persona: "Zach", type: "time", title: "Time Saving — 1–2 hours assembling evidence → pre-assembled in Atlas", description: "Clear recommendation with supporting evidence — all in one place: test results, subsystem SME sign-offs, prerequisite resolution, maintenance window.", stageIndex: 6 },
        { persona: "Quinn", type: "gain", title: "New User Capability — Quinn makes informed production decisions independently", description: "Atlas presents a non-technical risk summary alongside the technical evidence — Quinn can make the approval decision without requiring a separate Zach briefing.", stageIndex: 6 },
        { persona: "Zach", type: "time", title: "Time Saving — no forced trade-off between speed and rigor; fast-track path is built in", description: "Transparent step-by-step execution with reasoning visible — Zach can pause or abort at any point. Emergency patches fast-tracked through the same safe workflow.", stageIndex: 7 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — rollback path is planned before execution begins", description: "Rollback plan is generated alongside the execution plan — rollback is not improvised, it starts from a documented known-good state.", stageIndex: 7 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — shared dependency ordering computed and enforced automatically", description: "Dependency-aware sequencing prevents knock-on failures during multi-LPAR apply. Progress visible in real time.", stageIndex: 7 },
        { persona: "Zach", type: "time", title: "Time Saving — 1–3 hours retrospective work → automatic", description: "Complete traceability from detection through production apply generated automatically — no manual assembly required.", stageIndex: 8 },
        { persona: "Annette", type: "time", title: "Time Saving — 1–2 hours per cycle → single Atlas query", description: "Single source of truth for change monitoring and review — Annette queries Atlas rather than assembling evidence from multiple systems.", stageIndex: 8 },
        { persona: "Zach", type: "time", title: "Time Saving — 2–4 hours manual assembly → automatic", description: "Complete audit trail generated automatically — exposure assessment, blast radius, plan, test results, apply log, authorization chain. Zero manual assembly.", stageIndex: 8 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage produces the evidence package without Zach's involvement", description: "CISO-ready evidence package available immediately at close — auditor-ready without further effort.", stageIndex: 8 },
        { persona: "Sage", type: "gain", title: "New User Capability — Sage has independent visibility into DR remediation status", description: "DR exposure remains tracked and flagged until DR remediation is confirmed complete — no silent failover risk.", stageIndex: 8 },
        { persona: "Zach", type: "skill", title: "Atlas AI Insight & Automation — proactive behavioral monitoring during the exposure window", description: "Exploitation activity detected during remediation window surfaces immediately — Atlas surfaces anomalies without being asked.", stageIndex: 8 },
      ],
      externalTouchpoints: [
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
          product: "Concert4Z",
          title: "Concert4Z Handoff",
          steps: [
            { label: "Atlas produced", description: "Following patch apply, Concert4Z's Observe and Optimize modules monitor for post-patch behavioral regressions." },
            { label: "Concert4Z directs", description: "If Concert4Z detects a behavioral anomaly correlating with the patch apply timestamp, it surfaces this as an operational finding. Atlas's change record provides Concert4Z with the exact change context." },
            { label: "Atlas returns", description: "If Concert4Z identifies a post-patch regression, it triggers a new Atlas workflow: investigate the regression, determine whether rollback is warranted." },
          ],
          stageIndex: 8,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's production performance baselines provide behavioral ground truth for the pre-patch environment, improving the specificity of Atlas's pre/post behavioral comparison during validation.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Concert4Z's ZEN data enriches test coverage by identifying which production transaction flows are most active — ensuring Atlas's validation prioritizes the highest-traffic paths.",
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "As part of the readiness gate, Atlas directs the team to confirm that each target LPAR is in its declared infrastructure state." },
            { label: "Atlas directs", description: "The team runs terraform plan against each LPAR workspace to surface any infrastructure drift before the maintenance window begins." },
            { label: "Terraform returns", description: "Infrastructure parity confirmation (or a list of drift items that must be resolved before patching can proceed). Atlas incorporates this into the readiness assessment output." },
          ],
          stageIndex: 1,
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
          summary: "Terraform's state file provides LPAR-level infrastructure metadata that Atlas uses to assign LPARs to maintenance window slots, preventing a production-workspace LPAR from being accidentally scheduled with a test-workspace LPAR.",
          stageIndex: 2,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's policy-as-code enforcement can prevent non-patch infrastructure changes from being made to LPARs while a maintenance window is active — passively eliminating a category of mid-window conflicts.",
          stageIndex: 7,
        },
        {
          type: "enrichment",
          product: "Terraform",
          title: "Terraform Enrichment Touchpoint",
          summary: "Terraform's versioned state file produces an automatic before/after infrastructure snapshot for every LPAR touched during the patch cycle — complementing the Atlas-generated evidence package with a complete dual-layer audit trail.",
          stageIndex: 8,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Test Failure Attributed to Application Code",
          steps: [
            { label: "Atlas produced", description: "When Atlas's test reveals a CICS API behavior change introduced by a PTF that a COBOL program was relying on, Atlas identifies the specific program, call path, and the nature of the incompatibility." },
            { label: "Atlas directs", description: "Atlas directs the user to Bob PPZ with the failure attribution — the affected program, the subsystem behavior change, and the test scenario that failed. Bob PPZ uses ZUnderstand to trace the execution path through the affected program and generate the precise code modification required." },
            { label: "Bob PPZ returns", description: "A corrected code artifact. Atlas re-runs the relevant test scenarios, confirms pass, and incorporates the code fix into the production promotion package." },
          ],
          stageIndex: 5,
        },
        {
          type: "handoff",
          product: "Bob PPZ",
          title: "Bob PPZ Handoff — Middleware Patches with Open Code Actions",
          steps: [
            { label: "Atlas produced", description: "For middleware patches (CICS, Db2, MQ), if test results indicate application code changes are required before production promotion, those items appear as open actions in the decision artifact." },
            { label: "Atlas directs", description: "Atlas directs the responsible developer to Bob PPZ with full context. Resolved items are returned to Atlas before Quinn's production promotion authorization." },
            { label: "Bob PPZ returns", description: "Completed code change artifacts. Atlas validates and incorporates into the promotion package." },
          ],
          stageIndex: 6,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "When Bob PPZ is installed, the application layer of the impact analysis is enriched with code-level metadata: for a CICS PTF changing EXEC CICS API behavior, the enriched analysis identifies not just which CICS regions are affected but which COBOL programs use the specific API calls that the PTF modifies.",
          stageIndex: 1,
        },
        {
          type: "enrichment",
          product: "Bob PPZ",
          title: "Bob PPZ Enrichment Touchpoint",
          summary: "Test scenarios are enriched with code-level test targets — specific transactions, program entry points, and data paths that exercise the exact code constructs affected by the patch.",
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
    type: "useCase",
    description: "Legacy application analysis, technical debt identification, and safe phased modernization — turning 'we cannot safely touch this' into a phased, validated, risk-controlled project.",
    connections: ["change", "system"],
  },
  {
    id: "uc-10",
    label: "UC-10: Environment Parity and Drift Control",
    type: "useCase",
    description: "Continuous environment parity monitoring with unauthorized change detection and automated remediation — detecting drift before a human notices a behavioral symptom.",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-11",
    label: "UC-11: Disaster Recovery Validation",
    type: "useCase",
    description: "Continuous DR readiness assessment with cross-environment comparison and failover simulation — treating DR readiness as a continuous, measurable state rather than an annual test event.",
    connections: ["predictive", "system"],
  },
  {
    id: "uc-12",
    label: "UC-12: Capacity Planning and Performance Readiness",
    type: "useCase",
    description: "Proactive capacity management with load projection, constraint identification, and validated configuration changes — replacing reactive firefighting with proactive capacity management.",
    connections: ["change", "predictive"],
  },
];
