## Root Cause
- The More screen triggers `setShowLogoutModal(true)` correctly when tapping the "Sign Out" item (`features/more/constants.tsx:73-80`).
- The confirmation UI uses `react-native-modal` inside `CustomModal` (`features/shared/components/modal/custom-modal.tsx:30`). `react-native-modal` does not render on web; if you are testing in the web build, the modal will not appear.

## Implementation Changes
1. Replace `react-native-modal` in `CustomModal` with React Native `Modal`:
- Use `Modal` from `react-native` with `visible={visible}`, `transparent`, and an overlay backdrop.
- Keep the existing API (`visible`, `title`, `subTitle`, `onPress`, `onClose`, `isPending`).
- Preserve styling and actions; add `onRequestClose={onClose}` for Android back behavior.

2. Make the same change for `LoadingModal`:
- Swap `react-native-modal` for RN `Modal` with `visible`, `transparent`, centered spinner.

3. Optional: Consolidate to existing Dialog component:
- Alternatively, use `components/dialog/Dialog` which already wraps RN `Modal` and animations, ensuring cross-platform rendering.
- Create a small wrapper to reuse its header/description/footer for the confirmation.

## Verification Steps
- iOS: Run `bun ios`, navigate to More tab, tap "Sign Out"; confirmation dialog should appear; tap Cancel/Proceed works; backdrop dismiss works.
- Web: Run `expo start --web`; navigate to More → Sign Out; dialog renders and is dismissible; loading modal shows while logout mutation is pending.
- Ensure no z-index or layout conflicts with `Wrapper`/`ScrollView` by verifying the overlay covers the screen.

## Rollback Safety
- Changes are limited to modal components; if issues arise, reintroduce `react-native-modal` conditionally for native and keep RN `Modal` for web via `Platform.select` as a fallback.