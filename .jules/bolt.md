## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2024-06-28 - [DOM Update Optimization in IntersectionObserver]
**Learning:** High-frequency events like `IntersectionObserver` callbacks can trigger unnecessary DOM thrashing if DOM updates (e.g., modifying classes) are applied unconditionally on every invocation, even when the underlying state hasn't changed.
**Action:** Use a state variable (e.g., `currentActiveId`) to track the current state and only apply DOM mutations when the state actually transitions.
