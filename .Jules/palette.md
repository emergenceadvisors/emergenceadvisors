## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.

## 2026-06-25 - Missing Visual Required Indicators on Custom Forms
**Learning:** Custom forms that use HTML5 `required` attributes often miss visual indicators (like asterisks), which leads to user friction because they cannot distinguish mandatory from optional fields until validation fails.
**Action:** Always verify that input labels visually communicate requirement status when the `required` attribute is present on the input field.

## 2026-06-30 - Smooth Scroll Breaks Native Focus Routing
**Learning:** Using `e.preventDefault()` for custom smooth scrolling intercepts native anchor fragment navigation, breaking standard browser focus routing. Keyboard users and screen readers lose context because focus remains on the clicked link rather than moving to the target section.
**Action:** Always manually manage focus when overriding native anchor behavior by explicitly setting `tabindex="-1"` on the target element and calling `el.focus({ preventScroll: true })`.
