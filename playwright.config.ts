import {defineConfig} from '@playwright/test';
import {defineBddConfig} from 'playwright-bdd';

const bddTestDir = defineBddConfig({
    features: 'tests/bdd/features/**/*.feature',
    steps: [
        'tests/bdd/step-definitions/**/*.ts',
        'src/fixtures/test.fixture.ts',
    ],
    outputDir: '.features-gen',
});

export default defineConfig({
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    retries: 0,
    reporter: [['list'], ['html', {open: 'never'}]],
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:5173',
        headless: false,
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
