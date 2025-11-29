import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

// Assumindo que você tem um Header configurado assim
import { Header } from '../../../src/shared/components';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';

// Se você tiver um serviço para variantes
// import VariantService from '../../../shared/service/variants'; 

export const CreateVariantScreen: FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false); // Estado para o Switch (Usuário Ativo?)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSaveVariant = async () => {
        if (!name.trim()) {
            Alert.alert("Erro", "O nome da variante é obrigatório.");
            return;
        }

        setIsLoading(true);
        try {
            // 🚨 Simulação de chamada de API
            console.log("Salvando variante:", { name, description, isActive });
            
            // 🔑 Se você tiver um serviço de variantes, a chamada seria algo assim:
            // await VariantService.createVariant({ name, description, isActive });
            
            // Simular um atraso na rede
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            Alert.alert("Sucesso", "Variante cadastrada com sucesso!");
            router.back(); // Volta para a tela anterior (ex: lista de variantes)

        } catch (error) {
            console.error("Erro ao salvar variante:", error);
            Alert.alert("Erro", "Não foi possível cadastrar a variante. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header 
                title="Cadastrar Variante" 
                showBack={true} 
                onBackPress={() => router.back()} 
            />

            <View style={styles.formContainer}>
                {/* Campo Nome */}
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome da variante"
                    placeholderTextColor={COLORS.textLight}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                {/* Campo Descrição */}
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a descrição da variante"
                    placeholderTextColor={COLORS.textLight}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3} // Sugestão para multiline
                    autoCapitalize="sentences"
                />

                {/* Switch "Usuário Ativo?" */}
                {/* Note: Na imagem parece "Usuário Ativo?", mas para uma variante, talvez "Variante Ativa?" faça mais sentido.
                   Vou manter "Usuário Ativo?" como está na imagem, mas você pode mudar o Label e o estado. */}
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Variante Ativa?</Text> {/* Alterado para "Variante Ativa?" */}
                    <Switch
                        trackColor={{ false: COLORS.darkGray, true: COLORS.primary }}
                        thumbColor={isActive ? COLORS.white : COLORS.lightGray}
                        onValueChange={setIsActive}
                        value={isActive}
                    />
                </View>
            </View>

            {/* Botão Salvar */}
            <View style={styles.saveButtonWrapper}>
                <TouchableOpacity 
                    style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
                    onPress={handleSaveVariant}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    formContainer: {
        flex: 1, // Para ocupar o espaço restante e empurrar o botão para baixo
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        margin: SPACING.md,
        borderRadius: SPACING.sm,
    },
    label: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.xs,
        padding: SPACING.sm,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.white,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    saveButtonWrapper: {
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: SPACING.xs,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, // Altura fixa para o botão
    },
    saveButtonDisabled: {
        backgroundColor: COLORS.primary + '80', // Mais transparente quando desabilitado
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
    },
});

export default CreateVariantScreen;