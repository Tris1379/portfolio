---
phase: 01-foundation-config
plan: 2
subsystem: config
tags: [nextjs, typescript, site-config, theming, next-themes, next/font]

# Dependency graph
requires:
  - phase: 01-foundation-config
    provides: Next.js 15 scaffold, Tailwind v4 design system, glassmorphism utilities, z-index tokens
provides:
  - Centralized typed site.ts config with all content sections
  - Root layout with font loading (Playfair Display + Inter)
  - Providers client component shell with ThemeProvider
  - Home page consuming siteConfig (zero hardcoded strings)
affects: Phase 2 (Theming), Phase 3 (Content Sections), Phase 4 (i18n), Phase 5 (Particles)

# Tech tracking
tech-stack:
  added: [next-themes]
  patterns: [centralized-config, client-component-shell, next-font-variable]
key-files:
  created:
    - src/config/site.ts
    - src/components/Providers.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Site content centralized in site.ts with typed interfaces — components never hardcode strings"
  - "Providers.tsx uses 'use client' shell pattern to keep layout.tsx as Server Component"
  - "Font CSS variables (--font-body, --font-display) applied via className on html element"

patterns-established:
  - "Pattern: Client component composition shell — thin Providers.tsx wraps all context providers, keeping layout.tsx server-side"
  - "Pattern: Centralized config with type safety — SiteConfig interface + siteConfig constant, all text imported by server components"

requirements-completed: [FOUND-02]

# Metrics
duration: 4min
completed: 2026-03-22
---

# Phase 1 Plan 2: Centralized Site Config & Root Layout Summary

**Centralized typed site.ts config with SiteConfig interface, Providers client component shell wrapping ThemeProvider, root layout loading Playfair Display + Inter fonts, and home page consuming siteConfig with zero hardcoded strings**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-22T12:05:00Z
- **Completed:** 2026-03-22T12:09:00Z
- **Tasks:** 2
- **Files modified:** 5 (2 created, 3 modified)

## Accomplishments
- Created `src/config/site.ts` with full typed interfaces (SiteConfig, SocialLink, StorySection, ArsenalSection, GallerySection, ValuesSection, ParticlesConfig) and placeholder content for all sections
- Created `src/components/Providers.tsx` — "use client" shell composing ThemeProvider with dark mode default
- Updated `src/app/layout.tsx` — loads Inter and Playfair Display via next/font/google, wraps children in Providers
- Updated `src/app/page.tsx` — imports siteConfig, renders name/title/bio with zero hardcoded strings
- Production build passes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create centralized site.ts config with typed interfaces** - `99c2895` (feat)
2. **Task 2: Update root layout with fonts and Providers shell** - `896c305` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified
- `src/config/site.ts` — Centralized site configuration with 7 typed interfaces and siteConfig constant
- `src/components/Providers.tsx` — Client component shell wrapping ThemeProvider
- `src/app/layout.tsx` — Root layout with font loading, Providers wrapping, suppressHydrationWarning
- `src/app/page.tsx` — Home page importing siteConfig, zero hardcoded text
- `package.json` — Added next-themes dependency

## Decisions Made
- Site content centralized in site.ts with typed interfaces — components never hardcode strings
- Providers.tsx uses "use client" shell pattern to keep layout.tsx as Server Component
- Font CSS variables (--font-body, --font-display) applied via className on html element

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed missing next-themes dependency**
- **Found during:** Task 2 (Update root layout with fonts and Providers shell)
- **Issue:** Providers.tsx imports ThemeProvider from "next-themes" but the package was not installed
- **Fix:** Ran `npm install next-themes`
- **Files modified:** package.json, package-lock.json
- **Verification:** Import succeeds, build passes
- **Committed in:** 896c305 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor — only missing dependency install. No code changes needed.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Site config and root layout are complete — Phase 2 (Theming & Providers) can begin
- Providers.tsx already has ThemeProvider wired up — Phase 2 theming features build on this
- site.ts is the single source of truth — all future content sections import from it

## Self-Check: PASSED

---
*Phase: 01-foundation-config*
*Completed: 2026-03-22*
