## 2024-05-18 - Missing Input Limits on Public Forms
**Vulnerability:** Missing input lengths limits (`maxlength`) on public-facing HTML forms.
**Learning:** Even static sites using Form-as-a-Service providers (e.g. Netlify forms) are susceptible to simple resource exhaustion vectors if limits are absent.
**Prevention:** Always enforce logical constraints client-side (e.g., `maxlength`, `min`, `max`, `pattern`) as defense-in-depth, even if server-side handles ultimate validation.
