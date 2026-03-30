import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Logger } from '../utils/logger';

export class AboutPage extends BasePage {
  private readonly header = this.page.getByText('בית / אודות');

  async verifyLoaded(): Promise<void> {
    Logger.info('Verifying About page is loaded');
    await this.waitForUrl(/\/about/);
    await expect(this.header).toBeVisible();
    Logger.info('About page loaded successfully');
  }
}