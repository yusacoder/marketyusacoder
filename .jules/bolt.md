# Bolt Journal - Critical Learnings

## 2026-10-18 - Select Specific Attributes for List Endpoints
**Learning:** In Supabase / Express REST APIs that render article/news list views (cards), querying with `select('*')` includes full body text fields (`content`), significantly increasing database response payload sizes and network latency.
**Action:** Always project only card summary fields (`id, title, slug, description, image_url, category, created_at`) on list and search query endpoints, reserving `select('*')` only for detail endpoints (`getNewsBySlug`).
