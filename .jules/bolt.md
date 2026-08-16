# Bolt's Journal - Critical Learnings

## 2026-08-16 - Selective Column Fetching in Supabase/PostgreSQL News Feeds
**Learning:** Selecting all columns (`select('*')`) on news listing endpoints fetches full article body contents (`content` text column), which is unneeded for grid/card views and bloats API payload size and memory usage.
**Action:** Always project only required fields (`id, title, slug, description, image_url, category, author, published, created_at`) for list/search endpoints, leaving full `content` fetches for individual detail views.
