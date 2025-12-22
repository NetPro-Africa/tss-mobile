import { Text, useColorScheme } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { Colors } from '@/constants/Colors';
import { NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = {
  data: string[];
  onSelect: (value: string) => void;
  value: string;
  flex?: number;
};
export const CustomSelect = ({ data, onSelect, value, flex = 1 }: Props) => {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }}
      >
        <Stack direction="row" gap={5} alignItems="center" width={'100%'}>
          <NormalText style={{ flex }}>{value ?? 'Select a value'}</NormalText>
          <Entypo name="chevron-small-down" size={20} color={iconColor} />
        </Stack>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {data?.map((item) => (
            <DropdownMenu.Item
              key={item}
              textValue={item}
              onSelect={() => onSelect(item)}
            >
              <DropdownMenu.ItemTitle>
                <Text style={{ fontFamily: 'Inter', fontSize: RFValue(11) }}>
                  {item}
                </Text>
              </DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>

        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
