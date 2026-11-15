import { expect, type Locator, type Page } from '@playwright/test';

export class ExamplePage {
  readonly heading: Locator;
  readonly informationLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Example Domain' });
    this.informationLink = page.getByRole('link', { name: 'Learn more' });
  }

  async goto(): Promise<void> {
    await this.page.setContent('<h1>Example Domain</h1><a href="https://example.com">Learn more</a>');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.informationLink).toBeVisible();
  }
}
