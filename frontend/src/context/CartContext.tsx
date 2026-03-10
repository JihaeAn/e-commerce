import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  cartKey: string; // itemId + 선택 옵션 조합으로 만든 고유 키
  itemId: number;
  name: string;
  brandName: string;
  imageUrl: string;
  price: number;
  selectedOptions: Record<string, string>;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'cartKey' | 'quantity'>, quantity: number) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'surface_cart';

function makeCartKey(itemId: number, selectedOptions: Record<string, string>) {
  const optStr = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return `${itemId}_${optStr}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // localStorage 동기화
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (newItem: Omit<CartItem, 'cartKey' | 'quantity'>, quantity: number) => {
      const cartKey = makeCartKey(newItem.itemId, newItem.selectedOptions);
      setItems((prev) => {
        const existing = prev.find((i) => i.cartKey === cartKey);
        if (existing) {
          // 이미 있으면 수량만 증가
          return prev.map((i) =>
            i.cartKey === cartKey ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        return [...prev, { ...newItem, cartKey, quantity }];
      });
    },
    [],
  );

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.cartKey === cartKey ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalCount, totalPrice, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
