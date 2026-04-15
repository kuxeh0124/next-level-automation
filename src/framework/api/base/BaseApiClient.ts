import type {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';
import { Logger } from '@core/logger/logger';
import type { ApiCallResult } from '@framework/api/contracts/api.types';

export abstract class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(
    url: string,
    options?: Parameters<APIRequestContext['get']>[1]
  ): Promise<ApiCallResult<string>> {
    Logger.action(`API GET ${url}`);
    const response = await this.request.get(url, options);
    const body = await response.text();
    Logger.info(`API GET ${url} -> ${response.status()}`);

    return {
      request: { method: 'GET', url },
      response,
      body,
    };
  }

  protected async post(
    url: string,
    options?: Parameters<APIRequestContext['post']>[1]
  ): Promise<ApiCallResult<string>> {
    Logger.action(`API POST ${url}`);
    const response = await this.request.post(url, options);
    const body = await response.text();
    Logger.info(`API POST ${url} -> ${response.status()}`);

    return {
      request: { method: 'POST', url },
      response,
      body,
    };
  }

  protected getHeader(response: APIResponse, name: string): string {
    return response.headers()[name.toLowerCase()] ?? '';
  }
}
