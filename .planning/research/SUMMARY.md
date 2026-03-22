# Project Research Summary

**Project:** Kazuha Vibe Portfolio
**Domain:** Personal portfolio website for Information Security professional
**Researched:** 2026-03-22
**Confidence:** HIGH

## Executive Summary

The Kazuha Vibe Portfolio is a visually distinctive personal portfolio for an Information Security professional, themed around the "Kazuha" aesthetic — wind, falling maple leaves, wanderer vibes. Research confirms this is technically feasible as a static Next.js site with three core visual pillars: tsParticles v3 for maple leaf particle effects, glassmorphism cards with backdrop-blur, and smooth Framer Motion (now "Motion") animations. The project targets technical recruiters and hiring managers in cybersecurity, with the design serving as proof of frontend engineering competence alongside InfoSec content.

The recommended stack is Next.js 15 with App Router, Tailwind CSS v4 (with `@theme` config — no more `tailwind.config.js`), motion/react (renamed from framer-motion), tsParticles v3 with the `@tsparticles/shape-image` plugin for maple leaf images, next-intl v4 for Vietnamese/English i18n, and next-themes for dark/light toggling. All research sources are recent (Feb–March 2026) and high-confidence. The architecture follows a strict Server/Client Component boundary pattern — static content rendered as Server Components, interactive elements (theme toggle, language switch, particles) as isolated Client Components. A centralized `site.ts` config drives all content, enforcing the "zero hardcoded text" constraint.

The primary risks are: (1) tsParticles canvas blocking all click events — requires `pointer-events: none` on the canvas element, (2) glassmorphism `backdrop-filter` creating stacking context traps that break z-index hierarchies — requires a planned z-index token system, and (3) theme FOUC (Flash of Unstyled Content) on SSR — mitigated by next-themes with `suppressHydrationWarning`. All three are well-documented pitfalls with known solutions that must be applied during foundation setup, not retrofitted.

## Key Findings

### Recommended Stack

See [STACK.md](STACK.md) for full details.

**Core technologies:**
- **Next.js 15.x:** App Router, Server Components, Vercel-native. Stable since Oct 2024. v16 exists but too new for a portfolio.
- **Tailwind CSS v4.2.2:** Rust-based Oxide engine (5–10x faster builds). Config via `@theme` in CSS, not `tailwind.config.js`. OKLCH color space.
- **motion/react (v13+):** Renamed from framer-motion in 2024. `npm install motion`, import from `motion/react`. Versions 12.18.2–12.23.x have a known build failure — must pin to ≤12.18.1 or use 13.0.0+.
- **tsParticles v3:** `@tsparticles/react` + `@tsparticles/engine` + `@tsparticles/slim` + `@tsparticles/shape-image` (required for maple leaf image shapes).
- **next-intl v4:** THE standard for Next.js App Router i18n. 457B bundle. Works in Server and Client Components. Supports `[locale]` route prefix.
- **next-themes v0.4.6:** Industry standard for dark mode. `attribute="class"` strategy with Tailwind v4's `.dark` class.
- **lucide-react:** Tree-shakeable, stroke-style icons matching glassmorphism aesthetic.
- **next/font/google:** Self-hosted fonts, zero layout shift. Recommend Playfair Display (display) + Inter (body).

### Expected Features

See [FEATURES.md](FEATURES.md) for full details.

**Must have (table stakes):**
- Hero Section — first impression, name, title, one-liner (recruiters spend <10 seconds)
- Story Section — personality and narrative (hiring managers hire people, not skills)
- Arsenal Section — categorized skills with context (not a wall of technologies)
- Social Links (GitHub, LinkedIn, Email) — must be immediately visible
- Mobile Responsive — 60%+ of recruiters browse on phones
- Fast Loading — 53% abandon sites taking >3 seconds
- Dark Mode Default — expected in 2026 for tech portfolios
- Clear Navigation — fixed navbar, smooth scroll to sections

**Should have (competitive differentiators):**
- Kazuha Aesthetic + Maple Leaf Particles — instantly memorable, #1 visual differentiator
- Glassmorphism Cards — modern, elegant, shows design attention
- i18n (Vietnamese/English) — signals global awareness, very few portfolios do this well
- Theme Toggle (Dark/Light) — accessibility consideration + polish
- Smooth Scroll Animations (Motion) — signals UX attention, 60fps mobile is non-negotiable
- InfoSec-specific content: CTF write-ups, homelab documentation, security tool scripts

**Defer (v2+):**
- Performance Metrics Badge — meta feature, low priority
- Live Visitor Count — only if numbers are impressive

**Never build (anti-features):**
- Blog (scope creep, needs ongoing content)
- Contact Form (adds backend complexity, violates static constraint)
- Testimonials (premature for personal portfolio without clients)
- Auto-playing audio, chatbot, "coming soon" sections

### Architecture Approach

See [ARCHITECTURE.md](ARCHITECTURE.md) for full details.

