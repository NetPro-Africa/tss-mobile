import { Colors } from '@/constants/Colors';
import type {
  AssignmentDataType,
  QuestionDataType,
  QuestionOptionType,
} from '@/features/assignments/types';
import { NormalButton } from '@/features/shared/components/normal-button';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { changeFirstLetterToCapital } from '@/features/shared/utils';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import CheckBox from '@react-native-community/checkbox';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = {
  data: AssignmentDataType;
  autoStart?: boolean;
};

export const TakeAssignment = ({ data, autoStart = false }: Props) => {
  const colorScheme = useColorScheme();
  const questionColor = Colors[colorScheme ?? 'light'].question;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [started, setStarted] = useState(autoStart);
  const questions = useMemo<QuestionDataType[]>(
    () => data.questions ?? [],
    [data.questions]
  );
  const current = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const onSelect = (option: QuestionOptionType) => {
    setSelected((prev) => ({ ...prev, [current.id]: option.id }));
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };
  const handlePrevious = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  };

  const isOptionSelected = (optionId: number) =>
    selected[current?.id] === optionId;

  if (!current) {
    return (
      <Stack>
        <NormalText>No questions found</NormalText>
      </Stack>
    );
  }

  return (
    <View>
      <Stack gap={8} mb={10}>
        <MediumText style={styles.title}>
          {changeFirstLetterToCapital(data.setassignment.title)}
        </MediumText>
        <NormalText style={{ opacity: 0.8 }}>
          {changeFirstLetterToCapital(data.setassignment.subject.name)}
        </NormalText>
      </Stack>

      <Animated.View
        key={current?.id}
        entering={SlideInLeft.springify().mass(0.5).stiffness(100)}
      >
        <MediumText>
          {changeFirstLetterToCapital(current?.question_text)}
        </MediumText>
        <NormalText style={[styles.questionNumber, { color: questionColor }]}>
          Question {currentIndex + 1} of {data.total_questions}
        </NormalText>
        <Stack gap={15} mt={10}>
          {current.question_options
            .sort((a, b) => a.order_number - b.order_number)
            .map((opt) => {
              const checked = isOptionSelected(opt.id);
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={10}
                  key={opt.id}
                >
                  <CheckBox
                    disabled={!started}
                    value={checked}
                    onValueChange={() => onSelect(opt)}
                    style={{ borderColor: colors.purple }}
                    onFillColor={colors.purple}
                    onTintColor={colors.purple}
                    onCheckColor={colors.white}
                  />
                  <MediumText style={styles.labelRequired}>
                    {opt.option_text}
                  </MediumText>
                </Stack>
              );
            })}
        </Stack>
      </Animated.View>

      {started ? (
        <Stack direction="row" justifyContent="space-between" gap={10}>
          <NormalButton
            buttonText="Previous"
            onPress={handlePrevious}
            disabled={isFirst}
          />
          <NormalButton
            buttonText={isLast ? 'Finish' : 'Next'}
            onPress={handleNext}
          />
        </Stack>
      ) : (
        <NormalButton
          buttonText="Start"
          onPress={() => setStarted(true)}
          textStyle={{ color: colors.purple }}
          style={{ backgroundColor: colors.purple }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(16),
  },
  questionNumber: {
    fontSize: RFValue(11),
    marginTop: 10,
  },
  labelRequired: {
    fontSize: RFValue(13),
    fontFamily: 'PublicSans-Medium',
    lineHeight: 20,
  },
});
