---
phase: 04-i18n-vietnamese-english
plan: 01
subsystem: i18n
tags: [next-intl, routing, middleware, infrastructure]
dependency_graph:
  requires: []
  provides: [i18n-routing, locale-middleware, locale-layout]
  affects: [04-02, 04-03]
tech_stack:
  added: [next-intl]
  patterns: [createMiddleware, getRequestConfig, NextIntlClientProvider]
key_files:
  created:
    - src/i18n/routing.ts
    - src/i18n/request.ts
    - middleware.ts
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
  modified:
    - package.json
    - package-lock.json
decisions: []
---

# Phase 04 Plan 01: next-intl Infrastructure Setup Summary

## One-liner
Installed next-intl and created routing/middleware/directory structure for /en/ and /vi/ URL-based locale navigation.

## Tasks Completed

| # | Task | Status | Commit |
|---|------|--------|--------|
| 1 | Install next-intl and create routing config | ✅ | f5a2080 |
| 2 | Create middleware for locale routing | ✅ | f5a2080 |
| 3 | Create [locale] directory structure | ✅ | f5a2080 |

## Key Artifacts

- **`src/i18n/routing.ts`** — Defines locale routing with `en`/`vi`, default `en`
- **`src/i18n/request.ts`** — Server-side locale resolution via `getRequestConfig`
- **`middleware.ts`** — Handles locale detection, cookie reading, root `/` → `/en/` redirect
- **`src/app/[locale]/layout.tsx`** — Locale-aware root layout with `NextIntlClientProvider`, dynamic `lang={locale}`
- **`src/app/[locale]/page.tsx`** — Placeholder page importing all 6 section components

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- ✅ next-intl in package.json dependencies
- ✅ src/i18n/routing.ts exports routing with locales ["en", "vi"], defaultLocale "en"
- ✅ src/i18n/request.ts provides server-side locale via getRequestConfig
- ✅ middleware.ts at project root with createMiddleware + matcher config
- ✅ src/app/[locale]/layout.tsx with NextIntlClientProvider, lang={locale}
- ✅ src/app/[locale]/page.tsx importing all 6 section components
