## 2026-09-03 - Supabase Payload Optimization on List Endpoints
**Learning:** Returning `select('*')` on list and search endpoints includes heavy text columns (`content`), increasing database network transfer and response payload sizes unnecessarily.
**Action:** Always project specific required columns (`id, title, slug, description, image_url, category, created_at, published`) on list/grid queries and reserve `content` for single-item detail endpoints.
