import rawLoginFormData from './login.form-data.json';
import type { LoginFormData, LoginFormDataSet } from './login-form.types';

export const loginFormData = rawLoginFormData satisfies LoginFormDataSet;

export type LoginFormDataKey = keyof typeof loginFormData;

export const getLoginFormData = (dataKey: string): LoginFormData => {
  if (dataKey in loginFormData) {
    return loginFormData[dataKey as LoginFormDataKey];
  }

  throw new Error(`Training app login form data not found: ${dataKey}`);
};
