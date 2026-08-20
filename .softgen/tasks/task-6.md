---
title: Custom Pillar Icons and Editable Flow Markers
status: done
priority: high
type: feature
tags: [icons, flow-diagram, editable, markers]
created_by: agent
created_at: 2026-08-20T11:30:00Z
position: 6
---

## Notes
- Custom pillar icons loaded from /pillars/ directory and rendered inside network graph bubbles
- Icons also displayed on use case page pillar badges
- Flow markers are now editable on double-click with inline editing UI

## Checklist
- [x] Copy uploaded pillar icons to public/pillars/
- [x] Load and render pillar icons inside NetworkGraph canvas bubbles
- [x] Skip text labels on pillar nodes (icons replace text)
- [x] Add pillar icon badge to use case detail page header
- [x] Editable FlowDiagram component with add/delete/reword/reassign markers
- [x] Double-click to edit marker inline
- [x] Add Marker button for creating new markers
- [x] Type and stage selectors in edit mode

## Acceptance
- Pillar bubbles show uploaded icons instead of text labels
- Use case pages display pillar icon badge next to the title
- Double-clicking a marker opens inline editor
- Users can add, delete, reword, and reassign markers