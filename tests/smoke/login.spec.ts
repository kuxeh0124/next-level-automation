import {test} from '@playwright/test';
import {LoginFlow} from '@samples/training-app/flows/LoginFlow'; 

test('login as standard user', async ({page}) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAsAStandardUser();
});
