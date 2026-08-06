## 2026-08-06 - Optimized Favorites Lookup with In-Memory Set Cache
**Learning:** Parsing localStorage via JSON.parse and doing Array.prototype.includes inside hot rendering paths (such as rendering lists of cards and filtering) is highly inefficient. It results in repeated synchronous I/O, heavy garbage collection pressure, and O(N) lookup overhead.
**Action:** Use a lazy-loaded in-memory Set cache for local-storage persisted collections to achieve O(1) lookups via Set.prototype.has and reduce parsing costs to exactly once per session.
