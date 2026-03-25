---
phase: quick
plan: 260325-uf1
subsystem: forced-connection
tags: [interaction, animation, i18n, particles, ux]
dependency_graph:
  requires: [PageContext.navigateTo, tsParticles engine, framer-motion]
  provides: [ForcedConnection component, forcedConnection config]
  affects: [JourneySection, site.ts, i18n.ts, globals.css]
tech_stack:
  added: []
  patterns: [framer-motion AnimatePresence, tsParticles emitters, CSS keyframe animations, absolute-position dodging]
key_files:
  created:
    - src/components/ForcedConnection.tsx
  modified:
    - src/config/site.ts
    - src/config/i18n.ts
    - src/components/JourneySection.tsx
    - src/app/globals.css
decisions: []
metrics:
  duration: ~3 min
  completed: "2026-03-25T14:57:30Z"
  tasks_completed: 3
  commits: 3
  files_changed: 4
---

# Quick Task 260325-uf1: Forced Connection Interaction Summary

Playful Kazuha-themed question screen at end of Journey section with dodging No button, wind trail particles, and golden leaf shower celebration.

## One-Liner

Interactive "Would you like to journey with me?" screen where the No button dodges the cursor like a leaf in the wind, Yes appears under the pointer with wind trail particles, and clicking Yes triggers a golden tsParticles shower before navigating to the Companion page.

## What Was Built

### 1. Config & i18n (`site.ts`, `i18n.ts`)
- Added `ForcedConnectionSection` interface with `question`, `yesLabel`, `noLabel`, `nextLabel` (en/vi)
- Added `forcedConnection` to `SiteConfig.sections` type and data
- Wired `forcedConnection` in `getConfig()` for locale resolution

### 2. ForcedConnection Component (`ForcedConnection.tsx`)
- **3-stage state machine:** `"idle"` → `"question"` → `"celebrating"`
- **Idle stage:** Centered glass button with Leaf icon + soft green glow animation (`leafGlow` keyframe), spinning leaf
- **Question stage:** Serif font question text, Yes/No buttons in a relative container
  - **No button dodging:** `onMouseEnter` teleports No to random position (10-90% bounds), Yes moves to center
  - **Wind trail:** 6 Leaf icon particles animate outward from swap origin via framer-motion
  - Positioning: percentage-based `left`/`top` with CSS transitions for smooth teleport
- **Celebrating stage:** Golden leaf shower via tsParticles emitters (gold/orange tinted leaves burst from top)
  - Auto-navigates to `"companion"` via `usePage().navigateTo` after 1.5s

### 3. Integration (`JourneySection.tsx`)
- Imported `ForcedConnection` and rendered after lessons section
- Passes `locale` prop for i18n-aware text

### 4. CSS (`globals.css`)
- Added `--z-forced-connection: 30` z-index token (between cards 20 and transition-particles 40)
- Added `@keyframes leafGlow` — pulsing green glow box-shadow on Next button
- Added `@keyframes windTrail` — opacity fade + translate + rotate for wind particles
- Added `.wind-particle` utility class

## Deviations from Plan

None — plan executed exactly as written.

## Auth Gates

None.

## Verification

- ✅ TypeScript: `npx tsc --noEmit` — zero errors (all 3 tasks)
- ✅ Build: `npm run build` — compiled successfully, all 3 pages generated
- ⚡ Visual: Auto-approved in auto mode (run `npm run dev` to verify interaction on Journey page)

## Self-Check: PASSED

- ✅ `src/config/site.ts` — modified, contains `ForcedConnectionSection` interface and `forcedConnection` data
- ✅ `src/config/i18n.ts` — modified, contains `forcedConnection` in `getConfig`
- ✅ `src/components/ForcedConnection.tsx` — created, exports `ForcedConnection`
- ✅ `src/components/JourneySection.tsx` — modified, imports and renders `ForcedConnection`
- ✅ `src/app/globals.css` — modified, contains `leafGlow`, `windTrail` keyframes and `--z-forced-connection`
- ✅ Commit `62a231c` — found (config + i18n)
- ✅ Commit `612d123` — found (ForcedConnection component)
- ✅ Commit `ba97707` — found (integration + CSS)
