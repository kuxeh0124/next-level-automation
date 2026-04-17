import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { Logger } from '@core/logger/logger';
import { loginFormSelectors } from '@samples/training-app/selectors/login/login-form.selectors';

export class LoginForm extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.resolve(loginFormSelectors.usernameInput);
  }

  get passwordInput(): Locator {
    return this.resolve(loginFormSelectors.passwordInput);
  }

  get continueButton(): Locator {
    return this.resolve(loginFormSelectors.continueButton);
  }

  async enterUsername(username: string): Promise<void> {
    Logger.action(`Entering username: ${username}`);
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    Logger.action(`Entering password: ${'*'.repeat(password.length)}`);
    await this.passwordInput.fill(password);
  }

  async clickContinue(): Promise<void> {
    Logger.action('Clicking continue button');
    await this.continueButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickContinue();
  }
}
