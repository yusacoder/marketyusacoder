# Bolt's Journal

## 2026-10-23 - Database Query Projection for List Endpoints
**Learning:** In a Supabase / PostgreSQL architecture, using `select('*')` on list endpoints fetches full article body text (`content`) for every list item, significantly increasing database I/O, backend memory usage, and HTTP JSON payload sizes when rendering news cards that only display title, slug, image, category, date, and description.
**Action:** Always project only required fields (`select('id, title, slug, description, image_url, category, created_at')`) for card/list endpoints while reserving `select('*')` for detail endpoints.
