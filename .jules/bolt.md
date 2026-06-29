## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2026-06-17 - [Prevent Redundant DOM Queries in Scroll Observers]
**Learning:** Performing `document.querySelector` and blindly removing/adding classes inside high-frequency event callbacks like `IntersectionObserver` causes unnecessary DOM thrashing and layout calculations.
**Action:** Always maintain local state (e.g., `currentActiveId`) and reuse cached NodeLists to early-return and minimize DOM interactions during scroll.
