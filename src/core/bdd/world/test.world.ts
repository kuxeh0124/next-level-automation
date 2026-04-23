import type { RuntimeDataStore } from '@support/runtime-data/runtime-data.types';

export interface TestWorld {
  actor?: string;
  currentFeature?: string;
  currentScenario?: string;
  testDataKey?: string;
  runtimeData?: RuntimeDataStore;
}

export const createTestWorld = (): TestWorld => ({});
