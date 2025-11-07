import { TAB_TYPES } from "../../screens/Produto/AddProductScreen";

export type TabType = TAB_TYPES.PRODUTO | TAB_TYPES.ESTOQUE; 


export const MAIN_TABS = {
  PRODUTOS: 'Produtos',
  ESTOQUE: 'Estoque',
  CATEGORIAS: 'Categorias',
} as const;



export type MainTabType = typeof MAIN_TABS[keyof typeof MAIN_TABS];

