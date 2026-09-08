## 2026-09-08 - Selective Column Projections on PostgreSQL/Supabase News List Endpoints
**Learning:** News list and search endpoints were querying all columns (`SELECT *`), fetching large text body content (`content`) for every record even though list cards only render title, description, category, author, and date. Explicitly selecting needed columns (`NEWS_LIST_FIELDS`) drastically reduces backend database payload sizes and network latency for listing APIs.
**Action:** Always project specific required columns in list endpoints on Supabase/PostgreSQL instead of using `select('*')`.
