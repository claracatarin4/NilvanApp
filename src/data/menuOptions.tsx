// Define a estrutura (o "contrato") de um item de menu
export interface MenuItem {
  id: string; // Identificador único do item
  label: string; // Texto exibido no menu (Ex: "Editar Perfil")
  screenName: string; // Nome da rota para onde o item deve navegar
  requiredRole: 'Admin' | 'Operador' | 'Ambos'; // Define quem tem permissão para ver
}

// 🚨 IMPORTANTE: Substitua os 'screenName' pelos nomes exatos das suas rotas.

export const menuItems: MenuItem[] = [
  // ------------------------------------------------------------------
  //  OPÇÕES PARA AMBOS (ADMIN E OPERADOR)
  // ------------------------------------------------------------------
  { 
    id: 'edit_profile', 
    label: 'Editar Perfil', 
    screenName: 'EditProfileScreen', 
    requiredRole: 'Ambos' 
  },
  
  // ------------------------------------------------------------------
  //  OPÇÕES SOMENTE PARA ADMIN
  // ------------------------------------------------------------------
  { 
    id: 'users', 
    label: 'Usuários', 
    screenName: 'UsersManagementScreen', 
    requiredRole: 'Admin' 
  },
  { 
    id: 'stock', 
    label: 'Estoque', 
    screenName: 'StockScreen', 
    requiredRole: 'Admin' 
  },
  { 
    id: 'stock_movement', 
    label: 'Movimentação Estoque', 
    screenName: 'StockMovementScreen', 
    requiredRole: 'Admin' 
  },
  { 
    id: 'variants', 
    label: 'Variantes', 
    screenName: 'VariantsScreen', 
    requiredRole: 'Admin' 
  },

  // Você pode adicionar outras funcionalidades de administrador aqui...
];