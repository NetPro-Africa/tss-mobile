import { useAuth } from '@/features/shared/store/use-auth';
import { useQuery } from '@tanstack/react-query';

import { PaginateRequestType } from '@/features/shared/types';
import { handleRetry } from '@/features/shared/utils';
import { fetchAssignments } from '../service';

export const useGetAssignments = ({
  page = 1,
  limit = 5,
}: Partial<PaginateRequestType>) => {
  const token = useAuth((state) => state.user?.token!);
  console.log({ token });

  return useQuery({
    queryKey: ['assignments', token, page],
    queryFn: async () => {
      return await fetchAssignments({ token, page, limit });
    },
    retry: handleRetry,
  });
};
