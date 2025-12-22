import { Colors } from '@/constants/Colors';
import { CustomPressable } from '@/features/shared/components/ui/custom-pressable';
import { colors } from '@/features/shared/constants';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';
import { NormalText } from '../typography';
import { Stack } from './stack';

type Props = {
  title?: string;
};
export const Header = ({ title }: Props) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;
  const onPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <Stack
      style={styles.container}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <CustomPressable onPress={onPress} style={styles.button}>
        <Feather name="chevrons-left" size={24} color={iconColor} />
      </CustomPressable>
      {title && <NormalText>{title}</NormalText>}
      <Stack width={50} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  button: {
    borderColor: colors.grey,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
