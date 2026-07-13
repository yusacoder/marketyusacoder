## 2025-05-14 - Search Input Debouncing
**Learning:** In a vanilla JS application with many products, immediate filtering on every keystroke can lead to UI stutter as the DOM is re-rendered frequently during rapid typing.
**Action:** Implement a 300ms debounce on the search input to batch filtering operations while keeping input value synchronization immediate for a responsive feel.
