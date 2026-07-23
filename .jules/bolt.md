# Bolt's Journal

## 2026-03-01 - Redundant localStorage Access and Parsing during DOM Rendering
**Learning:** In a vanilla HTML/JS application, functions checked inside dynamic rendering loops (e.g., checking if each product is in Favorites using `Favorites.has(id)` inside card rendering) will repeatedly read and parse stringified JSON from `localStorage` if not cached. For 10,000 iterations, this is ~50x to 100x slower than an O(1) Set-based in-memory cache lookup.
**Action:** Always wrap `localStorage` access in an in-memory cache layer (like `Set` or `Map`) with lazy loading to prevent redundant reads and synchronous `JSON.parse` operations during DOM updates.
