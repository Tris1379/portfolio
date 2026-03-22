# Technology Stack

**Project:** Kazuha Vibe Portfolio
**Researched:** 2026-03-22
**Overall confidence:** HIGH

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (latest stable) | React framework, App Router, SSG | Current stable since Oct 2024. App Router is the default. Server Components reduce JS shipped to client. Vercel-native deployment. Better than 14 for new projects — async request APIs, no default fetch caching, React 19 support. |
| React | 19.x | UI library | Next.js 15 ships with React 19. New hooks (`useActionState`, `useFormStatus`), better Server Component support. |

**Confidence:** HIGH — verified with releasebot.io, Next.js docs, and multiple March 2026 sources.

**Note on Next.js 16:** v16.2.1 exists as of March 2026 but is very new. For a portfolio site, stability matters more than bleeding edge. Next.js 15.x is the safe choice. Upgrade later if desired — minimal breaking changes expected for a static portfolio.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (v4.2.2) | Utility-first CSS | Rust-based Oxide engine (5-10x faster builds). CSS-native `@theme` config replaces `tailwind.config.js`. OKLCH color space for wide-gamut displays. Zero-config content detection. Still supports hex colors — the project's "hex only" constraint is compatible. |
| Tailwind typography plugin | Latest | Prose styling | For any long-form content sections. |

**Confidence:** HIGH — verified with tailwindcss.com, GitHub releases (v4.2.2 March 18, 2026), and multiple migration guides.

**Critical v4 migration note:** Tailwind v4 replaces `tailwind.config.js` with `@theme` directives in CSS. The project must use this new config pattern:

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #a8e6cf;
  --color-surface: #0a0a0a;
  /* ... */
}
```

**Dark mode in v4:** Tailwind v4 supports `@media (prefers-color-scheme: dark)` natively, but for a **manual toggle** (dark/light switch), you still need `next-themes` with `attribute="class"` strategy. Tailwind v4 picks up the `.dark` class automatically.

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| motion (Framer Motion) | Latest (`motion/react`) | UI animations, scroll reveals, page transitions | Renamed from `framer-motion` in 2024. Package name is `motion`, import from `motion/react`. 3.6M weekly downloads, 30K+ GitHub stars. Industry standard for React animation. Supports `LazyMotion` to cut bundle from 30KB to 15KB. Requires `"use client"` directive in App Router. |

**Confidence:** HIGH — verified with ogblocks.dev (March 2026), pkgpulse.com (March 2026), and npm registry.

**Installation:** `npm install motion` (not `framer-motion`)
**Import:** `import { motion, AnimatePresence } from "motion/react"`

**Bundle optimization:** Use `LazyMotion` + `domAnimation` features for the portfolio — this cuts the animation bundle roughly in half:

```tsx
"use client";
import { LazyMotion, domAnimation, m } from "motion/react";

// Use <m.div> instead of <motion.div> inside LazyMotion
```

### Particle Effects

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @tsparticles/react | 3.x | React component for particles | Official React binding for tsParticles v3. Latest engine is v3.9.1. |
| @tsparticles/engine | 3.x | Core particle engine | Required peer dependency. |
| @tsparticles/slim | 3.x | Essential preset bundle | Includes most common shapes, movers, and interactions without the full bundle weight. |
| @tsparticles/shape-image | 3.x | Custom image shapes | Needed for maple leaf image particles. |

**Confidence:** HIGH — verified with GitHub releases (v3.9.1 Feb 2026) and npm registry.

**Installation:**
```bash
npm install @tsparticles/react @tsparticles/engine @tsparticles/slim @tsparticles/shape-image
```

**App Router integration pattern:** tsParticles must be a Client Component. Use dynamic import with `ssr: false`:

```tsx
"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function MapleLeaves() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return <Particles id="tsparticles" options={/* maple leaf config */} />;
}
```

**For maple leaf shape:** Use `shape: { type: "image", options: { image: { src: "/maple-leaf.svg" } } }` in the particles config. The `@tsparticles/shape-image` package must be loaded.

### i18n

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-intl | 4.x | Internationalization (vi/en) | THE standard for Next.js App Router i18n in 2026. 457B bundle (tiny). Works in Server AND Client Components. Built-in middleware for locale routing. TypeScript-checked translation keys. v4 confirmed compatible with Next.js 16. |

**Confidence:** HIGH — verified with nextjslaunchpad.com (Feb 2026), 32blog.com (March 2026), intlpull.com (Feb 2026), and dev.to comparison.

**Installation:** `npm install next-intl`

**Why next-intl over alternatives:**
- **vs react-i18next** (~6KB, 8KB): Designed for Pages Router. Requires Context Provider. Doesn't work natively in Server Components. Overkill for a 2-language portfolio.
- **vs paraglide-next**: Type-safe but newer, smaller community. Higher risk.
- **vs better-i18n**: Cloud-managed (overkill for static portfolio), requires external service.

**Architecture:**
```
messages/
  en.json
  vi.json
src/
  i18n/
    routing.ts
    request.ts
  middleware.ts
  app/
    [locale]/
      layout.tsx
      page.tsx
