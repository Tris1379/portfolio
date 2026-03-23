---
phase: quick-polish
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/VisionSection.tsx
  - src/components/JourneySection.tsx
  - src/components/CompanionSection.tsx
  - src/components/StorySection.tsx
  - src/app/[locale]/page.tsx
autonomous: true
requirements: []
user_setup: []

must_haves:
  truths:
    - "Home buttons on all sub-pages sit above other content (no overlap)"
    - "Long text cards have capped height with scrollable overflow"
    - "Page exit transition feels like dissolving mist (slow blur fade)"
  artifacts:
    - path: "src/components/VisionSection.tsx"
      provides: "Vision Home button z-index fix"
    - path: "src/components/JourneySection.tsx"
      provides: "Journey Home button z-index fix"
    - path: "src/components/CompanionSection.tsx"
      provides: "Companion Home button z-index fix"
    - path: "src/components/StorySection.tsx"
      provides: "Story card-scroll on glass card"
    - path: "src/app/[locale]/page.tsx"
      provides: "Enhanced mist-like exit transition"
  key_links:
    - from: "src/components/VisionSection.tsx, JourneySection.tsx, CompanionSection.tsx"
      to: "Home button markup"
      via: "z-[9999] class on button element"
      pattern: "z-\[9999\]"
    - from: "glass card containers"
      to: ".card-scroll CSS class"
      via: "className addition"
      pattern: "card-scroll"
---

<objective>
Polish: z-index fixes, scrollable cards, and enhanced page transitions

Purpose: Fix missing z-index on Home buttons, apply existing card-scroll class to long-text cards, and enhance exit transition to feel like dissolving mist.
Output: 5 files with targeted class additions — no logic changes.
</objective>

<execution_context>
@C:/Users/THINKPAD/.config/opencode/get-shit-done/workflows/execute-plan.md
@C:/Users/THINKPAD/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@src/app/globals.css
@src/components/PersonalSideSection.tsx
</context>

<interfaces>
<!-- card-scroll class already defined in globals.css -->
<!-- PersonalSideSection.tsx already has z-[9999] on Home button (line 31) — reference pattern -->
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Add z-[9999] to Home buttons in Vision, Journey, Companion sections</name>
  <files>src/components/VisionSection.tsx, src/components/JourneySection.tsx, src/components/CompanionSection.tsx</files>
  <action>
    Add `relative z-[9999]` to the Home button className in each section — matching the pattern already used in PersonalSideSection.tsx line 31.

    - VisionSection.tsx line 18: add `relative z-[9999]` to button className
    - JourneySection.tsx line 18: add `relative z-[9999]` to button className
    - CompanionSection.tsx line 36: add `relative z-[9999]` to button className

    Current pattern (all three are identical except Companion uses `text-white/60`):
    ```tsx
    className="flex items-center gap-2 text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors mb-6"
    ```
    Should become:
    ```tsx
    className="flex items-center gap-2 text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors mb-6 relative z-[9999]"
    ```
  </action>
  <verify>grep -r "z-\[9999\]" src/components/VisionSection.tsx src/components/JourneySection.tsx src/components/CompanionSection.tsx</verify>
  <done>All three section Home buttons have `relative z-[9999]` in their className</done>
</task>

<task type="auto">
  <name>Task 2: Apply card-scroll to long-text glass cards</name>
  <files>src/components/StorySection.tsx, src/components/VisionSection.tsx, src/components/JourneySection.tsx, src/components/CompanionSection.tsx</files>
  <action>
    Add `card-scroll` class to the glass container divs that hold long paragraph text. The class already exists in globals.css (line 83) and adds max-h-[60vh], overflow-y-auto, thin scrollbar.

    - StorySection.tsx line 18: `<div className="glass p-6 md:p-8">` → `<div className="glass p-6 md:p-8 card-scroll">`
    - VisionSection.tsx line 42: `<div className="glass p-6 md:p-8">` → `<div className="glass p-6 md:p-8 card-scroll">`
    - JourneySection.tsx line 38: `<div className="glass p-6 md:p-8">` → `<div className="glass p-6 md:p-8 card-scroll">`
    - CompanionSection.tsx line 61: `<div className="glass p-6 md:p-8 mb-8">` → `<div className="glass p-6 md:p-8 mb-8 card-scroll">`

    DO NOT touch the Journey lessons pills (line 53) — those are small badges, not long text cards.
  </action>
  <verify>grep -r "card-scroll" src/components/StorySection.tsx src/components/VisionSection.tsx src/components/JourneySection.tsx src/components/CompanionSection.tsx</verify>
  <done>All four sections' long-text glass cards have the card-scroll class applied</done>
</task>

<task type="auto">
  <name>Task 3: Enhance page exit transition to mist-like dissolve</name>
  <files>src/app/[locale]/page.tsx</files>
  <action>
    Modify the `pageVariants.exit` in page.tsx (line 28-31) to feel like dissolving mist:

    Current:
    ```ts
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      y: -10,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    ```

    New — slower, wider blur, gentle upward drift:
    ```ts
    exit: {
      opacity: 0,
      filter: "blur(24px)",
      y: -20,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    ```

    Rationale: blur 12px→24px doubles the dissolve radius, duration 0.4→0.7 slows the fade, y -10→-20 adds gentle upward drift. easeInOut makes it smooth both in and out.

    Keep the `initial` and `animate` variants unchanged — entrance is already good.
  </action>
  <verify>grep "blur(24px)" src/app/[locale]/page.tsx</verify>
  <done>Exit transition uses blur(24px), duration 0.7s, y: -20, easeInOut — feels like mist dissolving upward</done>
</task>

</tasks>

<verification>
After all tasks:
1. Run `npm run build` to confirm no TypeScript/build errors
2. Check all Home buttons are clickable above other content
3. Confirm card-scroll applied (grep confirms 4 additions)
4. Confirm exit transition uses blur(24px) with 0.7s duration
</verification>

<success_criteria>
- [ ] Home buttons in Vision, Journey, Companion have z-[9999]
- [ ] Glass cards in Story, Vision, Journey, Companion have card-scroll class
- [ ] Page exit transition uses blur(24px), 0.7s duration, y: -20
- [ ] No logic changes — only class additions and transition value changes
- [ ] build passes without errors
</success_criteria>

<output>
After completion, create `.planning/quick/260323-vrz-personal-side-gallery-page-transitions-a/quick-polish-01-SUMMARY.md`
</output>
