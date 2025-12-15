import { AssignmentItemType } from '@/features/assignments/types';
import { EmptyUi } from '@/features/shared/components/empty-ui';
import { FlatList } from 'react-native';
import { AssignmentCard } from './assignment-card';

type Props = {
  data: AssignmentItemType[];
  refreshing: boolean;
  onRefresh: () => void;
  navigate?: boolean;
  onScrollMore: () => void;
  status: string;
};

export const RenderAssignments = ({
  data,
  onRefresh,
  refreshing,
  onScrollMore,
  status,
}: Props) => {
  return (
    <FlatList
      data={data}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onEndReached={onScrollMore}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item?.setassignment?.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 15 }}
      renderItem={({ item }) => <AssignmentCard item={item} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyUi message={`No ${status} assignments yet`} />}
    />
  );
};
