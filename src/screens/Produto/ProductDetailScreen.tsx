// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import Header from '../../shared/components/Header';
// import TabBar from '@/app/components/TabBar';
// import ProductDetailsInfo from '@/app/components/ProductDetailsInfo';
// import StockList from '@/app/components/StockList';
// import { COLORS } from '../../shared/constants/colors'; 
// import { TabType, TAB_VALUES } from '../../shared/enums/tabenums'; 
// import { Stock } from '../../core/types/estoque';

// export default function ProductDetailsScreen() {
//     const { id } = useLocalSearchParams<{ id: string }>();
    
//     const [activeTab, setActiveTab] = useState<TabType>(TAB_VALUES.PRODUTO);

//     const product = {
//         id: id || '1',
//         name: 'Bolsa Térmica Cooler',
//         price: 250.0,
//         imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
//         category: 'Bolsas Térmicas',
//         salePrice: 250.0,
//         costPrice: 100.0,
//         description:
//             'Fabricada em lona, manta térmica com revestimento alumizado que reveste internamente, com fechamento em zíper e alça de mão.',
//         internalCode: 'BTC',
//         barcode: '656516526262625265635625262625265625262625265625',
//         variant: 'Vermelho',
//     };

//     const stocks: Stock[] = [
//         { id: '1', variant: 'Cor: Vermelho', quantity: 200, status: 'available' },
//         { id: '2', variant: 'Cor: Azul Marinho', quantity: 200, status: 'available' },
//         { id: '3', variant: 'Cor: Roxo', quantity: 0, status: 'unavailable' },
//     ];

//     const handleBack = () => {
//         console.log('Go back');
//     };

//     const handleDownload = () => {
//         console.log('Dar Baixa');
//     };

//     return (
//         <View style={styles.container}>
//             <Header title={product.name} onBack={handleBack} />

//             <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

//             {activeTab === TAB_VALUES.PRODUTO ? (
//                 <ProductDetailsInfo product={product} />
//             ) : (
//                 <StockList stocks={stocks} />
//             )}

//             <View style={styles.footer}>
//                 <TouchableOpacity style={styles.button} onPress={handleDownload}>
//                     <Text style={styles.buttonText}>Dar Baixa</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     footer: {
//         padding: 16,
//         borderTopWidth: 1,
//         borderTopColor: COLORS.border,
//     },
//     button: {
//         backgroundColor: COLORS.primary,
//         paddingVertical: 14,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: COLORS.white,
//         fontSize: 16,
//         fontWeight: '600',
//     },
// });