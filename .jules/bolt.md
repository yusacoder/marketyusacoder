## 2025-05-14 - Optimized Search with Debouncing and Pre-indexing
**Learning:** In a vanilla JS application with a large list of items, performing multiple `.toLowerCase()` and string concatenations inside a `filter` loop during every keystroke can lead to noticeable lag. Combining input debouncing with a pre-calculated search index significantly improves UI responsiveness and reduces CPU usage.
**Action:** Always pre-calculate search indices for static data during the initialization phase and use debouncing for any input that triggers DOM re-rendering.
