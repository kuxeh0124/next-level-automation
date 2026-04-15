# API Tests

This folder is for HTTP and backend-facing tests.

For the current training app sample, the local app serves a frontend shell but
does not expose a real `/api/auth/login` backend endpoint yet. The sample tests
here demonstrate:

- positive route reachability over HTTP
- negative verification that a backend auth API is not yet available

When a real backend is introduced, prefer app-specific API clients under
`src/samples/<app>/api/clients`.
