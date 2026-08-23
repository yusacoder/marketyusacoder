## 2026-08-23 - Avoid SELECT * on List Query Endpoints

**Learning:** Database tables containing full article texts or long HTML/Markdown strings (`content`) incur massive bandwidth and serialization overhead when retrieved in bulk using `SELECT *`. In this architecture, list endpoints (`/api/news`, `/api/news/category/:category`, `/api/news/search`) only require card metadata (`id`, `title`, `slug`, `description`, `image_url`, `category`, `author`, `created_at`).

**Action:** Always explicitly specify required columns in list query endpoints, omitting heavy body/content fields which are only needed by detail endpoints (`/api/news/:slug`).
