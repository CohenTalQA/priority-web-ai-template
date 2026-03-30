import { test as base } from '@playwright/test';
import { AboutPage } from '../pages/AboutPage';

type Fixtures = {
  aboutPage: AboutPage;
};

export const test = base.extend<Fixtures>({
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
});