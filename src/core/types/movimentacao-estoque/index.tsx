export interface StockMovementResponse {
    id: number;
    tipo: 'ENTRADA' | 'SAIDA'; // Exemplo
    data: string; // Ex: "03/01/2024"
    usuarioNome: string; // Ex: "Ivan Santanna Jr"
    descricao?: string; // Ex: "Estoque 1"
}

export interface MovimentacaoRequestDTO {
    idEstoque: string;
    idVariacao: string;
    idUsuario: string;
    tipo: 'ENTRADA' | 'SAIDA';
    quantidade: number;
    dataMovimentacao: string; // Ex: "YYYY-MM-DD"
    observacao?: string;
    status: number; // 1 ou 0
}