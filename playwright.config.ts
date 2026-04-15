import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
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
});