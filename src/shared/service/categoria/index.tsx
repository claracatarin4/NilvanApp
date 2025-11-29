import axios from 'axios';
import StorageService from '../storage';

// 💡 INTERFACES DE EXEMPLO (Defina estas interfaces no seu /core/types, ex: /core/types/categoria.ts)
export interface CategoriaDTO {
    id: string;
    nome: string; // Ex: "Eletrônicos", "Vestuário", "Limpeza"
    descricao: string;
    status: number; // 1 para ativa, 0 para inativa
}

export interface CategoriaRequestDTO {
    nome: string;
    descricao: string;
}

// 🔑 URL base da sua API
const API_BASE_URL = "http://academico3.rj.senac.br/nilvanapp";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${StorageService.returnToken()}` } 
});


const CategoriaService = {

    // --- CRUD DE CATEGORIAS ---

    /**
     * 1. CREATE: Cria uma nova categoria.
     * Endpoint: POST /api/categoria/criar
     * @param data Dados da nova categoria (nome, descricao).
     * @returns A Categoria criada.
     */
    async createCategoria(data: CategoriaRequestDTO): Promise<CategoriaDTO> {
        try {
            const response = await api.post<CategoriaDTO>("/api/categoria/criar", data);
            return response.data;
        } catch (error) {
            console.error("CategoriaService: erro ao criar categoria", error);
            throw error;
        }
    },

    /**
     * 2. READ: Lista todas as categorias.
     * Endpoint: GET /api/categoria/listar
     * @returns Array de CategoriaDTO.
     */
    async listCategorias(): Promise<CategoriaDTO[]> {
        try {
            const response = await api.get<CategoriaDTO[]>("/api/categoria/listar");
            return response.data;
        } catch (error) {
            console.error("CategoriaService: erro ao listar categorias", error);
            throw error;
        }
    },

    /**
     * 3. READ (Por ID): Busca uma Categoria específica.
     * Endpoint: GET /api/categoria/listar/{id}
     * @param id O ID da categoria.
     * @returns A CategoriaDTO correspondente.
     */
    async getCategoriaById(id: string): Promise<CategoriaDTO> {
        try {
            const response = await api.get<CategoriaDTO>(`/api/categoria/listar/${id}`);
            return response.data;
        } catch (error) {
            console.error(`CategoriaService: erro ao buscar categoria ID ${id}`, error);
            throw error;
        }
    },
    
    /**
     * 4. UPDATE: Atualiza uma Categoria existente.
     * Endpoint: PUT /api/categoria/atualizar/{id}
     * @param id O ID da categoria a ser atualizada.
     * @param data Os dados a serem atualizados (nome, descricao, etc.).
     * @returns A Categoria atualizada.
     */
    async updateCategoria(id: string, data: CategoriaRequestDTO): Promise<CategoriaDTO> {
        try {
            const response = await api.put<CategoriaDTO>(`/api/categoria/atualizar/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`CategoriaService: erro ao atualizar categoria ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 5. DELETE: Apaga uma Categoria pelo ID.
     * Endpoint: DELETE /api/categoria/apagar/{id}
     * @param id O ID da categoria a ser apagada.
     * @returns Promise vazia.
     */
    async deleteCategoria(id: string): Promise<void> {
        try {
            await api.delete(`/api/categoria/apagar/${id}`);
        } catch (error) {
            console.error(`CategoriaService: erro ao apagar categoria ID ${id}`, error);
            throw error;
        }
    },
};

export default CategoriaService;