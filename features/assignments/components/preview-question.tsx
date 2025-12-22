import { CardHeader } from '@/components/card';
import { Colors } from '@/constants/Colors';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/features/shared/components/custom-card';
import { MediumText } from '@/features/shared/components/typography';
import { Stack } from '@/features/shared/components/ui/stack';
import { StyleSheet, useColorScheme } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Answer, QuestionType } from '../types';

type Props = {
  item: QuestionType;
  answers: Answer[];
};
export const PreviewQuestion = ({ item, answers }: Props) => {
  const isOptionSelected = (option: string) => {
    const selectedIndex = answers.findIndex(
      (answer) => answer.numberz === item.numberz
    );
    const formattedOption = option.split('n')[0] + 'n ' + option.split('n')[1];
    return answers[selectedIndex]?.yourAnswer === formattedOption;
  };
  const colorScheme = useColorScheme();
  const purpleColor = Colors[colorScheme ?? 'light'].question;
  const darkColor = Colors[colorScheme ?? 'light'].tabIconDefault;
  const renderOption = (
    option: string,
    optionText: string
  ): React.ReactElement => {
    const isSelected = isOptionSelected(option);

    return (
      <MediumText
        style={[
          styles.labelRequired,
          {
            color: isSelected ? purpleColor : darkColor,
            fontFamily: isSelected ? 'PublicSansBold' : 'PublicSansRegular',
          },
        ]}
        key={option}
      >
        {optionText}
      </MediumText>
    );
  };
  return (
    <Card>
      <CardContent>
        <CardHeader style={{ backgroundColor: 'transparent' }}>
          <MediumText>{item.question}</MediumText>
        </CardHeader>
        <CardFooter>
          <Stack gap={15} mt={10}>
            {['OptionA', 'OptionB', 'OptionC'].map((option) =>
              renderOption(option, item[option as keyof QuestionType] as string)
            )}
          </Stack>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  labelRequired: {
    fontSize: RFValue(13),
    fontFamily: 'PublicSans-Medium',
    lineHeight: 20,
  },
});
