export interface FulfillmentOptions {
  isPickupAvailable: boolean;
  isShippingAvailable: boolean;
  estimatedPickupTime: string;
  estimatedShippingTime: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  fulfillmentOptions: FulfillmentOptions;
}

export interface FulfillmentDetails {
  storeId?: number;
  shippingAddress: string;
  zipCode: string;
  aptSuite: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  fulfillmentMode: 'shipping' | 'pickup';
}

export type FulfillmentMode = 'shipping' | 'pickup';

export interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface DummyJSONResponse {
  products: DummyJSONProduct[];
  total: number;
  skip: number;
  limit: number;
}
