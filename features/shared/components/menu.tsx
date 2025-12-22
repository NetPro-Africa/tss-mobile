import { Text, useColorScheme } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { Colors } from '@/constants/Colors';
import { NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { Entypo } from '@expo/vector-icons';

type DataType = {
  label: string;
  value: string;
};
type Props = {
  data: DataType[];
  onSelect: (value: string) => void;
  selectedValue?: string;
};

export const Menu = ({ data, onSelect, selectedValue }: Props) => {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Stack
          direction="row"
          gap={5}
          alignItems="center"
          borderWidth={1}
          borderColor={Colors[colorScheme ?? 'light'].text}
          style={{ borderRadius: 5 }}
          p={5}
        >
          <NormalText>
            {selectedValue
              ? data?.find((item) => item.value === selectedValue)?.label
              : data?.[0]?.label}
          </NormalText>
          <Entypo name="chevron-small-down" size={20} color={iconColor} />
        </Stack>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {data?.map((item) => (
            <DropdownMenu.Item
              key={item.value}
              textValue={item.label}
              onSelect={() => onSelect(item.value)}
            >
              <DropdownMenu.ItemTitle>
                <Text style={{ fontFamily: 'Inter' }}>{item.label}</Text>
              </DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>

        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
