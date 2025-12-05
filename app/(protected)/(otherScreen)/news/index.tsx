import { News } from '@/features/events/components/news';
import { Spacer } from '@/features/shared/components/spacer';
import { BoldText } from '@/features/shared/components/typography';
import { Header } from '@/features/shared/components/ui/header';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import React from 'react';

const NewsScreen = () => {
  return (
    <Wrapper>
      <Header />
      <BoldText>News</BoldText>
      <Spacer />
      <News />
    </Wrapper>
  );
};

export default NewsScreen;
