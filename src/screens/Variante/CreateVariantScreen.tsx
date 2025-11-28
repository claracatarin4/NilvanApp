// Caminho/arquivo: app/InitialVariantScreen.tsx

import React, { JSX } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Plus } from 'lucide-react-native'; 

import { Header } from '../../shared/components/Header';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';


const CURRENT_USER_ROLE = 'ADMIN'; 


export default function CreateVariantScreen(): JSX.Element {
    const router = useRouter(); 

    const isAdmin = CURRENT_USER_ROLE === 'ADMIN';

    // Função que lida com o clique no botão "+ Add Variante"
    const handleAddVariant = (): void => {
        if (isAdmin) {
            console.log('Admin: Carregando..');
            // Navega para a tela de cadastro/edição de estrutura (AdminCreateVariantScreen)
            router.push('/admin/variantes/criarvariacao'); 
        } else {
            // Operador não tem permissão para criar novas variações
            console.log('Carregando...');
            // Navega para a tela de cadastro/edição de estrutura (AdminCreateVariantScreen)
            router.push('/addvariantes'); 
        }
    };

    // Função para o botão "Voltar" no rodapé
    const handleGoBack = (): void => {
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* 1. Header */}
            <Header
                // O título "Cadastrar Variante" sugere a ação de Admin, mas usaremos para ambos
                title="Variantes de Produto"
                showBack
                onBackPress={handleGoBack}
            />
            
            {/* 2. Conteúdo Central (Botão Add Condicional) */}
            <View style={styles.content}>
                {/* Oculta ou Desabilita o botão para o Operador */}
                {isAdmin ? (
                    <TouchableOpacity 
                        style={styles.addVariantButton} 
                        onPress={handleAddVariant}
                    >
                        <View style={styles.addIconContainer}>
                            <Plus size={40} color={COLORS.white} />
                        </View>
                        <Text style={styles.addText}>Add Variante</Text>
                    </TouchableOpacity>
                ) : (
                    // Mensagem simples para o operador, se necessário
                    <Text style={styles.operatorMessage}>
                        Utilize a tela de Seleção de Variação para associar valores aos produtos.
                    </Text>
                )}
            </View>

            {/* 3. Rodapé (Botão Voltar) */}
            <View style={styles.footer}>
                <CustomButton 
                    title="Voltar" 
                    onPress={handleGoBack}
                    variant="secondary" 
                    style={styles.backButton}
                />
            </View>
        </View>
    );
}

// --- Estilos Baseados na Imagem ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,
    
    content: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',    
        padding: SPACING.lg,
    } as ViewStyle,

    // Estilos do botão central
    addVariantButton: {
        alignItems: 'center',
        padding: SPACING.xl,
    } as ViewStyle,

    addIconContainer: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.primary, 
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    } as ViewStyle,

    addText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text, 
        fontWeight: '500',
    } as TextStyle,
    
    // Mensagem para o operador (se o botão estiver oculto)
    operatorMessage: {
        fontSize: FONT_SIZES.large,
        color: COLORS.textLight,
        textAlign: 'center',
        paddingHorizontal: SPACING.xl,
    } as TextStyle,

    // Rodapé
    footer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 40, 
    } as ViewStyle,

    backButton: {
        width: '100%',
    } as ViewStyle,
});