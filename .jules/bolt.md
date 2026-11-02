# Bolt's Journal

## 2026-11-02 - Column projection on list endpoints avoids heavy text payloads
**Learning:** In mini-news portal architecture with Supabase/PostgreSQL, news list views (home feed, category page, search results) render summary cards that only require title, slug, description, image_url, category, and created_at. Querying `select('*')` transfers full article `content` across the network for every card in the list, massively inflating database I/O, Supabase egress bandwidth, and Node.js JSON serialization latency.
**Action:** Always project only list-required fields on collection endpoints (`NEWS_LIST_FIELDS`), reserving `select('*')` exclusively for single-resource detail endpoints (`/api/news/:slug`).
