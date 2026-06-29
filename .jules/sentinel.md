## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.

## 2024-06-25 - Third-Party Form Handlers and PII Leakage
**Vulnerability:** User Personal Identifiable Information (PII) was being submitted to a third-party form handler (`formsubmit.co`).
**Learning:** Using untrusted third-party services for form submissions constitutes a significant data exfiltration risk and privacy issue when a secure first-party alternative (like Netlify Forms) is available. Additionally, CSP was unnecessarily broad to allow this connection.
**Prevention:** Always default to first-party/integrated form handlers (e.g., Netlify Forms). Use `application/x-www-form-urlencoded` POST requests to `/` to submit data securely on Netlify. Always restrict CSP `connect-src` to `self` unless a strict exception is required.
