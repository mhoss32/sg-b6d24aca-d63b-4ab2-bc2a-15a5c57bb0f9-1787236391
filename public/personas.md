# Atlas Personas

This page defines the canonical user personas for Project Atlas. Personas are used across use case specs, demo scenarios, and design work to ground decisions in real user needs.

Personas are organized by role cluster. Each persona has a name, role title, experience level, and a brief description of their primary concerns and ways of working. Where descriptions are still being developed, the field is marked TBD.

**Source:** Extracted from `use-case-merge-spec.md` §3.4.3, July 2026. Updated August 2026 with enriched Zach profile and new personas: Lauren, Charles, Conrad. Updated August 2026 with enrichment from IBM Z & LinuxONE Research Central (Airtable) and IBM Z Research Central PDF source files.

---

## Priority Personas for Atlas

Atlas is positioned as a change orchestration platform for IBM Z. When talking to clients — whether for discovery research, demo feedback, or use case validation — these are the people to ask for.

### Tier 1 — Primary personas (always recruit)

These five personas are the ones who either own the change workflow end-to-end, gate the change at a critical subsystem boundary, or own the topology and blast radius understanding that makes a change safe. Every Atlas use case at GA and H1 2027 involves at least one of them.

| Persona | Role | Why they matter for Atlas |
|---|---|---|
| **Zach** | Senior z/OS Systems Programmer | The hub of every change workflow. Initiates, authorizes, and owns the outcome of every z/OS-level change. Primary actor in patch management, vulnerability remediation, platform upgrades, health assessment, and config drift. If Atlas succeeds, Zach is the person who feels it first. |
| **Stan** | Subsystem SME — CICS, Db2, MQ, or IMS (archetype) | The gatekeeper for middleware changes. Every patch or configuration change touching CICS, Db2, MQ, or IMS requires Stan's review and sign-off before Zach can promote to production. He represents any senior subsystem owner — recruit one per subsystem type when possible. |
| **Angie** | Application Architect | Owns the application-level topology and modernisation strategy. She is the person who needs blast radius analysis before any change that touches her applications — and who initiates application discovery and dependency mapping. Primary actor in application modernisation, discovery, and change readiness. |
| **Kathleen** | Experienced z/OS Application Developer | The developer who actually executes application changes — remediating deprecated APIs, decomposing monolithic structures, managing test cycles. She drives change velocity on the application side and is directly impacted by environment access friction and deployment complexity. More actionable as an interview target than Deb for GA scope. |
| **Sage** | Mid-level Security Administrator | Bridges the security team and the Z platform. She is the person who needs to know the actual blast radius of a security exposure — not Zach's verbal summary — and who owns the certificate and compliance posture that auditors scrutinise. Primary actor in vulnerability response and regulatory change scenarios. |

### Tier 2 — Important but recruit after Tier 1

| Persona | Role | When to recruit |
|---|---|---|
| **Deb** | Early tenure z/OS Application Developer | Recruit when testing Atlas onboarding, "Ask Anything", and developer-facing change guidance. She is the primary beneficiary of Atlas's knowledge democratisation capability but is not the primary driver of the change workflow. |
| **Annette** | IT Operations Engineer (L2) | Recruit for operations-focused scenarios — config drift detection, unauthorized change response, incident triage. She is the first responder when something goes wrong after a change. |
| **Alice** | Mid-level z/OS Systems Programmer | Recruit when testing Atlas's ability to delegate work from senior to mid-level staff. She is the benchmark for how much expert dependency Atlas can remove from routine patch and maintenance cycles. |
| **Quinn** | IT Operations Manager | Recruit for governance and reporting scenarios — SLA management, change audit, executive dashboards. She is the buyer for operational tooling and the audience for Atlas health reports. |

### A note on research conversations

When speaking with clients about Atlas, you will typically find Zach and Stan in the same organisation but different teams. Angie may report to a different business unit entirely from the Z infrastructure team. Kathleen and Deb are usually on Angie's team or a peer application team. Sage sits in the security organisation and may not have a direct reporting relationship to the Z platform team at all.

**The most productive single conversation** is with Zach + Stan together — they represent the two sides of the change orchestration workflow and their friction points (handoff, sign-off, impact scoping) are exactly what Atlas is built to solve. The second most productive pairing is Angie + Kathleen — the architecture-to-execution chain on the application side.

---

## Role Clusters and Use Case Affinity

| Theme | Primary personas |
|---|---|
| **System Intelligence** (understand and explain) | Zach, Alice, Chris, Angie, Greg, Sage, Derek, Conrad |
| **Change Intelligence** (plan, execute, validate) | Kathleen, Deb, Alex, Annette, Lupita, Stan (and subsystem SME archetype) |
| **Both themes** | Zach, Alice, Angie, Stan |
| **Business / buyer** | Lauren |
| **Emerging / AI on Z** | Charles |

---

## Subsystem Specialists

### Stan — Subsystem SME / Senior CICS Systems Programmer (archetype)

| Field | Value |
|---|---|
| **Role** | Senior CICS Systems Programmer (representative of subsystem SME archetype: also applies to Db2, MQ, IMS, and other Z middleware owners) |
| **Experience** | Senior / experienced |
| **Use case themes** | Change Intelligence |

Stan is a senior CICS systems programmer with a long mainframe career — COBOL developer, operations team lead, and now the lead CICS systems programmer at his organization. He owns CICS availability, performance, and operational integrity. He acts as both an advocate and gatekeeper for the platform, helping application teams while keeping the environment stable and controlled.

