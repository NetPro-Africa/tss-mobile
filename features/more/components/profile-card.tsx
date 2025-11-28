import { useGetProfile } from '@/features/profile/api/use-get-profile';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shared/components/custom-card';
import { FlexText } from '@/features/shared/components/flex-text';
import { LoadingBar } from '@/features/shared/components/loading-bar';
import { Button } from '@/features/shared/components/ui/button';
import { Stack } from '@/features/shared/components/ui/stack';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { LayoutChangeEvent, useWindowDimensions, View } from 'react-native';

export const ProfileCard = () => {
  const { data: response, isPending, error, isError } = useGetProfile();
  const { width } = useWindowDimensions();
  const [buttonWidth, setButtonWidth] = useState(width - 60);
  if (isPending) {
    return <LoadingBar />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  const {
    data: { user },
  } = response;

  const onLayoutEvent = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setButtonWidth(width);
  };
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <Stack gap={10}>
            <FlexText
              leftText="Name"
              rightText={user?.fname! + ' ' + user?.lname!}
            />
            <FlexText leftText="Email" rightText={user?.username!} />
            <FlexText leftText="Phone" rightText={user?.phone || 'N/A'} />
            <FlexText leftText="Address" rightText={user?.address!} />
          </Stack>
        </CardHeader>
        <CardFooter>
          <View style={{ marginTop: 20 }} onLayout={onLayoutEvent}>
            <Button
              _width={buttonWidth}
              title="Update profile"
              onPress={() => router.push('/update-profile')}
            />
          </View>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
