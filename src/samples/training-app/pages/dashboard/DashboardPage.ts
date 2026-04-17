import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { DashboardNav } from '@samples/training-app/pages/dashboard/components/DashboardNav';
import { WorkspaceWidgets } from '@samples/training-app/pages/dashboard/components/WorkspaceWidgets';

export class DashboardPage extends BasePage {
  readonly nav: DashboardNav;
  readonly widgets: WorkspaceWidgets;

  constructor(page: Page) {
    super(page);
    this.nav = new DashboardNav(page);
    this.widgets = new WorkspaceWidgets(page);
  }

  async assertLoaded(): Promise<void> {
    await this.nav.assertVisible();
    await this.widgets.assertVisible();
  }

  async assertNotLoaded(): Promise<void> {
    await this.widgets.assertNotVisible();
  }
}
