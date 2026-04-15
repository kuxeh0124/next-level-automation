export interface StepTemplate {
  intent: string;
  preferredLayer: 'flow' | 'page' | 'assertion';
  example: string[];
}

export const defaultStepTemplates: StepTemplate[] = [
  {
    intent: 'navigation',
    preferredLayer: 'flow',
    example: [
      'Given the user is on the login page',
      'When the user signs in with valid credentials',
      'Then the user should land on the dashboard',
    ],
  },
];
