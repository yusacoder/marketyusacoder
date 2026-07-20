# Bolt's Journal

## 2024-07-20 - Set-based Favorites Cache
**Learning:** In a vanilla HTML/JS application, frequently querying `localStorage` and parsing JSON stringified arrays within the rendering/filtering lifecycle can block the main thread and degrade performance as the number of items or UI updates grows.
**Action:** Use an in-memory `Set` as a lazy-loaded cache on first access to achieve O(1) checks and eliminate redundant disk reads/JSON parsing during product rendering.
