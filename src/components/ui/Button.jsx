import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import colors from '@/styles/colors';


const Button = ({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    btnStyles.base,
    btnStyles[`variant_${variant}`],
    btnStyles[`size_${size}`],
    fullWidth && btnStyles.fullWidth,
    isDisabled && btnStyles.disabled,
    style,
  ];

  const textStyle = [
    btnStyles.label,
    btnStyles[`labelSize_${size}`],
    btnStyles[`labelVariant_${variant}`],
    isDisabled && btnStyles.labelDisabled,
  ];

  const spinnerColor =
    variant === 'primary' || variant === 'danger' ? '#FFFFFF' : colors.blue;

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
          style={{ marginRight: label ? 8 : 0 }}
        />
      ) : (
        icon && <View style={btnStyles.iconLeft}>{icon}</View>
      )}

      {label ? <Text style={textStyle}>{label}</Text> : null}

      {!loading && iconRight && (
        <View style={btnStyles.iconRight}>{iconRight}</View>
      )}
    </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  /* ── Base ── */
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    overflow: 'hidden',
  },

  fullWidth: {
    alignSelf: 'stretch',
  },

  disabled: {
    opacity: 0.5,
  },

  /* ── Variants ── */
  variant_primary: {
    backgroundColor: colors.blue,
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },

  variant_secondary: {
    backgroundColor: colors.blueLight,
    borderWidth: 1.5,
    borderColor: colors.blue,
  },

  variant_ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.grayBorder,
  },

  variant_danger: {
    backgroundColor: colors.red,
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },

  /* ── Sizes ── */
  size_sm: {
    height: 40,
    paddingHorizontal: 16,
  },

  size_md: {
    height: 50,
    paddingHorizontal: 20,
  },

  size_lg: {
    height: 60,
    paddingHorizontal: 24,
  },

  /* ── Labels ── */
  label: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  labelSize_sm: {
    fontSize: 14,
  },

  labelSize_md: {
    fontSize: 15,
  },

  labelSize_lg: {
    fontSize: 16,
  },

  labelVariant_primary: {
    color: '#FFFFFF',
  },

  labelVariant_secondary: {
    color: colors.blue,
  },

  labelVariant_ghost: {
    color: colors.navy,
  },

  labelVariant_danger: {
    color: '#FFFFFF',
  },

  labelDisabled: {
    opacity: 0.7,
  },

  /* ── Icons ── */
  iconLeft: {
    marginRight: 8,
  },

  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
