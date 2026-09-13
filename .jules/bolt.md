
## 2026-09-13 - Select specific columns for news list endpoints
**Learning:** Fetching full article content (`select('*')`) in news list, category filter, and search API endpoints introduces unnecessary payload overhead and database transfer latency when only card metadata is rendered on the frontend.
**Action:** Always project only required fields (`id, title, slug, description, image_url, category, created_at`) for list endpoints, leaving full `content` fetching for detail endpoints (`getNewsBySlug`).
