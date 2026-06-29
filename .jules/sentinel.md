## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.

## 2024-06-24 - Data Exfiltration Risk in Third-Party Form Submission
**Vulnerability:** Form data containing PII (Personally Identifiable Information) and business details was being submitted to a third-party service (`formsubmit.co`) via an AJAX fetch request, which poses a data exfiltration and privacy security risk.
**Learning:** Using third-party form processors in static HTML projects introduces an unnecessary external dependency that has access to all submitted sensitive user data. This violates the principle of least privilege and data minimization.
**Prevention:** Always use first-party infrastructure (like Netlify Forms native functionality in this context) to process sensitive form submissions. Configure forms to use internal endpoints securely without exposing user data to unvetted third parties.
