"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { CartDrawer } from "./CartDrawer";

export type CartItem = { name: string; price: number; image?: string };

type CartContextValue = {
  open: () => void;
  add: (item: CartItem) => void;
  count: number;
};

const CartContext = createContext<CartContextValue>({
  open: () => {},
  add: () => {},
  count: 0,
});

export const useCart = () => useContext(CartContext);

const SEED: CartItem[] = [
  { name: "Steak veggie bowl", price: 12.19, image: "/images/bowl-steak.png" },
  {
    name: "Dole Lemonade - 20 oz",
    price: 3.29,
    image: "/images/bowl-grilled.png",
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(SEED);

  const add = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
    setIsOpen(true);
  };

  return (
    <CartContext.Provider
      value={{ open: () => setIsOpen(true), add, count: items.length }}
    >
      {children}
      <CartDrawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        setItems={setItems}
      />
    </CartContext.Provider>
  );
}
