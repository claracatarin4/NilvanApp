import axios, { isAxiosError } from 'axios';
import StorageService from '../storage';

// 💡 INTERFACES DE EXEMPLO (Defina estas interfaces no seu /core/types, ex: /core/types/estoque.ts)
export interface MovimentacaoEstoqueDTO {
    id: string;
    produtoId: string;
    tipo: 'ENTRADA' | 'SAIDA'; // Tipo de movimentação
    quantidade: number;
    dataMovimentacao: string; // Data e hora
    observacao?: string;
}

export interface MovimentacaoEstoqueRequestDTO {
    produtoId: string;
    tipo: 'ENTRADA' | 'SAIDA';
    quantidade: number;
    observacao?: string;
}

const API_BASE_URL = "http://academico3.rj.senac.br/nilvanapp";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${StorageService.returnToken()}` } 
});


const MovimentacaoEstoqueService = {

    // --- CRUD DE MOVIMENTAÇÃO DE ESTOQUE ---

    /**
     * 1. CREATE: Registra uma nova movimentação (ENTRADA ou SAÍDA) no estoque.
     * Endpoint: POST /api/movimentacao_estoque/criar
     * @param data Dados da movimentação.
     * @returns A movimentação criada.
     */
    async createMovimentacao(data: MovimentacaoEstoqueRequestDTO): Promise<MovimentacaoEstoqueDTO> {
        try {
            const response = await api.post<MovimentacaoEstoqueDTO>("/api/movimentacao_estoque/criar", data);
            return response.data;
        } catch (error) {
            console.error("MovimentacaoEstoqueService: erro ao criar movimentação", error);
            throw error;
        }
    },

    /**
     * 2. READ: Lista todas as movimentações de estoque.
     * Endpoint: GET /api/movimentacao_estoque/listar
     * @returns Array de MovimentacaoEstoqueDTO.
     */
    async listMovimentacoes(): Promise<MovimentacaoEstoqueDTO[]> {
        try {
            const response = await api.get<MovimentacaoEstoqueDTO[]>("/api/movimentacao_estoque/listar");
            return response.data;
        } catch (error) {
            console.error("MovimentacaoEstoqueService: erro ao listar movimentações", error);
            throw error;
        }
    },

    /**
     * 3. READ (Por ID): Busca uma Movimentação específica.
     * Endpoint: GET /api/movimentacao_estoque/listar/{id}
     * @param id O ID da movimentação.
     * @returns A MovimentacaoEstoqueDTO correspondente.
     */
    async getMovimentacaoById(id: string): Promise<MovimentacaoEstoqueDTO> {
        try {
            const response = await api.get<MovimentacaoEstoqueDTO>(`/api/movimentacao_estoque/listar/${id}`);
            return response.data;
        } catch (error) {
            console.error(`MovimentacaoEstoqueService: erro ao buscar movimentação ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 4. UPDATE: Atualiza uma Movimentação existente.
     * ATENÇÃO: Em sistemas de estoque, geralmente não se 'atualiza' movimentações passadas.
     * Se for estritamente necessário, mantenha esta função.
     * Endpoint: PUT /api/movimentacao_estoque/atualizar/{id}
     * @param id O ID da movimentação a ser atualizada.
     * @param data Os dados a serem atualizados.
     * @returns A movimentação atualizada.
     */
    async updateMovimentacao(id: string, data: MovimentacaoEstoqueRequestDTO): Promise<MovimentacaoEstoqueDTO> {
        try {
            const response = await api.put<MovimentacaoEstoqueDTO>(`/api/movimentacao_estoque/atualizar/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`MovimentacaoEstoqueService: erro ao atualizar movimentação ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 5. DELETE: Apaga uma Movimentação pelo ID.
     * ATENÇÃO: Apagar uma movimentação no estoque tem implicações no saldo. Use com cautela.
     * Endpoint: DELETE /api/movimentacao_estoque/apagar/{id}
     * @param id O ID da movimentação a ser apagada.
     * @returns Promise vazia.
     */
    async deleteMovimentacao(id: string): Promise<void> {
        try {
            await api.delete(`/api/movimentacao_estoque/apagar/${id}`);
        } catch (error) {
            console.error(`MovimentacaoEstoqueService: erro ao apagar movimentação ID ${id}`, error);
            throw error;
        }
    },
};

export default MovimentacaoEstoqueService;