---
name: priority-web-discovery
description: 'Use when investigating Priority Web screens, login, GWT controls, tables, dialogs, locators, and session behavior before browser automation.'
---

# Priority Web Discovery

## Procedure

1. Establish the environment, role, intended flow, approved starting point, and whether actions may change business data. Never request or print secrets in chat or logs.
2. Inspect the live page and accessibility tree. Record the visible screen and readiness condition before interacting. Scope locators to the relevant dialog, row, or form.
3. Prefer role, label, and test ID. If the deployed client does not expose a usable accessible name, inspect the DOM and use a stable, scoped fallback with a short explanation. Do not reuse Desktop UIA identifiers.
4. Verify each navigation by its expected screen or dialog, not just by a click. Investigate optional popups only when the screen is not ready. Unexpected blocking popups require handling at that step or asking the user to exit and restart.
5. Record only user-approved, sanitized findings in `docs/priority-web-notes.md`: environment/version, observed behavior, evidence, and limitations. Do not store credentials, real customer data, or session artifacts.

## Prior observations to revalidate

- Another Priority Web GWT deployment exposed incomplete login input labels and slow startup. Accessibility, fallback locators, and timeouts must be checked in the target environment.
- Startup dialogs may appear late or block other dialogs. Do not globally dismiss errors or confirmations: identify each dialog and its business effect first.
- Another environment allowed one session per user. Confirm session limits before enabling parallel runs; do not assume they apply everywhere.