Stan represents a broader **subsystem SME archetype**: the individual who owns a specific Z middleware subsystem (CICS, Db2, MQ, IMS, or similar) and is responsible for applying patches and maintenance to that subsystem. Where this document refers to Stan, the same persona applies to the Db2 DBA applying a Db2 maintenance level, the MQ administrator applying an MQ fix pack, and the IMS systems programmer applying an IMS PTF batch.

**Primary concerns:** Subsystem availability and performance during and after patches; ensuring patch sequencing does not break CICS regions, Db2 connections, or MQ channels; maintaining control over changes to their subsystem while working within the broader Atlas-orchestrated change workflow.

**Key distinction from Zach:** Zach owns the z/OS base and the overall change workflow. Stan owns a specific subsystem and is the subject-matter expert Atlas consults and coordinates with during middleware patch scenarios. Atlas must surface subsystem-specific impact to Stan, get his sign-off on the plan for his subsystem, and hand back control to Zach for the production promotion decision.

**Source:** [`personas/stan-cicero-persona.md`](personas/stan-cicero-persona.md)

---

## Systems Programming

### Zach — z/OS Systems Programmer (experienced)

| Field | Value |
|---|---|
| **Role** | Senior z/OS Systems Programmer |
| **Experience** | Senior / experienced (25 years) |
| **Use case themes** | System Intelligence, Change Intelligence |

Zach is a senior z/OS subject matter expert with 25 years of experience. He leads a team of three experienced systems programmers and one junior systems programmer. He values security, reliability, availability, and scalability and views z/OS as the foundation of critical enterprise computing.

Zach is planning to retire within 3 to 5 years. His current focus is automation, knowledge transfer, and reducing operational complexity before he leaves. This shapes everything he does in Atlas: he wants tools that encode tribal knowledge, not tools that create more of it.

**Primary concerns:** System stability, security posture, patch currency, configuration integrity, operational risk, succession planning.

**Key pain points:** Excessive false positive alerts; tool fragmentation (switching between ISPF, z/OSMF, OMEGAMON, and others during problem determination); growing cost reduction pressure; insufficient time for optimization; concerns about long-term platform perception.

**Quote:** *"I can look at the panels and look at the assembler code, the JCL code and see what's happening. I can't go to z/OSMF and see what's happening."*

**Source:** [`personas/zach-zos-systems-programmer-persona.md`](personas/zach-zos-systems-programmer-persona.md)

---

### Alice — z/OS Systems Programmer (mid-level)

| Field | Value |
|---|---|
| **Role** | Mid-level z/OS Systems Programmer |
| **Experience** | Mid-tenure |
| **Use case themes** | System Intelligence, Change Intelligence |
| **Validation** | Validated with >5 clients — Bank of America, BMO, SEB, DISA, Ensono, Atruvia, Finanz Informatik, Dataport, American Express, Citibank, Kyndryl, and others (IBM Z Research Central) |

Alice is responsible for running her organization's mainframe IT environment — installing, configuring, and maintaining z/OS systems in both test and production. She came to the mainframe through a college course that sparked genuine curiosity about its reliability and security, and she has grown into the role through hard work and mentorship from senior practitioners like Zach. She is self-motivated and a quick learner, but the environment constantly works against her.

Her biggest recurring frustration is the sheer difficulty of finding answers. When she has a problem, she can spend up to three hours navigating IBM Redbooks, IBM Knowledge Center, and Google before finding what she needs — and sometimes she cannot even find a starting point because she only has partial information to search with. The traditional tooling compounds this: ISPF is powerful but only after years of investment, and z/OSMF is a step forward but still not development-friendly enough for her preferred workflow.

Alice collaborates closely with Zach (who taught her ISPF and whose experience she draws on constantly) and mentors junior developers like Deb, helping them understand the mainframe without becoming a bottleneck.

**Primary pain points:** Steep initial learning curve with almost no on-ramp documentation; difficulty finding authoritative answers quickly across fragmented documentation sources; traditional tooling that rewards deep specialization but punishes new entrants; limited collaborative working environment due to security constraints; uncertainty about how mainframe skills transfer to broader career paths.

**Primary concerns:** Getting things done reliably and safely in test and production; building deep expertise without losing sight of generalist career development; not creating more dependencies on Zach than necessary; keeping documentation current for the team members she is starting to mentor.

**Key skills:** JCL, REXX, CLIST, PL/I, Java, C, troubleshooting, interpersonal communication, independent research.

**Tools:** ISPF, SDSF, SMP/E, DFSMS, z/OSMF, UNIX System Services, Google Search.

**Quote:** *"I learned about the mainframe from one of my college courses, and I was fascinated by the security, reliability, and scalability that mainframe technology can provide."*

---

### Chris — z/OS Systems Programmer (early tenure)

| Field | Value |
|---|---|
| **Role** | z/OS Systems Programmer (early tenure) |
| **Experience** | Early tenure (0–3 years on Z) |
| **Use case themes** | System Intelligence |

Chris is a newly minted systems programmer joining a mainframe team, typically transitioning from a university computer science or IT program with no prior mainframe exposure. He represents the generation of practitioners who must learn z/OS, JCL, and ISPF from scratch while simultaneously supporting a production environment — a combination that creates a steep and often discouraging learning curve.

Chris relies entirely on Zach and Alice for direction and tacit knowledge. He does not yet have the pattern recognition to distinguish a routine alert from a serious problem, and he depends heavily on runbooks, internal wikis, and informal mentoring to fill the gaps. His risk profile is high: without guardrails and clear context, he can make well-intentioned changes that have unintended downstream effects. He represents the platform's succession problem in miniature — the skills gap that will widen as Zach-generation practitioners retire.