The architecture is defined by the Server/Client Component boundary in Next.js 15 App Router. A `Providers.tsx` client component shell composes `ThemeProvider` + `I18nProvider` inside a Server Component layout. Content flows from a centralized `site.ts` config through Server Components to section renderers — no Client Component imports `site.ts` directly. tsParticles is isolated via `next/dynamic` with `ssr: false`. i18n uses `next-intl` with `[locale]` dynamic route segments and middleware for locale detection.

**Major components:**
1. **Providers.tsx** — Client shell composing ThemeProvider + I18nProvider
2. **SectionRenderer** — Maps `site.ts` section config to typed section components
3. **ParticlesBackground** — Client Component, dynamic import with `ssr: false`, device-aware particle count
4. **Navbar** — Fixed, glassmorphism, holds ThemeToggle + LanguageSwitcher
5. **GlassCard** — Reusable glassmorphism wrapper with pointer-events management

### Critical Pitfalls

See [PITFALLS.md](PITFALLS.md) for full details — 18 pitfalls documented with solutions.

1. **tsParticles Canvas Blocks Clicks** — Canvas covers viewport, intercepts pointer events. Fix: `pointer-events: none` on canvas. Must apply during initial setup.
2. **Glassmorphism Stacking Context Traps** — `backdrop-filter` creates new stacking contexts; `z-index` becomes isolated. Fix: define a z-index token system (`--z-particles: 0`, `--z-navbar: 50`, etc.) before building any components.
3. **Theme FOUC on Page Load** — Server renders default theme, client corrects after JS loads. Fix: `next-themes` with `suppressHydrationWarning` + `disableTransitionOnChange`.
4. **tsParticles SSR Hydration Failure** — `window`/`document` don't exist during SSR. Fix: `dynamic(() => import(...), { ssr: false })` for all tsParticles components.
5. **Motion Package Name Confusion** — Must install `motion` (not `framer-motion`), import from `motion/react`. Pin to ≤12.18.1 or ≥13.0.0 to avoid known build failure.

## Implications for Roadmap

Based on combined research, a 6-phase build order is recommended, aligned with architecture dependency chains:

### Phase 1: Foundation & Config
**Rationale:** Everything depends on Tailwind v4 setup, CSS variables, z-index tokens, and the `site.ts` data structure. Getting this wrong means rewriting everything.
**Delivers:** Project scaffold, globals.css with glassmorphism utilities and z-index system, `site.ts` config structure, root layout with font loading, Tailwind v4 `@theme` + `@custom-variant dark` config.
**Addresses:** Dark mode default (table stakes), glassmorphism UI (differentiator), centralized config architecture.
**Avoids:** Pitfall 2 (z-index stacking traps), Pitfall 3 (theme FOUC), Pitfall 13 (Tailwind v4 dark variant), Pitfall 14 (Safari backdrop-filter prefix).
**Research flag:** No — well-documented standard patterns.

### Phase 2: Theming & Providers
**Rationale:** Theme infrastructure must be in place before building content sections, so dark: classes work from the start.
**Delivers:** `Providers.tsx` client shell, `ThemeProvider` integration, `ThemeToggle` component with hydration-safe rendering, dark/light class wiring.
**Uses:** next-themes v0.4.6, lucide-react icons.
**Avoids:** Pitfall 16 (theme toggle hydration mismatch).
**Research flag:** No — standard next-themes pattern.

### Phase 3: Content Sections
**Rationale:** Build all sections with data from `site.ts` before adding i18n or particles. Content-first, polish later.
**Delivers:** SectionRenderer, StorySection, ArsenalSection, GallerySection, ValuesSection, GlassCard component, SocialLinks component, Navbar (fixed, glassmorphism).
**Addresses:** Hero, Story, Arsenal, Gallery, Values, Social Links, Mobile Responsive, Clear Navigation (all table stakes).
**Avoids:** Pitfall 7 (glassmorphism text contrast WCAG) — ensure sufficient opacity on glass cards.
**Research flag:** No — straightforward component composition from config data.

### Phase 4: i18n (Vietnamese/English)
**Rationale:** Build i18n after content exists — migrate hardcoded text to translations. Doing this before content would require designing translation keys blindly.
**Delivers:** `[locale]` route structure, `middleware.ts` for locale detection/redirect, `I18nProvider` + translation JSON files, `LanguageSwitcher` component, migration of all hardcoded text to `t()` calls.
**Uses:** next-intl v4, translation files (`messages/en.json`, `messages/vi.json`).
**Avoids:** Anti-pattern of flat translation key structure (use nested: `t('hero.title')`).
**Research flag:** No — next-intl v4 is well-documented with App Router guides.

