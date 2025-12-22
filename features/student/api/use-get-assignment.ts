import { useAuth } from '@/features/shared/store/use-auth';
import { handleRetry } from '@/features/shared/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { fetchAssignment, startAssignment, takeAssignment } from '../services';
import { ResponseAssignmentType, SingleAssignmentParams } from '../types';

export const useGetAssignment = ({ id, studentId }: SingleAssignmentParams) => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['assignment', token, studentId, id],
    queryFn: async () => fetchAssignment({ token, studentId, id }),
    retry: handleRetry,
  });
};
export const useStartAssignment = ({
  id,
  studentId,
}: SingleAssignmentParams) => {
  const token = useAuth((state) => state.user?.token!);

  return useQuery({
    queryKey: ['start-assignment', token, studentId, id],
    queryFn: async () => startAssignment({ token, studentId, id }),

    retry: handleRetry,
  });
};
export const useSubmitAssignment = ({
  id,
  studentId,
  answers,
  details,
}: SingleAssignmentParams & ResponseAssignmentType) => {
  const token = useAuth((state) => state.user?.token!);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['submit-assignment', token, studentId, id],
    mutationFn: async () =>
      takeAssignment({ token, studentId, id, answers, details }),
    retry: handleRetry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['assignments'],
      });
      router.replace(
        `/assignment/result?assignmentId=${data.data.assignment.id}`
      );
      toast.success('Success', {
        description: data?.message || 'Assignment submitted successfully',
      });
    },
    onError: (error) => {
      toast.error('Error', {
        description: error?.message || 'Failed to submit assignment',
      });
    },
  });
};
