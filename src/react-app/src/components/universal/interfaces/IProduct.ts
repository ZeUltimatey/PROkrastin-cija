export interface IProduct {
  id: number;
  amount?: number;
  product_type: string;
  display_name: string;
  description: string;
  pricing: number;
  discount_pricing?: number;
  images?: { images: any[] };
  stock?: number;
  cat?: any;
  rating?: number;
}
