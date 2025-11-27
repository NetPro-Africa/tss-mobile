import axios from 'axios';
import { baseUrl } from '../shared/constants';
import {
  SuccessResponseType,
  User,
  VerifyLoginOtpSuccessResponseType,
} from '../shared/types';
import {
  LoginResponseType,
  LoginType,
  ResetPasswordType,
  VerifyOtpType,
} from './types';
export const login = async ({ email, password }: LoginType) => {
  const { data } = await axios.post<LoginResponseType>(
    `${baseUrl}/auth/login`,
    { username: email, password }
  );

  return data;
};

export const verifyLoginOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const { data } = await axios.post<VerifyLoginOtpSuccessResponseType>(
    `${baseUrl}/auth/verify-login-otp`,
    {
      username: email,
      otp,
    }
  );
  return data;
};

export const currentUser = async (token: string) => {
  const { data } = await axios.get<{
    data: User;
    message: string;
    success: boolean;
  }>(`${baseUrl}/parents/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ...data,
    data: { ...data.data, token },
  };
};

export const requestPasswordReset = async (email: string) => {
  const { data } = await axios.post<SuccessResponseType>(
    `${baseUrl}/auth/request-reset`,
    {
      email,
    }
  );
  return data;
};

export const verifyOtp = async ({ email, otp }: VerifyOtpType) => {
  const { data } = await axios.post<SuccessResponseType>(
    `${baseUrl}/auth/verify-otp`,
    {
      email,
      otp,
    }
  );
  return data;
};
export const resetPassword = async ({
  email,
  otp,
  newPassword,
}: ResetPasswordType) => {
  const { data } = await axios.post<SuccessResponseType>(
    `${baseUrl}/auth/reset-password`,
    {
      email,
      otp,
      newPassword,
    }
  );
  return data;
};

export const deleteAccount = async ({ token }: { token: string }) => {
  const { data } = await axios.post<SuccessResponseType>(
    `${baseUrl}/parent/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
