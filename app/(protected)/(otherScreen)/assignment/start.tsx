import type {
  AssignmentDataType,
  QuestionDataType,
} from '@/features/assignments/types';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import { NormalButton } from '@/features/shared/components/normal-button';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Header } from '@/features/shared/components/ui/header';
import { Stack } from '@/features/shared/components/ui/stack';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import {
  useStartAssignment,
  useSubmitAssignment,
} from '@/features/student/api/use-get-assignment';
import { MCOptions } from '@/features/student/components/assignment-start/mc-options';
import { SubmitSummary } from '@/features/student/components/assignment-start/submit-summary';
import { TheoryInput } from '@/features/student/components/assignment-start/theory-input';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const StartAssignment = () => {
  const { id, student } = useLocalSearchParams<{
    id: string;
    student: string;
  }>();

  const { data, isPending, isError } = useStartAssignment({
    id,
    studentId: student,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [showSummary, setShowSummary] = useState(false);

  const { mutateAsync, isPending: isSubmitting } = useSubmitAssignment({
    id,
    studentId: student,
    answers,
    details: data?.assignment?.details ?? '',
  });

  const payload = data as AssignmentDataType;

  const questions = (payload?.questions as QuestionDataType[]) ?? [];
  const current = questions[currentIndex] ?? ({} as QuestionDataType);

  const onSelectMC = (optionId: number) => {
    setAnswers((prev) => ({ ...prev, [String(current.id)]: optionId }));
  };
  const onChangeTheory = (text: string) => {
    setAnswers((prev) => ({ ...prev, [String(current.id)]: text }));
  };
  const onPrevious = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };
  const onSubmit = async () => {
    if (!isSubmitting) {
      await mutateAsync();
    }
  };
  const onNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowSummary(true);
    }
  };
  const onEdit = (index: number) => {
    setCurrentIndex(index);
    setShowSummary(false);
  };
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <Wrapper>
      <Header title={showSummary ? 'Review Assignment' : 'Start Assignment'} />
      {isPending ? (
        <LoadingLists
          renderItem={() => <LoadingCard height={200} width={width - 30} />}
          length={2}
        />
      ) : isError ? (
        <Stack style={{ paddingHorizontal: 15 }}>
          <NormalText>Failed to get assignment</NormalText>
        </Stack>
      ) : (
        <Stack gap={12} style={{ paddingHorizontal: 15, flex: 1 }}>
          {showSummary ? (
            <SubmitSummary
              questions={questions}
              answers={answers}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              onEdit={onEdit}
            />
          ) : (
            <>
              <Stack gap={6}>
                <MediumText>{current.question_text}</MediumText>
                <NormalText style={{ opacity: 0.8 }}>
                  {payload?.setassignment?.subject?.name}
                </NormalText>
                <NormalText>
                  Question {currentIndex + 1} of {payload?.total_questions}
                </NormalText>
              </Stack>
              {current.question_type === 'multiple_choice' ? (
                <MCOptions
                  options={current.question_options}
                  selectedOptionId={Number(
                    answers[String(current.id)] as number
                  )}
                  onSelect={onSelectMC}
                />
              ) : (
                <TheoryInput
                  value={String(answers[String(current.id)] ?? '')}
                  onChange={onChangeTheory}
                />
              )}
              <Stack direction="row" justifyContent="space-between" gap={10}>
                <NormalButton buttonText="Previous" onPress={onPrevious} />
                <NormalButton
                  buttonText={isLastQuestion ? 'Review' : 'Next'}
                  onPress={onNext}
                  disabled={isSubmitting}
                />
              </Stack>
            </>
          )}
        </Stack>
      )}
    </Wrapper>
  );
};

export default StartAssignment;
