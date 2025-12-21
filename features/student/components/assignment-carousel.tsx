import { Colors } from '@/constants/Colors';
import { useGetAssignments } from '@/features/assignments/api/use-get-assignments';
import type { AssignmentsResponse } from '@/features/assignments/types';
import { Card, CardContent } from '@/features/shared/components/custom-card';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Dimensions, FlatList } from 'react-native';
import { AssignmentCard } from './assignment-card';

const width = Dimensions.get('window').width;

export const AssignmentsCarousel = () => {
  const { data, isPending, isError } = useGetAssignments({
    page: 1,
    limit: 5,
    status: 'available',
  });
  const colorScheme = useColorScheme();
  if (isError) {
    throw new Error('Failed to fetch assignments data');
  }
  if (isPending) {
    return (
      <LoadingLists
        renderItem={() => <LoadingCard height={200} width={width - 30} />}
        length={1}
      />
    );
  }

  if (!data || (data as AssignmentsResponse).data.assignments.length === 0) {
    const textColor = Colors[colorScheme ?? 'light'].text;
    return (
      <Card style={{ height: 180 }}>
        <CardContent style={{ alignItems: 'center', justifyContent: 'center' }}>
          <MediumText style={{ color: textColor }}>
            No assignments available
          </MediumText>
          <NormalText style={{ opacity: 0.7 }}>Check back later</NormalText>
        </CardContent>
      </Card>
    );
  }

  const items = (data as AssignmentsResponse).data.assignments;
  return (
    <FlatList
      data={items}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item?.setassignment?.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 15 }}
      renderItem={({ item }) => <AssignmentCard item={item} navigate />}
    />
  );
};
