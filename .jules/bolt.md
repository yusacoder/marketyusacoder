## 2026-07-24 - [Favorites lookup optimization]
**Learning:** Frequent JSON parsing and array indexing on localStorage values is an unnecessary bottleneck when querying and toggling favorites in search filters and grid rendering.
**Action:** Use an in-memory Set cache that lazily loads from localStorage on first access to offer O(1) lookups and O(1) mutations while keeping the underlying storage synchronized.
