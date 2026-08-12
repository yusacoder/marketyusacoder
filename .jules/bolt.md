# Bolt's Journal - Critical Learnings Only

This file contains critical performance learnings and optimization patterns as part of the Bolt persona process.

## 2026-08-12 - Lazy-loaded In-Memory Cache for Favorites
**Learning:** Checking favorites on every product card render causes redundant `localStorage.getItem` and `JSON.parse` operations, leading to major rendering bottlenecks. Replacing array lookups (`Array.includes`) with an in-memory `Set` cache (`Set.has`) improves lookups from O(N) to O(1) and eliminates redundant parsing.
**Action:** Use an in-memory `Set` cache (`this._cache`) initialized lazily on first read to cache local storage values, and update it in-place during modifications.
