import axios, { isAxiosError } from 'axios';
import { toast } from 'sonner-native';
import { baseUrl } from '../shared/constants';
import {
  ProfileType,
  UpdateProfileType,
  UpdateProfileTypeResponse,
} from './types';

export const updateProfile = async ({
  token,
  address,
  city,
  phone,
  profesion,
  states,
  address2,
}: UpdateProfileType & { token: string }) => {
  console.log({ token });

  const { data } = await axios.put<UpdateProfileTypeResponse>(
    `${baseUrl}/parents/me`,
    {
      phone,
      profesion,
      address,
      city,
      states,
      address2,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const getProfile = async ({
  token,
  removeUser,
}: {
  token: string;
  removeUser: () => void;
}) => {
  try {
    const { data } = await axios.get<ProfileType>(
      `${baseUrl}/parents/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (status === 401) {
        removeUser();
        toast.error('Session expired', {
          description: 'You have been logged out automatically',
        });
        throw new Error('Session expired', {
          cause: 'You have been logged out automatically',
        });
      }

      if (status === 403) {
        toast.error('Forbidden', {
          description: "You don't have permission to view news",
        });
        throw new Error('Forbidden', {
          cause: "You don't have permission to view news",
        });
      }

      if (status && status >= 500) {
        toast.error('Server error', {
          description: 'Please try again later',
        });
        throw new Error('Server error', {
          cause: 'Please try again later',
        });
      }

      // 400, 404, etc.
      toast.error('Failed to load news', {
        description: message,
      });
      throw new Error('Failed to load news', {
        cause: message,
      });
    } else {
      // Network error, timeout, CORS, etc.
      toast.error('Network error', {
        description: 'Check your connection and try again',
      });
      throw new Error('Network error', {
        cause: 'Check your connection and try again',
      });
    }
  }
};
