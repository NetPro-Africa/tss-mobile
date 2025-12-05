import React from 'react';
import { View } from 'react-native';
import { MediumText } from './typography';

type Props = {
  message: string;
};

export const EmptyUi = (props: Props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
      }}
    >
      <MediumText>{props.message}</MediumText>
    </View>
  );
};
