import { useProductContext } from '../context/ProductContext';
import type { Product, FulfillmentMode } from '../types';

export function useCart() {
  const {
    cart,
    totalPrice,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isDrawerOpen,
    setDrawerOpen,
    pickupItems,
    shippingItems,
    globalFulfillmentMode,
    setGlobalFulfillmentMode,
  } = useProductContext();

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const handleAddToCart = (product: Product, mode?: FulfillmentMode) => {
    addToCart(product, mode);
  };

  return {
    cart,
    totalPrice,
    totalItems,
    addToCart: handleAddToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isDrawerOpen,
    setDrawerOpen,
    toggleDrawer,
    pickupItems,
    shippingItems,
    globalFulfillmentMode,
    setGlobalFulfillmentMode,
  };
}
