## 2025-05-20 - Payload Size Reduction on News List Endpoints
**Learning:** Returning full article `content` strings in list/feed endpoints drastically increases database egress and JSON response payload size when cards only render summary metadata.
**Action:** Always project specific card fields (`id, title, slug, description, category, image_url, created_at, published`) on list queries and reserve full column selection (`*`) for single-item detail endpoints (`getNewsBySlug`).
