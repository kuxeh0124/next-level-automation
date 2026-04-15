export type SelectorStrategy =
  | { type: 'role'; role: string; name?: string | RegExp }
  | { type: 'label'; value: string | RegExp }
  | { type: 'text'; value: string | RegExp }
  | { type: 'testid'; value: string }
  | { type: 'css'; value: string }
  | { type: 'xpath'; value: string };

export interface SelectorDefinition {
  friendlyName: string;
  preferred: SelectorStrategy;
  fallbacks?: SelectorStrategy[];
}