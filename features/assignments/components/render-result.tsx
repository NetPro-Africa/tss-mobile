import { Colors } from '@/constants/Colors';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shared/components/custom-card';
import { NormalButton } from '@/features/shared/components/normal-button';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Answer, QuestionType, SubmitAssignmentType } from '../types';

import { FlexText } from '@/features/shared/components/flex-text';
import { toast } from '@/features/shared/utils';
import { savePDFToDevice } from '@/features/student/utils';
import { useState } from 'react';
type RenderResultProps = {
  data: SubmitAssignmentType;
  finalAnswers: Answer[];
  questions: QuestionType[];
};
export const RenderResult = ({
  data,
  finalAnswers,
  questions,
}: RenderResultProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const questionColor = Colors[colorScheme].question;
  const formattedQuestions = questions.map((q) => ({
    'Option A': q.OptionA,
    'Option B': q.OptionB,
    'Option C': q.OptionC,
    numberz: q.numberz,
    question: q.question,
    answer: 'Option' + ' ' + q.answer,
  }));

  const [isLoading, setIsLoading] = useState(false);

  const exportViewToPDF = async () => {
    try {
      setIsLoading(true);

      // Convert image to PDF
      const htmlContent = `
           
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Result</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }

        .container {
          
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
        }

        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .header-row:last-child {
            margin-bottom: 0;
        }

        .header-label {
            font-weight: 500;
            color: #495057;
            font-size: 14px;
        }

        .header-value {
            color: #212529;
            font-size: 14px;
            font-weight: 500;
        }

        .content {
            padding: 20px;
        }

        .score-section {
            margin-bottom: 30px;
        }

        .score-title {
            color: #4285f4;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .score-value {
            font-size: 20px;
            font-weight: 600;
            color: #212529;
        }

        .question-item {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f3f4;
        }

        .question-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .question-title {
            font-size: 16px;
            font-weight: 600;
            color: #212529;
            margin-bottom: 10px;
        }

        .answer-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        .answer-row:last-child {
            margin-bottom: 0;
        }

        .status-icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            font-size: 12px;
            font-weight: bold;
            color: white;
        }

        .status-icon.correct {
            background-color: #4285f4;
        }

        .status-icon.incorrect {
            background-color: #ea4335;
        }

        .answer-text {
            font-size: 14px;
            color: #495057;
        }

        .correct-answer {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid #f1f3f4;
        }

        .correct-answer-label {
            font-size: 12px;
            color: #6c757d;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
  <div class='container'>
  <div class='header'>
   <div class='header-row'>
        <p class='header-label'>Name</p>
        <p class='header-value'>${data.studentName}</p>
      </div>
   <div class='header-row'>
        <p class='header-label'>Class</p>
        <p class='header-value'>${data.classname}</p>
      </div>
   <div class='header-row'>
        <p class='header-label'>Session</p>
        <p class='header-value'>${data.session}</p>
      </div>
   <div class='header-row'>
        <p class='header-label'>Attempted</p>
        <p class='header-value'>${data.attempted}</p>
      </div>
   <div class='header-row'>
        <p class='header-label'>Correct</p>
        <p class='header-value'>${data.correct}</p>
      </div>
   <div class='header-row'>
        <p class='header-label'>Summary</p>
        <p class='header-value'>${data.scoreSummary}</p>
      </div>
   <div class='header-row'>
        <p class='header-label'>Total questions</p>
        <p class='header-value'>${data.totalQuestions}</p>
      </div>
  </div>
  <div class='content'>
    <div class='score-section'>
      <p class='score-title'>Your score</p>
      <p class='score-value'> ${data.correct} of ${data.totalQuestions} answered correctly </p>
    </div>
    <div>
     ${formattedQuestions
       .map((item, i) => {
         const selectedAnswerData = finalAnswers.find(
           (q) => q.numberz === item.numberz
         );

         // Get the selected answer text
         const selectedAnswer = selectedAnswerData?.yourAnswer
           ? // @ts-ignore
             item[selectedAnswerData.yourAnswer]
           : null;

         // Get the correct answer text
         // @ts-ignore
         const correctAnswer = item[item.answer];

         // Check if answer is correct
         const isCorrect = selectedAnswer === correctAnswer;

         return `
      <div class='question-item'>
        <p class='question-title'>${item.numberz}. ${item.question}</p>
        <div class='answer-row'>
          <div class="status-icon ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓' : '✗'}
          </div>
          ${selectedAnswer ? `<div class="answer-text">${selectedAnswer}</div>` : '<div class="answer-text">No answer selected</div>'}
        </div>
        ${
          !isCorrect && correctAnswer
            ? `
                <div class="correct-answer">
                  <div class="correct-answer-label">Correct answer:</div>
                  <div class="answer-row">
                    <div class="status-icon correct">✓</div>
                    <div class="answer-text">${correctAnswer}</div>
                  </div>
                </div>
              `
            : ''
        }
      </div>
    `;
       })
       .join('')}
    </div>
  </div>
      

  </div>
</body>
</html>
            `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
        width: 612,
        height: 792,
      });

      await savePDFToDevice(uri, `assignment.pdf`);
      toast('Downloaded successfully', 'success');
    } catch (error) {
      console.error('Error exporting view to PDF:', error);
      Alert.alert('Error', 'Failed to export view as PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View>
        <Card>
          <CardContent>
            <CardHeader style={{ flexDirection: 'column', gap: 10 }}>
              <FlexText leftText={'Name'} rightText={data.studentName} />
              <FlexText leftText={'Class'} rightText={data.classname} />
              <FlexText leftText={'Session'} rightText={data.session} />
              <FlexText leftText={'Attempted'} rightText={data.attempted} />
              <FlexText leftText={'Correct'} rightText={data.correct} />
              <FlexText leftText={'Summary'} rightText={data.scoreSummary} />
              <FlexText
                leftText={'Total questions'}
                rightText={data.totalQuestions}
              />
            </CardHeader>
          </CardContent>
        </Card>

        <FlatList
          ListHeaderComponent={() => (
            <>
              <NormalText
                style={[styles.questionNumber, { color: questionColor }]}
              >
                Your score
              </NormalText>
              <MediumText style={{ fontSize: RFValue(15) }}>
                {data.correct} of {data.totalQuestions} answered correctly
              </MediumText>
            </>
          )}
          data={formattedQuestions}
          renderItem={({ item }) => {
            const selectedAnswerIndex = finalAnswers.findIndex(
              (q) => q.numberz === item.numberz
            );
            const selectedAnswer =
              finalAnswers[selectedAnswerIndex]?.yourAnswer === 'Option A'
                ? item['Option A']
                : finalAnswers[selectedAnswerIndex]?.yourAnswer === 'Option B'
                  ? item['Option B']
                  : item['Option C'];

            const itemAnswer = item[item.answer as keyof typeof item];
            return (
              <ResultCard
                item={item}
                isCorrect={selectedAnswer === itemAnswer}
                selectedAnswer={selectedAnswer}
                correctAnswer={itemAnswer as string}
              />
            );
          }}
          contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => item.numberz.toString() + i.toString()}
          scrollEnabled={false}
        />
      </View>
      <Stack mt={20} gap={5}>
        <NormalButton
          buttonText={'Download'}
          onPress={exportViewToPDF}
          disabled={isLoading}
        />
      </Stack>
    </>
  );
};
type ResultProps = {
  item: {
    'Option A': string;
    'Option B': string;
    'Option C': string;
    numberz: number;
    question: string;
    answer: string;
  };
  isCorrect: boolean;
  selectedAnswer?: string;
  correctAnswer?: string;
};

