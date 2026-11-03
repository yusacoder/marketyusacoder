# Bolt's Performance Journal

## 2026-08-16 - Selective Projection for List Endpoints
**Learning:** In multi-page architectures where frontends render summary cards, fetching `*` from the database transfers unused heavy text columns (such as `content`) on every item in list and search endpoints, ballooning JSON transfer sizes by ~60-90% and increasing DB serialization overhead.
**Action:** Always project specific card fields (`id, title, slug, description, image_url, category, author, created_at`) on list/search endpoints and reserve `select('*')` for detail/slug view endpoints.
