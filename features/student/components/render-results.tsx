import { EmptyUi } from '@/features/shared/components/empty-ui';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import { useGetResult } from '@/features/student/api/use-results';
import { useStudent } from '@/features/student/store/useStudent';
import type { ResultItem, StudentResponseData } from '@/features/student/types';
import React, { useEffect, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { ResultItemCard } from './result-item';

export const RenderResults = () => {
  const student = useStudent((s) => s.student);
  const { data, isPending, isError } = useGetResult();
  const [items, setItems] = useState<ResultItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const { width } = useWindowDimensions();
  const dataMemo = data as StudentResponseData | undefined;
  const pagination = dataMemo?.pagination;

  useEffect(() => {
    // reset when student changes
    setPage(1);
    setItems([]);
  }, [student?.id]);

  useEffect(() => {
    if (dataMemo?.results) {
      if (page === 1) setItems(dataMemo.results);
      else setItems((prev) => [...prev, ...dataMemo.results]);
    }
  }, [dataMemo?.results, page]);

  const onEndReached = () => {
    if (!pagination) return;
    if (pagination.page >= pagination.total_pages) return;
    setPage((p) => p + 1);
  };

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

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ResultItemCard item={item} />}
      keyExtractor={(item, i) => item.id.toString() + i}
      contentContainerStyle={{ gap: 15, paddingHorizontal: 15 }}
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
      ListEmptyComponent={() => <EmptyUi message="No results yet" />}
    />
  );
};
