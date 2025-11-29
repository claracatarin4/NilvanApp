
import api from "../../../core/api";

export interface CategoriaDTO {
    id: string;
    nome: string; 
    descricao: string; // <-- NOVO: Adicionado para carregar o valor
    produtosRelacionados: number; 
    status: 'ATIVA' | 'INATIVA';
}

export interface CategoriaRequestDTO {
    id: string | null; // Adicionado para conformidade com a interface original (e pode ser usado na API)
    nome: string;
    descricao: string; // <-- NOVO: Adicionado para enviar o valor
    totalStock: number; // Adicionado para conformidade com a interface original
    imageUrl?: string; // Adicionado para conformidade com a interface original
    status: 1 | 0; // 1 para ATIVA, 0 para INATIVA (Mapeamento do boolean)
}

const CategoriaService = {
    
    /**
     * 1. CREATE: Cria uma nova categoria.
     * Endpoint: POST /api/categoria/criar
     */
    async createCategoria(data: CategoriaRequestDTO): Promise<CategoriaDTO> {
        try {
            // Remove 'id' e 'totalStock' se for uma API RESTful de criação padrão
            const { id, totalStock, ...requestPayload } = data; 
            const response = await api.post<CategoriaDTO>("/api/categoria/criar", requestPayload);
            return response.data;
        } catch (error) {
            console.error("CategoriaService: erro ao criar categoria", error);
            throw error;
        }
    },

    /**
     * 2. READ (Lista): Lista todas as categorias.
     * Endpoint: GET /api/categoria/listar
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
     * 3. READ (Por ID): Busca uma categoria específica.
     * Endpoint: GET /api/categoria/buscar/{id}
     */
    async getCategoriaById(id: string): Promise<CategoriaDTO> {
        try {
            const response = await api.get<CategoriaDTO>(`/api/categoria/buscar/${id}`);
            return response.data;
        } catch (error) {
            console.error(`CategoriaService: erro ao buscar categoria ID ${id}`, error);
            throw error;
        }
    },

    /**
     * 4. UPDATE: Atualiza uma categoria existente.
     * Endpoint: PUT /api/categoria/atualizar/{id}
     */
    async updateCategoria(id: string, data: CategoriaRequestDTO): Promise<CategoriaDTO> {
        try {
            // Remove 'id' e 'totalStock' se for uma API RESTful de atualização padrão
            const { id: requestID, totalStock, ...requestPayload } = data; 
            const response = await api.put<CategoriaDTO>(`/api/categoria/atualizar/${id}`, requestPayload);
            return response.data;
        } catch (error) {
            console.error(`CategoriaService: erro ao atualizar categoria ID ${id}`, error);
            throw error;
        }
    },
    
    /**
     * 5. DELETE: Apaga uma categoria pelo ID.
     * Endpoint: DELETE /api/categoria/apagar/{id}
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