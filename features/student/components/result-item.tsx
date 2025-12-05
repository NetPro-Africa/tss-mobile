import { Colors } from '@/constants/Colors';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shared/components/custom-card';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import type { ResultItem } from '@/features/student/types';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import React, { useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

type Props = {
  item: ResultItem;
  // width: number;
};

const gradeColor = (grade: ResultItem['grade']) => {
  switch (grade) {
    case 'A':
      return '#10B981';
    case 'B':
      return '#3B82F6';
    case 'C':
      return '#F59E0B';
    case 'D':
      return '#F97316';
    case 'E':
      return '#EF4444';
    case 'F':
    default:
      return '#DC2626';
  }
};

export const ResultItemCard = ({ item }: Props) => {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  const pill = gradeColor(item.grade);
  const { width } = useWindowDimensions();
  const [viewWidth, setViewWidth] = useState(width - 65);
  const onLayout = (e: LayoutChangeEvent) => {
    setViewWidth(e.nativeEvent.layout.width);
  };
  const boxWidth = viewWidth / 4 - 6;

  return (
    <Card>
      <CardContent style={{ gap: 5 }}>
        <CardHeader>
          <Stack gap={6} flex={1}>
            <NormalText style={{ opacity: 0.8 }}>
              {item.subject.name}
            </NormalText>
            <MediumText style={{ color: textColor }}>{item.grade}</MediumText>
          </Stack>
          <View style={[styles.pill, { backgroundColor: pill }]}>
            <NormalText style={{ color: colors.white }}>
              {item.total}
            </NormalText>
          </View>
        </CardHeader>
        <Stack gap={8} mt={10}>
          <View style={{ flexDirection: 'row', gap: 6 }} onLayout={onLayout}>
            <Stack p={8} style={styles.box} width={boxWidth}>
              <NormalText>CA</NormalText>
              <MediumText>{item.ca}</MediumText>
            </Stack>
            <Stack p={8} style={styles.box} width={boxWidth}>
              <NormalText>Exam 1</NormalText>
              <MediumText>{item.first_exam}</MediumText>
            </Stack>
            <Stack p={8} style={styles.box} width={boxWidth}>
              <NormalText>Exam 2</NormalText>
              <MediumText>{item.second_exam}</MediumText>
            </Stack>
            <Stack p={8} style={styles.box} width={boxWidth}>
              <NormalText>Exam 3</NormalText>
              <MediumText>{item.third_exam}</MediumText>
            </Stack>
          </View>
          <Stack direction="row" gap={8} justifyContent="space-between">
            <Stack p={8}>
              <NormalText>Term</NormalText>
              <MediumText>{item.semester.name}</MediumText>
            </Stack>
            <Stack p={8}>
              <NormalText>Session</NormalText>
              <MediumText>{item.session.name}</MediumText>
            </Stack>
          </Stack>
        </Stack>
        <CardFooter>
          <NormalText style={{ opacity: 0.8 }}>{item.remark}</NormalText>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    justifyContent: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 9999,
  },
});
