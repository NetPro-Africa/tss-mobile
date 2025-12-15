## Root Cause
- The `useStartAssignment` query likely runs before `token`, `id`, or `studentId` are ready, causing repeated retries and an indefinite `isPending` state.
- The query has no `enabled` guard, so it fires with invalid params.

## Changes
1. Add `enabled: Boolean(token && id && studentId)` to `useStartAssignment` so it only runs when dependencies are present.
2. Reduce noise: set `refetchOnWindowFocus: false` and keep `retry: handleRetry`.
3. No change to the service method; keep the existing endpoint call.

## Verification
- Navigate to the start screen with valid `id` and `student` route params and a logged-in user.
- Confirm `isPending` flips to `false` and `data` contains assignment payload.
- Confirm error surfaces properly when the server responds with failure.