# Training App Data

This sample keeps test data split by intent so future projects can scale without turning the test suite into a pile of inline literals.

## Data Categories

- `personas/` describes reusable users or actors, including credentials and role-level intent.
- `forms/` stores engineer-authored form input datasets for page or component interactions.
- `scenarios/` stores expected values, edge cases, and behavior-specific data for a scenario.
- `builders/` is reserved for generated or composed data where static fixtures are not enough.
- `runtime-data.keys.ts` defines keys for values captured during a test run and stored in the runtime data store.

## Usage Rule

Prefer the narrowest data source that matches the intent:

- Use a persona when the test needs to say who is acting.
- Use form data when the test needs to say what values are typed into a form.
- Use scenario data when the test needs expected outcomes or business-specific examples.
- Use runtime data when the app creates a value during execution and a later step needs it.

Keep raw editable datasets close to the sample app, then export typed access through `index.ts`.
