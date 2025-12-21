import { AuthTitle } from '@/features/auth/components/auth-title';
import { AppleOTPInput } from '@/features/auth/components/form/otp';
import { LoadingModal } from '@/features/shared/components/modal/loading-modal';
import { Spacer } from '@/features/shared/components/spacer';
import {
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { CustomPressable } from '@/features/shared/components/ui/custom-pressable';
import { Header } from '@/features/shared/components/ui/header';
import { Stack } from '@/features/shared/components/ui/stack';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { useTimer } from '@/features/shared/hooks/use-timer';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useLogin } from '../api/use-login';
import { useVerifyLoginOtp } from '../api/use-verify-otp';

export const VerifyLoginOTP = () => {
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();

  const { mutateAsync, isPending } = useLogin();
  const { mutateAsync: verifyToken, isPending: isVerifying } =
    useVerifyLoginOtp();
  const onComplete = async (code: string) => {
    await verifyToken({ email, otp: code });
  };

  const { timeLeft, startTimer } = useTimer();
  const resend = () => {
    mutateAsync(
      { email, password },
      {
        onSuccess: () => {
          startTimer();
        },
      }
    );
  };

  const disabled = isPending || timeLeft > 0;
  const buttonText = isPending
    ? 'Resending...'
    : timeLeft > 0
      ? `Wait ${timeLeft}s`
      : 'Resend';
  return (
    <Wrapper>
      <LoadingModal visible={isVerifying} />
      <Header />
      <Spacer size={10} />
      <AuthTitle
        title={'Enter code'}
        subTitle={`We have sent code to ${email}`}
      />
      <Stack mt={30} gap={20}>
        <AppleOTPInput onComplete={onComplete} maxLength={6} />
        <Stack>
          <NormalText style={{ lineHeight: 20 }}>
            Didn&apos;t receive code?
          </NormalText>
          <CustomPressable onPress={resend} disabled={disabled}>
            <MediumText
              style={{
                fontSize: RFValue(10),
                // color: colors.purple,
                opacity: disabled ? 0.5 : 1,
              }}
            >
              {buttonText}
            </MediumText>
          </CustomPressable>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
