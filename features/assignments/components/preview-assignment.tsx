import { Colors } from '@/constants/Colors';
import { NormalButton } from '@/features/shared/components/normal-button';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { FlatList, StyleSheet, useColorScheme } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Answer, QuestionType } from '../types';
import { PreviewQuestion } from './preview-question';

type Props = {
  retake: () => void;
  submit: () => void;
  questions: QuestionType[];
  answers: Answer[];
};
export const PreviewAssignment = ({
  retake,
  submit,
  questions,
  answers,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const questionColor = Colors[colorScheme].question;
  const answered = answers.length;
  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <NormalText style={[styles.questionNumber, { color: questionColor }]}>
            Answered {answered} of {questions.length}
          </NormalText>
          <MediumText style={{ fontSize: RFValue(15) }}>
            Review Assignment before submission
          </MediumText>
        </>
      )}
      data={questions}
      renderItem={({ item }) => (
        <PreviewQuestion item={item} answers={answers} />
      )}
      contentContainerStyle={{ gap: 15, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => (
        <Stack mt={20} gap={5}>
          <NormalButton buttonText={'Submit'} onPress={submit} />
          <NormalButton
            buttonText="Retake Assignment"
            style={{ backgroundColor: 'transparent' }}
            textStyle={{ color: questionColor }}
            onPress={retake}
          />
        </Stack>
      )}
      keyExtractor={(item, i) => item.numberz.toString() + i.toString()}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  questionNumber: {
    fontSize: RFValue(11),
    marginTop: 10,
  },
});
