import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';
import { ArrowLeft, Bell } from 'lucide-react-native';

export const Header = ({
  title,
  showBack = false,
  onBackPress,
  showProfile = false,
  userName,
  userRole,
  userImage,
  rightIcon: RightIcon,
  onRightIconPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
        ) : showProfile ? (
          <TouchableOpacity style={styles.profileSection}>
            <Image
              source={{ uri: userImage || 'https://via.placeholder.com/40' }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userRole}>{userRole}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {RightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightButton}>
          <RightIcon size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: 48,
    paddingBottom: SPACING.md,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: '600',
    color: COLORS.white,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.white,
  },
  userRole: {
    fontSize: FONT_SIZES.small,
    color: COLORS.white,
    opacity: 0.8,
  },
  rightButton: {
    padding: SPACING.xs,
  },
});
