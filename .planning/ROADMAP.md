# Roadmap: Kazuha Vibe Portfolio

## Overview

A 6-phase build for a visually distinctive portfolio site — from Next.js 15 scaffold through glassmorphism content, i18n, maple leaf particle effects, and final animations. Each phase delivers a complete, verifiable capability before the next begins.

## Phases

- [ ] **Phase 1: Foundation & Config** - Project scaffold, Tailwind v4 setup, glassmorphism utilities, z-index tokens, centralized site.ts
- [ ] **Phase 2: Theming & Providers** - Dark/light theme system with persistence and no FOUC
- [ ] **Phase 3: Content Sections** - All sections (Hero, Story, Arsenal, Gallery, Values, Social) with glassmorphism layout
- [ ] **Phase 4: i18n (Vietnamese/English)** - Full language support with persistent preference and URL reflection
- [ ] **Phase 5: Particles & Visual Effects** - Maple leaf particle effects with device-aware performance tuning
- [ ] **Phase 6: Animations & Deployment** - Scroll-triggered animations, performance validation, Vercel deployment

## Phase Details

### Phase 1: Foundation & Config
**Goal**: Establish project scaffold, design system, and centralized data architecture that all other phases depend on
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. `npm run build` completes with zero errors
  2. All visible text comes from `site.ts` — zero hardcoded strings in any component
  3. Glassmorphism utility classes (backdrop-blur, transparency, borders) produce visible glass-card effects
  4. Z-index token system defined in CSS — prevents stacking context conflicts between glassmorphism layers
**Plans**: TBD

### Phase 2: Theming & Providers
**Goal**: Dark/light theme system works flawlessly with persistence and zero flash of unstyled content
**Depends on**: Phase 1
**Requirements**: THEME-01, THEME-02, THEME-03, THEME-04
**Success Criteria** (what must be TRUE):
  1. Site loads in dark mode by default on first visit
  2. User can toggle between dark and light themes via navbar control
  3. Theme preference persists across browser sessions
  4. No flash of unstyled content (FOUC) on page load
**Plans**: TBD

### Phase 3: Content Sections
**Goal**: All portfolio content sections render with glassmorphism styling and responsive layout
**Depends on**: Phase 2
**Requirements**: LYOUT-01, LYOUT-02, LYOUT-03, LYOUT-04, LYOUT-05, SECT-01, SECT-02, SECT-03, SECT-04, SECT-05, SECT-06
**Success Criteria** (what must be TRUE):
  1. Fixed navbar displays at top of page with glassmorphism styling and theme toggle + language switcher
  2. All sections visible and populated — Hero, Story, Arsenal, Gallery, Values, Social Links
  3. Content displays cleanly on both desktop (1080p+) and mobile (<768px) viewports
  4. Social links (GitHub, LinkedIn, Email) are clickable and open correctly
**Plans**: TBD

### Phase 4: i18n (Vietnamese/English)
**Goal**: Full Vietnamese/English language support with persistent preference and URL-based locale
**Depends on**: Phase 3
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04
**Success Criteria** (what must be TRUE):
  1. User can switch between Vietnamese and English via navbar language switcher
  2. Language preference persists across browser sessions
  3. All visible text updates to selected language — no hardcoded strings remain
  4. URL reflects current locale (e.g., /en/, /vi/)
**Plans**: TBD

### Phase 5: Particles & Visual Effects
**Goal**: Maple leaf particle effects as the signature visual differentiator with device-aware performance
**Depends on**: Phase 3
**Requirements**: PART-01, PART-02, PART-03, PART-04
**Success Criteria** (what must be TRUE):
  1. Maple leaf particles fall across the screen using leaf images (not default circles)
  2. User can click through the particle layer to interact with content (no pointer-events block)
  3. Fewer particles render on mobile than desktop (device-aware count)
**Plans**: TBD

### Phase 6: Animations & Deployment
**Goal**: Smooth scroll-triggered animations, performance validation, and production deployment to Vercel
**Depends on**: Phase 4, Phase 5
**Requirements**: ANIM-01, ANIM-02, ANIM-03, DEPLOY-01, DEPLOY-02
**Success Criteria** (what must be TRUE):
  1. Sections animate into view with scroll-triggered entrance effects
  2. Animations maintain 60fps on mobile devices
  3. `npm run build` completes with zero errors (production build passes)
  4. Site deploys to Vercel from main branch
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Config | 0/TBD | Not started | - |
| 2. Theming & Providers | 0/TBD | Not started | - |
| 3. Content Sections | 0/TBD | Not started | - |
| 4. i18n (Vietnamese/English) | 0/TBD | Not started | - |
| 5. Particles & Visual Effects | 0/TBD | Not started | - |
| 6. Animations & Deployment | 0/TBD | Not started | - |
