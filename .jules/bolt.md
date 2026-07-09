## 2025-07-09 - Search Debouncing Optimization

**Learning:** Rapid input events in a vanilla JS application can lead to excessive DOM re-rendering and layout thrashing, especially when the filter logic and grid rendering are tightly coupled.

**Action:** Always debounce search inputs and other high-frequency events that trigger expensive UI updates. For this project, a 300ms debounce window was optimal to balance responsiveness and efficiency.

## Codebase-specific Performance Pattern
In this project, search inputs are synchronized across desktop and mobile. When implementing debouncing, ensure that the input value synchronization remains immediate (outside the debounce) while the heavy processing (filtering/rendering) is deferred. This maintains a snappy UI feel without the performance cost.
