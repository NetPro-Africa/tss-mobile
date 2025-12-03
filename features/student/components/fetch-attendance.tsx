import { LoadingBar } from '@/features/shared/components/loading-bar';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { format, startOfMonth, startOfToday } from 'date-fns';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useGetAttendance } from '../api/use-get-attendance';
import { useStudent } from '../store/useStudent';

export const FetchAttendance = () => {
  const student = useStudent((state) => state.student);
  const _startOfMonth = startOfMonth(new Date());
  const today = startOfToday();
  const formatStartOfMonth = format(_startOfMonth, 'yyyy-MM-dd');
  const formatToday = format(today, 'yyyy-MM-dd');
  const [startDate, setStartDate] = useState(formatStartOfMonth);
  const [endDate, setEndDate] = useState(formatToday);

  const { data, isPending, isError } = useGetAttendance({
    student_id: student?.id!,
    start_date: startDate,
    end_date: endDate,
  });
  console.log({ data });
  const { width } = useWindowDimensions();
  const cardWidth = width - 30; // Assuming a margin of 20 on each side
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

  return;
};
{
  /* <RenderAttendance data={data.data} setTerm={setTerm} term={term} />; */
}
