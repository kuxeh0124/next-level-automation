export interface RuntimeDataStore {
  set<T>(key: string, value: T): void;
  get<T>(key: string): T;
  has(key: string): boolean;
  delete(key: string): void;
  clear(): void;
}
