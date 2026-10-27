## 2026-10-27 - Caching Static Categories Navigation
**Learning:** Static category lists fetched on every page transition cause redundant network round-trips and unnecessary API endpoint overhead. Pairing `sessionStorage` caching on the frontend with HTTP `Cache-Control` headers on static endpoints significantly speeds up page load and navigation response times.
**Action:** When working with static or rarely-changing endpoint data, implement client-side `sessionStorage` caching combined with backend HTTP caching.
