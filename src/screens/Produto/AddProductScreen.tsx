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
    Alert,
    ActivityIndicator,
} from 'react-native';
import { ScanBarcode } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 

// Importações Mockadas (Ajuste o caminho conforme seu projeto)
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ImagePicker } from '../../shared/components/ImagePicker';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';
import { ProdutoRequest } from '../../core/types/produtos';

// Simulação do Serviço de Produto e DTOs


// --- TIPAGENS ---
export enum TAB_TYPES {
    PRODUTO = 'Produto',
    ESTOQUE = 'Estoque',
}

// O DTO do Formulário (usando string para Inputs)
interface ProductDataState {
    image: string | null; 
    name: string;
    category: string;
    sellingPrice: string; 
    costPrice: string;       
    internalCode: string;
    barcode: string;
    description: string;
    // Opcional: Adicionar campos de estoque mínimo/máximo aqui se a tela 'Estoque' fosse editável
}

type ActiveTab = TAB_TYPES.PRODUTO | TAB_TYPES.ESTOQUE;


// --- MOCK DE FUNÇÕES ---
// Mock: Retorna a role do usuário logado (usado para a lógica de variantes)
const getCurrentUserRole = (): 'ADMIN' | 'OPERATOR' => {
    // Em um ambiente real, esta função faria uma busca no contexto de autenticação.
    return 'ADMIN'; 
};


