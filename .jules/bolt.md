## 2025-05-14 - [Search Debouncing]
**Learning:** In a vanilla JS app with dynamic grid rendering, rapid input events (like search) can lead to excessive DOM churn and filtering overhead, especially as the product list grows. Debouncing the input listener is a high-impact, low-risk optimization.
**Action:** Always debounce search/filter inputs by 200-300ms to ensure the main thread stays responsive during user interaction.

**Impact Analysis:**
- **DOM Operations:** Reduces `renderGrid` calls by ~80-90% during active typing (assuming 5 keys/sec).
- **CPU Usage:** Significantly lowers filtering overhead (`applyFilters`) by batching multiple input events into a single execution.
- **Perceived Performance:** Prevents "stuttering" UI while the user is typing, as the browser doesn't have to re-layout the grid on every keystroke.
