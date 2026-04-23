import type { TrainingAppPersona } from './persona.types';

export const trainingAppPersonas = {
  standardUser: {
    key: 'standardUser',
    displayName: 'Standard User',
    role: 'standard',
    credentials: {
      username: process.env.TRAINING_APP_STANDARD_USERNAME ?? 'trainer@example.com',
      password: process.env.TRAINING_APP_STANDARD_PASSWORD ?? 'Password123!',
    },
  },
} satisfies Record<string, TrainingAppPersona>;

export type TrainingAppPersonaKey = keyof typeof trainingAppPersonas;

export const getTrainingAppPersona = (personaKey: string): TrainingAppPersona => {
  if (personaKey in trainingAppPersonas) {
    return trainingAppPersonas[personaKey as TrainingAppPersonaKey];
  }

  throw new Error(`Training app persona not found: ${personaKey}`);
};
