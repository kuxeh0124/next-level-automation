import type { SelectorDefinition } from '@selectors/selector.types';

export const dashboardSelectors = {
  appName: {
    friendlyName: 'TrainFlow application name',
    preferred: { type: 'text', value: /^TrainFlow$/i },
    fallbacks: [
      { type: 'role', role: 'heading', name: /^TrainFlow$/i },
      { type: 'css', value: 'body' },
    ],
  },

  dashboardNav: {
    friendlyName: 'Dashboard navigation button',
    preferred: { type: 'role', role: 'button', name: /^Dashboard$/i },
    fallbacks: [
      {
        type: 'xpath',
        value: "//button[normalize-space()='Dashboard']",
      },
    ],
  },

  workspaceWidgetsHeading: {
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
