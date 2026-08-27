---
title: Atlas Token/Unit Consumption Estimates for UC-01
status: in_progress
priority: high
type: feature
tags: [uc-01, units, token-consumption]
created_by: agent
created_at: 2026-08-27T14:34:00Z
position: 8
---

## Notes
Add a toggle checkbox under External Integrations in the desired outcome panel. When enabled, show per-step unit consumption tables with Activity/Tokens/Units columns, step subtotals, and bottom-of-panel summary tables (Full Flow Summary + Sensitivity Analysis) from UC-01-vulnerability-remediation-units.md. All unit boxes should be dark green with a coin icon.

## Checklist
- [ ] Create src/data/unitConsumption.ts with parsed UC-01 unit data
- [ ] Add state toggle for "Show Atlas token/unit consumption estimates"
- [ ] Render per-step unit consumption box when toggle is on
- [ ] Show step subtotal above each step's table
- [ ] Show total estimated units at bottom of desired outcome panel
- [ ] Show Full Flow Summary table at bottom
- [ ] Show Sensitivity Analysis table at bottom
- [ ] Style all unit boxes dark green with coin icon
- [ ] Export the unit boxes to the HTML export

## Acceptance
- Checkbox appears under External Integrations in To-Be flow
- Toggling on shows green unit boxes in each step with correct data
- Bottom summary shows total, full flow summary, and sensitivity analysis
- All boxes have dark green background and coin icon