import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import { Header } from '../../shared/components/Header';
import { BottomTabBar } from '../../shared/components/BottomTabBar';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';

export const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleAddProduct = () => {
    navigation.navigate('ProductList');
  };

  const stats = [
    { label: 'Produtos', value: '4.000.000' },
    { label: 'Vendas', value: '50.000' },
    { label: 'Lucro', value: 'R$ 1000000' },
  ];

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomSection}>
        <CustomButton
          title="Adicionar Produto"
          onPress={handleAddProduct}
          icon={(props) => <Text style={styles.plusIcon}>+</Text>}
          style={styles.addButton}
        />
        <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  statCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  bottomSection: {
    backgroundColor: COLORS.white,
  },
  addButton: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
  },
  plusIcon: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: SPACING.xs,
  },
});
