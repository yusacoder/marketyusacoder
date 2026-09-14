# Bolt's Journal - Critical Performance Learnings

## 2025-05-18 - Excluding Heavy Fields from List Endpoints
**Learning:** Querying full text fields (like `content`) in list/search endpoints generates unnecessary Supabase/PostgreSQL response payload size and network serialization overhead when the frontend cards only render summary metadata.
**Action:** Omit large body columns (`content`) from `select()` in list and search queries, fetching full records only on item detail endpoints (`/api/news/:slug`).
