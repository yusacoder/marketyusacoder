# Bolt's Journal - Critical Performance Learnings

This journal documents critical performance-related learnings discovered during the development of GeassMarket.

## 2025-05-14 - Search Optimization
**Learning:** Frequent DOM re-renders and string operations during search can be a bottleneck in vanilla JS apps with many products.
**Action:** Use debouncing for input events and pre-calculate search indices to minimize per-filter computation.
