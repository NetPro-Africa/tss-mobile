import { FlexText } from '@/features/shared/components/flex-text';
import { LoadingModal } from '@/features/shared/components/modal/loading-modal';
import { Header } from '@/features/shared/components/ui/header';
import { useStudent } from '@/features/student/store/useStudent';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSubmitAssignment } from '../api/use-submit-assignment';
import { Answer, AssignmentType, QuestionType } from '../types';
import { AssignmentComponent } from './assignmentComponent';
import { RenderResult } from './render-result';

type Props = {
  data: AssignmentType;
};

export const RenderAssignments = ({ data }: Props) => {
  const { data: responseData, mutateAsync, isPending } = useSubmitAssignment();
  const { date1, date2 } = useLocalSearchParams<{
    date1: string;
    date2: string;
  }>();
  const [showResult, setShowResult] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState<Answer[]>([]);
  const [questions] = useState<QuestionType[]>(data?.questions);

  const student = useStudent((state) => state.student);

  const handleSubmit = async (answers: Answer[]) => {
    setFinalAnswers(answers);
    await mutateAsync(
      {
        answers,
        regnum: student?.regnum as string,
        testid: data?.testid,
      },
      {
        onSuccess: () => {
          setShowResult(true);
        },
      }
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 20 }}
    >
      <LoadingModal visible={isPending} />
      <Header title={data?.subjectName} />
      <FlexText leftText="Date given" rightText={date1} />
      <FlexText leftText="Date to submit" rightText={date2} />
      {showResult ? (
        <RenderResult
          data={responseData?.data!}
          finalAnswers={finalAnswers}
          questions={questions}
        />
      ) : (
        <AssignmentComponent
          onSubmit={handleSubmit}
          questions={data?.questions}
          totalQuestions={data?.totalQuestions}
        />
      )}
    </ScrollView>
  );
};
