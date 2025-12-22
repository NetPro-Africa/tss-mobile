import { Colors } from '@/constants/Colors';
import { MediumText, NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import React from 'react';
import { useColorScheme } from 'react-native';

type Props = {
  remainingSeconds: number;
};

export const TimerDisplay = ({ remainingSeconds }: Props) => {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const danger = remainingSeconds <= 300;
  const mm = Math.max(0, Math.floor(remainingSeconds / 60));
  const ss = Math.max(0, remainingSeconds % 60);
  const timeStr = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  return (
    <Stack>
      <NormalText style={{ opacity: 0.8 }}>Time Left</NormalText>
      <MediumText style={{ color: danger ? '#EF4444' : textColor }}>{timeStr}</MediumText>
    </Stack>
  );
};

