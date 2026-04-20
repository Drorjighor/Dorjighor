import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_KEY = 'dorjighor-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return;

    try {
      setCart(JSON.parse(saved));
    } catch (error) {
      console.error('Failed to load cart', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    const safeQuantity = Math.max(1, quantity);

    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && (item.size || '') === (size || '')
      );

      if (index === -1) {
        return [...prev, { product, quantity: safeQuantity, size }];
      }

      return prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + safeQuantity } : item
      );
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && (item.size || '') === (size || '')))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
