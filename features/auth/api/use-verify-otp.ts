import { useAuth } from '@/features/shared/store/use-auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner-native';
import { verifyLoginOtp } from '../services';
import { VerifyOtpType } from '../types';

export const useVerifyLoginOtp = () => {
  const getUser = useAuth((state) => state.getUser);
  return useMutation({
    mutationFn: async ({ email, otp }: VerifyOtpType) => {
      return await verifyLoginOtp({ email, otp });
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: data.message,
      });
      getUser({ ...data.data, loggedInAt: Date.now() });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
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
