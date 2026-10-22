## 2026-10-22 - Selective Database Field Projection for News List Endpoints

**Learning:** Database queries using `select('*')` on list views fetch heavy text/HTML content columns (`content`) that are unused on feed/category/search cards. Excluding unneeded columns reduces payload size, database bandwidth usage, and JSON serialization overhead significantly.
**Action:** Always project only required fields (`id`, `title`, `slug`, `description`, `image_url`, `category`, `author`, `created_at`) on collection/list endpoints, and reserve `select('*')` for single-item detail views where full content is actually rendered.
