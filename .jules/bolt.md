## 2025-05-15 - Search Performance Optimization
**Learning:** Pre-calculating a concatenated search index for items significantly reduces CPU overhead during filtering compared to on-the-fly string lowercasing and multi-property checks. Combining this with debouncing provides a much smoother user experience in vanilla JS applications.
**Action:** Always consider pre-indexing searchable content during the initial data load or fetch phase for client-side filtering. Use shared debounced functions for related input fields to keep logic clean and efficient.
