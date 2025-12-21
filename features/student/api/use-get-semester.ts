import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { getSemesters } from '../services';

export const useGetSemesters = () => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['semester', token],
    queryFn: async () => {
      return await getSemesters(token);
    },
    retry: handleRetry,
  });
};
