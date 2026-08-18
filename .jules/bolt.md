## 2025-05-18 - Selective Field Queries in Database List Endpoints
**Learning:** Returning large text columns (like `content` in news articles) in list/search API endpoints inflates network payload size, memory utilization, and JSON parsing latency unnecessarily.
**Action:** Always restrict Supabase/SQL queries to specific required columns (`select('id, title, slug, description, image_url, category, created_at')`) when retrieving data for card/list feeds, leaving full column fetches (`select('*')`) strictly for detail views.
