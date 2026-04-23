export interface TrainingAppCredentials {
  username: string;
  password: string;
}

export interface TrainingAppPersona {
  key: string;
  displayName: string;
  role: 'standard' | 'admin' | 'support';
  credentials: TrainingAppCredentials;
}
