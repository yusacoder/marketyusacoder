# Bolt's Journal - Performance Insights & Learnings

## 2025-08-30 - Select Specific Fields for News Listing Endpoint & Cache Static Categories
**Learning:** Fetching `select('*')` on list endpoints (`getAllNews`, `getNewsByCategory`, `searchNews`) retrieves full article `content` text for every item, transferring unnecessary megabytes over network and database connection, even though card view only displays `title`, `description`, `category`, `image_url`, `slug`, and `created_at`. In addition, `getCategories` serves static data without HTTP caching headers.
**Action:** Select specific columns (`id, title, slug, description, category, image_url, created_at, published`) on news listing queries to significantly cut payload size and DB transfer overhead. Add HTTP `Cache-Control` header for static category endpoints.
