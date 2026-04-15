import { test } from '@fixtures/test.fixture';
import {
  expectBodyToContain,
  expectContentTypeToContain,
  expectStatus,
} from '@framework/api/assertions/api.assertions';
import { TrainingAppApiClient } from '@samples/training-app/api/clients/TrainingAppApiClient';

test('training app login route is reachable over HTTP', async ({ request }) => {
  const api = new TrainingAppApiClient(request);

  const result = await api.getLoginRoute();

  expectStatus(result, 200);
  expectContentTypeToContain(result, 'text/html');
  expectBodyToContain(result, /<!doctype html>/i);
});

test('training app auth API is not exposed as a backend endpoint yet', async ({ request }) => {
  const api = new TrainingAppApiClient(request);

  const result = await api.postAuthLogin({
    username: 'trainer@example.com',
    password: 'Password123!',
  });

  expectStatus(result, 404);
});
