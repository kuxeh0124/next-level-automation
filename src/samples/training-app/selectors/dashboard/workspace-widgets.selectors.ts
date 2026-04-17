import type { SelectorDefinition } from '@selectors/selector.types';

export const workspaceWidgetsSelectors = {
  heading: {
    friendlyName: 'Workspace widgets heading',
    preferred: { type: 'role', role: 'heading', name: /workspace widgets/i },
    fallbacks: [
      { type: 'text', value: /workspace widgets/i },
      {
        type: 'xpath',
        value: "//*[self::h1 or self::h2 or self::h3][contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'workspace widgets')]",
      },
    ],
  },
} satisfies Record<string, SelectorDefinition>;
