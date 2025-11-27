import React, { JSX, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { ScanBarcode } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ImagePicker } from '../../shared/components/ImagePicker';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';

export enum TAB_TYPES {
    PRODUTO = 'Produto',
    ESTOQUE = 'Estoque',
}

interface ProductDataState {
    image: string | null; 
    name: string;
    category: string;
    sellingPrice: string; 
    costPrice: string;      
    internalCode: string;
    barcode: string;
    description: string;
}

type ActiveTab = TAB_TYPES.PRODUTO | TAB_TYPES.ESTOQUE;



export default function AddProductScreen(): JSX.Element {

    const handleAddVariant = (): void => {
        
    const CURRENT_USER_ROLE = getCurrentUserRole();
    const isUserAdmin = CURRENT_USER_ROLE === 'ADMIN'; // Simulação da Role

    if (isUserAdmin) {
        // Rota do Admin: Acesso total (pode criar uma nova estrutura)
        router.push('/admin/variantes/criarvariacao/index'); 
    } else {
        // Rota do Operador: Acesso restrito (só pode selecionar uma existente para preencher o valor)
        router.push('/addvariantes'); 
    }
};
    
    const router = useRouter(); 
    
    const [activeTab, setActiveTab] = useState<ActiveTab>(TAB_TYPES.PRODUTO);
    
    const [productData, setProductData] = useState<ProductDataState>({
        image: null,
        name: '',
        category: '',
        sellingPrice: '',
        costPrice: '',
        internalCode: '',
        barcode: '',
        description: '',
    });

    
    const handleSave = (): void => {
        console.log('Salvar produto:', productData);
        router.back(); 
    };

    const handleImagePick = (): void => {
        console.log('Selecionar imagem');
    };

    const handleBarcodeScan = (): void => {
        console.log('Escanear código de barras');
      
    };

    const updateField = <K extends keyof ProductDataState>(field: K, value: ProductDataState[K]): void => {
        setProductData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>
            <Header
                title="Cadastrar Produto"
                showBack
                onBackPress={() => router.back()}
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
                style={styles.content as StyleProp<ViewStyle>}
                contentContainerStyle={styles.scrollContent as StyleProp<ViewStyle>}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === TAB_TYPES.PRODUTO ? (
                    <>
                        <ImagePicker 
                            imageUri={productData.image} 
                            onPress={handleImagePick} 
                        />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome do Produto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Bolsa Térmica Cooler"
                                placeholderTextColor={COLORS.textLight}
                                value={productData.name}
                                onChangeText={(value: string) => updateField('name', value)} 
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
                                     onChangeText={(value: string) => updateField('sellingPrice', value)}
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
                                     onChangeText={(value: string) => updateField('costPrice', value)}
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
                                onChangeText={(value: string) => updateField('category', value)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Código Interno</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="123456"
                                placeholderTextColor={COLORS.textLight}
                                value={productData.internalCode}
                                onChangeText={(value: string) => updateField('internalCode', value)}
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
                                onChangeText={(value: string) => updateField('barcode', value)}
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
                                onChangeText={(value: string) => updateField('description', value)}
                            />
                        </View>

                        <View style={styles.variantsSection}>
                            <Text style={styles.variantsTitle}>Variantes</Text>
                            
                            <TouchableOpacity 

                                onPress={handleAddVariant}
                            >
                                <Text style={styles.addVariantButton}>+</Text>
                            </TouchableOpacity>
                            
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
    } as ViewStyle,
    content: {
        flex: 1,
    } as ViewStyle,
    scrollContent: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    } as ViewStyle,
    inputGroup: {
        marginBottom: SPACING.md,
    } as ViewStyle,
    label: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        marginBottom: SPACING.xs,
        fontWeight: '500',
    } as TextStyle,
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    } as ViewStyle,
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    } as TextStyle,
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    } as TextStyle,
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,
    halfWidth: {
        width: '48%',
    } as ViewStyle,
    variantsSection: {
        marginTop: SPACING.md,
        borderTopWidth:1,
        borderBottomWidth:1,
        paddingBottom:16,
        paddingTop:16,
        borderColor:'#D3D3D3',
    } as ViewStyle,
    variantsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,
    variantsTitle: {
        fontSize: FONT_SIZES.large,
        fontWeight: '600',
        color: COLORS.primary,
        
    } as TextStyle,
    addVariantButton: {
        fontSize: 28,
        color: COLORS.primary,
        fontWeight: '300',
    } as TextStyle,
    stockContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.xxl,
    } as ViewStyle,
    stockItem: {
        alignItems: 'center',
        marginVertical: SPACING.xl,
    } as ViewStyle,
    stockLabel: {
        fontSize: FONT_SIZES.large,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    } as TextStyle,
    stockLabelMin: {
        fontSize: FONT_SIZES.large,
        color: COLORS.secondary,
        marginBottom: SPACING.sm,
    } as TextStyle,
    stockValue: {
        fontSize: FONT_SIZES.title,
        fontWeight: 'bold',
        color: COLORS.text,
    } as TextStyle,
    stockDivider: {
        width: 60,
        height: 2,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.lg,
    } as ViewStyle,
    footer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        height:100,
        borderTopColor: COLORS.border,
    } as ViewStyle,
    saveButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingBottom:20,
    } as ViewStyle,
});