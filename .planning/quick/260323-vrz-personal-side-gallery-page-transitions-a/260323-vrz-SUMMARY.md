---
phase: quick-polish
plan: "01"
subsystem: ui-polish
tags: [z-index, scroll, transitions, css-classes]
dependency_graph:
  requires: []
  provides:
    - "Home buttons z-index fix (z-[9999])"
    - "Scrollable glass cards (card-scroll)"
    - "Mist-like exit transition"
  affects:
    - src/components/VisionSection.tsx
    - src/components/JourneySection.tsx
    - src/components/CompanionSection.tsx
    - src/components/StorySection.tsx
    - src/app/[locale]/page.tsx
tech_stack:
  added: []
  patterns: ["Tailwind arbitrary z-index z-[9999]", "CSS class card-scroll", "framer-motion Variants"]
key_files:
  created: []
  modified:
    - src/components/VisionSection.tsx
    - src/components/JourneySection.tsx
    - src/components/CompanionSection.tsx
    - src/components/StorySection.tsx
    - src/app/[locale]/page.tsx
decisions: []
metrics:
  duration: "2 min"
  completed: "2026-03-23"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 5
  commits: 3
---

# Phase quick-polish Plan 01: Personal Side Gallery & Page Transitions Summary

**One-liner:** Fixed Home button z-index stacking, added scrollable overflow to long-text glass cards, and enhanced page exit transition to a slow blur-dissolve mist effect.

## Task Results

### Task 1: z-[9999] on Home Buttons ✅
Added `relative z-[9999]` to Home button className in:
- VisionSection.tsx (line 18)
- JourneySection.tsx (line 18) — uses `text-white/60`
- CompanionSection.tsx (line 36) — uses `text-white/60`

Matches existing pattern from PersonalSideSection.tsx. Home buttons now sit above all other content.

### Task 2: card-scroll on Glass Cards ✅
Applied `card-scroll` class to glass container divs in:
- StorySection.tsx (line 18)
- VisionSection.tsx (line 42)
- JourneySection.tsx (line 38)
- CompanionSection.tsx (line 61)

Existing `card-scroll` CSS class provides `max-h-[60vh]`, `overflow-y-auto`, and thin scrollbar styling.

### Task 3: Mist-like Exit Transition ✅
Modified `pageVariants.exit` in page.tsx (lines 27-32):
- `blur(12px)` → `blur(24px)` — wider dissolve radius
- `duration: 0.4` → `duration: 0.7` — slower fade
- `y: -10` → `y: -20` — gentle upward drift
- `ease: [0.25, 0.46, 0.45, 0.94]` → `ease: "easeInOut"` — smooth dissolving

## Deviations from Plan

None — plan executed exactly as written. One minor type fix needed: added `as const` to `ease: "easeInOut"` to satisfy framer-motion's `Easing` type constraint.

## Build Verification

✅ `npm run build` — Compiled successfully, no TypeScript errors.

## Commits

| Hash | Message |
|------|---------|
| `30b0d78` | fix(quick-polish-01): add z-[9999] to Home buttons in sub-pages |
| `a8f4634` | fix(quick-polish-01): add card-scroll class to long-text glass cards |
| `f5fe0f9` | fix(quick-polish-01): enhance page exit transition to mist-like dissolve |

## Self-Check: PASSED

- [x] 3 Home buttons have `z-[9999]` — confirmed via grep
- [x] 4 glass cards have `card-scroll` — confirmed via grep
- [x] Exit transition uses `blur(24px)`, 0.7s, y:-20 — confirmed via grep
- [x] Build passes without errors
- [x] All 3 commits exist in git log
