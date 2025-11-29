import React, { FC, useState } from 'react';
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
// Se você usa o Picker do React Native ou um componente personalizado:
// import { Picker } from '@react-native-picker/picker'; 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../../src/shared/components/Header';
import { COLORS, FONT_SIZES, SPACING } from '../../../src/shared/constants';

// Importa o serviço e DTOs
import MovimentacaoEstoqueService, {  } from '../../shared/service/movimentacao-estoque'; 
import { MovimentacaoRequestDTO } from '../../core/types/movimentacao-estoque';

// --- DTOs e Mock de Dados de Seleção ---
// Nota: Em um projeto real, você buscaria esses dados de outros serviços (EstoqueService, UserService, etc.)
interface SelectOption {
    id: string;
    nome: string;
}

const MOCK_ESTOQUES: SelectOption[] = [{ id: '1', nome: 'Estoque A' }, { id: '2', nome: 'Estoque B' }];
const MOCK_VARIACOES: SelectOption[] = [{ id: '10', nome: 'Variação Padrão' }, { id: '11', nome: 'Variação Custom' }];
const MOCK_USUARIOS: SelectOption[] = [{ id: '100', nome: 'Ivan Santana Jr' }, { id: '101', nome: 'Usuário Teste' }];
const TIPO_MOVIMENTACAO: SelectOption[] = [{ id: 'ENTRADA', nome: 'Entrada' }, { id: 'SAIDA', nome: 'Saída' }];


// --- Tipagem do Estado do Formulário ---
interface MovementFormData {
    idEstoque: string;
    idVariacao: string;
    idUsuario: string;
    tipo: 'ENTRADA' | 'SAIDA' | ''; // Usamos string vazia como valor inicial
    quantidade: string; // Mantido como string para o TextInput
    dataMovimentacao: string; // Ex: '2025-11-29'
    observacao: string;
    ativo: boolean; // para o switch
}

export const CreateStockMovementScreen: FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<MovementFormData>({
        idEstoque: MOCK_ESTOQUES[0].id, // Valor inicial
        idVariacao: MOCK_VARIACOES[0].id,
        idUsuario: MOCK_USUARIOS[0].id,
        tipo: TIPO_MOVIMENTACAO[0].id as 'ENTRADA',
        quantidade: '',
        dataMovimentacao: new Date().toISOString().split('T')[0], // Data de hoje
        observacao: '',
        ativo: true,
    });
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const handleInputChange = (field: keyof MovementFormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        const quantidade = parseFloat(formData.quantidade);

        if (!formData.idEstoque || !formData.idVariacao || !formData.idUsuario || !formData.tipo || isNaN(quantidade) || quantidade <= 0) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios (seleções e quantidade).");
            return;
        }

        setIsSaving(true);
        try {
            // Mapeia o estado do formulário para o DTO de Requisição da API
            const requestData: MovimentacaoRequestDTO = {
                idEstoque: formData.idEstoque,
                idVariacao: formData.idVariacao,
                idUsuario: formData.idUsuario,
                tipo: formData.tipo as 'ENTRADA' | 'SAIDA',
                quantidade: quantidade,
                dataMovimentacao: formData.dataMovimentacao,
                observacao: formData.observacao.trim() || undefined,
                status: formData.ativo ? 1 : 0,
            };

            await MovimentacaoEstoqueService.createMovimentacao(requestData);
            
            Alert.alert("Sucesso", `Movimentação de ${formData.tipo} salva!`);
            
            // Navega de volta para a lista de movimentações
            router.back(); 

        } catch (error) {
            console.error("Erro ao salvar movimentação:", error);
            Alert.alert("Erro ao Salvar", "Não foi possível cadastrar a movimentação. Tente novamente.");
        } finally {
            setIsSaving(false);
        }
    };

    // --- Componente de Dropdown Simples (Picker Mockado) ---
    // Em um projeto real, você usaria um componente de dropdown mais robusto (react-native-picker ou similar)
    const PickerSelect: FC<{ label: string; options: SelectOption[]; selectedValue: string; onValueChange: (value: string) => void }> = ({ label, options, selectedValue, onValueChange }) => (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerContainer}>
                {/* 💡 Substitua este bloco pelo seu componente Dropdown real */}
                <Text style={styles.pickerText}>{options.find(o => o.id === selectedValue)?.nome || 'Selecione...'}</Text>
                <Ionicons name="chevron-down-outline" size={20} color={COLORS.textLight} />
                {/* <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    {options.map(item => (
                        <Picker.Item key={item.id} label={item.nome} value={item.id} />
                    ))}
                </Picker> 
                */}
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header 
                title="Cadastrar Movimentação Estoque" 
                showBack={true} 
                onBackPress={() => router.back()} 
            />

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Seleção de Estoque */}
                <PickerSelect
                    label="Estoque"
                    options={MOCK_ESTOQUES}
                    selectedValue={formData.idEstoque}
                    onValueChange={(value) => handleInputChange('idEstoque', value)}
                />

                {/* Seleção de Variação */}
                <PickerSelect
                    label="Variação"
                    options={MOCK_VARIACOES}
                    selectedValue={formData.idVariacao}
                    onValueChange={(value) => handleInputChange('idVariacao', value)}
                />

                {/* Seleção de Usuário */}
                <PickerSelect
                    label="Usuário"
                    options={MOCK_USUARIOS}
                    selectedValue={formData.idUsuario}
                    onValueChange={(value) => handleInputChange('idUsuario', value)}
                />

                {/* Seleção de Tipo (Entrada/Saída) */}
                <PickerSelect
                    label="Tipo"
                    options={TIPO_MOVIMENTACAO}
                    selectedValue={formData.tipo}
                    onValueChange={(value) => handleInputChange('tipo', value as 'ENTRADA' | 'SAIDA')}
                />
                
                {/* Campo Quantidade */}
                <Text style={styles.label}>Quantidade</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="numeric"
                    value={formData.quantidade}
                    onChangeText={(text) => handleInputChange('quantidade', text)}
                    editable={!isSaving}
                />

                {/* Campo Data da Movimentação */}
                <Text style={styles.label}>Data da Movimentação</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="default"
                    value={formData.dataMovimentacao}
                    onChangeText={(text) => handleInputChange('dataMovimentacao', text)}
                    editable={!isSaving}
                />

                {/* Campo Observação */}
                <Text style={styles.label}>Observação</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Detalhes adicionais"
                    placeholderTextColor={COLORS.textLight}
                    value={formData.observacao}
                    onChangeText={(text) => handleInputChange('observacao', text)}
                    editable={!isSaving}
                />

                {/* Switch Mov Estoque Ativa? */}
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Mov Estoque Ativa?</Text>
                    <Switch
                        trackColor={{ false: COLORS.darkGray, true: COLORS.primary }}
                        thumbColor={COLORS.white}
                        ios_backgroundColor={COLORS.darkGray}
                        onValueChange={(value) => handleInputChange('ativo', value)}
                        value={formData.ativo}
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
                    <Text style={styles.saveButtonText}>Salvar</Text>
                )}
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

// --- ESTILOS ---
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
        paddingBottom: SPACING.xl * 2,
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
    // Estilos para o Picker (Dropdown) simulado
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        // Remover este padding vertical se usar o <Picker> nativo
    },
    pickerText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        flex: 1,
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

export default CreateStockMovementScreen;