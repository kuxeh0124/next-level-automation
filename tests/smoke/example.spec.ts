import { test, expect } from '@playwright/test';

test('basic smoke test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});