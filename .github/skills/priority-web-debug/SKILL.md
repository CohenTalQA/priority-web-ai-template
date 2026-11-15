---
name: priority-web-debug
description: 'Use when a Priority Web Playwright test fails, hangs, misses a dialog, has a stale locator, loses focus, or behaves differently in headed and headless browsers.'
---

# Priority Web Debugging

1. Preserve the failing state and identify the last verified checkpoint. Ask whether to resume or restart before another business run; reproduce from the preceding step when approved.
2. Inspect the current page, dialog, locator scope, and sanitized failure output. Treat traces, screenshots, and reports as sensitive. Never reveal credentials or session data.
3. Check screen readiness, blocking dialogs, accessible names, session conflicts and actual business state. Separate observed facts from hypotheses.
4. An unexpected popup must be handled at that exact step or the user must be asked to exit and restart. Do not suppress error dialogs or automatically confirm unknown actions.
5. Make the smallest change that addresses the cause without reopening a locked flow without permission. Do not retry create, submit, upload, or other mutations unless the operation is known to be safe.
6. Validate with the narrowest approved check and typecheck. Report the checkpoint, evidence, remaining risks, and next step. Ask approval before saving a new lesson.