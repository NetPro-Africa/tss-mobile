import { MediumText } from '@/features/shared/components/typography';
import { Button } from '@/features/shared/components/ui/button';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { useAuth } from '@/features/shared/store/use-auth';
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
  const { user } = useAuth();
  console.log(user);

  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
      >
        {/* <FetchStudent />
        <AssignmentsCarousel />
        <FetchAttendance />
        <FetchEvents horizontal /> */}
      </ScrollView>
    </Wrapper>
  );
}
