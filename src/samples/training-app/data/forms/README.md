# Form Data

Use this folder for engineer-authored form datasets.

Preferred pattern:

- store simple editable values in `*.json`
- define the TypeScript shape in `*.types.ts`
- export typed data through `*.data.ts`

Example future shape:

```text
customer.form-data.json
customer-form.types.ts
customer-form.data.ts
```

Flows should consume typed data objects instead of raw JSON directly.
