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
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError, style]}>
        {iconName && (
          <MaterialIcons name={iconName as any} size={20} style={styles.icon} />
        )}
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor="#999"
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.label,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.label,
  },
  icon: {
    marginRight: 10,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    marginTop: 5,
    color: colors.error,
    fontSize: 12,
  },
});

export default forwardRef(Input);
