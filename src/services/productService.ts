import type { DummyJSONResponse, Product } from '../types';

const API_URL = 'https://dummyjson.com/products/category/beauty';

function transformProduct(raw: DummyJSONResponse['products'][number]): Product {
  const isPickupAvailable = Math.random() > 0.4;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    discountPercentage: raw.discountPercentage,
    rating: raw.rating,
    stock: raw.stock,
    brand: raw.brand ?? 'SwiftShop',
    category: raw.category,
    thumbnail: raw.thumbnail,
    images: raw.images,
    fulfillmentOptions: {
      isPickupAvailable,
      isShippingAvailable: true,
      estimatedPickupTime: isPickupAvailable
        ? Math.random() > 0.5
          ? '2 Hours'
          : 'Ready Tomorrow'
        : 'N/A',
      estimatedShippingTime: Math.random() > 0.5 ? '3-5 Days' : '2 Days',
    },
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  const data: DummyJSONResponse = await response.json();
  const products = data.products.map(transformProduct);
  
  // Inject a 6th product manually so the second row has 3 items
  products.push({
    id: 9999,
    title: "Glow & Charm Perfume",
    description: "A signature floral fragrance designed for an all-day glow and elegant charm.",
    price: 45.99,
    discountPercentage: 10,
    rating: 4.8,
    stock: 25,
    brand: "SwiftShop Exclusive",
    category: "beauty",
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
    images: [],
    fulfillmentOptions: {
      isPickupAvailable: true,
      isShippingAvailable: true,
      estimatedPickupTime: "Ready Tomorrow",
      estimatedShippingTime: "2 Days"
    }
  });


  // Mock delay to showcase skeleton loading state
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1500);
  });
}
