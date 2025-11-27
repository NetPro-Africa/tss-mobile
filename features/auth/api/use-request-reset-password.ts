import { toast } from 'sonner-native';
import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from '../services';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const data = await requestPasswordReset(email);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error.message);

      if (error.message === 'Request failed with status code 404') {
        toast.error(`Email not found, Please try a different email`);
      } else {
        toast.error(`An error occurred, Please try again later`);
      }
    },
  });
};
