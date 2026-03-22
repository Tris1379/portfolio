# Kazuha Vibe Portfolio

## What This Is

A personal portfolio website for an Information Security professional, themed around the "Kazuha" aesthetic — wind, falling maple leaves, wanderer vibes. The site showcases skills, projects, and personal identity through a dark, elegant glassmorphism UI with particle effects. Targets technical recruiters and hiring managers in the cybersecurity field.

## Core Value

Deliver a polished, technically impressive portfolio that demonstrates frontend engineering competence while authentically representing the owner's professional identity in Information Security.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Centralized data architecture — all text, images, and config managed via `src/config/site.ts`
- [ ] Glassmorphism UI with card-based layout, responsive on PC and Mobile
- [ ] tsParticles maple leaf falling effect with device-aware performance tuning
- [ ] i18n support (Vietnamese / English)
- [ ] Dark/Light theme toggle with smooth transitions
- [ ] Navbar with fixed positioning, high z-index, glassmorphism style
- [ ] Sections: Story, Arsenal (skills), Gallery, Values
- [ ] Social links: GitHub, LinkedIn, Email
- [ ] Vercel-ready deployment with clean build

### Out of Scope

- Backend / server-side logic — static portfolio only
- Authentication or user accounts — public-facing read-only site
- CMS integration — content managed via config file
- Blog functionality — focus on portfolio presentation

## Context

- **Domain:** Personal portfolio website for Information Security professional
- **Tech stack:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, tsParticles v3
- **Deployment target:** Vercel with automatic deploys from main branch
- **Design language:** Dark mode default (#0a0a0a), pastel green accent (#a8e6cf), glassmorphism cards, maple leaf particle effects
- **Constraints:** Tailwind uses hex colors only (no HSL), tsParticles v3 syntax, high z-index for navbar
- **Quality bar:** 60fps animations, perfect responsive design, zero ESLint/TypeScript errors on build

## Constraints

- **Tech Stack:** Next.js 14 App Router, Tailwind CSS, Framer Motion, tsParticles v3
- **Performance:** 60fps on mobile — particle count must auto-adjust per device
- **Data Architecture:** Zero hardcoded text in components — everything via site.ts config
- **Build:** Must pass `npm run build` with no errors for Vercel deployment
- **Compatibility:** Responsive across PC and Mobile with pointer-events handling for glassmorphism layers

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Centralized site.ts config | Owner can update content without touching UI code | — Pending |
| tsParticles for effects | Industry standard for performant particle animations | — Pending |
| Next.js App Router | Modern routing, server components, Vercel native | — Pending |
| 4-phase execution plan | Prevents context window overflow during AI implementation | — Pending |

---
*Last updated: 2025-03-22 after initialization*
