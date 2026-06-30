## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.

## 2024-06-28 - Third-Party Form Handler Exfiltration Risk
**Vulnerability:** Form data submitted to unauthorized third-party endpoint (`formsubmit.co`), causing a data exfiltration and privacy security risk.
**Learning:** Hardcoded third-party API endpoints for form processing bypass native secure infrastructure (like Netlify Forms) and expose user data to unvetted external services.
**Prevention:** Always use native platform form handling (e.g. Netlify's `data-netlify="true"`) and submit via POST to the root `/` to ensure data remains within authorized boundaries.

## 2024-07-15 - Missing Security Headers in Static Sites
**Vulnerability:** Static sites often lack default HTTP security headers (like HSTS, X-Frame-Options, X-Content-Type-Options) exposing users to clickjacking, MIME-sniffing, and MITM downgrades.
**Learning:** For platforms like Netlify/Cloudflare Pages, you can provide these configurations declaratively via a simple `_headers` file in the root.
**Prevention:** Always include a `_headers` file with baseline security protections configured for the `/*` path on static repository setups.
