## 2026-06-17 - [Prevent Layout Thrashing in IntersectionObserver]
**Learning:** Calling `getBoundingClientRect()` inside an IntersectionObserver callback causes synchronous layout thrashing (reflow) on the main thread, negating the performance benefits of using IntersectionObserver instead of scroll events.
**Action:** Always rely on DOM order or `IntersectionObserverEntry.boundingClientRect` rather than manually calling `getBoundingClientRect()` dynamically inside the observer callback.

## 2024-06-28 - [DOM Update Optimization in IntersectionObserver]
**Learning:** High-frequency events like `IntersectionObserver` callbacks can trigger unnecessary DOM thrashing if DOM updates (e.g., modifying classes) are applied unconditionally on every invocation, even when the underlying state hasn't changed.
**Action:** Use a state variable (e.g., `currentActiveId`) to track the current state and only apply DOM mutations when the state actually transitions.

## 2026-06-29 - [Optimize IntersectionObserver DOM Iteration with Map]
**Learning:** Using `NodeList.forEach` inside a high-frequency event callback like `IntersectionObserver` to manage active state adds O(N) overhead that scales poorly. If the list is static, elements can be cached in a Map beforehand.
**Action:** When updating active states (like navigation links synced to scroll sections) in high-frequency callbacks, pre-cache the nodes using an O(1) Map keyed by section ID. Then, only directly modify the previous and newly active elements (`navMap.get(id)`) instead of iterating through all nodes.
