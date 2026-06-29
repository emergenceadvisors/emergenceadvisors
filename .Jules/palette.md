## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.

## 2026-06-18 - Visual Required Indicators on HTML5 Forms
**Learning:** Forms with native HTML5 validation (like `required`) must provide explicit, visual cues to users so they aren't surprised by validation errors upon submission. Users shouldn't have to guess which fields are required.
**Action:** Always add visual indicators (like an asterisk) and a corresponding legend to forms utilizing native validation.
