## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2026-06-17 - [Prevent Redundant DOM Updates in IntersectionObserver]
**Learning:** IntersectionObserver callbacks can fire frequently during scrolling without the derived state (e.g., the topmost visible section) actually changing. Updating the DOM (like removing/adding classes or querying the document) on every firing creates unnecessary main thread work.
**Action:** Always cache the active state (e.g., `currentActiveId`) and implement an early return condition (`if (top.id !== currentActiveId)`) inside the observer callback to prevent redundant DOM queries and class thrashing.
