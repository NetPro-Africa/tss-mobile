## Goals
- Build a slick, intuitive attendance UI backed by the existing `AttendanceResponse` data.
- Allow selecting a student and date range; refresh results automatically.
- Show a calendar view and a clear summary (present/absent/late/excused, totals, rate).
- Add subtle animations using `moti` for pleasant UX.

## Data & Hooks
- Use `useGetAttendance({ student_id, start_date, end_date })` to fetch `AttendanceResponse`.
- Student selection leverages existing store and menu: `useStudent` + `FetchStudent`.
- Date range state lives in `FetchAttendance` and is passed to the hook.

## UI Changes
1. Update `FetchAttendance` to:
- Render header with `FetchStudent` (student selector) and two date pickers (Start/End).
- Use `CustomModal` + `Calendar` for picking dates; update state and re-query.
- Handle loading and error gracefully.

2. Replace current `RenderAttendance` to:
- Accept `AttendanceResponse['data']` (student, attendances, summary, date_range).
- Calendar marks days with colors per status: present (purple), absent (red), late (amber), excused (teal).
- Summary card with animated counters (using `moti`).
- List view of daily records (date, status, remarks) with subtle fade-in and micro-transitions.

## Animations
- Use `moti` `AnimatePresence` + `MotiView` for summary and list items (fade/slide, small durations).
- Keep motion subtle: ease-out 200–300ms.

## Verification
- Switch between children via the student menu; observe automatic refetch.
- Change date range; re-fetch and calendar/list updates; summary recomputes.
- Confirm consistent styling with `ThemedView`, `Stack`, and existing color system.

## Scope & Files
- Edit `features/student/components/fetch-attendance.tsx` (date UI, state, wiring).
- Edit `features/student/components/render-attendance.tsx` (calendar, summary, list, animations).
- No new dependencies; reuse existing `react-native-calendars`, `moti`, and shared components.