# Framework Assertions

This folder contains reusable assertion helpers that can be shared across
samples and app-specific branches.

## Intent

Use assertion helpers for common technical checks so pages and components read
in business language.

Examples:

- `expectVisible(locator)` for a required UI element
- `expectNotVisible(locator)` for a hidden/absent UI state
- `expectContainsText(locator, expectedText)` for stable text expectations
- `expectAllVisible([locatorA, locatorB])` for grouped readiness checks

## Placement Rule

Keep assertions at the lowest layer that can express the intent clearly:

- component assertions for bounded UI regions
- page assertions for whole-page readiness
- flow assertions for journey-level outcomes
- test or BDD assertions only for scenario-specific expectations

Avoid raw `expect(locator)` calls in tests and BDD steps unless the assertion is
truly unique to that test.
