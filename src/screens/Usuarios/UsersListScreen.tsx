import { useRouter } from "expo-router";
import React, { JSX, useState } from "react"; 
import { UserResponse, Users } from "../../core/types/users"; 
import { 
    FlatList, 
    StyleProp, 
    TextInput, 
    TextStyle, 
    TouchableOpacity, 
    View, 
    ViewStyle, 
    StyleSheet, 
    Text,
    ActivityIndicator, 
    Alert 
} from "react-native"; 
import { Header } from "../../shared/components/Header"; 
import { COLORS, FONT_SIZES, SPACING } from "../../shared/constants";
import { Search , ScanBarcode, LucideIcon } from "lucide-react-native"; 
import { UserCard } from "../../shared/components/UserCard"; 

import UserService from "../../shared/service/usuarios/index"; 

export interface UsersListScreenProps {}

interface StyleProps {
    container: ViewStyle;
    listContent: ViewStyle;
    searchContainer: ViewStyle;
    searchIcon: ViewStyle;
    searchInput: TextStyle;
    centerContent: ViewStyle;
    loadingText: TextStyle;
    errorText: TextStyle;
    emptyText: TextStyle;
    retryButton: ViewStyle;
    retryButtonText: TextStyle;
}


export const UsersListScreen = (): JSX.Element => {

    const router = useRouter(); 
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    const [usersList, setUsersList] = useState<UserResponse[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const users = await UserService.listUsers();
            setUsersList(users);
        } catch (err) {
            console.error("Erro ao buscar usuários:", err);
            setError("Não foi possível carregar a lista de usuários. Verifique suas permissões.");
            Alert.alert("Erro de API", "Não foi possível carregar a lista de usuários.");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserPress = (user: UserResponse): void => { 
        router.push({
            pathname: '/addusers', 
            params: { userId: user.id.toString() }, 
        }); 
    };

    const handleSearchPress = (): void => {
        router.push('/pesquisa'); 
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}> 
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando usuários...</Text>
            </View>
        );
    }

    if (error) {
          return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchUsers} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }
        
    return (
        <View style={styles.container}>
             <Header
                 showProfile 
                 userName="Clara Catarina"
                 userRole="UX/UI Designer"
                 userImage="https://via.placeholder.com/40"
                 rightIcon={Search as LucideIcon} 
                 onRightIconPress={() => console.log('Notificações')}
             />
            
             <TouchableOpacity 
                 style={styles.searchContainer as StyleProp<ViewStyle>}
                 onPress={handleSearchPress}
                 activeOpacity={0.8}
             >
                 <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
                 
                 <TextInput
                     style={styles.searchInput as StyleProp<TextStyle>}
                     placeholder="Pesquisar Usuário" 
                     placeholderTextColor={COLORS.textLight}
                     value={searchQuery}
                     editable={false} 
                 />
             </TouchableOpacity>

             <FlatList
                 data={usersList} 
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({ item }) => {
                     
                     const cardUser: Users = {
                         id: item.id,
                         name: item.nome, 
                         role: item.role, 
                         email: item.email,
                         senha: '', 
                         imagem: null, 
                         cargo: item.cargo || '', 
                         status: item.status || 1
                     };
                     
                     return <UserCard user={cardUser} onPress={() => handleUserPress(item)} />;
                 }}
                 contentContainerStyle={styles.listContent as StyleProp<ViewStyle>}
                 showsVerticalScrollIndicator={false}
                 ListEmptyComponent={() => (
                     <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
                 )}
             />
        </View>
    );
};

const styles: StyleProps = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        paddingTop: SPACING.sm, 
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md * 3,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: 5, 
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border, 
    },
    searchIcon: {
        marginRight: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    },
    
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.primary,
    },
    errorText: {
        fontSize: FONT_SIZES.large,
        color: COLORS.warning,
        textAlign: 'center',
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.md * 2,
    },
    emptyText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        textAlign: 'center',
        marginTop: SPACING.lg,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: 8,
    },
    retryButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
    },
}) as StyleProps;