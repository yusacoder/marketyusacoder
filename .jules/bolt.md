# Bolt's Journal

## 2025-02-17 - Vanilla JS localStorage Parsing in Render Loops
**Learning:** In vanilla framework-less applications, global helper objects (like `Favorites`) are often queried directly inside layout loops or array mapping functions (e.g., `cardHTML`). When these queries read directly from `localStorage` and parse JSON on every single item, the complexity scales quadratically/linearly with the number of products, creating a heavy blocking bottleneck on the main thread during render.
**Action:** Always wrap `localStorage` access with a lazy-loaded in-memory cache (like `Set` or an object map) to guarantee O(1) lookups and completely eliminate redundant JSON parsing on every render cycle.
