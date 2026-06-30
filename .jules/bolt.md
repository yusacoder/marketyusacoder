## 2026-06-30 - Search performance and DOM overhead
**Learning:** In Vanilla JS applications with dynamic filtering, every keystroke triggers a full cycle of `filter -> sort -> DOM lookup -> innerHTML render`. For larger product lists, this causes noticeable main-thread jank.
**Action:** Always implement debouncing for search inputs and cache DOM elements during initialization to minimize expensive operations in the render loop.
