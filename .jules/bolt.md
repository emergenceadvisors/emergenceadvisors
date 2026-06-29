## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2026-06-18 - [Prevent Redundant DOM Updates in IntersectionObserver]
**Learning:** Even without layout thrashing, unconditionally modifying the DOM (e.g., removing and adding classes) inside an `IntersectionObserver` callback on every scroll tick when multiple elements intersect is inefficient and causes unnecessary style recalculations.
**Action:** Always cache the currently active element's state (e.g., its ID) and compare it against the newly intersected element. Only perform DOM updates if the state has actually changed. Additionally, avoid `forEach` loops for removing classes when a direct selector (e.g., `querySelector('.active')`) can target the single element that needs modification.
