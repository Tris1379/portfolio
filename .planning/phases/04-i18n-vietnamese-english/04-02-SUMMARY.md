---
phase: 04-i18n-vietnamese-english
plan: 02
subsystem: i18n
tags: [bilingual-data, site-config, vietnamese]
dependency_graph:
  requires: []
  provides: [bilingual-site-config, getConfig-resolver]
  affects: [04-03]
tech_stack:
  added: []
  patterns: [getConfig-resolver, per-locale-objects]
key_files:
  created:
    - src/config/i18n.ts
  modified:
    - src/config/site.ts
decisions: []
---

# Phase 04 Plan 02: Bilingual site.ts Data Layer Summary

## One-liner
Extended site.ts with { en, vi } objects on all translatable fields and created getConfig(locale) resolver returning flat resolved config.

## Tasks Completed

| # | Task | Status | Commit |
|---|------|--------|--------|
| 1 | Create i18n type definitions and getConfig resolver | ✅ | ef9c583 |
| 2 | Extend site.ts with bilingual content | ✅ | ef9c583 |

## Key Artifacts

- **`src/config/i18n.ts`** — Exports `Locale` type ("en" | "vi") and `getConfig(locale)` function
- **`src/config/site.ts`** — All translatable fields now `{ en: string, vi: string }` objects
- **37 Vietnamese translation entries** — Natural Vietnamese, not machine-translated

## Translation Scope

**Translated:** title, bio, story paragraphs, section titles, category names, project names/descriptions, value titles/descriptions, social labels

**Untranslated (per design):** `name` ("Kazuha" — proper noun), `skills[]` (technical terms: Python, Docker, SIEM, etc.), `social[].platform/url/icon`, `particles` config

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- ✅ src/config/i18n.ts exports `Locale` type ("en" | "vi")
- ✅ src/config/i18n.ts exports `getConfig(locale)` returning flat resolved config
- ✅ All interfaces in site.ts updated with { en, vi } on translatable fields
- ✅ Skills arrays stay plain string[] (not translated)
- ✅ social[].label uses { en, vi }
- ✅ particles config stays unchanged
- ✅ TypeScript compiles without errors
