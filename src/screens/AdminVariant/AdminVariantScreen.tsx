import React, { FC, useState, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList, 
    Alert,
    ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Pencil, Trash2, Plus, LucideIcon } from 'lucide-react-native'; 
import VariantService, { } from '../../shared/service/variacao'; // Ajuste o caminho
import { Header } from '../../../src/shared/components';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';
import { VariantDTO } from '../../core/types/variantes';

// --- Tipagem de Item de Lista (adaptada para a tela) ---
interface VariantItem {
    id: number; // A tela espera number
    label: string; 
}


interface VariantListItemProps {
    variant: VariantItem;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const VariantListItem: FC<VariantListItemProps> = ({ variant, onEdit, onDelete }) => {
    return (
        <View style={itemStyles.container}>
            <Text style={itemStyles.label}>{variant.label}</Text>
            
            <View style={itemStyles.actionsContainer}>
                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onEdit(variant.id)}
                >
                    <Pencil size={20} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onDelete(variant.id)}
                >
                    <Trash2 size={20} color={COLORS.warning} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
// ... (itemStyles mantidos) ...
const itemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md + 2,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    label: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        flex: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
});


// --- Tela Principal com API ---

export const AdminVariantScreen: FC = () => {
    const router = useRouter();
    
    const [variantsList, setVariantsList] = useState<VariantItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 🔑 Lógica de Busca de Variantes na API
    const fetchVariants = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 💡 Usando VariantDTO (o retorno real do seu serviço)
            const apiVariants: VariantDTO[] = await VariantService.listVariants();
            
            // Mapeia os dados da API para o formato de Item de Lista
            const formattedList: VariantItem[] = apiVariants.map(v => ({
                // 🚨 CORREÇÃO: Converte ID de string (API) para number (Tela)
                id: Number(v.id),
                // Assumindo que você usa o 'nome' como a label principal
                label: v.nome, 
            }));
            
            setVariantsList(formattedList);
        } catch (err) {
            console.error("Erro ao buscar variantes:", err);
            setError("Não foi possível carregar a lista. Verifique a conexão.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 🔑 Efeito: Recarrega a LISTA sempre que a tela é focada
    useFocusEffect(
        useCallback(() => {
            fetchVariants();
            return () => {};
        }, [fetchVariants])
    );

    // Lógica para Edição
    const handleEdit = useCallback((id: number) => {
        // Navega para a tela de edição, passando o ID
        router.push({
            pathname: '/admin/variantes', 
            params: { variantId: id.toString() } // Passa como string para a rota
        });
    }, [router]);

    // Lógica para Exclusão
    const handleDelete = useCallback((id: number) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta variante? Esta ação é irreversível.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            // 🚨 CORREÇÃO: Converte ID de number (Tela) para string (API)
                            await VariantService.deleteVariant(id.toString()); 
                            
                            // Após a exclusão, recarrega a lista
                            Alert.alert("Sucesso", "Variante excluída.");
                            fetchVariants(); 
                            
                        } catch (e) {
                            console.error("Erro ao deletar variante:", e);
                            Alert.alert("Erro", "Não foi possível excluir a variante.");
                            setIsLoading(false);
                        }
                    }
                },
            ]
        );
    }, [fetchVariants]);

    const handleAddVariant = () => {
        router.push('/../src/screens/AdminVariant/CreateVariantScreen'); 
    }

    // --- Renderização Condicional ---

    if (isLoading && variantsList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando variantes...</Text>
            </View>
        );
    }

    if (error && variantsList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchVariants} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Header 
                title="Variantes" 
                showBack={true} 
                onBackPress={() => router.back()}
                // 🔑 CORREÇÃO: Usando Plus para adicionar novo item
                rightIcon={Plus as LucideIcon} 
                onRightIconPress={handleAddVariant} 
            />

            <FlatList
                data={variantsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <VariantListItem 
                        variant={item} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhuma variante cadastrada.</Text>
                )}
            />
        </View>
    );
};

// ... (Styles e Export Default mantidos) ...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        paddingTop: SPACING.sm,
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
    emptyText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        textAlign: 'center',
        marginTop: SPACING.lg,
    },
});

export default AdminVariantScreen;