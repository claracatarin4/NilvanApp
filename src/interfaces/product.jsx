export const createProduct = () => ({
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

export const createVariant = () => ({
  id: null,
  name: '',
  value: '',
});

export const createStockInfo = () => ({
  inHand: 0,
  minimum: 0,
});
