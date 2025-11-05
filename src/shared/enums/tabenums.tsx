export const TAB_TYPES = {
  PRODUTO: 'Produto',
  ESTOQUE: 'Estoque',
} as const; 

export type TabType = typeof TAB_TYPES[keyof typeof TAB_TYPES]; 

export const MAIN_TABS = {
  PRODUTOS: 'Produtos',
  ESTOQUE: 'Estoque',
  CATEGORIAS: 'Categorias',
} as const;

export type MainTabType = typeof MAIN_TABS[keyof typeof MAIN_TABS];
