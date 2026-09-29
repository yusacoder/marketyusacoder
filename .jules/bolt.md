## 2026-09-29 - Payload Optimization for List Endpoints
**Learning:** Returning full article `content` body in list and search endpoints bloats network payloads and slows down response parsing when cards only require summary metadata (`title`, `slug`, `description`, `image_url`, `category`, `created_at`).
**Action:** Always project specific required columns in list endpoints instead of using `select('*')`.
