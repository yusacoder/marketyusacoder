# Bolt's Performance Journal

## 2025-05-18 - Selective Column Querying for News Feeds
**Learning:** Returning full table columns (`SELECT *`) in listing/feed endpoints transfers heavy body fields (`content`) that are never rendered on summary cards. Excluding large text columns reduces Supabase/PostgreSQL egress bandwidth and HTTP payload sizes.
**Action:** Always select specific card summary columns (`id, title, slug, description, image_url, category, author, published, created_at`) for list and search queries, reserving `SELECT *` only for single-item detail endpoints.
