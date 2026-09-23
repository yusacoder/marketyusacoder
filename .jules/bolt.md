## 2025-01-01 - Client-side In-Memory API Caching for Static Resources
**Learning:** For static/rarely changing backend endpoints like category navigation listings in Single Page or Multi Page Vanilla JS apps, client-side in-memory caching (`categoriesCache`) prevents unnecessary HTTP network roundtrips on repeated function calls or component re-renders.
**Action:** When rendering static navigation or reference data in JS, store fetched response data in a module-level variable before initiating duplicate network fetches.
