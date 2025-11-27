export interface VariantOptionDTO {
    id: string;
    valor: string; // Ex: "Pequeno", "Azul", "Algodão"
}

/**
 * 1. Interface Base da Variação (Estrutura definida pelo Admin, Ex: "Cor").
 * É o que a API retorna ao listar as variações.
 */
export interface VariantDTO {
    id: string;
    nome: string; // Ex: "Cor", "Tamanho"
    descricao: string; 
    ativo: boolean; // Se a variação está ativa
    options?: VariantOptionDTO[]; // Opcional, pois nem sempre é necessário carregar as opções
}

/**
 * 2. Interface do Estado Local (Usada na tela de Seleção do Operador).
 * Adiciona a propriedade 'selected' ao VariantDTO.
 */
export interface VariantState extends VariantDTO {
    selected: boolean; // Controle local da seleção única para o Operador
}

/**
 * 3. Interface do Estado Local e Requisição (Usada na tela de Preenchimento de Valor do OPERADOR).
 */
export interface OperatorVariantState {
    variantId: string; // ID da variação selecionada (ex: 'v1' - Cor)
    variantName: string; // Nome da variação (Ex: 'Cor')
    selectedValue: string; // O valor que o operador inseriu (Ex: 'Rosa choque')
}

// --- Tipagem de Funções de API (Resolve 'map' on 'void') ---

/**
 * Tipagem para a função que busca as variantes disponíveis.
 * ESSENCIAL: Garante que a função retorne um array (VariantDTO[]).
 */
export type GetAvailableVariantsFunction = () => Promise<VariantDTO[]>;

/**
 * Tipagem para a função que registra o valor da variação pelo Operador.
 * O retorno é 'void' se o backend não retornar dados de volta.
 */
export type RegisterVariantValueFunction = (data: OperatorVariantState) => Promise<void>;