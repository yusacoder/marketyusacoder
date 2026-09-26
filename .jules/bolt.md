## 2026-09-26 - Explicit Column Selection for List Queries
**Learning:** Fetching full text content (`select('*')`) in list endpoints (all news, category news, search) transfers unnecessary large payloads across the network when the frontend only requires metadata (title, slug, description, category, author, image_url, date).
**Action:** Always project specific required columns for list/summary endpoints and reserve full column queries (`select('*')`) for detail endpoints (`/api/news/:slug`).