**Primary pain points:** No intuitive on-ramp; z/OS documentation is dense and assumes prior knowledge he does not have; tooling (ISPF, SDSF, JCL syntax) has a steep adoption curve with limited visual feedback; reliance on senior colleagues for every non-trivial decision; fear of breaking production; difficulty understanding how components relate to each other across the stack.

**Primary concerns:** Building confidence and competence quickly enough to contribute without being a liability; not asking the same question twice; understanding enough system context to make safe decisions independently; finding a clear path to becoming an Alice-level practitioner.

**Atlas relevance:** Chris is a key beneficiary of Atlas's System Intelligence capability — natural-language "Ask Anything" drastically reduces his time to answer and lowers the threshold for safe independent action. He is also the persona most at risk of causing a configuration problem through incomplete understanding, making Atlas's change guardrails directly relevant.

---

## Application Development

### Kathleen — Application Developer (experienced)

| Field | Value |
|---|---|
| **Role** | Experienced z/OS Application Developer |
| **Experience** | Senior / experienced |
| **Use case themes** | Change Intelligence |
| **Validation** | Z DevOps Advisory Council, September 2024 — Renault, Rabobank, GM, Principal, Garanti, DATEV, FI-TS (IBM Z Research Central) |
| **Status note** | Persona status listed as Inactive in IBM Z Research Central (originally developed for Nazare project). Validated through same Z DevOps Advisory Council sessions as Deb. |

Kathleen is part of the product team who plans, codes, builds, provisions, deploys, and tests their product. As an experienced developer, she can solve complex mainframe issues independently and mentors junior developers on her team. She frequently interacts with System Programmers (Zach, Alice) and Database Administrators to get the infrastructure and environment access she needs — and the time those teams take to respond directly impacts her velocity.

Kathleen wants to deliver on time, try new ideas, and help her application grow. She is capable enough to understand what she needs; her frustration is not lack of skill but lack of access — she cannot get isolated test environments quickly, she has no test automation, and she cannot see application performance metrics without going through the infrastructure team. Deploying to CICS or IMS involves too many manual steps and too many handoffs.

**Primary pain points:** Reliance on Systems Programmers and infrastructure teams to get things done; no isolated or parallel development and testing environments; no ability to quickly spin up and tear down testing sandboxes with supporting components; little or no test automation; no access to application performance metrics; too many deployment steps for CICS and IMS; time spent creating documentation for junior developers instead of building.

**Primary concerns:** Delivering changes on time without breaking production; understanding the blast radius of her changes before they reach integration testing; getting fast environment access without a sysprog ticket; mentoring Deb effectively without becoming a bottleneck herself.

---

### Deb — Application Developer (early tenure)

| Field | Value |
|---|---|
| **Role** | Early tenure z/OS Application Developer |
| **Experience** | Early tenure |
| **Use case themes** | Change Intelligence |
| **Validation** | Multiple Z DevOps Advisory Council sessions, 2024–2025 — Bank of Montreal, FI-TS, Rabobank, Handelsbanken, SEB, CIBC, Bank of America, GM, DATEV, GarantiBBVA, Atruvia, Principal, Renault (IBM Z Research Central) |

Deb is an early-tenure application developer who fixes bugs and adds new functionality to her team's applications. She is part of the product team that plans, codes, builds, provisions, deploys, and tests their product. She collaborates with Zach (and sometimes Kathleen) for provisioning and environment access. To ensure quality, she tests her code before checking it in and seeks every opportunity to increase her domain knowledge — but the tools and processes on Z make this harder than it should be.

Deb's core frustration is speed and autonomy: everything is slow, and getting anything done requires convincing multiple teams that her request is important. She cannot understand the impact of her changes on the broader system, she has no way to quickly spin up a test environment, and she switches between too many disconnected tools. She is aware of how developers work on other platforms and finds the contrast with z/OS deeply frustrating.

**Primary pain points:** Everything is slow and requires multi-team coordination; antiquated tools compared to other platforms; too many tool switches during development; no isolated or parallel test environments; no ability to quickly spin up and tear down sandboxes; little or no test automation; no access to application performance metrics; too many steps to deploy to IMS or CICS; no way to understand the production impact of her changes; difficulty understanding application topology.

**Primary concerns:** Understanding the impact of her changes before they reach production; getting fast feedback on her code without waiting for infrastructure; learning the system context she does not yet have; becoming self-sufficient rather than dependent on Kathleen or Zach for every infrastructure question.

---

## Architecture

### Angie — Application Architect

| Field | Value |
|---|---|
| **Role** | Application Architect |
| **Other titles** | Experienced z/OS Application Developer; SME Application Developer |
| **Experience** | Senior / experienced |
| **Use case themes** | System Intelligence, Change Intelligence |
| **Validation** | Validated with <5 clients — sponsor user interviews; ZDC audience polling on application modernization (IBM Z Research Central, 2022–2025) |

Angie designs applications and solutions for her business that integrate with IBM Z systems using the latest technologies. As Application Architect, she owns the roadmap for her applications — defining architecture, managing dependencies, and aligning development strategy with business unit direction. She spends roughly 25% of her time working with systems programmers and infrastructure teams to get the underlying platform in place, and the rest working with development teams on active projects.

Angie's core tension is the modernization gap: she is expected to innovate and introduce new technology (containerisation, cloud integration, API exposure via z/OS Connect) while simultaneously maintaining millions of lines of existing COBOL, PL/I, and Assembler code that no one fully understands anymore. The application is monolithic — understanding what to change, and what will break when she does, requires manual effort that her team cannot sustain at the pace the business demands.

She also carries a training burden. New developers on her team arrive without mainframe knowledge, and bringing them up to speed on COBOL, CICS, and z/OS application patterns falls largely on Angie and her senior colleagues.

