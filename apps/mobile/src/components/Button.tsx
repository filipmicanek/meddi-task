import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { atoms as a } from '../theme/atoms';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        a.py_sm,
        a.px_lg,
        a.rounded_full,
        a.align_center,
        a.justify_center,
        { backgroundColor: colors.primary },
        style,
      ]}
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.secondary} />
      ) : (
        <Text style={[a.text_md, a.font_bold, { color: colors.secondary }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
