import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant media library permission to save PDF files.'
      );
      return false;
    }
  }
  return true;
};

// Save PDF to device storage
export const savePDFToDevice = async (uri: string, filename: string) => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    if (Platform.OS === 'ios') {
      // iOS: Use sharing
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Save PDF',
        UTI: 'com.adobe.pdf',
      });
    } else {
      // Android: Use Storage Access Framework
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        // Read the file as base64
        const base64Data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Create and write to the file in the selected directory
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          'application/pdf'
        )
          .then(async (newUri) => {
            await FileSystem.writeAsStringAsync(newUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });

            Alert.alert('Success', `PDF saved as ${filename}`, [
              {
                text: 'Share',
                onPress: () => Sharing.shareAsync(uri),
              },
              { text: 'OK' },
            ]);
          })
          .catch((error) => {
            console.error('Error creating file:', error);
            Alert.alert('Error', 'Failed to save PDF. Please try again.');
          });
      } else {
        // Fallback to sharing if permissions not granted
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save PDF',
        });
      }
    }
  } catch (error) {
    console.error('Error saving PDF:', error);
    Alert.alert('Error', 'Failed to save PDF. Please try again.');
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