```

### Theme Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-themes | 0.4.6 | Dark/light theme toggle | Industry standard for Next.js dark mode. Works with App Router. Handles SSR hydration mismatch. Supports `attribute="class"` for Tailwind v4's `.dark` class strategy. System preference detection. |

**Confidence:** HIGH — verified with npm (v0.4.6), sujalvanjare.com (Jan 2026), and medium.com (Jan 2026).

**Installation:** `npm install next-themes`

**Tailwind v4 + next-themes setup:**
```css
/* globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

**Layout setup:**
```tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Icons

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| lucide-react | Latest | Icon library | Modern, tree-shakeable, consistent stroke-style icons. Pairs beautifully with glassmorphism. 1000+ icons. Better aesthetics than react-icons for the Kazuha theme. |

**Confidence:** MEDIUM — widely used, but didn't verify exact version.

**Alternative:** `react-icons` — broader icon set (Font Awesome, Material, etc.) but less cohesive visual style.

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font/google | Built-in | Font loading | Zero layout shift, self-hosted, no Google Fonts privacy concerns. Built into Next.js. |

**Recommended fonts for Kazuha aesthetic:**
- **Display:** Playfair Display or Cormorant Garamond (elegant serif for headings)
- **Body:** Inter or Geist (clean sans-serif)

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting, CI/CD | Native Next.js support. Automatic deploys from GitHub. Edge network. Free tier sufficient for portfolio. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Astro 5 | Astro is great for static content but lacks React ecosystem depth. Portfolio needs Framer Motion/React patterns. |
| Framework | Next.js 15 | Remix | More complex setup for a static portfolio. No advantage over Next.js for SSG. |
| Styling | Tailwind v4 | CSS Modules | Less DX, more boilerplate. No utility-first speed. |
| Styling | Tailwind v4 | Styled Components | Runtime CSS-in-JS. Worse performance. Declining ecosystem. |
| Animation | motion (Framer) | AutoAnimate | Too simple — no scroll-triggered animations, no spring physics, no layout animations. |
| Animation | motion (Framer) | Motion One | Smaller (3.8KB) but limited React integration. motion/react is the standard. |
| i18n | next-intl | react-i18next | Context-based, doesn't work natively in Server Components. Heavier bundle. |
| i18n | next-intl | paraglide-next | Newer, smaller community, less battle-tested. |
| Theme | next-themes | Manual CSS | Reimplements what next-themes solves perfectly. SSR hydration issues. |
| Icons | lucide-react | react-icons | Less visual cohesion. lucide's stroke style matches glassmorphism better. |
| Particles | tsParticles v3 | Custom Canvas | Massive dev time for physics, interactivity, device detection. tsParticles is battle-tested. |
| Particles | tsParticles v3 | react-particles-webgl | Overkill for 2D leaf particles. WebGL adds complexity without benefit here. |

## Full Install Command

```bash
# Core
npm install next@latest react@latest react-dom@latest

# Styling
npm install tailwindcss@latest

# Animation
npm install motion

# Particles
npm install @tsparticles/react @tsparticles/engine @tsparticles/slim @tsparticles/shape-image

# i18n
npm install next-intl

# Theme
npm install next-themes

# Icons
npm install lucide-react

# Dev dependencies
npm install -D typescript @types/react @types/node
```

## Known Pitfalls for This Stack

1. **"use client" boundaries:** motion, @tsparticles/react, next-themes all require client components. Keep them isolated — don't wrap entire pages in `"use client"`.

2. **Tailwind v4 + next-themes:** Must add `@custom-variant dark (&:where(.dark, .dark *));` to globals.css for class-based dark mode.

3. **tsParticles SSR:** Must use `initParticlesEngine` pattern with `useState` guard — particles crash during SSR if loaded eagerly.

4. **Framer Motion import:** Use `import { motion } from "motion/react"` NOT `from "framer-motion"`. The old import path may still work but is deprecated.

5. **next-intl routing:** All pages must live under `app/[locale]/` — not `app/`. The middleware handles default locale redirects.

6. **Tailwind v4 config:** Theme config goes in CSS `@theme {}` block, not `tailwind.config.js`. The old JS config file is no longer used.

## Sources

- Next.js release notes: https://github.com/vercel/next.js/releases/tag/v16.2.1 (March 2026)
- Next.js stable version: https://www.abhs.in/blog/nextjs-current-version-march-2026 (March 2026)
- Tailwind v4.2.2: https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.2.2 (March 2026)
- Tailwind v4 migration: https://dev.to/pockit_tools/tailwind-css-v4-migration-guide (Jan 2026)
- tsParticles v3.9.1: https://github.com/matteobruni/tsparticles/releases (Feb 2026)
- Framer Motion → Motion rename: https://www.pkgpulse.com/blog/framer-motion-vs-motion-one-vs-autoanimate-2026 (March 2026)
- next-intl App Router guide: https://nextjslaunchpad.com/article/nextjs-internationalization-next-intl-app-router-i18n-guide (Feb 2026)
- i18n library comparison: https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f
- next-themes + Tailwind v4: https://www.sujalvanjare.com/blog/how-to-add-dark-mode-toggle-in-next-js-using-next-themes (Jan 2026)
- Framer Motion + Next.js: https://ogblocks.dev/blog/framer-motion-next-js (March 2026)
