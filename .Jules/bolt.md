## 2026-06-29 - Active Navigation Scroll Optimization
**Learning:** Replacing `NodeList` iteration in `IntersectionObserver` callbacks with `Map` lookups avoids significant UI blocking.
**Action:** Always evaluate whether dictionary lookups can replace linear DOM queries in high-frequency event listeners.
