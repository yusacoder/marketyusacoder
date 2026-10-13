# Bolt's Journal - Performance Insights & Learnings

## 2025-10-13 - Session Storage & HTTP Caching for Static Category Navigation
**Learning:** Static navigation lists like `/api/categories` cause redundant network requests on every single page load and route change. Caching categories in `sessionStorage` on the frontend eliminates 100% of category API requests during page navigation while setting HTTP `Cache-Control` response headers on the backend optimizes initial loads.
**Action:** Always check for repeated static metadata requests (like navigation categories) across page transitions and leverage `sessionStorage` caching alongside HTTP `Cache-Control` headers.
