import { RoleName } from "../enums/roleName";

/**
 * 🚨 SIMULAÇÃO DA ROLE DO USUÁRIO LOGADO
 * * Esta função simula a obtenção da Role do usuário atual.
 * Mude o valor de 'ADMIN' para 'OPERATOR' para testar o fluxo de Operador.
 */
export function getCurrentUserRole(): RoleName {

    const role: RoleName = RoleName.ROLE_ADMIN; 
    // const role: RoleName = RoleName.OPERATOR; 
    
    return role;
}