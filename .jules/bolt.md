# Bolt's Journal - Critical Learnings Only

## 2026-08-02 - LocalStorage Parse Overhead in Rendering Loops
**Learning:** Checking or updating favorite status using `JSON.parse(localStorage.getItem(...))` on every single card render or filter check triggers repeated disk/memory reads and expensive deserializations, scaling poorly as card count grows.
**Action:** Use an in-memory `Set` cache (`this._cache`) that is lazily loaded from localStorage on first access. This guarantees O(1) in-memory checks and avoids any parsing during high-frequency operations.
