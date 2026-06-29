## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2024-05-19 - [DOM querying in scroll handlers]
**Learning:** `document.querySelector` inside `IntersectionObserver` callbacks or scroll handlers causes frequent DOM tree traversal on the main thread during high-frequency events. Using an ID-to-element Map reduces this to O(1) property lookups.
**Action:** When updating active navigation or TOC states based on scroll position, pre-cache the target elements in a Map on initialization.
