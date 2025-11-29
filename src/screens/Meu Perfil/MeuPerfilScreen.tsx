import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Assuma que este é o arquivo com a lista de itens:
import { menuItems } from '../../data/menuOptions'; 

// --- Simulação do Contexto/Estado do Usuário ---
// Em um app real, o cargo seria obtido do estado global ou de um hook de autenticação.
const useAuth = () => {
    // 🚨 SUBSTITUA esta lógica de simulação pela sua lógica real de autenticação!
    // Exemplo: Simular um Admin
    // const userRole = 'Admin'; 

    // Exemplo: Simular um Operador
    const userRole = 'Operador'; 

    const user = { 
        name: 'Ivan Santana Jr.',
        role: userRole,
    };
    const logout = () => { console.log("Usuário deslogado."); }; // Função de logout
    return { user, logout };
};
// -------------------------------------------------

const MeuPerfilScreen: React.FC = () => {
    const { user, logout } = useAuth();
    const navigation = useNavigation();

    // LÓGICA PRINCIPAL: Filtra as opções de menu
    const filteredMenuItems = menuItems.filter(item => {
        const role = user.role;
        return item.requiredRole === 'Ambos' || item.requiredRole === role;
    });

    // Função de clique genérica para navegação
    const handleItemPress = (screenName: string) => {
        // Navega para a tela configurada no array de menuItems
        navigation.navigate(screenName as never);
    };

    const renderMenuItem = (item: typeof menuItems[0]) => (
        <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem} 
            onPress={() => handleItemPress(item.screenName)}
        >
            <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* --- Seção do Avatar e Informações (Como nas suas imagens) --- */}
            {/* ... Seu código para o avatar, nome e cargo ... */}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role}</Text>
            
            <View style={styles.menuContainer}>
                {/* --- Renderização Condicional --- */}
                {filteredMenuItems.map(renderMenuItem)}

                {/* --- Opção de Sair (Tratada Separadamente) --- */}
                <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={logout}>
                    <Text style={styles.logoutText}>Sair →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    name: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
    role: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
    menuContainer: { borderTopWidth: 1, borderTopColor: '#eee', marginTop: 20 },
    menuItem: { paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    menuText: { fontSize: 16, color: '#333' },
    logoutItem: { marginTop: 10 },
    logoutText: { fontSize: 16, color: 'red' },
    // Adicione mais estilos conforme necessário (Avatar, etc.)
});

export default MeuPerfilScreen;