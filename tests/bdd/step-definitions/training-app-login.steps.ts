import { createBdd } from 'playwright-bdd';
import { expect, test } from '@fixtures/test.fixture';
import {
  getTrainingAppPersona,
  trainingAppRuntimeDataKeys,
} from '@samples/training-app/data';
import { LoginFlow } from '@samples/training-app/flows/LoginFlow';

const { Given, When, Then } = createBdd(test);

Given('the user is on the training app login page', async ({ page, artifacts }) => {
  const loginFlow = new LoginFlow(page);
  await loginFlow.goToLoginPage(artifacts);
});

When('the user signs in as a standard user', async ({ page, artifacts }) => {
  const loginFlow = new LoginFlow(page);
  await loginFlow.signInAsStandardUser(artifacts);
});

When('the user signs in as {string}', async ({ page, artifacts, runtimeData }, personaKey: string) => {
  const loginFlow = new LoginFlow(page);
  const persona = getTrainingAppPersona(personaKey);

  await loginFlow.signIn(persona, artifacts, runtimeData);
});

Then('the user should land on the dashboard', async ({ page, artifacts }) => {
  const loginFlow = new LoginFlow(page);
  await loginFlow.assertDashboardLoaded(artifacts);
});

Then('the runtime MFA code should be captured', async ({ runtimeData }) => {
  const mfaCode = runtimeData.get<string>(trainingAppRuntimeDataKeys.mfaCode);

  expect(mfaCode).toMatch(/^\d{6}$/);
});

When('the user submits an invalid MFA code as a standard user', async ({ page, artifacts }) => {
  const loginFlow = new LoginFlow(page);
  await loginFlow.submitInvalidMfaCode(undefined, artifacts);
});

When('the user submits an invalid MFA code as {string}', async ({ page, artifacts }, personaKey: string) => {
  const loginFlow = new LoginFlow(page);
  const persona = getTrainingAppPersona(personaKey);

  await loginFlow.submitInvalidMfaCode(persona, artifacts);
});

Then('the user should remain on the MFA challenge', async () => {
  // The invalid-MFA flow owns this assertion so the BDD step stays thin.
});
