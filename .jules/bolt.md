# Bolt's Journal - Critical Learnings Only

## 2026-03-03 - LocalStorage Parsing Bottleneck in Rendering Loops
**Learning:** Checking `Favorites` via parsing JSON from `localStorage` on every card rendering iteration causes $O(N)$ overhead per rendering cycle, resulting in multiple read operations and sync string parsing blocking the main thread. Implementing an in-memory `Set` cache (`this._cache`) that lazily loads the favorites on first access provides $O(1)$ lookups, bypassing redundant parsing completely.
**Action:** Always cache serialized persistent collections in a memory data structure (like `Set` or `Map`) for rapid lookups inside loop iterations.
