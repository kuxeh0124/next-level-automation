import { test as base } from 'playwright-bdd';
import { expect, type Page, type TestInfo } from '@playwright/test';
import { Logger } from '@core/logger/logger';
import type { TestArtifacts } from '@support/artifacts/artifact.types';
import { InMemoryRuntimeDataStore } from '@support/runtime-data/runtime-data.store';
import type { RuntimeDataStore } from '@support/runtime-data/runtime-data.types';

const sanitizeFileName = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const attachCheckpoint = async (
  testInfo: TestInfo,
  name: string,
  page: Page
): Promise<void> => {
  const fileName = `${sanitizeFileName(name)}.png`;
  const screenshotPath = testInfo.outputPath(fileName);

  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach(`checkpoint-${name}`, {
    path: screenshotPath,
    contentType: 'image/png',
  });

  Logger.info(`Captured checkpoint screenshot: ${name}`);
};

export const test = base.extend<{
  artifacts: TestArtifacts;
  runtimeData: RuntimeDataStore;
  _frameworkLogging: void;
}>({
  _frameworkLogging: [
    async ({}, use: () => Promise<void>, testInfo: TestInfo) => {
      Logger.startTest(testInfo);

      try {
        await use();
      } finally {
        await Logger.attachToTest(testInfo);
        Logger.reset();
      }
    },
    { auto: true },
  ],

  artifacts: async (
    { page },
    use: (artifacts: TestArtifacts) => Promise<void>,
    testInfo: TestInfo
  ) => {
    const artifacts: TestArtifacts = {
      captureCheckpoint: async (name: string, targetPage: Page = page) => {
        await attachCheckpoint(testInfo, name, targetPage);
      },
    };

    await use(artifacts);
  },

  runtimeData: async ({}, use: (runtimeData: RuntimeDataStore) => Promise<void>) => {
    const runtimeData = new InMemoryRuntimeDataStore();

    await use(runtimeData);

    runtimeData.clear();
  },
});

export { expect };
