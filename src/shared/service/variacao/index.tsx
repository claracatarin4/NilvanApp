import axios, { isAxiosError } from 'axios';
import { OperatorVariantState, VariantDTO, VariantOptionDTO } from '../../../core/types/variantes'; 

const API_BASE_URL = "http://academico3.rj.senac.br/nilvanapp";

const api = axios.create({
    baseURL: API_BASE_URL,
});


const VariantService = {

    /**
     * 1. CREATE: Cria uma nova Variação (ex: 'Cor', 'Tamanho').
     * Endpoint assumido: POST /api/variacaoproduto/criar
     * @param data Dados da nova variação (nome, descrição, etc.).
     * @returns A variação criada.
     */
    async createVariant(data: Omit<VariantDTO, 'id' | 'options'>): Promise<VariantDTO> {
        try {
            // Omitimos 'id' e 'options' do payload de criação
            const response = await api.post<VariantDTO>("/api/variacaoproduto/criar", data);
            return response.data;
        } catch (error) {
            console.error("VariantService: erro ao criar variação", error);
            throw error;
        }
    },

    /**
     * 2. READ: Lista todas as Variações disponíveis.
     * Endpoint assumido: GET /api/variacaoproduto/listar
     * @returns Array de VariantDTO.
     */
    async listVariants(): Promise<VariantDTO[]> {
        try {
            const response = await api.get<VariantDTO[]>("/api/variacaoproduto/listar");
            return response.data;
        } catch (error) {
            console.error("VariantService: erro ao listar variações", error);
            throw error;
        }
    },

    /**
     * 3. READ (Por ID): Busca uma Variação específica e suas opções.
     * Endpoint assumido: GET /api/variacaoproduto/listar/{id}
     * @param id O ID da variação.
     * @returns A VariantDTO correspondente.
     */
    async getVariantById(id: string): Promise<VariantDTO> {
        try {
            // O endpoint que lista por ID geralmente retorna um único objeto
            const response = await api.get<VariantDTO>(`/api/variacaoproduto/listar/${id}`);
            return response.data;
        } catch (error) {
            console.error(`VariantService: erro ao buscar variação ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 4. UPDATE: Atualiza uma Variação existente.
     * Endpoint assumido: PUT /api/variacaoproduto/atualizar/{id}
     * @param data Dados da variação a ser atualizada (deve incluir o id).
     * @returns A variação atualizada.
     */
    async updateVariant(data: VariantDTO): Promise<VariantDTO> {
        try {
            const response = await api.put<VariantDTO>(`/api/variacaoproduto/atualizar/${data.id}`, data);
            return response.data;
        } catch (error) {
            console.error(`VariantService: erro ao atualizar variação ID ${data.id}`, error);
            throw error;
        }
    },

    /**
     * 5. DELETE: Apaga uma Variação pelo ID.
     * Endpoint assumido: DELETE /api/variacaoproduto/apagar/{id}
     * @param id O ID da variação a ser apagada.
     * @returns Promise vazia.
     */
    async deleteVariant(id: string): Promise<void> {
        try {
            await api.delete(`/api/variacaoproduto/apagar/${id}`);
        } catch (error) {
            console.error(`VariantService: erro ao apagar variação ID ${id}`, error);
            throw error;
        }
    },


    // --- OPERAÇÕES DE OPÇÃO DE VARIAÇÃO (Valores inseridos pelo Operador) ---

    /**
     * 6. CREATE (Opção): Registra um novo Valor para uma Variação (Opção).
     * Esta função é a lógica de criação que você solicitou anteriormente.
     * Endpoint assumido: POST /api/variacaoproduto/criarValor
     * @param data Os dados da variação a ser registrada.
     * @returns A Opção de Variação criada.
     */
    async registerVariantOptionValue(data: OperatorVariantState): Promise<VariantOptionDTO> {
        
        const payload = {
            // 💡 O endpoint deve receber o ID da variação e o valor da nova opção
            idVariacao: data.variantId, 
            valor: data.selectedValue,
            // Outros campos necessários no backend (ex: id do Operador)
        };

        try {
            const response = await api.post<VariantOptionDTO>("/api/variacaoproduto/criarValor", payload);
            return response.data;
        } catch (error) {
            console.error("VariantService: erro ao registrar valor de variação", error);
            throw error;
        }
    },
    
    /**
     * 7. DELETE (Opção): Apaga um Valor de Variação (Opção) pelo ID.
     * Endpoint assumido: DELETE /api/variacaoproduto/apagarValor/{id}
     * @param optionId O ID da opção de variação (valor).
     * @returns Promise vazia.
     */
    async deleteVariantOptionValue(optionId: string): Promise<void> {
        try {
            await api.delete(`/api/variacaoproduto/apagarValor/${optionId}`);
        } catch (error) {
            console.error(`VariantService: erro ao apagar opção ID ${optionId}`, error);
            throw error;
        }
    },
};

export default VariantService;