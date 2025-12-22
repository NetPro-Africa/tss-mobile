import { Text, useColorScheme } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { Colors } from '@/constants/Colors';
import { NormalText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { Entypo } from '@expo/vector-icons';
import { useStudent } from '../store/useStudent';
import { StudentType } from '../types';

type Props = {
  students: StudentType[];
};
export const StudentMenu = ({ students }: Props) => {
  const student = useStudent((state) => state.student);
  const getStudent = useStudent((state) => state.getStudent);
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Stack direction="row" gap={5} alignItems="center">
          <NormalText>{student?.name ?? 'No students'}</NormalText>
          <Entypo name="chevron-small-down" size={20} color={iconColor} />
        </Stack>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {students?.map((item) => (
            <DropdownMenu.Item
              key={item.id.toString()}
              textValue={item.name}
              onSelect={() => getStudent(item)}
            >
              <DropdownMenu.ItemTitle>
                <Text style={{ fontFamily: 'Inter' }}>{item.name}</Text>
              </DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>

        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
