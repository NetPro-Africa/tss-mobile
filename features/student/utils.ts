import { Directory, File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Save PDF to device storage
export const savePDFToDevice = async (uri: string, filename: string) => {
  const mime = 'application/pdf';

  const destination = new Directory(Paths.document);
  try {
    // Download once to app cache
    const downloaded = await File.downloadFileAsync(uri, destination);
    if (!downloaded.uri) throw new Error('Download failed');

    // One-time open/share, avoids persistent media permissions
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(downloaded.uri, { mimeType: mime });
      return 'shared';
    }
    return 'saved';
  } catch (error) {
    console.error(`Download Error (${filename}):`, error);
    throw new Error(
      `Failed to download ${filename}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export const getGrade = (grade: number): string => {
  if (grade >= 75) {
    return 'A';
  }
  if (grade >= 70) {
    return 'B';
  }
  if (grade >= 50) {
    return 'C';
  }
  if (grade >= 45) {
    return 'D';
  }
  if (grade >= 40) {
    return 'E';
  }
  return 'NI';
};

export const getLetterGrade = (grade: string): string => {
  switch (grade) {
    case 'A':
      return 'Excellent';
    case 'B':
      return 'V. Good';
    case 'C':
      return 'Good';
    case 'D':
      return 'Average';
    case 'E':
      return 'Pass';
    default:
      return 'NI';
  }
};
