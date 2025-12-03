import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { fetchAttendance } from '../services';
import { FetchAttendanceType } from '../types';

export const useGetAttendance = ({
  student_id,
  start_date,
  end_date,
}: FetchAttendanceType) => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['attendance', token, student_id, start_date, end_date],
    queryFn: async () =>
      fetchAttendance({ token, student_id, start_date, end_date }),
    retry: handleRetry,
  });
};
