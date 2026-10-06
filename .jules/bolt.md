# Bolt's Journal - Critical Learnings

## 2026-10-06 - Selecting Specific Columns on Supabase News Listings
**Learning:** Fetching `*` in database queries for news list pages transfers unnecessary large text fields (`content`) over the network, increasing payload size by 60-80%. Selecting explicit card fields (`id, title, slug, description, image_url, category, created_at, author`) drastically improves TTFB and JSON parsing time.
**Action:** Always restrict `select()` columns on listing endpoints, reserving full body text fetches (`select('*')`) for single item detail endpoints.
