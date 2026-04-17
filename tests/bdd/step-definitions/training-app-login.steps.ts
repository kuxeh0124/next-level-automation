import { createBdd } from 'playwright-bdd';
import { test } from '@fixtures/test.fixture';
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

Then('the user should land on the dashboard', async ({ page, artifacts }) => {
  const loginFlow = new LoginFlow(page);
  await loginFlow.assertDashboardLoaded(artifacts);
});
