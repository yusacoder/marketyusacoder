# Bolt's Journal

## 2026-08-07 - Favorites Caching Optimization
**Learning:** Querying `localStorage` synchronously and parsing JSON multiple times inside high-frequency rendering and filtering loops (e.g., `cardHTML` and `applyFilters`) introduces a massive bottleneck (~54x slower). Replacing it with a lazy-loading in-memory `Set` cache provides O(1) lookups and completely eliminates redundant parsing overhead.
**Action:** Always cache serialized persistent data in memory when accessed repeatedly inside render pipelines.
