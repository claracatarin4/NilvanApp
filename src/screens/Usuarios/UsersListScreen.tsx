import { useRouter } from "expo-router";
import React, { JSX, useState } from "react"; 
import { Users } from "../../core/types/users";
import { FlatList, StyleProp, TextInput, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet, Text } from "react-native"; 
import { Header } from "../../shared/components/Header"; 
import { COLORS, FONT_SIZES, SPACING } from "../../shared/constants";
import { Search , ScanBarcode, LucideIcon } from "lucide-react-native"; 
import { UserCard } from "../../shared/components/UserCard"; 

export interface UsersListScreenProps {}

export const UsersListScreen = (): JSX.Element => {

    const router = useRouter(); 
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    const [usersList, setUsersList] = useState<Users[]>([]);

    const mockUsers: Users[] = [
        {
            id: 1,
            name: 'Clara Tavares',
            role: 'Operador',
            imagem: null,
            cargo: "Operador",
            email: "clara@app.com",
            senha: "",
            status: 1 
        },
        {
            id: 2,
            name: 'João Silva',
            role: 'Gerente',
            imagem: null,
            cargo: "Gerente",
            email: "joao@app.com",
            senha: "",
            status: 1
        },
    ];

    React.useEffect(() => {
        setUsersList(mockUsers); 
    }, []);

    const handleUserPress = (user: Users): void => { 
        
        router.push({
            pathname: '/addusers', 
            params: { userId: user.id?.toString() || '0' }, 
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
                 rightIcon={ScanBarcode as LucideIcon} 
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
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                    <UserCard user={item} onPress={() => handleUserPress(item)} />
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
    listContent: {
        paddingTop: SPACING.sm, 
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md * 3,
    } as ViewStyle,
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: 5, 
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border, 
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
});