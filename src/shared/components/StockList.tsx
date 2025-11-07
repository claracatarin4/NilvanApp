import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react'; 
import { Stock } from '../../core/types/estoque';
import { COLORS } from '../../shared/constants/colors';

interface StockListProps {
  stocks: Stock[];
}

export default function StockList({ stocks }: StockListProps) {
  
  const getQuantityColor = (quantity: number): string => {
    if (quantity === 0) return COLORS.primary; 
    if (quantity <= 10) return COLORS.primary; 
    return COLORS.text;
  };

  return (
    <ScrollView style={styles.container}>
      {stocks.map((stock) => (
        <View key={stock.id} style={styles.stockItem}>
          <Text style={styles.variantName}>{stock.variant}</Text>
          <Text
            style={{
              color: getQuantityColor(stock.quantity),
              fontWeight: '600',
            }}
          >
            {stock.quantity}
          </Text>

          <Text style={{ color: stock.status === 'available' ? COLORS.white : COLORS.white }}>
            {stock.status === 'available' ? 'Em Estoque' : 'Esgotado'}
          </Text>
        </View>
      ))}
      
      {stocks.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma variação de estoque encontrada.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16, 
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  variantName: {
    color: COLORS.text,
    fontSize: 14,
    flex: 1, 
  },
});