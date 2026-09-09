---
title: Sync use case pains and wows with tables
status: in_progress
priority: high
type: feature
tags: [use-cases, data, export]
created_by: agent
created_at: 2026-09-09T12:05:00Z
position: 11
---
## Notes
The 12 detailed use cases (e.g. UC-01-audit-and-compliance, UC-06-patch-management, etc.) each have tables of pain points and wows per persona in the markdown assets under `public/`. The interactive tool and the HTML export currently only reflect a subset of these markers (e.g. in UC-06 patch management, only Zach’s pain points and wows are represented; other personas’ rows from the tables are missing).

The goal is:
- For all 12 use cases, ensure that every pain point and wow from the corresponding tables is represented in the underlying data used by the tool (`useCaseDetails` / diagrams in `productData.ts`).
- Confirm that the HTML export path (both client-side export in `src/pages/usecase/[id].tsx` and the server-side `src/pages/api/export-html.ts` if it re-renders flows) renders all those markers, grouped by persona and with correct types (pain, time, skill, gain).
- Preserve existing visual semantics (marker colors, icons, Tier 1 persona highlighting, Atlas AI robot icon for “Atlas AI & Automation” wows).

## Checklist
- [ ] Inspect `src/data/productData.ts` to understand how `useCaseDetails` and diagram markers (as-is/to-be) are modeled per use case and persona.
- [ ] Inspect `src/components/FlowDiagram.tsx` to confirm how markers are consumed and rendered in the tool UI (types, personas, stages).
- [ ] Inspect the structured use case source data (e.g. `public/UC-*-*.md`, `public/*-units.md`, `scripts/usecase-output.txt`, or `src/data/unitConsumption.ts`) to locate the canonical tables of pain points and wows for each of the 12 use cases.
- [ ] For UC-06 Patch Management, map every table row (for all personas) to corresponding markers in `useCaseDetails` (asIs/toBe) so the tool shows all pains and wows, not just Zach’s.
- [ ] Verify UC-06 Patch Management in the UI and the HTML export (client-side `exportAsHTML`) now show all persona-specific pain points and wows from the tables.
- [ ] Repeat the mapping for the remaining 11 use cases, ensuring all table-defined pain points and wows are represented in `useCaseDetails`.
- [ ] Confirm that marker types (pain, time, skill, gain) and persona names are consistent between source tables, `productData`, the tool UI, and both HTML export paths.
- [ ] Run `check_for_errors` and do a manual spot-check by exporting at least 2–3 different use cases to validate completeness.

## Acceptance
- All 12 use cases in the tool show every pain point and wow listed in their respective source tables, across all personas.
- The HTML export for those use cases displays the same complete set of pains and wows, grouped by persona and stage, with correct marker types and icons.
- No TypeScript or build errors related to product data, use case pages, or export logic.