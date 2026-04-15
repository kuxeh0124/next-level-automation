import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from '@framework/api/base/BaseApiClient';
import type { ApiCallResult } from '@framework/api/contracts/api.types';

export class TrainingAppApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getLoginRoute(): Promise<ApiCallResult<string>> {
    return this.get('/login');
  }

  async postAuthLogin(credentials: {
    username: string;
    password: string;
  }): Promise<ApiCallResult<string>> {
    return this.post('/api/auth/login', {
      data: credentials,
    });
  }
}
