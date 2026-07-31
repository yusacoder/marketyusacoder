## 2026-07-31 - Lazy In-Memory Set Cache for Favorites
**Learning:** Performing synchronous disk access and JSON parsing via `localStorage` on every product card rendering and list filtering is a major performance bottleneck. Caching these parsed values in an in-memory `Set` brings lookups down to O(1) time complexity and eliminates redundant I/O operations entirely.
**Action:** Always prefer lazy in-memory caches (like Set or Map) for client-side storage keys that are frequently accessed in loops or rendering blocks.
