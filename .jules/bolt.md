## 2025-05-23 - Search Performance Optimization
**Learning:** In applications with real-time search, triggering filter logic on every keystroke can lead to significant DOM thrashing and CPU usage, especially as the product list grows. Additionally, repeated string operations like `toLowerCase()` inside a filter loop are expensive.
**Action:** Use debouncing to rate-limit search triggers and pre-calculate search indices for data to keep the filter loop as lean as possible.
