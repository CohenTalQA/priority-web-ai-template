import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForUrl(url: RegExp): Promise<void> {
    Logger.info(`Waiting for URL to match: ${url}`);
    await this.page.waitForURL(url);
    Logger.info(`URL matched: ${this.page.url()}`);
  }

  async click(locator: Locator, elementName?: string): Promise<void> {
    Logger.info(`Clicking on element: ${elementName ?? 'unknown element'}`);
    await locator.click();
  }

  async fill(locator: Locator, text: string, elementName?: string): Promise<void> {
    Logger.info(`Filling element: ${elementName ?? 'unknown element'} with text: ${text}`);
    await locator.fill(text);
  }
}