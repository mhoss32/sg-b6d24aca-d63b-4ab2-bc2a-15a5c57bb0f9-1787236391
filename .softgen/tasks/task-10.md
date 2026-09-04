---
title: Rebuild All Use Cases from New Markdown Files
status: done
priority: urgent
type: feature
tags: [use-cases, data-model, rebuild]
created_by: agent
created_at: 2026-09-04T13:00:00Z
position: 10
---

## Notes
Rebuild all use cases from the 12 new markdown files (UC-01 through UC-12). Old UC-01 and UC-05 are removed. Mapping:
- New UC-01 = Audit & Compliance (old UC-03)
- New UC-02 = Staff Onboarding (old UC-04)
- New UC-03 = Regulatory Change Response (old UC-13)
- New UC-04 = Change Readiness (old UC-06)
- New UC-05 = Change Governance (old UC-14)
- New UC-06 = Patch Management (old UC-02)
- New UC-07 = App Change Management (old UC-07)
- New UC-08 = Platform Upgrade (old UC-08)
- New UC-09 = App Modernization (old UC-12)
- New UC-10 = Environment Parity (old UC-09)
- New UC-11 = DR Validation (old UC-10)
- New UC-12 = Capacity Planning (old UC-11)

Must extract: stages, pain points, wows, external integrations, personas, capabilities.
Update: productData.ts, productNodes, useCaseDetails, persona pages, HTML export.
Do NOT reference old documents.

## Checklist
- [x] Read all 12 new markdown files
- [x] Extract data for each use case
- [x] Rebuild useCaseDetails with 12 entries
- [x] Update productNodes for 12 use cases
- [x] Verify external integrations (Bob PPZ, Concert4Z, Terraform)
- [x] Update unitConsumption.ts if needed
- [x] Verify persona pages reflect new use cases
- [x] Update HTML export for new use cases
- [x] Build check passes

## Acceptance
- All 12 use case pages display correctly
- Main navigation shows 12 use cases only
- No references to old UC-01 or UC-05
- External integrations and consumption data populated