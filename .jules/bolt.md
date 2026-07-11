## 2026-07-11 - Search Debouncing with Synchronized Inputs
**Learning:** When synchronizing multiple search inputs (e.g., desktop and mobile), the synchronization must remain immediate while the processing-heavy logic (like filtering and DOM updates) should be debounced. This ensures both inputs show the same value at all times without sacrificing performance.
**Action:** Always separate state/value synchronization from expensive side effects in debounced event handlers.
