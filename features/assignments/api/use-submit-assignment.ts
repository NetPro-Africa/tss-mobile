import { useAuth } from '@/features/shared/store/use-auth';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner-native';
import { submitAssignments } from '../service';
import { SubmitAssignmentsType } from '../types';

export const useSubmitAssignment = () => {
  const token = useAuth((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ answers, regnum, testid }: SubmitAssignmentsType) => {
      return await submitAssignments({ answers, regnum, testid, token });
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
    onError: (error) => {
      console.log(error.message, error);

      toast.error('Error', {
        description: `Failed to submit assignment, Please try again later`,
      });
    },
  });
};
