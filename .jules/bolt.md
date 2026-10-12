## 2025-05-10 - Exclude Heavy Text Columns in List Queries
**Learning:** Querying full article text (`content`) during list and search operations significantly inflates database IO and network payload size without adding value for UI card rendering.
**Action:** Always restrict `select()` fields on Supabase query builders to summary properties on list/search endpoints, reserving `select('*')` for detail endpoints.
