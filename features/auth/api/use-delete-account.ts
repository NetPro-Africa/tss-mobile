import { useAuth } from '@/features/shared/store/use-auth';
import { toast } from 'sonner-native';
import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '../services';

export const useDeleteAccount = () => {
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);
  return useMutation({
    mutationFn: async () => {
      const data = await deleteAccount({ token: user?.token! });
      return data;
    },
    onSuccess: (data) => {
      clearUser();

      toast.success(`Account deleted`);
    },
    onError: (error) => {
      toast.error(`An error occurred, Please try again later`);
    },
  });
};
