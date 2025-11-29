import React, { FC, useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Switch, 
    Alert,
    ActivityIndicator,
    ScrollView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '../../shared/components/Header';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/constants';

import CategoriaService, { CategoriaRequestDTO } from '../../shared/service/categoria'; 

interface CategoryFormData {
    nome: string;
    ativo: boolean;
    descricao: string; // Adicionado para ser enviado na requisição
}

export const CategoryFormScreen: FC = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const isEditing = !!id;

    const [formData, setFormData] = useState<CategoryFormData>({
        nome: '',
        ativo: true,
        descricao: '', // Inicializa
    });
    // Corrigido: Inicializa isLoading como true apenas se estiver editando.
    const [isLoading, setIsLoading] = useState<boolean>(isEditing); 
    const [isSaving, setIsSaving] = useState<boolean>(false);
    // Estado para armazenar o número de produtos relacionados (para a infoBox)
    const [produtosRelacionados, setProdutosRelacionados] = useState<number>(0); 

    // 1. Carregamento dos Dados (Modo Edição)
    useEffect(() => {
        if (isEditing && id) {
            const fetchCategory = async () => {
                try {
                    const categoryData = await CategoriaService.getCategoriaById(id);
                    setFormData({
                        nome: categoryData.nome,
                        ativo: categoryData.status === 'ATIVA',
                        descricao: categoryData.descricao || '', // Corrigido: Carrega a descrição
                    });
                    setProdutosRelacionados(categoryData.produtosRelacionados); // Corrigido: Salva o count
                } catch (error) {
                    Alert.alert("Erro de Carga", "Não foi possível carregar os dados da categoria.");
                    router.back();
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCategory();
        } else {
            setIsLoading(false);
        }
    }, [isEditing, id]);

    const handleInputChange = (field: keyof CategoryFormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 2. Lógica de Salvar / Atualizar
    const handleSave = async () => {
        if (!formData.nome.trim()) {
            Alert.alert("Atenção", "O nome da categoria é obrigatório.");
            return;
        }
        // Validação da Descrição (opcional, dependendo da regra de negócio)
        if (!formData.descricao.trim()) {
             Alert.alert("Atenção", "A descrição da categoria é obrigatória.");
             return;
        }

        setIsSaving(true);
        try {
            // Corrigido: Inclui a descrição e totalStock (necessário pelo DTO final)
            const requestData: CategoriaRequestDTO = {
                id: isEditing && id ? id : null, // Incluído na estrutura (mesmo que null na criação)
                nome: formData.nome.trim(),
                descricao: formData.descricao.trim(), 
                totalStock: 0, // Como não é preenchido pelo usuário, setamos um valor padrão.
                status: formData.ativo ? 1 : 0, // Conversão de boolean para 1 ou 0
            };

            if (isEditing && id) {
                // Modo Edição
                await CategoriaService.updateCategoria(id, requestData);
                Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
            } else {
                // Modo Criação
                await CategoriaService.createCategoria(requestData);
                Alert.alert("Sucesso", "Categoria cadastrada com sucesso!");
            }
            
            router.back(); 

        } catch (error) {
            console.error("Erro ao salvar categoria:", error);
            Alert.alert("Erro ao Salvar", "Não foi possível completar a operação. Tente novamente.");
        } finally {
            setIsSaving(false);
        }
    };

    // 3. Renderização Condicional (Carregamento)
    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Header title={isEditing ? "Editar Categoria" : "Cadastrar Categoria"} showBack={true} onBackPress={() => router.back()} />
                <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
            </View>
        );
    }

    const title = isEditing ? "Editar Categoria" : "Cadastrar Categoria";
    const buttonTitle = isEditing ? "Salvar Alterações" : "Criar Categoria";

    return (
        <View style={styles.container}>
            <Header 
                title={title} 
                showBack={true} 
                onBackPress={() => router.back()} 
            />

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Campo Nome */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome da Categoria</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Roupas Femininas"
                        placeholderTextColor={COLORS.textLight}
                        value={formData.nome}
                        onChangeText={(text) => handleInputChange('nome', text)}
                        editable={!isSaving}
                    />
                </View>
                
                {/* Campo Descrição */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]} // Adicionado estilo para área de texto
                        placeholder="Descreva brevemente esta categoria."
                        placeholderTextColor={COLORS.textLight}
                        value={formData.descricao}
                        onChangeText={(text) => handleInputChange('descricao', text)}
                        editable={!isSaving}
                        multiline={true} // Permite múltiplas linhas
                        numberOfLines={4}
                    />
                </View>

                {/* Switch Status */}
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Ativa?</Text>
                    <Switch
                        trackColor={{ false: COLORS.darkGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                        ios_backgroundColor={COLORS.darkGray}
                        onValueChange={(value) => handleInputChange('ativo', value)}
                        value={formData.ativo}
                        disabled={isSaving}
                    />
                </View>
                
                {/* Informação adicional em modo Edição (imagem image_6572c5.png) */}
                {isEditing && (
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            Total de produtos relacionados: <Text style={styles.infoValue}>{produtosRelacionados}</Text> {/* Corrigido: Usa o estado */}
                        </Text>
                    </View>
                )}

            </ScrollView>

            {/* Botão Salvar Fixo no Rodapé */}
           <View style={styles.footer}>
                <CustomButton
                    title={
                        isSaving
                            ? "Salvando..." // Usar um texto temporário durante o salvamento
                            : buttonTitle
                    }
                    onPress={handleSave}
                    variant="secondary"
                    style={styles.saveButton}
                    disabled={isSaving}
                    // REMOVIDO: Conteúdo filho (children) foi removido
                />
                 {/* ADICIONADO: Renderização do ActivityIndicator separadamente,
                     e centralizado sobre o botão se necessário.
                     A maneira mais limpa é usar um botão que aceite um prop 'loading'.
                     Como seu CustomButton não tem 'loading', você pode fazer a renderização
                     do spinner fora do title, mas sem usar children no CustomButton.
                 */}
                {isSaving && (
                    <View style={styles.overlaySpinner}>
                        <ActivityIndicator color={COLORS.white} size="small" />
                    </View>
                )}
            </View>

        </View>
    );
};

// --- ESTILOS (Adicionado estilo para a área de texto) ---
const styles = StyleSheet.create({
    overlaySpinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // Garantir que a área do botão seja o ponto de referência
    // O ideal é adicionar este estilo ao 'saveButton' se o CustomButton permitir, 
    // ou envolver o CustomButton em uma View para posicionamento.
},
    // ... (Estilos existentes)
    input: {
        // ... (Estilos existentes)
    },
    textArea: { // NOVO ESTILO
        minHeight: 100,
        textAlignVertical: 'top', // Para Android
    },
    // ... (Estilos restantes)
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        marginVertical: SPACING.md,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontWeight: '500',
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
    infoBox: {
        backgroundColor: COLORS.lightGray,
        padding: SPACING.md,
        borderRadius: 8,
        marginTop: SPACING.lg,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    infoText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    },
    infoValue: {
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    footer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    saveButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
    },
});

export default CategoryFormScreen;