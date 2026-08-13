## 2026-08-13 - O(1) Favorites Set Caching
**Learning:** Checking elements inside an array on every product rendering block while parsing localStorage repeatedly is a highly redundant performance bottleneck. Storing a lazily-initialized in-memory `Set` allows O(1) checks and removes the JSON parsing overhead entirely.
**Action:** Use an in-memory `Set` for key collections like favorites, bookmarks, or cached lookups, and lazily load it on first access.
