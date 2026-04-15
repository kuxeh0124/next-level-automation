export const bddConventions = {
  stepDefinitionStyle: 'thin-step-definitions',
  preferredActionLayer: 'flows',
  preferredUiLayer: 'pages',
  reuseOrder: ['existing-step', 'existing-flow', 'existing-page-method', 'new-code'],
  reviewPolicy: 'human-review-required',
} as const;

export type BddConvention = typeof bddConventions;
