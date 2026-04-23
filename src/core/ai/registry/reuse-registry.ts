import type { ReuseArtifact, ReuseSearchResult } from './reuse-registry.types';

export const reuseRegistry = [
  {
    id: 'framework.assertions.ui',
    type: 'assertion',
    name: 'UI assertion helpers',
    path: 'src/framework/assertions/ui.assertions.ts',
    summary: 'Reusable visible, hidden, grouped visibility, and text assertions for UI components and pages.',
    tags: ['assertions', 'ui', 'visibility', 'text'],
  },
  {
    id: 'training-app.login.flow',
    type: 'flow',
    name: 'LoginFlow',
    path: 'src/samples/training-app/flows/LoginFlow.ts',
    summary: 'Orchestrates training-app login, standard user sign-in, dashboard verification, and invalid MFA rejection.',
    tags: ['login', 'auth', 'mfa', 'standard user', 'dashboard'],
  },
  {
    id: 'training-app.login.page',
    type: 'page',
    name: 'LoginPage',
    path: 'src/samples/training-app/pages/login/LoginPage.ts',
    summary: 'Composes the login form and MFA panel components for the training-app login route.',
    tags: ['login', 'auth', 'page'],
  },
  {
    id: 'training-app.login-form.component',
    type: 'component',
    name: 'LoginForm',
    path: 'src/samples/training-app/pages/login/components/LoginForm.ts',
    summary: 'Handles username, password, and continue interactions for the login form.',
    tags: ['login', 'form', 'username', 'password'],
  },
  {
    id: 'training-app.mfa-panel.component',
    type: 'component',
    name: 'MfaPanel',
    path: 'src/samples/training-app/pages/login/components/MfaPanel.ts',
    summary: 'Handles MFA challenge readiness, one-time code capture, code entry, verification, and MFA visibility assertions.',
    tags: ['login', 'mfa', 'otp', 'verification', 'runtime data'],
  },
  {
    id: 'training-app.dashboard.page',
    type: 'page',
    name: 'DashboardPage',
    path: 'src/samples/training-app/pages/dashboard/DashboardPage.ts',
    summary: 'Composes dashboard navigation and workspace widgets for dashboard readiness assertions.',
    tags: ['dashboard', 'page', 'readiness'],
  },
  {
    id: 'training-app.dashboard-nav.component',
    type: 'component',
    name: 'DashboardNav',
    path: 'src/samples/training-app/pages/dashboard/components/DashboardNav.ts',
    summary: 'Asserts the dashboard navigation area and application name are visible.',
    tags: ['dashboard', 'navigation', 'app name'],
  },
  {
    id: 'training-app.workspace-widgets.component',
    type: 'component',
    name: 'WorkspaceWidgets',
    path: 'src/samples/training-app/pages/dashboard/components/WorkspaceWidgets.ts',
    summary: 'Asserts workspace widget visibility and absence for dashboard state checks.',
    tags: ['dashboard', 'workspace', 'widgets'],
  },
  {
    id: 'training-app.login-form.selectors',
    type: 'selector',
    name: 'loginFormSelectors',
    path: 'src/samples/training-app/selectors/login/login-form.selectors.ts',
    summary: 'Selector definitions for username, password, and continue controls in the login form.',
    tags: ['login', 'selectors', 'form'],
  },
  {
    id: 'training-app.mfa-panel.selectors',
    type: 'selector',
    name: 'mfaPanelSelectors',
    path: 'src/samples/training-app/selectors/login/mfa-panel.selectors.ts',
    summary: 'Selector definitions for MFA heading, OTP input, token preview, and verify button.',
    tags: ['login', 'selectors', 'mfa'],
  },
  {
    id: 'training-app.dashboard.selectors',
    type: 'selector',
    name: 'dashboard selectors',
    path: 'src/samples/training-app/selectors/dashboard',
    summary: 'Selector definitions for dashboard navigation and workspace widget regions.',
    tags: ['dashboard', 'selectors'],
  },
  {
    id: 'training-app.api.client',
    type: 'api-client',
    name: 'TrainingAppApiClient',
    path: 'src/samples/training-app/api/clients/TrainingAppApiClient.ts',
    summary: 'Training-app API client wrapper for login route and auth-login probing.',
    tags: ['api', 'training app', 'login'],
  },
  {
    id: 'training-app.bdd.login.feature',
    type: 'feature',
    name: 'Training app login feature',
    path: 'tests/bdd/features/training-app-login.feature',
    summary: 'BDD scenarios for successful standard user login and invalid MFA rejection.',
    tags: ['bdd', 'gherkin', 'login', 'mfa'],
  },
  {
    id: 'training-app.bdd.login.steps',
    type: 'step-definition',
    name: 'training-app-login steps',
    path: 'tests/bdd/step-definitions/training-app-login.steps.ts',
    summary: 'Thin BDD step mappings from Gherkin login intent to the LoginFlow.',
    tags: ['bdd', 'steps', 'login', 'reuse'],
  },
] satisfies ReuseArtifact[];

export const searchReuseRegistry = (query: string): ReuseSearchResult => {
  const normalizedQuery = normalize(query);

  const exactMatches = reuseRegistry.filter((artifact) =>
    [artifact.id, artifact.name, artifact.type, ...(artifact.tags ?? [])]
      .map(normalize)
      .includes(normalizedQuery)
  );

  const relatedMatches = reuseRegistry.filter((artifact) => {
    if (exactMatches.includes(artifact)) {
      return false;
    }

    const searchableText = normalize([
      artifact.id,
      artifact.type,
      artifact.name,
      artifact.path,
      artifact.summary,
      ...(artifact.tags ?? []),
    ].join(' '));

    return searchableText.includes(normalizedQuery);
  });

  return {
    query,
    exactMatches,
    relatedMatches,
    gaps: exactMatches.length === 0 && relatedMatches.length === 0
      ? [`No reusable artifact found for: ${query}`]
      : [],
  };
};

const normalize = (value: string): string => value.trim().toLowerCase();
