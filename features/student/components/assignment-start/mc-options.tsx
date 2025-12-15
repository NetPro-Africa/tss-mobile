import { colors } from '@/features/shared/constants';
import { MediumText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import type { QuestionOptionType } from '@/features/assignments/types';

type Props = {
  options: QuestionOptionType[];
  selectedOptionId?: number;
  onSelect: (optionId: number) => void;
  disabled?: boolean;
};

export const MCOptions = ({ options, selectedOptionId, onSelect, disabled }: Props) => {
  return (
    <Stack gap={15} mt={10}>
      {options
        .sort((a, b) => a.order_number - b.order_number)
        .map((opt) => (
          <Stack direction="row" alignItems="center" gap={10} key={opt.id}>
            <CheckBox
              disabled={!!disabled}
              value={selectedOptionId === opt.id}
              onValueChange={() => onSelect(opt.id)}
              style={{ borderColor: colors.purple }}
              onFillColor={colors.purple}
              onTintColor={colors.purple}
              onCheckColor={colors.white}
            />
            <MediumText>{opt.option_text}</MediumText>
          </Stack>
        ))}
    </Stack>
  );
};

