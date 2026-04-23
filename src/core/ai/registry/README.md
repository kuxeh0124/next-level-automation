# Reuse Registry

The reuse registry is the first stop for AI-assisted or human-authored changes.
It records the reusable framework artifacts that already exist so new work can
reuse before generating new code.

## Current Role

This is intentionally a lightweight static seed. It is not a runtime dependency
for tests.

Use it to answer:

- Is there already a flow for this behavior?
- Is there already a page, component, or selector region?
- Is there already an assertion helper?
- Is there already a BDD feature or step definition?
- Is there an API client for this domain?

## Future Role

Future AI-assisted BDD generation should search this registry before proposing
new feature files, step definitions, page objects, selectors, assertions, or API
clients.

If no reusable artifact exists, the generation request should explicitly state
the gap and propose the smallest new artifact needed.
