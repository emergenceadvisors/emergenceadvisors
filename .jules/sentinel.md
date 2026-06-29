## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.
## 2024-06-25 - Third-Party Data Exfiltration Risk in Forms
**Vulnerability:** Sending form data containing Personally Identifiable Information (PII) to unauthorized free third-party services (like `formsubmit.co`) via frontend AJAX.
**Learning:** Hardcoded emails and the use of third-party mailer API endpoints in client-side code exposes private contact information and redirects form submissions through unvetted infrastructure when native, secure alternatives (e.g., Netlify Forms) are available.
**Prevention:** Always leverage the platform's native handling capabilities (e.g. `data-netlify="true"`) or a controlled backend API. Never route sensitive data through external free services, especially when using simple AJAX payloads. Submit directly via POST to `/` with urlencoded data if native integration supports it.
