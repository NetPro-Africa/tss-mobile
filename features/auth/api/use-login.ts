import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner-native';
import { login } from '../services';
import { LoginType } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginType) => {
      return await login({ email, password });
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: data.message,
      });
      // @ts-ignore
    },
    onError: (error) => {
      console.log('error', JSON.stringify(error, null, 2));
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
