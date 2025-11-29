import React, { JSX, useState, FC, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity, 
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { useFocusEffect } from '@react-navigation/native';
import { Search } from 'lucide-react-native'; 
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ProductCard } from '../../shared/components/ProductCard';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';
import { ProdutoResponse } from '../../core/types/produtos'; 
import ProductService from '../../shared/service/produtos'; 

// 🚨 SIMULAÇÃO DE TIPOS EXTERNOS (Ajuste seus imports reais se necessário)
export interface CategoryResponse { id: number | null; nome: string; descricao: string; totalStock: number; }
export interface StockSummaryResponse { totalValue: number; costValue: number; totalItems: number; }
// 🚨 NOVO TIPO: Interface de Produto com as propriedades que o Card precisa
interface ProductCardExpected { code: string; price: string; }

// 🚨 NOVO TIPO: Se ProdutoResponse tem 'variantes' como Array de Objetos, esta é uma suposição:
// Se variantes for uma string simples, remova esta interface e volte a usar string.
interface ProductVariant { name: string; } 

// 🔑 TIPOS DE RETORNO DA API
interface StockApiData { summary: StockSummaryResponse; list: ProdutoResponse[]; }
type ListApiData = ProdutoResponse[] | CategoryResponse[]; 


export enum MAIN_TABS {
    PRODUTOS = 'Produtos',
    ESTOQUE = 'Estoque',
    CATEGORIAS = 'Categorias',
}

type Product = ProdutoResponse & ProductCardExpected; 
type ItemToList = Product | CategoryResponse; 
type MainTab = MAIN_TABS.PRODUTOS | MAIN_TABS.ESTOQUE | MAIN_TABS.CATEGORIAS;

export interface ProductListScreenProps {} 


