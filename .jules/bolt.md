## 2025-02-21 - Database Query Column Selection for Feed Endpoints

**Learning:** Returning full article `content` text fields in list/feed API endpoints (`/api/news`, `/api/news/category/:category`, `/api/news/search`) unnecessarily inflates DB query latency, bandwidth usage, and JSON serialization overhead when the UI card components only display article summary metadata.

**Action:** Always project/select specific summary fields (`id, title, slug, description, image_url, category, author, published, created_at`) for list endpoints, reserving `select('*')` or full content retrieval exclusively for detail page endpoints (`/api/news/:slug`).
