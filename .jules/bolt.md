# Bolt's Journal - Critical Learnings

## 2026-08-25 - Selective Projection for Database Queries in News Portal
**Learning:** Fetching heavy text columns like `content` during list rendering (`getAllNews`, `getNewsByCategory`, `searchNews`) inflates network payload sizes and slows down database query execution and deserialization, even though list views only display card metadata (`title`, `description`, `image_url`, `category`, `created_at`).
**Action:** Always project specific required columns (`id, title, slug, description, image_url, category, created_at`) for list endpoints, reserving full column queries (`select('*')`) for single item detail endpoints (`getNewsBySlug`).
