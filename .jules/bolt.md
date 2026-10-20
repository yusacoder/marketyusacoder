# Bolt's Journal

## 2025-05-18 - Selective Column Fetching for News Listings
**Learning:** Fetching `*` in Supabase/PostgreSQL list queries retrieves the heavy article `content` column, bloating response payloads and database transfer times for pages that only render summary cards.
**Action:** Always project only required list fields (`id, title, slug, description, image_url, category, author, created_at`) on list/search endpoints, reserving `content` fetching for single-item detail endpoints (`getNewsBySlug`).
