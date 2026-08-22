# Bolt's Performance Journal

## 2026-08-22 - Explicit Column Selection in Supabase Queries
**Learning:** Returning full table records (`SELECT *`) in news listing endpoints downloads full article body contents (`content`), significantly increasing database I/O, network bandwidth, and memory allocation for JSON serialization.
**Action:** Always specify explicit projections (e.g. `.select('id, title, slug, description, image_url, category, created_at')`) for list/collection API endpoints, reserving full column fetches for single-item detail views.
