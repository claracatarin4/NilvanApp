import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ProductCard } from '../../shared/components/ProductCard';
import { BottomTabBar } from '../../shared/components/BottomTabBar';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';
import { MAIN_TABS } from '../enums/tabEnums';

export const ProductListScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [activeMainTab, setActiveMainTab] = useState(MAIN_TABS.PRODUTOS);
  const [searchQuery, setSearchQuery] = useState('');

  const mockProducts = [
    {
      id: 1,
      name: 'Bolsa Térmica Cooler - 14,5 Litros',
      code: 'COD NHERNFUR-3KL1',
      price: '165,00',
      imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 2,
      name: 'Bolsa Térmica Cooler - 14,5 Litros',
      code: 'COD NHERNFUR-3KL1',
      price: '165,00',
      imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 3,
      name: 'Bolsa Térmica Cooler - 14,5 Litros',
      code: 'COD NHERNFUR-3KL1',
      price: '165,00',
      imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const handleProductPress = (product) => {
    navigation.navigate('AddProduct', { product });
  };

  return (
    <View style={styles.container}>
      <Header
        showProfile
        userName="Ivan Santana Jr."
        userRole="Diretor"
        userImage="https://via.placeholder.com/40"
        rightIcon={Bell}
        onRightIconPress={() => console.log('Notificações')}
      />

      <View style={styles.tabsContainer}>
        <TabButton
          title={MAIN_TABS.PRODUTOS}
          active={activeMainTab === MAIN_TABS.PRODUTOS}
          onPress={() => setActiveMainTab(MAIN_TABS.PRODUTOS)}
        />
        <TabButton
          title={MAIN_TABS.ESTOQUE}
          active={activeMainTab === MAIN_TABS.ESTOQUE}
          onPress={() => setActiveMainTab(MAIN_TABS.ESTOQUE)}
        />
        <TabButton
          title={MAIN_TABS.CATEGORIAS}
          active={activeMainTab === MAIN_TABS.CATEGORIAS}
          onPress={() => setActiveMainTab(MAIN_TABS.CATEGORIAS)}
        />
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Produto, lote ou Código"
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={mockProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  listContent: {
    paddingBottom: SPACING.md,
  },
});
