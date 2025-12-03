import { useAuth } from '@/features/shared/store/use-auth';
import { useQuery } from '@tanstack/react-query';

import { PaginateRequestType } from '@/features/shared/types';
import { handleRetry } from '@/features/shared/utils';
import { fetchAssignments } from '../service';

export const useGetAssignments = ({
  page = 1,
  limit = 5,
  status = 'available',
}: Partial<PaginateRequestType>) => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['assignments', token, page, status],
    queryFn: async () => {
      return await fetchAssignments({ token, page, limit, status });
    },
    retry: handleRetry,
  });
};
