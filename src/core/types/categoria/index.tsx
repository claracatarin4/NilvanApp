export interface CategoryRequest{
    id: number | null;
    nome: string;
    descricao: string;
    totalStock: number;
    imageUrl?: string; 
}

export interface CategoryResponse {
    id: number;
    nome: string; 
    descricao: string;
}

export type Category = CategoryResponse ;