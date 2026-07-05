# Bolt's Journal - GeassMarket Performance Learnings

## 2025-07-05 - Search Bottleneck & Optimization
**Learning:** The application currently performs expensive array filtering and string manipulations (`toLowerCase`, `includes`) on every keystroke in both desktop and mobile search inputs. As the product list grows, this will lead to noticeable input lag and main thread blocking.

**Action:** Implement a `debounce` helper to rate-limit filtering execution and pre-calculate search indices for products to move string concatenation and lowercasing out of the hot filtering path.
