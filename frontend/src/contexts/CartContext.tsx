'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { IProduct } from '@/types/product';
import toast from 'react-hot-toast';

interface ICartItem extends IProduct {
  quantity: number;
}

interface ICartContextData {
  items: ICartItem[];
  totalItems: number;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ICartItem[]>([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: IProduct) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ items, totalItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}