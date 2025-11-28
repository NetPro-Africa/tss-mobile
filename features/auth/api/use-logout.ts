import { useAuth } from '@/features/shared/store/use-auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner-native';
import { logout } from '../services';

export const useLogout = () => {
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);
  return useMutation({
    mutationFn: async () => {
      const data = await logout({ token: user?.token! });
      return data;
    },
    onSuccess: (data) => {
      clearUser();

      toast.success(`Logged out successfully`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.status;
        const message = error.response?.data?.message || error.message;
        console.log({ status, message });

        if (status === 401) {
          toast.error('Error', {
            description: message,
          });
        }
        if (status === 403) {
          toast.error('Account Disabled', {
            description: message,
          });
        }
        if (status === 429) {
          toast.error('Too Many Requests', {
            description: message,
          });
        }
        if (status && status >= 500) {
          toast.error('Internal Server Error', {
            description: message,
          });
        }
      } else {
        toast.error('Error', {
          description: 'An error occurred, Please try again later',
        });
      }
    },
  });
};
