import React, { JSX, useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Check, Plus } from 'lucide-react-native'; 
import { CustomButton, Header } from '../../shared/components';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/constants';
import { VariantState } from '../../core/types/variantes';

const VariantSelectionItem = ({ variant, onPress }: { variant: VariantState, onPress: () => void }) => (
    <TouchableOpacity style={styles.variantItem} onPress={onPress}>
        <View style={[
            styles.checkbox,
            variant.selected && styles.checkboxSelected,
        ]}>
            {variant.selected && <Check size={18} color={COLORS.white} />}
        </View>
        <Text style={styles.variantText}>{variant.nome}</Text>
    </TouchableOpacity>
);

export default function SelectVariantScreen(): JSX.Element {
    const router = useRouter(); 
    const [variants, setVariants] = useState<VariantState[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // [Carregamento da Lista de Variações - Lógica mantida da resposta anterior]
    useEffect(() => { /* ... fetchVariants ... */ }, []);

    // --- Lógica de Toggle (Seleção Única) ---
    const toggleVariant = useCallback((id: string): void => {
        setVariants(prevVariants =>
            prevVariants.map(variant => {
                if (variant.id === id) {
                    return { ...variant, selected: !variant.selected };
                }
                return { ...variant, selected: false }; // Desmarca os outros
            })
        );
    }, []);

    // --- Lógica de Navegação do "Continuar" ---
    const handleContinue = (): void => {
        const selectedVariant = variants.find(v => v.selected);

        if (!selectedVariant) {
            Alert.alert("Atenção", "Selecione a variação para a qual você irá preencher o valor.");
            return;
        }

        // 🚨 Destino: Próxima tela do Operador (Preenchimento do Valor)
        // router.push(`/operator/select-value?variantId=${selectedVariant.id}`);
    };
    
    // O operador não pode criar novas estruturas.
    const handleAddVariant = (): void => {
        Alert.alert("Permissão Negada", "Operadores não podem criar novas estruturas de variação.");
    };


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Header title="Selecione a Variação" showBack onBackPress={() => router.back()} />
                <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title="Selecione a Variação"
                showBack
                onBackPress={() => router.back()}
            />
            
            <View style={styles.content}>
                {variants.map(variant => (
                    <VariantSelectionItem
                        key={variant.id}
                        variant={variant}
                        onPress={() => toggleVariant(variant.id)}
                    />
                ))}

                <TouchableOpacity 
                    style={styles.addButtonContainer} 
                    onPress={handleAddVariant}
                    disabled={true} 
                >
                    <Plus size={FONT_SIZES.large} color={COLORS.textLight} /> 
                    <Text style={[styles.addText, { color: COLORS.textLight }]}>Add</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <CustomButton
                    title="Continuar" 
                    onPress={handleContinue}
                    variant="primary" 
                    style={styles.continueButton}
                    disabled={!variants.some(v => v.selected)} 
                />
            </View>
        </View>
    );
}

// --- Definição dos Estilos (Styles) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background } as ViewStyle,
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' } as ViewStyle,
    content: {
        flex: 1,
        paddingHorizontal: SPACING.md, 
        paddingVertical: SPACING.md,
    } as ViewStyle,
    footer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    } as ViewStyle,
    continueButton: { 
        width: '100%', 
        backgroundColor: COLORS.primary, // Simulação de estilo do CustomButton
        padding: SPACING.md, 
        borderRadius: 8,
        alignItems: 'center',
    } as ViewStyle,

    // Estilos do Item
    variantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm, 
    } as ViewStyle,
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    } as ViewStyle,
    checkboxSelected: {
        backgroundColor: COLORS.primary, 
        borderColor: COLORS.primary, 
    } as ViewStyle,
    variantText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    } as TextStyle,

    // Estilos do Botão Add
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        marginTop: SPACING.sm,
    } as ViewStyle,
    addText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.primary, 
        fontWeight: 'bold',
        marginLeft: SPACING.xs, 
    } as TextStyle,
});