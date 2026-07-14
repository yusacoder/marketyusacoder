## 2026-07-14 - Search Synchronization vs Debouncing
**Learning:** In applications with multiple synchronized search inputs (e.g., desktop and mobile views), debouncing the entire input handler can lead to a sluggish "out of sync" feel. Value synchronization must remain immediate while the performance-intensive filtering/rendering logic is debounced.
**Action:** Always decouple immediate UI state updates (like value mirroring) from expensive background operations (like filtering) when applying debouncing to shared input states.
