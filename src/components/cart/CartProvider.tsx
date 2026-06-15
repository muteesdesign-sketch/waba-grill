"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "./CartDrawer";

export type CartItem = { name: string; price: number; image?: string };

export const REWARD_AMOUNT = 3.29;
export const TAX_RATE = 0.137;

export type Totals = {
  subtotal: number;
  reward: number;
  taxes: number;
  tip: number;
  total: number;
};

type CartContextValue = {
  items: CartItem[];
  setItems: (fn: (prev: CartItem[]) => CartItem[]) => void;
  add: (item: CartItem) => void;
  count: number;
  open: () => void;
  time: string;
  setTime: (t: string) => void;
  tipPct: number;
  setTipPct: (n: number) => void;
  utensils: boolean;
  setUtensils: (b: boolean) => void;
  freeDrink: boolean;
  setFreeDrink: (b: boolean) => void;
  totals: Totals;
};

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

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
  const [time, setTime] = useState("12:00pm");
  const [tipPct, setTipPct] = useState(0.1);
  const [utensils, setUtensils] = useState(true);
  const [freeDrink, setFreeDrink] = useState(true);

  const add = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
    setIsOpen(true);
  };

  const totals = useMemo<Totals>(() => {
    const subtotal = items.reduce((s, i) => s + i.price, 0);
    const reward = freeDrink ? -REWARD_AMOUNT : 0;
    const taxes = subtotal * TAX_RATE;
    const tip = subtotal * tipPct;
    return {
      subtotal,
      reward,
      taxes,
      tip,
      total: subtotal + reward + taxes + tip,
    };
  }, [items, freeDrink, tipPct]);

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        add,
        count: items.length,
        open: () => setIsOpen(true),
        time,
        setTime,
        tipPct,
        setTipPct,
        utensils,
        setUtensils,
        freeDrink,
        setFreeDrink,
        totals,
      }}
    >
      {children}
      <CartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </CartContext.Provider>
  );
}
