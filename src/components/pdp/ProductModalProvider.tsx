"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { MenuItem } from "@/components/ui/MenuItemCard";
import { ProductModal } from "./ProductModal";

const ProductModalContext = createContext<(item: MenuItem) => void>(() => {});

export const useProductModal = () => useContext(ProductModalContext);

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<MenuItem | null>(null);

  return (
    <ProductModalContext.Provider value={setItem}>
      {children}
      <ProductModal item={item} onClose={() => setItem(null)} />
    </ProductModalContext.Provider>
  );
}
