import { Colors } from '@/constants/Colors';
import { constantStyles } from '@/features/shared/constants';
import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle, useColorScheme } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export const Wrapper = ({ children, style }: PropsWithChildren<Props>) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].wrapper;
  return (
    <View style={[constantStyles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );
};

export const ResponsiveWrapper = ({ children }: PropsWithChildren) => {
  return <View className="flex-1 max-w-5xl mx-auto">{children}</View>;
};
