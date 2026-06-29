## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.
## 2024-06-26 - Data Exfiltration via Third-Party Form Submission Service
**Vulnerability:** Contact form submissions containing potentially sensitive user information were being routed through a third-party service (`formsubmit.co`) rather than being handled natively, leading to unnecessary exposure and potential data exfiltration.
**Learning:** Netlify native form handling is preferred to reduce the attack surface. Sending data natively requires using `application/x-www-form-urlencoded` encoding to `/` and adding `data-netlify="true"` to the form.
**Prevention:** Avoid using third-party form processors when a native platform solution like Netlify Forms is available and can securely handle form routing and submissions directly.
