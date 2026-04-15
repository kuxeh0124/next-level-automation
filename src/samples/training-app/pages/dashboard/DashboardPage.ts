import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { dashboardSelectors } from '@samples/training-app/selectors/dashboard.selectors';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get appName(): Locator {
    return this.resolve(dashboardSelectors.appName);
  }

  get dashboardNav(): Locator {
    return this.resolve(dashboardSelectors.dashboardNav);
  }

  get workspaceWidgetsHeading(): Locator {
    return this.resolve(dashboardSelectors.workspaceWidgetsHeading);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.appName).toContainText('TrainFlow');
    await expect(this.dashboardNav).toBeVisible();
    await expect(this.workspaceWidgetsHeading).toBeVisible();
  }
}
