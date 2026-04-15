import { Page } from "@playwright/test";
import { LoginPage } from "@samples/training-app/pages/login/LoginPage";

export class LoginFlow {
    private readonly page: Page;
    private readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    async loginAsAStandardUser(): Promise<void> {
        await this.loginPage.navigate('/login');
        await this.loginPage.login("trainer@example.com", "Password123!");
    }
}
