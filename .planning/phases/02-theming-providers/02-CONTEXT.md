# Phase 2: Theming & Providers - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Dark/light theme system with persistence and zero flash of unstyled content. The next-themes ThemeProvider is already configured in Providers.tsx (class-based, dark default). This phase makes the entire visual layer theme-reactive and adds a toggle UI. No new sections or content — just theming infrastructure and toggle.

</domain>

<decisions>
## Implementation Decisions

### Light mode color palette
- Warm cream backgrounds: #faf8f5 (body), #f0ece6 (subtle variant)
- Glassmorphism cards: frosted white (white/80% + backdrop-blur) — clean, transparent
- Accent: #a8e6cf kept as-is; Claude adjusts for contrast if needed (slightly darker range #8dd4b8 for accessibility)
- surface-light equivalent: light purple tint #e8e2f0 — echoes dark mode's #1a122e undertone
- Text colors: Claude decides based on readability (likely varied shades #1a1a1a primary, #666666 secondary for hierarchy)

### Theme-aware styling scope
- CSS custom properties approach: define --color-bg, --color-text, etc. in :root and .dark — next-themes toggles the class, CSS vars switch automatically
- Single `.glass` class that auto-adapts to current theme via .dark parent selector (Claude decides merge strategy with existing .glass/.glass-dark)
- Color tokens defined in Tailwind v4 `@theme` block — become utilities like bg-surface, text-accent
- Claude decides coverage scope for links, focus rings, selection highlight (likely full coverage for coherence)

### System preference handling
- Always dark on first visit — `enableSystem` stays `false`, `defaultTheme` stays `"dark"`
- localStorage-only persistence (per-device) — no cross-device sync
- next-themes default script for FOUC prevention — blocking script sets class before paint, no custom inline script needed

### Transition behavior on toggle
- Selective smooth: keep `disableTransitionOnChange={true}` but add CSS transition only to body and primary elements (not every element)
- 300ms transition duration on background-color and color properties
- Glassmorphism pill toggle UI — sun/moon icon that swaps, .glass styled, fits navbar aesthetic

### Claude's Discretion
- Exact CSS variable naming convention and which elements get theme-reactive vars
- Glass class merge strategy (.glass + .glass-dark → single adaptive .glass)
- Text color shade levels for light mode hierarchy
- Toggle icon design (sun/moon SVG, animation on swap)
- How to handle the body hardcoded bg/text in layout.tsx during transition to CSS vars

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/PROJECT.md` — Design language (dark #0a0a0a, accent #a8e6cf), constraints (hex colors only, Tailwind v4)
- `.planning/REQUIREMENTS.md` §Theming — THEME-01 through THEME-04 acceptance criteria

### Research findings
- `.planning/research/STACK.md` — next-themes package version, Tailwind v4.2.2, import paths
- `.planning/research/ARCHITECTURE.md` — Server/Client component boundaries, Providers.tsx pattern
- `.planning/research/PITFALLS.md` — Pitfall 3 (theme FOUC), Pitfall 13 (Tailwind dark variant), Pitfall 14 (Safari backdrop-filter)

### Phase 1 decisions (carried forward)
- `.planning/phases/01-foundation-config/01-CONTEXT.md` — Z-index tokens, glassmorphism scope, CSS token architecture
- Z-index system: `--z-particles: 0`, `--z-content: 10`, `--z-cards: 20`, `--z-navbar: 50`, `--z-modal: 100`
- Glassmorphism utilities in `@layer components` — backdrop-blur-lg (16px) for cards
- `@custom-variant dark (&:where(.dark, .dark *))` defined in globals.css

### Tailwind v4 specific
- Tailwind v4 uses `@theme` directive in CSS (no tailwind.config.js)
- CSS custom properties inside `@theme` become Tailwind utilities automatically
- Dark mode driven by class on `<html>` element (not media query)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/Providers.tsx` — ThemeProvider shell already configured (class-based, dark default, enableSystem=false, disableTransitionOnChange=true). This is the integration point for this phase.
- `src/app/globals.css` — @theme block with existing tokens (--color-primary, --color-surface, --color-surface-light), @custom-variant dark, z-index tokens, glassmorphism utilities. New theme tokens go here.
- `src/app/layout.tsx` — Root layout with suppressHydrationWarning, hardcoded body bg/text. Needs refactoring to use CSS vars.

### Established Patterns
- Tailwind v4 @theme for design tokens — existing pattern to extend, not replace
- "use client" boundary at Providers.tsx — layout.tsx stays Server Component
- CSS custom properties for non-Tailwind values (z-index tokens in :root)
- @layer components for glassmorphism utilities — keeps them separate from Tailwind

### Integration Points
- `layout.tsx` body element — hardcoded bg/text must become theme-reactive
- `globals.css` @theme block — new color tokens added here (bg-surface, bg-surface-light, text-primary, text-secondary, etc.)
- `Providers.tsx` — may need next-themes config adjustment (currently correct for this phase's decisions)
- Navbar toggle component (Phase 3) — theme toggle lives there, but the toggle logic/state is set up in this phase

</code_context>

<specifics>
## Specific Ideas

- Warm cream palette (#faf8f5 body, #f0ece6 variant, #e8e2f0 surface-light) should feel organic and warm, not cold/clinical
- Frosted white glass cards (white/80% + blur) should let the cream background show through subtly
- Toggle should feel like a glassmorphism element — pill-shaped, not a plain button
- "I want the light mode to feel like a warm autumn afternoon — not harsh white" (warm, organic, matches Kazuha wanderer aesthetic)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-theming-providers*
*Context gathered: 2026-03-22*
