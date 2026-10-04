## 2026-10-04 - Exclude Heavy Text Fields in List Query Projections
**Learning:** Selecting all columns (`select('*')`) on news listing/search endpoints transfers heavy text content columns (`content`) that are only needed on single item detail views. Specifying required card metadata columns reduces Supabase query payload and network response sizes.
**Action:** Always project only necessary card fields for collection list/search endpoints and reserve full-table column queries for detail/by-slug endpoints.
