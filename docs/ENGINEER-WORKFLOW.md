# Engineer Workflow

Created by Karl Jon Cantor.

This guide explains how an engineer should work inside this framework when
adding UI, API, BDD, data, assertion, or AI-assisted automation coverage.

## Starting Point

Before writing code, identify the type of change:

- UI behavior: add or reuse flows, pages, components, selectors, assertions, and data.
- BDD behavior: add or reuse feature files and thin step definitions.
- API behavior: add or reuse API clients and API assertions.
- Test data: add or reuse personas, form data, scenario data, builders, or runtime data.
- AI-assisted change: check the reuse registry first, then propose reviewable changes.

## Reuse First

Start every change by checking existing framework assets:

- `src/core/ai/registry/reuse-registry.ts`
- existing flows under `src/samples/<app>/flows`
- existing pages and components under `src/samples/<app>/pages`
- existing selectors under `src/samples/<app>/selectors`
- existing data under `src/samples/<app>/data`
- existing assertions under `src/framework/assertions`
- existing API clients under `src/samples/<app>/api`

If the required behavior already exists, reuse it. If only part of it exists,
extend the smallest layer that owns the missing responsibility.

## Adding a UI Scenario

Follow this order:

1. Add or update the test or BDD scenario that expresses the behavior.
2. Reuse an existing flow if one already matches the business journey.
3. Add or extend a flow only when orchestration is missing.
4. Add or extend a page when whole-page behavior is missing.
5. Add or extend a component when a bounded UI region needs behavior.
6. Add or extend selectors only for missing elements.
7. Add assertions at the lowest clear layer.
8. Add data to the right data category.

Preferred chain:

```text
test / BDD
  -> flow
  -> page
  -> component
  -> selectors
```

Tests and BDD steps should not use raw locators.

## Adding a BDD Scenario

BDD should describe business intent, not implementation details.

Use this flow:

1. Add or update a `.feature` file under `tests/bdd/features`.
2. Search existing step definitions before adding new ones.
3. Keep step definitions thin.
4. Map steps to flows or high-level page methods.
5. Put reusable workflow logic in flows, not step definitions.
6. Run BDD generation and tests.

Good BDD step definitions usually look like glue code:

```ts
When('the user signs in as {string}', async ({ page, artifacts }, personaKey: string) => {
  const loginFlow = new LoginFlow(page);
  const persona = getTrainingAppPersona(personaKey);

  await loginFlow.signIn(persona, artifacts);
});
```

Avoid building full workflows inside step definitions.

## Adding Selectors

Selectors belong in selector modules, grouped by page region.

Preferred selector priority:

1. role
2. label
3. text
4. test id
5. scoped CSS
6. XPath fallback

Guidelines:

- Prefer accessible selectors first.
- Use regex for visible labels or buttons when wording may drift slightly.
- Keep CSS fallbacks scoped to stable containers.
- Avoid positional XPath such as `[1]` unless there is no better anchor.
- Name selectors by user intent, not DOM implementation.

## Adding Pages and Components

Use a page as a composition root. Use components for meaningful regions inside a
page.

Create a component when:

- the page has multiple meaningful regions
- the region has its own interactions or assertions
- the region may change independently
- the page object is starting to mix unrelated concerns

Pages and components should expose readable methods such as:

- `login(...)`
- `waitForChallenge()`
- `assertVisible()`
- `assertLoaded()`

They should not expose raw selector details to tests or BDD steps.

## Adding Assertions

Place assertions at the lowest layer that clearly owns the expectation:

- component assertion: one bounded UI region
- page assertion: whole-page readiness
- flow assertion: workflow success or failure outcome
- test assertion: scenario-specific expectation

Use helpers from `src/framework/assertions` for common checks such as visibility
and text. Wrap those helpers in page/component methods with business-readable
names.

Avoid raw locator assertions in BDD steps unless the assertion is truly unique
to that scenario.

## Adding Test Data

Choose the data category by intent:

- `personas/`: reusable actors, roles, and credentials
- `forms/`: engineer-authored form input datasets
- `scenarios/`: expected values, edge cases, and behavior-specific constants
- `builders/`: generated or composed data
- `runtime-data.keys.ts`: keys for values captured during execution

Do not store runtime-discovered values in static JSON. Use the test-scoped
runtime data store instead.

## Adding API Coverage

API tests should use the framework API lane.

Use this flow:

1. Add or reuse an API client under `src/samples/<app>/api/clients`.
2. Put endpoint-specific request logic in the client.
3. Use reusable API assertions from `src/framework/api/assertions`.
4. Keep tests focused on behavior and expected response contracts.

Avoid raw request logic in tests when a client abstraction exists.

## Runtime Data

Runtime data is for values created or discovered during a test run, such as:

- generated MFA codes
- IDs returned by API calls
- dropdown values read from the app
- values created by setup steps and needed later

Use named keys so data remains discoverable:

```ts
runtimeData.set(trainingAppRuntimeDataKeys.mfaCode, code);
const code = runtimeData.get<string>(trainingAppRuntimeDataKeys.mfaCode);
```

Runtime data is test-scoped and should be cleared automatically by the fixture.

## Artifacts and Logging

Use artifacts to support diagnosis, not to record every action.

Good checkpoints:

- page loaded
- MFA challenge visible
- dashboard loaded
- important failure state confirmed

Avoid taking screenshots after every small interaction.

The framework attaches per-test logs and Playwright failure artifacts.

## AI-Assisted Workflow

AI-generated changes must follow the framework shape.

Required order:

1. Search `src/core/ai/registry/reuse-registry.ts`.
2. Identify reusable artifacts.
3. Identify gaps.
4. Propose the smallest change set.
5. Keep generated code in the correct layer.
6. Require human review before accepting changes.

AI should not create one-off automation paths outside the framework.

## Verification Commands

Run the smallest useful checks for your change:

```powershell
npm run typecheck
npm run test:smoke
npm run test:bdd
npm run test:api
```

For broad changes, run:

```powershell
npm run test:all
```

## Human Review Checklist

Before merging, verify:

- Existing reusable artifacts were checked first.
- BDD steps are thin.
- Tests do not use raw locators.
- Selectors are stable and region-scoped.
- Assertions live at the right layer.
- Data is not hardcoded into workflows unnecessarily.
- Runtime values use runtime data, not static JSON.
- Logs and screenshots are useful but not excessive.
- Typecheck and relevant tests pass.

## Training App Sample

The training app is intentionally kept as a reference implementation. Treat it
as the working example for how future app branches should consume the framework.

When creating a new app branch, copy the pattern, not the sample-specific
business details.
