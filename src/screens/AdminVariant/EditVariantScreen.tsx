// /screens/variantes/EditVariantScreen.tsx

import React, { FC, useState, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Switch, 
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { useFocusEffect } from '@react-navigation/native'; 

// 🔑 IMPORTAÇÕES CORRIGIDAS: Garantindo acesso ao Serviço e aos DTOs
import VariantService, {  } from '../../shared/service/variacao'; 
import { Header } from '../../../src/shared/components/Header';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';
import { CreateVariantDTO, VariantDTO } from '../../core/types/variantes';

// --- Tipagem do Estado do Formulário ---
interface VariantFormData {
    id: string; 
    nome: string;
    descricao: string;
    status: boolean; 
}

export const EditVariantScreen: FC = () => {
    const router = useRouter();
    const { id: variantIdParam } = useLocalSearchParams();
    const variantId = Array.isArray(variantIdParam) ? variantIdParam[0] : variantIdParam;

    const [formData, setFormData] = useState<VariantFormData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // 1. Lógica de Carregamento dos Dados
    const fetchVariantDetails = useCallback(async () => {
        if (!variantId) {
            setError("ID da variante não fornecido.");
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const variant: VariantDTO = await VariantService.getVariantById(variantId);
            
            setFormData({
                id: variant.id,
                nome: variant.nome,
                descricao: variant.descricao || '',
                status: variant.status === 1,
            });
        } catch (err) {
            console.error("Erro ao carregar detalhes da variante:", err);
            setError("Não foi possível carregar os dados da variante.");
        } finally {
            setIsLoading(false);
        }
    }, [variantId]);

    useFocusEffect(
        useCallback(() => {
            fetchVariantDetails();
            return () => {};
        }, [fetchVariantDetails])
    );


    // 2. Lógica de Input e Salvar
    const handleInputChange = (field: keyof VariantFormData, value: string | boolean) => {
        if (formData) {
            setFormData(prev => ({
                ...prev!,
                [field]: value
            }));
        }
    };

    const handleSave = async () => {
        if (!formData || !formData.nome.trim()) {
            Alert.alert("Atenção", "O campo Nome é obrigatório.");
            return;
        }

        setIsSaving(true);
        try {
            // Usando Partial<CreateVariantDTO> para o payload de atualização, conforme corrigido no serviço.
            const updateData: Partial<CreateVariantDTO> = {
                nome: formData.nome.trim(),
                descricao: formData.descricao.trim() || undefined,
                status: formData.status ? 1 : 0, 
            };

            const updatedVariant: VariantDTO = await VariantService.updateVariant(formData.id, updateData);
            
            Alert.alert("Sucesso", `Variante "${updatedVariant.nome}" atualizada!`);
            
            router.back(); 

        } catch (error) {
            console.error("Erro ao atualizar variante:", error);
            Alert.alert("Erro ao Salvar", "Não foi possível atualizar a variante. Tente novamente.");
        } finally {
            setIsSaving(false);
        }
    };
    
    // 3. Renderização
    if (isLoading || !formData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Header title="Editar Variante" showBack={true} onBackPress={() => router.back()} />
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Header title="Editar Variante" showBack={true} onBackPress={() => router.back()} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchVariantDetails} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Recarregar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header 
                title={`Editar Variante: ${formData.nome}`} 
                showBack={true} 
                onBackPress={() => router.back()} 
            />

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Campo Nome */}
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome da Variante"
                    placeholderTextColor={COLORS.textLight}
                    value={formData.nome}
                    onChangeText={(text) => handleInputChange('nome', text)}
                    editable={!isSaving}
                />

                {/* Campo Descrição */}
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descrição opcional"
                    placeholderTextColor={COLORS.textLight}
                    value={formData.descricao}
                    onChangeText={(text) => handleInputChange('descricao', text)}
                    editable={!isSaving}
                />

                {/* Switch Ativo */}
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Variante Ativa?</Text>
                    <Switch
                        trackColor={{ false: COLORS.darkGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                        ios_backgroundColor={COLORS.darkGray}
                        onValueChange={(value) => handleInputChange('status', value)}
                        value={formData.status}
                        disabled={isSaving}
                    />
                </View>

            </ScrollView>

            {/* Botão Salvar Fixo no Rodapé */}
            <TouchableOpacity 
                style={[styles.saveButton, isSaving && { opacity: 0.7 }]} 
                onPress={handleSave}
                disabled={isSaving}
            >
                {isSaving ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                )}
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.md,
    },
    scrollContent: {
        paddingVertical: SPACING.lg,
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
    label: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontWeight: '500',
        marginTop: SPACING.sm,
    },
    input: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderRadius: 8,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        marginTop: SPACING.md,
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    switchLabel: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md + 5,
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.md,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
    },
});

export default EditVariantScreen;