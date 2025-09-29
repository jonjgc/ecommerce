'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { IProduct } from '@/types/product';
import toast from 'react-hot-toast';

interface ICartItem extends IProduct {
  quantity: number;
}

interface ICartContextData {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ICartItem[]>([]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

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
  
  const updateItemQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => {
        if (quantity <= 0) {
            return prevItems.filter(item => item.id !== productId);
        }
        return prevItems.map(item => item.id === productId ? {...item, quantity} : item);
    })
  }

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addToCart, removeFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}