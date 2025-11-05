import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';

export const TabButton = ({ title, active, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {title}
      </Text>
      {active && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.white,
    fontWeight: '400',
    opacity: 0.7,
  },
  tabTextActive: {
    fontWeight: '600',
    opacity: 1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FFD700',
  },
});
