# Phase 1: Foundation & Config - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the Next.js 15 project scaffold, Tailwind v4 design system with glassmorphism utilities, CSS z-index token system, and the centralized `site.ts` config file. Every other phase depends on this foundation. No visual components are built in this phase — only infrastructure.

</domain>

<decisions>
## Implementation Decisions

### site.ts content structure
- Organized by domain sections — each major area (profile, social, sections, particles) is a top-level key with typed sub-objects
- Each section has its own interface with section-specific fields (StorySection has paragraphs, ArsenalSection has categories/skills, GallerySection has projects)
- Social links are an array of objects with platform, url, label, and icon reference — supports adding new platforms without schema changes
- site.ts holds content in default language only — i18n handled in Phase 4 with separate translation files

### Z-index token hierarchy
- Named CSS custom properties: `--z-particles: 0`, `--z-content: 10`, `--z-cards: 20`, `--z-navbar: 50`, `--z-modal: 100`
- Defined in globals.css — accessible from both Tailwind utilities and raw CSS
- Glass cards create their own stacking context via `--z-cards`, children inside cards don't need individual z-index management
- Intentional gap between content (10) and navbar (50) leaves room for future layers (tooltips, dropdowns)

### Glassmorphism scope
- Navbar and content cards only — hero section uses clear background, not glass
- Two variants: `.glass` (light overlay for dark mode) and `.glass-dark` (subtle for light mode)
- backdrop-blur-lg (16px) for cards, backdrop-blur-md (12px) for navbar
- Subtle 1px border at white/10 opacity on dark mode, black/10 on light mode

### CSS token architecture
- Design tokens live in globals.css using Tailwind v4 `@theme` directive
- Color tokens: primary (#a8e6cf), surface (#0a0a0a), surface-light (#1a1a2e), glass variants
- Glassmorphism utilities defined in `@layer components` — keeps them separate from Tailwind utilities
- Responsive breakpoints: use Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

### Claude's Discretion
- Exact TypeScript type definitions for site.ts interfaces
- Font selection (research recommends Playfair Display + Inter)
- Package.json scripts and ESLint/Prettier config
- File/folder naming conventions within src/

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/PROJECT.md` — Vision, constraints, design language (dark mode #0a0a0a, accent #a8e6cf)
- `.planning/REQUIREMENTS.md` §Foundation — FOUND-01 through FOUND-04 acceptance criteria

### Research findings
- `.planning/research/STACK.md` — Next.js 15, Tailwind v4.2.2, package versions and import paths
- `.planning/research/ARCHITECTURE.md` — Server/Client component boundaries, data flow, site.ts pattern
- `.planning/research/PITFALLS.md` — Pitfall 2 (z-index stacking), Pitfall 3 (theme FOUC), Pitfall 13 (Tailwind dark variant), Pitfall 14 (Safari backdrop-filter)

### Tailwind v4 specific
- Tailwind v4 uses `@theme` directive in CSS (no tailwind.config.js)
- Dark mode requires `@custom-variant dark (&:where(.dark, .dark *))` in globals.css
- CSS custom properties inside `@theme` become Tailwind utilities automatically

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — this phase establishes patterns for all subsequent phases

### Integration Points
- `src/config/site.ts` → consumed by all Server Components (Phase 3+)
- `globals.css` → imported by root layout, consumed by all components
- Root `layout.tsx` → shell for Providers (Phase 2), Particles (Phase 5), content (Phase 3)

</code_context>

<specifics>
## Specific Ideas

- Project uses Next.js 15 with App Router (not Pages Router)
- Tailwind CSS v4 with @theme config (not tailwind.config.js)
- Strict separation: site.ts is only imported by Server Components, never by Client Components
- tsParticles will be dynamically imported with ssr: false (Phase 5 setup anticipated)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-config*
*Context gathered: 2026-03-22*
