## 2024-05-27 - Automated Review Hallucination regarding navMap
**Learning:** Automated code review claimed `navMap` was undefined and not in the application code, despite it being clearly defined at line 1369 in `index.html`.
**Action:** When automated code review makes factual errors about code state, rely on direct file inspection (like grep) to verify truth, and confidently override the review feedback.
