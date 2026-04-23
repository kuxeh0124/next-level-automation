import { Page } from "@playwright/test";
import { DashboardPage } from "@samples/training-app/pages/dashboard/DashboardPage";
import { LoginPage } from "@samples/training-app/pages/login/LoginPage";
import { Logger } from "@core/logger/logger";
import type { TestArtifacts } from "@support/artifacts/artifact.types";
import type { RuntimeDataStore } from "@support/runtime-data/runtime-data.types";
import {
    authScenarioData,
    trainingAppRuntimeDataKeys,
    trainingAppPersonas,
    type TrainingAppPersona,
} from "@samples/training-app/data";

export class LoginFlow {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly dashboardPage: DashboardPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    async goToLoginPage(artifacts?: TestArtifacts): Promise<void> {
        await this.loginPage.navigate('/login');
        await artifacts?.captureCheckpoint('login-page-loaded', this.page);
    }

    async signIn(
        persona: TrainingAppPersona,
        artifacts?: TestArtifacts,
        runtimeData?: RuntimeDataStore
    ): Promise<void> {
        await this.loginPage.login(persona.credentials.username, persona.credentials.password);
        await this.loginPage.waitForMfaChallenge();
        await artifacts?.captureCheckpoint('mfa-challenge-visible', this.page);
        const code = await this.loginPage.getCurrentAuthenticatorCode();
        runtimeData?.set(trainingAppRuntimeDataKeys.mfaCode, code);
        await this.loginPage.enterOneTimeCode(code);
        await this.loginPage.clickVerify();
    }

    async signInAsStandardUser(artifacts?: TestArtifacts): Promise<void> {
        await this.signIn(trainingAppPersonas.standardUser, artifacts);
    }

    async assertDashboardLoaded(artifacts?: TestArtifacts): Promise<void> {
        await this.dashboardPage.assertLoaded();
        await artifacts?.captureCheckpoint('dashboard-loaded', this.page);
    }

    async loginAsAStandardUser(artifacts?: TestArtifacts): Promise<void> {
        await this.goToLoginPage(artifacts);
        await this.signInAsStandardUser(artifacts);
        await this.assertDashboardLoaded(artifacts);
        Logger.success('Standard user login flow completed successfully');
    }

    async submitInvalidMfaCode(
        persona: TrainingAppPersona = trainingAppPersonas.standardUser,
        artifacts?: TestArtifacts
    ): Promise<void> {
        await this.loginPage.login(
            persona.credentials.username,
            persona.credentials.password
        );
        await this.loginPage.waitForMfaChallenge();
        await artifacts?.captureCheckpoint('mfa-challenge-visible', this.page);
        await this.loginPage.enterOneTimeCode(authScenarioData.invalidMfaCode);
        await this.loginPage.clickVerify();
        await this.loginPage.assertMfaChallengeStillVisible();
        await this.dashboardPage.assertNotLoaded();
        await artifacts?.captureCheckpoint('mfa-rejected-invalid-code', this.page);
        Logger.success('Invalid MFA code was rejected and the user remained on the challenge screen');
    }

    async rejectInvalidMfaCode(artifacts?: TestArtifacts): Promise<void>;
    async rejectInvalidMfaCode(persona: TrainingAppPersona, artifacts?: TestArtifacts): Promise<void>;
    async rejectInvalidMfaCode(
        personaOrArtifacts: TrainingAppPersona | TestArtifacts = trainingAppPersonas.standardUser,
        artifacts?: TestArtifacts
    ): Promise<void> {
        const hasPersona = 'credentials' in personaOrArtifacts;
        const persona = hasPersona ? personaOrArtifacts : trainingAppPersonas.standardUser;
        const resolvedArtifacts = hasPersona ? artifacts : personaOrArtifacts;

        await this.goToLoginPage(resolvedArtifacts);
        await this.submitInvalidMfaCode(persona, resolvedArtifacts);
    }
}
