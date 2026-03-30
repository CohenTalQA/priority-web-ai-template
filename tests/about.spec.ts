import { test } from '@playwright/test';
import { AboutPage } from '../src/pages/AboutPage';

test('About page loads', async ({ page }) => {
  const aboutPage = new AboutPage(page);

  await page.goto('/about');

  await aboutPage.verifyLoaded();
});