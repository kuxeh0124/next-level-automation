import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { LoginForm } from '@samples/training-app/pages/login/components/LoginForm';
import { MfaPanel } from '@samples/training-app/pages/login/components/MfaPanel';

export class LoginPage extends BasePage {
  readonly form: LoginForm;
  readonly mfa: MfaPanel;

  constructor(page: Page) {
    super(page);
    this.form = new LoginForm(page);
    this.mfa = new MfaPanel(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.form.login(username, password);
  }

  async waitForMfaChallenge(): Promise<void> {
    await this.mfa.waitForChallenge();
  }

  async getCurrentAuthenticatorCode(): Promise<string> {
    return this.mfa.getCurrentAuthenticatorCode();
  }

  async enterOneTimeCode(code: string): Promise<void> {
    await this.mfa.enterOneTimeCode(code);
  }

  async clickVerify(): Promise<void> {
    await this.mfa.clickVerify();
  }

  async assertMfaChallengeStillVisible(): Promise<void> {
    await this.mfa.assertStillVisible();
  }

  async completeMfa(): Promise<void> {
    await this.mfa.completeUsingDisplayedCode();
  }
}
