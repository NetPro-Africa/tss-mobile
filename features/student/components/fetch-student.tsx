import { LoadingBar } from '@/features/shared/components/loading-bar';
import { MediumText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { useAuth } from '@/features/shared/store/use-auth';
import React, { useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useGetStudent } from '../api/use-get-student';
import { useStudent } from '../store/useStudent';
import { StudentMenu } from './student-menu';

export const FetchStudent = () => {
  const fname = useAuth((state) => state.user?.user.fname!);

  const getStudent = useStudent((state) => state.getStudent);
  const { data: response, isPending, isError } = useGetStudent();

  useEffect(() => {
    if (!isError && !isPending && Array.isArray(response?.data)) {
      const students = response?.data.map((item) => ({
        id: item.id,
        name: item.fname + ' ' + item.lname,
        class: item.department.name,
      }));
      getStudent(students[0]);
    }
  }, [isError, isPending, response?.data, getStudent]);

  if (isError) {
    throw new Error('Failed to get data');
  }
  if (isPending) {
    return <LoadingBar />;
  }
  if (!response) {
    return;
  }
  const { data } = response;
  const students = data.map((item) => ({
    id: item.id,
    name: item.fname + ' ' + item.lname,
    class: item.department.name,
  }));
  return (
    <Stack direction="row" justifyContent="space-between" mt={5}>
      <MediumText
        style={{ fontSize: RFValue(14), flex: 1 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {fname}
      </MediumText>
      <StudentMenu students={students} />
    </Stack>
  );
};
