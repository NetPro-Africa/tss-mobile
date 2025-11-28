import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services';

export const useGetProfile = () => {
  const user = useAuth((state) => state.user);
  const removeUser = useAuth((state) => state.clearUser);
  return useQuery({
    queryKey: ['profile', user?.token],
    queryFn: async () => getProfile({ token: user?.token!, removeUser }),
    retry: handleRetry,
  });
};
