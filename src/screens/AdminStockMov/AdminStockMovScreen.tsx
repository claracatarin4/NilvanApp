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
import { Pencil, Trash2 } from 'lucide-react-native';

import MovimentacaoEstoqueService, { 
    MovimentacaoEstoqueDTO 
} from '../../../src/shared/service/movimentacao-estoque'; 
import { Header } from '../../../src/shared/components';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';

interface MovementItem {
    id: number;
    titulo: string; // Ex: "Estoque 1"
    tipo: string; // Ex: "ENTRADA" ou "SAIDA"
    data: string; // Ex: "03/01/2024"
    usuario: string; // Ex: "Ivan Santanna Jr" (CAMPO SIMULADO/ADAPTADO)
}

// --- Componente de Item da Lista (Mantido) ---
interface MovementListItemProps {
    movement: MovementItem;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const MovementListItem: FC<MovementListItemProps> = ({ movement, onEdit, onDelete }) => {
    return (
        <View style={itemStyles.container}>
            <View style={itemStyles.textContainer}>
                {/* O título do item, como "Estoque 1" ou "Estoque 2" */}
                <Text style={itemStyles.title}>{movement.titulo}</Text>
                
                {/* Detalhes: Tipo, Data, Usuário */}
                <View style={itemStyles.detailRow}>
                    <Text style={itemStyles.detailLabel}>Tipo</Text>
                    {/* Exibe o tipo de movimentação (ENTRADA/SAÍDA) */}
                    <Text style={itemStyles.detailText}>{movement.tipo}</Text>
                </View>
                <View style={itemStyles.detailRow}>
                    {/* Exibe a data, como "03/01/2024" */}
                    <Text style={itemStyles.detailLabel}>{movement.data}</Text> 
                </View>
                <View style={itemStyles.detailRow}>
                    {/* Exibe o usuário, como "Ivan Santanna Jr" */}
                    <Text style={itemStyles.detailLabel}>{movement.usuario}</Text>
                </View>
            </View>
            
            <View style={itemStyles.actionsContainer}>
                {/* Ícone de Edição (Lápis) */}
                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onEdit(movement.id)}
                >
                    <Pencil size={20} color={COLORS.primary} />
                </TouchableOpacity>

                {/* Ícone de Exclusão (Lixeira) */}
                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onDelete(movement.id)}
                >
                    <Trash2 size={20} color={COLORS.warning} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    textContainer: {
        flex: 1,
        marginRight: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs / 2,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        marginRight: SPACING.xs,
    },
    detailText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
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

export const AdminStockMovScreen: FC = () => {
    const router = useRouter();
    
    const [movementsList, setMovementsList] = useState<MovementItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 🔑 Lógica de Busca de Movimentações na API
    const fetchMovements = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 💡 Chama o método listMovimentacoes do serviço
            const apiMovements: MovimentacaoEstoqueDTO[] = await MovimentacaoEstoqueService.listMovimentacoes();
            
            // 🔑 Mapeamento de MovimentacaoEstoqueDTO para MovementItem
            const formattedList: MovementItem[] = apiMovements.map(m => ({
                // 🚨 Converte ID de string (API) para number (Tela)
                id: Number(m.id), 
                // Usa a observação como título, senão gera um título padrão
                titulo: m.observacao || `Movimentação ${m.id.substring(0, 4)}`, 
                tipo: m.tipo,
                // Adapta dataMovimentacao (Timestamp) para o formato '03/01/2024'
                data: new Date(m.dataMovimentacao).toLocaleDateString('pt-BR'), 
                // ⚠️ CAMPO ADAPTADO: A DTO não tem o nome do usuário.
                // Aqui você deve buscar essa informação, ou seu backend deve fornecê-la.
                // MOCKANDO: Usando um nome fixo para visualização.
                usuario: "Ivan Santanna Jr", 
            }));
            
            setMovementsList(formattedList);
        } catch (err) {
            console.error("Erro ao buscar movimentações:", err);
            setError("Não foi possível carregar a lista de movimentações. Verifique a conexão.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 🔑 Efeito: Recarrega a LISTA sempre que a tela é focada
    useFocusEffect(
        useCallback(() => {
            fetchMovements();
            return () => {};
        }, [fetchMovements])
    );

    // Lógica para Edição
    const handleEdit = useCallback((id: number) => {
        // Navega para a tela de edição
        router.push({
            // 🚨 Rota corrigida para a navegação relativa (se você estiver usando Expo Router)
            pathname: '../src/screens/AdminStockMov/EditStockScreen', 
            params: { movementId: id.toString() }
        });
    }, [router]);

    // Lógica para Exclusão
    const handleDelete = useCallback((id: number) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta movimentação? Esta ação é irreversível.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            // 💡 Chama o método deleteMovimentacao do serviço
                            // 🚨 Converte ID de number (Tela) para string (API)
                            await MovimentacaoEstoqueService.deleteMovimentacao(id.toString());
                            
                            Alert.alert("Sucesso", "Movimentação excluída.");
                            // Recarrega a lista
                            fetchMovements(); 
                            
                        } catch (e) {
                            console.error("Erro ao deletar movimentação:", e);
                            Alert.alert("Erro", "Não foi possível excluir a movimentação.");
                            setIsLoading(false);
                        }
                    }
                },
            ]
        );
    }, [fetchMovements]);

    // --- Renderização Condicional ---

    if (isLoading && movementsList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando movimentações...</Text>
            </View>
        );
    }

    if (error && movementsList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchMovements} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header 
                title="Movimentação Estoque" 
                showBack={true} 
                onBackPress={() => router.back()}
            />

            <FlatList
                data={movementsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovementListItem 
                        movement={item} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhuma movimentação encontrada.</Text>
                )}
            />
        </View>
    );
};

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

export default AdminStockMovScreen;