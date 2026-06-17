## 2024-06-17 - HTML Form Input Validation Limits
**Vulnerability:** Missing input length limits on frontend HTML forms. This can lead to excessively large payloads being sent to the backend, causing potential Denial of Service (DoS) or database string truncation issues.
**Learning:** Even simple static sites using third-party form handling (like Netlify forms) need frontend validation to prevent abuse and ensure data integrity.
**Prevention:** Always add `maxlength` attributes to text inputs and textareas based on reasonable expected lengths for the field data.
