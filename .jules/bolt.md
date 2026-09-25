# Bolt's Journal

## 2026-09-25 - News List Query Payload Optimization
**Learning:** In Supabase / PostgreSQL query builders, using `.select('*')` on list endpoints fetches large text columns (like `content`) that are only needed on detail pages. Selecting specific list fields reduces network payload, memory usage, and response latency across list endpoints.
**Action:** Always project only necessary columns (`NEWS_LIST_FIELDS`) for list views instead of fetching `*`.
