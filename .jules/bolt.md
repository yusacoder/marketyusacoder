## 2026-10-16 - Selective column retrieval for list views
**Learning:** Returning full table columns (specifically long `content` text fields) in list/card API endpoints inflates payload size and DB transfer latency unnecessarily. Selecting only `id, title, slug, description, image_url, category, created_at` for news card views keeps list requests light while leaving full `content` fetches to detail views (`/api/news/:slug`).
**Action:** When creating or querying list endpoints, define explicit column projection constants for card/summary views to avoid `SELECT *`.