**Primary pain points:** Speed and agility on z/OS development lags behind cloud-native peers; pressure to innovate while maintenance costs grow; justifying mainframe cost to business leadership; complete manual process for identifying business logic encoded across millions of lines of code; inability to respond rapidly to policy changes because her team cannot locate all affected code locations; monolithic application architecture makes impact assessment slow and error-prone; training new developers unfamiliar with mainframe programming concepts and older tooling.

**Primary concerns:** Application topology clarity and dependency mapping; change impact analysis across the full stack before a change reaches production; technical debt visibility; modernisation roadmap credibility with the business; keeping development velocity competitive with cloud-native teams.

**Key skills:** DB2, COBOL, CICS, High-level Assembler, IMS, MQ, PL/I, z/OS Connect, implementation, leadership, team training, business requirements, technology audits, new technology introduction.

**Tools:** z/OS Connect toolkit, 3270 terminal, PowerPoint.

**Collaborators:** Coaches systems programmers (Alice) and developers (Deb and Ella) on new technology; consults application architects and business analysts (Arjun) on business value implications; works with senior leadership (Sagar) on strategic technology direction.

**Quote:** *"I spend 25% of my time dealing with the system programmers and people responsible for installing the software to get the underlying infrastructure in place."*

---

### Greg — Infrastructure Architect

| Field | Value |
|---|---|
| **Role** | Infrastructure Architect |
| **Experience** | Senior / experienced |
| **Use case themes** | System Intelligence |

Greg owns the end-to-end infrastructure architecture for his enterprise — spanning IBM Z, distributed systems, cloud (typically IBM Cloud or a hybrid multi-cloud), and the network fabric that connects them. He is responsible for making sure infrastructure investments are justified, scalable, and aligned with the direction the business is going. He is a strategic peer to Angie (Application Architect) rather than an execution-level practitioner; he sets the standards and frameworks that systems programmers like Zach implement.

Greg is frequently the audience for architecture proposals and capacity plans. When new technology or a significant configuration change is proposed, Greg is the person who needs to understand the rationale, the risk, and the long-term implications before signing off. He is a consumer of Atlas's system-level intelligence in a governance mode: he wants accurate, current topology data and configuration health information to validate that the infrastructure is operating within the parameters he designed.

**Primary pain points:** Fragmented infrastructure visibility across Z, distributed, and cloud environments; difficulty producing a credible single view of the estate for executive or audit purposes; inability to quickly assess the blast radius of a platform-level change; architecture documentation that drifts from production reality within months of being written.

**Primary concerns:** Infrastructure coherence across the hybrid estate; capacity planning accuracy and lead time; ensuring systems programmers' operational changes stay within the architectural boundaries he defines; demonstrating the business value of IBM Z infrastructure investment to Lauren and senior leadership.

**Atlas relevance:** Greg is a primary consumer of Atlas's System Intelligence layer in a strategic and governance capacity. He does not use Atlas day-to-day at the operational level, but relies on it for accurate estate topology, health dashboards, and architecture drift detection that keep his infrastructure model current.

**Collaborators:** Lauren (Line of Business Decision Maker — provides infrastructure framing for business cases); Angie (Application Architect — aligns infrastructure direction with application roadmap); Zach (z/OS Systems Programmer — operational arm of infrastructure decisions).

---

## Performance Engineering

### Alex — Performance Engineer

| Field | Value |
|---|---|
| **Role** | Performance / Application Engineer |
| **Experience** | Mid-level to senior |
| **Use case themes** | Change Intelligence, Predictive Intelligence |

Alex is a performance and application engineer responsible for ensuring IBM Z applications perform correctly under normal and peak load conditions. She sits at the boundary between application behavior and infrastructure configuration — she understands transaction flows and workload patterns but relies on systems programmers like Zach for the z/OS-level parameter changes she recommends.

Alex's primary mode is reactive-turning-proactive: she was hired to fight performance fires, but she wants to get ahead of them. She has learned, painfully, that the only way to avoid a Black Friday incident is to test the configuration months before Black Friday, not the week before. She uses OMEGAMON and SMF data heavily but spends too much time pulling data manually from multiple tools before she can even start diagnosing a problem.

When a performance complaint arrives, Alex's first job is to isolate whether the problem is in the application tier, the database, the infrastructure configuration, or the network — and to do it fast, before the business escalates. That cross-stack diagnosis is where she loses the most time today. Once she has root cause, she needs a validated fix she can hand to Zach with confidence, not a guess.

Her secondary concern is directional performance testing: when a patch, configuration change, or application change is applied, she wants a fast gut-check that confirms it did not cause a regression — not a full production-scale load test, but enough signal to say "this looks safe" or "something changed" before it surfaces in production.

**Primary concerns:** Fast root cause isolation across the application-infrastructure boundary; validated configuration change recommendations; directional performance testing for regression detection; capacity headroom ahead of known peak events; avoiding performance incidents that were predictable.

---

## IT Operations

### Annette — IT Operations Engineer

| Field | Value |
|---|---|
| **Role** | IT Operations Engineer (L2 Operator) |
| **Experience** | Early tenure |
| **Use case themes** | Change Intelligence, Predictive Intelligence |
| **Validation** | Validated with >5 clients — American Express, Kyndryl, Fidelity (IBM Z Research Central, 2024) |

Annette encompasses the group of L2 operators responsible for monitoring mainframe resources. She monitors events and tickets to identify problems impacting users of applications and IT infrastructure. She attempts to resolve problems as fast as possible — doing some problem analysis and fixing herself — but hands difficult problems off to the appropriate Z SME (typically Zach) when the problem is beyond her scope. She uses runbooks, documented procedures, or routes problems to the right person when needed.

