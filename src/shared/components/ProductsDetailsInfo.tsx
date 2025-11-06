import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Product } from '../../core/types/produtos';
// 🚨 CORREÇÃO PRINCIPAL: Trocado 'Colors' (Tipo) por 'COLORS' (Objeto de Valor)
import { COLORS } from '../../shared/constants/colors';

interface ProductDetailsInfoProps {
  product: Product & {
    category?: string;
    salePrice?: number;
    costPrice?: number;
    description?: string;
    internalCode?: string;
    barcode?: string;
    variant?: string;
  };
}

export default function ProductDetailsInfo({
  product,
}: ProductDetailsInfoProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Nome do Produto</Text>
          <Text style={styles.value}>{product.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.value}>{product.category || 'N/A'}</Text>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.section}>
            <Text style={styles.label}>Preço de Venda</Text>
            <Text style={styles.value}>
              R$ {product.salePrice?.toFixed(2).replace('.', ',') || product.price.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Preço de Custo</Text>
            <Text style={styles.value}>
              R$ {product.costPrice?.toFixed(2).replace('.', ',') || '0,00'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.value}>
            {product.description ||
              'Nenhuma descrição disponível.'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Código Interno</Text>
          <Text style={styles.value}>{product.internalCode || 'N/A'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Código de Barras</Text>
          <Text style={[styles.value, styles.barcodeText]}>
            {product.barcode || '0000000000000000000000000000000000'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cor</Text>
          <Text style={styles.value}>{product.variant || 'N/A'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barcodeText: {
    fontSize: 12,
    letterSpacing: 1,
  },
});