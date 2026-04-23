type BooleanEnv = 'true' | 'false' | '1' | '0' | 'yes' | 'no';

const parseBoolean = (
  value: string | undefined,
  defaultValue: boolean
): boolean => {
  if (!value) {
    return defaultValue;
  }

  const normalizedValue = value.toLowerCase() as BooleanEnv;

  if (['true', '1', 'yes'].includes(normalizedValue)) {
    return true;
  }

  if (['false', '0', 'no'].includes(normalizedValue)) {
    return false;
  }

  throw new Error(`Invalid boolean environment value: ${value}`);
};

const parseNumber = (
  value: string | undefined,
  defaultValue: number
): number => {
  if (!value) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid numeric environment value: ${value}`);
  }

  return parsedValue;
};

export const runtimeConfig = {
  environmentName: process.env.TEST_ENV ?? 'local',
  baseUrl: process.env.BASE_URL ?? 'http://localhost:5173',
  isCi: parseBoolean(process.env.CI, false),
  headless: parseBoolean(process.env.HEADLESS, parseBoolean(process.env.CI, false)),
  retries: parseNumber(process.env.RETRIES, parseBoolean(process.env.CI, false) ? 1 : 0),
  actionTimeoutMs: parseNumber(process.env.ACTION_TIMEOUT_MS, 30_000),
  expectTimeoutMs: parseNumber(process.env.EXPECT_TIMEOUT_MS, 5_000),
} as const;
