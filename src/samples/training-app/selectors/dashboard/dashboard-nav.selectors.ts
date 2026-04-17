import type { SelectorDefinition } from '@selectors/selector.types';

export const dashboardNavSelectors = {
  appName: {
    friendlyName: 'TrainFlow application name',
    preferred: { type: 'text', value: /^TrainFlow$/i },
    fallbacks: [
      { type: 'role', role: 'heading', name: /^TrainFlow$/i },
      { type: 'css', value: 'body' },
    ],
  },

  dashboardButton: {
    friendlyName: 'Dashboard navigation button',
    preferred: { type: 'role', role: 'button', name: /^Dashboard$/i },
    fallbacks: [
      {
        type: 'xpath',
        value: "//button[normalize-space()='Dashboard']",
      },
    ],
  },
} satisfies Record<string, SelectorDefinition>;
