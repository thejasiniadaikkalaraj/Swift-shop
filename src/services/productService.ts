import type { DummyJSONResponse, Product } from '../types';

const API_URL = 'https://dummyjson.com/products/category/beauty';

const LOCAL_IMAGES = {
  serum: '/products/serum.png',
  palette: '/products/palette.png',
  cream: '/products/cream.png',
  lipstick: '/products/lipstick.png',
  perfume: '/products/perfume.png',
};

function transformProduct(raw: DummyJSONResponse['products'][number]): Product {
  const isPickupAvailable = Math.random() > 0.4;
  
  // Custom mapping for a premium Nykaa-style look
  // IDs 1-5 come from API, ID 9999 is manual
  const premiumMappings: Record<number, Partial<Product>> = {
    1: { 
      title: "Radiance Boosting Serum", 
      description: "Infused with Rose and Jojoba oil for a natural, healthy glow.",
      category: "Skincare",
      brand: "SwiftShop Luxe",
      thumbnail: LOCAL_IMAGES.serum 
    },
    2: { 
      title: "Aurora Minerals Palette", 
      description: "12 earthy and rose tones for the perfect day-to-night look.",
      category: "Makeup",
      brand: "SwiftShop Luxe",
      thumbnail: LOCAL_IMAGES.palette 
    },
    3: { 
      title: "Hydra-Revive Cream", 
      description: "Deeply moisturizing facial cream for velvet-soft skin.",
      category: "Skincare",
      brand: "SwiftShop Luxe",
      thumbnail: LOCAL_IMAGES.cream 
    },
    4: { 
      title: "Matte Velvet Lipstick", 
      description: "Long-lasting crimson red with a sophisticated gold finish.",
      category: "Makeup",
      brand: "SwiftShop Luxe",
      thumbnail: LOCAL_IMAGES.lipstick 
    },
    5: { 
      title: "Nourishing Body Lotion", 
      description: "A rich, velvety lotion with Shea Butter and Argan oil for deep hydration.",
      category: "Body Care",
      brand: "SwiftShop Luxe",
      thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
    },
  };

  const mapping = premiumMappings[raw.id] || {};

  return {
    id: raw.id,
    title: mapping.title || raw.title,
    description: mapping.description || raw.description,
    price: Math.round(raw.price * 80 / 50) * 50 - 1, // Scale to INR and round to nearest 50 less 1 (e.g. 749, 799)
    discountPercentage: raw.discountPercentage,
    rating: raw.rating,
    stock: raw.stock,
    brand: mapping.brand || 'SwiftShop Luxe',
    category: mapping.category || 'Beauty',
    thumbnail: mapping.thumbnail || raw.thumbnail,
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
    title: "Midnight Jasmine Mist",
    description: "A delicate floral fragrance inspired by Indian summer nights.",
    price: 3499,
    discountPercentage: 10,
    rating: 4.8,
    stock: 25,
    brand: "SwiftShop Luxe",
    category: "Fragrance",
    thumbnail: LOCAL_IMAGES.perfume,
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
