import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native'; 
import { ChevronLeft, LogOut, LucideIcon } from 'lucide-react-native';
import { Header } from '../../../src/shared/components/Header';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';
import { UserResponse } from '../../../src/core/types/users';
import UserService from '../../shared/service/usuarios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

interface ProfileOption {
    id: string;
    label: string;
    route: string; // Rota para onde navegar (URI do Expo Router)
    icon?: LucideIcon;
    isLogout?: boolean;
}

export const ProfileAdminScreen: FC = () => {
    const router = useRouter();
    const [loggedUser, setLoggedUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar o perfil do usuário logado
    const fetchLoggedUser = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Assumindo que UserService.getLoggedUser() lida com o token e retorna o perfil
            const userProfile = await UserService.getLoggedUser();
            setLoggedUser(userProfile);
        } catch (err) {
            console.error("Erro ao buscar perfil do usuário:", err);
            setError("Não foi possível carregar o perfil. Faça login novamente.");
            Alert.alert("Erro", "Não foi possível carregar seu perfil. Sua sessão pode ter expirado.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Carregar o perfil quando a tela for focada
    useFocusEffect(
        useCallback(() => {
            fetchLoggedUser();
            return () => {};
        }, [fetchLoggedUser])
    );

    const handleLogout = async () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('userToken');
                            // AJUSTADO: Rota de login
                            router.replace('/auth/Login'); 
                        } catch (e) {
                            console.error("Erro ao remover token:", e);
                            Alert.alert("Erro", "Não foi possível realizar o logout.");
                        }
                    },
                    style: 'destructive' 
                },
            ]
        );
    };

    const handleOptionPress = (option: ProfileOption) => {
        if (option.isLogout) {
            handleLogout();
        } else {
            // 🔑 CORREÇÃO APLICADA: Usa a rota definida na opção para navegação
            // Assumindo que as strings de rota são válidas (ex: '/variants')
            router.push("/auth/Login"); 
        }
    };

    // ROTAS AJUSTADAS: Mantidas as rotas simplificadas
    const menuOptions: ProfileOption[] = [
        
        { id: '1', label: 'Usuários', route: '/AdminUsuario/AdminUserListScreen' }, 
        { id: '2', label: 'Editar Perfil', route: '/AdminPerfil/EditScreen' },
        { id: '3', label: 'Estoque', route: '/AdminStock/AdminStockScreen' },
        { id: '4', label: 'Movimentação Estoque', route: '/AdminStockMov' }, 
        { id: '5', label: 'Variantes', route: '/variants' },
        { id: '6', label: 'Sair', route: '', isLogout: true, icon: LogOut },
    ];

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando perfil...</Text>
            </View>
        );
    }

    if (error || !loggedUser) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error || "Perfil não disponível."}</Text>
                <TouchableOpacity onPress={fetchLoggedUser} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Recarregar Perfil</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header 
                title="Meu Perfil" 
                showBack={true} 
                onBackPress={() => router.back()} 
            />

            <View style={styles.profileInfoContainer}>
                <Image 
                    source={{ uri: loggedUser.imagem || "https://via.placeholder.com/150" }} 
                    style={styles.profileImage} 
                />
                <Text style={styles.userName}>{loggedUser.nome}</Text>
                <Text style={styles.userRole}>{loggedUser.cargo}</Text>
            </View>

            <View style={styles.optionsContainer}>
                {menuOptions.map(option => (
                    <TouchableOpacity 
                        key={option.id} 
                        style={[styles.optionItem, option.id === '6' && { borderBottomWidth: 0 }]} 
                        onPress={() => handleOptionPress(option)}
                    >
                        <Text style={[styles.optionLabel, option.isLogout && styles.logoutText]}>
                            {option.label}
                        </Text>
                        {option.isLogout && <LogOut size={20} color={COLORS.warning} />}
                        {!option.isLogout && <ChevronLeft size={20} color={COLORS.textLight} style={{transform: [{ rotate: '180deg'}]}} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

// ... (Estilos continuam inalterados) ...

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centerContent: {
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
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: 8,
        marginTop: SPACING.md,
    },
    retryButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
    },
    profileInfoContainer: {
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        marginBottom: SPACING.md,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginBottom: SPACING.sm,
    },
    userName: {
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userRole: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        marginTop: SPACING.xs,
    },
    optionsContainer: {
        backgroundColor: COLORS.white,
        borderRadius: SPACING.sm,
        marginHorizontal: SPACING.md,
        overflow: 'hidden',
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    optionLabel: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    },
    logoutText: {
        color: COLORS.warning,
        fontWeight: 'bold',
    },
});

export default ProfileAdminScreen;