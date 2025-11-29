// import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native'; // Adicionado TextInput
// import { useState } from 'react';
// // Ícones agora importados: ChevronLeft, Search e ScanBarcode
// import { ChevronLeft, Search, ScanBarcode } from 'lucide-react-native'; 
// // import SearchBar from '../../shared/components/SearchBar'; // Removido
// import ProductItem from '../../shared/components/ProductItem';
// import { COLORS } from '../../shared/constants/colors';
// import { Product } from '../../core/types/produtos/index';
// import { useRouter } from 'expo-router'; 


// export default function SearchProductScreen() {
//     const router = useRouter();
//     const [searchQuery, setSearchQuery] = useState('');

//     // const recentProducts: Product[] = [
       
//     // ];

//     const handleSearch = () => {
//         console.log('Search:', searchQuery);
//         // Lógica de pesquisa será acionada pelo toque no ícone Search
//     };

//     const handleBack = () => {
//         router.back(); 
//     };
    
//     const handleProductPress = (product: Product): void => {
//         router.push({
//             pathname: '/verproduto',
//             params: { productId: product.id },
//         }); 
//     };

//     const handleScanBarcode = () => {
//         console.log('Iniciando Scanner de Código de Barras...');
//     };

//     return (
//         <View style={styles.container}>

//             <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//             <View style={styles.header}>
//                 <View style={styles.searchContainer}>

//                     <TouchableOpacity onPress={handleBack}>
//                         <ChevronLeft 
//                             size={30}
//                             color={COLORS.primary}
//                             style={styles.backIcon}
//                         />
//                     </TouchableOpacity>
                    
//                     <View style={styles.searchWrapper}>
                        
//                         <View style={styles.inputWrapper}>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Pesquisar produto, código, etc."
//                                 value={searchQuery}
//                                 onChangeText={setSearchQuery}
//                                 onSubmitEditing={handleSearch} 
//                             />
//                         </View>

//                         <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
//                             <Search
//                                 size={24}
//                                 color={COLORS.primary}
//                             />
//                         </TouchableOpacity>
                        
//                         <TouchableOpacity onPress={handleScanBarcode} style={styles.barcodeButton}>
//                             <ScanBarcode
//                                 size={24}
//                                 color={COLORS.primary}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             {/* <ScrollView style={styles.content}>
//                 <Text style={styles.sectionTitle}>Produtos Recentes:</Text>
//                 {recentProducts.map((product) => (
//                     <ProductItem 
//                         key={product.id} 
//                         product={product} 
//                         onPress={() => handleProductPress(product)}
//                     />
//                 ))}
//             </ScrollView> */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,

//     },
//     header: {
//         paddingTop: 50,
//         paddingBottom: 20,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//     },
//     backIcon: {
//         marginRight: 8,
//     },
//     searchWrapper: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     inputWrapper: {
//         flex: 1,
//         height: 48,
//         borderRadius: 12,
//         borderWidth: 2,
//         borderColor: COLORS.primary,
//         justifyContent: 'center', 
//         paddingHorizontal: 12,
//         marginRight: 8, 
//     },
//     input: {
//         fontSize: 16,
//         color: COLORS.mediumGray,
//         padding: 0, 
//     },
//     searchButton: {
//         padding: 8,
//         marginRight: 4, 
//     },
//     barcodeButton: {
//         padding: 8,
//     },
//     content: {
//         flex: 1,
//     },
//     sectionTitle: {
//         fontSize: 14,
//         color: COLORS.primary, 
//         marginHorizontal: 16,
//         marginTop: 24,
//         marginBottom: 16,
//     },
// });