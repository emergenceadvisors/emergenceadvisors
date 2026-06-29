## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.

## 2026-06-25 - Missing Visual Required Indicators on Custom Forms
**Learning:** Custom forms that use HTML5 `required` attributes often miss visual indicators (like asterisks), which leads to user friction because they cannot distinguish mandatory from optional fields until validation fails.
**Action:** Always verify that input labels visually communicate requirement status when the `required` attribute is present on the input field.

## 2026-06-25 - Skip-to-content links and smooth scrolling Focus routing
**Learning:** Adding custom javascript smooth scroll using `e.preventDefault()` on fragment links traps keyboard users because native browser behavior of moving focus is overridden. Skip-to-content links that rely on smooth scroll click interceptors become unusable for screen readers or keyboard navigation.
**Action:** When implementing smooth scroll on anchor links or skip links, explicitly shift focus to the target element using `el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });`.
