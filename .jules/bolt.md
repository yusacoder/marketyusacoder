## 2026-10-15 - Exclude Unused Heavy Columns in List Endpoint Queries

**Learning:** Database queries for list endpoints that select `*` inadvertently fetch large text columns like `content` (article body) for every row, even though news cards only require metadata (`title`, `slug`, `description`, `image_url`, `category`, `author`, `created_at`). On news portals, fetching full article contents for entire lists significantly bloats network payloads, increases DB transfer latency, and slows down JSON serialization.

**Action:** When querying lists of resources in Supabase/PostgreSQL, explicitly select only the columns needed by the consumer view rather than using `.select('*')`. Reserve full column selection for single resource detail endpoints.
