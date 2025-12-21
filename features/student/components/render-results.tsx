import { EmptyUi } from '@/features/shared/components/empty-ui';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import { NormalText } from '@/features/shared/components/typography';
import { useGetResult } from '@/features/student/api/use-results';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  View,
} from 'react-native';
import { ResultItemCard } from './result-item';
export const RenderResults = () => {
  const {
    data,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    isPending,
  } = useGetResult();

  const { width } = useWindowDimensions();

  if (isError) {
    throw new Error('Failed to load results');
  }

  const cardWidth = width - 30;
  if (isPending) {
    return (
      <LoadingLists
        renderItem={() => <LoadingCard height={200} width={cardWidth} />}
        length={10}
      />
    );
  }

  const totalPages = data?.pages.flatMap((d) => d.pagination.total_pages)[0];
  const pageParams = data.pageParams[data.pageParams.length - 1] as number;

  const finalPage = pageParams === totalPages;
  const onEndReached = () => {
    if (!finalPage && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };
  return (
    <FlatList
      data={data?.pages.flatMap((d) => d.results)}
      renderItem={({ item }) => <ResultItemCard item={item} />}
      keyExtractor={(item, i) => item.toString() + i}
      contentContainerStyle={{
        gap: 15,
        paddingHorizontal: 15,
        paddingBottom: 100,
      }}
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
      ListEmptyComponent={() => <EmptyUi message="No results yet" />}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
            }}
          >
            <ActivityIndicator />
          </View>
        ) : finalPage ? (
          <NormalText style={{ textAlign: 'center', paddingVertical: 20 }}>
            Nothing more to load
          </NormalText>
        ) : null
      }
    />
  );
};
