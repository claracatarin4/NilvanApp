export interface ProductVariant {
  [key: string]: any; 
}

export interface Product {
  price: any;
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

export interface ProdutoResponse{
  price: any;
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