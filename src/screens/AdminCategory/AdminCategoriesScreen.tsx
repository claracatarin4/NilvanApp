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
import { Pencil, Trash2, Plus } from 'lucide-react-native';
import CategoriaService, { CategoriaDTO } from '../../../src/shared/service/categoria'; 
import { Header } from '../../../src/shared/components';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants'; 

interface CategoryItem {
    id: number; // Espera number na tela
    label: string; 
}

// --- Componente de Item da Lista (Mantido) ---
interface CategoryListItemProps {
    category: CategoryItem;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const CategoryListItem: FC<CategoryListItemProps> = ({ category, onEdit, onDelete }) => {
    return (
        <View style={itemStyles.container}>
            <Text style={itemStyles.label}>{category.label}</Text>
            
            <View style={itemStyles.actionsContainer}>
                {/* Ícone de Edição (Lápis) */}
                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onEdit(category.id)}
                >
                    <Pencil size={20} color={COLORS.primary} />
                </TouchableOpacity>

                {/* Ícone de Exclusão (Lixeira) */}
                <TouchableOpacity 
                    style={itemStyles.iconButton} 
                    onPress={() => onDelete(category.id)}
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
        paddingVertical: SPACING.lg, 
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    label: {
        fontSize: FONT_SIZES.large, 
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

export const AdminCategoriesScreen: FC = () => {
    const router = useRouter();
    
    const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 🔑 Lógica de Busca de Categorias na API
    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 💡 Chama o método listCategorias do serviço
            const apiCategories: CategoriaDTO[] = await CategoriaService.listCategorias();
            
            // 🔑 Mapeamento de CategoriaDTO para CategoryItem
            const formattedList: CategoryItem[] = apiCategories.map(c => ({
                // 🚨 CORREÇÃO: Converte ID de string (API) para number (Tela)
                id: Number(c.id), 
                label: c.nome, 
            }));
            
            setCategoriesList(formattedList);
        } catch (err) {
            console.error("Erro ao buscar categorias:", err);
            setError("Não foi possível carregar a lista de categorias. Verifique a conexão.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 🔑 Efeito: Recarrega a LISTA sempre que a tela é focada
    useFocusEffect(
        useCallback(() => {
            fetchCategories();
            return () => {};
        }, [fetchCategories])
    );

    // Lógica para Edição
    const handleEdit = useCallback((id: number) => {
        // Navega para a tela de edição, passando o ID
        router.push({
            // Rota corrigida mantendo o padrão relativo que você usou
            pathname: '/../src/screens/AdminCategory/EditCategoryItem', 
            params: { categoryId: id.toString() } // Passa o ID como string
        });
    }, [router]);

    // Lógica para Exclusão
    const handleDelete = useCallback((id: number) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta categoria? Todos os produtos ligados a ela podem ser afetados.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            // 💡 Chama o método deleteCategoria do serviço
                            // 🚨 CORREÇÃO: Converte ID de number (Tela) para string (API)
                            await CategoriaService.deleteCategoria(id.toString());
                            
                            // Após a exclusão, recarrega a lista
                            Alert.alert("Sucesso", "Categoria excluída.");
                            fetchCategories(); 
                            
                        } catch (e) {
                            console.error("Erro ao deletar categoria:", e);
                            Alert.alert("Erro", "Não foi possível excluir a categoria.");
                            setIsLoading(false);
                        }
                    }
                },
            ]
        );
    }, [fetchCategories]);
    
    // Rota para adicionar nova categoria
    const handleAddCategory = () => {
        router.push('/../src/screens/AdminCategory/CreateCategoryScreen'); // Rota corrigida
    }

    // --- Renderização Condicional ---

    if (isLoading && categoriesList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando categorias...</Text>
            </View>
        );
    }

    if (error && categoriesList.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchCategories} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header 
                title="Categorias" 
                showBack={true} 
                onBackPress={() => router.back()}
                // 🔑 Adiciona o ícone Plus para cadastrar nova categoria
                rightIcon={Plus} 
                onRightIconPress={handleAddCategory} 
            />

            <FlatList
                data={categoriesList}
                // KeyExtractor agora usa toString() para garantir que a chave seja string
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => (
                    <CategoryListItem 
                        category={item} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhuma categoria cadastrada.</Text>
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

export default AdminCategoriesScreen;