---
title: Atlas Token/Unit Consumption Estimates for UC-01
status: done
priority: high
type: feature
tags: [unit-consumption, token-estimates, export-html]
created_by: agent
created_at: 2026-08-27T15:00:00Z
position: 8
---
## Notes
Token/unit consumption feature expanded from UC-01 to all 14 use cases (UC-01 through UC-14). Data extracted from .md files. UI includes toggle, estate size multipliers, additional adjustments, per-step tables with provisioned environment highlighting, and full flow summary. All replicated in HTML export with interactive JavaScript.

## Checklist
- [x] Create unit consumption data module (src/data/unitConsumption.ts)
- [x] Add UC-01 data from .md file
- [x] Add UC-02 through UC-14 data from .md files
- [x] Add toggle checkbox in FlowDiagram
- [x] Add estate size multiplier table with radio buttons
- [x] Add additional adjustments table with checkboxes
- [x] Add per-step unit consumption tables
- [x] Add full flow summary table
- [x] Highlight provisioned environment activities in light blue
- [x] Replicate all features in exported HTML (src/pages/api/export-html.ts)
- [x] Add JavaScript interactivity for estate/adjustment calculations in HTML export
- [x] Fix persona dropdown labels (pain point / WOW)
- [x] Colour external integrations box blue
- [x] Add coin icon next to toggle title
- [x] Change handoff boxes to dark blue

## Acceptance
- Toggle shows unit estimates for all use cases
- Estate size multipliers apply correctly
- Additional adjustments add/subtract from total
- Full flow summary displays at bottom
- HTML export mirrors app functionality