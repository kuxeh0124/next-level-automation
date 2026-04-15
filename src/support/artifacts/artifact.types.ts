import type { Page } from '@playwright/test';

export interface TestArtifacts {
  captureCheckpoint(name: string, page?: Page): Promise<void>;
}
