export interface ProductVariant {
  [key: string]: any; 
}

export interface Product {
  id: string | null;
  name: string;
  category: string;
  sellingPrice: string; 
  costPrice: string;    
  internalCode: string;
  barcode: string;
  description: string;
  imageUrl: string | null; 
  variants: ProductVariant[]; 
}

export const createProduct = (): Product => ({
  id: null,
  name: '',
  category: '',
  sellingPrice: '',
  costPrice: '',
  internalCode: '',
  barcode: '',
  description: '',
  imageUrl: null,
  variants: [],
});