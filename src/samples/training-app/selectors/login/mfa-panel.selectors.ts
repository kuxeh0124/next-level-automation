import type { SelectorDefinition } from '@selectors/selector.types';

export const mfaPanelSelectors = {
  mfaHeading: {
    friendlyName: 'Multi-factor authentication heading',
    preferred: { type: 'text', value: /multi-factor authentication/i },
    fallbacks: [
      { type: 'css', value: '.notice.success strong' },
      {
        type: 'xpath',
        value: "//strong[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'multi-factor authentication')]",
      },
    ],
  },

  otpInput: {
    friendlyName: 'One-time code input',
    preferred: { type: 'label', value: /one-time code|verification code/i },
    fallbacks: [
      { type: 'css', value: 'form input[maxlength="6"]' },
      {
        type: 'xpath',
        value: "//label[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'one-time code') or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'verification code')]/following::input[@maxlength='6'][1]",
      },
    ],
  },

  tokenCode: {
    friendlyName: 'Current authenticator code',
    preferred: { type: 'css', value: '.token-code' },
    fallbacks: [
      {
        type: 'xpath',
        value: "//div[contains(@class, 'token-code')]",
      },
    ],
  },

  verifyButton: {
    friendlyName: 'Verify button',
    preferred: { type: 'role', role: 'button', name: /verify/i },
    fallbacks: [
      { type: 'css', value: '.button-row > button.primary-btn' },
      {
        type: 'xpath',
        value: "//button[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'verify')]",
      },
    ],
  },
} satisfies Record<string, SelectorDefinition>;
