# Bolt's Journal - Performance Learnings

## 2026-08-26 - Exclude Heavy Text Columns in List Queries
**Learning:** Returning full text body content (`content`) in list queries (like `getAllNews`, `getNewsByCategory`, `searchNews`) inflates HTTP response payload sizes and database throughput needlessly when list cards only display metadata (title, slug, category, description, date, image).
**Action:** Always project specific list fields (`id, title, slug, description, image_url, category, author, created_at`) for listing endpoints, reserving full column selection (`select('*')`) for single-item detail endpoints (`getNewsBySlug`).
