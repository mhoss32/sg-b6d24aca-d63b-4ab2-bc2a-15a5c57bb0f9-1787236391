---
title: Comprehensive Site HTML Export
status: in_progress
priority: high
type: feature
tags: [export, html, home-page]
created_by: agent
created_at: 2026-08-27T09:08:33Z
position: 7
---
## Notes
Add an HTML export button to the home page that exports the entire site — home page with hierarchy and all 14 use case pages — into a single navigable HTML file (or zip). Must retain all formatting, accordions, expandable sections, external integrations toggles, and modal functionality.

## Checklist
- [ ] Extract existing exportAsHTML from usecase/[id].tsx into a shared utility
- [ ] Add Export HTML button to home page header
- [ ] Build comprehensive export function generating a complete site with:
  - Static home page with hierarchy listing
  - All 14 use case pages with full content
  - Navigation between home and use cases
  - All styling, accordions, toggles, modals
- [ ] Verify export works and check for errors

## Acceptance
- User can click Export HTML on home page
- Exported file contains home page and all use cases
- All interactive features work in exported HTML
- Styling matches the original app