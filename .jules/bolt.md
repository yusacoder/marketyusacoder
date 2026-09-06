## 2025-05-18 - Avoid selecting full `content` column in news list queries
**Learning:** In this backend architecture, `news` table rows contain full body HTML/text in `content`. Selecting `*` for list and search feeds loads and transmits heavy unused body text for every news card.
**Action:** Always restrict `select()` in feed/search controllers to list fields (`id, title, slug, description, image_url, category, author, created_at`) and reserve `select('*')` for full article detail endpoints.
