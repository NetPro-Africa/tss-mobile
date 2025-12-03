import { useGetAssignments } from '@/features/assignments/api/use-get-assignments';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ICarouselInstance } from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;

export const AssignmentsCarousel = () => {
  const { data, isPending, isError, error } = useGetAssignments({});
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  console.log(error);
  console.log(data?.data);

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
  return null;
};
