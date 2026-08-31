## 2025-05-18 - Avoid SELECT * on Supabase List Endpoints
**Learning:** Fetching full `content` text fields in list endpoints (`getAllNews`, `getNewsByCategory`, `searchNews`) inflates network payload size unnecessarily, slowing down page loads and increasing database bandwidth usage.
**Action:** Always project specific required columns (`id, title, slug, description, image_url, category, created_at`) for list queries and reserve full article content fetching for single-item detail endpoints.
