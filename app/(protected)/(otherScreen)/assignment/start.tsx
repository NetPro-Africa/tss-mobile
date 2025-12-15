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
import { TheoryInput } from '@/features/student/components/assignment-start/theory-input';
import { TimerDisplay } from '@/features/student/components/assignment-start/timer-display';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const StartAssignment = () => {
  const { id, student } = useLocalSearchParams<{
    id: string;
    student: string;
  }>();
  console.log({ id, student });

  const { data, isPending, isError } = useStartAssignment({
    id,
    studentId: student,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [details, setDetails] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mutation = useSubmitAssignment({
    id,
    studentId: student,
    answers,
    details,
  });

  const payload = data as AssignmentDataType;

  const questions = (payload?.questions as QuestionDataType[]) ?? [];
  const current = questions[currentIndex] ?? ({} as QuestionDataType);

  const endTimestamp = useMemo(() => {
    if (!payload?.start_time || !payload?.time_limit) return null;
    const start = new Date(String(payload.start_time).replace(' ', 'T'));
    return start.getTime() + Number(payload.time_limit) * 60 * 1000;
  }, [payload?.start_time, payload?.time_limit]);

  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (!endTimestamp) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = Math.max(0, Math.floor((endTimestamp - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!mutation.isPending) {
          mutation.mutate();
        }
      }
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [endTimestamp, mutation]);

  const onSelectMC = (optionId: number) => {
    setAnswers((prev) => ({ ...prev, [String(current.id)]: optionId }));
  };
  const onChangeTheory = (text: string) => {
    setAnswers((prev) => ({ ...prev, [String(current.id)]: text }));
  };
  const onPrevious = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };
  const onNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  };
  const onSubmit = () => {
    if (!mutation.isPending) {
      mutation.mutate();
    }
  };

  return (
    <Wrapper>
      <Header title="Start Assignment" />
      {isPending ? (
        <LoadingLists
          renderItem={() => <LoadingCard height={200} width={width - 30} />}
          length={4}
        />
      ) : isError ? (
        <Stack style={{ paddingHorizontal: 15 }}>
          <NormalText>Failed to get assignment</NormalText>
        </Stack>
      ) : (
        <Stack gap={12} style={{ paddingHorizontal: 15 }}>
          {endTimestamp && <TimerDisplay remainingSeconds={remaining} />}
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
              selectedOptionId={Number(answers[String(current.id)] as number)}
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
            <NormalButton buttonText="Next" onPress={onNext} />
          </Stack>
          <NormalButton buttonText="Submit" onPress={onSubmit} />
        </Stack>
      )}
    </Wrapper>
  );
};

export default StartAssignment;
