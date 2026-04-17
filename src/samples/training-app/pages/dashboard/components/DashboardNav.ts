import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { dashboardNavSelectors } from '@samples/training-app/selectors/dashboard/dashboard-nav.selectors';

export class DashboardNav extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get appName(): Locator {
    return this.resolve(dashboardNavSelectors.appName);
  }

  get dashboardButton(): Locator {
    return this.resolve(dashboardNavSelectors.dashboardButton);
  }

  async assertVisible(): Promise<void> {
    await expect(this.appName).toContainText('TrainFlow');
    await expect(this.dashboardButton).toBeVisible();
  }
}
