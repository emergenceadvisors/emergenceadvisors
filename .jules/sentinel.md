## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.

## 2024-06-18 - Exposed Email via 3rd-Party Form Service
**Vulnerability:** Client-side form submissions relying on `formsubmit.co` exposed the destination email address (`info@emergence-advisors.com`) directly in the `fetch` API endpoint URL.
**Learning:** Using basic third-party form services via frontend JavaScript often leaks the routing destination, leaving email addresses highly vulnerable to scraping and spam.
**Prevention:** Leverage secure, infrastructure-level form handling (like Netlify Forms) which allows form submissions to a generic relative path (`/`) without exposing the final delivery email address in client-side code.
