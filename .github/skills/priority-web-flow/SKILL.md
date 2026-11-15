---
name: priority-web-flow
description: 'Use when planning or implementing a Priority Web Playwright test, login, business flow, cleanup, checkpoint, or user-facing sanity check.'
---

# Priority Web Flow

1. Read `AGENTS.md`, the discovery skill, existing page objects, and relevant approved notes. Identify the expected outcome, role, test data, environment, side effects, and cleanup.
2. Before a new feature or run, summarize applicable previous lessons; ask permission to save any new lesson and ask: "ממשיכים מאותה נקודה או מחדש?" Wait for the starting-point answer before a business run.
3. Start a feature branch from `main` for new work. Respect user-confirmed locked flows; obtain permission before changing them.
4. Inspect the actual Web UI; build the smallest independent Playwright test and reusable page object. Keep environment-specific values in environment variables, and explicitly write supplied field values even if prefilled.
5. Use auto-waiting assertions for readiness, selections and final business outcomes. Only handle specifically understood optional dialogs; do not silently catch click failures or blindly retry state-changing actions.
6. Document actual checkpoints, any manual steps and the next action. For created data, record a user-approved cancellation or cleanup procedure before locking; do not invent one.
7. Run typecheck and the narrowest relevant test when permitted. Explain what passed, what was not verified and any state left behind. Once the user confirms success, ask about commit/push and locking before starting the next feature.