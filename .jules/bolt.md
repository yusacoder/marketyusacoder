# Bolt's Journal

## 2025-05-20 - Payload Size Optimization in Database Queries
**Learning:** Returning full table rows (`select('*')`) in list/feed endpoints transfers unneeded heavy text columns (such as full article `content`) over the network, leading to larger response payloads, increased database I/O, higher latency, and greater browser memory usage.
**Action:** Always project specific required columns (`select('id, title, slug, ...')`) in feed and list queries, reserving `select('*')` or detailed columns only for single item detail endpoints.
