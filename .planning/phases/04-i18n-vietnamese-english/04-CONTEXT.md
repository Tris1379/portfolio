# Phase 4: i18n (Vietnamese/English) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Full Vietnamese/English language support with persistent preference and URL-based locale. User switches languages via the navbar LanguageSwitcher pill (already exists as no-op). All visible text updates to selected language. URL reflects locale (/en/, /vi/). No new sections, no visual changes beyond translated text.

</domain>

<decisions>
## Implementation Decisions

### i18n library & routing
- Use `next-intl` — purpose-built for Next.js App Router, handles routing, middleware, server/client components
- URL structure: `/en/` and `/vi/` prefixes on all pages
- Root `/` redirects to `/en/` (default locale)
- Middleware reads `NEXT_LOCALE` cookie for preference; if no cookie, defaults to `/en/`
- Dynamic `[locale]` segment in app directory: `app/[locale]/page.tsx`, `app/[locale]/layout.tsx`

### Translation data architecture
- Extend `site.ts` — not separate JSON files. Keep all content centralized as established in Phase 1
- Structure: nested per-locale objects. Each translatable field becomes `{ en: "...", vi: "..." }`
- Pre-resolved config pattern: `getConfig(locale)` returns a flat config with all strings already resolved to the target language
- Components receive resolved config — they do NOT need to know about i18n internals (no `t()` calls in components)
- Example: `siteConfig.name` becomes `siteConfig.name = { en: "Kazuha", vi: "Kazuha" }` — resolved by `getConfig("vi").name`

### Translation scope
- All visible text translates: title, bio, story paragraphs, section titles, skill categories, project descriptions, value items
- Proper nouns stay: "Kazuha" (name), language names ("English", "Tiếng Việt")
- Technical terms stay untranslated: skill names ("Python", "Docker", "SIEM", "AWS", "Penetration Testing")
- Platform labels stay: "GitHub", "LinkedIn", "Email" (plus their URLs and icon references)
- Metadata translates: HTML `<title>`, `<meta description>`, `lang` attribute on `<html>`

### Language switcher behavior
- Click toggles between VI and EN — no dropdown
- Navigates to the equivalent page in the other locale (e.g., `/en/` → `/vi/`)
- Sets `NEXT_LOCALE` cookie on switch
- Visual: current locale text is bold/highlighted, other locale is muted

### Claude's Discretion
- Exact next-intl configuration and middleware setup
- How `getConfig()` resolves nested objects (recursive helper vs flat map)
- Vietnamese translation content (Claude writes natural Vietnamese, not machine translation)
- Whether to use next-intl's `getRequestConfig` or a simpler custom approach for server-side locale
- How to handle the `[locale]` layout.tsx restructuring (metadata generation, font loading)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/PROJECT.md` — Constraints: zero hardcoded text, Tailwind v4, Next.js 15 App Router
- `.planning/REQUIREMENTS.md` §i18n — I18N-01 through I18N-04 acceptance criteria

### Prior phase decisions
- `.planning/phases/01-foundation-config/01-CONTEXT.md` — site.ts data structure, typed interfaces, "site.ts holds content in default language only — i18n handled in Phase 4 with separate translation files"
- `.planning/phases/03-content-sections/03-CONTEXT.md` — Section component patterns, Server Component import of site.ts, LanguageSwitcher no-op pill

### Code files to reference
- `src/config/site.ts` — Current English-only content, typed interfaces (SiteConfig, StorySection, ArsenalSection, GallerySection, ValuesSection, SocialLink)
- `src/components/LanguageSwitcher.tsx` — Existing no-op pill button (14 lines, "use client")
- `src/components/Navbar.tsx` — Imports siteConfig.name, ThemeToggle, LanguageSwitcher
- `src/app/layout.tsx` — Root layout with `lang="en"`, fonts, Providers, Navbar
- `src/app/page.tsx` — Imports all section components from siteConfig
- All `src/components/*Section.tsx` — Server Components importing from siteConfig

### next-intl reference
- next-intl App Router documentation for `[locale]` segment pattern
- next-intl middleware configuration for cookie + prefix routing
- `getRequestConfig` for server-side locale resolution

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/config/site.ts` — All content centralized with typed interfaces. The i18n extension happens HERE — adding { en, vi } to each field. No new files needed for translation data.
- `src/components/LanguageSwitcher.tsx` — Pill button already exists. Needs real onClick handler with `useRouter().push()` to toggle locale path.
- `src/components/Navbar.tsx` — Already imports LanguageSwitcher. No structural change needed.
- `src/components/Providers.tsx` — "use client" shell. May need next-intl's `NextIntlClientProvider` added here alongside ThemeProvider.

### Established Patterns
- Server Components import site.ts directly — `getConfig(locale)` replaces `siteConfig` import in all section components
- "use client" boundary at Providers.tsx — stays, next-intl provider added here
- Components do NOT hardcode strings — this pattern continues, just with locale-aware config
- CSS vars for theme — locale doesn't affect styling, no CSS changes needed

### Integration Points
- `app/[locale]/layout.tsx` — Replaces current `app/layout.tsx`. Must generate locale-aware metadata, pass locale to fonts if needed
- `app/[locale]/page.tsx` — Replaces current `app/page.tsx`. Imports `getConfig(locale)` instead of `siteConfig`
- `middleware.ts` — New file at project root. Handles locale detection, cookie reading, redirect logic
- `src/config/site.ts` — Major refactor: every text field becomes { en, vi }, add `getConfig(locale)` export
- All section components — Change import from `siteConfig` to `getConfig(locale)` (pass locale as prop or get from context)

</code_context>

<specifics>
## Specific Ideas

- "I want the Vietnamese text to feel natural — not Google Translate. Like a native speaker wrote it."
- Language switcher should feel instant — no loading spinner on switch (page is static, should be near-instant navigation)
- The `<html lang="...">` attribute must update per locale (accessibility + SEO)
- Section titles like "My Story", "Arsenal", "Gallery", "Values" should all have Vietnamese equivalents

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-i18n-vietnamese-english*
*Context gathered: 2026-03-23*
