# Bolt's Journal - Critical Learnings Only

## 2026-06-28 - Optimize Favorites with Lazy In-Memory Set Cache
**Learning:** Repetitive synchronous `localStorage.getItem` reads and JSON parsing during render loops and product filtering block the main thread and degrade rendering performance. Transitioning to an in-memory `Set` cache with lazy initialization provides $O(1)$ lookups and eliminates redundant disk I/O, resulting in an extremely fast, lightweight, and responsive UI without any API breaking changes.
**Action:** Always favor lazy-initialized in-memory caching for storage-backed state lookup operations on arrays or lists, especially when filtering or mapping elements inside UI render cycles.
