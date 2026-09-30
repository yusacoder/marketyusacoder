## 2025-02-17 - Payload Optimization for News List Queries
**Learning:** Returning full article body `content` in list/search/category endpoints significantly inflates JSON response size unnecessarily, since list cards only display title, slug, description, category, author, and image.
**Action:** Always project specific card fields (`id, title, slug, description, image_url, category, author, created_at`) on news list queries and reserve `select('*')` for single news item detail queries by slug.
