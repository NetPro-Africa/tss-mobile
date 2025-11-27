import { toast } from 'sonner-native';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../services';
import { ResetPasswordType } from '../types';

export const useReset = () => {
  return useMutation({
    mutationFn: async ({ email, newPassword, otp }: ResetPasswordType) => {
      const data = await resetPassword({ email, otp, newPassword });
      return data;
    },
    onSuccess: (data) => {
      if (data.message === 'Password reset successful') {
        toast.success(`Password reset successfully`);
      }
    },
    onError: () => {
      toast.error(`An error occurred, Please try again later`);
    },
  });
};
