import { useAuth } from '@/features/shared/store/use-auth';
import { useQuery } from '@tanstack/react-query';
import { fetchClasses } from '../services';

export const useGetClasses = () => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['classes', token],
    queryFn: async () => {
      return await fetchClasses({ token, regnum: '' });
    },
    retry: 3,
  });
};