Annette is part of the product team that releases and runs their product. She is the first line of response to a configuration drift alert, an unauthorized change notification, or an application slowness escalation. She does not have deep z/OS expertise — she relies on Atlas and SME escalation to interpret what a configuration change means and whether it is a risk.

**Primary pain points:** Alert overload and fatigue from managing a high volume of notifications across fragmented tools; no consolidated view of the mainframe environment; difficulty isolating which subsystem is the root cause of a problem; dependence on Z SME expertise to interpret and remediate; lack of clearly documented or automated remediation procedures; time lost convening war room calls for problems that should be self-serviceable.

**Primary concerns:** Fast problem identification and triage before user impact escalates; knowing when to escalate vs. resolve herself; clear, actionable guidance rather than raw technical data; closing incidents with a complete audit trail so compliance requirements are met.

---

### Quinn — IT Operations Manager

| Field | Value |
|---|---|
| **Role** | IT Operations Manager |
| **Experience** | Senior / experienced |
| **Use case themes** | System Intelligence, Change Intelligence |

Quinn manages the IT operations team — the group that Annette and her L2 operator peers belong to. She is responsible for service availability KPIs, incident response process, on-call scheduling, tooling investment, and the escalation chain between L2 operators and Z SMEs like Zach. She is accountable when an incident breaches SLA and when a war room call runs for three hours instead of thirty minutes.

Quinn does not work the console herself. Her view of the mainframe is through dashboards, SLA reports, incident metrics, and the complaints that escalate to her desk. She is a practitioner-turned-manager: she understands enough about Z operations to push back on vague answers, but she relies on Annette and Zach for technical depth.

Her standing agenda is operational efficiency: reduce MTTR, reduce false positive alert volume, reduce the number of incidents that require SME escalation, and build enough runbook coverage that her team can handle the majority of operational scenarios without a war room call. Every metric she owns is worsened by tool fragmentation and knowledge silos.

**Primary pain points:** No consolidated operational view across the mainframe estate; incident metrics are hard to compile and often lag reality; SME escalation bottleneck (Zach is unavailable or on another incident when Annette needs him); runbook coverage is incomplete and rarely updated; difficult to demonstrate operational improvement to leadership without reliable baseline data.

**Primary concerns:** Mean time to resolution (MTTR) and service availability SLA compliance; building a resilient operations team that is not dependent on one or two expert individuals; cost of operational staffing relative to incident volume; ensuring the operations team is audit-ready at all times; succession planning as experienced Z operators approach retirement.

**Atlas relevance:** Quinn is primarily a buyer and governance persona within Atlas. She funds and approves the operational tooling her team uses, and she is the audience for Atlas's operational health reports and SLA impact summaries. A reduction in Annette's war room call frequency — measurable and attributable — is Quinn's primary Atlas value metric.

---

## Storage Administration

### Karla — Storage Administrator (experienced)

| Field | Value |
|---|---|
| **Role** | Storage Administrator (experienced) |
| **Experience** | Senior / experienced |
| **Use case themes** | System Intelligence, Change Intelligence |

Karla manages DASD (Direct Access Storage Devices), tape libraries, and storage subsystems across the IBM Z estate. She is responsible for storage capacity planning, performance, availability, data migration, and ensuring that storage configurations comply with backup and recovery requirements. In large enterprises she is part of a dedicated storage team; in mid-size organisations she often covers storage alongside related infrastructure responsibilities.

Karla's work sits at the boundary between the storage subsystem and z/OS system programming — she is frequently the first to know when a storage issue is causing application slowness, but translating a storage anomaly into an actionable conversation with Zach or the application team requires manual cross-referencing of DFSMS health data, SMF records, and whatever her DASD management tool exposes.

**Primary pain points:** Capacity planning based on historical trend data that is hard to extract and aggregate; alert fatigue from individual volume or pool thresholds that generate noise without context; difficulty correlating storage events with application performance complaints in real time; change control processes that require storage impact assessments but provide no automated tooling to produce them.

**Primary concerns:** Storage capacity headroom and avoiding allocation failures; data placement compliance (data class, storage class, management class alignment); backup and recovery policy adherence; coordinating storage impact assessment with Zach before z/OS maintenance that affects DFSMS or the I/O subsystem.

**Atlas relevance:** Karla surfaces in Atlas's topology and dependency mapping — understanding which volumes, pools, and storage subsystems are associated with which applications and z/OS LPARs is a prerequisite for accurate change impact assessment. She is also a secondary consumer of Atlas's change workflow when storage configuration changes are part of a broader maintenance event.

---

### Elsa — Storage Administrator (early tenure)

| Field | Value |
|---|---|
| **Role** | Storage Administrator (early tenure) |
| **Experience** | Early tenure |
| **Use case themes** | System Intelligence |

Elsa is early in her storage administration career, typically inheriting a storage environment she did not design and must learn from the inside out. She knows the tooling at a procedural level — she can execute the runbooks Karla has written — but she lacks the pattern recognition to diagnose novel problems or assess the downstream impact of a storage configuration change.

Her primary challenge is the same one that faces all early-tenure Z practitioners: the knowledge required to do the job well is distributed across experienced colleagues, dense documentation, and institutional memory that was never written down. She depends on Karla for escalation and context, and on Atlas for explainability — being able to ask what a configuration setting means or why a particular volume is behaving differently is the difference between a 10-minute resolution and a 90-minute escalation.

**Primary concerns:** Executing operational tasks correctly without inadvertently causing a production issue; building enough context to understand the why behind the procedures she follows; knowing when a problem is within her scope to resolve and when to escalate to Karla or Zach.

**Atlas relevance:** Elsa is a direct beneficiary of Atlas's "Ask Anything" capability — natural-language explanations of storage configuration state, volume health, and policy compliance reduce her dependency on Karla for routine questions and build her expertise over time.

