import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { Logger } from '@core/logger/logger';
import { mfaPanelSelectors } from '@samples/training-app/selectors/login/mfa-panel.selectors';

export class MfaPanel extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get mfaHeading(): Locator {
    return this.resolve(mfaPanelSelectors.mfaHeading);
  }

  get otpInput(): Locator {
    return this.resolve(mfaPanelSelectors.otpInput);
  }

  get tokenCode(): Locator {
    return this.resolve(mfaPanelSelectors.tokenCode);
  }

  get verifyButton(): Locator {
    return this.resolve(mfaPanelSelectors.verifyButton);
  }

  async waitForChallenge(): Promise<void> {
    Logger.action('Waiting for MFA challenge');
    await expect(this.mfaHeading).toBeVisible();
    await expect(this.verifyButton).toBeVisible();
  }

  async getCurrentAuthenticatorCode(): Promise<string> {
    const code = (await this.tokenCode.innerText()).replace(/\D/g, '');
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

  async assertStillVisible(): Promise<void> {
    await expect(this.mfaHeading).toBeVisible();
    await expect(this.otpInput).toBeVisible();
    await expect(this.verifyButton).toBeVisible();
  }

  async completeUsingDisplayedCode(): Promise<void> {
    await this.waitForChallenge();
    const code = await this.getCurrentAuthenticatorCode();
    await this.enterOneTimeCode(code);
    await this.clickVerify();
  }
}
