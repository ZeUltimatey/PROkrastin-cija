export interface Product {
  id: number;
  amount?: number;
  product_type: string;
  display_name: string;
  description: string;
  pricing: number;
  discount_pricing?: number;
  image_url?: string;
}
