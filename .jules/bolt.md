# Bolt's Journal

## 2025-02-18 - Select-list projection optimization for news queries
**Learning:** In full-stack applications with separated list and detail views (such as news portals or blogs), querying `select('*')` on list endpoints forces PostgreSQL and Node.js to load, serialize, and transfer the full text `content` column for every item in the list even though frontend cards only display titles, slugs, and snippets.
**Action:** Always project only the minimal card-required columns (`NEWS_LIST_FIELDS`) in list/category/search queries, reserving full text `content` retrieval exclusively for detail routes (`/api/news/:slug`).
