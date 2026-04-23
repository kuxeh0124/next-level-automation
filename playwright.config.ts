import {defineConfig} from '@playwright/test';
import {defineBddConfig} from 'playwright-bdd';
import {runtimeConfig} from '@core/config/runtime.config';

const bddTestDir = defineBddConfig({
    features: 'tests/bdd/features/**/*.feature',
    steps: [
        'tests/bdd/step-definitions/**/*.ts',
        'src/fixtures/test.fixture.ts',
    ],
    outputDir: '.features-gen',
});

export default defineConfig({
    timeout: runtimeConfig.actionTimeoutMs,
    expect: {
        timeout: runtimeConfig.expectTimeoutMs
    },
    retries: runtimeConfig.retries,
    reporter: [['list'], ['html', {open: 'never'}]],
    use: {
        baseURL: runtimeConfig.baseUrl,
        headless: runtimeConfig.headless,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure', 
        viewport: {width: 1440, height: 900},
    },
    projects: [
        {
            name: 'core',
            testDir: './tests',
            testIgnore: 'tests/bdd/**/*',
        },
        {
            name: 'bdd',
            testDir: bddTestDir,
        },
    ],
});
