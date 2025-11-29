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

// --- Importação de Tipos e Serviços ---
// Importa o serviço de estoque
import EstoqueService, { EstoqueDTO } from '../../shared/service/estoque'; 
import { Header } from '../../../src/shared/components/Header';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';

// --- Tipagem de Item de Lista (Mock para exibição) ---
export interface StockListItem {
    id: string;          // ID do registro de Estoque
    label: string;       // Combinação da variante e produto (Ex: "Cor: Vermelho")
    quantity: number;    // Saldo atual
    statusColor: string; // Cor baseada na quantidade (Vermelho, Amarelo, Verde)
}

interface StockListItemProps {
    stock: StockListItem;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

// Componente para renderizar cada item de estoque
const StockListItemComponent: FC<StockListItemProps> = ({ stock, onEdit, onDelete }) => {
    return (
        <View style={itemStyles.container}>
            <View style={itemStyles.infoContainer}>
                <Text style={itemStyles.label}>{stock.label}</Text>
                {/* 🔑 Quantidade exibida com a cor do status */}
                <Text style={[itemStyles.quantity, { color: stock.statusColor }]}>
                    {stock.quantity}
                </Text>
            </View>
            
            <View style={itemStyles.actionsContainer}>
                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onEdit(stock.id)}
                >
                    <Pencil size={20} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onDelete(stock.id)}
                >
                    <Trash2 size={20} color={COLORS.warning} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para o componente de Item
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
    infoContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    label: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        fontWeight: '500',
    },
    quantity: {
        fontSize: FONT_SIZES.large,
        fontWeight: 'bold',
        marginTop: SPACING.xs / 2,
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

// --- Função Auxiliar de Mapeamento e Status ---

/**
 * Define a cor do status baseado na quantidade.
 * @param quantity Quantidade em estoque.
 * @returns Cor (string) para o texto.
 */
const getStatusColor = (quantity: number): string => {
    if (quantity <= 0) return COLORS.warning; // Vermelho para esgotado
    if (quantity < 50) return COLORS.primary;  // Amarelo para limitado (mock de 50)
    return COLORS.primary; // Verde para disponível
};

/**
 * Simula a busca do nome do produto/variante, já que o EstoqueDTO só tem o produtoId.
 * Em um cenário real, você faria uma chamada para o ProductService ou VariantService.
 * @param id ID do produto ou variação.
 * @param index Índice do item na lista.
 * @returns Um label mockado.
 */
const getMockLabel = (id: string, index: number): string => {
    // Mockando para simular a saída da imagem (Cor: Vermelho, Cor: Azul Marinho, Cor: Roxo)
    const mockLabels = [
        "Cor: Vermelho",
        "Cor: Azul Marinho",
        "Cor: Roxo",
        "Cor: Preto",
        "Tamanho: G",
    ];
    return mockLabels[index % mockLabels.length] || `Produto/Var. ID: ${id}`;
};


// --- Tela Principal: AdminStockScreen ---

export const AdminStockScreen: FC = () => {
    const router = useRouter();
    
    const [stockList, setStockList] = useState<StockListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 🔑 Lógica de Busca de Estoques na API
    const fetchEstoques = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const apiEstoques: EstoqueDTO[] = await EstoqueService.listEstoques();
            
            // Mapeia os dados da API para o formato de Item de Lista
            const formattedList: StockListItem[] = apiEstoques.map((e, index) => ({
                id: e.id,
                // Usando mock para o label
                label: getMockLabel(e.produtoId, index), 
                quantity: e.quantidadeAtual,
                statusColor: getStatusColor(e.quantidadeAtual),
            }));
            
            setStockList(formattedList);
        } catch (err) {
            console.error("Erro ao buscar estoques:", err);
            setError("Não foi possível carregar o saldo de estoque. Verifique a conexão.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 🔑 Efeito: Recarrega a LISTA sempre que a tela é focada
    useFocusEffect(
        useCallback(() => {
            fetchEstoques();
            return () => {};
        }, [fetchEstoques])
    );

    // Lógica para Edição (Navega para a tela de Edição/Movimentação)
    const handleEdit = useCallback((id: string) => {
        // Geralmente, editar o estoque significa editar as informações do registro (localização)
        // ou criar uma movimentação (entrada/saída). Vamos navegar para uma tela de edição.
        router.push({
            pathname: '/../src/screens/AdminStock/EditStockItem', // Ajuste para a rota correta
            params: { stockId: id }
        });
    }, [router]);

    // Lógica para Exclusão
    const handleDelete = useCallback((id: string) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja apagar este registro de estoque? Isso pode afetar o histórico.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Apagar", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            await EstoqueService.deleteEstoque(id);
                            
                            Alert.alert("Sucesso", "Registro de estoque apagado.");
                            fetchEstoques(); // Recarrega a lista
                            
                        } catch (e) {
                            console.error("Erro ao apagar registro de estoque:", e);
                            Alert.alert("Erro", "Não foi possível apagar o registro.");
                            setIsLoading(false);
                        }
                    }
                },
            ]
        );
    }, [fetchEstoques]);

    // Lógica para Adicionar (Geralmente leva à tela de Adicionar Produto ou Movimentação Inicial)
    const handleAddStock = () => {
        // Vamos navegar para a tela de criação de movimentação (Entrada Inicial)
        router.push('/../src/screens/AdminStock/CreateStockScreen'); 
    }


    // --- Renderização Condicional ---

    if (isLoading && stockList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando saldos de estoque...</Text>
            </View>
        );
    }

    if (error && stockList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchEstoques} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Header 
                title="Estoque" 
                showBack={true} 
                onBackPress={() => router.back()}
                // 🔑 Ícone Plus para criar um novo registro/movimentação
                rightIcon={Plus as LucideIcon} 
                onRightIconPress={handleAddStock} 
            />

            <FlatList
                data={stockList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StockListItemComponent 
                        stock={item} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhum registro de estoque encontrado.</Text>
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

export default AdminStockScreen;