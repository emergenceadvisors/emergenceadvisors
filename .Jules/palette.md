## 2026-06-17 - Added Global focus-visible indicator
**Learning:** Many custom-styled sites completely lack clear focus rings for keyboard users, relying only on default browser outlines (or worse, removing them entirely).
**Action:** Always add a brand-aligned `:focus-visible` to the global CSS reset so that every interactive element gets accessible keyboard focus outlines out-of-the-box, then adjust specific elements (like inputs) that have their own custom focus states.
## 2026-06-23 - Added Loading and Disabled States to Async Buttons
**Learning:** For a single-page HTML application relying on inline `<style>` and manual DOM manipulations, simply doing `disabled = true` fails to visually signal correctly or communicate via screen reader if there are no corresponding `.btn:disabled` CSS rules and `aria-busy` attributes set dynamically during async requests (like `fetch`). Tests that construct DOM node mocks via literal objects must have mocked `setAttribute`/`removeAttribute` functions added if the target functions depend on modifying custom attributes on native components.
**Action:** When implementing disable/loading states on vanilla JS components, always ensure:
1. `btn:disabled` opacity or cursor changes are added to CSS if absent.
2. `btn:hover` rules use `:not(:disabled)` so inactive buttons do not pop.
3. `aria-busy='true'` is attached and explicitly detached within the `.then`/`.catch` chain to announce the async event.
