import { Toast, ToastType } from '@/components/toast';
import { isAxiosError } from 'axios';

export const toast = (title: string, type: ToastType) => {
  Toast.show(title, {
    type,
    position: 'top',
    action: undefined,
  });
};
export const handleRetry = (failureCount: number, error: any) =>
  isAxiosError(error) && error.response?.status === 401
    ? false
    : failureCount < 2;
