## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.

## 2026-06-25 - Missing Visual Required Indicators on Custom Forms
**Learning:** Custom forms that use HTML5 `required` attributes often miss visual indicators (like asterisks), which leads to user friction because they cannot distinguish mandatory from optional fields until validation fails.
**Action:** Always verify that input labels visually communicate requirement status when the `required` attribute is present on the input field.

## 2026-06-27 - Smooth Scrolling Breaks Focus Routing
**Learning:** Custom smooth scrolling implementations (like overriding fragment links with `e.preventDefault()` and `window.scrollTo`) silently break native browser focus routing. Without native routing, screen readers and keyboard users cannot navigate effectively after activating skip links or table-of-contents links.
**Action:** Whenever implementing custom click handlers for fragment links, manually set `tabindex="-1"` and call `el.focus({ preventScroll: true })` on the target element to manually restore the focus routing that `preventDefault()` destroyed.
