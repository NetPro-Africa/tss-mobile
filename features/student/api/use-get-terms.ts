import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { getSessions, getTerms } from '../services';

export const useGetTerms = () => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['term', token],
    queryFn: async () => {
      return await getTerms(token);
    },
    retry: handleRetry,
  });
};
export const useGetSession = () => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['session', token],
    queryFn: async () => {
      return await getSessions(token);
    },
    retry: handleRetry,
  });
};
