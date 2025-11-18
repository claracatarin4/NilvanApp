// import { useRouter } from "expo-router";
// import React, { JSX, useState } from "react"; 
// // Certifique-se de que a importação abaixo inclui a tipagem correta para o UserCard
// import { UserResponse, Users } from "../../core/types/users"; 
// import { 
//     FlatList, 
//     StyleProp, 
//     TextInput, 
//     TextStyle, 
//     TouchableOpacity, 
//     View, 
//     ViewStyle, 
//     StyleSheet, 
//     Text,
//     ActivityIndicator, 
//     Alert 
// } from "react-native"; 
// import { Header } from "../../shared/components/Header"; 
// import { COLORS, FONT_SIZES, SPACING } from "../../shared/constants";
// import { Search , ScanBarcode, LucideIcon } from "lucide-react-native"; 
// import { UserCard } from "../../shared/components/UserCard"; 

// import UserService from "../../services/UserService"; 

// export interface UsersListScreenProps {}

// // Tipagem unificada para o objeto de estilos
// interface StyleProps {
//     container: ViewStyle;
//     listContent: ViewStyle;
//     searchContainer: ViewStyle;
//     searchIcon: ViewStyle;
//     searchInput: TextStyle;
//     // Tipos de estilo que faltavam e causavam o erro TS2339
//     centerContent: ViewStyle;
//     loadingText: TextStyle;
//     errorText: TextStyle;
//     emptyText: TextStyle;
//     retryButton: ViewStyle;
//     retryButtonText: TextStyle;
// }


// export const UsersListScreen = (): JSX.Element => {

//     const router = useRouter(); 
//     const [searchQuery, setSearchQuery] = useState<string>('');
    
//     // Estado que recebe os dados do banco (UserResponse)
//     const [usersList, setUsersList] = useState<UserResponse[]>([]);
    
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchUsers = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const users = await UserService.listUsers();
//             setUsersList(users);
//         } catch (err) {
//             console.error("Erro ao buscar usuários:", err);
//             setError("Não foi possível carregar a lista de usuários. Verifique suas permissões.");
//             Alert.alert("Erro de API", "Não foi possível carregar a lista de usuários.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     React.useEffect(() => {
//         fetchUsers();
//     }, []);

//     // --- CORREÇÃO DE TIPAGEM PARA O UserCard ---
//     // O erro TS2739 indica que a interface UserResponse da API não corresponde à interface Users esperada pelo UserCard.
//     // A solução mais limpa é criar uma função que mapeia UserResponse para o formato esperado (Users) 
//     // ou, preferencialmente, corrigir a tipagem interna do UserCard para aceitar UserResponse.
    
//     // Assumindo que o UserCard usa campos como 'name', 'role' e 'imagem', que não existem em UserResponse, 
//     // faremos um pequeno 'cast' na renderização do FlatList.

//     const handleUserPress = (user: UserResponse): void => { 
//         router.push({
//             pathname: '/addusers', 
//             params: { userId: user.id.toString() }, 
//         }); 
//     };

//     const handleSearchPress = (): void => {
//         router.push('/pesquisa'); 
//     };

//     if (isLoading) {
//         return (
//             // Agora 'centerContent' existe nos estilos
//             <View style={[styles.container, styles.centerContent]}> 
//                 <ActivityIndicator size="large" color={COLORS.primary} />
//                 <Text style={styles.loadingText}>Carregando usuários...</Text>
//             </View>
//         );
//     }

//     if (error) {
//          return (
//             <View style={[styles.container, styles.centerContent]}>
//                 <Text style={styles.errorText}>{error}</Text>
//                 <TouchableOpacity onPress={fetchUsers} style={styles.retryButton}>
//                     <Text style={styles.retryButtonText}>Tentar Novamente</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
        
//     return (
//         <View style={styles.container}>
//              <Header
//                  showProfile 
//                  userName="Clara Catarina"
//                  userRole="UX/UI Designer"
//                  userImage="https://via.placeholder.com/40"
//                  rightIcon={ScanBarcode as LucideIcon} 
//                  onRightIconPress={() => console.log('Notificações')}
//              />
            
//              <TouchableOpacity 
//                  style={styles.searchContainer as StyleProp<ViewStyle>}
//                  onPress={handleSearchPress}
//                  activeOpacity={0.8}
//              >
//                  <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
                 
//                  <TextInput
//                      style={styles.searchInput as StyleProp<TextStyle>}
//                      placeholder="Pesquisar Usuário" 
//                      placeholderTextColor={COLORS.textLight}
//                      value={searchQuery}
//                      editable={false} 
//                  />
//              </TouchableOpacity>

//              <FlatList
//                  data={usersList} 
//                  keyExtractor={(item) => item.id.toString()}
//                  renderItem={({ item }) => {
                     
//                      const cardUser: Users = {
//                          id: item.id,
//                          name: item.nome, 
//                          role: item.role, 
//                          email: item.email,
//                          senha: '', 
//                          imagem: item.imagem || null, 
//                          cargo: item.cargo || '', 
//                          status: item.status || 1
//                      };
                     
//                      return <UserCard user={cardUser} onPress={() => handleUserPress(item)} />;
//                  }}
//                  contentContainerStyle={styles.listContent as StyleProp<ViewStyle>}
//                  showsVerticalScrollIndicator={false}
//                  ListEmptyComponent={() => (
//                      <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
//                  )}
//              />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.background,
//     } as ViewStyle,
//     listContent: {
//         paddingTop: SPACING.sm, 
//         paddingHorizontal: SPACING.md,
//         paddingBottom: SPACING.md * 3,
//     } as ViewStyle,
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginHorizontal: SPACING.md,
//         marginVertical: SPACING.md,
//         paddingHorizontal: SPACING.md,
//         paddingVertical: 5, 
//         borderBottomWidth: 1,
//         borderBottomColor: COLORS.border, 
//     } as ViewStyle,
//     searchIcon: {
//         marginRight: SPACING.sm,
//     } as ViewStyle,
//     searchInput: {
//         flex: 1,
//         paddingVertical: SPACING.md,
//         fontSize: FONT_SIZES.medium,
//         color: COLORS.text,
//     } as TextStyle,
// });