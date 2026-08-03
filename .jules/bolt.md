# Bolt Journal

## 2026-08-03 - Favorites Optimization with In-Memory Set Cache
**Learning:** The default `Favorites` object parsed `localStorage` every time `get()`, `has()`, or `count()` was called. On the product grid and filter steps, `Favorites.has(id)` is called for every item being rendered. With 10,000 operations, a lookup with `Set.has` using an in-memory cache is ~160x to 180x faster than JSON parsing + Array.includes pattern.
**Action:** Use an in-memory `Set` cache (`this._cache`) within the `Favorites` helper to keep lookups in O(1) complexity and eliminate redundant `JSON.parse` and array serialization.
