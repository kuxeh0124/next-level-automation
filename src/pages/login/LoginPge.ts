import {Locator, Page} from '@playwright/test';
import {BasePage} from '@pages/base/base.page';
import {loginSelectors} from '@selectors/login.selectors';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

    get usernameInput(): Locator {
        return this.resolve(loginSelectors.usernameInput);
    } 
  
    get passwordInput(): Locator {
        return this.resolve(loginSelectors.passwordInput);
    }

    get continueButton(): Locator {
        return this.resolve(loginSelectors.continueButton);
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickContinue();
    }
}
