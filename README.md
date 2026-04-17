# Next Level Automation

This repository is the foundation for an AI-assisted automation framework with:

- Playwright UI automation
- HTTP/API testing capability
- BDD-oriented scaffolding
- a reusable framework core plus a clearly separated training-app sample

## Current Layout

- `src/core`: logging, AI/BDD contracts, and shared framework utilities
- `src/framework`: reusable framework-facing API and extension points
- `src/pages/base`: current shared Playwright base page abstraction
- `src/samples/training-app`: sample app pages, flows, selectors, and API client
- `tests/smoke`: executable UI smoke coverage for the training app
- `tests/api`: HTTP/API coverage for the training app sample
- `tests/bdd`: future BDD-facing artifacts and generated output

## Commands

- `npm run typecheck`: compile TypeScript without emitting output
- `npm run test`: run the full Playwright suite
- `npm run test:smoke`: run UI smoke tests
- `npm run test:api`: run API/HTTP tests
- `npm run test:all`: run the full Playwright suite
- `npm run report`: open the latest Playwright HTML report

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
