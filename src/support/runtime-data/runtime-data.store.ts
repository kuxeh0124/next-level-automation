import type { RuntimeDataStore } from './runtime-data.types';

export class InMemoryRuntimeDataStore implements RuntimeDataStore {
  private readonly values = new Map<string, unknown>();

  set<T>(key: string, value: T): void {
    this.values.set(key, value);
  }

  get<T>(key: string): T {
    if (!this.values.has(key)) {
      throw new Error(`Runtime data not found: ${key}`);
    }

    return this.values.get(key) as T;
  }

  has(key: string): boolean {
    return this.values.has(key);
  }

  delete(key: string): void {
    this.values.delete(key);
  }

  clear(): void {
    this.values.clear();
  }
}
