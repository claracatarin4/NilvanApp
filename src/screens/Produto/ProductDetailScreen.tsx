import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {Header, TabButton} from '../../shared/components';
import ProductDetailsInfo from '../../shared/components/ProductsDetailsInfo';
import StockList from '../../shared/components/StockList';
import { COLORS } from '../../shared/constants/colors'; 
import { Stock } from '../../core/types/estoque';

import { Product } from '../../core/types/produtos/index'; 
import { TAB_TYPES} from './AddProductScreen'; 
import { TabType } from '../../shared/enums/tabenums';

const TAB_VALUES = TAB_TYPES;


export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
   
    const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPES.PRODUTO);

    const product: Product = { 
        id: id || '1',
        name: 'Bolsa Térmica Cooler',
        price: 250.0,
        imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
        category: 'Bolsas Térmicas',
        sellPrice: 250.0,
        costPrice: 100.0,
        description:
            'Fabricada em lona, manta térmica com revestimento alumizado que reveste internamente, com fechamento em zíper e alça de mão.',
        internalCode: 'BTC',
        barcode: '656516526262625265635625262625265625262625265625',
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
    
    const ActivitySquare = activeTab === TAB_VALUES.ESTOQUE; 

    return (
        <View style={styles.container}>
            <Header title={product.name} onBackPress={handleBack} />

            <TabButton 
                title="Estoque" 
                active={ActivitySquare} 
                onPress={() => setActiveTab(TAB_VALUES.ESTOQUE as TabType)}
            />

            {activeTab === TAB_VALUES.PRODUTO ? (
                <ProductDetailsInfo product={product} />
            ) : (
                <StockList stocks={stocks} />
            )}

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

    },

    footer: {

        padding: 16,

        borderTopWidth: 1,

        borderTopColor: COLORS.border,

    },

    button: {

        backgroundColor: COLORS.primary,

        paddingVertical: 14,

        borderRadius: 8,

        alignItems: 'center',

    },

    buttonText: {

        color: COLORS.white,

        fontSize: 16,

        fontWeight: '600',

    },

});

