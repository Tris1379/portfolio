# Architecture Patterns

**Domain:** Personal portfolio (Next.js 15 App Router, glassmorphism, particles, theming, i18n)
**Researched:** 2026-03-22

## Recommended Architecture

### High-Level Component Tree

```
app/
├── layout.tsx              # Server Component — root layout
│   ├── <html lang={locale}>  ← i18n sets lang
│   ├── <Providers>           ← Client Component shell
│   │   ├── <ThemeProvider>   ← next-themes (class-based)
│   │   ├── <I18nProvider>    ← next-intl or custom
│   │   └── {children}
│   ├── <ParticlesBackground> ← Client Component (dynamic import)
│   └── <Navbar>              ← Client Component (theme toggle, lang switch)
└── page.tsx                # Server Component — home page
    └── <SectionRenderer>     ← Reads site.ts, maps sections
```

### The Core Constraint: Server/Client Boundary

In Next.js 15 App Router, **everything is a Server Component by default**. The architecture is defined by what must become a Client Component (`"use client"`) and why.

**Server Components** (no JS shipped to browser):
- `layout.tsx` — shell structure, metadata
- `page.tsx` — reads `site.ts`, passes data down
- Section wrappers (`StorySection`, `ArsenalSection`, etc.) — render static content
- Glassmorphism cards that display data only (no interactivity)

**Client Components** (JS shipped to browser):
- `ThemeProvider` — needs `useState`, `useEffect`, `localStorage`
- `I18nProvider` — needs `useState`, locale context
- `Navbar` — has theme toggle button, language switcher (event handlers)
- `ThemeToggle` — `onClick`, reads current theme
- `LanguageSwitcher` — `onClick`, changes locale
- `ParticlesBackground` — uses `window`/`document`, canvas API
- `GlassCard` (if hover effects) — `onMouseEnter`/`onMouseLeave` for parallax

## Component Boundaries

| Component | Type | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `layout.tsx` | Server | Root HTML shell, imports globals | `Providers` |
| `Providers` | Client | Composes ThemeProvider + I18nProvider | `ThemeProvider`, `I18nProvider` |
| `ThemeProvider` | Client | Manages dark/light state via next-themes | `ThemeToggle`, all `dark:` classes |
| `I18nProvider` | Client | Manages locale state, loads translations | `LanguageSwitcher`, `useTranslations()` |
| `Navbar` | Client | Fixed nav bar, glassmorphism, holds toggles | `ThemeToggle`, `LanguageSwitcher` |
| `ThemeToggle` | Client | Button to switch dark/light | `ThemeProvider` (via `useTheme()`) |
| `LanguageSwitcher` | Client | Button/menu to switch vi/en | `I18nProvider` (via context) |
| `ParticlesBackground` | Client | Canvas-based maple leaf animation | None (reads config props) |
| `page.tsx` | Server | Imports `site.ts`, renders sections | Section components |
| `SectionRenderer` | Server | Maps section config → components | `site.ts`, section components |
| `StorySection` | Server | Renders "Story" section content | `site.ts` data |
| `ArsenalSection` | Server | Renders skills grid | `site.ts` data |
| `GallerySection` | Server | Renders project gallery | `site.ts` data |
| `ValuesSection` | Server | Renders personal values | `site.ts` data |
| `GlassCard` | Mixed | Reusable glassmorphism card wrapper | Children (server or client) |
| `SocialLinks` | Server/Client | GitHub, LinkedIn, Email links | `site.ts` data |

## Data Flow

```
site.ts (static config)
  │
  ▼
page.tsx (Server Component — imports config)
  │
  ├──► SectionRenderer
  │       ├──► StorySection    ← receives story data as props
  │       ├──► ArsenalSection  ← receives skills as props
  │       ├──► GallerySection  ← receives projects as props
  │       └──► ValuesSection   ← receives values as props
  │
  └──► Navbar (Client)
          ├──► ThemeToggle     ──► ThemeProvider (context) ──► <html class="dark">
          └──► LanguageSwitcher ──► I18nProvider (context) ──► [locale]/ route + messages
```

