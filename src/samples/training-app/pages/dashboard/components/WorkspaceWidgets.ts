import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { workspaceWidgetsSelectors } from '@samples/training-app/selectors/dashboard/workspace-widgets.selectors';

export class WorkspaceWidgets extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.resolve(workspaceWidgetsSelectors.heading);
  }

  async assertVisible(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async assertNotVisible(): Promise<void> {
    await expect(this.heading).not.toBeVisible();
  }
}
