import type { SelectorDefinition } from '@selectors/selector.types';

export const loginSelectors = {
  usernameInput: {
    friendlyName: 'Email or username input',
    preferred: { type: 'label', value: /email or username|email|username/i },
    fallbacks: [
      {
        type: 'xpath',
        value: "//label[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'email') or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'username')]/following::input[not(@type='password') and not(@type='checkbox')][1]",
      },
      {
        type: 'css',
        value: 'form input:not([type="password"]):not([type="checkbox"])',
      },
    ],
  },

  passwordInput: {
    friendlyName: 'Password input',
    preferred: { type: 'label', value: /passcode|password/i },
    fallbacks: [
      {
        type: 'xpath',
        value: "//label[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'passcode') or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'password')]/following::input[@type='password'][1]",
      },
      {
        type: 'css',
        value: 'form input[type=\"password\"]',
      },
    ],
  },

    showPasswordButton: {
    friendlyName: 'Show password button',
    preferred: { type: 'role', role: 'button', name: /show|reveal/i },
    fallbacks: [
        { type: 'css', value: '.password-wrap > button[type="button"]' },
        {
        type: 'xpath',
        value: "//div[contains(@class, 'password-wrap')]//button[@type='button']",
        },
    ],
  },

  rememberMeCheckbox: {
    friendlyName: 'Remember me checkbox',
    preferred: { type: 'label', value: /remember(\s+me)?/i },
    fallbacks: [
      { type: 'role', role: 'checkbox', name: /remember(\s+me)?/i },
      { type: 'css', value: 'label.checkbox-inline input[type=\"checkbox\"]' },
      {
        type: 'xpath',
        value: "//label[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'remember')]//input[@type='checkbox']",
      },
    ],
  },

  forgotPasswordButton: {
    friendlyName: 'Forgot password button',
    preferred: { type: 'role', role: 'button', name: /forgot( your)? password\??/i },
    fallbacks: [
      { type: 'css', value: 'button.link-btn[type=\"button\"]' },
      {
        type: 'xpath',
        value: "//button[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'forgot') and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'password')]",
      },
    ],
  },

  continueButton: {
    friendlyName: 'Continue button',
    preferred: { type: 'role', role: 'button', name: /continue/i },
    fallbacks: [
      { type: 'text', value: /continue/i },
      { type: 'css', value: 'form > button.primary-btn' },
      {
        type: 'xpath',
        value: "//form//button[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'continue')]",
      },
    ],
  },
} satisfies Record<string, SelectorDefinition>;
