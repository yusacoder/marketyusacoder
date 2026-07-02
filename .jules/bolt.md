## 2025-05-14 - [Debounce Search Input]
**Learning:** In a vanilla JS application with frequent DOM re-renders (like a product grid), debouncing search input is a high-impact, low-effort optimization. It prevents the main thread from being blocked by redundant filtering logic and DOM updates during rapid typing.
**Action:** Always check if frequent event listeners (input, resize, scroll) trigger expensive operations and apply debouncing/throttling accordingly.