### Key data flow rules:
1. **`site.ts` → Server Components**: Direct import. No API calls. Data is static at build time.
2. **`site.ts` is NOT imported by Client Components**: Server Components read it and pass serializable props down.
3. **Theme state flows down via context**: `ThemeProvider` → all components via `useTheme()` hook. Tailwind's `dark:` prefix reads the `class` on `<html>`.
4. **i18n state flows down via context**: `I18nProvider` → components via `useTranslations()` hook. Translation JSON loaded per-locale.
5. **Particles receive props, not context**: `ParticlesBackground` receives particle config as props from the server component parent. It manages its own canvas internally.

## Patterns to Follow

### Pattern 1: Client Component Composition Shell
**What:** A thin `"use client"` wrapper component that composes all context providers.
**When:** Root layout needs multiple providers but must stay a Server Component.
**Why:** `layout.tsx` should remain a Server Component for metadata/SEO. Providers need client state.

```tsx
// src/components/Providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'
import { I18nProvider } from '@/providers/i18n-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <I18nProvider>
        {children}
      </I18nProvider>
    </ThemeProvider>
  )
}
```

```tsx
// app/layout.tsx (Server Component)
import { Providers } from '@/components/Providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

**Confidence:** HIGH — confirmed by next-themes docs and multiple 2026 production guides.

### Pattern 2: Dynamic Import for Client-Only Libraries
**What:** Use `next/dynamic` with `ssr: false` for tsParticles (requires `window`/`document`).
**When:** Library cannot run on server (browser APIs, canvas).
**Why:** Prevents SSR errors, reduces initial bundle, lazy-loads heavy code.

```tsx
// src/components/MapleLeaves.tsx — Client Component
"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadImageShape } from "@tsparticles/shape-image";
import { useEffect, useState } from "react";
import { mapleLeafOptions } from "@/lib/particles-config";

export default function MapleLeaves() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadImageShape(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles id="maple-leaves" options={mapleLeafOptions} />
    </div>
  );
}
```

```tsx
// Usage in layout or page (Server Component can import dynamic)
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(
  () => import('@/components/ParticlesBackground'),
  { ssr: false }
)
```

**Confidence:** HIGH — standard pattern for canvas-based libraries in Next.js. `ssr: false` is required because tsParticles accesses `window` during initialization.

### Pattern 3: Centralized Config with Type Safety
**What:** Single `site.ts` file exports all content as typed objects. Components consume via props.
**When:** Static portfolio with no backend. Owner edits one file to update content.
**Why:** Separates content from presentation. Non-technical owner can update without understanding components.

```tsx
// src/config/site.ts
export const siteConfig = {
  name: 'Kazuha',
  title: 'Information Security Professional',
  description: '...',
  social: {
    github: 'https://github.com/...',
    linkedin: 'https://linkedin.com/in/...',
    email: 'mailto:...',
  },
  sections: {
    story: { /* ... */ },
    arsenal: { skills: [/* ... */] },
    gallery: { projects: [/* ... */] },
    values: { items: [/* ... */] },
  },
  i18n: {
    en: { /* English translations */ },
    vi: { /* Vietnamese translations */ },
  },
  particles: {
    // tsParticles config overrides
  },
} as const
```

**Confidence:** HIGH — this is a deliberate architectural choice from PROJECT.md constraints.

### Pattern 4: Glassmorphism as Utility Classes (Not Components)
**What:** Glassmorphism defined as Tailwind utility combinations, applied via className.
**When:** Glass effect needed on cards, navbar, overlays.
**Why:** `backdrop-blur` is pure CSS. No JavaScript needed. Works with Tailwind's `dark:` variant.

```css
/* globals.css — Tailwind v4 */
@import "tailwindcss";

@theme {
  --color-primary: #a8e6cf;
  --color-surface: #0a0a0a;
  --color-surface-light: #1a1a2e;
}

