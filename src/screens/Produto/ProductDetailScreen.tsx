import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Header } from '../../shared/components';
import { TabButton } from '../../shared/components'; 
import ProductDetailsInfo from '../../shared/components/ProductsDetailsInfo';
import StockList from '../../shared/components/StockList';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing';
import { FONT_SIZES } from '../../shared/constants/fonts';
import { Stock } from '../../core/types/estoque';
import { Product } from '../../core/types/produtos/index'; 
import { TabType } from '../../shared/enums/tabenums';


const TAB_VALUES = {
    PRODUTO: 'produto' as TabType, 
    ESTOQUE: 'estoque' as TabType, 
};

export default function ProductDetailsScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();
    
    const [activeTab, setActiveTab] = useState<TabType>(TAB_VALUES.PRODUTO);

    const product: Product = { 
        id: id || '1',
        name: 'Bolsa Térmica Cooler',
        price: 250.0,
        imageUrl: 'https://via.placeholder.com/200', 
        category: 'Bolsas Térmicas',
        sellPrice: 250.0,
        costPrice: 100.0,
        description:
            'Fabricada em lona, manta térmica com revestimento aluminizado por dentro, com fechamento em zíper e alça de mão.',
        internalCode: 'BTG',
        barcode: '6565165262626265265651652626262656516',
        variants: [ ]
    };

    const stocks: Stock[] = [
        { id: '1', variant: 'Cor: Vermelho', quantity: 200, status: 'available' },
        { id: '2', variant: 'Cor: Azul Marinho', quantity: 200, status: 'available' },
        { id: '3', variant: 'Cor: Roxo', quantity: 0, status: 'unavailable' },
    ];

    const handleBack = () => {
        console.log('Go back');
    };

    const handleDownload = () => {
        console.log('Dar Baixa');
    };

    return (
        <View style={styles.container}>

            <Header title={product.name} onBackPress={handleBack} />

            <View style={styles.tabBarContainer}>
                
                <View style={styles.tabItem}>
                    <TabButton 
                        title="Produto" 
                        active={activeTab === TAB_VALUES.PRODUTO} 
                        onPress={() => setActiveTab(TAB_VALUES.PRODUTO)}
                    />
                </View>

                <View style={styles.tabItem}>
                    <TabButton 
                        title="Estoque" 
                        active={activeTab === TAB_VALUES.ESTOQUE} 
                        onPress={() => setActiveTab(TAB_VALUES.ESTOQUE)}
                    />
                </View>
            </View>

            <ScrollView style={styles.content}>
                {activeTab === TAB_VALUES.PRODUTO ? (
                    <ProductDetailsInfo product={product} />
                ) : (
                    <StockList stocks={stocks} />
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleDownload}>
                    <Text style={styles.buttonText}>Dar Baixa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    } as const,
    

    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary, 
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingHorizontal: SPACING.md,
    } as const,

    tabItem: {
        marginRight: SPACING.xl, 
        paddingVertical: SPACING.sm, 
    } as const,

    content: {
        flex: 1,
        backgroundColor: COLORS.white,
    } as const,

    footer: {
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.white,
    } as const,

    button: {
        backgroundColor: COLORS.primary, 
        paddingVertical: SPACING.md,
        borderRadius: 8,
        alignItems: 'center',
    } as const,

    buttonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontWeight: '600',
    } as const,
});