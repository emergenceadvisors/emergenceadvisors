## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.

## 2026-06-18 - Visual Indicators for Required Fields
**Learning:** While screen readers announce `required` attributes natively, sighted users still rely on visual cues (like asterisks) to know which fields are mandatory before attempting to submit the form.
**Action:** Always complement HTML5 `required` attributes with a visual indicator. Use `aria-hidden="true"` on the visual indicator to prevent screen readers from redundantly announcing "star" or "asterisk".
