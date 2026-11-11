# Bolt's Journal - Performance Learnings

## 2026-11-11 - Field Projection on News Feeds
**Learning:** In Supabase/PostgreSQL-backed news architectures, querying `select('*')` on list and search endpoints forces retrieval and serialization of large article `content` columns that are never rendered on card/list views.
**Action:** Always project only list-required fields (`id, title, slug, description, image_url, category, author, created_at`) on collection endpoints, reserving `*` solely for single-item detail endpoints (`/api/news/:slug`).
