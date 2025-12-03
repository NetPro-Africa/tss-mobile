import { Colors } from '@/constants/Colors';
import { useGetAssignments } from '@/features/assignments/api/use-get-assignments';
import type { AssignmentsResponse } from '@/features/assignments/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shared/components/custom-card';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { format } from 'date-fns';
import { Dimensions, FlatList, View } from 'react-native';

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
  if (!data || (data as AssignmentsResponse).data.length === 0) {
    const textColor = Colors[colorScheme ?? 'light'].text;
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <Card style={{ width: width - 30, height: 180 }}>
          <CardContent
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <MediumText style={{ color: textColor }}>
              No assignments available
            </MediumText>
            <NormalText style={{ opacity: 0.7 }}>Check back later</NormalText>
          </CardContent>
        </Card>
      </View>
    );
  }

  const items = (data as AssignmentsResponse).data;
  return (
    <FlatList
      data={items}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.assignment.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      renderItem={({ item }) => {
        const open = format(item.setassignment.opendate, 'PPP');
        const close = format(item.setassignment.closedate, 'PPP HH:mm');
        return (
          <View style={{ width: width - 30 }}>
            <Card style={{ height: 220 }}>
              <CardContent>
                <CardHeader>
                  <Stack gap={6}>
                    <NormalText style={{ fontSize: 12, opacity: 0.8 }}>
                      Assignment
                    </NormalText>
                    <MediumText>{item.setassignment.title}</MediumText>
                    <NormalText style={{ opacity: 0.8 }}>
                      {item.setassignment.subject.name}
                    </NormalText>
                  </Stack>
                </CardHeader>
                <Stack gap={10} mt={10}>
                  <Stack direction="row" gap={8}>
                    <Stack
                      backgroundColor={colors.purple}
                      p={10}
                      style={{ borderRadius: 8 }}
                    >
                      <NormalText style={{ color: colors.white }}>
                        Open
                      </NormalText>
                      <MediumText style={{ color: colors.white }}>
                        {open}
                      </MediumText>
                    </Stack>
                    <Stack
                      backgroundColor={'#111827'}
                      p={10}
                      style={{ borderRadius: 8 }}
                    >
                      <NormalText style={{ color: colors.white }}>
                        Due
                      </NormalText>
                      <MediumText style={{ color: colors.white }}>
                        {close}
                      </MediumText>
                    </Stack>
                  </Stack>
                  {item.setassignment.description ? (
                    <NormalText numberOfLines={2} style={{ opacity: 0.9 }}>
                      {item.setassignment.description}
                    </NormalText>
                  ) : null}
                </Stack>
                <CardFooter>
                  <Stack direction="row" gap={8}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 9999,
                        backgroundColor:
                          item.status === 'completed' ? '#10B981' : '#F59E0B',
                      }}
                    >
                      <NormalText style={{ color: colors.white }}>
                        {item.status}
                      </NormalText>
                    </View>
                  </Stack>
                </CardFooter>
              </CardContent>
            </Card>
          </View>
        );
      }}
    />
  );
};
