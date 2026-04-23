export interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginFormDataSet {
  standardUserLogin: LoginFormData;
  unknownUserLogin: LoginFormData;
  emptyUsernameLogin: LoginFormData;
}
