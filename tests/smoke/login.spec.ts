import {test} from '@fixtures/test.fixture';
import {LoginFlow} from '@samples/training-app/flows/LoginFlow'; 

test('login as standard user', async ({page, artifacts}) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAsAStandardUser(artifacts);
});

test('reject invalid MFA code for standard user login', async ({page, artifacts}) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.rejectInvalidMfaCode(artifacts);
});
