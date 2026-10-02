## 2026-10-02 - Exclude Heavy `content` Field in Supabase List Queries
**Learning:** Returning full text content in API list endpoints (`getAllNews`, `getNewsByCategory`, `searchNews`) wastes database I/O, network bandwidth, and memory because card list components only display title, description, category, author, and date.
**Action:** Always project specific required columns (`id, title, slug, description, image_url, category, author, created_at`) on list/feed endpoints while preserving `.select('*')` for detail endpoints (`getNewsBySlug`).