---

## Security and Compliance

### Sage — Security Administrator (mid-level)

| Field | Value |
|---|---|
| **Role** | Mid-level Security Administrator |
| **Experience** | Mid-tenure |
| **Use case themes** | System Intelligence, Change Intelligence |
| **Validation** | IBM Z Research Central; merged from z/OS Security team persona "Frank" (2023) |

Sage is a mid-level security administrator who collaborates with her team to protect systems infrastructure from internal and external security threats. She enforces compliance with all security policies, provides security solutions for data centre systems, instructs and directs other security personnel, and collaborates with CFX teams to manage security activities on the mainframe.

Day-to-day, Sage's primary environment is RACF. She searches RACF to locate relevant certificates, confirms expiration dates, manages access controls and user authorities, and works through hardware and software upgrade plans with security implications in mind. Certificate lifecycle management is a recurring pain: in large mainframe estates, certificates are spread across many applications and subsystems, and there is no unified view — Sage has to hunt across RACF profiles and application-specific keystores to get a complete picture before each audit.

Sage's north star is a clean audit. She is not chasing individual vulnerabilities reactively; she is maintaining a posture that will hold up to scrutiny when an auditor arrives. That means she needs consistency, traceability, and a reliable source of truth for the security state of the system.

**Primary pain points:** Certificate sprawl across multiple RACF profiles and application keystores with no consolidated inventory; manual certificate expiry tracking that relies on calendar reminders and spreadsheets; RACF query complexity that requires deep expertise to navigate efficiently; security configuration changes that happen outside her team's change control and only become visible after the fact; difficulty producing auditor-ready evidence quickly when the audit cycle begins.

**Primary needs:** Security methods that fit into her company's existing security infrastructure; a reliable, auditable experience that passes all company audits; intuitive workflows to navigate security management across users and systems without needing to context-switch across fragmented tools; automated alerts when a certificate is approaching expiry or a security control deviates from policy.

**Primary concerns:** Preventing data breaches and cyber attacks; managing digital certificates cleanly and efficiently across the full mainframe estate; ensuring the mainframe security posture is visible and defensible to auditors and executive leadership; keeping pace with increasingly frequent audit cycles without a proportional increase in team size.

**Tools:** RACF, RACF database unload utilities, z/OSMF Security Administrator tasks, IBM Health Checker for z/OS (security-related checks).

**Collaborators:** Works closely with Conrad (Application Owner — certificate and secrets management), Fred (Security Architect — policy and posture direction), and Derek (Compliance Evidence Provider — audit evidence assembly).

---

### Fred — Security Architect

| Field | Value |
|---|---|
| **Role** | Security Architect |
| **Experience** | Experienced (senior) |
| **Use case themes** | System Intelligence |
| **Validation** | IBM Z Research Central; Advance Security and Encryption Survey; FHE Persona Interviews (Security Architects cohort) |

Fred designs and owns the enterprise's end-to-end security posture. He identifies the hardware, software, configuration, and service processes required to meet or exceed all compliance regulations and protect client data and trust. He manages a solution development team of application developers, data scientists, and ML engineers, and is responsible for PHI/PII data security both on-premises and in the cloud.

Fred is a technically deep practitioner — he works across encryption standards (AES, FHE, Quantum-Safe Cryptography), threat intelligence, machine learning, and compliance. He thinks at architecture scale: he is not chasing individual vulnerabilities but designing the posture that prevents categories of exposure. His primary orientation is data-centric security — protecting data in motion, at rest, and during computation.

On IBM Z, Fred's concern is the end-to-end security architecture of the platform: whether sensitive data is encrypted correctly across all hops, whether authority separation is enforced in production databases, whether security configurations match the declared posture, and whether compliance evidence is accurate and continuously maintained rather than assembled under deadline pressure.

Fred is acutely aware of the emerging cryptographic transition challenge. As Quantum-Safe Cryptography (QSC) standards mature and NIST post-quantum algorithms (ML-KEM, ML-DSA, SLH-DSA) move toward mandate, Fred faces the task of inventorying every cryptographic dependency in his estate — algorithms, key lengths, libraries, certificates, and protocols — and building a migration plan before the deadline arrives. On IBM Z, this is both an advantage (the platform has hardware-accelerated QSC support via CPACF) and a complexity (the number of subsystems, applications, and middleware components that must each be assessed individually is enormous).

**Primary pain points:** Diverse data sets and unstructured data across heterogeneous operating environments; end-to-end encryption in-transit and at-rest insufficient for cross-border data privacy regulations; application rewrite cost, computation overhead, and trusted hardware requirements as technical constraints; managing security risks while sharing sensitive data internally and with cloud/edge partners; key management complexity growing as encryption standards evolve toward QSC; no automated inventory of cryptographic posture across the estate.

**Primary needs:** Ability to encrypt AI/ML models and sensitive data before sharing with multiple ML engines for threat intelligence; proof-of-concept performance benchmarks to build buy-in from security executives; improved Python libraries and documentation for application security development; secure testing environments (Hyper Protect Virtual Servers, Trusted Execution Environment) for zero-trust validation; production-ready encrypted biometric authentication and privacy-preserving search solutions.

**Key skills:** Python, Java, JavaScript, R, SPSS, Node.js, Go, JSON, XML, DB2, Deep Learning, Machine Learning, threat intelligence, compliance engineering.

**Tools:** IBM Watson ML, Apache Spark, Jupyter Notebook, VSCode, Eclipse, Linux (RHEL/Ubuntu), Xcode.

