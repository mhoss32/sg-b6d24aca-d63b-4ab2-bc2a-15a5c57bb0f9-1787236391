# UC-12: Application Modernization — Concert for Z Touchpoints

> **Source use case:** UC-12 Application Modernization
> **Reference:** [Atlas–Concert for Z Positioning Analysis](https://github.ibm.com/IBMZAtlas/architecture-and-strategy/blob/main/product-strategy/packaging/positioning/Concert4Z/atlas-concert4z-positioning.md)

---

## Summary

Application modernization is a pre-production workflow led entirely by Atlas and Bob PPZ. Concert for Z contributes meaningfully through ZEN runtime data (which enriches the modernization analysis and helps distinguish active from dormant code paths) and through its production incident history (which provides real-world risk context for modernization prioritization). Post-modernization, Atlas's phase evidence feeds Concert for Z's production monitoring of the modernized applications.

---

## Tier 1 — Explicit Handoff Points

None. Application modernization is initiated by Angie (Enterprise Architect) and executed by developers, with Atlas providing orchestration and Bob PPZ providing code-level execution. Concert for Z does not trigger modernization workflows and does not receive an explicit handoff during the pre-production phases.

---

## Tier 2 — Enrichment Touchpoints

### Step 1 — Analyze

**How Concert for Z enriches this step:**
Atlas produces the complete application structure, technical debt profile, and dependency map — using ZUnderstand static analysis and, when available, ZEN runtime call chain data. ZEN from Concert for Z's ZOC infrastructure provides the runtime-observed execution evidence that makes the modernization analysis more precise:

- **Active vs. dormant code paths:** ZEN identifies which programs in the modernization scope are actually called at runtime under current production load. Programs that appear in the static call graph but have never been observed in ZEN data may represent dead code — safe to remove rather than modernize, which simplifies the modernization scope.
- **Execution frequency:** ZEN shows how often each program is called, enabling Atlas to identify high-frequency programs that carry higher modernization risk (more users affected if something breaks) and low-frequency programs that can be modernized with lower risk.
- **Cross-application runtime dependencies:** ZEN traces cross-application calls that static analysis may miss — particularly relevant for shared CICS programs that serve multiple applications.

The positioning document explicitly states Atlas uses ZEN for "application discovery by adding runtime-observed flows as a complementary discovery method alongside Z Understand static analysis."

### Step 2 — Plan

**How Concert for Z enriches this step:**
Concert for Z's production incident history for the applications in the modernization scope provides real-world risk context for modernization prioritization. Applications that have caused or contributed to recent Concert for Z-detected production incidents are a higher modernization priority — their instability is confirmed by production evidence, not just technical debt assessment. This incident-informed prioritization makes the Atlas-generated modernization plan more credible to business stakeholders who ask "why are we starting with this application?"

### Step 5 — Promote

**How Concert for Z enriches this step:**
Atlas orchestrates phase promotion and checks architectural conformance. After promotion, Concert for Z's monitoring of the modernized application in production provides the behavioral baseline comparison that confirms the phase worked as intended — response times, resource consumption, transaction throughput — against the pre-modernization baseline Concert for Z recorded. If a modernization phase inadvertently degrades production behavior, Concert for Z surfaces it, and Atlas's change record provides the attribution context for the Concert for Z incident investigation.

---

> **Overall Concert for Z relevance for this use case:** Moderate for enrichment. ZEN runtime data from Concert for Z materially improves the quality of Atlas's modernization analysis by distinguishing active from dormant code paths. Concert for Z's production incident history enriches prioritization. No explicit handoff, but the ZEN data relationship is substantive for large, complex application estates where runtime behavior differs materially from static configuration.
