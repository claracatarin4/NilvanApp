import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';

export const CustomInput = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {Icon && <Icon size={20} color={COLORS.darkGray} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    paddingVertical: SPACING.xs,
  },
});
