# Bolt's Performance Journal

Critical learnings only. No routine logs.

## 2025-02-17 - Supabase Text Column Overfetching
**Learning:** In mini-news and blog architectures using Supabase/PostgreSQL, selecting `*` for list endpoints forces retrieval and serialization of large article body text (`content`), which can represent over 70-90% of the row byte size despite never being displayed on list/card views.
**Action:** When querying list, category, or search endpoints, explicitly project only card metadata fields (`id, title, slug, description, image_url, category, author, created_at`) and reserve full `content` queries strictly for single item slug/detail routes.