/* Dark mode class variant for next-themes */
@custom-variant dark (&:where(.dark, .dark *));

@layer components {
  .glass {
    @apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl;
  }
  .glass-dark {
    @apply bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl;
  }
}
```

**Critical pitfall:** `backdrop-filter` requires `pointer-events-none` on the particle layer behind it, and `pointer-events-auto` on the glass element itself. Otherwise click targets break.

**Confidence:** HIGH — confirmed by glassmorphism CSS guides and Tailwind docs.

### Pattern 5: i18n with Locale-Prefixed Routes
**What:** Use `next-intl` with `[locale]` dynamic segment for Vietnamese/English.
**When:** 2+ languages, need SEO-friendly URLs.
**Why:** App Router dropped the `i18n` config from Pages Router. `next-intl` is the current standard.

```
app/
├── [locale]/
│   ├── layout.tsx       # Sets up NextIntlClientProvider
│   ├── page.tsx         # Home page (locale-aware)
│   └── ...
├── layout.tsx           # Root layout (no locale)
```

```tsx
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
}
```

**Confidence:** HIGH — `next-intl` v4 is the recommended approach per multiple 2026 guides. It supports both Server and Client Components.

### Pattern 6: Device-Aware Particle Performance
**What:** Detect device capability and adjust particle count/responsiveness.
**When:** Mobile devices can't handle 50+ canvas particles at 60fps.
**Why:** PROJECT.md mandates 60fps on mobile. Must auto-adjust.

```tsx
// In ParticlesBackground.tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

const particleOptions = {
  particles: {
    number: {
      value: isMobile ? 15 : 40, // Fewer particles on mobile
    },
    // ...
  },
}
```

**Confidence:** MEDIUM — common pattern but implementation varies. The `window.innerWidth` check must happen client-side only.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Making layout.tsx a Client Component
**What:** Adding `"use client"` to `layout.tsx` to use hooks.
**Why bad:** Forces ALL child routes to be client-rendered. Kills Server Component benefits for every page. Breaks metadata API.
**Instead:** Create a `Providers.tsx` client component and import it in the server layout.

### Anti-Pattern 2: Importing site.ts in Client Components
**What:** Client Components directly importing `site.ts` config.
**Why bad:** The entire config (including functions, large objects) gets serialized into the client bundle. Bloats JS payload.
**Instead:** Server Components read `site.ts` and pass only the needed data as serializable props to Client Components.

### Anti-Pattern 3: Hardcoding text in components
**What:** Writing `<h2>My Skills</h2>` directly in JSX.
**Why bad:** Violates the "zero hardcoded text" constraint. Makes i18n impossible. Owner can't edit content without touching UI code.
**Instead:** `<h2>{t('arsenal.title')}</h2>` or `<h2>{sectionData.title}</h2>`

### Anti-Pattern 4: Using SSR for tsParticles
**What:** Importing `react-tsparticles` without `next/dynamic` + `ssr: false`.
**Why bad:** tsParticles accesses `window` and `document` during initialization. SSR will throw `ReferenceError: window is not defined`.
**Instead:** Always use `dynamic(() => import('...'), { ssr: false })`

### Anti-Pattern 5: Glassmorphism without pointer-events management
**What:** Overlaying a glass element on particles without handling pointer events.
**Why bad:** The glass overlay blocks all clicks on content beneath it. Users can't interact with links or buttons.
**Instead:** Particle container gets `pointer-events-none`. Glass elements get `pointer-events-auto`. Test clicking through layers.

### Anti-Pattern 6: Flat translation key structure
**What:** Using flat keys like `{ "hero_title": "...", "hero_subtitle": "..." }`.
**Why bad:** Unmanageable at scale. Namespace collisions. Hard to organize by section.
**Instead:** Nested objects: `{ "hero": { "title": "...", "subtitle": "..." } }` — `next-intl` accesses as `t('hero.title')`.

## Scalability Considerations

| Concern | Current Scale (1 page) | If Scaled (multi-page) |
|---------|----------------------|----------------------|
| Routing | Single `page.tsx` | `[locale]/[section]/page.tsx` with App Router |
| Data | Single `site.ts` | Split into per-section config files, merged at import |
| Translations | Single JSON per locale | Namespace-based loading (e.g., `common.json`, `home.json`) |
| Components | ~15 components | Feature-based folders: `sections/`, `ui/`, `layout/` |
| Theming | 2 themes (dark/light) | CSS custom properties for unlimited variants |
| Particles | 1 background layer | Multiple particle configs per section |

## Suggested Build Order (Dependencies)

The architecture reveals these dependency chains that inform phase ordering:

```
Phase 1: Foundation (no dependencies)
├── tailwind.config.ts setup (darkMode: 'class')
├── globals.css (glassmorphism utilities, CSS variables)
├── src/config/site.ts (data structure)
└── app/layout.tsx (root shell)

