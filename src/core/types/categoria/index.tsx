export interface CategoryResponse {
    id: number | null;
    nome: string;
    descricao: string;
    totalStock: number;
    imageUrl?: string; 
}

export type Category = CategoryResponse ;