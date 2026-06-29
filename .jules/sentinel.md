## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.

## 2025-02-18 - Third-Party Form Submission Data Exfiltration Risk
**Vulnerability:** Form data being submitted to a third-party endpoint (`formsubmit.co`) on a site already configured with a native forms provider (Netlify).
**Learning:** Developers sometimes reach for third-party quick-fix solutions for form submission without realizing the native host (like Netlify) offers built-in, more secure handling. This exposes sensitive PII (Personally Identifiable Information) and consultation details to an unnecessary third party.
**Prevention:** Audit form `action` endpoints or AJAX submission destinations to ensure they use first-party or explicitly vetted internal endpoints. Remove broad `connect-src` CSP rules that allow external form submissions.
