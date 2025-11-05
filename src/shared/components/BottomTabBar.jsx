import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Package, ShoppingBag, Grid } from 'lucide-react-native';
import { COLORS, SPACING } from '../constants/colors';

export const BottomTabBar = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', icon: Home },
    { id: 'products', icon: Package },
    { id: 'shopping', icon: ShoppingBag },
    { id: 'categories', icon: Grid },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
              <Icon
                size={24}
                color={isActive ? COLORS.primary : COLORS.darkGray}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  iconContainerActive: {
    backgroundColor: COLORS.lightGray,
  },
});
