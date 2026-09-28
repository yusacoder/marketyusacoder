## 2025-09-28 - Exclude Heavy Text Columns in List Queries
**Learning:** For database-backed APIs, `SELECT *` in list endpoints transfers full body content for every row unnecessarily. Explicitly selecting card metadata (`id`, `title`, `slug`, `description`, `image_url`, `category`, `created_at`, `author`) dramatically reduces payload size and response latency while keeping full `content` loading isolated to detail views.
**Action:** When querying collection/list endpoints from SQL/Supabase, always specify only the columns required by summary UI cards.