export const ProductListScreen: FC<ProductListScreenProps> = (): JSX.Element => {
    
    const router = useRouter(); 
    
    const [activeMainTab, setActiveMainTab] = useState<MainTab>(MAIN_TABS.ESTOQUE); 
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [stockSummary, setStockSummary] = useState<StockSummaryResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleProductPress = (item: ItemToList): void => {
        if ('totalStock' in item) {
             console.log(`Abrir detalhes da Categoria: ${item.nome}`);
        } else {
             const productId = item.id !== null ? item.id.toString() : 'new'; 
             router.push({
                 pathname: '/addprodutos',
                 params: { productId }, 
             }); 
        }
    };

    const fetchProducts = useCallback(async (tab: MainTab) => {
        setIsLoading(true);
        setError(null);
        setProducts([]);
        setCategories([]);
        setStockSummary(null);

        try {
            // 🔑 FORÇA O TIPO PARA 'unknown' antes de fazer o cast condicionalmente
            const data = await ProductService.listProducts(tab);
            
            const mapDataToProducts = (items: ProdutoResponse[]): Product[] => items.map(item => ({
                ...item,
                code: item.internalCode, 
                price: item.sellPrice.toFixed(2).replace('.', ','), 
            })) as Product[]; 


            if (tab === MAIN_TABS.ESTOQUE) {
                // 🔑 CORREÇÃO 1: Cast para o tipo StockApiData que possui 'summary' e 'list'
                const stockData = data as unknown as StockApiData; 
                setStockSummary(stockData.summary);
                setProducts(mapDataToProducts(stockData.list));
            } else if (tab === MAIN_TABS.CATEGORIAS) {
                // 🔑 CORREÇÃO 2: Cast para ListApiData (Categoria)
                setCategories(data as unknown as CategoryResponse[]);
            } else {
                // 🔑 CORREÇÃO 2: Cast para ListApiData (Produto)
                setProducts(mapDataToProducts(data as unknown as ProdutoResponse[]));
            }
            
        } catch (err) {
            console.error(`Erro ao buscar dados para a aba ${tab}:`, err);
            setError("Falha ao carregar a lista. Tente novamente.");
            Alert.alert("Erro de Conexão", `Não foi possível carregar os dados para ${tab}.`);
        } finally {
            setIsLoading(false);
        }
    }, []); 

    useFocusEffect(
        useCallback(() => {
            fetchProducts(activeMainTab);
            setSearchQuery(''); 
            return () => {};
        }, [activeMainTab, fetchProducts])
    );
    
    const handleTabChange = (tab: MainTab) => {
        setActiveMainTab(tab);
    };

    // ----------------------------------------------------------------------
    // Lógica de Filtragem (useMemo)
    // ----------------------------------------------------------------------
    const filteredData = useMemo(() => {
        if (!searchQuery) {
            return activeMainTab === MAIN_TABS.CATEGORIAS ? categories : products;
        }

        const query = searchQuery.toLowerCase();

        if (activeMainTab === MAIN_TABS.CATEGORIAS) {
            return categories.filter(category =>
                category.nome.toLowerCase().includes(query) ||
                category.descricao.toLowerCase().includes(query)
            );
        }
        
        // Filtra Produtos e Estoque (Produto possui 'name' e 'code')
        return products.filter(product => {
            
            // 🔑 CORREÇÃO 3: Assumindo que product.variantes é um ARRAY de ProductVariant
            // Se 'variantes' na sua ProdutoResponse é uma string, APENAS use: 
            // const variantsString = product.variantes;
            
            // Se variantes é um array de objetos (e.g. [{ name: 'G' }, { name: 'Azul' }])
            // Usamos map+join para criar uma string pesquisável
            const variantsString = Array.isArray(product.variants) 
                ? product.variants.map((v: ProductVariant) => v.name).join(' ').toLowerCase()
                : String(product.variants).toLowerCase(); // Fallback se for string, mas o tipo está incorreto

            return (
                product.name.toLowerCase().includes(query) || // Nome do produto
                product.code.toLowerCase().includes(query) || // Código interno
                variantsString.includes(query)                // Variantes
            );
        });

    }, [searchQuery, products, categories, activeMainTab]);


    // ----------------------------------------------------------------------
    // Componentes de Renderização (Mantidos, mas garantindo a tipagem da FlatList)
    // ----------------------------------------------------------------------
    
    const renderSearchBar = () => (
        <View style={searchStyles.container}>
            <Search size={20} color={COLORS.textLight} style={searchStyles.icon} />
            <TextInput
                style={searchStyles.input}
                placeholder={`Buscar em ${activeMainTab.toLowerCase()}...`}
                placeholderTextColor={COLORS.textLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
                keyboardType="default"
                returnKeyType="search"
                autoCapitalize="none"
            />
        </View>
    );

    const renderStockSummary = () => { /* ... mantido ... */ 
        if (activeMainTab !== MAIN_TABS.ESTOQUE || !stockSummary) return null;

        const formatCurrency = (value: number) => 
            'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return (
            <View style={stockSummaryStyles.container}>
                <View style={stockSummaryStyles.item}>
                    <Text style={stockSummaryStyles.label}>Total: </Text>
                    <Text style={stockSummaryStyles.value}>{formatCurrency(stockSummary.totalValue)}</Text>
                </View>
                <View style={stockSummaryStyles.item}>
                    <Text style={stockSummaryStyles.labelCost}>Custo do estoque: </Text>
                    <Text style={stockSummaryStyles.valueCost}>{formatCurrency(stockSummary.costValue)}</Text>
                </View>
                <View style={stockSummaryStyles.totalItem}>
                    <Text style={stockSummaryStyles.totalValue}>{stockSummary.totalItems}</Text>
                    <Text style={stockSummaryStyles.totalLabel}>no estoque</Text>
                </View>
            </View>
        );
    };

    const renderContent = () => {
        if (isLoading) {
             return (
                 <View style={styles.centerContent as StyleProp<ViewStyle>}>
                     <ActivityIndicator size="large" color={COLORS.primary} />
                     <Text style={styles.loadingText as StyleProp<TextStyle>}>Carregando {activeMainTab.toLowerCase()}...</Text>
                 </View>
             );
        }

        const dataToRender = filteredData;

        if (error) {
             return (<View style={styles.centerContent}><Text style={styles.errorText}>Falha ao carregar dados.</Text></View>);
        }

        if (dataToRender.length === 0) {
            return (
                <View style={styles.centerContent as StyleProp<ViewStyle>}>
                    <Text style={styles.emptyText as StyleProp<TextStyle>}>
                        {searchQuery ? `Nenhum resultado para "${searchQuery}" em ${activeMainTab.toLowerCase()}.` : `Nenhum ${activeMainTab.toLowerCase()} encontrado.`}
                    </Text>
                </View>
            );
        }

        return (
            // 🔑 CORREÇÃO DO ERRO DE OVERLOAD: Usar o tipo unificado ItemToList
            <FlatList<ItemToList> 
                data={dataToRender as ItemToList[]} 
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => {
                    // O item é ItemToList (Product | CategoryResponse)
                    if (activeMainTab === MAIN_TABS.CATEGORIAS) {
                        const category = item as CategoryResponse;
                        return (
                            <TouchableOpacity style={categoryStyles.card} onPress={() => handleProductPress(category)}>
                                <Text style={categoryStyles.title}>{category.nome}</Text>
                                <View style={categoryStyles.stockContainer}>
                                     <Text style={categoryStyles.stockCount}>{category.totalStock}</Text>
                                     <Text style={categoryStyles.stockLabel}>itens</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                    // O item é Product
                    return <ProductCard product={item as Product} onPress={() => handleProductPress(item as Product)} />;
                }}
                contentContainerStyle={styles.listContent as StyleProp<ViewStyle>}
                showsVerticalScrollIndicator={false}
            />
        );
    };


    return (
        <View style={styles.container}>
            {/* Header (Mantenha o userName e userRole estáticos aqui até integrar o useAuth) */}
            <Header
                showProfile
                userName="Clara Catarina"
                userRole="UX/UI Designer"
                userImage="https://via.placeholder.com/40"
                rightIcon={Search} 
                onRightIconPress={() => console.log('Buscar')}
            />

            {/* 1. TABS PRINCIPAIS */}
            <View style={styles.tabsContainer}>
                <TabButton
                    title={MAIN_TABS.PRODUTOS}
                    active={activeMainTab === MAIN_TABS.PRODUTOS}
                    onPress={() => handleTabChange(MAIN_TABS.PRODUTOS)}
                />
                <TabButton
                    title={MAIN_TABS.ESTOQUE}
                    active={activeMainTab === MAIN_TABS.ESTOQUE}
                    onPress={() => handleTabChange(MAIN_TABS.ESTOQUE)}
                />
                <TabButton
                    title={MAIN_TABS.CATEGORIAS}
                    active={activeMainTab === MAIN_TABS.CATEGORIAS}
                    onPress={() => handleTabChange(MAIN_TABS.CATEGORIAS)}
                />
            </View>
            
            {renderSearchBar()}
            
            {/* 2. RESUMO DE ESTOQUE (Rendeiza apenas na aba ESTOQUE) */}
            {renderStockSummary()}

            {/* 3. CONTEÚDO DA LISTA (Rendeiza Produtos ou Categorias) */}
            <View style={styles.listWrapper}>
                 {renderContent()}
            </View>

        </View>
    );
};

// ... (searchStyles, stockSummaryStyles, categoryStyles e styles continuam os mesmos) ...

// ----------------------------------------------------------------------
// 🔑 NOVOS ESTILOS: Barra de Pesquisa
// ----------------------------------------------------------------------

const searchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,
    icon: {
        marginRight: SPACING.sm,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    } as TextStyle,
});


