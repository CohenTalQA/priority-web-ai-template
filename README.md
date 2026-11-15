# Priority Web AI Automation Template

A clean Playwright and TypeScript starter for Priority Web, based on the [Playwright framework template](https://github.com/CohenTalQA/playwright-framework-template). It includes reusable AI instructions, skills and specialist agents. No Priority credentials, business flows, or production data are included.

## Included

- TypeScript with strict type-checking
- Chromium, Firefox, and WebKit projects
- Page Object Model example
- A custom fixture that is used by the example test
- Sanity-test folder and npm scripts
- Environment-specific configuration without committed secrets
- Traces, screenshots, and videos on failure
- GitHub Actions with type-checking and HTML report artifacts
- `AGENTS.md` instructions for coding agents
- Priority Web discovery, flow and debugging skills in `.github/skills/`
- Planner, builder, fixer and reviewer agents in `.github/agents/`
- Placeholders for approved, sanitized observations and test-data cleanup in `docs/`

## Create a project from this template

1. Clone your new repository and enter its directory.
2. Install dependencies and browsers:

```bash
npm ci
npx playwright install
```

3. Create your local environment file:

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

4. Set `E2E_BASE_URL` in `.env` to the approved Priority Web environment, then replace the example page object and test with your application flows. The example renders local markup and does not connect to Priority.

The checked-in defaults use `https://example.com`; the example test renders its own markup and requires neither network access nor credentials.

Priority-specific login, selectors, popup handling, session limits and cleanup must be observed and approved for the target environment; the starter does not claim to have verified them. Business actions may create or modify records. Get approval for the run and its starting point, and define cleanup before locking a flow.

## Environment configuration

```dotenv
E2E_BASE_URL=https://example.com
E2E_USERNAME=
E2E_PASSWORD=
```

Do not commit `.env` or environment-specific files. The template deliberately uses `E2E_USERNAME` instead of `USERNAME`, which is already a Windows environment variable.

To load a named file such as `.env.staging`:

PowerShell:

```powershell
$env:TEST_ENV = 'staging'
npm test
```

macOS/Linux:

```bash
TEST_ENV=staging npm test
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all tests in all configured browsers |
| `npm run test:sanity` | Run tests under `tests/sanity` |
| `npm run test:chromium` | Run all tests in Chromium |
| `npm run test:headed` | Run Chromium with a visible browser |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Debug with Playwright Inspector |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run check` | Type-check and run the sanity suite |
| `npm run report` | Open the last HTML report |

## Structure

```text
src/
  fixtures/       Custom Playwright fixtures
  pages/          Reusable page objects
  utils/          Environment and shared utilities
tests/
  sanity/         Fast checks of critical user-visible behavior
.github/workflows/playwright.yml
.github/agents/   Priority Web specialist agents
.github/skills/   On-demand Priority Web workflows
docs/             Approved observations and cleanup procedures
AGENTS.md
playwright.config.ts
```

## Adding a page and test

1. Create a page object under `src/pages`.
2. Add it to `src/fixtures/test-fixtures.ts` when multiple tests need it.
3. Write an independent test under the appropriate `tests` folder.
4. Prefer `getByRole`, `getByLabel`, or `getByTestId` locators.
5. Run `npm run typecheck` and the relevant tests before committing.

Playwright already provides auto-waiting, traces, and detailed HTML reports. Avoid fixed sleeps and wrapper methods that merely duplicate `locator.click()` or `locator.fill()`.

## CI

The included workflow runs on pushes and pull requests to `main`. It installs dependencies and browsers, type-checks the repository, runs the complete test suite, and uploads the HTML report even when tests fail.

Reports, traces, screenshots and videos may contain sensitive application data. Review retention and artifact access before enabling Priority tests in CI. Never commit credentials, `.env`, browser state, or test artifacts.
