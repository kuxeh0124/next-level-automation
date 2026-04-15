import type { APIResponse } from '@playwright/test';

export interface ApiRequestDescriptor {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
}

export interface ApiCallResult<TBody = unknown> {
  request: ApiRequestDescriptor;
  response: APIResponse;
  body: TBody | string;
}