const ResultCard = ({
  item,
  isCorrect,
  selectedAnswer,
  correctAnswer,
}: ResultProps) => {
  const backgroundColor = isCorrect ? colors.purple : colors.red;
  return (
    <Card>
      <CardContent>
        <CardHeader
          style={{ flexDirection: 'column', gap: 5, marginBottom: 10 }}
        >
          <MediumText style={styles.questionNumber}>
            {item.numberz}. {item.question}
          </MediumText>
          <Stack direction="row" gap={5} alignItems="center">
            <View style={[styles.circle, { backgroundColor }]}>
              <Feather
                name={isCorrect ? 'check' : 'x'}
                color={'white'}
                size={20}
              />
            </View>
            {selectedAnswer && <NormalText>{selectedAnswer}</NormalText>}
          </Stack>
        </CardHeader>
        {!isCorrect && (
          <CardFooter
            style={{
              borderTopWidth: isCorrect ? 0 : 1,
              paddingVertical: 10,
              flexDirection: 'column',
            }}
          >
            <NormalText style={{ opacity: 0.8, fontSize: RFValue(11) }}>
              Correct answer:
            </NormalText>
            <Stack direction="row" gap={5} alignItems="center">
              <View style={styles.circle}>
                <Feather name="check" color={colors.white} size={20} />
              </View>
              <NormalText>{correctAnswer}</NormalText>
            </Stack>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  questionNumber: {
    fontSize: RFValue(14),
    marginTop: 10,
  },
  circle: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
    borderRadius: 30,
  },
});
