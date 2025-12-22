import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/features/shared/components/ThemedView';
import { Title } from '@/features/shared/components/title';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { AnimatePresence, MotiView } from 'moti';
import { FlatList, StyleSheet, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';
import type { AttendanceResponse } from '../types';

const STATUS_COLORS: Record<'present' | 'absent' | 'late' | 'excused', string> =
  {
    present: '#8B5CF6',
    absent: '#EF4444',
    late: '#F59E0B',
    excused: '#06B6D4',
  };

// Define legend items
// interface LegendItem {
//   color: string;
//   label: string;
// }
// interface AttendanceCalendarProps {
//   attendanceData?: AttendanceType[];
//   title?: string;
//   subtitle?: string;
// }

// Define the marked date configuration
interface MarkedDateConfig {
  selected: boolean;
  selectedColor: string;
  selectedTextColor: string;
}
// const LEGEND_ITEMS: LegendItem[] = [
//   { color: ATTENDANCE_COLORS.PRESENT, label: 'Present' },
//   { color: ATTENDANCE_COLORS.ABSENT, label: 'Absent' },
//   { color: ATTENDANCE_COLORS.CLASS_DAY, label: 'Class Day (No Data)' },
//   { color: ATTENDANCE_COLORS.NO_CLASS, label: 'No Class' },
// ];

type Props = {
  data: AttendanceResponse['data'];
};

export const RenderAttendance = ({ data }: Props) => {
  const colorScheme = useColorScheme();
  const bg = Colors[colorScheme ?? 'light'].card;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const { attendances, summary } = data;

  const formatAttendanceData = (): any => {
    const markedDates: any = {};
    attendances.forEach((record) => {
      const date = record.attendance_date;
      const config: MarkedDateConfig = {
        selected: true,
        selectedTextColor: 'white',
        selectedColor: STATUS_COLORS[record.status],
      };
      markedDates[date] = config;
    });
    return markedDates;
  };

  const markedDates: any = formatAttendanceData();
  const calendarTheme: Theme = {
    backgroundColor: bg,
    calendarBackground: bg,
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: bg,
    todayTextColor: '#00adf5',
    dayTextColor: textColor,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: bg,
    arrowColor: colors.purple,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: colors.purple,
    indicatorColor: 'blue',
    textDayFontFamily: 'System',
    textMonthFontFamily: 'System',
    textDayHeaderFontFamily: 'System',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 13,
  };
  return (
    <Stack backgroundColor="transparent" gap={10}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Title title="Attendance" />
      </Stack>

      <ThemedView style={{ minHeight: 250 }}>
        <Calendar
          markedDates={markedDates}
          markingType="multi-dot"
          theme={calendarTheme}
          disableAllTouchEventsForDisabledDays={true}
          disableArrowLeft={false}
          disableArrowRight={false}
          style={styles.calendar}
        />
      </ThemedView>

      <ThemedView style={{ borderRadius: 10, padding: 12 }}>
        <MediumText style={{ marginBottom: 8 }}>Summary</MediumText>
        <Stack direction="row" gap={8} style={{ flexWrap: 'wrap' }}>
          <AnimatePresence>
            {[
              { label: 'Total', value: summary.total_days, color: '#374151' },
              {
                label: 'Present',
                value: summary.present,
                color: STATUS_COLORS.present,
              },
              {
                label: 'Absent',
                value: summary.absent,
                color: STATUS_COLORS.absent,
              },
              { label: 'Late', value: summary.late, color: STATUS_COLORS.late },
              {
                label: 'Excused',
                value: summary.excused,
                color: STATUS_COLORS.excused,
              },
              {
                label: 'Rate',
                value: Math.round(summary.attendance_rate) + '%',
                color: colors.purple,
              },
            ].map((item) => (
              <MotiView
                key={item.label}
                from={{ opacity: 0, translateY: 6 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250 }}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  backgroundColor: item.color,
                }}
              >
                <Stack>
                  <NormalText style={{ color: '#fff' }}>
                    {item.label}
                  </NormalText>
                  <MediumText style={{ color: '#fff' }}>
                    {String(item.value)}
                  </MediumText>
                </Stack>
              </MotiView>
            ))}
          </AnimatePresence>
        </Stack>
      </ThemedView>

      <ThemedView style={{ borderRadius: 10, padding: 12 }}>
        <MediumText style={{ marginBottom: 8 }}>Daily Records</MediumText>
        <Stack gap={6}>
          <AnimatePresence>
            <FlatList
              data={attendances}
              renderItem={({ item }) => (
                <MotiView
                  key={item.id}
                  from={{ opacity: 0, translateY: 6 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <NormalText>{item.attendance_date}</NormalText>
                    <NormalText
                      style={{
                        color: STATUS_COLORS[item.status],
                        fontWeight: '600',
                      }}
                    >
                      {item.status.toUpperCase()}
                    </NormalText>
                  </Stack>
                  {item.remarks && (
                    <NormalText style={{ opacity: 0.8, marginTop: 4 }}>
                      {item.remarks}
                    </NormalText>
                  )}
                </MotiView>
              )}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              ListEmptyComponent={() => (
                <NormalText style={{ opacity: 0.8, marginTop: 4 }}>
                  No records found
                </NormalText>
              )}
            />
          </AnimatePresence>
        </Stack>
      </ThemedView>
    </Stack>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    // 40% of screen height
    borderRadius: 8,
  },
});
