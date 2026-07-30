## 2026-07-30 - Lazy Set Caching for LocalStorage Favorites
**Learning:** Checking elements in array via `JSON.parse` and `Array.includes` in loops or rendering loops is an O(N) operation per lookup and forces CPU-intensive JSON parsing on every check. By lazy-initializing and caching the favorites in an in-memory `Set`, lookups become O(1), and JSON parsing is executed only once when the favorites are loaded or updated.
**Action:** Always favor lazy-loaded in-memory `Set` caches instead of repeating synchronous state/storage parsing and searching within UI rendering loops.
