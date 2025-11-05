import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';

export const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  icon: Icon,
  style,
  textStyle,
  disabled = false,
}) => {
  const buttonStyle = variant === 'secondary'
    ? styles.buttonSecondary
    : variant === 'outline'
    ? styles.buttonOutline
    : styles.buttonPrimary;

  const textStyleVariant = variant === 'secondary' || variant === 'outline'
    ? styles.textSecondary
    : styles.textPrimary;

  return (
    <TouchableOpacity
      style={[buttonStyle, style, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {Icon && <Icon size={20} color={variant === 'primary' ? COLORS.white : COLORS.primary} style={styles.icon} />}
        <Text style={[textStyleVariant, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: COLORS.mediumGray,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: SPACING.sm,
  },
  textPrimary: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
  textSecondary: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
  },
});
