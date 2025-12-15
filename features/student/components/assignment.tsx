import { Text } from '@/components/ui/text';
import type { AssignmentDataType } from '@/features/assignments/types';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { changeFirstLetterToCapital } from '@/features/shared/utils';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useGetAssignment } from '../api/use-get-assignment';

type Props = {
  id: string;
  studentId: string;
};
const { width } = Dimensions.get('window');

export const Assignment = ({ id, studentId }: Props) => {
  const { data, isLoading, isError } = useGetAssignment({ id, studentId });
  if (isLoading) {
    return (
      <LoadingLists
        renderItem={() => <LoadingCard height={200} width={width - 30} />}
        length={4}
      />
    );
  }
  if (isError) {
    throw new Error('Failed to get assignment');
  }

  return (
    <View style={{ paddingHorizontal: 15 }}>
      {data && (
        <Stack gap={10}>
          <MediumText>
            {changeFirstLetterToCapital(
              (data as AssignmentDataType).setassignment.title
            )}
          </MediumText>
          <NormalText style={{ opacity: 0.8 }}>
            {(data as AssignmentDataType).setassignment.subject.name}
          </NormalText>
          <NormalText>
            Total Questions: {(data as AssignmentDataType).total_questions}
          </NormalText>
          <Text
            onPress={() =>
              router.push(`/assignment/start?id=${id}&student=${studentId}`)
            }
            style={styles.text}
          >
            Start
          </Text>
        </Stack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: RFPercentage(2),
    backgroundColor: colors.purple,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
