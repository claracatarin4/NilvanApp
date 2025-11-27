import { useRouter } from "expo-router";
// 🔑 Adicionado useEffect e useFocusEffect (necessita de @react-navigation/native)
import React, { JSX, useState, useCallback, useEffect } from "react"; 
import { useFocusEffect } from "@react-navigation/native";
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
import { Search , Plus, LucideIcon } from "lucide-react-native"; 
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

    // 🔑 NOVO ESTADO: Para armazenar os dados do usuário logado
    const [loggedUser, setLoggedUser] = useState<UserResponse | null>(null);

    // --- LÓGICA DE BUSCA DA LISTA DE USUÁRIOS ---
    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const users = await UserService.listUsers();
            setUsersList(users);
        } catch (err) {
            console.error("Erro ao buscar usuários:", err);
            setError("Não foi possível carregar a lista. Verifique a conexão.");
            Alert.alert("Erro de API", "Não foi possível carregar a lista de usuários.");
        } finally {
            setIsLoading(false);
        }
    }, []); 

    // --- LÓGICA DE BUSCA DO PERFIL LOGADO ---
    const fetchLoggedUser = useCallback(async () => {
        try {
            const userProfile = await UserService.getLoggedUser();
            setLoggedUser(userProfile);
        } catch (err) {
            console.error("Erro ao buscar perfil:", err);
            // Opcional: Tratar erro de token aqui
        }
    }, []);

    // 🔑 Efeito 1: Busca o perfil APENAS na montagem inicial
    useEffect(() => {
        fetchLoggedUser();
    }, [fetchLoggedUser]);


    // 🔑 Efeito 2: Recarrega a LISTA de usuários sempre que a tela é focada (navegação)
    useFocusEffect(
        useCallback(() => {
            fetchUsers();
            return () => {};
        }, [fetchUsers])
    );
    
    // --- HANDLERS DE NAVEGAÇÃO ---

    const handleUserPress = (user: UserResponse): void => { 
        router.push({
            pathname: '/addusers', 
            params: { userId: user.id.toString() }, 
        }); 
    };

    const handleSearchPress = (): void => {
        router.push('/pesquisa'); 
    };
    
    const handleAddUser = (): void => {
        router.push('/addusers'); 
    };


    // --- RENDERIZAÇÃO CONDICIONAL (Loading/Erro) ---

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
                // 🔑 Agora, 'loggedUser' está definido e pode ser acessado com segurança
                userName={loggedUser?.nome || "Carregando..."} 
                userRole={loggedUser?.cargo || "Visitante"} 
                
                rightIcon={Plus as LucideIcon} 
                onRightIconPress={handleAddUser}
            />
            
            <TouchableOpacity 
                style={styles.searchContainer} 
                onPress={handleSearchPress}
                activeOpacity={0.8}
            >
                <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
                
                <TextInput
                    style={styles.searchInput} 
                    placeholder="Pesquisar Usuário (Clique para ir)" 
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


// ... (Estilos mantidos e tipados corretamente)
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