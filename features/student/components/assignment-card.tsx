import { AssignmentItemType } from '@/features/assignments/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shared/components/custom-card';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { changeFirstLetterToCapital } from '@/features/shared/utils';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  item: AssignmentItemType;
};

export const AssignmentCard = ({ item }: Props) => {
  const open = format(item.setassignment.opendate, 'P HH:mm');
  const close = format(item.setassignment.closedate, 'P HH:mm');

  return (
    <Link
      href={`/assignment/view?id=${item.setassignment.id}&student=${item.student.id}`}
      asChild
    >
      <Card style={styles.card}>
        <CardContent>
          <CardHeader style={{ flexDirection: 'column' }}>
            <Stack gap={6}>
              <NormalText style={{ fontSize: 12, opacity: 0.8 }}>
                Assignment
              </NormalText>
              <MediumText>
                {changeFirstLetterToCapital(item.setassignment.title)}
              </MediumText>
              <NormalText style={{ opacity: 0.8 }}>
                {changeFirstLetterToCapital(item.setassignment.subject.name)}
              </NormalText>
            </Stack>
            <Stack gap={10} mt={10}>
              <Stack direction="row" gap={8}>
                <Stack
                  backgroundColor={colors.purple}
                  p={10}
                  style={{ borderRadius: 8, flex: 1 }}
                >
                  <NormalText style={{ color: colors.white }}>Open</NormalText>
                  <MediumText style={{ color: colors.white }}>
                    {open}
                  </MediumText>
                </Stack>
                <Stack
                  backgroundColor={'#111827'}
                  p={10}
                  style={{ borderRadius: 8, flex: 1 }}
                >
                  <NormalText style={{ color: colors.white }}>Due</NormalText>
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
          </CardHeader>

          <CardFooter>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={8}
              mt={10}
              flex={1}
            >
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
                  {changeFirstLetterToCapital(item.status)}
                </NormalText>
              </View>
              <View style={{ flex: 1 }}>
                <NormalText style={{ textAlign: 'right' }}>
                  {item.student.fullname}
                </NormalText>
              </View>
            </Stack>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
});
