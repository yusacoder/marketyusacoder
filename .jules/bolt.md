## 2026-07-10 - Favorites Lookup Bottleneck
**Learning:** Synchronous `localStorage` access and `JSON.parse` inside a render loop (like `product-card` generation) is a hidden but significant performance killer in vanilla JS apps. Even for small datasets, it blocks the main thread unnecessarily.
**Action:** Always cache `localStorage` data in an in-memory `Set` or `Map` for O(1) lookups during rendering.

## 2026-07-10 - Search Input Debouncing
**Learning:** Without debouncing, rapid user input triggers redundant DOM re-renders and filtering logic, leading to "input lag".
**Action:** Use a 300ms debounce on all search/filter inputs to maintain UI responsiveness.
