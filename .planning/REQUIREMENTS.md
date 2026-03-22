# Requirements: Kazuha Vibe Portfolio

**Defined:** 2026-03-22
**Core Value:** Deliver a polished, technically impressive portfolio that demonstrates frontend engineering competence while authentically representing the owner's professional identity in Information Security.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Project initializes with Next.js 15 App Router, Tailwind CSS v4, TypeScript
- [ ] **FOUND-02**: Centralized `site.ts` config drives all content — zero hardcoded text in components
- [ ] **FOUND-03**: Glassmorphism utility classes defined in globals.css (backdrop-blur, transparency, borders)
- [ ] **FOUND-04**: Z-index token system defined to prevent glassmorphism stacking context traps

### Theming

- [ ] **THEME-01**: Dark mode is default theme on first visit
- [ ] **THEME-02**: User can toggle between dark and light themes
- [ ] **THEME-03**: Theme persists across browser sessions (localStorage)
- [ ] **THEME-04**: No flash of unstyled content (FOUC) on page load

### Layout

- [ ] **LYOUT-01**: Fixed navbar with glassmorphism styling, positioned above all content
- [ ] **LYOUT-02**: Navbar includes theme toggle and language switcher
- [ ] **LYOUT-03**: Card-based layout with soft rounded corners on all content sections
- [ ] **LYOUT-04**: Responsive design — displays cleanly on both PC and mobile
- [ ] **LYOUT-05**: Content centered on screen with appropriate max-width

### Sections

- [ ] **SECT-01**: Hero section displays name, title, and one-liner bio
- [ ] **SECT-02**: Story section presents personal narrative and background
- [ ] **SECT-03**: Arsenal section displays categorized skills in card grid
- [ ] **SECT-04**: Gallery section showcases projects with descriptions
- [ ] **SECT-05**: Values section presents personal/professional values
- [ ] **SECT-06**: Social links section with GitHub, LinkedIn, and Email

### Particles

- [ ] **PART-01**: tsParticles maple leaf falling effect renders on page
- [ ] **PART-02**: Maple leaf images used as particle shapes (not default circles)
- [ ] **PART-03**: Particle count auto-adjusts based on device (fewer on mobile)
- [ ] **PART-04**: Particle canvas does not block click events on content

### i18n

- [ ] **I18N-01**: Site supports Vietnamese and English languages
- [ ] **I18N-02**: User can switch language via navbar control
- [ ] **I18N-03**: Language preference persists across sessions
- [ ] **I18N-04**: URL reflects current locale (e.g., `/en/`, `/vi/`)

### Animations

- [ ] **ANIM-01**: Smooth scroll-triggered entrance animations on sections
- [ ] **ANIM-02**: Animations run at 60fps on mobile devices
- [ ] **ANIM-03**: Only transform and opacity animated (no layout properties)

### Deployment

- [ ] **DEPLOY-01**: `npm run build` completes with zero errors
- [ ] **DEPLOY-02**: Project deploys to Vercel from main branch

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhancements

- **PERF-01**: Performance metrics badge displayed on site
- **PERF-02**: Live visitor count display

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Blog | Scope creep, needs ongoing content creation |
| Contact Form | Adds backend complexity, violates static-only constraint |
| Testimonials | Premature for personal portfolio without client history |
| Auto-playing audio | Anti-UX, annoys recruiters |
| Chatbot | Over-engineering for a portfolio |
| "Coming Soon" sections | Signals incomplete work |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| THEME-01 | Phase 2 | Pending |
| THEME-02 | Phase 2 | Pending |
| THEME-03 | Phase 2 | Pending |
| THEME-04 | Phase 2 | Pending |
| LYOUT-01 | Phase 3 | Pending |
| LYOUT-02 | Phase 3 | Pending |
| LYOUT-03 | Phase 3 | Pending |
| LYOUT-04 | Phase 3 | Pending |
| LYOUT-05 | Phase 3 | Pending |
| SECT-01 | Phase 3 | Pending |
| SECT-02 | Phase 3 | Pending |
| SECT-03 | Phase 3 | Pending |
| SECT-04 | Phase 3 | Pending |
| SECT-05 | Phase 3 | Pending |
| SECT-06 | Phase 3 | Pending |
| I18N-01 | Phase 4 | Pending |
| I18N-02 | Phase 4 | Pending |
| I18N-03 | Phase 4 | Pending |
| I18N-04 | Phase 4 | Pending |
| PART-01 | Phase 5 | Pending |
| PART-02 | Phase 5 | Pending |
| PART-03 | Phase 5 | Pending |
| PART-04 | Phase 5 | Pending |
| ANIM-01 | Phase 6 | Pending |
| ANIM-02 | Phase 6 | Pending |
| ANIM-03 | Phase 6 | Pending |
| DEPLOY-01 | Phase 6 | Pending |
| DEPLOY-02 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 32 total
- Mapped to phases: 32
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-22*
*Last updated: 2026-03-22 after initial definition*
