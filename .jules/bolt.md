## 2026-10-08 - Added Cache-Control headers to static API endpoints
**Learning:** Static/infrequently-changing metadata endpoints like `/api/categories` benefit significantly from HTTP `Cache-Control` headers (`public, max-age=3600, s-maxage=86400`), avoiding repeated server execution and reducing latency on repeat navigation.
**Action:** Always set appropriate `Cache-Control` response headers on backend routes returning static or slowly-changing datasets.
