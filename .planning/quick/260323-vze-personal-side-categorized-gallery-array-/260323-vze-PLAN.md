---
phase: quick
plan: 260323-vze
type: execute
wave: 1
depends_on: []
files_modified:
  - src/config/site.ts
autonomous: true
requirements: []

must_haves:
  truths:
    - "Filter buttons show 'Pets' instead of 'Companions'"
    - "Filter buttons show 'Workspace' instead of 'Work'"
    - "Filtering by 'Pets' shows pet images correctly"
    - "Filtering by 'Workspace' shows workspace images correctly"
    - "Gallery has 3+ new items (11+ total)"
    - "New items have bilingual captions matching existing style"
  artifacts:
    - path: "src/config/site.ts"
      provides: "Personal Side categories and gallery items"
      contains: "personalSide.categories with 'pets' and 'workspace' IDs"
  key_links:
    - from: "categories[].id"
      to: "items[].category"
      via: "filter match in PersonalSideSection.tsx"
      pattern: "item\\.category === activeFilter"
---

<objective>
Rename Personal Side gallery categories and expand gallery with more items.

Purpose: Improve category naming (companions→pets, work→workspace) and add more gallery content.
Output: Updated site.ts with renamed categories, updated item category references, and 3+ new gallery entries.
</objective>

<execution_context>
@src/config/site.ts
</execution_context>

<context>
Current state (site.ts lines 328-386):
- Categories: `all`, `nature`, `companions`, `work`
- 8 items with `category`, `image`, `caption`, optional `span` fields
- PersonalSideSection.tsx filters by `item.category === activeFilter`
- Component is fully config-driven — no hardcoded category names
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rename category IDs and update item references</name>
  <files>src/config/site.ts</files>
  <action>
    In the `personalSide.categories` array (lines 334-339):
    - Change `{ id: "companions", label: { en: "Companions", vi: "Đồng hành" } }` → `{ id: "pets", label: { en: "Pets", vi: "Thú cưng" } }`
    - Change `{ id: "work", label: { en: "Work", vi: "Công việc" } }` → `{ id: "workspace", label: { en: "Workspace", vi: "Không gian làm việc" } }`

    In the `personalSide.items` array (lines 340-385):
    - Change `category: "companions"` → `category: "pets"` (2 items: pet-1.png, pet-2.png)
    - Change `category: "work"` → `category: "workspace"` (3 items: workspace-1.png, workspace-2.png, workspace-3.png)

    CRITICAL: Both categories array AND items must be updated together. Mismatched IDs break filtering because the component uses `item.category === activeFilter`.
  </action>
  <verify>grep -c "pets" src/config/site.ts && grep -c "workspace" src/config/site.ts && ! grep -q '"companions"' src/config/site.ts && ! grep -q 'category: "work"' src/config/site.ts</verify>
  <done>All "companions" → "pets" and "work" → "workspace" in both categories and items. Filtering still works.</done>
</task>

<task type="auto">
  <name>Task 2: Add 3 new gallery items</name>
  <files>src/config/site.ts</files>
  <action>
    Append 3 new items to the `personalSide.items` array (before closing `]` at line 385):

    1. Nature item:
    ```typescript
    {
      category: "nature",
      image: "/gallery/nature-4.png",
      caption: { en: "Sunlight filtering through the canopy", vi: "Ánh nắng xuyên qua tán lá" },
    },
    ```

    2. Pets item:
    ```typescript
    {
      category: "pets",
      image: "/gallery/pet-3.png",
      caption: { en: "Curled up next to the keyboard", vi: "Cuộn tròn bên cạnh bàn phím" },
    },
    ```

    3. Workspace item:
    ```typescript
    {
      category: "workspace",
      image: "/gallery/workspace-4.png",
      caption: { en: "Setup evolution over the years", vi: "Sự tiến hóa của setup qua nhiều năm" },
    },
    ```

    Use the NEW category IDs ("pets", "workspace") — not old ones.
    Match existing caption style: poetic/vibe, bilingual en/vi, no span unless intentional.
  </action>
  <verify>grep -c "category:" src/config/site.ts</verify>
  <done>Gallery expanded from 8 to 11 items with 1 new nature, 1 new pets, 1 new workspace entry</done>
</task>

</tasks>

<verification>
- `grep "pets" src/config/site.ts` — should show category label + item categories
- `grep "workspace" src/config/site.ts` — should show category label + item categories
- `grep "companions" src/config/site.ts` — should return nothing
- `grep 'category: "work"' src/config/site.ts` — should return nothing
- `grep -c "category:" src/config/site.ts` — should be 11 (8 old + 3 new)
- `npm run build` — should succeed with no type errors
</verification>

<success_criteria>
- Category IDs renamed: companions→pets, work→workspace (both in categories array and all item references)
- 3 new gallery items added with correct category IDs and bilingual captions
- Total items: 11 (was 8)
- Build passes
- No stale category IDs remain in items
</success_criteria>

<output>
After completion, create `.planning/quick/260323-vze-personal-side-categorized-gallery-array-/quick-260323-vze-SUMMARY.md`
</output>
