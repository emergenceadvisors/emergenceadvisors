## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2026-06-17 - [DOM query inside IntersectionObserver]
**Learning:** Performing a DOM query like `document.querySelector` inside an `IntersectionObserver` callback (which fires frequently during scrolling) introduces noticeable main-thread jank.
**Action:** Always pre-cache DOM elements and their target match attributes in an O(1) collection, like a `Map`, before the observer starts.
