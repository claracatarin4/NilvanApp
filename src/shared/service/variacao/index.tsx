import axios, { isAxiosError } from 'axios';
import { CreateVariantDTO, OperatorVariantState, VariantDTO, VariantOptionDTO } from '../../../core/types/variantes'; 
import StorageService from '../storage';

const API_BASE_URL = "http://academico3.rj.senac.br/nilvanapp";

const api = axios.create({
    baseURL: API_BASE_URL,
});


const VariantService = {

    /**
     * CREATE: Cadastra uma nova Variante (Ex: Cor, Tamanho, Material).
     * Endpoint: POST /api/variants/criar
     * @param data Dados da nova variante.
     * @returns A VariantDTO criada.
     */
    async createVariant(data: VariantDTO): Promise<VariantDTO> {
        // Simulação de como o token seria incluído
        const token = await StorageService.returnToken();
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await api.post<VariantDTO>("/api/variants/criar", data, { headers });
            return response.data;
        } catch (error) {
            console.error("VariantService: erro ao criar variante", error);
            throw error;
        }
    },

    /**
     * UPDATE: Atualiza as informações de uma variante.
     * Endpoint: PUT /api/variants/atualizar/{id}
     * 🔑 CORREÇÃO AQUI: O parâmetro 'data' deve ser Partial<CreateVariantDTO>
     */
    async updateVariant(id: string, data: Partial<CreateVariantDTO>): Promise<VariantDTO> {
        const token = await StorageService.returnToken();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            // O objeto 'data' (Partial<CreateVariantDTO>) é o payload, e o retorno é o VariantDTO completo
            const response = await api.put<VariantDTO>(`/api/variants/atualizar/${id}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(`VariantService: erro ao atualizar variante ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 2. READ: Lista todas as Variações disponíveis.
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
     */
    async getVariantById(id: string): Promise<VariantDTO> {
        try {
            const response = await api.get<VariantDTO>(`/api/variacaoproduto/listar/${id}`);
            return response.data;
        } catch (error) {
            console.error(`VariantService: erro ao buscar variação ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 5. DELETE: Apaga uma Variação pelo ID.
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
     */
    async registerVariantOptionValue(data: OperatorVariantState): Promise<VariantOptionDTO> {
        
        const payload = {
            idVariacao: data.variantId, 
            valor: data.selectedValue,
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