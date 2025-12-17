## Objective

Refactor `savePDFToDevice` in `features/student/utils.ts` to replace deprecated `expo-file-system` and `expo-media-library` methods with the modern, simplified file-sharing approach recommended by Expo (using `expo-sharing` or `expo-file-system` appropriately).

## Steps

1. **Analyze Dependencies**: Confirm if `expo-sharing` and `expo-file-system` are available (already imported).
2. **Refactor Strategy**:

   * Remove `MediaLibrary` usage for saving PDFs (it’s often overkill for documents and `shareAsync` handles saving to Files/Downloads more reliably on both platforms).

   * Use `FileSystem.downloadAsync` or write directly if the content is base64.

   * Use `Sharing.shareAsync` as the primary method for saving/sharing on both iOS and Android. This delegates the "Save to Files" (iOS) or "Save to Drive/Downloads" (Android) action to the OS share sheet, which is the modern, permission-less standard.
3. **Implementation**:

   * Check if the URI is local or remote.

   * If base64 content needs to be written first, write it to a cache path.

   * Call `Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf' })`.

   * Remove the deprecated `StorageAccessFramework` code block which is complex and often unnecessary for simple "Save/Share" flows in modern Expo.
4. **Clean Up**: Remove unused imports (`MediaLibrary`, `StorageAccessFramework` logic).

## Verification

* Code should be cleaner and use `Sharing.shareAsync` which works universally without complex permission flows for saving documents.

