# Bolt's Journal - Critical Learnings

## 2026-10-11 - Static Categories Memory Caching
**Learning:** Static endpoints like `/api/categories` change infrequently (if ever during a single session/page interaction). Caching the in-memory response across repeated component render triggers avoids unnecessary API fetches and speeds up UI rendering.
**Action:** Always check if static lookup data (categories, configuration) can be cached in-memory or in web storage before re-fetching on every invocation.
