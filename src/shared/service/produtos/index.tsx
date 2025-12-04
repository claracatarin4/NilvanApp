import api from "../../../core/api";
import {ProdutoRequest, ProdutoResponse } from "../../../core/types/produtos";


const ProductService = {
    
    /**
     * Cria um novo usuário.
     * @param request Dados do usuário a ser criado.
     * @returns O objeto UserResponse retornado pelo servidor.
     */
    async createProduct(request: ProdutoRequest): Promise<ProdutoResponse> { // Adicionado retorno Promise<UserResponse>
        try {
            const response = await api.post<ProdutoResponse>("/api/produto/criar", request);
            return response.data; 

        } catch(error) {
            console.error("ProductService: erro ao criar produto", error);
            throw error; 
        }
    },

    /**
     * Lista todos os usuários cadastrados.
     * @returns Array de UserResponse.
     */
    async listProducts(): Promise<ProdutoResponse[]> {
        try {
            const response = await api.get<ProdutoResponse[]>("/api/produto/listar");
            
            return response.data;

        } catch(error) {
            console.error("UserService: erro ao listar produtos", error);
            throw error;
        }
    },

    /**
     * Apaga um produto pelo ID.
     * @param produtoId ID do produto a ser apagado.
     */
    async deleteProduct(produtoId: number): Promise<void> {
        try {
            await api.delete(`/api/produto/apagar/${produtoId}`);
            
        } catch(error) {
            console.error(`ProductService: erro ao apagar produto ID ${produtoId}`, error);
            throw error;
        }
    },

    

    /**
     * Busca a contagem total de produtos cadastrados.
     * @returns Um número que representa a quantidade total.
     */
    // async countProducts(): Promise<number> {
    //     try {
    //         // Assumimos que o endpoint retorna um objeto com uma propriedade 'total',
    //         // ou o número diretamente. Vamos assumir que retorna { total: number }.
    //         const response = await api.get<{ total: number }>("/api/produto/contar"); 
    //         return response.data.total;
    //     } catch(error) {
    //         console.error("ProductService: erro ao buscar contagem de produtos", error);
    //         // Retorna 0 ou lança o erro, dependendo da sua estratégia de fallback
    //         return 0; 
    //     }
    // },

};
export default ProductService;