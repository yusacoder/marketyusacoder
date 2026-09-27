# Bolt's Performance Journal

## 2026-09-27 - Selective Column Retrieval in List Endpoints
**Learning:** Database queries for list endpoints using `SELECT *` over-fetch large text/blob columns (such as full article `content`) that are never rendered in list views. This unnecessarily inflates database transfer overhead, API response payload size, network transfer latency, and client-side JSON parsing time.
**Action:** Always project only the required fields (`id, title, slug, description, image_url, category, author, published, created_at`) on list/search endpoints, reserving full column fetches (`SELECT *`) exclusively for detail page endpoints.
