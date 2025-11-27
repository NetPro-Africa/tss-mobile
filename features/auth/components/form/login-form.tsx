import { NormalText } from '@/features/shared/components/typography';
import { Button } from '@/features/shared/components/ui/button';
import { Stack } from '@/features/shared/components/ui/stack';
import { colors } from '@/features/shared/constants';
import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLogin } from '../../api/use-login';
import { CustomInput } from './input';
import { loginSchema } from './validator';

export const LoginForm = () => {
  const [secure, setSecure] = useState<boolean>(true);
  const toggleSecure = () => setSecure(!secure);
  const { mutateAsync } = useLogin();
  const {
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    control,
  } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      password: '',
      email: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await mutateAsync(values, {
      onSuccess: () => {
        router.push(
          `/verify-login-otp?email=${values.email}&password=${values.password}`
        );
        reset();
      },
    });
  };
  return (
    <Stack mt={20} gap={15}>
      <CustomInput
        control={control}
        errors={errors}
        name="email"
        placeholder="Johndoe@gmail.com"
        label="Email"
        type="email-address"
        leftIcon={
          <Feather name="mail" color={colors.placeholderGrey} size={20} />
        }
      />
      <CustomInput
        control={control}
        errors={errors}
        name="password"
        placeholder="********"
        label="Password"
        password
        secureTextEntry={secure}
        toggleSecure={toggleSecure}
        autoCapitalize="none"
        leftIcon={
          <Feather name="lock" color={colors.placeholderGrey} size={20} />
        }
      />
      <Link asChild href={'/forgot'}>
        <NormalText style={{ color: colors.purple, alignSelf: 'flex-end' }}>
          Forgot password
        </NormalText>
      </Link>
      <Button
        title={'Login'}
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
      />
    </Stack>
  );
};
