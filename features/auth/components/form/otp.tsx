import { OTPInput, type OTPInputRef, type SlotProps } from 'input-otp-native';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';

import { useEffect, useRef } from 'react';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  maxLength?: number;
  onComplete: (code: string) => void;
};

export const AppleOTPInput = ({ maxLength = 4, onComplete }: Props) => {
  const ref = useRef<OTPInputRef>(null);
  const onFinish = (code: string) => {
    onComplete(code);
  };

  return (
    <OTPInput
      ref={ref}
      onComplete={onFinish}
      containerStyle={styles.container}
      maxLength={maxLength}
      render={({ slots }) => (
        <View style={styles.slotsContainer}>
          {slots.map((slot, idx) => (
            // @ts-ignore
            <Slot key={idx} {...slot} length={maxLength} />
          ))}
        </View>
      )}
    />
  );
};
// @ts-ignore
function Slot({ char, isActive, hasFakeCaret, length }: SlotProps) {
  const { width } = useWindowDimensions();
  const gap = 8;
  const slotWidth = (width - 30 - (length - 1) * gap) / length;
  return (
    <View
      style={[styles.slot, isActive && styles.activeSlot, { width: slotWidth }]}
    >
      {char !== null && <Text style={styles.char}>{char}</Text>}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeCaret({ style }: { style?: ViewStyle }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.fakeCaretContainer}>
      <Animated.View style={[styles.fakeCaret, style, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  slotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  slot: {
    width: 50,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  activeSlot: {
    borderColor: '#000000',
    borderWidth: 2,
  },
  char: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111827',
  },
  /* Caret */
  fakeCaretContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fakeCaret: {
    width: 2,
    height: 28,
    backgroundColor: '#000',
    borderRadius: 1,
  },
});
