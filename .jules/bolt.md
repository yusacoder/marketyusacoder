## 2026-08-09 - Redundant localStorage Access in Render/Filter Loops
**Learning:** Accessing and parsing `localStorage` synchronously inside product card render loops and category/search filtering loops causes severe performance degradation, especially during user search keypresses. Utilizing an in-memory `Set` cache provides O(1) lookups and avoids redundant serialized parsing.
**Action:** Avoid calling storage/retrieval methods inside recursive or loop structures. Implement lazy initialization and in-memory caching for read-heavy state objects.
