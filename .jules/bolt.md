# Bolt's Journal - Critical Learnings

## 2025-10-03 - Column Projection for Supabase News List Queries
**Learning:** For list endpoints (`/api/news`, `/api/news/category/:category`, `/api/news/search`), fetching all columns with `select('*')` retrieves full article bodies stored in the `content` text column for every news item. Because list rendering only uses card summary fields (`title`, `slug`, `description`, `image_url`, `category`, `created_at`), returning `content` unnecessarily inflates payload size over the wire.
**Action:** Use specific column projection (`LIST_NEWS_FIELDS`) on list queries to minimize network overhead and database bandwidth, while reserving full column fetches for single-item detail endpoints (`/api/news/:slug`).
