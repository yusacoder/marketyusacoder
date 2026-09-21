## 2025-05-20 - Exclude Heavy Text Fields in List Endpoints
**Learning:** For database tables containing full-text columns like `content`, querying `select('*')` in list endpoints (e.g. news feeds, categories, search results) fetches large unneeded strings for every row, significantly bloating network payload sizes and increasing database projection overhead.
**Action:** Always project specific required columns (`id, title, slug, description, image_url, category, author, created_at`) for list views, leaving full body columns only for single item detail endpoints (`getNewsBySlug`).
