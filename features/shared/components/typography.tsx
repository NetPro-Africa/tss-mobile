import { ThemedText } from '@/features/shared/components/ThemedText';
import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = TextProps & {
  style?: StyleProp<TextStyle>;
};

export const BoldText = ({
  children,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ThemedText style={[styles.bold, style]} {...props}>
      {children}
    </ThemedText>
  );
};

export const NormalText = ({
  children,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ThemedText style={[styles.normal, style]} {...props}>
      {children}
    </ThemedText>
  );
};

export const MediumText = ({
  children,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ThemedText style={[styles.medium, style]} {...props}>
      {children}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontSize: RFValue(15),
    fontFamily: 'PublicSansBold',
  },
  normal: {
    fontSize: RFValue(11),
    fontFamily: 'PublicSansRegular',
  },
  medium: {
    fontSize: RFValue(13),
    fontFamily: 'PublicSansMedium',
  },
});
