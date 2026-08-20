## 2025-05-18 - Backend GET Endpoint Response Caching
**Learning:** For serverless/hosted backend services querying remote PostgreSQL instances (like Supabase over HTTPS/REST), database network latency (~200ms) dominates API response times for read-heavy payloads like news feeds. Simple in-memory response caching with TTL eliminates round-trips for repeated requests without adding external cache server overhead (e.g., Redis).
**Action:** Implement lightweight Map-based TTL caching on GET endpoints for read-heavy APIs to reduce latency from ~200ms to <1ms.
