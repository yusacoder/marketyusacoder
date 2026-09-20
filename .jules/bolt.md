# Bolt Journal - Performance Learnings

## 2025-05-18 - Static Endpoint Caching with Cache-Control
**Learning:** Static backend endpoints like `/api/categories` serving fixed constants benefit immensely from CDN and browser caching (`Cache-Control: public, max-age=86400, s-maxage=86400`). Setting these headers offloads repetitive GET requests away from Node.js Express server to client/edge caches without requiring complex server-side caching libraries or architectural changes.
**Action:** When creating static or slow-changing API routes, always include appropriate `Cache-Control` response headers.
