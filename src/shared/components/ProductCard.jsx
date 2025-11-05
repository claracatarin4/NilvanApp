import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';

export const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: product.imageUrl || 'https://via.placeholder.com/60' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.code} numberOfLines={1}>
          {product.code}
        </Text>
      </View>
      <Text style={styles.price}>R$ {product.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  code: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
  price: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
});