### Phase 5: Particles & Visual Effects
**Rationale:** Particles are independent of content and i18n. Apply device-aware performance tuning and pointer-events management. This is the #1 visual differentiator but has the most pitfalls.
**Delivers:** `ParticlesBackground.tsx` with dynamic import (`ssr: false`), maple leaf image shape config, device-aware particle count (mobile: ~20, desktop: ~50), pointer-events layer management, `-webkit-backdrop-filter` Safari prefix.
**Uses:** tsParticles v3 (`@tsparticles/react`, `@tsparticles/engine`, `@tsparticles/slim`, `@tsparticles/shape-image`).
**Avoids:** Pitfall 1 (canvas blocks clicks), Pitfall 4 (SSR hydration), Pitfall 8 (image shape not loading), Pitfall 9 (mobile performance), Pitfall 11 (density group bug), Pitfall 15 (retina detect load).
**Research flag:** MEDIUM — tsParticles v3 config is complex; device-aware tuning may need iteration.

### Phase 6: Animations & Polish
**Rationale:** Animations are refinement — they layer on top of working content. Only animate `transform` and `opacity` for 60fps.
**Delivers:** Motion scroll-triggered entrance animations on sections, responsive design finalization, z-index layering verification, performance audit (60fps mobile check), clean `npm run build`.
**Uses:** motion/react (LazyMotion + domAnimation for bundle optimization).
**Avoids:** Pitfall 5 (wrong package import), Pitfall 6 (animating layout properties), Pitfall 10 (animating backdrop-filter), Pitfall 12 (layout prop distortion), Pitfall 18 (AnimatePresence + PPR).
**Research flag:** No — Motion animation patterns are extensively documented.

### Phase Ordering Rationale

- **Foundation first** (Phase 1) because Tailwind v4 setup, CSS variables, z-index tokens, and `site.ts` are prerequisites for every other phase.
- **Theming before content** (Phase 2 before 3) because dark mode classes need to exist when components are built — retrofitting theme support is expensive.
- **Content before i18n** (Phase 3 before 4) because you need real text to internationalize. Building translation keys before content is designing blind.
- **Particles independent but last core** (Phase 5) because tsParticles has no dependency on content or i18n, but has the most pitfalls and should be isolated.
- **Animations always last** (Phase 6) because animation is polish on top of working features. Premature animation optimization wastes time on untested layouts.

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** Tailwind v4 + Next.js 15 setup is extensively documented.
- **Phase 2 (Theming):** next-themes is the community standard with 6K+ GitHub stars.
- **Phase 3 (Content Sections):** Straightforward Server Component composition from config.
- **Phase 4 (i18n):** next-intl v4 App Router guides are current and high-quality.
- **Phase 6 (Animations):** Motion animation patterns are extensively documented.

**Phases needing validation during planning:**
- **Phase 5 (Particles):** tsParticles v3 config is complex. Device-aware tuning may need real-device testing iteration. Consider a `/gsd-research-phase` if maple leaf image shape config is non-trivial.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against March 2026 sources. Package names, import paths, and known build issues documented. |
| Features | HIGH | MVP prioritization aligns with cybersecurity hiring manager research. Anti-features clearly identified. |
| Architecture | HIGH | Server/Client Component boundary patterns confirmed by official Next.js docs and multiple production guides. |
| Pitfalls | HIGH | 18 pitfalls documented with GitHub issue references, prevention code, and phase warnings. |

**Overall confidence:** HIGH

### Gaps to Address

- **Actual content:** `site.ts` needs real InfoSec content (CTF write-ups, homelab docs, skills). This is a content task, not a technical gap — the architecture supports it.
- **Maple leaf SVG asset:** Need an optimized SVG/PNG (32–64px) for tsParticles image shape. Create or source before Phase 5.
- **Real device testing:** 60fps mobile claim needs validation on actual budget Android devices, not just Chrome DevTools emulation. Test during Phase 6.
- **PROJECT.md stack mismatch:** PROJECT.md references "Next.js 14" — research recommends Next.js 15. Update PROJECT.md to reflect research findings.

## Sources

### Primary (HIGH confidence)
- Next.js release notes — v15.x stable, v16.2.1 exists (March 2026)
- Tailwind CSS v4.2.2 release — `@theme` config, `@custom-variant dark` (March 2026)
- tsParticles GitHub issues #5465, #5496 — pointer-events bug, density group bug
- Motion (Framer Motion) issue #3211 — export * build failure, version matrix
- next-intl v4 App Router guide — `[locale]` routing pattern (Feb 2026)
- next-themes GitHub — class-based dark mode, hydration handling

### Secondary (MEDIUM confidence)
- Glassmorphism accessibility research — WCAG contrast requirements, stacking contexts
- Cybersecurity portfolio best practices — CTF write-ups, homelab docs, 93% hiring manager preference
- Core Web Vitals documentation — LCP <2.5s, CLS <0.1 targets
- Multiple 2026 migration guides for Next.js 15 + Tailwind v4

### Tertiary (LOW confidence)
- lucide-react version — widely used but exact version not verified
- Device-aware particle count values (20 mobile, 50 desktop) — starting points, need real-device validation

---

*Research completed: 2026-03-22*
*Ready for roadmap: yes*
