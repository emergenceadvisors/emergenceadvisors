## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.

## 2026-06-17 - AJAX Form Focus Management
**Learning:** During asynchronous form submissions, hiding the form and revealing a success message natively causes keyboard users and screen readers to lose focus context if focus isn't deliberately shifted. They get dropped back to the top of the document or left in a void.
**Action:** When implementing AJAX form success states, always add `tabindex="-1"` and `role="status"` to the success message container, and programmatically shift focus to it via `.focus()` after submission. Hide decorative icons in success messages with `aria-hidden="true"`.
