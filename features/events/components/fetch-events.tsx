import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import { Title } from '@/features/shared/components/title';
import { NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { useAuth } from '@/features/shared/store/use-auth';
import { router } from 'expo-router';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useFetchEvents } from '../api/use-get-events';
import { RenderEvents } from './render-events';
type Props = {
  page?: number;
  limit?: number;
  horizontal?: boolean;
  onEndReached?: () => void;
};
export const FetchEvents = ({
  page = 1,
  limit = 5,
  horizontal = false,
  onEndReached,
}: Props) => {
  const token = useAuth((state) => state.user?.token!);
  const { width } = useWindowDimensions();
  const { data, isError, isPending } = useFetchEvents({
    page,
    limit,
    token,
  });

  if (isError) {
    throw new Error('Failed to get data');
  }

  const _width = width * 0.7 - 30;
  if (isPending) {
    return (
      <LoadingLists
        horizontal
        renderItem={() => <LoadingCard width={_width} height={150} />}
      />
    );
  }
  const { news, pagination } = data.data;

  return (
    <Stack flex={1} gap={20} pb={50} backgroundColor="transparent">
      {horizontal && (
        <Stack direction="row" justifyContent="space-between">
          <Title title="News" />
          {pagination.total > 5 && (
            <NormalText
              style={{ color: colors.purple, textDecorationLine: 'underline' }}
              onPress={() => router.push('/news')}
            >
              View All
            </NormalText>
          )}
        </Stack>
      )}
      <RenderEvents
        news={news}
        pagination={pagination}
        horizontal={horizontal}
        width={_width}
        height={150}
        onEndReached={onEndReached}
      />
    </Stack>
  );
};
