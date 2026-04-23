# Framework Conventions

Created by Karl Jon Cantor.

## Purpose

This document defines the working conventions for this framework so new UI, API,
BDD, and AI-assisted additions follow a consistent structure as the repository
grows.

## Core Principle

Keep intent, orchestration, interaction, and element location in separate
layers.

The preferred execution chain is:

```text
tests / BDD
  ->
flows
  ->
pages + components
  ->
selectors
```

## Layer Responsibilities

### Tests

Tests should describe expected behavior and assertions at the business level.

Tests should:

- call flows or high-level page methods
- remain readable and small
- avoid raw locator usage

Tests should not:

- contain direct selector logic
- contain repeated UI interaction details
- duplicate business workflow steps already modeled in flows

### BDD Step Definitions

BDD steps must stay thin.

Step definitions should:

- map Gherkin intent into existing flows or page/component methods
- prefer reuse over new automation logic
- stay declarative and readable

Step definitions should not:

- call raw Playwright locators directly
- implement business workflows inline
- become an alternative automation layer outside the framework

### Flows

Flows own business orchestration.

Flows should:

- combine page/component actions into meaningful business journeys
- express reusable user workflows
- capture important checkpoint artifacts where useful
- perform high-level assertions when the workflow contract includes an outcome

Flows should not:

- own raw selectors
- contain low-level DOM logic
- become data stores for all test input

### Pages

Pages are composition roots for page-level behavior.

Pages should:

- own navigation to a route or page shell
- compose page components
- expose high-level page state methods

Pages should not:

- hold every interaction for every region if the page has multiple meaningful
  sections
- become large "god objects"

### Components

Components own bounded UI regions.

Create a component when:

- a page has more than one meaningful region
- a region has its own selectors and interaction rules
- a section can change independently of the rest of the page
- the page object starts mixing unrelated concerns

Components should:

- wrap one bounded region of the UI
- expose reusable actions and assertions for that region
- depend on selector modules for that region

### Selectors

Selectors own element-finding definitions only.

Selectors should:

- use accessible strategies first
- use CSS or XPath as fallbacks
- stay grouped by page region when the UI grows
- be named by intent, not by implementation detail

Selectors should not:

- contain business logic
- be used directly in tests or BDD steps
- become a single giant page-wide file when the page has multiple regions

## Naming Conventions

### Files

- Selector modules: `<region>.selectors.ts`
- Page objects: `<PageName>.ts`
- Component objects: `<ComponentName>.ts`
- Flow objects: `<FlowName>.ts`
- API clients: `<Domain>ApiClient.ts`

### Examples

- `login-form.selectors.ts`
- `mfa-panel.selectors.ts`
- `LoginPage.ts`
- `LoginForm.ts`
- `MfaPanel.ts`
- `LoginFlow.ts`
- `TrainingAppApiClient.ts`

## Selector Rules

Preferred selector priority:

1. role
2. label
3. text
4. test id
5. scoped CSS
6. XPath fallback

Guidelines:

- prefer regex for visible text that may drift slightly
- scope CSS fallbacks to stable containers
- avoid brittle positional XPath unless there is no better anchor
- keep fallback definitions close to the UI region they belong to

## Assertions

Assertions should live at the lowest layer that can express them clearly.

Examples:

- component assertion if the assertion is about one UI region
- page assertion if the assertion describes whole-page readiness
- flow assertion if the workflow contract includes success/failure completion
- test assertion if the expectation is scenario-specific and not broadly reusable

## Data Rules

Test data should move toward dedicated sample data or config modules.

Prefer:

- flow methods that accept data
- reusable sample data files
- environment-aware configuration for app-specific deployments
- test-scoped runtime data for app-discovered values

Avoid:

- burying all credentials and business values directly inside flows long-term
- storing runtime-discovered values in static JSON files

Data categories:

- personas for actors and credentials
- scenario data for known constants and negative values
- form data for engineer-authored inputs
- builders for generated values
- runtime data for values discovered during test execution

## Artifact Rules

Artifacts should support diagnosis without overwhelming the suite.

Allowed defaults:

- framework log attachment per test
- failure screenshot/video/trace via Playwright
- named checkpoint screenshots at important workflow milestones

Avoid:

- taking screenshots for every action by default
- producing excessive logs at selector-resolution granularity for all paths

## API Rules

API tests are a first-class framework lane.

API tests should:

- use API client classes
- use reusable API assertions
- avoid raw request logic in tests when a client abstraction exists

## AI Generation Rules

AI must generate into the framework shape, not around it.

Required order:

1. check registry for reuse
2. explore if necessary
3. propose structured changes
4. require human review

AI-generated changes must target:

- selectors
- components
- pages
- flows
- API clients
- BDD steps
- feature files

AI should not:

- create ad hoc one-off automation outside the framework structure
- bypass review
- treat Playwright MCP exploration as runtime test execution

## Playwright MCP Rule

Playwright MCP is for discovery and evidence only.

It may be used to:

- inspect live application behavior
- discover selectors
- confirm assertions
- gather screenshots and evidence for review

It must not replace:

- page objects
- components
- flows
- test execution

## Decision Rules for Growth

When adding a new UI area:

1. decide whether it belongs to an existing page
2. decide whether it deserves a new component
3. add region-scoped selectors
4. expose reusable methods in the component/page
5. reuse from flows/tests/BDD

When adding a new scenario:

1. search for an existing flow
2. search for existing components/pages/selectors
3. add only the missing pieces
4. keep BDD steps thin

## Current Pattern to Follow

The current sample establishes the intended pattern:

- `LoginPage` composes `LoginForm` and `MfaPanel`
- `DashboardPage` composes `DashboardNav` and `WorkspaceWidgets`
- `LoginFlow` orchestrates business behavior
- smoke tests and BDD steps reuse the flow instead of reimplementing UI logic

Future additions should follow the same model.
