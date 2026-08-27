## 2026-08-27 - Selective Field Querying for News Grid Endpoints
**Learning:** Returning full article `content` text fields in list/search APIs unnecessarily inflates database query payloads and backend response sizes when cards only require thumbnail/metadata fields (`id, title, slug, description, image_url, category, created_at`).
**Action:** Always project specific required columns (`select('id, title, slug, ...')`) for list endpoints instead of using wildcard `select('*')`.
