// /shared/service/estoque/EstoqueService.ts 

import axios, { isAxiosError } from 'axios';
import StorageService from '../storage';

// 💡 INTERFACES DE EXEMPLO (Defina estas interfaces no seu /core/types, ex: /core/types/estoque.ts)
// O saldo de estoque geralmente é uma tabela que rastreia a quantidade disponível
// para um determinado produto (ou variação de produto).
export interface EstoqueDTO {
    id: string;
    produtoId: string; // ID do produto ou variação
    quantidadeAtual: number; // Saldo atual em estoque
    localizacao?: string; // Ex: "Corredor A, Prateleira 3"
    dataUltimaAtualizacao: string;
}

export interface EstoqueRequestDTO {
    produtoId: string;
    quantidadeInicial: number;
    localizacao?: string;
}

// 🔑 URL base da sua API
const API_BASE_URL = "http://academico3.rj.senac.br/nilvanapp";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${StorageService.returnToken()}` } 
});


const EstoqueService = {

    /**
     * 1. CREATE: Cria um novo registro de saldo de estoque para um produto.
     * Geralmente usado quando um novo produto é adicionado ao sistema.
     * Endpoint: POST /api/estoque/criar
     * @param data Dados do saldo inicial (produtoId, quantidadeInicial, localizacao).
     * @returns O registro de Estoque criado.
     */
    async createEstoque(data: EstoqueRequestDTO): Promise<EstoqueDTO> {
        try {
            const response = await api.post<EstoqueDTO>("/api/estoque/criar", data);
            return response.data;
        } catch (error) {
            console.error("EstoqueService: erro ao criar registro de estoque", error);
            throw error;
        }
    },

    /**
     * 2. READ: Lista todos os registros de estoque (saldo de todos os produtos/variações).
     * Endpoint: GET /api/estoque/listar
     * @returns Array de EstoqueDTO.
     */
    async listEstoques(): Promise<EstoqueDTO[]> {
        try {
            const response = await api.get<EstoqueDTO[]>("/api/estoque/listar");
            return response.data;
        } catch (error) {
            console.error("EstoqueService: erro ao listar estoques", error);
            throw error;
        }
    },

    /**
     * 3. READ (Por ID): Busca um registro de Estoque específico.
     * Endpoint: GET /api/estoque/listar/{id}
     * @param id O ID do registro de estoque.
     * @returns O EstoqueDTO correspondente.
     */
    async getEstoqueById(id: string): Promise<EstoqueDTO> {
        try {
            const response = await api.get<EstoqueDTO>(`/api/estoque/listar/${id}`);
            return response.data;
        } catch (error) {
            console.error(`EstoqueService: erro ao buscar estoque ID ${id}`, error);
            throw error;
        }
    },
    
    /**
     * 4. UPDATE: Atualiza informações não relacionadas à quantidade (ex: localização).
     * ATENÇÃO: A quantidadeAtual *nunca* deve ser atualizada diretamente aqui, 
     * e sim pelo serviço de MovimentacaoEstoque.
     * Endpoint: PUT /api/estoque/atualizar/{id}
     * @param id O ID do registro de estoque a ser atualizado.
     * @param data Os dados a serem atualizados (ex: localizacao).
     * @returns O registro de estoque atualizado.
     */
    async updateEstoque(id: string, data: Partial<EstoqueDTO>): Promise<EstoqueDTO> {
        try {
            // Enviamos apenas o ID e os campos que queremos alterar (Partial<EstoqueDTO>)
            const response = await api.put<EstoqueDTO>(`/api/estoque/atualizar/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`EstoqueService: erro ao atualizar estoque ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 5. DELETE: Apaga um registro de Estoque pelo ID.
     * Endpoint: DELETE /api/estoque/apagar/{id}
     * @param id O ID do registro de estoque a ser apagado.
     * @returns Promise vazia.
     */
    async deleteEstoque(id: string): Promise<void> {
        try {
            await api.delete(`/api/estoque/apagar/${id}`);
        } catch (error) {
            console.error(`EstoqueService: erro ao apagar estoque ID ${id}`, error);
            throw error;
        }
    },
};

export default EstoqueService;