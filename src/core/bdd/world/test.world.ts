export interface TestWorld {
  actor?: string;
  currentFeature?: string;
  currentScenario?: string;
  testDataKey?: string;
}

export const createTestWorld = (): TestWorld => ({});
