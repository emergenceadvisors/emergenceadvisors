## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors and abuse if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, based on reasonable expected lengths for the field data, even if server-side handles ultimate validation.
## 2024-05-18 - Fix data exfiltration via third-party form handler
**Vulnerability:** Contact form data (including PII like names, emails, and phone numbers) was being sent to a third-party endpoint (formsubmit.co) instead of a first-party domain, introducing a data exfiltration risk and violating privacy expectations.
**Learning:** Relying on third-party form handlers exposes user data to external entities unnecessarily, especially when the hosting provider (like Netlify) offers native form handling solutions.
**Prevention:** Utilize native form handling provided by the hosting platform (e.g., Netlify Forms) to ensure data remains within first-party control and is processed securely without relying on external services.