// --- COMPONENTE PRINCIPAL ---
export default function AddProductScreen(): JSX.Element {

    const router = useRouter(); 
    
    const [activeTab, setActiveTab] = useState<ActiveTab>(TAB_TYPES.PRODUTO);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
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
    
    // Simulação do estado das variantes (seria preenchido por outra tela/componente)
    const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

    const updateField = <K extends keyof ProductDataState>(field: K, value: ProductDataState[K]): void => {
        setProductData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImagePick = (): void => {
        // Implementar lógica de seleção/upload de imagem aqui
        Alert.alert('Imagem', 'Lógica de seleção de imagem seria implementada aqui.');
    };

    const handleBarcodeScan = (): void => {
        // Implementar lógica de scanner de código de barras
        Alert.alert('Scanner', 'Lógica de scanner de código de barras seria implementada aqui.');
    };

    const handleAddVariant = (): void => {
        const CURRENT_USER_ROLE = getCurrentUserRole();
        const isUserAdmin = CURRENT_USER_ROLE === 'ADMIN'; 

        if (isUserAdmin) {
            // Rota do Admin: Acesso total (pode criar uma nova estrutura)
            // router.push('/admin/variantes/criarvariacao/index'); 
            Alert.alert('Variante Admin', 'Navegando para a tela de criação/gestão de variantes como ADMIN.');
        } else {
            // Rota do Operador: Acesso restrito (só pode selecionar uma existente para preencher o valor)
            // router.push('/addvariantes'); 
            Alert.alert('Variante Operador', 'Navegando para a tela de seleção de variantes como OPERATOR.');
        }
    };

    const validateAndMapData = (): ProdutoRequest | null => {
        // Validação básica
        if (!productData.name.trim() || !productData.category.trim() || !productData.sellingPrice.trim()) {
            Alert.alert('Erro', 'Nome, Categoria e Preço de Venda são obrigatórios.');
            return null;
        }

        const sellPrice = parseFloat(productData.sellingPrice.replace(',', '.'));
        const costPrice = parseFloat(productData.costPrice.replace(',', '.')) || 0;

        if (isNaN(sellPrice) || sellPrice <= 0) {
             Alert.alert('Erro', 'Preço de Venda inválido.');
             return null;
        }

        return {
            nome: productData.name.trim(),
            categoriaResponse: productData.category.trim(),
            sellPrice: sellPrice,
            costPrice: costPrice,
            internalCode: productData.internalCode.trim(),
            barcode: productData.barcode.trim(),
            description: productData.description.trim(),
            imageUrl: productData.image,
            variants: productVariants, 
        };
    };

    const handleSave = async (): Promise<void> => {
        if (isSaving) return;

        const dataToSave = validateAndMapData();
        if (!dataToSave) return;
        
        setIsSaving(true);
        try {
            await ProdutoService.createProduto(dataToSave);

            Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
            router.back(); 

        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            Alert.alert('Erro ao Salvar', 'Não foi possível cadastrar o produto. Tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };


    // --- CONTEÚDO DA ABA PRODUTO ---
    const ProductTabContent = (): JSX.Element => (
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
                    editable={!isSaving}
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
                        editable={!isSaving}
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
                        editable={!isSaving}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoria</Text>
                {/* Nota: Em uma app real, este seria um Picker ou Modal de seleção de Categoria */}
                <TextInput
                    style={styles.input}
                    placeholder="Bolsas Térmicas"
                    placeholderTextColor={COLORS.textLight}
                    value={productData.category}
                    onChangeText={(value: string) => updateField('category', value)}
                    editable={!isSaving}
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
                    editable={!isSaving}
                />
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                    <Text style={styles.label}>Código de Barras</Text>
                    <TouchableOpacity onPress={handleBarcodeScan} disabled={isSaving}>
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
                    editable={!isSaving}
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
                    editable={!isSaving}
                />
            </View>

            <View style={styles.variantsSection}>
                <View style={styles.variantsHeader}>
                    <Text style={styles.variantsTitle}>Variantes ({productVariants.length})</Text>
                    <TouchableOpacity 
                        onPress={handleAddVariant}
                        disabled={isSaving}
                    >
                        <Text style={styles.addVariantButton}>+</Text>
                    </TouchableOpacity>
                </View>
                {/* 💡 Aqui seria renderizada a lista de variantes já adicionadas */}
                {productVariants.length === 0 && (
                    <Text style={styles.noVariantsText}>Nenhuma variante adicionada.</Text>
                )}
            </View>
        </>
    );

    // --- CONTEÚDO DA ABA ESTOQUE ---
    const StockTabContent = (): JSX.Element => (
        <View style={styles.stockContainer}>
            {/* Estes valores seriam carregados do servidor ou calculados a partir das variantes */}
            <View style={styles.stockItem}>
                <Text style={styles.stockLabel}>Na Mão</Text>
                <Text style={styles.stockValue}>50</Text> 
            </View>

            <View style={styles.stockDivider} />

            <View style={styles.stockItem}>
                <Text style={styles.stockLabelMin}>Mínimo</Text>
                <Text style={styles.stockValue}>25</Text>
            </View>
            <Text style={styles.stockWarningText}>
                * O estoque total é a soma das quantidades de todas as variantes cadastradas.
            </Text>
        </View>
    );

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
                {activeTab === TAB_TYPES.PRODUTO ? <ProductTabContent /> : <StockTabContent />}
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title={activeTab === TAB_TYPES.PRODUTO ? 'Criar Produto' : 'Adicionar ao Produto'}
                    onPress={handleSave}
                    variant="secondary"
                    style={styles.saveButton}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color={COLORS.white} size="small" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                           {activeTab === TAB_TYPES.PRODUTO ? 'Criar Produto' : 'Adicionar ao Produto'}
                        </Text>
                    )}
                </CustomButton>
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
        paddingBottom: SPACING.xxl * 1.5, // Garante espaço para o botão no rodapé
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: SPACING.md,
        borderColor: COLORS.border,
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
        paddingHorizontal: SPACING.sm, // Área de toque
    } as TextStyle,
    noVariantsText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        marginTop: SPACING.sm,
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
        color: COLORS.warning, // Usando warning para mínimo/alerta
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
    stockWarningText: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        textAlign: 'center',
        marginTop: SPACING.xl,
    } as TextStyle,
    footer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    } as ViewStyle,
    saveButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
    } as ViewStyle,
    saveButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
    } as TextStyle,
});