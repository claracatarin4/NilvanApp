import api from "../../../core/api";
import { LoginDtoRequest, LoginDTOResponse, UserResponse, Users } from "../../../core/types/users";
import StorageService from "../storage";

const UserService = {

    async createUser(request:Users){
        try{
            const response = await api.post<UserResponse>("/api/usuario/criar", request);
            
        } catch(error){
            console.error("UserService: erro ao criar usuário", error);
        }

        
    },
    
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

    async listUsers(): Promise<UserResponse[]> {
        try {

            const response = await api.get<UserResponse[]>("/api/usuario/listar");
            
            return response.data;

        } catch(error) {
            console.error("UserService: erro ao listar usuários", error);
            throw error;
        }
    },

    async deleteUser(userId: number): Promise<void> {
        try {
            await api.delete(`/api/usuario/apagar/${userId}`);
            
        } catch(error) {
            console.error(`UserService: erro ao apagar usuário ID ${userId}`, error);
            throw error;
        }
    },

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