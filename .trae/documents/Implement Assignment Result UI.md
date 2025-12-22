## Objective

Implement a post-submission summary UI in `app/(protected)/(otherScreen)/assignment/start.tsx` and prevent automatic redirection upon submission.

## Steps

1. **Update** **`features/student/api/use-get-assignment.ts`**:

   * Modify `useSubmitAssignment` to remove `router.replace('/assignments')` from the `onSuccess` callback. This allows the `start.tsx` screen to remain active and display the success state.

2. **Update** **`app/(protected)/(otherScreen)/assignment/start.tsx`**:

   * Destructure `isSuccess` and `data` (aliased as `result`) from `useSubmitAssignment`.

   * Add a conditional check: `if (isSuccess && result)`.

   * If true, render a **Submission Summary** view containing:

     * Success message (from `result.message`).

     * Assignment status (from `result.data.assignment.status`).

     * Number of answers saved (from `result.data.answers_saved`).

     * Start and End times (formatted).

     * Any immediate score or remarks if available.

     * A "Back to Assignments" button that triggers `router.replace('/assignments')`.

## Technical Details

* **Types**: Utilizes `TakeTestType` for the result data structure.

* **UI Components**: Reuses existing `Stack`, `MediumText`, `NormalText`, `NormalButton` from the project's shared components.

* **Date Formatting**: Uses `date-fns` or standard `Date` formatting for timestamps.

## Verification

* User should see the summary screen immediately after clicking "Submit" and the API call succeeds.

* The store should still be cleared (already handled in `onSubmit`).

* Clicking the "Done" or "Back" button should navigate back to the assignments list.

