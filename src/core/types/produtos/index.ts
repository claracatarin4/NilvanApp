export interface ProductVariant {
  [key: string]: any; 
}

export interface Product {
  price: any;
  id: string | null;
  name: string;
  category: string;
  sellingPrice: number; 
  costPrice: number;    
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