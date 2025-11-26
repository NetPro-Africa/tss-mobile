import { BoldText, NormalText } from '@/features/shared/components/typography';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export const FloatingGradient = () => {
  const colorScheme = useColorScheme();
  const fromColor =
    colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const toColor = colorScheme === 'dark' ? '#151718' : '#fff';
  return (
    <LinearGradient
      colors={[fromColor, toColor]}
      start={{ x: 0, y: 0 }} // Top-left
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <BoldText style={{ textAlign: 'center', marginBottom: 10 }}>
        Welcome to Skoolhost
      </BoldText>
      <NormalText style={styles.text}>
        Everything your school in one digital space for easy management
      </NormalText>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    height: '30%',
  },
  text: {
    textAlign: 'center',
  },
});
