import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { expectNotVisible, expectVisible } from '@framework/assertions/ui.assertions';
import { workspaceWidgetsSelectors } from '@samples/training-app/selectors/dashboard/workspace-widgets.selectors';

export class WorkspaceWidgets extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.resolve(workspaceWidgetsSelectors.heading);
  }

  async assertVisible(): Promise<void> {
    await expectVisible(this.heading);
  }

  async assertNotVisible(): Promise<void> {
    await expectNotVisible(this.heading);
  }
}
