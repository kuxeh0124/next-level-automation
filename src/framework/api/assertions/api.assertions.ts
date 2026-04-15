import { expect } from '@fixtures/test.fixture';
import type { ApiCallResult } from '@framework/api/contracts/api.types';

export const expectStatus = (
  result: ApiCallResult,
  expectedStatus: number
): void => {
  expect(result.response.status()).toBe(expectedStatus);
};

export const expectContentTypeToContain = (
  result: ApiCallResult,
  expectedContentType: string
): void => {
  expect(result.response.headers()['content-type'] ?? '').toContain(expectedContentType);
};

export const expectBodyToContain = (
  result: ApiCallResult<string>,
  expectedText: string | RegExp
): void => {
  if (expectedText instanceof RegExp) {
    expect(result.body).toMatch(expectedText);
    return;
  }

  expect(result.body).toContain(expectedText);
};
