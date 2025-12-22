import { useAuth } from '@/features/shared/store/use-auth';
import { useQuery } from '@tanstack/react-query';

import { handleRetry } from '@/features/shared/utils';
import { fetchAssignmentsResult } from '../service';

export const useGetAssignmentResult = ({
  assignmentId,
}: {
  assignmentId: string;
}) => {
  const token = useAuth((state) => state.user?.token!);
  return useQuery({
    queryKey: ['assignment-result', token, assignmentId],
    queryFn: async () => fetchAssignmentsResult({ token, assignmentId }),
    retry: handleRetry,
  });
};
