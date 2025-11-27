import { useEffect } from 'react';
import { toast } from 'sonner-native';
import { useAuth } from '../store/use-auth';
// or your toast library

export const useSessionExpiry = () => {
  const user = useAuth((state) => state.user);
  const removeUser = useAuth((state) => state.clearUser);

  useEffect(() => {
    if (!user?.loggedInAt || !user?.expires_in) return;

    const loggedInAt = user.loggedInAt; // usually in milliseconds
    const expiresInMs = user.expires_in * 1000;
    const expiresAt = loggedInAt + expiresInMs;

    // If already expired → logout immediately
    if (Date.now() >= expiresAt) {
      removeUser();
      toast.success('Logged out', {
        description: 'Your session has expired',
      });
      return;
    }

    // Otherwise, schedule logout when it expires
    const timeUntilExpiry = expiresAt - Date.now();

    const timer = setTimeout(() => {
      removeUser();
      toast.success('Logged out', {
        description: 'Your session has expired',
      });
    }, timeUntilExpiry);

    // Cleanup timer if user changes or component unmounts
    return () => clearTimeout(timer);
  }, [user?.loggedInAt, user?.expires_in, removeUser]);
};
