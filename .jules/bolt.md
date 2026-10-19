## 2025-05-10 - In-Memory TTL Cache for Supabase Backend Queries
**Learning:** External API database calls to Supabase can introduce significant latency (~100-300ms network roundtrips). Implementing a lightweight 60-second in-memory TTL cache in Express endpoints drastically reduces response latency to <1ms for repeated read operations under high request frequency.
**Action:** Use short-lived (60s) in-memory caching for read-heavy API endpoints when database queries dominate response latency.
