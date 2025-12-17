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

export const trimText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

export const changeFirstLetterToCapital = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const changeRemoveAllUnderScore = (text: string) => {
  return text.replace(/_/g, ' ');
};
