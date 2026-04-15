import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from '@pages/base/base.page';
import {loginSelectors} from '@samples/training-app/selectors/login.selectors';
import {Logger} from '@core/logger/logger';

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

    get mfaHeading(): Locator {
        return this.resolve(loginSelectors.mfaHeading);
    }

    get otpInput(): Locator {
        return this.resolve(loginSelectors.otpInput);
    }

    get tokenCode(): Locator {
        return this.resolve(loginSelectors.tokenCode);
    }

    get verifyButton(): Locator {
        return this.resolve(loginSelectors.verifyButton);
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

    async waitForMfaChallenge(): Promise<void> {
        Logger.action('Waiting for MFA challenge');
        await expect(this.mfaHeading).toBeVisible();
        await expect(this.verifyButton).toBeVisible();
    }

    async getCurrentAuthenticatorCode(): Promise<string> {
        const code = (await this.tokenCode.innerText()).trim();
        Logger.action(`Resolved current authenticator code: ${'*'.repeat(code.length)}`);
        return code;
    }

    async enterOneTimeCode(code: string): Promise<void> {
        Logger.action('Entering one-time verification code');
        await this.otpInput.fill(code);
    }

    async clickVerify(): Promise<void> {
        Logger.action('Clicking verify button');
        await this.verifyButton.click();
    }

    async assertMfaChallengeStillVisible(): Promise<void> {
        await expect(this.mfaHeading).toBeVisible();
        await expect(this.otpInput).toBeVisible();
        await expect(this.verifyButton).toBeVisible();
    }

    async completeMfa(): Promise<void> {
        await this.waitForMfaChallenge();
        const code = await this.getCurrentAuthenticatorCode();
        await this.enterOneTimeCode(code);
        await this.clickVerify();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickContinue();
    }
}
