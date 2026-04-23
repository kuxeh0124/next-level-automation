# Next Level Automation

Created by Karl Jon Cantor.

This repository is the foundation for an AI-assisted automation framework with:

- Playwright UI automation
- HTTP/API testing capability
- BDD-oriented scaffolding
- a reusable framework core plus a clearly separated training-app sample

The training-app sample is intentionally kept in the repository as a reference
implementation and template for future projects where this framework will be
deployed.

## Current Layout

- `src/core`: logging, AI/BDD contracts, and shared framework utilities
- `src/framework`: reusable framework-facing API and extension points
- `src/pages/base`: current shared Playwright base page abstraction
- `src/samples/training-app`: sample app pages, flows, selectors, and API client
- `src/samples/training-app/data`: sample personas, scenario data, form data,
  and data builder structure
- `src/support/runtime-data`: test-scoped runtime data storage
- `tests/smoke`: executable UI smoke coverage for the training app
- `tests/api`: HTTP/API coverage for the training app sample
- `tests/bdd`: future BDD-facing artifacts and generated output

## Commands

- `npm run typecheck`: compile TypeScript without emitting output
- `npm run test`: run the full Playwright suite
- `npm run test:smoke`: run UI smoke tests
- `npm run test:api`: run API/HTTP tests
- `npm run test:bdd`: run generated BDD tests
- `npm run test:all`: run the full Playwright suite
- `npm run report`: open the latest Playwright HTML report

## Runtime Configuration

The framework reads runtime settings from environment variables:

- `BASE_URL`: app URL, defaults to `http://localhost:5173`
- `TEST_ENV`: environment label, defaults to `local`
- `CI`: when true, enables CI-friendly defaults
- `HEADLESS`: overrides browser headless mode
- `RETRIES`: overrides retry count
- `ACTION_TIMEOUT_MS`: overrides test timeout
- `EXPECT_TIMEOUT_MS`: overrides assertion timeout

Examples:

```powershell
$env:HEADLESS="true"; npm run test:smoke
$env:BASE_URL="http://localhost:5173"; npm run test:bdd
```

## Sample Coverage

The training-app sample currently includes:

- positive UI login flow with MFA and dashboard assertion
- negative UI login flow for invalid MFA
- API/HTTP sample coverage for route reachability and missing backend auth endpoint

## Artifacts

Playwright is configured to retain failure artifacts:

- screenshots on failure
- trace on failure
- video on failure

The framework also attaches:

- per-test framework logs
- named checkpoint screenshots for important workflow milestones

Generated artifacts are written under `test-results/` and `playwright-report/`.

## Notes

- The current training app is frontend-driven and does not expose a real backend auth API yet.
- `ARCHITECTURE.md` documents the intended direction toward AI-assisted, reuse-first BDD automation with human review.
- `FRAMEWORK-CONVENTIONS.md` defines the coding and layering rules for framework growth.
- `docs/ENGINEER-WORKFLOW.md` explains the day-to-day workflow for engineers adding coverage.
