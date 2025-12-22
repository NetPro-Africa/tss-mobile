import { Colors } from '@/constants/Colors';
import { MediumText } from '@/features/shared/components/typography';
import * as React from 'react';
import { StyleProp, TextStyle, useColorScheme } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TitleProps {
  children: React.ReactNode;
  destructive?: boolean;
  style?: StyleProp<TextStyle>;
}

export const Title: React.FC<TitleProps> &
  React.FunctionComponent<TitleProps> = ({
  children,
  destructive,
  style = {},
  ...props
}): React.ReactNode & React.JSX.Element => {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;
  return (
    <MediumText
      style={[
        style as TextStyle,
        {
          color: destructive ? '#EF4444' : textColor,
          fontSize: RFValue(13),
        },
      ]}
      {...props}
    >
      {children}
    </MediumText>
  );
};
