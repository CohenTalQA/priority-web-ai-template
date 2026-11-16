# Repository instructions

- This is a Priority Web starter, not a Priority Desktop automation project.
- Use TypeScript and Playwright Test for browser automation.
- Put user-facing sanity checks in `tests/sanity` and reusable page objects in `src/pages`.
- Import `test` and `expect` from `src/fixtures/test-fixtures.ts` when custom fixtures are needed.
- Prefer accessible, user-facing locators: `getByRole`, `getByLabel`, and `getByTestId`.
- Avoid CSS/XPath selectors, fixed sleeps, test ordering, and shared mutable state. When Priority exposes no usable accessible locator, inspect the current DOM and use the smallest stable scoped selector; document the reason.
- Never log credentials, tokens, cookies, or values entered into password fields.
- Keep tests independent and use Playwright auto-waiting assertions.
- Run `npm run lint`, `npm run typecheck` and the narrowest relevant test before reporting completion. Run `npm run test:unit` for infrastructure changes.
- Preserve unrelated changes and do not commit `.env`, reports, traces, videos, or browser state.
- Treat screenshots, traces, reports and test data as potentially sensitive; share only after review.
- Start new features from `main` on a feature branch. Do not commit, push or merge without explicit user approval.
- Before a new run or feature, summarize relevant prior lessons and ask approval before saving new lessons; ask the user whether to resume or restart. Do not run a business flow until the start point is approved.
- Record actual checkpoints and the next step. Do not modify a user-confirmed working flow without permission. After confirmation, ask about committing, pushing and locking it before moving on.
- Never blindly retry mutations or dismiss unexpected dialogs. Stop and ask when the business effect or popup is unknown. A user-defined final success confirmation may be acknowledged.
- For flows that create data, document an approved cleanup or cancellation procedure before declaring the flow locked; ask if none is known. Do not run destructive actions without approval.
- Read `.github/skills/priority-web-discovery/SKILL.md` for Priority Web investigation and choose the matching flow or troubleshooting skill as needed.
