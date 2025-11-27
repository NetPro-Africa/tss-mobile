import { z } from 'zod';
import { loginSchema } from './scehma';

export type LoginType = z.infer<typeof loginSchema>;
export type LoginResponseType = {
  success: boolean;
  message: string;
  data: {
    username: string;
    otp_expires_in: number;
  };
  meta: {
    timestamp: string;
    version: string;
  };
};

export type VerifyOtpType = {
  email: string;
  otp: string;
};

export type ResetPasswordType = {
  email: string;
  newPassword: string;
  otp: string;
};
