import { Page } from "@playwright/test";
import { DashboardPage } from "@samples/training-app/pages/dashboard/DashboardPage";
import { LoginPage } from "@samples/training-app/pages/login/LoginPage";

export class LoginFlow {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly dashboardPage: DashboardPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    async loginAsAStandardUser(): Promise<void> {
        await this.loginPage.navigate('/login');
        await this.loginPage.login("trainer@example.com", "Password123!");
        await this.loginPage.completeMfa();
        await this.dashboardPage.assertLoaded();
    }
}
