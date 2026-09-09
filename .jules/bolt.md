## 2026-09-09 - Resource Hints for Cross-Origin API Requests
**Learning:** Preconnecting to the external backend domain (`https://api.yusacoder.com`) via `preconnect` and `dns-prefetch` resource hints in HTML `<head>` eliminates round-trip time spent on DNS lookup, TCP handshake, and TLS negotiation before the initial JavaScript fetch requests fire.
**Action:** Always add preconnect and dns-prefetch links in HTML entry points when frontend applications rely on a dedicated cross-origin API server.
