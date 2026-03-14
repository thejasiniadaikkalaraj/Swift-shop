import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Product, CartItem, FulfillmentMode, FulfillmentDetails } from '../types';
import { fetchProducts } from '../services/productService';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart: CartItem[];
  totalPrice: number;
  totalItems: number;
  globalFulfillmentMode: FulfillmentMode;
  setGlobalFulfillmentMode: (mode: FulfillmentMode) => void;
  fulfillmentDetails: FulfillmentDetails;
  updateFulfillmentDetails: (details: Partial<FulfillmentDetails>) => void;
  addToCart: (product: Product, mode?: FulfillmentMode) => void;
  removeFromCart: (productId: number, mode: FulfillmentMode) => void;
  updateQuantity: (productId: number, mode: FulfillmentMode, quantity: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  pickupItems: CartItem[];
  shippingItems: CartItem[];
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Persistence initialization
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = sessionStorage.getItem('swiftshop-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [globalFulfillmentMode, setGlobalFulfillmentMode] = useState<FulfillmentMode>(() => {
    const saved = sessionStorage.getItem('swiftshop-fulfillment-mode');
    return (saved as FulfillmentMode) || 'shipping';
  });
  const [fulfillmentDetails, setFulfillmentDetails] = useState<FulfillmentDetails>(() => {
    const saved = sessionStorage.getItem('swiftshop-fulfillment-details');
    return saved ? JSON.parse(saved) : {
      shippingAddress: '',
      zipCode: '',
      aptSuite: '',
    };
  });
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Sync cart items and validate fulfillment availability after load
  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      setCart((prevCart) => {
        let hasChanges = false;
        const updatedCart = prevCart.reduce<CartItem[]>((acc, item) => {
          const freshProduct = products.find((p) => p.id === item.product.id);
          
          // Validation: Remove if product is missing or pickup is no longer available for a pickup item
          if (!freshProduct || (item.fulfillmentMode === 'pickup' && !freshProduct.fulfillmentOptions.isPickupAvailable)) {
            hasChanges = true;
            return acc;
          }

          // Sync: Update with fresh data if different
          if (JSON.stringify(freshProduct) !== JSON.stringify(item.product)) {
            hasChanges = true;
            acc.push({ ...item, product: freshProduct });
          } else {
            acc.push(item);
          }
          return acc;
        }, []);

        return hasChanges ? updatedCart : prevCart;
      });
    }
  }, [products]);

  // Persistence side effects
  useEffect(() => {
    sessionStorage.setItem('swiftshop-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem('swiftshop-fulfillment-mode', globalFulfillmentMode);
  }, [globalFulfillmentMode]);

  useEffect(() => {
    sessionStorage.setItem('swiftshop-fulfillment-details', JSON.stringify(fulfillmentDetails));
  }, [fulfillmentDetails]);

  const updateFulfillmentDetails = useCallback((details: Partial<FulfillmentDetails>) => {
    setFulfillmentDetails((prev) => ({ ...prev, ...details }));
  }, []);

  const addToCart = useCallback(
    (product: Product, mode?: FulfillmentMode) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            item.product.id === product.id &&
            item.fulfillmentMode === (mode || globalFulfillmentMode)
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id &&
            item.fulfillmentMode === (mode || globalFulfillmentMode)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        const finalMode =
          mode ||
          (globalFulfillmentMode === 'pickup' &&
          product.fulfillmentOptions.isPickupAvailable
            ? 'pickup'
            : 'shipping');
        return [...prev, { product, quantity: 1, fulfillmentMode: finalMode }];
      });
    },
    [globalFulfillmentMode]
  );

  const removeFromCart = useCallback((productId: number, mode: FulfillmentMode) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.fulfillmentMode === mode)));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, mode: FulfillmentMode, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, mode);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.fulfillmentMode === mode ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const pickupItems = useMemo(
    () => cart.filter((item) => item.fulfillmentMode === 'pickup'),
    [cart]
  );

  const shippingItems = useMemo(
    () => cart.filter((item) => item.fulfillmentMode === 'shipping'),
    [cart]
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      cart,
      totalPrice,
      totalItems,
      globalFulfillmentMode,
      setGlobalFulfillmentMode,
      fulfillmentDetails,
      updateFulfillmentDetails,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isDrawerOpen,
      setDrawerOpen,
      pickupItems,
      shippingItems,
    }),
    [
      products,
      loading,
      error,
      cart,
      totalPrice,
      totalItems,
      globalFulfillmentMode,
      fulfillmentDetails,
      updateFulfillmentDetails,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isDrawerOpen,
      pickupItems,
      shippingItems,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}
