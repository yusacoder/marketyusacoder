# Bolt's Journal - Critical Learnings Only

## 2026-07-28 - In-memory Set Cache for Favorites
**Learning:** Checking favorites on every render and during search filter loops previously parsed localStorage dynamically via `JSON.parse` and traversed the resulting array with `includes`. For a large list of products or high-frequency operations, this becomes an O(N) operation per product card and triggers significant parsing overhead.
**Action:** Use an in-memory `Set` as a lazy cache (`this._cache`) initialized on first access. This reduces `has(id)` checks to O(1) complexity and avoids redundant storage parsing.
