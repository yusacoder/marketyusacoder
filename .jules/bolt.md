## 2026-11-05 - Multi-Page Application State & Redundant Nav Requests
**Learning:** In a vanilla HTML/JS multi-page application (MPA), shared UI components (like category navigation in the header) execute on every full page transition. Since in-memory JS variables reset upon navigation, static or rarely changing metadata requests (such as `/api/categories`) re-fetch on every click unless stored in `sessionStorage` or `localStorage`.
**Action:** Use `sessionStorage` for cross-page navigation caching in vanilla JS MPAs to avoid repeated network roundtrips to remote backend endpoints.
