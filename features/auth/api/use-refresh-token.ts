import { useAuth } from '@/features/shared/store/use-auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { refreshToken } from '../services';

export const useRefreshToken = () => {
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.getUser); // assuming you have setUser
  const clearUser = useAuth((state) => state.clearUser); // assuming you have setUser

  const { mutateAsync } = useMutation({
    mutationFn: refreshToken,
  });

  useEffect(() => {
    if (!user?.token || !user.expires_in) return;

    // Calculate time until token expires (with 60s buffer)
    const expiresAt = new Date(user.expires_in).getTime();
    const now = Date.now();
    const timeout = expiresAt - now - 60_000; // refresh 1 min early

    if (timeout < 0) {
      // Token already expired → logout or refresh immediately
      return;
    }

    const timer = setTimeout(() => {
      mutateAsync({ token: user.token })
        .then((res) => {
          setUser({
            ...user,
            token: res.data.token,
            expires_in: res.data.expires_in,
          });
        })
        .catch(() => {
          clearUser();
        });
    }, timeout);

    return () => clearTimeout(timer);
  }, [user, mutateAsync, setUser, clearUser]);
};
