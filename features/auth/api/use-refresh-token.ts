import { useAuth } from '@/features/shared/store/use-auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { refreshToken } from '../services';

export const useRefreshToken = () => {
  const user = useAuth((state) => state.user);
  const { mutateAsync } = useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const data = await refreshToken({ token });
      return data;
    },
  });

  useEffect(() => {
    if (!user?.token) return;
    const onRefreshToken = async () => {
      try {
        const data = await mutateAsync({ token: user?.token! });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    void onRefreshToken();
  }, [mutateAsync, user?.token]);
};
