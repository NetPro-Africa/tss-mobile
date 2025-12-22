import { Result } from '@/features/assignments/components/result';
import { Header } from '@/features/shared/components/ui/header';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const ResultScreen = () => {
  const { assignmentId } = useLocalSearchParams<{ assignmentId: string }>();
  console.log({ assignmentId });

  return (
    <Wrapper>
      <Header title="Result" />
      <Result assignmentId={assignmentId} />
    </Wrapper>
  );
};

export default ResultScreen;
