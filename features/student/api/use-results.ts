import { useAuth } from '@/features/shared/store/use-auth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchResult } from '../services';
import { useStudent } from '../store/useStudent';

export const useGetResult = (limit = 10) => {
  const token = useAuth((state) => state.user?.token!);
  const student = useStudent((state) => state.student!);
  return useInfiniteQuery({
    queryKey: ['result', token, student.id, limit],
    queryFn: async ({ pageParam: page }) =>
      fetchResult({ token, id: student.id, page, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.results.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};
