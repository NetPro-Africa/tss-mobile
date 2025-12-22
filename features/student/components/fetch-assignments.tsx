import { useGetAssignments } from '@/features/assignments/api/use-get-assignments';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { assignmentStatus } from '../types';
import { RenderAssignments } from './render-assignment';

type Props = {
  status: assignmentStatus;
  navigate?: boolean;
};

export const FetchAssignments = ({ status, navigate }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isRefetching, refetch } = useGetAssignments(
    {
      page,
      limit: 20,
      status,
    }
  );

  const { width } = useWindowDimensions();

  if (isError) {
    throw new Error('Failed to fetch assignments data');
  }
  if (isPending) {
    return (
      <LoadingLists
        renderItem={() => <LoadingCard height={200} width={width - 30} />}
        length={4}
      />
    );
  }

  const dataToRender = data?.data.assignments || [];
  const onScrollMore = () => {
    if (page < data?.data.pagination.total_pages) {
      setPage(page + 1);
    }
  };
  return (
    <RenderAssignments
      data={dataToRender}
      onRefresh={refetch}
      refreshing={isRefetching}
      navigate={navigate}
      onScrollMore={onScrollMore}
      status={status}
    />
  );
};
