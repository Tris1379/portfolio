---
phase: 04-i18n-vietnamese-english
plan: 03
subsystem: i18n
tags: [components, language-switcher, metadata, route-migration]
dependency_graph:
  requires: [04-01, 04-02]
  provides: [fully-i18n-site, locale-routing]
  affects: []
tech_stack:
  added: []
  patterns: [getConfig-in-components, createNavigation, generateMetadata]
key_files:
  created: []
  modified:
    - src/components/HeroSection.tsx
    - src/components/StorySection.tsx
    - src/components/ArsenalSection.tsx
    - src/components/GallerySection.tsx
    - src/components/ValuesSection.tsx
    - src/components/SocialLinks.tsx
    - src/components/LanguageSwitcher.tsx
    - src/components/Navbar.tsx
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/i18n/routing.ts
  deleted:
    - src/app/layout.tsx
    - src/app/page.tsx
decisions: []
---

# Phase 04 Plan 03: Wire i18n into All Components Summary

## One-liner
Updated all components to use getConfig(locale), wired LanguageSwitcher with real navigation, added locale-aware metadata, and migrated to /[locale]/ routes.

## Tasks Completed

| # | Task | Status | Commit |
|---|------|--------|--------|
| 1 | Update section components to use getConfig | ✅ | 39a55f9 |
| 2 | Wire LanguageSwitcher and update Navbar | ✅ | 39a55f9 |
| 3 | Update layout and page, delete old routes | ✅ | 39a55f9 |
| 4 | Build verification | ✅ | 39a55f9 |

## Key Changes

**Components (6 sections):** All now accept `{ locale: Locale }` prop, import `getConfig` instead of `siteConfig`. Zero remaining `siteConfig` imports in any component.

**LanguageSwitcher:** Real toggle using `useRouter` and `usePathname` from `@/i18n/routing` (via `createNavigation`). Current locale is bold, other is muted. Click navigates to equivalent page in other locale.

**Navbar:** Uses `useLocale()` from next-intl + `getConfig()` for name display.

**Layout:** Added `generateMetadata` for locale-aware `<title>` and `<meta description>`. Passes `messages` to `NextIntlClientProvider`. Dynamic `lang={locale}` on `<html>`.

**Page:** Uses `getLocale()` server-side to pass `locale` prop to all 6 section components.

**Route migration:** Deleted old `src/app/layout.tsx` and `src/app/page.tsx` — only `/[locale]/` routes remain.

## Deviation: createNavigation pattern

The plan specified importing `useRouter` and `usePathname` from `next-intl/routing`. The installed next-intl version uses the `createNavigation` pattern instead. Updated `src/i18n/routing.ts` to export these hooks via `createNavigation(routing)`, and updated `LanguageSwitcher.tsx` to import from `@/i18n/routing`.

## Build Verification

✅ `npm run build` — Compiled successfully, zero errors. Routes:
- `○ /_not-found` (static)
- `ƒ /[locale]` (dynamic, server-rendered)

## Self-Check: PASSED

- ✅ All 6 section components import getConfig, not siteConfig
- ✅ All section components accept `locale: Locale` prop
- ✅ LanguageSwitcher toggles VI|EN with router.replace and visual highlighting
- ✅ Navbar imports getConfig for name display
- ✅ [locale]/layout.tsx has generateMetadata using getConfig
- ✅ [locale]/page.tsx passes locale to all section components
- ✅ src/app/layout.tsx and src/app/page.tsx deleted
- ✅ `npm run build` completes with zero errors
- ✅ No remaining `import { siteConfig }` in any component file
