import { Colors } from '@/constants/Colors';
import { NormalButton } from '@/features/shared/components/normal-button';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { QuestionType } from '../types';
import { PreviewAssignment } from './preview-assignment';

type Answer = {
  numberz: number;
  yourAnswer: string;
};
type Props = {
  questions: QuestionType[];
  onSubmit: (answers: Answer[]) => void;
  totalQuestions: number;
};

export const AssignmentComponent = ({
  questions = [],
  onSubmit,
  totalQuestions,
}: Props) => {
  const colorScheme = useColorScheme();
  const questionColor = Colors[colorScheme ?? 'light'].question;
  const [preview, setPreview] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const currentQuestion = questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const handleOptionSelect = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion?.numberz]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Format answers for backend submission
      const formattedAnswers = Object.entries(selectedAnswers).map(
        ([numberz, yourAnswer]) => ({
          numberz: parseInt(numberz),
          yourAnswer: `${yourAnswer.split('n')[0]}n ${yourAnswer.split('n')[1]}`,
        })
      );
      setPreview(true);
      setAnswers(formattedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isOptionSelected = (option: string) => {
    return selectedAnswers[currentQuestion.numberz] === option;
  };

  const renderOption = (
    option: string,
    optionText: string
  ): React.ReactElement => {
    const isSelected = isOptionSelected(option);

    return (
      <Stack direction="row" alignItems="center" gap={10} key={option}>
        <CheckBox
          disabled={false}
          value={isSelected}
          onValueChange={(newValue) => handleOptionSelect(option)}
          style={{ borderColor: colors.purple }}
          onFillColor={colors.purple}
          onTintColor={colors.purple}
          onCheckColor={colors.white}
        />
        <MediumText style={styles.labelRequired}>{optionText}</MediumText>
      </Stack>
    );
  };
  const retake = () => {
    setPreview(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
  };
  const handleSubmit = () => {
    onSubmit(answers);
  };
  return (
    <View>
      {preview ? (
        <PreviewAssignment
          answers={answers}
          retake={retake}
          submit={handleSubmit}
          questions={questions}
        />
      ) : (
        <>
          <Animated.View
            key={currentQuestion?.numberz}
            entering={SlideInLeft.springify().mass(0.5).stiffness(100)}
          >
            <MediumText>{currentQuestion?.question}</MediumText>
            <NormalText
              style={[styles.questionNumber, { color: questionColor }]}
            >
              Question {currentIndex + 1} of {totalQuestions}
            </NormalText>
            <Stack gap={15} mt={10}>
              {['OptionA', 'OptionB', 'OptionC'].map((option) =>
                renderOption(
                  option,
                  currentQuestion[option as keyof QuestionType] as string
                )
              )}
            </Stack>
          </Animated.View>
          <Stack mt={20}>
            <Stack direction="row" justifyContent="space-between" gap={10}>
              <NormalButton
                buttonText="Previous"
                onPress={handlePrevious}
                disabled={isFirstQuestion}
              />

              <NormalButton
                buttonText={isLastQuestion ? 'Review' : 'Next'}
                onPress={handleNext}
              />
            </Stack>
          </Stack>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  questionNumber: {
    fontSize: RFValue(11),
    marginTop: 10,
  },
  checkboxRow: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  labelRequired: {
    fontSize: RFValue(13),
    fontFamily: 'PublicSans-Medium',
    lineHeight: 20,
  },
});
