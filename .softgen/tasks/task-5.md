---
title: Persona Detail Pages with Use Case Tiles
status: done
priority: high
type: feature
tags: [persona, detail-page, tiles]
created_by: agent
created_at: 2026-08-20T10:25:00Z
position: 5
---

## Notes
Persona detail pages show full persona profiles from personas.md with explorable use case tiles split by Primary/Secondary engagement.

## Checklist
- [x] PersonaData model with 18 personas from personas.md
- [x] getPersonaUseCases helper to find use cases by engagement
- [x] Persona detail page at /persona/[name] with overview, quote, pain points, concerns
- [x] Primary use case tiles with cyan accent
- [x] Secondary use case tiles with purple accent
- [x] Each tile links to use case detail page
- [x] Persona cards on use case pages link to persona profiles

## Acceptance
- Clicking a persona from any use case navigates to their profile
- Profile shows summary, role, experience, concerns, pain points, and quote
- Use cases are split into Primary and Secondary sections
- Each use case tile links back to the use case page
