## 2025-05-15 - [Search Debouncing]
**Learning:** In a vanilla JS application with frequent DOM re-renders and array sorting/filtering, typing in a search input without debouncing causes excessive CPU usage and UI jank. Even a small dataset benefits significantly from a 300ms debounce to batch updates.
**Action:** Always implement a debounce helper for any text input that triggers layout-heavy or computation-heavy operations like filtering and re-rendering a grid.
