import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchResult } from '../services';
import { useStudent } from '../store/useStudent';

export const useGetResult = (page = 1, limit = 10) => {
  const token = useAuth((state) => state.user?.token!);
  const student = useStudent((state) => state.student!);
  return useQuery({
    queryKey: ['result', token, student.id, page, limit],
    queryFn: async () => fetchResult({ token, id: student.id, page, limit }),
    retry: handleRetry,
    enabled: Boolean(token),
    placeholderData: keepPreviousData,
  });
};
