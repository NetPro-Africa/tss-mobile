import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shared/components/custom-card';
import { Spacer } from '@/features/shared/components/spacer';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { CustomPressable } from '@/features/shared/components/ui/custom-pressable';
import { trimText } from '@/features/shared/utils';
import { router } from 'expo-router';
import React from 'react';
import { useNews } from '../store/useNews';
import { NewsItem } from '../types';

type Props = {
  item: NewsItem;
  width: number;
  height: number;
  summarize?: boolean;
};

export const RenderEvent = ({ item, height, width, summarize }: Props) => {
  const setNews = useNews((state) => state.setNews);
  const onPress = () => {
    setNews(item);
    router.push('/news/news-details');
  };
  return (
    <CustomPressable onPress={onPress}>
      <Card style={{ height, width }}>
        <CardContent>
          <Spacer size={20} />
          <CardHeader style={{ flex: 1 }}>
            <MediumText>{item.title}</MediumText>
          </CardHeader>
          <Spacer size={20} />
          <CardFooter>
            <NormalText>
              {summarize ? trimText(item.content, 30) : item.content}
            </NormalText>
          </CardFooter>
        </CardContent>
      </Card>
    </CustomPressable>
  );
};
