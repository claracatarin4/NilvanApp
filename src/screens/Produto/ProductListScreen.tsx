import React, { JSX, useState, FC } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Search, } from 'lucide-react-native'; 
import { Header } from '../../shared/components/Header';
import { TabButton } from '../../shared/components/TabButton';
import { ProductCard } from '../../shared/components/ProductCard';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';


export enum MAIN_TABS {
    PRODUTOS = 'Produtos',
    ESTOQUE = 'Estoque',
    CATEGORIAS = 'Categorias',
}

interface Product {
    id: number | string; 
    name: string;
    code: string;
    price: string;
    imageUrl: string;
}


type MainTab = MAIN_TABS.PRODUTOS | MAIN_TABS.ESTOQUE | MAIN_TABS.CATEGORIAS;

type IconComponentType = FC<{ color: string; size: number; style?: StyleProp<ViewStyle> }>;

export interface ProductListScreenProps {} 


export const ProductListScreen: FC<ProductListScreenProps> = (): JSX.Element => {

    const router = useRouter(); 
    
    const [activeMainTab, setActiveMainTab] = useState<MainTab>(MAIN_TABS.PRODUTOS);
    const [searchQuery] = useState<string>('');

    const mockProducts: Product[] = [
        
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

    const handleProductPress = (product: Product): void => {
        router.push({
            pathname: '/addprodutos',
            params: { productId: product.id.toString() }, 
        }); 
    };

    const handleSearchPress = (): void => {
        router.push('/pesquisa');
    };

    return (
        <View style={styles.container}>
            <Header
                showProfile
                userName="Clara Catarina"
                userRole="UX/UI Designer"
                userImage="https://via.placeholder.com/40"
                rightIcon={Search} 
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

            <TouchableOpacity 
                style={styles.searchContainer as StyleProp<ViewStyle>}
                onPress={handleSearchPress}
                activeOpacity={0.8}
            >
                <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
                
                <TextInput
                    style={styles.searchInput as StyleProp<TextStyle>}
                    placeholder="Produto, lote ou Código"
                    placeholderTextColor={COLORS.textLight}
                    value={searchQuery}
                    editable={false} 
                />
            </TouchableOpacity>

            <FlatList
                data={mockProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={() => handleProductPress(item)} />
                )}
                contentContainerStyle={styles.listContent as StyleProp<ViewStyle>}
                showsVerticalScrollIndicator={false}
            />

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
    listContent: {
        paddingBottom: SPACING.md,
    } as ViewStyle,
});