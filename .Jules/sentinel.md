## 2024-07-26 - Adding HTTP Security Headers via _headers file
**Vulnerability:** Missing HTTP security headers (e.g., Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Netlify-hosted static sites can easily implement robust HTTP security headers by adding a `_headers` file to the root directory. This provides an effective layer of defense-in-depth without any code changes.
**Prevention:** Include a `_headers` file with secure defaults in all static site deployments.
