## 2025-02-17 - Select Specific Columns on List Endpoints
**Learning:** Returning `select('*')` on list/search endpoints includes heavy text columns (`content`), which inflates response JSON size and increases database transfer overhead for cards that only render titles, slugs, and descriptions.
**Action:** Always specify explicit card/list fields (`id, title, slug, description, image_url, category, author, created_at`) on list queries, reserving `select('*')` for detail views (`getNewsBySlug`).
