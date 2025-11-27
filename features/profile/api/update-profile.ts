import { useAuth } from '@/features/shared/store/use-auth';
import { toast } from 'sonner-native';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { updateProfile } from '../services';
import { UpdateProfileType } from '../types';

export const useUpdateProfile = () => {
  const user = useAuth((state) => state.user);
  const getUser = useAuth((state) => state.getUser);

  return useMutation({
    mutationFn: async (values: UpdateProfileType) => {
      const data = await updateProfile({ token: user?.token!, ...values });
      return data;
    },
    onSuccess: (data) => {
      if (!user) return;
      const { address, city, phone, profesion, states, address2 } = data.data;
      getUser({ ...user, city, address, phone, profesion, states, address2 });

      toast.success(`Profile updated`);
      router.replace('/profile');
    },
    onError: (error) => {
      console.log(error.message);

      toast.error(`An error occurred, Please try again later`);
    },
  });
};
