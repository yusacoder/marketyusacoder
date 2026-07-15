## 2026-07-15 - Debounced Search Input Synchronization
**Learning:** In applications where multiple search inputs (e.g., desktop and mobile) are synchronized, the synchronization logic must remain immediate while the processing-heavy filtering logic is debounced. This prevents the "laggy" typing feel while still achieving the performance benefits of reduced DOM re-renders.
**Action:** Always separate lightweight state updates (like value syncing) from heavy operations (like list filtering) when implementing debouncing on shared input fields.
