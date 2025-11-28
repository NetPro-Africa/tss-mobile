## Root Cause
- In `features/auth/services.ts:105-116`, `axios.post` is called with the `headers` object as the request body (second argument), instead of the config (third argument). This means the `Authorization` header is never set, and the backend responds with “Authentication token is required”.

## Implementation Changes
1. Update `logout` service to pass headers via Axios config:
- Change `axios.post(`${baseUrl}/auth/logout`, { headers: {...} })` to `axios.post(`${baseUrl}/auth/logout`, undefined, { headers: {...} })`.
2. Update `deleteAccount` service similarly (same incorrect pattern is used there), to avoid future related errors.

## Verification
- Trigger logout from the More page: tapping “Sign Out” should now call the endpoint with `Authorization: Bearer <token>` and succeed.
- Observe toast: “Logged out successfully” from `features/auth/api/use-logout.ts:18`.
- Optionally log the `Authorization` header in a request interceptor during development to confirm it’s set.

## Safety / Scope
- No API contract changes; only correct Axios usage. No changes to the UI logic or state store required.