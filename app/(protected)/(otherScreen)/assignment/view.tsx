import { Header } from '@/features/shared/components/ui/header';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { Assignment } from '@/features/student/components/assignment';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const ViewAssignment = () => {
  const { id, student } = useLocalSearchParams<{
    id: string;
    student: string;
  }>();

  return (
    <Wrapper>
      <Header title="Assignment" />
      <Assignment id={id} studentId={student} />
    </Wrapper>
  );
};

export default ViewAssignment;
