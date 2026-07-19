# Bolt's Journal

This journal tracks critical performance learnings, codebase-specific patterns, unexpected bottlenecks, or failed optimizations.

## 2026-03-01 - Set Cache Optimization Pattern
**Learning:** Parsing `localStorage` on every check or render block is highly inefficient as JSON parsing and DOM operations block the main thread. Using a lazily-initialized in-memory `Set` provides O(1) lookups and eliminates redundant JSON parsing.
**Action:** Always prefer Set-based caching over repetitive `JSON.parse` + `Array.prototype.includes` lookups on frequently read application state.
