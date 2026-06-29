## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.
## 2026-06-18 - [Prevent Redundant DOM Queries in IntersectionObserver]
**Learning:** `IntersectionObserver` callbacks can fire frequently. Even if we avoid layout thrashing, running `document.querySelectorAll`, `classList.remove`, and `document.querySelector` blindly on every trigger can still cause unnecessary execution overhead if the actual "active" element hasn't changed.
**Action:** Always cache state (e.g., the `id` of the currently active section) to short-circuit DOM manipulations when the state remains unchanged across observer callbacks.
