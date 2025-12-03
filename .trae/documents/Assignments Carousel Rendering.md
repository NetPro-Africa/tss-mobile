## Approach
- Use `useGetAssignments({ page: 1, limit: 5, status: 'available' })` to fetch `AssignmentsResponse`.
- Render a horizontal `FlatList` with `pagingEnabled`, one card per page.
- Card shows: assignment title, subject, short description, open/close dates, and status tag.
- Handle empty state with a friendly message and styling consistent with app colors.
- Keep UI slick with modern layout; optionally use subtle fade-in on items.

## Implementation
- Update `features/student/components/assignment-carousel.tsx`:
  - When loading: keep existing `LoadingLists` and `LoadingCard`.
  - On success: if `data.data.length === 0`, render empty view; else render `FlatList`.
  - Create inline `renderItem` to map `AssignmentItemType` → card using shared `Card` components.
- Follow `Colors` and shared typography/components used elsewhere.

## Validation
- Simulate both non-empty and empty data scenarios.
- Verify horizontal paging shows one assignment at a time.
- Confirm types align with `features/assignments/types.ts` (`AssignmentsResponse`).