**Quote:** *"Regardless of whether you're using traditional methods of encryption (AES) or FHE, you must manage the keys. Customers are trying to grapple with this issue over the last few years. Fully Homomorphic Encryption and even the Quantum-Safe Cryptography keys are getting bigger. I think key management is something we must figure out for our clients."*

**Quote on approach:** *"I would like to encrypt data using traditional encryption (AES) or Fully Homomorphic Encryption (FHE) and see what the performance difference is — the value there, and what is the ease of use. That would be my approach, and I'm a tinkering type of person."*

---

### Derek — Compliance Evidence Provider

| Field | Value |
|---|---|
| **Role** | Compliance Evidence Provider (also titled Security Engineer in source) |
| **Experience** | Mid-level; 2–5 person security engineering team |
| **Use case themes** | System Intelligence |
| **Source** | IBM Z Research Central (Inactive — last validated 2020–2021); BMO, Danske Bank, Wells Fargo, Deloitte, Fiducia GAD, Finanz Informatik, TD, Barclays; Fall ZDC 2019 — AmEx, Citi, RBC, TD |

Derek is a security engineer embedded in a small compliance team (2–5 people), specializing in RACF for access control to sensitive data — including cardholder data. He takes compliance direction from the CISO (Colin in research). He owns the evidence gathering, documentation, and substantiation work that external auditors require multiple times per year. He uses a homegrown compliance tool.

The compliance burden has grown significantly over his career. His organization used to do compliance reviews every two years at a general level. Now it is multiple times per year, and auditors want substantiated evidence of every control — specific data, not summaries. He estimates 40% of his compliance time is spent just explaining to auditors why IBM Z works differently from distributed environments.

**Primary concerns:** Gathering and assembling compliance documentation efficiently; mapping IBM Z security controls (especially RACF) to regulatory requirements written for distributed environments; demonstrating continuous compliance rather than point-in-time snapshots; getting a "big picture view" that is technology-agnostic enough to show to the CSO and auditors.

**Pain points:**
- Does not always understand how distributed-environment regulatory requirements map to Z capabilities — has to figure it out manually for each audit cycle
- Spends too much time gathering documentation and explaining Z's architecture to auditors who assume a distributed model
- No automated alerting when compliance posture degrades — relies on manual checks

**What Atlas means to Derek:** A system that alerts in real time when compliance is not being adhered to, provides a clear 1-to-1 mapping of security controls to Z capabilities, and automates the data gathering that currently consumes the bulk of his compliance cycle. The "big picture view" he asks for — technology-agnostic, auditor-readable — is what Atlas's System Intelligence layer can provide.

**Key quotes (source research):**
- *"The amount of time spent on compliance has exponentially grown — we used to do it every 2 years and it was quite general. Now it's multiple times a year. Over the last 10 years they want to know the process and provide substantiation and go into the data. It's a deeper dive. We spend 40% of the time just explaining why Z is different."*
- *"If you had something out of the box that alerts when compliance isn't being adhered to, that would be useful."*
- *"We need a 'big picture view' that is technology agnostic (so we can show CSO and auditors)."*

---

### Lupita — Key Management and Cryptography Services

| Field | Value |
|---|---|
| **Role** | Key Management and Cryptography Services |
| **Experience** | Mid-level to senior |
| **Use case themes** | Change Intelligence, System Intelligence |

Lupita is responsible for the lifecycle management of cryptographic keys and the cryptography services infrastructure across the enterprise. On IBM Z, this centres on the IBM Hardware Security Module (HSM) ecosystem — specifically ICSF (Integrated Cryptographic Service Facility) and the CEX (Cryptographic Express) coprocessors — as well as enterprise key management integrations with tools like IBM SKLM, Broadcom CASD, or HashiCorp Vault.

Her role sits at the intersection of operational security and infrastructure change management. Every certificate renewal, every key rotation, and every algorithm upgrade that Conrad or Sage initiates ultimately requires Lupita's involvement to provision, escrow, rotate, or retire the underlying key material. She is the custodian of the cryptographic root of trust for the enterprise.

The expanding mandate around Quantum-Safe Cryptography puts Lupita at the centre of one of the most complex infrastructure migrations her organisation will undertake. She must catalogue every cryptographic dependency — keys, certificates, algorithms, protocols, and the applications and subsystems that rely on them — and sequence a migration to NIST-approved post-quantum algorithms without breaking production services or violating compliance obligations at any point in the transition.

**Primary pain points:** No automated inventory of key and certificate dependencies across the estate — she cannot produce a complete cryptographic bill of materials without manual effort across multiple systems; key rotation processes are largely manual and involve coordination across Sage, Conrad, application teams, and sometimes external CA providers; the upcoming quantum-safe migration requires dependency mapping at a scale no current tooling supports; audit evidence for key lifecycle compliance is difficult to compile and often requires reconstructing audit trails from disparate logs.

**Primary concerns:** Cryptographic key availability and integrity — a key management failure can take down production services; compliance with key lifecycle policies (NIST, PCI-DSS, FIPS 140-3); managing the quantum-safe transition without service disruption; ensuring key escrow and recovery procedures work correctly before they are ever needed; authority separation so that no single individual can access, use, and delete a key without oversight.

**Atlas relevance:** Lupita is directly relevant to UC-13 (Regulatory Change Response) and any Atlas scenario involving certificate or secrets topology. Atlas's ability to map cryptographic dependencies — which keys, certificates, and algorithms are associated with which applications and subsystems — is a foundational capability Lupita needs for both steady-state compliance and the quantum-safe migration programme.

**Collaborators:** Conrad (Application Owner — certificate and secrets lifecycle); Sage (Security Administrator — RACF certificate management); Fred (Security Architect — cryptographic policy and algorithm selection); Zach (z/OS Systems Programmer — ICSF and CEX hardware configuration).

