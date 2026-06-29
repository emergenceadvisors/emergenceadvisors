## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.
