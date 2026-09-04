# Bolt's Journal - Critical Learnings

## 2025-05-18 - Select Specific Fields for List Endpoints
**Learning:** Fetching full article `content` text (`select('*')`) in news list, category, and search API responses unnecessarily inflates JSON payload size by over 50-80% per item when only card metadata (title, slug, description, category, date, image) is rendered in the frontend grid.
**Action:** Always project specific required columns for list endpoints (`id, title, slug, description, image_url, category, author, published, created_at`) and reserve `select('*')` or full content queries for single-item detail views (`getNewsBySlug`).
