# Phase 3: Content Sections - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

All portfolio content sections render with glassmorphism styling and responsive layout. Includes: Navbar (fixed, glassmorphism), Hero (name/title/bio), Story (personal narrative), Arsenal (categorized skills), Gallery (projects), Values (professional values), Social links (GitHub, LinkedIn, Email). All content comes from site.ts — zero hardcoded strings. No i18n, no particles, no animations yet — those are later phases.

</domain>

<decisions>
## Implementation Decisions

### Navbar structure & behavior
- Logo/site name on the left, ThemeToggle + Language Switcher on the right
- VI/EN toggle pill for language switcher — visually present now, wired up in Phase 4 (i18n)
- No hamburger menu on mobile — toggle and switcher stay visible, just compact size
- Always same glassmorphism opacity — no scroll-aware transparency effect
- Fixed positioning at top, z-index: --z-navbar (50)

### Section layout & visual separation
- Spacing only between sections — generous vertical padding (py-16 to py-24), no dividers or separators
- All sections share consistent max-w-4xl (~896px) container, centered
- Hero is full-viewport-height (min-h-screen), centered, name at text-5xl+, title and bio below
- Section titles: large (text-3xl/4xl), centered, Playfair Display font

### Content card presentation
- Story: paragraphs inside a single .glass card
- Arsenal: 3 category cards (.glass) in a row, each containing skill tags as pill elements (rounded-full)
- Gallery: each project is a .glass card with name (heading), description, and clickable link (external icon)
- Values: 3 glass cards in a row on desktop, stacked on mobile

### Responsive layout strategy
- Grid sections (Arsenal, Values) collapse to single column at md: breakpoint (768px)
- Padding: px-8 (32px) on desktop, px-4 (16px) on mobile
- Text scales: text-base on desktop, text-sm on mobile for body/narrative text
- Hero stays full-viewport-height on mobile too

### Claude's Discretion
- Exact component file structure (e.g., HeroSection.tsx, StorySection.tsx, etc.)
- Social links section styling and placement (bottom of page, separate section)
- Skill tag colors/accent usage within arsenal cards
- Gallery card link icon choice (external-link from lucide-react)
- Section order on the page (likely: Hero → Story → Arsenal → Gallery → Values → Social)
- Exact vertical spacing values (py-16 vs py-20 vs py-24 per section)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/PROJECT.md` — Design language (dark #0a0a0a, accent #a8e6cf), constraints (zero hardcoded text, responsive PC/Mobile)
- `.planning/REQUIREMENTS.md` §Layout — LYOUT-01 through LYOUT-05 acceptance criteria
- `.planning/REQUIREMENTS.md` §Sections — SECT-01 through SECT-06 acceptance criteria

### Research findings
- `.planning/research/STACK.md` — Next.js 15, Tailwind v4.2.2, lucide-react, package versions
- `.planning/research/ARCHITECTURE.md` — Server/Client component boundaries, site.ts import pattern (Server Components only)
- `.planning/research/PITFALLS.md` — Pitfall 14 (Safari backdrop-filter), Pitfall 2 (z-index stacking)

### Prior phase decisions (carried forward)
- `.planning/phases/01-foundation-config/01-CONTEXT.md` — Z-index tokens, glassmorphism scope, site.ts data structure
- `.planning/phases/02-theming-providers/02-CONTEXT.md` — Theme CSS vars, light mode palette, toggle behavior

### Key constraints from prior phases
- Z-index system: `--z-particles: 0`, `--z-content: 10`, `--z-cards: 20`, `--z-navbar: 50`, `--z-modal: 100`
- `.glass` class is theme-adaptive (dark: white/10 overlay, light: frosted white/80)
- CSS vars: --color-bg, --color-text, --color-text-secondary — switch via .dark class
- Tailwind v4 @theme block — tokens become utilities (bg-primary, text-accent, etc.)
- Font: Playfair Display (--font-display) for headings, Inter (--font-body) for body text
- Navbar has ThemeToggle component + Language Switcher pill (VI/EN)
- site.ts holds ALL content — typed interfaces for each section, social links array, top-level name/title/bio

### Tailwind v4 specific
- Tailwind v4 uses `@theme` directive in CSS (no tailwind.config.js)
- Dark mode driven by class on `<html>` element (not media query)
- CSS variable syntax: `bg-(--color-bg)` resolves to `var(--color-bg)`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/config/site.ts` — All content pre-defined: name, title, bio, story paragraphs, arsenal categories/skills, gallery projects, values items, social links. Typed interfaces for each section. Components import from here.
- `src/components/ThemeToggle.tsx` — Ready-to-use toggle component, needs to be imported into Navbar
- `src/components/Providers.tsx` — ThemeProvider shell, "use client" boundary
- `src/app/globals.css` — .glass class (theme-adaptive), CSS custom properties, z-index tokens, @theme block

### Established Patterns
- Server Components import site.ts directly (no props drilling)
- "use client" boundary at Providers.tsx — layout.tsx and page.tsx are Server Components
- .glass class for all glassmorphism elements (cards, navbar)
- Tailwind v4 utilities via @theme block
- CSS custom properties for theme-reactive values

### Integration Points
- `src/app/page.tsx` — Currently has minimal hero section. All new sections go here (or imported section components)
- `src/app/layout.tsx` — Navbar component will be added here (above Providers children, at --z-navbar)
- `src/components/` — New section components created here

</code_context>

<specifics>
## Specific Ideas

- "I want the hero to feel like landing on a calm mountain overlook — name big and centered, nothing else competing for attention"
- Arsenal skill tags should use the pastel green accent (#a8e6cf) subtly — maybe border or text color, not full background
- Gallery project links should open in new tab (target="_blank") with external-link icon
- Social links section at the very bottom, centered, icons from lucide-react (Github, Linkedin, Mail)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-content-sections*
*Context gathered: 2026-03-22*
