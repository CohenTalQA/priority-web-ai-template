# Playwright Automation Framework Template

Automation framework based on Playwright + TypeScript using Page Object Model (POM).

## 🚀 Features

* Page Object Model (POM)
* BasePage abstraction
* Custom fixtures
* Logging system
* Environment configuration (.env support)
* Screenshots, videos, and traces on failure
* Retry mechanism for flaky tests

---

## 📦 Setup

1. Install dependencies:

```
npm install
```

2. Install Playwright browsers:

```
npx playwright install
```

---

## ⚙️ Environment Configuration

Create a `.env` file based on `.env.example`:

```
BASE_URL=https://example.com
USERNAME=test_user
PASSWORD=123456
ENV_NAME=local
```

### Run with specific environment:

Linux / Mac:

```
TEST_ENV=staging npx playwright test
```

Windows (PowerShell):

```
$env:TEST_ENV="staging"; npx playwright test
```

---

## ▶️ Running Tests

Run all tests:

```
npx playwright test
```

Run specific test file:

```
npx playwright test tests/about.spec.ts
```

Run in UI mode:

```
npx playwright test --ui
```

Run in debug mode:

```
npx playwright test --debug
```

---

## 📊 Reports

Open HTML report after test execution:

```
npx playwright show-report
```

---

## 📁 Project Structure

```
src/
  base/        -> Base classes (BasePage)
  pages/       -> Page Objects
  utils/       -> Helpers (logger, env)
  fixtures/    -> Custom fixtures

tests/         -> Test files
```

---

## 🧠 Creating a New Page

1. Create a new class under `src/pages`
2. Extend `BasePage`
3. Define locators as class properties
4. Add actions and validations

### Example:

```ts
export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByPlaceholder('Username');

  async login(username: string) {
    await this.fill(this.usernameInput, username, 'Username input');
  }
}
```

---

## 🧪 Writing Tests

```ts
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/login');
  await loginPage.login('test_user');
});
```

---

## 🧰 Logging

Logs are automatically printed for actions performed through BasePage.

Example log:

```
[INFO] 2026-03-30T10:00:00.000Z - Clicking: Login button
```

---

## 🔁 Retries & Debugging

* Retries are enabled in CI environment
* Trace is recorded on first retry
* Screenshots & videos are saved on failure

---

## ✅ Best Practices

* Keep test logic outside tests (use Page Objects)
* Do not duplicate locators
* Use BasePage methods instead of raw Playwright actions
* Use soft assertions only for non-critical validations
* Keep tests small and independent

---

## 🛠 Troubleshooting

* Use trace viewer to debug failures
* Run tests with `--debug`
* Check screenshots/videos in `test-results/`

---

## 📌 Notes

* Do not commit `.env` file
* Use `.env.example` as reference
* Keep credentials secure

---

## 📄 License

Internal use / Customize as needed


## Project Notes

- This framework is used for web automation
- Built and maintained by Tal