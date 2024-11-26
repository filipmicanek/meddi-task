import React, { ForwardedRef, forwardRef } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors'; // Import an icon library
import { atoms as a } from '../theme/atoms';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  iconName?: string;
}

const Input = (
  { label, error, style, iconName, ...props }: AppTextInputProps,
  ref: ForwardedRef<TextInput>,
) => {
  return (
    <View style={[a.w_full, a.my_sm]}>
      {label && (
        <Text style={[a.text_sm, a.mb_xs, { color: colors.label }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          a.flex_row,
          a.align_center,
          a.rounded_full,
          a.px_lg,
          styles.inputContainer,
          error && styles.inputError,
          style,
        ]}
      >
        {iconName && (
          <MaterialIcons name={iconName as any} size={20} style={[a.mr_sm]} />
        )}
        <TextInput
          ref={ref}
          style={[a.flex_1, a.text_md, { color: colors.label }, style]}
          placeholderTextColor="#999"
          {...props}
        />
      </View>
      {error && (
        <Text style={[a.text_xs, a.mt_xs, styles.errorText]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
  },
});

export default forwardRef(Input);
