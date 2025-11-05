import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ScanBarcode } from 'lucide-react-native';
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ImagePicker } from '../../shared/components/ImagePicker';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';
import { TAB_TYPES } from '../enums/tabEnums';

export const AddProductScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState(TAB_TYPES.PRODUTO);
  const [productData, setProductData] = useState({
    image: null,
    name: '',
    category: '',
    sellingPrice: '',
    costPrice: '',
    internalCode: '',
    barcode: '',
    description: '',
  });

  const handleSave = () => {
    console.log('Salvar produto:', productData);
    navigation.goBack();
  };

  const handleImagePick = () => {
    console.log('Selecionar imagem');
  };

  const handleBarcodeScan = () => {
    console.log('Escanear código de barras');
  };

  const updateField = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Cadastrar Produto"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.tabsContainer}>
        <TabButton
          title={TAB_TYPES.PRODUTO}
          active={activeTab === TAB_TYPES.PRODUTO}
          onPress={() => setActiveTab(TAB_TYPES.PRODUTO)}
        />
        <TabButton
          title={TAB_TYPES.ESTOQUE}
          active={activeTab === TAB_TYPES.ESTOQUE}
          onPress={() => setActiveTab(TAB_TYPES.ESTOQUE)}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === TAB_TYPES.PRODUTO ? (
          <>
            <ImagePicker imageUri={productData.image} onPress={handleImagePick} />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome do Produto</Text>
              <TextInput
                style={styles.input}
                placeholder="Bolsa Térmica Cooler"
                placeholderTextColor={COLORS.textLight}
                value={productData.name}
                onChangeText={(value) => updateField('name', value)}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Preço de Venda</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 250,00"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                  value={productData.sellingPrice}
                  onChangeText={(value) => updateField('sellingPrice', value)}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Preço de Custo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 100,00"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                  value={productData.costPrice}
                  onChangeText={(value) => updateField('costPrice', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Categoria</Text>
              <TextInput
                style={styles.input}
                placeholder="Bolsas Térmicas"
                placeholderTextColor={COLORS.textLight}
                value={productData.category}
                onChangeText={(value) => updateField('category', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Código Interno</Text>
              <TextInput
                style={styles.input}
                placeholder="123456"
                placeholderTextColor={COLORS.textLight}
                value={productData.internalCode}
                onChangeText={(value) => updateField('internalCode', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Código de Barras</Text>
                <TouchableOpacity onPress={handleBarcodeScan}>
                  <ScanBarcode size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="789012345678"
                placeholderTextColor={COLORS.textLight}
                keyboardType="numeric"
                value={productData.barcode}
                onChangeText={(value) => updateField('barcode', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descrição do produto..."
                placeholderTextColor={COLORS.textLight}
                multiline
                numberOfLines={4}
                value={productData.description}
                onChangeText={(value) => updateField('description', value)}
              />
            </View>

            <View style={styles.variantsSection}>
              <View style={styles.variantsHeader}>
                <Text style={styles.variantsTitle}>Variantes</Text>
                <TouchableOpacity>
                  <Text style={styles.addVariantButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.stockContainer}>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>Na Mão</Text>
              <Text style={styles.stockValue}>50</Text>
            </View>

            <View style={styles.stockDivider} />

            <View style={styles.stockItem}>
              <Text style={styles.stockLabelMin}>Mínimo</Text>
              <Text style={styles.stockValue}>25</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={activeTab === TAB_TYPES.PRODUTO ? 'Criar Produto' : 'Adicionar ao Produto'}
          onPress={handleSave}
          variant="secondary"
          style={styles.saveButton}
        />
      </View>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  variantsSection: {
    marginTop: SPACING.md,
  },
  variantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantsTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
  },
  addVariantButton: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: '300',
  },
  stockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  stockItem: {
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  stockLabel: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  stockLabelMin: {
    fontSize: FONT_SIZES.large,
    color: COLORS.secondary,
    marginBottom: SPACING.sm,
  },
  stockValue: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  stockDivider: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  saveButton: {
    width: '100%',
  },
});
