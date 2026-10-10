# Bolt's Journal - Critical Learnings

## 2025-05-20 - Exclude full article content from news list endpoints
**Learning:** In news listing and search endpoints (`/api/news`, `/api/news/category/:category`, `/api/news/search`), requesting `select('*')` transfers the full `content` column for every news item. As news articles contain long body text, fetching `content` in list views substantially increases payload size, memory usage, and database-to-backend bandwidth.
**Action:** Always specify explicit field projections (`select('id, title, slug, description, image_url, category, author, published, created_at, updated_at')`) for list endpoints, leaving full `content` fetches to the single-item detail endpoint (`/api/news/:slug`).
