# Architecture

## Intent

This repository is designed to evolve into an AI-assisted BDD automation
framework with human-reviewed changes.

## Structure

- `src/core`: framework-level capabilities such as AI, BDD, logging, config,
  and shared utilities
- `src/framework`: reusable framework-facing contracts and extension points
- `src/pages/base`: current base Playwright page abstraction used by samples
- `src/framework/api`: reusable API client and assertion primitives
- `src/core/ai/exploration/playwright-mcp`: future discovery/evidence contracts
  for live browser exploration through MCP
- `src/samples/training-app`: sample implementation that demonstrates how an
  app branch can consume the framework
- `tests/bdd`: business-facing BDD artifacts and generated reviewable output
- `tests/api`: HTTP and API-facing coverage
- `tests/smoke`: executable smoke coverage for the sample app

## Design Rules

- AI generates into the framework shape; it does not define the shape
- Reuse existing steps, flows, pages, and selectors before creating new code
- Human review is required for generated changes
- Sample app code must stay clearly separated from framework core
- Playwright MCP is for discovery and review evidence, not runtime test execution
