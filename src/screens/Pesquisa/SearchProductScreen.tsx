import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react-native';
import SearchBar from '../../shared/components/SearchBar';
import ProductItem from '../../shared/components/ProductItem';
import { COLORS } from '../../shared/constants/colors';
import { Product } from '../../core/types/produtos/index';
import { useRouter } from 'expo-router'; 


export default function SearchProductScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const recentProducts: Product[] = [
        {
            id: '1',
            name: 'Bolsa Térmica Cooler - 14,5 Litros',
            price: 160.00, 
            imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
            category: 'Bolsas',
            sellPrice: 160.0, 
            costPrice: 80.0, 
            internalCode: 'BTC1',
            barcode: '1234567890123',
            description: '+28 (VERMELHO, AZUL)',
            variants: []
        },
        {
            id: '2',
            name: 'Bolsa Térmica Cooler - 14,5 Litros',
            price: 160.00,
            imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
            category: 'Bolsas',
            sellPrice: 160.0,
            costPrice: 80.0,
            internalCode: 'BTC2',
            barcode: '1234567890124',
            description: '+28 (VERMELHO, AZUL)',
            variants: []
        },
    ];

    const handleSearch = () => {
        console.log('Search:', searchQuery);
    };

    const handleBack = () => {
        router.back(); 
    };
    
    const handleProductPress = (product: Product): void => {
        
        router.push({
            pathname: '/verproduto',
            params: { productId: product.id },
        }); 
    };

    return (
        <View style={styles.container}>

            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <ChevronLeft 
                            size={30}
                            color={COLORS.primary}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchWrapper}>
                        <SearchBar
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSearch={handleSearch}
                        />
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content}>
            
                {recentProducts.map((product) => (
                    <ProductItem 
                        key={product.id} 
                        product={product} 
                        onPress={() => handleProductPress(product)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,

    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backIcon: {
        marginRight: 8,
    },
    searchWrapper: {
        flex: 1,
        marginRight: -16,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 14,
        color: COLORS.primary, 
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },
});