# Form Data

Use this folder for engineer-authored form datasets.

Preferred pattern:

- store simple editable values in `*.json`
- define the TypeScript shape in `*.types.ts`
- export typed data through `*.data.ts`

Example shape:

```text
login.form-data.json
login-form.types.ts
login.form-data.ts
```

Flows should consume typed data objects instead of raw JSON directly.

Use form data for input values only. If the test needs a reusable user identity, prefer `personas/`. If the test needs expected output or business assertions, prefer `scenarios/`.
