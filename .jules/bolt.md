## 2026-09-15 - News List Query Optimization
**Learning:** Selecting all columns (`select('*')`) on news list and search endpoints fetched full article body text (`content`) for every card on the index page, transferring unnecessary kilobytes per news card over Supabase -> Express -> Client.
**Action:** Always project specific required fields (`NEWS_LIST_FIELDS`) on listing/search endpoints when card components only render titles, slugs, and summaries. Reserve full column selection (`select('*')`) strictly for detail page endpoints (`/api/news/:slug`).