Phase 2: Theming (depends on Phase 1)
├── Providers.tsx (client shell)
├── ThemeProvider (next-themes integration)
├── ThemeToggle component
└── Verify dark: classes work throughout

Phase 3: Content Sections (depends on Phase 1)
├── SectionRenderer (reads site.ts)
├── StorySection, ArsenalSection, GallerySection, ValuesSection
├── GlassCard component
└── SocialLinks component

Phase 4: i18n (depends on Phase 1, 2)
├── [locale] route structure
├── middleware.ts (locale detection/redirect)
├── I18nProvider + translation loading
├── LanguageSwitcher component
└── Migrate hardcoded text → translations

Phase 5: Particles (depends on Phase 1)
├── ParticlesBackground.tsx (client component)
├── Dynamic import in layout
├── Maple leaf config (particle shape, animation)
├── Device-aware performance tuning
└── pointer-events layer management

Phase 6: Polish (depends on all above)
├── Framer Motion animations on sections
├── Responsive design (mobile breakpoints)
├── z-index layering verification
├── Performance audit (60fps check)
└── Build verification (npm run build)
```

### Build order rationale:
1. **Foundation first** — Tailwind + CSS + data config are prerequisites for everything
2. **Theming before content** — Dark mode classes need to be in place when components are built
3. **Content before i18n** — Build sections with hardcoded text first, then internationalize
4. **Particles last (of core features)** — Independent of other systems, but needs z-index awareness
5. **Polish always last** — Animations, responsive tweaks, and performance are refinement

### Key dependency insight:
Theming and i18n are **cross-cutting concerns** that touch every component. Building them early (Phases 2 and 4) prevents expensive refactoring later. The worst ordering mistake would be building all content first, then retrofitting i18n — every text string would need to be extracted.

## Sources

- [Next.js App Router Architecture — Feature-Sliced Design (2026-01)](https://feature-sliced.design/vi/blog/nextjs-app-router-guide) — Server/Client boundary patterns
- [Next.js Portfolio Architecture — Paria Heidari (2026-03)](https://medium.com/@paria-heidari/next-js-portfolio-architecture-modular-scalable-and-maintainable-7a92437bef8a) — Portfolio-specific folder structure
- [next-intl v4 Setup Guide — 32blog (2026-03)](https://32blog.com/en/nextjs/nextjs-i18n-next-intl-setup-guide) — i18n routing with [locale] pattern
- [Next.js Dark Mode — Easton Dev (2025-12)](https://eastondev.com/blog/en/posts/dev/20251220-nextjs-dark-mode-guide/) — next-themes integration, FOUC prevention
- [CSS Glassmorphism Guide — Nine Hub (2026-02)](https://nineproo.com/blog/css-glassmorphism-guide/) — backdrop-filter rendering, CSS custom properties
- [React Server Components pitfalls — LogRocket (2026-02)](https://blog.logrocket.com/react-server-components-performance-mistakes/) — Over-hydration, client boundary placement
- [Next.js 15 Folder Structure — Groovy Web (2026-02)](https://www.groovyweb.co/blog/nextjs-project-structure-full-stack) — Production folder organization
