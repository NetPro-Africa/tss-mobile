import { Colors } from '@/constants/Colors';
import { Stack } from '@/features/shared/components/ui/stack';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type Props = {
  value?: string;
  onChange: (text: string) => void;
  disabled?: boolean;
};

export const TheoryInput = ({ value, onChange, disabled }: Props) => {
  const colorScheme = useColorScheme();
  const border = Colors[colorScheme ?? 'light'].tabIconDefault;
  const textColor = Colors[colorScheme ?? 'light'].text;
  return (
    <Stack mt={10}>
      <TextInput
        editable={!disabled}
        value={value}
        onChangeText={onChange}
        placeholder="Type your answer..."
        placeholderTextColor={border}
        style={[styles.textarea, { color: textColor, borderColor: border }]}
        multiline
        numberOfLines={6}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 120,
  },
});

