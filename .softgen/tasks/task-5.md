<![CDATA[
---
title: Persona Detail Pages with Use Case Tiles
status: in_progress
priority: high
type: feature
tags: [persona, page, tiles]
created_by: agent
created_at: 2026-08-20T10:15:00Z
position: 5
---

## Notes
When a user clicks a persona on a use case detail page, they should see a persona overview page with:
- Persona summary from personas.md
- Role, experience, primary concerns
- Explorable tiles for use cases, split by Primary vs Secondary engagement
- Brief role summary within each use case

## Checklist
- [ ] Extract persona data from personas.md into the data model
- [ ] Create persona use case engagement mapping (Primary/Secondary per use case)
- [ ] Create `/persona/[name].tsx` page with overview and tiles
- [ ] Update `PersonaCard` to link to persona detail pages
- [ ] Update use case detail page persona cards to link to persona pages
- [ ] Style persona page consistently with dark theme

## Acceptance
- Clicking a persona on a use case page navigates to their detail page
- Persona page shows their summary and all associated use cases
- Use cases are split into Primary and Secondary sections
- Each use case tile links back to the use case page
