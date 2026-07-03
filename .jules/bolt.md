## 2025-07-03 - [Search Debouncing]
**Learning:** In a vanilla JS application with a large product data set, triggering a full filter and DOM re-render on every keystroke can lead to input lag and poor user experience, especially on lower-end devices or with larger datasets.
**Action:** Always implement a debouncing mechanism for search and other high-frequency input events that trigger expensive DOM operations.
