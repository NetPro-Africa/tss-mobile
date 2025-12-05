import { Spacer } from '@/features/shared/components/spacer';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { FetchStudent } from '@/features/student/components/fetch-student';
import { RenderResults } from '@/features/student/components/render-results';
import React from 'react';

const PerformanceScreen = () => {
  return (
    <Wrapper style={{ flex: 1 }}>
      <FetchStudent />
      <Spacer />
      <RenderResults />
    </Wrapper>
  );
};

export default PerformanceScreen;
