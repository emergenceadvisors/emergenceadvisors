## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.

## 2024-05-20 - Third-Party Form Submission Data Exfiltration Risk
**Vulnerability:** Contact form using third-party form handler `formsubmit.co` instead of native Netlify endpoint.
**Learning:** Third-party form handlers route sensitive PII through an additional, unnecessary external entity, representing a data exfiltration and privacy security risk. When native secure handling (like Netlify Forms) is available, using a third-party is poor security hygiene and breaks defense-in-depth principles.
**Prevention:** For Netlify deployments, always use native Netlify forms via `data-netlify="true"` and submit `application/x-www-form-urlencoded` POST requests to `/` to ensure data remains within the trusted infrastructure.
