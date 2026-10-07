## 2025-05-10 - Omit full article text from list queries

**Learning:** Sockets and bandwidth are consumed unnecessarily when `SELECT *` fetches full article HTML/text content (`content` field) in news card listing routes (`getAllNews`, `getNewsByCategory`, `searchNews`), even though the frontend list renderer (`createNewsCard`) only uses title, slug, description, image_url, category, author, and date.
**Action:** Always project only necessary columns (`id, title, slug, description, image_url, category, author, created_at`) for list/grid endpoints, reserving full body text fetches solely for detail page queries (`getNewsBySlug`).
