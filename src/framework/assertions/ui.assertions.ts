import { expect, Locator } from '@playwright/test';

interface UiAssertionOptions {
  timeout?: number;
}

export const expectVisible = async (
  locator: Locator,
  options?: UiAssertionOptions
): Promise<void> => {
  await expect(locator).toBeVisible({ timeout: options?.timeout });
};

export const expectNotVisible = async (
  locator: Locator,
  options?: UiAssertionOptions
): Promise<void> => {
  await expect(locator).not.toBeVisible({ timeout: options?.timeout });
};

export const expectContainsText = async (
  locator: Locator,
  expectedText: string | RegExp,
  options?: UiAssertionOptions
): Promise<void> => {
  await expect(locator).toContainText(expectedText, { timeout: options?.timeout });
};

export const expectAllVisible = async (
  locators: Locator[],
  options?: UiAssertionOptions
): Promise<void> => {
  for (const locator of locators) {
    await expectVisible(locator, options);
  }
};
