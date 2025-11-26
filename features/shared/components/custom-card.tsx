import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import React, { Children, ReactNode } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { Stack } from './ui/stack';

const { width } = Dimensions.get('window');

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

interface CardHeaderProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CardContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CardFooterProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style, onPress }: CardProps) => {
  const colorScheme = useColorScheme();
  const bg = Colors[colorScheme ?? 'light'].card;
  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          key: index,
        });
      }
      return child;
    });
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.card, style]}>{renderChildren()}</View>
    </TouchableOpacity>
  ) : (
    <ThemedView style={[styles.card, { backgroundColor: bg }, style]}>
      {renderChildren()}
    </ThemedView>
  );
};

export const CardHeader = ({ children, style }: CardHeaderProps) => (
  <Stack direction="row" p={0.01} style={[style]}>
    {children}
  </Stack>
);

export const CardContent = ({ children, style }: CardContentProps) => (
  <Stack direction="column" p={10} style={[styles.content, style]}>
    {children}
  </Stack>
);

export const CardFooter = ({ children, style }: CardFooterProps) => (
  <Stack direction="row" p={0.01} style={[styles.footer, style]}>
    {children}
  </Stack>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginVertical: width * 0.01,
    padding: 5,
  },

  content: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