---

## Business and Executive

### Lauren — Line of Business Decision Maker

| Field | Value |
|---|---|
| **Role** | Line of Business Decision Maker / Line of Business Manager |
| **Experience** | Senior / experienced |
| **Use case themes** | Business buyer; indirectly all themes |

Lauren owns and leads a business function — fraud prevention, credit risk assessment, claims processing, or similar. She is accountable for business outcomes, operational performance, KPIs, budgeting, and technology investment decisions. She does not operate Atlas directly; she is the executive who funds it, approves it, and holds IT accountable for results.

**Primary concerns:** ROI and business value, slow implementation cycles, high cost of PoCs and sandboxes, difficulty proving business relevance, fear of being an early adopter. Business leaders buy outcomes, not technology.

**Atlas relevance:** Lauren is a buyer and approver persona. She is the audience for business case artifacts, ROI summaries, and executive-level health and compliance reports that Atlas can generate. She is most relevant for the IBM seller motion and for customer presentations, not for day-to-day Atlas interactions.

**Collaborators:** Greg (Infrastructure Architect), Angie (Application Architect), and IBM Z technical sellers.

**Source:** [`personas/lauren-line-of-business-decision-maker-persona.md`](personas/lauren-line-of-business-decision-maker-persona.md)

---

## AI and Data Engineering

### Charles — AI Engineer

| Field | Value |
|---|---|
| **Role** | AI Engineer |
| **Experience** | Experienced |
| **Use case themes** | Emerging — AI on Z scenarios (future roadmap) |

Charles is an AI engineer on IBM Z who works across the full AI lifecycle: building and deploying models, integrating them into scalable low-latency services on the mainframe, monitoring production performance, and troubleshooting issues. He develops pipelines, runs inference, and optimizes AI systems for reliability, security, latency, and throughput.

**Primary concerns:** Integrating modern ML tools with legacy technology; accessing and extracting large training data volumes; deploying models into mainframe-compatible formats; skill gap between modern ML practices and Z-specific tooling.

**Atlas relevance:** Charles is a future-horizon persona. As Atlas expands toward AI-assisted operations and as AI-on-Z scenarios (MLz, Telum, Spyre) mature, Charles becomes a primary persona for understanding the AI workload topology and dependency landscape on Z. He is not a primary persona for GA Dec 2026 but should be scoped for 2027+ roadmap planning.

**Tools:** MLz, Telum, Spyre, ZDNN, PyTorch, TensorFlow, Triton Inference Server, Jenkins, Docker.

**Source:** [`personas/charles-ai-engineer-persona.md`](personas/charles-ai-engineer-persona.md)

---

## Application and Security Ownership

### Conrad — Application Owner (Certificates and Secrets)

| Field | Value |
|---|---|
| **Role** | Application Owner |
| **Experience** | Experienced |
| **Use case themes** | System Intelligence, Change Intelligence |

Conrad is responsible for the security, reliability, and compliance of enterprise applications, with specific ownership of certificate and secrets management. He coordinates with internal and external certificate authorities, manages credential rotation and access controls, and ensures timely certificate renewal.

**Primary concerns:** Certificate lifecycle complexity across multiple teams and CA sources; credential exposure risk; lack of automated credential rotation; certificates stored in multiple locations with no unified view; renewal process awareness and coordination.

**Atlas relevance:** Conrad sits at the intersection of security compliance and operational change — he is directly relevant to UC-13 (Regulatory Change Response), where cryptographic and certificate compliance mandates require inventory, gap analysis, and remediation. He also surfaces as a persona in any scenario where Atlas needs to map secrets or certificate dependencies in the topology. He works closely with Lupita (Key Management) and Sage (Security Administrator).

**Collaborators in Atlas workflows:** Lupita (Key Management and Cryptography), Sage (Security Administrator), Zach (z/OS Systems Programmer).

**Tools:** IBM RACF, HashiCorp Vault, CyberArk, Azure Key Vault, Broadcom Top Secret.

**Source:** [`personas/conrad-application-owner-persona.md`](personas/conrad-application-owner-persona.md)

---

## Status and Maintenance

All personas now have substantive descriptions. Remaining gaps to revisit as use cases develop:

| Status | Persona | Notes |
|---|---|---|
| ✅ Complete | Zach, Stan, Lauren, Charles, Conrad | Sourced from `personas/` files |
| ✅ Complete | Alice, Chris | Filled August 2026 from IBM Z Research Central + general knowledge |
| ✅ Complete | Angie | Enriched August 2026 from Airtable CSV + PDF source |
| ✅ Complete | Annette, Deb, Kathleen | Strong existing descriptions; validated source data confirmed |
| ✅ Complete | Greg, Quinn | Filled August 2026 from general IT landscape knowledge |
| ✅ Complete | Karla, Elsa | Filled August 2026 from general Z storage administration knowledge |
| ✅ Complete | Sage, Fred, Derek, Lupita | Enriched August 2026 from PDF source files and QSC landscape |
| ⚠️ Thin | Alex | Description present but no validation data; revisit when Performance Testing use case is fully scoped |

**Complete (sourced from personas/ files):** Zach, Stan, Lauren, Charles, Conrad.

Stan's subsystem SME archetype should be extended with Db2, MQ, and IMS-specific variants as the H1 2027 middleware patch scenarios are built out. Charles is a future-horizon persona; his use case affinity should be revisited when AI-on-Z scenarios are scoped for 2027+. Lauren and Conrad do not appear in any existing use case spec as named personas — that should be corrected as UC-13 and the business case artifacts are developed.

To update a persona description, edit this file and update the **Source** date at the top.
