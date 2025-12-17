import { FetchEvents } from '@/features/events/components/fetch-events';
import { MediumText } from '@/features/shared/components/typography';
import { Button } from '@/features/shared/components/ui/button';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { AssignmentsCarousel } from '@/features/student/components/assignment-carousel';
import { FetchAttendance } from '@/features/student/components/fetch-attendance';
import { FetchStudent } from '@/features/student/components/fetch-student';
import { ErrorBoundaryProps } from 'expo-router';
import { ScrollView } from 'react-native';
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <Wrapper
      style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}
    >
      <MediumText>{error.message}</MediumText>
      <Button title="Retry" onPress={retry} height={50} />
    </Wrapper>
  );
}
export default function HomeScreen() {
  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingBottom: 100 }}
      >
        <FetchStudent />
        {/* <Button
          title="Save PDF"
          onPress={() =>
            savePDFToDevice(
              'https://pdfobject.com/pdf/sample.pdf',
              'example.pdf'
            )
          }
          height={50}
        /> */}
        <AssignmentsCarousel />
        <FetchAttendance />
        <FetchEvents horizontal />
      </ScrollView>
    </Wrapper>
  );
}
