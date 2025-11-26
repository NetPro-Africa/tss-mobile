import { ExpandableButton } from '@/features/shared/components/button/ExpandableButton';
import { colors } from '@/features/shared/constants';
import { useWindowDimensions } from 'react-native';

type Props = {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
  disabled?: boolean;
  w?: number;
  height?: number;
  _width?: number;
};

export const Button = ({
  title,
  isLoading = false,
  onPress,
  disabled,
  w = 30,
  height = 55,
  _width,
}: Props) => {
  const { width } = useWindowDimensions();
  const _widthValue = _width || width; // Default to full width minus padding if _width is not provided
  return (
    <ExpandableButton
      disabled={disabled}
      title={title}
      borderRadius={5}
      // width={_widthValue - w}
      height={height}
      isLoading={isLoading}
      onPress={onPress}
      style={{ backgroundColor: colors.purple, opacity: disabled ? 0.5 : 1 }}
    />
  );
};
