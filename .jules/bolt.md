## 2025-05-10 - Select specific columns for news listing endpoints
**Learning:** Selecting `*` on the `news` table in Supabase queries returns the full article `content` text for every item in list and search views, unnecessarily inflating network response payloads and database serialization time.
**Action:** Always select only the required lightweight columns (`id`, `title`, `slug`, `description`, `image_url`, `category`, `created_at`) on endpoints serving lists or cards, leaving `content` for detail queries.
