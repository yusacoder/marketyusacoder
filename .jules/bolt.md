## 2026-10-21 - Query Select Payload Optimization for News Feeds
**Learning:** Selecting all columns (`*`) on list/feed endpoints returns heavy article content (`content`), increasing Supabase response size, network latency, and JSON parsing times unnecessarily when cards only need metadata.
**Action:** Always project specific card fields (`id, title, slug, description, image_url, category, created_at`) on list/search endpoints and reserve `.select('*')` for detail endpoints.
