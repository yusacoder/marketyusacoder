## 2026-09-22 - Omit Full Article Content in News List Queries

**Learning:** Database queries fetching news feeds/cards with `select('*')` transfer full article body content unnecessarily, increasing network payload size and DB query processing overhead.
**Action:** Select only card display fields (`id, title, slug, description, image_url, category, created_at, published`) for feed and search endpoints, reserving `select('*')` or full content retrieval exclusively for single article detail endpoints (`getNewsBySlug`).
