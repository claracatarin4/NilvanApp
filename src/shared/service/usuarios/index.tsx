import api from "../../../core/api";
import { LoginDtoRequest, LoginDTOResponse, UserResponse, Users } from "../../../core/types/users";
import StorageService from "../storage";

const UserService = {
    
    /**
     * Cria um novo usuário.
     * @param request Dados do usuário a ser criado.
     * @returns O objeto UserResponse retornado pelo servidor.
     */
    async createUser(request: Users): Promise<UserResponse> { // Adicionado retorno Promise<UserResponse>
        try {
            const response = await api.post<UserResponse>("/api/usuario/criar", request);
            return response.data; // Retorna o usuário criado
            
        } catch(error) {
            console.error("UserService: erro ao criar usuário", error);
            // 🔑 Melhoria: Lança o erro para que a tela possa capturá-lo
            throw error; 
        }
    },
    
    /**
     * Realiza o login do usuário e salva o token.
     * @param request Credenciais de login.
     * @returns Objeto de resposta de login (incluindo o token).
     */
    async login(request: LoginDtoRequest): Promise<LoginDTOResponse> {
        try {
            const response = await api.post<LoginDTOResponse>("/api/usuario/login", request);
            
            const { token } = response.data;
            
            await StorageService.saveToken(token);
            
            return response.data;

        } catch(error) {
            console.error("UserService: erro ao fazer login", error);
            throw error;
        }
    },

    /**
     * Lista todos os usuários cadastrados.
     * @returns Array de UserResponse.
     */
    async listUsers(): Promise<UserResponse[]> {
        try {
            const response = await api.get<UserResponse[]>("/api/usuario/listar");
            
            return response.data;

        } catch(error) {
            console.error("UserService: erro ao listar usuários", error);
            throw error;
        }
    },


     /**
     * Lista todos os usuários cadastrados por id.
     * @param userId ID do usuário a ser apagado.
     */
    async listUsersById(userId: number): Promise<UserResponse[]> {
        try {
            const response = await api.get<UserResponse[]>(`/api/usuario/listarPorIdUsuario/${userId}`);
            
            return response.data;

        } catch(error) {
            console.error("UserService: erro ao listar usuário por Id", error);
            throw error;
        }
    },

    /**
     * Apaga um usuário pelo ID.
     * @param userId ID do usuário a ser apagado.
     */
    async deleteUser(userId: number): Promise<void> {
        try {
            await api.delete(`/api/usuario/apagar/${userId}`);
            
        } catch(error) {
            console.error(`UserService: erro ao apagar usuário ID ${userId}`, error);
            throw error;
        }
    },

    /**
     * 🔑 NOVO MÉTODO: Busca os dados do usuário logado.
     * Assume que o endpoint retorna o perfil completo.
     * @returns Um objeto UserResponse.
     */
    async getLoggedUser(): Promise<UserResponse> {
        try {
            // Assumimos que o endpoint é '/api/usuario/perfil' ou '/api/usuario/me'
            const response = await api.get<UserResponse>("/api/usuario/perfil"); 
            return response.data;
        } catch(error) {
            console.error("UserService: erro ao buscar perfil do usuário logado", error);
            throw error;
        }
    },



    /**
     * Realiza o logout, limpando os dados de autenticação.
     */
    async logout(): Promise<void> {
        try {
            await StorageService.clearData();
        } catch (error) {
            console.error("UserService: erro ao fazer logout", error);
            throw error;
        }
    }
};
export default UserService;