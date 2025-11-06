export interface Stock {
  id: string;
  variant: string;
  quantity: number;
  status: 'available' | 'limited' | 'unavailable';
}
