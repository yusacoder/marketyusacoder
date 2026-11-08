# Bolt's Journal

## 2025-05-14 - Exclude heavy article content from news list queries
**Learning:** In the Supabase `news` table, full article text is stored in the `content` column. Cards and list views only require metadata (`id, title, slug, description, image_url, category, author, created_at`). Querying `select('*')` on list/search endpoints transfers unnecessary heavy text blobs across the network and increases memory overhead.
**Action:** Always project specific required columns (`NEWS_LIST_FIELDS`) for listing and searching news, reserving full row selection (`select('*')`) exclusively for detail endpoints (`getNewsBySlug`).
