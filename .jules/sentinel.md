## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.
## 2026-06-21 - Prevent Data Exfiltration via Third-Party Form Handlers
**Vulnerability:** Third-party form handlers (e.g. formsubmit.co) expose user PII and data to external servers not controlled by the application.
**Learning:** When using static sites with Netlify, we can and should leverage native Netlify Forms rather than insecure external integrations to prevent unintentional data exfiltration.
**Prevention:** Utilize native form handling mechanisms (like Netlify Forms) configured securely to endpoints the application controls directly, minimizing external dependency attack surfaces.
