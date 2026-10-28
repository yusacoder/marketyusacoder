## 2025-02-28 - Caching Static Navigation Data with HTTP Cache Headers

**Learning:** Static navigation endpoints like categories are fetched on every single page load by the frontend. Adding server-side in-memory caching combined with HTTP `Cache-Control` (`public, max-age=300, s-maxage=300`) enables both browser/CDN edge caching and zero-allocation backend responses.

**Action:** For frequently fetched static metadata endpoints, always pair server-side TTL caching with standard HTTP `Cache-Control` response headers to minimize backend hit rate and eliminate redundant database/processing overhead.
