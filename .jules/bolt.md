# Bolt's Journal - Critical Learnings

## 2025-05-15 - [Search Debouncing & DOM Caching]
**Learning:** In vanilla JS applications that rely on real-time filtering and DOM re-rendering, missing debouncing on search inputs is a significant bottleneck. Every keystroke triggers expensive string operations and DOM manipulations. Additionally, repeated `document.getElementById` calls in high-frequency functions (like rendering) add unnecessary overhead.
**Action:** Always implement a 300ms debounce for search/filter inputs and cache frequently accessed DOM elements during initialization to keep the main thread responsive.
