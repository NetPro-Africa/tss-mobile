import { LoadingBar } from '@/features/shared/components/loading-bar';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { CustomModal } from '@/features/shared/components/modal/custom-modal';
import { ThemedView } from '@/features/shared/components/ThemedView';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { CustomPressable } from '@/features/shared/components/ui/custom-pressable';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { format, startOfMonth, startOfToday } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useGetAttendance } from '../api/use-get-attendance';
import { useStudent } from '../store/useStudent';
import { RenderAttendance } from './render-attendance';

export const FetchAttendance = () => {
  const student = useStudent((state) => state.student);
  const _startOfMonth = startOfMonth(new Date());
  const today = startOfToday();
  const formatStartOfMonth = format(_startOfMonth, 'yyyy-MM-dd');
  const formatToday = format(today, 'yyyy-MM-dd');
  const [startDate, setStartDate] = useState(formatStartOfMonth);
  const [endDate, setEndDate] = useState(formatToday);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const { data, isPending, isError } = useGetAttendance({
    student_id: student?.id!,
    start_date: startDate,
    end_date: endDate,
  });

  const { width } = useWindowDimensions();
  const cardWidth = width - 30;

  const rangeLabel = useMemo(
    () =>
      `${format(new Date(startDate), 'MMM d, yyyy')} → ${format(new Date(endDate), 'MMM d, yyyy')}`,
    [startDate, endDate]
  );

  if (isError) {
    throw new Error('Failed to fetch attendance data');
  }

  if (isPending) {
    return (
      <>
        <LoadingBar />
        <LoadingCard height={250} width={cardWidth} />
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Stack gap={12}>
      <ThemedView style={{ borderRadius: 10, padding: 10 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <MediumText>Attendance Range</MediumText>
            <NormalText style={{ opacity: 0.8 }}>{rangeLabel}</NormalText>
          </Stack>
          <Stack direction="row" gap={8}>
            <CustomPressable
              onPress={() => setShowStartPicker(true)}
              style={{
                backgroundColor: colors.purple,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <NormalText style={{ color: colors.white }}>Start</NormalText>
            </CustomPressable>
            <CustomPressable
              onPress={() => setShowEndPicker(true)}
              style={{
                backgroundColor: colors.purple,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <NormalText style={{ color: colors.white }}>End</NormalText>
            </CustomPressable>
          </Stack>
        </Stack>
      </ThemedView>

      <RenderAttendance data={data.data} />

      {showStartPicker && (
        <CustomModal
          visible={showStartPicker}
          onClose={() => setShowStartPicker(false)}
          onPress={() => setShowStartPicker(false)}
          title="Select start date"
          subTitle="Pick a start date for the range"
        >
          <Stack mt={10}>
            <Calendar
              onDayPress={(day) => {
                setStartDate(day.dateString);
                setShowStartPicker(false);
              }}
            />
          </Stack>
        </CustomModal>
      )}

      {showEndPicker && (
        <CustomModal
          visible={showEndPicker}
          onClose={() => setShowEndPicker(false)}
          onPress={() => setShowEndPicker(false)}
          title="Select end date"
          subTitle="Pick an end date for the range"
        >
          <Stack mt={10}>
            <Calendar
              onDayPress={(day) => {
                setEndDate(day.dateString);
                setShowEndPicker(false);
              }}
            />
          </Stack>
        </CustomModal>
      )}
    </Stack>
  );
};
