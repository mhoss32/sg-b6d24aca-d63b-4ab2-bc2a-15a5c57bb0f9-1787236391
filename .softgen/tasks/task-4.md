---
title: Use Case Detail Page with Personas & Flow Diagrams
status: in_progress
priority: high
type: feature
tags: [use-case, personas, flow-diagram, page]
created_by: agent
created_at: 2026-08-20T09:22:48Z
position: 4
---

## Notes
When a user clicks a use case bubble, navigate to a detail page showing:
1. Use case as top-level header (like Atlas in main view)
2. Associated personas with icons, names, roles, engagement types
3. "As Is" flow diagram — current state stages with pain markers
4. "To Be" flow diagram — desired outcome stages with gain markers

## Checklist
- [ ] Update productData.ts with personas and flow data for UC-01
- [ ] Create use case detail page at `/usecase/[id].tsx`
- [ ] Create PersonaList component with icons
- [ ] Create FlowDiagram component for As-Is and To-Be flows
- [ ] Update NetworkGraph to navigate to detail page on use case click
- [ ] Style with dark theme and glow effects

## Acceptance
- Clicking a use case bubble navigates to its detail page
- Personas display with name, role, and engagement type
- As-Is flow shows stages with pain point markers
- To-Be flow shows stages with gain markers
- Page is styled consistently with the dark network graph theme