// ----------------------------------------------------------------------
// ESTILOS ADICIONAIS (Resumo de Estoque e Categorias) - Mantidos
// ----------------------------------------------------------------------

const stockSummaryStyles = StyleSheet.create({
    container: { /* ... estilos de resumo de estoque ... */ 
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        flexDirection: 'row',
        flexWrap: 'wrap',
    } as ViewStyle,
    item: { flexDirection: 'row', marginBottom: SPACING.xs, width: '50%', } as ViewStyle,
    totalItem: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginTop: SPACING.sm, } as ViewStyle,
    label: { fontSize: FONT_SIZES.medium, color: COLORS.textLight, } as TextStyle,
    labelCost: { fontSize: FONT_SIZES.medium, color: COLORS.textLight, fontWeight: 'bold', } as TextStyle,
    value: { fontSize: FONT_SIZES.medium, color: COLORS.text, fontWeight: 'bold', } as TextStyle,
    valueCost: { fontSize: FONT_SIZES.medium, color: COLORS.text, } as TextStyle,
    totalValue: { fontSize: FONT_SIZES.large, color: COLORS.primary, fontWeight: 'bold', } as TextStyle,
    totalLabel: { fontSize: FONT_SIZES.medium, color: COLORS.textLight, marginLeft: SPACING.xs, } as TextStyle,
});

const categoryStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,
    title: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.text,
    } as TextStyle,
    stockContainer: {
        alignItems: 'flex-end',
    } as ViewStyle,
    stockCount: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.primary,
    } as TextStyle,
    stockLabel: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
    } as TextStyle,
});


// ----------------------------------------------------------------------
// ESTILOS GERAIS (Mantidos para referência)
// ----------------------------------------------------------------------

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background } as ViewStyle,
    tabsContainer: { flexDirection: 'row', backgroundColor: COLORS.primary } as ViewStyle,
    listWrapper: { flex: 1 } as ViewStyle,
    listContent: { paddingBottom: SPACING.md, paddingHorizontal: SPACING.md } as ViewStyle,
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.md } as ViewStyle,
    loadingText: { marginTop: SPACING.md, fontSize: FONT_SIZES.medium, color: COLORS.primary } as TextStyle,
    errorText: { fontSize: FONT_SIZES.large, color: COLORS.warning, textAlign: 'center', marginBottom: SPACING.lg } as TextStyle,
    emptyText: { fontSize: FONT_SIZES.medium, color: COLORS.textLight, textAlign: 'center' } as TextStyle,
    retryButton: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: 8 } as ViewStyle,
    retryButtonText: { color: COLORS.white, fontSize: FONT_SIZES.medium, fontWeight: 'bold' } as TextStyle,
});