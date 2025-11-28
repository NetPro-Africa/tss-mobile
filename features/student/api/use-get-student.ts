import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { fetchStudent } from '../services';

export const useGetStudent = () => {
  const token = useAuth((state) => state.user?.token!);
  const removeUser = useAuth((state) => state.clearUser);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['students', token],
    queryFn: async () => fetchStudent({ token }),
    retry: handleRetry,
  });
  if (error?.status === 401) {
    removeUser();
  }
  return {
    data,
    isPending,
    isError,
  };
};
