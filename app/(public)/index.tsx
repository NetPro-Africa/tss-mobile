import { NormalButton } from '@/features/shared/components/normal-button';
import { FloatingGradient } from '@/features/shared/components/ui/floating-gradient';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { useFirstTime } from '@/hooks/use-first-time';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get('window');
const OnboardScreen = () => {
  const router = useRouter();
  const setFirstTime = useFirstTime((state) => state.setFirstTime);
  const onPress = () => {
    setFirstTime();
    router.replace('/login');
  };
  return (
    <Wrapper>
      <View className="max-w-7xl w-full mx-auto flex-1 items-center justify-center">
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/phone.png')}
            style={styles.image}
            contentFit={'cover'}
          />
          <FloatingGradient />
        </View>
        <NormalButton
          buttonText={'Get Started'}
          onPress={onPress}
          style={{
            width: '100%',
            maxWidth: 500,
            maxHeight: 50,
            marginTop: 20,
          }}
        />
      </View>
    </Wrapper>
  );
};
export default OnboardScreen;

const styles = StyleSheet.create({
  imageContainer: {
    height: height * 0.8,
    marginHorizontal: 40,
    width: width > 500 ? 500 : width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
