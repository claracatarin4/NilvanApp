import React, { JSX, useState, FC, useCallback } from 'react';
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


export enum MAIN_TABS {
    PRODUTOS = 'Produtos',
    ESTOQUE = 'Estoque',
    CATEGORIAS = 'Categorias',
}

// 1. Defina as propriedades adicionais que o ProductCard espera
interface ProductCardExpected {
    code: string;
    // 🔑 CORREÇÃO AQUI: MUDAR PARA STRING, CONFORME ERRO DO TS(2719)
    price: string; 
}

// 2. 🔑 CORREÇÃO: O tipo Product é a soma do que a API retorna e do que o Card exige.
type Product = ProdutoResponse & ProductCardExpected; 

type MainTab = MAIN_TABS.PRODUTOS | MAIN_TABS.ESTOQUE | MAIN_TABS.CATEGORIAS;

export interface ProductListScreenProps {} 


export const ProductListScreen: FC<ProductListScreenProps> = (): JSX.Element => {
    // ... (restante dos estados e handlers)
    const router = useRouter(); 
    
    const [activeMainTab, setActiveMainTab] = useState<MainTab>(MAIN_TABS.PRODUTOS);
    const [searchQuery] = useState<string>('');
    
    // 🔑 NOVOS ESTADOS para a API
    const [products, setProducts] = useState<Product[]>([]); // Usa o novo tipo 'Product'
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleProductPress = (product: Product): void => {
        // Garantindo que 'id' não seja null antes de chamar toString()
        const productId = product.id !== null ? product.id.toString() : 'new'; 
        router.push({
            pathname: '/addprodutos',
            params: { productId }, 
        }); 
    };

    // 🔑 LÓGICA DE BUSCA DE PRODUTOS
    const fetchProducts = useCallback(async (tab: MainTab) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ProductService.listProducts(tab);
            
            // 💡 CORREÇÃO CRÍTICA: Mapear e CONVERTER O TIPO DE DADO para 'code' e 'price' (string)
            const mappedProducts: Product[] = data.map(item => ({
                ...item,
                // Assumindo que 'code' no Card deve usar o 'internalCode' da API
                code: item.internalCode, 
                // 🔑 CONVERSÃO: Converte o sellPrice (number) para string para a chave 'price'
                price: item.sellPrice.toFixed(2), // Formata como string monetária
            })) as Product[]; 
            
            setProducts(mappedProducts);
            
        } catch (err) {
            console.error(`Erro ao buscar produtos para a aba ${tab}:`, err);
            setError("Falha ao carregar a lista. Tente novamente.");
            Alert.alert("Erro de Conexão", `Não foi possível carregar os dados para ${tab}.`);
            setProducts([]); // Limpa a lista em caso de erro
        } finally {
            setIsLoading(false);
        }
    }, []); 

    useFocusEffect(
        useCallback(() => {
            fetchProducts(activeMainTab);
            return () => {}; // Função de limpeza
        }, [activeMainTab, fetchProducts])
    );
    
    const handleTabChange = (tab: MainTab) => {
        setActiveMainTab(tab);
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

        if (error) {
            return (
                <View style={styles.centerContent as StyleProp<ViewStyle>}>
                    <Text style={styles.errorText as StyleProp<TextStyle>}>{error}</Text>
                    <TouchableOpacity onPress={() => fetchProducts(activeMainTab)} style={styles.retryButton as StyleProp<ViewStyle>}>
                        <Text style={styles.retryButtonText as StyleProp<TextStyle>}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (products.length === 0) {
            return (
                <View style={styles.centerContent as StyleProp<ViewStyle>}>
                    <Text style={styles.emptyText as StyleProp<TextStyle>}>Nenhum {activeMainTab.toLowerCase()} encontrado.</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={products}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={() => handleProductPress(item)} />
                )}
                contentContainerStyle={styles.listContent as StyleProp<ViewStyle>}
                showsVerticalScrollIndicator={false}
            />
        );
    };


    return (
        <View style={styles.container}>
            <Header
                showProfile
                userName="Clara Catarina"
                userRole="UX/UI Designer"
                userImage="https://via.placeholder.com/40"
                rightIcon={Search} 
                onRightIconPress={() => console.log('Buscar')}
            />

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

            <View style={styles.listWrapper}>
                 {renderContent()}
            </View>


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        
    } as ViewStyle,
    // ... (restante dos estilos)
    listWrapper: {
        flex: 1,
    } as ViewStyle,
    listContent: {
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.md,
    } as ViewStyle,
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
    } as ViewStyle,
    loadingText: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.primary,
    } as TextStyle,
    errorText: {
        fontSize: FONT_SIZES.large,
        color: COLORS.warning,
        textAlign: 'center',
        marginBottom: SPACING.lg,
    } as TextStyle,
    emptyText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        textAlign: 'center',
    } as TextStyle,
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: 8,
    } as ViewStyle,
    retryButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
    } as TextStyle,
});