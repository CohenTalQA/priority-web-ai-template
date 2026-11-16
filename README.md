# Priority Web AI Automation Template

A clean Playwright and TypeScript starter for Priority Web, based on the [Playwright framework template](https://github.com/CohenTalQA/playwright-framework-template). It includes reusable AI instructions, skills and specialist agents. No Priority credentials, business flows, or production data are included.

## Included

- TypeScript with strict type-checking
- Node.js 24 LTS baseline and Biome linting
- Chromium, Firefox, and WebKit projects
- Page Object Model example
- A custom fixture that is used by the example test
- Sanity-test folder and npm scripts
- Environment-specific configuration without committed secrets
- Single-worker execution without automatic retries
- Opt-in failure traces, screenshots, videos, and HTML reports
- GitHub Actions with linting, type-checking and infrastructure tests
- Dependabot update proposals for npm packages and GitHub Actions
- `AGENTS.md` instructions for coding agents
- Priority Web discovery, flow and debugging skills in `.github/skills/`
- Planner, builder, fixer and reviewer agents in `.github/agents/`
- Placeholders for approved, sanitized observations and test-data cleanup in `docs/`

## Create a project from this template

Use Node.js 24 LTS (also recorded in `.nvmrc`) and npm. The minimum runtime is Node 24; CI stays on the explicit LTS baseline rather than changing whenever a new LTS is released.

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
E2E_ARTIFACTS=false
```

Do not commit `.env` or environment-specific files. The template deliberately uses `E2E_USERNAME` instead of `USERNAME`, which is already a Windows environment variable.

`E2E_BASE_URL` must be an absolute HTTP(S) URL without embedded credentials. Invalid configuration stops the run before opening a browser, without printing the supplied value. Existing process variables take precedence over dotenv files.

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

Named files must exist; a typo in `TEST_ENV` fails rather than silently selecting the default environment. Names may contain letters, numbers, underscores and hyphens, starting with a letter or number. An absent default `.env` is allowed so the offline example works immediately after installation.

## Safe execution defaults

Tests use one worker across all browser projects, with no automatic retries. This reduces session conflicts and avoids automatically repeating a mutation after a failed assertion. It does not make business actions safe or establish their outcome. Enable parallelism or retries only for explicitly approved, isolated, repeatable flows. Separate test invocations can still conflict; do not share one Priority account between them.

Failure captures and the HTML reporter are disabled by default because they can contain sensitive data. After approval, set `E2E_ARTIFACTS=true` in the local environment to enable failure traces, screenshots, videos, and HTML reports. Only the exact values `true` and `false` are accepted. With no retries, traces use `retain-on-failure` rather than `on-first-retry`. Turning captures off does not delete previously generated files.

The template's only browser test renders local markup. New business tests require a separately approved environment, starting point, account, data and cleanup procedure. Do not treat a successful template check as verification of Priority login or a business flow.

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all tests in all configured browsers |
| `npm run test:sanity` | Run tests under `tests/sanity` |
| `npm run test:chromium` | Run all tests in Chromium |
| `npm run test:headed` | Run Chromium with a visible browser |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Debug with Playwright Inspector |
| `npm run test:unit` | Test environment loading and validation without a browser or Priority |
| `npm run lint` | Run Biome correctness checks without rewriting files |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run check` | Lint, type-check, test infrastructure and run the sanity suite |
| `npm run report` | Open the last opt-in HTML report |

## Structure

```text
src/
  fixtures/       Custom Playwright fixtures
  pages/          Reusable page objects
  utils/          Environment and shared utilities
tests/
  sanity/         Fast checks of critical user-visible behavior
  unit/           Browser-free infrastructure tests (Node.js test runner)
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
5. Run `npm run lint`, `npm run typecheck` and the relevant approved tests before committing. For infrastructure changes, also run `npm run test:unit`.

Playwright already provides auto-waiting, traces, and detailed HTML reports. Avoid fixed sleeps and wrapper methods that merely duplicate `locator.click()` or `locator.fill()`.

## Maintenance towards 2027

Prefer maintained, compatible releases over speculative version upgrades or extra reporting frameworks. Biome supplies linting without depending on the TypeScript compiler API; the checked registry version of typescript-eslint does not yet declare support for this template's TypeScript 7 baseline. Node's built-in test runner covers infrastructure without another test framework.

Dependabot proposes weekly dependency and Actions updates; it does not automatically merge them. Review compatibility and require checks before merging. Revalidate runtime support, browser support in the deployed Priority client, and dependency compatibility as 2027 approaches. No live Priority deployment has been validated by this starter.

## CI

The included workflow runs on pushes and pull requests to `main`. It uses Node 24, installs dependencies and browsers, runs linting, type-checking, infrastructure tests and the browser suite. It has read-only repository permissions and serializes runs for the same ref without automatically cancelling an active run.

HTML report uploads are disabled by default. To enable them after reviewing data handling, set the repository Actions variable `E2E_ARTIFACTS` to `true`. Reports are then uploaded even when tests fail (unless the run is cancelled), with seven-day retention. The default CI only exercises the offline example; do not add Priority credentials or business flows to automatic push/PR runs without reviewing authorization, trigger isolation and account/session limits.

Reports, traces, screenshots and videos may contain sensitive application data. Review retention and artifact access before enabling Priority tests in CI. Never commit credentials, `.env`, browser state, or test artifacts.
