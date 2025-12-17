import type { QuestionDataType } from '@/features/assignments/types';
import { Colors } from '@/constants/Colors';
import { MediumText, NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { NormalButton } from '@/features/shared/components/normal-button';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

type Props = {
  questions: QuestionDataType[];
  answers: Record<string, number | string>;
  onSubmit: () => void;
  isSubmitting: boolean;
  onEdit: (index: number) => void;
};

export const SubmitSummary = ({
  questions,
  answers,
  onSubmit,
  isSubmitting,
  onEdit,
}: Props) => {
  const colorScheme = useColorScheme();
  const cardBg = Colors[colorScheme ?? 'light'].card;

  const renderItem = ({ item, index }: { item: QuestionDataType; index: number }) => {
    const answer = answers[String(item.id)];
    let displayAnswer: string;

    if (item.question_type === 'multiple_choice') {
      const selectedOption = item.question_options.find((opt) => opt.id === answer);
      displayAnswer = selectedOption ? selectedOption.option_text : 'Not Answered';
    } else {
      displayAnswer = answer ? String(answer) : 'Not Answered';
    }

    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Stack gap={6}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <MediumText>Question {index + 1}</MediumText>
            <NormalButton
              buttonText="Edit"
              onPress={() => onEdit(index)}
              style={{ paddingVertical: 4, paddingHorizontal: 10, minWidth: 60 }}
              textStyle={{ fontSize: 12 }}
            />
          </Stack>
          <NormalText style={{ opacity: 0.8 }} numberOfLines={2}>
            {item.question_text}
          </NormalText>
          <Stack
            style={{
              marginTop: 4,
              padding: 8,
              backgroundColor: 'rgba(0,0,0,0.03)',
              borderRadius: 6,
            }}
          >
            <NormalText style={{ fontSize: 13, fontWeight: '600', opacity: 0.6 }}>
              Your Answer:
            </NormalText>
            <NormalText style={{ fontSize: 14 }}>{displayAnswer}</NormalText>
          </Stack>
        </Stack>
      </View>
    );
  };

  return (
    <Stack gap={15} flex={1}>
      <MediumText style={{ fontSize: 18 }}>Summary</MediumText>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <NormalButton
        buttonText={isSubmitting ? 'Submitting...' : 'Submit Assignment'}
        onPress={onSubmit}
        disabled={isSubmitting}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
});
