## 2025-05-14 - Search Debouncing
**Learning:** In synchronized search inputs (desktop/mobile), value synchronization must remain immediate (outside the debounce) while the processing-heavy `applyFilters` logic is deferred to maintain a responsive UI feel.
**Action:** Always sync input values synchronously before calling the debounced filter function when multiple inputs control the same state.
