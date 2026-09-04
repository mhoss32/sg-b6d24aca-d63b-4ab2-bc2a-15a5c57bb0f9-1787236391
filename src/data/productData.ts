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
        { name: "Surface Gaps", description: "Discover gaps during audit, not before" },
        { name: "Remediate", description: "Fix findings under time pressure during audit window" },
        { name: "Generate Package", description: "Assemble evidence package manually" },
        { name: "Monitor", description: "No continuous monitoring between audits" },
      ],
      markers: [
        { persona: "Derek", type: "time", title: "Lost Time — 1–3 days to understand what evidence can even be assembled", description: "Scoping an IBM Z audit requires coordinating with Zach, Sage, and multiple subsystem teams just to understand what evidence is available — no unified inventory.", stageIndex: 0 },
        { persona: "Derek", type: "skill", title: "Skill Gap / Bottleneck — Derek cannot self-serve any z/OS evidence without expert support", description: "Does not have deep z/OS technical expertise; translating audit requirements into system queries requires escalating to Zach or Sage for every domain.", stageIndex: 0 },
        { persona: "Derek", type: "time", title: "Lost Time — 10–30 engineer-days per audit cycle", description: "For large production estate, manual evidence collection takes 10–30 engineer-days.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Skill Gap / Bottleneck — separation of duties analysis performed manually under deadline", description: "Complex RACF analysis requires deep expertise and is done under time pressure.", stageIndex: 2 },
        { persona: "Derek", type: "pain", title: "Business Impact — undocumented changes discovered by auditors, not internal team", description: "Gaps surface only when auditors find them — internal team has no proactive detection.", stageIndex: 3 },
        { persona: "Derek", type: "pain", title: "Business Impact — no proactive detection", description: "Gaps surface only when specifically looked for — no continuous monitoring.", stageIndex: 3 },
        { persona: "Quinn", type: "pain", title: "Business Impact — audit findings disrupt planned work", description: "Audit findings must be remediated immediately, pulling resources from planned projects.", stageIndex: 4 },
        { persona: "Derek", type: "time", title: "Lost Time — 5–15 business days of senior engineer time", description: "Assembling the evidence package from individual exports takes weeks of engineering time and is error-prone.", stageIndex: 5 },
        { persona: "Derek", type: "pain", title: "Business Impact — evidence is point-in-time, not continuous", description: "Evidence reflects a snapshot assembled under pressure rather than a continuous, authoritative record.", stageIndex: 5 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Scope", description: "Atlas confirms audit scope from continuous record" },
        { name: "Collect", description: "All evidence assembled automatically from topology" },
        { name: "Analyze", description: "Cross-source compliance analysis with severity" },
        { name: "Surface Gaps", description: "Proactive gap detection before auditors find issues" },
        { name: "Remediate", description: "Atlas-generated plans with validation before apply" },
        { name: "Generate Package", description: "Auditor-ready artifact generated in minutes" },
        { name: "Monitor", description: "Continuous monitoring between audit cycles" },
      ],
      markers: [
        { persona: "Derek", type: "gain", title: "New User Capability — audit scope confirmed automatically from continuous record", description: "Atlas confirms the audit scope from its live environment model — no manual scope definition across multiple systems.", stageIndex: 0 },
        { persona: "Derek", type: "time", title: "Time Saving — 10–30 engineer-days → under 2 engineer-days", description: "Evidence generated in hours instead of weeks of manual collection.", stageIndex: 1 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — cross-source compliance analysis joins RACF, Db2, and configuration in one severity-ranked view", description: "Compliance gaps analyzed across all sources simultaneously — severity ranked with compound risk identification.", stageIndex: 2 },
        { persona: "Derek", type: "skill", title: "Atlas AI & Automation — compliance framework mapping applied to raw findings automatically", description: "Atlas categorizes findings against SOX IT General Controls, PCI DSS, or customer-defined framework automatically — no manual mapping required.", stageIndex: 2 },
        { persona: "Derek", type: "skill", title: "Atlas AI & Automation — 46 undocumented changes surfaced proactively in 12 months", description: "Continuous monitoring finds gaps before auditors do.", stageIndex: 3 },
        { persona: "Sage", type: "skill", title: "Atlas AI & Automation — behavioral anomaly detection", description: "Finds patterns no human thought to look for across RACF, SMP/E, and configuration data.", stageIndex: 3 },
        { persona: "Quinn", type: "gain", title: "New User Capability — proactive remediation before audit window", description: "Gaps addressed on a continuous basis rather than under audit pressure.", stageIndex: 4 },
        { persona: "Derek", type: "gain", title: "New User Capability — compliance professional operates without deep z/OS expertise", description: "Atlas surfaces findings in plain language — no need for RACF expert to interpret.", stageIndex: 5 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas surfaces undocumented changes and access anomalies through its Config-as-Code baseline comparison and RACF analysis. Concert4Z's Observe module provides a complementary signal: production behavioral anomalies that may correlate with unauthorized access events. These Concert4Z signals can direct Atlas's anomaly investigation to specific time windows and system components.",
          stageIndex: 3,
        },
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas monitors continuously for new compliance deviations between audit cycles. Concert4Z's continuous production monitoring provides a real-time signal layer that complements Atlas's configuration-based monitoring: where Atlas detects configuration drift, Concert4Z detects behavioral drift. The combination narrows compliance gaps faster.",
          stageIndex: 6,
        },
        {
          type: "handoff",
          product: "Terraform",
          title: "Terraform Handoff",
          steps: [
            { label: "Atlas produced", description: "Atlas has identified compliance gaps across RACF, Db2, and configuration layers. The assessment also requires infrastructure-layer evidence." },
            { label: "Atlas directs", description: "Atlas requests the current Terraform workspace state for each in-scope LPAR." },
            { label: "Terraform returns", description: "Terraform state snapshots providing the infrastructure baseline layer of the compliance assessment." },
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
        { name: "Orient", description: "New hire shadows experienced colleague informally" },
        { name: "Explore", description: "Read outdated or incomplete documentation" },
        { name: "Assess Risk", description: "Build mental model over months of trial and error" },
        { name: "Document", description: "No systematic knowledge capture mechanism" },
        { name: "Execute First Change", description: "Execute first change with minimal guidance" },
      ],
      markers: [
        { persona: "Chris", type: "time", title: "Lost Time — 3–6 months before reaching independent contribution capability", description: "New team members learn the environment through informal shadowing, reading outdated documentation, and asking the one senior engineer who is always too busy.", stageIndex: 0 },
        { persona: "Zach", type: "time", title: "Lost Time — 4–8 hours of Zach's time per new hire for initial orientation", description: "Every new hire requires Zach to personally deliver environment orientation — the same knowledge transfer, repeated for every new person.", stageIndex: 0 },
        { persona: "Chris", type: "pain", title: "Business Impact — institutional knowledge lost permanently on retirement", description: "The most critical knowledge lives in people's heads; in environments where the senior engineer has retired, this knowledge is simply gone.", stageIndex: 0 },
        { persona: "Chris", type: "pain", title: "Business Impact — no intuitive on-ramp", description: "z/OS documentation is dense and assumes prior knowledge — no beginner-friendly path.", stageIndex: 1 },
        { persona: "Alice", type: "skill", title: "Skill Gap / Bottleneck — no systematic knowledge transfer", description: "No mechanism to transfer environmental knowledge from experienced to new staff.", stageIndex: 2 },
        { persona: "Chris", type: "pain", title: "Business Impact — first changes carry high incident risk", description: "Incomplete understanding leads to production incidents during first changes.", stageIndex: 4 },
      ],
    },
    toBe: {
      title: "Desired Outcome",
      stages: [
        { name: "Orient", description: "Atlas provides structured environment overview in first week" },
        { name: "Explore", description: "Natural language queries answer any question instantly" },
        { name: "Assess Risk", description: "Atlas surfaces highest-priority open risks proactively" },
        { name: "Document", description: "System Intelligence Brief generated as knowledge artifact" },
        { name: "Execute First Change", description: "Atlas-guided safe execution with plan, test, workflow" },
      ],
      markers: [
        { persona: "Chris", type: "time", title: "Time Saving — 3–6 months → under 4 weeks", description: "Structured Atlas onboarding gets new hires productive in under 4 weeks.", stageIndex: 0 },
        { persona: "Chris", type: "gain", title: "New User Capability — Chris independently explores the environment without requiring Zach's availability", description: "Self-service exploration — Chris can ask Atlas any environment question and receive a grounded, specific answer without interrupting a senior engineer.", stageIndex: 1 },
        { persona: "Alice", type: "gain", title: "New User Capability — Alice independently orients to new systems without requiring a shadow period", description: "A mid-level engineer inheriting a system they have not previously managed can orient entirely through Atlas.", stageIndex: 1 },
        { persona: "Chris", type: "gain", title: "New User Capability — proactive risk surfacing", description: "Shows what matters before new hire knows to ask — no need to know what to look for.", stageIndex: 2 },
        { persona: "Chris", type: "skill", title: "Atlas AI & Automation — environment knowledge persists regardless of staff turnover", description: "Atlas captures and preserves institutional knowledge — not dependent on individuals.", stageIndex: 3 },
        { persona: "Zach", type: "skill", title: "Atlas AI & Automation — critical knowledge captured", description: "Reduces retirement impact by preserving expert knowledge in Atlas.", stageIndex: 3 },
        { persona: "Chris", type: "gain", title: "New User Capability — Atlas-guided first change with full plan, test, and workflow support", description: "Chris's first change is executed through Atlas's guided workflow — impact analysis, test plan, validation, and deployment orchestration all provided step by step.", stageIndex: 4 },
      ],
      externalTouchpoints: [
        {
          type: "enrichment",
          product: "Concert4Z",
          title: "Concert4Z Enrichment Touchpoint",
          summary: "Atlas provides a structured environment overview in the first week. Concert4Z's ZEN runtime relationship data enriches this overview with runtime-observed application flows — which transactions actually called which programs during the observation period.",
          stageIndex: 0,
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