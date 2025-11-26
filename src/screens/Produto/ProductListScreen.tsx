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
    ActivityIndicator, // Adicionado para exibir carregamento
    Alert,             // Adicionado para exibir erro ao usuário
} from 'react-native';
import { useRouter } from 'expo-router'; 
// 🔑 Importar useFocusEffect (necessita de @react-navigation/native)
import { useFocusEffect } from '@react-navigation/native';
import { Search } from 'lucide-react-native'; 
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ProductCard } from '../../shared/components/ProductCard';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';
import ProductService from '../../shared/service/produtos'; 
import { ProductResponse } from '../../core/types/produtos/index';


export enum MAIN_TABS {
    PRODUTOS = 'Produtos',
    ESTOQUE = 'Estoque',
    CATEGORIAS = 'Categorias',
}

// 🔑 Ajustando o tipo Product para usar o ProductResponse do serviço
type Product = ProductResponse; 

type MainTab = MAIN_TABS.PRODUTOS | MAIN_TABS.ESTOQUE | MAIN_TABS.CATEGORIAS;

// ⚠️ Removendo o tipo IconComponentType não utilizado para limpar o código

export interface ProductListScreenProps {} 


export const ProductListScreen: FC<ProductListScreenProps> = (): JSX.Element => {

    const router = useRouter(); 
    
    const [activeMainTab, setActiveMainTab] = useState<MainTab>(MAIN_TABS.PRODUTOS);
    const [searchQuery] = useState<string>('');
    
    // 🔑 NOVOS ESTADOS para a API
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ⚠️ Removendo mockProducts, pois vamos usar o estado 'products'

    const handleProductPress = (product: Product): void => {
        router.push({
            pathname: '/addprodutos',
            params: { productId: product.id.toString() }, 
        }); 
    };

    const handleSearchPress = (): void => {
        router.push('/pesquisa');
    };
    
    // 🔑 LÓGICA DE BUSCA DE PRODUTOS
    const fetchProducts = useCallback(async (tab: MainTab) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ProductService.listProducts(tab);
            setProducts(data);
        } catch (err) {
            console.error(`Erro ao buscar produtos para a aba ${tab}:`, err);
            setError("Falha ao carregar a lista. Tente novamente.");
            Alert.alert("Erro de Conexão", `Não foi possível carregar os dados para ${tab}.`);
            setProducts([]); // Limpa a lista em caso de erro
        } finally {
            setIsLoading(false);
        }
    }, []); 

    // 🔑 EFEITO DE FOCO: Recarrega a lista toda vez que a tela entra em foco
    useFocusEffect(
        useCallback(() => {
            fetchProducts(activeMainTab);
            return () => {}; // Função de limpeza
        }, [activeMainTab, fetchProducts]) // Depende da aba ativa e da função de fetch
    );
    
    // 🔑 HANDLER DE MUDANÇA DE ABA: Muda o estado e dispara a busca
    const handleTabChange = (tab: MainTab) => {
        setActiveMainTab(tab);
        // O useFocusEffect/fetchProducts será disparado pela mudança de 'activeMainTab'
    };

    // --- RENDERIZAÇÃO CONDICIONAL (Loading/Erro/Vazio) ---

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
                keyExtractor={(item) => item.id.toString()}
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
                onRightIconPress={() => console.log('Buscar')} // Mudei para 'Buscar' já que o ícone é Search
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

            <TouchableOpacity 
                style={styles.searchContainer as StyleProp<ViewStyle>}
                onPress={handleSearchPress}
                activeOpacity={0.8}
            >
                <Search size={20} color={COLORS.darkGray} style={styles.searchIcon as StyleProp<ViewStyle>} />
                
                <TextInput
                    style={styles.searchInput as StyleProp<TextStyle>}
                    placeholder="Produto, lote ou Código"
                    placeholderTextColor={COLORS.textLight}
                    value={searchQuery}
                    editable={false} 
                />
            </TouchableOpacity>

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: 5, 
        borderBottomWidth:1,
        borderBottomColor: COLORS.border, 
        borderColor: COLORS.border,
        
    } as ViewStyle,
    searchIcon: {
        marginRight: SPACING.sm,
    } as ViewStyle,
    searchInput: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    } as TextStyle,
    listWrapper: {
        flex: 1,
    } as ViewStyle,
    listContent: {
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.md,
    } as ViewStyle,
    // 🔑 NOVOS ESTILOS
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