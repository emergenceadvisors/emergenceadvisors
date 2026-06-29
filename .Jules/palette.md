## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.
## 2026-06-19 - Accordion Accessibility Pattern
**Learning:** Developers often remember `aria-expanded` for custom accordions but forget `aria-controls` to link the toggle button to the expandable region, breaking the complete screen reader experience.
**Action:** Whenever verifying custom disclosure widgets or accordions, ensure both `aria-expanded` is toggled and `aria-controls` maps to the region's `id`.
