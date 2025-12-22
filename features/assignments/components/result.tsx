import { Colors } from '@/constants/Colors';
import { useGetAssignmentResult } from '@/features/assignments/api/use-get-results';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';

import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  assignmentId: string;
};

export const Result = ({ assignmentId }: Props) => {
  const { data, isPending, isError } = useGetAssignmentResult({ assignmentId });
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  if (isPending) {
    return (
      <LoadingLists
        renderItem={() => <LoadingCard height={150} width={width - 30} />}
        length={3}
      />
    );
  }

  if (isError) {
    return (
      <Stack style={{ padding: 20, alignItems: 'center' }}>
        <NormalText>Failed to load results.</NormalText>
      </Stack>
    );
  }

  const { summary, student_answers, assignment } = data;

  const renderQuestion = ({
    item,
    index,
  }: {
    item: (typeof student_answers)[0];
    index: number;
  }) => {
    const isTheory = item.question.question_type === 'theory';
    const isCorrect =
      !isTheory &&
      item.question.question_options.find(
        (opt) => String(opt.id) === String(item.selected_option_id)
      )?.is_correct;

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.cardBorder },
        ]}
      >
        <Stack gap={8}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MediumText style={{ flex: 1 }}>
              {index + 1}. {item.question.question_text}
            </MediumText>
            <Stack
              direction="row"
              alignItems="center"
              gap={4}
              style={{
                backgroundColor: isTheory
                  ? theme.background
                  : isCorrect
                    ? '#E8F5E9'
                    : '#FFEBEE',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              {!isTheory && (
                <Feather
                  name={isCorrect ? 'check-circle' : 'x-circle'}
                  size={14}
                  color={isCorrect ? 'green' : 'red'}
                />
              )}
              <NormalText
                style={{
                  color: isTheory ? theme.text : isCorrect ? 'green' : 'red',
                  fontWeight: '600',
                }}
              >
                {isTheory
                  ? `${item.question.points} pts`
                  : `${isCorrect ? item.question.points : 0}/${
                      item.question.points
                    } pts`}
              </NormalText>
            </Stack>
          </Stack>

          {isTheory ? (
            <Stack gap={5}>
              <NormalText style={{ opacity: 0.7 }}>Your Answer:</NormalText>
              <View
                style={{
                  padding: 10,
                  backgroundColor: theme.background,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                }}
              >
                <NormalText>{item.theory_answer || 'No answer'}</NormalText>
              </View>
              {item.theory_score !== null && (
                <NormalText style={{ color: 'green', marginTop: 5 }}>
                  Score: {item.theory_score} / {item.question.points}
                </NormalText>
              )}
            </Stack>
          ) : (
            <Stack gap={8} style={{ marginTop: 5 }}>
              {item.question.question_options.map((option) => {
                const isSelected =
                  String(option.id) === String(item.selected_option_id);
                const isOptionCorrect = option.is_correct;

                let borderColor = 'transparent';
                let backgroundColor = 'transparent';

                if (isSelected && isOptionCorrect) {
                  borderColor = 'green';
                  backgroundColor = '#E8F5E9';
                } else if (isSelected && !isOptionCorrect) {
                  borderColor = 'red';
                  backgroundColor = '#FFEBEE';
                } else if (isOptionCorrect) {
                  borderColor = 'green';
                  // backgroundColor = '#F1F8E9'; // Optional: highlight correct answer even if not selected
                } else {
                  borderColor = theme.cardBorder;
                }

                return (
                  <View
                    key={option.id}
                    style={[
                      styles.option,
                      {
                        borderColor,
                        backgroundColor,
                        borderWidth: isSelected || isOptionCorrect ? 1.5 : 1,
                      },
                    ]}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <NormalText style={{ flex: 1 }}>
                        {option.option_text}
                      </NormalText>
                      {isSelected && (
                        <Feather
                          name={isOptionCorrect ? 'check' : 'x'}
                          size={16}
                          color={isOptionCorrect ? 'green' : 'red'}
                        />
                      )}
                      {!isSelected && isOptionCorrect && (
                        <Feather name="check" size={16} color="green" />
                      )}
                    </Stack>
                  </View>
                );
              })}
            </Stack>
          )}
        </Stack>
      </View>
    );
  };

  return (
    <Stack flex={1} style={{ paddingHorizontal: 15 }} gap={15}>
      {/* Questions List */}
      <FlatList
        ListHeaderComponent={() => (
          <Stack gap={15}>
            <View
              style={[
                styles.summaryCard,
                { backgroundColor: theme.card, borderRadius: 12 },
              ]}
            >
              <Stack gap={15}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack>
                    <NormalText style={{ opacity: 0.9 }}>
                      Total Score
                    </NormalText>
                    <MediumText
                      style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                      }}
                    >
                      {summary.total_score}/{summary.max_possible_points}
                    </MediumText>
                  </Stack>
                  <View
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <NormalText
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {summary.percentage}%
                    </NormalText>
                  </View>
                </Stack>

                <View
                  style={{
                    height: 1,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }}
                />

                <Stack direction="row" justifyContent="space-between">
                  <Stack alignItems="center">
                    <NormalText style={{ opacity: 0.8, fontSize: 12 }}>
                      Questions
                    </NormalText>
                    <MediumText style={{ fontSize: 16 }}>
                      {summary.total_questions}
                    </MediumText>
                  </Stack>
                  <Stack alignItems="center">
                    <NormalText style={{ opacity: 0.8, fontSize: 12 }}>
                      Correct
                    </NormalText>
                    <MediumText style={{ fontSize: 16 }}>
                      {summary.correct_answers}
                    </MediumText>
                  </Stack>
                  <Stack alignItems="center">
                    <NormalText style={{ opacity: 0.8, fontSize: 12 }}>
                      Status
                    </NormalText>
                    <MediumText
                      style={{
                        fontSize: 16,
                        textTransform: 'capitalize',
                      }}
                    >
                      {assignment.status}
                    </MediumText>
                  </Stack>
                </Stack>
              </Stack>
            </View>

            {/* Teacher Comments */}
            {assignment.teacher_comments && (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <MediumText style={{ marginBottom: 5 }}>
                  Teacher&apos;s Comment
                </MediumText>
                <NormalText style={{ fontStyle: 'italic', opacity: 0.8 }}>
                  &quot;{assignment.teacher_comments}&quot;
                </NormalText>
              </View>
            )}
          </Stack>
        )}
        data={student_answers}
        renderItem={renderQuestion}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 15, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});
