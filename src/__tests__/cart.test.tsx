import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProductProvider, useProductContext } from '../context/ProductContext';
import type { Product, FulfillmentMode } from '../types';
import type { ReactNode } from 'react';

const mockProduct = (
  overrides: Partial<Product> = {}
): Product => ({
  id: 1,
  title: 'Test Beauty Product',
  description: 'A test product',
  price: 29.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 100,
  brand: 'TestBrand',
  category: 'beauty',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/img.jpg'],
  fulfillmentOptions: {
    isPickupAvailable: true,
    isShippingAvailable: true,
    estimatedPickupTime: '2 Hours',
    estimatedShippingTime: '3-5 Days',
  },
  ...overrides,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <ProductProvider>{children}</ProductProvider>
);

describe('Cart State Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should increment cart length when adding a product', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper });

    expect(result.current.cart).toHaveLength(0);

    act(() => {
      result.current.addToCart(mockProduct());
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('should set fulfillment mode to pickup for products when globalFulfillmentMode is pickup', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper });

    // Switch to pickup mode
    act(() => {
      result.current.setGlobalFulfillmentMode('pickup' as FulfillmentMode);
    });

    // Add a product that has pickup available
    const pickupProduct = mockProduct({
      id: 2,
      fulfillmentOptions: {
        isPickupAvailable: true,
        isShippingAvailable: true,
        estimatedPickupTime: '2 Hours',
        estimatedShippingTime: '3-5 Days',
      },
    });

    act(() => {
      result.current.addToCart(pickupProduct);
    });

    expect(result.current.cart[0].fulfillmentMode).toBe('pickup');
  });

  it('should correctly update totalPrice after add and remove', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper });

    const productA = mockProduct({ id: 10, price: 15.0 });
    const productB = mockProduct({ id: 20, price: 25.0 });

    act(() => {
      result.current.addToCart(productA);
    });
    expect(result.current.totalPrice).toBeCloseTo(15.0);

    act(() => {
      result.current.addToCart(productB);
    });
    expect(result.current.totalPrice).toBeCloseTo(40.0);

    act(() => {
      result.current.removeFromCart(10, 'shipping');
    });
    expect(result.current.totalPrice).toBeCloseTo(25.0);
  });
});
