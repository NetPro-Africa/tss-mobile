import { EmptyUi } from '@/features/shared/components/empty-ui';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import React from 'react';
import { View } from 'react-native';
import { NewsItem, Pagination } from '../types';
import { RenderEvent } from './render-event';

type Props = {
  news: NewsItem[];
  pagination: Pagination;
  horizontal?: boolean;
  width: number;
  height: number;
  summarize?: boolean;
  onEndReached?: () => void;
};

export const RenderEvents = ({
  news,
  pagination,
  horizontal,
  height,
  width,
  summarize,
  onEndReached,
}: Props) => {
  const renderItem = ({ item }: LegendListRenderItemProps<NewsItem>) => (
    <RenderEvent
      item={item}
      height={height}
      width={width}
      summarize={summarize}
    />
  );
  const onFetchMore = () => {
    if (pagination.page === pagination.total_pages) {
      return;
    }
    onEndReached?.();
  };
  const isHorizontal = !!horizontal && news.length > 0;

  return (
    <View style={{ flex: 1 }}>
      <LegendList
        data={news}
        renderItem={renderItem}
        horizontal={isHorizontal}
        keyExtractor={(item, i) => item.id.toString()}
        contentContainerStyle={{ gap: 15 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        recycleItems
        ListEmptyComponent={() => <EmptyUi message="No news yet" />}
        onEndReachedThreshold={0.5}
        onEndReached={onFetchMore}
      />
    </View>
  );
};
