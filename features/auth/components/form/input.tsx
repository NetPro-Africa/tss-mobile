import { Colors } from '@/constants/Colors';
import { NormalText } from '@/features/shared/components/typography';
import { colors } from '@/features/shared/constants';
import { Feather } from '@expo/vector-icons';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

type Props = TextInputProps & {
  label: string;
  placeholder: string;
  password?: boolean;
  toggleSecure?: () => void;
  secureTextEntry?: boolean;
  name: string;
  errors: FieldErrors<any>;
  control: Control<any>;
  type?: KeyboardTypeOptions;
  onEditFinish?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
};
export const CustomInput = ({
  label,
  placeholder,
  password,
  toggleSecure,
  secureTextEntry,
  errors,
  name,
  control,
  type = 'default',
  onEditFinish,
  containerStyle,
  leftIcon,
  ...rest
}: Props) => {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const onPress = () => {
    if (toggleSecure) {
      toggleSecure();
    }
  };
  const onEndEditing = () => {
    onEditFinish && onEditFinish();
  };
  return (
    <View style={{ gap: 10 }}>
      <NormalText style={{ fontFamily: 'NunitoBold' }}>{label}</NormalText>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.inputContainer, containerStyle]}>
          {leftIcon && <View style={{ marginRight: 5 }}>{leftIcon}</View>}
          <Controller
            control={control}
            render={({ field: { onBlur, value, onChange } }) => (
              <TextInput
                placeholder={placeholder}
                style={[
                  {
                    flex: 1,
                    fontFamily: 'NunitoRegular',
                    fontSize: 15,
                    color: textColor,
                  },
                  rest.style,
                ]}
                placeholderTextColor={colors.placeholderGrey}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                keyboardType={type}
                autoCapitalize="none"
                onEndEditing={onEndEditing}
                {...rest}
              />
            )}
            name={name}
          />
          {password && (
            <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
              <Feather
                name={secureTextEntry ? 'eye' : 'eye-off'}
                size={25}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
      {errors[name] && (
        // @ts-ignore
        <Text style={styles.error}>{errors?.[name]?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    padding: 5,
    height: 55,
  },
  error: {
    fontSize: 15,
    fontFamily: 'NunitoBold',
    color: 'red',
  },
});
