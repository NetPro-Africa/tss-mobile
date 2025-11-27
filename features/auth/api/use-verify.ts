import { toast } from 'sonner-native';
import { useMutation } from '@tanstack/react-query';
import { verifyOtp } from '../services';
import { VerifyOtpType } from '../types';

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ email, otp }: VerifyOtpType) => {
      const data = await verifyOtp({ email, otp });
      return data;
    },
    onSuccess: (data) => {
      if (data.message === 'OTP verified') {
        toast.success('Otp verified successfully');
      }
    },
    onError: (error) => {
      if (error.message === 'Request failed with status code 401') {
        toast.error(`Invalid credentials`);
      } else {
        toast.error(`An error occurred, Please try again later`);
      }
    },
  });
};
