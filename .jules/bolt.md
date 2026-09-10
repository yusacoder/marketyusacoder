## 2026-09-10 - Exclude heavy content column from Supabase news list queries
**Learning:** Returning large `TEXT` columns (`content`) in list/search queries (`SELECT *`) transfers unnecessary data over the network, increasing Supabase egress bandwidth and response times when only card metadata (title, category, date, image) is required.
**Action:** Always project specific required columns (`select('id, title, slug, ...')`) in database list endpoints, reserving full column queries for detail endpoints.
