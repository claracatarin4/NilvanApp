export interface ProductVariant {
  [key: string]: any; 
}

export type Product = ProdutoResponse & ProductCardRequiredProps;


 export interface ProdutoResponse { 
  id: string | null;
  name: string;
  category: string;
  sellPrice: number;
  costPrice: number;    
  internalCode: string;
  barcode: string;
  description: string;
  imageUrl: string | null; 
  variants: ProductVariant[]; 
  
}

interface ProductCardRequiredProps {
    code: string;
    price: number;
}


