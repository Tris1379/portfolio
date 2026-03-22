# Domain Pitfalls: Next.js Portfolio with tsParticles + Glassmorphism

**Domain:** Personal portfolio — tsParticles v3, glassmorphism UI, Motion (Framer Motion), Next.js 15 App Router
**Researched:** 2026-03-22
**Confidence:** HIGH (verified against GitHub issues, official docs, and current web sources)

---

## Critical Pitfalls

Mistakes that cause rewrites, broken interactions, or deployment failures.

---

### Pitfall 1: tsParticles Canvas Blocks All Click Events

**What goes wrong:** The `<canvas>` element tsParticles renders covers the entire viewport and intercepts all pointer events. Buttons, links, and interactive elements beneath the particle layer become unclickable. This was a confirmed regression in tsParticles 3.8.0 (GitHub issue #5465) and existed intermittently in 3.7.1.

**Why it happens:** tsParticles renders a full-screen `<canvas>` for particle animation. Browsers treat canvas elements as opaque by default for pointer events unless explicitly told otherwise. The canvas sits above your content in the stacking order and captures all clicks.

**Consequences:** Every link, button, and form on the site becomes non-functional. The site looks beautiful but is completely unusable.

**Prevention:**
```css
/* ALWAYS add this for tsParticles canvas */
#tsparticles canvas,
.tsParticles canvas {
  pointer-events: none;
}
```
Or in the tsParticles config, set `interactivity.detectsOn: "window"` to route events through the window instead of the canvas.

**Detection:** Click any button or link on the page. If nothing happens, the canvas is blocking events.

**Phase:** Phase 1 (Foundation) — configure during initial tsParticles setup.

**Confidence:** HIGH — confirmed bug in GitHub issue #5465, fix merged in tsParticles 3.9.0. Workaround CSS is universally recommended.

---

### Pitfall 2: Glassmorphism `backdrop-filter` Creates New Stacking Contexts

**What goes wrong:** CSS `backdrop-filter` (the core of glassmorphism) creates a new stacking context. Any child element with `z-index` is trapped inside this context and cannot escape above sibling elements that exist in a parent stacking context — even with `z-index: 99999`.

**Why it happens:** Per the CSS specification, `backdrop-filter`, `filter`, `transform`, `opacity < 1`, and `position: fixed/sticky` all create new stacking contexts. Glassmorphism requires `backdrop-filter: blur()`, which means every glass card becomes an isolated stacking island.

**Consequences:**
- Modals/dropdowns inside glass cards render behind sibling glass cards
- Fixed navbar with glassmorphism may trap its children below page content
- Tooltip/popover components fail to appear above surrounding elements
- `z-index` values feel "broken" because they only work within their stacking context

**Prevention:**
1. **Plan your z-index hierarchy explicitly.** Define a CSS custom property system:
   ```css
   :root {
     --z-particles: 0;
     --z-content: 10;
     --z-cards: 20;
     --z-navbar: 50;
     --z-modal: 100;
     --z-tooltip: 110;
   }
   ```
2. **Avoid nesting glassmorphic elements.** Glass-on-glass stacking reduces readability AND creates nested stacking contexts.
3. **Keep the navbar as a top-level element** in the DOM, not nested inside a layout container that creates its own stacking context.
4. **Use `isolation: isolate`** explicitly on glass cards to make stacking context behavior intentional and debuggable.

**Detection:** Open browser DevTools, inspect the z-index chain. If a `z-index: 9999` element appears behind another element, a parent stacking context is trapping it.

**Phase:** Phase 1 (Foundation) — establish the z-index architecture before building any components.

**Confidence:** HIGH — extensively documented in Smashing Magazine (Jan 2026), CSS specifications, and multiple developer guides.

---

### Pitfall 3: Dark/Light Theme Flash on Page Load (FOUC)

**What goes wrong:** When a user refreshes the page, it briefly appears in the wrong theme (usually light) before snapping to the correct dark theme. This is called FOUC — Flash of Unstyled Content.

**Why it happens:** Next.js renders HTML on the server. The server doesn't have access to `localStorage` or `window.matchMedia`, so it renders the default theme. The browser paints this HTML. Then JavaScript loads, reads the user's preference from localStorage, and applies the correct theme. That gap between first paint and JS execution is the flash.

**Consequences:**
- Jarring visual flicker on every page load
- Poor user experience, especially for users who chose dark mode for eye comfort
- Potential hydration mismatch warnings in the console

**Prevention:** Use `next-themes` (recommended, ~1KB, zero dependencies) or an inline script approach:

**Option A — next-themes (recommended):**
```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Option B — Inline script (zero dependencies):**
```tsx
const themeScript = `
  (function() {
    try {
      const stored = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored ? stored : (systemDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.add(theme);
    } catch(e) {}
  })();
`;
// Inject in <head> before body paint
```

**Additional requirements:**
- Set Tailwind's `darkMode: 'class'` in `tailwind.config.js`
- Add `suppressHydrationWarning` to `<html>` tag
- Theme toggle buttons must check `mounted` state before rendering to avoid hydration mismatch
- Use `disableTransitionOnChange` to prevent theme transition animation on page load

**Detection:** Hard-refresh the page. If you see a brief flash of the wrong theme, you have FOUC.

**Phase:** Phase 1 (Foundation) — set up theme infrastructure before building any UI components.

**Confidence:** HIGH — universal problem with Next.js SSR + client-side theming. `next-themes` is the community standard solution with 6K+ GitHub stars.

---

### Pitfall 4: tsParticles + Next.js SSR Hydration Failure

**What goes wrong:** tsParticles uses `window`, `document`, and canvas APIs that don't exist during server-side rendering. Importing tsParticles directly in a component causes hydration errors: `Error: Hydration failed because the initial UI does not match what was rendered on the server`.

**Why it happens:** tsParticles renders a `<canvas>` element and manipulates the DOM directly. During SSR, Next.js tries to render the component on the server (Node.js, no DOM). The server output doesn't match what the client generates, causing React to throw a hydration mismatch.

**Prevention:**
```tsx
// components/ParticleBackground.tsx
import dynamic from 'next/dynamic';

// NEVER import tsParticles at the top level of a page component
const Particles = dynamic(
  () => import('@tsparticles/react').then(mod => mod.default),
  { ssr: false, loading: () => null }
);
```

Or create a NoSSR wrapper:
```tsx
// components/NoSSR.tsx
import dynamic from 'next/dynamic';

const NoSSR = ({ children }) => <>{children}</>;
export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
```

**Critical:** Use `dynamic(() => import(...), { ssr: false })` for ALL tsParticles-related components. Never import `@tsparticles/react`, `@tsparticles/engine`, or `@tsparticles/slim` in a server component or at the page level.

**Detection:** Console shows hydration mismatch warnings. Particles may flash or not appear on initial load.

**Phase:** Phase 2 (Particles) — apply during tsParticles integration.

**Confidence:** HIGH — documented in tsParticles discussions and multiple Next.js guides. The `ssr: false` pattern is the standard solution.

---

### Pitfall 5: Motion (Framer Motion) Package Name and Import Path

**What goes wrong:** Using `import { motion } from "framer-motion"` — the old package name. Or installing `framer-motion` instead of `motion`.

**Why it happens:** Framer Motion was renamed to "Motion" in 2024. The package is now `motion` with the import path `motion/react`. All existing tutorials and AI training data reference the old `framer-motion` package and import path.

**Consequences:** The old `framer-motion` package may still work (backwards compat) but is deprecated. Build warnings. Will eventually break. Confusing for maintainers.

**Known build issue:** `motion` versions 12.18.2–12.23.x have a known build failure with Next.js App Router due to `export *` patterns in client boundaries (GitHub issue #3211). Pin to ≤ 12.18.1 or use 13.0.0+.

**Prevention:**
```bash
# Install motion (NOT framer-motion)
npm install motion
```
```tsx
// Import from motion/react (NOT framer-motion)
import { motion, AnimatePresence } from "motion/react";
```

**Version matrix (verified from GitHub issue #3211):**
| Version | Status |
|---------|--------|
| ≤ 12.18.1 | Works |
| 12.18.2 – 12.23.x | Broken (export * issue) |
| 13.0.0+ | Fixed |

**Detection:** Deprecation warnings in console. Package.json shows wrong dependency. `npm run build` fails with "export *" error.

**Phase:** Phase 1 (Foundation) — check during initial dependency installation.

**Confidence:** HIGH — confirmed in GitHub issue motion#3211, with 14+ affected developers. Package rename verified with pkgpulse.com (March 2026) and ogblocks.dev (March 2026).

---

### Pitfall 6: Framer Motion Animating Layout Properties Instead of Transforms

**What goes wrong:** Animations feel janky, drop below 60fps, and cause layout shifts (CLS). This is especially devastating on mobile devices where GPU resources are limited.

**Why it happens:** Animating `width`, `height`, `top`, `left`, `margin`, or `padding` triggers the browser's layout engine on every frame. These properties force the browser to recalculate the entire page layout (reflow), which is extremely expensive. In contrast, `transform` and `opacity` are handled by the GPU's compositor thread and never trigger layout.

**Consequences:**
- Dropped frames, visible stutter on scroll and interaction
- High CLS scores, hurting Core Web Vitals
- Poor mobile experience (budget devices may drop to 15fps)
- Battery drain on mobile devices

**Prevention:**
```tsx
// BAD — triggers layout on every frame
<motion.div animate={{ width: 200, height: 100, top: 50 }} />

// GOOD — GPU-composited, zero layout cost
<motion.div animate={{ scaleX: 2, scaleY: 1, y: 50 }} />

// GOOD — opacity changes are free
<motion.div animate={{ opacity: 0.5 }} />
```

**Rules:**
- Use `x`/`y` instead of `left`/`top`/`right`/`bottom`
- Use `scaleX`/`scaleY` instead of `width`/`height`
- Use `opacity` for fade effects
- Use `rotate` for rotation (GPU-composited)
- NEVER animate `margin`, `padding`, `flex`, or `grid-gap`
- Use the `layout` prop sparingly — it uses `getBoundingClientRect()` internally

**Phase:** Phase 3 (Animations) — enforce during all animation implementation.

**Confidence:** HIGH — documented in Motion.dev official docs, multiple performance guides, and Core Web Vitals documentation.

---

## Moderate Pitfalls

Issues that degrade UX but don't break the site.

---

### Pitfall 7: Glassmorphism Text Contrast Fails WCAG

**What goes wrong:** Text on glassmorphic cards becomes unreadable, especially over colorful or dynamic backgrounds. Fails WCAG 2.2 minimum contrast ratios (4.5:1 for body text, 3:1 for large text).

**Why it happens:** Glassmorphism uses `background: rgba(255,255,255, 0.08-0.2)` — very transparent backgrounds. When layered over a busy or light background, the blur isn't enough to create sufficient contrast for white text.

**Prevention:**
1. **Add a semi-opaque overlay behind text on glass cards:**
   ```css
   .glass-card {
     background: rgba(0, 0, 0, 0.4); /* Darker base for dark theme */
     backdrop-filter: blur(12px);
     border: 1px solid rgba(255, 255, 255, 0.12);
   }
   ```
2. **Use slightly off-white text** (`#E9ECF1` instead of `#FFFFFF`) — reduces glare while maintaining contrast
3. **Test with WebAIM Contrast Checker** against your actual background
4. **For dark theme:** Use dark-tinted glass (`rgba(10, 10, 10, 0.6)`) rather than light-tinted glass
5. **Respect `prefers-reduced-transparency`** media query for users who need solid backgrounds

**Detection:** Run Lighthouse accessibility audit. Check for contrast ratio failures.

**Phase:** Phase 1 (Foundation) — set glass color tokens during design system setup.

**Confidence:** HIGH — extensively documented in accessibility research. AxessLab, New Target, and WCAG 2.2 guidelines all identify this as a primary glassmorphism risk.

---

### Pitfall 8: tsParticles Image Shape Requires Explicit Plugin Loading

**What goes wrong:** Setting `shape.type: "image"` with a maple leaf SVG/PNG doesn't render. Particles appear as circles or don't appear at all.

**Why it happens:** tsParticles v3 uses a modular architecture. The image shape is NOT included in the slim bundle — it requires the `@tsparticles/shape-image` package and explicit loading via `loadImageShape(tsParticles)`.

**Prevention:**
```tsx
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadImageShape } from "@tsparticles/shape-image";

// During initialization:
await initParticlesEngine(async (engine) => {
  await loadSlim(engine);
  await loadImageShape(engine); // REQUIRED for image shapes
});
```

Config:
```ts
shape: {
  type: "image",
  image: {
    src: "/maple-leaf.svg",  // Must be in public/ folder
    width: 32,
    height: 32,
    replaceColor: false,  // Set true to tint with particle color
  }
}
```

**Additional gotchas:**
- Image path must be accessible (put in `public/` folder)
- Large images (500x500+) kill performance — use optimized SVGs or small PNGs (32-64px)
- `replaceColor: true` only works with SVG, not PNG/JPG
- If using presets (like `links`), ensure preset version matches engine version — mismatched versions cause `assertValidVersion` errors

**Phase:** Phase 2 (Particles) — configure during tsParticles setup.

**Confidence:** HIGH — documented in `@tsparticles/shape-image` npm package README. Multiple Stack Overflow questions confirm this pitfall.

---

### Pitfall 9: Particle Count Not Adjusted for Mobile Devices

**What goes wrong:** 100+ particles with 60fps animation on a mobile device causes stuttering, battery drain, and potential browser tab crashes. The site becomes unusable on budget Android phones.

**Why it happens:** Desktop GPUs easily handle 100+ animated particles. Mobile GPUs (especially on budget devices) have a fraction of the compute power. Each particle requires per-frame position calculation, alpha blending, and canvas redraw.

**Prevention:**
```ts
const isMobile = typeof window !== 'undefined' &&
  ('ontouchstart' in window || window.innerWidth < 768);

const particleOptions = {
  particles: {
    number: {
      value: isMobile ? 20 : 50,  // Reduce on mobile
    },
    move: {
      speed: isMobile ? 1 : 2,    // Slower = fewer calculations
    },
  },
  fpsLimit: isMobile ? 30 : 60,   // Lower FPS target on mobile
  interactivity: {
    events: {
      onHover: { enable: !isMobile },  // Disable hover on touch
      onClick: { enable: !isMobile },  // Disable click spawning on mobile
    },
  },
  retina_detect: false,  // Disable on mobile — doubles pixel count
};
```

**Also consider:**
- Use `density.enable: true` with `density.area: 800` to auto-scale particles to screen size
- For image shapes: smaller images = better performance (32x32 max on mobile)
- Monitor with `fpsLimit: 60` and Chrome DevTools Performance tab

**Detection:** Test on a real mobile device (not just Chrome DevTools device emulation). If scrolling feels laggy, reduce particle count.

**Phase:** Phase 2 (Particles) — implement device-aware configuration during tsParticles setup.

**Confidence:** HIGH — tsParticles official docs and multiple guides recommend device-aware configuration. The `density` feature exists specifically for this purpose.

---

### Pitfall 10: Animating `backdrop-filter` Causes Frame Drops

**What goes wrong:** Transitioning or animating the `backdrop-filter` blur radius (e.g., from `blur(0px)` to `blur(12px)`) causes severe jank and dropped frames.

**Why it happens:** `backdrop-filter` performs a Gaussian blur operation on every frame by sampling pixels behind the element and applying a convolution kernel. When the blur radius changes, the browser must recompute the entire blur kernel and re-sample the background on every animation frame. This is extremely GPU-intensive.

**Prevention:**
```css
/* BAD — animating backdrop-filter directly */
.glass-card {
  transition: backdrop-filter 0.3s ease; /* JANK! */
}

/* GOOD — animate opacity or background alpha instead */
.glass-card {
  backdrop-filter: blur(12px); /* Static, computed once */
  transition: background-color 0.3s ease, opacity 0.3s ease;
}
```

For Framer Motion:
```tsx
// BAD
<motion.div animate={{ backdropFilter: "blur(12px)" }} />

// GOOD — animate the background alpha
<motion.div
  style={{ backdropFilter: "blur(12px)" }}  // Static
  animate={{ backgroundColor: ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"] }}
/>
```

**Phase:** Phase 3 (Animations) — enforce during animation implementation.

**Confidence:** HIGH — multiple CSS performance guides (Nine Hub, CodeFormatter, Cloudinary) confirm this. The motion library docs also warn against animating expensive CSS properties.

---

### Pitfall 11: tsParticles Density Configuration Bug with Groups

**What goes wrong:** Setting `density.enable: true` inside a particle group causes all particles to disappear completely — the canvas renders black.

**Why it happens:** Confirmed bug in tsParticles v3 (GitHub issue #5496, May 2025). When density is configured within a `groups` object, the density calculation fails and destroys all particles across all groups.

**Prevention:**
1. **Avoid using `density` inside particle groups** — use `density` only at the top-level `particles.number` config
2. **If you need per-group density**, manually calculate particle counts based on screen size instead of relying on the density feature
3. **Use the latest tsParticles version** — check if this bug is fixed before starting

```ts
// BAD — causes particles to disappear
particles: {
  groups: {
    leaves: {
      number: { value: 80, density: { enable: true, area: 800 } }
    }
  }
}

// GOOD — density at top level only
particles: {
  number: { value: 50, density: { enable: true, area: 800 } },
  groups: {
    leaves: { /* no number.density here */ }
  }
}
```

**Phase:** Phase 2 (Particles) — aware of this when configuring particle groups (if using multiple leaf types).

**Confidence:** HIGH — confirmed bug in GitHub issue #5496, still open as of May 2025.

---

### Pitfall 12: Framer Motion `layout` Prop Distorts Child Elements

**What goes wrong:** When using the `layout` prop on a parent container, child elements appear visually stretched or distorted during the animation.

**Why it happens:** The `layout` prop animates size changes using CSS `transform: scale()` rather than actually changing `width`/`height` (for performance). This scale transformation is inherited by children, making them appear stretched during the transition.

**Prevention:**
```tsx
// Add layout to children that should maintain their aspect ratio
<motion.div layout>
  <motion.div layout>  {/* Child also gets layout prop */}
    <img src="..." />   {/* Image maintains proportions */}
  </motion.div>
</motion.div>
```

Or use `layout="position"` to only animate position changes (not size):
```tsx
<motion.div layout="position">  {/* Only animates position, not size */}
```

**Phase:** Phase 3 (Animations) — apply during component animation setup.

**Confidence:** HIGH — documented in Motion.dev official layout animation docs and Maxime Heckel's deep-dive guide.

---

## Minor Pitfalls

Cosmetic or low-impact issues.

---

### Pitfall 13: Tailwind v4 Dark Mode Variant Not Configured

**What goes wrong:** Dark mode classes (`dark:bg-gray-900`) don't apply. The theme toggle does nothing.

**Why it happens:** Tailwind CSS v4 removed `tailwind.config.js` and the `darkMode: 'class'` option. Instead, you must declare a `@custom-variant` in CSS for class-based dark mode. Without it, Tailwind v4 only supports `prefers-color-scheme` media query.

**Prevention:**
```css
/* globals.css — Tailwind v4 */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

**Note:** This replaces the v3 pattern of `darkMode: 'class'` in `tailwind.config.js`. The `tailwind.config.js` file is no longer used in v4 — all config goes in CSS via `@theme` and `@custom-variant`.

**Phase:** Phase 1 (Foundation) — configure during project setup.

**Confidence:** HIGH — documented in Tailwind CSS v4 official docs and migration guides.

---

### Pitfall 14: Missing `-webkit-backdrop-filter` Safari Prefix

**What goes wrong:** Glassmorphism effects don't render on Safari (desktop and iOS). Cards appear with solid backgrounds instead of frosted glass.

**Why it happens:** Safari requires the `-webkit-` prefix for `backdrop-filter`. While browser support is now 95%+ globally, Safari specifically still needs the prefix in some versions.

**Prevention:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(12px);  /* Safari */
  backdrop-filter: blur(12px);
}
```

Tailwind's `backdrop-blur-*` utilities include the prefix automatically. If writing custom CSS, always include both.

**Also add a fallback:**
```css
@supports not (backdrop-filter: blur(12px)) {
  .glass-card {
    background: rgba(0, 0, 0, 0.8);  /* Solid fallback */
  }
}
```

**Phase:** Phase 1 (Foundation) — configure in global CSS and verify in Safari.

**Confidence:** HIGH — documented in MDN and multiple glassmorphism guides.

---

### Pitfall 15: `retina_detect: true` Doubles Particle Rendering Load

**What goes wrong:** Setting `retina_detect: true` (or `detectRetina: true`) on high-DPI screens causes tsParticles to render at 2x or 3x resolution, dramatically increasing GPU load.

**Why it happens:** On Retina/HiDPI displays (most modern phones, MacBooks, iPads), `retina_detect: true` tells tsParticles to match the device pixel ratio. A 1920x1080 canvas becomes 3840x2160 at 2x DPR — that's 4x the pixels to animate per frame.

**Prevention:**
```ts
{
  detectRetina: false,  // Keep canvas at 1x resolution
  // OR limit max particles to compensate
  particles: {
    number: {
      value: 30,  // Lower count when detectRetina is true
      density: { enable: true, area: 1200 }
    }
  }
}
```

On mobile, always set `detectRetina: false`.

**Phase:** Phase 2 (Particles) — configure during tsParticles setup.

**Confidence:** MEDIUM — documented in tsParticles API, but exact performance impact varies by device.

---

### Pitfall 16: Theme Toggle Component Causes Hydration Mismatch

**What goes wrong:** The sun/moon icon in the theme toggle shows the wrong icon on first render, or React logs a hydration mismatch warning.

**Why it happens:** The server doesn't know the user's theme preference (localStorage isn't available server-side). If the toggle renders an icon based on the current theme during SSR, it will show the wrong icon compared to what the client renders after reading localStorage.

**Prevention:**
```tsx
"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Only render after hydration
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />; // Placeholder with same dimensions

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

**Alternative (CSS-only, no hydration issue):**
```tsx
<button onClick={toggleTheme} aria-label="Toggle theme">
  <SunIcon className="hidden [html.dark_&]:block" />
  <MoonIcon className="hidden [html.light_&]:block" />
</button>
```

**Phase:** Phase 1 (Foundation) — implement with theme infrastructure.

**Confidence:** HIGH — extremely common Next.js + next-themes issue. Multiple guides document this pattern.

---

### Pitfall 17: `next/dynamic` with `{ ssr: false }` Causes Layout Shift (CLS)

**What goes wrong:** Dynamically imported components (used for tsParticles) render nothing on the server, then pop in on the client. This causes visible layout shift — content jumps down when the particle container suddenly appears.

**Why it happens:** `ssr: false` means the server renders nothing (or a loading placeholder). When the client hydrates and loads the component, the space it occupies suddenly changes, pushing other content around.

**Prevention:**
```tsx
const Particles = dynamic(
  () => import('@/components/ParticleBackground'),
  {
    ssr: false,
    loading: () => (
      // Reserve the exact same space the component will occupy
      <div className="absolute inset-0 w-full h-full" aria-hidden="true" />
    )
  }
);
```

For the particle container itself, use `position: absolute` or `position: fixed` with `inset: 0` so it overlays content rather than displacing it. This way, its appearance doesn't shift other elements.

**Phase:** Phase 2 (Particles) — apply during tsParticles component creation.

**Confidence:** MEDIUM — CLS impact depends on layout strategy. Using `position: absolute` for particles avoids the issue entirely.

---

### Pitfall 18: Framer Motion `AnimatePresence` Exit Animations Fail with PPR

**What goes wrong:** `AnimatePresence` exit animations don't play when using Next.js Partial Prerendering (PPR). Elements just disappear instead of animating out.

**Why it happens:** PPR (a Next.js 14 experimental feature) mixes static and dynamic rendering in ways that break `AnimatePresence`'s ability to detect when a component is being unmounted. The exit animation never triggers because the component lifecycle doesn't behave as expected.

**Prevention:** If using PPR, disable it for routes that rely on `AnimatePresence` exit animations. Or avoid PPR entirely if your portfolio relies heavily on page transitions.

```js
// next.config.js
module.exports = {
  experimental: {
    ppr: false,  // Disable if using AnimatePresence
  }
};
```

**Phase:** Phase 3 (Animations) — verify during animation implementation.

**Confidence:** HIGH — confirmed in GitHub issue next.js#63785. Affects Next.js 14 canary and later.

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation |
|-------|---------------|------------|
| Phase 1: Foundation | Theme FOUC (Pitfall 3) | Use next-themes with suppressHydrationWarning |
| Phase 1: Foundation | z-index stacking traps (Pitfall 2) | Define z-index token system before building any component |
| Phase 1: Foundation | Tailwind v4 dark variant misconfig (Pitfall 13) | Add `@custom-variant dark (&:where(.dark, .dark *));` to globals.css |
| Phase 1: Foundation | Safari backdrop-filter (Pitfall 14) | Add -webkit- prefix and @supports fallback |
| Phase 2: Particles | Canvas blocking clicks (Pitfall 1) | `pointer-events: none` on canvas element |
| Phase 2: Particles | SSR hydration failure (Pitfall 4) | Always use `dynamic()` with `ssr: false` |
| Phase 2: Particles | Image shape not loading (Pitfall 8) | Install + load `@tsparticles/shape-image` |
| Phase 2: Particles | Mobile performance (Pitfall 9) | Device-aware particle count + fpsLimit |
| Phase 2: Particles | Density group bug (Pitfall 11) | Avoid density inside groups object |
| Phase 3: Animations | Layout property animation (Pitfall 6) | Only animate transform/opacity |
| Phase 3: Animations | backdrop-filter animation (Pitfall 10) | Never animate blur radius |
| Phase 3: Animations | Layout prop distortion (Pitfall 12) | Add `layout` to children or use `layout="position"` |
| Phase 3: Animations | PPR + AnimatePresence (Pitfall 18) | Disable PPR if using exit animations |
| Build/Deploy | Motion export * error (Pitfall 5) | Pin motion to ≤ 12.18.1 or ≥ 13.0.0 |
| Build/Deploy | Theme toggle mismatch (Pitfall 16) | Check mounted state before rendering icons |

---

## Sources

| Source | Confidence | URL |
|--------|-----------|-----|
| tsParticles Issue #5465 (pointer-events) | HIGH | https://github.com/tsparticles/tsparticles/issues/5465 |
| tsParticles Issue #5496 (density bug) | HIGH | https://github.com/tsparticles/tsparticles/issues/5496 |
| tsParticles PR #5495 (3.9.0 fix) | HIGH | https://github.com/tsparticles/tsparticles/pull/5495 |
| Smashing Magazine — CSS Stacking Contexts (Jan 2026) | HIGH | https://www.smashingmagazine.com/2026/01/unstacking-css-stacking-contexts/ |
| Motion Issue #3211 (export * error) | HIGH | https://github.com/motiondivision/motion/issues/3211 |
| Next.js Issue #63785 (PPR + AnimatePresence) | HIGH | https://github.com/vercel/next.js/issues/63785 |
| Nine Hub — CSS Glassmorphism Guide (Feb 2026) | HIGH | https://nineproo.com/blog/css-glassmorphism-guide/ |
| AxessLab — Glassmorphism Accessibility | HIGH | https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/ |
| next-themes GitHub | HIGH | https://github.com/pacocoursey/next-themes |
| Motion.dev — Layout Animations Docs | HIGH | https://motion.dev/docs/react-layout-animations |
| @tsparticles/shape-image npm | HIGH | https://www.npmjs.com/package/@tsparticles/shape-image |
| LogRocket — Hydration Errors in Next.js | MEDIUM | https://blog.logrocket.com/resolving-hydration-mismatch-errors-next-js/ |
| FourIQ — Framer Motion 60fps Optimization | MEDIUM | https://www.fouriqtech.com/blog/optimizing-framer-motion-animations-for-enterprise-react-applications |
