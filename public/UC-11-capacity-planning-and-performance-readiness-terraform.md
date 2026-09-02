# UC-11: Capacity Planning and Performance Readiness — Terraform Self-Managed for Z Touchpoints

> **Source use case:** UC-11 Capacity Planning and Performance Readiness
> **Reference:** [Atlas + Terraform Self-Managed for Z Synergy Use Cases](../atlas-terraform-synergy-use-cases.html)

---

## Summary

Capacity planning and performance readiness has a narrow but precise Terraform touchpoint. None of the six Terraform synergy use cases address capacity planning directly, but Synergy Use Case 2 — On-Demand Test Environment Provisioning with Infrastructure Parity — is relevant: when Atlas generates a directional performance test and needs to execute it in a production-equivalent environment, Terraform provisions the performance test infrastructure. The critical distinction for performance testing is that infrastructure fidelity matters more than for functional testing — a performance test run against an under-resourced test environment produces misleading results. Terraform's ability to provision an infrastructure-accurate environment from the production workspace declaration makes the performance test results defensible.

---

## Tier 1 — Explicit Handoff Points

*Steps in the To-Be flow where Atlas directs the user to Terraform, or where Terraform initiates a workflow that hands off to Atlas.*

### Step 5 — Provision Performance Test Environment

**What Atlas has produced at this point:**
Atlas has generated the directional performance test asset — workload definition, baseline and post-change measurements, comparison thresholds, and result criteria. To execute the performance test validly, the test environment must match production infrastructure precisely: the same CPU entitlement, the same memory allocation, the same storage performance tier, the same network topology.

**What Atlas directs:**
Atlas passes the performance test environment specification to Terraform, requesting a test environment provisioned from the same HCL declaration as the production workspace. The infrastructure parity is enforced by Terraform — not approximated by manual configuration.

**What comes back to Atlas:**
A Terraform-provisioned performance test environment with production-equivalent infrastructure. Atlas deploys the application stack and executes the directional performance test against it. The results are valid as a production proxy because the infrastructure is an exact declaration match.

---

## Tier 2 — Enrichment Touchpoints

*Steps where Terraform passively enriches Atlas outputs without an explicit user handoff.*

### Step 2 — Baseline Analysis

**How Terraform enriches this step:**
When Atlas collects the performance baseline, Terraform's state file provides the current infrastructure resource allocations for the LPARs in scope — CPU entitlement, memory, storage configuration. This infrastructure-layer baseline data complements Atlas's software-layer performance metrics (MSU utilisation, transaction throughput, buffer pool utilisation). Knowing that a CICS region is running on an LPAR with 80% of its allocated memory already committed is relevant context for interpreting performance metrics.

### Step 3 — Capacity Assessment

**How Terraform enriches this step:**
Atlas's capacity assessment identifies whether current capacity headroom is sufficient for the projected workload change. Terraform contributes the infrastructure layer of this assessment: what resource changes are available within the Terraform-managed LPAR specification, what the maximum declared resources are, and what the lead time would be for Terraform to apply an infrastructure resource increase if one is recommended. This enriches Atlas's capacity recommendation with infrastructure feasibility context.

### Step 8 — Recommend

**How Terraform enriches this step:**
When Atlas generates capacity and configuration recommendations, recommendations that involve infrastructure resource changes (CPU increases, memory expansion, storage additions) can be expressed as Terraform HCL change proposals. This makes the recommendation immediately actionable via the established Terraform change governance workflow — rather than requiring manual HMC configuration, the infrastructure resource change can be reviewed, approved, and applied through the Terraform plan-approve-apply process.

---

> **Overall Terraform Self-Managed for Z relevance for this use case:** Moderate. The performance test environment provisioning integration (Tier 1) is the most operationally significant touchpoint — infrastructure-accurate performance test environments are a meaningful quality improvement over manually configured approximations. The enrichment touchpoints add infrastructure context to capacity analysis and make infrastructure capacity recommendations actionable through the Terraform workflow. Capacity planning and performance readiness is not a primary Terraform synergy scenario, but the touchpoints are genuine and improve the quality of the performance testing output.
