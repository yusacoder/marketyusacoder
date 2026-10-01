## 2026-10-01 - Supabase Column Selection in Feed Queries
**Learning:** Returning `*` (including full article text `content`) in list/feed endpoints adds significant unnecessary overhead to backend responses and frontend network consumption. Selecting explicit card columns (`id, title, slug, description, image_url, category, created_at, author`) drastically reduces database egress and response JSON size.
**Action:** Always project only required fields in list endpoints and leave large blob/TEXT fields for detail-by-id/slug routes.
