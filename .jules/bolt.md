## 2025-05-18 - News List Payload Optimization
**Learning:** Returning `*` from Postgres/Supabase on news list endpoints transfers full article HTML/text (`content`) for every card, ballooning payload size unnecessarily when only card summaries (`description`, `title`, `image_url`) are rendered.
**Action:** Always project specific required columns for list endpoints in Supabase (`select('id, title, slug, ...')`) and reserve full `content` fetching for single-item detail routes (`getNewsBySlug`).
